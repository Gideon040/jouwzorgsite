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
// 1. Header        ✅ VERPLICHT
// 2. Hero          ✅ VERPLICHT
// 3. Diensten      ✅ VERPLICHT
// 4. Over          ✅ VERPLICHT
// 5. Credentials   ✅ VERPLICHT
// 6. Werkervaring  ✅ VERPLICHT (NIEUW)
// 7. VoorWie       ✅ VERPLICHT
// 8. Quote         ✅ VERPLICHT (NIEUW)
// 9. Werkwijze     ✅ VERPLICHT
// 10. Testimonials ✅ VERPLICHT
// 11. FAQ          ✅ VERPLICHT
// 12. Contact      ✅ VERPLICHT
// 13. Footer       ✅ VERPLICHT
// ============================================

export const SECTION_ORDER = [
  'header',
  'hero',
  'diensten',
  'over',
  'credentials',
  'werkervaring',
  'voorwie',
  'quote',
  'werkwijze',
  'testimonials',
  'faq',
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
    diensten: 'editorial',
    over: 'editorial',
    credentials: 'editorial',
    werkervaring: 'editorial',
    voorwie: 'editorial',
    quote: 'minimal',
    werkwijze: 'editorial',
    testimonials: 'editorial',
    faq: 'editorial',
    contact: 'editorial',
    footer: 'editorial',
  },
  proactief: {
    header: 'proactief',
    hero: 'proactief',
    diensten: 'proactief',
    over: 'proactief',
    credentials: 'proactief',
    werkervaring: 'proactief',
    voorwie: 'proactief',
    quote: 'banner',
    werkwijze: 'proactief',
    testimonials: 'proactief',
    faq: 'proactief',
    contact: 'proactief',
    footer: 'proactief',
  },
  portfolio: {
    header: 'portfolio',
    hero: 'portfolio',
    diensten: 'portfolio',
    over: 'portfolio',
    credentials: 'portfolio',
    werkervaring: 'portfolio',
    voorwie: 'portfolio',
    quote: 'dark',
    werkwijze: 'portfolio',
    testimonials: 'portfolio',
    faq: 'portfolio',
    contact: 'portfolio',
    footer: 'portfolio',
  },
  mindoor: {
    header: 'mindoor',
    hero: 'mindoor',
    diensten: 'mindoor',
    over: 'mindoor',
    credentials: 'mindoor',
    werkervaring: 'mindoor',
    voorwie: 'mindoor',
    quote: 'minimal',
    werkwijze: 'mindoor',
    testimonials: 'mindoor',
    faq: 'mindoor',
    contact: 'mindoor',
    footer: 'mindoor',
  },
} as const;

// Helper to get default style for a section
export function getDefaultSectionStyle(
  theme: keyof typeof THEME_DEFAULT_STYLES, 
  section: keyof typeof THEME_DEFAULT_STYLES['editorial']
): string {
  return THEME_DEFAULT_STYLES[theme]?.[section] || THEME_DEFAULT_STYLES.editorial[section];
}
