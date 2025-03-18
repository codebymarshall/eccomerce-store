"use client";

import { formatPrice } from "@/lib/format";
import useCart from "@/store/cart";
import { ProductWithCategoryAndReviews } from "@/types";
import { Star } from "lucide-react";
import Button from "../ui/Button";

interface ProductInfoProps {
  product: ProductWithCategoryAndReviews;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const addItem = useCart((state) => state.addItem);

  const averageRating = product.reviews.length > 0
    ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-500 mt-2">{product.category.name}</p>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={`${
                i < averageRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-500">
          ({product.reviews.length} reviews)
        </span>
      </div>

      {/* Price */}
      <div className="text-2xl font-bold">
        {formatPrice(product.price)}
      </div>

      {/* Description */}
      <div className="prose max-w-none">
        <p className="text-gray-600">{product.description}</p>
      </div>

      {/* Stock Status */}
      <div className="text-sm">
        {product.inventory > 0 ? (
          <span className="text-green-600">{product.inventory} in stock</span>
        ) : (
          <span className="text-red-600">Out of stock</span>
        )}
      </div>

      {/* Add to Cart Button */}
      <Button
        onClick={() => addItem(product)}
        disabled={product.inventory === 0}
        className="w-full"
      >
        {product.inventory > 0 ? "Add to Cart" : "Out of Stock"}
      </Button>
    </div>
  );
};

export default ProductInfo; 