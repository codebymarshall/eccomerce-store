"use client";

import { Category } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ProductFiltersProps {
  currentCategory?: string;
}

const ProductFilters = ({ currentCategory }: ProductFiltersProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        
        // Accept the categories from the API without overly strict validation
        // JSON dates come as strings, not Date objects
        if (Array.isArray(data)) {
          setCategories(data as Category[]);
        } else {
          throw new Error("Invalid category data structure");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    params.set("page", "1");
    router.push(`/products?${params.toString()}`);
  };

  const handleSortChange = (sort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sort);
    params.set("page", "1");
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <div className="space-y-2">
          <button
            onClick={() => handleCategoryChange("all")}
            className={`block w-full text-left px-4 py-2 rounded-lg text-stone-100 ${
              !currentCategory
                ? "bg-stone-900 text-stone-100"
                : "hover:bg-stone-500"
            }`}
          >
            All Products
          </button>
          {!isLoading && categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.name)}
              className={`block w-full text-left px-4 py-2 rounded-lg text-stone-100${
                currentCategory === category.name
                  ? "bg-stone-900 text-stone-100"
                  : "hover:bg-stone-500"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-stone-500">Sort By</h3>
        <select
          value={searchParams.get("sort") || "newest"}
          onChange={(e) => handleSortChange(e.target.value)}
          className="w-full px-4 py-2 border-4 rounded-lg bg-stone-900 text-stone-100 border-stone-500"
        >
          <option value="newest">Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default ProductFilters; 