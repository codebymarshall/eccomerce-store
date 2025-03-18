"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

/**
 * Component that will only render its children if the user is an admin
 */
export default function AdminOnly({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // Check if user is admin
  const isAdmin = session?.user?.role === 'ADMIN';
  const isLoading = status === 'loading';
  
  useEffect(() => {
    // Redirect if user is authenticated but not an admin
    if (status === 'authenticated' && !isAdmin) {
      router.push('/');
    }
  }, [status, isAdmin, router]);
  
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }
  
  if (!isAdmin) {
    return null;
  }
  
  return <>{children}</>;
} 