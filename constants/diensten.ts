// constants/diensten.ts - Diensten presets per beroep

export interface DienstPreset {
  id: string;
  naam: string;
  beschrijving: string;
  icon: string;
  beroepen: string[]; // Welke beroepen krijgen deze dienst als optie
}

export const DIENSTEN_PRESETS: DienstPreset[] = [
  // Algemene diensten (alle beroepen)
  {
    id: 'persoonlijke_verzorging',
    naam: 'Persoonlijke verzorging',
    beschrijving: 'Hulp bij wassen, aankleden en persoonlijke hygiëne',
    icon: 'shower',
    beroepen: ['verpleegkundige', 'verzorgende_ig', 'helpende', 'thuiszorg', 'pgb_zorgverlener'],
  },
  {
    id: 'medicatiebeheer',
    naam: 'Medicatiebeheer',
    beschrijving: 'Toedienen, controleren en beheren van medicatie',
    icon: 'medication',
    beroepen: ['verpleegkundige', 'verzorgende_ig', 'thuiszorg'],
  },
  {
    id: 'wondverzorging',
    naam: 'Wondverzorging',
    beschrijving: 'Verzorging van wonden, inclusief complexe wonden',
    icon: 'healing',
    beroepen: ['verpleegkundige', 'verzorgende_ig'],
  },
  {
    id: 'palliatieve_zorg',
    naam: 'Palliatieve zorg',
    beschrijving: 'Zorg en ondersteuning in de laatste levensfase',
    icon: 'spa',
    beroepen: ['verpleegkundige', 'verzorgende_ig', 'thuiszorg'],
  },
  {
    id: 'injecties',
    naam: 'Injecties toedienen',
    beschrijving: 'Subcutaan en intramusculair injecteren',
    icon: 'syringe',
    beroepen: ['verpleegkundige'],
  },
  {
    id: 'stomazorg',
    naam: 'Stomazorg',
    beschrijving: 'Verzorging en begeleiding bij stoma',
    icon: 'medical_information',
    beroepen: ['verpleegkundige', 'verzorgende_ig'],
  },
  {
    id: 'katheter_verzorging',
    naam: 'Katheter verzorging',
    beschrijving: 'Plaatsen en verzorgen van katheters',
    icon: 'medical_services',
    beroepen: ['verpleegkundige'],
  },
  {
    id: 'bloeddruk_meten',
    naam: 'Vitale functies meten',
    beschrijving: 'Bloeddruk, temperatuur, saturatie meten',
    icon: 'monitor_heart',
    beroepen: ['verpleegkundige', 'verzorgende_ig'],
  },
  {
    id: 'huishoudelijke_hulp',
    naam: 'Huishoudelijke hulp',
    beschrijving: 'Lichte huishoudelijke taken',
    icon: 'cleaning_services',
    beroepen: ['helpende', 'thuiszorg', 'pgb_zorgverlener'],
  },
  {
    id: 'begeleiding',
    naam: 'Begeleiding',
    beschrijving: 'Dagelijkse begeleiding en structuur bieden',
    icon: 'support',
    beroepen: ['helpende', 'verzorgende_ig', 'pgb_zorgverlener'],
  },
  
  // Kraamzorg specifiek
  {
    id: 'kraamzorg',
    naam: 'Kraamzorg',
    beschrijving: 'Complete kraamzorg voor moeder en baby',
    icon: 'child_friendly',
    beroepen: ['kraamverzorgende'],
  },
  {
    id: 'borstvoeding',
    naam: 'Borstvoedingsbegeleiding',
    beschrijving: 'Hulp en advies bij het geven van borstvoeding',
    icon: 'breastfeeding',
    beroepen: ['kraamverzorgende'],
  },
  {
    id: 'babyverzorging',
    naam: 'Babyverzorging',
    beschrijving: 'Verzorging van de pasgeborene',
    icon: 'baby_changing_station',
    beroepen: ['kraamverzorgende'],
  },
  {
    id: 'navelzorg',
    naam: 'Navelzorg',
    beschrijving: 'Verzorging van de navelstreng',
    icon: 'healing',
    beroepen: ['kraamverzorgende'],
  },
  {
    id: 'voorlichting_kraam',
    naam: 'Voorlichting & advies',
    beschrijving: 'Voorlichting over baby- en moederzorg',
    icon: 'info',
    beroepen: ['kraamverzorgende'],
  },
] as const;

export function getDienstenForBeroep(beroepId: string): DienstPreset[] {
  return DIENSTEN_PRESETS.filter(d => 
    d.beroepen.includes(beroepId) || d.beroepen.includes('anders')
  );
}

export function getDienstById(id: string): DienstPreset | undefined {
  return DIENSTEN_PRESETS.find(d => d.id === id);
}
