// constants/certificaten.ts - Certificaat types

import { CertificaatType } from '@/types';

export interface CertificaatTypeConfig {
  id: CertificaatType;
  label: string;
  description: string;
  icon: string;
  color: string; // Tailwind color classes
  hasValue: boolean;      // Heeft een nummer/waarde veld
  hasSublabel: boolean;   // Heeft een sublabel
  hasExpiry: boolean;     // Heeft een vervaldatum
  hasProof: boolean;      // Kan bewijs uploaden
  placeholder?: string;   // Placeholder voor value veld
}

export const CERTIFICAAT_TYPES: CertificaatTypeConfig[] = [
  {
    id: 'big',
    label: 'BIG-registratie',
    description: 'Registratie in het BIG-register',
    icon: 'verified',
    color: 'emerald',
    hasValue: true,
    hasSublabel: true,
    hasExpiry: true,
    hasProof: false,
    placeholder: 'BIG-nummer (11 cijfers)',
  },
  {
    id: 'agb',
    label: 'AGB-code',
    description: 'Algemeen GegevensBeheer code',
    icon: 'badge',
    color: 'blue',
    hasValue: true,
    hasSublabel: false,
    hasExpiry: false,
    hasProof: false,
    placeholder: 'AGB-code (8 cijfers)',
  },
  {
    id: 'kvk',
    label: 'KvK-nummer',
    description: 'Kamer van Koophandel registratie',
    icon: 'business',
    color: 'slate',
    hasValue: true,
    hasSublabel: false,
    hasExpiry: false,
    hasProof: false,
    placeholder: 'KvK-nummer (8 cijfers)',
  },
  {
    id: 'btw',
    label: 'BTW-nummer',
    description: 'Belastingdienst BTW-identificatie',
    icon: 'receipt_long',
    color: 'slate',
    hasValue: true,
    hasSublabel: false,
    hasExpiry: false,
    hasProof: false,
    placeholder: 'NL000000000B00',
  },
  {
    id: 'vog',
    label: 'VOG',
    description: 'Verklaring Omtrent het Gedrag',
    icon: 'shield',
    color: 'amber',
    hasValue: true,
    hasSublabel: false,
    hasExpiry: false,
    hasProof: true,
    placeholder: 'Datum afgifte (bijv. maart 2024)',
  },
  {
    id: 'kiwa',
    label: 'KIWA/HKZ Keurmerk',
    description: 'Kwaliteitskeurmerk voor zorg',
    icon: 'workspace_premium',
    color: 'purple',
    hasValue: true,
    hasSublabel: false,
    hasExpiry: true,
    hasProof: true,
    placeholder: 'Certificaatnummer',
  },
  {
    id: 'diploma',
    label: 'Diploma / Certificaat',
    description: 'Opleiding of cursus certificaat',
    icon: 'school',
    color: 'pink',
    hasValue: true,
    hasSublabel: true,
    hasExpiry: false,
    hasProof: true,
    placeholder: 'Jaar van behalen',
  },
  {
    id: 'verzekering',
    label: 'Beroepsaansprakelijkheid',
    description: 'Verzekering voor beroepsaansprakelijkheid',
    icon: 'health_and_safety',
    color: 'cyan',
    hasValue: false,
    hasSublabel: false,
    hasExpiry: true,
    hasProof: true,
    placeholder: '',
  },
] as const;

export function getCertificaatTypeConfig(type: CertificaatType): CertificaatTypeConfig | undefined {
  return CERTIFICAAT_TYPES.find(c => c.id === type);
}

export function getCertificaatColorClasses(type: CertificaatType): { bg: string; border: string; text: string } {
  const config = getCertificaatTypeConfig(type);
  const color = config?.color ?? 'slate';
  
  return {
    bg: `bg-${color}-50 dark:bg-${color}-900/20`,
    border: `border-${color}-200 dark:border-${color}-800`,
    text: `text-${color}-600 dark:text-${color}-400`,
  };
}
