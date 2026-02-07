// components/dashboard/DashboardTopbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from '@supabase/supabase-js';

// Page titles mapped to pathnames
const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Overzicht',
  '/dashboard/websites': 'Mijn websites',
  '/dashboard/dba-tools': 'DBA-Tools',
  '/dashboard/marketplace': 'Marketplace',
  '/dashboard/instellingen': 'Instellingen',
  '/dashboard/support': 'Hulp & Support',
};

export function DashboardTopbar({ user }: { user: User }) {
  const pathname = usePathname();

  // Match exact or starts-with for sub-routes
  const title = PAGE_TITLES[pathname] || 
    Object.entries(PAGE_TITLES).find(([k]) => pathname.startsWith(k))?.[1] || 
    'Dashboard';

  const initials = (user.user_metadata?.full_name || user.email || '??')
    .split(' ')
    .map((w: string) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 flex items-center justify-between px-6 lg:px-8">
      {/* Left: Page title */}
      <div>
        <h1 className="text-[15px] font-semibold text-slate-900">{title}</h1>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* New site */}
        <Link
          href="/wizard"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          Nieuwe site
        </Link>

        {/* Notifications placeholder */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          {/* Dot indicator */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-teal-500 rounded-full" />
        </button>

        {/* User avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center">
            <span className="text-[11px] font-bold text-white">{initials}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
