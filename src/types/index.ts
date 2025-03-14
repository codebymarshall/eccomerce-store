import { PrismaClient } from "@prisma/client";

// Get the type definitions from Prisma client
type PrismaModels = Omit<
  PrismaClient,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;

// Extract model types
type Models = {
  [K in keyof PrismaModels]: PrismaModels[K] extends (...args: any) => any
    ? ReturnType<PrismaModels[K]> extends Promise<infer U>
      ? U extends Array<infer I>
        ? I
        : U
      : never
    : never;
};

// Define our model types
export type User = Models["user"];
export type Product = Models["product"];
export type Category = Models["category"];
export type Order = Models["order"];
export type Review = Models["review"];
export type OrderItem = Models["orderItem"];

// Enum type for Role (matches prisma schema)
export enum Role {
  USER = "USER",
  ADMIN = "ADMIN"
}

export type SafeUser = Omit<User, "password"> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
  role: Role;
};

export type ProductWithCategory = Product & {
  category: Category;
};

export type ProductWithCategoryAndReviews = ProductWithCategory & {
  reviews: Review[];
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type OrderWithItems = Order & {
  orderItems: {
    id: string;
    quantity: number;
    price: number;
    product: Product;
  }[];
};

export type CheckoutItem = {
  price_data: {
    currency: string;
    product_data: {
      name: string;
      images?: string[];
    };
    unit_amount: number;
  };
  quantity: number;
}; 