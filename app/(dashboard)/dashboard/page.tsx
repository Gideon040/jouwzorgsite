// app/(dashboard)/dashboard/page.tsx

import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Site } from '@/types';
import { Button, Card, CardContent, Badge } from '@/components/ui';
import { getBeroepLabel } from '@/constants';
import { PublishToggle } from '@/components/dashboard/PublishToggle';

export const metadata = {
  title: 'Dashboard',
};

export default async function DashboardPage() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  // Fetch user's sites
  const { data: sites } = await supabase
    .from('sites')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const hasSites = sites && sites.length > 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Mijn websites
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Beheer en bewerk je zorgwebsites
          </p>
        </div>
        <Link href="/wizard">
          <Button>
            <span className="material-symbols-outlined">add</span>
            Nieuwe website
          </Button>
        </Link>
      </div>

      {/* Sites Grid */}
      {hasSites ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sites.map((site) => (
            <SiteCard key={site.id} site={site as Site} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

// Site Card Component
function SiteCard({ site }: { site: Site }) {
  const { content } = site;
  const previewUrl = `/site/${site.subdomain}`;

  // Template color schemes for preview
  const templateColors = {
    warm: 'from-orange-100 to-orange-200',
    modern: 'from-blue-100 to-blue-200',
    editorial: 'from-slate-700 to-slate-800',
  };

  const templateTextColors = {
    warm: 'text-orange-600',
    modern: 'text-blue-600',
    editorial: 'text-slate-300',
  };

  const colorScheme = templateColors[site.template_id as keyof typeof templateColors] || templateColors.warm;
  const textColor = templateTextColors[site.template_id as keyof typeof templateTextColors] || templateTextColors.warm;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {/* Preview Header - Styled preview instead of screenshot */}
      <div className={`h-36 bg-gradient-to-br ${colorScheme} p-4 flex flex-col justify-between relative`}>
        {/* Mini preview */}
        <div className="flex items-center gap-3">
          {content.foto ? (
            <img 
              src={content.foto} 
              alt={content.naam} 
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
            />
          ) : (
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold bg-white/50 ${textColor}`}>
              {content.naam?.charAt(0) || '?'}
            </div>
          )}
          <div>
            <p className={`font-bold text-sm ${site.template_id === 'editorial' ? 'text-white' : 'text-slate-800'}`}>
              {content.naam || 'Naam'}
            </p>
            <p className={`text-xs ${site.template_id === 'editorial' ? 'text-slate-300' : 'text-slate-600'} truncate max-w-[150px]`}>
              {content.tagline || 'Tagline'}
            </p>
          </div>
        </div>
        
        {/* Template badge */}
        <div className="absolute bottom-2 right-2">
          <span className={`text-xs px-2 py-1 rounded-full bg-white/80 ${textColor} font-medium capitalize`}>
            {site.template_id}
          </span>
        </div>
      </div>

      <CardContent className="p-5">
        {/* Status Badge & Beroep */}
        <div className="flex items-center justify-between mb-3">
          <Badge variant={site.published ? 'success' : 'warning'}>
            <span className="material-symbols-outlined text-sm mr-1">
              {site.published ? 'public' : 'edit_note'}
            </span>
            {site.published ? 'Live' : 'Concept'}
          </Badge>
          <span className="text-xs text-slate-500">
            {getBeroepLabel(site.beroep)}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
          {content.naam || 'Naamloze site'}
        </h3>

        {/* URL */}
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 truncate">
          {site.subdomain}.jouwzorgsite.nl
        </p>

        {/* Publish Toggle */}
        <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
          <PublishToggle siteId={site.id} published={site.published} />
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link href={`/edit/${site.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              <span className="material-symbols-outlined text-lg">edit</span>
              Bewerken
            </Button>
          </Link>
          <a href={previewUrl} target="_blank" rel="noopener noreferrer" title="Preview bekijken">
            <Button variant="secondary" size="sm">
              <span className="material-symbols-outlined text-lg">visibility</span>
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

// Empty State Component
function EmptyState() {
  return (
    <Card variant="outline" className="p-12 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-3xl text-primary">web</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          Je hebt nog geen websites
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">
          Maak je eerste professionele zorgwebsite in slechts 10 minuten.
        </p>
        <Link href="/wizard">
          <Button size="lg">
            <span className="material-symbols-outlined">add</span>
            Maak je eerste website
          </Button>
        </Link>
      </div>
    </Card>
  );
}
