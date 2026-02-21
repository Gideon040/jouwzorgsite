// components/templates/sections/FooterSection.tsx
// Footer sectie — gestandaardiseerde contact icons + trust badges

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

  const common = { theme, palette, naam, telefoon, email, werkgebiedString, kvk, btw, bigNummer, agbCode, year, beroepLabel };

  switch (style) {
    case 'editorial':
      return <FooterEditorial {...common} />;
    case 'proactief':
      return <FooterProactief {...common} />;
    case 'portfolio':
      return <FooterPortfolio {...common} />;
    case 'mindoor':
      return <FooterMindoor {...common} />;
    case 'simple':
      return <FooterSimple {...common} />;
    case 'detailed':
      return <FooterDetailed {...common} />;
    case 'minimal':
      return <FooterMinimal {...common} />;
    case 'serene':
      return <FooterSerene {...common} />;
    default:
      return <FooterEditorial {...common} />;
  }
}

// ============================================
// SHARED COMPONENTS
// ============================================

const WHATSAPP_SVG = (
  <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

/** Gedeelde contact icon buttons: WhatsApp, Email, Telefoon */
function FooterContactIcons({ telefoon, email, variant = 'dark', palette, rounded = 'rounded-full' }: {
  telefoon: string;
  email: string;
  variant?: 'dark' | 'light';
  palette: any;
  rounded?: string;
}) {
  const whatsappNumber = telefoon ? `31${telefoon.replace(/[-\s]/g, '').replace(/^0/, '')}` : '';
  const bgBase = variant === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)';
  const textColor = variant === 'dark' ? 'text-white' : 'text-gray-700';

  return (
    <div className="flex gap-3">
      {whatsappNumber && (
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-10 h-10 ${rounded} flex items-center justify-center transition-colors ${textColor}`}
          style={{ backgroundColor: bgBase }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = palette.primary}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = bgBase}
          aria-label="WhatsApp"
        >
          {WHATSAPP_SVG}
        </a>
      )}
      {email && (
        <a
          href={`mailto:${email}`}
          className={`w-10 h-10 ${rounded} flex items-center justify-center transition-colors ${textColor}`}
          style={{ backgroundColor: bgBase }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = palette.primary}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = bgBase}
          aria-label="Email"
        >
          <span className="material-symbols-outlined text-lg">mail</span>
        </a>
      )}
      {telefoon && (
        <a
          href={`tel:${telefoon}`}
          className={`w-10 h-10 ${rounded} flex items-center justify-center transition-colors ${textColor}`}
          style={{ backgroundColor: bgBase }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = palette.primary}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = bgBase}
          aria-label="Telefoon"
        >
          <span className="material-symbols-outlined text-lg">call</span>
        </a>
      )}
    </div>
  );
}

/** Gedeelde trust badges: BIG-geregistreerd (conditioneel) + DBA-Compliant (altijd) */
function FooterTrustBadges({ bigNummer, variant = 'dark', palette }: {
  bigNummer?: string;
  variant?: 'dark' | 'light';
  palette: any;
}) {
  const badgeClasses = variant === 'dark'
    ? 'bg-white/10 text-white/80'
    : 'bg-gray-100 text-gray-600';

  return (
    <div className="flex flex-wrap gap-2">
      {bigNummer && (
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${badgeClasses}`}>
          <span className="material-symbols-outlined" style={{ color: palette.primary, fontSize: '14px' }}>verified</span>
          BIG-geregistreerd
        </div>
      )}
      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${badgeClasses}`}>
        <span className="material-symbols-outlined" style={{ color: palette.primary, fontSize: '14px' }}>verified_user</span>
        DBA-Compliant
      </div>
    </div>
  );
}

/** Gedeelde "Powered by JouwZorgSite" */
function PoweredBy({ palette, className = '' }: { palette: any; className?: string }) {
  return (
    <p className={`text-xs flex items-center gap-1 ${className}`}>
      Gemaakt met <span className="text-red-400">&#9829;</span> door{' '}
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
  );
}

// ============================================
// EDITORIAL - Dark background, 4-kolom grid
// ============================================
function FooterEditorial({ theme, palette, naam, telefoon, email, werkgebiedString, kvk, bigNummer, agbCode, year, beroepLabel }: any) {
  return (
    <footer className="text-white" style={{ backgroundColor: '#1f2420' }}>
      <div className="px-6 md:px-16 lg:px-32 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: theme.fonts.heading }}>
              {naam}
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              {beroepLabel} in de regio {werkgebiedString || 'Nederland'}.
              Flexibel inzetbaar voor zorginstellingen en particulieren.
            </p>
            <FooterContactIcons telefoon={telefoon} email={email} variant="dark" palette={palette} rounded="rounded" />
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold mb-6" style={{ color: palette.primary }}>
              Pagina&apos;s
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#diensten" className="hover:text-white transition-colors">Diensten</a></li>
              <li><a href="#werkwijze" className="hover:text-white transition-colors">Werkwijze</a></li>
              <li><a href="#over" className="hover:text-white transition-colors">Over mij</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold mb-6" style={{ color: palette.primary }}>
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
            <h4 className="text-xs uppercase tracking-widest font-semibold mb-6" style={{ color: palette.primary }}>
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
      <div className="border-t border-white/10 px-6 md:px-16 lg:px-32 py-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; {year} {naam}. Alle rechten voorbehouden.</p>
          <FooterTrustBadges bigNummer={bigNummer} variant="dark" palette={palette} />
          <PoweredBy palette={palette} />
        </div>
      </div>
    </footer>
  );
}

// ============================================
// PROACTIEF - Dark met 4-kolom grid
// ============================================
function FooterProactief({ theme, palette, naam, telefoon, email, werkgebiedString, kvk, bigNummer, year, beroepLabel }: any) {
  return (
    <footer style={{ backgroundColor: '#1a2332' }} className="text-white">
      <div className="py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: palette.primary }}>
                <span className="material-symbols-outlined text-white text-xl">check_circle</span>
              </div>
              <span className="text-lg font-semibold text-white">{naam}</span>
            </a>
            <p className="text-sm text-white/70 leading-relaxed mb-6">
              {beroepLabel || 'Zorgprofessional'} in de regio {werkgebiedString || 'Nederland'}.
              Met persoonlijke aandacht voor uw zorgbehoeften.
            </p>
            <FooterContactIcons telefoon={telefoon} email={email} variant="dark" palette={palette} />
          </div>

          {/* Navigatie Column */}
          <div>
            <h4 className="text-base font-semibold mb-6">Pagina&apos;s</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><a href="#diensten" className="hover:text-white transition-colors">Diensten</a></li>
              <li><a href="#over" className="hover:text-white transition-colors">Over mij</a></li>
              <li><a href="#werkwijze" className="hover:text-white transition-colors">Werkwijze</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Info Column */}
          <div>
            <h4 className="text-base font-semibold mb-6">Informatie</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><a href="#voorwie" className="hover:text-white transition-colors">Doelgroepen</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Veelgestelde vragen</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Ervaringen</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-base font-semibold mb-6">Contact</h4>
            <div className="space-y-3 text-sm text-white/70">
              {werkgebiedString && (
                <p className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-base" style={{ color: palette.primary }}>location_on</span>
                  {werkgebiedString}
                </p>
              )}
              {telefoon && (
                <p className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-base" style={{ color: palette.primary }}>call</span>
                  {telefoon}
                </p>
              )}
              {email && (
                <p className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-base" style={{ color: palette.primary }}>mail</span>
                  {email}
                </p>
              )}
              {kvk && (
                <p className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-base" style={{ color: palette.primary }}>business</span>
                  KvK: {kvk}
                </p>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-8 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] text-white/50">
          <p>&copy; {year} {naam}. Alle rechten voorbehouden.</p>
          <FooterTrustBadges bigNummer={bigNummer} variant="dark" palette={palette} />
          <PoweredBy palette={palette} />
        </div>
      </div>
    </footer>
  );
}

// ============================================
// PORTFOLIO - Primary color background, 4-kolom
// ============================================
function FooterPortfolio({ theme, palette, naam, telefoon, email, werkgebiedString, kvk, bigNummer, year, beroepLabel }: any) {
  return (
    <footer className="pt-20 pb-8 px-8 md:px-12" style={{ backgroundColor: palette.primary }}>
      <div className="max-w-[1200px] mx-auto mb-16">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-16">

          {/* Brand Column */}
          <div>
            <a href="#" className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: palette.accent || palette.primary }}>
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <span className="text-[22px] font-semibold text-white" style={{ fontFamily: theme.fonts.heading }}>
                {naam}
              </span>
            </a>
            <p className="text-sm text-white/70 leading-[1.7] mb-6">
              {beroepLabel || 'Zorgprofessional'} met passie voor persoonlijke, hoogwaardige zorg. Werkzaam in de regio {werkgebiedString || 'Nederland'}.
            </p>
            <FooterContactIcons telefoon={telefoon} email={email} variant="dark" palette={{ primary: palette.accent || 'rgba(255,255,255,0.3)' }} />
          </div>

          {/* Navigatie Column */}
          <div>
            <h4 className="text-white font-semibold mb-6">Pagina&apos;s</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><a href="#diensten" className="hover:text-white transition-colors">Diensten</a></li>
              <li><a href="#over" className="hover:text-white transition-colors">Over mij</a></li>
              <li><a href="#werkwijze" className="hover:text-white transition-colors">Werkwijze</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Informatie Column */}
          <div>
            <h4 className="text-white font-semibold mb-6">Informatie</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><a href="#voorwie" className="hover:text-white transition-colors">Doelgroepen</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Ervaringen</a></li>
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
          <p>&copy; {year} {naam}. Alle rechten voorbehouden.</p>
          <FooterTrustBadges bigNummer={bigNummer} variant="dark" palette={{ primary: palette.accent || '#fff' }} />
          <PoweredBy palette={{ primary: palette.accent || palette.primary }} />
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
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: palette.primary }}>
                <span className="material-symbols-outlined text-white text-xl">favorite</span>
              </div>
              <span className="text-xl font-semibold text-white" style={{ fontFamily: theme.fonts.heading }}>
                {naam.split(' ')[0]}
                <span style={{ color: palette.primary }}>{naam.split(' ').slice(1).join(' ')}</span>
              </span>
            </a>
            <p className="mt-4 text-gray-400 max-w-md">
              {beroepLabel || 'Persoonlijke thuiszorg'} met aandacht voor elk detail. Werkzaam in {werkgebiedString || 'uw regio'}.
            </p>
            <div className="mt-6">
              <FooterContactIcons telefoon={telefoon} email={email} variant="dark" palette={palette} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Navigatie</h4>
            <ul className="space-y-3">
              {['Diensten', 'Over Mij', 'Werkwijze', 'FAQ', 'Contact'].map((label) => (
                <li key={label}>
                  <a
                    href={`#${label.toLowerCase().replace(' ', '')}`}
                    className="transition-colors"
                    style={{ color: '#9ca3af' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = palette.primary}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                  >
                    {label}
                  </a>
                </li>
              ))}
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
          <p className="text-sm text-gray-500">&copy; {year} {naam}. Alle rechten voorbehouden.</p>
          <FooterTrustBadges bigNummer={bigNummer} variant="dark" palette={palette} />
          <PoweredBy palette={palette} className="text-gray-500" />
        </div>
      </div>
    </footer>
  );
}

// ============================================
// SIMPLE - Eenvoudige footer
// ============================================
function FooterSimple({ theme, palette, naam, telefoon, email, bigNummer, year }: any) {
  return (
    <footer
      className="py-12 px-6 border-t"
      style={{ backgroundColor: theme.colors.backgroundAlt, borderColor: theme.colors.border }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-1" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>
              {naam}
            </h3>
            <p className="text-sm" style={{ color: theme.colors.textMuted }}>
              &copy; {year}. Alle rechten voorbehouden.
            </p>
          </div>

          {/* Contact icons */}
          <FooterContactIcons telefoon={telefoon} email={email} variant="light" palette={palette} />
        </div>

        {/* Trust badges + Powered by */}
        <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-4" style={{ borderColor: theme.colors.border }}>
          <FooterTrustBadges bigNummer={bigNummer} variant="light" palette={palette} />
          <PoweredBy palette={palette} className={`text-[${theme.colors.textMuted}]`} />
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
    <footer className="py-16 px-6 md:px-12" style={{ backgroundColor: theme.colors.backgroundAlt }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* About */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-xl mb-4" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>
              {naam}
            </h3>
            <p className="text-sm leading-relaxed mb-4" style={{ color: theme.colors.textMuted }}>
              {beroepLabel} werkzaam in {werkgebiedString || 'de regio'}.
              Met passie en professionaliteit lever ik hoogwaardige zorg aan zowel zorginstellingen als particulieren.
            </p>
            <FooterContactIcons telefoon={telefoon} email={email} variant="light" palette={palette} />
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4" style={{ color: theme.colors.text }}>
              Contact
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: theme.colors.textMuted }}>
              {telefoon && <li><a href={`tel:${telefoon}`} className="hover:underline">{telefoon}</a></li>}
              {email && <li><a href={`mailto:${email}`} className="hover:underline">{email}</a></li>}
              {werkgebiedString && <li>{werkgebiedString}</li>}
            </ul>
          </div>

          {/* Zakelijk */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4" style={{ color: theme.colors.text }}>
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
        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: theme.colors.border }}>
          <p className="text-xs" style={{ color: theme.colors.textMuted }}>
            &copy; {year} {naam}. Alle rechten voorbehouden.
          </p>
          <FooterTrustBadges bigNummer={bigNummer} variant="light" palette={palette} />
          <PoweredBy palette={palette} />
        </div>
      </div>
    </footer>
  );
}

// ============================================
// MINIMAL - Zeer minimale footer
// ============================================
function FooterMinimal({ palette, naam, bigNummer, year }: any) {
  return (
    <footer className="py-8 px-6 border-t border-gray-200">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-4 text-center">
        <FooterTrustBadges bigNummer={bigNummer} variant="light" palette={palette} />
        <p className="text-sm text-gray-500">
          &copy; {year} {naam} &middot; Gemaakt door{' '}
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

// ============================================
// SERENE - Minimalistisch, zen-like
// ============================================
function FooterSerene({ theme, palette, naam, telefoon, email, werkgebiedString, kvk, bigNummer, year, beroepLabel }: any) {
  const navItems = [
    { href: '#diensten', label: 'Diensten' },
    { href: '#over', label: 'Over mij' },
    { href: '#werkwijze', label: 'Werkwijze' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <footer style={{ backgroundColor: theme.colors.backgroundAlt }}>
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        {/* Top section */}
        <div className="py-16 grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-light mb-3" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>
              {naam}
            </h3>
            <p className="text-sm leading-relaxed mb-5" style={{ color: theme.colors.textMuted }}>
              {beroepLabel || 'Zorgprofessional'}
              {werkgebiedString ? ` — ${werkgebiedString}` : ''}
            </p>
            <FooterContactIcons telefoon={telefoon} email={email} variant="light" palette={palette} />
          </div>

          {/* Navigation */}
          <div>
            <span className="text-[9px] uppercase tracking-[0.2em] font-medium block mb-5" style={{ color: theme.colors.textMuted }}>
              Navigatie
            </span>
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm transition-colors duration-300"
                  style={{ color: theme.colors.text }}
                  onMouseEnter={(e) => e.currentTarget.style.color = palette.primary}
                  onMouseLeave={(e) => e.currentTarget.style.color = theme.colors.text}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <span className="text-[9px] uppercase tracking-[0.2em] font-medium block mb-5" style={{ color: theme.colors.textMuted }}>
              Contact
            </span>
            <div className="space-y-3 text-sm" style={{ color: theme.colors.text }}>
              {telefoon && <p>{telefoon}</p>}
              {email && <p>{email}</p>}
              {kvk && (
                <p className="text-xs" style={{ color: theme.colors.textMuted }}>KvK {kvk}</p>
              )}
              {bigNummer && (
                <p className="text-xs" style={{ color: theme.colors.textMuted }}>BIG {bigNummer}</p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{ borderTop: `1px solid ${theme.colors.border}`, color: theme.colors.textMuted }}
        >
          <span>&copy; {year} {naam}</span>
          <FooterTrustBadges bigNummer={bigNummer} variant="light" palette={palette} />
          <PoweredBy palette={palette} />
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
