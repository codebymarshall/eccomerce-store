"use client";

import Button from "@/components/ui/Button";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface AccountFormProps {
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
}

export default function AccountForm({ user }: AccountFormProps) {
  const { update } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      await update();
      setIsEditing(false);
    } catch (error) {
      console.error("Profile update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-stone-500">Account Profile</h1>

      <div className="bg-stone-100 border rounded-lg p-6 opacity-90">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-stone-500"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={user.email}
              disabled
              className="mt-1 block w-full rounded-md text-stone-500 border-stone-300 shadow-sm focus:border-stone-900 focus:ring-stone-900 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-stone-500"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-md text-stone-500 border-stone-300 shadow-sm focus:border-stone-900 focus:ring-stone-900 sm:text-sm"
            />
          </div>

          <div className="flex justify-end gap-4">
            {isEditing ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setName(user.name || "");
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </>
            ) : (
              <Button type="button" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </div>
        </form>
      </div>
    </>
  );
} 