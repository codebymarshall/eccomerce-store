import Container from "@/components/ui/Container";

export const metadata = {
  title: "Shipping Policy",
  description: "Shipping policy and delivery information for our store",
};

export default function ShippingPage() {
  return (
    <div className="bg-stone-100">
    <Container>
      <div className="max-w-3xl mx-auto py-12">
        <h1 className="text-3xl font-bold text-stone-800 mb-6">Shipping Policy</h1>
        
        <div className="space-y-6 text-stone-700">
          <section>
            <h2 className="text-xl font-semibold text-stone-800 mb-3">Delivery Times</h2>
            <p className="mb-3">We aim to process and ship all orders within 1-2 business days of receiving them. Once shipped, you can expect delivery within the following timeframes:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Standard Shipping: 3-5 business days</li>
              <li>Express Shipping: 1-2 business days</li>
              <li>International Shipping: 7-14 business days</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-stone-800 mb-3">Shipping Costs</h2>
            <p className="mb-3">Shipping costs are calculated based on the delivery location and the weight/size of the items in your order:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Orders over $100 qualify for free standard shipping within the continental US</li>
              <li>Standard Shipping: $5.99 - $9.99</li>
              <li>Express Shipping: $14.99 - $19.99</li>
              <li>International Shipping: Calculated at checkout</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-stone-800 mb-3">Tracking Your Order</h2>
            <p>
              Once your order has been shipped, you will receive an email with tracking information. You can also track your order through your account dashboard.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-stone-800 mb-3">International Shipping</h2>
            <p className="mb-3">
              We ship to most countries worldwide. Please note that international orders may be subject to import duties and taxes, which are the responsibility of the customer.
            </p>
            <p>
              International delivery times may vary depending on customs processing in your country.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-stone-800 mb-3">Shipping Restrictions</h2>
            <p>
              Some products cannot be shipped to certain locations due to local regulations. If this applies to your order, we will notify you as soon as possible.
            </p>
          </section>
        </div>
      </div>
      </Container>
      </div>
  );
} 