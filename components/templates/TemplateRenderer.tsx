// components/templates/TemplateRenderer.tsx
// De kern van het systeem - combineert theme + sections dynamisch
// UPDATED: Nu met support voor mixed section styles van edge function

'use client';

import { useEffect } from 'react';
import { Site } from '@/types';
import { getBeroepLabel } from '@/constants';
import { getTheme, getPalette, getFontPairing, getTemplatePreset } from './themes';

// Import all sections
import {
  HeaderSection,
  HeroSection,
  StatsSection,
  DienstenSection,
  OverSection,
  CredentialsSection,
  VoorWieSection,
  WerkwijzeSection,
  QuoteSection,
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
// TEMPLATE SECTION CONFIGURATIONS (FALLBACKS)
// ============================================
// Alleen gebruikt als edge function GEEN sections meestuurt

const TEMPLATE_SECTIONS: Record<string, SectionConfig[]> = {
  // Editorial - Klassiek & Warm
  editorial: [
    { type: 'hero', style: 'editorial' },
    { type: 'diensten', style: 'editorial' },
    { type: 'over', style: 'editorial' },
    { type: 'credentials', style: 'editorial' },
    { type: 'voorwie', style: 'editorial' },
    { type: 'quote', style: 'minimal' },
    { type: 'werkwijze', style: 'editorial' },
    { type: 'testimonials', style: 'editorial' },
    { type: 'faq', style: 'editorial' },
    { type: 'contact', style: 'editorial' },
    { type: 'footer', style: 'editorial' },
  ],
  
  // ProActief - Modern & Energiek
  proactief: [
    { type: 'hero', style: 'proactief' },
    { type: 'diensten', style: 'proactief' },
    { type: 'over', style: 'proactief' },
    { type: 'credentials', style: 'proactief' },
    { type: 'voorwie', style: 'proactief' },
    { type: 'quote', style: 'banner' },
    { type: 'werkwijze', style: 'proactief' },
    { type: 'testimonials', style: 'proactief' },
    { type: 'faq', style: 'proactief' },
    { type: 'contact', style: 'proactief' },
    { type: 'footer', style: 'proactief' },
  ],
  
  // Portfolio - Elegant & Sophisticated
  portfolio: [
    { type: 'hero', style: 'portfolio' },
    { type: 'diensten', style: 'portfolio' },
    { type: 'over', style: 'portfolio' },
    { type: 'credentials', style: 'portfolio' },
    { type: 'voorwie', style: 'portfolio' },
    { type: 'quote', style: 'dark' },
    { type: 'werkwijze', style: 'portfolio' },
    { type: 'testimonials', style: 'portfolio' },
    { type: 'faq', style: 'portfolio' },
    { type: 'contact', style: 'portfolio' },
    { type: 'footer', style: 'portfolio' },
  ],
  
  // Mindoor - Warm & Organisch
  mindoor: [
    { type: 'hero', style: 'mindoor' },
    { type: 'diensten', style: 'mindoor' },
    { type: 'over', style: 'mindoor' },
    { type: 'credentials', style: 'mindoor' },
    { type: 'voorwie', style: 'mindoor' },
    { type: 'quote', style: 'minimal' },
    { type: 'werkwijze', style: 'mindoor' },
    { type: 'testimonials', style: 'mindoor' },
    { type: 'faq', style: 'mindoor' },
    { type: 'contact', style: 'mindoor' },
    { type: 'footer', style: 'mindoor' },
  ],
  
  // ============================================
  // LEGACY TEMPLATES (backwards compatibility)
  // ============================================
  classic: [
    { type: 'hero', style: 'split' },
    { type: 'diensten', style: 'cards' },
    { type: 'over', style: 'split' },
    { type: 'credentials', style: 'full' },
    { type: 'voorwie', style: 'cards' },
    { type: 'quote', style: 'minimal' },
    { type: 'werkwijze', style: 'steps' },
    { type: 'testimonials', style: 'cards' },
    { type: 'faq', style: 'accordion' },
    { type: 'contact', style: 'split' },
    { type: 'footer', style: 'simple' },
  ],
  bold: [
    { type: 'hero', style: 'fullwidth' },
    { type: 'diensten', style: 'cards' },
    { type: 'over', style: 'timeline' },
    { type: 'credentials', style: 'cards' },
    { type: 'voorwie', style: 'cards' },
    { type: 'quote', style: 'dark' },
    { type: 'werkwijze', style: 'cards' },
    { type: 'testimonials', style: 'carousel' },
    { type: 'faq', style: 'grid' },
    { type: 'contact', style: 'split' },
    { type: 'footer', style: 'detailed' },
  ],
  minimal: [
    { type: 'hero', style: 'minimal' },
    { type: 'diensten', style: 'list' },
    { type: 'over', style: 'centered' },
    { type: 'credentials', style: 'compact' },
    { type: 'voorwie', style: 'list' },
    { type: 'quote', style: 'minimal' },
    { type: 'werkwijze', style: 'timeline' },
    { type: 'testimonials', style: 'single' },
    { type: 'faq', style: 'simple' },
    { type: 'contact', style: 'centered' },
    { type: 'footer', style: 'minimal' },
  ],
  magazine: [
    { type: 'hero', style: 'split' },
    { type: 'diensten', style: 'numbered' },
    { type: 'over', style: 'timeline' },
    { type: 'credentials', style: 'full' },
    { type: 'voorwie', style: 'grid' },
    { type: 'quote', style: 'banner' },
    { type: 'werkwijze', style: 'editorial' },
    { type: 'testimonials', style: 'cards' },
    { type: 'faq', style: 'grid' },
    { type: 'contact', style: 'split' },
    { type: 'footer', style: 'detailed' },
  ],
  cards: [
    { type: 'hero', style: 'centered' },
    { type: 'diensten', style: 'grid' },
    { type: 'over', style: 'split' },
    { type: 'credentials', style: 'cards' },
    { type: 'voorwie', style: 'cards' },
    { type: 'quote', style: 'minimal' },
    { type: 'werkwijze', style: 'cards' },
    { type: 'testimonials', style: 'carousel' },
    { type: 'faq', style: 'accordion' },
    { type: 'contact', style: 'form-only' },
    { type: 'footer', style: 'simple' },
  ],
};

// ============================================
// GLOBAL STYLES
// ============================================

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
  
  // DEBUG: Log section styles from edge function
  if (generated_content?.sections) {
    console.log('🎨 Section styles from edge function:');
    (generated_content.sections as SectionConfig[]).forEach(s => {
      console.log(`   ${s.type}: ${s.style}`);
    });
  }
  
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

  // ============================================
  // FIXED: Get the style for a section
  // Priority: section.style from edge function > templateStyle > 'editorial'
  // ============================================
  const getSectionStyle = (section: SectionConfig) => {
    // Als de sectie een expliciete style heeft (van edge function), gebruik die
    if (section.style) {
      return section.style;
    }
    // Anders fallback naar template style voor main templates
    if (isMainTemplate) {
      return templateStyle;
    }
    // Default
    return 'editorial';
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
      case 'quote':
        return <QuoteSection key={key} {...sectionProps} style={style as any} />;
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

  // Get header style - use section style if provided, otherwise template style
  const headerSection = sections.find(s => s.type === 'header');
  const headerStyle = headerSection?.style || (isMainTemplate ? templateStyle : 'solid');
  
  // Get footer style - use section style if provided, otherwise template style
  const footerSection = sections.find(s => s.type === 'footer');
  const footerStyle = footerSection?.style || (isMainTemplate ? templateStyle : 'simple');

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
        style={headerStyle as any} 
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
        style={footerStyle as any} 
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