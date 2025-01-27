import ProductClient from "./product-client";

const PRODUCTS = {
  "1": {
    id: "1",
    name: "Premium Headphones",
    price: 299.99,
    image: "/images/headphones.jpg",
    description: "High-quality wireless headphones with noise cancellation.",
  },
} as const;

type Params = Promise<{ id: string }>;

export default async function Page({ params }: { params: Params }) {
  const { id } = await params;
  const product = PRODUCTS[id as keyof typeof PRODUCTS];

  if (!product) {
    return <div className="p-8 text-center">Product not found</div>;
  }

  return <ProductClient product={product} />;
}
