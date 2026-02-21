// app/(dashboard)/dashboard/gegevens/page.tsx
// Contactgegevens en zakelijke informatie bewerken

import { createClient } from '@/lib/supabase/server';
import { Site } from '@/types';
import Link from 'next/link';
import { GegevensForm } from './GegevensForm';

export const metadata = { title: 'Mijn Gegevens' };

interface PageProps {
  searchParams: { site?: string };
}

export default async function GegevensPage({ searchParams }: PageProps) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: sites } = await supabase
    .from('sites')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (!sites || sites.length === 0) {
    return (
      <div className="max-w-[600px] mx-auto mt-12 text-center">
        <p className="text-sm text-slate-500 mb-4">Je hebt nog geen website.</p>
        <Link href="/wizard" className="text-sm font-medium text-teal-600 hover:text-teal-700">
          Naar de wizard →
        </Link>
      </div>
    );
  }

  const selectedSiteId = searchParams.site || sites[0].id;
  const site = (sites.find(s => s.id === selectedSiteId) || sites[0]) as Site;

  return (
    <div className="max-w-[700px] space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Mijn gegevens</h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Deze gegevens worden getoond op je website en in de footer.
        </p>
      </div>

      {/* Multi-site selector */}
      {sites.length > 1 && (
        <div className="flex gap-2 flex-wrap">
          {sites.map(s => (
            <Link
              key={s.id}
              href={`/dashboard/gegevens?site=${s.id}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                s.id === site.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {(s as Site).content?.naam || s.subdomain}
            </Link>
          ))}
        </div>
      )}

      <GegevensForm siteId={site.id} content={site.content} />

      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
      >
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Terug naar dashboard
      </Link>
    </div>
  );
}
