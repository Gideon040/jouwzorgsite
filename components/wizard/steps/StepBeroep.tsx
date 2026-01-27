// components/wizard/steps/StepBeroep.tsx

'use client';

import { Select, Input } from '@/components/ui';
import { BEROEPEN } from '@/constants';

interface StepBeroepProps {
  value: string;
  customValue?: string;
  onChange: (beroep: string) => void;
  onCustomChange?: (value: string) => void;
}

export function StepBeroep({ value, customValue, onChange, onCustomChange }: StepBeroepProps) {
  const options = BEROEPEN.map((b) => ({
    value: b.id,
    label: b.label,
  }));

  return (
    <>
      {/* Header */}
      <div className="pt-10 pb-6 px-8 text-center border-b border-slate-50 dark:border-slate-800/50">
        <h1 className="text-slate-900 dark:text-white tracking-tight text-3xl font-extrabold leading-tight mb-2">
          Laten we je website maken
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-base">
          Dit duurt ongeveer 10 minuten. We helpen je stap voor stap.
        </p>
      </div>

      {/* Form */}
      <div className="p-8 space-y-6">
        <Select
          label="Wat voor zorg bied je?"
          options={options}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Selecteer je vakgebied"
        />

        {value === 'anders' && onCustomChange && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <Input
              label="Specificeer je zorgtype"
              placeholder="Bijv. Fysiotherapeut, Logopedist..."
              value={customValue}
              onChange={(e) => onCustomChange(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Feature highlights */}
      <div className="bg-slate-50 dark:bg-slate-800/50 p-6 flex flex-wrap justify-center gap-6 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-medium">
          <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
          <span>Geen creditcard nodig</span>
        </div>
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-medium">
          <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
          <span>Klaar in 10 minuten</span>
        </div>
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-medium">
          <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
          <span>Direct live</span>
        </div>
      </div>
    </>
  );
}
