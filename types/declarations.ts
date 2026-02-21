// types/declarations.ts
// Types voor het Professioneel Zorgprofiel / Trust Widget systeem

// ============================================
// DECLARATION TYPES
// ============================================

export interface ProfessionalDeclaration {
  id: string;
  site_id: string;
  user_id: string;

  // Geverifieerde gegevens
  big_nummer: string | null;
  big_beroep: string | null;
  big_specialismen: string[];
  big_verified: boolean;
  big_verified_at: string | null;
  big_geldig: boolean;

  kvk_nummer: string | null;
  kvk_handelsnaam: string | null;
  kvk_verified: boolean;
  kvk_verified_at: string | null;

  website_actief: boolean;

  // Zelfverklaarde items
  verklaring_lrza: boolean;
  verklaring_wtza: boolean;
  verklaring_wkkgz: boolean;
  verklaring_dossiervoering: boolean;
  verklaring_avg: boolean;
  verklaring_richtlijnen: boolean;
  verklaring_incidenten: boolean;
  verklaring_scholing: boolean;
  verklaring_afspraken: boolean;

  extra_verklaringen: ExtraVerklaring[];

  // Widget config
  widget_enabled: boolean;
  widget_style: WidgetStyle;

  // Meta
  declaration_accepted_at: string | null;
  declaration_ip: string | null;
  last_reverified_at: string | null;
  created_at: string;
  updated_at: string;
}

export type WidgetStyle = 'default' | 'compact' | 'minimal';

export interface ExtraVerklaring {
  key: string;
  label: string;
  active: boolean;
}

// ============================================
// VERKLARING CONFIGURATIE
// ============================================

export interface VerklaringConfig {
  key: VerklaringKey;
  label: string;
  shortLabel: string;
  description: string;
  category: 'registratie' | 'compliance' | 'kwaliteit';
  icon: string;
  helpUrl?: string;
  tooltip?: string;
}

export type VerklaringKey =
  | 'lrza'
  | 'wtza'
  | 'wkkgz'
  | 'dossiervoering'
  | 'avg'
  | 'richtlijnen'
  | 'incidenten'
  | 'scholing'
  | 'afspraken';

export const VERKLARING_CONFIGS: VerklaringConfig[] = [
  {
    key: 'lrza',
    label: 'Geregistreerd in het Zorgaanbiedersportaal (LRZa)',
    shortLabel: 'LRZa-registratie',
    description: 'Ik sta geregistreerd als zorgaanbieder in het Landelijk Register Zorgaanbieders.',
    category: 'registratie',
    icon: 'app_registration',
    helpUrl: 'https://www.toetredingzorgaanbieders.nl/',
    tooltip: 'Verplicht voor zorgaanbieders die Zvw- of Wlz-zorg leveren.',
  },
  {
    key: 'wtza',
    label: 'Voldoet aan de meldplicht Wtza',
    shortLabel: 'Wtza-melding',
    description: 'Ik heb voldaan aan de meldplicht op grond van de Wet toetreding zorgaanbieders.',
    category: 'registratie',
    icon: 'gavel',
    helpUrl: 'https://www.toetredingzorgaanbieders.nl/wtza',
    tooltip: 'Sinds 1 januari 2022 verplicht voor nieuwe zorgaanbieders.',
  },
  {
    key: 'wkkgz',
    label: 'Klachtenregeling conform Wkkgz',
    shortLabel: 'Wkkgz-klachtenregeling',
    description: 'Ik beschik over een klachtenregeling die voldoet aan de Wet kwaliteit, klachten en geschillen zorg.',
    category: 'compliance',
    icon: 'support_agent',
    helpUrl: 'https://www.rijksoverheid.nl/onderwerpen/kwaliteit-van-de-zorg/wet-kwaliteit-klachten-en-geschillen-zorg',
    tooltip: 'Verplicht voor alle zorgaanbieders op grond van de Wkkgz.',
  },
  {
    key: 'dossiervoering',
    label: 'Werkt met zorgdossier en passende dossiervoering',
    shortLabel: 'Dossiervoering',
    description: 'Ik werk met een professioneel zorgdossier en houd mij aan de geldende bewaartermijnen.',
    category: 'kwaliteit',
    icon: 'folder_shared',
    tooltip: 'Op grond van de WGBO moet een zorgverlener een dossier bijhouden.',
  },
  {
    key: 'avg',
    label: 'Voldoet aan AVG-verplichtingen in de zorg',
    shortLabel: 'AVG-compliance',
    description: 'Ik verwerk persoonsgegevens conform de Algemene Verordening Gegevensbescherming.',
    category: 'compliance',
    icon: 'shield',
    helpUrl: 'https://www.autoriteitpersoonsgegevens.nl/themas/gezondheid',
    tooltip: 'Zorgverleners verwerken bijzondere persoonsgegevens en moeten extra zorgvuldig zijn.',
  },
  {
    key: 'richtlijnen',
    label: 'Werkt volgens professionele richtlijnen en kwaliteitsnormen',
    shortLabel: 'Professionele richtlijnen',
    description: 'Ik werk volgens de beroepsstandaarden en richtlijnen die gelden voor mijn vakgebied.',
    category: 'kwaliteit',
    icon: 'menu_book',
    tooltip: 'Denk aan richtlijnen van V&VN, KNMG, NIP, of andere beroepsverenigingen.',
  },
  {
    key: 'incidenten',
    label: 'Registreert incidenten zorgvuldig',
    shortLabel: 'Incidentregistratie',
    description: 'Ik registreer incidenten zorgvuldig en handel deze af conform de geldende procedures.',
    category: 'kwaliteit',
    icon: 'report',
    tooltip: 'Op grond van de Wkkgz zijn zorgaanbieders verplicht incidenten te melden.',
  },
  {
    key: 'scholing',
    label: 'Investeert in deskundigheidsbevordering en intervisie',
    shortLabel: 'Scholing & intervisie',
    description: 'Ik investeer actief in bij- en nascholing en neem deel aan intervisie of supervisie.',
    category: 'kwaliteit',
    icon: 'school',
    tooltip: 'Continue professionele ontwikkeling is essentieel voor kwaliteit van zorg.',
  },
  {
    key: 'afspraken',
    label: 'Werkt met duidelijke afspraken over zorgverlening',
    shortLabel: 'Zorgafspraken',
    description: 'Ik maak heldere afspraken met opdrachtgevers over de te leveren zorg en cliëntveiligheid.',
    category: 'kwaliteit',
    icon: 'handshake',
    tooltip: 'Duidelijke afspraken vormen de basis voor verantwoorde zorgverlening.',
  },
];

// ============================================
// WIDGET DATA (publieke weergave)
// ============================================

export interface WidgetData {
  naam: string;
  beroep: string;
  verified: {
    big: {
      status: boolean;
      beroep: string | null;
      geldig: boolean;
    };
    kvk: {
      status: boolean;
      handelsnaam: string | null;
    };
    website: boolean;
  };
  declarations: Record<VerklaringKey, boolean>;
  declaration_date: string | null;
  last_reverified: string | null;
  compliance_score: number;
}

// ============================================
// HELPERS
// ============================================

export function getVerklaringsByCategory(category: VerklaringConfig['category']): VerklaringConfig[] {
  return VERKLARING_CONFIGS.filter((v) => v.category === category);
}

export function countActiveDeclarations(declaration: ProfessionalDeclaration): {
  verified: number;
  verifiedTotal: number;
  declared: number;
  declaredTotal: number;
  score: number;
} {
  const verifiedItems = [
    declaration.big_verified,
    !!(declaration.kvk_nummer && declaration.kvk_nummer.length > 0),
    declaration.website_actief,
  ];

  const declaredItems = [
    declaration.verklaring_lrza,
    declaration.verklaring_wtza,
    declaration.verklaring_wkkgz,
    declaration.verklaring_dossiervoering,
    declaration.verklaring_avg,
    declaration.verklaring_richtlijnen,
    declaration.verklaring_incidenten,
    declaration.verklaring_scholing,
    declaration.verklaring_afspraken,
  ];

  const verified = verifiedItems.filter(Boolean).length;
  const declared = declaredItems.filter(Boolean).length;
  const total = verifiedItems.length + declaredItems.length;
  const active = verified + declared;

  return {
    verified,
    verifiedTotal: verifiedItems.length,
    declared,
    declaredTotal: declaredItems.length,
    score: Math.round((active / total) * 100),
  };
}