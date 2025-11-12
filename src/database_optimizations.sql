-- Database Performance Optimizations for Inventory Control System
-- This script fixes the Supabase warnings related to RLS performance and duplicate indexes

-- =====================================
-- 1. FIX RLS POLICIES FOR PROFILES TABLE
-- =====================================

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

-- Create optimized policies with SELECT wrapper
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (user_id = (select auth.uid()));

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (user_id = (select auth.uid()));

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (user_id = (select auth.uid()));

-- =====================================
-- 2. FIX RLS POLICIES FOR PRODUCTS TABLE
-- =====================================

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own products" ON public.products;
DROP POLICY IF EXISTS "Users can insert their own products" ON public.products;
DROP POLICY IF EXISTS "Users can update their own products" ON public.products;
DROP POLICY IF EXISTS "Users can delete their own products" ON public.products;

-- Create optimized policies with SELECT wrapper
CREATE POLICY "Users can view their own products" ON public.products
  FOR SELECT USING (user_id = (select auth.uid()));

CREATE POLICY "Users can insert their own products" ON public.products
  FOR INSERT WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update their own products" ON public.products
  FOR UPDATE USING (user_id = (select auth.uid()));

CREATE POLICY "Users can delete their own products" ON public.products
  FOR DELETE USING (user_id = (select auth.uid()));

-- =====================================
-- 3. FIX RLS POLICIES FOR STOCK_MOVEMENTS TABLE
-- =====================================

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own stock movements" ON public.stock_movements;
DROP POLICY IF EXISTS "Users can insert their own stock movements" ON public.stock_movements;

-- Create optimized policies with SELECT wrapper
CREATE POLICY "Users can view their own stock movements" ON public.stock_movements
  FOR SELECT USING (user_id = (select auth.uid()));

CREATE POLICY "Users can insert their own stock movements" ON public.stock_movements
  FOR INSERT WITH CHECK (user_id = (select auth.uid()));

-- =====================================
-- 4. CLEAN UP DUPLICATE INDEXES ON KV_STORE
-- =====================================

-- Drop duplicate indexes, keeping only the first one
DROP INDEX IF EXISTS public.kv_store_e78ed76b_key_idx1;
DROP INDEX IF EXISTS public.kv_store_e78ed76b_key_idx2;
DROP INDEX IF EXISTS public.kv_store_e78ed76b_key_idx3;
DROP INDEX IF EXISTS public.kv_store_e78ed76b_key_idx4;
DROP INDEX IF EXISTS public.kv_store_e78ed76b_key_idx5;
DROP INDEX IF EXISTS public.kv_store_e78ed76b_key_idx6;
DROP INDEX IF EXISTS public.kv_store_e78ed76b_key_idx7;
DROP INDEX IF EXISTS public.kv_store_e78ed76b_key_idx8;
DROP INDEX IF EXISTS public.kv_store_e78ed76b_key_idx9;
DROP INDEX IF EXISTS public.kv_store_e78ed76b_key_idx10;

-- =====================================
-- 5. ADDITIONAL PERFORMANCE OPTIMIZATIONS
-- =====================================

-- Add index on products.user_id if it doesn't exist (for faster user-specific queries)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_products_user_id ON public.products(user_id);

-- Add composite index on products for common queries
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_products_user_quantity ON public.products(user_id, quantity);

-- Add index on stock_movements for better performance
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_stock_movements_user_product ON public.stock_movements(user_id, product_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_stock_movements_created_at ON public.stock_movements(created_at DESC);

-- Add index on profiles.user_id if it doesn't exist
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);

-- =====================================
-- 6. ANALYZE TABLES FOR QUERY PLANNER
-- =====================================

-- Update table statistics for better query planning
ANALYZE public.profiles;
ANALYZE public.products;
ANALYZE public.stock_movements;
ANALYZE public.kv_store_e78ed76b;

-- =====================================
-- COMPLETION MESSAGE
-- =====================================

-- Print completion message
DO $$
BEGIN
    RAISE NOTICE 'Database optimization completed successfully!';
    RAISE NOTICE 'Performance improvements applied:';
    RAISE NOTICE '✓ RLS policies optimized for profiles table';
    RAISE NOTICE '✓ RLS policies optimized for products table';
    RAISE NOTICE '✓ RLS policies optimized for stock_movements table';
    RAISE NOTICE '✓ Duplicate indexes cleaned up on kv_store table';
    RAISE NOTICE '✓ Additional performance indexes created';
    RAISE NOTICE '✓ Table statistics updated';
    RAISE NOTICE '';
    RAISE NOTICE 'All Supabase warnings should now be resolved.';
END $$;