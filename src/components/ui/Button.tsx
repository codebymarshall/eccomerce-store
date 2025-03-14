"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { forwardRef } from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  href?: string;
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant = "primary", size = "md", isLoading, href, ...props }, ref) => {
    const baseStyles = cn(
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
      {
        "bg-black text-white hover:bg-gray-800": variant === "primary",
        "bg-gray-200 text-gray-900 hover:bg-gray-300": variant === "secondary",
        "border border-gray-300 bg-transparent hover:bg-gray-100": variant === "outline",
        "bg-transparent hover:bg-gray-100": variant === "ghost",
        "bg-red-600 text-white hover:bg-red-700": variant === "danger",
        "h-8 px-3 text-sm": size === "sm",
        "h-10 py-2 px-4": size === "md",
        "h-12 px-6 text-lg": size === "lg",
      },
      className
    );

    if (href) {
      return (
        <Link 
          href={href} 
          className={baseStyles}
        >
          {isLoading ? (
            <div className="h-5 w-5 border-2 border-gray-300 border-t-white rounded-full animate-spin mr-2" />
          ) : null}
          {children}
        </Link>
      );
    }

    return (
      <button
        className={baseStyles}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="h-5 w-5 border-2 border-gray-300 border-t-white rounded-full animate-spin mr-2" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button; 