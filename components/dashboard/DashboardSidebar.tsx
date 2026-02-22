// components/dashboard/DashboardSidebar.tsx

'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  const navItems = [
    { href: '/dashboard', icon: 'space_dashboard', label: 'Overzicht' },
    { href: '/dashboard/websites', icon: 'language', label: 'Mijn websites' },
    { href: '/dashboard/kwaliteit', icon: 'verified_user', label: 'Kwaliteit', badge: 'Nieuw' },
    { href: '/dashboard/dba-tools', icon: 'shield', label: 'DBA-Tools', badge: 'Nieuw' },
  ];

  const bottomItems = [
    { href: '/dashboard/gegevens', icon: 'contact_mail', label: 'Mijn gegevens' },
    { href: '/dashboard/instellingen', icon: 'settings', label: 'Instellingen' },
    { href: '/faq', icon: 'quiz', label: 'FAQ' },
    { href: '/dashboard/support', icon: 'help', label: 'Hulp & Support' },
  ];

  return (
    <aside className="fixed top-0 left-0 bottom-0 w-[240px] bg-stone-900 flex flex-col z-40 overflow-hidden">
      {/* Subtle teal radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 30% 0%, rgba(13,148,136,0.08) 0%, transparent 60%)' }}
      />

      {/* Logo */}
      <div className="relative px-6 pt-6 pb-2 mb-6">
        <Link href="/dashboard" className="flex items-center">
          <img src="/logo.png" alt="JouwZorgSite" className="h-[70px] brightness-0 invert" />
        </Link>
      </div>

      {/* Main nav */}
      <nav className="flex-1 relative px-3 space-y-0.5">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`group relative flex items-center gap-3 px-3 py-2.5 mx-0 rounded-lg text-[14px] transition-all ${
              isActive(item.href)
                ? 'bg-white/[0.08] text-white font-medium'
                : 'text-white/55 hover:text-white hover:bg-white/[0.04] font-normal'
            }`}
          >
            {/* Active left bar indicator */}
            {isActive(item.href) && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r bg-teal-300" />
            )}
            <span className={`material-symbols-outlined text-[20px] ${
              isActive(item.href) ? 'text-white' : 'text-white/40'
            }`}>
              {item.icon}
            </span>
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <span className="text-[10px] font-semibold uppercase tracking-wide text-white px-[7px] py-[2px] rounded-full bg-gradient-to-r from-teal-500 to-teal-300 ml-auto">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </nav>

      {/* Bottom nav */}
      <div className="relative px-3 py-4 border-t border-white/[0.06] space-y-0.5">
        {bottomItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] transition-all ${
              isActive(item.href)
                ? 'bg-white/[0.08] text-white font-medium'
                : 'text-white/45 hover:text-white/70 hover:bg-white/[0.04] font-normal'
            }`}
          >
            <span className={`material-symbols-outlined text-[20px] ${
              isActive(item.href) ? 'text-white' : 'text-white/40'
            }`}>
              {item.icon}
            </span>
            <span className="flex-1">{item.label}</span>
          </Link>
        ))}

        {/* Uitloggen */}
        <button
          onClick={handleLogout}
          className="w-full group flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] text-white/45 hover:text-red-300 hover:bg-white/[0.04] font-normal transition-all"
        >
          <span className="material-symbols-outlined text-[20px] text-white/40 group-hover:text-red-300">
            logout
          </span>
          <span className="flex-1 text-left">Uitloggen</span>
        </button>
      </div>
    </aside>
  );
}
