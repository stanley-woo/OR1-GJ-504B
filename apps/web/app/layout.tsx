import type { Metadata } from 'next';
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { AppSignOutButton } from './components/sign-out-button';
import { SearchBar } from './components/search-bar';
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
          <header className="grid grid-cols-3 h-16 items-center border-b border-zinc-200 bg-white px-4 text-zinc-900">
            <Link className="text-sm font-semibold tracking-wide justify-self-start" href="/">
              GJ 504B
            </Link>
            <Show when="signed-in">
              <div className="justify-self-center w-96">
                <SearchBar />
              </div>
            </Show>
            <div className="flex items-center gap-3 justify-self-end">
              <Show when="signed-in">
                <nav className="flex gap-6 me-4 justify-self-end">
                  <Link className="text-sm font-medium text-zinc-700 hover:text-zinc-900" href="/dashboard">Portfolio</Link>
                </nav>
              </Show>
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
