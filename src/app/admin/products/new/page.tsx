import ProductForm from "@/components/admin/ProductForm";
import { prisma } from "@/lib/db/prisma";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Add New Product</h1>
      
      <div className="bg-white shadow-sm rounded-lg p-6">
        <ProductForm categories={categories} />
      </div>
    </div>
  );
} 