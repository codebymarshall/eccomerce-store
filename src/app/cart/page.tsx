"use client";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { formatPrice } from "@/lib/utils";
import useCart from "@/store/cart";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CartPage = () => {
  const { items, updateQuantity, removeItem } = useCart();

  const subtotal = items.reduce(
    (total, item) => total + Number(item.product.price) * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 5.99 : 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <Container>
        <div className="py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-500 mb-8">
            Add some products to your cart and they will appear here.
          </p>
          <Link href="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 p-4 border rounded-lg"
              >
                <div className="relative w-24 h-24">
                  <Image
                    src={item.product.images[0] || "/placeholder.png"}
                    alt={item.product.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <p className="text-gray-500">{item.product.category.name}</p>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="px-3 py-1 hover:bg-gray-100"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-3 py-1 border-x">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="px-3 py-1 hover:bg-gray-100"
                        disabled={item.quantity >= item.product.inventory}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    {formatPrice(Number(item.product.price) * item.quantity)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatPrice(item.product.price)} each
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{formatPrice(shipping)}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
              <Link href="/checkout" className="block">
                <Button className="w-full">Proceed to Checkout</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CartPage; 