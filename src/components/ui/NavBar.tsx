"use client";

import { cn } from "@/lib/utils";
import useCart from "@/store/cart";
import { SafeUser } from "@/types";
import { ShoppingBag, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";

interface NavBarProps {
  user?: SafeUser | null;
}

const NavBar = ({ user }: NavBarProps) => {
  const pathname = usePathname();
  const cart = useCart();
  const { data: session } = useSession();
  
  const totalItems = cart.getTotalItems();

  const routes = [
    {
      label: "Home",
      href: "/",
      active: pathname === "/",
    },
    {
      label: "Products",
      href: "/products",
      active: pathname === "/products" || pathname.includes("/products/"),
    },
  ];

  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="font-bold text-xl">
              STORE
            </Link>
            <nav className="hidden md:flex ml-10 space-x-4">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    route.active ? "text-black" : "text-neutral-500 hover:text-black"
                  )}
                >
                  {route.label}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-2 w-5 h-5 bg-black text-white rounded-full text-xs flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            {session?.user ? (
              <div className="relative group">
                <button className="flex items-center space-x-1">
                  <User size={20} />
                </button>
                <div className="absolute right-0 top-full mt-2 w-40 bg-white border shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <div className="py-1">
                    <Link href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Account
                    </Link>
                    <Link href="/account/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Orders
                    </Link>
                    {user?.role === "ADMIN" && (
                      <Link href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Admin
                      </Link>
                    )}
                    <button
                      onClick={() => signOut()}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link href="/login" className="flex items-center space-x-1">
                <User size={20} />
              </Link>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NavBar; 