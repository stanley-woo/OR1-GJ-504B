import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/setup");
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-16 text-zinc-900">
      <section className="mx-auto flex max-w-5xl flex-col gap-10 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl space-y-6">
          <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
            Paper trading for U.S. equities
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Practice market orders with a clean paper account.
          </h1>
          <p className="text-lg leading-8 text-zinc-600">
            GJ 504B provisions a simulated brokerage account, keeps portfolio
            state server-owned, and prepares the workspace for live quote and
            order APIs.
          </p>
        </div>

        <div className="w-full max-w-sm rounded-lg bg-white p-5 shadow-sm ring-1 ring-zinc-200">
          <div className="mb-5 flex items-center justify-between border-b border-zinc-200 pb-4">
            <div>
              <p className="text-sm text-zinc-500">Starting Balance</p>
              <p className="text-2xl font-semibold">$10,000.00</p>
            </div>
            <span className="rounded-lg bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
              Active
            </span>
          </div>
          <dl className="space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-zinc-500">Market</dt>
              <dd className="font-medium">U.S. equities</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-zinc-500">Order Type</dt>
              <dd className="font-medium">Market orders</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-zinc-500">Currency</dt>
              <dd className="font-medium">USD</dd>
            </div>
          </dl>
        </div>
      </section>
    </main>
  );
}
