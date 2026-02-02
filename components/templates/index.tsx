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

// ============================================
// TEMPLATE METADATA
// ============================================

export const TEMPLATES = {
  // ============================================
  // NEW 4 MAIN TEMPLATES
  // ============================================
  editorial: {
    id: 'editorial',
    name: 'Editorial',
    description: 'Klassiek & warm met serif fonts en subtiele kleuren',
    preview: '/previews/editorial.png',
    forPersonality: ['warm', 'professioneel'],
    forWorkfield: ['thuiszorg', 'ouderenzorg', 'kraamzorg', 'verpleegkundige'],
    isModular: true,
    palette: 'editorial',
    fonts: 'editorial',
  },
  proactief: {
    id: 'proactief',
    name: 'ProActief',
    description: 'Modern & energiek met gradients en dynamische vormen',
    preview: '/previews/proactief.png',
    forPersonality: ['energiek', 'dynamisch'],
    forWorkfield: ['fysiotherapie', 'sport', 'revalidatie', 'starter'],
    isModular: true,
    palette: 'proactief',
    fonts: 'proactief',
  },
  portfolio: {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Elegant & sophisticated met donkergroene accenten',
    preview: '/previews/portfolio.png',
    forPersonality: ['zakelijk', 'premium'],
    forWorkfield: ['specialist', 'consultant', 'adviseur', 'expert'],
    isModular: true,
    palette: 'portfolio',
    fonts: 'portfolio',
  },
  mindoor: {
    id: 'mindoor',
    name: 'Mindoor',
    description: 'Warm & organisch met zachte vormen en coral accenten',
    preview: '/previews/mindoor.png',
    forPersonality: ['warm', 'vriendelijk'],
    forWorkfield: ['ggz', 'coaching', 'therapie', 'welzijn'],
    isModular: true,
    palette: 'mindoor',
    fonts: 'mindoor',
  },

  // ============================================
  // LEGACY MODULAR TEMPLATES (mapped to new)
  // ============================================
  classic: {
    id: 'classic',
    name: 'Klassiek & Warm',
    description: 'Tijdloos design met warme uitstraling',
    preview: '/previews/classic.png',
    forPersonality: ['warm'],
    forWorkfield: ['thuiszorg', 'ouderenzorg', 'kraamzorg'],
    isModular: true,
    mapsTo: 'editorial', // Maps to new template
  },
  bold: {
    id: 'bold',
    name: 'Bold & Professioneel',
    description: 'Donker, impactvol, statement',
    preview: '/previews/bold.png',
    forPersonality: ['zakelijk'],
    forWorkfield: ['ziekenhuis', 'IC', 'specialist'],
    isModular: true,
    mapsTo: 'proactief',
  },
  minimal: {
    id: 'minimal',
    name: 'Minimaal & Rustig',
    description: 'Zen, veel witruimte, sereen',
    preview: '/previews/minimal.png',
    forPersonality: ['rustig'],
    forWorkfield: ['ggz', 'coaching', 'therapie'],
    isModular: true,
    mapsTo: 'editorial',
  },
  magazine: {
    id: 'magazine',
    name: 'Magazine & Premium',
    description: 'Editorial, thought-leader stijl',
    preview: '/previews/magazine.png',
    forPersonality: ['zakelijk'],
    forWorkfield: ['consultant', 'adviseur', 'expert'],
    isModular: true,
    mapsTo: 'portfolio',
  },
  cards: {
    id: 'cards',
    name: 'Modern & Fresh',
    description: 'App-like, bento grid, jong',
    preview: '/previews/cards.png',
    forPersonality: ['energiek'],
    forWorkfield: ['starter', 'flexibel'],
    isModular: true,
    mapsTo: 'proactief',
  },

  // ============================================
  // LEGACY NON-MODULAR TEMPLATES
  // ============================================
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
  flex: {
    id: 'flex',
    name: 'Flex (Legacy)',
    description: 'Flexibele template',
    preview: '/previews/flex.png',
    isModular: false,
  },
};

// ============================================
// TEMPLATE LISTS
// ============================================

// Main 4 templates (recommended)
export const MAIN_TEMPLATES = ['editorial', 'proactief', 'portfolio', 'mindoor'];

// All modular templates
const MODULAR_TEMPLATES = [
  ...MAIN_TEMPLATES,
  'classic', 'bold', 'minimal', 'magazine', 'cards'
];

// ============================================
// SITE RENDERER
// ============================================

interface SiteRendererProps {
  site: Site;
}

export function SiteRenderer({ site }: SiteRendererProps) {
  const templateId = site.template_id;

  console.log('🔍 SiteRenderer templateId:', templateId);

  // Check if it's a main template
  if (MAIN_TEMPLATES.includes(templateId)) {
    console.log('✅ Using TemplateRenderer for main template:', templateId);
    return <TemplateRenderer site={site} />;
  }

  // Check if it's a legacy modular template (map to new)
  if (MODULAR_TEMPLATES.includes(templateId)) {
    const templateMeta = TEMPLATES[templateId as keyof typeof TEMPLATES];
    const mappedTemplate = (templateMeta as any)?.mapsTo || 'editorial';
    console.log(`⚠️ Mapping legacy "${templateId}" to "${mappedTemplate}"`);
    return <TemplateRenderer site={{ ...site, template_id: mappedTemplate }} />;
  }

  // Legacy non-modular templates
  switch (templateId) {
    case 'modern':
      console.log('⚠️ Legacy: Rendering TemplateModern');
      return <TemplateModern site={site} />;
    case 'warm':
      console.log('⚠️ Legacy: Rendering TemplateWarm');
      return <TemplateWarm site={site} />;
    case 'flex':
      console.log('⚠️ Migrating flex to editorial');
      return <TemplateRenderer site={{ ...site, template_id: 'editorial' }} />;
    default:
      // Default to editorial
      console.log('❓ Unknown template, using editorial. templateId was:', templateId);
      return <TemplateRenderer site={{ ...site, template_id: 'editorial' }} />;
  }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

// Get template metadata by ID
export function getTemplateById(id: string) {
  return TEMPLATES[id as keyof typeof TEMPLATES] || TEMPLATES.editorial;
}

// Check if template supports sections customization
export function isModularTemplate(templateId: string): boolean {
  return MODULAR_TEMPLATES.includes(templateId);
}

// Check if it's one of the 4 main templates
export function isMainTemplate(templateId: string): boolean {
  return MAIN_TEMPLATES.includes(templateId);
}

// Get recommended template based on personality/workfield
export function getRecommendedTemplate(personality?: string, workfield?: string): string {
  // Check personality match
  if (personality) {
    for (const [id, meta] of Object.entries(TEMPLATES)) {
      const m = meta as any;
      if (MAIN_TEMPLATES.includes(id) && m.forPersonality?.includes(personality)) {
        return id;
      }
    }
  }
  
  // Check workfield match
  if (workfield) {
    for (const [id, meta] of Object.entries(TEMPLATES)) {
      const m = meta as any;
      if (MAIN_TEMPLATES.includes(id) && m.forWorkfield?.includes(workfield)) {
        return id;
      }
    }
  }
  
  // Default
  return 'editorial';
}

// ============================================
// SECTION TYPES
// ============================================

export const SECTION_TYPES = {
  header: {
    name: 'Header',
    styles: ['editorial', 'proactief', 'portfolio', 'mindoor', 'solid', 'transparent', 'floating'],
    required: true,
  },
  hero: {
    name: 'Hero',
    styles: ['editorial', 'proactief', 'portfolio', 'mindoor', 'split', 'centered', 'fullwidth', 'minimal'],
    required: true,
  },
  stats: {
    name: 'Statistieken',
    styles: ['editorial', 'proactief', 'portfolio', 'mindoor', 'grid', 'inline', 'cards', 'minimal'],
    required: false,
  },
  diensten: {
    name: 'Diensten',
    styles: ['editorial', 'proactief', 'portfolio', 'mindoor', 'cards', 'numbered', 'list', 'grid'],
    required: true,
  },
  over: {
    name: 'Over Mij',
    styles: ['editorial', 'proactief', 'portfolio', 'mindoor', 'split', 'centered', 'timeline'],
    required: true,
  },
  credentials: {
    name: 'Kwalificaties',
    styles: ['editorial', 'proactief', 'portfolio', 'mindoor', 'full', 'compact', 'cards', 'badges'],
    required: false,
  },
  voorwie: {
    name: 'Voor Wie',
    styles: ['editorial', 'proactief', 'portfolio', 'mindoor', 'cards', 'grid', 'list'],
    required: false,
  },
  werkwijze: {
    name: 'Werkwijze',
    styles: ['editorial', 'proactief', 'portfolio', 'mindoor', 'steps', 'timeline', 'cards', 'bento'],
    required: false,
  },
  testimonials: {
    name: 'Testimonials',
    styles: ['editorial', 'proactief', 'portfolio', 'mindoor', 'cards', 'carousel', 'single'],
    required: false,
  },
  faq: {
    name: 'FAQ',
    styles: ['editorial', 'proactief', 'portfolio', 'mindoor', 'accordion', 'grid', 'simple'],
    required: false,
  },
  cta: {
    name: 'Call to Action',
    styles: ['editorial', 'proactief', 'portfolio', 'mindoor', 'banner', 'card', 'minimal'],
    required: false,
  },
  contact: {
    name: 'Contact',
    styles: ['editorial', 'proactief', 'portfolio', 'mindoor', 'split', 'centered', 'form-only'],
    required: true,
  },
  footer: {
    name: 'Footer',
    styles: ['editorial', 'proactief', 'portfolio', 'mindoor', 'simple', 'detailed', 'minimal'],
    required: true,
  },
};
