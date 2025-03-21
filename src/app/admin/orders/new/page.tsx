import OrderForm from "@/components/admin/OrderForm";
import { prisma } from "@/lib/db/prisma";

export default async function NewOrderPage() {
  // Fetch all users and products for the form
  const [users, products] = await Promise.all([
    prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
      orderBy: {
        name: 'asc',
      },
    }),
    prisma.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        inventory: true,
      },
      where: {
        inventory: {
          gt: 0
        }
      },
      orderBy: {
        name: 'asc',
      },
    }),
  ]);

  // Convert Decimal price to number for products
  const formattedProducts = products.map(product => ({
    ...product,
    price: Number(product.price),
  }));

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Create New Order</h1>
      
      <div className="bg-white shadow-sm rounded-lg p-6">
        <OrderForm 
          users={users} 
          products={formattedProducts}
        />
      </div>
    </div>
  );
} 