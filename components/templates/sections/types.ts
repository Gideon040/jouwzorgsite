// components/templates/sections/types.ts
// Shared types voor alle section components

import { ThemeConfig } from '../themes';
import { SiteContent, GeneratedContent } from '@/types';

// ============================================
// SECTION STYLE VARIANTS
// ============================================

export type HeroStyle = 'editorial' | 'proactief' | 'portfolio' | 'mindoor' | 'split' | 'centered' | 'fullwidth' | 'minimal';
export type StatsStyle = 'editorial' | 'proactief' | 'portfolio' | 'mindoor' | 'grid' | 'inline' | 'cards' | 'minimal';
export type DienstenStyle = 'editorial' | 'proactief' | 'portfolio' | 'mindoor' | 'cards' | 'numbered' | 'list' | 'grid';
export type OverStyle = 'editorial' | 'proactief' | 'portfolio' | 'mindoor' | 'split' | 'centered' | 'timeline';
export type CredentialsStyle = 'editorial' | 'proactief' | 'portfolio' | 'mindoor' | 'full' | 'compact' | 'cards' | 'badges';
export type VoorWieStyle = 'editorial' | 'proactief' | 'portfolio' | 'mindoor' | 'cards' | 'grid' | 'list';
export type WerkwijzeStyle = 'editorial' | 'proactief' | 'portfolio' | 'mindoor' | 'steps' | 'timeline' | 'cards' | 'bento';
export type TestimonialsStyle = 'editorial' | 'proactief' | 'portfolio' | 'mindoor' | 'cards' | 'carousel' | 'single';
export type FaqStyle = 'editorial' | 'proactief' | 'portfolio' | 'mindoor' | 'accordion' | 'grid' | 'simple';
export type CtaStyle = 'editorial' | 'proactief' | 'portfolio' | 'mindoor' | 'banner' | 'card' | 'minimal';
export type ContactStyle = 'editorial' | 'proactief' | 'portfolio' | 'mindoor' | 'split' | 'centered' | 'form-only';
export type FooterStyle = 'editorial' | 'proactief' | 'portfolio' | 'mindoor' | 'simple' | 'detailed' | 'minimal';
export type HeaderStyle = 'editorial' | 'proactief' | 'portfolio' | 'mindoor' | 'solid' | 'transparent' | 'floating';
export type QuoteStyle = 'editorial' | 'proactief' | 'portfolio' | 'mindoor' | 'banner' | 'minimal' | 'dark';

// ============================================
// SECTION CONFIGURATION
// ============================================

export type SectionType = 
  | 'header'
  | 'hero' 
  | 'stats' 
  | 'diensten' 
  | 'over' 
  | 'credentials' 
  | 'voorwie'
  | 'werkwijze'
  | 'testimonials' 
  | 'faq' 
  | 'cta' 
  | 'contact' 
  | 'footer';

export interface SectionConfig {
  type: SectionType;
  style?: string;
  visible?: boolean;
}

// ============================================
// BASE PROPS
// ============================================

export interface BaseSectionProps {
  theme: ThemeConfig;
  palette: {
    primary: string;
    primaryHover: string;
    primaryLight: string;
    primaryDark: string;
    accent?: string;
  };
  content: SiteContent;
  generated?: GeneratedContent;
  beroepLabel: string;
  className?: string;
}

// ============================================
// BEROEP IMAGES
// ============================================

export const BEROEP_IMAGES: Record<string, { hero: string; sfeer: string }> = {
  verpleegkundige: {
    hero: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1920&q=80',
    sfeer: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&q=80',
  },
  verzorgende_ig: {
    hero: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1920&q=80',
    sfeer: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1200&q=80',
  },
  kraamverzorgende: {
    hero: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=1920&q=80',
    sfeer: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1200&q=80',
  },
  ggz: {
    hero: 'https://images.unsplash.com/photo-1527137342181-19aab11a8ee8?auto=format&fit=crop&w=1920&q=80',
    sfeer: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
  },
  fysiotherapeut: {
    hero: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1920&q=80',
    sfeer: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80',
  },
  default: {
    hero: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=1920&q=80',
    sfeer: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  },
};

export function getBeroepImages(beroep: string) {
  return BEROEP_IMAGES[beroep] || BEROEP_IMAGES.default;
}

// ============================================
// REVEAL ANIMATION HELPERS
// ============================================

export function getRevealClass(
  direction: 'up' | 'left' | 'right' = 'up', 
  delay?: number
): string {
  const base = 'reveal';
  const dirClass = direction === 'up' ? 'reveal-up' : direction === 'left' ? 'reveal-left' : 'reveal-right';
  const delayClass = delay ? `reveal-delay-${delay}` : '';
  
  return `${base} ${dirClass} ${delayClass}`.trim();
}

// ============================================
// DEFAULT CONTENT
// ============================================

export const DEFAULT_TESTIMONIALS = [
  {
    tekst: "Zeer professionele en persoonlijke zorg. Voelt echt als een vertrouwd iemand over de vloer.",
    naam: "Familie Jansen",
    functie: "Cliënt thuiszorg"
  },
  {
    tekst: "Altijd bereikbaar, flexibel en met een warm hart voor de zorg. Absolute aanrader!",
    naam: "M. de Vries",
    functie: "Mantelzorger"
  },
  {
    tekst: "De rust en aandacht die wordt gegeven is precies wat we zochten. Heel tevreden.",
    naam: "R. Bakker",
    functie: "Familie van cliënt"
  },
];

export const DEFAULT_FAQS = [
  {
    vraag: "Wat zijn uw werktijden?",
    antwoord: "Ik ben flexibel inzetbaar, ook in de avonden en weekenden. Samen bekijken we wat het beste past bij uw situatie."
  },
  {
    vraag: "Werkt u ook met PGB?",
    antwoord: "Ja, ik werk zowel met zorg in natura als met PGB (persoonsgebonden budget). Ik help u graag met de administratie hiervan."
  },
  {
    vraag: "In welke regio bent u werkzaam?",
    antwoord: "Ik ben werkzaam in de regio en omstreken. Neem contact op om te kijken of ik bij u in de buurt kan komen."
  },
  {
    vraag: "Hoe verloopt een eerste kennismaking?",
    antwoord: "Bij een eerste kennismaking kom ik vrijblijvend langs om kennis te maken en uw zorgvraag te bespreken. Zo kunnen we samen kijken wat u nodig heeft."
  },
  {
    vraag: "Bent u BIG-geregistreerd?",
    antwoord: "Ja, ik ben BIG-geregistreerd. Dit garandeert dat ik voldoe aan de kwaliteitseisen voor zorgverleners in Nederland."
  },
];

export const DEFAULT_WERKWIJZE_STAPPEN = [
  {
    titel: "Contact",
    beschrijving: "Neem vrijblijvend contact op om mijn beschikbaarheid te checken voor uw opdracht."
  },
  {
    titel: "Kennismaken",
    beschrijving: "We bespreken de opdracht, werkzaamheden en wederzijdse verwachtingen."
  },
  {
    titel: "Aan de slag",
    beschrijving: "Flexibele inzet op locatie. Ik sluit naadloos aan bij uw team."
  },
  {
    titel: "Evaluatie",
    beschrijving: "Goede communicatie en afstemming voor een prettige samenwerking."
  },
];

export const DEFAULT_DOELGROEPEN = [
  {
    type: 'instellingen' as const,
    titel: "Zorginstellingen",
    tekst: "Flexibele inzet bij personeelstekort of piekdrukte. Ik sluit naadloos aan bij uw team."
  },
  {
    type: 'bemiddelaars' as const,
    titel: "Bemiddelingsbureaus",
    tekst: "Betrouwbare samenwerking met vaste tarieven en snelle beschikbaarheid."
  },
  {
    type: 'pgb' as const,
    titel: "Particulieren (PGB)",
    tekst: "Persoonlijke zorg in uw eigen omgeving. Ik help ook met de PGB-administratie."
  },
];

// ============================================
// DIENST ICONS
// ============================================

export const DIENST_ICONS = [
  'home_health',
  'healing',
  'medication',
  'favorite',
  'monitor_heart',
  'clinical_notes',
  'psychology',
  'elderly',
  'vaccines',
  'health_and_safety',
];

export function getDienstIcon(index: number): string {
  return DIENST_ICONS[index % DIENST_ICONS.length];
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function getJarenErvaring(werkervaring?: Array<{ start_jaar?: number; startJaar?: number }>): number | null {
  if (!werkervaring || werkervaring.length === 0) return null;
  
  const earliestYear = Math.min(
    ...werkervaring
      .map(w => w.start_jaar || w.startJaar)
      .filter((y): y is number => y !== undefined)
  );
  
  if (!earliestYear || earliestYear === Infinity) return null;
  
  return new Date().getFullYear() - earliestYear;
}