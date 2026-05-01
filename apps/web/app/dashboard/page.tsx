import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const user = await prisma.user.findUnique({
        where: { clerkId: userId },
        include: { account: true},
    });

    if (!user || !user.account) {
        redirect("/setup");
    }

    return (
        <main className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900">
            <div className="mx-auto max-w-4xl space-y-6">
                <header className="space-y-2">
                    <p className="text-sm uppercase tracking-wide text-zinc-500">
                        Dashboard
                    </p>
                    <h1 className="text-3xl font-semibold">
                        Welcome{user.firstName? `, ${user.firstName}` : ""}
                    </h1>
                    <p className="text-zinc-600">
                        Your paper trading account is ready.
                    </p>
                </header>

                <section className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200">
                        <p className="text-sm text-zinc-500">Buying Power</p>
                        <p className="mt-2 text-2xl font-semibold">
                            ${user.account.buyingPower.toString()}
                        </p>
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200">
                        <p className="text-sm text-zinc-500">Cash Balance</p>
                        <p className="mt-2 text-2xl font-semibold">
                            ${user.account.cashBalance.toString()}
                        </p>
                    </div>
                </section>
                
                <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200">
                    <p className="text-sm text-zinc-500">Account Status</p>
                    <p className="mt-2 text-lg font-medium">{user.account.status}</p>
                </section>
                
            </div>
        </main>
    );
}
