// app/(dashboard)/dashboard/domein/page.tsx
// Eigen domein registreren via TransIP

import { createClient } from '@/lib/supabase/server';
import { Site } from '@/types';
import Link from 'next/link';
import { DomeinManager } from './DomeinManager';

export const metadata = { title: 'Eigen Domein' };

interface PageProps {
  searchParams: { site?: string };
}

export default async function DomeinPage({ searchParams }: PageProps) {
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
        <p className="text-sm text-slate-500 mb-4">Je hebt nog geen website. Maak eerst een site aan.</p>
        <Link href="/wizard" className="text-sm font-medium text-teal-600 hover:text-teal-700">
          Naar de wizard →
        </Link>
      </div>
    );
  }

  const selectedSiteId = searchParams.site || sites[0].id;
  const site = (sites.find(s => s.id === selectedSiteId) || sites[0]) as Site;

  // Check subscription plan
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('plan')
    .eq('user_id', user.id)
    .in('status', ['active'])
    .maybeSingle();

  const isProfessional = subscription?.plan === 'professional' || subscription?.plan === 'expert';

  // Check if site already has a custom domain record
  let domainRecord: { domain: string; status: string } | null = null;
  const { data: domainData } = await supabase
    .from('custom_domains')
    .select('domain, status')
    .eq('site_id', site.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (domainData) {
    domainRecord = domainData;
  }

  return (
    <div className="max-w-[700px] space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Eigen domein</h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Registreer een eigen domeinnaam voor je website.
        </p>
      </div>

      {/* Multi-site selector */}
      {sites.length > 1 && (
        <div className="flex gap-2 flex-wrap">
          {sites.map(s => (
            <Link
              key={s.id}
              href={`/dashboard/domein?site=${s.id}`}
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

      {/* Huidig domein */}
      <div className="bg-white rounded-xl border border-slate-200/60 p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="material-symbols-outlined text-slate-400 text-xl">language</span>
          <h3 className="text-sm font-semibold text-slate-900">Huidig adres</h3>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
            <span className="material-symbols-outlined text-teal-500 text-lg">check_circle</span>
            <div>
              <p className="text-sm font-medium text-slate-900">{site.subdomain}.jouwzorgsite.nl</p>
              <p className="text-xs text-slate-500">Gratis subdomein — altijd actief</p>
            </div>
          </div>

          {(site.custom_domain || domainRecord) && (
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <span className={`material-symbols-outlined text-lg ${
                domainRecord?.status === 'active' ? 'text-emerald-500' : 'text-amber-500'
              }`}>
                {domainRecord?.status === 'active' ? 'check_circle' : 'pending'}
              </span>
              <div>
                <p className="text-sm font-medium text-slate-900">
                  {site.custom_domain || domainRecord?.domain}
                </p>
                <p className="text-xs text-slate-500">
                  {domainRecord?.status === 'active'
                    ? 'Eigen domein — actief'
                    : domainRecord?.status === 'dns_configuring'
                    ? 'DNS wordt geconfigureerd (kan tot 24 uur duren)'
                    : domainRecord?.status === 'registering'
                    ? 'Wordt geregistreerd...'
                    : 'Eigen domein'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Domain zoeken + registreren */}
      {!site.custom_domain && isProfessional && (
        <DomeinManager
          siteId={site.id}
          naam={site.content?.naam || ''}
          beroep={site.beroep || ''}
        />
      )}

      {/* Upgrade prompt voor starter plan */}
      {!site.custom_domain && !isProfessional && (
        <div className="bg-white rounded-xl border border-slate-200/60 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
              <span className="material-symbols-outlined text-xl text-violet-600">diamond</span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Eigen domein koppelen</h3>
              <p className="text-xs text-slate-500">Beschikbaar vanaf het Professional abonnement</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mb-4">
            Met het Professional abonnement kun je een eigen .nl domein registreren en koppelen aan je website.
            Bijvoorbeeld: <strong>{site.content?.naam?.toLowerCase().replace(/\s+/g, '') || 'jouwnaam'}.nl</strong>
          </p>
          <Link
            href="/dashboard/instellingen"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}
          >
            <span className="material-symbols-outlined text-base">upgrade</span>
            Upgrade naar Professional
          </Link>
        </div>
      )}

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
