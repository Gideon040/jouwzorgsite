'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function DashboardSidebar() {
  const pathname = usePathname();
  
  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  const navItems = [
    { href: '/dashboard', icon: 'space_dashboard', label: 'Overzicht' },
    { href: '/dashboard/websites', icon: 'language', label: 'Mijn websites' },
    { href: '/dashboard/dba-tools', icon: 'shield', label: 'DBA-Tools', badge: 'Nieuw' },
  ];

  return (
    <aside className="fixed top-0 left-0 bottom-0 w-[240px] bg-slate-950 flex flex-col z-40">
      <div className="px-5 h-16 flex items-center border-b border-white/[0.06]">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">JZ</span>
          </div>
          <span className="text-[13px] font-semibold text-white tracking-tight">JouwZorgSite</span>
        </Link>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all ${
              isActive(item.href) ? 'bg-white/[0.08] text-white' : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <span className={`material-symbols-outlined text-[20px] ${isActive(item.href) ? 'text-teal-400' : 'text-slate-500'}`}>
              {item.icon}
            </span>
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-teal-500/20 text-teal-400 rounded">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </aside>
  );
}