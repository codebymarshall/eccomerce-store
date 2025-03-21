import Container from "@/components/ui/Container";

export const metadata = {
  title: "Frequently Asked Questions",
  description: "Find answers to common questions about our store and services",
};

export default function FAQPage() {
  return (
    <div className="bg-stone-100">
    <Container>
      <div className="max-w-3xl mx-auto py-12">
        <h1 className="text-3xl font-bold text-stone-800 mb-6">Frequently Asked Questions</h1>
        
        <div className="space-y-8 text-stone-700">
          <section>
            <h2 className="text-xl font-semibold text-stone-800 mb-4">Ordering & Account</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-stone-800 mb-2">How do I create an account?</h3>
                <p>
                  You can create an account by clicking on the &quot;Register&quot; link in the top right corner of our website. You&apos;ll need to provide your email address and create a password.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-stone-800 mb-2">Do I need an account to place an order?</h3>
                <p>
                  No, you can checkout as a guest. However, creating an account makes it easier to track your orders and save your shipping information for future purchases.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-stone-800 mb-2">How can I track my order?</h3>
                <p>
                  Once your order has been shipped, you&apos;ll receive an email with tracking information. You can also track your order by logging into your account and viewing your order history.
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-stone-800 mb-4">Shipping & Delivery</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-stone-800 mb-2">How long will it take for my order to arrive?</h3>
                <p>
                  Standard shipping typically takes 3-5 business days within the continental US. Express shipping takes 1-2 business days. International shipping can take 7-14 business days. Please see our <a href="/shipping" className="text-stone-500 hover:underline">Shipping Policy</a> for more details.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-stone-800 mb-2">Do you ship internationally?</h3>
                <p>
                  Yes, we ship to most countries worldwide. International shipping costs and delivery times vary by location.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-stone-800 mb-2">Is free shipping available?</h3>
                <p>
                  Orders over $100 qualify for free standard shipping within the continental US.
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-stone-800 mb-4">Returns & Refunds</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-stone-800 mb-2">What is your return policy?</h3>
                <p>
                  We accept returns within 30 days of delivery. Items must be in their original condition with tags attached. Please visit our <a href="/returns" className="text-stone-500 hover:underline">Returns & Exchanges</a> page for full details.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-stone-800 mb-2">How do I return an item?</h3>
                <p>
                  To initiate a return, log into your account, go to your order history, and select the order containing the item(s) you wish to return. Follow the prompts to complete the return process.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-stone-800 mb-2">How long does it take to process a refund?</h3>
                <p>
                  Once we receive your return, we process refunds within 3-5 business days. It may take an additional 2-10 business days for the refund to appear on your statement, depending on your financial institution.
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-stone-800 mb-4">Product Information</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-stone-800 mb-2">Are your products guaranteed authentic?</h3>
                <p>
                  Yes, all products sold on our website are 100% authentic. We source our products directly from manufacturers or authorized distributors.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-stone-800 mb-2">Do you offer warranties on your products?</h3>
                <p>
                  Many of our products come with a manufacturer&apos;s warranty. Please check the product description for specific warranty information.
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-stone-800 mb-4">Still Have Questions?</h2>
            <p>
              If you couldn&apos;t find the answer to your question, please visit our <a href="/contact" className="text-stone-500 hover:underline">Contact Us</a> page for assistance.
            </p>
          </section>
        </div>
      </div>
      </Container>
      </div>
  );
} 