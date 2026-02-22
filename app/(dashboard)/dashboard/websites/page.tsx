// app/(dashboard)/dashboard/websites/page.tsx
// Full websites management page with per-site analytics

import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Site } from '@/types';
import { getBeroepLabel } from '@/constants';
import { PublishToggle } from '@/components/dashboard/PublishToggle';

export const metadata = { title: 'Mijn Websites' };

export default async function WebsitesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: sites } = await supabase
    .from('sites')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  // Fetch visit counts per site (last 30 days)
  const siteIds = (sites || []).map(s => s.id);
  const visitCounts: Record<string, number> = {};

  if (siteIds.length > 0) {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000).toISOString();
    const { data: visits } = await supabase
      .from('site_visits')
      .select('site_id')
      .in('site_id', siteIds)
      .gte('created_at', thirtyDaysAgo);

    if (visits) {
      visits.forEach(v => {
        visitCounts[v.site_id] = (visitCounts[v.site_id] || 0) + 1;
      });
    }
  }

  const hasSites = sites && sites.length > 0;

  return (
    <div className="space-y-6 max-w-[900px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Alle websites</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {sites?.length || 0} website{(sites?.length || 0) !== 1 ? 's' : ''} totaal
          </p>
        </div>
        <Link
          href="/wizard"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          Nieuwe website
        </Link>
      </div>

      {hasSites ? (
        <div className="space-y-3">
          {sites!.map((site) => (
            <SiteCard
              key={site.id}
              site={site as Site}
              views={visitCounts[site.id] || 0}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center">
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
      )}
    </div>
  );
}

function SiteCard({ site, views }: { site: Site; views: number }) {
  const { content } = site;
  const createdDate = new Date(site.created_at).toLocaleDateString('nl-NL', {
    day: 'numeric', month: 'short', year: 'numeric',
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200/60 hover:border-slate-300 transition-all group">
      <div className="p-5 flex items-start gap-4">
        {/* Preview thumbnail */}
        <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
          {content.foto ? (
            <img src={content.foto} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="text-lg font-bold text-slate-300">
              {(content.naam || '?').charAt(0)}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-semibold text-slate-900 truncate">
              {content.naam || 'Naamloze site'}
            </h3>
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

          <p className="text-xs text-slate-400 mb-2">{site.custom_domain || `${site.subdomain}.jouwzorgsite.nl`}</p>

          {/* Meta row */}
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">calendar_today</span>
              {createdDate}
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">work</span>
              {getBeroepLabel(site.beroep)}
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">visibility</span>
              {views} bezoekers (30d)
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          <Link
            href={`/edit/${site.id}`}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">edit</span>
            Bewerken
          </Link>
          <a
            href={site.custom_domain ? `https://${site.custom_domain}` : `/site/${site.subdomain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 border border-slate-200 transition-colors"
            title="Bekijken"
          >
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
          </a>
        </div>
      </div>

      {/* Bottom bar: publish toggle */}
      <div className="px-5 py-3 bg-slate-50/50 border-t border-slate-100 rounded-b-xl">
        <PublishToggle siteId={site.id} published={site.published} />
      </div>
    </div>
  );
}
