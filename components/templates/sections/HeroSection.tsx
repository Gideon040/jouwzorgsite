// components/templates/sections/HeroSection.tsx
// Hero section met 4 style varianten: split, centered, fullwidth, minimal

'use client';

import { BaseSectionProps, HeroStyle, getBeroepImages, getRevealClass } from './types';

interface HeroSectionProps extends BaseSectionProps {
  style: HeroStyle;
}

export function HeroSection({ style, theme, palette, content, generated, beroepLabel }: HeroSectionProps) {
  const images = getBeroepImages(content.naam || '');
  const heroTitel = generated?.hero?.titel || `Zorg met Aandacht`;
  const heroSubtitel = generated?.hero?.subtitel || content.tagline || 'Professionele zorg';
  const ctaText = generated?.contact?.cta || 'Neem contact op';
  
  // Render based on style
  switch (style) {
    case 'split':
      return <HeroSplit {...{ theme, palette, content, heroTitel, heroSubtitel, ctaText, images, beroepLabel }} />;
    case 'centered':
      return <HeroCentered {...{ theme, palette, content, heroTitel, heroSubtitel, ctaText, images, beroepLabel }} />;
    case 'fullwidth':
      return <HeroFullwidth {...{ theme, palette, content, heroTitel, heroSubtitel, ctaText, images, beroepLabel }} />;
    case 'minimal':
      return <HeroMinimal {...{ theme, palette, content, heroTitel, heroSubtitel, ctaText, images, beroepLabel }} />;
    default:
      return <HeroSplit {...{ theme, palette, content, heroTitel, heroSubtitel, ctaText, images, beroepLabel }} />;
  }
}

// ============================================
// SPLIT - Foto links/rechts, tekst andere kant
// ============================================
function HeroSplit({ theme, palette, content, heroTitel, heroSubtitel, ctaText, images, beroepLabel }: any) {
  return (
    <section 
      className={`${theme.spacing.section} px-6 md:px-12`}
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className={`${theme.spacing.container} mx-auto`}>
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
                className={`inline-flex items-center gap-2 px-8 py-4 text-white font-bold ${theme.radius.medium} transition-all hover:opacity-90`}
                style={{ backgroundColor: palette.primary }}
              >
                {ctaText}
                <span className="material-symbols-outlined">arrow_forward</span>
              </a>
              <a 
                href="#diensten"
                className={`inline-flex items-center gap-2 px-8 py-4 font-bold ${theme.radius.medium} border-2 transition-all hover:bg-black/5`}
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
                className={`absolute -inset-4 ${theme.radius.large} -rotate-2`}
                style={{ backgroundColor: palette.primaryLight }}
              />
              <div 
                className={`relative w-full aspect-[4/5] bg-cover bg-center ${theme.radius.large} ${theme.shadows.large}`}
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
      className="min-h-[90vh] flex items-center justify-center px-6"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="text-center max-w-3xl mx-auto">
        {/* Avatar */}
        <div className={`w-32 h-32 mx-auto mb-8 ${theme.radius.full} overflow-hidden ${theme.shadows.medium} ${getRevealClass('up')}`}>
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
          className={`inline-flex items-center gap-2 px-10 py-4 text-white font-bold ${theme.radius.medium} transition-all hover:opacity-90 ${getRevealClass('up', 3)}`}
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
  const isDark = theme.isDark;
  
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
          background: isDark 
            ? 'linear-gradient(90deg, rgba(23,25,27,0.95) 0%, rgba(23,25,27,0.7) 50%, rgba(23,25,27,0.3) 100%)'
            : 'linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.3) 100%)'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 px-6 md:px-12 w-full">
        <div className={`${theme.spacing.container} mx-auto`}>
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
              className={`inline-flex items-center gap-2 px-8 py-4 text-white font-bold ${theme.radius.full} transition-all hover:opacity-90 ${getRevealClass('up', 3)}`}
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
      className="min-h-[80vh] flex items-center justify-center px-6"
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
