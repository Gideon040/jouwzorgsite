// components/templates/sections/CredentialsSection.tsx
// Credentials/Transparantie sectie - BIG, KvK, Wtza, Wkkgz
// v3: Full refactor
//     - Uses generated?.credentials for titles/intros (no hardcoded strings)
//     - Proper TypeScript types (no `any`)
//     - Uses getJarenErvaring helper
//     - Extracted reusable helpers: CheckIcon, VerifiedBadge, SectionLabel
//     - All palette properties use proper fallbacks
'use client';

import { BaseSectionProps, CredentialsStyle, getRevealClass, getJarenErvaring } from './types';
import { ThemeConfig } from '../themes';
import { Certificaat, CertificaatType, CredentialsContent } from '@/types';

// ============================================
// PROPS
// ============================================

interface CredentialsSectionProps extends BaseSectionProps {
  style?: CredentialsStyle;
}

// ============================================
// PALETTE TYPE (matches BaseSectionProps.palette)
// ============================================

interface PaletteColors {
  primary: string;
  primaryHover: string;
  primaryLight: string;
  primaryDark: string;
  accent?: string;
  accentLight?: string;
  bg?: string;
  bgAlt?: string;
  text?: string;
  textMuted?: string;
  border?: string;
}

// ============================================
// CREDENTIAL CONFIG
// ============================================

interface CredentialConfig {
  icon: string;
  label: string;
  description: string;
  verifyUrl?: (value: string) => string;
}

const CREDENTIAL_CONFIG: Record<string, CredentialConfig> = {
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
  diploma: {
    icon: 'school',
    label: 'Diploma',
    description: 'Erkend zorgopleiding diploma',
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
  kiwa: {
    icon: 'workspace_premium',
    label: 'Kiwa-keurmerk',
    description: 'Kiwa gecertificeerd',
  },
  btw: {
    icon: 'receipt',
    label: 'BTW-nummer',
    description: 'Geregistreerd voor BTW',
  },
};

// ============================================
// ENRICHED CREDENTIAL (cert + config)
// ============================================

interface EnrichedCredential extends Certificaat {
  config: CredentialConfig;
}

// ============================================
// COMPLIANCE TYPES
// ============================================

const COMPLIANCE_TYPES: CertificaatType[] = ['wtza', 'wkkgz', 'verzekering', 'klachtenregeling', 'vog'];

function isComplianceType(type: CertificaatType): boolean {
  return COMPLIANCE_TYPES.includes(type);
}

// ============================================
// SHARED PROPS FOR ALL VARIANT COMPONENTS
// ============================================

interface CredentialComponentProps {
  theme: ThemeConfig;
  palette: PaletteColors;
  credentials: EnrichedCredential[];
  handelsnaam: string;
  content: BaseSectionProps['content'];
  generated?: BaseSectionProps['generated'];
  hasBIG: boolean;
  bigCred: EnrichedCredential | undefined;
  kvkCred: EnrichedCredential | undefined;
  agbCred: EnrichedCredential | undefined;
  complianceCreds: EnrichedCredential[];
  diploma: string;
  ervaring: string;
  sectionTitel: string;
  sectionIntro: string;
}

// ============================================
// HELPER COMPONENTS (palette-aware)
// ============================================

function CheckIcon({ palette, size = 'sm' }: { palette: PaletteColors; size?: 'sm' | 'md' }) {
  const dims = size === 'md'
    ? { outer: 'w-8 h-8', inner: 'w-4 h-4' }
    : { outer: 'w-6 h-6', inner: 'w-3 h-3' };

  return (
    <span
      className={`${dims.outer} rounded-full flex items-center justify-center flex-shrink-0`}
      style={{ backgroundColor: `${palette.primary}15` }}
    >
      <svg className={dims.inner} style={{ color: palette.primary }} fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
    </span>
  );
}

function VerifiedBadge({ palette, label = 'Geverifieerd' }: { palette: PaletteColors; label?: string }) {
  return (
    <span
      className="text-[10px] px-2 py-0.5"
      style={{ backgroundColor: `${palette.primary}15`, color: palette.primaryDark }}
    >
      {label}
    </span>
  );
}

/** Micro-label with optional trailing line (editorial pattern) */
function SectionLabel({ theme, text }: { theme: ThemeConfig; text: string }) {
  return (
    <div className={`flex items-center gap-4 mb-12 sm:mb-16 ${getRevealClass('up')}`}>
      <span
        className="text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.2em]"
        style={{ color: theme.colors.textMuted }}
      >
        {text}
      </span>
      <div className="flex-1 h-px" style={{ backgroundColor: theme.colors.border }} />
    </div>
  );
}

/** BIG verify link with animated underline */
function BigVerifyLink({ palette, bigNummer, label = 'Verifieer in BIG-register' }: {
  palette: PaletteColors;
  bigNummer: string;
  label?: string;
}) {
  return (
    <a
      href={`https://zoeken.bigregister.nl/zoeken/resultaat?nummer=${bigNummer}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 mt-4 text-sm group"
      style={{ color: palette.primary }}
    >
      <span className="relative">
        {label}
        <span
          className="absolute bottom-0 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
          style={{ backgroundColor: palette.primary }}
        />
      </span>
      <span>→</span>
    </a>
  );
}

// ============================================
// MAIN COMPONENT — ROUTER
// ============================================

export function CredentialsSection({
  style = 'editorial',
  theme,
  palette,
  content,
  generated,
}: CredentialsSectionProps) {
  const certificaten: Certificaat[] = content.certificaten || [];
  const kvkNummer = content.zakelijk?.kvk;
  const handelsnaam = content.zakelijk?.handelsnaam || `${content.naam} Zorg`;

  // Build enriched credentials list
  const credentials: EnrichedCredential[] = certificaten.map((cert) => ({
    ...cert,
    config: CREDENTIAL_CONFIG[cert.type] || { icon: 'verified', label: cert.label, description: '' },
  }));

  // Add KvK if present but not already in certificaten
  if (kvkNummer && !certificaten.some((c) => c.type === 'kvk')) {
    credentials.push({
      type: 'kvk',
      label: 'KvK-inschrijving',
      value: kvkNummer,
      config: CREDENTIAL_CONFIG.kvk,
    });
  }

  // Categorise credentials
  const hasBIG = credentials.some((c) => c.type === 'big');
  const bigCred = credentials.find((c) => c.type === 'big');
  const kvkCred = credentials.find((c) => c.type === 'kvk');
  const agbCred = credentials.find((c) => c.type === 'agb');
  const complianceCreds = credentials.filter((c) => isComplianceType(c.type));

  // Diploma info (for non-BIG variant)
  const diplomaCert = certificaten.find((c) => c.type === 'diploma');
  const diploma = diplomaCert?.sublabel || diplomaCert?.label || 'Zorgprofessional';

  // Experience — use shared helper
  const jarenErvaringNum = getJarenErvaring(content.werkervaring);
  const ervaring = jarenErvaringNum
    ? `${jarenErvaringNum}+ jaar in de zorg`
    : 'Ervaren zorgprofessional';

  // Generated content for titles/intros
  const credentialsContent: CredentialsContent | undefined = generated?.credentials;
  const sectionTitel = credentialsContent?.titel || 'Kwalificaties & Registraties';
  const sectionIntro = credentialsContent?.intro || 'Als zelfstandig zorgverlener vind ik transparantie essentieel.';

  if (credentials.length === 0) return null;

  const sharedProps: CredentialComponentProps = {
    theme,
    palette,
    credentials,
    handelsnaam,
    content,
    generated,
    hasBIG,
    bigCred,
    kvkCred,
    agbCred,
    complianceCreds,
    diploma,
    ervaring,
    sectionTitel,
    sectionIntro,
  };

  switch (style) {
    case 'editorial':
      return <CredentialsEditorial {...sharedProps} />;
    case 'proactief':
      return <CredentialsProactief {...sharedProps} />;
    case 'portfolio':
      return <CredentialsPortfolio {...sharedProps} />;
    case 'mindoor':
      return <CredentialsMindoor {...sharedProps} />;
    case 'serene':
      return <CredentialsSerene {...sharedProps} />;
    case 'full':
      return <CredentialsFull {...sharedProps} />;
    case 'compact':
      return <CredentialsCompact {...sharedProps} />;
    case 'cards':
      return <CredentialsCards {...sharedProps} />;
    case 'badges':
      return <CredentialsBadges {...sharedProps} />;
    default:
      return <CredentialsEditorial {...sharedProps} />;
  }
}


// ============================================
// EDITORIAL — Magazine-style typography
// Met BIG: 7/5 split, BIG als oversized hero
// Zonder BIG: 50/50 split, KvK + Diploma gelijkwaardig
// ============================================
function CredentialsEditorial({
  theme,
  palette,
  hasBIG,
  bigCred,
  kvkCred,
  agbCred,
  complianceCreds,
  handelsnaam,
  diploma,
  ervaring,
  sectionIntro,
}: CredentialComponentProps) {

  if (hasBIG) {
    return (
      <section
        id="transparantie"
        className="px-4 sm:px-6 lg:px-12 py-16 sm:py-24 lg:py-32"
        style={{ backgroundColor: theme.colors.background }}
      >
        <div className="max-w-5xl mx-auto">
          <SectionLabel theme={theme} text="Transparantie" />

          {/* Main grid: 7/5 split */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">

            {/* Left: BIG as hero element */}
            <div className={`lg:col-span-7 ${getRevealClass('up', 1)}`}>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-medium leading-tight mb-6"
                style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
              >
                Kwaliteit die u<br/>
                kunt <em className="italic" style={{ color: palette.primary }}>verifiëren</em>
              </h2>
              <p
                className="text-sm sm:text-base leading-relaxed mb-10 max-w-md"
                style={{ color: theme.colors.textMuted }}
              >
                {sectionIntro}
              </p>

              {/* BIG Number — Oversized */}
              <div>
                <span
                  className="text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.2em] block mb-3"
                  style={{ color: theme.colors.textMuted }}
                >
                  BIG-registratie
                </span>
                <div
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight"
                  style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                >
                  {bigCred?.value}
                </div>
                <BigVerifyLink palette={palette} bigNummer={bigCred?.value || ''} />
              </div>
            </div>

            {/* Right: Supporting info */}
            <div
              className={`lg:col-span-5 lg:border-l lg:pl-10 ${getRevealClass('up', 2)}`}
              style={{ borderColor: theme.colors.border }}
            >
              <div className="space-y-6">
                {kvkCred && (
                  <div>
                    <span
                      className="text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.2em] block mb-2"
                      style={{ color: theme.colors.textMuted }}
                    >
                      KvK
                    </span>
                    <span
                      className="text-xl sm:text-2xl"
                      style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                    >
                      {kvkCred.value}
                    </span>
                  </div>
                )}

                {agbCred && (
                  <div>
                    <span
                      className="text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.2em] block mb-2"
                      style={{ color: theme.colors.textMuted }}
                    >
                      AGB-code
                    </span>
                    <span
                      className="text-xl sm:text-2xl"
                      style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                    >
                      {agbCred.value}
                    </span>
                  </div>
                )}

                <div className="h-px" style={{ backgroundColor: theme.colors.border }} />

                {/* Compliance list */}
                <div className="space-y-3 text-sm">
                  {complianceCreds.map((cred, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span style={{ color: theme.colors.text }}>{cred.config.label}</span>
                      <span style={{ color: palette.primary }}>✓</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // === ZONDER BIG VARIANT ===
  return (
    <section
      id="transparantie"
      className="px-4 sm:px-6 lg:px-12 py-16 sm:py-24 lg:py-32"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-5xl mx-auto">
        <SectionLabel theme={theme} text="Transparantie" />

        {/* 50/50 Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Left: KvK in bordered box */}
          <div className={getRevealClass('up', 1)}>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-medium leading-tight mb-6"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              Zorg met<br/>
              <em className="italic" style={{ color: palette.primary }}>zekerheid</em>
            </h2>
            <p
              className="text-sm sm:text-base leading-relaxed mb-10 max-w-md"
              style={{ color: theme.colors.textMuted }}
            >
              {sectionIntro}
            </p>

            {kvkCred && (
              <div
                className="border p-6 sm:p-8"
                style={{ borderColor: theme.colors.border }}
              >
                <span
                  className="text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.2em] block mb-3"
                  style={{ color: theme.colors.textMuted }}
                >
                  KvK-nummer
                </span>
                <div
                  className="text-3xl sm:text-4xl font-medium tracking-tight"
                  style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                >
                  {kvkCred.value}
                </div>
                <p className="text-sm mt-2" style={{ color: theme.colors.textMuted }}>
                  {handelsnaam}
                </p>
              </div>
            )}
          </div>

          {/* Right: Diploma and compliance */}
          <div
            className={`lg:border-l lg:pl-12 ${getRevealClass('up', 2)}`}
            style={{ borderColor: theme.colors.border }}
          >
            <div className="space-y-8">
              <div>
                <span
                  className="text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.2em] block mb-2"
                  style={{ color: theme.colors.textMuted }}
                >
                  Diploma
                </span>
                <span
                  className="text-xl sm:text-2xl"
                  style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                >
                  {diploma}
                </span>
              </div>

              <div>
                <span
                  className="text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.2em] block mb-2"
                  style={{ color: theme.colors.textMuted }}
                >
                  Ervaring
                </span>
                <span
                  className="text-xl sm:text-2xl"
                  style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                >
                  {ervaring}
                </span>
              </div>

              <div className="h-px" style={{ backgroundColor: theme.colors.border }} />

              <div className="space-y-3 text-sm">
                {complianceCreds.map((cred, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span style={{ color: theme.colors.text }}>{cred.config.label}</span>
                    <span style={{ color: palette.primary }}>✓</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


// ============================================
// PORTFOLIO — Elegant with photography
// Met BIG: Photo left, BIG prominent right
// Zonder BIG: Centered 4-column grid
// ============================================
function CredentialsPortfolio({
  theme,
  palette,
  hasBIG,
  bigCred,
  kvkCred,
  complianceCreds,
  diploma,
  ervaring,
  sectionIntro,
}: CredentialComponentProps) {

  if (hasBIG) {
    return (
      <section
        id="transparantie"
        className="px-4 sm:px-6 lg:px-12 py-16 sm:py-24 lg:py-32"
        style={{ backgroundColor: theme.colors.background }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">

            {/* Left: Photo */}
            <div className={`lg:col-span-5 ${getRevealClass('right')}`}>
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=700&fit=crop"
                alt="Kwaliteit"
                className="w-full h-64 sm:h-80 lg:h-[450px] object-cover"
                style={{ borderRadius: '0 60px 0 0' }}
              />
            </div>

            {/* Right: Content */}
            <div className={`lg:col-span-7 ${getRevealClass('left', 1)}`}>
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.2em] block mb-4"
                style={{ color: palette.accent ?? palette.primary }}
              >
                Transparantie
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight mb-6"
                style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
              >
                Verifieerbare<br/>
                <em className="italic" style={{ color: palette.accent ?? palette.primary }}>kwaliteit</em>
              </h2>

              {/* BIG Number */}
              <div className="mb-8">
                <span
                  className="text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.2em] block mb-3"
                  style={{ color: theme.colors.textMuted }}
                >
                  BIG-registratie
                </span>
                <div
                  className="text-4xl sm:text-5xl lg:text-6xl font-medium"
                  style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
                >
                  {bigCred?.value}
                </div>
                <BigVerifyLink palette={palette} bigNummer={bigCred?.value || ''} label="Verifieer" />
              </div>

              {/* Compliance grid */}
              <div
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t"
                style={{ borderColor: theme.colors.border }}
              >
                {kvkCred && (
                  <div>
                    <span
                      className="text-[9px] uppercase tracking-wider block mb-1"
                      style={{ color: theme.colors.textMuted }}
                    >
                      KvK
                    </span>
                    <span
                      className="text-lg"
                      style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
                    >
                      {kvkCred.value}
                    </span>
                  </div>
                )}
                {complianceCreds.slice(0, 3).map((cred, idx) => (
                  <div key={idx}>
                    <span
                      className="text-[9px] uppercase tracking-wider block mb-1"
                      style={{ color: theme.colors.textMuted }}
                    >
                      {cred.config.label}
                    </span>
                    <span className="text-sm" style={{ color: theme.colors.text }}>✓</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // === ZONDER BIG VARIANT ===
  return (
    <section
      id="transparantie"
      className="px-4 sm:px-6 lg:px-12 py-16 sm:py-24 lg:py-32"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Centered header */}
        <div className={`text-center mb-12 sm:mb-16 ${getRevealClass('up')}`}>
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.2em] block mb-4"
            style={{ color: palette.accent ?? palette.primary }}
          >
            Transparantie
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight mb-4"
            style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
          >
            Gekwalificeerd &<br/>
            <em className="italic" style={{ color: palette.accent ?? palette.primary }}>betrouwbaar</em>
          </h2>
          <div className="w-16 h-px mx-auto" style={{ backgroundColor: theme.colors.border }} />
        </div>

        {/* 4-column equal grid */}
        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 ${getRevealClass('up', 1)}`}>
          {/* Diploma */}
          <div className="text-center lg:text-left">
            <span
              className="text-[9px] uppercase tracking-wider block mb-3"
              style={{ color: theme.colors.textMuted }}
            >
              Diploma
            </span>
            <span
              className="text-lg sm:text-xl block mb-1"
              style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
            >
              {diploma.split(' niveau')[0]}
            </span>
            <span className="text-sm" style={{ color: theme.colors.textMuted }}>
              {diploma.includes('niveau') ? `niveau ${diploma.split('niveau ')[1]}` : ''}
            </span>
          </div>

          {/* KvK */}
          {kvkCred && (
            <div className="text-center lg:text-left">
              <span
                className="text-[9px] uppercase tracking-wider block mb-3"
                style={{ color: theme.colors.textMuted }}
              >
                KvK
              </span>
              <span
                className="text-lg sm:text-xl block"
                style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
              >
                {kvkCred.value}
              </span>
            </div>
          )}

          {/* Verzekering */}
          <div className="text-center lg:text-left">
            <span
              className="text-[9px] uppercase tracking-wider block mb-3"
              style={{ color: theme.colors.textMuted }}
            >
              Verzekering
            </span>
            <span
              className="text-lg sm:text-xl block mb-1"
              style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
            >
              Beroepsaansprakelijk
            </span>
            <span className="text-sm" style={{ color: theme.colors.textMuted }}>✓ Actief</span>
          </div>

          {/* Klachtenregeling */}
          <div className="text-center lg:text-left">
            <span
              className="text-[9px] uppercase tracking-wider block mb-3"
              style={{ color: theme.colors.textMuted }}
            >
              Klachtenregeling
            </span>
            <span
              className="text-lg sm:text-xl block mb-1"
              style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
            >
              Aangesloten
            </span>
            <span className="text-sm" style={{ color: theme.colors.textMuted }}>✓ Wkkgz</span>
          </div>
        </div>

        {/* Extra info row */}
        <div
          className={`mt-12 pt-8 border-t flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm ${getRevealClass('up', 2)}`}
          style={{ borderColor: theme.colors.border, color: theme.colors.textMuted }}
        >
          <span>VOG ✓</span>
          <span>{ervaring}</span>
        </div>
      </div>
    </section>
  );
}


// ============================================
// SERENE — Minimalist, zen-like
// Met BIG: Centered, BIG as massive text-8xl
// Zonder BIG: Simple list with border-bottom
// ============================================
function CredentialsSerene({
  theme,
  palette,
  hasBIG,
  bigCred,
  kvkCred,
  complianceCreds,
  diploma,
  ervaring,
  sectionIntro,
}: CredentialComponentProps) {

  if (hasBIG) {
    return (
      <section
        id="transparantie"
        className="px-4 sm:px-6 lg:px-12 py-16 sm:py-24 lg:py-32"
        style={{ backgroundColor: theme.colors.background }}
      >
        <div className="max-w-5xl mx-auto">

          {/* Centered header */}
          <div className={`text-center mb-12 sm:mb-16 ${getRevealClass('up')}`}>
            <span
              className="text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.2em] block mb-4"
              style={{ color: theme.colors.textMuted }}
            >
              Transparantie
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight mb-4"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              Vertrouwen door <em className="italic" style={{ color: palette.primary }}>openheid</em>
            </h2>
            <div className="w-12 h-px mx-auto" style={{ backgroundColor: theme.colors.border }} />
          </div>

          {/* BIG Number — Massive centered */}
          <div className={`text-center mb-12 ${getRevealClass('up', 1)}`}>
            <span
              className="text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.2em] block mb-4"
              style={{ color: theme.colors.textMuted }}
            >
              BIG-registratie
            </span>
            <div
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {bigCred?.value}
            </div>
            <BigVerifyLink palette={palette} bigNummer={bigCred?.value || ''} label="Controleer in BIG-register" />
          </div>

          {/* Horizontal badges */}
          <div
            className={`border-t pt-10 ${getRevealClass('up', 2)}`}
            style={{ borderColor: theme.colors.border }}
          >
            <div className="flex flex-wrap justify-center gap-x-8 sm:gap-x-12 gap-y-6 text-center">
              {kvkCred && (
                <>
                  <div>
                    <span
                      className="text-[9px] uppercase tracking-[0.2em] block mb-2"
                      style={{ color: theme.colors.textMuted }}
                    >
                      KvK
                    </span>
                    <span
                      className="text-xl"
                      style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                    >
                      {kvkCred.value}
                    </span>
                  </div>
                  <div className="hidden sm:block w-px h-12" style={{ backgroundColor: theme.colors.border }} />
                </>
              )}
              {complianceCreds.slice(0, 3).map((cred, idx) => (
                <div key={idx} className="flex items-center">
                  <div>
                    <span
                      className="text-[9px] uppercase tracking-[0.2em] block mb-2"
                      style={{ color: theme.colors.textMuted }}
                    >
                      {cred.config.label}
                    </span>
                    <span className="text-sm" style={{ color: theme.colors.text }}>✓</span>
                  </div>
                  {idx < complianceCreds.slice(0, 3).length - 1 && (
                    <div className="hidden sm:block w-px h-12 ml-8 sm:ml-12" style={{ backgroundColor: theme.colors.border }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // === ZONDER BIG VARIANT ===
  return (
    <section
      id="transparantie"
      className="px-4 sm:px-6 lg:px-12 py-16 sm:py-24 lg:py-32"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-4xl mx-auto">

        {/* Centered header */}
        <div className={`text-center mb-12 sm:mb-16 ${getRevealClass('up')}`}>
          <span
            className="text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.2em] block mb-4"
            style={{ color: theme.colors.textMuted }}
          >
            Transparantie
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight mb-4"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            Zorg met <em className="italic" style={{ color: palette.primary }}>zekerheid</em>
          </h2>
          <div className="w-12 h-px mx-auto" style={{ backgroundColor: theme.colors.border }} />
        </div>

        {/* Simple list with border-bottom */}
        <div className={`max-w-xl mx-auto ${getRevealClass('up', 1)}`}>
          <div
            className="py-5 border-b flex justify-between items-center"
            style={{ borderColor: theme.colors.border }}
          >
            <span
              className="text-[10px] uppercase tracking-[0.2em]"
              style={{ color: theme.colors.textMuted }}
            >
              Diploma
            </span>
            <span
              className="text-lg sm:text-xl text-right"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {diploma}
            </span>
          </div>

          {kvkCred && (
            <div
              className="py-5 border-b flex justify-between items-center"
              style={{ borderColor: theme.colors.border }}
            >
              <span
                className="text-[10px] uppercase tracking-[0.2em]"
                style={{ color: theme.colors.textMuted }}
              >
                KvK-nummer
              </span>
              <span
                className="text-lg sm:text-xl"
                style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
              >
                {kvkCred.value}
              </span>
            </div>
          )}

          <div
            className="py-5 border-b flex justify-between items-center"
            style={{ borderColor: theme.colors.border }}
          >
            <span
              className="text-[10px] uppercase tracking-[0.2em]"
              style={{ color: theme.colors.textMuted }}
            >
              Ervaring
            </span>
            <span
              className="text-lg sm:text-xl"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {ervaring.replace(' in de zorg', '')}
            </span>
          </div>

          {complianceCreds.map((cred, idx) => (
            <div
              key={idx}
              className={`py-5 flex justify-between items-center ${idx < complianceCreds.length - 1 ? 'border-b' : ''}`}
              style={{ borderColor: theme.colors.border }}
            >
              <span
                className="text-[10px] uppercase tracking-[0.2em]"
                style={{ color: theme.colors.textMuted }}
              >
                {cred.config.label}
              </span>
              <span className="text-sm" style={{ color: palette.primary }}>✓</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


// ============================================
// PROACTIEF — Modern, business-like
// Met BIG: BIG card with border-l-4 accent
// Zonder BIG: Diploma card with accent, equal grid
// ============================================
function CredentialsProactief({
  theme,
  palette,
  hasBIG,
  bigCred,
  kvkCred,
  complianceCreds,
  handelsnaam,
  diploma,
  ervaring,
  sectionTitel,
}: CredentialComponentProps) {

  if (hasBIG) {
    return (
      <section
        id="transparantie"
        className="px-4 sm:px-6 lg:px-12 py-16 sm:py-24 lg:py-32"
        style={{ backgroundColor: theme.colors.background }}
      >
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className={`text-center mb-12 ${getRevealClass('up')}`}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ backgroundColor: palette.primary }} />
              <span
                className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em]"
                style={{ color: palette.primary }}
              >
                Transparantie
              </span>
              <div className="w-8 h-px" style={{ backgroundColor: palette.primary }} />
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              Gecertificeerd & Geregistreerd
            </h2>
          </div>

          {/* Main cards: BIG + KvK */}
          <div className={`grid md:grid-cols-2 gap-4 sm:gap-6 mb-6 ${getRevealClass('up', 1)}`}>

            {/* BIG Card with accent border */}
            <div
              className="p-6 sm:p-8 border-l-4"
              style={{
                backgroundColor: theme.colors.backgroundAlt,
                borderColor: palette.primary,
              }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span
                    className="text-[10px] font-semibold uppercase tracking-[0.15em] block mb-1"
                    style={{ color: theme.colors.textMuted }}
                  >
                    BIG-registratie
                  </span>
                  <VerifiedBadge palette={palette} />
                </div>
                <div
                  className="w-10 h-10 flex items-center justify-center"
                  style={{ backgroundColor: palette.primary }}
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                  </svg>
                </div>
              </div>
              <div
                className="text-2xl sm:text-3xl font-bold mb-2"
                style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
              >
                {bigCred?.value}
              </div>
              <p className="text-sm mb-3" style={{ color: theme.colors.textMuted }}>
                {bigCred?.sublabel || bigCred?.label || 'BIG-geregistreerd'}
              </p>
              <a
                href={`https://zoeken.bigregister.nl/zoeken/resultaat?nummer=${bigCred?.value}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium hover:underline"
                style={{ color: palette.primary }}
              >
                Controleer →
              </a>
            </div>

            {/* KvK Card */}
            {kvkCred && (
              <div
                className="p-6 sm:p-8 border"
                style={{ borderColor: theme.colors.border }}
              >
                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.15em] block mb-4"
                  style={{ color: theme.colors.textMuted }}
                >
                  KvK
                </span>
                <div
                  className="text-xl sm:text-2xl font-bold mb-1"
                  style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                >
                  {kvkCred.value}
                </div>
                <p className="text-sm" style={{ color: theme.colors.textMuted }}>
                  {handelsnaam}
                </p>
              </div>
            )}
          </div>

          {/* Compliance grid */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 ${getRevealClass('up', 2)}`}>
            {complianceCreds.map((cred, idx) => (
              <div
                key={idx}
                className="p-4 border flex items-center gap-2"
                style={{ borderColor: theme.colors.border }}
              >
                <CheckIcon palette={palette} />
                <span
                  className="text-sm font-semibold"
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

  // === ZONDER BIG VARIANT ===
  return (
    <section
      id="transparantie"
      className="px-4 sm:px-6 lg:px-12 py-16 sm:py-24 lg:py-32"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className={`text-center mb-12 ${getRevealClass('up')}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ backgroundColor: palette.primary }} />
            <span
              className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em]"
              style={{ color: palette.primary }}
            >
              Transparantie
            </span>
            <div className="w-8 h-px" style={{ backgroundColor: palette.primary }} />
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            Gecertificeerd & Ervaren
          </h2>
        </div>

        {/* Top row: Diploma (primary) + KvK + Ervaring */}
        <div className={`grid md:grid-cols-3 gap-4 sm:gap-6 mb-6 ${getRevealClass('up', 1)}`}>

          {/* Diploma Card with accent border */}
          <div
            className="p-6 sm:p-8 border-l-4"
            style={{
              backgroundColor: theme.colors.backgroundAlt,
              borderColor: palette.primary,
            }}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.15em] block mb-1"
                  style={{ color: theme.colors.textMuted }}
                >
                  Diploma
                </span>
                <VerifiedBadge palette={palette} label="Behaald" />
              </div>
              <div
                className="w-10 h-10 flex items-center justify-center"
                style={{ backgroundColor: palette.primary }}
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
                </svg>
              </div>
            </div>
            <div
              className="text-xl sm:text-2xl font-bold mb-1"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {diploma.split(' niveau')[0]}
            </div>
            <p className="text-sm" style={{ color: theme.colors.textMuted }}>
              {diploma.includes('niveau') ? `niveau ${diploma.split('niveau ')[1]}` : ''}
            </p>
          </div>

          {/* KvK Card */}
          {kvkCred && (
            <div
              className="p-6 sm:p-8 border"
              style={{ borderColor: theme.colors.border }}
            >
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.15em] block mb-4"
                style={{ color: theme.colors.textMuted }}
              >
                KvK
              </span>
              <div
                className="text-xl sm:text-2xl font-bold mb-1"
                style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
              >
                {kvkCred.value}
              </div>
              <p className="text-sm" style={{ color: theme.colors.textMuted }}>
                {handelsnaam}
              </p>
            </div>
          )}

          {/* Ervaring Card */}
          <div
            className="p-6 sm:p-8 border"
            style={{ borderColor: theme.colors.border }}
          >
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.15em] block mb-4"
              style={{ color: theme.colors.textMuted }}
            >
              Ervaring
            </span>
            <div
              className="text-xl sm:text-2xl font-bold mb-1"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {ervaring.split(' ')[0]}
            </div>
            <p className="text-sm" style={{ color: theme.colors.textMuted }}>
              {ervaring.includes('in de') ? ervaring.split(' ').slice(2).join(' ') : 'in de zorg'}
            </p>
          </div>
        </div>

        {/* Compliance grid — 5 columns */}
        <div className={`grid grid-cols-2 md:grid-cols-5 gap-3 ${getRevealClass('up', 2)}`}>
          <div
            className="p-4 border flex items-center gap-2"
            style={{ borderColor: theme.colors.border }}
          >
            <CheckIcon palette={palette} />
            <span className="text-sm font-semibold" style={{ color: theme.colors.text }}>VOG</span>
          </div>

          {complianceCreds.slice(0, 4).map((cred, idx) => (
            <div
              key={idx}
              className="p-4 border flex items-center gap-2"
              style={{ borderColor: theme.colors.border }}
            >
              <CheckIcon palette={palette} />
              <span
                className="text-sm font-semibold"
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
// MINDOOR — Warm, organic, bento grid
// Met BIG: BIG in 2-col dark card
// Zonder BIG: Diploma in 1-col dark card
// ============================================
function CredentialsMindoor({
  theme,
  palette,
  hasBIG,
  bigCred,
  kvkCred,
  complianceCreds,
  handelsnaam,
  diploma,
  ervaring,
  sectionTitel,
}: CredentialComponentProps) {

  const gradientText = {
    background: `linear-gradient(135deg, ${palette.accent ?? palette.primary}, ${palette.accentLight ?? palette.primaryLight})`,
    WebkitBackgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
  };

  if (hasBIG) {
    return (
      <section
        id="transparantie"
        className="px-4 sm:px-6 lg:px-12 py-16 sm:py-24 lg:py-32"
        style={{ backgroundColor: theme.colors.backgroundAlt }}
      >
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className={`text-center mb-12 sm:mb-16 ${getRevealClass('up')}`}>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              Mijn{' '}
              <span className="italic" style={gradientText}>Kwalificaties</span>
            </h2>
          </div>

          {/* Bento grid */}
          <div className={`grid md:grid-cols-3 gap-4 sm:gap-5 ${getRevealClass('up', 1)}`}>

            {/* BIG Card — 2 cols, dark */}
            <div
              className="md:col-span-2 p-6 sm:p-8 rounded-3xl"
              style={{ backgroundColor: palette.primaryDark }}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-sm font-medium uppercase tracking-wider text-white/60">
                    BIG-registratie
                  </span>
                  <span
                    className="ml-3 text-xs px-2 py-1 rounded-full"
                    style={{ backgroundColor: `${palette.primaryLight}30`, color: palette.accentLight ?? '#e0e0e0' }}
                  >
                    Geverifieerd
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                  </svg>
                </div>
              </div>
              <div
                className="text-4xl sm:text-5xl font-bold text-white mb-2"
                style={{ fontFamily: theme.fonts.heading }}
              >
                {bigCred?.value}
              </div>
              <p className="text-white/70 mb-4">
                {bigCred?.sublabel || bigCred?.label || 'BIG-geregistreerd'}
              </p>
              <a
                href={`https://zoeken.bigregister.nl/zoeken/resultaat?nummer=${bigCred?.value}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-white/80 hover:text-white"
              >
                Controleer →
              </a>
            </div>

            {/* KvK Card */}
            {kvkCred && (
              <div
                className="p-6 rounded-3xl"
                style={{ backgroundColor: theme.colors.background }}
              >
                <span
                  className="text-xs font-medium uppercase tracking-wider block mb-4"
                  style={{ color: theme.colors.textMuted }}
                >
                  KvK
                </span>
                <div
                  className="text-2xl font-bold"
                  style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                >
                  {kvkCred.value}
                </div>
                <p className="text-sm" style={{ color: theme.colors.textMuted }}>
                  {handelsnaam}
                </p>
              </div>
            )}

            {/* Compliance cards */}
            {complianceCreds.slice(0, 3).map((cred, idx) => (
              <div
                key={idx}
                className="p-5 rounded-3xl"
                style={{ backgroundColor: theme.colors.background }}
              >
                <span
                  className="text-xs uppercase tracking-wider block mb-3"
                  style={{ color: theme.colors.textMuted }}
                >
                  {cred.config.label}
                </span>
                <div className="flex items-center gap-2">
                  <CheckIcon palette={palette} size="md" />
                  <span className="font-medium" style={{ color: theme.colors.text }}>
                    {cred.type === 'wtza' ? 'Gemeld' : cred.type === 'verzekering' ? 'Ja' : 'Geregeld'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // === ZONDER BIG VARIANT ===
  return (
    <section
      id="transparantie"
      className="px-4 sm:px-6 lg:px-12 py-16 sm:py-24 lg:py-32"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className={`text-center mb-12 sm:mb-16 ${getRevealClass('up')}`}>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            Mijn{' '}
            <span className="italic" style={gradientText}>Kwalificaties</span>
          </h2>
        </div>

        {/* Bento grid — more balanced without BIG */}
        <div className={`grid md:grid-cols-3 gap-4 sm:gap-5 ${getRevealClass('up', 1)}`}>

          {/* Diploma Card — 1 col, dark */}
          <div
            className="p-6 sm:p-8 rounded-3xl"
            style={{ backgroundColor: palette.primaryDark }}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-sm font-medium uppercase tracking-wider text-white/60">
                  Diploma
                </span>
                <span
                  className="ml-3 text-xs px-2 py-1 rounded-full"
                  style={{ backgroundColor: `${palette.primaryLight}30`, color: palette.accentLight ?? '#e0e0e0' }}
                >
                  Behaald
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
                </svg>
              </div>
            </div>
            <div
              className="text-2xl sm:text-3xl font-bold text-white mb-2"
              style={{ fontFamily: theme.fonts.heading }}
            >
              {diploma.split(' niveau')[0]}
            </div>
            <p className="text-white/70">
              {diploma.includes('niveau') ? `niveau ${diploma.split('niveau ')[1]}` : ''}
            </p>
          </div>

          {/* KvK Card */}
          {kvkCred && (
            <div
              className="p-6 rounded-3xl"
              style={{ backgroundColor: theme.colors.background }}
            >
              <span
                className="text-xs font-medium uppercase tracking-wider block mb-4"
                style={{ color: theme.colors.textMuted }}
              >
                KvK
              </span>
              <div
                className="text-2xl font-bold"
                style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
              >
                {kvkCred.value}
              </div>
              <p className="text-sm" style={{ color: theme.colors.textMuted }}>
                {handelsnaam}
              </p>
            </div>
          )}

          {/* Ervaring Card */}
          <div
            className="p-6 rounded-3xl"
            style={{ backgroundColor: theme.colors.background }}
          >
            <span
              className="text-xs font-medium uppercase tracking-wider block mb-4"
              style={{ color: theme.colors.textMuted }}
            >
              Ervaring
            </span>
            <div
              className="text-2xl font-bold"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {ervaring.split(' ')[0]}
            </div>
            <p className="text-sm" style={{ color: theme.colors.textMuted }}>
              {ervaring.includes('in de') ? ervaring.split(' ').slice(2).join(' ') : 'in de zorg'}
            </p>
          </div>

          {/* VOG Card */}
          <div
            className="p-5 rounded-3xl"
            style={{ backgroundColor: theme.colors.background }}
          >
            <span
              className="text-xs uppercase tracking-wider block mb-3"
              style={{ color: theme.colors.textMuted }}
            >
              VOG
            </span>
            <div className="flex items-center gap-2">
              <CheckIcon palette={palette} size="md" />
              <span className="font-medium" style={{ color: theme.colors.text }}>Aanwezig</span>
            </div>
          </div>

          {/* Compliance cards */}
          {complianceCreds.slice(0, 2).map((cred, idx) => (
            <div
              key={idx}
              className="p-5 rounded-3xl"
              style={{ backgroundColor: theme.colors.background }}
            >
              <span
                className="text-xs uppercase tracking-wider block mb-3"
                style={{ color: theme.colors.textMuted }}
              >
                {cred.config.label}
              </span>
              <div className="flex items-center gap-2">
                <CheckIcon palette={palette} size="md" />
                <span className="font-medium" style={{ color: theme.colors.text }}>
                  {cred.type === 'verzekering' ? 'Ja' : 'Geregeld'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


// ============================================
// FULL — Uitgebreide weergave met alle details
// ============================================
function CredentialsFull({
  theme,
  palette,
  credentials,
  sectionTitel,
}: CredentialComponentProps) {
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
            style={{ backgroundColor: `${palette.primary}15`, color: palette.primary }}
          >
            <span className="material-symbols-outlined text-lg">verified_user</span>
            Transparantie
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            {sectionTitel}
          </h2>
        </div>

        {/* All credentials */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {credentials.map((cred, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl border transition-shadow hover:shadow-lg ${getRevealClass('up', (index % 3) + 1)}`}
              style={{
                backgroundColor: theme.colors.surface || theme.colors.background,
                borderColor: cred.type === 'big' ? palette.primary : theme.colors.border,
                borderWidth: cred.type === 'big' ? '2px' : '1px',
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
                style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
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
// COMPACT — Inline badges
// ============================================
function CredentialsCompact({
  theme,
  palette,
  credentials,
}: CredentialComponentProps) {
  return (
    <section
      id="transparantie"
      className="py-12 px-6 border-y"
      style={{ borderColor: theme.colors.border }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center items-center gap-6">
          {credentials.slice(0, 5).map((cred, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 rounded-full border"
              style={{
                backgroundColor: theme.colors.surface || theme.colors.background,
                borderColor: theme.colors.border,
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
// CARDS — Kaarten in grid
// ============================================
function CredentialsCards({
  theme,
  palette,
  credentials,
  sectionTitel,
}: CredentialComponentProps) {
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
            {sectionTitel}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {credentials.map((cred, index) => (
            <div
              key={index}
              className={`flex flex-col items-center text-center p-6 rounded-xl border ${getRevealClass('up', (index % 4) + 1)}`}
              style={{
                backgroundColor: theme.colors.surface || theme.colors.background,
                borderColor: theme.colors.border,
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: `${palette.primary}15` }}
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
                style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
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
// BADGES — Horizontale badge strip
// ============================================
function CredentialsBadges({
  theme,
  palette,
  credentials,
}: CredentialComponentProps) {
  return (
    <section
      className="py-8 px-6"
      style={{ backgroundColor: `${palette.primary}10` }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center items-center gap-8">
          {credentials.slice(0, 4).map((cred, index) => (
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