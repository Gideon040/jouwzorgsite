// components/templates/sections/CtaSection.tsx
// Call to Action section

'use client';

import { BaseSectionProps, CtaStyle, getRevealClass } from './types';

interface CtaSectionProps extends BaseSectionProps {
  style?: CtaStyle;
}

export function CtaSection({ 
  style = 'editorial', 
  theme, 
  palette, 
  content, 
  generated 
}: CtaSectionProps) {
  // Edge function genereert: { titel, tekst, button }
  const ctaContent = generated?.cta;
  const titel = ctaContent?.titel || 'Op zoek naar versterking?';
  const subtitel = ctaContent?.tekst || 'Neem contact op om de mogelijkheden te bespreken.';
  const buttonText = ctaContent?.button || 'Neem contact op';
  const telefoon = content.contact?.telefoon;
  const email = content.contact?.email;
  
  switch (style) {
    case 'editorial':
      return <CtaEditorial {...{ theme, palette, titel, subtitel, buttonText, telefoon }} />;
    case 'proactief':
      return <CtaProactief {...{ theme, palette, titel, subtitel, buttonText, telefoon }} />;
    case 'portfolio':
      return <CtaPortfolio {...{ theme, palette, titel, subtitel, buttonText, telefoon }} />;
    case 'mindoor':
      return <CtaMindoor {...{ theme, palette, titel, subtitel, buttonText, telefoon, email }} />;
    case 'banner':
      return <CtaBanner {...{ theme, palette, titel, subtitel, buttonText, telefoon }} />;
    case 'card':
      return <CtaCard {...{ theme, palette, titel, subtitel, buttonText }} />;
    case 'minimal':
      return <CtaMinimal {...{ theme, palette, titel, subtitel, buttonText }} />;
    default:
      return <CtaEditorial {...{ theme, palette, titel, subtitel, buttonText, telefoon }} />;
  }
}

// ============================================
// EDITORIAL - Origineel uit HTML template
// Full-width primary achtergrond, centered, twee buttons
// ============================================
function CtaEditorial({ theme, palette, titel, subtitel, buttonText, telefoon }: any) {
  return (
    <section 
      id="cta"
      className="px-6 md:px-16 lg:px-32 py-16"
      style={{ backgroundColor: palette.primary }}
    >
      <div className={`max-w-3xl mx-auto text-center text-white ${getRevealClass('up')}`}>
        
        {/* Titel */}
        <h2 
          className="text-3xl md:text-4xl mb-4"
          style={{ fontFamily: theme.fonts.heading }}
        >
          {titel}
        </h2>
        
        {/* Subtitel */}
        <p className="text-white/80 mb-8 max-w-xl mx-auto">
          {subtitel}
        </p>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="#contact" 
            className="px-8 py-3 bg-white font-semibold text-sm uppercase tracking-widest hover:bg-gray-100 transition-colors rounded"
            style={{ color: palette.primary }}
          >
            {buttonText}
          </a>
          {telefoon && (
            <a 
              href={`tel:${telefoon}`} 
              className="px-8 py-3 border-2 border-white text-white font-semibold text-sm uppercase tracking-widest hover:bg-white/10 transition-colors rounded"
            >
              Bel direct
            </a>
          )}
        </div>
        
      </div>
    </section>
  );
}

// ============================================
// PROACTIEF - Gradient achtergrond met decoratieve cirkels
// ============================================
function CtaProactief({ theme, palette, titel, subtitel, buttonText, telefoon }: any) {
  return (
    <section 
      id="cta"
      className="py-24 px-6 md:px-12 relative overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, ${palette.primary} 0%, ${palette.primaryDark || palette.primary} 100%)`
      }}
    >
      {/* Decorative circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5" />
      <div className="absolute -bottom-36 -left-24 w-80 h-80 rounded-full bg-white/[0.03]" />
      
      <div className={`max-w-3xl mx-auto text-center relative z-10 ${getRevealClass('up')}`}>
        <h2 
          className="text-4xl md:text-5xl font-bold text-white mb-5"
          style={{ fontFamily: theme.fonts.heading }}
        >
          {titel}
        </h2>
        <p className="text-white/90 text-lg leading-relaxed mb-9 max-w-2xl mx-auto">
          {subtitel}
        </p>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <a 
            href="#contact" 
            className="px-8 py-4 bg-white font-semibold rounded-full transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(255,255,255,0.3)]"
            style={{ color: palette.primary }}
          >
            {buttonText}
          </a>
          {telefoon && (
            <a 
              href={`tel:${telefoon}`} 
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full transition-all hover:bg-white/10"
            >
              Bel ons direct
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

// ============================================
// PORTFOLIO - Gradient met decoratieve cirkels, italic em
// ============================================
function CtaPortfolio({ theme, palette, titel, subtitel, buttonText, telefoon }: any) {
  return (
    <section 
      id="cta"
      className="py-28 px-8 md:px-12 relative overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, ${palette.primary} 0%, ${palette.primaryLight || palette.primary} 100%)`
      }}
    >
      {/* Decorative circles */}
      <div className="absolute -top-[150px] -right-[150px] w-[500px] h-[500px] rounded-full bg-white/5" />
      <div className="absolute -bottom-[200px] -left-[150px] w-[600px] h-[600px] rounded-full bg-white/[0.03]" />
      
      <div className={`max-w-[800px] mx-auto text-center relative z-10 ${getRevealClass('up')}`}>
        <h2 
          className="text-4xl md:text-[48px] font-semibold text-white leading-[1.2] mb-5"
          style={{ fontFamily: theme.fonts.heading }}
        >
          Interesse in een <em className="italic" style={{ color: palette.accentLight || '#9ccc65' }}>samenwerking</em>?
        </h2>
        <p className="text-lg text-white/85 leading-[1.7] mb-10 max-w-2xl mx-auto">
          {subtitel}
        </p>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white font-semibold text-sm rounded-full transition-all hover:-translate-y-0.5 hover:shadow-lg"
            style={{ color: palette.primary }}
          >
            <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            E-mail versturen
          </a>
          {telefoon && (
            <a 
              href={`tel:${telefoon}`} 
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-white/50 text-white font-semibold text-sm rounded-full transition-all hover:bg-white hover:text-[var(--primary)]"
              style={{ ['--primary' as string]: palette.primary }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = palette.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'white';
              }}
            >
              <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              Bel direct
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

// ============================================
// MINDOOR - Warm gradient, floating avatars, concentric circles
// ============================================
function CtaMindoor({ theme, palette, titel, subtitel, buttonText, telefoon, email }: any) {
  return (
    <section 
      id="cta"
      className="py-20 lg:py-32"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="relative rounded-[3rem] overflow-hidden py-16 lg:py-24 px-8 lg:px-16"
          style={{ 
            background: `linear-gradient(to bottom right, ${palette.accent || '#d4b89b'}, ${palette.accentLight || '#c9a888'})`
          }}
        >
          {/* Floating avatars decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-8 left-[15%] w-14 h-14 rounded-full border-4 border-white/20 overflow-hidden animate-pulse">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-12 right-[20%] w-12 h-12 rounded-full border-4 border-white/20 overflow-hidden animate-pulse" style={{ animationDelay: '1s' }}>
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-16 left-[10%] w-10 h-10 rounded-full border-4 border-white/20 overflow-hidden animate-pulse" style={{ animationDelay: '2s' }}>
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-20 right-[15%] w-14 h-14 rounded-full border-4 border-white/20 overflow-hidden animate-pulse" style={{ animationDelay: '0.5s' }}>
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80" alt="" className="w-full h-full object-cover" />
            </div>
            {/* Concentric circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/10 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/10 rounded-full" />
          </div>
          
          {/* Content */}
          <div className={`relative text-center max-w-2xl mx-auto ${getRevealClass('up')}`}>
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl text-white/90"
              style={{ fontFamily: theme.fonts.heading }}
            >
              Start Met<br/>
              <span className="italic text-white">Persoonlijke Zorg</span>
            </h2>
            <p className="mt-6 text-lg" style={{ color: `${palette.primaryLight || 'rgba(255,255,255,0.85)'}` }}>
              {subtitel}
            </p>
            
            {/* Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              {telefoon && (
                <a 
                  href={`tel:${telefoon}`}
                  className="inline-flex items-center justify-center gap-2 bg-white px-8 py-4 rounded-full font-medium shadow-lg transition-colors hover:bg-gray-50"
                  style={{ color: palette.accent || '#8c6d58' }}
                >
                  <span className="material-symbols-outlined">call</span>
                  Bel {telefoon}
                </a>
              )}
              {email && (
                <a 
                  href={`mailto:${email}`}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-full font-medium border border-white/20 transition-colors hover:bg-white/20"
                >
                  <span className="material-symbols-outlined">mail</span>
                  Stuur een email
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// BANNER - Alternatieve banner stijl
// ============================================
function CtaBanner({ theme, palette, titel, subtitel, buttonText, telefoon }: any) {
  return (
    <section 
      id="cta"
      className="py-20 px-6 md:px-12"
      style={{ 
        background: `linear-gradient(135deg, ${palette.primary} 0%, ${palette.primaryDark} 100%)`
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className={`flex flex-col md:flex-row items-center justify-between gap-8 ${getRevealClass('up')}`}>
          {/* Text */}
          <div className="text-center md:text-left text-white">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{ fontFamily: theme.fonts.heading }}
            >
              {titel}
            </h2>
            <p className="text-white/80 max-w-md">
              {subtitel}
            </p>
          </div>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a 
              href="#contact" 
              className="px-8 py-4 bg-white font-bold rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              style={{ color: palette.primary }}
            >
              {buttonText}
              <span className="material-symbols-outlined">arrow_forward</span>
            </a>
            {telefoon && (
              <a 
                href={`tel:${telefoon}`} 
                className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">call</span>
                Bel nu
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// CARD - Centered card stijl
// ============================================
function CtaCard({ theme, palette, titel, subtitel, buttonText }: any) {
  return (
    <section 
      id="cta"
      className="py-20 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-2xl mx-auto">
        <div 
          className={`p-10 md:p-14 rounded-2xl text-center shadow-xl ${getRevealClass('up')}`}
          style={{ backgroundColor: palette.primary }}
        >
          <h2 
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: theme.fonts.heading }}
          >
            {titel}
          </h2>
          <p className="text-white/80 mb-8">
            {subtitel}
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center gap-2 px-10 py-4 bg-white font-bold rounded-lg hover:bg-gray-100 transition-colors"
            style={{ color: palette.primary }}
          >
            {buttonText}
            <span className="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================
// MINIMAL - Simpele tekst met link
// ============================================
function CtaMinimal({ theme, palette, titel, subtitel, buttonText }: any) {
  return (
    <section 
      id="cta"
      className="py-16 px-6 border-y"
      style={{ borderColor: theme.colors.border }}
    >
      <div className={`max-w-3xl mx-auto text-center ${getRevealClass('up')}`}>
        <h2 
          className="text-2xl md:text-3xl font-light mb-4"
          style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
        >
          {titel}
        </h2>
        <p 
          className="mb-6"
          style={{ color: theme.colors.textMuted }}
        >
          {subtitel}
        </p>
        <a 
          href="#contact" 
          className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-semibold hover:underline underline-offset-4"
          style={{ color: palette.primary }}
        >
          {buttonText}
          <span className="material-symbols-outlined text-lg">arrow_forward</span>
        </a>
      </div>
    </section>
  );
}

export default CtaSection;
