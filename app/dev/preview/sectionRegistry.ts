// app/dev/preview/sectionRegistry.ts
// Registry van alle secties en hun style-varianten

import {
  HeroSection,
  StatsSection,
  DienstenSection,
  OverSection,
  CredentialsSection,
  WerkervaringSection,
  VoorWieSection,
  QuoteSection,
  WerkwijzeSection,
  TestimonialsSection,
  FaqSection,
  CtaSection,
  ContactSection,
  HeaderSection,
  FooterSection,
} from '@/components/templates/sections';

// ============================================
// REGISTRY TYPES
// ============================================

export interface SectionRegistryEntry {
  type: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
  variants: SectionVariant[];
}

export interface SectionVariant {
  style: string;
  label: string;
  extraProps?: Record<string, unknown>;
}

// ============================================
// HELPER: generate template variants
// ============================================

const TEMPLATES = ['editorial', 'proactief', 'portfolio', 'mindoor', 'serene'] as const;

/** Generates base + -2 + -3 for each template */
function templateVariants3(): SectionVariant[] {
  return TEMPLATES.flatMap(t => [
    { style: t, label: t },
    { style: `${t}-2`, label: `${t}-2` },
    { style: `${t}-3`, label: `${t}-3` },
  ]);
}

// ============================================
// SECTION REGISTRY
// ============================================

export const SECTION_REGISTRY: SectionRegistryEntry[] = [
  // --- Hero ---
  {
    type: 'hero',
    label: 'Hero',
    component: HeroSection,
    variants: [
      ...templateVariants3(),
      { style: 'split', label: 'split' },
      { style: 'centered', label: 'centered' },
      { style: 'fullwidth', label: 'fullwidth' },
      { style: 'minimal', label: 'minimal' },
    ],
  },

  // --- Stats ---
  {
    type: 'stats',
    label: 'Stats',
    component: StatsSection,
    variants: [
      { style: 'editorial', label: 'editorial' },
      { style: 'proactief', label: 'proactief' },
      { style: 'portfolio', label: 'portfolio' },
      { style: 'mindoor', label: 'mindoor' },
      { style: 'serene', label: 'serene' },
      { style: 'grid', label: 'grid' },
      { style: 'inline', label: 'inline' },
      { style: 'cards', label: 'cards' },
      { style: 'minimal', label: 'minimal' },
    ],
  },

  // --- Diensten ---
  {
    type: 'diensten',
    label: 'Diensten',
    component: DienstenSection,
    variants: [
      ...templateVariants3(),
      { style: 'cards', label: 'cards' },
      { style: 'numbered', label: 'numbered' },
      { style: 'list', label: 'list' },
      { style: 'grid', label: 'grid' },
    ],
  },

  // --- Over ---
  {
    type: 'over',
    label: 'Over',
    component: OverSection,
    variants: [
      ...templateVariants3(),
    ],
  },

  // --- Credentials ---
  {
    type: 'credentials',
    label: 'Credentials',
    component: CredentialsSection,
    variants: [
      { style: 'editorial', label: 'editorial' },
      { style: 'proactief', label: 'proactief' },
      { style: 'portfolio', label: 'portfolio' },
      { style: 'mindoor', label: 'mindoor' },
      { style: 'serene', label: 'serene' },
    ],
  },

  // --- Werkervaring ---
  {
    type: 'werkervaring',
    label: 'Werkervaring',
    component: WerkervaringSection,
    variants: TEMPLATES.flatMap(t => [
      { style: `${t}-1`, label: `${t}-1` },
      { style: `${t}-2`, label: `${t}-2` },
      { style: `${t}-3`, label: `${t}-3` },
    ]),
  },

  // --- VoorWie ---
  {
    type: 'voorwie',
    label: 'Voor Wie',
    component: VoorWieSection,
    variants: [
      ...templateVariants3(),
    ],
  },

  // --- Quote ---
  {
    type: 'quote',
    label: 'Quote',
    component: QuoteSection,
    variants: [
      { style: 'banner', label: 'banner' },
      { style: 'minimal', label: 'minimal' },
      { style: 'dark', label: 'dark' },
      { style: 'serene', label: 'serene' },
    ],
  },

  // --- Werkwijze (style × variant combos) ---
  {
    type: 'werkwijze',
    label: 'Werkwijze',
    component: WerkwijzeSection,
    variants: [
      // Each style with variant 1, 2, 3
      ...['editorial', 'proactief', 'portfolio', 'mindoor', 'serene'].flatMap(
        s => [1, 2, 3].map(v => ({
          style: s,
          label: `${s} (variant ${v})`,
          extraProps: { variant: v },
        }))
      ),
    ],
  },

  // --- Testimonials ---
  {
    type: 'testimonials',
    label: 'Testimonials',
    component: TestimonialsSection,
    variants: [
      ...templateVariants3(),
      { style: 'cards', label: 'cards' },
      { style: 'carousel', label: 'carousel' },
      { style: 'single', label: 'single' },
    ],
  },

  // --- FAQ ---
  {
    type: 'faq',
    label: 'FAQ',
    component: FaqSection,
    variants: [
      ...templateVariants3(),
      { style: 'accordion', label: 'accordion' },
      { style: 'grid', label: 'grid' },
      { style: 'simple', label: 'simple' },
    ],
  },

  // --- CTA ---
  {
    type: 'cta',
    label: 'CTA',
    component: CtaSection,
    variants: [
      { style: 'editorial', label: 'editorial' },
      { style: 'proactief', label: 'proactief' },
      { style: 'portfolio', label: 'portfolio' },
      { style: 'mindoor', label: 'mindoor' },
      { style: 'serene', label: 'serene' },
    ],
  },

  // --- Contact ---
  {
    type: 'contact',
    label: 'Contact',
    component: ContactSection,
    variants: [
      ...templateVariants3(),
      { style: 'split', label: 'split' },
      { style: 'centered', label: 'centered' },
      { style: 'form-only', label: 'form-only' },
    ],
  },

  // --- Header ---
  {
    type: 'header',
    label: 'Header',
    component: HeaderSection,
    variants: [
      { style: 'editorial', label: 'editorial' },
      { style: 'proactief', label: 'proactief' },
      { style: 'portfolio', label: 'portfolio' },
      { style: 'mindoor', label: 'mindoor' },
      { style: 'serene', label: 'serene' },
      { style: 'solid', label: 'solid' },
      { style: 'transparent', label: 'transparent' },
      { style: 'floating', label: 'floating' },
    ],
  },

  // --- Footer ---
  {
    type: 'footer',
    label: 'Footer',
    component: FooterSection,
    variants: [
      { style: 'editorial', label: 'editorial' },
      { style: 'proactief', label: 'proactief' },
      { style: 'portfolio', label: 'portfolio' },
      { style: 'mindoor', label: 'mindoor' },
      { style: 'serene', label: 'serene' },
      { style: 'simple', label: 'simple' },
      { style: 'detailed', label: 'detailed' },
      { style: 'minimal', label: 'minimal' },
    ],
  },
];

// Sidebar sections (exclude header/footer — they render separately)
export const SIDEBAR_SECTIONS = SECTION_REGISTRY.filter(
  s => s.type !== 'header' && s.type !== 'footer'
);
