// components/templates/index.tsx
// Template router - picks the right template based on site.template_id

import { Site } from '@/types';

// Import all templates
import { TemplateWarm } from './TemplateWarm';
import { TemplateModern } from './TemplateModern';
import { TemplateEditorial } from './TemplateEditorial';
import { TemplateFlex } from './TemplateFlex';

// Export all templates
export { 
  TemplateWarm, 
  TemplateModern, 
  TemplateEditorial,
  TemplateFlex,
};

// Template renderer - picks the right template based on site.template_id
interface SiteRendererProps {
  site: Site;
}

export function SiteRenderer({ site }: SiteRendererProps) {
  const templateId = site.template_id;
  
  console.log('🔍 SiteRenderer templateId:', templateId);
  console.log('🔍 site.generated_content:', site.generated_content);
  console.log('🔍 site.theme:', site.theme);

  switch (templateId) {
    case 'flex':
      console.log('✅ Matched flex - rendering TemplateFlex');
      return <TemplateFlex site={site} />;
    
    case 'modern':
      console.log('⚠️ Matched modern - rendering TemplateModern');
      return <TemplateModern site={site} />;
    
    case 'editorial':
      console.log('⚠️ Matched editorial - rendering TemplateEditorial');
      return <TemplateEditorial site={site} />;
    
    case 'warm':
      console.log('⚠️ Matched warm - rendering TemplateWarm');
      return <TemplateWarm site={site} />;
    
    default:
      console.log('❌ No match, falling back to TemplateWarm. templateId was:', templateId);
      return <TemplateWarm site={site} />;
  }
}
