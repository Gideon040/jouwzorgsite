// components/site/SiteHeader.tsx

import { cn } from '@/lib/utils';

interface SiteHeaderProps {
  naam: string;
  template?: 'warm' | 'modern' | 'editorial';
}

export function SiteHeader({ naam, template = 'warm' }: SiteHeaderProps) {
  const styles = {
    warm: 'bg-orange-50 border-orange-100',
    modern: 'bg-white border-slate-200',
    editorial: 'bg-slate-900 border-slate-800 text-white',
  };

  const textStyles = {
    warm: 'text-orange-900',
    modern: 'text-slate-900',
    editorial: 'text-white',
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b px-4 py-3',
        styles[template]
      )}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <h1 className={cn('text-lg font-bold', textStyles[template])}>
          {naam}
        </h1>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#over" className={cn('text-sm font-medium hover:opacity-70 transition-opacity', textStyles[template])}>
            Over mij
          </a>
          <a href="#diensten" className={cn('text-sm font-medium hover:opacity-70 transition-opacity', textStyles[template])}>
            Diensten
          </a>
          <a href="#certificaten" className={cn('text-sm font-medium hover:opacity-70 transition-opacity', textStyles[template])}>
            Kwalificaties
          </a>
          <a href="#contact" className={cn('text-sm font-medium hover:opacity-70 transition-opacity', textStyles[template])}>
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
