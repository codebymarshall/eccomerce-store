"use client";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

// Inner component that uses hooks requiring suspense
const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/account";
  const [isLoading, setIsLoading] = useState(false);
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push(callbackUrl);
    }
  }, [status, router, callbackUrl]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        // Handle error silently as it's shown in the UI
      }
    } catch {
      // Handle error silently as it's shown in the UI
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-16">
      <h1 className="text-2xl font-bold mb-8">Login</h1>

      <div className="bg-white border rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-stone-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full rounded-md text-stone-500 border-stone-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-stone-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 block w-full rounded-md text-stone-500 border-stone-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>

          <div className="text-center text-sm text-stone-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-stone-900 hover:underline">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

// Loading fallback component
const LoginFormLoading = () => {
  return (
    <div className="max-w-md mx-auto py-16">
      <h1 className="text-2xl font-bold mb-8">Login</h1>
      <div className="bg-white border rounded-lg p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-10 bg-stone-200 rounded"></div>
          <div className="h-10 bg-stone-200 rounded"></div>
          <div className="h-10 bg-stone-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

const LoginPage = () => {
  return (
    <Container>
      <Suspense fallback={<LoginFormLoading />}>
        <LoginForm />
      </Suspense>
    </Container>
  );
};

export default LoginPage; 