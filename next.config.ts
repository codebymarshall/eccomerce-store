import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'res.cloudinary.com',
      'images.unsplash.com',
      'lh3.googleusercontent.com',
      'stripe.com',
      'files.stripe.com',
      'localhost',
    ],
  },
  serverExternalPackages: ['@prisma/client'],
};

export default nextConfig;
