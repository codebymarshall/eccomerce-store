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
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 cursor-pointer",
      {
        "bg-stone-700 text-stone-100 hover:bg-stone-800 border border-stone-900 hover:border-stone-100": variant === "primary",
        "bg-stone-500 text-stone-100 border hover:bg-stone-100 hover:text-stone-500 hover:border-stone-500": variant === "secondary",
        "border border-stone-400 bg-transparent hover:bg-stone-100 text-stone-400": variant === "outline",
        "bg-transparent hover:bg-gray-100": variant === "ghost",
        "bg-red-800 text-white hover:bg-red-700": variant === "danger",
        "min-h-8 px-3 py-1.5 text-xs sm:text-sm flex items-center justify-center": size === "sm",
        "min-h-10 px-4 py-2 text-sm sm:text-base flex items-center justify-cente": size === "md",
        "min-h-12 px-5 py-2.5 text-base sm:text-lg flex items-center justify-center": size === "lg",
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
            <div className="h-5 w-5 border-2 border-stone-300 border-t-stone-100 rounded-full animate-spin mr-2" />
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
          <div className="h-5 w-5 border-2 border-stone-300 border-t-stone-100 rounded-full animate-spin mr-2" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button; 