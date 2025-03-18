import { PrismaClient } from "@prisma/client";

// Get the type definitions from Prisma client
type PrismaModels = Omit<
  PrismaClient,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;

// Extract model types
type Models = {
  [K in keyof PrismaModels]: PrismaModels[K] extends (...args: unknown[]) => unknown
    ? ReturnType<PrismaModels[K]> extends Promise<infer U>
      ? U extends Array<infer I>
        ? I
        : U
      : never
    : never;
};

// Define our model types
export type User = Models["user"];
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  inventory: number;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
  categoryId: string;
};
export type Category = {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
};
export type ShippingAddress = {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  name?: string;
  phone?: string;
};
export type Order = {
  id: string;
  userId: string;
  status: string;
  total: number;
  paymentIntentId: string | null;
  shippingAddress: ShippingAddress | null;
  createdAt: Date;
  updatedAt: Date;
  user?: {
    name: string | null;
    email: string;
  };
  orderItems?: OrderItem[];
};
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

export type ProductWithCategory = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  inventory: number;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
  categoryId: string;
  category: {
    id: string;
    name: string;
    description: string | null;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type ReviewWithUser = {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
  userId: string;
  productId: string;
  user: {
    name: string | null;
    image: string | null;
  };
};

export type ProductWithCategoryAndReviews = ProductWithCategory & {
  reviews: ReviewWithUser[];
};

export type CartItem = {
  product: ProductWithCategory;
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