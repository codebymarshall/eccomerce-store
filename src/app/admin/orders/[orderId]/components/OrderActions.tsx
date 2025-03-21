"use client";

import Button from "@/components/ui/Button";
import { Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface OrderActionsProps {
  orderId: string;
}

export default function OrderActions({ orderId }: OrderActionsProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  
  const handleEdit = () => {
    router.push(`/admin/orders/${orderId}/edit`);
  };
  
  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    
    setIsDeleting(true);
    
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error("Failed to delete order");
      }
      
      router.push("/admin/orders");
      router.refresh();
    } catch (error) {
      console.error("Error deleting order:", error);
      setIsDeleting(false);
      setConfirmDelete(false);
    }
  };
  
  return (
    <div className="flex space-x-2">
      <Button onClick={handleEdit} variant="outline" size="sm">
        <Pencil className="mr-1 h-4 w-4" />
        Edit
      </Button>
      
      {confirmDelete ? (
        <Button 
          onClick={handleDelete} 
          variant="danger" 
          size="sm"
          isLoading={isDeleting}
        >
          Confirm Delete
        </Button>
      ) : (
        <Button 
          onClick={handleDelete} 
          variant="outline" 
          size="sm"
          className="text-red-500 border-red-300 hover:bg-red-50"
        >
          <Trash className="mr-1 h-4 w-4" />
          Delete
        </Button>
      )}
    </div>
  );
} 