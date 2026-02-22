// app/(dashboard)/dashboard/kwaliteit/page.tsx
// Kwaliteit & Compliance pagina
// Laadt site + declaration data en rendert QualitySection

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Site } from '@/types';
import { QualitySection } from '@/components/dashboard/QualitySection';
import Link from 'next/link';

export const metadata = { title: 'Kwaliteit & Compliance - Dashboard' };

interface PageProps {
  searchParams: { site?: string };
}

export default async function KwaliteitPage({ searchParams }: PageProps) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Haal alle sites op van de gebruiker
  const { data: sites } = await supabase
    .from('sites')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const userSites = (sites || []) as Site[];

  // Bepaal actieve site (via query param of eerste site)
  const activeSiteId = searchParams.site || userSites[0]?.id;
  const activeSite = userSites.find(s => s.id === activeSiteId) || userSites[0];

  // Geen sites
  if (!activeSite) {
    return (
      <div className="space-y-8 max-w-[900px]">
        <Header />
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-[900px]">
      <Header />

      {/* Site Selector (als meerdere sites) */}
      {userSites.length > 1 && (
        <SiteSelector sites={userSites} activeSiteId={activeSite.id} />
      )}

      {/* Actieve site info */}
      <ActiveSiteBar site={activeSite} />

      {/* Quality Section (client component) */}
      <QualitySection site={activeSite} />
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SUB-COMPONENTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function Header() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <span className="material-symbols-outlined text-emerald-600">verified_user</span>
        <h2 className="text-lg font-semibold text-slate-900">Kwaliteit & Compliance</h2>
        <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 rounded">
          Nieuw
        </span>
      </div>
      <p className="text-sm text-slate-500">
        Beheer je professionele verklaringen, verifieer je BIG-registratie en activeer de
        vertrouwenswidget op je website.
      </p>
    </div>
  );
}

function SiteSelector({ sites, activeSiteId }: { sites: Site[]; activeSiteId: string }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1">
      {sites.map((site) => {
        const isActive = site.id === activeSiteId;
        return (
          <Link
            key={site.id}
            href={`/dashboard/kwaliteit?site=${site.id}`}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              isActive
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            {/* Mini avatar */}
            <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
              {site.content.foto ? (
                <img src={site.content.foto} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-[10px] font-bold text-slate-400">
                  {(site.content.naam || '?').charAt(0)}
                </span>
              )}
            </div>
            <span>{site.content.naam || site.subdomain}</span>
            {site.published && (
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0" />
            )}
          </Link>
        );
      })}
    </div>
  );
}

function ActiveSiteBar({ site }: { site: Site }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/60 p-4 flex items-center gap-4">
      {/* Avatar */}
      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
        {site.content.foto ? (
          <img src={site.content.foto} alt="" className="w-full h-full object-cover" />
        ) : (
          <span className="text-lg font-bold text-slate-400">
            {(site.content.naam || '?').charAt(0)}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-slate-900">{site.content.naam || 'Naamloze site'}</p>
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
        <p className="text-xs text-slate-400">{site.custom_domain || `${site.subdomain}.jouwzorgsite.nl`} · {site.beroep}</p>
      </div>

      {/* Link naar site */}
      <div className="flex items-center gap-2">
        <Link
          href={`/edit/${site.id}`}
          className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          title="Site bewerken"
        >
          <span className="material-symbols-outlined text-[18px]">edit</span>
        </Link>
        <a
          href={site.custom_domain ? `https://${site.custom_domain}` : `/site/${site.subdomain}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          title="Site bekijken"
        >
          <span className="material-symbols-outlined text-[18px]">open_in_new</span>
        </a>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="bg-white rounded-xl border border-dashed border-slate-300 p-10 text-center">
      <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <span className="material-symbols-outlined text-2xl text-emerald-400">verified_user</span>
      </div>
      <h3 className="text-sm font-semibold text-slate-900 mb-1">Nog geen websites</h3>
      <p className="text-xs text-slate-500 mb-4 max-w-sm mx-auto">
        Maak eerst een website aan. Daarna kun je hier je professionele verklaringen beheren
        en de vertrouwenswidget activeren.
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