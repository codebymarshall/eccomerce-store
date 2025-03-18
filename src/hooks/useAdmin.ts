import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Hook to check if the current user is an admin
 * Returns object with isAdmin boolean and isLoading state
 */
export function useAdmin() {
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
  
  return { isAdmin, isLoading };
} 