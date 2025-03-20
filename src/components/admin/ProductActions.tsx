"use client";

import { Edit, Trash } from "lucide-react";
import Link from "next/link";

interface ProductActionsProps {
  productId: string;
}

export default function ProductActions({ productId }: ProductActionsProps) {
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/products/${productId}/delete`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      // Refresh the page to show updated list
      window.location.reload();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  return (
    <div className="flex justify-end space-x-2">
      <Link 
        href={`/admin/products/${productId}`}
        className="p-2 text-blue-600 hover:text-blue-900"
      >
        <Edit className="h-5 w-5" />
      </Link>
      <button 
        onClick={handleDelete}
        className="p-2 text-red-600 hover:text-red-900"
      >
        <Trash className="h-5 w-5" />
      </button>
    </div>
  );
} 