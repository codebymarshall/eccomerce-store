import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import Container from "@/components/ui/Container";
import { prisma } from "@/lib/db/prisma";
import { ProductWithCategoryAndReviews } from "@/types";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const getProduct = async (productId: string): Promise<ProductWithCategoryAndReviews> => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      category: true,
      reviews: {
        include: {
          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!product) {
    notFound();
  }

  return product;
};

const ProductPage = async ({ params }: ProductPageProps) => {
  const product = await getProduct(params.productId);

  return (
    <Container>
      <div className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Gallery */}
          <ProductGallery images={product.images} />

          {/* Product Info */}
          <ProductInfo product={product} />
        </div>

        {/* Product Reviews */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>
          <div className="space-y-6">
            {product.reviews.map((review) => (
              <div key={review.id} className="border-b pb-6">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                    {review.user.image && (
                      <img
                        src={review.user.image}
                        alt={review.user.name || "User"}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">{review.user.name}</p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-yellow-400 ${
                            i < review.rating ? "fill-current" : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">{review.comment}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
            {product.reviews.length === 0 && (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductPage; 