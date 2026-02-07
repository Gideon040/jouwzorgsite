// app/(dashboard)/dashboard/page.tsx
// Overview page: stats, recent sites, quick actions

import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Site } from '@/types';
import { getBeroepLabel } from '@/constants';
import { PublishToggle } from '@/components/dashboard/PublishToggle';

export const metadata = { title: 'Dashboard - Overzicht' };

export default async function DashboardOverviewPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  // Fetch sites
  const { data: sites } = await supabase
    .from('sites')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  // Fetch total visits (last 30 days) for all user's sites
  const siteIds = (sites || []).map(s => s.id);
  let totalViews = 0;
  let todayViews = 0;
  let weekViews = 0;
  let deviceBreakdown: Record<string, number> = {};

  if (siteIds.length > 0) {
    // Total last 30 days
    const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000).toISOString();
    const { count: total30 } = await supabase
      .from('site_visits')
      .select('*', { count: 'exact', head: true })
      .in('site_id', siteIds)
      .gte('created_at', thirtyDaysAgo);
    totalViews = total30 || 0;

    // Today
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const { count: todayCount } = await supabase
      .from('site_visits')
      .select('*', { count: 'exact', head: true })
      .in('site_id', siteIds)
      .gte('created_at', todayStart.toISOString());
    todayViews = todayCount || 0;

    // This week
    const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString();
    const { count: weekCount } = await supabase
      .from('site_visits')
      .select('*', { count: 'exact', head: true })
      .in('site_id', siteIds)
      .gte('created_at', weekAgo);
    weekViews = weekCount || 0;

    // Device breakdown
    const { data: devices } = await supabase
      .from('site_visits')
      .select('device')
      .in('site_id', siteIds)
      .gte('created_at', thirtyDaysAgo);
    if (devices) {
      devices.forEach(d => {
        deviceBreakdown[d.device || 'unknown'] = (deviceBreakdown[d.device || 'unknown'] || 0) + 1;
      });
    }
  }

  const publishedCount = (sites || []).filter(s => s.published).length;
  const hasSites = sites && sites.length > 0;
  const firstName = user.user_metadata?.full_name?.split(' ')[0] || 'daar';

  return (
    <div className="space-y-8 max-w-[1100px]">
      {/* Greeting */}
      <div>
        <h2 className="text-xl font-semibold text-slate-900">
          Goedemorgen, {firstName} 👋
        </h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Hier is een overzicht van je websites en bezoekers.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon="language"
          label="Websites"
          value={sites?.length || 0}
          sub={`${publishedCount} live`}
          color="teal"
        />
        <StatCard
          icon="visibility"
          label="Bezoekers vandaag"
          value={todayViews}
          sub="pageviews"
          color="blue"
        />
        <StatCard
          icon="trending_up"
          label="Deze week"
          value={weekViews}
          sub="pageviews"
          color="violet"
        />
        <StatCard
          icon="bar_chart"
          label="30 dagen"
          value={totalViews}
          sub="totaal"
          color="amber"
        />
      </div>

      {/* Main Grid: Sites + Sidebar */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sites — 2/3 width */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900">Mijn websites</h3>
            {hasSites && (
              <Link
                href="/wizard"
                className="text-xs font-medium text-teal-600 hover:text-teal-700"
              >
                + Nieuwe site
              </Link>
            )}
          </div>

          {hasSites ? (
            <div className="space-y-3">
              {sites!.slice(0, 5).map((site) => (
                <SiteRow key={site.id} site={site as Site} />
              ))}
              {sites!.length > 5 && (
                <Link
                  href="/dashboard/websites"
                  className="block text-center py-2.5 text-xs font-medium text-slate-500 hover:text-slate-700 bg-white rounded-xl border border-slate-200/60 hover:border-slate-300 transition-colors"
                >
                  Bekijk alle {sites!.length} websites →
                </Link>
              )}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>

        {/* Sidebar — 1/3 width */}
        <div className="space-y-4">
          {/* Device breakdown */}
          {totalViews > 0 && (
            <div className="bg-white rounded-xl border border-slate-200/60 p-5">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                Apparaten (30d)
              </h4>
              <div className="space-y-3">
                {[
                  { key: 'desktop', icon: 'computer', label: 'Desktop' },
                  { key: 'mobile', icon: 'smartphone', label: 'Mobiel' },
                  { key: 'tablet', icon: 'tablet_mac', label: 'Tablet' },
                ].map(({ key, icon, label }) => {
                  const count = deviceBreakdown[key] || 0;
                  const pct = totalViews > 0 ? Math.round((count / totalViews) * 100) : 0;
                  return (
                    <div key={key}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[16px] text-slate-400">{icon}</span>
                          <span className="text-xs font-medium text-slate-700">{label}</span>
                        </div>
                        <span className="text-xs font-semibold text-slate-900">{pct}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-teal-500 rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-slate-200/60 p-5">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Snelle acties
            </h4>
            <div className="space-y-1.5">
              <QuickAction href="/wizard" icon="add_circle" label="Nieuwe website maken" />
              <QuickAction href="/dashboard/dba-tools" icon="shield" label="DBA-check uitvoeren" badge="Nieuw" />
              <QuickAction href="/dashboard/instellingen" icon="settings" label="Account instellingen" />
            </div>
          </div>

          {/* DBA-Tools Promo */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-5 text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-teal-400 text-lg">shield</span>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">DBA-Tools</span>
            </div>
            <p className="text-sm font-medium mb-1">Check je inbeddingsrisico</p>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              AI-analyse of jouw werkrelatie als schijnzelfstandigheid kan worden gezien.
            </p>
            <Link
              href="/dashboard/dba-tools"
              className="inline-flex items-center gap-1 text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors"
            >
              Start analyse →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COMPONENTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function StatCard({
  icon, label, value, sub, color,
}: {
  icon: string; label: string; value: number; sub: string;
  color: 'teal' | 'blue' | 'violet' | 'amber';
}) {
  const colors = {
    teal:   { bg: 'bg-teal-50',   icon: 'text-teal-600',   ring: 'ring-teal-500/10' },
    blue:   { bg: 'bg-blue-50',   icon: 'text-blue-600',   ring: 'ring-blue-500/10' },
    violet: { bg: 'bg-violet-50', icon: 'text-violet-600', ring: 'ring-violet-500/10' },
    amber:  { bg: 'bg-amber-50',  icon: 'text-amber-600',  ring: 'ring-amber-500/10' },
  };
  const c = colors[color];

  return (
    <div className={`bg-white rounded-xl border border-slate-200/60 p-4 ring-1 ${c.ring}`}>
      <div className={`w-9 h-9 ${c.bg} rounded-lg flex items-center justify-center mb-3`}>
        <span className={`material-symbols-outlined text-[20px] ${c.icon}`}>{icon}</span>
      </div>
      <p className="text-2xl font-bold text-slate-900 tracking-tight">{value.toLocaleString('nl-NL')}</p>
      <div className="flex items-center gap-1.5 mt-0.5">
        <span className="text-xs text-slate-500">{label}</span>
        <span className="text-[10px] text-slate-400">· {sub}</span>
      </div>
    </div>
  );
}

function SiteRow({ site }: { site: Site }) {
  const { content } = site;
  return (
    <div className="bg-white rounded-xl border border-slate-200/60 p-4 flex items-center gap-4 hover:border-slate-300 transition-colors group">
      {/* Avatar */}
      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
        {content.foto ? (
          <img src={content.foto} alt="" className="w-full h-full object-cover" />
        ) : (
          <span className="text-sm font-bold text-slate-400">
            {(content.naam || '?').charAt(0)}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-slate-900 truncate">{content.naam || 'Naamloze site'}</p>
          {site.published ? (
            <span className="flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 rounded">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              Live
            </span>
          ) : (
            <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 rounded">
              Concept
            </span>
          )}
        </div>
        <p className="text-xs text-slate-400 truncate">{site.subdomain}.jouwzorgsite.nl</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <Link
          href={`/edit/${site.id}`}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          title="Bewerken"
        >
          <span className="material-symbols-outlined text-[18px]">edit</span>
        </Link>
        <a
          href={`/site/${site.subdomain}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          title="Bekijken"
        >
          <span className="material-symbols-outlined text-[18px]">open_in_new</span>
        </a>
      </div>
    </div>
  );
}

function QuickAction({
  href, icon, label, badge,
}: {
  href: string; icon: string; label: string; badge?: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2.5 -mx-1 rounded-lg text-sm text-slate-700 hover:bg-slate-50 transition-colors group"
    >
      <span className="material-symbols-outlined text-[18px] text-slate-400 group-hover:text-slate-600">{icon}</span>
      <span className="flex-1 text-[13px] font-medium">{label}</span>
      {badge && (
        <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-teal-500/10 text-teal-600 rounded">
          {badge}
        </span>
      )}
    </Link>
  );
}

function EmptyState() {
  return (
    <div className="bg-white rounded-xl border border-dashed border-slate-300 p-10 text-center">
      <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <span className="material-symbols-outlined text-2xl text-slate-400">web</span>
      </div>
      <h3 className="text-sm font-semibold text-slate-900 mb-1">Nog geen websites</h3>
      <p className="text-xs text-slate-500 mb-4">
        Maak je eerste professionele zorgwebsite in 3 stappen.
      </p>
      <Link
        href="/wizard"
        className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
      >
        <span className="material-symbols-outlined text-[16px]">add</span>
        Maak je eerste website
      </Link>
    </div>
  );
}
