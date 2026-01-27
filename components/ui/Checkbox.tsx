// components/ui/Checkbox.tsx

import { cn } from '@/lib/utils';
import { InputHTMLAttributes, forwardRef } from 'react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, ...props }, ref) => {
    return (
      <label className="flex items-start gap-3 cursor-pointer group">
        <div className="flex items-center h-6">
          <input
            ref={ref}
            type="checkbox"
            className={cn(
              'h-5 w-5 rounded border-2 border-slate-300 dark:border-slate-600',
              'text-primary bg-transparent',
              'checked:bg-primary checked:border-primary',
              'focus:ring-2 focus:ring-primary/20 focus:ring-offset-0',
              'cursor-pointer transition-all',
              className
            )}
            {...props}
          />
        </div>
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <span className="text-slate-900 dark:text-white text-base font-medium group-hover:text-primary transition-colors">
                {label}
              </span>
            )}
            {description && (
              <span className="text-slate-500 dark:text-slate-400 text-sm">
                {description}
              </span>
            )}
          </div>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
