import Container from "@/components/ui/Container";
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-stone-100">
       {/* Hero Section */}
      <div className="relative w-full max-w-[2000px] mx-auto">
        <div className="relative w-full min-h-[450px] h-[450px] sm:h-[500px] md:h-[550px] lg:h-[600px] xl:h-[800px]">
          <Image
            src="/images/about.jpg"
            alt="Home background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            quality={90}
          />
        </div>
      </div>
    <Container>
      <div className="py-10">
        <h1 className="text-3xl font-bold mb-6 text-stone-800">About Us</h1>
        
        <div className="space-y-6 text-stone-500">
          <p>
            Welcome to our store. We are a premier online retailer committed to providing 
            high-quality products and exceptional customer service.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 text-stone-800">Our Story</h2>
          <p>
            Founded in 2023, our company began with a simple mission: to create an 
            accessible online shopping experience with carefully curated products. 
            What started as a small operation has grown into a trusted online destination 
            for thousands of customers.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 text-stone-800">Our Values</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Quality:</strong> We carefully select each product in our inventory.</li>
            <li><strong>Sustainability:</strong> We&apos;re committed to environmentally responsible practices.</li>
            <li><strong>Customer Satisfaction:</strong> Your happiness is our top priority.</li>
            <li><strong>Transparency:</strong> We believe in honest communication about our products and services.</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 text-stone-800">Our Team</h2>
          <p>
            Our dedicated team brings together expertise from retail, technology, and customer service.
            We work collaboratively to ensure that every aspect of your shopping experience meets the 
            highest standards.
          </p>
        </div>
      </div>
    </Container>
    </div>
  );
} 