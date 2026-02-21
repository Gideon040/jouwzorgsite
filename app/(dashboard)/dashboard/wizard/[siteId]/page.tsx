// app/(dashboard)/dashboard/wizard/[siteId]/page.tsx
// AI Wizard v2: Section-based 3-phase wizard for regenerating site content

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Textarea, Badge, ImageUpload } from '@/components/ui';
import { SiteRenderer } from '@/components/templates';
import { Site, SiteContent, GeneratedContent, Theme, Contact, Dienst, Certificaat, Werkervaring, Testimonial, CertificaatType, WerkwijzeStap, FaqItem, Doelgroep, DoelgroepType } from '@/types';
import { BEROEPEN, getBeroepLabel } from '@/constants';
import { getDienstenForBeroep } from '@/constants/diensten';
import { CERTIFICAAT_TYPES, getCertificaatTypeConfig } from '@/constants/certificaten';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';

// ── Stijl options (from StepStijlKeuze) ──

const STIJL_OPTIONS = [
  {
    id: 'warm',
    label: 'Warm & Klassiek',
    description: 'Vertrouwd en persoonlijk',
    icon: 'favorite',
    gradient: 'from-[#5a7c6f] to-[#b8860b]',
  },
  {
    id: 'calm',
    label: 'Rustig & Sereen',
    description: 'Rustgevend en zen',
    icon: 'spa',
    gradient: 'from-[#3d4a3d] to-[#86927c]',
  },
  {
    id: 'modern',
    label: 'Modern & Energiek',
    description: 'Dynamisch en eigentijds',
    icon: 'bolt',
    gradient: 'from-[#007fa9] to-[#f26632]',
  },
  {
    id: 'zakelijk',
    label: 'Zakelijk & Elegant',
    description: 'Sophisticated en premium',
    icon: 'business_center',
    gradient: 'from-[#1a3a2f] to-[#699838]',
  },
  {
    id: 'energiek',
    label: 'Organisch & Warm',
    description: 'Uitnodigend en natuurlijk',
    icon: 'eco',
    gradient: 'from-[#5a7c5a] to-[#d4644a]',
  },
] as const;

const templateToStijl: Record<string, string> = {
  editorial: 'warm',
  serene: 'calm',
  proactief: 'modern',
  portfolio: 'zakelijk',
  mindoor: 'energiek',
};

// ── SectionCard component ──

function SectionCard({
  id,
  icon,
  title,
  description,
  required,
  filled,
  expanded,
  onToggle,
  children,
}: {
  id: string;
  icon: string;
  title: string;
  description: string;
  required?: boolean;
  filled: boolean;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border transition-all',
        expanded ? 'border-primary/30 shadow-sm' : 'border-slate-200/60 hover:border-slate-300'
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-4 text-left"
      >
        <div
          className={cn(
            'w-10 h-10 rounded-lg flex items-center justify-center',
            filled ? 'bg-emerald-50' : 'bg-slate-50'
          )}
        >
          <span
            className={cn(
              'material-symbols-outlined text-xl',
              filled ? 'text-emerald-600' : 'text-slate-400'
            )}
          >
            {icon}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-900">
            {title}
            {required && <span className="text-red-400 ml-1">*</span>}
          </p>
          <p className="text-xs text-slate-500">{description}</p>
        </div>
        <span
          className={cn(
            'px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider',
            filled ? 'bg-emerald-50 text-emerald-600' : 'bg-primary/10 text-primary'
          )}
        >
          {filled ? 'Ingevuld' : 'AI vult in'}
        </span>
        <span
          className={cn(
            'material-symbols-outlined text-slate-400 transition-transform',
            expanded && 'rotate-180'
          )}
        >
          expand_more
        </span>
      </button>
      {expanded && (
        <div className="px-4 pb-5 border-t border-slate-100 pt-4 space-y-4">{children}</div>
      )}
    </div>
  );
}

// ── Main page ──

interface WizardPageProps {
  params: { siteId: string };
}

export default function AIWizardPage({ params }: WizardPageProps) {
  const router = useRouter();

  // Phase
  const [phase, setPhase] = useState<'loading' | 'essentials' | 'sections' | 'generating' | 'preview'>('loading');

  // Basis (fase 1)
  const [beroep, setBeroep] = useState('');
  const [customBeroep, setCustomBeroep] = useState('');
  const [naam, setNaam] = useState('');
  const [foto, setFoto] = useState<string | undefined>();
  const [stijlKeuze, setStijlKeuze] = useState('warm');

  // Secties (fase 2)
  const [contact, setContact] = useState<Partial<Contact>>({});
  const [diensten, setDiensten] = useState<Dienst[]>([]);
  const [overMij, setOverMij] = useState('');
  const [expertises, setExpertises] = useState<string[]>([]);
  const [startCarriere, setStartCarriere] = useState<number | undefined>();
  const [beschikbaar, setBeschikbaar] = useState(true);
  const [certificaten, setCertificaten] = useState<Certificaat[]>([]);
  const [werkervaring, setWerkervaring] = useState<Werkervaring[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  // Werkwijze, FAQ, Voor wie (editable AI sections)
  const [werkwijzeStappen, setWerkwijzeStappen] = useState<WerkwijzeStap[]>([]);
  const [faqItems, setFaqItems] = useState<FaqItem[]>([]);
  const [doelgroepen, setDoelgroepen] = useState<Doelgroep[]>([]);

  // UI
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['contact']));

  // Generatie
  const [site, setSite] = useState<Site | null>(null);
  const [previewSite, setPreviewSite] = useState<Site | null>(null);
  const [regenerateCount, setRegenerateCount] = useState(0);
  const [cachedAnalyse, setCachedAnalyse] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  // Inline form state
  const [newWerkgebied, setNewWerkgebied] = useState('');
  const [newExpertise, setNewExpertise] = useState('');
  const [newDienstNaam, setNewDienstNaam] = useState('');
  const [newDienstBeschrijving, setNewDienstBeschrijving] = useState('');
  const [newCertType, setNewCertType] = useState<CertificaatType | ''>('');
  const [newCertValue, setNewCertValue] = useState('');
  const [newWeFunctie, setNewWeFunctie] = useState('');
  const [newWeWerkgever, setNewWeWerkgever] = useState('');
  const [newWeStartJaar, setNewWeStartJaar] = useState('');
  const [newWeEindJaar, setNewWeEindJaar] = useState('');
  const [newTestTekst, setNewTestTekst] = useState('');
  const [newTestNaam, setNewTestNaam] = useState('');
  const [newTestFunctie, setNewTestFunctie] = useState('');
  const [newStapTitel, setNewStapTitel] = useState('');
  const [newStapBeschrijving, setNewStapBeschrijving] = useState('');
  const [newFaqVraag, setNewFaqVraag] = useState('');
  const [newFaqAntwoord, setNewFaqAntwoord] = useState('');
  const [newDoelgroepTitel, setNewDoelgroepTitel] = useState('');
  const [newDoelgroepTekst, setNewDoelgroepTekst] = useState('');

  // ── Load site ──
  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const { data, error: fetchError } = await supabase
        .from('sites')
        .select('*')
        .eq('id', params.siteId)
        .single();

      if (fetchError || !data) {
        router.push('/dashboard');
        return;
      }

      const s = data as Site;
      setSite(s);

      // Pre-fill state
      setBeroep(s.beroep || '');
      setNaam(s.content?.naam || '');
      setFoto(s.content?.foto || undefined);
      setStijlKeuze(templateToStijl[s.template_id] || 'warm');
      setContact(s.content?.contact || {});
      setDiensten(s.content?.diensten || []);
      setOverMij(s.content?.over_mij || '');
      setExpertises(s.content?.expertises || []);
      setStartCarriere(s.content?.start_carriere);
      setBeschikbaar(s.content?.beschikbaar ?? true);
      setCertificaten(s.content?.certificaten || []);
      setWerkervaring(s.content?.werkervaring || []);
      setTestimonials(s.content?.testimonials || []);

      // Pre-fill werkwijze/faq/voorwie from generated content
      const gen = s.generated_content || s.content?.generated;
      if (gen?.werkwijze?.stappen?.length) {
        setWerkwijzeStappen(gen.werkwijze.stappen);
      }
      if (gen?.faq?.items?.length) {
        setFaqItems(gen.faq.items);
      }
      if (gen?.voorWie?.doelgroepen?.length) {
        setDoelgroepen(gen.voorWie.doelgroepen);
      }

      // Cache analyse
      const meta = (s.generated_content as any)?._meta;
      if (meta?.analyse) {
        setCachedAnalyse(meta.analyse);
      }

      // If beroep and naam exist, skip essentials
      if (s.beroep && s.content?.naam) {
        setPhase('sections');
      } else {
        setPhase('essentials');
      }
    };
    load();
  }, [params.siteId, router]);

  // ── Toggle section ──
  const toggleSection = useCallback((id: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  // ── Filled checks ──
  const isContactFilled = !!(contact.email);
  const isDienstenFilled = diensten.length > 0;
  const isOverMijFilled = !!(overMij || expertises.length > 0);
  const isCertificatenFilled = certificaten.length > 0;
  const isWerkervaringFilled = werkervaring.length > 0;
  const isTestimonialsFilled = testimonials.length > 0;
  const isWerkwijzeFilled = werkwijzeStappen.length > 0;
  const isFaqFilled = faqItems.length > 0;
  const isVoorWieFilled = doelgroepen.length > 0;

  // ── Generate ──
  const handleGenerate = async () => {
    setPhase('generating');
    setIsGenerating(true);
    setError('');

    try {
      const supabase = createClient();
      const actualBeroep = beroep === 'anders' ? customBeroep : beroep;

      const jarenErvaring = startCarriere
        ? new Date().getFullYear() - startCarriere
        : undefined;

      const { data: generated, error: genError } = await supabase.functions.invoke(
        'generate-site',
        {
          body: {
            naam,
            beroep: actualBeroep,
            email: contact.email || undefined,
            telefoon: contact.telefoon || undefined,
            werkgebied: contact.werkgebied?.length ? contact.werkgebied : undefined,
            diensten: diensten.length
              ? diensten.map((d) => ({ naam: d.naam, beschrijving: d.beschrijving }))
              : undefined,
            certificaten: certificaten.length
              ? certificaten.map((c) => ({ type: c.type, label: c.label, value: c.value }))
              : undefined,
            werkervaring: werkervaring.length
              ? werkervaring.map((w) => ({
                  functie: w.functie,
                  werkgever: w.werkgever,
                  startJaar: w.startJaar || w.start_jaar,
                  eindJaar: w.eindJaar || w.eind_jaar,
                }))
              : undefined,
            expertises: expertises.length ? expertises : undefined,
            jarenErvaring,
            persoonlijkeNoot: overMij || undefined,
            tagline: site?.content?.tagline || undefined,
            stijlKeuze,
            cachedAnalyse,
            regeneration: true,
            regenerationCount: regenerateCount,
          },
        }
      );

      if (genError || !generated) {
        console.error('Edge function error:', genError);
        setError('Er ging iets mis bij het genereren. Probeer het opnieuw.');
        setPhase('sections');
        setIsGenerating(false);
        return;
      }

      // Process response
      const generatedContent = generated.generated_content as GeneratedContent;
      const generatedTheme = generated.theme as Theme;
      const generatedTemplateId = generated.template_id || site!.template_id;

      // Cache analyse
      if (generated._meta?.analyse) {
        setCachedAnalyse(generated._meta.analyse);
      }

      // Build enriched content
      const enrichedContent: any = {
        ...(site?.content || {}),
        naam,
        foto,
        contact,
        diensten,
        over_mij: overMij,
        expertises,
        start_carriere: startCarriere,
        beschikbaar,
        certificaten,
        werkervaring,
        testimonials,
      };

      const gen = generatedContent;
      if (gen?.hero?.subtitel && !enrichedContent.tagline) {
        enrichedContent.tagline = gen.hero.subtitel;
      }
      if (gen?.overMij) {
        enrichedContent.over_mij = `${gen.overMij.intro || ''}\n\n${gen.overMij.body || ''}${gen.overMij.persoonlijk ? '\n\n' + gen.overMij.persoonlijk : ''}`;
      }
      if (gen?.diensten?.items && enrichedContent.diensten.length === 0) {
        enrichedContent.diensten = gen.diensten.items;
      }
      if (gen?.testimonials?.items && enrichedContent.testimonials.length === 0) {
        enrichedContent.testimonials = gen.testimonials.items.map((t: any) => ({
          tekst: t.tekst,
          naam: t.naam,
          functie: t.functie,
        }));
      }
      // Override AI sections with user-provided data
      if (werkwijzeStappen.length > 0 && gen?.werkwijze) {
        gen.werkwijze.stappen = werkwijzeStappen;
      }
      if (faqItems.length > 0 && gen?.faq) {
        gen.faq.items = faqItems;
      }
      if (doelgroepen.length > 0 && gen?.voorWie) {
        gen.voorWie.doelgroepen = doelgroepen;
      }

      enrichedContent.generated = gen;

      // Build preview
      const preview: Site = {
        ...site!,
        template_id: generatedTemplateId,
        theme: generatedTheme,
        generated_content: generatedContent,
        content: enrichedContent as SiteContent,
      };

      setPreviewSite(preview);
      setIsGenerating(false);
      setPhase('preview');
    } catch (err) {
      console.error('Generate error:', err);
      setError('Er ging iets mis bij het genereren. Probeer het opnieuw.');
      setPhase('sections');
      setIsGenerating(false);
    }
  };

  // ── Save ──
  const handleSave = async () => {
    if (!previewSite) return;
    setIsSaving(true);
    setError('');

    try {
      const actualBeroep = beroep === 'anders' ? customBeroep : beroep;
      const { updateSite } = await import('@/lib/actions/sites');

      const result = await updateSite(site!.id, {
        template_id: previewSite.template_id,
        beroep: actualBeroep,
        content: previewSite.content,
        generated_content: previewSite.generated_content,
        theme: previewSite.theme,
      });

      if (result.error) {
        setError(result.error);
        setIsSaving(false);
        return;
      }

      router.push('/dashboard');
    } catch (err) {
      console.error('Save error:', err);
      setError('Er ging iets mis bij het opslaan. Probeer het opnieuw.');
      setIsSaving(false);
    }
  };

  // ── Regenerate ──
  const handleRegenerate = () => {
    if (regenerateCount >= 3) return;
    setRegenerateCount((prev) => prev + 1);
    setPreviewSite(null);
    handleGenerate();
  };

  // ── Back to sections ──
  const handleBackToSections = () => {
    setPhase('sections');
    setPreviewSite(null);
  };

  // ════════════════════════════════════════
  // RENDER: Loading
  // ════════════════════════════════════════
  if (phase === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-sm text-slate-500">Site laden...</p>
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════
  // RENDER: Generating
  // ════════════════════════════════════════
  if (phase === 'generating') {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-3xl text-primary animate-pulse">
              auto_fix_high
            </span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            Je website wordt gegenereerd...
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            AI schrijft unieke teksten en kiest het perfecte design op basis van jouw profiel. Dit
            duurt ongeveer 15-30 seconden.
          </p>
          <div className="mt-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════
  // RENDER: Preview
  // ════════════════════════════════════════
  if (phase === 'preview' && previewSite) {
    return (
      <div className="space-y-0">
        {/* Action bar */}
        <div className="sticky top-16 z-20 bg-white border-b border-slate-200 px-6 py-3">
          <div className="flex items-center justify-between max-w-[1200px] mx-auto">
            <div className="flex items-center gap-3">
              <button
                onClick={handleBackToSections}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                Terug naar secties
              </button>
              <div className="h-5 w-px bg-slate-200" />
              <p className="text-xs text-slate-500">Preview van je nieuwe website</p>
            </div>

            <div className="flex items-center gap-2">
              {regenerateCount < 3 && (
                <Button variant="outline" size="sm" onClick={handleRegenerate} disabled={isGenerating}>
                  <span className="material-symbols-outlined text-[16px]">refresh</span>
                  Opnieuw genereren ({3 - regenerateCount} over)
                </Button>
              )}
              <Button size="sm" onClick={handleSave} isLoading={isSaving}>
                <span className="material-symbols-outlined text-[16px]">check</span>
                Opslaan
              </Button>
            </div>
          </div>

          {error && (
            <div className="mt-2 p-3 rounded-lg bg-red-50 border border-red-200">
              <p className="text-xs text-red-600 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">error</span>
                {error}
              </p>
            </div>
          )}
        </div>

        {/* Preview */}
        <div className="border border-slate-200 rounded-lg overflow-hidden mx-4 my-4 shadow-lg">
          <SiteRenderer site={previewSite} />
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════
  // RENDER: Essentials (fase 1)
  // ════════════════════════════════════════
  if (phase === 'essentials') {
    const canContinue = beroep && (beroep !== 'anders' || customBeroep.trim()) && naam.trim();

    return (
      <div className="flex flex-col items-center py-8 px-4 sm:px-6">
        <div className="w-full max-w-[640px] flex flex-col gap-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-primary text-xl">auto_fix_high</span>
              <h2 className="text-lg font-bold text-slate-900">AI Wizard</h2>
            </div>
            <p className="text-sm text-slate-500">
              Vertel ons over jezelf zodat de AI je website kan maken.
            </p>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center gap-2">
            <div className="h-1 flex-1 bg-primary rounded-full" />
            <div className="h-1 flex-1 bg-slate-200 rounded-full" />
            <div className="h-1 flex-1 bg-slate-200 rounded-full" />
          </div>

          {/* Beroep */}
          <div className="bg-white rounded-xl border border-slate-200/60 p-5 space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-primary text-lg">work</span>
              <h3 className="text-sm font-semibold text-slate-900">Beroep</h3>
              <span className="text-red-400 text-xs">*</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {BEROEPEN.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setBeroep(b.id)}
                  className={cn(
                    'flex items-center gap-2.5 p-3 rounded-lg border text-left transition-all text-sm',
                    beroep === b.id
                      ? 'border-primary bg-primary/5 text-primary font-semibold'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  )}
                >
                  <span className={cn('material-symbols-outlined text-lg', beroep === b.id ? 'text-primary' : 'text-slate-400')}>
                    {b.icon}
                  </span>
                  {b.label}
                </button>
              ))}
            </div>
            {beroep === 'anders' && (
              <Input
                placeholder="Jouw beroep..."
                value={customBeroep}
                onChange={(e) => setCustomBeroep(e.target.value)}
              />
            )}
          </div>

          {/* Naam & Foto */}
          <div className="bg-white rounded-xl border border-slate-200/60 p-5 space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-primary text-lg">person</span>
              <h3 className="text-sm font-semibold text-slate-900">Naam & Foto</h3>
              <span className="text-red-400 text-xs">*</span>
            </div>
            <Input
              label="Je naam"
              placeholder="Bijv. Lisa de Vries"
              value={naam}
              onChange={(e) => setNaam(e.target.value)}
              icon="badge"
            />
            <ImageUpload
              label="Profielfoto"
              hint="Een professionele foto maakt je site persoonlijker"
              value={foto}
              onChange={(url) => setFoto(url || undefined)}
            />
          </div>

          {/* Stijl */}
          <div className="bg-white rounded-xl border border-slate-200/60 p-5 space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-primary text-lg">palette</span>
              <h3 className="text-sm font-semibold text-slate-900">Stijl</h3>
              <span className="text-red-400 text-xs">*</span>
            </div>
            <div className="grid gap-2">
              {STIJL_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setStijlKeuze(option.id)}
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-lg border text-left transition-all',
                    stijlKeuze === option.id
                      ? 'border-primary bg-primary/5'
                      : 'border-slate-200 hover:border-slate-300'
                  )}
                >
                  <div
                    className={cn(
                      'w-9 h-9 rounded-lg bg-gradient-to-br flex-shrink-0 flex items-center justify-center',
                      option.gradient
                    )}
                  >
                    <span className="material-symbols-outlined text-white text-lg">{option.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={cn(
                        'text-sm font-semibold',
                        stijlKeuze === option.id ? 'text-primary' : 'text-slate-900'
                      )}
                    >
                      {option.label}
                    </p>
                    <p className="text-xs text-slate-500">{option.description}</p>
                  </div>
                  <div
                    className={cn(
                      'w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center',
                      stijlKeuze === option.id ? 'border-primary bg-primary' : 'border-slate-300'
                    )}
                  >
                    {stijlKeuze === option.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-2">
            <Button variant="outline" onClick={() => router.push('/dashboard')}>
              <span className="material-symbols-outlined">close</span>
              Annuleren
            </Button>
            <Button onClick={() => setPhase('sections')} disabled={!canContinue}>
              Volgende
              <span className="material-symbols-outlined">arrow_forward</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════
  // RENDER: Sections (fase 2)
  // ════════════════════════════════════════
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: currentYear - 1979 }, (_, i) => currentYear - i);

  return (
    <div className="flex flex-col items-center py-8 px-4 sm:px-6">
      <div className="w-full max-w-[640px] flex flex-col gap-5">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-primary text-xl">auto_fix_high</span>
            <h2 className="text-lg font-bold text-slate-900">AI Wizard</h2>
          </div>
          <p className="text-sm text-slate-500">
            Vul de secties in die je wilt personaliseren. De rest genereert de AI voor je.
            {naam && (
              <span className="font-medium text-slate-700"> — {naam}</span>
            )}
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center gap-2">
          <div className="h-1 flex-1 bg-primary rounded-full" />
          <div className="h-1 flex-1 bg-primary rounded-full" />
          <div className="h-1 flex-1 bg-slate-200 rounded-full" />
        </div>

        {/* ── Section Cards ── */}

        {/* 1. Contact & Werkgebied */}
        <SectionCard
          id="contact"
          icon="call"
          title="Contact & Werkgebied"
          description="E-mail, telefoon en werkgebied"
          required
          filled={isContactFilled}
          expanded={expandedSections.has('contact')}
          onToggle={() => toggleSection('contact')}
        >
          <Input
            label="E-mailadres"
            placeholder="jouw@email.nl"
            type="email"
            icon="mail"
            value={contact.email || ''}
            onChange={(e) => setContact((prev) => ({ ...prev, email: e.target.value }))}
          />
          <Input
            label="Telefoonnummer"
            placeholder="06-12345678"
            icon="phone"
            value={contact.telefoon || ''}
            onChange={(e) => setContact((prev) => ({ ...prev, telefoon: e.target.value }))}
          />
          <div className="space-y-2">
            <label className="text-slate-900 text-base font-semibold">Werkgebied</label>
            <div className="flex gap-2">
              <Input
                placeholder="Bijv. Amsterdam"
                value={newWerkgebied}
                onChange={(e) => setNewWerkgebied(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (newWerkgebied.trim()) {
                      setContact((prev) => ({
                        ...prev,
                        werkgebied: [...(prev.werkgebied || []), newWerkgebied.trim()],
                      }));
                      setNewWerkgebied('');
                    }
                  }
                }}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (newWerkgebied.trim()) {
                    setContact((prev) => ({
                      ...prev,
                      werkgebied: [...(prev.werkgebied || []), newWerkgebied.trim()],
                    }));
                    setNewWerkgebied('');
                  }
                }}
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
              </Button>
            </div>
            {(contact.werkgebied?.length ?? 0) > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {contact.werkgebied!.map((w, i) => (
                  <Badge key={i} variant="primary" size="sm">
                    {w}
                    <button
                      type="button"
                      onClick={() =>
                        setContact((prev) => ({
                          ...prev,
                          werkgebied: prev.werkgebied?.filter((_, idx) => idx !== i),
                        }))
                      }
                      className="ml-1 hover:text-red-500"
                    >
                      <span className="material-symbols-outlined text-xs">close</span>
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </SectionCard>

        {/* 2. Diensten */}
        <SectionCard
          id="diensten"
          icon="medical_services"
          title="Diensten"
          description="Welke diensten bied je aan?"
          filled={isDienstenFilled}
          expanded={expandedSections.has('diensten')}
          onToggle={() => toggleSection('diensten')}
        >
          {/* Preset checkboxes */}
          {beroep && (
            <div className="space-y-2">
              <label className="text-slate-900 text-sm font-semibold">Snelkeuze</label>
              <div className="grid grid-cols-2 gap-1.5">
                {getDienstenForBeroep(beroep).map((preset) => {
                  const isSelected = diensten.some((d) => d.naam === preset.naam);
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        if (isSelected) {
                          setDiensten((prev) => prev.filter((d) => d.naam !== preset.naam));
                        } else {
                          setDiensten((prev) => [
                            ...prev,
                            { naam: preset.naam, beschrijving: preset.beschrijving, icon: preset.icon },
                          ]);
                        }
                      }}
                      className={cn(
                        'flex items-center gap-2 p-2.5 rounded-lg border text-left text-xs transition-all',
                        isSelected
                          ? 'border-primary bg-primary/5 text-primary font-semibold'
                          : 'border-slate-200 hover:border-slate-300 text-slate-600'
                      )}
                    >
                      <span className={cn('material-symbols-outlined text-sm', isSelected ? 'text-primary' : 'text-slate-400')}>
                        {isSelected ? 'check_circle' : 'radio_button_unchecked'}
                      </span>
                      {preset.naam}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Custom dienst */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-slate-900 text-sm font-semibold">Eigen dienst toevoegen</label>
            <Input
              placeholder="Naam van de dienst"
              value={newDienstNaam}
              onChange={(e) => setNewDienstNaam(e.target.value)}
            />
            <Input
              placeholder="Korte beschrijving (optioneel)"
              value={newDienstBeschrijving}
              onChange={(e) => setNewDienstBeschrijving(e.target.value)}
            />
            <Button
              variant="outline"
              size="sm"
              disabled={!newDienstNaam.trim()}
              onClick={() => {
                setDiensten((prev) => [
                  ...prev,
                  { naam: newDienstNaam.trim(), beschrijving: newDienstBeschrijving.trim() || undefined },
                ]);
                setNewDienstNaam('');
                setNewDienstBeschrijving('');
              }}
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              Toevoegen
            </Button>
          </div>

          {/* List */}
          {diensten.length > 0 && (
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <label className="text-slate-900 text-sm font-semibold">
                Geselecteerd ({diensten.length})
              </label>
              {diensten.map((d, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 text-sm"
                >
                  <div>
                    <span className="font-medium text-slate-900">{d.naam}</span>
                    {d.beschrijving && (
                      <span className="text-slate-500 ml-2 text-xs">— {d.beschrijving}</span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setDiensten((prev) => prev.filter((_, idx) => idx !== i))}
                    className="text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg">close</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </SectionCard>

        {/* 3. Over mij */}
        <SectionCard
          id="overmij"
          icon="person"
          title="Over mij"
          description="Persoonlijke tekst, expertises en ervaring"
          filled={isOverMijFilled}
          expanded={expandedSections.has('overmij')}
          onToggle={() => toggleSection('overmij')}
        >
          <Textarea
            label="Over mij tekst"
            placeholder="Vertel iets over jezelf, je motivatie en aanpak..."
            value={overMij}
            onChange={(e) => setOverMij(e.target.value)}
            maxLength={1000}
            showCount
          />

          <div className="space-y-2">
            <label className="text-slate-900 text-sm font-semibold">Expertises</label>
            <div className="flex gap-2">
              <Input
                placeholder="Bijv. palliatieve zorg"
                value={newExpertise}
                onChange={(e) => setNewExpertise(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (newExpertise.trim()) {
                      setExpertises((prev) => [...prev, newExpertise.trim()]);
                      setNewExpertise('');
                    }
                  }
                }}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (newExpertise.trim()) {
                    setExpertises((prev) => [...prev, newExpertise.trim()]);
                    setNewExpertise('');
                  }
                }}
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
              </Button>
            </div>
            {expertises.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {expertises.map((e, i) => (
                  <Badge key={i} variant="primary" size="sm">
                    {e}
                    <button
                      type="button"
                      onClick={() => setExpertises((prev) => prev.filter((_, idx) => idx !== i))}
                      className="ml-1 hover:text-red-500"
                    >
                      <span className="material-symbols-outlined text-xs">close</span>
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-slate-900 text-sm font-semibold">Start carriere</label>
              <select
                className="w-full h-12 px-4 rounded-lg border border-slate-200 text-sm text-slate-900 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20"
                value={startCarriere || ''}
                onChange={(e) => setStartCarriere(e.target.value ? parseInt(e.target.value) : undefined)}
              >
                <option value="">Selecteer jaar</option>
                {yearOptions.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-slate-900 text-sm font-semibold">Beschikbaar</label>
              <button
                type="button"
                onClick={() => setBeschikbaar((prev) => !prev)}
                className={cn(
                  'w-full h-12 px-4 rounded-lg border text-sm font-medium flex items-center justify-center gap-2 transition-all',
                  beschikbaar
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                    : 'border-slate-200 bg-white text-slate-500'
                )}
              >
                <span className="material-symbols-outlined text-lg">
                  {beschikbaar ? 'check_circle' : 'cancel'}
                </span>
                {beschikbaar ? 'Beschikbaar' : 'Niet beschikbaar'}
              </button>
            </div>
          </div>
        </SectionCard>

        {/* 4. Certificaten */}
        <SectionCard
          id="certificaten"
          icon="verified_user"
          title="Certificaten"
          description="BIG, KvK, diploma's en keurmerken"
          filled={isCertificatenFilled}
          expanded={expandedSections.has('certificaten')}
          onToggle={() => toggleSection('certificaten')}
        >
          {/* Add form */}
          <div className="space-y-2">
            <label className="text-slate-900 text-sm font-semibold">Toevoegen</label>
            <select
              className="w-full h-12 px-4 rounded-lg border border-slate-200 text-sm text-slate-900 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20"
              value={newCertType}
              onChange={(e) => {
                setNewCertType(e.target.value as CertificaatType | '');
                setNewCertValue('');
              }}
            >
              <option value="">Kies type...</option>
              {CERTIFICAAT_TYPES.map((ct) => (
                <option key={ct.id} value={ct.id}>{ct.label}</option>
              ))}
            </select>
            {newCertType && getCertificaatTypeConfig(newCertType as CertificaatType)?.hasValue && (
              <Input
                placeholder={getCertificaatTypeConfig(newCertType as CertificaatType)?.placeholder || 'Waarde'}
                value={newCertValue}
                onChange={(e) => setNewCertValue(e.target.value)}
              />
            )}
            <Button
              variant="outline"
              size="sm"
              disabled={!newCertType}
              onClick={() => {
                const config = getCertificaatTypeConfig(newCertType as CertificaatType);
                if (!config) return;
                setCertificaten((prev) => [
                  ...prev,
                  {
                    type: newCertType as CertificaatType,
                    label: config.label,
                    value: newCertValue.trim() || undefined,
                  },
                ]);
                setNewCertType('');
                setNewCertValue('');
              }}
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              Toevoegen
            </Button>
          </div>

          {/* List */}
          {certificaten.length > 0 && (
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              {certificaten.map((c, i) => {
                const config = getCertificaatTypeConfig(c.type);
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-lg text-slate-500">
                        {config?.icon || 'verified'}
                      </span>
                      <span className="font-medium text-slate-900">{c.label}</span>
                      {c.value && <span className="text-xs text-slate-500">— {c.value}</span>}
                    </div>
                    <button
                      type="button"
                      onClick={() => setCertificaten((prev) => prev.filter((_, idx) => idx !== i))}
                      className="text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </SectionCard>

        {/* 5. Werkervaring */}
        <SectionCard
          id="werkervaring"
          icon="work_history"
          title="Werkervaring"
          description="Eerdere functies en werkgevers"
          filled={isWerkervaringFilled}
          expanded={expandedSections.has('werkervaring')}
          onToggle={() => toggleSection('werkervaring')}
        >
          {/* Add form */}
          <div className="space-y-2">
            <label className="text-slate-900 text-sm font-semibold">Toevoegen</label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="Functie"
                value={newWeFunctie}
                onChange={(e) => setNewWeFunctie(e.target.value)}
              />
              <Input
                placeholder="Werkgever"
                value={newWeWerkgever}
                onChange={(e) => setNewWeWerkgever(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="Start jaar"
                type="number"
                value={newWeStartJaar}
                onChange={(e) => setNewWeStartJaar(e.target.value)}
              />
              <Input
                placeholder="Eind jaar (leeg = heden)"
                type="number"
                value={newWeEindJaar}
                onChange={(e) => setNewWeEindJaar(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={!newWeFunctie.trim() || !newWeWerkgever.trim()}
              onClick={() => {
                setWerkervaring((prev) => [
                  ...prev,
                  {
                    functie: newWeFunctie.trim(),
                    werkgever: newWeWerkgever.trim(),
                    start_jaar: newWeStartJaar ? parseInt(newWeStartJaar) : undefined,
                    eind_jaar: newWeEindJaar ? parseInt(newWeEindJaar) : undefined,
                  },
                ]);
                setNewWeFunctie('');
                setNewWeWerkgever('');
                setNewWeStartJaar('');
                setNewWeEindJaar('');
              }}
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              Toevoegen
            </Button>
          </div>

          {/* List */}
          {werkervaring.length > 0 && (
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              {werkervaring.map((w, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 text-sm"
                >
                  <div>
                    <span className="font-medium text-slate-900">{w.functie}</span>
                    <span className="text-slate-500"> @ {w.werkgever}</span>
                    {(w.start_jaar || w.startJaar) && (
                      <span className="text-xs text-slate-400 ml-2">
                        {w.start_jaar || w.startJaar}
                        {' - '}
                        {w.eind_jaar || w.eindJaar || 'heden'}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setWerkervaring((prev) => prev.filter((_, idx) => idx !== i))}
                    className="text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg">close</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </SectionCard>

        {/* 6. Reviews */}
        <SectionCard
          id="reviews"
          icon="rate_review"
          title="Reviews"
          description="Aanbevelingen van cliënten of collega's"
          filled={isTestimonialsFilled}
          expanded={expandedSections.has('reviews')}
          onToggle={() => toggleSection('reviews')}
        >
          {testimonials.length < 3 && (
            <div className="space-y-2">
              <label className="text-slate-900 text-sm font-semibold">Toevoegen</label>
              <Textarea
                placeholder="Wat zei deze persoon over je?"
                value={newTestTekst}
                onChange={(e) => setNewTestTekst(e.target.value)}
                className="!min-h-[80px]"
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Naam"
                  value={newTestNaam}
                  onChange={(e) => setNewTestNaam(e.target.value)}
                />
                <Input
                  placeholder="Functie (optioneel)"
                  value={newTestFunctie}
                  onChange={(e) => setNewTestFunctie(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                disabled={!newTestTekst.trim() || !newTestNaam.trim()}
                onClick={() => {
                  setTestimonials((prev) => [
                    ...prev,
                    {
                      tekst: newTestTekst.trim(),
                      naam: newTestNaam.trim(),
                      functie: newTestFunctie.trim() || undefined,
                    },
                  ]);
                  setNewTestTekst('');
                  setNewTestNaam('');
                  setNewTestFunctie('');
                }}
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                Toevoegen
              </Button>
            </div>
          )}

          {testimonials.length >= 3 && (
            <p className="text-xs text-slate-500 italic">Maximum van 3 reviews bereikt.</p>
          )}

          {/* List */}
          {testimonials.length > 0 && (
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              {testimonials.map((t, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-slate-50 text-sm">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-700 italic text-xs leading-relaxed line-clamp-2">
                        &ldquo;{t.tekst}&rdquo;
                      </p>
                      <p className="text-slate-900 font-medium text-xs mt-1">
                        — {t.naam}
                        {t.functie && <span className="text-slate-500 font-normal">, {t.functie}</span>}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setTestimonials((prev) => prev.filter((_, idx) => idx !== i))}
                      className="text-slate-400 hover:text-red-500 transition-colors flex-shrink-0"
                    >
                      <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </SectionCard>

        {/* 7. Werkwijze */}
        <SectionCard
          id="werkwijze"
          icon="route"
          title="Werkwijze"
          description="Stappen in jouw werkproces"
          filled={isWerkwijzeFilled}
          expanded={expandedSections.has('werkwijze')}
          onToggle={() => toggleSection('werkwijze')}
        >
          <div className="space-y-2">
            <label className="text-slate-900 text-sm font-semibold">Stap toevoegen</label>
            <Input
              placeholder="Titel van de stap (bijv. Kennismaking)"
              value={newStapTitel}
              onChange={(e) => setNewStapTitel(e.target.value)}
            />
            <Textarea
              placeholder="Beschrijving van deze stap..."
              value={newStapBeschrijving}
              onChange={(e) => setNewStapBeschrijving(e.target.value)}
              className="!min-h-[70px]"
            />
            <Button
              variant="outline"
              size="sm"
              disabled={!newStapTitel.trim() || !newStapBeschrijving.trim()}
              onClick={() => {
                setWerkwijzeStappen((prev) => [
                  ...prev,
                  {
                    nummer: prev.length + 1,
                    titel: newStapTitel.trim(),
                    beschrijving: newStapBeschrijving.trim(),
                  },
                ]);
                setNewStapTitel('');
                setNewStapBeschrijving('');
              }}
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              Toevoegen
            </Button>
          </div>

          {werkwijzeStappen.length > 0 && (
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <label className="text-slate-900 text-sm font-semibold">
                Stappen ({werkwijzeStappen.length})
              </label>
              {werkwijzeStappen.map((s, i) => (
                <div
                  key={i}
                  className="flex items-start justify-between p-2.5 rounded-lg bg-slate-50 text-sm gap-2"
                >
                  <div className="flex items-start gap-2 flex-1 min-w-0">
                    <span className="bg-primary/10 text-primary text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <div>
                      <span className="font-medium text-slate-900">{s.titel}</span>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{s.beschrijving}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setWerkwijzeStappen((prev) =>
                        prev.filter((_, idx) => idx !== i).map((item, idx) => ({ ...item, nummer: idx + 1 }))
                      );
                    }}
                    className="text-slate-400 hover:text-red-500 transition-colors flex-shrink-0"
                  >
                    <span className="material-symbols-outlined text-lg">close</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </SectionCard>

        {/* 8. FAQ */}
        <SectionCard
          id="faq"
          icon="quiz"
          title="Veelgestelde vragen"
          description="FAQ's over jouw praktijk"
          filled={isFaqFilled}
          expanded={expandedSections.has('faq')}
          onToggle={() => toggleSection('faq')}
        >
          <div className="space-y-2">
            <label className="text-slate-900 text-sm font-semibold">Vraag toevoegen</label>
            <Input
              placeholder="De vraag (bijv. Wat kost een intake?)"
              value={newFaqVraag}
              onChange={(e) => setNewFaqVraag(e.target.value)}
            />
            <Textarea
              placeholder="Het antwoord..."
              value={newFaqAntwoord}
              onChange={(e) => setNewFaqAntwoord(e.target.value)}
              className="!min-h-[70px]"
            />
            <Button
              variant="outline"
              size="sm"
              disabled={!newFaqVraag.trim() || !newFaqAntwoord.trim()}
              onClick={() => {
                setFaqItems((prev) => [
                  ...prev,
                  { vraag: newFaqVraag.trim(), antwoord: newFaqAntwoord.trim() },
                ]);
                setNewFaqVraag('');
                setNewFaqAntwoord('');
              }}
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              Toevoegen
            </Button>
          </div>

          {faqItems.length > 0 && (
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <label className="text-slate-900 text-sm font-semibold">
                Vragen ({faqItems.length})
              </label>
              {faqItems.map((f, i) => (
                <div
                  key={i}
                  className="flex items-start justify-between p-2.5 rounded-lg bg-slate-50 text-sm gap-2"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 text-xs">{f.vraag}</p>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{f.antwoord}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFaqItems((prev) => prev.filter((_, idx) => idx !== i))}
                    className="text-slate-400 hover:text-red-500 transition-colors flex-shrink-0"
                  >
                    <span className="material-symbols-outlined text-lg">close</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </SectionCard>

        {/* 9. Voor wie */}
        <SectionCard
          id="voorwie"
          icon="groups"
          title="Voor wie"
          description="Jouw doelgroepen"
          filled={isVoorWieFilled}
          expanded={expandedSections.has('voorwie')}
          onToggle={() => toggleSection('voorwie')}
        >
          <div className="space-y-2">
            <label className="text-slate-900 text-sm font-semibold">Doelgroep toevoegen</label>
            <Input
              placeholder="Titel (bijv. Ouderen met dementie)"
              value={newDoelgroepTitel}
              onChange={(e) => setNewDoelgroepTitel(e.target.value)}
            />
            <Textarea
              placeholder="Beschrijving van deze doelgroep..."
              value={newDoelgroepTekst}
              onChange={(e) => setNewDoelgroepTekst(e.target.value)}
              className="!min-h-[70px]"
            />
            <Button
              variant="outline"
              size="sm"
              disabled={!newDoelgroepTitel.trim() || !newDoelgroepTekst.trim()}
              onClick={() => {
                setDoelgroepen((prev) => [
                  ...prev,
                  {
                    type: 'particulieren' as DoelgroepType,
                    titel: newDoelgroepTitel.trim(),
                    tekst: newDoelgroepTekst.trim(),
                  },
                ]);
                setNewDoelgroepTitel('');
                setNewDoelgroepTekst('');
              }}
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              Toevoegen
            </Button>
          </div>

          {doelgroepen.length > 0 && (
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <label className="text-slate-900 text-sm font-semibold">
                Doelgroepen ({doelgroepen.length})
              </label>
              {doelgroepen.map((d, i) => (
                <div
                  key={i}
                  className="flex items-start justify-between p-2.5 rounded-lg bg-slate-50 text-sm gap-2"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 text-xs">{d.titel}</p>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{d.tekst}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDoelgroepen((prev) => prev.filter((_, idx) => idx !== i))}
                    className="text-slate-400 hover:text-red-500 transition-colors flex-shrink-0"
                  >
                    <span className="material-symbols-outlined text-lg">close</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </SectionCard>

        {/* Info text */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
          <span className="material-symbols-outlined text-primary text-lg mt-0.5">info</span>
          <div className="text-xs text-slate-600 leading-relaxed">
            <p className="font-semibold text-slate-900 mb-0.5">Hoe werkt het?</p>
            Secties die je invult worden als basis gebruikt. Lege secties worden volledig door AI
            gegenereerd op basis van je profiel. Statistieken, CTA en quote worden altijd door AI gemaakt.
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="p-4 rounded-lg bg-red-50 border border-red-200">
            <p className="text-sm text-red-600 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">error</span>
              {error}
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-2">
          <Button
            variant="outline"
            onClick={() => setPhase('essentials')}
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Vorige
          </Button>
          <Button onClick={handleGenerate} isLoading={isGenerating}>
            <span className="material-symbols-outlined">auto_fix_high</span>
            Genereer mijn website
          </Button>
        </div>
      </div>
    </div>
  );
}
