"use client";

import { formatPrice } from "@/lib/utils";
import { Product } from "@/types";
import { Expand, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MouseEventHandler } from "react";
import Button from "../ui/Button";

interface ProductCardProps {
  product: Product;
  onAddToCart?: MouseEventHandler<HTMLButtonElement>;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <div className="group bg-white rounded-xl border p-3 space-y-4 h-full flex flex-col justify-between">
      {/* Product Image */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          src={product.images[0] || "/placeholder.png"}
          alt={product.name}
          fill
          className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <Button 
              onClick={onAddToCart} 
              variant="primary" 
              size="sm"
              className="flex items-center gap-x-2"
            >
              <ShoppingCart size={15} />
              Add to Cart
            </Button>
            <Link href={`/products/${product.id}`}>
              <Button variant="outline" size="sm">
                <Expand size={15} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Product Details */}
      <div className="flex flex-col flex-1">
        <Link href={`/products/${product.id}`} className="flex-1">
          <div className="flex flex-col">
            <p className="font-semibold text-lg">{product.name}</p>
            <p className="text-sm text-gray-500">
              {product.category?.name || "Uncategorized"}
            </p>
          </div>
        </Link>
        <div className="flex items-center justify-between mt-auto">
          <div className="font-semibold">
            {formatPrice(product.price)}
          </div>
          <div className="text-sm text-gray-500">
            {product.inventory > 0 ? `${product.inventory} in stock` : "Out of stock"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 