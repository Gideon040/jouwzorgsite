// components/templates/sections/HeroSection.tsx
// Hero section met meerdere style varianten

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
  
  switch (style) {
    case 'editorial':
      return (
        <HeroEditorial 
          {...{ theme, palette, content, heroTitel, heroSubtitel, heroIntro, ctaText, images, beroepLabel, beschikbaar, werkgebied, hasBIG }} 
        />
      );
    case 'proactief':
      return (
        <HeroProactief 
          {...{ theme, palette, content, heroTitel, heroSubtitel, heroIntro, ctaText, images, beroepLabel }} 
        />
      );
    case 'portfolio':
      return (
        <HeroPortfolio 
          {...{ theme, palette, content, heroTitel, heroSubtitel, heroIntro, ctaText, images, beroepLabel, beschikbaar }} 
        />
      );
    case 'mindoor':
      return (
        <HeroMindoor 
          {...{ theme, palette, content, heroTitel, heroSubtitel, heroIntro, ctaText, images, beroepLabel, hasBIG }} 
        />
      );
    case 'split':
      return (
        <HeroSplit 
          {...{ theme, palette, content, heroTitel, heroSubtitel, ctaText, images, beroepLabel }} 
        />
      );
    case 'centered':
      return (
        <HeroCentered 
          {...{ theme, palette, content, heroTitel, heroSubtitel, ctaText, images, beroepLabel }} 
        />
      );
    case 'fullwidth':
      return (
        <HeroFullwidth 
          {...{ theme, palette, content, heroTitel, heroSubtitel, ctaText, images, beroepLabel }} 
        />
      );
    case 'minimal':
      return (
        <HeroMinimal 
          {...{ theme, palette, content, heroTitel, heroSubtitel, ctaText, beroepLabel }} 
        />
      );
    default:
      return (
        <HeroEditorial 
          {...{ theme, palette, content, heroTitel, heroSubtitel, heroIntro, ctaText, images, beroepLabel, beschikbaar, werkgebied, hasBIG }} 
        />
      );
  }
}

// ============================================
// EDITORIAL - Origineel uit HTML template
// Small-caps label, italic serif naam, badges
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
    <section className="px-6 md:px-16 lg:px-32 py-16 lg:py-24 pt-28 lg:pt-32">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-6xl mx-auto">
        
        {/* Left Side - Content */}
        <div className={`flex flex-col flex-1 gap-8 ${getRevealClass('left')}`}>
          <div className="flex flex-col gap-5">
            
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
            <h2 
              className="text-xl"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.textMuted }}
            >
              {heroSubtitel}
            </h2>
            
            {/* Intro tekst */}
            {heroIntro && (
              <p 
                className="text-base leading-relaxed max-w-lg"
                style={{ color: theme.colors.textMuted }}
              >
                {heroIntro}
              </p>
            )}
          </div>
          
          {/* Badges */}
          <div className="flex flex-wrap gap-3">
            
            {/* BIG Badge */}
            {hasBIG && (
              <span 
                className="inline-flex items-center gap-2 px-4 py-2 rounded text-sm"
                style={{ 
                  backgroundColor: `${palette.primary}08`,
                  border: `1px solid ${palette.primary}20`,
                  color: theme.colors.text
                }}
              >
                <span className="material-symbols-outlined text-base" style={{ color: palette.primary }}>
                  verified
                </span>
                BIG Geregistreerd
              </span>
            )}
            
            {/* Regio Badge */}
            <span 
              className="inline-flex items-center gap-2 px-4 py-2 rounded text-sm"
              style={{ 
                backgroundColor: `${palette.primary}08`,
                border: `1px solid ${palette.primary}20`,
                color: theme.colors.text
              }}
            >
              <span className="material-symbols-outlined text-base" style={{ color: palette.primary }}>
                location_on
              </span>
              {werkgebied}
            </span>
            
            {/* Beschikbaar Badge (met pulsing dot) */}
            {beschikbaar && (
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded text-sm text-emerald-700">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                Beschikbaar voor opdrachten
              </span>
            )}
          </div>
          
          {/* Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <a 
              href="#contact" 
              className="flex min-w-[160px] cursor-pointer items-center justify-center rounded h-12 px-6 text-white text-sm font-semibold uppercase tracking-widest transition-colors"
              style={{ backgroundColor: palette.primary }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = palette.primaryHover}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = palette.primary}
            >
              {ctaText}
            </a>
            <a 
              href="#over" 
              className="flex min-w-[160px] cursor-pointer items-center justify-center rounded h-12 px-6 border text-sm font-semibold uppercase tracking-widest transition-colors"
              style={{ 
                borderColor: theme.colors.border,
                color: theme.colors.textMuted 
              }}
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
            className="aspect-[4/5] w-full bg-center bg-no-repeat bg-cover rounded-lg"
            style={{ backgroundImage: `url('${content.foto || images.hero}')` }}
          />
        </div>
        
      </div>
    </section>
  );
}

// ============================================
// PROACTIEF - Modern met gradient, wave SVG, blob image
// ============================================
function HeroProactief({ theme, palette, content, heroTitel, heroSubtitel, heroIntro, ctaText, images, beroepLabel }: any) {
  return (
    <section 
      className="pt-40 pb-28 px-6 md:px-12 min-h-[580px] relative overflow-hidden flex items-center"
      style={{ 
        background: `linear-gradient(135deg, ${palette.primary} 0%, ${palette.primaryDark || palette.primary} 100%)`
      }}
    >
      {/* Wave SVG at bottom */}
      <svg 
        className="absolute bottom-0 left-0 w-full h-20 z-10"
        viewBox="0 0 1440 80" 
        fill="none" 
        preserveAspectRatio="none"
      >
        <path 
          d="M0 80V50C120 70 240 80 360 75C480 70 600 50 720 40C840 30 960 30 1080 35C1200 40 1320 50 1380 55L1440 60V80H0Z" 
          fill={theme.colors.background}
        />
      </svg>
      
      <div className="max-w-6xl mx-auto w-full relative z-5">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className={getRevealClass('right')}>
            <h1 
              className="text-4xl md:text-5xl font-bold mb-5 leading-tight"
              style={{ 
                fontFamily: theme.fonts.heading,
                color: palette.primaryDarker || '#004466'
              }}
            >
              {heroTitel}
            </h1>
            <p 
              className="text-base mb-8 leading-relaxed max-w-md"
              style={{ color: 'rgba(255, 255, 255, 0.95)' }}
            >
              {heroIntro || heroSubtitel}
            </p>
            
            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <a 
                href="#contact" 
                className="px-7 py-3 text-sm font-semibold rounded-full transition-all hover:-translate-y-0.5 hover:shadow-lg"
                style={{ 
                  background: `linear-gradient(135deg, ${palette.accent || '#ff6b35'}, ${palette.accentLight || '#f7931e'})`,
                  color: 'white'
                }}
              >
                {ctaText}
              </a>
              <a 
                href="#diensten" 
                className="px-7 py-3 text-sm font-semibold rounded-full border-2 border-white text-white transition-all hover:bg-white/10"
              >
                Meer informatie
              </a>
            </div>
          </div>
          
          {/* Blob Image */}
          <div className={`flex justify-center ${getRevealClass('left', 200)}`}>
            <div className="relative w-[380px] h-[300px]">
              {/* Border blob */}
              <div 
                className="absolute -inset-3 rounded-[50%_50%_50%_50%/55%_55%_45%_45%] border-[3px] border-white/25"
              />
              {/* Image blob */}
              <img 
                src={content.foto || images.hero}
                alt={beroepLabel}
                className="w-full h-full object-cover rounded-[50%_50%_50%_50%/55%_55%_45%_45%] shadow-[0_15px_40px_rgba(0,0,0,0.2)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// PORTFOLIO - Gradient bg, stats, profile badge, decorative circles
// ============================================
function HeroPortfolio({ theme, palette, content, heroTitel, heroSubtitel, heroIntro, ctaText, images, beroepLabel, beschikbaar }: any) {
  const jarenErvaring = content.werkervaring?.[0]?.startjaar 
    ? new Date().getFullYear() - content.werkervaring[0].startjaar 
    : 10;
  
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
      <div 
        className="absolute -bottom-[300px] -left-[200px] w-[800px] h-[800px] rounded-full bg-white/[0.03]"
      />
      
      <div className="max-w-[1300px] mx-auto px-8 md:px-12 pt-36 pb-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          
          {/* Text Content */}
          <div className={getRevealClass('right')}>
            {/* Badge */}
            {beschikbaar && (
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{ backgroundColor: `${palette.accent || palette.primary}30` }}
              >
                <span 
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: palette.accent || palette.primary }}
                />
                <span 
                  className="text-[13px] font-semibold"
                  style={{ color: palette.accentLight || '#9ccc65' }}
                >
                  Beschikbaar voor opdrachten
                </span>
              </div>
            )}
            
            <h1 
              className="text-4xl md:text-[54px] font-semibold text-white leading-[1.15] mb-4"
              style={{ fontFamily: theme.fonts.heading }}
            >
              {heroTitel}
            </h1>
            
            <p 
              className="text-xl md:text-[22px] font-medium mb-6"
              style={{ color: palette.accentLight || '#9ccc65' }}
            >
              {heroSubtitel}
            </p>
            
            <p className="text-[17px] text-white/85 leading-[1.8] mb-9 max-w-[500px]">
              {heroIntro}
            </p>
            
            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <a 
                href="#contact" 
                className="px-8 py-3.5 bg-white font-semibold text-sm rounded-full transition-all hover:-translate-y-0.5 hover:shadow-lg"
                style={{ color: palette.primary }}
              >
                {ctaText}
              </a>
              <a 
                href="#over" 
                className="px-8 py-3.5 border-2 border-white/50 text-white font-semibold text-sm rounded-full transition-all hover:bg-white hover:text-[var(--primary)]"
                style={{ ['--primary' as string]: palette.primary }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = palette.primary;
                  e.currentTarget.style.borderColor = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
                }}
              >
                Meer over mij
              </a>
            </div>
            
            {/* Stats */}
            <div className="flex gap-12">
              <div>
                <p 
                  className="text-[42px] font-semibold text-white leading-none"
                  style={{ fontFamily: theme.fonts.heading }}
                >
                  {jarenErvaring}+
                </p>
                <p className="text-sm text-white/70 mt-1">Jaar ervaring</p>
              </div>
              <div>
                <p 
                  className="text-[42px] font-semibold text-white leading-none"
                  style={{ fontFamily: theme.fonts.heading }}
                >
                  100%
                </p>
                <p className="text-sm text-white/70 mt-1">Inzet</p>
              </div>
            </div>
          </div>
          
          {/* Profile Image */}
          <div className={`flex justify-center ${getRevealClass('left', 200)}`}>
            <div className="relative">
              <img 
                src={content.foto || images.hero}
                alt={beroepLabel}
                className="w-[420px] h-[520px] object-cover rounded-[200px_200px_30px_30px] shadow-[0_30px_60px_rgba(0,0,0,0.3)]"
              />
              
              {/* Floating Badge */}
              <div className="absolute bottom-10 -left-10 bg-white p-5 px-6 rounded-[20px] shadow-[0_15px_40px_rgba(0,0,0,0.15)]">
                <p className="text-xs text-gray-400 mb-1">Geregistreerd sinds</p>
                <p 
                  className="text-xl font-semibold"
                  style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
                >
                  {content.werkervaring?.[0]?.startjaar || 2015}
                </p>
                <div 
                  className="absolute -top-4 -right-4 w-11 h-11 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: palette.accent || palette.primary }}
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
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
// MINDOOR - Warm gradient bg, decorative circles, social proof card
// ============================================
function HeroMindoor({ theme, palette, content, heroTitel, heroSubtitel, heroIntro, ctaText, images, beroepLabel, hasBIG }: any) {
  // Split title for gradient accent word
  const titleWords = heroTitel.split(' ');
  const accentWord = titleWords.length > 2 ? titleWords[Math.floor(titleWords.length / 2)] : titleWords[titleWords.length - 1];
  
  return (
    <section className="relative min-h-screen pt-20 lg:pt-0 flex items-center overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: `linear-gradient(to bottom right, ${theme.colors.backgroundAlt}, ${theme.colors.background}, ${palette.primary}08)`
        }}
      />
      
      {/* Decorative circles */}
      <div 
        className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-15"
        style={{ backgroundColor: palette.primary }}
      />
      <div 
        className="absolute bottom-20 -left-20 w-64 h-64 rounded-full opacity-15"
        style={{ backgroundColor: palette.accent || '#d4b89b' }}
      />
      <div 
        className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full opacity-10 animate-pulse"
        style={{ backgroundColor: palette.accent || '#e07b5f' }}
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Content */}
          <div className={`order-2 lg:order-1 ${getRevealClass('right')}`}>
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl leading-tight"
              style={{ fontFamily: theme.fonts.heading }}
            >
              {titleWords.slice(0, Math.floor(titleWords.length / 2)).join(' ')}<br/>
              <span 
                className="italic"
                style={{ 
                  background: `linear-gradient(135deg, ${palette.accent || '#d4644a'}, ${palette.accentLight || '#e07b5f'})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {titleWords.slice(Math.floor(titleWords.length / 2)).join(' ')}
              </span>
            </h1>
            
            <p 
              className="mt-6 text-lg max-w-lg"
              style={{ color: theme.colors.textMuted }}
            >
              {heroIntro}
            </p>
            
            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium shadow-lg transition-all hover:-translate-y-0.5 relative overflow-hidden group"
                style={{ 
                  backgroundColor: palette.primary,
                  color: 'white',
                  boxShadow: `0 10px 25px ${palette.primary}40`
                }}
              >
                {ctaText}
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              </a>
              <a 
                href="#diensten" 
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium border-2 transition-colors hover:bg-gray-50"
                style={{ 
                  backgroundColor: 'white',
                  color: theme.colors.textMuted,
                  borderColor: theme.colors.border
                }}
              >
                Bekijk diensten
              </a>
            </div>
            
            {/* Social Proof Card */}
            <div 
              className={`mt-10 bg-white rounded-2xl p-5 shadow-lg max-w-md ${getRevealClass('up', 300)}`}
            >
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80" alt="Client" className="w-11 h-11 rounded-full border-2 border-white object-cover" />
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Client" className="w-11 h-11 rounded-full border-2 border-white object-cover" />
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Client" className="w-11 h-11 rounded-full border-2 border-white object-cover" />
                </div>
                <div className="flex text-lg" style={{ color: palette.accent || '#d4644a' }}>★★★★★</div>
              </div>
              <p className="mt-3 text-sm" style={{ color: theme.colors.textMuted }}>
                Meer dan <strong style={{ color: theme.colors.text }}>50 cliënten</strong> vertrouwen op mijn persoonlijke aanpak.
              </p>
            </div>
          </div>
          
          {/* Image */}
          <div className={`order-1 lg:order-2 relative ${getRevealClass('left', 200)}`}>
            <div className="relative">
              {/* Background shape */}
              <div 
                className="absolute inset-0 rounded-[3rem] transform rotate-3"
                style={{ 
                  background: `linear-gradient(to bottom right, ${theme.colors.border}, ${palette.primary}15)`
                }}
              />
              {/* Main image */}
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
                <img 
                  src={content.foto || images.hero}
                  alt={beroepLabel}
                  className="w-full aspect-[4/5] object-cover"
                />
              </div>
              {/* Floating BIG badge */}
              {hasBIG && (
                <div className="absolute -bottom-4 -left-4 lg:-left-8 bg-white rounded-2xl p-4 shadow-xl animate-pulse">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${palette.primary}15` }}
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
