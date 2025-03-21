import { authOptions } from "@/lib/auth";
import {
    LayoutDashboard,
    LogOut,
    Package,
    ShoppingBag,
    Users
} from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    redirect("/login?callbackUrl=/admin");
  }
  
  if (session.user.role !== "ADMIN") {
    redirect("/");
  }
  
  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { name: "Users", href: "/admin/users", icon: Users },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-stone-900 text-stone-100 p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        
        <nav className="space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center px-4 py-3 text-sm font-medium rounded-md hover:bg-stone-800"
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>
        
        <div className="mt-auto pt-8">
          <Link 
            href="/"
            className="flex items-center px-4 py-3 text-sm font-medium rounded-md hover:bg-stone-800"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Back to Store
          </Link>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 p-8 bg-stone-100">
        {children}
      </div>
    </div>
  );
} 