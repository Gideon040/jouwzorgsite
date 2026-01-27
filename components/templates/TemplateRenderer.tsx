// components/templates/TemplateRenderer.tsx
// De kern van het systeem - combineert theme + sections dynamisch

'use client';

import { useEffect } from 'react';
import { Site } from '@/types';
import { getBeroepLabel } from '@/constants';
import { getTheme, getPalette, getFontPairing } from './themes';
import {
  SectionConfig,
  HeroSection,
  StatsSection,
  DienstenSection,
  OverSection,
  QuoteSection,
  TestimonialsSection,
  FaqSection,
  CtaSection,
  ContactSection,
  HeaderSection,
  FooterSection,
} from './sections';

interface TemplateRendererProps {
  site: Site;
}

// Default section configuratie per theme
const THEME_DEFAULT_SECTIONS: Record<string, SectionConfig[]> = {
  classic: [
    { type: 'hero', style: 'split' },
    { type: 'stats', style: 'inline' },
    { type: 'diensten', style: 'cards' },
    { type: 'quote', style: 'banner' },
    { type: 'over', style: 'split' },
    { type: 'testimonials', style: 'cards' },
    { type: 'faq', style: 'accordion' },
    { type: 'cta', style: 'card' },
    { type: 'contact', style: 'split' },
    { type: 'footer' },
  ],
  bold: [
    { type: 'hero', style: 'fullwidth' },
    { type: 'stats', style: 'cards' },
    { type: 'diensten', style: 'cards' },
    { type: 'quote', style: 'dark' },
    { type: 'over', style: 'timeline' },
    { type: 'testimonials', style: 'carousel' },
    { type: 'faq', style: 'grid' },
    { type: 'cta', style: 'banner' },
    { type: 'contact', style: 'split' },
    { type: 'footer' },
  ],
  minimal: [
    { type: 'hero', style: 'minimal' },
    { type: 'diensten', style: 'list' },
    { type: 'quote', style: 'minimal' },
    { type: 'over', style: 'centered' },
    { type: 'testimonials', style: 'single' },
    { type: 'faq', style: 'simple' },
    { type: 'cta', style: 'minimal' },
    { type: 'contact', style: 'centered' },
    { type: 'footer' },
  ],
  magazine: [
    { type: 'hero', style: 'split' },
    { type: 'stats', style: 'grid' },
    { type: 'diensten', style: 'numbered' },
    { type: 'quote', style: 'minimal' },
    { type: 'over', style: 'timeline' },
    { type: 'testimonials', style: 'cards' },
    { type: 'faq', style: 'grid' },
    { type: 'cta', style: 'card' },
    { type: 'contact', style: 'split' },
    { type: 'footer' },
  ],
  cards: [
    { type: 'hero', style: 'centered' },
    { type: 'stats', style: 'cards' },
    { type: 'diensten', style: 'grid' },
    { type: 'over', style: 'split' },
    { type: 'quote', style: 'minimal' },
    { type: 'testimonials', style: 'carousel' },
    { type: 'faq', style: 'accordion' },
    { type: 'contact', style: 'form-only' },
    { type: 'footer' },
  ],
};

// Global styles voor fonts en animaties
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Manrope:wght@300;400;500;600;700;800&family=Nunito:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Lato:wght@300;400;700&display=swap');
  
  .reveal { opacity: 0; transition: opacity 0.8s ease, transform 0.8s ease; }
  .reveal-up { transform: translateY(40px); }
  .reveal-left { transform: translateX(-40px); }
  .reveal-right { transform: translateX(40px); }
  .reveal.revealed { opacity: 1; transform: translateY(0) translateX(0); }
  .reveal-delay-1 { transition-delay: 0.1s; }
  .reveal-delay-2 { transition-delay: 0.2s; }
  .reveal-delay-3 { transition-delay: 0.3s; }
`;

export function TemplateRenderer({ site }: TemplateRendererProps) {
  const { content, beroep, theme: siteTheme, generated_content, template_id } = site;
  
  // Get theme configuration
  const themeId = template_id || 'classic';
  const theme = getTheme(themeId);
  
  // Get color palette
  const paletteId = (siteTheme as any)?.palette || 'sage';
  const palette = getPalette(paletteId);
  
  // Get font pairing (optional override)
  const fontPairingId = (siteTheme as any)?.fontPairing;
  if (fontPairingId) {
    const fonts = getFontPairing(fontPairingId);
    theme.fonts = fonts;
  }
  
  // Get sections - from generated_content, siteTheme, or defaults
  const sections: SectionConfig[] = 
    (generated_content?.sections as SectionConfig[]) ||
    (Array.isArray((siteTheme as any)?.sections) ? (siteTheme as any).sections : null) ||
    THEME_DEFAULT_SECTIONS[themeId] ||
    THEME_DEFAULT_SECTIONS.classic;
  
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

  // Render section based on type
  const renderSection = (section: SectionConfig, index: number) => {
    const key = `${section.type}-${index}`;
    
    switch (section.type) {
      case 'hero':
        return <HeroSection key={key} {...sectionProps} style={(section.style as any) || 'split'} />;
      case 'stats':
        return <StatsSection key={key} {...sectionProps} style={(section.style as any) || 'grid'} />;
      case 'diensten':
        return <DienstenSection key={key} {...sectionProps} style={(section.style as any) || 'cards'} />;
      case 'over':
        return <OverSection key={key} {...sectionProps} style={(section.style as any) || 'split'} />;
      case 'quote':
        return <QuoteSection key={key} {...sectionProps} style={(section.style as any) || 'banner'} />;
      case 'testimonials':
        return <TestimonialsSection key={key} {...sectionProps} style={(section.style as any) || 'cards'} />;
      case 'faq':
        return <FaqSection key={key} {...sectionProps} style={(section.style as any) || 'accordion'} />;
      case 'cta':
        return <CtaSection key={key} {...sectionProps} style={(section.style as any) || 'banner'} />;
      case 'contact':
        return <ContactSection key={key} {...sectionProps} style={(section.style as any) || 'split'} />;
      case 'footer':
        return <FooterSection key={key} {...sectionProps} />;
      default:
        return null;
    }
  };

  return (
    <div 
      className="min-h-screen"
      style={{ 
        backgroundColor: theme.colors.background,
        fontFamily: theme.fonts.body,
      }}
    >
      <style jsx global>{GLOBAL_STYLES}</style>
      
      {/* Header - altijd bovenaan */}
      <HeaderSection {...sectionProps} />
      
      {/* Dynamic sections */}
      <main>
        {sections
          .filter(s => s.type !== 'footer') // Footer apart renderen
          .map((section, index) => renderSection(section, index))}
      </main>
      
      {/* Footer - altijd onderaan */}
      <FooterSection {...sectionProps} />
    </div>
  );
}

export default TemplateRenderer;
