"use client";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { formatPrice } from "@/lib/utils";
import useCart from "@/store/cart";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CheckoutPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { items, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const subtotal = items.reduce(
    (total, item) => total + Number(item.product.price) * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 5.99 : 0;
  const total = subtotal + shipping;

  useEffect(() => {
    if (!session) {
      router.push("/login?callbackUrl=/checkout");
    }
  }, [session, router]);

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [items, router]);

  const handleCheckout = async () => {
    try {
      setIsLoading(true);

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            price_data: {
              currency: "usd",
              product_data: {
                name: item.product.name,
                images: item.product.images,
              },
              unit_amount: Math.round(Number(item.product.price) * 100),
            },
            quantity: item.quantity,
          })),
        }),
      });

      const { sessionId } = await response.json();

      const stripe = await stripePromise;
      const { error } = await stripe!.redirectToCheckout({
        sessionId,
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setIsLoading(false);
    }
  };

  if (!session) {
    return null;
  }

  return (
    <Container>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="border rounded-lg p-6 space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p>{formatPrice(Number(item.product.price) * item.quantity)}</p>
                </div>
              ))}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Payment</h2>
            <div className="border rounded-lg p-6">
              <p className="text-gray-600 mb-4">
                You will be redirected to Stripe to complete your payment.
              </p>
              <Button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Processing..." : "Pay with Stripe"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CheckoutPage; 