import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';

interface Product {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  reorderLevel: number;
}

interface AddProductProps {
  onAddProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
}

export function AddProduct({ onAddProduct }: AddProductProps) {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    quantity: '',
    price: '',
    reorderLevel: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const product = {
        name: formData.name,
        sku: formData.sku,
        quantity: parseInt(formData.quantity),
        price: parseFloat(formData.price),
        reorderLevel: parseInt(formData.reorderLevel)
      };

      await onAddProduct(product);
      
      // Reset form
      setFormData({
        name: '',
        sku: '',
        quantity: '',
        price: '',
        reorderLevel: ''
      });

      toast.success('Product added successfully!');
    } catch (error) {
      toast.error('Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <h1 className="text-xl sm:text-2xl lg:text-3xl">Add Product</h1>
      
      <Card className="max-w-2xl">
        <CardHeader className="pb-4 sm:pb-6">
          <CardTitle className="text-lg sm:text-xl">Product Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Product Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                  className="text-sm"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sku" className="text-sm font-medium">SKU</Label>
                <Input
                  id="sku"
                  name="sku"
                  value={formData.sku}
                  onChange={handleInputChange}
                  placeholder="Enter SKU (e.g., PROD-001)"
                  className="text-sm"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="space-y-2">
                <Label htmlFor="quantity" className="text-sm font-medium">Quantity</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="0"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="Enter initial quantity"
                  className="text-sm"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="text-sm font-medium">Price (₦)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Enter price per unit"
                  className="text-sm"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reorderLevel" className="text-sm font-medium">Reorder Level</Label>
                <Input
                  id="reorderLevel"
                  name="reorderLevel"
                  type="number"
                  min="0"
                  value={formData.reorderLevel}
                  onChange={handleInputChange}
                  placeholder="Enter minimum stock level"
                  className="text-sm"
                  required
                />
              </div>
            </div>

            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full sm:w-auto sm:min-w-[200px] text-sm sm:text-base h-10 sm:h-11" 
                disabled={loading}
              >
                {loading ? 'Adding Product...' : 'Add Product'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}