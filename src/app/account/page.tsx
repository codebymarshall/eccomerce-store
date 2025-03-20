import AccountForm from "@/components/account/AccountForm";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    redirect("/login?callbackUrl=/account");
  }
  
  // Fetch user data directly from the database to ensure it's up-to-date
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true
    }
  });
  
  if (!user) {
    redirect("/login");
  }
  
  return <AccountForm user={user} />;
} 