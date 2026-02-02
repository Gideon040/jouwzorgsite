// components/templates/sections/index.ts
// Export alle section components

// Types
export * from './types';

// Section Components
export { HeaderSection } from './HeaderSection';
export { HeroSection } from './HeroSection';
export { StatsSection } from './StatsSection';
export { DienstenSection } from './DienstenSection';
export { OverSection } from './OverSection';
export { CredentialsSection } from './CredentialsSection';
export { VoorWieSection } from './VoorWieSection';
export { WerkwijzeSection } from './WerkwijzeSection';
export { TestimonialsSection } from './TestimonialsSection';
export { FaqSection } from './FaqSection';
export { CtaSection } from './CtaSection';
export { ContactSection } from './ContactSection';
export { FooterSection } from './FooterSection';

// Extra Components
export { WhatsAppButton } from './WhatsAppButton';

// ============================================
// SECTION ORDER (VASTE VOLGORDE)
// ============================================
// 1. Header        ✅ VERPLICHT
// 2. Hero          ✅ VERPLICHT
// 3. Stats         ⚪ OPTIONEEL (enige optionele sectie)
// 4. Diensten      ✅ VERPLICHT
// 5. Over          ✅ VERPLICHT
// 6. Credentials   ✅ VERPLICHT
// 7. VoorWie       ✅ VERPLICHT
// 8. Werkwijze     ✅ VERPLICHT
// 9. Testimonials  ✅ VERPLICHT
// 10. FAQ          ✅ VERPLICHT
// 11. CTA          ✅ VERPLICHT
// 12. Contact      ✅ VERPLICHT
// 13. Footer       ✅ VERPLICHT
// ============================================

export const SECTION_ORDER = [
  'header',
  'hero',
  'stats',        // OPTIONEEL
  'diensten',
  'over',
  'credentials',
  'voorwie',
  'werkwijze',
  'testimonials',
  'faq',
  'cta',
  'contact',
  'footer',
] as const;

export const REQUIRED_SECTIONS = SECTION_ORDER.filter(s => s !== 'stats');

// ============================================
// DEFAULT SECTION STYLES PER THEME
// ============================================
export const THEME_DEFAULT_STYLES = {
  editorial: {
    header: 'editorial',
    hero: 'editorial',
    stats: 'editorial',
    diensten: 'editorial',
    over: 'editorial',
    credentials: 'editorial',
    voorwie: 'editorial',
    werkwijze: 'editorial',
    testimonials: 'editorial',
    faq: 'editorial',
    cta: 'editorial',
    contact: 'editorial',
    footer: 'editorial',
  },
  proactief: {
    header: 'proactief',
    hero: 'proactief',
    stats: 'proactief',
    diensten: 'proactief',
    over: 'proactief',
    credentials: 'proactief',
    voorwie: 'proactief',
    werkwijze: 'proactief',
    testimonials: 'proactief',
    faq: 'proactief',
    cta: 'proactief',
    contact: 'proactief',
    footer: 'proactief',
  },
  portfolio: {
    header: 'portfolio',
    hero: 'portfolio',
    stats: 'portfolio',
    diensten: 'portfolio',
    over: 'portfolio',
    credentials: 'portfolio',
    voorwie: 'portfolio',
    werkwijze: 'portfolio',
    testimonials: 'portfolio',
    faq: 'portfolio',
    cta: 'portfolio',
    contact: 'portfolio',
    footer: 'portfolio',
  },
  mindoor: {
    header: 'mindoor',
    hero: 'mindoor',
    stats: 'mindoor',
    diensten: 'mindoor',
    over: 'mindoor',
    credentials: 'mindoor',
    voorwie: 'mindoor',
    werkwijze: 'mindoor',
    testimonials: 'mindoor',
    faq: 'mindoor',
    cta: 'mindoor',
    contact: 'mindoor',
    footer: 'mindoor',
  },
  classic: {
    header: 'solid',
    hero: 'split',
    stats: 'grid',
    diensten: 'cards',
    over: 'split',
    credentials: 'full',
    voorwie: 'cards',
    werkwijze: 'steps',
    testimonials: 'cards',
    faq: 'accordion',
    cta: 'banner',
    contact: 'split',
    footer: 'detailed',
  },
  bold: {
    header: 'transparent',
    hero: 'fullwidth',
    stats: 'cards',
    diensten: 'numbered',
    over: 'timeline',
    credentials: 'cards',
    voorwie: 'cards',
    werkwijze: 'cards',
    testimonials: 'carousel',
    faq: 'grid',
    cta: 'card',
    contact: 'centered',
    footer: 'simple',
  },
  minimal: {
    header: 'floating',
    hero: 'minimal',
    stats: 'minimal',
    diensten: 'list',
    over: 'centered',
    credentials: 'compact',
    voorwie: 'list',
    werkwijze: 'timeline',
    testimonials: 'single',
    faq: 'simple',
    cta: 'minimal',
    contact: 'form-only',
    footer: 'minimal',
  },
  magazine: {
    header: 'editorial',
    hero: 'editorial',
    stats: 'inline',
    diensten: 'grid',
    over: 'editorial',
    credentials: 'badges',
    voorwie: 'grid',
    werkwijze: 'editorial',
    testimonials: 'editorial',
    faq: 'editorial',
    cta: 'editorial',
    contact: 'editorial',
    footer: 'editorial',
  },
  cards: {
    header: 'solid',
    hero: 'centered',
    stats: 'cards',
    diensten: 'cards',
    over: 'split',
    credentials: 'cards',
    voorwie: 'cards',
    werkwijze: 'cards',
    testimonials: 'cards',
    faq: 'grid',
    cta: 'card',
    contact: 'split',
    footer: 'detailed',
  },
} as const;

// Helper to get default style for a section
export function getDefaultSectionStyle(
  theme: keyof typeof THEME_DEFAULT_STYLES, 
  section: keyof typeof THEME_DEFAULT_STYLES['editorial']
): string {
  return THEME_DEFAULT_STYLES[theme]?.[section] || THEME_DEFAULT_STYLES.editorial[section];
}
