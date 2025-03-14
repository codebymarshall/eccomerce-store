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

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data);
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
            className={`block w-full text-left px-4 py-2 rounded-lg ${
              !currentCategory
                ? "bg-black text-white"
                : "hover:bg-gray-100"
            }`}
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.name)}
              className={`block w-full text-left px-4 py-2 rounded-lg ${
                currentCategory === category.name
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Sort By</h3>
        <select
          value={searchParams.get("sort") || "newest"}
          onChange={(e) => handleSortChange(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
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