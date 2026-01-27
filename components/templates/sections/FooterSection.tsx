// components/templates/sections/FooterSection.tsx
// Footer section - gebruikt door alle templates

'use client';

import { BaseSectionProps, getRevealClass } from './types';

interface FooterSectionProps extends BaseSectionProps {
  style?: 'default' | 'minimal' | 'dark';
}

export function FooterSection({ theme, palette, content, beroepLabel, style = 'default' }: FooterSectionProps) {
  const bigCert = content.certificaten?.some((c: any) => c.type === 'big');
  const year = new Date().getFullYear();
  
  if (style === 'minimal') {
    return <FooterMinimal {...{ theme, palette, content, year }} />;
  }
  
  if (style === 'dark' || theme.isDark) {
    return <FooterDark {...{ theme, palette, content, year, bigCert }} />;
  }
  
  return <FooterDefault {...{ theme, palette, content, year, bigCert, beroepLabel }} />;
}

// ============================================
// DEFAULT - Standaard footer met links
// ============================================
function FooterDefault({ theme, palette, content, year, bigCert, beroepLabel }: any) {
  return (
    <footer 
      className="border-t py-12 px-6 md:px-12"
      style={{ borderColor: theme.colors.border, backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className={`${theme.spacing.container} mx-auto`}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left - Logo/Name */}
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl" style={{ color: palette.primary }}>
              medical_services
            </span>
            <div>
              <span 
                className="font-bold"
                style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
              >
                {content.naam}
              </span>
              <span 
                className="text-sm ml-2"
                style={{ color: theme.colors.textMuted }}
              >
                {beroepLabel}
              </span>
            </div>
          </div>
          
          {/* Center - Copyright */}
          <div 
            className="text-sm text-center"
            style={{ color: theme.colors.textMuted }}
          >
            © {year} {content.naam}
            {bigCert && '. BIG-registratienummer op aanvraag.'}
          </div>
          
          {/* Right - Links */}
          <div className="flex gap-6">
            <a 
              href="#over" 
              className="text-sm font-medium hover:opacity-70 transition-colors"
              style={{ color: palette.primary }}
            >
              Over
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
            <a 
              href="https://jouwzorgsite.nl" 
              className="text-sm font-medium hover:opacity-70 transition-colors"
              style={{ color: palette.primary }}
            >
              JouwZorgSite
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// MINIMAL - Simpele footer
// ============================================
function FooterMinimal({ theme, palette, content, year }: any) {
  return (
    <footer 
      className="py-12 px-6 border-t"
      style={{ borderColor: theme.colors.border, backgroundColor: theme.colors.background }}
    >
      <div className="max-w-3xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        <p style={{ color: theme.colors.textMuted }}>
          © {year} {content.naam}
        </p>
        <a 
          href="https://jouwzorgsite.nl"
          style={{ color: palette.primary }}
        >
          JouwZorgSite
        </a>
      </div>
    </footer>
  );
}

// ============================================
// DARK - Donkere footer (bold theme)
// ============================================
function FooterDark({ theme, palette, content, year, bigCert }: any) {
  return (
    <footer 
      className="py-12 px-6 md:px-12 border-t"
      style={{ 
        borderColor: 'rgba(255,255,255,0.1)', 
        backgroundColor: theme.isDark ? theme.colors.background : '#17191b' 
      }}
    >
      <div className={`${theme.spacing.container} mx-auto`}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-white font-bold text-lg">
            {content.naam}
          </span>
          
          <p className="text-white/40 text-sm">
            © {year} {content.naam}
            {bigCert && ' · BIG Geregistreerd'}
            {' · '}
            <a 
              href="https://jouwzorgsite.nl"
              className="hover:text-white transition-colors"
              style={{ color: palette.primary }}
            >
              JouwZorgSite
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
