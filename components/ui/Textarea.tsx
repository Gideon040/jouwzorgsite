// components/ui/Textarea.tsx

import { cn } from '@/lib/utils';
import { TextareaHTMLAttributes, forwardRef } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  maxLength?: number;
  showCount?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, maxLength, showCount, value, ...props }, ref) => {
    const charCount = typeof value === 'string' ? value.length : 0;

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className="text-slate-900 dark:text-white text-base font-semibold">
            {label}
          </label>
        )}
        <div className="relative">
          <textarea
            ref={ref}
            value={value}
            maxLength={maxLength}
            className={cn(
              'form-input w-full rounded-lg text-slate-900 dark:text-white',
              'border border-slate-200 dark:border-slate-700',
              'bg-white dark:bg-slate-800',
              'focus:border-primary focus:ring-2 focus:ring-primary/20',
              'p-4 text-base min-h-[150px] resize-none',
              'placeholder:text-slate-400',
              'transition-all duration-200',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
              className
            )}
            {...props}
          />
          {showCount && maxLength && (
            <div className="absolute bottom-3 right-3 bg-white/80 dark:bg-slate-900/80 px-2 py-1 rounded text-xs text-slate-500">
              {charCount} / {maxLength}
            </div>
          )}
        </div>
        {hint && !error && (
          <p className="text-xs text-slate-500 dark:text-slate-400">{hint}</p>
        )}
        {error && (
          <p className="text-xs text-red-500 flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">error</span>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
