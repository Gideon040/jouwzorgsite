// components/templates/sections/CtaSection.tsx
// CTA section met 3 style varianten: banner, card, minimal

'use client';

import { BaseSectionProps, CtaStyle, getRevealClass } from './types';

interface CtaSectionProps extends BaseSectionProps {
  style: CtaStyle;
}

export function CtaSection({ style, theme, palette, content, generated }: CtaSectionProps) {
  const ctaTitel = generated?.cta?.titel || 'Klaar om te starten?';
  const ctaTekst = generated?.cta?.tekst || generated?.contact?.intro || 'Neem vandaag nog contact op voor een vrijblijvend gesprek.';
  const ctaButton = generated?.contact?.cta || 'Neem contact op';
  
  switch (style) {
    case 'banner':
      return <CtaBanner {...{ theme, palette, ctaTitel, ctaTekst, ctaButton }} />;
    case 'card':
      return <CtaCard {...{ theme, palette, ctaTitel, ctaTekst, ctaButton }} />;
    case 'minimal':
      return <CtaMinimal {...{ theme, palette, ctaTitel, ctaTekst, ctaButton }} />;
    default:
      return <CtaBanner {...{ theme, palette, ctaTitel, ctaTekst, ctaButton }} />;
  }
}

// ============================================
// BANNER - Brede banner met achtergrondkleur
// ============================================
function CtaBanner({ theme, palette, ctaTitel, ctaTekst, ctaButton }: any) {
  return (
    <section 
      className="py-16 md:py-24 px-6"
      style={{ backgroundColor: palette.primary }}
    >
      <div className={`${theme.spacing.container} mx-auto text-center ${getRevealClass('up')}`}>
        <h2 
          className="text-3xl md:text-4xl font-bold text-white mb-4"
          style={{ fontFamily: theme.fonts.heading }}
        >
          {ctaTitel}
        </h2>
        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
          {ctaTekst}
        </p>
        <a 
          href="#contact"
          className={`inline-flex items-center gap-2 px-8 py-4 bg-white font-bold ${theme.radius.medium} transition-all hover:bg-white/90`}
          style={{ color: palette.primary }}
        >
          {ctaButton}
          <span className="material-symbols-outlined">arrow_forward</span>
        </a>
      </div>
    </section>
  );
}

// ============================================
// CARD - Kaart in het midden
// ============================================
function CtaCard({ theme, palette, ctaTitel, ctaTekst, ctaButton }: any) {
  return (
    <section 
      className={`${theme.spacing.section} px-6`}
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className={`${theme.spacing.container} mx-auto`}>
        <div 
          className={`${theme.radius.large} p-8 md:p-12 text-center ${theme.shadows.medium} ${getRevealClass('up')}`}
          style={{ backgroundColor: palette.primaryLight }}
        >
          <span 
            className="material-symbols-outlined text-4xl mb-4 block"
            style={{ color: palette.primary }}
          >
            waving_hand
          </span>
          <h2 
            className="text-2xl md:text-3xl font-bold mb-4"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            {ctaTitel}
          </h2>
          <p 
            className="mb-8 max-w-xl mx-auto"
            style={{ color: theme.colors.textMuted }}
          >
            {ctaTekst}
          </p>
          <a 
            href="#contact"
            className={`inline-flex items-center gap-2 px-8 py-4 text-white font-bold ${theme.radius.medium} transition-all hover:opacity-90`}
            style={{ backgroundColor: palette.primary }}
          >
            {ctaButton}
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
function CtaMinimal({ theme, palette, ctaTitel, ctaTekst, ctaButton }: any) {
  return (
    <section 
      className="py-20 px-6 border-t"
      style={{ borderColor: theme.colors.border, backgroundColor: theme.colors.background }}
    >
      <div className={`max-w-2xl mx-auto text-center ${getRevealClass('up')}`}>
        <h2 
          className="text-2xl font-light mb-4"
          style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
        >
          {ctaTitel}
        </h2>
        <p 
          className="mb-8"
          style={{ color: theme.colors.textMuted }}
        >
          {ctaTekst}
        </p>
        <a 
          href="#contact"
          className="inline-flex items-center gap-2 font-semibold border-b-2 pb-1 transition-all hover:gap-3"
          style={{ color: palette.primary, borderColor: palette.primary }}
        >
          {ctaButton}
          <span className="material-symbols-outlined text-lg">arrow_forward</span>
        </a>
      </div>
    </section>
  );
}

export default CtaSection;
