// components/templates/sections/StatsSection.tsx
// Stats section - OPTIONELE sectie (AI bepaalt aan/uit)

'use client';

import { BaseSectionProps, StatsStyle, getRevealClass, getJarenErvaring } from './types';

interface StatsSectionProps extends BaseSectionProps {
  style?: StatsStyle;
}

interface Stat {
  value: string;
  label: string;
  icon?: string;
}

export function StatsSection({
  style = 'editorial',
  theme,
  palette,
  content,
  generated,
}: StatsSectionProps) {
  // Prefer AI-generated stats, fall back to computed stats from content
  let stats: Stat[];

  if (generated?.stats && generated.stats.length >= 2) {
    stats = generated.stats;
  } else {
    const jarenErvaring = getJarenErvaring(content.werkervaring);
    const aantalDiensten = content.diensten?.length || 0;
    const werkgebieden = content.contact?.werkgebied?.length || 0;

    const computed: Stat[] = [];
    if (jarenErvaring) {
      computed.push({ value: `${jarenErvaring}+`, label: 'Jaar ervaring', icon: 'timeline' });
    }
    if (aantalDiensten > 0) {
      computed.push({ value: `${aantalDiensten}`, label: 'Diensten', icon: 'medical_services' });
    }
    computed.push({ value: '100%', label: 'Inzet', icon: 'favorite' });
    if (werkgebieden > 0) {
      computed.push({ value: `${werkgebieden}`, label: `Regio${werkgebieden > 1 ? "'s" : ''}`, icon: 'location_on' });
    }
    stats = computed;
  }

  // Don't render if no meaningful stats
  if (stats.length < 2) return null;

  switch (style) {
    case 'editorial':
      return <StatsEditorial {...{ theme, palette, stats }} />;
    case 'proactief':
      return <StatsProactief {...{ theme, palette, stats }} />;
    case 'portfolio':
      return <StatsPortfolio {...{ theme, palette, stats }} />;
    case 'mindoor':
      return <StatsMindoor {...{ theme, palette, stats }} />;
    case 'grid':
      return <StatsGrid {...{ theme, palette, stats }} />;
    case 'inline':
      return <StatsInline {...{ theme, palette, stats }} />;
    case 'cards':
      return <StatsCards {...{ theme, palette, stats }} />;
    case 'minimal':
      return <StatsMinimal {...{ theme, palette, stats }} />;
    case 'serene':
      return <StatsSerene {...{ theme, palette, stats }} />;
    default:
      return <StatsEditorial {...{ theme, palette, stats }} />;
  }
}

// ============================================
// EDITORIAL - Horizontale rij met dividers
// ============================================
function StatsEditorial({ theme, palette, stats }: any) {
  return (
    <section 
      className="px-6 md:px-16 lg:px-32 py-12 border-y"
      style={{ 
        backgroundColor: theme.colors.backgroundAlt,
        borderColor: theme.colors.border 
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className={`flex flex-wrap justify-center gap-8 md:gap-16 ${getRevealClass('up')}`}>
          {stats.map((stat: Stat, index: number) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center"
            >
              <span 
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
              >
                {stat.value}
              </span>
              <span 
                className="text-sm uppercase tracking-widest"
                style={{ color: theme.colors.textMuted }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// PROACTIEF - Gradient achtergrond, grote nummers, decoratieve cirkels
// ============================================
function StatsProactief({ theme, palette, stats }: any) {
  return (
    <section 
      className="py-20 px-6 md:px-12 relative overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, ${palette.primary} 0%, ${palette.primaryDark || palette.primary} 100%)`
      }}
    >
      {/* Decorative circles */}
      <div 
        className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/5"
      />
      <div 
        className="absolute -bottom-36 -right-24 w-96 h-96 rounded-full bg-white/[0.03]"
      />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-10 ${getRevealClass('up')}`}>
          {stats.map((stat: Stat, index: number) => (
            <div 
              key={index} 
              className="text-center"
            >
              <p className="text-5xl md:text-[52px] font-bold text-white leading-none mb-2">
                {stat.value}
              </p>
              <p className="text-[15px] text-white/85">
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
// PORTFOLIO - Gradient achtergrond, Playfair cijfers
// ============================================
function StatsPortfolio({ theme, palette, stats }: any) {
  return (
    <section 
      className="py-20 px-8 md:px-12"
      style={{ 
        background: `linear-gradient(135deg, ${palette.primary} 0%, ${palette.primaryLight || palette.primary} 100%)`
      }}
    >
      <div className="max-w-[1000px] mx-auto">
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-10 ${getRevealClass('up')}`}>
          {stats.map((stat: Stat, index: number) => (
            <div 
              key={index} 
              className="text-center"
            >
              <p 
                className="text-[52px] font-semibold text-white leading-none mb-2"
                style={{ fontFamily: theme.fonts.heading }}
              >
                {stat.value}
              </p>
              <p className="text-sm text-white/80 font-medium">
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
// MINDOOR - Sage bg met decorative circles
// ============================================
function StatsMindoor({ theme, palette, stats }: any) {
  return (
    <section 
      className="py-16 relative overflow-hidden"
      style={{ backgroundColor: palette.primary }}
    >
      {/* Decorative circles */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 ${getRevealClass('up')}`}>
          {stats.map((stat: Stat, index: number) => (
            <div 
              key={index} 
              className="text-center"
            >
              <p 
                className="text-4xl lg:text-5xl text-white font-light"
                style={{ fontFamily: theme.fonts.heading }}
              >
                {stat.value}
              </p>
              <p className="mt-2 text-sm lg:text-base" style={{ color: `${palette.primaryLight || 'rgba(255,255,255,0.8)'}` }}>
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
// GRID - 2x2 of 4-kolom grid
// ============================================
function StatsGrid({ theme, palette, stats }: any) {
  return (
    <section 
      className="py-16 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat: Stat, index: number) => (
            <div 
              key={index} 
              className={`text-center p-6 rounded-xl ${getRevealClass('up', index + 1)}`}
              style={{ backgroundColor: theme.colors.backgroundAlt }}
            >
              <span 
                className="material-symbols-outlined text-3xl mb-4 block"
                style={{ color: palette.primary }}
              >
                {stat.icon}
              </span>
              <p 
                className="text-3xl md:text-4xl font-bold mb-2"
                style={{ color: palette.primary }}
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
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// INLINE - Horizontale strip
// ============================================
function StatsInline({ theme, palette, stats }: any) {
  return (
    <section 
      className="py-8 px-6"
      style={{ backgroundColor: palette.primary }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {stats.map((stat: Stat, index: number) => (
            <div key={index} className="flex items-center gap-3 text-white">
              <span className="text-3xl md:text-4xl font-bold">
                {stat.value}
              </span>
              <span className="text-sm opacity-80">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// CARDS - Kaarten met icons
// ============================================
function StatsCards({ theme, palette, stats }: any) {
  return (
    <section 
      className="py-16 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat: Stat, index: number) => (
            <div 
              key={index} 
              className={`p-6 rounded-xl border ${getRevealClass('up', index + 1)}`}
              style={{ 
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border
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

// ============================================
// MINIMAL - Simpele tekst
// ============================================
function StatsMinimal({ theme, palette, stats }: any) {
  return (
    <section 
      className="py-12 px-6 border-y"
      style={{ borderColor: theme.colors.border }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap justify-center gap-12">
          {stats.slice(0, 3).map((stat: Stat, index: number) => (
            <div key={index} className="text-center">
              <span 
                className="text-2xl font-light"
                style={{ color: theme.colors.text }}
              >
                <strong style={{ color: palette.primary }}>{stat.value}</strong> {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// SERENE - Zen-like, minimaal, veel witruimte
// ============================================
function StatsSerene({ theme, palette, stats }: any) {
  return (
    <section className="px-6 lg:px-12 py-16" style={{ backgroundColor: theme.colors.background }}>
      <div className={`max-w-4xl mx-auto ${getRevealClass('up')}`}>
        <div className="flex flex-wrap justify-center items-baseline gap-x-12 gap-y-8">
          {stats.map((stat: Stat, i: number) => (
            <div key={i} className="flex items-baseline gap-3">
              <span
                className="text-3xl sm:text-4xl font-light"
                style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
              >
                {stat.value}
              </span>
              <span
                className="text-[10px] uppercase tracking-[0.2em]"
                style={{ color: theme.colors.textMuted }}
              >
                {stat.label}
              </span>
              {i < stats.length - 1 && (
                <span
                  className="hidden sm:block w-px h-6 ml-6"
                  style={{ backgroundColor: theme.colors.border }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
