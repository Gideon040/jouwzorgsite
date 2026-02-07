'use client';

// app/page.tsx - Single page funnel
// v2: 3-step wizard (naam → beroep → stijl), fullscreen generating state

import { useState } from 'react';
import { Site, SiteContent, Theme, GeneratedContent } from '@/types';
import { getBeroepLabel } from '@/constants';
import { generatePlaceholderContent } from '@/lib/placeholder-content';
import { trackWizardStart, trackWizardStep, trackSitePreview } from '@/lib/pixel';
import { createClient } from '@/lib/supabase/client';
import {
  HeroSection,
  WizardSection,
  GeneratingSection,
  PreviewSection,
  VerificationSection,
  CheckoutSection,
  DoneSection,
} from '@/components/landing';
import type { StijlKeuze } from '@/components/landing/WizardSection';

type FlowStep = 'hero' | 'wizard' | 'generating' | 'preview' | 'verification' | 'checkout' | 'done';
type WizardStep = 1 | 2 | 3;

const MAX_REGENERATIONS = 3;

export default function Home() {
  // Flow state
  const [flowStep, setFlowStep] = useState<FlowStep>('hero');
  const [wizardStep, setWizardStep] = useState<WizardStep>(1);
  
  // User input
  const [naam, setNaam] = useState('');
  const [beroep, setBeroep] = useState('');
  const [omschrijving, setOmschrijving] = useState('');
  const [stijl, setStijl] = useState<StijlKeuze | ''>('');
  
  // Generated site
  const [previewSite, setPreviewSite] = useState<Site | null>(null);
  const [customContent, setCustomContent] = useState<SiteContent | null>(null);
  
  // Final subdomain
  const [finalSubdomain, setFinalSubdomain] = useState('');
  
  // UI state
  const [isCustomizing, setIsCustomizing] = useState(false);
  
  // Regeneration tracking
  const [regenerateCount, setRegenerateCount] = useState(0);
  const [isRegenerating, setIsRegenerating] = useState(false);

  // ── Handlers ────────────────────────────────

  const handleStartWizard = () => {
    trackWizardStart();
    setFlowStep('wizard');
  };

  const handleWizardNext = async () => {
    if (wizardStep === 1 && naam.trim()) {
      trackWizardStep(1, 'naam');
      setWizardStep(2);
    } else if (wizardStep === 2 && beroep) {
      trackWizardStep(2, 'beroep');
      setWizardStep(3);
    } else if (wizardStep === 3 && stijl) {
      trackWizardStep(3, 'stijl');
      await handleGenerateSite();
    }
  };

  const handleWizardBack = () => {
    if (wizardStep > 1) {
      setWizardStep((wizardStep - 1) as WizardStep);
    }
  };

  const handleGenerateSite = async (isRegeneration = false) => {
    if (!stijl) return;
    
    // Show fullscreen generating state (not for regeneration — that uses inline loading)
    if (!isRegeneration) {
      setFlowStep('generating');
    } else {
      setIsRegenerating(true);
    }
    
    try {
      const supabase = createClient();
      
      // Roep generate-site Edge Function aan
      const { data: generated, error } = await supabase.functions.invoke(
        'generate-site',
        {
          body: {
            naam,
            beroep,
            omschrijving: omschrijving.trim() || undefined,
            stijlKeuze: stijl,
            regeneration: isRegeneration,
            regenerationCount: regenerateCount + 1,
          },
        }
      );

      console.log('🎨 Generate-site response:', generated);
      console.log('🎨 Template ID:', generated?.template_id);
      console.log('🎨 Error:', error);
      
      let content: SiteContent;
      let templateId: string;
      let theme: Theme | undefined;
      let generatedContent: GeneratedContent | undefined;
      
      if (error || !generated) {
        console.warn('Edge Function failed, using fallback:', error);
        content = generatePlaceholderContent({ naam, beroep, email: '' });
        templateId = 'flex';
        theme = undefined;
        generatedContent = undefined;
      } else {
        const gen = generated.generated_content as GeneratedContent;
        const inputData = generated.input_data || {};
        
        content = {
          naam,
          foto: undefined,
          tagline: gen?.hero?.subtitel || `${getBeroepLabel(beroep)} | Beschikbaar voor opdrachten`,
          over_mij: gen?.overMij 
            ? `${gen.overMij.intro || ''}\n\n${gen.overMij.body || ''}${gen.overMij.persoonlijk ? '\n\n' + gen.overMij.persoonlijk : ''}`
            : generatePlaceholderContent({ naam, beroep, email: '' }).over_mij,
          contact: {
            email: '',
            werkgebied: inputData.werkgebied || [],
          },
          diensten: gen?.diensten?.items || generatePlaceholderContent({ naam, beroep, email: '' }).diensten,
          werkervaring: inputData.werkervaring || [],
          certificaten: inputData.certificaten || [],
          zakelijk: inputData.zakelijk || { 
            kvk: '',
            handelsnaam: `${naam} Zorg`,
          },
          beschikbaar: true,
        };
        
        templateId = generated.template_id || 'flex';
        theme = generated.theme as Theme;
        generatedContent = gen;
      }
      
      const generatedSubdomain = naam
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      
      const site: Site = {
        id: 'preview',
        user_id: 'preview',
        subdomain: generatedSubdomain,
        template_id: templateId,
        beroep,
        content,
        theme,
        generated_content: generatedContent,
        published: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      console.log('🎨 Final site object:', site);
      
      setPreviewSite(site);
      setCustomContent(content);
      setFinalSubdomain(generatedSubdomain);
      
      if (isRegeneration) {
        setRegenerateCount(prev => prev + 1);
      } else {
        trackSitePreview();
        setFlowStep('preview');
      }
      
    } catch (err) {
      console.error('Fout bij genereren site:', err);
      const content = generatePlaceholderContent({ naam, beroep, email: '' });
      const generatedSubdomain = naam
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      
      const site: Site = {
        id: 'preview',
        user_id: 'preview',
        subdomain: generatedSubdomain,
        template_id: 'flex',
        beroep,
        content,
        published: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      setPreviewSite(site);
      setCustomContent(content);
      setFinalSubdomain(generatedSubdomain);
      
      if (!isRegeneration) {
        trackSitePreview();
        setFlowStep('preview');
      }
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleRegenerate = async () => {
    if (regenerateCount >= MAX_REGENERATIONS) return;
    await handleGenerateSite(true);
  };

  const handleCheckoutComplete = () => {
    setFlowStep('done');
  };

  const handleSetContent = (newContent: SiteContent) => {
    setCustomContent(newContent);
    if (previewSite) {
      setPreviewSite({
        ...previewSite,
        content: newContent,
      });
    }
  };

  // ── Render ──────────────────────────────────

  return (
    <div className="min-h-screen bg-white">
      {flowStep === 'hero' && (
        <HeroSection onStart={handleStartWizard} />
      )}
      
      {flowStep === 'wizard' && (
        <WizardSection
          step={wizardStep}
          naam={naam}
          setNaam={setNaam}
          beroep={beroep}
          setBeroep={setBeroep}
          omschrijving={omschrijving}
          setOmschrijving={setOmschrijving}
          stijl={stijl}
          setStijl={setStijl}
          onNext={handleWizardNext}
          onBack={handleWizardBack}
        />
      )}

      {flowStep === 'generating' && (
        <GeneratingSection
          naam={naam}
          beroep={beroep}
        />
      )}
      
      {flowStep === 'preview' && previewSite && customContent && (
        <PreviewSection
          site={previewSite}
          content={customContent}
          setContent={handleSetContent}
          onCheckout={() => setFlowStep('verification')}
          onRegenerate={handleRegenerate}
          isCustomizing={isCustomizing}
          setIsCustomizing={setIsCustomizing}
          isRegenerating={isRegenerating}
          regenerateCount={regenerateCount}
          maxRegenerations={MAX_REGENERATIONS}
        />
      )}
      
      {flowStep === 'verification' && previewSite && customContent && (
        <VerificationSection
          site={previewSite}
          content={customContent}
          setContent={handleSetContent}
          onContinue={() => setFlowStep('checkout')}
          onBack={() => setFlowStep('preview')}
        />
      )}
      
      {flowStep === 'checkout' && previewSite && customContent && (
        <CheckoutSection
          site={previewSite}
          content={customContent}
          email=""
          onBack={() => setFlowStep('verification')}
          onComplete={handleCheckoutComplete}
        />
      )}
      
      {flowStep === 'done' && (
        <DoneSection 
          naam={naam} 
          subdomain={finalSubdomain}
        />
      )}
    </div>
  );
}