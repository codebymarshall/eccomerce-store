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
      <div className="relative w-full max-w-[2000px] mx-auto">
        <div className="relative w-full min-h-[450px] h-[450px] sm:h-[500px] md:h-[550px] lg:h-[600px] xl:h-[800px]">
          <Image
            src="/images/home.jpg"
            alt="Home background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            quality={90}
          />
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center p-4 pt-16 sm:p-6 md:p-8">
          <Container className="w-full">
            <div className="flex flex-col items-center justify-between text-center bg-stone-100/80 backdrop-blur-sm p-3 sm:p-4 md:p-6 rounded-lg shadow-md max-w-lg md:max-w-2xl mx-auto">
              <h1 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold tracking-tight text-stone-800">
                Shop the Latest Products
              </h1>
              <p className="mt-2 sm:mt-3 md:mt-4 text-xs sm:text-sm md:text-base leading-5 md:leading-7 text-stone-700">
                Discover our curated collection of high-quality products for your everyday needs.
                From electronics to fashion, we've got you covered.
              </p>
              <div className="mt-3 sm:mt-4 md:mt-8 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-x-4">
                <Button href="/products" size="lg" variant="primary" className="w-full sm:w-auto text-sm sm:text-base">
                  Shop Now
                </Button>
                <Link
                  href="/about"
                  className="mt-2 sm:mt-0 text-xs sm:text-sm font-semibold leading-6 text-stone-700"
                >
                  Learn more <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </div>

      {/* Featured Products */}
      <div className="bg-stone-100 py-20 sm:py-24">
        <Container>
          <div className="py-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold tracking-tight text-stone-500">
                Featured Products
              </h2>
              <Link
                href="/products"
                className="text-sm font-semibold leading-6 text-stone-500 hover:text-stone-500"
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
                  <p className="text-stone-500">No featured products available.</p>
                </div>
              )}
            </div>
          </div>
          </Container>
        </div>

      {/* Categories */}
       <div className="bg-stone-800 py-20 sm:py-24">
        <Container>
          <div className="py-12">
            <h2 className="text-2xl font-bold tracking-tight text-stone-100 mb-8">
              Shop by Category
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="relative rounded-lg overflow-hidden group h-64">
                <div className="absolute inset-0 bg-stone-100 bg-opacity-30 group-hover:bg-stone-300 border-4 border-stone-500 transition-colors duration-300 ease-in-out group-hover:border-stone-500 group-hover:border-8 "></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-stone-500 mb-2">Electronics</h3>
                    <Button href="/products?category=Electronics" variant="secondary">
                      Shop Now
                    </Button>
                  </div>
                </div>
              </div>
              <div className="relative rounded-lg overflow-hidden group h-64">
                <div className="absolute inset-0 bg-stone-100 bg-opacity-30 group-hover:bg-stone-300 border-4 border-stone-500 transition-colors duration-300 ease-in-out group-hover:border-stone-500 group-hover:border-8 "></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-stone-500 mb-2">Clothing</h3>
                    <Button href="/products?category=Clothing" variant="secondary">
                      Shop Now
                    </Button>
                  </div>
                </div>
              </div>
              <div className="relative rounded-lg overflow-hidden group h-64">
                <div className="absolute inset-0 bg-stone-100 bg-opacity-30 group-hover:bg-stone-300 border-4 border-stone-500 transition-colors duration-300 ease-in-out group-hover:border-stone-500 group-hover:border-8 "></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-stone-500 mb-2">Home & Garden</h3>
                    <Button href="/products?category=Home%20%26%20Garden" variant="secondary" >
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
