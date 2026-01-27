// components/templates/sections/StatsSection.tsx
// Stats section met 3 style varianten: grid, inline, cards

'use client';

import { BaseSectionProps, StatsStyle, getRevealClass } from './types';
import { getJarenErvaring } from '@/types';

interface StatsSectionProps extends BaseSectionProps {
  style: StatsStyle;
}

export function StatsSection({ style, theme, palette, content }: StatsSectionProps) {
  const bigCert = content.certificaten?.some((c: any) => c.type === 'big');
  const jarenErvaring = getJarenErvaring(content.werkervaring);
  const aantalDiensten = content.diensten?.length || 0;
  
  // Build stats array
  const stats = [
    jarenErvaring && { value: `${jarenErvaring}+`, label: 'Jaar Ervaring', icon: 'calendar_month' },
    bigCert && { value: 'BIG', label: 'Geregistreerd', icon: 'verified' },
    { value: '24/7', label: 'Bereikbaar', icon: 'schedule' },
    { value: 'ZZP', label: 'Flexibel', icon: 'work' },
    aantalDiensten > 0 && { value: `${aantalDiensten}+`, label: 'Diensten', icon: 'medical_services' },
  ].filter(Boolean).slice(0, 4);
  
  if (stats.length < 2) return null;
  
  switch (style) {
    case 'grid':
      return <StatsGrid {...{ theme, palette, stats }} />;
    case 'inline':
      return <StatsInline {...{ theme, palette, stats }} />;
    case 'cards':
      return <StatsCards {...{ theme, palette, stats }} />;
    default:
      return <StatsGrid {...{ theme, palette, stats }} />;
  }
}

// ============================================
// GRID - 4 kolommen grid
// ============================================
function StatsGrid({ theme, palette, stats }: any) {
  return (
    <section 
      className="py-12 px-6 border-t border-b"
      style={{ borderColor: theme.colors.border, backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className={`${theme.spacing.container} mx-auto`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat: any, i: number) => (
            <div 
              key={i}
              className={`text-center ${getRevealClass('up', i + 1)}`}
            >
              <p 
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{ color: palette.primary }}
              >
                {stat.value}
              </p>
              <p style={{ color: theme.colors.textMuted }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// INLINE - Horizontale rij
// ============================================
function StatsInline({ theme, palette, stats }: any) {
  return (
    <section 
      className="py-8 px-6"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className={`${theme.spacing.container} mx-auto`}>
        <div className={`flex flex-wrap justify-center gap-8 md:gap-16 ${getRevealClass('up')}`}>
          {stats.map((stat: any, i: number) => (
            <div key={i} className="flex items-center gap-3">
              <span 
                className="material-symbols-outlined text-2xl"
                style={{ color: palette.primary }}
              >
                {stat.icon}
              </span>
              <div>
                <p 
                  className="text-xl font-bold"
                  style={{ color: theme.colors.text }}
                >
                  {stat.value}
                </p>
                <p 
                  className="text-sm"
                  style={{ color: theme.colors.textMuted }}
                >
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// CARDS - Kaarten met icons (bold theme)
// ============================================
function StatsCards({ theme, palette, stats }: any) {
  const isDark = theme.isDark;
  
  return (
    <section 
      className="py-16 px-6 border-t"
      style={{ borderColor: theme.colors.border, backgroundColor: theme.colors.background }}
    >
      <div className={`${theme.spacing.container} mx-auto`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat: any, i: number) => (
            <div 
              key={i}
              className={`p-6 ${theme.radius.large} ${theme.shadows.small} ${getRevealClass('up', i + 1)}`}
              style={{ 
                backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : theme.colors.surface,
                borderColor: theme.colors.border,
                border: `1px solid ${theme.colors.border}`
              }}
            >
              <span 
                className="material-symbols-outlined text-2xl mb-3 block"
                style={{ color: palette.primary }}
              >
                {stat.icon}
              </span>
              <p 
                className="text-3xl md:text-4xl font-black"
                style={{ color: palette.primary }}
              >
                {stat.value}
              </p>
              <p 
                className="text-sm mt-1"
                style={{ color: theme.colors.textMuted }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
