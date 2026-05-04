'use client';

import { useClerk } from "@clerk/nextjs";

export function AppSignOutButton() {
  const { signOut } = useClerk();

  return (
    <button
      type="button"
      className="h-9 rounded-lg border border-zinc-300 px-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100"
      onClick={() => signOut({ redirectUrl: "/" })}
    >
      Sign Out
    </button>
  );
}
