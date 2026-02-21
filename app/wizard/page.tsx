// app/wizard/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  StepBeroep,
  StepGegevens,
  StepContact,
  StepDiensten,
  StepCertificaten,
  StepOverMij,
  StepProfessional,
  StepWerkervaring,
  StepTestimonials,
  StepTemplate,
  StepDomain,
  StepSubdomain,
} from '@/components/wizard/steps';
import { WizardProgress } from '@/components/wizard/WizardProgress';
import { Button } from '@/components/ui';
import { SiteContent, GeneratedContent, Theme, Contact, Dienst, Certificaat, Werkervaring, Testimonial } from '@/types';
import { TemplateId, getBeroepLabel } from '@/constants';
import { createClient } from '@/lib/supabase/client';

const TOTAL_STEPS = 11;

const STEP_LABELS = [
  'Introductie',
  'Over jou',
  'Contact gegevens',
  'Diensten',
  'Certificaten',
  'Over mij tekst',
  'Professioneel',
  'Werkervaring',
  'Reviews',
  'Template kiezen',
  'Eigen domein',
];

// Initial state
const initialContent: Partial<SiteContent> = {
  naam: '',
  foto: undefined,
  tagline: '',
  over_mij: '',
  contact: {
    telefoon: '',
    email: '',
    werkgebied: [],
  },
  diensten: [],
  certificaten: [],
  zakelijk: {
    kvk: '',
    btw: '',
  },
  // Professional features
  beschikbaar: true,
  start_carriere: undefined,
  expertises: [],
  werkervaring: [],
  testimonials: [],
};

export default function WizardPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [beroep, setBeroep] = useState('');
  const [customBeroep, setCustomBeroep] = useState('');
  const [content, setContent] = useState<Partial<SiteContent>>(initialContent);
  const [templateId, setTemplateId] = useState<TemplateId>('warm');
  const [subdomain, setSubdomain] = useState('');
  const [customDomain, setCustomDomain] = useState('');
  const [wantsCustomDomain, setWantsCustomDomain] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const updateContent = (updates: Partial<SiteContent>) => {
    setContent((prev) => ({ ...prev, ...updates }));
  };

  // Werkervaring helpers
  const addWerkervaring = (item: Werkervaring) => {
    setContent((prev) => ({
      ...prev,
      werkervaring: [...(prev.werkervaring || []), item],
    }));
  };

  const removeWerkervaring = (index: number) => {
    setContent((prev) => ({
      ...prev,
      werkervaring: (prev.werkervaring || []).filter((_, i) => i !== index),
    }));
  };

  // Testimonials helpers
  const addTestimonial = (item: Testimonial) => {
    setContent((prev) => ({
      ...prev,
      testimonials: [...(prev.testimonials || []), item],
    }));
  };

  const removeTestimonial = (index: number) => {
    setContent((prev) => ({
      ...prev,
      testimonials: (prev.testimonials || []).filter((_, i) => i !== index),
    }));
  };

  const goNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo(0, 0);
    } else {
      // Final step - submit
      handleSubmit();
    }
  };

  const goPrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setIsGenerating(true);
    setSubmitError('');

    try {
      const actualBeroep = beroep === 'anders' ? customBeroep : beroep;
      const subdomain = content.naam?.toLowerCase().replace(/\s+/g, '') || 'mijn-site';

      // Map wizard template to stijlKeuze for edge function
      const stijlMap: Record<string, string> = {
        warm: 'warm',
        modern: 'modern',
        editorial: 'warm',
      };
      const stijlKeuze = stijlMap[templateId] || 'warm';

      // Calculate jaren ervaring
      const jarenErvaring = content.start_carriere
        ? new Date().getFullYear() - content.start_carriere
        : undefined;

      // Step 1: Call edge function to generate AI content
      let generatedContent: GeneratedContent | undefined;
      let generatedTemplateId: string = templateId;
      let generatedTheme: Theme | undefined;

      try {
        const supabase = createClient();
        const { data: generated, error: genError } = await supabase.functions.invoke(
          'generate-site',
          {
            body: {
              naam: content.naam,
              beroep: actualBeroep,
              email: content.contact?.email || undefined,
              telefoon: content.contact?.telefoon || undefined,
              werkgebied: content.contact?.werkgebied?.length ? content.contact.werkgebied : undefined,
              diensten: content.diensten?.length ? content.diensten : undefined,
              certificaten: content.certificaten?.length ? content.certificaten : undefined,
              werkervaring: content.werkervaring?.length ? content.werkervaring : undefined,
              expertises: content.expertises?.length ? content.expertises : undefined,
              jarenErvaring,
              persoonlijkeNoot: content.over_mij || undefined,
              tagline: content.tagline || undefined,
              stijlKeuze,
            },
          }
        );

        if (!genError && generated) {
          console.log('AI content gegenereerd:', generated);
          generatedContent = generated.generated_content as GeneratedContent;
          generatedTheme = generated.theme as Theme;
          // Use the edge function's template_id (maps to modern template system)
          if (generated.template_id) {
            generatedTemplateId = generated.template_id;
          }

          // Enrich content with AI-generated data
          const gen = generatedContent;
          const inputData = generated.input_data || {};

          if (gen?.hero?.subtitel && !content.tagline) {
            content.tagline = gen.hero.subtitel;
          }
          if (gen?.overMij && !content.over_mij) {
            content.over_mij = `${gen.overMij.intro || ''}\n\n${gen.overMij.body || ''}${gen.overMij.persoonlijk ? '\n\n' + gen.overMij.persoonlijk : ''}`;
          }
          if (gen?.diensten?.items && (!content.diensten || content.diensten.length === 0)) {
            content.diensten = gen.diensten.items;
          }
          if (gen?.testimonials?.items && (!content.testimonials || content.testimonials.length === 0)) {
            content.testimonials = gen.testimonials.items.map((t: any) => ({
              tekst: t.tekst,
              naam: t.naam,
              functie: t.functie,
            }));
          }
          // Store generated content inside content.generated as well
          (content as any).generated = gen;
        } else {
          console.warn('Edge function fout, doorgaan zonder AI content:', genError);
        }
      } catch (genErr) {
        console.warn('Edge function call mislukt, doorgaan zonder AI content:', genErr);
      }

      setIsGenerating(false);

      // Step 2: Create the site with generated content
      const { createSite } = await import('@/lib/actions/sites');

      const result = await createSite({
        subdomain,
        template_id: generatedTemplateId,
        beroep: actualBeroep,
        content: content as SiteContent,
        custom_domain: customDomain || undefined,
        generated_content: generatedContent || undefined,
        theme: generatedTheme || undefined,
      });

      if (result.error) {
        setSubmitError(result.error);
        setIsSubmitting(false);
        return;
      }

      // If custom domain selected, register it
      if (customDomain && result.site?.id) {
        try {
          await fetch('/api/domains/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              domain: customDomain,
              siteId: result.site.id,
            }),
          });
        } catch (domainError) {
          console.error('Domain registration error:', domainError);
        }
      }

      // Success - redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitError('Er ging iets mis. Probeer het opnieuw.');
      setIsSubmitting(false);
      setIsGenerating(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepBeroep
            value={beroep}
            customValue={customBeroep}
            onChange={setBeroep}
            onCustomChange={setCustomBeroep}
          />
        );
      case 2:
        return (
          <StepGegevens
            naam={content.naam || ''}
            foto={content.foto}
            tagline={content.tagline || ''}
            onNaamChange={(naam) => updateContent({ naam })}
            onFotoChange={(foto) => updateContent({ foto: foto || undefined })}
            onTaglineChange={(tagline) => updateContent({ tagline })}
          />
        );
      case 3:
        return (
          <StepContact
            contact={content.contact || {}}
            onContactChange={(contact) => updateContent({ contact: contact as Contact })}
          />
        );
      case 4:
        return (
          <StepDiensten
            beroep={beroep}
            diensten={content.diensten || []}
            onDienstenChange={(diensten) => updateContent({ diensten })}
          />
        );
      case 5:
        return (
          <StepCertificaten
            certificaten={content.certificaten || []}
            onAdd={(cert) =>
              updateContent({ certificaten: [...(content.certificaten || []), cert] })
            }
            onRemove={(index) =>
              updateContent({
                certificaten: (content.certificaten || []).filter((_, i) => i !== index),
              })
            }
            onUpdate={(index, updates) =>
              updateContent({
                certificaten: (content.certificaten || []).map((cert, i) =>
                  i === index ? { ...cert, ...updates } : cert
                ),
              })
            }
          />
        );
      case 6:
        return (
          <StepOverMij
            value={content.over_mij || ''}
            onChange={(over_mij) => updateContent({ over_mij })}
          />
        );
      case 7:
        return (
          <StepProfessional
            content={content}
            beroep={beroep}
            onChange={updateContent}
          />
        );
      case 8:
        return (
          <StepWerkervaring
            content={content}
            onChange={updateContent}
            addWerkervaring={addWerkervaring}
            removeWerkervaring={removeWerkervaring}
          />
        );
      case 9:
        return (
          <StepTestimonials
            content={content}
            onChange={updateContent}
            addTestimonial={addTestimonial}
            removeTestimonial={removeTestimonial}
          />
        );
      case 10:
        return <StepTemplate value={templateId} onChange={setTemplateId} />;
      case 11:
        return (
          <StepDomain
            naam={content.naam || ''}
            beroep={beroep}
            customDomain={customDomain}
            wantsCustomDomain={wantsCustomDomain}
            onDomainChange={setCustomDomain}
            onWantsCustomDomainChange={setWantsCustomDomain}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 md:px-10 py-3 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-primary/10 rounded-lg">
              <svg
                className="size-6 text-primary"
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
                  fill="currentColor"
                  fillRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
              JouwZorgSite
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white transition-colors hover:bg-slate-200">
              <span className="material-symbols-outlined">help</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center py-8 px-4 sm:px-6">
        <div className="w-full max-w-[640px] flex flex-col gap-6">
          {/* Progress Bar */}
          <WizardProgress
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
            stepLabel={STEP_LABELS[currentStep - 1]}
          />

          {/* Step Content */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-100 dark:border-slate-800 overflow-hidden">
            {renderStep()}
          </div>

          {/* Generating state */}
          {isGenerating && (
            <div className="p-6 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">Je website wordt gegenereerd...</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">AI schrijft unieke teksten op basis van jouw profiel. Dit duurt ongeveer 15 seconden.</p>
                </div>
              </div>
            </div>
          )}

          {/* Error message */}
          {submitError && (
            <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">error</span>
                {submitError}
              </p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4">
            {currentStep > 1 ? (
              <Button variant="outline" onClick={goPrevious} disabled={isSubmitting}>
                <span className="material-symbols-outlined">arrow_back</span>
                Vorige
              </Button>
            ) : (
              <div />
            )}

            <Button onClick={goNext} isLoading={isSubmitting}>
              {currentStep === TOTAL_STEPS ? 'Voltooien' : 'Volgende'}
              <span className="material-symbols-outlined">
                {currentStep === TOTAL_STEPS ? 'check' : 'arrow_forward'}
              </span>
            </Button>
          </div>

          {/* Help Link */}
          <div className="flex justify-center">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-base">support_agent</span>
              <span>Hulp nodig? Praat met ons.</span>
            </a>
          </div>
        </div>
      </main>

      {/* Background decorations */}
      <div className="fixed top-0 right-0 -z-10 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 left-0 -z-10 w-1/4 h-1/4 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />
    </div>
  );
}
