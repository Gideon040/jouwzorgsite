// app/(auth)/layout.tsx

import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#fafaf9] flex flex-col">
      {/* Header */}
      <header className="w-full bg-white border-b border-stone-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img src="/logo.png" alt="JouwZorgSite" className="h-7" />
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors"
            >
              Inloggen
            </Link>
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-br from-teal-600 to-[#0f766e] text-white text-sm font-semibold shadow-sm shadow-teal-600/20 hover:shadow-md transition-all"
            >
              Gratis proberen
            </Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        {children}
      </main>

      {/* Subtle background accents */}
      <div className="fixed top-0 right-0 -z-10 w-96 h-96 bg-teal-500/[0.03] blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 left-0 -z-10 w-72 h-72 bg-teal-500/[0.04] blur-[100px] rounded-full pointer-events-none" />
    </div>
  );
}
