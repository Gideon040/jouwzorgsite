// components/templates/sections/types.ts
// Shared types voor alle section components

import { ThemeConfig } from '../themes';
import { SiteContent, GeneratedContent } from '@/types';

// ============================================
// PALETTE TYPE (matched themes/index.ts)
// ============================================

export interface PaletteColors {
  primary: string;
  primaryHover: string;
  primaryLight: string;
  primaryDark: string;
  accent: string;
  accentLight: string;
  bg: string;
  bgAlt: string;
  text: string;
  textMuted: string;
  border: string;
}

// ============================================
// SECTION STYLE VARIANTS
// ============================================

export type HeroStyle = 
  // Editorial varianten
  | 'editorial' 
  | 'editorial-2' 
  | 'editorial-3'
  // Proactief varianten
  | 'proactief' 
  | 'proactief-2' 
  | 'proactief-3'
  // Portfolio varianten
  | 'portfolio' 
  | 'portfolio-2' 
  | 'portfolio-3'
  // Mindoor varianten
  | 'mindoor' 
  | 'mindoor-2' 
  | 'mindoor-3'
  // Serene varianten
  | 'serene' 
  | 'serene-2' 
  | 'serene-3'
  // Legacy (niet template-specifiek)
  | 'split' 
  | 'centered' 
  | 'fullwidth' 
  | 'minimal';

export type StatsStyle = 'editorial' | 'proactief' | 'portfolio' | 'mindoor' | 'serene' | 'grid' | 'inline' | 'cards' | 'minimal';
export type DienstenStyle = 
  | 'editorial' 
  | 'editorial-2' 
  | 'editorial-3'
  | 'proactief' 
  | 'proactief-2' 
  | 'proactief-3'
  | 'portfolio' 
  | 'portfolio-2' 
  | 'portfolio-3'
  | 'mindoor' 
  | 'mindoor-2' 
  | 'mindoor-3'
  | 'serene' 
  | 'serene-2' 
  | 'serene-3'
  | 'cards' 
  | 'numbered' 
  | 'list' 
  | 'grid';
export type OverStyle =
  | 'editorial' | 'editorial-2' | 'editorial-3'
  | 'proactief' | 'proactief-2' | 'proactief-3'
  | 'portfolio' | 'portfolio-2' | 'portfolio-3'
  | 'mindoor' | 'mindoor-2' | 'mindoor-3'
  | 'serene' | 'serene-2' | 'serene-3';
export type CredentialsStyle = 'editorial' | 'proactief' | 'portfolio' | 'mindoor' | 'serene';
export type WerkervaringStyle =
  | 'editorial-1' | 'editorial-2' | 'editorial-3'
  | 'proactief-1' | 'proactief-2' | 'proactief-3'
  | 'portfolio-1' | 'portfolio-2' | 'portfolio-3'
  | 'mindoor-1' | 'mindoor-2' | 'mindoor-3'
  | 'serene-1' | 'serene-2' | 'serene-3';
export type VoorWieStyle =
  | 'editorial' | 'editorial-2' | 'editorial-3'
  | 'proactief' | 'proactief-2' | 'proactief-3'
  | 'portfolio' | 'portfolio-2' | 'portfolio-3'
  | 'mindoor' | 'mindoor-2' | 'mindoor-3'
  | 'serene' | 'serene-2' | 'serene-3';
export type QuoteStyle = 'banner' | 'minimal' | 'dark' | 'serene';
export type WerkwijzeStyle = 'editorial' | 'proactief' | 'portfolio' | 'mindoor' | 'serene';
export type TestimonialsStyle = 
  | 'editorial' | 'editorial-2' | 'editorial-3'
  | 'proactief' | 'proactief-2' | 'proactief-3'
  | 'portfolio' | 'portfolio-2' | 'portfolio-3'
  | 'mindoor'   | 'mindoor-2'   | 'mindoor-3'
  | 'serene'    | 'serene-2'    | 'serene-3'
  | 'cards' | 'carousel' | 'single';
export type FaqStyle = 
  | 'editorial' 
  | 'editorial-2' 
  | 'editorial-3'
  | 'proactief' 
  | 'proactief-2' 
  | 'proactief-3'
  | 'portfolio' 
  | 'portfolio-2' 
  | 'portfolio-3'
  | 'mindoor' 
  | 'mindoor-2' 
  | 'mindoor-3'
  | 'serene' 
  | 'serene-2' 
  | 'serene-3'
  | 'accordion' 
  | 'grid' 
  | 'simple';
export type CtaStyle = 'editorial' | 'proactief' | 'portfolio' | 'mindoor' | 'serene';
export type ContactStyle = 
  | 'editorial' 
  | 'editorial-2' 
  | 'editorial-3'
  | 'proactief' 
  | 'proactief-2' 
  | 'proactief-3'
  | 'portfolio' 
  | 'portfolio-2' 
  | 'portfolio-3'
  | 'mindoor' 
  | 'mindoor-2' 
  | 'mindoor-3'
  | 'serene' 
  | 'serene-2' 
  | 'serene-3'
  | 'split' 
  | 'centered' 
  | 'form-only';
export type FooterStyle = 'editorial' | 'proactief' | 'portfolio' | 'mindoor' | 'serene' | 'simple' | 'detailed' | 'minimal';
export type HeaderStyle = 'editorial' | 'proactief' | 'portfolio' | 'mindoor' | 'serene' | 'solid' | 'transparent' | 'floating';

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
  | 'werkervaring'
  | 'voorwie'
  | 'quote'
  | 'werkwijze'
  | 'testimonials' 
  | 'faq' 
  | 'cta' 
  | 'contact' 
  | 'footer';

export interface SectionConfig {
  type: string;
  style?: string;
  visible?: boolean;
  variant?: number;
}

// ============================================
// BASE PROPS
// ============================================

export interface BaseSectionProps {
  theme: ThemeConfig;
  palette: PaletteColors;
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
    tekst: "Eindelijk iemand die echt luistert en meedenkt. De zorg is precies afgestemd op onze situatie.",
    naam: "M. de Vries",
    functie: "Mantelzorger"
  },
  {
    tekst: "Betrouwbaar, flexibel en altijd vriendelijk. Een absolute aanrader voor iedereen die zorg nodig heeft.",
    naam: "R. Bakker",
    functie: "Familie van cliënt"
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

// ============================================
// DEFAULT WERKWIJZE STAPPEN
// ============================================

export const DEFAULT_WERKWIJZE_STAPPEN = [
  {
    nummer: 1,
    titel: 'Kennismaking',
    beschrijving: 'We beginnen met een persoonlijk gesprek waarin ik uw situatie en wensen in kaart breng.',
    icon: 'handshake',
  },
  {
    nummer: 2,
    titel: 'Plan op Maat',
    beschrijving: 'Op basis van uw behoeften stel ik een persoonlijk zorgplan op dat bij u past.',
    icon: 'assignment',
  },
  {
    nummer: 3,
    titel: 'Zorg Verlenen',
    beschrijving: 'Ik lever de afgesproken zorg met aandacht voor uw comfort en welzijn.',
    icon: 'favorite',
  },
  {
    nummer: 4,
    titel: 'Evaluatie',
    beschrijving: 'Regelmatig bespreken we samen hoe de zorg verloopt en passen we aan waar nodig.',
    icon: 'verified',
  },
];

// ============================================
// DEFAULT FAQS
// ============================================

export const DEFAULT_FAQS = [
  {
    vraag: 'Wat zijn uw werktijden?',
    antwoord: 'Ik werk flexibel en pas mijn tijden aan uw behoeften aan. Overdag ben ik het meest beschikbaar, maar voor dringende zaken ben ik ook \'s avonds en in het weekend bereikbaar.',
  },
  {
    vraag: 'Werkt u ook met PGB?',
    antwoord: 'Ja, ik werk met zowel PGB als zorg in natura. Ik help u graag met de administratieve afhandeling en kan u adviseren over de mogelijkheden.',
  },
  {
    vraag: 'In welke regio bent u werkzaam?',
    antwoord: 'Ik ben werkzaam in de regio en directe omgeving. Neem gerust contact op om te bespreken of ik bij u in de buurt kan komen.',
  },
  {
    vraag: 'Hoe verloopt een eerste kennismaking?',
    antwoord: 'Bij een eerste kennismaking kom ik vrijblijvend bij u langs om uw situatie en wensen te bespreken. Samen kijken we wat de beste zorgoplossing is.',
  },
  {
    vraag: 'Bent u BIG-geregistreerd?',
    antwoord: 'Ja, ik ben BIG-geregistreerd en voldoe aan alle wettelijke eisen voor zorgverlening. Mijn registratie is te controleren via het BIG-register.',
  },
];

// ============================================
// DETERMINISTIC HASH HELPER
// ============================================
// Voorkomt hydration mismatch — geeft altijd dezelfde waarde voor dezelfde input

export function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

// ============================================
// PALETTE RESOLVE HELPER
// ============================================
// Convenience voor secties die optionele palette velden gebruiken

export function resolvePalette(palette: PaletteColors) {
  return {
    primary: palette.primary,
    primaryHover: palette.primaryHover,
    primaryLight: palette.primaryLight,
    primaryDark: palette.primaryDark,
    accent: palette.accent ?? palette.primary,
    accentLight: palette.accentLight ?? palette.primaryLight,
    bg: palette.bg ?? '#ffffff',
    bgAlt: palette.bgAlt ?? '#fafafa',
    text: palette.text ?? '#1a1a1a',
    textMuted: palette.textMuted ?? '#6b7280',
    border: palette.border ?? '#e5e7eb',
  };
}

// ============================================
// HERO IMAGE POOLS
// ============================================
// Per beroep meerdere hero images voor variatie
// Alle images: landscape, professioneel, zorg-gerelateerd

export const HERO_IMAGE_POOLS: Record<string, string[]> = {
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

// ============================================
// DIENSTEN SFEER IMAGES
// ============================================

export const DIENSTEN_SFEER_IMAGES = [
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80',
];

// ============================================
// FAQ IMAGES
// ============================================

export const FAQ_IMAGES = {
  zorg1: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
  zorg2: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&w=800&q=80',
  zorg3: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80',
  zorg4: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
  zorg5: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
} as const;

// ============================================
// QUOTE SFEER IMAGES
// ============================================

export const QUOTE_SFEER_IMAGES = [
  'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1920&q=80',
];

// ============================================
// TESTIMONIALS SFEER IMAGES
// ============================================

export const TESTIMONIALS_SFEER_IMAGES = [
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=700&q=80',
];

// ============================================
// DOELGROEP IMAGES (for photo-based VoorWie variants)
// ============================================

export const DOELGROEP_IMAGES: Record<string, string> = {
  thuiszorg: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=500&h=300&fit=crop',
  verpleeghuis: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?w=500&h=300&fit=crop',
  verzorgingshuis: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?w=500&h=300&fit=crop',
  ziekenhuis: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&h=300&fit=crop',
  kliniek: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&h=300&fit=crop',
  bemiddelaar: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=500&h=300&fit=crop',
  intermediair: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=500&h=300&fit=crop',
  instellingen: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?w=500&h=300&fit=crop',
  bemiddelaars: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=500&h=300&fit=crop',
  pgb: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=500&h=300&fit=crop',
  particulieren: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=500&h=300&fit=crop',
};

// ============================================
// DEFAULT QUOTES
// ============================================

export const DEFAULT_QUOTES = [
  'Zorgen voor wie ooit voor ons zorgde is een van de hoogste eerbetonen.',
  'In aandacht en rust ligt de ware kracht van zorg.',
  'Excellentie in zorg komt voort uit passie, precisie en toewijding.',
  'Goede zorg begint met luisteren.',
  'De mooiste zorg ontstaat waar vakmanschap en menselijkheid samenkomen.',
  'Elke dag opnieuw het verschil maken — dát is wat mij drijft.',
];