// components/wizard/WizardContainer.tsx

'use client';

import { useState, useCallback, ReactNode } from 'react';
import { WizardProgress } from './WizardProgress';
import { Button } from '@/components/ui';
import { SiteContent, Certificaat, Dienst, Werkervaring, Testimonial } from '@/types';

// Wizard step labels
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
  'Website adres',
];

// Initial empty state
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

interface WizardState {
  beroep: string;
  content: Partial<SiteContent>;
  template_id: string;
  subdomain: string;
}

interface WizardContainerProps {
  children: (props: {
    state: WizardState;
    updateState: (updates: Partial<WizardState>) => void;
    updateContent: (updates: Partial<SiteContent>) => void;
    addDienst: (dienst: Dienst) => void;
    removeDienst: (index: number) => void;
    addCertificaat: (certificaat: Certificaat) => void;
    removeCertificaat: (index: number) => void;
    updateCertificaat: (index: number, updates: Partial<Certificaat>) => void;
    addWerkervaring: (item: Werkervaring) => void;
    removeWerkervaring: (index: number) => void;
    addTestimonial: (item: Testimonial) => void;
    removeTestimonial: (index: number) => void;
  }) => ReactNode;
  currentStep: number;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export function WizardContainer({
  children,
  currentStep,
  onNext,
  onPrevious,
  isFirstStep,
  isLastStep,
}: WizardContainerProps) {
  const [state, setState] = useState<WizardState>({
    beroep: '',
    content: initialContent,
    template_id: 'warm',
    subdomain: '',
  });

  const updateState = useCallback((updates: Partial<WizardState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const updateContent = useCallback((updates: Partial<SiteContent>) => {
    setState((prev) => ({
      ...prev,
      content: { ...prev.content, ...updates },
    }));
  }, []);

  // Diensten
  const addDienst = useCallback((dienst: Dienst) => {
    setState((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        diensten: [...(prev.content.diensten || []), dienst],
      },
    }));
  }, []);

  const removeDienst = useCallback((index: number) => {
    setState((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        diensten: (prev.content.diensten || []).filter((_, i) => i !== index),
      },
    }));
  }, []);

  // Certificaten
  const addCertificaat = useCallback((certificaat: Certificaat) => {
    setState((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        certificaten: [...(prev.content.certificaten || []), certificaat],
      },
    }));
  }, []);

  const removeCertificaat = useCallback((index: number) => {
    setState((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        certificaten: (prev.content.certificaten || []).filter((_, i) => i !== index),
      },
    }));
  }, []);

  const updateCertificaat = useCallback((index: number, updates: Partial<Certificaat>) => {
    setState((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        certificaten: (prev.content.certificaten || []).map((cert, i) =>
          i === index ? { ...cert, ...updates } : cert
        ),
      },
    }));
  }, []);

  // Werkervaring
  const addWerkervaring = useCallback((item: Werkervaring) => {
    setState((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        werkervaring: [...(prev.content.werkervaring || []), item],
      },
    }));
  }, []);

  const removeWerkervaring = useCallback((index: number) => {
    setState((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        werkervaring: (prev.content.werkervaring || []).filter((_, i) => i !== index),
      },
    }));
  }, []);

  // Testimonials
  const addTestimonial = useCallback((item: Testimonial) => {
    setState((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        testimonials: [...(prev.content.testimonials || []), item],
      },
    }));
  }, []);

  const removeTestimonial = useCallback((index: number) => {
    setState((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        testimonials: (prev.content.testimonials || []).filter((_, i) => i !== index),
      },
    }));
  }, []);

  return (
    <div className="w-full max-w-[640px] flex flex-col gap-6">
      {/* Progress Bar */}
      <WizardProgress
        currentStep={currentStep}
        totalSteps={STEP_LABELS.length}
        stepLabel={STEP_LABELS[currentStep - 1]}
      />

      {/* Step Content */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-100 dark:border-slate-800 overflow-hidden">
        {children({
          state,
          updateState,
          updateContent,
          addDienst,
          removeDienst,
          addCertificaat,
          removeCertificaat,
          updateCertificaat,
          addWerkervaring,
          removeWerkervaring,
          addTestimonial,
          removeTestimonial,
        })}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4">
        {!isFirstStep ? (
          <Button variant="outline" onClick={onPrevious}>
            <span className="material-symbols-outlined">arrow_back</span>
            Vorige
          </Button>
        ) : (
          <div />
        )}
        
        <Button onClick={onNext}>
          {isLastStep ? 'Voltooien' : 'Volgende'}
          <span className="material-symbols-outlined">
            {isLastStep ? 'check' : 'arrow_forward'}
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
          <span>Hulp nodig? Bekijk onze gids.</span>
        </a>
      </div>
    </div>
  );
}

export const TOTAL_STEPS = STEP_LABELS.length;
