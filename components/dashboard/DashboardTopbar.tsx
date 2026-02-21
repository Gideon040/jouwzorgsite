// components/dashboard/DashboardTopbar.tsx

'use client';

import Link from 'next/link';
import { User } from '@supabase/supabase-js';

export function DashboardTopbar({ user }: { user: User }) {
  const initials = (user.user_metadata?.full_name || user.email || '??')
    .split(' ')
    .map((w: string) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#fafaf9] border-b border-stone-200 flex items-center justify-between px-8">
      {/* Left: empty spacer */}
      <div />

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* New site button */}
        <Link
          href="/wizard"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold text-white rounded-lg transition-all"
          style={{
            background: 'linear-gradient(135deg, #0d9488, #0f766e)',
            boxShadow: '0 1px 3px rgba(13,148,136,0.3), 0 4px 12px rgba(13,148,136,0.15)',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Nieuwe site
        </Link>

        {/* User avatar */}
        <div
          className="w-[34px] h-[34px] rounded-full flex items-center justify-center cursor-pointer"
          style={{ background: 'linear-gradient(135deg, #0d9488, #2dd4bf)' }}
        >
          <span className="text-[14px] font-semibold text-white">{initials}</span>
        </div>
      </div>
    </header>
  );
}
