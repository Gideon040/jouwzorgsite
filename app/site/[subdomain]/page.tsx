// app/site/[subdomain]/page.tsx

import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { SiteRenderer } from '@/components/templates';
import { Site } from '@/types';
import { SiteStyleInjector } from '@/components/site/SiteStyleInjector';
import { SiteTracker } from '@/components/site/SiteTracker';

interface SitePageProps {
  params: {
    subdomain: string;
  };
}

export async function generateMetadata({ params }: SitePageProps) {
  const supabase = await createClient();

  const { data: site } = await supabase
    .from('sites')
    .select('content, beroep, published, generated_content')
    .eq('subdomain', params.subdomain.toLowerCase())
    .single();

  if (!site) {
    return { title: 'Niet gevonden' };
  }

  const content = site.content as any;
  const gen = (site.generated_content || content.generated || {}) as any;
  const seo = gen.seo as { metaTitle?: string; metaDescription?: string } | undefined;

  const title = seo?.metaTitle || `${content.naam} - ${content.tagline}`;
  const description = seo?.metaDescription || content.over_mij?.slice(0, 160) || content.tagline;

  return {
    title,
    description,
    robots: site.published ? 'index, follow' : 'noindex, nofollow',
    openGraph: {
      title: seo?.metaTitle || content.naam,
      description: seo?.metaDescription || content.tagline,
      type: 'website',
      images: content.foto ? [{ url: content.foto }] : [],
    },
  };
}

export default async function SitePage({ params }: SitePageProps) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  const { data: site, error } = await supabase
    .from('sites')
    .select('*')
    .eq('subdomain', params.subdomain.toLowerCase())
    .single();

  if (error || !site) {
    notFound();
  }

  const isOwner = user?.id === site.user_id;
  const canView = site.published || isOwner;

  if (!canView) {
    notFound();
  }

  const showPreviewBanner = !site.published && isOwner;

  // Extract custom editor data
  const gen = (site.generated_content || {}) as any;
  const customImages: Record<string, string> | undefined = gen.customImages;
  const customTexts: Record<string, string> | undefined = gen.customTexts;
  const customButtons: Record<string, any> | undefined = gen.customButtons;
  const customStyles: Record<string, string> | undefined = gen.customStyles;
  const hasCustomizations = customImages || customTexts || customButtons || customStyles;

  return (
    <>
      {showPreviewBanner && (
        <div className="fixed top-0 left-0 right-0 z-[100] bg-amber-500 text-amber-900 px-4 py-2 text-center text-sm font-medium shadow-lg">
          <span className="inline-flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">visibility</span>
            Dit is een preview - je site is nog niet gepubliceerd
            <a href="/dashboard" className="underline hover:no-underline ml-2">
              Terug naar dashboard
            </a>
          </span>
        </div>
      )}
      
      <div className={showPreviewBanner ? 'pt-10' : ''}>
        <div className="site-content">
          <SiteRenderer site={site as Site} />
        </div>
      </div>

      {/* All customizations applied client-side AFTER hydration = no mismatch */}
      {hasCustomizations && (
        <SiteStyleInjector
          customImages={customImages}
          customTexts={customTexts}
          customButtons={customButtons}
          customStyles={customStyles}
        />
      )}

      {/* Track page view — only on published sites, not for owner */}
      {site.published && !isOwner && (
        <SiteTracker siteId={site.id} />
      )}
    </>
  );
}

export const dynamic = 'force-dynamic';
