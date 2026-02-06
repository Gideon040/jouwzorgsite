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
export { WerkervaringSection } from './WerkervaringSection';
export { VoorWieSection } from './VoorWieSection';
export { QuoteSection } from './QuoteSection';
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
// 1.  Header        ✅ VERPLICHT
// 2.  Hero          ✅ VERPLICHT
// 3.  Stats         ✅ OPTIONEEL
// 4.  Diensten      ✅ VERPLICHT
// 5.  Over          ✅ VERPLICHT
// 6.  Credentials   ✅ VERPLICHT
// 7.  Werkervaring  ✅ VERPLICHT
// 8.  VoorWie       ✅ VERPLICHT
// 9.  Quote         ✅ VERPLICHT
// 10. Werkwijze     ✅ VERPLICHT
// 11. Testimonials  ✅ VERPLICHT
// 12. FAQ           ✅ VERPLICHT
// 13. CTA           ✅ OPTIONEEL
// 14. Contact       ✅ VERPLICHT
// 15. Footer        ✅ VERPLICHT
// ============================================

export const SECTION_ORDER = [
  'header',
  'hero',
  'stats',
  'diensten',
  'over',
  'credentials',
  'werkervaring',
  'voorwie',
  'quote',
  'werkwijze',
  'testimonials',
  'faq',
  'cta',
  'contact',
  'footer',
] as const;

export const REQUIRED_SECTIONS = SECTION_ORDER;

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
    werkervaring: 'editorial',
    voorwie: 'editorial',
    quote: 'minimal',
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
    werkervaring: 'proactief',
    voorwie: 'proactief',
    quote: 'banner',
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
    werkervaring: 'portfolio',
    voorwie: 'portfolio',
    quote: 'dark',
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
    werkervaring: 'mindoor',
    voorwie: 'mindoor',
    quote: 'minimal',
    werkwijze: 'mindoor',
    testimonials: 'mindoor',
    faq: 'mindoor',
    cta: 'mindoor',
    contact: 'mindoor',
    footer: 'mindoor',
  },
  serene: {
    header: 'serene',
    hero: 'serene',
    stats: 'serene',
    diensten: 'serene',
    over: 'serene',
    credentials: 'serene',
    werkervaring: 'serene',
    voorwie: 'serene',
    quote: 'serene',
    werkwijze: 'serene',
    testimonials: 'serene',
    faq: 'serene',
    cta: 'serene',
    contact: 'serene',
    footer: 'serene',
  },
} as const;

// Helper to get default style for a section
export function getDefaultSectionStyle(
  theme: keyof typeof THEME_DEFAULT_STYLES, 
  section: keyof typeof THEME_DEFAULT_STYLES['editorial']
): string {
  return THEME_DEFAULT_STYLES[theme]?.[section] || THEME_DEFAULT_STYLES.editorial[section];
}