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
// Voorbeeld random selectie in edge function:
// const heroVariants = ['editorial', 'editorial-2', 'editorial-3'];
// const style = heroVariants[Math.floor(Math.random() * heroVariants.length)];
//
// ============================================
// VARIANT BESCHRIJVINGEN (ter referentie)
// ============================================
//
// editorial    - Classic split: tekst links, rechthoekige foto rechts
// editorial-2  - Organic shape: tekst links, organische blob-foto rechts + floating stats
// editorial-3  - Diagonal cut: tekst links (5 col), diagonaal afgesneden foto rechts (7 col)
//
// proactief    - TODO
// proactief-2  - TODO
// proactief-3  - TODO
//
// portfolio    - TODO
// portfolio-2  - TODO
// portfolio-3  - TODO
//
// mindoor      - TODO
// mindoor-2    - TODO
// mindoor-3    - TODO
//
// serene       - TODO
// serene-2     - TODO
// serene-3     - TODO
//
// ============================================

'use client';

import { BaseSectionProps, HeroStyle, getBeroepImages, getRevealClass } from './types';

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
  const images = getBeroepImages(beroepLabel);
  const heroTitel = generated?.hero?.titel || content.naam || 'Zorg met Aandacht';
  const heroSubtitel = generated?.hero?.subtitel || content.tagline || 'Professionele zorg met persoonlijke aandacht';
  const heroIntro = content.over_mij?.slice(0, 200) || '';
  const ctaText = generated?.cta?.button || 'Neem contact op';
  const beschikbaar = content.beschikbaar !== false;
  const werkgebied = content.contact?.werkgebied?.[0] || 'Regio';
  const hasBIG = content.certificaten?.some(c => c.type === 'big');
  
  // Shared props voor alle varianten
  const sharedProps = {
    theme,
    palette,
    content,
    heroTitel,
    heroSubtitel,
    heroIntro,
    ctaText,
    images,
    beroepLabel,
    beschikbaar,
    werkgebied,
    hasBIG,
  };
  
  switch (style) {
    // ============================================
    // EDITORIAL VARIANTEN
    // ============================================
    case 'editorial':      // Variant 1 - Classic split: tekst links, foto rechts
      return <HeroEditorial {...sharedProps} />;
    case 'editorial-2':    // Variant 2 - Organic shape: blob-foto + floating stats
      return <HeroEditorial2 {...sharedProps} />;
    case 'editorial-3':    // Variant 3 - Diagonal cut: schuine foto rechts
      return <HeroEditorial3 {...sharedProps} />;
    
    // ============================================
    // PROACTIEF VARIANTEN
    // ============================================
    case 'proactief':      // Variant 1 - TODO
      return <HeroProactief {...sharedProps} />;
    case 'proactief-2':    // Variant 2 - TODO
      return <HeroProactief2 {...sharedProps} />;
    case 'proactief-3':    // Variant 3 - TODO
      return <HeroProactief3 {...sharedProps} />;
    
    // ============================================
    // PORTFOLIO VARIANTEN
    // ============================================
    case 'portfolio':      // Variant 1 - TODO
      return <HeroPortfolio {...sharedProps} />;
    case 'portfolio-2':    // Variant 2 - TODO
      return <HeroPortfolio2 {...sharedProps} />;
    case 'portfolio-3':    // Variant 3 - TODO
      return <HeroPortfolio3 {...sharedProps} />;
    
    // ============================================
    // MINDOOR VARIANTEN
    // ============================================
    case 'mindoor':        // Variant 1 - TODO
      return <HeroMindoor {...sharedProps} />;
    case 'mindoor-2':      // Variant 2 - TODO
      return <HeroMindoor2 {...sharedProps} />;
    case 'mindoor-3':      // Variant 3 - TODO
      return <HeroMindoor3 {...sharedProps} />;
    
    // ============================================
    // SERENE VARIANTEN
    // ============================================
    case 'serene':         // Variant 1 - TODO
      return <HeroSerene {...sharedProps} />;
    case 'serene-2':       // Variant 2 - TODO
      return <HeroSerene2 {...sharedProps} />;
    case 'serene-3':       // Variant 3 - TODO
      return <HeroSerene3 {...sharedProps} />;
    
    // ============================================
    // LEGACY VARIANTEN (niet template-specifiek)
    // ============================================
    case 'split':
      return <HeroSplit {...sharedProps} />;
    case 'centered':
      return <HeroCentered {...sharedProps} />;
    case 'fullwidth':
      return <HeroFullwidth {...sharedProps} />;
    case 'minimal':
      return <HeroMinimal {...sharedProps} />;
    
    default:
      return <HeroEditorial {...sharedProps} />;
  }
}
// ============================================
// EDITORIAL VARIANTEN
// ============================================
// 
// editorial    - Classic split: tekst links, rechthoekige foto rechts, strakke USP badges
// editorial-2  - Organic shape: tekst links, organische blob-foto rechts + floating stats
// editorial-3  - Diagonal cut: tekst links (5 col), diagonaal afgesneden foto rechts (7 col)
//
// ============================================

// ============================================
// EDITORIAL - Classic Split
// Tekst links, rechthoekige foto rechts, strakke USP badges
// ============================================
function HeroEditorial({ 
  theme, 
  palette, 
  content, 
  heroTitel, 
  heroSubtitel,
  heroIntro,
  ctaText, 
  images, 
  beroepLabel,
  beschikbaar,
  werkgebied,
  hasBIG,
}: any) {
  return (
    <section 
      className="px-6 md:px-16 lg:px-32 py-16 lg:py-24 pt-28 lg:pt-32"
      style={{ background: theme.colors.background }}
    >
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-6xl mx-auto">
        
        {/* Left Side - Content */}
        <div className={`flex flex-col flex-1 gap-6 ${getRevealClass('left')}`}>
          
          {/* Beroep label - small-caps */}
          <span 
            className="text-xs font-semibold uppercase tracking-[0.15em]"
            style={{ 
              fontVariant: 'small-caps',
              color: palette.primary 
            }}
          >
            {beroepLabel}
          </span>
          
          {/* Naam (italic serif) */}
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] italic"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            {heroTitel}
          </h1>
          
          {/* Tagline */}
          <p 
            className="text-xl"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.textMuted }}
          >
            {heroSubtitel}
          </p>
          
          {/* Intro tekst */}
          {heroIntro && (
            <p 
              className="text-base leading-relaxed max-w-lg"
              style={{ color: theme.colors.textMuted }}
            >
              {heroIntro}
            </p>
          )}
          
          {/* USP Badges - Strak */}
          <div className="flex flex-wrap gap-2">
            {hasBIG && (
              <span 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border"
                style={{ borderColor: theme.colors.border, color: theme.colors.text }}
              >
                <span className="material-symbols-outlined text-sm" style={{ color: palette.primary }}>check</span>
                BIG-geregistreerd
              </span>
            )}
            <span 
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border"
              style={{ borderColor: theme.colors.border, color: theme.colors.text }}
            >
              <span className="material-symbols-outlined text-sm" style={{ color: palette.primary }}>check</span>
              DBA-compliant
            </span>
            <span 
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border"
              style={{ borderColor: theme.colors.border, color: theme.colors.text }}
            >
              <span className="material-symbols-outlined text-sm" style={{ color: palette.primary }}>check</span>
              {werkgebied}
            </span>
            {beschikbaar && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                Beschikbaar
              </span>
            )}
          </div>
          
          {/* Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center gap-2 h-12 px-6 text-white text-sm font-semibold uppercase tracking-widest transition-colors"
              style={{ backgroundColor: palette.primary }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = palette.primaryHover}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = palette.primary}
            >
              {ctaText}
            </a>
            <a 
              href="#over" 
              className="inline-flex items-center justify-center gap-2 h-12 px-6 border text-sm font-semibold uppercase tracking-widest transition-colors"
              style={{ borderColor: theme.colors.border, color: theme.colors.textMuted }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = palette.primary;
                e.currentTarget.style.color = palette.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = theme.colors.border;
                e.currentTarget.style.color = theme.colors.textMuted;
              }}
            >
              Bekijk profiel
            </a>
          </div>
        </div>
        
        {/* Right Side - Photo */}
        <div className={`flex-1 w-full max-w-md lg:max-w-none ${getRevealClass('right')}`}>
          <div 
            className="aspect-[4/5] w-full bg-center bg-no-repeat bg-cover rounded"
            style={{ backgroundImage: `url('${content.foto || images.hero}')` }}
          />
        </div>
        
      </div>
    </section>
  );
}


// ============================================
// EDITORIAL-2 - Organic Shape
// Tekst links, organische blob-foto rechts + floating stats card
// ============================================
function HeroEditorial2({ 
  theme, 
  palette, 
  content, 
  heroTitel, 
  heroSubtitel,
  heroIntro,
  ctaText, 
  images, 
  beroepLabel,
  beschikbaar,
  werkgebied,
  hasBIG,
}: any) {
  // Bereken jaren ervaring
  const jarenErvaring = content.werkervaring?.[0]?.startjaar 
    ? new Date().getFullYear() - content.werkervaring[0].startjaar 
    : 10;

  return (
    <section 
      className="min-h-screen flex items-center px-6 md:px-12 lg:px-20 py-24 lg:py-32"
      style={{ background: theme.colors.surface }}
    >
      <div className="max-w-7xl mx-auto w-full">
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Content */}
          <div className={getRevealClass('left')}>
            
            {/* Label with line */}
            <div className="flex items-center gap-4 mb-8">
              <span 
                className="text-[10px] font-semibold uppercase tracking-[0.2em]"
                style={{ color: theme.colors.textMuted }}
              >
                {beroepLabel}
              </span>
              <div 
                className="flex-1 h-px max-w-[100px]" 
                style={{ background: theme.colors.border }}
              />
            </div>
            
            {/* Name */}
            <h1 
              className="text-5xl md:text-6xl lg:text-7xl leading-[1] italic mb-6"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {heroTitel.split(' ').slice(0, 2).join(' ')}<br/>
              {heroTitel.split(' ').slice(2).join(' ')}
            </h1>
            
            {/* Tagline */}
            <p 
              className="text-xl md:text-2xl mb-8"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.textMuted }}
            >
              {heroSubtitel}
            </p>
            
            {/* USPs - Inline text */}
            <div 
              className="flex flex-wrap gap-x-6 gap-y-2 mb-8 text-sm"
              style={{ color: theme.colors.textMuted }}
            >
              {hasBIG && (
                <span className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full" style={{ background: palette.primary }} />
                  BIG-geregistreerd
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full" style={{ background: palette.primary }} />
                DBA-compliant
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full" style={{ background: palette.primary }} />
                {jarenErvaring}+ jaar ervaring
              </span>
            </div>
            
            {/* Intro */}
            {heroIntro && (
              <p 
                className="text-sm leading-[1.9] mb-10 max-w-md"
                style={{ color: theme.colors.textMuted }}
              >
                {heroIntro}
              </p>
            )}
            
            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors"
                style={{ backgroundColor: palette.primary }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = palette.primaryHover}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = palette.primary}
              >
                {ctaText}
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </a>
              <a 
                href="#over" 
                className="text-sm font-medium underline underline-offset-4 transition-colors"
                style={{ color: theme.colors.text }}
              >
                Meer over mij
              </a>
            </div>
            
            {/* Beschikbaar */}
            {beschikbaar && (
              <div 
                className="flex items-center gap-3 pt-6 border-t"
                style={{ borderColor: theme.colors.border }}
              >
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-sm text-emerald-700 font-medium">
                  Beschikbaar voor nieuwe opdrachten
                </span>
              </div>
            )}
            
          </div>
          
          {/* Right: Organic Photo */}
          <div className={`relative ${getRevealClass('right')}`}>
            
            {/* Background accent shape */}
            <div 
              className="absolute -inset-4 lg:-inset-6"
              style={{ 
                background: theme.colors.background,
                borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
              }}
            />
            
            {/* Main photo with organic shape */}
            <div 
              className="relative aspect-[4/5] w-full max-w-md lg:max-w-none mx-auto bg-cover bg-center"
              style={{ 
                backgroundImage: `url('${content.foto || images.hero}')`,
                borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
              }}
            />
            
            {/* Floating stats card */}
            <div 
              className="absolute -bottom-4 -left-4 lg:bottom-8 lg:-left-8 p-5 rounded-lg shadow-xl"
              style={{ background: theme.colors.surface }}
            >
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p 
                    className="text-2xl font-semibold" 
                    style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                  >
                    {jarenErvaring}+
                  </p>
                  <p 
                    className="text-[10px] uppercase tracking-widest" 
                    style={{ color: theme.colors.textMuted }}
                  >
                    Jaar
                  </p>
                </div>
                <div className="w-px h-10" style={{ background: theme.colors.border }} />
                <div className="text-center">
                  <p 
                    className="text-2xl font-semibold" 
                    style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                  >
                    100%
                  </p>
                  <p 
                    className="text-[10px] uppercase tracking-widest" 
                    style={{ color: theme.colors.textMuted }}
                  >
                    Inzet
                  </p>
                </div>
              </div>
            </div>
            
          </div>
          
        </div>
        
      </div>
    </section>
  );
}


// ============================================
// EDITORIAL-3 - Diagonal Cut
// Tekst links (5 col), diagonaal afgesneden foto rechts (7 col)
// ============================================
function HeroEditorial3({ 
  theme, 
  palette, 
  content, 
  heroTitel, 
  heroSubtitel,
  heroIntro,
  ctaText, 
  images, 
  beroepLabel,
  beschikbaar,
  werkgebied,
  hasBIG,
}: any) {
  // Bereken jaren ervaring
  const jarenErvaring = content.werkervaring?.[0]?.startjaar 
    ? new Date().getFullYear() - content.werkervaring[0].startjaar 
    : 10;

  return (
    <section 
      className="min-h-screen flex items-center px-6 md:px-12 lg:px-20 py-24 lg:py-32"
      style={{ background: theme.colors.background }}
    >
      <div className="max-w-7xl mx-auto w-full">
        
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left: Content (5 cols) */}
          <div className={`lg:col-span-5 ${getRevealClass('left')}`}>
            
            {/* Label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px" style={{ background: palette.primary }} />
              <span 
                className="text-[10px] font-semibold uppercase tracking-[0.2em]"
                style={{ color: palette.primary }}
              >
                {beroepLabel}
              </span>
            </div>
            
            {/* Name */}
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] italic mb-5"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {heroTitel}
            </h1>
            
            {/* Tagline */}
            <p 
              className="text-lg md:text-xl mb-6"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.textMuted }}
            >
              {heroSubtitel}
            </p>
            
            {/* Intro */}
            {heroIntro && (
              <p 
                className="text-sm leading-[1.8] mb-8"
                style={{ color: theme.colors.textMuted }}
              >
                {heroIntro}
              </p>
            )}
            
            {/* USPs - Vertical list */}
            <div className="space-y-2 mb-8">
              {hasBIG && (
                <div className="flex items-center gap-3 text-sm" style={{ color: theme.colors.text }}>
                  <span className="material-symbols-outlined text-base" style={{ color: palette.primary }}>check_circle</span>
                  BIG-geregistreerd verpleegkundige
                </div>
              )}
              <div className="flex items-center gap-3 text-sm" style={{ color: theme.colors.text }}>
                <span className="material-symbols-outlined text-base" style={{ color: palette.primary }}>check_circle</span>
                100% DBA-compliant
              </div>
              <div className="flex items-center gap-3 text-sm" style={{ color: theme.colors.text }}>
                <span className="material-symbols-outlined text-base" style={{ color: palette.primary }}>check_circle</span>
                VOG &amp; beroepsaansprakelijk verzekerd
              </div>
            </div>
            
            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors"
                style={{ backgroundColor: palette.primary }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = palette.primaryHover}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = palette.primary}
              >
                {ctaText}
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </a>
              <a 
                href="#over" 
                className="inline-flex items-center gap-2 px-6 py-3 border text-sm font-semibold uppercase tracking-widest transition-colors"
                style={{ borderColor: theme.colors.border, color: theme.colors.textMuted }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = palette.primary;
                  e.currentTarget.style.color = palette.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = theme.colors.border;
                  e.currentTarget.style.color = theme.colors.textMuted;
                }}
              >
                Profiel
              </a>
            </div>
            
          </div>
          
          {/* Right: Diagonal Photo (7 cols) */}
          <div className={`lg:col-span-7 relative ${getRevealClass('right')}`}>
            
            {/* Photo with diagonal cut */}
            <div 
              className="aspect-[4/3] lg:aspect-[5/4] w-full bg-cover bg-center"
              style={{ 
                backgroundImage: `url('${content.foto || images.hero}')`,
                clipPath: 'polygon(8% 0, 100% 0, 100% 100%, 0 100%)',
              }}
            />
            
            {/* Beschikbaar label */}
            {beschikbaar && (
              <div 
                className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 rounded-full shadow-lg"
                style={{ background: theme.colors.surface }}
              >
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-emerald-700">Beschikbaar</span>
              </div>
            )}
            
            {/* Stats bottom left */}
            <div 
              className="absolute bottom-6 left-0 flex items-center gap-6 px-6 py-4 shadow-xl"
              style={{ background: theme.colors.surface }}
            >
              <div>
                <p 
                  className="text-3xl font-semibold" 
                  style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                >
                  {jarenErvaring}+
                </p>
                <p 
                  className="text-[10px] uppercase tracking-widest" 
                  style={{ color: theme.colors.textMuted }}
                >
                  Jaar ervaring
                </p>
              </div>
              <div className="w-px h-12" style={{ background: theme.colors.border }} />
              <div>
                <p 
                  className="text-3xl font-semibold" 
                  style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                >
                  24h
                </p>
                <p 
                  className="text-[10px] uppercase tracking-widest" 
                  style={{ color: theme.colors.textMuted }}
                >
                  Reactietijd
                </p>
              </div>
            </div>
            
          </div>
          
        </div>
        
      </div>
    </section>
  );
}
// ============================================
// PROACTIEF VARIANTEN
// ============================================
// 
// proactief    - Sharp split: border-left accent, sharp corners (Contact-style)
// proactief-2  - Card grid: rounded-[20px], icon circles, top-border hover (Diensten-style)
// proactief-3  - Blob style: organische foto vorm, decoratieve cirkels
//
// ============================================

// ============================================
// PROACTIEF - Sharp Split
// Border-left accent, sharp corners, Contact-style
// ============================================
function HeroProactief({ 
  theme, 
  palette, 
  content, 
  heroTitel, 
  heroSubtitel,
  heroIntro,
  ctaText, 
  images, 
  beroepLabel,
  beschikbaar,
  werkgebied,
  hasBIG,
}: any) {
  // Bereken jaren ervaring
  const jarenErvaring = content.werkervaring?.[0]?.startjaar 
    ? new Date().getFullYear() - content.werkervaring[0].startjaar 
    : 10;

  return (
    <section 
      className="min-h-screen flex items-center px-6 md:px-12 lg:px-20 py-24 lg:py-32 relative overflow-hidden"
      style={{ background: theme.colors.background }}
    >
      {/* Decorative circle */}
      <div 
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-[0.03]"
        style={{ background: palette.primary }}
      />
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left: Content */}
          <div className={getRevealClass('left')}>
            
            {/* Label met lijn accent */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-1" style={{ background: palette.primary }} />
              <span 
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: palette.primary }}
              >
                {beroepLabel}
              </span>
            </div>
            
            {/* Name */}
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-4"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {heroTitel}
            </h1>
            
            {/* Tagline */}
            <p 
              className="text-xl mb-6"
              style={{ color: theme.colors.textMuted }}
            >
              {heroSubtitel}
            </p>
            
            {/* Intro */}
            {heroIntro && (
              <p 
                className="text-base leading-relaxed mb-8 max-w-lg"
                style={{ color: theme.colors.textMuted }}
              >
                {heroIntro}
              </p>
            )}
            
            {/* USPs met check icons */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8">
              {hasBIG && (
                <span className="flex items-center gap-2 text-sm" style={{ color: theme.colors.text }}>
                  <svg className="w-4 h-4" style={{ color: palette.primary }} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  BIG-geregistreerd
                </span>
              )}
              <span className="flex items-center gap-2 text-sm" style={{ color: theme.colors.text }}>
                <svg className="w-4 h-4" style={{ color: palette.primary }} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                DBA-compliant
              </span>
              <span className="flex items-center gap-2 text-sm" style={{ color: theme.colors.text }}>
                <svg className="w-4 h-4" style={{ color: palette.primary }} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                VOG & Verzekerd
              </span>
            </div>
            
            {/* Beschikbaar */}
            {beschikbaar && (
              <div className="flex items-center gap-2 mb-8">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-emerald-700">Beschikbaar voor opdrachten</span>
              </div>
            )}
            
            {/* Buttons */}
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
          
          {/* Right: Photo met border-left accent */}
          <div className={`relative ${getRevealClass('right')}`}>
            
            {/* Border accent links van foto */}
            <div 
              className="absolute left-0 top-8 bottom-8 w-1"
              style={{ background: palette.primary }}
            />
            
            {/* Main photo - sharp corners */}
            <div 
              className="aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 lg:ml-auto bg-cover bg-center ml-4"
              style={{ backgroundImage: `url('${content.foto || images.hero}')` }}
            />
            
            {/* Stats card met border-left */}
            <div 
              className="absolute -bottom-6 -left-4 lg:left-0 p-5 border-l-4"
              style={{ borderColor: palette.primary, background: theme.colors.surface }}
            >
              <div className="flex items-center gap-6">
                <div>
                  <p 
                    className="text-3xl font-bold" 
                    style={{ color: palette.primary }}
                  >
                    {jarenErvaring}+
                  </p>
                  <p 
                    className="text-[11px] font-medium uppercase tracking-wider" 
                    style={{ color: theme.colors.textMuted }}
                  >
                    Jaar ervaring
                  </p>
                </div>
                <div className="w-px h-12" style={{ background: theme.colors.border }} />
                <div>
                  <p 
                    className="text-3xl font-bold" 
                    style={{ color: palette.primary }}
                  >
                    100%
                  </p>
                  <p 
                    className="text-[11px] font-medium uppercase tracking-wider" 
                    style={{ color: theme.colors.textMuted }}
                  >
                    Inzet
                  </p>
                </div>
              </div>
            </div>
            
          </div>
          
        </div>
      </div>
    </section>
  );
}


// ============================================
// PROACTIEF-2 - Card Grid
// Rounded cards met icons, top-border hover, Diensten-style
// ============================================
function HeroProactief2({ 
  theme, 
  palette, 
  content, 
  heroTitel, 
  heroSubtitel,
  heroIntro,
  ctaText, 
  images, 
  beroepLabel,
  beschikbaar,
  werkgebied,
  hasBIG,
}: any) {
  // Bereken jaren ervaring
  const jarenErvaring = content.werkervaring?.[0]?.startjaar 
    ? new Date().getFullYear() - content.werkervaring[0].startjaar 
    : 10;

  // USP items
  const uspItems = [
    { icon: 'verified', label: 'BIG-geregistreerd', show: hasBIG },
    { icon: 'shield', label: 'DBA-compliant', show: true },
    { icon: 'verified_user', label: 'VOG & Verzekerd', show: true },
    { icon: 'location_on', label: werkgebied, show: true },
  ].filter(item => item.show);

  return (
    <section 
      className="min-h-screen flex items-center px-6 md:px-12 lg:px-20 py-24 lg:py-32 relative overflow-hidden"
      style={{ background: theme.colors.backgroundAlt }}
    >
      {/* Decorative circle */}
      <div 
        className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full opacity-[0.03]"
        style={{ background: palette.primary }}
      />
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Photo */}
          <div className={`relative order-2 lg:order-1 ${getRevealClass('left')}`}>
            
            {/* Main photo - rounded */}
            <div 
              className="aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 rounded-[20px] bg-cover bg-center"
              style={{ backgroundImage: `url('${content.foto || images.hero}')` }}
            />
            
            {/* Beschikbaar badge */}
            {beschikbaar && (
              <div className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white rounded-full">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-emerald-700">Beschikbaar</span>
              </div>
            )}
            
            {/* Stats badge - rounded */}
            <div 
              className="absolute -bottom-5 right-6 lg:right-auto lg:-right-8 rounded-[20px] px-6 py-4"
              style={{ background: theme.colors.surface }}
            >
              <p 
                className="text-2xl font-bold" 
                style={{ color: palette.primary }}
              >
                {jarenErvaring}+ jaar
              </p>
              <p 
                className="text-xs" 
                style={{ color: theme.colors.textMuted }}
              >
                Ervaring in de zorg
              </p>
            </div>
            
          </div>
          
          {/* Right: Content */}
          <div className={`order-1 lg:order-2 ${getRevealClass('right')}`}>
            
            {/* Label - italic */}
            <span 
              className="text-sm italic mb-3 block"
              style={{ color: palette.primary }}
            >
              {beroepLabel}
            </span>
            
            {/* Name */}
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-4"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {heroTitel}
            </h1>
            
            {/* Tagline */}
            <p 
              className="text-xl mb-6"
              style={{ color: theme.colors.textMuted }}
            >
              {heroSubtitel}
            </p>
            
            {/* Intro */}
            {heroIntro && (
              <p 
                className="text-[15px] leading-relaxed mb-8 max-w-lg"
                style={{ color: theme.colors.textMuted }}
              >
                {heroIntro}
              </p>
            )}
            
            {/* USPs als cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {uspItems.map((item, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-3 p-4 rounded-[20px] group hover:-translate-y-1 transition-all relative overflow-hidden"
                  style={{ background: theme.colors.surface }}
                >
                  {/* Top border on hover */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: palette.primary }}
                  />
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: palette.primaryLight || `${palette.primary}15` }}
                  >
                    <span 
                      className="material-symbols-outlined"
                      style={{ color: palette.primary }}
                    >
                      {item.icon}
                    </span>
                  </div>
                  <span 
                    className="text-sm font-medium"
                    style={{ color: theme.colors.text }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Buttons */}
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
// Organische foto vorm, decoratieve cirkels
// ============================================
function HeroProactief3({ 
  theme, 
  palette, 
  content, 
  heroTitel, 
  heroSubtitel,
  heroIntro,
  ctaText, 
  images, 
  beroepLabel,
  beschikbaar,
  werkgebied,
  hasBIG,
}: any) {
  // Bereken jaren ervaring
  const jarenErvaring = content.werkervaring?.[0]?.startjaar 
    ? new Date().getFullYear() - content.werkervaring[0].startjaar 
    : 10;

  // Blob shape style
  const blobStyle = {
    borderRadius: '50% 50% 50% 50% / 55% 55% 45% 45%',
  };

  return (
    <section 
      className="min-h-screen flex items-center px-6 md:px-12 lg:px-20 py-24 lg:py-32 relative overflow-hidden"
      style={{ background: theme.colors.background }}
    >
      {/* Decorative circles */}
      <div 
        className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full opacity-[0.04]"
        style={{ background: palette.primary }}
      />
      <div 
        className="absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full opacity-[0.03]"
        style={{ background: palette.primary }}
      />
      <div 
        className="absolute top-1/3 right-1/4 w-[150px] h-[150px] rounded-full opacity-[0.04]"
        style={{ background: palette.accent || palette.primary }}
      />
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left: Content */}
          <div className={getRevealClass('left')}>
            
            {/* Beschikbaar */}
            {beschikbaar && (
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-emerald-700">Beschikbaar voor opdrachten</span>
              </div>
            )}
            
            {/* Label - italic */}
            <span 
              className="text-sm italic block mb-2"
              style={{ color: palette.primary }}
            >
              {beroepLabel} · {werkgebied}
            </span>
            
            {/* Name */}
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-4"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {heroTitel}
            </h1>
            
            {/* Tagline */}
            <p 
              className="text-xl mb-6"
              style={{ color: theme.colors.textMuted }}
            >
              {heroSubtitel}
            </p>
            
            {/* Intro */}
            {heroIntro && (
              <p 
                className="text-[15px] leading-relaxed mb-8 max-w-lg"
                style={{ color: theme.colors.textMuted }}
              >
                {heroIntro}
              </p>
            )}
            
            {/* USPs */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8">
              {hasBIG && (
                <span className="flex items-center gap-2 text-sm" style={{ color: theme.colors.text }}>
                  <svg className="w-4 h-4" style={{ color: palette.primary }} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  BIG-geregistreerd
                </span>
              )}
              <span className="flex items-center gap-2 text-sm" style={{ color: theme.colors.text }}>
                <svg className="w-4 h-4" style={{ color: palette.primary }} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                DBA-compliant
              </span>
              <span className="flex items-center gap-2 text-sm" style={{ color: theme.colors.text }}>
                <svg className="w-4 h-4" style={{ color: palette.primary }} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                VOG & Verzekerd
              </span>
            </div>
            
            {/* Buttons */}
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
            
            {/* Stats row */}
            <div 
              className="flex gap-8 pt-8 border-t"
              style={{ borderColor: theme.colors.border }}
            >
              <div>
                <p 
                  className="text-3xl font-bold" 
                  style={{ color: palette.primary }}
                >
                  {jarenErvaring}+
                </p>
                <p 
                  className="text-[11px] font-medium uppercase tracking-wider" 
                  style={{ color: theme.colors.textMuted }}
                >
                  Jaar ervaring
                </p>
              </div>
              <div>
                <p 
                  className="text-3xl font-bold" 
                  style={{ color: palette.primary }}
                >
                  100%
                </p>
                <p 
                  className="text-[11px] font-medium uppercase tracking-wider" 
                  style={{ color: theme.colors.textMuted }}
                >
                  Inzet
                </p>
              </div>
              <div>
                <p 
                  className="text-3xl font-bold" 
                  style={{ color: palette.primary }}
                >
                  24h
                </p>
                <p 
                  className="text-[11px] font-medium uppercase tracking-wider" 
                  style={{ color: theme.colors.textMuted }}
                >
                  Reactietijd
                </p>
              </div>
            </div>
            
          </div>
          
          {/* Right: Blob Image */}
          <div className={`relative flex justify-center ${getRevealClass('right')}`}>
            
            {/* Background blob */}
            <div 
              className="absolute inset-0 scale-110 opacity-[0.06]"
              style={{ ...blobStyle, background: palette.primary }}
            />
            
            {/* Border blob */}
            <div 
              className="absolute inset-0 border-2 scale-105"
              style={{ ...blobStyle, borderColor: `${palette.primary}20` }}
            />
            
            {/* Main blob image */}
            <div className="relative w-full max-w-md aspect-square">
              <img 
                src={content.foto || images.hero}
                alt={beroepLabel}
                className="w-full h-full object-cover"
                style={blobStyle}
              />
            </div>
            
          </div>
          
        </div>
      </div>
    </section>
  );
}
// ============================================
// PORTFOLIO VARIANTEN
// ============================================
// 
// portfolio    - Gradient pill: gradient bg, pill-shaped foto, floating badge
// portfolio-2  - Overlapping card: foto links, content card overlapt
// portfolio-3  - Elegant typographic: grote serif heading, signature element
//
// ============================================

// ============================================
// PORTFOLIO - Gradient Pill
// Gradient background, pill-shaped foto, floating registration badge
// ============================================
function HeroPortfolio({ 
  theme, 
  palette, 
  content, 
  heroTitel, 
  heroSubtitel,
  heroIntro,
  ctaText, 
  images, 
  beroepLabel,
  beschikbaar,
  werkgebied,
  hasBIG,
}: any) {
  // Bereken jaren ervaring
  const startjaar = content.werkervaring?.[0]?.startjaar;
  const jarenErvaring = startjaar 
    ? new Date().getFullYear() - startjaar 
    : null;

  return (
    <section 
      className="min-h-screen flex items-center relative overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, ${palette.primary} 0%, ${palette.primaryLight || palette.primary} 100%)`
      }}
    >
      {/* Decorative Circles */}
      <div 
        className="absolute -top-[200px] -right-[200px] w-[600px] h-[600px] rounded-full"
        style={{ backgroundColor: `${palette.accent || palette.primary}15` }}
      />
      <div className="absolute -bottom-[300px] -left-[200px] w-[800px] h-[800px] rounded-full bg-white/[0.03]" />
      
      <div className="max-w-[1300px] mx-auto px-8 md:px-12 pt-36 pb-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* Text Content */}
          <div className={getRevealClass('left')}>
            
            {/* Beschikbaar Badge */}
            {beschikbaar && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-emerald-500/20">
                <span className="w-2 h-2 rounded-full animate-pulse bg-emerald-400" />
                <span className="text-[13px] font-medium text-emerald-300">
                  Beschikbaar voor opdrachten
                </span>
              </div>
            )}
            
            <h1 
              className="text-4xl md:text-5xl lg:text-[54px] font-medium text-white leading-[1.1] mb-4"
              style={{ fontFamily: theme.fonts.heading }}
            >
              {heroTitel}
            </h1>
            
            <p 
              className="text-xl md:text-2xl font-medium mb-6"
              style={{ color: palette.accentLight || palette.accent || '#9ccc65' }}
            >
              {heroSubtitel}
            </p>
            
            {heroIntro && (
              <p className="text-[17px] text-white/80 leading-[1.8] mb-8 max-w-[480px]">
                {heroIntro}
              </p>
            )}
            
            {/* USPs */}
            <div className="flex flex-wrap gap-4 mb-10">
              {hasBIG && (
                <span className="flex items-center gap-2 text-sm text-white/80">
                  <span 
                    className="w-1.5 h-1.5 rounded-full" 
                    style={{ background: palette.accent || '#9ccc65' }} 
                  />
                  BIG-geregistreerd
                </span>
              )}
              <span className="flex items-center gap-2 text-sm text-white/80">
                <span 
                  className="w-1.5 h-1.5 rounded-full" 
                  style={{ background: palette.accent || '#9ccc65' }} 
                />
                DBA-compliant
              </span>
              <span className="flex items-center gap-2 text-sm text-white/80">
                <span 
                  className="w-1.5 h-1.5 rounded-full" 
                  style={{ background: palette.accent || '#9ccc65' }} 
                />
                VOG & Verzekerd
              </span>
            </div>
            
            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <a 
                href="#contact" 
                className="px-8 py-3.5 bg-white font-semibold text-sm rounded-full transition-all hover:-translate-y-0.5"
                style={{ color: palette.primary }}
              >
                {ctaText}
              </a>
              <a 
                href="#over" 
                className="px-8 py-3.5 border-2 border-white/40 text-white font-semibold text-sm rounded-full transition-all hover:bg-white/10"
              >
                Meer over mij
              </a>
            </div>
            
            {/* Stats */}
            <div className="flex gap-12">
              {jarenErvaring && (
                <div>
                  <p 
                    className="text-[42px] font-medium text-white leading-none"
                    style={{ fontFamily: theme.fonts.heading }}
                  >
                    {jarenErvaring}+
                  </p>
                  <p className="text-sm text-white/60 mt-1">Jaar ervaring</p>
                </div>
              )}
              <div>
                <p 
                  className="text-[42px] font-medium text-white leading-none"
                  style={{ fontFamily: theme.fonts.heading }}
                >
                  100%
                </p>
                <p className="text-sm text-white/60 mt-1">Inzet</p>
              </div>
            </div>
          </div>
          
          {/* Profile Image */}
          <div className={`flex justify-center ${getRevealClass('right')}`}>
            <div className="relative">
              <img 
                src={content.foto || images.hero}
                alt={beroepLabel}
                className="w-[380px] h-[480px] object-cover"
                style={{ borderRadius: '200px 200px 30px 30px' }}
              />
              
              {/* Floating Badge */}
              {startjaar && (
                <div 
                  className="absolute bottom-8 -left-8 p-5 px-6 rounded-[20px]"
                  style={{ background: theme.colors.surface }}
                >
                  <p 
                    className="text-xs mb-1"
                    style={{ color: theme.colors.textMuted }}
                  >
                    Geregistreerd sinds
                  </p>
                  <p 
                    className="text-xl font-medium"
                    style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
                  >
                    {startjaar}
                  </p>
                  <div 
                    className="absolute -top-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: palette.accent || palette.primary }}
                  >
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
// Foto links met gradient overlay, content card overlapt
// ============================================
function HeroPortfolio2({ 
  theme, 
  palette, 
  content, 
  heroTitel, 
  heroSubtitel,
  heroIntro,
  ctaText, 
  images, 
  beroepLabel,
  beschikbaar,
  werkgebied,
  hasBIG,
}: any) {
  // Bereken jaren ervaring
  const startjaar = content.werkervaring?.[0]?.startjaar;
  const jarenErvaring = startjaar 
    ? new Date().getFullYear() - startjaar 
    : null;

  // Split naam voor italic styling
  const naamParts = heroTitel.split(' ');
  const eersteNaam = naamParts.slice(0, 2).join(' ');
  const achternaam = naamParts.slice(2).join(' ');

  return (
    <section 
      className="min-h-screen relative"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="grid lg:grid-cols-12 min-h-screen">
        
        {/* Left: Large Image */}
        <div className={`lg:col-span-7 relative h-[50vh] lg:h-auto ${getRevealClass('left')}`}>
          <img 
            src={content.foto || images.hero}
            alt={beroepLabel}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div 
            className="absolute inset-0"
            style={{ background: `linear-gradient(to right, ${palette.primary}1A, transparent)` }}
          />
          
          {/* Stats overlay bottom left */}
          <div className="absolute bottom-8 left-8 flex gap-8">
            {jarenErvaring && (
              <div className="text-white">
                <p 
                  className="text-4xl font-medium"
                  style={{ fontFamily: theme.fonts.heading }}
                >
                  {jarenErvaring}+
                </p>
                <p className="text-sm text-white/70">Jaar ervaring</p>
              </div>
            )}
            <div className="text-white">
              <p 
                className="text-4xl font-medium"
                style={{ fontFamily: theme.fonts.heading }}
              >
                100%
              </p>
              <p className="text-sm text-white/70">Inzet</p>
            </div>
          </div>
        </div>
        
        {/* Right: Overlapping Content Card */}
        <div className="lg:col-span-5 flex items-center relative">
          <div 
            className={`w-full lg:-ml-20 p-8 lg:p-12 relative z-10 ${getRevealClass('right')}`}
            style={{ backgroundColor: theme.colors.background }}
          >
            
            {/* Label */}
            <span 
              className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-6 block"
              style={{ color: palette.accent || palette.primary }}
            >
              {beroepLabel}
            </span>
            
            {/* Name with italic */}
            <h1 
              className="text-4xl lg:text-5xl leading-[1.1] mb-4"
              style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
            >
              {eersteNaam}<br/>
              {achternaam && <em className="font-normal">{achternaam}</em>}
            </h1>
            
            {/* Tagline */}
            <p 
              className="text-lg mb-6"
              style={{ color: theme.colors.textMuted }}
            >
              {heroSubtitel}
            </p>
            
            {/* Intro */}
            {heroIntro && (
              <p 
                className="text-base leading-relaxed mb-8"
                style={{ color: theme.colors.textMuted }}
              >
                {heroIntro}
              </p>
            )}
            
            {/* USPs with dots */}
            <div className="flex flex-wrap gap-4 mb-8">
              {hasBIG && (
                <span 
                  className="flex items-center gap-2 text-sm"
                  style={{ color: theme.colors.text }}
                >
                  <span 
                    className="w-1.5 h-1.5 rounded-full" 
                    style={{ background: palette.accent || palette.primary }} 
                  />
                  BIG-geregistreerd
                </span>
              )}
              <span 
                className="flex items-center gap-2 text-sm"
                style={{ color: theme.colors.text }}
              >
                <span 
                  className="w-1.5 h-1.5 rounded-full" 
                  style={{ background: palette.accent || palette.primary }} 
                />
                DBA-compliant
              </span>
              <span 
                className="flex items-center gap-2 text-sm"
                style={{ color: theme.colors.text }}
              >
                <span 
                  className="w-1.5 h-1.5 rounded-full" 
                  style={{ background: palette.accent || palette.primary }} 
                />
                VOG & Verzekerd
              </span>
            </div>
            
            {/* Beschikbaar */}
            {beschikbaar && (
              <div className="flex items-center gap-2 mb-8">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-emerald-700">
                  Beschikbaar voor opdrachten
                </span>
              </div>
            )}
            
            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <a 
                href="#contact" 
                className="px-7 py-3.5 text-sm font-semibold text-white rounded-full transition-all hover:opacity-90"
                style={{ background: palette.primary }}
              >
                {ctaText}
              </a>
              <a 
                href="#over" 
                className="px-7 py-3.5 text-sm font-semibold rounded-full border transition-all hover:bg-gray-50"
                style={{ borderColor: theme.colors.border, color: theme.colors.text }}
              >
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
// Grote serif heading met italic accent, signature element
// ============================================
function HeroPortfolio3({ 
  theme, 
  palette, 
  content, 
  heroTitel, 
  heroSubtitel,
  heroIntro,
  ctaText, 
  images, 
  beroepLabel,
  beschikbaar,
  werkgebied,
  hasBIG,
}: any) {
  // Bereken jaren ervaring
  const startjaar = content.werkervaring?.[0]?.startjaar;
  const jarenErvaring = startjaar 
    ? new Date().getFullYear() - startjaar 
    : null;

  // Split subtitel voor italic accent op laatste woord
  const subtitelParts = heroSubtitel?.split(' ') || [];
  const lastWord = subtitelParts.pop() || '';
  const restSubtitel = subtitelParts.join(' ');

  return (
    <section 
      className="min-h-screen flex items-center py-24 lg:py-32 px-6 lg:px-12"
      style={{ background: theme.colors.background }}
    >
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Top: Micro label met lijn */}
        <div className={`flex items-center gap-4 mb-12 ${getRevealClass('up')}`}>
          <div className="w-12 h-px" style={{ background: palette.primary }} />
          <span 
            className="text-[11px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: palette.primary }}
          >
            {beroepLabel}
          </span>
        </div>
        
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Left: Large Typography (7 cols) */}
          <div className={`lg:col-span-7 ${getRevealClass('left')}`}>
            
            {/* Beschikbaar */}
            {beschikbaar && (
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-emerald-700">
                  Beschikbaar voor opdrachten
                </span>
              </div>
            )}
            
            <h1 
              className="text-4xl md:text-5xl lg:text-[56px] leading-[1.08] mb-6"
              style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
            >
              {restSubtitel}<br/>
              <em 
                className="font-normal"
                style={{ color: palette.accent || palette.primary }}
              >
                {lastWord}
              </em>
            </h1>
            
            {heroIntro && (
              <p 
                className="text-lg leading-relaxed max-w-md mb-10"
                style={{ color: theme.colors.textMuted }}
              >
                {heroIntro}
              </p>
            )}
            
            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-full transition-all hover:opacity-90"
                style={{ background: palette.primary }}
              >
                {ctaText}
                <span>→</span>
              </a>
              <a 
                href="#over" 
                className="px-7 py-3.5 text-sm font-semibold rounded-full border transition-all hover:bg-gray-50"
                style={{ borderColor: theme.colors.border, color: theme.colors.text }}
              >
                Bekijk profiel
              </a>
            </div>
            
            {/* Signature element met USPs */}
            <div 
              className="pt-8 border-t"
              style={{ borderColor: theme.colors.border }}
            >
              <p 
                className="text-2xl italic mb-1"
                style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
              >
                {heroTitel}
              </p>
              <p 
                className="text-sm mb-6"
                style={{ color: theme.colors.textMuted }}
              >
                {beroepLabel} · {werkgebied}
              </p>
              
              {/* USPs met dots */}
              <div className="flex flex-wrap gap-4">
                {hasBIG && (
                  <span 
                    className="flex items-center gap-2 text-sm"
                    style={{ color: theme.colors.text }}
                  >
                    <span 
                      className="w-1.5 h-1.5 rounded-full" 
                      style={{ background: palette.accent || palette.primary }} 
                    />
                    BIG-geregistreerd
                  </span>
                )}
                <span 
                  className="flex items-center gap-2 text-sm"
                  style={{ color: theme.colors.text }}
                >
                  <span 
                    className="w-1.5 h-1.5 rounded-full" 
                    style={{ background: palette.accent || palette.primary }} 
                  />
                  DBA-compliant
                </span>
                <span 
                  className="flex items-center gap-2 text-sm"
                  style={{ color: theme.colors.text }}
                >
                  <span 
                    className="w-1.5 h-1.5 rounded-full" 
                    style={{ background: palette.accent || palette.primary }} 
                  />
                  VOG & Verzekerd
                </span>
              </div>
            </div>
            
          </div>
          
          {/* Right: Photo + Info (5 cols) */}
          <div className={`lg:col-span-5 relative ${getRevealClass('right')}`}>
            
            {/* Decorative border square */}
            <div 
              className="absolute -top-4 -left-4 w-32 h-32 border-2 opacity-20"
              style={{ borderColor: palette.accent || palette.primary }}
            />
            
            {/* Photo */}
            <div className="relative">
              <img 
                src={content.foto || images.hero}
                alt={beroepLabel}
                className="w-full h-[400px] lg:h-[480px] object-cover"
                style={{ borderRadius: '0 80px 0 0' }}
              />
              
              {/* Overlay with name */}
              <div 
                className="absolute bottom-0 left-0 right-0 p-6"
                style={{ background: `linear-gradient(to top, ${palette.primary}e6, transparent)` }}
              >
                <div className="flex items-end justify-between">
                  <div>
                    <p 
                      className="text-xl text-white italic"
                      style={{ fontFamily: theme.fonts.heading }}
                    >
                      {heroTitel}
                    </p>
                    <p className="text-sm text-white/70">{beroepLabel}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Stats card */}
            {jarenErvaring && (
              <div 
                className="absolute -bottom-6 -right-6 p-6 max-w-[200px]"
                style={{ background: theme.colors.surface }}
              >
                <span 
                  className="text-4xl font-normal block mb-1"
                  style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
                >
                  {jarenErvaring}+
                </span>
                <span 
                  className="text-xs uppercase tracking-wider"
                  style={{ color: theme.colors.textMuted }}
                >
                  Jaar ervaring
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
// MINDOOR VARIANTEN
// ============================================
// 
// mindoor    - Warm: decoratieve cirkels, rotated bg shape, social proof
// mindoor-2  - Centered Stack: floating stats + BIG badge
// mindoor-3  - Quote Split: quote overlay, stats row
//
// ============================================

// Social Proof Card Component (gebruikt in alle Mindoor varianten)
function MindoorSocialProof({ theme, palette }: any) {
  return (
    <div 
      className="bg-white rounded-2xl p-5 border"
      style={{ borderColor: theme.colors.border }}
    >
      <div className="flex items-center gap-4">
        <div className="flex -space-x-3">
          <img 
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80" 
            alt="Client" 
            className="w-11 h-11 rounded-full border-2 border-white object-cover" 
          />
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" 
            alt="Client" 
            className="w-11 h-11 rounded-full border-2 border-white object-cover" 
          />
          <img 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" 
            alt="Client" 
            className="w-11 h-11 rounded-full border-2 border-white object-cover" 
          />
        </div>
        <div>
          <p className="text-sm" style={{ color: theme.colors.textMuted }}>
            Vertrouwd door <strong style={{ color: theme.colors.text }}>zorginstellingen</strong> en <strong style={{ color: theme.colors.text }}>bemiddelaars</strong>.
          </p>
          <div className="flex text-sm mt-1" style={{ color: palette.accent || palette.primary }}>★★★★★</div>
        </div>
      </div>
    </div>
  );
}


// ============================================
// MINDOOR - Warm
// Decoratieve cirkels, rotated bg shape achter foto, social proof
// ============================================
function HeroMindoor({ 
  theme, 
  palette, 
  content, 
  heroTitel, 
  heroSubtitel,
  heroIntro,
  ctaText, 
  images, 
  beroepLabel,
  beschikbaar,
  werkgebied,
  hasBIG,
}: any) {
  // Bereken jaren ervaring
  const startjaar = content.werkervaring?.[0]?.startjaar;
  const jarenErvaring = startjaar 
    ? new Date().getFullYear() - startjaar 
    : null;

  return (
    <section 
      className="relative min-h-screen pt-20 lg:pt-0 flex items-center overflow-hidden"
      style={{ background: theme.colors.backgroundAlt }}
    >
      {/* Decorative circles */}
      <div 
        className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-[0.12]"
        style={{ background: palette.primary }}
      />
      <div 
        className="absolute bottom-20 -left-20 w-64 h-64 rounded-full opacity-[0.12]"
        style={{ background: palette.accent || palette.primary }}
      />
      <div 
        className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full opacity-[0.08]"
        style={{ background: palette.accent || palette.primary }}
      />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Content */}
          <div className={`order-2 lg:order-1 ${getRevealClass('left')}`}>
            
            {/* Beschikbaar */}
            {beschikbaar && (
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-emerald-700">Beschikbaar voor opdrachten</span>
              </div>
            )}
            
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl leading-tight"
              style={{ fontFamily: theme.fonts.heading }}
            >
              {heroTitel},<br/>
              <span 
                className="italic"
                style={{ color: palette.accent || palette.primary }}
              >
                {beroepLabel}
              </span>
            </h1>
            
            {heroIntro && (
              <p 
                className="mt-6 text-lg max-w-lg"
                style={{ color: theme.colors.textMuted }}
              >
                {heroIntro}
              </p>
            )}
            
            {/* USPs */}
            <div className="flex flex-wrap gap-4 mt-6">
              {hasBIG && (
                <span className="flex items-center gap-2 text-sm" style={{ color: theme.colors.text }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: palette.accent || palette.primary }} />
                  BIG-geregistreerd
                </span>
              )}
              <span className="flex items-center gap-2 text-sm" style={{ color: theme.colors.text }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: palette.accent || palette.primary }} />
                DBA-compliant
              </span>
              <span className="flex items-center gap-2 text-sm" style={{ color: theme.colors.text }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: palette.accent || palette.primary }} />
                VOG & Verzekerd
              </span>
            </div>
            
            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-white transition-all hover:-translate-y-0.5"
                style={{ background: palette.primary }}
              >
                {ctaText}
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </a>
              <a 
                href="#diensten" 
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium border-2 transition-colors hover:bg-gray-50"
                style={{ background: 'white', color: theme.colors.textMuted, borderColor: theme.colors.border }}
              >
                Bekijk diensten
              </a>
            </div>
            
            {/* Social Proof Card */}
            <div className="mt-10 max-w-md">
              <MindoorSocialProof theme={theme} palette={palette} />
            </div>
          </div>
          
          {/* Image */}
          <div className={`order-1 lg:order-2 relative ${getRevealClass('right')}`}>
            <div className="relative">
              {/* Background shape */}
              <div 
                className="absolute inset-0 rounded-[3rem] transform rotate-3"
                style={{ background: `linear-gradient(to bottom right, ${theme.colors.border}, ${palette.primary}15)` }}
              />
              {/* Main image */}
              <div className="relative rounded-[2.5rem] overflow-hidden">
                <img 
                  src={content.foto || images.hero}
                  alt={beroepLabel}
                  className="w-full aspect-[4/5] object-cover"
                />
              </div>
              {/* Floating BIG badge */}
              {hasBIG && (
                <div 
                  className="absolute -bottom-4 -left-4 lg:-left-8 bg-white rounded-2xl p-4 border"
                  style={{ borderColor: theme.colors.border }}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: `${palette.primary}15` }}
                    >
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
// Floating stats card + BIG badge, social proof
// ============================================
function HeroMindoor2({ 
  theme, 
  palette, 
  content, 
  heroTitel, 
  heroSubtitel,
  heroIntro,
  ctaText, 
  images, 
  beroepLabel,
  beschikbaar,
  werkgebied,
  hasBIG,
}: any) {
  // Bereken jaren ervaring
  const startjaar = content.werkervaring?.[0]?.startjaar;
  const jarenErvaring = startjaar 
    ? new Date().getFullYear() - startjaar 
    : null;

  // Split naam voor italic styling
  const naamParts = heroTitel.split(' ');
  const eersteNaam = naamParts.slice(0, -2).join(' ') || naamParts[0];
  const achternaam = naamParts.slice(-2).join(' ');

  return (
    <section 
      className="min-h-screen flex items-center py-24 lg:py-32 px-6 lg:px-8 relative overflow-hidden"
      style={{ background: theme.colors.background }}
    >
      {/* Decorative circles */}
      <div 
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-[0.08]"
        style={{ background: palette.primary }}
      />
      <div 
        className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full opacity-[0.10]"
        style={{ background: palette.accent || palette.primary }}
      />
      
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left: Content */}
          <div className={getRevealClass('left')}>
            
            {/* Beschikbaar */}
            {beschikbaar && (
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-emerald-700">Beschikbaar voor opdrachten</span>
              </div>
            )}
            
            <span 
              className="text-sm font-medium uppercase tracking-widest mb-4 block"
              style={{ color: palette.accent || palette.primary }}
            >
              {beroepLabel} · {werkgebied}
            </span>
            
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {eersteNaam}<br/>
              <span className="italic" style={{ color: palette.accent || palette.primary }}>{achternaam}</span>
            </h1>
            
            {heroIntro && (
              <p 
                className="text-lg mb-8 max-w-md"
                style={{ color: theme.colors.textMuted }}
              >
                {heroIntro}
              </p>
            )}
            
            {/* USPs */}
            <div className="flex flex-wrap gap-4 mb-8">
              {hasBIG && (
                <span className="flex items-center gap-2 text-sm" style={{ color: theme.colors.text }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: palette.accent || palette.primary }} />
                  BIG-geregistreerd
                </span>
              )}
              <span className="flex items-center gap-2 text-sm" style={{ color: theme.colors.text }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: palette.accent || palette.primary }} />
                DBA-compliant
              </span>
              <span className="flex items-center gap-2 text-sm" style={{ color: theme.colors.text }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: palette.accent || palette.primary }} />
                VOG & Verzekerd
              </span>
            </div>
            
            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-white transition-all hover:-translate-y-0.5"
                style={{ background: palette.primary }}
              >
                {ctaText}
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </a>
              <a 
                href="#diensten" 
                className="px-8 py-4 rounded-full font-medium border transition-all hover:bg-white"
                style={{ borderColor: theme.colors.border, color: theme.colors.text }}
              >
                Bekijk diensten
              </a>
            </div>
            
            {/* Social Proof Card */}
            <div className="max-w-md">
              <MindoorSocialProof theme={theme} palette={palette} />
            </div>
          </div>
          
          {/* Right: Photo met floating cards */}
          <div className={`relative ${getRevealClass('right')}`}>
            
            {/* Main photo */}
            <div className="rounded-3xl overflow-hidden">
              <img 
                src={content.foto || images.hero}
                alt={beroepLabel}
                className="w-full aspect-[4/5] object-cover"
              />
            </div>
            
            {/* Offset background */}
            <div 
              className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-3xl"
              style={{ background: `${palette.primary}15` }}
            />
            
            {/* Floating stats card */}
            {jarenErvaring && (
              <div 
                className="absolute -bottom-6 -left-6 p-5 rounded-2xl bg-white border"
                style={{ borderColor: theme.colors.border }}
              >
                <div className="flex items-center gap-6">
                  <div>
                    <p 
                      className="text-3xl"
                      style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
                    >
                      {jarenErvaring}+
                    </p>
                    <p className="text-xs" style={{ color: theme.colors.textMuted }}>Jaar ervaring</p>
                  </div>
                  <div className="w-px h-10" style={{ background: theme.colors.border }} />
                  <div>
                    <p 
                      className="text-3xl"
                      style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
                    >
                      100%
                    </p>
                    <p className="text-xs" style={{ color: theme.colors.textMuted }}>Inzet</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Floating BIG badge */}
            {hasBIG && (
              <div 
                className="absolute top-6 -right-4 lg:-right-8 bg-white rounded-2xl p-4 border"
                style={{ borderColor: theme.colors.border }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${palette.primary}15` }}
                  >
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
// Quote overlay op foto, stats row, social proof
// ============================================
function HeroMindoor3({ 
  theme, 
  palette, 
  content, 
  heroTitel, 
  heroSubtitel,
  heroIntro,
  ctaText, 
  images, 
  beroepLabel,
  beschikbaar,
  werkgebied,
  hasBIG,
}: any) {
  // Bereken jaren ervaring
  const startjaar = content.werkervaring?.[0]?.startjaar;
  const jarenErvaring = startjaar 
    ? new Date().getFullYear() - startjaar 
    : null;

  // Split naam voor italic styling
  const naamParts = heroTitel.split(' ');
  const eersteNaam = naamParts.slice(0, -2).join(' ') || naamParts[0];
  const achternaam = naamParts.slice(-2).join(' ');
  
  // Voornaam voor quote
  const voornaam = content.naam?.split(' ')[0] || naamParts[0];

  return (
    <section 
      className="min-h-screen flex items-center py-24 lg:py-32 px-6 lg:px-8"
      style={{ background: theme.colors.backgroundAlt }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Links - Afbeelding met quote overlay */}
          <div className={`relative ${getRevealClass('left')}`}>
            <div className="rounded-3xl overflow-hidden">
              <img 
                src={content.foto || images.hero}
                alt={beroepLabel}
                className="w-full aspect-[4/5] object-cover"
              />
            </div>
            
            {/* Offset background */}
            <div 
              className="absolute -z-10 -bottom-6 -right-6 w-full h-full rounded-3xl"
              style={{ background: `${palette.primary}15` }}
            />
            
            {/* Quote card */}
            <div 
              className="absolute -bottom-8 -left-4 lg:-left-8 max-w-[280px] p-6 rounded-2xl"
              style={{ background: palette.primary }}
            >
              <svg className="w-8 h-8 mb-3 opacity-30 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
              </svg>
              <p className="text-lg text-white/90 leading-relaxed italic">
                Persoonlijke zorg met aandacht voor wat u écht nodig heeft.
              </p>
              <p 
                className="mt-3 text-sm font-medium"
                style={{ color: palette.accentLight || palette.accent || '#e07b5f' }}
              >
                — {voornaam}
              </p>
            </div>
          </div>
          
          {/* Rechts - Content */}
          <div className={`flex flex-col justify-center lg:pl-8 ${getRevealClass('right')}`}>
            
            {/* Beschikbaar */}
            {beschikbaar && (
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-emerald-700">Beschikbaar voor opdrachten</span>
              </div>
            )}
            
            <span 
              className="text-sm font-medium uppercase tracking-widest mb-4"
              style={{ color: palette.accent || palette.primary }}
            >
              {beroepLabel}
            </span>
            
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {eersteNaam}<br/>
              <span className="italic" style={{ color: palette.accent || palette.primary }}>{achternaam}</span>
            </h1>
            
            {heroIntro && (
              <p 
                className="text-lg mb-8"
                style={{ color: theme.colors.textMuted }}
              >
                {heroIntro}
              </p>
            )}
            
            {/* USPs */}
            <div className="flex flex-wrap gap-4 mb-8">
              {hasBIG && (
                <span className="flex items-center gap-2 text-sm" style={{ color: theme.colors.text }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: palette.accent || palette.primary }} />
                  BIG-geregistreerd
                </span>
              )}
              <span className="flex items-center gap-2 text-sm" style={{ color: theme.colors.text }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: palette.accent || palette.primary }} />
                DBA-compliant
              </span>
              <span className="flex items-center gap-2 text-sm" style={{ color: theme.colors.text }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: palette.accent || palette.primary }} />
                VOG & Verzekerd
              </span>
            </div>
            
            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-white transition-all hover:-translate-y-0.5"
                style={{ background: palette.primary }}
              >
                {ctaText}
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </a>
              <a 
                href="#diensten" 
                className="px-8 py-4 rounded-full font-medium border transition-all hover:bg-white"
                style={{ borderColor: theme.colors.border, color: theme.colors.text }}
              >
                Bekijk diensten
              </a>
            </div>
            
            {/* Stats row */}
            {jarenErvaring && (
              <div 
                className="flex gap-10 pt-8 border-t"
                style={{ borderColor: theme.colors.border }}
              >
                <div>
                  <p 
                    className="text-4xl"
                    style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
                  >
                    {jarenErvaring}+
                  </p>
                  <p className="text-sm" style={{ color: theme.colors.textMuted }}>Jaar ervaring</p>
                </div>
                <div>
                  <p 
                    className="text-4xl"
                    style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
                  >
                    100%
                  </p>
                  <p className="text-sm" style={{ color: theme.colors.textMuted }}>Inzet</p>
                </div>
                <div>
                  <p 
                    className="text-4xl"
                    style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
                  >
                    24h
                  </p>
                  <p className="text-sm" style={{ color: theme.colors.textMuted }}>Reactietijd</p>
                </div>
              </div>
            )}
            
            {/* Social Proof Card */}
            <div className="mt-8">
              <MindoorSocialProof theme={theme} palette={palette} />
            </div>
            
          </div>
          
        </div>
      </div>
    </section>
  );
}

// ============================================
// SERENE VARIANTEN
// ============================================
// 
// serene    - Typographic Statement: oversized heading, border-l split
// serene-2  - Asymmetric Split: image links, stats grid
// serene-3  - Dark Banner: primary bg, white text, trust pills op image
//
// ============================================

// ============================================
// SERENE - Typographic Statement
// Oversized serif heading, border-l split, pure typography
// ============================================
function HeroSerene({ 
  theme, 
  palette, 
  content, 
  heroTitel, 
  heroSubtitel,
  heroIntro,
  ctaText, 
  images, 
  beroepLabel,
  beschikbaar,
  werkgebied,
  hasBIG,
}: any) {
  // Bereken jaren ervaring
  const startjaar = content.werkervaring?.[0]?.startjaar;
  const jarenErvaring = startjaar 
    ? new Date().getFullYear() - startjaar 
    : null;

  // Split naam voor italic styling
  const naamParts = heroTitel.split(' ');
  const voorNaam = naamParts.slice(0, -1).join(' ');
  const laatsteNaam = naamParts[naamParts.length - 1];

  return (
    <section 
      className="min-h-screen flex items-center py-24 lg:py-32 px-6 lg:px-12"
      style={{ background: theme.colors.background }}
    >
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Top micro label met lijn */}
        <div className={`flex items-center gap-4 mb-16 ${getRevealClass('up')}`}>
          <span 
            className="text-[9px] font-medium uppercase tracking-[2px]"
            style={{ color: theme.colors.textMuted }}
          >
            {beroepLabel}
          </span>
          <div className="flex-1 h-px" style={{ background: theme.colors.border }} />
        </div>
        
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-6">
          
          {/* Left: Oversized Typography (7 cols) */}
          <div className={`lg:col-span-7 lg:pr-12 ${getRevealClass('left')}`}>
            
            {/* Beschikbaar */}
            {beschikbaar && (
              <div className="flex items-center gap-2 mb-8">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-emerald-700">Beschikbaar voor opdrachten</span>
              </div>
            )}
            
            <h1 
              className="text-5xl md:text-6xl lg:text-[72px] font-normal leading-[1.05] mb-8"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {voorNaam}<br/>
              {laatsteNaam && (
                <>
                  <span style={{ color: theme.colors.text }}>{laatsteNaam.split(' ')[0]} </span>
                  <em className="italic" style={{ color: palette.primary }}>{laatsteNaam.split(' ').slice(1).join(' ') || laatsteNaam}</em>
                </>
              )}
            </h1>
            
            {heroIntro && (
              <p 
                className="text-base leading-relaxed max-w-sm mb-10"
                style={{ color: theme.colors.textMuted }}
              >
                {heroIntro}
              </p>
            )}
            
            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 px-6 py-3 text-[10px] uppercase tracking-[2px] text-white rounded"
                style={{ background: palette.primary }}
              >
                {ctaText}
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
              <a 
                href="#diensten" 
                className="inline-flex items-center gap-2 px-6 py-3 text-[10px] uppercase tracking-[2px] border rounded"
                style={{ borderColor: theme.colors.border, color: theme.colors.text }}
              >
                Bekijk diensten
              </a>
            </div>
            
          </div>
          
          {/* Right: Image + Info (5 cols) */}
          <div 
            className={`lg:col-span-5 lg:border-l lg:pl-12 ${getRevealClass('right')}`}
            style={{ borderColor: theme.colors.border }}
          >
            
            {/* Photo met organische hoek */}
            <div className="relative mb-10">
              <img 
                src={content.foto || images.hero}
                alt={beroepLabel}
                className="w-full h-[350px] lg:h-[400px] object-cover"
                style={{ borderRadius: '0 80px 0 0' }}
              />
            </div>
            
            {/* Stats als typografie */}
            <div className="space-y-6">
              {jarenErvaring && (
                <div>
                  <span 
                    className="text-[9px] font-medium uppercase tracking-[2px] block mb-2"
                    style={{ color: theme.colors.textMuted }}
                  >
                    Ervaring
                  </span>
                  <span 
                    className="text-3xl"
                    style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                  >
                    {jarenErvaring}+ jaar
                  </span>
                </div>
              )}
              <div>
                <span 
                  className="text-[9px] font-medium uppercase tracking-[2px] block mb-2"
                  style={{ color: theme.colors.textMuted }}
                >
                  Werkgebied
                </span>
                <span 
                  className="text-2xl"
                  style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                >
                  {werkgebied}
                </span>
              </div>
            </div>
            
            {/* Trust inline */}
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
// Image links met organic edge, content rechts met stats grid
// ============================================
function HeroSerene2({ 
  theme, 
  palette, 
  content, 
  heroTitel, 
  heroSubtitel,
  heroIntro,
  ctaText, 
  images, 
  beroepLabel,
  beschikbaar,
  werkgebied,
  hasBIG,
}: any) {
  // Bereken jaren ervaring
  const startjaar = content.werkervaring?.[0]?.startjaar;
  const jarenErvaring = startjaar 
    ? new Date().getFullYear() - startjaar 
    : null;

  // Split subtitel voor italic accent op laatste woord
  const subtitelParts = heroSubtitel?.split(' ') || [];
  const lastWord = subtitelParts.pop() || '';
  const restSubtitel = subtitelParts.join(' ');

  return (
    <section 
      className="min-h-screen flex items-center py-24 lg:py-32 px-6 lg:px-12"
      style={{ background: theme.colors.backgroundAlt }}
    >
      <div className="max-w-7xl mx-auto w-full">
        
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left: Image (5 cols) met organische hoek */}
          <div className={`lg:col-span-5 ${getRevealClass('left')}`}>
            <div className="relative">
              <img 
                src={content.foto || images.hero}
                alt={beroepLabel}
                className="w-full h-[450px] lg:h-[550px] object-cover"
                style={{ borderRadius: '0 80px 0 0' }}
              />
              
              {/* Naam overlay onderaan */}
              <div className="absolute bottom-0 left-0 p-6">
                <p 
                  className="text-xl italic text-white drop-shadow-lg"
                  style={{ fontFamily: theme.fonts.heading }}
                >
                  {heroTitel}
                </p>
                <p className="text-sm text-white/80 drop-shadow-lg">{beroepLabel}</p>
              </div>
            </div>
          </div>
          
          {/* Right: Content (7 cols) */}
          <div className={`lg:col-span-7 lg:pl-8 ${getRevealClass('right')}`}>
            
            {/* Micro label */}
            <span 
              className="text-[9px] font-medium uppercase tracking-[2px] block mb-6"
              style={{ color: theme.colors.textMuted }}
            >
              {beroepLabel} · {werkgebied}
            </span>
            
            {/* Beschikbaar */}
            {beschikbaar && (
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-emerald-700">Beschikbaar voor opdrachten</span>
              </div>
            )}
            
            <h1 
              className="text-4xl md:text-5xl lg:text-[56px] font-normal leading-[1.1] mb-6"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {restSubtitel}<br/>
              met <em className="italic" style={{ color: palette.primary }}>{lastWord}</em>
            </h1>
            
            <div className="w-16 h-px mb-8" style={{ background: theme.colors.border }} />
            
            {heroIntro && (
              <p 
                className="text-base leading-relaxed mb-10 max-w-md"
                style={{ color: theme.colors.textMuted }}
              >
                {heroIntro}
              </p>
            )}
            
            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-6 mb-10">
              {jarenErvaring && (
                <div>
                  <span 
                    className="text-4xl block mb-1"
                    style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
                  >
                    {jarenErvaring}+
                  </span>
                  <span 
                    className="text-[9px] uppercase tracking-[1px]"
                    style={{ color: theme.colors.textMuted }}
                  >
                    Jaar ervaring
                  </span>
                </div>
              )}
              <div>
                <span 
                  className="text-4xl block mb-1"
                  style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
                >
                  100%
                </span>
                <span 
                  className="text-[9px] uppercase tracking-[1px]"
                  style={{ color: theme.colors.textMuted }}
                >
                  Inzet
                </span>
              </div>
              <div>
                <span 
                  className="text-4xl block mb-1"
                  style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
                >
                  24h
                </span>
                <span 
                  className="text-[9px] uppercase tracking-[1px]"
                  style={{ color: theme.colors.textMuted }}
                >
                  Reactietijd
                </span>
              </div>
            </div>
            
            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 px-6 py-3 text-[10px] uppercase tracking-[2px] text-white rounded"
                style={{ background: palette.primary }}
              >
                {ctaText}
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
              <a 
                href="#diensten" 
                className="inline-flex items-center gap-2 px-6 py-3 text-[10px] uppercase tracking-[2px] border rounded"
                style={{ borderColor: theme.colors.border, color: theme.colors.text }}
              >
                Bekijk diensten
              </a>
            </div>
            
            {/* Trust inline */}
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
// Primary achtergrond, white text, trust pills op image
// ============================================
function HeroSerene3({ 
  theme, 
  palette, 
  content, 
  heroTitel, 
  heroSubtitel,
  heroIntro,
  ctaText, 
  images, 
  beroepLabel,
  beschikbaar,
  werkgebied,
  hasBIG,
}: any) {
  // Bereken jaren ervaring
  const startjaar = content.werkervaring?.[0]?.startjaar;
  const jarenErvaring = startjaar 
    ? new Date().getFullYear() - startjaar 
    : null;

  // Split naam voor italic styling
  const naamParts = heroTitel.split(' ');
  const voorNaam = naamParts.slice(0, -1).join(' ');
  const laatsteNaam = naamParts[naamParts.length - 1];

  return (
    <section 
      className="min-h-screen flex items-center relative overflow-hidden"
      style={{ background: palette.primary }}
    >
      {/* Subtle radial gradient overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 70%)' }}
      />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 py-24 lg:py-32 w-full">
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Content */}
          <div className={getRevealClass('left')}>
            
            {/* Micro label */}
            <span className="text-[9px] font-medium uppercase tracking-[2px] mb-6 block text-white/50">
              {beroepLabel} · {werkgebied}
            </span>
            
            {/* Beschikbaar */}
            {beschikbaar && (
              <div className="flex items-center gap-2 mb-8">
                <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-emerald-300">Beschikbaar voor opdrachten</span>
              </div>
            )}
            
            <h1 
              className="text-5xl md:text-6xl lg:text-[68px] font-normal text-white leading-[1.05] mb-8"
              style={{ fontFamily: theme.fonts.heading }}
            >
              {voorNaam}<br/>
              {laatsteNaam && (
                <>
                  <span>{laatsteNaam.split(' ')[0]} </span>
                  <em 
                    className="italic"
                    style={{ color: palette.primaryLight || palette.accent || '#a8b5a8' }}
                  >
                    {laatsteNaam.split(' ').slice(1).join(' ') || laatsteNaam}
                  </em>
                </>
              )}
            </h1>
            
            <div className="w-16 h-px mb-8" style={{ background: 'rgba(255,255,255,0.2)' }} />
            
            {heroIntro && (
              <p className="text-base text-white/70 max-w-md leading-relaxed mb-10">
                {heroIntro}
              </p>
            )}
            
            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 px-6 py-3 text-[10px] uppercase tracking-[2px] bg-white rounded"
                style={{ color: palette.primary }}
              >
                {ctaText}
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
              <a 
                href="#diensten" 
                className="inline-flex items-center gap-2 px-6 py-3 text-[10px] uppercase tracking-[2px] border border-white/30 text-white rounded"
              >
                Bekijk diensten
              </a>
            </div>
            
            {/* Stats row */}
            <div 
              className="flex gap-10 pt-8 border-t"
              style={{ borderColor: 'rgba(255,255,255,0.1)' }}
            >
              {jarenErvaring && (
                <div>
                  <span 
                    className="text-4xl text-white block mb-1"
                    style={{ fontFamily: theme.fonts.heading }}
                  >
                    {jarenErvaring}+
                  </span>
                  <span className="text-[9px] uppercase tracking-[1px] text-white/50">Jaar ervaring</span>
                </div>
              )}
              <div>
                <span 
                  className="text-4xl text-white block mb-1"
                  style={{ fontFamily: theme.fonts.heading }}
                >
                  100%
                </span>
                <span className="text-[9px] uppercase tracking-[1px] text-white/50">Inzet</span>
              </div>
              <div>
                <span 
                  className="text-4xl text-white block mb-1"
                  style={{ fontFamily: theme.fonts.heading }}
                >
                  24h
                </span>
                <span className="text-[9px] uppercase tracking-[1px] text-white/50">Reactietijd</span>
              </div>
            </div>
            
          </div>
          
          {/* Right: Image */}
          <div className={`relative ${getRevealClass('right')}`}>
            <img 
              src={content.foto || images.hero}
              alt={beroepLabel}
              className="w-full h-[450px] lg:h-[550px] object-cover"
              style={{ borderRadius: '0 80px 0 0' }}
            />
            
            {/* Trust badges overlay */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-3">
              {hasBIG && (
                <span className="px-4 py-2 text-[10px] uppercase tracking-[1px] bg-white text-slate-700 rounded">
                  BIG Geregistreerd
                </span>
              )}
              <span className="px-4 py-2 text-[10px] uppercase tracking-[1px] bg-white text-slate-700 rounded">
                DBA-compliant
              </span>
              <span className="px-4 py-2 text-[10px] uppercase tracking-[1px] bg-white text-slate-700 rounded">
                VOG
              </span>
            </div>
          </div>
          
        </div>
        
      </div>
    </section>
  );
}
// ============================================
// SPLIT - Klassieke split layout
// ============================================
function HeroSplit({ theme, palette, content, heroTitel, heroSubtitel, ctaText, images, beroepLabel }: any) {
  return (
    <section 
      className="py-20 md:py-28 pt-28 md:pt-32 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text */}
          <div className={`flex-1 ${getRevealClass('left')}`}>
            <p 
              className="text-sm font-semibold uppercase tracking-wider mb-4"
              style={{ color: palette.primary }}
            >
              {beroepLabel}
            </p>
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {heroTitel}
            </h1>
            <p 
              className="text-lg md:text-xl mb-8 leading-relaxed"
              style={{ color: theme.colors.textMuted }}
            >
              {heroSubtitel}
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 text-white font-bold rounded-lg transition-all hover:opacity-90"
                style={{ backgroundColor: palette.primary }}
              >
                {ctaText}
                <span className="material-symbols-outlined">arrow_forward</span>
              </a>
              <a 
                href="#diensten"
                className="inline-flex items-center gap-2 px-8 py-4 font-bold rounded-lg border-2 transition-all hover:bg-black/5"
                style={{ borderColor: palette.primaryLight, color: palette.primary }}
              >
                Bekijk diensten
              </a>
            </div>
          </div>
          
          {/* Image */}
          <div className={`flex-1 ${getRevealClass('right')}`}>
            <div className="relative">
              <div 
                className="absolute -inset-4 rounded-2xl -rotate-2"
                style={{ backgroundColor: palette.primaryLight }}
              />
              <div 
                className="relative w-full aspect-[4/5] bg-cover bg-center rounded-2xl shadow-2xl"
                style={{ backgroundImage: `url("${content.foto || images.hero}")` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// CENTERED - Alles gecentreerd
// ============================================
function HeroCentered({ theme, palette, content, heroTitel, heroSubtitel, ctaText, images, beroepLabel }: any) {
  return (
    <section 
      className="min-h-[90vh] flex items-center justify-center px-6 pt-20"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="text-center max-w-3xl mx-auto">
        {/* Avatar */}
        <div className={`w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden shadow-lg ${getRevealClass('up')}`}>
          <img 
            src={content.foto || images.sfeer} 
            alt={content.naam} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <p 
          className={`text-xs uppercase tracking-[0.3em] mb-6 ${getRevealClass('up', 1)}`}
          style={{ color: palette.primary }}
        >
          {beroepLabel}
        </p>
        
        <h1 
          className={`text-4xl md:text-6xl font-bold leading-tight mb-6 ${getRevealClass('up', 2)}`}
          style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
        >
          {heroTitel}
        </h1>
        
        <p 
          className={`text-xl mb-10 leading-relaxed ${getRevealClass('up', 3)}`}
          style={{ color: theme.colors.textMuted }}
        >
          {heroSubtitel}
        </p>
        
        <a 
          href="#contact"
          className={`inline-flex items-center gap-2 px-10 py-4 text-white font-bold rounded-lg transition-all hover:opacity-90 ${getRevealClass('up', 3)}`}
          style={{ backgroundColor: palette.primary }}
        >
          {ctaText}
          <span className="material-symbols-outlined">arrow_forward</span>
        </a>
      </div>
    </section>
  );
}

// ============================================
// FULLWIDTH - Grote achtergrond foto
// ============================================
function HeroFullwidth({ theme, palette, content, heroTitel, heroSubtitel, ctaText, images, beroepLabel }: any) {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url("${content.foto || images.hero}")` }}
      />
      <div 
        className="absolute inset-0"
        style={{ 
          background: theme.isDark 
            ? 'linear-gradient(90deg, rgba(23,25,27,0.95) 0%, rgba(23,25,27,0.7) 50%, rgba(23,25,27,0.3) 100%)'
            : 'linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.3) 100%)'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 px-6 md:px-12 w-full pt-20">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <p 
              className={`text-sm font-bold uppercase tracking-wider mb-4 ${getRevealClass('left')}`}
              style={{ color: palette.primary }}
            >
              {beroepLabel}
            </p>
            
            <h1 
              className={`text-5xl md:text-7xl font-black leading-[1.1] mb-6 ${getRevealClass('left', 1)}`}
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {heroTitel}
            </h1>
            
            <p 
              className={`text-xl mb-10 leading-relaxed ${getRevealClass('left', 2)}`}
              style={{ color: theme.colors.textMuted }}
            >
              {heroSubtitel}
            </p>
            
            <a 
              href="#contact"
              className={`inline-flex items-center gap-2 px-8 py-4 text-white font-bold rounded-full transition-all hover:opacity-90 ${getRevealClass('up', 3)}`}
              style={{ backgroundColor: palette.primary }}
            >
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
// MINIMAL - Super clean, veel whitespace
// ============================================
function HeroMinimal({ theme, palette, content, heroTitel, heroSubtitel, ctaText, beroepLabel }: any) {
  return (
    <section 
      className="min-h-[80vh] flex items-center justify-center px-6 pt-20"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="text-center max-w-2xl mx-auto">
        <p 
          className={`text-[10px] uppercase tracking-[0.4em] mb-8 ${getRevealClass('up')}`}
          style={{ color: theme.colors.textMuted }}
        >
          {beroepLabel}
        </p>
        
        <h1 
          className={`text-3xl md:text-5xl font-light leading-relaxed mb-8 ${getRevealClass('up', 1)}`}
          style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
        >
          {heroTitel}
        </h1>
        
        <div 
          className="w-12 h-px mx-auto mb-8"
          style={{ backgroundColor: palette.primary }}
        />
        
        <p 
          className={`text-lg mb-12 ${getRevealClass('up', 2)}`}
          style={{ color: theme.colors.textMuted }}
        >
          {heroSubtitel}
        </p>
        
        <a 
          href="#contact"
          className={`inline-block px-8 py-3 text-sm uppercase tracking-widest text-white ${getRevealClass('up', 3)}`}
          style={{ backgroundColor: palette.primary }}
        >
          {ctaText}
        </a>
      </div>
    </section>
  );
}

export default HeroSection;
