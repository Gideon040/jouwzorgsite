// constants/index.ts - Export all constants

export * from './beroepen';
export * from './diensten';
export * from './certificaten';

// Template options
export const TEMPLATES = [
  {
    id: 'warm',
    naam: 'Warm',
    beschrijving: 'Zacht, uitnodigend & vertrouwd',
    colors: {
      primary: '#f97316',
      secondary: '#fbbf24',
    },
  },
  {
    id: 'modern',
    naam: 'Modern',
    beschrijving: 'Strak, fris & professioneel',
    colors: {
      primary: '#0ea5e9',
      secondary: '#6366f1',
    },
  },
  {
    id: 'editorial',
    naam: 'Editorial',
    beschrijving: 'Typografisch, verhalend & uniek',
    colors: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
  },
] as const;

export type TemplateId = typeof TEMPLATES[number]['id'];

// Pricing plans
export const PLANS = [
  {
    id: 'starter',
    naam: 'Starter',
    prijs: 1495, // in centen
    prijsLabel: '€14,95',
    beschrijving: 'Perfect om te starten',
    features: [
      '1 pagina (onepage)',
      'Subdomein (naam.jouwzorgsite.nl)',
      'BIG-badge verificatie',
      'SSL certificaat',
      'AVG-compliant',
    ],
  },
  {
    id: 'professional',
    naam: 'Professional',
    prijs: 2495,
    prijsLabel: '€24,95',
    beschrijving: 'Meest gekozen',
    popular: true,
    features: [
      '5 pagina\'s',
      'Eigen .nl domein',
      'Certificaten pagina',
      'Contact formulier',
      'Alles van Starter',
    ],
  },
  {
    id: 'expert',
    naam: 'Expert',
    prijs: 3495,
    prijsLabel: '€34,95',
    beschrijving: 'Voor de professional',
    features: [
      '10 pagina\'s',
      'Blog functie',
      'Prioriteit support',
      'Tarieven pagina',
      'Alles van Professional',
    ],
  },
] as const;

export type PlanId = typeof PLANS[number]['id'];
