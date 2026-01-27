// components/site/SiteAbout.tsx

import { cn } from '@/lib/utils';

interface SiteAboutProps {
  text: string;
  template?: 'warm' | 'modern' | 'editorial';
}

export function SiteAbout({ text, template = 'warm' }: SiteAboutProps) {
  const containerStyles = {
    warm: 'bg-white',
    modern: 'bg-slate-50',
    editorial: 'bg-slate-800',
  };

  const titleStyles = {
    warm: 'text-orange-900',
    modern: 'text-slate-900',
    editorial: 'text-white',
  };

  const textStyles = {
    warm: 'text-slate-700',
    modern: 'text-slate-600',
    editorial: 'text-slate-300',
  };

  const accentStyles = {
    warm: 'bg-orange-500',
    modern: 'bg-blue-600',
    editorial: 'bg-white',
  };

  // Split text into paragraphs
  const paragraphs = text.split('\n').filter((p) => p.trim());

  return (
    <section id="over" className={cn('py-16 md:py-20 px-4', containerStyles[template])}>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className={cn('w-12 h-1 rounded-full', accentStyles[template])} />
          <h2 className={cn('text-2xl md:text-3xl font-bold', titleStyles[template])}>
            Over mij
          </h2>
        </div>
        
        <div className={cn('space-y-4 text-lg leading-relaxed', textStyles[template])}>
          {paragraphs.length > 0 ? (
            paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))
          ) : (
            <p>{text}</p>
          )}
        </div>
      </div>
    </section>
  );
}
