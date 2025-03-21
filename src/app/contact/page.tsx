import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Image from 'next/image';

export default function ContactPage() {
  return (
    <div className="bg-stone-100">
      {/* Hero Section */}
      <div className="relative w-full max-w-[2000px] mx-auto">
        <div className="relative w-full min-h-[450px] h-[450px] sm:h-[500px] md:h-[550px] lg:h-[600px] xl:h-[800px]">
          <Image
            src="/images/contact.jpg"
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
        <h1 className="text-3xl font-bold mb-6 text-stone-800">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-stone-800">
          <div>
            <p className="mb-6 text-stone-500">
              We&apos;d love to hear from you! Please fill out the form below and we&apos;ll get back to you as soon as possible.
            </p>
            
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">Our Information</h2>
                <p className="text-stone-600">
                  123 Store Street<br />
                  City, State 12345<br />
                  United States
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-2">Email Us</h2>
                <p className="text-stone-600">
                  General Inquiries: <a href="mailto:info@example.com" className="text-blue-600 hover:underline">info@example.com</a><br />
                  Customer Support: <a href="mailto:support@example.com" className="text-blue-600 hover:underline">support@example.com</a>
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-2">Call Us</h2>
                <p className="text-stone-600">
                  Phone: (123) 456-7890<br />
                  Hours: Monday-Friday, 9am-5pm EST
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Send us a message</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-stone-500 focus:border-stone-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-stone-500 focus:border-stone-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-stone-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-stone-500 focus:border-stone-500"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-stone-500 focus:border-stone-500"
                  required
                ></textarea>
              </div>
              
              <div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
    </div>
      );
} 