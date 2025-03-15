import ProductCard from "@/components/product/ProductCard";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { prisma } from "@/lib/db/prisma";
import { ProductWithCategory } from "@/types";
import Image from 'next/image';
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
    <div className="pb-10 bg-stone-100">
      {/* Hero Section */}
      <div className="relative w-full max-w-[2000px] min-w-[800px] mx-auto">
        <div className="relative w-full" style={{ 
          maxHeight: '1200px',
          minHeight: '168.75px',
          height: 'auto',
          overflow: 'hidden'
        }}>
          <Image
            src="/images/home.jpg"
            alt="Home background"
            width={1920}
            height={1080}
            layout="responsive"
            priority
            style={{
              objectFit: 'contain',
            }}
          />
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8">
          <Container>
            <div className="flex flex-col items-center text-center bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-md">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-stone-800">
                Shop the Latest Products
              </h1>
              <p className="mt-3 sm:mt-4 md:mt-6 text-sm sm:text-base md:text-lg leading-6 md:leading-8 text-stone-700 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto">
                Discover our curated collection of high-quality products for your everyday needs.
                From electronics to fashion, we've got you covered.
              </p>
              <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
                <Button href="/products" size="lg" className="w-full sm:w-auto">
                  Shop Now
                </Button>
                <Link
                  href="/about"
                  className="mt-3 sm:mt-0 text-sm font-semibold leading-6 text-stone-700"
                >
                  Learn more <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </div>

      {/* Featured Products */}
      <div className="bg-stone-800 py-20 sm:py-24">
        <Container>
          <div className="py-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold tracking-tight text-stone-100">
                Featured Products
              </h2>
              <Link
                href="/products"
                className="text-sm font-semibold leading-6 text-stone-100 hover:text-stone-500"
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
                  <p className="text-stone-100">No featured products available.</p>
                </div>
              )}
            </div>
          </div>
          </Container>
        </div>

      {/* Categories */}
       <div className="bg-stone-100 py-20 sm:py-24">
        <Container>
          <div className="py-12">
            <h2 className="text-2xl font-bold tracking-tight text-stone-500 mb-8">
              Shop by Category
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="relative rounded-lg overflow-hidden group h-64">
                <div className="absolute inset-0 bg-stone-800 bg-opacity-30 group-hover:bg-opacity-40 transition"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-stone-100 mb-2">Electronics</h3>
                    <Button href="/products?category=electronics" variant="outline" className="bg-stone-100 text-stone-500">
                      Shop Now
                    </Button>
                  </div>
                </div>
              </div>
              <div className="relative rounded-lg overflow-hidden group h-64">
                <div className="absolute inset-0 bg-stone-800 bg-opacity-30 group-hover:bg-opacity-40 transition"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-stone-100 mb-2">Clothing</h3>
                    <Button href="/products?category=clothing" variant="outline" className="bg-stone-100 text-stone-500">
                      Shop Now
                    </Button>
                  </div>
                </div>
              </div>
              <div className="relative rounded-lg overflow-hidden group h-64">
                <div className="absolute inset-0 bg-stone-800 bg-opacity-30 group-hover:bg-opacity-40 transition"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-stone-100 mb-2">Home & Garden</h3>
                    <Button href="/products?category=home" variant="outline" className="bg-stone-100 text-stone-500">
                      Shop Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </Container>
      </div>
    </div>
  );
}
