// components/wizard/steps/StepOverMij.tsx

'use client';

import { Textarea } from '@/components/ui';

interface StepOverMijProps {
  value: string;
  onChange: (value: string) => void;
}

export function StepOverMij({ value, onChange }: StepOverMijProps) {
  return (
    <div className="p-6 md:p-8 flex flex-col gap-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold leading-tight mb-2">
          Vertel iets over jezelf
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-base">
          Je profieltekst is het eerste wat cliënten lezen. Vertel kort over je passie voor zorg, je ervaring en wat jou uniek maakt.
        </p>
      </div>

      {/* Textarea */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <label className="text-slate-900 dark:text-white text-base font-bold">
            Persoonlijke bio
          </label>
          {/* AI Helper Button (placeholder) */}
          <button
            type="button"
            className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-lg">auto_fix</span>
            <span className="text-sm font-bold">Laat AI helpen schrijven</span>
          </button>
        </div>

        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Bijv: Ik ben een gepassioneerde verpleegkundige met 10 jaar ervaring in de thuiszorg. Mijn aanpak is rustig, empathisch en altijd gefocust op de wensen van de cliënt. Na mijn HBO-V opleiding heb ik me gespecialiseerd in palliatieve zorg en wondverzorging..."
          maxLength={1000}
          showCount
          className="min-h-[250px]"
        />
      </div>

      {/* Tips */}
      <div className="flex gap-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
        <span className="material-symbols-outlined text-primary">lightbulb</span>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-bold text-primary">Tips voor een sterke tekst:</p>
          <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc pl-4">
            <li>Focus op je ervaring en wat je uniek maakt.</li>
            <li>Houd het persoonlijk maar professioneel.</li>
            <li>Noem specifieke vaardigheden of specialisaties.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
