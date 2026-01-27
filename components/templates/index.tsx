// components/templates/index.tsx
// Template router - picks the right template based on site.template_id

import { Site } from '@/types';

// Import all templates - New standalone templates
import { TemplateClassic } from './TemplateClassic';
import { TemplateBold } from './TemplateBold';
import { TemplateMinimal } from './TemplateMinimal';
import { TemplateMagazine } from './TemplateMagazine';
import { TemplateCards } from './TemplateCards';

// Legacy templates
import { TemplateWarm } from './TemplateWarm';
import { TemplateModern } from './TemplateModern';
import { TemplateEditorial } from './TemplateEditorial';

// Export all templates
export { 
  TemplateClassic,
  TemplateBold,
  TemplateMinimal,
  TemplateMagazine,
  TemplateCards,
  // Legacy
  TemplateWarm, 
  TemplateModern, 
  TemplateEditorial,
};

// Template metadata for display/selection
export const TEMPLATES = {
  classic: {
    id: 'classic',
    name: 'Klassiek & Warm',
    description: 'Tijdloos design met warme uitstraling',
    preview: '/previews/classic.png',
    forPersonality: ['warm'],
    forWorkfield: ['thuiszorg', 'ouderenzorg', 'kraamzorg'],
  },
  bold: {
    id: 'bold',
    name: 'Bold & Professioneel',
    description: 'Donker, impactvol, statement',
    preview: '/previews/bold.png',
    forPersonality: ['zakelijk'],
    forWorkfield: ['ziekenhuis', 'IC', 'specialist'],
  },
  minimal: {
    id: 'minimal',
    name: 'Minimaal & Rustig',
    description: 'Zen, veel witruimte, sereen',
    preview: '/previews/minimal.png',
    forPersonality: ['rustig'],
    forWorkfield: ['ggz', 'coaching', 'therapie'],
  },
  magazine: {
    id: 'magazine',
    name: 'Magazine & Premium',
    description: 'Editorial, thought-leader stijl',
    preview: '/previews/magazine.png',
    forPersonality: ['zakelijk'],
    forWorkfield: ['consultant', 'adviseur', 'expert'],
  },
  cards: {
    id: 'cards',
    name: 'Modern & Fresh',
    description: 'App-like, bento grid, jong',
    preview: '/previews/cards.png',
    forPersonality: ['energiek'],
    forWorkfield: ['starter', 'flexibel'],
  },
  // Legacy templates
  warm: {
    id: 'warm',
    name: 'Warm (Legacy)',
    description: 'Originele warme template',
    preview: '/previews/warm.png',
    forPersonality: ['warm'],
    forWorkfield: ['thuiszorg'],
  },
  modern: {
    id: 'modern',
    name: 'Modern (Legacy)',
    description: 'Originele moderne template',
    preview: '/previews/modern.png',
    forPersonality: ['zakelijk'],
    forWorkfield: ['specialist'],
  },
  editorial: {
    id: 'editorial',
    name: 'Editorial (Legacy)',
    description: 'Originele editorial template met varianten',
    preview: '/previews/editorial.png',
    forPersonality: ['warm', 'zakelijk'],
    forWorkfield: ['algemeen'],
  },
};

// Template renderer - picks the right template based on site.template_id
interface SiteRendererProps {
  site: Site;
}

export function SiteRenderer({ site }: SiteRendererProps) {
  const templateId = site.template_id;

  console.log('🔍 SiteRenderer templateId:', templateId);

  // New standalone templates (primary)
  switch (templateId) {
    case 'classic':
      console.log('✅ Rendering TemplateClassic');
      return <TemplateClassic site={site} />;
    case 'bold':
      console.log('✅ Rendering TemplateBold');
      return <TemplateBold site={site} />;
    case 'minimal':
      console.log('✅ Rendering TemplateMinimal');
      return <TemplateMinimal site={site} />;
    case 'magazine':
      console.log('✅ Rendering TemplateMagazine');
      return <TemplateMagazine site={site} />;
    case 'cards':
      console.log('✅ Rendering TemplateCards');
      return <TemplateCards site={site} />;
    
    // Legacy templates (for backward compatibility)
    case 'modern':
      console.log('⚠️ Legacy: Rendering TemplateModern');
      return <TemplateModern site={site} />;
    case 'editorial':
      console.log('⚠️ Legacy: Rendering TemplateEditorial');
      return <TemplateEditorial site={site} />;
    case 'warm':
      console.log('⚠️ Legacy: Rendering TemplateWarm');
      return <TemplateWarm site={site} />;
    
    // Default fallback
    default:
      console.log('❌ Unknown template, falling back to TemplateClassic. templateId was:', templateId);
      return <TemplateClassic site={site} />;
  }
}

// Helper to get template metadata by ID
export function getTemplateById(id: string) {
  return TEMPLATES[id as keyof typeof TEMPLATES] || TEMPLATES.classic;
}
