import ProductForm from "@/components/admin/ProductForm";
import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";

type Params = Promise<{ productId: string }>;

export default async function EditProductPage({ params }: { params: Params }) {
  const { productId } = await params;

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: {
        id: productId,
      },
    }),
    prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    }),
  ]);

  if (!product) {
    notFound();
  }

  // Convert Decimal price to number
  const productWithParsedPrice = {
    ...product,
    price: Number(product.price),
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Product</h1>
      
      <div className="bg-white shadow-sm rounded-lg p-6">
        <ProductForm 
          categories={categories} 
          product={productWithParsedPrice}
          isEditing={true}
        />
      </div>
    </div>
  );
} 