"use client";

import { CartItem, ProductWithCategory } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CartStore {
  items: CartItem[];
  addItem: (product: ProductWithCategory) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product: ProductWithCategory) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.product.id === product.id
        );

        if (existingItem) {
          return set({
            items: currentItems.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        }

        return set({ items: [...currentItems, { product, quantity: 1 }] });
      },
      
      removeItem: (productId: string) => {
        const currentItems = get().items;
        set({
          items: currentItems.filter((item) => item.product.id !== productId),
        });
      },
      
      updateQuantity: (productId: string, quantity: number) => {
        const currentItems = get().items;
        
        if (quantity <= 0) {
          return get().removeItem(productId);
        }
        
        set({
          items: currentItems.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        });
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const price = typeof item.product.price === 'string' 
            ? parseFloat(item.product.price) 
            : Number(item.product.price);
          return total + price * item.quantity;
        }, 0);
      },
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart; 