import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import Container from "@/components/ui/Container";
import { prisma } from "@/lib/db/prisma";
import { ProductWithCategoryAndReviews } from "@/types";
import Image from "next/image";
import { notFound } from "next/navigation";

type Params = Promise<{ productId: string }>;

interface ProductPageProps {
  params: Params;
}

async function getProduct(productId: string): Promise<ProductWithCategoryAndReviews | null> {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
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
        },
      },
    });

    if (!product) return null;

    // Convert Decimal to number and serialize the data
    return {
      ...product,
      price: Number(product.price),
      category: {
        ...product.category,
        id: product.category.id,
        name: product.category.name,
        description: product.category.description,
        image: product.category.image,
        createdAt: product.category.createdAt,
        updatedAt: product.category.updatedAt,
      },
      reviews: product.reviews.map(review => ({
        ...review,
        rating: Number(review.rating),
        user: {
          name: review.user.name,
          image: review.user.image,
        },
      })),
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params;
  const product = await getProduct(productId);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-stone-100 h-full">
      <Container>
        <div className="flex flex-col gap-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Gallery */}
            <div>
              <ProductGallery images={product.images} />
            </div>

            {/* Product Info */}
            <ProductInfo product={product} />
          </div>

          {/* Product Reviews */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Reviews</h2>
            {product.reviews.length > 0 ? (
              <div className="space-y-4">
                {product.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white p-4 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      {review.user.image && (
                        <Image
                          src={review.user.image}
                          alt={review.user.name || "User"}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      )}
                      <div>
                        <p className="font-semibold">{review.user.name}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
} 