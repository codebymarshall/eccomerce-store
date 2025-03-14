"use client";

import Button from "@/components/ui/Button";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface OrderStatusProps {
  orderId: string;
  currentStatus: string;
}

const statuses = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELED"];

export default function OrderStatus({ orderId, currentStatus }: OrderStatusProps) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updateStatus = async (newStatus: string) => {
    if (newStatus === status) {
      setIsOpen(false);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      setStatus(newStatus);
      router.refresh();
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <div>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          disabled={isLoading}
          className="flex items-center justify-between w-40"
        >
          <span>{status}</span>
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </div>
      
      {isOpen && (
        <div className="absolute mt-1 w-40 bg-white border rounded-md shadow-lg z-10">
          <div className="py-1">
            {statuses.map((statusOption) => (
              <button
                key={statusOption}
                onClick={() => updateStatus(statusOption)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                  status === statusOption ? "font-semibold bg-gray-50" : ""
                }`}
              >
                {statusOption}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 