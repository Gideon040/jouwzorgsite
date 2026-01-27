// constants/beroepen.ts - Beroep opties voor wizard

export const BEROEPEN = [
  { 
    id: 'verpleegkundige', 
    label: 'Verpleegkundige',
    description: 'HBO of MBO verpleegkundige',
    icon: 'medical_services'
  },
  { 
    id: 'verzorgende_ig', 
    label: 'Verzorgende IG',
    description: 'Verzorgende Individuele Gezondheidszorg',
    icon: 'health_and_safety'
  },
  { 
    id: 'helpende', 
    label: 'Helpende',
    description: 'Helpende Zorg en Welzijn',
    icon: 'volunteer_activism'
  },
  { 
    id: 'kraamverzorgende', 
    label: 'Kraamverzorgende',
    description: 'Kraamzorg specialist',
    icon: 'child_friendly'
  },
  { 
    id: 'thuiszorg', 
    label: 'Thuiszorg medewerker',
    description: 'Algemene thuiszorg',
    icon: 'home_health'
  },
  { 
    id: 'pgb_zorgverlener', 
    label: 'PGB Zorgverlener',
    description: 'Zorg via Persoonsgebonden Budget',
    icon: 'payments'
  },
  { 
    id: 'anders', 
    label: 'Anders',
    description: 'Ander type zorgprofessional',
    icon: 'more_horiz'
  },
] as const;

export type BeroepId = typeof BEROEPEN[number]['id'];

export function getBeroepById(id: string) {
  return BEROEPEN.find(b => b.id === id);
}

export function getBeroepLabel(id: string): string {
  return getBeroepById(id)?.label ?? id;
}
