// components/templates/sections/HeroSection.tsx
// Hero section met meerdere varianten per template
// 
// ============================================
// EDGE FUNCTION REFERENTIE
// ============================================
// 
// Beschikbare styles per template:
//
// EDITORIAL:  ['editorial', 'editorial-2', 'editorial-3']
// PROACTIEF:  ['proactief', 'proactief-2', 'proactief-3']
// PORTFOLIO:  ['portfolio', 'portfolio-2', 'portfolio-3']
// MINDOOR:    ['mindoor', 'mindoor-2', 'mindoor-3']
// SERENE:     ['serene', 'serene-2', 'serene-3']
//
// Legacy (niet template-specifiek):
// ['split', 'centered', 'fullwidth', 'minimal']
//
// ============================================
// DATA FLOW
// ============================================
//
// Edge function → page.tsx → Site object → TemplateRenderer → HeroSection
//
// generated?.hero?.titel       → AI-gegenereerde hero titel
// generated?.hero?.subtitel    → AI-gegenereerde subtitel
// generated?.overMij?.intro    → AI-gegenereerde intro tekst
// generated?.cta?.button       → AI-gegenereerde CTA tekst
// generated?.stats[]           → AI-gegenereerde statistieken [{value, label}]
//
// content.naam                 → Naam van zorgprofessional
// content.werkervaring[]       → Array met {startJaar/start_jaar, eindJaar, functie, werkgever}
// content.certificaten[]       → Array met {type, label, value}
// content.contact.werkgebied[] → Werkgebied regio's
// content.beschikbaar          → Boolean beschikbaarheid
// content.foto                 → Optionele eigen foto URL
//
// ============================================

'use client';

import { BaseSectionProps, HeroStyle, getRevealClass, getJarenErvaring } from './types';

// ============================================
// UNSPLASH IMAGE POOLS
// ============================================
// Per beroep meerdere hero images voor variatie
// Alle images: landscape, professioneel, zorg-gerelateerd

const HERO_IMAGE_POOLS: Record<string, string[]> = {
  verpleegkundige: [
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1551190822-a9ce113ac100?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1920&q=80',
  ],
  verzorgende_ig: [
    'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1581594549595-35f6edc7b762?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1920&q=80',
  ],
  kraamverzorgende: [
    'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=1920&q=80',
  ],
  ggz: [
    'https://images.unsplash.com/photo-1527137342181-19aab11a8ee8?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1920&q=80',
  ],
  fysiotherapeut: [
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1598257006458-087169a1f08d?auto=format&fit=crop&w=1920&q=80',
  ],
  thuiszorg: [
    'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1581594549595-35f6edc7b762?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1920&q=80',
  ],
  ouderenzorg: [
    'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1517939782552-3e3e3c8f0a47?auto=format&fit=crop&w=1920&q=80',
  ],
  default: [
    'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920&q=80',
  ],
};

// Social proof avatar images (for Mindoor variants)
const SOCIAL_PROOF_AVATARS = [
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
];

function getHeroImage(beroep: string): string {
  const pool = HERO_IMAGE_POOLS[beroep] || HERO_IMAGE_POOLS.default;
  return pool[Math.floor(Math.random() * pool.length)];
}

// ============================================
// SHARED HERO PROPS INTERFACE
// ============================================

interface SharedHeroProps {
  theme: BaseSectionProps['theme'];
  palette: BaseSectionProps['palette'];
  content: BaseSectionProps['content'];
  generated?: BaseSectionProps['generated'];
  heroTitel: string;
  heroSubtitel: string;
  heroIntro: string;
  ctaText: string;
  heroImage: string;
  beroepLabel: string;
  beschikbaar: boolean;
  werkgebied: string;
  hasBIG: boolean;
  jarenErvaring: number | null;
  stats: { value: string; label: string }[];
  naam: string;
}

// ============================================
// MAIN COMPONENT
// ============================================

interface HeroSectionProps extends BaseSectionProps {
  style?: HeroStyle;
}

export function HeroSection({ 
  style = 'editorial', 
  theme, 
  palette, 
  content, 
  generated, 
  beroepLabel 
}: HeroSectionProps) {
  // ============================================
  // DATA EXTRACTIE — allemaal uit edge function response
  // ============================================
  
  // AI-gegenereerde content
  const heroTitel = generated?.hero?.titel || content.naam || 'Zorg met Aandacht';
  const heroSubtitel = generated?.hero?.subtitel || content.tagline || 'Professionele zorg met persoonlijke aandacht';
  const heroIntro = generated?.overMij?.intro || '';
  const ctaText = generated?.cta?.button || 'Neem contact op';
  
  // Stats uit edge function (dynamisch, niet hardcoded)
  const stats = generated?.stats || [
    { value: '10+', label: 'Jaar ervaring' },
    { value: '100+', label: 'Tevreden cliënten' },
    { value: '24/7', label: 'Bereikbaar' },
    { value: 'BIG', label: 'Geregistreerd' },
  ];
  
  // Content data
  const beschikbaar = content.beschikbaar !== false;
  const werkgebied = content.contact?.werkgebied?.[0] || 'Regio';
  const hasBIG = content.certificaten?.some(c => c.type === 'big') || false;
  const jarenErvaring = getJarenErvaring(content.werkervaring);
  const heroImage = content.foto || getHeroImage(beroepLabel);
  const naam = content.naam || '';
  
  // Shared props voor alle varianten
  const sharedProps: SharedHeroProps = {
    theme,
    palette,
    content,
    generated,
    heroTitel,
    heroSubtitel,
    heroIntro,
    ctaText,
    heroImage,
    beroepLabel,
    beschikbaar,
    werkgebied,
    hasBIG,
    jarenErvaring,
    stats,
    naam,
  };
  
  switch (style) {
    // EDITORIAL
    case 'editorial':      return <HeroEditorial {...sharedProps} />;
    case 'editorial-2':    return <HeroEditorial2 {...sharedProps} />;
    case 'editorial-3':    return <HeroEditorial3 {...sharedProps} />;
    // PROACTIEF
    case 'proactief':      return <HeroProactief {...sharedProps} />;
    case 'proactief-2':    return <HeroProactief2 {...sharedProps} />;
    case 'proactief-3':    return <HeroProactief3 {...sharedProps} />;
    // PORTFOLIO
    case 'portfolio':      return <HeroPortfolio {...sharedProps} />;
    case 'portfolio-2':    return <HeroPortfolio2 {...sharedProps} />;
    case 'portfolio-3':    return <HeroPortfolio3 {...sharedProps} />;
    // MINDOOR
    case 'mindoor':        return <HeroMindoor {...sharedProps} />;
    case 'mindoor-2':      return <HeroMindoor2 {...sharedProps} />;
    case 'mindoor-3':      return <HeroMindoor3 {...sharedProps} />;
    // SERENE
    case 'serene':         return <HeroSerene {...sharedProps} />;
    case 'serene-2':       return <HeroSerene2 {...sharedProps} />;
    case 'serene-3':       return <HeroSerene3 {...sharedProps} />;
    // LEGACY
    case 'split':          return <HeroSplit {...sharedProps} />;
    case 'centered':       return <HeroCentered {...sharedProps} />;
    case 'fullwidth':      return <HeroFullwidth {...sharedProps} />;
    case 'minimal':        return <HeroMinimal {...sharedProps} />;
    default:               return <HeroEditorial {...sharedProps} />;
  }
}

// ============================================
// HELPER: USP Badges
// ============================================

function USPBadges({ hasBIG, werkgebied, beschikbaar, theme, palette, variant = 'badge' }: {
  hasBIG: boolean;
  werkgebied: string;
  beschikbaar: boolean;
  theme: SharedHeroProps['theme'];
  palette: SharedHeroProps['palette'];
  variant?: 'badge' | 'dot' | 'check' | 'inline-text' | 'pill-white';
}) {
  const items = [
    ...(hasBIG ? [{ label: 'BIG-geregistreerd', icon: 'verified' }] : []),
    { label: 'DBA-compliant', icon: 'shield' },
    { label: 'VOG & Verzekerd', icon: 'verified_user' },
    { label: werkgebied, icon: 'location_on' },
  ];

  if (variant === 'badge') {
    return (
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <span 
            key={i}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border"
            style={{ borderColor: theme.colors.border, color: theme.colors.text }}
          >
            <span className="material-symbols-outlined text-sm" style={{ color: palette.primary }}>check</span>
            {item.label}
          </span>
        ))}
        {beschikbaar && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Beschikbaar
          </span>
        )}
      </div>
    );
  }

  if (variant === 'dot') {
    return (
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm" style={{ color: theme.colors.textMuted }}>
        {items.slice(0, 3).map((item, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full" style={{ background: palette.primary }} />
            {item.label}
          </span>
        ))}
      </div>
    );
  }

  if (variant === 'check') {
    return (
      <div className="space-y-2">
        {items.slice(0, 3).map((item, i) => (
          <div key={i} className="flex items-center gap-3 text-sm" style={{ color: theme.colors.text }}>
            <span className="material-symbols-outlined text-base" style={{ color: palette.primary }}>check_circle</span>
            {item.label}
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'inline-text') {
    return (
      <div className="flex flex-wrap gap-4">
        {items.slice(0, 3).map((item, i) => (
          <span key={i} className="flex items-center gap-2 text-sm" style={{ color: theme.colors.text }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: palette.accent || palette.primary }} />
            {item.label}
          </span>
        ))}
      </div>
    );
  }

  if (variant === 'pill-white') {
    return (
      <div className="flex flex-wrap gap-4">
        {items.slice(0, 3).map((item, i) => (
          <span key={i} className="flex items-center gap-2 text-sm text-white/80">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: palette.accent || '#9ccc65' }} />
            {item.label}
          </span>
        ))}
      </div>
    );
  }

  return null;
}

// ============================================
// HELPER: Stats Display
// ============================================

function StatsDisplay({ stats, theme, palette, variant = 'default', max = 3 }: {
  stats: { value: string; label: string }[];
  theme: SharedHeroProps['theme'];
  palette: SharedHeroProps['palette'];
  variant?: 'default' | 'compact' | 'white' | 'primary-color' | 'large';
  max?: number;
}) {
  const displayStats = stats.slice(0, max);

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-4">
        {displayStats.slice(0, 2).map((stat, i) => (
          <div key={i} className="flex items-center gap-4">
            {i > 0 && <div className="w-px h-10" style={{ background: theme.colors.border }} />}
            <div className="text-center">
              <p className="text-2xl font-semibold" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>
                {stat.value}
              </p>
              <p className="text-[10px] uppercase tracking-widest" style={{ color: theme.colors.textMuted }}>
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'white') {
    return (
      <div className="flex gap-10 pt-8 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
        {displayStats.map((stat, i) => (
          <div key={i}>
            <span className="text-4xl text-white block mb-1" style={{ fontFamily: theme.fonts.heading }}>
              {stat.value}
            </span>
            <span className="text-[9px] uppercase tracking-[1px] text-white/50">{stat.label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'primary-color') {
    return (
      <div className="flex gap-8 pt-8 border-t" style={{ borderColor: theme.colors.border }}>
        {displayStats.map((stat, i) => (
          <div key={i}>
            <p className="text-3xl font-bold" style={{ color: palette.primary }}>{stat.value}</p>
            <p className="text-[11px] font-medium uppercase tracking-wider" style={{ color: theme.colors.textMuted }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'large') {
    return (
      <div className="flex gap-10 pt-8 border-t" style={{ borderColor: theme.colors.border }}>
        {displayStats.map((stat, i) => (
          <div key={i}>
            <p className="text-4xl" style={{ fontFamily: theme.fonts.heading, color: palette.primary }}>
              {stat.value}
            </p>
            <p className="text-sm" style={{ color: theme.colors.textMuted }}>{stat.label}</p>
          </div>
        ))}
      </div>
    );
  }

  // default
  return (
    <div className="flex items-center gap-6">
      {displayStats.slice(0, 2).map((stat, i) => (
        <div key={i} className="flex items-center gap-6">
          {i > 0 && <div className="w-px h-12" style={{ background: theme.colors.border }} />}
          <div>
            <p className="text-3xl font-semibold" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>
              {stat.value}
            </p>
            <p className="text-[10px] uppercase tracking-widest" style={{ color: theme.colors.textMuted }}>
              {stat.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================
// HELPER: Beschikbaar Badge
// ============================================

function BeschikbaarBadge({ beschikbaar, variant = 'default' }: {
  beschikbaar: boolean;
  variant?: 'default' | 'dark' | 'pill';
}) {
  if (!beschikbaar) return null;

  if (variant === 'dark') {
    return (
      <div className="flex items-center gap-2 mb-8">
        <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
        <span className="text-sm font-medium text-emerald-300">Beschikbaar voor opdrachten</span>
      </div>
    );
  }

  if (variant === 'pill') {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-emerald-500/20">
        <span className="w-2 h-2 rounded-full animate-pulse bg-emerald-400" />
        <span className="text-[13px] font-medium text-emerald-300">Beschikbaar voor opdrachten</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 mb-6">
      <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
      <span className="text-sm font-medium text-emerald-700">Beschikbaar voor opdrachten</span>
    </div>
  );
}


// ============================================
// EDITORIAL - Classic Split
// ============================================
function HeroEditorial({ 
  theme, palette, heroTitel, heroSubtitel, heroIntro, ctaText, 
  heroImage, beroepLabel, beschikbaar, werkgebied, hasBIG,
}: SharedHeroProps) {
  return (
    <section 
      className="px-6 md:px-16 lg:px-32 py-16 lg:py-24 pt-28 lg:pt-32"
      style={{ background: theme.colors.background }}
    >
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-6xl mx-auto">
        <div className={`flex flex-col flex-1 gap-6 ${getRevealClass('left')}`}>
          <span 
            className="text-xs font-semibold uppercase tracking-[0.15em]"
            style={{ fontVariant: 'small-caps', color: palette.primary }}
          >
            {beroepLabel}
          </span>
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] italic"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            {heroTitel}
          </h1>
          <p className="text-xl" style={{ fontFamily: theme.fonts.heading, color: theme.colors.textMuted }}>
            {heroSubtitel}
          </p>
          {heroIntro && (
            <p className="text-base leading-relaxed max-w-lg" style={{ color: theme.colors.textMuted }}>
              {heroIntro}
            </p>
          )}
          <USPBadges hasBIG={hasBIG} werkgebied={werkgebied} beschikbaar={beschikbaar} theme={theme} palette={palette} variant="badge" />
          <div className="flex flex-wrap gap-4 pt-4">
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center gap-2 h-12 px-6 text-white text-sm font-semibold uppercase tracking-widest transition-colors"
              style={{ backgroundColor: palette.primary }}
            >
              {ctaText}
            </a>
            <a 
              href="#over" 
              className="inline-flex items-center justify-center gap-2 h-12 px-6 border text-sm font-semibold uppercase tracking-widest transition-colors"
              style={{ borderColor: theme.colors.border, color: theme.colors.textMuted }}
            >
              Bekijk profiel
            </a>
          </div>
        </div>
        <div className={`flex-1 w-full max-w-md lg:max-w-none ${getRevealClass('right')}`}>
          <div 
            className="aspect-[4/5] w-full bg-center bg-no-repeat bg-cover rounded"
            style={{ backgroundImage: `url('${heroImage}')` }}
          />
        </div>
      </div>
    </section>
  );
}


// ============================================
// EDITORIAL-2 - Organic Shape
// ============================================
function HeroEditorial2({ 
  theme, palette, heroTitel, heroSubtitel, heroIntro, ctaText, 
  heroImage, beroepLabel, beschikbaar, hasBIG, jarenErvaring, stats,
}: SharedHeroProps) {
  return (
    <section 
      className="min-h-screen flex items-center px-6 md:px-12 lg:px-20 py-24 lg:py-32"
      style={{ background: theme.colors.surface }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className={getRevealClass('left')}>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: theme.colors.textMuted }}>
                {beroepLabel}
              </span>
              <div className="flex-1 h-px max-w-[100px]" style={{ background: theme.colors.border }} />
            </div>
            <h1 
              className="text-5xl md:text-6xl lg:text-7xl leading-[1] italic mb-6"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {heroTitel.split(' ').slice(0, 2).join(' ')}<br/>
              {heroTitel.split(' ').slice(2).join(' ')}
            </h1>
            <p className="text-xl md:text-2xl mb-8" style={{ fontFamily: theme.fonts.heading, color: theme.colors.textMuted }}>
              {heroSubtitel}
            </p>
            <USPBadges hasBIG={hasBIG} werkgebied="" beschikbaar={false} theme={theme} palette={palette} variant="dot" />
            {heroIntro && (
              <p className="text-sm leading-[1.9] mt-6 mb-10 max-w-md" style={{ color: theme.colors.textMuted }}>
                {heroIntro}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors"
                style={{ backgroundColor: palette.primary }}
              >
                {ctaText}
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </a>
              <a href="#over" className="text-sm font-medium underline underline-offset-4 transition-colors" style={{ color: theme.colors.text }}>
                Meer over mij
              </a>
            </div>
            <BeschikbaarBadge beschikbaar={beschikbaar} />
          </div>
          
          <div className={`relative ${getRevealClass('right')}`}>
            <div 
              className="absolute -inset-4 lg:-inset-6"
              style={{ background: theme.colors.background, borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}
            />
            <div 
              className="relative aspect-[4/5] w-full max-w-md lg:max-w-none mx-auto bg-cover bg-center"
              style={{ backgroundImage: `url('${heroImage}')`, borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}
            />
            <div className="absolute -bottom-4 -left-4 lg:bottom-8 lg:-left-8 p-5 rounded-lg shadow-xl" style={{ background: theme.colors.surface }}>
              <StatsDisplay stats={stats} theme={theme} palette={palette} variant="compact" max={2} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


// ============================================
// EDITORIAL-3 - Diagonal Cut
// ============================================
function HeroEditorial3({ 
  theme, palette, heroTitel, heroSubtitel, heroIntro, ctaText, 
  heroImage, beroepLabel, beschikbaar, hasBIG, stats,
}: SharedHeroProps) {
  return (
    <section 
      className="min-h-screen flex items-center px-6 md:px-12 lg:px-20 py-24 lg:py-32"
      style={{ background: theme.colors.background }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className={`lg:col-span-5 ${getRevealClass('left')}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px" style={{ background: palette.primary }} />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: palette.primary }}>
                {beroepLabel}
              </span>
            </div>
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] italic mb-5"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {heroTitel}
            </h1>
            <p className="text-lg md:text-xl mb-6" style={{ fontFamily: theme.fonts.heading, color: theme.colors.textMuted }}>
              {heroSubtitel}
            </p>
            {heroIntro && (
              <p className="text-sm leading-[1.8] mb-8" style={{ color: theme.colors.textMuted }}>
                {heroIntro}
              </p>
            )}
            <div className="mb-8">
              <USPBadges hasBIG={hasBIG} werkgebied="" beschikbaar={false} theme={theme} palette={palette} variant="check" />
            </div>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors"
                style={{ backgroundColor: palette.primary }}
              >
                {ctaText}
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </a>
              <a 
                href="#over" 
                className="inline-flex items-center gap-2 px-6 py-3 border text-sm font-semibold uppercase tracking-widest transition-colors"
                style={{ borderColor: theme.colors.border, color: theme.colors.textMuted }}
              >
                Profiel
              </a>
            </div>
          </div>
          
          <div className={`lg:col-span-7 relative ${getRevealClass('right')}`}>
            <div 
              className="aspect-[4/3] lg:aspect-[5/4] w-full bg-cover bg-center"
              style={{ backgroundImage: `url('${heroImage}')`, clipPath: 'polygon(8% 0, 100% 0, 100% 100%, 0 100%)' }}
            />
            {beschikbaar && (
              <div className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 rounded-full shadow-lg" style={{ background: theme.colors.surface }}>
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-emerald-700">Beschikbaar</span>
              </div>
            )}
            <div className="absolute bottom-6 left-0 flex items-center gap-6 px-6 py-4 shadow-xl" style={{ background: theme.colors.surface }}>
              <StatsDisplay stats={stats} theme={theme} palette={palette} variant="default" max={2} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


// ============================================
// PROACTIEF - Sharp Split
// ============================================
function HeroProactief({ 
  theme, palette, heroTitel, heroSubtitel, heroIntro, ctaText, 
  heroImage, beroepLabel, beschikbaar, werkgebied, hasBIG, stats,
}: SharedHeroProps) {
  return (
    <section 
      className="min-h-screen flex items-center px-6 md:px-12 lg:px-20 py-24 lg:py-32 relative overflow-hidden"
      style={{ background: theme.colors.background }}
    >
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-[0.03]" style={{ background: palette.primary }} />
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className={getRevealClass('left')}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-1" style={{ background: palette.primary }} />
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: palette.primary }}>
                {beroepLabel}
              </span>
            </div>
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-4"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {heroTitel}
            </h1>
            <p className="text-xl mb-6" style={{ color: theme.colors.textMuted }}>{heroSubtitel}</p>
            {heroIntro && (
              <p className="text-base leading-relaxed mb-8 max-w-lg" style={{ color: theme.colors.textMuted }}>
                {heroIntro}
              </p>
            )}
            <div className="mb-8">
              <USPBadges hasBIG={hasBIG} werkgebied={werkgebied} beschikbaar={false} theme={theme} palette={palette} variant="inline-text" />
            </div>
            <BeschikbaarBadge beschikbaar={beschikbaar} />
            <div className="flex flex-wrap gap-4">
              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 h-12 px-7 text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: palette.accent || palette.primary }}
              >
                {ctaText}
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </a>
              <a 
                href="#diensten" 
                className="inline-flex items-center gap-2 h-12 px-7 text-sm font-semibold border transition-all hover:bg-slate-50"
                style={{ borderColor: theme.colors.border, color: theme.colors.text }}
              >
                Bekijk diensten
              </a>
            </div>
          </div>
          
          <div className={`relative ${getRevealClass('right')}`}>
            <div className="absolute left-0 top-8 bottom-8 w-1" style={{ background: palette.primary }} />
            <div 
              className="aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 lg:ml-auto bg-cover bg-center ml-4"
              style={{ backgroundImage: `url('${heroImage}')` }}
            />
            <div 
              className="absolute -bottom-6 -left-4 lg:left-0 p-5 border-l-4"
              style={{ borderColor: palette.primary, background: theme.colors.surface }}
            >
              <StatsDisplay stats={stats} theme={theme} palette={palette} variant="primary-color" max={2} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


// ============================================
// PROACTIEF-2 - Card Grid
// ============================================
function HeroProactief2({ 
  theme, palette, heroTitel, heroSubtitel, heroIntro, ctaText, 
  heroImage, beroepLabel, beschikbaar, werkgebied, hasBIG, jarenErvaring, stats,
}: SharedHeroProps) {
  const uspItems = [
    ...(hasBIG ? [{ icon: 'verified', label: 'BIG-geregistreerd' }] : []),
    { icon: 'shield', label: 'DBA-compliant' },
    { icon: 'verified_user', label: 'VOG & Verzekerd' },
    { icon: 'location_on', label: werkgebied },
  ];

  return (
    <section 
      className="min-h-screen flex items-center px-6 md:px-12 lg:px-20 py-24 lg:py-32 relative overflow-hidden"
      style={{ background: theme.colors.backgroundAlt }}
    >
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full opacity-[0.03]" style={{ background: palette.primary }} />
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className={`relative order-2 lg:order-1 ${getRevealClass('left')}`}>
            <div 
              className="aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 rounded-[20px] bg-cover bg-center"
              style={{ backgroundImage: `url('${heroImage}')` }}
            />
            {beschikbaar && (
              <div className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white rounded-full">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-emerald-700">Beschikbaar</span>
              </div>
            )}
            <div className="absolute -bottom-5 right-6 lg:right-auto lg:-right-8 rounded-[20px] px-6 py-4" style={{ background: theme.colors.surface }}>
              <p className="text-2xl font-bold" style={{ color: palette.primary }}>
                {stats[0]?.value || `${jarenErvaring || 10}+`}
              </p>
              <p className="text-xs" style={{ color: theme.colors.textMuted }}>
                {stats[0]?.label || 'Jaar ervaring'}
              </p>
            </div>
          </div>
          
          <div className={`order-1 lg:order-2 ${getRevealClass('right')}`}>
            <span className="text-sm italic mb-3 block" style={{ color: palette.primary }}>{beroepLabel}</span>
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-4"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {heroTitel}
            </h1>
            <p className="text-xl mb-6" style={{ color: theme.colors.textMuted }}>{heroSubtitel}</p>
            {heroIntro && (
              <p className="text-[15px] leading-relaxed mb-8 max-w-lg" style={{ color: theme.colors.textMuted }}>
                {heroIntro}
              </p>
            )}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {uspItems.map((item, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-3 p-4 rounded-[20px] group hover:-translate-y-1 transition-all relative overflow-hidden"
                  style={{ background: theme.colors.surface }}
                >
                  <div className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: palette.primary }} />
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: palette.primaryLight || `${palette.primary}15` }}
                  >
                    <span className="material-symbols-outlined" style={{ color: palette.primary }}>{item.icon}</span>
                  </div>
                  <span className="text-sm font-medium" style={{ color: theme.colors.text }}>{item.label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: palette.accent || palette.primary }}
              >
                {ctaText}
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </a>
              <a 
                href="#diensten" 
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold transition-all hover:bg-gray-50"
                style={{ background: theme.colors.surface, color: theme.colors.text }}
              >
                Bekijk diensten
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


// ============================================
// PROACTIEF-3 - Blob Style
// ============================================
function HeroProactief3({ 
  theme, palette, heroTitel, heroSubtitel, heroIntro, ctaText, 
  heroImage, beroepLabel, beschikbaar, werkgebied, hasBIG, stats,
}: SharedHeroProps) {
  const blobStyle = { borderRadius: '50% 50% 50% 50% / 55% 55% 45% 45%' };

  return (
    <section 
      className="min-h-screen flex items-center px-6 md:px-12 lg:px-20 py-24 lg:py-32 relative overflow-hidden"
      style={{ background: theme.colors.background }}
    >
      <div className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full opacity-[0.04]" style={{ background: palette.primary }} />
      <div className="absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full opacity-[0.03]" style={{ background: palette.primary }} />
      <div className="absolute top-1/3 right-1/4 w-[150px] h-[150px] rounded-full opacity-[0.04]" style={{ background: palette.accent || palette.primary }} />
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className={getRevealClass('left')}>
            <BeschikbaarBadge beschikbaar={beschikbaar} />
            <span className="text-sm italic block mb-2" style={{ color: palette.primary }}>
              {beroepLabel} · {werkgebied}
            </span>
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-4"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {heroTitel}
            </h1>
            <p className="text-xl mb-6" style={{ color: theme.colors.textMuted }}>{heroSubtitel}</p>
            {heroIntro && (
              <p className="text-[15px] leading-relaxed mb-8 max-w-lg" style={{ color: theme.colors.textMuted }}>
                {heroIntro}
              </p>
            )}
            <div className="mb-8">
              <USPBadges hasBIG={hasBIG} werkgebied={werkgebied} beschikbaar={false} theme={theme} palette={palette} variant="inline-text" />
            </div>
            <div className="flex flex-wrap gap-4 mb-10">
              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: palette.accent || palette.primary }}
              >
                {ctaText}
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </a>
              <a 
                href="#diensten" 
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold border transition-all hover:bg-slate-50"
                style={{ borderColor: theme.colors.border, color: theme.colors.text }}
              >
                Bekijk diensten
              </a>
            </div>
            <StatsDisplay stats={stats} theme={theme} palette={palette} variant="primary-color" max={3} />
          </div>
          
          <div className={`relative flex justify-center ${getRevealClass('right')}`}>
            <div className="absolute inset-0 scale-110 opacity-[0.06]" style={{ ...blobStyle, background: palette.primary }} />
            <div className="absolute inset-0 border-2 scale-105" style={{ ...blobStyle, borderColor: `${palette.primary}20` }} />
            <div className="relative w-full max-w-md aspect-square">
              <img src={heroImage} alt={beroepLabel} className="w-full h-full object-cover" style={blobStyle} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


// ============================================
// PORTFOLIO - Gradient Pill
// ============================================
function HeroPortfolio({ 
  theme, palette, heroTitel, heroSubtitel, heroIntro, ctaText, 
  heroImage, beroepLabel, beschikbaar, hasBIG, jarenErvaring, stats,
}: SharedHeroProps) {
  const startjaar = jarenErvaring ? new Date().getFullYear() - jarenErvaring : null;

  return (
    <section 
      className="min-h-screen flex items-center relative overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${palette.primary} 0%, ${palette.primaryLight || palette.primary} 100%)` }}
    >
      <div className="absolute -top-[200px] -right-[200px] w-[600px] h-[600px] rounded-full" style={{ backgroundColor: `${palette.accent || palette.primary}15` }} />
      <div className="absolute -bottom-[300px] -left-[200px] w-[800px] h-[800px] rounded-full bg-white/[0.03]" />
      
      <div className="max-w-[1300px] mx-auto px-8 md:px-12 pt-36 pb-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div className={getRevealClass('left')}>
            {beschikbaar && <BeschikbaarBadge beschikbaar={beschikbaar} variant="pill" />}
            <h1 
              className="text-4xl md:text-5xl lg:text-[54px] font-medium text-white leading-[1.1] mb-4"
              style={{ fontFamily: theme.fonts.heading }}
            >
              {heroTitel}
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-6" style={{ color: palette.accent || '#9ccc65' }}>
              {heroSubtitel}
            </p>
            {heroIntro && (
              <p className="text-[17px] text-white/80 leading-[1.8] mb-8 max-w-[480px]">{heroIntro}</p>
            )}
            <div className="mb-10">
              <USPBadges hasBIG={hasBIG} werkgebied="" beschikbaar={false} theme={theme} palette={palette} variant="pill-white" />
            </div>
            <div className="flex flex-wrap gap-4 mb-12">
              <a href="#contact" className="px-8 py-3.5 bg-white font-semibold text-sm rounded-full transition-all hover:-translate-y-0.5" style={{ color: palette.primary }}>
                {ctaText}
              </a>
              <a href="#over" className="px-8 py-3.5 border-2 border-white/40 text-white font-semibold text-sm rounded-full transition-all hover:bg-white/10">
                Meer over mij
              </a>
            </div>
            <div className="flex gap-12">
              {stats.slice(0, 2).map((stat, i) => (
                <div key={i}>
                  <p className="text-[42px] font-medium text-white leading-none" style={{ fontFamily: theme.fonts.heading }}>
                    {stat.value}
                  </p>
                  <p className="text-sm text-white/60 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className={`flex justify-center ${getRevealClass('right')}`}>
            <div className="relative">
              <img 
                src={heroImage} alt={beroepLabel}
                className="w-[380px] h-[480px] object-cover"
                style={{ borderRadius: '200px 200px 30px 30px' }}
              />
              {startjaar && (
                <div className="absolute bottom-8 -left-8 p-5 px-6 rounded-[20px]" style={{ background: theme.colors.surface }}>
                  <p className="text-xs mb-1" style={{ color: theme.colors.textMuted }}>Geregistreerd sinds</p>
                  <p className="text-xl font-medium" style={{ fontFamily: theme.fonts.heading, color: palette.primary }}>
                    {startjaar}
                  </p>
                  <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: palette.accent || palette.primary }}>
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


// ============================================
// PORTFOLIO-2 - Overlapping Card
// ============================================
function HeroPortfolio2({ 
  theme, palette, heroTitel, heroSubtitel, heroIntro, ctaText, 
  heroImage, beroepLabel, beschikbaar, hasBIG, stats,
}: SharedHeroProps) {
  const naamParts = heroTitel.split(' ');
  const eersteNaam = naamParts.slice(0, 2).join(' ');
  const achternaam = naamParts.slice(2).join(' ');

  return (
    <section className="min-h-screen relative" style={{ backgroundColor: theme.colors.backgroundAlt }}>
      <div className="grid lg:grid-cols-12 min-h-screen">
        <div className={`lg:col-span-7 relative h-[50vh] lg:h-auto ${getRevealClass('left')}`}>
          <img src={heroImage} alt={beroepLabel} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${palette.primary}1A, transparent)` }} />
          <div className="absolute bottom-8 left-8 flex gap-8">
            {stats.slice(0, 2).map((stat, i) => (
              <div key={i} className="text-white">
                <p className="text-4xl font-medium" style={{ fontFamily: theme.fonts.heading }}>{stat.value}</p>
                <p className="text-sm text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="lg:col-span-5 flex items-center relative">
          <div className={`w-full lg:-ml-20 p-8 lg:p-12 relative z-10 ${getRevealClass('right')}`} style={{ backgroundColor: theme.colors.background }}>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-6 block" style={{ color: palette.accent || palette.primary }}>
              {beroepLabel}
            </span>
            <h1 className="text-4xl lg:text-5xl leading-[1.1] mb-4" style={{ fontFamily: theme.fonts.heading, color: palette.primary }}>
              {eersteNaam}<br/>
              {achternaam && <em className="font-normal">{achternaam}</em>}
            </h1>
            <p className="text-lg mb-6" style={{ color: theme.colors.textMuted }}>{heroSubtitel}</p>
            {heroIntro && (
              <p className="text-base leading-relaxed mb-8" style={{ color: theme.colors.textMuted }}>{heroIntro}</p>
            )}
            <div className="mb-8">
              <USPBadges hasBIG={hasBIG} werkgebied="" beschikbaar={false} theme={theme} palette={palette} variant="inline-text" />
            </div>
            <BeschikbaarBadge beschikbaar={beschikbaar} />
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="px-7 py-3.5 text-sm font-semibold text-white rounded-full transition-all hover:opacity-90" style={{ background: palette.primary }}>
                {ctaText}
              </a>
              <a href="#over" className="px-7 py-3.5 text-sm font-semibold rounded-full border transition-all hover:bg-gray-50" style={{ borderColor: theme.colors.border, color: theme.colors.text }}>
                Meer over mij
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


// ============================================
// PORTFOLIO-3 - Elegant Typographic
// ============================================
function HeroPortfolio3({ 
  theme, palette, heroTitel, heroSubtitel, heroIntro, ctaText, 
  heroImage, beroepLabel, beschikbaar, werkgebied, hasBIG, jarenErvaring, stats,
}: SharedHeroProps) {
  const subtitelParts = heroSubtitel?.split(' ') || [];
  const lastWord = subtitelParts.pop() || '';
  const restSubtitel = subtitelParts.join(' ');

  return (
    <section className="min-h-screen flex items-center py-24 lg:py-32 px-6 lg:px-12" style={{ background: theme.colors.background }}>
      <div className="max-w-6xl mx-auto w-full">
        <div className={`flex items-center gap-4 mb-12 ${getRevealClass('up')}`}>
          <div className="w-12 h-px" style={{ background: palette.primary }} />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: palette.primary }}>
            {beroepLabel}
          </span>
        </div>
        
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
          <div className={`lg:col-span-7 ${getRevealClass('left')}`}>
            <BeschikbaarBadge beschikbaar={beschikbaar} />
            <h1 
              className="text-4xl md:text-5xl lg:text-[56px] leading-[1.08] mb-6"
              style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
            >
              {restSubtitel}<br/>
              <em className="font-normal" style={{ color: palette.accent || palette.primary }}>{lastWord}</em>
            </h1>
            {heroIntro && (
              <p className="text-lg leading-relaxed max-w-md mb-10" style={{ color: theme.colors.textMuted }}>{heroIntro}</p>
            )}
            <div className="flex flex-wrap gap-4 mb-12">
              <a href="#contact" className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-full transition-all hover:opacity-90" style={{ background: palette.primary }}>
                {ctaText} <span>→</span>
              </a>
              <a href="#over" className="px-7 py-3.5 text-sm font-semibold rounded-full border transition-all hover:bg-gray-50" style={{ borderColor: theme.colors.border, color: theme.colors.text }}>
                Bekijk profiel
              </a>
            </div>
            <div className="pt-8 border-t" style={{ borderColor: theme.colors.border }}>
              <p className="text-2xl italic mb-1" style={{ fontFamily: theme.fonts.heading, color: palette.primary }}>{heroTitel}</p>
              <p className="text-sm mb-6" style={{ color: theme.colors.textMuted }}>{beroepLabel} · {werkgebied}</p>
              <USPBadges hasBIG={hasBIG} werkgebied={werkgebied} beschikbaar={false} theme={theme} palette={palette} variant="inline-text" />
            </div>
          </div>
          
          <div className={`lg:col-span-5 relative ${getRevealClass('right')}`}>
            <div className="absolute -top-4 -left-4 w-32 h-32 border-2 opacity-20" style={{ borderColor: palette.accent || palette.primary }} />
            <div className="relative">
              <img src={heroImage} alt={beroepLabel} className="w-full h-[400px] lg:h-[480px] object-cover" style={{ borderRadius: '0 80px 0 0' }} />
              <div className="absolute bottom-0 left-0 right-0 p-6" style={{ background: `linear-gradient(to top, ${palette.primary}e6, transparent)` }}>
                <p className="text-xl text-white italic" style={{ fontFamily: theme.fonts.heading }}>{heroTitel}</p>
                <p className="text-sm text-white/70">{beroepLabel}</p>
              </div>
            </div>
            {jarenErvaring && (
              <div className="absolute -bottom-6 -right-6 p-6 max-w-[200px]" style={{ background: theme.colors.surface }}>
                <span className="text-4xl font-normal block mb-1" style={{ fontFamily: theme.fonts.heading, color: palette.primary }}>
                  {stats[0]?.value || `${jarenErvaring}+`}
                </span>
                <span className="text-xs uppercase tracking-wider" style={{ color: theme.colors.textMuted }}>
                  {stats[0]?.label || 'Jaar ervaring'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


// ============================================
// SOCIAL PROOF (Mindoor shared component)
// ============================================
function MindoorSocialProof({ theme, palette, generated }: { 
  theme: SharedHeroProps['theme']; 
  palette: SharedHeroProps['palette'];
  generated?: SharedHeroProps['generated'];
}) {
  // Gebruik eerste testimonial als beschikbaar
  const testimonialText = generated?.testimonials?.items?.[0]?.tekst 
    || 'Vertrouwd door zorginstellingen en bemiddelaars in heel Nederland.';

  return (
    <div className="rounded-2xl p-5 border" style={{ backgroundColor: theme.colors.background, borderColor: theme.colors.border }}>
      <div className="flex items-center gap-4">
        <div className="flex -space-x-3">
          {SOCIAL_PROOF_AVATARS.map((src, i) => (
            <img key={i} src={src} alt="Client" className="w-11 h-11 rounded-full border-2 border-white object-cover" />
          ))}
        </div>
        <div>
          <p className="text-sm" style={{ color: theme.colors.textMuted }}>
            {testimonialText.length > 80 
              ? `${testimonialText.slice(0, 77)}...` 
              : testimonialText
            }
          </p>
          <div className="flex text-sm mt-1" style={{ color: palette.accent || palette.primary }}>★★★★★</div>
        </div>
      </div>
    </div>
  );
}


// ============================================
// MINDOOR - Warm
// ============================================
function HeroMindoor({ 
  theme, palette, heroTitel, heroSubtitel, heroIntro, ctaText, 
  heroImage, beroepLabel, beschikbaar, hasBIG, generated,
}: SharedHeroProps) {
  return (
    <section 
      className="relative min-h-screen pt-20 lg:pt-0 flex items-center overflow-hidden"
      style={{ background: theme.colors.backgroundAlt }}
    >
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-[0.12]" style={{ background: palette.primary }} />
      <div className="absolute bottom-20 -left-20 w-64 h-64 rounded-full opacity-[0.12]" style={{ background: palette.accent || palette.primary }} />
      <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full opacity-[0.08]" style={{ background: palette.accent || palette.primary }} />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className={`order-2 lg:order-1 ${getRevealClass('left')}`}>
            <BeschikbaarBadge beschikbaar={beschikbaar} />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-tight" style={{ fontFamily: theme.fonts.heading }}>
              {heroTitel},<br/>
              <span className="italic" style={{ color: palette.accent || palette.primary }}>{beroepLabel}</span>
            </h1>
            {heroIntro && (
              <p className="mt-6 text-lg max-w-lg" style={{ color: theme.colors.textMuted }}>{heroIntro}</p>
            )}
            <div className="mt-6">
              <USPBadges hasBIG={hasBIG} werkgebied="" beschikbaar={false} theme={theme} palette={palette} variant="inline-text" />
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-white transition-all hover:-translate-y-0.5" style={{ background: palette.primary }}>
                {ctaText}
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </a>
              <a href="#diensten" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium border-2 transition-colors hover:bg-gray-50" style={{ background: 'white', color: theme.colors.textMuted, borderColor: theme.colors.border }}>
                Bekijk diensten
              </a>
            </div>
            <div className="mt-10 max-w-md">
              <MindoorSocialProof theme={theme} palette={palette} generated={generated} />
            </div>
          </div>
          
          <div className={`order-1 lg:order-2 relative ${getRevealClass('right')}`}>
            <div className="relative">
              <div className="absolute inset-0 rounded-[3rem] transform rotate-3" style={{ background: `linear-gradient(to bottom right, ${theme.colors.border}, ${palette.primary}15)` }} />
              <div className="relative rounded-[2.5rem] overflow-hidden">
                <img src={heroImage} alt={beroepLabel} className="w-full aspect-[4/5] object-cover" />
              </div>
              {hasBIG && (
                <div className="absolute -bottom-4 -left-4 lg:-left-8 bg-white rounded-2xl p-4 border" style={{ borderColor: theme.colors.border }}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${palette.primary}15` }}>
                      <span className="material-symbols-outlined text-2xl" style={{ color: palette.primary }}>verified</span>
                    </div>
                    <div>
                      <p className="font-semibold" style={{ color: theme.colors.text }}>BIG Geregistreerd</p>
                      <p className="text-sm" style={{ color: theme.colors.textMuted }}>{beroepLabel}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


// ============================================
// MINDOOR-2 - Centered Stack
// ============================================
function HeroMindoor2({ 
  theme, palette, heroTitel, heroSubtitel, heroIntro, ctaText, 
  heroImage, beroepLabel, beschikbaar, werkgebied, hasBIG, jarenErvaring, stats, generated,
}: SharedHeroProps) {
  const naamParts = heroTitel.split(' ');
  const eersteNaam = naamParts.slice(0, -2).join(' ') || naamParts[0];
  const achternaam = naamParts.slice(-2).join(' ');

  return (
    <section 
      className="min-h-screen flex items-center py-24 lg:py-32 px-6 lg:px-8 relative overflow-hidden"
      style={{ background: theme.colors.background }}
    >
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-[0.08]" style={{ background: palette.primary }} />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full opacity-[0.10]" style={{ background: palette.accent || palette.primary }} />
      
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className={getRevealClass('left')}>
            <BeschikbaarBadge beschikbaar={beschikbaar} />
            <span className="text-sm font-medium uppercase tracking-widest mb-4 block" style={{ color: palette.accent || palette.primary }}>
              {beroepLabel} · {werkgebied}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>
              {eersteNaam}<br/>
              <span className="italic" style={{ color: palette.accent || palette.primary }}>{achternaam}</span>
            </h1>
            {heroIntro && (
              <p className="text-lg mb-8 max-w-md" style={{ color: theme.colors.textMuted }}>{heroIntro}</p>
            )}
            <div className="mb-8">
              <USPBadges hasBIG={hasBIG} werkgebied="" beschikbaar={false} theme={theme} palette={palette} variant="inline-text" />
            </div>
            <div className="flex flex-wrap gap-4 mb-10">
              <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-white transition-all hover:-translate-y-0.5" style={{ background: palette.primary }}>
                {ctaText}
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </a>
              <a href="#diensten" className="px-8 py-4 rounded-full font-medium border transition-all hover:bg-white" style={{ borderColor: theme.colors.border, color: theme.colors.text }}>
                Bekijk diensten
              </a>
            </div>
            <div className="max-w-md">
              <MindoorSocialProof theme={theme} palette={palette} generated={generated} />
            </div>
          </div>
          
          <div className={`relative ${getRevealClass('right')}`}>
            <div className="rounded-3xl overflow-hidden">
              <img src={heroImage} alt={beroepLabel} className="w-full aspect-[4/5] object-cover" />
            </div>
            <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-3xl" style={{ background: `${palette.primary}15` }} />
            {jarenErvaring && (
              <div className="absolute -bottom-6 -left-6 p-5 rounded-2xl bg-white border" style={{ borderColor: theme.colors.border }}>
                <StatsDisplay stats={stats} theme={theme} palette={palette} variant="compact" max={2} />
              </div>
            )}
            {hasBIG && (
              <div className="absolute top-6 -right-4 lg:-right-8 bg-white rounded-2xl p-4 border" style={{ borderColor: theme.colors.border }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${palette.primary}15` }}>
                    <span className="material-symbols-outlined text-xl" style={{ color: palette.primary }}>verified</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: theme.colors.text }}>BIG</p>
                    <p className="text-xs" style={{ color: theme.colors.textMuted }}>Geregistreerd</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


// ============================================
// MINDOOR-3 - Quote Split
// ============================================
function HeroMindoor3({ 
  theme, palette, heroTitel, heroSubtitel, heroIntro, ctaText, 
  heroImage, beroepLabel, beschikbaar, hasBIG, stats, naam, generated,
}: SharedHeroProps) {
  const naamParts = heroTitel.split(' ');
  const eersteNaam = naamParts.slice(0, -2).join(' ') || naamParts[0];
  const achternaam = naamParts.slice(-2).join(' ');
  const voornaam = naam?.split(' ')[0] || naamParts[0];
  
  // Dynamische quote uit generated content
  const quoteText = generated?.quote 
    || generated?.overMij?.persoonlijk 
    || heroSubtitel;

  return (
    <section 
      className="min-h-screen flex items-center py-24 lg:py-32 px-6 lg:px-8"
      style={{ background: theme.colors.backgroundAlt }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div className={`relative ${getRevealClass('left')}`}>
            <div className="rounded-3xl overflow-hidden">
              <img src={heroImage} alt={beroepLabel} className="w-full aspect-[4/5] object-cover" />
            </div>
            <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full rounded-3xl" style={{ background: `${palette.primary}15` }} />
            <div className="absolute -bottom-8 -left-4 lg:-left-8 max-w-[280px] p-6 rounded-2xl" style={{ background: palette.primary }}>
              <svg className="w-8 h-8 mb-3 opacity-30 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
              </svg>
              <p className="text-lg text-white/90 leading-relaxed italic">
                {quoteText.length > 100 ? `${quoteText.slice(0, 97)}...` : quoteText}
              </p>
              <p className="mt-3 text-sm font-medium" style={{ color: palette.accent || '#e07b5f' }}>
                — {voornaam}
              </p>
            </div>
          </div>
          
          <div className={`flex flex-col justify-center lg:pl-8 ${getRevealClass('right')}`}>
            <BeschikbaarBadge beschikbaar={beschikbaar} />
            <span className="text-sm font-medium uppercase tracking-widest mb-4" style={{ color: palette.accent || palette.primary }}>
              {beroepLabel}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>
              {eersteNaam}<br/>
              <span className="italic" style={{ color: palette.accent || palette.primary }}>{achternaam}</span>
            </h1>
            {heroIntro && (
              <p className="text-lg mb-8" style={{ color: theme.colors.textMuted }}>{heroIntro}</p>
            )}
            <div className="mb-8">
              <USPBadges hasBIG={hasBIG} werkgebied="" beschikbaar={false} theme={theme} palette={palette} variant="inline-text" />
            </div>
            <div className="flex flex-wrap gap-4 mb-10">
              <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-white transition-all hover:-translate-y-0.5" style={{ background: palette.primary }}>
                {ctaText}
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </a>
              <a href="#diensten" className="px-8 py-4 rounded-full font-medium border transition-all hover:bg-white" style={{ borderColor: theme.colors.border, color: theme.colors.text }}>
                Bekijk diensten
              </a>
            </div>
            <StatsDisplay stats={stats} theme={theme} palette={palette} variant="large" max={3} />
            <div className="mt-8">
              <MindoorSocialProof theme={theme} palette={palette} generated={generated} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


// ============================================
// SERENE - Typographic Statement
// ============================================
function HeroSerene({ 
  theme, palette, heroTitel, heroSubtitel, heroIntro, ctaText, 
  heroImage, beroepLabel, beschikbaar, werkgebied, hasBIG, jarenErvaring, stats,
}: SharedHeroProps) {
  const naamParts = heroTitel.split(' ');
  const voorNaam = naamParts.slice(0, -1).join(' ');
  const laatsteNaam = naamParts[naamParts.length - 1];

  return (
    <section className="min-h-screen flex items-center py-24 lg:py-32 px-6 lg:px-12" style={{ background: theme.colors.background }}>
      <div className="max-w-6xl mx-auto w-full">
        <div className={`flex items-center gap-4 mb-16 ${getRevealClass('up')}`}>
          <span className="text-[9px] font-medium uppercase tracking-[2px]" style={{ color: theme.colors.textMuted }}>
            {beroepLabel}
          </span>
          <div className="flex-1 h-px" style={{ background: theme.colors.border }} />
        </div>
        
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-6">
          <div className={`lg:col-span-7 lg:pr-12 ${getRevealClass('left')}`}>
            <BeschikbaarBadge beschikbaar={beschikbaar} />
            <h1 
              className="text-5xl md:text-6xl lg:text-[72px] font-normal leading-[1.05] mb-8"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {voorNaam}<br/>
              {laatsteNaam && <em className="italic" style={{ color: palette.primary }}>{laatsteNaam}</em>}
            </h1>
            {heroIntro && (
              <p className="text-base leading-relaxed max-w-sm mb-10" style={{ color: theme.colors.textMuted }}>{heroIntro}</p>
            )}
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 text-[10px] uppercase tracking-[2px] text-white rounded" style={{ background: palette.primary }}>
                {ctaText}
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
              <a href="#diensten" className="inline-flex items-center gap-2 px-6 py-3 text-[10px] uppercase tracking-[2px] border rounded" style={{ borderColor: theme.colors.border, color: theme.colors.text }}>
                Bekijk diensten
              </a>
            </div>
          </div>
          
          <div className={`lg:col-span-5 lg:border-l lg:pl-12 ${getRevealClass('right')}`} style={{ borderColor: theme.colors.border }}>
            <div className="relative mb-10">
              <img src={heroImage} alt={beroepLabel} className="w-full h-[350px] lg:h-[400px] object-cover" style={{ borderRadius: '0 80px 0 0' }} />
            </div>
            <div className="space-y-6">
              {stats.slice(0, 2).map((stat, i) => (
                <div key={i}>
                  <span className="text-[9px] font-medium uppercase tracking-[2px] block mb-2" style={{ color: theme.colors.textMuted }}>
                    {stat.label}
                  </span>
                  <span className="text-3xl" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>
                    {stat.value}
                  </span>
                </div>
              ))}
              <div>
                <span className="text-[9px] font-medium uppercase tracking-[2px] block mb-2" style={{ color: theme.colors.textMuted }}>
                  Werkgebied
                </span>
                <span className="text-2xl" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>
                  {werkgebied}
                </span>
              </div>
            </div>
            <div 
              className="mt-10 pt-8 border-t flex flex-wrap gap-x-6 gap-y-2 text-[10px] uppercase tracking-[1px]"
              style={{ borderColor: theme.colors.border, color: theme.colors.textMuted }}
            >
              {hasBIG && <span>BIG Geregistreerd</span>}
              <span>DBA-compliant</span>
              <span>VOG & Verzekerd</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


// ============================================
// SERENE-2 - Asymmetric Split
// ============================================
function HeroSerene2({ 
  theme, palette, heroTitel, heroSubtitel, heroIntro, ctaText, 
  heroImage, beroepLabel, beschikbaar, werkgebied, hasBIG, stats,
}: SharedHeroProps) {
  const subtitelParts = heroSubtitel?.split(' ') || [];
  const lastWord = subtitelParts.pop() || '';
  const restSubtitel = subtitelParts.join(' ');

  return (
    <section className="min-h-screen flex items-center py-24 lg:py-32 px-6 lg:px-12" style={{ background: theme.colors.backgroundAlt }}>
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          <div className={`lg:col-span-5 ${getRevealClass('left')}`}>
            <div className="relative">
              <img src={heroImage} alt={beroepLabel} className="w-full h-[450px] lg:h-[550px] object-cover" style={{ borderRadius: '0 80px 0 0' }} />
              <div className="absolute bottom-0 left-0 p-6">
                <p className="text-xl italic text-white drop-shadow-lg" style={{ fontFamily: theme.fonts.heading }}>{heroTitel}</p>
                <p className="text-sm text-white/80 drop-shadow-lg">{beroepLabel}</p>
              </div>
            </div>
          </div>
          
          <div className={`lg:col-span-7 lg:pl-8 ${getRevealClass('right')}`}>
            <span className="text-[9px] font-medium uppercase tracking-[2px] block mb-6" style={{ color: theme.colors.textMuted }}>
              {beroepLabel} · {werkgebied}
            </span>
            <BeschikbaarBadge beschikbaar={beschikbaar} />
            <h1 
              className="text-4xl md:text-5xl lg:text-[56px] font-normal leading-[1.1] mb-6"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {restSubtitel}<br/>
              met <em className="italic" style={{ color: palette.primary }}>{lastWord}</em>
            </h1>
            <div className="w-16 h-px mb-8" style={{ background: theme.colors.border }} />
            {heroIntro && (
              <p className="text-base leading-relaxed mb-10 max-w-md" style={{ color: theme.colors.textMuted }}>{heroIntro}</p>
            )}
            <div className="grid grid-cols-3 gap-6 mb-10">
              {stats.slice(0, 3).map((stat, i) => (
                <div key={i}>
                  <span className="text-4xl block mb-1" style={{ fontFamily: theme.fonts.heading, color: palette.primary }}>
                    {stat.value}
                  </span>
                  <span className="text-[9px] uppercase tracking-[1px]" style={{ color: theme.colors.textMuted }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 mb-10">
              <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 text-[10px] uppercase tracking-[2px] text-white rounded" style={{ background: palette.primary }}>
                {ctaText}
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
              <a href="#diensten" className="inline-flex items-center gap-2 px-6 py-3 text-[10px] uppercase tracking-[2px] border rounded" style={{ borderColor: theme.colors.border, color: theme.colors.text }}>
                Bekijk diensten
              </a>
            </div>
            <div 
              className="pt-8 border-t flex flex-wrap gap-x-6 gap-y-2 text-[10px] uppercase tracking-[1px]"
              style={{ borderColor: theme.colors.border, color: theme.colors.textMuted }}
            >
              {hasBIG && <span>BIG Geregistreerd</span>}
              <span>DBA-compliant</span>
              <span>VOG & Verzekerd</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


// ============================================
// SERENE-3 - Dark Banner
// ============================================
function HeroSerene3({ 
  theme, palette, heroTitel, heroSubtitel, heroIntro, ctaText, 
  heroImage, beroepLabel, beschikbaar, werkgebied, hasBIG, stats,
}: SharedHeroProps) {
  const naamParts = heroTitel.split(' ');
  const voorNaam = naamParts.slice(0, -1).join(' ');
  const laatsteNaam = naamParts[naamParts.length - 1];

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden" style={{ background: palette.primary }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 70%)' }} />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 py-24 lg:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className={getRevealClass('left')}>
            <span className="text-[9px] font-medium uppercase tracking-[2px] mb-6 block text-white/50">
              {beroepLabel} · {werkgebied}
            </span>
            {beschikbaar && <BeschikbaarBadge beschikbaar={beschikbaar} variant="dark" />}
            <h1 
              className="text-5xl md:text-6xl lg:text-[68px] font-normal text-white leading-[1.05] mb-8"
              style={{ fontFamily: theme.fonts.heading }}
            >
              {voorNaam}<br/>
              {laatsteNaam && <em className="italic" style={{ color: palette.primaryLight || palette.accent || '#a8b5a8' }}>{laatsteNaam}</em>}
            </h1>
            <div className="w-16 h-px mb-8" style={{ background: 'rgba(255,255,255,0.2)' }} />
            {heroIntro && (
              <p className="text-base text-white/70 max-w-md leading-relaxed mb-10">{heroIntro}</p>
            )}
            <div className="flex flex-wrap gap-4 mb-12">
              <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 text-[10px] uppercase tracking-[2px] bg-white rounded" style={{ color: palette.primary }}>
                {ctaText}
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
              <a href="#diensten" className="inline-flex items-center gap-2 px-6 py-3 text-[10px] uppercase tracking-[2px] border border-white/30 text-white rounded">
                Bekijk diensten
              </a>
            </div>
            <StatsDisplay stats={stats} theme={theme} palette={palette} variant="white" max={3} />
          </div>
          
          <div className={`relative ${getRevealClass('right')}`}>
            <img src={heroImage} alt={beroepLabel} className="w-full h-[450px] lg:h-[550px] object-cover" style={{ borderRadius: '0 80px 0 0' }} />
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-3">
              {hasBIG && (
                <span className="px-4 py-2 text-[10px] uppercase tracking-[1px] bg-white text-slate-700 rounded">BIG Geregistreerd</span>
              )}
              <span className="px-4 py-2 text-[10px] uppercase tracking-[1px] bg-white text-slate-700 rounded">DBA-compliant</span>
              <span className="px-4 py-2 text-[10px] uppercase tracking-[1px] bg-white text-slate-700 rounded">VOG</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


// ============================================
// LEGACY: SPLIT
// ============================================
function HeroSplit({ theme, palette, heroTitel, heroSubtitel, ctaText, heroImage, beroepLabel }: SharedHeroProps) {
  return (
    <section className="py-20 md:py-28 pt-28 md:pt-32 px-6 md:px-12" style={{ backgroundColor: theme.colors.background }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className={`flex-1 ${getRevealClass('left')}`}>
            <p className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: palette.primary }}>{beroepLabel}</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>
              {heroTitel}
            </h1>
            <p className="text-lg md:text-xl mb-8 leading-relaxed" style={{ color: theme.colors.textMuted }}>{heroSubtitel}</p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 text-white font-bold rounded-lg transition-all hover:opacity-90" style={{ backgroundColor: palette.primary }}>
                {ctaText}
                <span className="material-symbols-outlined">arrow_forward</span>
              </a>
              <a href="#diensten" className="inline-flex items-center gap-2 px-8 py-4 font-bold rounded-lg border-2 transition-all hover:bg-black/5" style={{ borderColor: palette.primaryLight, color: palette.primary }}>
                Bekijk diensten
              </a>
            </div>
          </div>
          <div className={`flex-1 ${getRevealClass('right')}`}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl -rotate-2" style={{ backgroundColor: palette.primaryLight }} />
              <div className="relative w-full aspect-[4/5] bg-cover bg-center rounded-2xl shadow-2xl" style={{ backgroundImage: `url("${heroImage}")` }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// LEGACY: CENTERED
// ============================================
function HeroCentered({ theme, palette, heroTitel, heroSubtitel, ctaText, heroImage, beroepLabel, naam }: SharedHeroProps) {
  return (
    <section className="min-h-[90vh] flex items-center justify-center px-6 pt-20" style={{ backgroundColor: theme.colors.background }}>
      <div className="text-center max-w-3xl mx-auto">
        <div className={`w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden shadow-lg ${getRevealClass('up')}`}>
          <img src={heroImage} alt={naam} className="w-full h-full object-cover" />
        </div>
        <p className={`text-xs uppercase tracking-[0.3em] mb-6 ${getRevealClass('up', 1)}`} style={{ color: palette.primary }}>
          {beroepLabel}
        </p>
        <h1 className={`text-4xl md:text-6xl font-bold leading-tight mb-6 ${getRevealClass('up', 2)}`} style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>
          {heroTitel}
        </h1>
        <p className={`text-xl mb-10 leading-relaxed ${getRevealClass('up', 3)}`} style={{ color: theme.colors.textMuted }}>
          {heroSubtitel}
        </p>
        <a href="#contact" className={`inline-flex items-center gap-2 px-10 py-4 text-white font-bold rounded-lg transition-all hover:opacity-90 ${getRevealClass('up', 3)}`} style={{ backgroundColor: palette.primary }}>
          {ctaText}
          <span className="material-symbols-outlined">arrow_forward</span>
        </a>
      </div>
    </section>
  );
}

// ============================================
// LEGACY: FULLWIDTH
// ============================================
function HeroFullwidth({ theme, palette, heroTitel, heroSubtitel, ctaText, heroImage, beroepLabel }: SharedHeroProps) {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${heroImage}")` }} />
      <div 
        className="absolute inset-0"
        style={{ 
          background: theme.isDark 
            ? 'linear-gradient(90deg, rgba(23,25,27,0.95) 0%, rgba(23,25,27,0.7) 50%, rgba(23,25,27,0.3) 100%)'
            : 'linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.3) 100%)'
        }}
      />
      <div className="relative z-10 px-6 md:px-12 w-full pt-20">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <p className={`text-sm font-bold uppercase tracking-wider mb-4 ${getRevealClass('left')}`} style={{ color: palette.primary }}>
              {beroepLabel}
            </p>
            <h1 className={`text-5xl md:text-7xl font-black leading-[1.1] mb-6 ${getRevealClass('left', 1)}`} style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>
              {heroTitel}
            </h1>
            <p className={`text-xl mb-10 leading-relaxed ${getRevealClass('left', 2)}`} style={{ color: theme.colors.textMuted }}>
              {heroSubtitel}
            </p>
            <a href="#contact" className={`inline-flex items-center gap-2 px-8 py-4 text-white font-bold rounded-full transition-all hover:opacity-90 ${getRevealClass('up', 3)}`} style={{ backgroundColor: palette.primary }}>
              {ctaText}
              <span className="material-symbols-outlined">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// LEGACY: MINIMAL
// ============================================
function HeroMinimal({ theme, palette, heroTitel, heroSubtitel, ctaText, beroepLabel }: SharedHeroProps) {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-6 pt-20" style={{ backgroundColor: theme.colors.background }}>
      <div className="text-center max-w-2xl mx-auto">
        <p className={`text-[10px] uppercase tracking-[0.4em] mb-8 ${getRevealClass('up')}`} style={{ color: theme.colors.textMuted }}>
          {beroepLabel}
        </p>
        <h1 className={`text-3xl md:text-5xl font-light leading-relaxed mb-8 ${getRevealClass('up', 1)}`} style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>
          {heroTitel}
        </h1>
        <div className="w-12 h-px mx-auto mb-8" style={{ backgroundColor: palette.primary }} />
        <p className={`text-lg mb-12 ${getRevealClass('up', 2)}`} style={{ color: theme.colors.textMuted }}>
          {heroSubtitel}
        </p>
        <a href="#contact" className={`inline-block px-8 py-3 text-sm uppercase tracking-widest text-white ${getRevealClass('up', 3)}`} style={{ backgroundColor: palette.primary }}>
          {ctaText}
        </a>
      </div>
    </section>
  );
}

export default HeroSection;