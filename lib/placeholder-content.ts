// lib/placeholder-content.ts - Genereer placeholder content per specialisatie

import { SiteContent, Dienst, Certificaat } from '@/types';
import { getDienstenForBeroep, getBeroepLabel } from '@/constants';

interface PlaceholderInput {
  naam: string;
  beroep: string;
  email: string;
}

const TAGLINES: Record<string, string[]> = {
  verpleegkundige: [
    'Professionele verpleegkundige zorg aan huis',
    'Persoonlijke zorg met aandacht en expertise',
    'Ervaren verpleegkundige, altijd dichtbij',
  ],
  verzorgende_ig: [
    'Warme verzorging met vakbekwaamheid',
    'Persoonlijke aandacht, professionele zorg',
    'Zorg die past bij uw leven',
  ],
  helpende: [
    'Een helpende hand wanneer u het nodig heeft',
    'Ondersteuning in het dagelijks leven',
    'Met zorg en aandacht voor u klaar',
  ],
  kraamverzorgende: [
    'Een warm begin voor uw gezin',
    'Liefdevolle kraamzorg aan huis',
    'De beste start voor moeder en baby',
  ],
  thuiszorg: [
    'Zorg aan huis die bij u past',
    'Vertrouwde zorg in uw eigen omgeving',
    'Thuiszorg met een persoonlijke aanpak',
  ],
  pgb_zorgverlener: [
    'Flexibele zorg via uw PGB',
    'Persoonlijke zorg, uw eigen keuze',
    'PGB-zorg op maat',
  ],
  anders: [
    'Professionele zorg met een persoonlijke touch',
    'Zorg die bij u past',
    'Met aandacht voor wat u nodig heeft',
  ],
};

const OVER_MIJ: Record<string, string> = {
  verpleegkundige: `Als verpleegkundige zet ik mij dagelijks in voor de beste zorg. Met jarenlange ervaring in diverse zorgsituaties, weet ik wat er nodig is om u de zorg te bieden die u verdient. Persoonlijke aandacht en vakbekwaamheid staan bij mij centraal.`,
  verzorgende_ig: `Als Verzorgende IG combineer ik warmte met professionaliteit. Ik geloof dat goede zorg begint bij echt luisteren naar wat iemand nodig heeft. Met respect voor uw eigenheid help ik u zo zelfstandig mogelijk te blijven.`,
  helpende: `Als helpende sta ik voor u klaar met ondersteuning in het dagelijks leven. Van huishoudelijke taken tot gezelschap - ik help waar nodig is, zodat u comfortabel thuis kunt blijven wonen.`,
  kraamverzorgende: `Als kraamverzorgende begeleid ik gezinnen in de bijzondere eerste dagen na de geboorte. Met kennis, ervaring en een warm hart zorg ik ervoor dat moeder, baby en het hele gezin een goede start maken.`,
  thuiszorg: `In de thuiszorg draait alles om zorg in uw vertrouwde omgeving. Ik kom bij u thuis en help met wat nodig is, van persoonlijke verzorging tot huishoudelijke ondersteuning. Samen zorgen we dat u prettig thuis kunt blijven.`,
  pgb_zorgverlener: `Als PGB-zorgverlener bied ik flexibele, persoonlijke zorg die aansluit bij uw wensen. U houdt de regie over uw eigen zorg, en ik ondersteun u daarbij met kennis en toewijding.`,
  anders: `Met passie voor de zorg help ik mensen in hun dagelijks leven. Persoonlijke aandacht en respect voor uw wensen staan altijd centraal in mijn werk.`,
};

export function generatePlaceholderContent(input: PlaceholderInput): SiteContent {
  const { naam, beroep, email } = input;
  
  // Pak random tagline voor dit beroep
  const taglines = TAGLINES[beroep] || TAGLINES.anders;
  const tagline = taglines[Math.floor(Math.random() * taglines.length)];
  
  // Haal over_mij tekst op
  const over_mij = OVER_MIJ[beroep] || OVER_MIJ.anders;
  
  // Haal eerste 3-4 diensten voor dit beroep
  const dienstenPresets = getDienstenForBeroep(beroep).slice(0, 4);
  const diensten: Dienst[] = dienstenPresets.map(d => ({
    naam: d.naam,
    beschrijving: d.beschrijving,
    icon: d.icon,
  }));
  
  const beroepLabel = getBeroepLabel(beroep);
  const mockEmail = email || `info@${naam.toLowerCase().replace(/[^a-z0-9]/g, '')}.nl`;
  const mockTelefoon = '06 12345678';

  const certificaten: Certificaat[] = [
    { type: 'big', label: 'BIG-registratie', value: '29XXXXXXXXX', sublabel: beroepLabel },
    { type: 'kvk', label: 'KvK-inschrijving', value: '12345678' },
    { type: 'wtza', label: 'Wtza-melding' },
    { type: 'wkkgz', label: 'Wkkgz compliant' },
    { type: 'verzekering', label: 'Beroepsaansprakelijkheid' },
  ];

  const currentYear = new Date().getFullYear();

  return {
    naam,
    tagline,
    over_mij,
    foto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    contact: {
      email: mockEmail,
      telefoon: mockTelefoon,
      werkgebied: ['Regio'],
    },
    diensten,
    certificaten,
    zakelijk: {
      kvk: '12345678',
      btw: 'NL123456789B01',
      handelsnaam: `${naam} Zorg`,
    },
    kleuren: { primary: '#137fec' },
    socials: {
      linkedin: 'https://linkedin.com/in/voorbeeld',
      facebook: 'https://facebook.com/voorbeeld',
    },
    beschikbaar: true,
    start_carriere: currentYear - 5,
    werkervaring: [
      { functie: `Zelfstandig ${beroepLabel}`, werkgever: 'Eigen praktijk', startJaar: currentYear - 2 },
      { functie: beroepLabel, werkgever: 'Zorginstelling', startJaar: currentYear - 6, eindJaar: currentYear - 2 },
      { functie: `Junior ${beroepLabel}`, werkgever: 'Ziekenhuis', startJaar: currentYear - 10, eindJaar: currentYear - 6 },
    ],
    expertises: ['Persoonlijke verzorging', 'Wondverzorging', 'Medicatiebeheer', 'Palliatieve zorg'],
    testimonials: [
      { tekst: `${naam} levert uitstekende zorg met oprechte aandacht voor de cliënt.`, naam: 'Familie Jansen', functie: 'Cliënt' },
      { tekst: 'Professioneel, betrouwbaar en altijd bereid om een stap extra te zetten.', naam: 'M. de Vries', functie: 'Mantelzorger' },
      { tekst: 'Fijne samenwerking, goede communicatie en warme persoonlijkheid.', naam: 'R. Bakker', functie: 'Opdrachtgever' },
    ],
    telefoon: mockTelefoon,
  };
}

// Genereer placeholder voor preview voordat user alles invult
export function generateQuickPlaceholder(naam: string, beroep: string): Partial<SiteContent> {
  const taglines = TAGLINES[beroep] || TAGLINES.anders;
  const tagline = taglines[Math.floor(Math.random() * taglines.length)];
  const over_mij = OVER_MIJ[beroep] || OVER_MIJ.anders;
  
  const dienstenPresets = getDienstenForBeroep(beroep).slice(0, 4);
  const diensten: Dienst[] = dienstenPresets.map(d => ({
    naam: d.naam,
    beschrijving: d.beschrijving,
    icon: d.icon,
  }));

  return {
    naam,
    tagline,
    over_mij,
    diensten,
    beschikbaar: true,
  };
}
