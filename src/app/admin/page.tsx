import { prisma } from "@/lib/db/prisma";
import { formatPrice } from "@/lib/utils";
import { Package, ShoppingBag, Users } from "lucide-react";
import Link from "next/link";

async function getStats() {
  const [
    productCount,
    orderCount,
    userCount,
    recentOrders,
    totalRevenue
  ] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count(),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      }
    }),
    prisma.order.aggregate({
      _sum: {
        total: true
      }
    })
  ]);

  return {
    productCount,
    orderCount,
    userCount,
    recentOrders: recentOrders.map(order => ({
      ...order,
      total: Number(order.total)
    })),
    totalRevenue: totalRevenue._sum.total || 0
  };
}

export default async function AdminDashboard() {
  const { productCount, orderCount, userCount, recentOrders, totalRevenue } = await getStats();
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Stats Cards */}
        <div className="bg-white p-6 rounded-lg shadow-sm border ">
          <div className="flex items-center ">
            <Package className="h-12 w-12 text-blue-500 mr-4" />
            <div>
              <p className="text-sm text-stone-900">Total Products</p>
              <p className="text-2xl font-bold text-stone-900">{productCount}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link 
              href="/admin/products" 
              className="text-sm text-blue-500 hover:underline"
            >
              View all products →
            </Link>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <ShoppingBag className="h-12 w-12 text-green-500 mr-4" />
            <div>
              <p className="text-sm text-stone-900">Total Orders</p>
              <p className="text-2xl font-bold text-stone-900">{orderCount}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link 
              href="/admin/orders" 
              className="text-sm text-green-500 hover:underline"
            >
              View all orders →
            </Link>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Users className="h-12 w-12 text-purple-500 mr-4" />
            <div>
              <p className="text-sm text-stone-900">Total Users</p>
              <p className="text-2xl font-bold text-stone-900">{userCount}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link 
              href="/admin/users" 
              className="text-sm text-purple-500 hover:underline"
            >
              View all users →
            </Link>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4 text-stone-900">Total Revenue</h2>
          <p className="text-3xl font-bold text-green-600">
            {formatPrice(Number(totalRevenue))}
          </p>
        </div>
        
        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-lg shadow-sm border lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-stone-900">Recent Orders</h2>
          
          {recentOrders.length > 0 ? (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="border-b pb-4">
                  <div className="flex justify-between mb-2">
                    <p className="font-medium text-stone-900">Order #{order.id.slice(0, 8)}</p>
                    <p className="text-stone-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-stone-500">
                      {order.orderItems.length} item(s)
                    </p>
                    <p className="font-semibold text-green-600">{formatPrice(order.total)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-stone-500">No orders yet.</p>
          )}
          
          <div className="mt-4">
            <Link 
              href="/admin/orders" 
              className="text-sm text-blue-500 hover:underline"
            >
              View all orders →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 