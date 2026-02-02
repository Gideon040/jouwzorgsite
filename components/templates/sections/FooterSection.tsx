// components/templates/sections/FooterSection.tsx
// Footer sectie

'use client';

import { BaseSectionProps, FooterStyle } from './types';

interface FooterSectionProps extends BaseSectionProps {
  style?: FooterStyle;
}

export function FooterSection({ 
  style = 'editorial', 
  theme, 
  palette, 
  content,
  beroepLabel,
}: FooterSectionProps) {
  const naam = content.naam || 'Zorgprofessional';
  const telefoon = content.contact?.telefoon || '';
  const email = content.contact?.email || '';
  const werkgebied = content.contact?.werkgebied || [];
  const werkgebiedString = Array.isArray(werkgebied) ? werkgebied.join(', ') : werkgebied;
  const kvk = content.zakelijk?.kvk || '';
  const btw = content.zakelijk?.btw || '';
  const bigNummer = content.certificaten?.find((c: any) => c.type === 'big')?.value || '';
  const agbCode = content.certificaten?.find((c: any) => c.type === 'agb')?.value || '';
  const year = new Date().getFullYear();
  
  switch (style) {
    case 'editorial':
      return <FooterEditorial {...{ theme, palette, naam, telefoon, email, werkgebiedString, kvk, bigNummer, agbCode, year, beroepLabel }} />;
    case 'proactief':
      return <FooterProactief {...{ theme, palette, naam, telefoon, email, werkgebiedString, kvk, bigNummer, year, beroepLabel }} />;
    case 'portfolio':
      return <FooterPortfolio {...{ theme, palette, naam, telefoon, email, werkgebiedString, kvk, year, beroepLabel }} />;
    case 'mindoor':
      return <FooterMindoor {...{ theme, palette, naam, telefoon, email, werkgebiedString, kvk, bigNummer, year, beroepLabel }} />;
    case 'simple':
      return <FooterSimple {...{ theme, palette, naam, telefoon, email, year }} />;
    case 'detailed':
      return <FooterDetailed {...{ theme, palette, naam, telefoon, email, werkgebiedString, kvk, bigNummer, agbCode, btw, year, beroepLabel }} />;
    case 'minimal':
      return <FooterMinimal {...{ theme, palette, naam, year }} />;
    default:
      return <FooterEditorial {...{ theme, palette, naam, telefoon, email, werkgebiedString, kvk, bigNummer, agbCode, year, beroepLabel }} />;
  }
}

// ============================================
// EDITORIAL - Origineel uit HTML template
// Dark background, 4-kolom grid, social icons
// ============================================
function FooterEditorial({ theme, palette, naam, telefoon, email, werkgebiedString, kvk, bigNummer, agbCode, year, beroepLabel }: any) {
  // Format telefoon for WhatsApp (remove dashes and spaces, add country code)
  const whatsappNumber = telefoon ? `31${telefoon.replace(/[-\s]/g, '').replace(/^0/, '')}` : '';
  
  return (
    <footer 
      className="text-white"
      style={{ backgroundColor: '#1f2420' }}
    >
      {/* Main Footer Content */}
      <div className="px-6 md:px-16 lg:px-32 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <h3 
              className="text-xl font-semibold mb-4"
              style={{ fontFamily: theme.fonts.heading }}
            >
              {naam}
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              {beroepLabel} in de regio {werkgebiedString || 'Nederland'}. 
              Flexibel inzetbaar voor zorginstellingen en particulieren.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-3">
              {/* WhatsApp */}
              {whatsappNumber && (
                <a 
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded bg-white/10 flex items-center justify-center transition-colors"
                  style={{ ['--hover-bg' as string]: palette.primary }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = palette.primary}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                  aria-label="WhatsApp"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
              )}
              
              {/* Email */}
              {email && (
                <a 
                  href={`mailto:${email}`} 
                  className="w-10 h-10 rounded bg-white/10 flex items-center justify-center transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = palette.primary}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                  aria-label="Email"
                >
                  <span className="material-symbols-outlined text-lg">mail</span>
                </a>
              )}
              
              {/* Telefoon */}
              {telefoon && (
                <a 
                  href={`tel:${telefoon}`} 
                  className="w-10 h-10 rounded bg-white/10 flex items-center justify-center transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = palette.primary}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                  aria-label="Telefoon"
                >
                  <span className="material-symbols-outlined text-lg">call</span>
                </a>
              )}
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h4 
              className="text-xs uppercase tracking-widest font-semibold mb-6"
              style={{ color: palette.primary }}
            >
              Pagina's
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href="#diensten" className="hover:text-white transition-colors">Diensten</a>
              </li>
              <li>
                <a href="#werkwijze" className="hover:text-white transition-colors">Werkwijze</a>
              </li>
              <li>
                <a href="#over" className="hover:text-white transition-colors">Over mij</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Contact</a>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Contact */}
          <div>
            <h4 
              className="text-xs uppercase tracking-widest font-semibold mb-6"
              style={{ color: palette.primary }}
            >
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              {telefoon && <li>{telefoon}</li>}
              {email && <li>{email}</li>}
              {werkgebiedString && <li>{werkgebiedString}</li>}
            </ul>
          </div>
          
          {/* Column 4: Business Info */}
          <div>
            <h4 
              className="text-xs uppercase tracking-widest font-semibold mb-6"
              style={{ color: palette.primary }}
            >
              Gegevens
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              {kvk && <li>KVK: {kvk}</li>}
              {bigNummer && <li>BIG: {bigNummer}</li>}
              {agbCode && <li>AGB: {agbCode}</li>}
            </ul>
          </div>
          
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div 
        className="border-t border-white/10 px-6 md:px-16 lg:px-32 py-6"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          
          {/* Copyright */}
          <p>© {year} {naam}. Alle rechten voorbehouden.</p>
          
          {/* Links */}
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Voorwaarden</a>
          </div>
          
          {/* Powered by */}
          <p className="flex items-center gap-1">
            Gemaakt met <span className="text-red-400">♥</span> door{' '}
            <a 
              href="https://jouwzorgsite.nl" 
              className="hover:underline"
              style={{ color: palette.primary }}
              target="_blank"
              rel="noopener noreferrer"
            >
              JouwZorgSite
            </a>
          </p>
          
        </div>
      </div>
    </footer>
  );
}

// ============================================
// PROACTIEF - Dark met 4-kolom grid, social icons, bottom bar
// ============================================
function FooterProactief({ theme, palette, naam, telefoon, email, werkgebiedString, kvk, bigNummer, year, beroepLabel }: any) {
  return (
    <footer style={{ backgroundColor: '#1a2332' }} className="text-white">
      {/* Main Content */}
      <div className="py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-2.5 mb-5">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: palette.primary }}
              >
                <span className="material-symbols-outlined text-white text-xl">
                  check_circle
                </span>
              </div>
              <span className="text-lg font-semibold text-white">
                {naam}
              </span>
            </a>
            <p className="text-sm text-white/70 leading-relaxed mb-6">
              {beroepLabel || 'Zorgprofessional'} in de regio {werkgebiedString || 'Nederland'}. 
              Met persoonlijke aandacht voor uw zorgbehoeften.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-3">
              {/* Facebook */}
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-colors hover:bg-[var(--primary)]"
                style={{ ['--primary' as string]: palette.primary }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = palette.primary}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-colors"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = palette.primary}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-colors"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = palette.primary}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Zorgdiensten Column */}
          <div>
            <h4 className="text-base font-semibold mb-6">Zorgdiensten</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><a href="#diensten" className="hover:text-white transition-colors">Persoonlijke verzorging</a></li>
              <li><a href="#diensten" className="hover:text-white transition-colors">Verpleegkundige zorg</a></li>
              <li><a href="#diensten" className="hover:text-white transition-colors">Begeleiding</a></li>
              <li><a href="#diensten" className="hover:text-white transition-colors">Huishoudelijke hulp</a></li>
            </ul>
          </div>
          
          {/* Over Ons Column */}
          <div>
            <h4 className="text-base font-semibold mb-6">Over mij</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><a href="#over" className="hover:text-white transition-colors">Wie ben ik</a></li>
              <li><a href="#werkwijze" className="hover:text-white transition-colors">Werkwijze</a></li>
              <li><a href="#voorwie" className="hover:text-white transition-colors">Doelgroepen</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          {/* Contact Column */}
          <div>
            <h4 className="text-base font-semibold mb-6">Contact</h4>
            <div className="space-y-3 text-sm text-white/70">
              {werkgebiedString && (
                <p className="flex items-center gap-2.5">
                  <svg className="w-4 h-4" fill={palette.primary} viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  {werkgebiedString}
                </p>
              )}
              {telefoon && (
                <p className="flex items-center gap-2.5">
                  <svg className="w-4 h-4" fill={palette.primary} viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  {telefoon}
                </p>
              )}
              {email && (
                <p className="flex items-center gap-2.5">
                  <svg className="w-4 h-4" fill={palette.primary} viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  {email}
                </p>
              )}
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-8 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] text-white/50">
          <p>© {year} {naam}. Alle rechten voorbehouden.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacybeleid</a>
            <a href="#" className="hover:text-white transition-colors">Algemene voorwaarden</a>
            <a href="#" className="hover:text-white transition-colors">Cookiebeleid</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// PORTFOLIO - Dark green, 4-kolom, logo met icon
// ============================================
function FooterPortfolio({ theme, palette, naam, telefoon, email, werkgebiedString, kvk, year, beroepLabel }: any) {
  return (
    <footer 
      className="pt-20 pb-8 px-8 md:px-12"
      style={{ backgroundColor: palette.primary }}
    >
      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto mb-16">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-16">
          
          {/* Brand Column */}
          <div>
            <a href="#" className="flex items-center gap-3 mb-6">
              <div 
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: palette.accent || palette.primary }}
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <span 
                className="text-[22px] font-semibold text-white"
                style={{ fontFamily: theme.fonts.heading }}
              >
                {naam}
              </span>
            </a>
            <p className="text-sm text-white/70 leading-[1.7] mb-6">
              {beroepLabel || 'Zorgprofessional'} met passie voor persoonlijke, hoogwaardige zorg. Werkzaam in de regio {werkgebiedString || 'Nederland'}.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-[42px] h-[42px] rounded-full bg-white/10 flex items-center justify-center transition-all hover:-translate-y-1"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = palette.accent || palette.primary}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
              >
                <svg className="w-[18px] h-[18px] text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-[42px] h-[42px] rounded-full bg-white/10 flex items-center justify-center transition-all hover:-translate-y-1"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = palette.accent || palette.primary}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
              >
                <svg className="w-[18px] h-[18px] text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Expertise Column */}
          <div>
            <h4 className="text-white font-semibold mb-6">Expertise</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><a href="#diensten" className="hover:text-white transition-colors">Persoonlijke verzorging</a></li>
              <li><a href="#diensten" className="hover:text-white transition-colors">Verpleegkundige zorg</a></li>
              <li><a href="#diensten" className="hover:text-white transition-colors">Palliatieve zorg</a></li>
              <li><a href="#diensten" className="hover:text-white transition-colors">Ouderenzorg</a></li>
            </ul>
          </div>
          
          {/* Informatie Column */}
          <div>
            <h4 className="text-white font-semibold mb-6">Informatie</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><a href="#over" className="hover:text-white transition-colors">Over mij</a></li>
              <li><a href="#werkwijze" className="hover:text-white transition-colors">Werkervaring</a></li>
              <li><a href="#transparantie" className="hover:text-white transition-colors">Certificaten</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          {/* Contact Column */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contact</h4>
            <ul className="space-y-3 text-sm text-white/70">
              {email && <li><a href={`mailto:${email}`} className="hover:text-white transition-colors">{email}</a></li>}
              {telefoon && <li><a href={`tel:${telefoon}`} className="hover:text-white transition-colors">{telefoon}</a></li>}
              {werkgebiedString && <li>{werkgebiedString}</li>}
              {kvk && <li>KvK: {kvk}</li>}
            </ul>
          </div>
          
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="max-w-[1200px] mx-auto pt-8 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
          <p>© {year} {naam}. Alle rechten voorbehouden.</p>
          <div className="flex items-center gap-2">
            <span>Gemaakt met</span>
            <a 
              href="https://jouwzorgsite.nl" 
              className="transition-colors"
              style={{ color: palette.accent || palette.primary }}
              target="_blank"
              rel="noopener noreferrer"
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
// MINDOOR - Dark gray, 4-col with logo icon
// ============================================
function FooterMindoor({ theme, palette, naam, telefoon, email, werkgebiedString, kvk, bigNummer, year, beroepLabel }: any) {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: palette.primary }}
              >
                <span className="material-symbols-outlined text-white text-xl">favorite</span>
              </div>
              <span 
                className="text-xl font-semibold text-white"
                style={{ fontFamily: theme.fonts.heading }}
              >
                {naam.split(' ')[0]}
                <span style={{ color: `${palette.primary}` }}>{naam.split(' ').slice(1).join('')}</span>
              </span>
            </a>
            <p className="mt-4 text-gray-400 max-w-md">
              {beroepLabel || 'Persoonlijke thuiszorg'} met aandacht voor elk detail. {bigNummer && 'BIG geregistreerd verpleegkundige'} in {werkgebiedString || 'uw regio'}.
            </p>
            <div className="mt-6 flex items-center gap-4">
              {bigNummer && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="material-symbols-outlined" style={{ color: palette.primary }}>verified</span>
                  <span>BIG Geregistreerd</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Navigatie</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#diensten" 
                  className="transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = palette.primary}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                >
                  Diensten
                </a>
              </li>
              <li>
                <a 
                  href="#over" 
                  className="transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = palette.primary}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                >
                  Over Mij
                </a>
              </li>
              <li>
                <a 
                  href="#werkwijze" 
                  className="transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = palette.primary}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                >
                  Werkwijze
                </a>
              </li>
              <li>
                <a 
                  href="#faq" 
                  className="transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = palette.primary}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                >
                  FAQ
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = palette.primary}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3">
              {telefoon && (
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg" style={{ color: palette.primary }}>call</span>
                  <a href={`tel:${telefoon}`} className="transition-colors hover:text-white">{telefoon}</a>
                </li>
              )}
              {email && (
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg" style={{ color: palette.primary }}>mail</span>
                  <a href={`mailto:${email}`} className="transition-colors hover:text-white">{email}</a>
                </li>
              )}
              {werkgebiedString && (
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-lg" style={{ color: palette.primary }}>location_on</span>
                  <span>{werkgebiedString}</span>
                </li>
              )}
              {kvk && (
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg" style={{ color: palette.primary }}>business</span>
                  <span>KvK: {kvk}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">© {year} {naam}. Alle rechten voorbehouden.</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="transition-colors hover:text-white">Privacy</a>
            <a href="#" className="transition-colors hover:text-white">Voorwaarden</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// SIMPLE - Eenvoudige footer
// ============================================
function FooterSimple({ theme, palette, naam, telefoon, email, year }: any) {
  return (
    <footer 
      className="py-12 px-6 border-t"
      style={{ 
        backgroundColor: theme.colors.backgroundAlt,
        borderColor: theme.colors.border
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 
              className="font-bold text-lg mb-1"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {naam}
            </h3>
            <p 
              className="text-sm"
              style={{ color: theme.colors.textMuted }}
            >
              © {year}. Alle rechten voorbehouden.
            </p>
          </div>
          
          {/* Contact links */}
          <div className="flex items-center gap-4">
            {telefoon && (
              <a 
                href={`tel:${telefoon}`}
                className="flex items-center gap-2 text-sm transition-colors"
                style={{ color: theme.colors.textMuted }}
                onMouseEnter={(e) => e.currentTarget.style.color = palette.primary}
                onMouseLeave={(e) => e.currentTarget.style.color = theme.colors.textMuted}
              >
                <span className="material-symbols-outlined text-lg">call</span>
                {telefoon}
              </a>
            )}
            {email && (
              <a 
                href={`mailto:${email}`}
                className="flex items-center gap-2 text-sm transition-colors"
                style={{ color: theme.colors.textMuted }}
                onMouseEnter={(e) => e.currentTarget.style.color = palette.primary}
                onMouseLeave={(e) => e.currentTarget.style.color = theme.colors.textMuted}
              >
                <span className="material-symbols-outlined text-lg">mail</span>
                {email}
              </a>
            )}
          </div>
        </div>
        
        {/* Powered by */}
        <div className="mt-8 pt-6 border-t text-center" style={{ borderColor: theme.colors.border }}>
          <p className="text-xs" style={{ color: theme.colors.textMuted }}>
            Gemaakt met ♥ door{' '}
            <a 
              href="https://jouwzorgsite.nl" 
              className="hover:underline"
              style={{ color: palette.primary }}
              target="_blank"
              rel="noopener noreferrer"
            >
              JouwZorgSite
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// DETAILED - Uitgebreide footer met veel info
// ============================================
function FooterDetailed({ theme, palette, naam, telefoon, email, werkgebiedString, kvk, bigNummer, agbCode, btw, year, beroepLabel }: any) {
  return (
    <footer 
      className="py-16 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* About */}
          <div className="lg:col-span-2">
            <h3 
              className="font-bold text-xl mb-4"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {naam}
            </h3>
            <p 
              className="text-sm leading-relaxed mb-4"
              style={{ color: theme.colors.textMuted }}
            >
              {beroepLabel} werkzaam in {werkgebiedString || 'de regio'}. 
              Met passie en professionaliteit lever ik hoogwaardige zorg aan zowel zorginstellingen als particulieren.
            </p>
          </div>
          
          {/* Contact */}
          <div>
            <h4 
              className="font-bold text-sm uppercase tracking-wider mb-4"
              style={{ color: theme.colors.text }}
            >
              Contact
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: theme.colors.textMuted }}>
              {telefoon && (
                <li>
                  <a href={`tel:${telefoon}`} className="hover:underline">{telefoon}</a>
                </li>
              )}
              {email && (
                <li>
                  <a href={`mailto:${email}`} className="hover:underline">{email}</a>
                </li>
              )}
              {werkgebiedString && <li>{werkgebiedString}</li>}
            </ul>
          </div>
          
          {/* Zakelijk */}
          <div>
            <h4 
              className="font-bold text-sm uppercase tracking-wider mb-4"
              style={{ color: theme.colors.text }}
            >
              Zakelijk
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: theme.colors.textMuted }}>
              {kvk && <li>KVK: {kvk}</li>}
              {btw && <li>BTW: {btw}</li>}
              {bigNummer && <li>BIG: {bigNummer}</li>}
              {agbCode && <li>AGB: {agbCode}</li>}
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div 
          className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: theme.colors.border }}
        >
          <p className="text-xs" style={{ color: theme.colors.textMuted }}>
            © {year} {naam}. Alle rechten voorbehouden.
          </p>
          <p className="text-xs" style={{ color: theme.colors.textMuted }}>
            Gemaakt met ♥ door{' '}
            <a 
              href="https://jouwzorgsite.nl" 
              style={{ color: palette.primary }}
              target="_blank"
              rel="noopener noreferrer"
            >
              JouwZorgSite
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// MINIMAL - Zeer minimale footer
// ============================================
function FooterMinimal({ theme, palette, naam, year }: any) {
  return (
    <footer 
      className="py-8 px-6 border-t"
      style={{ borderColor: theme.colors.border }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <p 
          className="text-sm"
          style={{ color: theme.colors.textMuted }}
        >
          © {year} {naam} · Gemaakt door{' '}
          <a 
            href="https://jouwzorgsite.nl" 
            className="hover:underline"
            style={{ color: palette.primary }}
            target="_blank"
            rel="noopener noreferrer"
          >
            JouwZorgSite
          </a>
        </p>
      </div>
    </footer>
  );
}

export default FooterSection;
