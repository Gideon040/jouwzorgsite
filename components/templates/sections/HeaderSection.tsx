// components/templates/sections/HeaderSection.tsx
// Header/Navigation section - transparent → solid bij scrollen

'use client';

import { useState, useEffect } from 'react';
import { BaseSectionProps, HeaderStyle } from './types';

interface HeaderSectionProps extends BaseSectionProps {
  style?: HeaderStyle;
}

export function HeaderSection({ 
  style = 'editorial', 
  theme, 
  palette, 
  content 
}: HeaderSectionProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get display name
  const displayName = content.naam || 'Mijn Praktijk';
  const shortName = displayName.split(' ')[0];
  
  // Get telefoon for call buttons
  const telefoon = (content as any).telefoon || content.contact?.telefoon;

  // Navigation items
  const navItems = [
    { href: '#diensten', label: 'Diensten' },
    { href: '#over', label: 'Over mij' },
    { href: '#werkwijze', label: 'Werkwijze' },
    { href: '#contact', label: 'Contact' },
  ];

  switch (style) {
    case 'editorial':
      return (
        <HeaderEditorial 
          {...{ theme, palette, content, displayName, shortName, navItems, isScrolled, isMobileMenuOpen, setIsMobileMenuOpen }} 
        />
      );
    case 'proactief':
      return (
        <HeaderProactief 
          {...{ theme, palette, content, displayName, shortName, navItems, isScrolled, isMobileMenuOpen, setIsMobileMenuOpen }} 
        />
      );
    case 'portfolio':
      return (
        <HeaderPortfolio 
          {...{ theme, palette, content, displayName, shortName, navItems, isScrolled, isMobileMenuOpen, setIsMobileMenuOpen }} 
        />
      );
    case 'mindoor':
      return (
        <HeaderMindoor 
          {...{ theme, palette, content, displayName, shortName, navItems, isScrolled, isMobileMenuOpen, setIsMobileMenuOpen, telefoon }} 
        />
      );
    case 'solid':
      return (
        <HeaderSolid 
          {...{ theme, palette, content, displayName, shortName, navItems, isScrolled, isMobileMenuOpen, setIsMobileMenuOpen }} 
        />
      );
    case 'transparent':
      return (
        <HeaderTransparent 
          {...{ theme, palette, content, displayName, shortName, navItems, isScrolled, isMobileMenuOpen, setIsMobileMenuOpen }} 
        />
      );
    case 'floating':
      return (
        <HeaderFloating 
          {...{ theme, palette, content, displayName, shortName, navItems, isScrolled, isMobileMenuOpen, setIsMobileMenuOpen }} 
        />
      );
    default:
      return (
        <HeaderEditorial 
          {...{ theme, palette, content, displayName, shortName, navItems, isScrolled, isMobileMenuOpen, setIsMobileMenuOpen }} 
        />
      );
  }
}

// ============================================
// EDITORIAL - Elegant met serif naam
// ============================================
function HeaderEditorial({ 
  theme, 
  palette, 
  displayName, 
  navItems, 
  isScrolled, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen 
}: any) {
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="px-6 md:px-16 lg:px-32 py-4">
        <div className="flex items-center justify-between">
          {/* Logo / Name */}
          <a href="#" className="flex items-center gap-3">
            <h1 
              className="text-xl md:text-2xl font-semibold transition-colors"
              style={{ 
                fontFamily: theme.fonts.heading,
                color: isScrolled ? theme.colors.text : theme.colors.text 
              }}
            >
              {displayName}
            </h1>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item: any) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs uppercase tracking-widest font-semibold transition-colors hover:opacity-70"
                style={{ color: palette.primary }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Button (Desktop) */}
          <a
            href="#contact"
            className="hidden md:flex items-center justify-center h-10 px-6 text-white text-xs font-semibold uppercase tracking-widest rounded transition-colors"
            style={{ backgroundColor: palette.primary }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = palette.primaryHover}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = palette.primary}
          >
            Contact
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center"
            aria-label="Menu"
          >
            <span 
              className="material-symbols-outlined"
              style={{ color: theme.colors.text }}
            >
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <nav className="flex flex-col px-6 py-4 gap-4">
            {navItems.map((item: any) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium py-2"
                style={{ color: theme.colors.text }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="flex items-center justify-center h-12 text-white text-sm font-semibold uppercase tracking-widest rounded mt-2"
              style={{ backgroundColor: palette.primary }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Neem contact op
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

// ============================================
// PROACTIEF - Modern met logo icon, solid white, dropdown arrows
// ============================================
function HeaderProactief({ 
  theme, 
  palette, 
  displayName, 
  shortName,
  navItems, 
  isScrolled, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen 
}: any) {
  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
    >
      <div className="px-6 md:px-12 py-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: palette.primary }}
            >
              <span className="material-symbols-outlined text-white text-xl">
                check_circle
              </span>
            </div>
            <span 
              className="text-lg font-semibold"
              style={{ color: palette.primary }}
            >
              {displayName}
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item: any) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[15px] font-medium transition-colors"
                style={{ color: theme.colors.text }}
                onMouseEnter={(e) => e.currentTarget.style.color = palette.primary}
                onMouseLeave={(e) => e.currentTarget.style.color = theme.colors.text}
              >
                {item.label}
              </a>
            ))}
            
            {/* Accent CTA Button */}
            <a
              href="#contact"
              className="px-6 py-3 text-white text-sm font-semibold rounded-full transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{ 
                background: `linear-gradient(135deg, ${palette.accent || '#ff6b35'}, ${palette.accentLight || '#f7931e'})`,
              }}
            >
              Neem contact op
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center"
            aria-label="Menu"
          >
            <span 
              className="material-symbols-outlined"
              style={{ color: theme.colors.text }}
            >
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <nav className="flex flex-col px-6 py-4 gap-4">
            {navItems.map((item: any) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[15px] font-medium py-2"
                style={{ color: theme.colors.text }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="flex items-center justify-center h-12 text-white text-sm font-semibold rounded-full mt-2"
              style={{ 
                background: `linear-gradient(135deg, ${palette.accent || '#ff6b35'}, ${palette.accentLight || '#f7931e'})`,
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Neem contact op
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

// ============================================
// PORTFOLIO - Logo met icon, scrolled state, accent buttons
// ============================================
function HeaderPortfolio({ 
  theme, 
  palette, 
  displayName, 
  navItems, 
  isScrolled, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen 
}: any) {
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.08)] py-4' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="px-8 md:px-12 max-w-[1300px] mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <div 
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: palette.accent || palette.primary }}
            >
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <span 
              className="text-[22px] font-semibold transition-colors"
              style={{ 
                fontFamily: theme.fonts.heading,
                color: isScrolled ? palette.primary : 'white'
              }}
            >
              {displayName}
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-9">
            {navItems.map((item: any) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors"
                style={{ color: isScrolled ? theme.colors.text : 'rgba(255,255,255,0.9)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = palette.accent || palette.primary}
                onMouseLeave={(e) => e.currentTarget.style.color = isScrolled ? theme.colors.text : 'rgba(255,255,255,0.9)'}
              >
                {item.label}
              </a>
            ))}
            
            {/* CTA Button */}
            <a
              href="#contact"
              className="px-8 py-3.5 text-white text-sm font-semibold rounded-full transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{ backgroundColor: palette.accent || palette.primary }}
            >
              Contact
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center"
            aria-label="Menu"
          >
            <span 
              className="material-symbols-outlined"
              style={{ color: isScrolled ? theme.colors.text : 'white' }}
            >
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="flex flex-col px-8 py-6 gap-4">
            {navItems.map((item: any) => (
              <a
                key={item.href}
                href={item.href}
                className="text-base font-medium py-2"
                style={{ color: theme.colors.text }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="flex items-center justify-center h-12 text-white text-sm font-semibold rounded-full mt-2"
              style={{ backgroundColor: palette.accent || palette.primary }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact opnemen
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

// ============================================
// MINDOOR - Warm, backdrop-blur, phone CTA button
// ============================================
function HeaderMindoor({ 
  theme, 
  palette, 
  displayName, 
  navItems, 
  isScrolled, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen,
  telefoon
}: any) {
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/90 backdrop-blur-md border-b ${
        isScrolled ? 'shadow-md' : ''
      }`}
      style={{ borderColor: '#f5f0e8' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
              style={{ backgroundColor: palette.primary }}
            >
              <span className="material-symbols-outlined text-white text-xl">favorite</span>
            </div>
            <span 
              className="text-xl font-semibold"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {displayName.split(' ')[0]}
              <span style={{ color: palette.primary }}>{displayName.split(' ').slice(1).join('')}</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item: any) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-600 font-medium transition-colors"
                onMouseEnter={(e) => e.currentTarget.style.color = palette.primary}
                onMouseLeave={(e) => e.currentTarget.style.color = '#4b5563'}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a 
              href="#contact" 
              className="font-medium transition-colors"
              style={{ color: theme.colors.textMuted }}
              onMouseEnter={(e) => e.currentTarget.style.color = palette.primary}
              onMouseLeave={(e) => e.currentTarget.style.color = theme.colors.textMuted}
            >
              Afspraak maken
            </a>
            {telefoon && (
              <a 
                href={`tel:${telefoon}`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-medium transition-colors relative overflow-hidden group"
                style={{ backgroundColor: palette.primary }}
              >
                <span className="material-symbols-outlined text-lg">call</span>
                <span>{telefoon}</span>
                {/* Shine effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-600"
            aria-label="Menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t" style={{ borderColor: '#f5f0e8' }}>
          <nav className="flex flex-col p-6 gap-4">
            {navItems.map((item: any) => (
              <a
                key={item.href}
                href={item.href}
                className="text-lg font-medium py-3 border-b"
                style={{ color: theme.colors.textMuted, borderColor: '#f5f0e8' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            {telefoon && (
              <a
                href={`tel:${telefoon}`}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-full text-white font-medium mt-4"
                style={{ backgroundColor: palette.primary }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="material-symbols-outlined">call</span>
                {telefoon}
              </a>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

// ============================================
// SOLID - Altijd zichtbare achtergrond
// ============================================
function HeaderSolid({ 
  theme, 
  palette, 
  displayName, 
  navItems, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen 
}: any) {
  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b"
      style={{ borderColor: theme.colors.border }}
    >
      <div className="px-6 md:px-16 lg:px-32 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <span 
              className="material-symbols-outlined text-2xl"
              style={{ color: palette.primary }}
            >
              medical_services
            </span>
            <h1 
              className="text-xl font-bold"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {displayName}
            </h1>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item: any) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors"
                style={{ color: theme.colors.textMuted }}
                onMouseEnter={(e) => e.currentTarget.style.color = palette.primary}
                onMouseLeave={(e) => e.currentTarget.style.color = theme.colors.textMuted}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="h-10 px-6 flex items-center justify-center text-white text-sm font-semibold rounded transition-colors"
              style={{ backgroundColor: palette.primary }}
            >
              Contact
            </a>
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
          >
            <span className="material-symbols-outlined" style={{ color: theme.colors.text }}>
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t" style={{ borderColor: theme.colors.border }}>
          <nav className="flex flex-col px-6 py-4 gap-4">
            {navItems.map((item: any) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium py-2"
                style={{ color: theme.colors.text }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

// ============================================
// TRANSPARENT - Volledig transparant, wit bij scroll
// ============================================
function HeaderTransparent({ 
  theme, 
  palette, 
  displayName, 
  navItems, 
  isScrolled, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen 
}: any) {
  const textColor = isScrolled ? theme.colors.text : '#ffffff';
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-lg' 
          : 'bg-gradient-to-b from-black/30 to-transparent'
      }`}
    >
      <div className="px-6 md:px-16 lg:px-32 py-5">
        <div className="flex items-center justify-between">
          <a href="#">
            <h1 
              className="text-xl md:text-2xl font-bold transition-colors"
              style={{ fontFamily: theme.fonts.heading, color: textColor }}
            >
              {displayName}
            </h1>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item: any) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors"
                style={{ color: isScrolled ? theme.colors.textMuted : 'rgba(255,255,255,0.9)' }}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="h-10 px-6 flex items-center justify-center text-sm font-semibold rounded transition-colors"
              style={{ 
                backgroundColor: isScrolled ? palette.primary : 'white',
                color: isScrolled ? 'white' : palette.primary
              }}
            >
              Contact
            </a>
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
          >
            <span className="material-symbols-outlined" style={{ color: textColor }}>
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white">
          <nav className="flex flex-col px-6 py-4 gap-4">
            {navItems.map((item: any) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium py-2"
                style={{ color: theme.colors.text }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

// ============================================
// FLOATING - Zwevende pill-style header
// ============================================
function HeaderFloating({ 
  theme, 
  palette, 
  displayName, 
  shortName,
  navItems, 
  isScrolled, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen 
}: any) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <div 
        className={`max-w-5xl mx-auto rounded-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg px-6 py-3' 
            : 'bg-white/80 backdrop-blur-sm px-6 py-3 shadow-md'
        }`}
      >
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
              style={{ backgroundColor: palette.primary }}
            >
              {shortName[0]}
            </div>
            <span 
              className="font-semibold hidden sm:block"
              style={{ color: theme.colors.text }}
            >
              {shortName}
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item: any) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors"
                style={{ color: theme.colors.textMuted }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="h-9 px-5 flex items-center justify-center text-white text-sm font-medium rounded-full transition-colors"
            style={{ backgroundColor: palette.primary }}
          >
            Contact
          </a>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden mt-2 mx-4 bg-white rounded-2xl shadow-lg">
          <nav className="flex flex-col p-4 gap-2">
            {navItems.map((item: any) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium py-2 px-4 rounded-lg"
                style={{ color: theme.colors.text }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default HeaderSection;