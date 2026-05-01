import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

import { redirect} from "next/navigation";

export default async function SetupGatePage() {
  try {
    const { userId } = await auth();

    if (!userId) {
      redirect("/sign-in");
    }

    const clerkUser = await currentUser();

    if (!clerkUser) {
      redirect("/sign-in");
    }

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
    let acc = await prisma.brokerageAccount.findUnique({
      where: { userId: user.id },
    });

    // 4.) Create if missing
    if (!acc) {
      acc = await prisma.brokerageAccount.create({
        data: {
          userId: user.id,
        },
      });
    }
    // 5.) Redirect to /dashboard once ready
  } catch (e) {
    return (
      <main>
        <h1>We couldn&apos;t finish setting up your account.</h1>
        <p>Please try again.</p>
      </main>
    );
  }

  redirect("/dashboard");
}
