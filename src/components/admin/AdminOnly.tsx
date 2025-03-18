"use client";

import { useAdmin } from '@/hooks/useAdmin';
import { ReactNode } from 'react';

/**
 * Component that will only render its children if the user is an admin
 */
export default function AdminOnly({ children }: { children: ReactNode }) {
  const { isAdmin, isLoading } = useAdmin();
  
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }
  
  if (!isAdmin) {
    return null;
  }
  
  return <>{children}</>;
} 