// components/templates/index.tsx
// Template router - supports both legacy templates and new modular system

import { Site } from '@/types';

// New modular system
import { TemplateRenderer } from './TemplateRenderer';

// Legacy templates (for backward compatibility)
import { TemplateWarm } from './TemplateWarm';
import { TemplateModern } from './TemplateModern';
import { TemplateEditorial } from './TemplateEditorial';

// Export new system
export { TemplateRenderer };
export * from './themes';
export * from './sections';

// Export legacy templates
export { TemplateWarm, TemplateModern, TemplateEditorial };

// Template metadata for display/selection
export const TEMPLATES = {
  // New modular templates
  classic: {
    id: 'classic',
    name: 'Klassiek & Warm',
    description: 'Tijdloos design met warme uitstraling',
    preview: '/previews/classic.png',
    forPersonality: ['warm'],
    forWorkfield: ['thuiszorg', 'ouderenzorg', 'kraamzorg'],
    isModular: true,
  },
  bold: {
    id: 'bold',
    name: 'Bold & Professioneel',
    description: 'Donker, impactvol, statement',
    preview: '/previews/bold.png',
    forPersonality: ['zakelijk'],
    forWorkfield: ['ziekenhuis', 'IC', 'specialist'],
    isModular: true,
  },
  minimal: {
    id: 'minimal',
    name: 'Minimaal & Rustig',
    description: 'Zen, veel witruimte, sereen',
    preview: '/previews/minimal.png',
    forPersonality: ['rustig'],
    forWorkfield: ['ggz', 'coaching', 'therapie'],
    isModular: true,
  },
  magazine: {
    id: 'magazine',
    name: 'Magazine & Premium',
    description: 'Editorial, thought-leader stijl',
    preview: '/previews/magazine.png',
    forPersonality: ['zakelijk'],
    forWorkfield: ['consultant', 'adviseur', 'expert'],
    isModular: true,
  },
  cards: {
    id: 'cards',
    name: 'Modern & Fresh',
    description: 'App-like, bento grid, jong',
    preview: '/previews/cards.png',
    forPersonality: ['energiek'],
    forWorkfield: ['starter', 'flexibel'],
    isModular: true,
  },
  // Legacy templates
  warm: {
    id: 'warm',
    name: 'Warm (Legacy)',
    description: 'Originele warme template',
    preview: '/previews/warm.png',
    isModular: false,
  },
  modern: {
    id: 'modern',
    name: 'Modern (Legacy)',
    description: 'Originele moderne template',
    preview: '/previews/modern.png',
    isModular: false,
  },
  editorial: {
    id: 'editorial',
    name: 'Editorial (Legacy)',
    description: 'Originele editorial template',
    preview: '/previews/editorial.png',
    isModular: false,
  },
  flex: {
    id: 'flex',
    name: 'Flex (Legacy)',
    description: 'Flexibele template',
    preview: '/previews/flex.png',
    isModular: false,
  },
};

// List of modular template IDs
const MODULAR_TEMPLATES = ['classic', 'bold', 'minimal', 'magazine', 'cards'];

// Template renderer - picks the right template based on site.template_id
interface SiteRendererProps {
  site: Site;
}

export function SiteRenderer({ site }: SiteRendererProps) {
  const templateId = site.template_id;

  console.log('🔍 SiteRenderer templateId:', templateId);

  // Check if it's a modular template
  if (MODULAR_TEMPLATES.includes(templateId)) {
    console.log('✅ Using new TemplateRenderer for:', templateId);
    return <TemplateRenderer site={site} />;
  }

  // Legacy templates
  switch (templateId) {
    case 'modern':
      console.log('⚠️ Legacy: Rendering TemplateModern');
      return <TemplateModern site={site} />;
    case 'editorial':
      console.log('⚠️ Legacy: Rendering TemplateEditorial');
      return <TemplateEditorial site={site} />;
    case 'warm':
      console.log('⚠️ Legacy: Rendering TemplateWarm');
      return <TemplateWarm site={site} />;
    case 'flex':
      // Flex wordt nu classic met modular system
      console.log('⚠️ Migrating flex to classic');
      return <TemplateRenderer site={{ ...site, template_id: 'classic' }} />;
    default:
      // Default to modular classic
      console.log('❓ Unknown template, using TemplateRenderer with classic. templateId was:', templateId);
      return <TemplateRenderer site={{ ...site, template_id: 'classic' }} />;
  }
}

// Helper to get template metadata by ID
export function getTemplateById(id: string) {
  return TEMPLATES[id as keyof typeof TEMPLATES] || TEMPLATES.classic;
}

// Helper to check if template supports sections customization
export function isModularTemplate(templateId: string): boolean {
  return MODULAR_TEMPLATES.includes(templateId);
}

// Available section types for the modular system
export const SECTION_TYPES = {
  hero: {
    name: 'Hero',
    styles: ['split', 'centered', 'fullwidth', 'minimal'],
    required: true,
  },
  stats: {
    name: 'Statistieken',
    styles: ['grid', 'inline', 'cards'],
    required: false,
  },
  diensten: {
    name: 'Diensten',
    styles: ['cards', 'numbered', 'list', 'grid'],
    required: true,
  },
  over: {
    name: 'Over Mij',
    styles: ['split', 'centered', 'timeline'],
    required: true,
  },
  quote: {
    name: 'Quote',
    styles: ['banner', 'minimal', 'dark'],
    required: false,
  },
  testimonials: {
    name: 'Testimonials',
    styles: ['cards', 'carousel', 'single'],
    required: false,
  },
  faq: {
    name: 'FAQ',
    styles: ['accordion', 'grid', 'simple'],
    required: false,
  },
  cta: {
    name: 'Call to Action',
    styles: ['banner', 'card', 'minimal'],
    required: false,
  },
  contact: {
    name: 'Contact',
    styles: ['split', 'centered', 'form-only'],
    required: true,
  },
};
