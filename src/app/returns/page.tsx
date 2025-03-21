import Container from "@/components/ui/Container";

export const metadata = {
  title: "Returns & Exchanges",
  description: "Our return and exchange policy",
};

export default function ReturnsPage() {
  return (
    <div className="bg-stone-100">
    <Container>
      <div className="max-w-3xl mx-auto py-12">
        <h1 className="text-3xl font-bold text-stone-800 mb-6">Returns & Exchanges</h1>
        
        <div className="space-y-6 text-stone-700">
          <section>
            <h2 className="text-xl font-semibold text-stone-800 mb-3">Return Policy</h2>
            <p className="mb-3">
              We want you to be completely satisfied with your purchase. If you&apos;re not happy with your order for any reason, you can return it within 30 days of delivery for a full refund or exchange.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-stone-800 mb-3">How to Return an Item</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Log into your account and navigate to your order history</li>
              <li>Select the order containing the item(s) you wish to return</li>
              <li>Follow the prompts to initiate a return request</li>
              <li>Print the provided return shipping label</li>
              <li>Pack the item(s) securely in their original packaging if possible</li>
              <li>Attach the return shipping label to your package</li>
              <li>Drop off the package at your nearest shipping location</li>
            </ol>
            <p className="mt-3">
              If you have any issues with this process, please contact our customer service team.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-stone-800 mb-3">Return Conditions</h2>
            <p className="mb-3">To be eligible for a return, your item must be:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Unworn, unused, and in the same condition that you received it</li>
              <li>In the original packaging where possible</li>
              <li>Accompanied by the receipt or proof of purchase</li>
              <li>Returned within 30 days of delivery</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-stone-800 mb-3">Exchanges</h2>
            <p className="mb-3">
              If you need to exchange an item for a different size or color, please follow the same process as returns, but select &quot;Exchange&quot; when initiating your return request.
            </p>
            <p>
              Once we receive your returned item, we will process your exchange and ship the new item to you as quickly as possible.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-stone-800 mb-3">Refunds</h2>
            <p className="mb-3">
              Once we receive your returned item, we will inspect it and notify you that we&apos;ve received it. We will process your refund within 3-5 business days, and the credit will automatically be applied to your original method of payment.
            </p>
            <p className="mb-3">
              Please note that depending on your credit card company, it may take an additional 2-10 business days for the refund to appear on your statement.
            </p>
            <p>
              Shipping costs are non-refundable, and return shipping costs are the responsibility of the customer unless the return is due to our error.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-stone-800 mb-3">Non-Returnable Items</h2>
            <p className="mb-3">The following items cannot be returned:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Gift cards</li>
              <li>Downloadable products</li>
              <li>Personalized or custom-made items</li>
              <li>Sale items (unless defective)</li>
            </ul>
          </section>
        </div>
      </div>
      </Container>
      </div>
  );
} 