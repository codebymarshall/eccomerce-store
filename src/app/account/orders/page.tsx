import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { formatPrice } from "@/lib/format";
import { OrderStatus } from "@prisma/client";
import { format } from "date-fns";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { notFound } from "next/navigation";

// Simple Badge component for status
const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {children}
    </span>
  );
};

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    notFound();
  }
  
  const orders = await prisma.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "PROCESSING":
        return <Badge className="bg-yellow-100 text-yellow-800">Processing</Badge>;
      case "SHIPPED":
        return <Badge className="bg-blue-100 text-blue-800">Shipped</Badge>;
      case "DELIVERED":
        return <Badge className="bg-green-100 text-green-800">Delivered</Badge>;
      case "CANCELED":
        return <Badge className="bg-red-100 text-red-800">Canceled</Badge>;
      case "PENDING":
        return <Badge className="bg-gray-100 text-gray-800">Pending</Badge>;
      default:
        return <Badge className="bg-gray-100">Unknown</Badge>;
    }
  };

  return (
    <Container>
      <div className="py-10">
        <h1 className="text-3xl font-bold tracking-tight">Your Orders</h1>
        <div className="mt-6 space-y-8">
          {orders.length === 0 ? (
            <div className="text-center py-10">
              <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
              <p className="text-gray-500 mb-4">You haven&apos;t placed any orders yet.</p>
              <Button href="/products">Browse Products</Button>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-4 border-b flex flex-wrap justify-between items-center gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Order placed</p>
                    <p className="font-medium">
                      {format(new Date(order.createdAt), "MMMM d, yyyy")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="font-medium">{formatPrice(Number(order.total))}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <div className="mt-1">{getStatusBadge(order.status as OrderStatus)}</div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-mono text-xs">{order.id.substring(0, 8)}</p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Items</h3>
                  <div className="space-y-3">
                    {order.orderItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded bg-gray-100 flex items-center justify-center">
                          {item.product.images && item.product.images[0] ? (
                            <Image 
                              src={item.product.images[0]} 
                              alt={item.product.name} 
                              width={64}
                              height={64}
                              className="max-w-full max-h-full object-contain"
                            />
                          ) : (
                            <div className="text-gray-400 text-xs text-center">No image</div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{item.product.name}</h4>
                          <p className="text-sm text-gray-500">
                            {formatPrice(Number(item.price))} × {item.quantity} = {formatPrice(Number(item.price) * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 p-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span>Shipping address:</span>
                    <span className="text-gray-700">{order.shippingAddress?.toString() || "N/A"}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Container>
  );
} 