// ============================================
// CONTACT TRUST BADGES
// Subtiele rij met checkmarks voor contact sectie
// Max 3 badges, alleen verified certificaten
// ============================================

import { Certificaat, CertificaatType } from '@/types';
import { getCertificaatTypeConfig } from '@/constants/certificaten';

interface ContactTrustBadgesProps {
  certificaten: Certificaat[];
  accentColor?: string;
  textMutedColor?: string;
  borderColor?: string;
  maxBadges?: number;
}

// Prioriteit volgorde voor contact section
const CONTACT_BADGE_PRIORITY: CertificaatType[] = [
  'big',          // Belangrijkst voor zorg
  'kvk',          // Zakelijke legitimiteit  
  'verzekering',  // Vertrouwen
  'vog',          // Extra vertrouwen
];

// Labels voor contact section (korter dan standaard)
const CONTACT_BADGE_LABELS: Partial<Record<CertificaatType, string>> = {
  big: 'BIG-geregistreerd',
  kvk: 'KvK-ingeschreven',
  verzekering: 'Verzekerd',
  vog: 'VOG aanwezig',
};

export function ContactTrustBadges({ 
  certificaten,
  accentColor = '#84cc16',
  textMutedColor = '#78716c',
  borderColor = '#e7e5e4',
  maxBadges = 3,
}: ContactTrustBadgesProps) {
  const certTypes = certificaten.map(c => c.type);
  
  // Filter op aanwezige certificaten, behoud prioriteit volgorde, max 3
  const verifiedBadges = CONTACT_BADGE_PRIORITY
    .filter(type => certTypes.includes(type))
    .slice(0, maxBadges);
  
  if (verifiedBadges.length === 0) return null;

  return (
    <div 
      className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-4 border-t"
      style={{ borderColor }}
    >
      {verifiedBadges.map(type => {
        const label = CONTACT_BADGE_LABELS[type] || getCertificaatTypeConfig(type)?.label || type;
        
        return (
          <div 
            key={type}
            className="flex items-center gap-1.5 text-xs font-medium"
            style={{ color: textMutedColor }}
          >
            <svg 
              className="w-4 h-4 flex-shrink-0" 
              fill={accentColor} 
              viewBox="0 0 24 24"
            >
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            {label}
          </div>
        );
      })}
    </div>
  );
}

export default ContactTrustBadges;