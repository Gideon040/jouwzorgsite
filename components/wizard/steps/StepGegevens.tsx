// components/wizard/steps/StepGegevens.tsx

'use client';

import { Input, ImageUpload } from '@/components/ui';

interface StepGegevensProps {
  naam: string;
  foto?: string;
  tagline: string;
  onNaamChange: (value: string) => void;
  onFotoChange: (url: string | null) => void;
  onTaglineChange: (value: string) => void;
}

export function StepGegevens({
  naam,
  foto,
  tagline,
  onNaamChange,
  onFotoChange,
  onTaglineChange,
}: StepGegevensProps) {
  return (
    <div className="p-6 md:p-8 flex flex-col gap-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold leading-tight mb-2">
          Stel jezelf voor
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-base">
          Deze details helpen cliënten om je beter te leren kennen.
        </p>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-6">
        <Input
          label="Volledige naam"
          placeholder="bijv. Maria Janssen"
          value={naam}
          onChange={(e) => onNaamChange(e.target.value)}
        />

        <ImageUpload
          label="Profielfoto"
          value={foto}
          onChange={onFotoChange}
          hint="PNG of JPG (max. 5MB). Gebruik een professionele foto."
        />

        <Input
          label="Tagline"
          placeholder="bijv. Thuiszorg met persoonlijke aandacht"
          value={tagline}
          onChange={(e) => onTaglineChange(e.target.value)}
          hint="Een korte krachtige zin die jou als professional omschrijft."
        />
      </div>
    </div>
  );
}
