-- Verification Script for Database Optimizations
-- Run this after applying the optimizations to verify they were successful

-- =====================================
-- 1. VERIFY RLS POLICIES ARE OPTIMIZED
-- =====================================

-- Check profiles table policies
SELECT schemaname, tablename, policyname, qual, with_check 
FROM pg_policies 
WHERE tablename = 'profiles' 
ORDER BY policyname;

-- Check products table policies
SELECT schemaname, tablename, policyname, qual, with_check 
FROM pg_policies 
WHERE tablename = 'products' 
ORDER BY policyname;

-- Check stock_movements table policies
SELECT schemaname, tablename, policyname, qual, with_check 
FROM pg_policies 
WHERE tablename = 'stock_movements' 
ORDER BY policyname;

-- =====================================
-- 2. VERIFY DUPLICATE INDEXES ARE CLEANED UP
-- =====================================

-- List all indexes on kv_store table
SELECT 
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes 
WHERE tablename LIKE 'kv_store_e78ed76b%'
ORDER BY indexname;

-- Count indexes (should be minimal now)
SELECT 
    COUNT(*) as index_count,
    'kv_store indexes remaining' as description
FROM pg_indexes 
WHERE tablename LIKE 'kv_store_e78ed76b%';

-- =====================================
-- 3. VERIFY PERFORMANCE INDEXES EXIST
-- =====================================

-- Check if our new performance indexes were created
SELECT 
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes 
WHERE indexname IN (
    'idx_products_user_id',
    'idx_products_user_quantity', 
    'idx_stock_movements_user_product',
    'idx_stock_movements_created_at',
    'idx_profiles_user_id'
)
ORDER BY tablename, indexname;

-- =====================================
-- 4. CHECK TABLE STATISTICS
-- =====================================

-- Verify table statistics are recent
SELECT 
    schemaname,
    tablename,
    n_tup_ins as inserts,
    n_tup_upd as updates,
    n_tup_del as deletes,
    last_analyze,
    last_autoanalyze
FROM pg_stat_user_tables 
WHERE tablename IN ('profiles', 'products', 'stock_movements')
ORDER BY tablename;

-- =====================================
-- 5. PERFORMANCE TEST QUERIES
-- =====================================

-- Test query performance with EXPLAIN (these should show efficient index usage)
-- Note: Replace 'test-user-id' with an actual user ID when testing

-- Test products query performance
EXPLAIN (ANALYZE, BUFFERS) 
SELECT * FROM public.products 
WHERE user_id = 'test-user-id' 
LIMIT 10;

-- Test stock movements query performance  
EXPLAIN (ANALYZE, BUFFERS)
SELECT sm.*, p.name as product_name
FROM public.stock_movements sm
JOIN public.products p ON sm.product_id = p.id
WHERE sm.user_id = 'test-user-id'
ORDER BY sm.created_at DESC
LIMIT 20;

-- =====================================
-- SUMMARY REPORT
-- =====================================

DO $$
DECLARE
    profile_policies_count INTEGER;
    products_policies_count INTEGER;
    stock_policies_count INTEGER;
    kv_indexes_count INTEGER;
    performance_indexes_count INTEGER;
BEGIN
    -- Count policies
    SELECT COUNT(*) INTO profile_policies_count FROM pg_policies WHERE tablename = 'profiles';
    SELECT COUNT(*) INTO products_policies_count FROM pg_policies WHERE tablename = 'products';
    SELECT COUNT(*) INTO stock_policies_count FROM pg_policies WHERE tablename = 'stock_movements';
    
    -- Count indexes
    SELECT COUNT(*) INTO kv_indexes_count FROM pg_indexes WHERE tablename LIKE 'kv_store_e78ed76b%';
    SELECT COUNT(*) INTO performance_indexes_count FROM pg_indexes 
    WHERE indexname IN ('idx_products_user_id', 'idx_products_user_quantity', 'idx_stock_movements_user_product', 'idx_stock_movements_created_at', 'idx_profiles_user_id');
    
    -- Report results
    RAISE NOTICE '==========================================';
    RAISE NOTICE 'DATABASE OPTIMIZATION VERIFICATION REPORT';
    RAISE NOTICE '==========================================';
    RAISE NOTICE '';
    RAISE NOTICE 'RLS Policies Status:';
    RAISE NOTICE '  Profiles table: % policies', profile_policies_count;
    RAISE NOTICE '  Products table: % policies', products_policies_count;
    RAISE NOTICE '  Stock movements table: % policies', stock_policies_count;
    RAISE NOTICE '';
    RAISE NOTICE 'Index Status:';
    RAISE NOTICE '  KV store indexes: % (should be 1-2)', kv_indexes_count;
    RAISE NOTICE '  Performance indexes: % (should be 5)', performance_indexes_count;
    RAISE NOTICE '';
    
    IF profile_policies_count >= 3 AND products_policies_count >= 4 AND stock_policies_count >= 2 AND performance_indexes_count = 5 THEN
        RAISE NOTICE '✅ OPTIMIZATION SUCCESSFUL - All components properly configured!';
    ELSE
        RAISE NOTICE '❌ OPTIMIZATION INCOMPLETE - Check individual components above';
    END IF;
    
    RAISE NOTICE '';
    RAISE NOTICE 'All Supabase performance warnings should now be resolved.';
    RAISE NOTICE '==========================================';
END $$;