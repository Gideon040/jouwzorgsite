// components/wizard/WizardProgress.tsx

import { cn } from '@/lib/utils';

interface WizardProgressProps {
  currentStep: number;
  totalSteps: number;
  stepLabel: string;
}

export function WizardProgress({ currentStep, totalSteps, stepLabel }: WizardProgressProps) {
  const progress = (currentStep / totalSteps) * 100;
  const stepsRemaining = totalSteps - currentStep;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
      <div className="flex flex-col gap-3">
        <div className="flex gap-6 justify-between items-center">
          <p className="text-slate-900 dark:text-white text-base font-bold">
            Stap {currentStep} van {totalSteps}
          </p>
          <p className="text-primary text-sm font-semibold">
            {Math.round(progress)}% voltooid
          </p>
        </div>
        <div className="w-full rounded-full bg-slate-200 dark:bg-slate-700 h-2.5 overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          {stepLabel}
          {stepsRemaining > 0 && ` • Nog ${stepsRemaining} ${stepsRemaining === 1 ? 'stap' : 'stappen'} te gaan`}
        </p>
      </div>
    </div>
  );
}
