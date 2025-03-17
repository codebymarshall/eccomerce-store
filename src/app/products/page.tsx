import ProductCard from "@/components/product/ProductCard";
import ProductFilters from "@/components/product/ProductFilters";
import Container from "@/components/ui/Container";
import Pagination from "@/components/ui/Pagination";
import { prisma } from "@/lib/db/prisma";
import { ProductWithCategory } from "@/types";

interface ProductsPageProps {
  searchParams: {
    category?: string;
    sort?: string;
    page?: string;
  };
}

const ITEMS_PER_PAGE = 12;

const getProducts = async ({
  category,
  sort = "newest",
  page = "1",
}: ProductsPageProps["searchParams"]): Promise<{
  products: ProductWithCategory[];
  totalPages: number;
}> => {
  const currentPage = parseInt(page);
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  const where = category ? { category: { name: category } } : {};
  const orderBy = {
    newest: { createdAt: "desc" },
    price_asc: { price: "asc" },
    price_desc: { price: "desc" },
  }[sort];

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

  return {
    products,
    totalPages: Math.ceil(total / ITEMS_PER_PAGE),
  };
};

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const { products, totalPages } = await getProducts(searchParams);
  const currentPage = parseInt(searchParams.page || "1");

  return (
    <div className="bg-stone-100 h-full">
    <Container>
      <div className="flex flex-col gap-8 py-8">
        <h1 className="text-3xl font-bold text-stone-500">All Products</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64">
            <ProductFilters currentCategory={searchParams.category} />
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
                  searchParams={searchParams}
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