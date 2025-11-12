import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Package, TrendingUp, TrendingDown, BarChart3, Settings, Plus, Edit, Trash2, Eye, AlertTriangle, CheckCircle, Download, Upload } from 'lucide-react';
import { Separator } from './ui/separator';

interface HelpProps {
  onBack: () => void;
}

export function Help({ onBack }: HelpProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Settings
        </Button>
      </div>

      <h1>Help & User Guide</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Automated Inventory Control System</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            This comprehensive inventory management system helps you track, manage, and monitor your product inventory in real-time. All monetary values are displayed in Nigerian Naira (₦), and each user has their own isolated database for complete privacy and data separation.
          </p>
        </CardContent>
      </Card>

      {/* Getting Started */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="w-5 h-5 mr-2" />
            Getting Started
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Account Creation</h3>
            <p className="text-sm text-muted-foreground">
              Create your own account to access the system. Each user gets a completely separate database, ensuring your inventory data is private and isolated from other users.
            </p>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-medium mb-2">First Login</h3>
            <p className="text-sm text-muted-foreground">
              After logging in for the first time, the system will automatically create sample products to help you get familiar with the interface. You can delete these and add your own products at any time.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The dashboard provides a quick overview of your inventory status with key metrics and product listings.
          </p>
          
          <div className="space-y-3">
            <div>
              <h3 className="font-medium mb-2">Summary Cards</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
                <li><strong>Total Products:</strong> Total count of unique items in your inventory</li>
                <li><strong>Total Stock Value:</strong> Combined value of all products (quantity × price)</li>
                <li><strong>Low Stock Items:</strong> Number of products below their reorder level</li>
                <li><strong>Out of Stock:</strong> Products with zero quantity</li>
              </ul>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-2">Product Table</h3>
              <p className="text-sm text-muted-foreground mb-2">
                The product table displays all your inventory items with the following information:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
                <li><strong>SKU:</strong> Stock Keeping Unit - unique identifier for each product</li>
                <li><strong>Name:</strong> Product name</li>
                <li><strong>Category:</strong> Product category for organization</li>
                <li><strong>Quantity:</strong> Current stock level</li>
                <li><strong>Price:</strong> Unit price in Nigerian Naira (₦)</li>
                <li><strong>Reorder Level:</strong> Minimum stock threshold before restocking is needed</li>
                <li><strong>Status:</strong> 
                  <div className="ml-6 mt-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Green checkmark - Stock is OK (above reorder level)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span>Red alert - Low stock (at or below reorder level)</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-2">Quick Actions</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Each product row has quick action buttons:
              </p>
              <div className="space-y-2 ml-2">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm text-muted-foreground"><strong>View:</strong> See detailed product information</span>
                </div>
                <div className="flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  <span className="text-sm text-muted-foreground"><strong>Edit:</strong> Modify product details</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-muted-foreground"><strong>Restock:</strong> Add inventory quantity</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-muted-foreground"><strong>Sell:</strong> Reduce inventory quantity</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trash2 className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-muted-foreground"><strong>Delete:</strong> Remove product from inventory</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Product */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Adding Products
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Click "Add Product" from the navigation menu to add new items to your inventory.
          </p>
          
          <div>
            <h3 className="font-medium mb-2">Required Information</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
              <li><strong>Product Name:</strong> Descriptive name for the item</li>
              <li><strong>SKU:</strong> Unique stock keeping unit (auto-generated but editable)</li>
              <li><strong>Category:</strong> Choose from existing categories (Electronics, Clothing, Food, etc.)</li>
              <li><strong>Initial Quantity:</strong> Starting stock level</li>
              <li><strong>Unit Price:</strong> Price per unit in Nigerian Naira (₦)</li>
              <li><strong>Reorder Level:</strong> Minimum quantity before low stock alert</li>
              <li><strong>Description:</strong> Optional detailed product information</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>Tip:</strong> The SKU is automatically generated based on the product name, but you can customize it to match your existing inventory system.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Update Stock */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Updating Stock Levels
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Manage stock quantities through the "Update Stock" page or quick actions on the dashboard.
          </p>
          
          <div>
            <h3 className="font-medium mb-2">Two Ways to Update Stock</h3>
            <div className="space-y-3 ml-2">
              <div>
                <p className="text-sm font-medium">1. Quick Actions (Dashboard)</p>
                <p className="text-sm text-muted-foreground">
                  Click the "Restock" or "Sell" buttons directly from the product table for immediate stock adjustments.
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">2. Update Stock Page</p>
                <p className="text-sm text-muted-foreground">
                  Navigate to "Update Stock" from the menu, select a product, choose the action type (restock or sell), enter the quantity, and optionally add notes.
                </p>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-medium mb-2">Stock Actions</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
              <li><strong>Restock:</strong> Increases inventory quantity (receiving new stock)</li>
              <li><strong>Sell:</strong> Decreases inventory quantity (recording sales)</li>
            </ul>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-lg">
            <p className="text-sm text-amber-900">
              <strong>Note:</strong> You cannot reduce stock below zero. The system will prevent overselling.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Reports & Analytics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The Reports page provides visual insights into your inventory data.
          </p>
          
          <div>
            <h3 className="font-medium mb-2">Available Reports</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
              <li><strong>Stock Levels Chart:</strong> Visual bar chart showing quantity levels for all products</li>
              <li><strong>Product Value Chart:</strong> Bar chart displaying the total value (quantity × price) of each product</li>
              <li><strong>Low Stock Report:</strong> Filtered view of products at or below their reorder level</li>
              <li><strong>Category Distribution:</strong> Summary of products by category</li>
            </ul>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-medium mb-2">Export Features</h3>
            <div className="flex items-start gap-2">
              <Download className="w-4 h-4 mt-1" />
              <p className="text-sm text-muted-foreground">
                Export your data in multiple formats (CSV, Excel, PDF) for external analysis or record-keeping.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Settings & Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Profile Settings</h3>
            <p className="text-sm text-muted-foreground">
              Manage your personal information, profile picture, and contact details.
            </p>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-medium mb-2">Security Settings</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
              <li><strong>Change Password:</strong> Update your account password regularly for security</li>
              <li><strong>Two-Factor Authentication:</strong> Add an extra layer of security to your account</li>
              <li><strong>Session Management:</strong> View and manage active login sessions</li>
            </ul>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-medium mb-2">Notification Settings</h3>
            <p className="text-sm text-muted-foreground">
              Configure alerts for low stock warnings, daily reports, and stock update notifications.
            </p>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-medium mb-2">System Settings</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
              <li><strong>Default Reorder Level:</strong> Set a default threshold for new products</li>
              <li><strong>Currency:</strong> Nigerian Naira (₦) - system default</li>
              <li><strong>Date Format:</strong> Customize how dates are displayed</li>
              <li><strong>Time Zone:</strong> Set your local time zone for accurate timestamps</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Card>
        <CardHeader>
          <CardTitle>Best Practices</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2 ml-2">
            <li>
              <strong>Set Appropriate Reorder Levels:</strong> Configure reorder levels based on your sales velocity and supplier lead times to avoid stockouts
            </li>
            <li>
              <strong>Regular Stock Audits:</strong> Periodically verify physical stock matches system quantities
            </li>
            <li>
              <strong>Use Consistent SKUs:</strong> Maintain a standardized SKU naming convention for easy identification
            </li>
            <li>
              <strong>Monitor Low Stock Alerts:</strong> Check the dashboard regularly for products needing restock
            </li>
            <li>
              <strong>Add Detailed Descriptions:</strong> Include product specifications and notes for better inventory management
            </li>
            <li>
              <strong>Export Reports Regularly:</strong> Keep backups of your inventory data through periodic exports
            </li>
            <li>
              <strong>Update Stock Immediately:</strong> Record restocks and sales in real-time for accurate inventory tracking
            </li>
            <li>
              <strong>Organize by Categories:</strong> Use categories effectively to group similar products for easier management
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Troubleshooting */}
      <Card>
        <CardHeader>
          <CardTitle>Troubleshooting</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Common Issues</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium">Products not loading</p>
                <p className="text-sm text-muted-foreground">
                  Ensure you have a stable internet connection. Try refreshing the page or signing out and back in.
                </p>
              </div>
              
              <div>
                <p className="text-sm font-medium">Cannot reduce stock below zero</p>
                <p className="text-sm text-muted-foreground">
                  This is by design. The system prevents negative inventory. Check your current stock level before attempting to sell.
                </p>
              </div>
              
              <div>
                <p className="text-sm font-medium">Changes not saving</p>
                <p className="text-sm text-muted-foreground">
                  Verify your internet connection. If the problem persists, try clearing your browser cache or using a different browser.
                </p>
              </div>
              
              <div>
                <p className="text-sm font-medium">Forgot password</p>
                <p className="text-sm text-muted-foreground">
                  Use the "Forgot Password" link on the login page to reset your password via email.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Privacy */}
      <Card>
        <CardHeader>
          <CardTitle>Data Privacy & Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Your data security and privacy are our top priorities:
          </p>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2 ml-2">
            <li>
              <strong>User Isolation:</strong> Each user account has a completely separate database. Your inventory data is never shared with or visible to other users.
            </li>
            <li>
              <strong>Secure Authentication:</strong> All login credentials are encrypted and securely stored.
            </li>
            <li>
              <strong>Data Encryption:</strong> All data transmission is encrypted using industry-standard protocols.
            </li>
            <li>
              <strong>No Data Collection:</strong> This system is not designed for collecting personally identifiable information (PII) or sensitive customer data.
            </li>
            <li>
              <strong>Session Management:</strong> You can view and terminate active sessions from the Settings page.
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Support */}
      <Card>
        <CardHeader>
          <CardTitle>Need More Help?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            If you need additional assistance or have questions not covered in this guide, please reach out through the following channels:
          </p>
          <div className="space-y-2">
            <p className="text-sm">
              <strong>Email Support:</strong> gbolahanbantefa08@gmail.com
            </p>
            <p className="text-sm">
              <strong>Response Time:</strong> We typically respond within 24 hours
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-start pt-4">
        <Button onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Settings
        </Button>
      </div>
    </div>
  );
}
