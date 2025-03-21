import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

type Params = Promise<{ orderId: string }>;

export async function DELETE(
  request: Request,
  { params }: { params: Params }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { orderId } = await params;

    // Check if order exists
    const existingOrder = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!existingOrder) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    // Delete order items first
    await prisma.orderItem.deleteMany({
      where: {
        orderId,
      },
    });

    // Delete order
    await prisma.order.delete({
      where: {
        id: orderId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete order error:", error);
    return NextResponse.json(
      { error: "Failed to delete order" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Params }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { orderId } = await params;
    const body = await request.json();
    const { status, items } = body;

    // Check if order exists
    const existingOrder = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        orderItems: true,
      },
    });

    if (!existingOrder) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    // Update order in a transaction
    const updatedOrder = await prisma.$transaction(async (tx) => {
      // If items provided, update order items
      if (items && Array.isArray(items)) {
        // First, restore inventory for current items
        for (const item of existingOrder.orderItems) {
          const product = await tx.product.findUnique({
            where: { id: item.productId }
          });
          
          if (product) {
            await tx.product.update({
              where: { id: item.productId },
              data: { inventory: product.inventory + item.quantity }
            });
          }
        }
        
        // Delete existing order items
        await tx.orderItem.deleteMany({
          where: { orderId }
        });
        
        // Calculate new total
        let total = 0;
        
        // Create new order items and update inventory
        for (const item of items) {
          const product = await tx.product.findUnique({
            where: { id: item.productId }
          });
          
          if (!product) {
            throw new Error(`Product not found: ${item.productId}`);
          }
          
          if (product.inventory < item.quantity) {
            throw new Error(`Not enough inventory for product: ${product.name}`);
          }
          
          // Create order item
          await tx.orderItem.create({
            data: {
              orderId,
              productId: item.productId,
              quantity: item.quantity,
              price: Number(product.price)
            }
          });
          
          // Update product inventory
          await tx.product.update({
            where: { id: item.productId },
            data: { inventory: product.inventory - item.quantity }
          });
          
          total += Number(product.price) * item.quantity;
        }
        
        // Update order with new total and status
        return tx.order.update({
          where: { id: orderId },
          data: {
            status: status || existingOrder.status,
            total
          }
        });
      } else {
        // Just update the status if no items provided
        return tx.order.update({
          where: { id: orderId },
          data: { status: status || existingOrder.status }
        });
      }
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error("Update order error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update order" },
      { status: 500 }
    );
  }
} 