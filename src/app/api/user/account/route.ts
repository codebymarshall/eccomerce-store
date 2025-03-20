import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in to delete your account" },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    if (!userId) {
      return NextResponse.json(
        { error: "User ID not found in session" },
        { status: 400 }
      );
    }

    // Delete all user-related data
    // We need to delete in the correct order to respect foreign key constraints
    
    // Delete user's reviews
    await prisma.review.deleteMany({
      where: { userId }
    });
    
    // Delete user's orders and related orderItems
    // OrderItems will be deleted automatically due to cascade delete
    await prisma.order.deleteMany({
      where: { userId }
    });
    
    // Delete user's sessions
    await prisma.session.deleteMany({
      where: { userId }
    });
    
    // Delete user's accounts (OAuth connections)
    await prisma.account.deleteMany({
      where: { userId }
    });
    
    // Finally delete the user account
    await prisma.user.delete({
      where: { id: userId }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Account deletion error:", error);
    return NextResponse.json(
      { error: "Failed to delete account" },
      { status: 500 }
    );
  }
} 