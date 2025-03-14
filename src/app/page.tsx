import ProductCard from "@/components/product/ProductCard";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { prisma } from "@/lib/db/prisma";
import { ProductWithCategory } from "@/types";
import Link from "next/link";

const getFeaturedProducts = async (): Promise<ProductWithCategory[]> => {
  const products = await prisma.product.findMany({
    where: {
      isFeatured: true,
    },
    include: {
      category: true,
    },
    take: 8,
  });

  return products;
};

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="pb-10">
      {/* Hero Section */}
      <div className="bg-gray-100 py-20 sm:py-24">
        <Container>
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-cyan-500">
              Shop the Latest Products
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl">
              Discover our curated collection of high-quality products for your everyday needs.
              From electronics to fashion, we've got you covered.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button href="/products" size="lg">
                Shop Now
              </Button>
              <Link
                href="/about"
                className="text-sm font-semibold leading-6 text-cyan-500"
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Featured Products */}
      <Container>
        <div className="py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-cyan-500">
              Featured Products
            </h2>
            <Link
              href="/products"
              className="text-sm font-semibold leading-6 text-cyan-500"
            >
              View all <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-slate-500">No featured products available.</p>
              </div>
            )}
          </div>
        </div>
      </Container>

      {/* Categories */}
      <Container>
        <div className="py-12">
          <h2 className="text-2xl font-bold tracking-tight text-cyan-500 mb-8">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative rounded-lg overflow-hidden group h-64">
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white mb-2">Electronics</h3>
                  <Button href="/products?category=electronics" variant="outline" className="bg-white text-slate-500">
                    Shop Now
                  </Button>
                </div>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden group h-64">
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white mb-2">Clothing</h3>
                  <Button href="/products?category=clothing" variant="outline" className="bg-white text-slate-500">
                    Shop Now
                  </Button>
                </div>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden group h-64">
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white mb-2">Home & Garden</h3>
                  <Button href="/products?category=home" variant="outline" className="bg-white text-slate-500">
                    Shop Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
