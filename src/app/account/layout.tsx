import { authOptions } from "@/lib/auth";
import { LayoutDashboard, Settings, ShoppingBag, User } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

interface AccountLayoutProps {
  children: React.ReactNode;
}

export default async function AccountLayout({ children }: AccountLayoutProps) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    redirect("/login?callbackUrl=/account");
  }
  
  // Base navigation items
  const navigation = [
    { name: "Profile", href: "/account", icon: User },
    { name: "Orders", href: "/account/orders", icon: ShoppingBag },
    { name: "Settings", href: "/account/settings", icon: Settings },
  ];
  
  // Add Admin dashboard link if user is an admin
  if (session.user.role === "ADMIN") {
    navigation.push({ name: "Admin Dashboard", href: "/admin", icon: LayoutDashboard });
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 py-8">
      {/* Sidebar */}
      <div className="w-full md:w-64">
        <div className="bg-stone-100 shadow rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4 text-stone-800">Account</h2>
          <nav className="space-y-1 ">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center px-4 py-2 text-sm font-medium rounded-md text-stone-100 bg-stone-500 hover:bg-stone-900"
              >
                <item.icon className="mr-3 h-5 w-5 text-stone-100 " />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1">
        <div className="bg-stone-100 shadow rounded-lg p-6 ">
          {children}
        </div>
      </div>
    </div>
  );
} 