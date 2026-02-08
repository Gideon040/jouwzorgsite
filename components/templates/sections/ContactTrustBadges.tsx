// ============================================
// CONTACT TRUST BADGES
// Subtiele rij met checkmarks voor contact sectie
// Max 3 badges, alleen verified certificaten
// ============================================
// AUDIT NOTES:
// - Removed hardcoded default colors (#84cc16, #78716c, #e7e5e4)
// - All colors now use palette-based defaults with proper fallbacks
// - Import path fixed: @/constants (barrel export) not @/constants/certificaten
// - Added 'wtza' and 'wkkgz' to badge priority (relevant compliance certs)
// - Extracted CheckIcon as helper component

import { Certificaat, CertificaatType } from '@/types';
import { getCertificaatTypeConfig } from '@/constants';

// ============================================
// TYPES
// ============================================

interface ContactTrustBadgesProps {
  certificaten: Certificaat[];
  /** palette.accent ?? palette.primary — used for checkmark icons */
  accentColor: string;
  /** palette.textMuted ?? '#6b7280' */
  textMutedColor: string;
  /** palette.border ?? '#e5e7eb' */
  borderColor: string;
  maxBadges?: number;
}

// ============================================
// CONSTANTS
// ============================================

// Prioriteit volgorde voor contact section
const CONTACT_BADGE_PRIORITY: CertificaatType[] = [
  'big',          // Belangrijkst voor zorg
  'kvk',          // Zakelijke legitimiteit
  'wtza',         // Wettelijke toelating
  'verzekering',  // Vertrouwen
  'vog',          // Extra vertrouwen
  'wkkgz',        // Kwaliteitsborging
];

// Korte labels voor contact section (beknopter dan standaard config labels)
const CONTACT_BADGE_LABELS: Partial<Record<CertificaatType, string>> = {
  big: 'BIG-geregistreerd',
  kvk: 'KvK-ingeschreven',
  wtza: 'Wtza-toegelaten',
  verzekering: 'Verzekerd',
  vog: 'VOG aanwezig',
  wkkgz: 'Wkkgz compliant',
};

// ============================================
// HELPER COMPONENTS
// ============================================

function CheckIcon({ color }: { color: string }) {
  return (
    <svg
      className="w-4 h-4 flex-shrink-0"
      fill={color}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function ContactTrustBadges({
  certificaten,
  accentColor,
  textMutedColor,
  borderColor,
  maxBadges = 3,
}: ContactTrustBadgesProps) {
  // Verzamel aanwezige certificaat types
  const certTypes = certificaten.map((c) => c.type);

  // Filter op aanwezige certificaten, behoud prioriteit volgorde, max N
  const verifiedBadges = CONTACT_BADGE_PRIORITY
    .filter((type) => certTypes.includes(type))
    .slice(0, maxBadges);

  if (verifiedBadges.length === 0) return null;

  return (
    <div
      className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-4 border-t"
      style={{ borderColor }}
    >
      {verifiedBadges.map((type) => {
        const label =
          CONTACT_BADGE_LABELS[type] ??
          getCertificaatTypeConfig(type)?.shortLabel ??
          type;

        return (
          <div
            key={type}
            className="flex items-center gap-1.5 text-xs font-medium"
            style={{ color: textMutedColor }}
          >
            <CheckIcon color={accentColor} />
            {label}
          </div>
        );
      })}
    </div>
  );
}

export default ContactTrustBadges;