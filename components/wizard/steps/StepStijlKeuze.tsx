// components/wizard/steps/StepStijlKeuze.tsx

'use client';

import { cn } from '@/lib/utils';

const STIJL_OPTIONS = [
  {
    id: 'warm',
    label: 'Warm & Klassiek',
    description: 'Vertrouwd en persoonlijk, met serif fonts en warme kleuren',
    icon: 'favorite',
    gradient: 'from-[#5a7c6f] to-[#b8860b]',
  },
  {
    id: 'calm',
    label: 'Rustig & Sereen',
    description: 'Rustgevend en zen, met elegante typografie en veel ademruimte',
    icon: 'spa',
    gradient: 'from-[#3d4a3d] to-[#86927c]',
  },
  {
    id: 'modern',
    label: 'Modern & Energiek',
    description: 'Dynamisch en eigentijds, met strakke lijnen en frisse kleuren',
    icon: 'bolt',
    gradient: 'from-[#007fa9] to-[#f26632]',
  },
  {
    id: 'zakelijk',
    label: 'Zakelijk & Elegant',
    description: 'Sophisticated en premium, met donkere accenten en strak design',
    icon: 'business_center',
    gradient: 'from-[#1a3a2f] to-[#699838]',
  },
  {
    id: 'energiek',
    label: 'Organisch & Warm',
    description: 'Uitnodigend en natuurlijk, met zachte vormen en coral accenten',
    icon: 'eco',
    gradient: 'from-[#5a7c5a] to-[#d4644a]',
  },
] as const;

interface StepStijlKeuzeProps {
  value: string;
  onChange: (stijl: string) => void;
}

export function StepStijlKeuze({ value, onChange }: StepStijlKeuzeProps) {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Kies je stijl
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Selecteer de stijl die het beste bij jou en je praktijk past. De AI past alle teksten en kleuren hierop aan.
        </p>
      </div>

      <div className="grid gap-3">
        {STIJL_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={cn(
              'flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all',
              value === option.id
                ? 'border-primary bg-primary/5 shadow-sm'
                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
            )}
          >
            {/* Gradient swatch */}
            <div
              className={cn(
                'w-12 h-12 rounded-lg bg-gradient-to-br flex-shrink-0 flex items-center justify-center',
                option.gradient
              )}
            >
              <span className="material-symbols-outlined text-white text-xl">
                {option.icon}
              </span>
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className={cn(
                'text-sm font-semibold',
                value === option.id ? 'text-primary' : 'text-slate-900 dark:text-white'
              )}>
                {option.label}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {option.description}
              </p>
            </div>

            {/* Radio indicator */}
            <div className={cn(
              'w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center',
              value === option.id
                ? 'border-primary bg-primary'
                : 'border-slate-300 dark:border-slate-600'
            )}>
              {value === option.id && (
                <div className="w-2 h-2 rounded-full bg-white" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
