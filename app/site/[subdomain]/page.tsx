// app/site/[subdomain]/page.tsx

import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { SiteRenderer } from '@/components/templates';
import { Site } from '@/types';

interface SitePageProps {
  params: {
    subdomain: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: SitePageProps) {
  const supabase = await createClient();
  
  const { data: site } = await supabase
    .from('sites')
    .select('content, beroep, published')
    .eq('subdomain', params.subdomain.toLowerCase())
    .single();

  if (!site) {
    return {
      title: 'Niet gevonden',
    };
  }

  const content = site.content as any;

  return {
    title: `${content.naam} - ${content.tagline}`,
    description: content.over_mij?.slice(0, 160) || content.tagline,
    // Don't index unpublished sites
    robots: site.published ? 'index, follow' : 'noindex, nofollow',
    openGraph: {
      title: content.naam,
      description: content.tagline,
      type: 'website',
      images: content.foto ? [{ url: content.foto }] : [],
    },
  };
}

export default async function SitePage({ params }: SitePageProps) {
  const supabase = await createClient();
  
  // Get current user (if logged in)
  const { data: { user } } = await supabase.auth.getUser();
  
  // Fetch the site data
  const { data: site, error } = await supabase
    .from('sites')
    .select('*')
    .eq('subdomain', params.subdomain.toLowerCase())
    .single();

  // Show 404 if site not found
  if (error || !site) {
    notFound();
  }

  // Check if user can view the site:
  // - Published sites: anyone can view
  // - Unpublished sites: only the owner can view
  const isOwner = user?.id === site.user_id;
  const canView = site.published || isOwner;

  if (!canView) {
    notFound();
  }

  // Show preview banner for owners viewing unpublished sites
  const showPreviewBanner = !site.published && isOwner;

  return (
    <>
      {/* Preview Banner */}
      {showPreviewBanner && (
        <div className="fixed top-0 left-0 right-0 z-[100] bg-amber-500 text-amber-900 px-4 py-2 text-center text-sm font-medium shadow-lg">
          <span className="inline-flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">visibility</span>
            Dit is een preview - je site is nog niet gepubliceerd
            <a 
              href="/dashboard" 
              className="underline hover:no-underline ml-2"
            >
              Terug naar dashboard
            </a>
          </span>
        </div>
      )}
      
      {/* Add padding when preview banner is shown */}
      <div className={showPreviewBanner ? 'pt-10' : ''}>
        <SiteRenderer site={site as Site} />
      </div>
    </>
  );
}

// Optionally generate static paths for published sites (for ISR)
export async function generateStaticParams() {
  // For now, don't pre-generate - render on demand
  return [];
}

// Revalidate every 60 seconds for ISR
export const revalidate = 60;
