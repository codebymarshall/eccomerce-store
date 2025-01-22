"use client";

import { useCart } from "@/providers/cart-provider";
import { notFound } from "next/navigation";

// This would typically be fetched from your database
const getProduct = (id: string) => {
  const products = {
    "1": {
      id: "1",
      name: "Premium Headphones",
      price: 299.99,
      image: "/images/headphones.jpg",
      description:
        "High-quality wireless headphones with noise cancellation. Features include:\n- Active noise cancellation\n- 30-hour battery life\n- Premium sound quality\n- Comfortable fit\n- Bluetooth 5.0",
      category: "Audio",
    },
    // Add more products as needed
  };

  return products[id as keyof typeof products];
};

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProduct(params.id);
  const { addItem } = useCart();

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        {/* Product details */}
        <div className="lg:max-w-lg lg:self-end">
          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {product.name}
            </h1>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Product information
            </h2>

            <div className="flex items-center">
              <p className="text-lg text-gray-900 sm:text-xl">
                ${product.price}
              </p>
            </div>

            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-500">{product.description}</p>
            </div>
          </section>
        </div>

        {/* Product image */}
        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
            <div className="h-full w-full bg-gray-200 animate-pulse" />
          </div>
        </div>

        {/* Add to cart */}
        <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
          <div className="mt-10">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
