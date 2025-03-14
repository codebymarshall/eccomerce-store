import { authOptions } from "@/lib/auth";
import { Settings, ShoppingBag, User } from "lucide-react";
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
  
  const navigation = [
    { name: "Profile", href: "/account", icon: User },
    { name: "Orders", href: "/account/orders", icon: ShoppingBag },
    { name: "Settings", href: "/account/settings", icon: Settings },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 py-8">
      {/* Sidebar */}
      <div className="w-full md:w-64">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Account</h2>
          <nav className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
              >
                <item.icon className="mr-3 h-5 w-5 text-gray-400" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1">
        <div className="bg-white shadow rounded-lg p-6">
          {children}
        </div>
      </div>
    </div>
  );
} 