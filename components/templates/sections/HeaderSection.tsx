// components/templates/sections/HeaderSection.tsx
// Header/Navigation section - past zich aan per theme

'use client';

import { BaseSectionProps } from './types';

interface HeaderSectionProps extends BaseSectionProps {
  style?: 'solid' | 'transparent' | 'floating';
}

export function HeaderSection({ theme, palette, content, style }: HeaderSectionProps) {
  const headerStyle = style || theme.headerStyle;
  
  switch (headerStyle) {
    case 'transparent':
      return <HeaderTransparent {...{ theme, palette, content }} />;
    case 'floating':
      return <HeaderFloating {...{ theme, palette, content }} />;
    case 'solid':
    default:
      return <HeaderSolid {...{ theme, palette, content }} />;
  }
}

// ============================================
// SOLID - Vaste header met achtergrond
// ============================================
function HeaderSolid({ theme, palette, content }: any) {
  return (
    <header 
      className="sticky top-0 z-50 border-b px-6 md:px-12 py-4 backdrop-blur-md"
      style={{ 
        backgroundColor: `${theme.colors.background}ee`,
        borderColor: theme.colors.border 
      }}
    >
      <div className={`${theme.spacing.container} mx-auto flex items-center justify-between`}>
        {/* Logo */}
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-2xl" style={{ color: palette.primary }}>
            medical_services
          </span>
          <h1 
            className="text-lg md:text-xl font-bold"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            {content.naam?.split(' ')[0]} Zorg
          </h1>
        </div>
        
        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a 
            href="#over" 
            className="text-sm font-medium hover:opacity-70 transition-colors"
            style={{ color: palette.primary }}
          >
            Over mij
          </a>
          <a 
            href="#diensten" 
            className="text-sm font-medium hover:opacity-70 transition-colors"
            style={{ color: palette.primary }}
          >
            Diensten
          </a>
          <a 
            href="#contact" 
            className="text-sm font-medium hover:opacity-70 transition-colors"
            style={{ color: palette.primary }}
          >
            Contact
          </a>
        </nav>
        
        {/* CTA Button */}
        <a 
          href="#contact"
          className={`hidden md:flex items-center justify-center px-5 py-2.5 text-white text-sm font-bold ${theme.radius.medium} transition-all hover:opacity-90`}
          style={{ backgroundColor: palette.primary }}
        >
          Contact
        </a>
      </div>
    </header>
  );
}

// ============================================
// TRANSPARENT - Transparante header (voor fullwidth hero)
// ============================================
function HeaderTransparent({ theme, palette, content }: any) {
  const isDark = theme.isDark;
  const textColor = isDark ? 'white' : theme.colors.text;
  const mutedColor = isDark ? 'rgba(255,255,255,0.7)' : theme.colors.textMuted;
  
  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 backdrop-blur-md"
      style={{ 
        backgroundColor: isDark ? 'rgba(23,25,27,0.8)' : 'rgba(255,255,255,0.8)',
        borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : theme.colors.border}`
      }}
    >
      <div className={`${theme.spacing.container} mx-auto flex items-center justify-between`}>
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div 
            className={`w-10 h-10 ${theme.radius.full} flex items-center justify-center`}
            style={{ backgroundColor: palette.primary }}
          >
            <span className="material-symbols-outlined text-white">medical_services</span>
          </div>
          <h1 
            className="text-lg md:text-xl font-bold tracking-tight"
            style={{ color: textColor }}
          >
            {content.naam?.split(' ')[0]?.toUpperCase()}
          </h1>
        </div>
        
        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#diensten" className="text-sm font-medium transition-colors hover:opacity-100" style={{ color: mutedColor }}>Diensten</a>
          <a href="#over" className="text-sm font-medium transition-colors hover:opacity-100" style={{ color: mutedColor }}>Over</a>
          <a href="#contact" className="text-sm font-medium transition-colors hover:opacity-100" style={{ color: mutedColor }}>Contact</a>
        </nav>
        
        {/* CTA Button */}
        <a 
          href="#contact"
          className={`hidden md:flex items-center justify-center px-5 py-2.5 text-white text-sm font-bold ${theme.radius.full} transition-all hover:opacity-90`}
          style={{ backgroundColor: palette.primary }}
        >
          Contact opnemen
        </a>
      </div>
    </header>
  );
}

// ============================================
// FLOATING - Zwevende pill navigatie (cards theme)
// ============================================
function HeaderFloating({ theme, palette, content }: any) {
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <nav 
        className={`flex items-center gap-1 px-2 py-2 backdrop-blur-md ${theme.radius.large} ${theme.shadows.medium} border`}
        style={{ backgroundColor: 'rgba(255,255,255,0.9)', borderColor: theme.colors.border }}
      >
        <a 
          href="#diensten" 
          className={`px-4 py-2 text-sm font-medium ${theme.radius.medium} transition-colors`}
          style={{ color: theme.colors.textMuted }}
        >
          Diensten
        </a>
        <a 
          href="#over" 
          className={`px-4 py-2 text-sm font-medium ${theme.radius.medium} transition-colors`}
          style={{ color: theme.colors.textMuted }}
        >
          Over
        </a>
        <a 
          href="#contact" 
          className={`px-4 py-2 text-sm font-medium text-white ${theme.radius.medium} transition-colors`}
          style={{ backgroundColor: palette.primary }}
        >
          Contact
        </a>
      </nav>
    </header>
  );
}

export default HeaderSection;
