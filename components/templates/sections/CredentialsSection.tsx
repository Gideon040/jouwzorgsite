// components/templates/sections/CredentialsSection.tsx
// Transparantie & Kwaliteitsgarantie sectie met alle registraties en compliance info

'use client';

import { BaseSectionProps, getRevealClass } from './types';
import { Certificaat, CertificaatType, groupCertificaten } from '@/types';
import { 
  getCertificaatTypeConfig, 
  getCertificaatColorClasses,
  getVerifyUrl,
  CATEGORY_CONFIG,
} from '@/constants/certificaten';

interface CredentialsSectionProps extends BaseSectionProps {
  style?: 'full' | 'compact' | 'cards';
}

export function CredentialsSection({ 
  style = 'full', 
  theme, 
  palette, 
  content 
}: CredentialsSectionProps) {
  const certificaten = content.certificaten || [];
  const kvkNummer = content.zakelijk?.kvk;
  const handelsnaam = content.zakelijk?.handelsnaam || `${content.naam} Zorg`;
  
  if (certificaten.length === 0 && !kvkNummer) return null;

  // Groepeer certificaten
  const grouped = groupCertificaten(certificaten);
  
  // BIG registratie apart ophalen voor prominente weergave
  const bigCert = certificaten.find(c => c.type === 'big');
  const kvkCert = certificaten.find(c => c.type === 'kvk') || 
    (kvkNummer ? { type: 'kvk' as CertificaatType, label: 'KvK-nummer', value: kvkNummer } : null);
  
  // Compliance items
  const complianceItems = grouped.compliance;

  switch (style) {
    case 'compact':
      return <CredentialsCompact {...{ theme, palette, certificaten, bigCert, kvkCert }} />;
    case 'cards':
      return <CredentialsCards {...{ theme, palette, certificaten, grouped }} />;
    case 'full':
    default:
      return (
        <CredentialsFull 
          {...{ theme, palette, bigCert, kvkCert, complianceItems, handelsnaam, content }} 
        />
      );
  }
}

// ============================================
// FULL STYLE - Premium "Transparantie" layout
// ============================================
function CredentialsFull({ 
  theme, 
  palette, 
  bigCert, 
  kvkCert, 
  complianceItems,
  handelsnaam,
  content,
}: any) {
  const beroepLabel = bigCert?.sublabel || 'Zorgprofessional';
  
  return (
    <section 
      id="transparantie"
      className={`${theme.spacing.section} px-6 md:px-12`}
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className={`${theme.spacing.container} mx-auto`}>
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
            Transparantie & Kwaliteitsgarantie
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: theme.colors.textMuted }}
          >
            Als zelfstandig zorgverlener vind ik transparantie belangrijk. 
            Hieronder vind je al mijn registraties.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* BIG Registratie Card */}
          {bigCert && (
            <div 
              className={`${theme.radius.large} p-6 ${getRevealClass('up', 1)}`}
              style={{ 
                backgroundColor: theme.colors.surface,
                border: `1px solid ${theme.colors.border}`,
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: 'rgb(16 185 129 / 0.1)' }}
                >
                  <span className="material-symbols-outlined text-emerald-600">
                    medical_services
                  </span>
                </div>
                <h3 
                  className="font-bold text-lg"
                  style={{ color: theme.colors.text }}
                >
                  BIG-registratie
                </h3>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span style={{ color: theme.colors.textMuted }}>Nummer</span>
                  <span className="font-mono font-semibold" style={{ color: theme.colors.text }}>
                    {bigCert.value}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: theme.colors.textMuted }}>Beroep</span>
                  <span className="font-semibold" style={{ color: theme.colors.text }}>
                    {beroepLabel}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{ color: theme.colors.textMuted }}>Status</span>
                  <span className="inline-flex items-center gap-1.5 text-emerald-600 font-semibold">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    Actief
                  </span>
                </div>
              </div>

              <a
                href={getVerifyUrl('big', bigCert.value) || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold rounded-lg transition-colors"
                style={{ 
                  backgroundColor: palette.primaryLight, 
                  color: palette.primary,
                }}
              >
                Controleer in BIG-register
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </a>
            </div>
          )}

          {/* KvK / Onderneming Card */}
          {kvkCert && (
            <div 
              className={`${theme.radius.large} p-6 ${getRevealClass('up', 2)}`}
              style={{ 
                backgroundColor: theme.colors.surface,
                border: `1px solid ${theme.colors.border}`,
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: 'rgb(71 85 105 / 0.1)' }}
                >
                  <span className="material-symbols-outlined text-slate-600">
                    business
                  </span>
                </div>
                <h3 
                  className="font-bold text-lg"
                  style={{ color: theme.colors.text }}
                >
                  Onderneming
                </h3>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span style={{ color: theme.colors.textMuted }}>KvK-nummer</span>
                  <span className="font-mono font-semibold" style={{ color: theme.colors.text }}>
                    {kvkCert.value}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: theme.colors.textMuted }}>Handelsnaam</span>
                  <span className="font-semibold text-right" style={{ color: theme.colors.text }}>
                    {handelsnaam}
                  </span>
                </div>
              </div>

              <a
                href={getVerifyUrl('kvk', kvkCert.value) || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold rounded-lg transition-colors"
                style={{ 
                  backgroundColor: 'rgb(71 85 105 / 0.1)', 
                  color: 'rgb(71 85 105)',
                }}
              >
                Bekijk in KvK-register
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </a>
            </div>
          )}

          {/* Compliance Card */}
          {complianceItems.length > 0 && (
            <div 
              className={`${theme.radius.large} p-6 md:col-span-2 lg:col-span-1 ${getRevealClass('up', 3)}`}
              style={{ 
                backgroundColor: theme.colors.surface,
                border: `1px solid ${theme.colors.border}`,
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: 'rgb(99 102 241 / 0.1)' }}
                >
                  <span className="material-symbols-outlined text-indigo-600">
                    verified
                  </span>
                </div>
                <h3 
                  className="font-bold text-lg"
                  style={{ color: theme.colors.text }}
                >
                  Kwaliteit & Compliance
                </h3>
              </div>
              
              <div className="space-y-2">
                {/* Wtza */}
                {complianceItems.find((c: Certificaat) => c.type === 'wtza') && (
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-500 text-lg">check_box</span>
                    <span style={{ color: theme.colors.text }}>Wtza gemeld bij IGJ</span>
                  </div>
                )}
                
                {/* Wkkgz */}
                {complianceItems.find((c: Certificaat) => c.type === 'wkkgz') && (
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-500 text-lg">check_box</span>
                    <span style={{ color: theme.colors.text }}>Wkkgz compliant</span>
                  </div>
                )}
                
                {/* Klachtenregeling */}
                {complianceItems.find((c: Certificaat) => c.type === 'klachtenregeling') && (
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-500 text-lg">check_box</span>
                    <span style={{ color: theme.colors.text }}>
                      Aangesloten bij klachtenfunctionaris
                    </span>
                  </div>
                )}
                
                {/* Verzekering */}
                {complianceItems.find((c: Certificaat) => c.type === 'verzekering') && (
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-500 text-lg">check_box</span>
                    <span style={{ color: theme.colors.text }}>Beroepsaansprakelijkheidsverzekering</span>
                  </div>
                )}
                
                {/* VOG */}
                {complianceItems.find((c: Certificaat) => c.type === 'vog') && (
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-500 text-lg">check_box</span>
                    <span style={{ color: theme.colors.text }}>VOG aanwezig</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ============================================
// COMPACT STYLE - Simple inline badges
// ============================================
function CredentialsCompact({ theme, palette, certificaten, bigCert, kvkCert }: any) {
  return (
    <section 
      id="credentials"
      className="py-8 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className={`${theme.spacing.container} mx-auto`}>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {bigCert && (
            <a
              href={getVerifyUrl('big', bigCert.value) || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105"
              style={{ backgroundColor: 'rgb(16 185 129 / 0.1)', color: 'rgb(5 150 105)' }}
            >
              <span className="material-symbols-outlined text-lg">verified</span>
              BIG-geregistreerd
            </a>
          )}
          
          {kvkCert && (
            <a
              href={getVerifyUrl('kvk', kvkCert.value) || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105"
              style={{ backgroundColor: 'rgb(71 85 105 / 0.1)', color: 'rgb(71 85 105)' }}
            >
              <span className="material-symbols-outlined text-lg">business</span>
              KvK-ingeschreven
            </a>
          )}
          
          {certificaten.find((c: Certificaat) => c.type === 'wtza') && (
            <span 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
              style={{ backgroundColor: 'rgb(99 102 241 / 0.1)', color: 'rgb(99 102 241)' }}
            >
              <span className="material-symbols-outlined text-lg">gavel</span>
              Wtza gemeld
            </span>
          )}
          
          {certificaten.find((c: Certificaat) => c.type === 'verzekering') && (
            <span 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
              style={{ backgroundColor: 'rgb(6 182 212 / 0.1)', color: 'rgb(8 145 178)' }}
            >
              <span className="material-symbols-outlined text-lg">health_and_safety</span>
              Verzekerd
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

// ============================================
// CARDS STYLE - Grid of credential cards
// ============================================
function CredentialsCards({ theme, palette, certificaten, grouped }: any) {
  const allCerts = [
    ...grouped.registraties,
    ...grouped.onderneming,
    ...grouped.compliance,
    ...grouped.kwalificaties,
  ];
  
  return (
    <section 
      id="credentials"
      className={`${theme.spacing.section} px-6 md:px-12`}
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className={`${theme.spacing.container} mx-auto`}>
        <div className={`text-center mb-12 ${getRevealClass('up')}`}>
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            Registraties & Certificaten
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {allCerts.map((cert: Certificaat, i: number) => {
            const config = getCertificaatTypeConfig(cert.type);
            const colors = getCertificaatColorClasses(cert.type);
            const verifyUrl = getVerifyUrl(cert.type, cert.value);
            
            return (
              <div
                key={i}
                className={`${theme.radius.large} p-4 text-center ${getRevealClass('up', (i % 4) + 1)}`}
                style={{ 
                  backgroundColor: theme.colors.surface,
                  border: `1px solid ${theme.colors.border}`,
                }}
              >
                <div 
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${colors.bgLight}`}
                >
                  <span className={`material-symbols-outlined ${colors.text}`}>
                    {config?.icon || 'verified'}
                  </span>
                </div>
                <h4 
                  className="font-semibold text-sm mb-1"
                  style={{ color: theme.colors.text }}
                >
                  {config?.shortLabel || cert.label}
                </h4>
                {cert.value && (
                  <p 
                    className="text-xs font-mono truncate"
                    style={{ color: theme.colors.textMuted }}
                  >
                    {cert.value}
                  </p>
                )}
                {verifyUrl && (
                  <a
                    href={verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 mt-2 text-xs font-semibold ${colors.text}`}
                  >
                    Verifieer
                    <span className="material-symbols-outlined text-xs">open_in_new</span>
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CredentialsSection;