// constants/certificaten.ts - Certificaat types en configuratie

import { CertificaatType } from '@/types';

export interface CertificaatTypeConfig {
  id: CertificaatType;
  label: string;
  shortLabel: string;        // Korte label voor badges in hero
  description: string;
  icon: string;              // Material Symbols icon name
  color: string;             // Tailwind color name
  category: 'registratie' | 'onderneming' | 'compliance' | 'kwalificatie';
  hasValue: boolean;         // Heeft een nummer/waarde veld
  hasSublabel: boolean;      // Heeft een sublabel (bijv. beroep bij BIG)
  hasExpiry: boolean;        // Heeft een vervaldatum
  hasProof: boolean;         // Kan bewijs uploaden
  placeholder?: string;      // Placeholder voor value veld
  externalUrl?: string;      // URL naar extern register voor verificatie
  verifyUrl?: (value: string) => string; // Functie om verify URL te genereren
  required?: boolean;        // Verplicht voor ZZP zorgverlener
  tooltip?: string;          // Uitleg voor tooltip/hover
}

export const CERTIFICAAT_TYPES: CertificaatTypeConfig[] = [
  // === REGISTRATIES (BIG, AGB) ===
  {
    id: 'big',
    label: 'BIG-registratie',
    shortLabel: 'BIG',
    description: 'Registratie in het BIG-register',
    icon: 'verified',
    color: 'emerald',
    category: 'registratie',
    hasValue: true,
    hasSublabel: true,
    hasExpiry: true,
    hasProof: false,
    placeholder: 'BIG-nummer (11 cijfers)',
    externalUrl: 'https://zoeken.bigregister.nl',
    verifyUrl: (value) => `https://zoeken.bigregister.nl/zoeken/resultaat?nummer=${value}`,
    required: true,
    tooltip: 'Het BIG-register is het wettelijk register dat aangeeft welke zorgverleners bevoegd zijn.',
  },
  {
    id: 'agb',
    label: 'AGB-code',
    shortLabel: 'AGB',
    description: 'Algemeen GegevensBeheer code voor declaraties',
    icon: 'badge',
    color: 'blue',
    category: 'registratie',
    hasValue: true,
    hasSublabel: false,
    hasExpiry: false,
    hasProof: false,
    placeholder: 'AGB-code (8 cijfers)',
    externalUrl: 'https://www.vektis.nl/agb-register/zoeken',
    required: false,
    tooltip: 'AGB-code is nodig voor declaraties bij zorgverzekeraars.',
  },

  // === ONDERNEMING (KvK, BTW) ===
  {
    id: 'kvk',
    label: 'KvK-registratie',
    shortLabel: 'KvK',
    description: 'Kamer van Koophandel registratie',
    icon: 'business',
    color: 'slate',
    category: 'onderneming',
    hasValue: true,
    hasSublabel: false,
    hasExpiry: false,
    hasProof: false,
    placeholder: 'KvK-nummer (8 cijfers)',
    externalUrl: 'https://www.kvk.nl/zoeken/',
    verifyUrl: (value) => `https://www.kvk.nl/zoeken/handelsregister/?kvknummer=${value}`,
    required: true,
    tooltip: 'Verplichte inschrijving voor alle ondernemers in Nederland.',
  },
  {
    id: 'btw',
    label: 'BTW-nummer',
    shortLabel: 'BTW',
    description: 'BTW-identificatienummer',
    icon: 'receipt_long',
    color: 'gray',
    category: 'onderneming',
    hasValue: true,
    hasSublabel: false,
    hasExpiry: false,
    hasProof: false,
    placeholder: 'NL000000000B00',
    required: false,
    tooltip: 'BTW-identificatienummer voor facturatie.',
  },

  // === COMPLIANCE (Wtza, Wkkgz, klachtenregeling, verzekering, VOG) ===
  {
    id: 'wtza',
    label: 'Wtza-melding',
    shortLabel: 'Wtza',
    description: 'Gemeld bij Inspectie Gezondheidszorg en Jeugd (IGJ)',
    icon: 'gavel',
    color: 'indigo',
    category: 'compliance',
    hasValue: false,
    hasSublabel: false,
    hasExpiry: false,
    hasProof: true,
    placeholder: '',
    externalUrl: 'https://www.toetredingzorgaanbieders.nl/',
    required: true,
    tooltip: 'Sinds 1 januari 2022 moeten alle zorgaanbieders zich melden bij de IGJ via de Wtza.',
  },
  {
    id: 'wkkgz',
    label: 'Wkkgz compliant',
    shortLabel: 'Wkkgz',
    description: 'Voldoet aan Wet kwaliteit, klachten en geschillen zorg',
    icon: 'policy',
    color: 'violet',
    category: 'compliance',
    hasValue: false,
    hasSublabel: false,
    hasExpiry: false,
    hasProof: false,
    placeholder: '',
    required: true,
    tooltip: 'Verplichte klachtenregeling en aansluiting bij erkende geschilleninstantie.',
  },
  {
    id: 'klachtenregeling',
    label: 'Klachtenfunctionaris',
    shortLabel: 'Klachten',
    description: 'Aangesloten bij onafhankelijke klachtenfunctionaris',
    icon: 'support_agent',
    color: 'purple',
    category: 'compliance',
    hasValue: true,
    hasSublabel: false,
    hasExpiry: false,
    hasProof: true,
    placeholder: 'Bijv. SCAG, Klachtenportaal Zorg, Zorggeschil',
    required: false,
    tooltip: 'Onderdeel van de Wkkgz-verplichting: toegang tot onafhankelijke klachtenfunctionaris.',
  },
  {
    id: 'verzekering',
    label: 'Beroepsaansprakelijkheid',
    shortLabel: 'Verzekerd',
    description: 'Beroepsaansprakelijkheidsverzekering',
    icon: 'health_and_safety',
    color: 'cyan',
    category: 'compliance',
    hasValue: false,
    hasSublabel: false,
    hasExpiry: true,
    hasProof: true,
    placeholder: '',
    required: true,
    tooltip: 'Verzekering tegen beroepsfouten en aansprakelijkheidsclaims.',
  },
  {
    id: 'vog',
    label: 'VOG',
    shortLabel: 'VOG',
    description: 'Verklaring Omtrent het Gedrag',
    icon: 'shield',
    color: 'amber',
    category: 'compliance',
    hasValue: true,
    hasSublabel: false,
    hasExpiry: false,
    hasProof: true,
    placeholder: 'Datum afgifte (bijv. maart 2024)',
    required: false,
    tooltip: 'Bewijs van integer gedrag, vaak vereist door zorginstellingen en bemiddelaars.',
  },

  // === KWALIFICATIES (diploma, KIWA) ===
  {
    id: 'diploma',
    label: 'Diploma / Certificaat',
    shortLabel: 'Diploma',
    description: 'Opleiding of aanvullend certificaat',
    icon: 'school',
    color: 'rose',
    category: 'kwalificatie',
    hasValue: true,
    hasSublabel: true,
    hasExpiry: false,
    hasProof: true,
    placeholder: 'Jaar van behalen',
    required: false,
    tooltip: 'Relevante opleidingen, bijscholingen en certificaten.',
  },
  {
    id: 'kiwa',
    label: 'KIWA/HKZ Keurmerk',
    shortLabel: 'KIWA',
    description: 'Kwaliteitskeurmerk voor zorg',
    icon: 'workspace_premium',
    color: 'pink',
    category: 'kwalificatie',
    hasValue: true,
    hasSublabel: false,
    hasExpiry: true,
    hasProof: true,
    placeholder: 'Certificaatnummer',
    required: false,
    tooltip: 'Vrijwillig kwaliteitskeurmerk dat aantoont dat je aan hoge standaarden voldoet.',
  },
] as const;

// === HELPER FUNCTIONS ===

export function getCertificaatTypeConfig(type: CertificaatType): CertificaatTypeConfig | undefined {
  return CERTIFICAAT_TYPES.find(c => c.id === type);
}

export function getCertificaatsByCategory(category: CertificaatTypeConfig['category']): CertificaatTypeConfig[] {
  return CERTIFICAAT_TYPES.filter(c => c.category === category);
}

export function getRequiredCertificaatTypes(): CertificaatTypeConfig[] {
  return CERTIFICAAT_TYPES.filter(c => c.required);
}

// === CATEGORY CONFIG ===

export const CATEGORY_CONFIG: Record<CertificaatTypeConfig['category'], { 
  label: string; 
  icon: string; 
  description: string;
  order: number;
}> = {
  registratie: {
    label: 'Registraties',
    icon: 'verified_user',
    description: 'Officiële registraties als zorgverlener',
    order: 1,
  },
  onderneming: {
    label: 'Onderneming',
    icon: 'business',
    description: 'Zakelijke registraties',
    order: 2,
  },
  compliance: {
    label: 'Kwaliteit & Compliance',
    icon: 'check_circle',
    description: 'Wettelijke vereisten en kwaliteitsborging',
    order: 3,
  },
  kwalificatie: {
    label: 'Kwalificaties',
    icon: 'school',
    description: "Diploma's en certificaten",
    order: 4,
  },
};

// === EXTERNAL URLS ===

export function getVerifyUrl(type: CertificaatType, value?: string): string | null {
  const config = getCertificaatTypeConfig(type);
  
  if (config?.verifyUrl && value) {
    return config.verifyUrl(value);
  }
  
  return config?.externalUrl || null;
}

// === COMPLIANCE STATUS ===

export interface ComplianceStatus {
  complete: boolean;
  score: number;           // 0-100
  missing: CertificaatType[];
  present: CertificaatType[];
}

export function getComplianceStatus(certificaatTypes: CertificaatType[]): ComplianceStatus {
  const required: CertificaatType[] = ['big', 'kvk', 'wtza', 'wkkgz', 'verzekering'];
  const present = required.filter(r => certificaatTypes.includes(r));
  const missing = required.filter(r => !certificaatTypes.includes(r));
  
  return {
    complete: missing.length === 0,
    score: Math.round((present.length / required.length) * 100),
    missing,
    present,
  };
}

// === BADGE DISPLAY ORDER ===

// Volgorde voor badges in hero sectie
export const HERO_BADGE_ORDER: CertificaatType[] = ['big', 'kvk', 'wtza', 'wkkgz'];

// Volgorde voor credentials sectie
export const CREDENTIALS_DISPLAY_ORDER: CertificaatType[] = [
  'big', 'agb',
  'kvk', 'btw',
  'wtza', 'wkkgz', 'klachtenregeling', 'verzekering', 'vog',
  'diploma', 'kiwa',
];

// === COLOR HELPERS (dynamic Tailwind classes don't work, use these) ===

export const CERTIFICAAT_COLORS: Record<string, {
  bg: string;
  bgLight: string;
  text: string;
  border: string;
}> = {
  emerald: {
    bg: 'bg-emerald-500',
    bgLight: 'bg-emerald-50',
    text: 'text-emerald-600',
    border: 'border-emerald-200',
  },
  blue: {
    bg: 'bg-blue-500',
    bgLight: 'bg-blue-50',
    text: 'text-blue-600',
    border: 'border-blue-200',
  },
  slate: {
    bg: 'bg-slate-500',
    bgLight: 'bg-slate-50',
    text: 'text-slate-600',
    border: 'border-slate-200',
  },
  gray: {
    bg: 'bg-gray-500',
    bgLight: 'bg-gray-50',
    text: 'text-gray-600',
    border: 'border-gray-200',
  },
  indigo: {
    bg: 'bg-indigo-500',
    bgLight: 'bg-indigo-50',
    text: 'text-indigo-600',
    border: 'border-indigo-200',
  },
  violet: {
    bg: 'bg-violet-500',
    bgLight: 'bg-violet-50',
    text: 'text-violet-600',
    border: 'border-violet-200',
  },
  purple: {
    bg: 'bg-purple-500',
    bgLight: 'bg-purple-50',
    text: 'text-purple-600',
    border: 'border-purple-200',
  },
  cyan: {
    bg: 'bg-cyan-500',
    bgLight: 'bg-cyan-50',
    text: 'text-cyan-600',
    border: 'border-cyan-200',
  },
  amber: {
    bg: 'bg-amber-500',
    bgLight: 'bg-amber-50',
    text: 'text-amber-600',
    border: 'border-amber-200',
  },
  rose: {
    bg: 'bg-rose-500',
    bgLight: 'bg-rose-50',
    text: 'text-rose-600',
    border: 'border-rose-200',
  },
  pink: {
    bg: 'bg-pink-500',
    bgLight: 'bg-pink-50',
    text: 'text-pink-600',
    border: 'border-pink-200',
  },
};

export function getCertificaatColorClasses(type: CertificaatType) {
  const config = getCertificaatTypeConfig(type);
  const color = config?.color ?? 'slate';
  return CERTIFICAAT_COLORS[color] ?? CERTIFICAAT_COLORS.slate;
}