import { prisma } from "@/lib/db/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const headersList = headers();
    const signature = headersList.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "No signature" },
        { status: 400 }
      );
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      // Create order
      const order = await prisma.order.create({
        data: {
          userId: session.metadata?.userId!,
          status: "PROCESSING",
          total: session.amount_total! / 100,
          paymentIntentId: session.payment_intent as string,
          shippingAddress: session.shipping_details,
        },
      });

      // Create order items
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      const orderItems = await Promise.all(
        lineItems.data.map(async (item) => {
          const product = await prisma.product.findFirst({
            where: {
              name: item.description,
            },
          });

          if (!product) {
            throw new Error(`Product not found: ${item.description}`);
          }

          return prisma.orderItem.create({
            data: {
              orderId: order.id,
              productId: product.id,
              quantity: item.quantity!,
              price: item.price!.unit_amount! / 100,
            },
          });
        })
      );

      // Update product inventory
      await Promise.all(
        orderItems.map(async (orderItem) => {
          const product = await prisma.product.findUnique({
            where: { id: orderItem.productId },
          });

          if (!product) {
            throw new Error(`Product not found: ${orderItem.productId}`);
          }

          return prisma.product.update({
            where: { id: orderItem.productId },
            data: {
              inventory: product.inventory - orderItem.quantity,
            },
          });
        })
      );
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 400 }
    );
  }
} 