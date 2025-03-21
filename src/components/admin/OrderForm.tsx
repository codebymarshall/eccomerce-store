"use client";

import Button from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface User {
  id: string;
  name: string | null;
  email: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  inventory: number;
}

interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

interface OrderFormProps {
  users?: User[];
  products?: Product[];
  order?: {
    id: string;
    userId: string;
    status: string;
    total: number;
    orderItems: {
      id: string;
      productId: string;
      quantity: number;
      price: number;
    }[];
  };
  isEditing?: boolean;
}

export default function OrderForm({ users = [], products = [], order, isEditing = false }: OrderFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const [userId, setUserId] = useState(order?.userId || "");
  const [status, setStatus] = useState(order?.status || "PENDING");
  const [items, setItems] = useState<OrderItem[]>(
    order?.orderItems.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price
    })) || [{ productId: "", quantity: 1, price: 0 }]
  );

  const statuses = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELED"];
  
  // Calculate order total based on items
  const calculateTotal = () => {
    return items.reduce((sum, item) => {
      const product = products.find(p => p.id === item.productId);
      const price = product ? product.price : item.price;
      return sum + (price * item.quantity);
    }, 0);
  };
  
  const handleProductChange = (index: number, productId: string) => {
    const newItems = [...items];
    const product = products.find(p => p.id === productId);
    
    newItems[index] = {
      ...newItems[index],
      productId,
      price: product ? product.price : 0
    };
    
    setItems(newItems);
  };
  
  const handleQuantityChange = (index: number, quantity: number) => {
    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      quantity: Math.max(1, quantity)
    };
    setItems(newItems);
  };
  
  const addItem = () => {
    setItems([...items, { productId: "", quantity: 1, price: 0 }]);
  };
  
  const removeItem = (index: number) => {
    if (items.length > 1) {
      const newItems = [...items];
      newItems.splice(index, 1);
      setItems(newItems);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);
    
    if (!userId) {
      setError("Please select a user");
      setIsLoading(false);
      return;
    }
    
    if (items.some(item => !item.productId)) {
      setError("Please select products for all items");
      setIsLoading(false);
      return;
    }
    
    try {
      const endpoint = isEditing 
        ? `/api/admin/orders/${order?.id}` 
        : '/api/admin/orders';
      
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          status,
          items: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }))
        })
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save order");
      }
      
      const data = await response.json();
      
      setSuccess(isEditing ? "Order updated successfully!" : "Order created successfully!");
      
      // Redirect to the order detail page after creation
      if (!isEditing) {
        router.push(`/admin/orders/${data.id}`);
      } else {
        // Refresh the page to show the updated order
        router.refresh();
      }
    } catch (error) {
      console.error("Order save error:", error);
      setError(error instanceof Error ? error.message : "Failed to save order");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 bg-red-50 border border-red-300 text-red-900 rounded">
          {error}
        </div>
      )}
      
      {success && (
        <div className="p-3 bg-green-50 border border-green-300 text-green-900 rounded">
          {success}
        </div>
      )}
      
      <div>
        <label htmlFor="user" className="block text-sm font-medium text-stone-900 mb-1">
          Customer
        </label>
        <select
          id="user"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          disabled={isEditing || isLoading}
          className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-1 text-stone-500 focus:ring-stone-900"
          required
        >
          <option value="">Select a customer</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name || "No Name"} ({user.email})
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-stone-900 mb-1">
          Order Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          disabled={isLoading}
          className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none text-stone-500 focus:ring-1 focus:ring-stone-900"
          required
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium text-stone-900">Order Items</h3>
          <Button
            type="button"
            onClick={addItem}
            variant="outline"
            size="sm"
          >
            Add Item
          </Button>
        </div>
        
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex items-end space-x-4 p-4 border border-stone-200 rounded-md">
              <div className="flex-1">
                <label htmlFor={`product-${index}`} className="block text-sm font-medium text-stone-700 mb-1">
                  Product
                </label>
                <select
                  id={`product-${index}`}
                  value={item.productId}
                  onChange={(e) => handleProductChange(index, e.target.value)}
                  disabled={isLoading}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md text-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  required
                >
                  <option value="">Select a product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} - {formatPrice(product.price)}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="w-20">
                <label htmlFor={`quantity-${index}`} className="block text-sm font-medium text-stone-700 mb-1">
                  Qty
                </label>
                <input
                  id={`quantity-${index}`}
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                  disabled={isLoading}
                  className="w-full px-3 py-2 border border-stone-300 text-stone-500 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900"
                  required
                />
              </div>
              
              <Button
                type="button"
                onClick={() => removeItem(index)}
                variant="outline"
                size="sm"
                className="text-red-500 border-red-300 hover:bg-red-50"
                disabled={items.length === 1 || isLoading}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="border-t pt-4">
        <div className="flex justify-between items-center text-lg text-stone-900 font-medium">
          <span>Order Total:</span>
          <span>{formatPrice(calculateTotal())}</span>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button
          type="button"
          variant="outline"
          className="mr-2"
          onClick={() => router.back()}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : isEditing ? "Update Order" : "Create Order"}
        </Button>
      </div>
    </form>
  );
} 