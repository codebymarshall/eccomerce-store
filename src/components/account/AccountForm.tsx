"use client";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
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
  const [email, setEmail] = useState(user.email || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Basic validation
    if (!email.trim() || !email.includes('@')) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update profile");
      }

      await update();
      setIsEditing(false);
    } catch (error: unknown) {
      console.error("Profile update error:", error);
      setError(error instanceof Error ? error.message : "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-stone-800">Account Profile</h1>

        <div className="bg-stone-900 border rounded-lg p-6">
          {error && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-stone-100"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md text-stone-100 border-stone-300 shadow-sm focus:border-stone-900 focus:ring-stone-900 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-stone-100"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md text-stone-100 border-stone-300 shadow-sm focus:border-stone-900 focus:ring-stone-900 sm:text-sm"
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
                      setEmail(user.email);
                      setError("");
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
      </div>
    </Container>
  );
} 