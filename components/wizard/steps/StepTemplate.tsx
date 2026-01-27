// components/wizard/steps/StepTemplate.tsx

'use client';

import { cn } from '@/lib/utils';
import { TEMPLATES, TemplateId } from '@/constants';

interface StepTemplateProps {
  value: string;
  onChange: (templateId: TemplateId) => void;
}

// Placeholder images for templates
const TEMPLATE_IMAGES: Record<TemplateId, string> = {
  warm: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=500&fit=crop',
  modern: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=400&h=500&fit=crop',
  editorial: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=500&fit=crop',
};

export function StepTemplate({ value, onChange }: StepTemplateProps) {
  return (
    <div className="p-6 md:p-8 flex flex-col gap-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold leading-tight mb-2">
          Kies je design
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-base">
          Selecteer een stijl die het beste bij jouw praktijk past. Je kunt dit later altijd nog aanpassen.
        </p>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TEMPLATES.map((template) => {
          const isSelected = value === template.id;

          return (
            <label key={template.id} className="group relative cursor-pointer">
              <input
                type="radio"
                name="template"
                value={template.id}
                checked={isSelected}
                onChange={() => onChange(template.id as TemplateId)}
                className="peer sr-only"
              />
              <div
                className={cn(
                  'flex flex-col bg-white dark:bg-slate-900 rounded-xl overflow-hidden',
                  'border-2 shadow-sm transition-all',
                  'group-hover:shadow-md',
                  isSelected
                    ? 'border-primary ring-2 ring-primary/20'
                    : 'border-slate-200 dark:border-slate-800'
                )}
              >
                {/* Template Preview Image */}
                <div
                  className="aspect-[4/5] bg-cover bg-center relative"
                  style={{
                    backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 40%), url(${TEMPLATE_IMAGES[template.id as TemplateId]})`,
                  }}
                >
                  {isSelected && (
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                      <span className="material-symbols-outlined">check_circle</span>
                      <span className="text-xs font-bold uppercase tracking-wider">
                        Geselecteerd
                      </span>
                    </div>
                  )}
                </div>

                {/* Template Info */}
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {template.naam}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {template.beschrijving}
                    </p>
                  </div>
                  <div
                    className={cn(
                      'h-6 w-6 rounded-full border-2 flex items-center justify-center',
                      isSelected ? 'border-primary' : 'border-slate-300 dark:border-slate-600'
                    )}
                  >
                    {isSelected && <div className="h-3 w-3 rounded-full bg-primary" />}
                  </div>
                </div>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
