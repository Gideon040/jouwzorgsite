// components/templates/TemplateRenderer.tsx
// De kern van het systeem - combineert theme + sections dynamisch

'use client';

import { useEffect } from 'react';
import { Site } from '@/types';
import { getBeroepLabel } from '@/constants';
import { getTheme, getPalette, getFontPairing, getTemplatePreset } from './themes';

// Import all sections
// NOTE: Adjust this path based on where you place the sections folder:
// - If in components/sections/: use '@/components/sections'
// - If in components/templates/sections/: use './sections'
import {
  HeaderSection,
  HeroSection,
  StatsSection,
  DienstenSection,
  OverSection,
  CredentialsSection,
  VoorWieSection,
  WerkwijzeSection,
  TestimonialsSection,
  FaqSection,
  CtaSection,
  ContactSection,
  FooterSection,
  WhatsAppButton,
  THEME_DEFAULT_STYLES,
} from './sections';

import type { SectionConfig } from './sections/types';

interface TemplateRendererProps {
  site: Site;
}

// ============================================
// TEMPLATE SECTION CONFIGURATIONS
// ============================================
// Elke template heeft een vaste sectie-volgorde met bijbehorende stijlen

const TEMPLATE_SECTIONS: Record<string, SectionConfig[]> = {
  // Editorial - Klassiek & Warm
  editorial: [
    { type: 'hero', style: 'editorial' },
    { type: 'stats', style: 'editorial' },
    { type: 'diensten', style: 'editorial' },
    { type: 'over', style: 'editorial' },
    { type: 'credentials', style: 'editorial' },
    { type: 'voorwie', style: 'editorial' },
    { type: 'werkwijze', style: 'editorial' },
    { type: 'testimonials', style: 'editorial' },
    { type: 'faq', style: 'editorial' },
    { type: 'cta', style: 'editorial' },
    { type: 'contact', style: 'editorial' },
    { type: 'footer', style: 'editorial' },
  ],
  
  // ProActief - Modern & Energiek
  proactief: [
    { type: 'hero', style: 'proactief' },
    { type: 'stats', style: 'proactief' },
    { type: 'diensten', style: 'proactief' },
    { type: 'over', style: 'proactief' },
    { type: 'credentials', style: 'proactief' },
    { type: 'voorwie', style: 'proactief' },
    { type: 'werkwijze', style: 'proactief' },
    { type: 'testimonials', style: 'proactief' },
    { type: 'faq', style: 'proactief' },
    { type: 'cta', style: 'proactief' },
    { type: 'contact', style: 'proactief' },
    { type: 'footer', style: 'proactief' },
  ],
  
  // Portfolio - Elegant & Sophisticated
  portfolio: [
    { type: 'hero', style: 'portfolio' },
    { type: 'stats', style: 'portfolio' },
    { type: 'diensten', style: 'portfolio' },
    { type: 'over', style: 'portfolio' },
    { type: 'credentials', style: 'portfolio' },
    { type: 'voorwie', style: 'portfolio' },
    { type: 'werkwijze', style: 'portfolio' },
    { type: 'testimonials', style: 'portfolio' },
    { type: 'faq', style: 'portfolio' },
    { type: 'cta', style: 'portfolio' },
    { type: 'contact', style: 'portfolio' },
    { type: 'footer', style: 'portfolio' },
  ],
  
  // Mindoor - Warm & Organisch
  mindoor: [
    { type: 'hero', style: 'mindoor' },
    { type: 'stats', style: 'mindoor' },
    { type: 'diensten', style: 'mindoor' },
    { type: 'over', style: 'mindoor' },
    { type: 'credentials', style: 'mindoor' },
    { type: 'voorwie', style: 'mindoor' },
    { type: 'werkwijze', style: 'mindoor' },
    { type: 'testimonials', style: 'mindoor' },
    { type: 'faq', style: 'mindoor' },
    { type: 'cta', style: 'mindoor' },
    { type: 'contact', style: 'mindoor' },
    { type: 'footer', style: 'mindoor' },
  ],
  
  // ============================================
  // LEGACY TEMPLATES (backwards compatibility)
  // ============================================
  classic: [
    { type: 'hero', style: 'split' },
    { type: 'stats', style: 'inline' },
    { type: 'diensten', style: 'cards' },
    { type: 'over', style: 'split' },
    { type: 'credentials', style: 'full' },
    { type: 'testimonials', style: 'cards' },
    { type: 'faq', style: 'accordion' },
    { type: 'cta', style: 'card' },
    { type: 'contact', style: 'split' },
    { type: 'footer', style: 'simple' },
  ],
  bold: [
    { type: 'hero', style: 'fullwidth' },
    { type: 'stats', style: 'cards' },
    { type: 'diensten', style: 'cards' },
    { type: 'over', style: 'timeline' },
    { type: 'credentials', style: 'cards' },
    { type: 'testimonials', style: 'carousel' },
    { type: 'faq', style: 'grid' },
    { type: 'cta', style: 'banner' },
    { type: 'contact', style: 'split' },
    { type: 'footer', style: 'detailed' },
  ],
  minimal: [
    { type: 'hero', style: 'minimal' },
    { type: 'diensten', style: 'list' },
    { type: 'over', style: 'centered' },
    { type: 'credentials', style: 'compact' },
    { type: 'testimonials', style: 'single' },
    { type: 'faq', style: 'simple' },
    { type: 'cta', style: 'minimal' },
    { type: 'contact', style: 'centered' },
    { type: 'footer', style: 'minimal' },
  ],
  magazine: [
    { type: 'hero', style: 'split' },
    { type: 'stats', style: 'grid' },
    { type: 'diensten', style: 'numbered' },
    { type: 'over', style: 'timeline' },
    { type: 'credentials', style: 'full' },
    { type: 'testimonials', style: 'cards' },
    { type: 'faq', style: 'grid' },
    { type: 'cta', style: 'card' },
    { type: 'contact', style: 'split' },
    { type: 'footer', style: 'detailed' },
  ],
  cards: [
    { type: 'hero', style: 'centered' },
    { type: 'stats', style: 'cards' },
    { type: 'diensten', style: 'grid' },
    { type: 'over', style: 'split' },
    { type: 'credentials', style: 'cards' },
    { type: 'testimonials', style: 'carousel' },
    { type: 'faq', style: 'accordion' },
    { type: 'contact', style: 'form-only' },
    { type: 'footer', style: 'simple' },
  ],
};

// ============================================
// GLOBAL STYLES
// ============================================
// Includes all fonts needed for 4 templates

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Manrope:wght@300;400;500;600;700;800&family=Nunito:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Lato:wght@300;400;700&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&display=swap');
  
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
  
  /* Scroll reveal animations */
  .reveal { opacity: 0; transition: opacity 0.8s ease, transform 0.8s ease; }
  .reveal-up { transform: translateY(40px); }
  .reveal-left { transform: translateX(-40px); }
  .reveal-right { transform: translateX(40px); }
  .reveal.revealed { opacity: 1; transform: translateY(0) translateX(0); }
  .reveal-delay-1 { transition-delay: 0.1s; }
  .reveal-delay-2 { transition-delay: 0.2s; }
  .reveal-delay-3 { transition-delay: 0.3s; }
  .reveal-delay-4 { transition-delay: 0.4s; }
  
  /* Smooth scroll */
  html { scroll-behavior: smooth; }
  
  /* Custom scrollbar for portfolio/mindoor themes */
  .theme-portfolio::-webkit-scrollbar,
  .theme-mindoor::-webkit-scrollbar { width: 8px; }
  .theme-portfolio::-webkit-scrollbar-track { background: #ebe7df; }
  .theme-portfolio::-webkit-scrollbar-thumb { background: #1a3a2f; border-radius: 4px; }
  .theme-mindoor::-webkit-scrollbar-track { background: #f5f0e8; }
  .theme-mindoor::-webkit-scrollbar-thumb { background: #5a7c5a; border-radius: 4px; }
`;

// ============================================
// MAIN COMPONENT
// ============================================

export function TemplateRenderer({ site }: TemplateRendererProps) {
  const { content, beroep, theme: siteTheme, generated_content, template_id } = site;
  
  // Determine template style
  // Priority: template_id > siteTheme.template > 'editorial' (default)
  const templateStyle = template_id || (siteTheme as any)?.template || 'editorial';
  
  // Check if it's one of our 4 main templates
  const isMainTemplate = ['editorial', 'proactief', 'portfolio', 'mindoor'].includes(templateStyle);
  
  // Get theme configuration
  const theme = getTheme(isMainTemplate ? templateStyle : 'classic');
  
  // Get color palette
  // For main templates, use matching palette; otherwise use custom or default
  const paletteId = isMainTemplate 
    ? templateStyle 
    : ((siteTheme as any)?.palette || 'sage');
  const palette = getPalette(paletteId);
  
  // Get font pairing (optional override)
  const fontPairingId = (siteTheme as any)?.fontPairing;
  if (fontPairingId) {
    const fonts = getFontPairing(fontPairingId);
    theme.fonts = fonts;
  }
  
  // Get sections configuration
  // Priority: generated_content.sections > siteTheme.sections > template defaults
  const sections: SectionConfig[] = 
    (generated_content?.sections as SectionConfig[]) ||
    (Array.isArray((siteTheme as any)?.sections) ? (siteTheme as any).sections : null) ||
    TEMPLATE_SECTIONS[templateStyle] ||
    TEMPLATE_SECTIONS.editorial;
  
  // Get beroep label
  const beroepLabel = getBeroepLabel(beroep);
  
  // Setup scroll reveal
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.1, rootMargin: '-50px' });
    
    revealElements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Shared props for all sections
  const sectionProps = {
    theme,
    palette,
    content,
    generated: generated_content,
    beroepLabel,
  };

  // Get the style for a section
  // For main templates, use template style; otherwise use section-specific style
  const getSectionStyle = (section: SectionConfig) => {
    if (isMainTemplate) {
      return templateStyle;
    }
    return section.style || 'editorial';
  };

  // Render section based on type
  const renderSection = (section: SectionConfig, index: number) => {
    const key = `${section.type}-${index}`;
    const style = getSectionStyle(section);
    
    switch (section.type) {
      case 'hero':
        return <HeroSection key={key} {...sectionProps} style={style as any} />;
      case 'stats':
        return <StatsSection key={key} {...sectionProps} style={style as any} />;
      case 'diensten':
        return <DienstenSection key={key} {...sectionProps} style={style as any} />;
      case 'over':
        return <OverSection key={key} {...sectionProps} style={style as any} />;
      case 'credentials':
        return <CredentialsSection key={key} {...sectionProps} style={style as any} />;
      case 'voorwie':
        return <VoorWieSection key={key} {...sectionProps} style={style as any} />;
      case 'werkwijze':
        return <WerkwijzeSection key={key} {...sectionProps} style={style as any} />;
      case 'testimonials':
        return <TestimonialsSection key={key} {...sectionProps} style={style as any} />;
      case 'faq':
        return <FaqSection key={key} {...sectionProps} style={style as any} />;
      case 'cta':
        return <CtaSection key={key} {...sectionProps} style={style as any} />;
      case 'contact':
        return <ContactSection key={key} {...sectionProps} style={style as any} />;
      case 'footer':
        return <FooterSection key={key} {...sectionProps} style={style as any} />;
      default:
        console.warn(`Unknown section type: ${section.type}`);
        return null;
    }
  };

  return (
    <div 
      className={`min-h-screen theme-${templateStyle}`}
      style={{ 
        backgroundColor: theme.colors.background,
        fontFamily: theme.fonts.body,
      }}
    >
      <style jsx global>{GLOBAL_STYLES}</style>
      
      {/* Header - altijd bovenaan */}
      <HeaderSection 
        {...sectionProps} 
        style={isMainTemplate ? templateStyle as any : 'solid'} 
      />
      
      {/* Dynamic sections */}
      <main>
        {sections
          .filter(s => s.type !== 'footer' && s.type !== 'header')
          .map((section, index) => renderSection(section, index))}
      </main>
      
      {/* Footer - altijd onderaan */}
      <FooterSection 
        {...sectionProps} 
        style={isMainTemplate ? templateStyle as any : 'simple'} 
      />
      
      {/* WhatsApp Button (optional) */}
      {(content as any).telefoon && (
        <WhatsAppButton 
          telefoon={(content as any).telefoon} 
          naam={content.naam}
          palette={palette}
        />
      )}
    </div>
  );
}

export default TemplateRenderer;
