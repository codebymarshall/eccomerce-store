import PasswordForm from "@/components/account/PasswordForm";
import Container from "@/components/ui/Container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    notFound();
  }
  
  return (
    <Container>
      <div className="py-10">
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        
        <div className="mt-10 space-y-10">
          <section>
            <h2 className="text-xl font-semibold">Password</h2>
            <p className="mt-1 text-gray-500">
              Update your password to keep your account secure.
            </p>
            <PasswordForm />
          </section>
          
          <section>
            <h2 className="text-xl font-semibold">Notifications</h2>
            <p className="mt-1 text-gray-500">
              Manage your email notification preferences.
            </p>
            <div className="mt-4 space-y-3">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="order-updates"
                    name="order-updates"
                    type="checkbox"
                    defaultChecked
                    disabled
                    className="focus:ring-black h-4 w-4 text-black border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="order-updates" className="font-medium text-gray-700">
                    Order updates
                  </label>
                  <p className="text-gray-500">Get notified when your order status changes.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="promotions"
                    name="promotions"
                    type="checkbox"
                    disabled
                    className="focus:ring-black h-4 w-4 text-black border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="promotions" className="font-medium text-gray-700">
                    Promotions and deals
                  </label>
                  <p className="text-gray-500">Receive special offers and discounts.</p>
                </div>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Notification preferences are not yet implemented in this demo.
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-red-600">Danger Zone</h2>
            <p className="mt-1 text-gray-500">
              Actions in this section can&apos;t be undone.
            </p>
            <div className="mt-4">
              <button 
                className="px-4 py-2 bg-red-600 text-white font-medium rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
                disabled
              >
                Delete Account
              </button>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              Account deletion is not yet implemented in this demo.
            </div>
          </section>
        </div>
      </div>
    </Container>
  );
} 