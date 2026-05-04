import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

import { redirect } from "next/navigation";

export default async function SetupGatePage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const clerkUser = await currentUser();

  if (!clerkUser) {
    redirect("/sign-in");
  }

  try {
    const primaryEmail = clerkUser.emailAddresses[0]?.emailAddress;

    if (!primaryEmail) {
      throw new Error("Missing email for Clerk user");
    }

    // 1.) Find User by clerkId
    let user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    // 2.) Create User if missing
    if (!user) {
      user = await prisma.user.create({
        data: {
          clerkId: userId,
          email: primaryEmail,
          firstName: clerkUser.firstName ?? null,
          lastName: clerkUser.lastName ?? null,
        },
      });
    }

    // 3.) Find BrokerageAccount for that user
    const account = await prisma.brokerageAccount.findUnique({
      where: { userId: user.id },
    });

    // 4.) Create if missing
    if (!account) {
      await prisma.brokerageAccount.create({
        data: {
          userId: user.id,
        },
      });
    }
    // 5.) Redirect to /dashboard once ready
  } catch {
    return (
      <main className="min-h-screen bg-zinc-50 px-6 py-16 text-zinc-900">
        <div className="mx-auto max-w-xl space-y-3 rounded-lg bg-white p-6 shadow-sm ring-1 ring-zinc-200">
          <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
            Setup
          </p>
          <h1 className="text-2xl font-semibold">
            We couldn&apos;t finish setting up your account.
          </h1>
          <p className="text-zinc-600">Please try again.</p>
        </div>
      </main>
    );
  }

  redirect("/dashboard");
}
