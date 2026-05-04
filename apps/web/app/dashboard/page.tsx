import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { account: true },
  });

  if (!user || !user.account) {
    redirect("/setup");
  }

  const buyingPower = currencyFormatter.format(user.account.buyingPower.toNumber());
  const cashBalance = currencyFormatter.format(user.account.cashBalance.toNumber());

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
            Dashboard
          </p>
          <h1 className="text-3xl font-semibold">
            Welcome{user.firstName ? `, ${user.firstName}` : ""}
          </h1>
          <p className="text-zinc-600">Your paper trading account is ready.</p>
        </header>

        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-zinc-200">
            <p className="text-sm text-zinc-500">Buying Power</p>
            <p className="mt-2 text-2xl font-semibold">{buyingPower}</p>
          </div>

          <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-zinc-200">
            <p className="text-sm text-zinc-500">Cash Balance</p>
            <p className="mt-2 text-2xl font-semibold">{cashBalance}</p>
          </div>

          <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-zinc-200">
            <p className="text-sm text-zinc-500">Account Status</p>
            <p className="mt-2 text-2xl font-semibold">{user.account.status}</p>
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-zinc-200">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-zinc-500">Paper Account</p>
              <h2 className="mt-1 text-xl font-semibold">
                {user.account.baseCurrency} account opened
              </h2>
            </div>
            <p className="text-sm text-zinc-500">
              {user.account.openedAt.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
