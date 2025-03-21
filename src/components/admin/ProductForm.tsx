"use client";

import Button from "@/components/ui/Button";
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProductFormProps {
  categories: Category[];
  product?: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    categoryId: string;
    inventory: number;
    isFeatured: boolean;
  };
  isEditing?: boolean;
}

export default function ProductForm({
  categories,
  product,
  isEditing = false,
}: ProductFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    
    // Process images to handle arrays
    const imageUrls = formData.getAll("images") as string[];
    const filteredImages = imageUrls.filter(url => url.trim() !== "");

    const productData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: parseFloat(formData.get("price") as string),
      images: filteredImages,
      categoryId: formData.get("categoryId") as string,
      inventory: parseInt(formData.get("inventory") as string, 10),
      isFeatured: formData.get("isFeatured") === "on",
    };

    try {
      const response = await fetch(
        isEditing
          ? `/api/admin/products/${product?.id}`
          : "/api/admin/products",
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save product");
      }

      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const addImageField = () => {
    const imageField = document.createElement("input");
    imageField.type = "text";
    imageField.name = "images";
    imageField.className = "mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-stone-900 focus:ring-stone-900 sm:text-sm";
    imageField.placeholder = "Image URL";
    
    document.getElementById("image-fields")?.appendChild(imageField);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label 
          htmlFor="name" 
          className="block text-sm font-medium text-stone-700"
        >
          Product Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={product?.name}
          className="mt-1 block w-full rounded-md text-stone-500 border-stone-300 shadow-sm focus:border-stone-900 focus:ring-stone-900 sm:text-sm"
        />
      </div>

      <div>
        <label 
          htmlFor="description" 
          className="block text-sm font-medium text-stone-700"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={product?.description}
          className="mt-1 block w-full rounded-md text-stone-500 border-stone-300 shadow-sm focus:border-stone-900 focus:ring-stone-900 sm:text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label 
            htmlFor="price" 
            className="block text-sm font-medium text-stone-700"
          >
            Price
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-stone-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              id="price"
              name="price"
              required
              min="0"
              step="0.01"
              defaultValue={product?.price}
              className="block w-full pl-7 rounded-md text-stone-500 border-stone-300 shadow-sm focus:border-stone-900 focus:ring-stone-900 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label 
            htmlFor="inventory" 
            className="block text-sm font-medium text-stone-700"
          >
            Inventory
          </label>
          <input
            type="number"
            id="inventory"
            name="inventory"
            required
            min="0"
            defaultValue={product?.inventory || 0}
            className="mt-1 block w-full rounded-md text-stone-500 border-stone-300 shadow-sm focus:border-stone-900 focus:ring-stone-900 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label 
          htmlFor="categoryId" 
          className="block text-sm font-medium text-stone-700"
        >
          Category
        </label>
        <select
          id="categoryId"
          name="categoryId"
          required
          defaultValue={product?.categoryId}
          className="mt-1 block w-full rounded-md text-stone-500 border-stone-300 shadow-sm focus:border-stone-900 focus:ring-stone-900 sm:text-sm"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-2">
          Images
        </label>
        <div id="image-fields" className="space-y-2 text-stone-500">
          {product?.images && product.images.length > 0 ? (
            product.images.map((image, index) => (
              <input
                key={index}
                type="text"
                name="images"
                defaultValue={image}
                className="mt-1 block w-full rounded-md  border-stone-300 shadow-sm focus:border-stone-900 focus:ring-stone-900 sm:text-sm"
                placeholder="Image URL"
              />
            ))
          ) : (
            <input
              type="text"
              name="images"
              className="mt-1 block w-full rounded-md  border-stone-300 shadow-sm focus:border-stone-900 focus:ring-stone-900 sm:text-sm"
              placeholder="Image URL"
            />
          )}
        </div>
        <button
          type="button"
          onClick={addImageField}
          className="mt-2 text-sm text-blue-600 hover:text-blue-800"
        >
          + Add another image
        </button>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isFeatured"
          name="isFeatured"
          defaultChecked={product?.isFeatured}
          className="h-4 w-4 text-stone-900 focus:ring-stone-900 border-stone-300 rounded"
        />
        <label 
          htmlFor="isFeatured" 
          className="ml-2 block text-sm text-stone-700"
        >
          Featured product
        </label>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/products")}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? "Saving..."
            : isEditing
            ? "Update Product"
            : "Create Product"}
        </Button>
      </div>
    </form>
  );
} 