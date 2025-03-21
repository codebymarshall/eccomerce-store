import { prisma } from "@/lib/db/prisma";
import { formatPrice } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import OrderActions from "./components/OrderActions";
import OrderStatus from "./components/OrderStatus";

type Params = Promise<{ orderId: string }>;

export default async function OrderDetailPage({ params }: { params: Params }) {
  const { orderId } = await params;

  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      orderItems: {
        include: {
          product: {
            include: {
              category: true,
            },
          },
        },
      },
    },
  });

  if (!order) {
    notFound();
  }

  // Convert Decimal to number for display
  const orderTotal = Number(order.total);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Link 
            href="/admin/orders" 
            className="mr-4 p-2 rounded-full hover:bg-stone-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-bold">Order #{order.id.slice(0, 8)}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <OrderStatus orderId={order.id} currentStatus={order.status} />
          <OrderActions orderId={order.id} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-stone-900">Order Items</h2>
            <div className="space-y-4">
              {order.orderItems.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0 text-stone-500"
                >
                  <div className="relative w-16 h-16 ">
                    <Image
                      src={item.product.images[0] || "/placeholder.png"}
                      alt={item.product.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-stone-500">
                          {item.product.category.name}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-stone-900">
                          {formatPrice(Number(item.price))}
                        </p>
                        <p className="text-sm text-stone-900">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-stone-900">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-stone-900">
                <span className="text-stone-500">Subtotal</span>
                <span>{formatPrice(order.orderItems.reduce(
                  (total, item) => total + Number(item.price) * item.quantity,
                  0
                ))}</span>
              </div>
              <div className="flex justify-between text-stone-900">
                <span className="text-stone-500">Shipping</span>
                <span>{formatPrice(Number(order.total) - order.orderItems.reduce(
                  (total, item) => total + Number(item.price) * item.quantity,
                  0
                ))}</span>
              </div>
              <div className="flex justify-between font-semibold text-stone-500">
                <span>Total</span>
                <span>{formatPrice(orderTotal)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Details */}
        <div className="space-y-6">
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-stone-900">Customer</h2>
            <p className="font-medium text-stone-500">{order.user?.name || "Guest"}</p>
            <p className="text-stone-500">{order.user?.email || "N/A"}</p>
          </div>

          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-stone-900">Order Information</h2>
            <div className="space-y-3 text-stone-900">
              <div>
                <p className="text-sm text-stone-500">Order Date</p>
                <p>{new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-stone-500">Payment</p>
                <p>Stripe {order.paymentIntentId ? `(${order.paymentIntentId.slice(-8)})` : '(Unknown)'}</p>
              </div>
              <div>
                <p className="text-sm text-stone-500">Status</p>
                <p>{order.status}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 