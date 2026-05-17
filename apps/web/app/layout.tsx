import type { Metadata } from 'next';
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { AppSignOutButton } from './components/sign-out-button';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'GJ 504B',
  description: 'A paper-trading workspace for U.S. equities.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClerkProvider>
          <header className="flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-4 text-zinc-900">
            <Link className="text-sm font-semibold tracking-wide" href="/">
              GJ 504B
            </Link>
            <Show when="signed-in">
              <form className="max-w-md mx-auto">
                <label htmlFor="search" className="sr-only">Search</label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-zinc-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="search"
                    className="block w-full p-3 ps-9 bg-zinc-100 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 shadow-sm placeholder:text-zinc-500"
                    placeholder="Search Stocks"
                  />
                </div>
              </form>
            </Show>
            <Show when="signed-in">
              <nav className="flex gap-6 me-4">
                <Link className="text-sm font-medium text-zinc-700 hover:text-zinc-900" href="/dashboard">Portfolio</Link>
                {/* <Link className="text-sm font-medium text-zinc-700 hover:text-zin-900 gap-6" href="/">Account</Link> */}
              </nav>
            </Show>
            <div className="flex items-center gap-3">
              <Show when="signed-out">
                <SignInButton />
                <SignUpButton />
              </Show>
              <Show when="signed-in">
                <UserButton />
                <AppSignOutButton />
              </Show>
            </div>
          </header>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
