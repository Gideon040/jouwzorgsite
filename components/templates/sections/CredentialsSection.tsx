// components/templates/sections/CredentialsSection.tsx
// Credentials/Transparantie sectie - BIG, KvK, Wtza, Wkkgz

'use client';

import { BaseSectionProps, CredentialsStyle, getRevealClass } from './types';

interface CredentialsSectionProps extends BaseSectionProps {
  style?: CredentialsStyle;
}

// Credential type configurations
const CREDENTIAL_CONFIG: Record<string, { 
  icon: string; 
  label: string; 
  description: string;
  verifyUrl?: (value: string) => string;
}> = {
  big: {
    icon: 'verified',
    label: 'BIG-registratie',
    description: 'Geregistreerd in het BIG-register',
    verifyUrl: (value) => `https://zoeken.bigregister.nl/zoeken/resultaat?nummer=${value}`,
  },
  kvk: {
    icon: 'business',
    label: 'KvK-inschrijving',
    description: 'Ingeschreven bij de Kamer van Koophandel',
    verifyUrl: (value) => `https://www.kvk.nl/zoeken/handelsregister/?kvknummer=${value}`,
  },
  agb: {
    icon: 'badge',
    label: 'AGB-code',
    description: 'Geregistreerd bij Vektis',
  },
  wtza: {
    icon: 'gavel',
    label: 'Wtza-melding',
    description: 'Gemeld bij de IGJ conform Wtza',
  },
  wkkgz: {
    icon: 'policy',
    label: 'Wkkgz compliant',
    description: 'Voldoet aan de Wkkgz-vereisten',
  },
  verzekering: {
    icon: 'health_and_safety',
    label: 'Verzekerd',
    description: 'Beroepsaansprakelijkheidsverzekering',
  },
  vog: {
    icon: 'shield',
    label: 'VOG',
    description: 'Verklaring Omtrent het Gedrag',
  },
  klachtenregeling: {
    icon: 'support_agent',
    label: 'Klachtenregeling',
    description: 'Aangesloten bij klachtenfunctionaris',
  },
};

export function CredentialsSection({ 
  style = 'editorial', 
  theme, 
  palette, 
  content 
}: CredentialsSectionProps) {
  const certificaten = content.certificaten || [];
  const kvkNummer = content.zakelijk?.kvk;
  const handelsnaam = content.zakelijk?.handelsnaam || `${content.naam} Zorg`;
  
  // Build credentials list
  const credentials = certificaten.map((cert: any) => ({
    ...cert,
    config: CREDENTIAL_CONFIG[cert.type] || { icon: 'verified', label: cert.label, description: '' },
  }));
  
  // Add KvK if present but not in certificaten
  if (kvkNummer && !certificaten.some((c: any) => c.type === 'kvk')) {
    credentials.push({
      type: 'kvk',
      value: kvkNummer,
      config: CREDENTIAL_CONFIG.kvk,
    });
  }
  
  if (credentials.length === 0) return null;

  switch (style) {
    case 'editorial':
      return <CredentialsEditorial {...{ theme, palette, credentials, handelsnaam, content }} />;
    case 'proactief':
      return <CredentialsProactief {...{ theme, palette, credentials }} />;
    case 'portfolio':
      return <CredentialsPortfolio {...{ theme, palette, credentials }} />;
    case 'mindoor':
      return <CredentialsMindoor {...{ theme, palette, credentials }} />;
    case 'full':
      return <CredentialsFull {...{ theme, palette, credentials, handelsnaam, content }} />;
    case 'compact':
      return <CredentialsCompact {...{ theme, palette, credentials }} />;
    case 'cards':
      return <CredentialsCards {...{ theme, palette, credentials }} />;
    case 'badges':
      return <CredentialsBadges {...{ theme, palette, credentials }} />;
    default:
      return <CredentialsEditorial {...{ theme, palette, credentials, handelsnaam, content }} />;
  }
}

// ============================================
// EDITORIAL - Overzichtelijke grid met alle registraties
// ============================================
function CredentialsEditorial({ theme, palette, credentials, handelsnaam, content }: any) {
  // Group credentials
  const bigCred = credentials.find((c: any) => c.type === 'big');
  const kvkCred = credentials.find((c: any) => c.type === 'kvk');
  const complianceCreds = credentials.filter((c: any) => 
    ['wtza', 'wkkgz', 'verzekering', 'klachtenregeling', 'vog'].includes(c.type)
  );
  
  return (
    <section 
      id="transparantie"
      className="px-6 md:px-16 lg:px-32 py-20"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className={`text-center mb-14 ${getRevealClass('up')}`}>
          <span 
            className="text-xs font-semibold uppercase tracking-[0.15em] block mb-3"
            style={{ fontVariant: 'small-caps', color: palette.primary }}
          >
            Transparantie
          </span>
          <h2 
            className="text-3xl md:text-4xl mb-4"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            Kwaliteitsgarantie
          </h2>
          <p 
            className="max-w-2xl mx-auto"
            style={{ color: theme.colors.textMuted }}
          >
            Als zelfstandig zorgverlener vind ik transparantie belangrijk. 
            Hieronder vind je al mijn registraties en certificeringen.
          </p>
        </div>
        
        {/* Main credentials - BIG & KvK */}
        <div className={`grid md:grid-cols-2 gap-6 mb-8 ${getRevealClass('up', 1)}`}>
          
          {/* BIG Card */}
          {bigCred && (
            <div 
              className="p-8 rounded-xl border"
              style={{ 
                backgroundColor: theme.colors.surface,
                borderColor: palette.primary,
                borderWidth: '2px'
              }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: palette.primaryLight }}
                >
                  <span 
                    className="material-symbols-outlined text-2xl"
                    style={{ color: palette.primary }}
                  >
                    verified
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 
                      className="text-lg font-bold"
                      style={{ color: theme.colors.text }}
                    >
                      BIG-geregistreerd
                    </h3>
                    <span 
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: '#dcfce7', color: '#166534' }}
                    >
                      Geverifieerd
                    </span>
                  </div>
                  <p 
                    className="text-sm mb-2"
                    style={{ color: theme.colors.textMuted }}
                  >
                    {bigCred.sublabel || 'Zorgprofessional'}
                  </p>
                  <p 
                    className="font-mono text-sm"
                    style={{ color: palette.primary }}
                  >
                    {bigCred.value}
                  </p>
                  {bigCred.value && (
                    <a 
                      href={`https://zoeken.bigregister.nl/zoeken/resultaat?nummer=${bigCred.value}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs mt-3 hover:underline"
                      style={{ color: palette.primary }}
                    >
                      Verifieer in BIG-register
                      <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* KvK Card */}
          {kvkCred && (
            <div 
              className="p-8 rounded-xl border"
              style={{ 
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border
              }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: theme.colors.backgroundAlt }}
                >
                  <span 
                    className="material-symbols-outlined text-2xl"
                    style={{ color: theme.colors.textMuted }}
                  >
                    business
                  </span>
                </div>
                <div className="flex-1">
                  <h3 
                    className="text-lg font-bold mb-1"
                    style={{ color: theme.colors.text }}
                  >
                    {handelsnaam}
                  </h3>
                  <p 
                    className="text-sm mb-2"
                    style={{ color: theme.colors.textMuted }}
                  >
                    Ingeschreven bij KvK
                  </p>
                  <p 
                    className="font-mono text-sm"
                    style={{ color: theme.colors.text }}
                  >
                    KvK: {kvkCred.value || content.zakelijk?.kvk}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Compliance badges */}
        {complianceCreds.length > 0 && (
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${getRevealClass('up', 2)}`}>
            {complianceCreds.map((cred: any, index: number) => (
              <div 
                key={index}
                className="flex items-center gap-3 p-4 rounded-lg border"
                style={{ 
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border
                }}
              >
                <span 
                  className="material-symbols-outlined"
                  style={{ color: palette.primary }}
                >
                  {cred.config.icon}
                </span>
                <div>
                  <p 
                    className="font-semibold text-sm"
                    style={{ color: theme.colors.text }}
                  >
                    {cred.config.label}
                  </p>
                  <p 
                    className="text-xs"
                    style={{ color: theme.colors.textMuted }}
                  >
                    {cred.config.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        
      </div>
    </section>
  );
}

// ============================================
// PROACTIEF - "Why Us" style met gradient icons
// ============================================
function CredentialsProactief({ theme, palette, credentials }: any) {
  return (
    <section 
      id="transparantie"
      className="py-24 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          
          {/* Text Column */}
          <div className={getRevealClass('right')}>
            <span 
              className="text-sm italic mb-3 block"
              style={{ color: palette.primary }}
            >
              Waarom kiezen voor mij?
            </span>
            <h2 
              className="text-4xl font-bold mb-6 leading-tight"
              style={{ fontFamily: theme.fonts.heading, color: palette.primaryDark || palette.primary }}
            >
              Professioneel en<br/>betrouwbaar
            </h2>
            <p 
              className="text-[15px] leading-[1.85]"
              style={{ color: theme.colors.textMuted }}
            >
              Als zelfstandig zorgprofessional voldoe ik aan alle wettelijke eisen en kwaliteitsstandaarden. 
              Transparantie en betrouwbaarheid staan centraal in mijn werkwijze.
            </p>
          </div>
          
          {/* Credentials List */}
          <div className={getRevealClass('left', 200)}>
            <ul className="space-y-8">
              {credentials.slice(0, 4).map((cred: any, idx: number) => (
                <li key={idx} className="flex gap-5">
                  {/* Icon Circle */}
                  <div 
                    className="w-12 h-12 min-w-[48px] rounded-full flex items-center justify-center"
                    style={{ 
                      background: `linear-gradient(135deg, ${palette.primary}, ${palette.primaryDark || palette.primary})`
                    }}
                  >
                    <span className="material-symbols-outlined text-white text-xl">
                      {cred.config?.icon || 'verified'}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div>
                    <h4 
                      className="text-lg font-semibold mb-1"
                      style={{ color: theme.colors.text }}
                    >
                      {cred.config?.label || cred.label}
                    </h4>
                    <p 
                      className="text-sm leading-relaxed"
                      style={{ color: theme.colors.textMuted }}
                    >
                      {cred.config?.description || 'Voldoet aan alle vereisten'}
                      {cred.value && (
                        <span className="block font-mono text-xs mt-1" style={{ color: theme.colors.text }}>
                          {cred.value}
                        </span>
                      )}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
        </div>
      </div>
    </section>
  );
}

// ============================================
// PORTFOLIO - "Why Us" style met icon circles, hover effect
// ============================================
function CredentialsPortfolio({ theme, palette, credentials }: any) {
  return (
    <section 
      id="transparantie"
      className="py-28 px-8 md:px-12"
      style={{ backgroundColor: 'white' }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          
          {/* Text Column */}
          <div className={getRevealClass('right')}>
            <span 
              className="text-[13px] font-semibold uppercase tracking-[2px] mb-4 block"
              style={{ color: palette.accent || palette.primary }}
            >
              Waarom kiezen voor mij
            </span>
            <h2 
              className="text-[42px] font-semibold leading-[1.2] mb-6"
              style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
            >
              Kwaliteit en <em className="italic" style={{ color: palette.accent || palette.primary }}>betrouwbaarheid</em>
            </h2>
            
            {/* Why items */}
            <ul className="space-y-7 mt-8">
              {credentials.slice(0, 4).map((cred: any, idx: number) => (
                <li key={idx} className="flex gap-5 group">
                  {/* Icon Circle with hover */}
                  <div 
                    className="w-14 h-14 min-w-[56px] rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-[var(--accent)]"
                    style={{ 
                      backgroundColor: theme.colors.backgroundAlt,
                      ['--accent' as string]: palette.accent || palette.primary
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = palette.accent || palette.primary}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.colors.backgroundAlt}
                  >
                    <span 
                      className="material-symbols-outlined text-[26px] transition-colors group-hover:text-white"
                      style={{ color: palette.primary }}
                    >
                      {cred.config?.icon || 'verified'}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div>
                    <h4 
                      className="text-xl font-semibold mb-2"
                      style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
                    >
                      {cred.config?.label || cred.label}
                    </h4>
                    <p 
                      className="text-[15px] leading-[1.7]"
                      style={{ color: theme.colors.textMuted }}
                    >
                      {cred.config?.description || 'Voldoet aan alle vereisten'}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Image Column */}
          <div className={getRevealClass('left', 200)}>
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=500&fit=crop"
              alt="Kwaliteit"
              className="w-full h-[500px] object-cover rounded-[30px]"
            />
          </div>
          
        </div>
      </div>
    </section>
  );
}

// ============================================
// MINDOOR - Compact badges met colored backgrounds
// ============================================
function CredentialsMindoor({ theme, palette, credentials }: any) {
  return (
    <section 
      id="transparantie"
      className="py-20 lg:py-32"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 ${getRevealClass('up')}`}>
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl"
            style={{ fontFamily: theme.fonts.heading }}
          >
            Mijn{' '}
            <span 
              className="italic"
              style={{ 
                background: `linear-gradient(135deg, ${palette.accent || '#d4644a'}, ${palette.accentLight || '#e07b5f'})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Kwalificaties
            </span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto" style={{ color: theme.colors.textMuted }}>
            Professioneel gecertificeerd en altijd up-to-date met de laatste ontwikkelingen.
          </p>
        </div>
        
        {/* Credentials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {credentials.slice(0, 4).map((cred: any, idx: number) => (
            <div 
              key={idx}
              className={`bg-white rounded-2xl p-6 shadow-lg transition-all hover:-translate-y-2 hover:shadow-xl ${getRevealClass('up', (idx + 1) * 100)}`}
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${palette.primary}15` }}
              >
                <span className="material-symbols-outlined text-2xl" style={{ color: palette.primary }}>
                  {cred.config?.icon || 'verified'}
                </span>
              </div>
              <h4 className="font-semibold mb-2" style={{ color: theme.colors.text }}>
                {cred.config?.label || cred.label}
              </h4>
              <p className="text-sm" style={{ color: theme.colors.textMuted }}>
                {cred.config?.description || 'Gecertificeerd en geregistreerd'}
              </p>
              {cred.type === 'big' && (
                <span 
                  className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: `${palette.primary}15`, color: palette.primary }}
                >
                  BIG Geregistreerd
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// FULL - Uitgebreide weergave met alle details
// ============================================
function CredentialsFull({ theme, palette, credentials, handelsnaam, content }: any) {
  return (
    <section 
      id="transparantie"
      className="py-20 md:py-28 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-12 ${getRevealClass('up')}`}>
          <span 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{ backgroundColor: palette.primaryLight, color: palette.primary }}
          >
            <span className="material-symbols-outlined text-lg">verified_user</span>
            Transparantie
          </span>
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            Kwaliteitsgarantie
          </h2>
        </div>
        
        {/* All credentials */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {credentials.map((cred: any, index: number) => (
            <div 
              key={index}
              className={`p-6 rounded-xl border transition-shadow hover:shadow-lg ${getRevealClass('up', (index % 3) + 1)}`}
              style={{ 
                backgroundColor: theme.colors.surface,
                borderColor: cred.type === 'big' ? palette.primary : theme.colors.border,
                borderWidth: cred.type === 'big' ? '2px' : '1px'
              }}
            >
              <span 
                className="material-symbols-outlined text-2xl mb-4 block"
                style={{ color: palette.primary }}
              >
                {cred.config.icon}
              </span>
              <h3 
                className="font-bold mb-1"
                style={{ color: theme.colors.text }}
              >
                {cred.config.label}
              </h3>
              <p 
                className="text-sm mb-2"
                style={{ color: theme.colors.textMuted }}
              >
                {cred.config.description}
              </p>
              {cred.value && (
                <p 
                  className="font-mono text-sm"
                  style={{ color: palette.primary }}
                >
                  {cred.value}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// COMPACT - Inline badges
// ============================================
function CredentialsCompact({ theme, palette, credentials }: any) {
  return (
    <section 
      id="transparantie"
      className="py-12 px-6 border-y"
      style={{ borderColor: theme.colors.border }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center items-center gap-6">
          {credentials.slice(0, 5).map((cred: any, index: number) => (
            <div 
              key={index}
              className="flex items-center gap-2 px-4 py-2 rounded-full border"
              style={{ 
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border
              }}
            >
              <span 
                className="material-symbols-outlined text-lg"
                style={{ color: palette.primary }}
              >
                {cred.config.icon}
              </span>
              <span 
                className="text-sm font-medium"
                style={{ color: theme.colors.text }}
              >
                {cred.config.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// CARDS - Kaarten in grid
// ============================================
function CredentialsCards({ theme, palette, credentials }: any) {
  return (
    <section 
      id="transparantie"
      className="py-20 md:py-28 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-12 ${getRevealClass('up')}`}>
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            Certificeringen
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {credentials.map((cred: any, index: number) => (
            <div 
              key={index}
              className={`flex flex-col items-center text-center p-6 rounded-xl border ${getRevealClass('up', (index % 4) + 1)}`}
              style={{ 
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border
              }}
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: palette.primaryLight }}
              >
                <span 
                  className="material-symbols-outlined"
                  style={{ color: palette.primary }}
                >
                  {cred.config.icon}
                </span>
              </div>
              <h3 
                className="font-semibold text-sm"
                style={{ color: theme.colors.text }}
              >
                {cred.config.label}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// BADGES - Horizontale badge strip
// ============================================
function CredentialsBadges({ theme, palette, credentials }: any) {
  return (
    <section 
      className="py-8 px-6"
      style={{ backgroundColor: palette.primaryLight }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center items-center gap-8">
          {credentials.slice(0, 4).map((cred: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <span 
                className="material-symbols-outlined text-xl"
                style={{ color: palette.primary }}
              >
                {cred.config.icon}
              </span>
              <span 
                className="font-semibold"
                style={{ color: palette.primaryDark }}
              >
                {cred.config.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CredentialsSection;
