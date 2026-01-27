// components/templates/sections/types.ts
// Shared types voor alle section components

import { ThemeConfig, PaletteKey } from '../themes';
import { SiteContent, GeneratedContent } from '@/types';

// Section style variants
export type HeroStyle = 'split' | 'centered' | 'fullwidth' | 'minimal';
export type StatsStyle = 'grid' | 'inline' | 'cards';
export type DienstenStyle = 'cards' | 'numbered' | 'list' | 'grid';
export type OverStyle = 'split' | 'centered' | 'timeline';
export type QuoteStyle = 'banner' | 'minimal' | 'dark';
export type TestimonialsStyle = 'cards' | 'carousel' | 'single';
export type FaqStyle = 'accordion' | 'grid' | 'simple';
export type CtaStyle = 'banner' | 'card' | 'minimal';
export type ContactStyle = 'split' | 'centered' | 'form-only';

// Section configuration
export interface SectionConfig {
  type: 'hero' | 'stats' | 'diensten' | 'over' | 'quote' | 'testimonials' | 'faq' | 'cta' | 'contact' | 'footer';
  style?: string;
  visible?: boolean;
}

// Base props voor alle sections
export interface BaseSectionProps {
  theme: ThemeConfig;
  palette: {
    primary: string;
    primaryHover: string;
    primaryLight: string;
    primaryDark: string;
  };
  content: SiteContent;
  generated?: GeneratedContent;
  beroepLabel: string;
  className?: string;
}

// Sfeerbeelden per beroep
export const BEROEP_IMAGES: Record<string, { hero: string; sfeer: string }> = {
  verpleegkundige: {
    hero: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1920&q=80',
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
  default: {
    hero: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=1920&q=80',
    sfeer: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  },
};

export function getBeroepImages(beroep: string) {
  return BEROEP_IMAGES[beroep] || BEROEP_IMAGES.default;
}

// Helper voor reveal animaties
export function getRevealClass(direction: 'up' | 'left' | 'right' = 'up', delay?: number) {
  const base = 'reveal';
  const dir = `reveal-${direction}`;
  const del = delay ? `reveal-delay-${delay}` : '';
  return `${base} ${dir} ${del}`.trim();
}
