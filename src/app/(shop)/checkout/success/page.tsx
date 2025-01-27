"use client";

import { useCart } from "@/providers/cart-provider";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      clearCart();
    }
  }, [sessionId, clearCart]);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="relative mx-auto w-full max-w-[50rem] bg-white">
        <div className="p-8 text-center sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-pink-500">
            Your order was completed
          </p>
          <h1 className="mt-6 text-4xl font-bold text-gray-900">
            Thanks for your purchase!
          </h1>
          <p className="mx-auto mt-6 max-w-md text-gray-500">
            Check your email for the receipt.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
