// app/(dashboard)/dashboard/page.tsx

import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Site } from '@/types';
import { PublishToggle } from '@/components/dashboard/PublishToggle';

export const metadata = { title: 'Dashboard - Mijn Website' };

interface PageProps {
  searchParams: { site?: string };
}

export default async function DashboardOverviewPage({ searchParams }: PageProps) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: sites } = await supabase
    .from('sites')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const hasSites = sites && sites.length > 0;
  const firstName = user.user_metadata?.full_name?.split(' ')[0] || 'daar';

  if (!hasSites) {
    return <EmptyState firstName={firstName} />;
  }

  const selectedSiteId = searchParams.site || sites[0].id;
  const site = (sites.find(s => s.id === selectedSiteId) || sites[0]) as Site;

  let todayViews = 0;
  let weekViews = 0;
  let monthViews = 0;

  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString();
    const monthAgo = new Date(Date.now() - 30 * 86400000).toISOString();

    const [todayResult, weekResult, monthResult] = await Promise.all([
      supabase
        .from('site_visits')
        .select('*', { count: 'exact', head: true })
        .eq('site_id', site.id)
        .gte('created_at', todayStart.toISOString()),
      supabase
        .from('site_visits')
        .select('*', { count: 'exact', head: true })
        .eq('site_id', site.id)
        .gte('created_at', weekAgo),
      supabase
        .from('site_visits')
        .select('*', { count: 'exact', head: true })
        .eq('site_id', site.id)
        .gte('created_at', monthAgo),
    ]);

    todayViews = todayResult.count || 0;
    weekViews = weekResult.count || 0;
    monthViews = monthResult.count || 0;
  } catch {
    // site_visits table may not exist
  }

  return (
    <div className="max-w-[960px] mx-auto">
      {/* Multi-site selector */}
      {sites.length > 1 && (
        <div className="flex gap-2 flex-wrap mb-6">
          {sites.map(s => (
            <Link
              key={s.id}
              href={`/dashboard?site=${s.id}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                s.id === site.id
                  ? 'bg-stone-900 text-white'
                  : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-300'
              }`}
            >
              {(s as Site).content?.naam || s.subdomain}
            </Link>
          ))}
        </div>
      )}

      {/* ── Welcome Card (dark) ───────────────── */}
      <div className="relative rounded-2xl overflow-hidden mb-7" style={{ background: 'linear-gradient(135deg, #1c1917 0%, #292524 100%)' }}>
        {/* Decorative radials */}
        <div className="absolute -right-5 -top-5 w-[180px] h-[180px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(45,212,191,0.12) 0%, transparent 70%)' }} />
        <div className="absolute right-[60px] -bottom-10 w-[120px] h-[120px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)' }} />

        <div className="relative px-8 py-7 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-[26px] font-semibold text-stone-50 font-logo leading-tight tracking-tight">
              Welkom terug, {firstName}
            </h1>
            <div className="flex items-center gap-2 mt-2.5">
              <a
                href={site.custom_domain ? `https://${site.custom_domain}` : `https://${site.subdomain}.jouwzorgsite.nl`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] font-medium text-teal-300 hover:text-teal-200 transition-colors"
              >
                {site.custom_domain || `${site.subdomain}.jouwzorgsite.nl`}
              </a>
              {site.published ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-300 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse" />
                  Live
                </span>
              ) : (
                <span className="text-[11px] font-semibold uppercase tracking-wide text-stone-400 bg-white/5 px-2 py-0.5 rounded-full">
                  Concept
                </span>
              )}
            </div>
          </div>
          <div className="sm:min-w-[200px]">
            <PublishToggle siteId={site.id} published={site.published} />
          </div>
        </div>
      </div>

      {/* ── Snelle acties ─────────────────────── */}
      <div className="mb-7">
        <h2 className="text-[13px] font-semibold text-stone-500 uppercase tracking-wider mb-3.5">Snelle acties</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <QuickActionCard
            href={`/edit/${site.id}`}
            icon={<IconEdit />}
            title="Site bewerken"
            desc="Teksten, foto's en kleuren"
            color="#0d9488"
            bg="#f0fdfa"
          />
          <QuickActionCard
            href={`/dashboard/wizard/${site.id}`}
            icon={<IconSparkle />}
            title="AI Wizard"
            desc="Laat AI je site verbeteren"
            color="#8b5cf6"
            bg="#f5f3ff"
          />
          <QuickActionCard
            href={site.custom_domain ? `https://${site.custom_domain}` : `/site/${site.subdomain}`}
            icon={<IconEye />}
            title="Site bekijken"
            desc="Bekijk je live website"
            color="#2563eb"
            bg="#eff6ff"
            external
          />
        </div>
      </div>

      {/* ── Beheer + Stats ────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">
        {/* Tools grid */}
        <div>
          <h2 className="text-[13px] font-semibold text-stone-500 uppercase tracking-wider mb-3.5">Beheer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <ToolCard
              href={`/dashboard/gegevens?site=${site.id}`}
              icon={<IconUser />}
              title="Mijn gegevens"
              desc="Contact & zakelijke info"
              color="#059669"
            />
            <ToolCard
              href={`/dashboard/kwaliteit?site=${site.id}`}
              icon={<IconShield />}
              title="Kwaliteitskeurmerk"
              desc="Toon dat je aan eisen voldoet"
              color="#0891b2"
            />
            <ToolCard
              href={`/dashboard/domein?site=${site.id}`}
              icon={<IconGlobe />}
              title="Eigen domein"
              desc="Koppel je eigen .nl domein"
              color="#7c3aed"
            />
            <ToolCard
              href="/dashboard/dba-tools"
              icon={<IconTool />}
              title="DBA-Tools"
              desc="Binnenkort beschikbaar"
              color="#94a3b8"
              disabled
            />
          </div>
        </div>

        {/* Stats panel */}
        <div>
          <h2 className="text-[13px] font-semibold text-stone-500 uppercase tracking-wider mb-3.5">Bezoekers</h2>
          <StatsPanel todayViews={todayViews} weekViews={weekViews} monthViews={monthViews} />
        </div>
      </div>
    </div>
  );
}


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SVG ICONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function IconEdit() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

function IconSparkle() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z" />
    </svg>
  );
}

function IconEye() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconUser() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function IconTool() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function IconChart() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
    </svg>
  );
}


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CARD COMPONENTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function QuickActionCard({
  href,
  icon,
  title,
  desc,
  color,
  bg,
  external,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  color: string;
  bg: string;
  external?: boolean;
}) {
  const inner = (
    <>
      <div
        className="w-10 h-10 rounded-[10px] flex items-center justify-center mb-3.5"
        style={{ background: bg, color }}
      >
        {icon}
      </div>
      <div className="text-[15px] font-semibold text-stone-900 tracking-tight mb-0.5">{title}</div>
      <div className="text-[13px] text-stone-500">{desc}</div>
    </>
  );

  const className = `block p-5 rounded-xl border border-stone-200 bg-white transition-all hover:-translate-y-0.5 hover:shadow-lg cursor-pointer`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {inner}
    </Link>
  );
}

function ToolCard({
  href,
  icon,
  title,
  desc,
  color,
  disabled,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  color: string;
  disabled?: boolean;
}) {
  const inner = (
    <div className={`flex items-center gap-3.5 ${disabled ? 'opacity-50' : ''}`}>
      <div className="flex-shrink-0" style={{ color }}>
        {icon}
      </div>
      <div>
        <div className="text-[14px] font-semibold text-stone-900 tracking-tight">{title}</div>
        <div className="text-[12px] text-stone-400 mt-0.5">{desc}</div>
      </div>
    </div>
  );

  if (disabled) {
    return (
      <div className="p-4 rounded-xl border border-stone-200 bg-[#fafaf9] cursor-default">
        {inner}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className="block p-4 rounded-xl border border-stone-200 bg-white transition-all hover:shadow-sm cursor-pointer"
    >
      {inner}
    </Link>
  );
}


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STATS PANEL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function StatsPanel({
  todayViews,
  weekViews,
  monthViews,
}: {
  todayViews: number;
  weekViews: number;
  monthViews: number;
}) {
  const bars = [20, 35, 15, 45, 30, 55, 25, 40, 50, 35, 60, 45, 30, 55];

  return (
    <div className="p-5 rounded-xl border border-stone-200 bg-white h-full">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
          <IconChart />
        </div>
        <div>
          <div className="text-[28px] font-semibold text-stone-900 font-logo leading-none tracking-tight">
            {monthViews}
          </div>
          <div className="text-[12px] text-stone-400">bezoekers deze maand</div>
        </div>
      </div>

      {/* Mini chart */}
      <div className="h-[60px] rounded-lg flex items-end px-1 pb-1 gap-[3px] mb-4" style={{ background: 'linear-gradient(180deg, #fef9ee 0%, #fff 100%)' }}>
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-[3px] opacity-25"
            style={{
              height: `${h}%`,
              background: 'linear-gradient(180deg, #fbbf24 0%, #fde68a 100%)',
            }}
          />
        ))}
      </div>

      {/* Stats rows */}
      <div className="flex flex-col gap-0">
        {[
          { label: 'Vandaag', value: todayViews },
          { label: 'Deze week', value: weekViews },
          { label: 'Deze maand', value: monthViews },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className={`flex justify-between items-center py-1.5 ${i < 2 ? 'border-b border-stone-100' : ''}`}
          >
            <span className="text-[13px] text-stone-500">{stat.label}</span>
            <span className="text-[14px] font-semibold text-stone-900">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EMPTY STATE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function EmptyState({ firstName }: { firstName: string }) {
  return (
    <div className="max-w-[600px] mx-auto mt-12">
      <div className="bg-white rounded-2xl border border-dashed border-stone-300 p-12 text-center">
        <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <span className="material-symbols-outlined text-3xl text-stone-400">web</span>
        </div>
        <h2 className="text-lg font-semibold font-logo text-stone-900 mb-2">
          Welkom, {firstName}!
        </h2>
        <p className="text-sm text-stone-500 mb-6 max-w-sm mx-auto">
          Je hebt nog geen website. Maak je eerste professionele zorgwebsite in een paar stappen.
        </p>
        <Link
          href="/wizard"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl transition-colors"
          style={{ background: 'linear-gradient(135deg, #0d9488, #0f766e)' }}
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Maak je eerste website
        </Link>
      </div>
    </div>
  );
}
