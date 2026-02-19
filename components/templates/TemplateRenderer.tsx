// components/templates/TemplateRenderer.tsx
// v3: Color Story System — palette overschrijft achtergrondkleuren
// v3.1: TrustWidget integratie
//
// CHANGELOG v3.1:
// - TrustWidget toegevoegd naast WhatsAppButton
// - Widget haalt data op via /api/widget/[subdomain]

'use client';

import { useEffect } from 'react';
import { Site } from '@/types';
import { getBeroepLabel } from '@/constants';
import { getTheme, getPalette, getFontPairing, getTemplatePreset } from './themes';

import {
  HeaderSection,
  HeroSection,
  StatsSection,
  DienstenSection,
  OverSection,
  CredentialsSection,
  WerkervaringSection,
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

import { TrustWidget } from './widgets/TrustWidget';

import type { SectionConfig } from './sections/types';

interface TemplateRendererProps {
  site: Site;
}

// ============================================
// CONSTANTS
// ============================================

const MAIN_TEMPLATES = ['editorial', 'proactief', 'portfolio', 'mindoor', 'serene'];

// ============================================
// TEMPLATE SECTION CONFIGURATIONS (FALLBACKS)
// ============================================

export const TEMPLATE_SECTIONS: Record<string, SectionConfig[]> = {
  editorial: [
    { type: 'header', style: 'editorial' },
    { type: 'hero', style: 'editorial' },
    { type: 'diensten', style: 'editorial' },
    { type: 'over', style: 'editorial' },
    { type: 'credentials', style: 'editorial' },
    { type: 'werkervaring', style: 'editorial-1' },
    { type: 'voorwie', style: 'editorial' },
    { type: 'quote', style: 'minimal' },
    { type: 'werkwijze', style: 'editorial' },
    { type: 'testimonials', style: 'editorial' },
    { type: 'faq', style: 'editorial' },
    { type: 'contact', style: 'editorial' },
    { type: 'footer', style: 'editorial' },
  ],
  proactief: [
    { type: 'header', style: 'proactief' },
    { type: 'hero', style: 'proactief' },
    { type: 'diensten', style: 'proactief' },
    { type: 'over', style: 'proactief' },
    { type: 'credentials', style: 'proactief' },
    { type: 'werkervaring', style: 'proactief-1' },
    { type: 'voorwie', style: 'proactief' },
    { type: 'quote', style: 'banner' },
    { type: 'werkwijze', style: 'proactief' },
    { type: 'testimonials', style: 'proactief' },
    { type: 'faq', style: 'proactief' },
    { type: 'contact', style: 'proactief' },
    { type: 'footer', style: 'proactief' },
  ],
  portfolio: [
    { type: 'header', style: 'portfolio' },
    { type: 'hero', style: 'portfolio' },
    { type: 'diensten', style: 'portfolio' },
    { type: 'over', style: 'portfolio' },
    { type: 'credentials', style: 'portfolio' },
    { type: 'werkervaring', style: 'portfolio-1' },
    { type: 'voorwie', style: 'portfolio' },
    { type: 'quote', style: 'dark' },
    { type: 'werkwijze', style: 'portfolio' },
    { type: 'testimonials', style: 'portfolio' },
    { type: 'faq', style: 'portfolio' },
    { type: 'contact', style: 'portfolio' },
    { type: 'footer', style: 'portfolio' },
  ],
  mindoor: [
    { type: 'header', style: 'mindoor' },
    { type: 'hero', style: 'mindoor' },
    { type: 'diensten', style: 'mindoor' },
    { type: 'over', style: 'mindoor' },
    { type: 'credentials', style: 'mindoor' },
    { type: 'werkervaring', style: 'mindoor-1' },
    { type: 'voorwie', style: 'mindoor' },
    { type: 'quote', style: 'minimal' },
    { type: 'werkwijze', style: 'mindoor' },
    { type: 'testimonials', style: 'mindoor' },
    { type: 'faq', style: 'mindoor' },
    { type: 'contact', style: 'mindoor' },
    { type: 'footer', style: 'mindoor' },
  ],
  serene: [
    { type: 'header', style: 'serene' },
    { type: 'hero', style: 'serene' },
    { type: 'diensten', style: 'serene' },
    { type: 'over', style: 'serene' },
    { type: 'credentials', style: 'serene' },
    { type: 'werkervaring', style: 'serene-1' },
    { type: 'voorwie', style: 'serene' },
    { type: 'quote', style: 'minimal' },
    { type: 'werkwijze', style: 'serene' },
    { type: 'testimonials', style: 'serene' },
    { type: 'faq', style: 'serene' },
    { type: 'contact', style: 'serene' },
    { type: 'footer', style: 'serene' },
  ],
  classic: [
    { type: 'header', style: 'editorial' },
    { type: 'hero', style: 'editorial' },
    { type: 'diensten', style: 'editorial' },
    { type: 'over', style: 'editorial' },
    { type: 'credentials', style: 'editorial' },
    { type: 'werkervaring', style: 'editorial-1' },
    { type: 'voorwie', style: 'editorial' },
    { type: 'quote', style: 'minimal' },
    { type: 'werkwijze', style: 'editorial' },
    { type: 'testimonials', style: 'editorial' },
    { type: 'faq', style: 'editorial' },
    { type: 'contact', style: 'editorial' },
    { type: 'footer', style: 'editorial' },
  ],
};

// ============================================
// GLOBAL STYLES
// ============================================

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&family=Mulish:ital,wght@0,200..1000;1,200..1000&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Manrope:wght@300;400;500;600;700;800&family=Nunito:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Lato:wght@300;400;700&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&display=swap');
  
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
  
  /* Scroll reveal */
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
  
  /* Custom scrollbar per theme */
  .theme-portfolio::-webkit-scrollbar,
  .theme-mindoor::-webkit-scrollbar,
  .theme-serene::-webkit-scrollbar { width: 8px; }
  .theme-portfolio::-webkit-scrollbar-track { background: #ebe7df; }
  .theme-portfolio::-webkit-scrollbar-thumb { background: #1a3a2f; border-radius: 4px; }
  .theme-mindoor::-webkit-scrollbar-track { background: #f5f0e8; }
  .theme-mindoor::-webkit-scrollbar-thumb { background: #5a7c5a; border-radius: 4px; }
  .theme-serene::-webkit-scrollbar-track { background: #f9faf8; }
  .theme-serene::-webkit-scrollbar-thumb { background: #3d4a3d; border-radius: 4px; }

  /* Trust Widget animation */
  @keyframes trust-slide-up {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-slide-up {
    animation: trust-slide-up 0.2s ease-out;
  }
`;

// ============================================
// MAIN COMPONENT
// ============================================

export function TemplateRenderer({ site }: TemplateRendererProps) {
  const { content, beroep, theme: siteTheme, generated_content, template_id } = site;

  // ── 1. Template bepalen ─────────────────────────
  const templateStyle = template_id || (siteTheme as any)?.template || 'editorial';
  const isMainTemplate = MAIN_TEMPLATES.includes(templateStyle);

  // ── 2. Theme config (kleuren, fonts, spacing) ───
  const theme = getTheme(isMainTemplate ? templateStyle : 'classic');

  // ── 3. Color palette ────────────────────────────
  const paletteId = (siteTheme as any)?.palette
    || (isMainTemplate ? templateStyle : 'sage');
  const palette = getPalette(paletteId);

  // ── 3b. Palette → Theme override ───────────────
  if ((palette as any).bg) {
    theme.colors.background = (palette as any).bg;
  }
  if ((palette as any).bgAlt) {
    theme.colors.backgroundAlt = (palette as any).bgAlt;
  }
  if ((palette as any).text) {
    theme.colors.text = (palette as any).text;
  }
  if ((palette as any).textMuted) {
    theme.colors.textMuted = (palette as any).textMuted;
  }
  if ((palette as any).border) {
    theme.colors.border = (palette as any).border;
  }

  // ── 4. Font pairing (optionele override) ────────
  const fontPairingId = (siteTheme as any)?.fontPairing;
  if (fontPairingId) {
    const fonts = getFontPairing(fontPairingId);
    theme.fonts = fonts;
  }

  // ── 5. Sections configuratie ────────────────────
  const sections: SectionConfig[] =
    (generated_content?.sections as SectionConfig[]) ||
    (Array.isArray((siteTheme as any)?.sections) ? (siteTheme as any).sections : null) ||
    TEMPLATE_SECTIONS[templateStyle] ||
    TEMPLATE_SECTIONS.editorial;

  // ── 5b. Filter invisible sections ───────────────
  const visibleSections = sections.filter(s => s.visible !== false);

  // ── 6. Debug logging ────────────────────────────
  if (generated_content?.sections) {
    console.log(`🎨 Template: ${templateStyle} | Palette: ${paletteId}`);
    console.log('📦 Sections:', (generated_content.sections as SectionConfig[]).map(s => `${s.type}:${s.style}`).join(', '));
  }

  // ── 7. Beroep label ─────────────────────────────
  const beroepLabel = getBeroepLabel(beroep);

  // ── 8. Scroll reveal ────────────────────────────
  // Re-observe when sections change (reorder/toggle visibility)
  const sectionKey = visibleSections.map(s => s.type).join(',');
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
  }, [sectionKey]);

  // ── Shared props ────────────────────────────────
  const sectionProps = {
    theme,
    palette,
    content,
    generated: generated_content,
    beroepLabel,
  };

  // ── Section style resolver ──────────────────────
  const getSectionStyle = (section: SectionConfig) => {
    if (section.style) return section.style;
    if (isMainTemplate) return templateStyle;
    return 'editorial';
  };

  // ── Section renderer ────────────────────────────
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
      case 'werkervaring':
        return <WerkervaringSection key={key} {...sectionProps} style={style as any} />;
      case 'voorwie':
        return <VoorWieSection key={key} {...sectionProps} style={style as any} />;
      case 'werkwijze':
        return <WerkwijzeSection key={key} {...sectionProps} style={style as any} variant={section.variant as 1 | 2 | 3} />;
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

  // ── Header & Footer ─────────────────────────────
  const headerSection = visibleSections.find(s => s.type === 'header');
  const headerStyle = headerSection?.style || (isMainTemplate ? templateStyle : 'solid');

  const footerSection = visibleSections.find(s => s.type === 'footer');
  const footerStyle = footerSection?.style || (isMainTemplate ? templateStyle : 'simple');

  // ── Render ──────────────────────────────────────
  return (
    <div
      className={`min-h-screen theme-${templateStyle}`}
      style={{
        backgroundColor: theme.colors.background,
        fontFamily: theme.fonts.body,
      }}
    >
      <style jsx global>{GLOBAL_STYLES}</style>

      <style dangerouslySetInnerHTML={{ __html: `
  .theme-${templateStyle} h1,
  .theme-${templateStyle} h2,
  .theme-${templateStyle} h3,
  .theme-${templateStyle} h4 {
    font-family: ${theme.fonts.heading};
  }
`}} />

      {/* Header */}
      {headerSection !== undefined && (
        <HeaderSection
          {...sectionProps}
          style={headerStyle as any}
        />
      )}

      {/* Sections */}
      <main>
        {visibleSections
          .filter(s => s.type !== 'footer' && s.type !== 'header')
          .map((section, index) => (
            <div key={`${section.type}-${index}`} data-section={section.type}>
              {renderSection(section, index)}
            </div>
          ))}
      </main>

      {/* Footer */}
      {footerSection !== undefined && (
        <FooterSection
          {...sectionProps}
          style={footerStyle as any}
        />
      )}

      {/* WhatsApp */}
      {(content as any).telefoon && (
        <WhatsAppButton
          telefoon={(content as any).telefoon}
          naam={content.naam}
          palette={palette}
        />
      )}

      {/* Trust Widget — Professioneel Zorgprofiel keurmerk */}
      <TrustWidget
        subdomain={site.subdomain}
        palette={palette}
        position="bottom-left"
      />
    </div>
  );
}

export default TemplateRenderer;