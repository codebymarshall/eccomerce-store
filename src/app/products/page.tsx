import ProductCard from "@/components/product/ProductCard";
import ProductFilters from "@/components/product/ProductFilters";
import Container from "@/components/ui/Container";
import Pagination from "@/components/ui/Pagination";
import { prisma } from "@/lib/db/prisma";
import { ProductWithCategory } from "@/types";
import { Prisma } from "@prisma/client";

type SearchParams = Promise<{
  category?: string;
  sort?: string;
  page?: string;
}>;

interface ProductsPageProps {
  searchParams: SearchParams;
}

const ITEMS_PER_PAGE = 12;

const getProducts = async ({
  category,
  sort = "newest",
  page = "1",
}: Awaited<SearchParams>): Promise<{
  products: ProductWithCategory[];
  totalPages: number;
}> => {
  try {
    const currentPage = parseInt(page);
    const skip = (currentPage - 1) * ITEMS_PER_PAGE;

    const where = category ? { category: { name: category } } : {};
    const orderBy: Prisma.ProductOrderByWithRelationInput = {
      ...(sort === "newest" ? { createdAt: "desc" } : {}),
      ...(sort === "price_asc" ? { price: "asc" } : {}),
      ...(sort === "price_desc" ? { price: "desc" } : {}),
    };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
        },
        orderBy,
        skip,
        take: ITEMS_PER_PAGE,
      }),
      prisma.product.count({ where }),
    ]);

    // Convert Decimal to number for client-side serialization
    const serializedProducts = products.map(product => ({
      ...product,
      price: Number(product.price),
    }));

    return {
      products: serializedProducts,
      totalPages: Math.ceil(total / ITEMS_PER_PAGE),
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      products: [],
      totalPages: 0
    };
  }
};

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const resolvedParams = await searchParams;
  const { products, totalPages } = await getProducts(resolvedParams);
  const currentPage = parseInt(resolvedParams.page || "1");

  return (
    <div className="bg-stone-100 h-full">
      <Container>
        <div className="flex flex-col gap-8 py-8">
          <h1 className="text-3xl font-bold text-stone-500">All Products</h1>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="w-full md:w-64">
              <ProductFilters currentCategory={resolvedParams.category} />
            </div>

            {/* Product Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    baseUrl="/products"
                    searchParams={resolvedParams}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductsPage; 