import OrderForm from "@/components/admin/OrderForm";
import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";

type Params = Promise<{ orderId: string }>;

export default async function EditOrderPage({ params }: { params: Params }) {
  const { orderId } = await params;

  // Fetch the order with its items
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      orderItems: true,
    },
  });

  if (!order) {
    notFound();
  }

  // Fetch all users for the form
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
    orderBy: {
      name: 'asc',
    },
  });

  // Fetch all products
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      inventory: true,
    },
    orderBy: {
      name: 'asc',
    },
  });

  // Convert Decimal price to number for products
  const formattedProducts = products.map(product => ({
    ...product,
    price: Number(product.price),
  }));

  // Format the order data for the form
  const formattedOrder = {
    id: order.id,
    userId: order.userId || "",
    status: order.status,
    total: Number(order.total),
    orderItems: order.orderItems.map(item => ({
      id: item.id,
      productId: item.productId,
      quantity: item.quantity,
      price: Number(item.price)
    }))
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Order</h1>
      
      <div className="bg-white shadow-sm rounded-lg p-6">
        <OrderForm 
          order={formattedOrder}
          users={users} 
          products={formattedProducts}
          isEditing={true}
        />
      </div>
    </div>
  );
} 