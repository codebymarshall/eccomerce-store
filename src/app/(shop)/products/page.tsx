import Link from "next/link";

export default function ProductsPage() {
  // This would typically fetch from your database
  const products = [
    {
      id: "1",
      name: "Premium Headphones",
      price: 299.99,
      image: "/images/products/picture2d.jpg",
      description: "High-quality wireless headphones with noise cancellation",
      category: "Audio",
    },
    {
      id: "2",
      name: "Smart Watch",
      price: 199.99,
      image: "/images/smartwatch.jpg",
      description: "Feature-rich smartwatch with health tracking",
      category: "Wearables",
    },
    {
      id: "3",
      name: "Wireless Earbuds",
      price: 149.99,
      image: "/images/earbuds.jpg",
      description: "True wireless earbuds with premium sound quality",
      category: "Audio",
    },
    {
      id: "4",
      name: "Bluetooth Speaker",
      price: 79.99,
      image: "/images/speaker.jpg",
      description: "Portable speaker with amazing sound",
      category: "Audio",
    },
    {
      id: "5",
      name: "Fitness Tracker",
      price: 89.99,
      image: "/images/tracker.jpg",
      description: "Track your daily activities and workouts",
      category: "Wearables",
    },
    {
      id: "6",
      name: "Wireless Charger",
      price: 39.99,
      image: "/images/charger.jpg",
      description: "Fast wireless charging pad for all devices",
      category: "Accessories",
    },
  ];

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            All Products
          </h2>
          <div className="flex gap-4">{/* Add filters here later */}</div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
                <div className="h-full w-full bg-gray-200 animate-pulse" />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link href={`/products/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.category}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
