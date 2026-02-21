// app/dev/preview/mockData.ts
// Mock data voor de sectie preview catalogus

import type { SiteContent, GeneratedContent } from '@/types';

export const MOCK_BEROEP_LABEL = 'Verpleegkundige';

export const MOCK_CONTENT: SiteContent = {
  naam: 'Lisa van der Berg',
  foto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
  tagline: 'Persoonlijke verpleegkundige zorg aan huis',
  over_mij:
    'Als gediplomeerd verpleegkundige met meer dan 12 jaar ervaring in de thuiszorg, geloof ik dat goede zorg begint bij een persoonlijke benadering. Ik combineer medische expertise met oprechte aandacht voor de mens achter de zorgvraag. Mijn drijfveer is het verschil maken in het dagelijks leven van mijn cliënten.',
  contact: {
    email: 'lisa@jouwzorgsite.nl',
    telefoon: '06 12345678',
    werkgebied: ['Amsterdam', 'Haarlem', 'Amstelveen'],
  },
  diensten: [
    { naam: 'Thuisverpleging', beschrijving: 'Professionele verpleegkundige zorg in uw eigen vertrouwde omgeving.', icon: 'home_health' },
    { naam: 'Wondverzorging', beschrijving: 'Deskundige behandeling en verzorging van acute en chronische wonden.', icon: 'healing' },
    { naam: 'Medicatiebeheer', beschrijving: 'Veilig en correct toedienen en beheren van medicatie.', icon: 'medication' },
    { naam: 'Palliatieve zorg', beschrijving: 'Liefdevolle begeleiding en comfort in de laatste levensfase.', icon: 'favorite' },
  ],
  certificaten: [
    { type: 'big', label: 'BIG-registratie', value: '19012345678', sublabel: 'Verpleegkundige' },
    { type: 'kvk', label: 'KvK-nummer', value: '12345678' },
    { type: 'agb', label: 'AGB-code', value: '01-123456' },
    { type: 'verzekering', label: 'Beroepsaansprakelijkheid', sublabel: 'VvAA' },
    { type: 'diploma', label: 'HBO Verpleegkunde', sublabel: 'Hogeschool van Amsterdam, 2012' },
  ],
  zakelijk: {
    kvk: '12345678',
    btw: 'NL001234567B01',
    handelsnaam: 'Lisa Zorg',
  },
  socials: {
    linkedin: 'https://linkedin.com/in/lisavanderberg',
    instagram: 'https://instagram.com/lisazorg',
  },
  beschikbaar: true,
  start_carriere: 2012,
  expertises: ['Thuisverpleging', 'Palliatieve zorg', 'Wondverzorging', 'Dementiezorg'],
  werkervaring: [
    { functie: 'ZZP Verpleegkundige', werkgever: 'Zelfstandig', start_jaar: 2018, beschrijving: 'Zelfstandig verpleegkundige met focus op thuiszorg en palliatieve zorg.' },
    { functie: 'Wijkverpleegkundige', werkgever: 'Buurtzorg', start_jaar: 2015, eind_jaar: 2018, beschrijving: 'Coördinatie van zorg in de wijk en begeleiding van een team van 8 collega\'s.' },
    { functie: 'Verpleegkundige', werkgever: 'Amsterdam UMC', start_jaar: 2012, eind_jaar: 2015, beschrijving: 'Werkzaam op de afdeling interne geneeskunde met focus op complexe zorgvragen.' },
  ],
  testimonials: [
    { tekst: 'Lisa is een fantastische verpleegkundige. Ze is niet alleen vakkundig, maar ook ontzettend warm en betrokken. Dankzij haar hulp kan mijn moeder veilig thuis blijven wonen.', naam: 'Familie Jansen', functie: 'Mantelzorger' },
    { tekst: 'Professioneel, betrouwbaar en altijd een luisterend oor. Lisa maakt echt het verschil in ons leven.', naam: 'M. de Vries', functie: 'Cliënt thuiszorg' },
    { tekst: 'De zorg van Lisa is van uitzonderlijke kwaliteit. Ze denkt proactief mee en is altijd bereikbaar wanneer het nodig is.', naam: 'R. Bakker', functie: 'Huisarts' },
  ],
  telefoon: '0612345678',
};

export const MOCK_GENERATED: GeneratedContent = {
  hero: {
    titel: 'Persoonlijke verpleegkundige zorg, bij u thuis',
    subtitel: 'Met meer dan 12 jaar ervaring bied ik professionele en warme zorg in uw eigen vertrouwde omgeving. Samen zorgen we ervoor dat u de beste zorg krijgt die bij u past.',
  },
  overMij: {
    titel: 'Over Lisa',
    intro: 'Al meer dan twaalf jaar werk ik met passie en toewijding als verpleegkundige. Mijn missie is simpel: zorgen dat u zich thuis veilig en verzorgd voelt.',
    body: 'Na mijn studie HBO Verpleegkunde aan de Hogeschool van Amsterdam begon ik mijn carrière in het Amsterdam UMC. Daar ontdekte ik mijn passie voor persoonsgerichte zorg. Via Buurtzorg maakte ik de overstap naar de wijkverpleging, waar ik leerde hoe waardevol het is om zorg dicht bij huis te bieden. Sinds 2018 werk ik als zelfstandig verpleegkundige en kan ik de zorg bieden die ik altijd voor ogen had: persoonlijk, professioneel en met oprechte aandacht.',
    persoonlijk: 'In mijn vrije tijd wandel ik graag met mijn hond langs het Amsterdamse Bos en volg ik regelmatig nascholingen om mijn kennis actueel te houden.',
  },
  diensten: {
    titel: 'Mijn Diensten',
    intro: 'Ik bied een breed scala aan verpleegkundige diensten, altijd afgestemd op uw persoonlijke situatie en wensen.',
    items: [
      { naam: 'Thuisverpleging', beschrijving: 'Professionele verpleegkundige zorg in uw eigen vertrouwde omgeving, van wondzorg tot medicatiebeheer.', icon: 'home_health' },
      { naam: 'Wondverzorging', beschrijving: 'Deskundige behandeling van acute en chronische wonden met de nieuwste technieken.', icon: 'healing' },
      { naam: 'Medicatiebeheer', beschrijving: 'Veilig en correct toedienen, beheren en monitoren van uw medicatie.', icon: 'medication' },
      { naam: 'Palliatieve zorg', beschrijving: 'Liefdevolle en professionele begeleiding in de laatste levensfase, voor cliënt en naasten.', icon: 'favorite' },
    ],
  },
  voorWie: {
    titel: 'Voor Wie',
    intro: 'Ik werk samen met diverse opdrachtgevers en bied zorg aan verschillende doelgroepen.',
    doelgroepen: [
      { type: 'thuiszorg', titel: 'Thuiszorg cliënten', tekst: 'Persoonlijke verpleegkundige zorg in uw eigen vertrouwde omgeving. Samen stellen we een zorgplan op dat bij u past.', tags: ['Wijkverpleging', 'Thuiszorg'], highlight: 'Persoonlijk zorgplan' },
      { type: 'instellingen', titel: 'Zorginstellingen', tekst: 'Flexibele inzet bij personeelstekort of piekdrukte. Ik sluit naadloos aan bij uw team en werkwijze.', tags: ['Flexibel', 'Teamplayer'] },
      { type: 'bemiddelaar', titel: 'Bemiddelingsbureaus', tekst: 'Betrouwbare samenwerking met transparante tarieven en directe beschikbaarheid.', tags: ['Betrouwbaar', 'Transparant'] },
      { type: 'pgb', titel: 'Particulieren (PGB)', tekst: 'Zorg op maat gefinancierd vanuit uw persoonsgebonden budget. Ik help ook met de administratie.', tags: ['PGB', 'Op maat'], highlight: 'Hulp bij PGB-aanvraag' },
    ],
  },
  werkwijze: {
    titel: 'Mijn Werkwijze',
    intro: 'In vier heldere stappen werken we samen aan de beste zorg voor uw situatie.',
    stappen: [
      { nummer: 1, titel: 'Kennismaking', beschrijving: 'We beginnen met een vrijblijvend gesprek waarin ik uw situatie en wensen in kaart breng.', icon: 'handshake' },
      { nummer: 2, titel: 'Zorgplan op Maat', beschrijving: 'Op basis van uw behoeften stel ik een persoonlijk zorgplan op, in overleg met huisarts en mantelzorgers.', icon: 'assignment' },
      { nummer: 3, titel: 'Zorgverlening', beschrijving: 'Ik lever de afgesproken zorg met aandacht voor uw comfort, welzijn en zelfstandigheid.', icon: 'favorite' },
      { nummer: 4, titel: 'Evaluatie & Bijstelling', beschrijving: 'Regelmatig evalueren we samen het zorgplan en passen we aan waar nodig.', icon: 'verified' },
    ],
    footer: 'Benieuwd hoe ik u kan helpen? Neem vrijblijvend contact op.',
  },
  credentials: {
    titel: 'Kwalificaties & Registraties',
    intro: 'Ik voldoe aan alle wettelijke eisen en investeer continu in mijn professionele ontwikkeling.',
  },
  testimonials: {
    titel: 'Wat Cliënten Zeggen',
    intro: 'Ervaringen van cliënten en hun naasten over de zorg die ik bied.',
    items: [
      { tekst: 'Lisa is een fantastische verpleegkundige. Ze is niet alleen vakkundig, maar ook ontzettend warm en betrokken.', naam: 'Familie Jansen', functie: 'Mantelzorger' },
      { tekst: 'Professioneel, betrouwbaar en altijd een luisterend oor. Lisa maakt echt het verschil.', naam: 'M. de Vries', functie: 'Cliënt thuiszorg' },
      { tekst: 'De zorg van Lisa is van uitzonderlijke kwaliteit. Ze denkt proactief mee.', naam: 'R. Bakker', functie: 'Huisarts' },
    ],
  },
  faq: {
    titel: 'Veelgestelde Vragen',
    intro: 'Antwoorden op de meest gestelde vragen over mijn dienstverlening.',
    items: [
      { vraag: 'Wat zijn uw werktijden?', antwoord: 'Ik werk flexibel en pas mijn tijden aan uw behoeften aan. Overdag ben ik het meest beschikbaar, maar voor dringende zaken ben ik ook buiten kantooruren bereikbaar.' },
      { vraag: 'Werkt u ook met PGB?', antwoord: 'Ja, ik werk met zowel PGB als zorg in natura. Ik help u graag met de administratieve afhandeling en kan u adviseren over de mogelijkheden.' },
      { vraag: 'In welke regio bent u werkzaam?', antwoord: 'Ik ben werkzaam in Amsterdam, Haarlem en Amstelveen en directe omgeving.' },
      { vraag: 'Hoe verloopt een eerste kennismaking?', antwoord: 'Bij een eerste kennismaking kom ik vrijblijvend bij u langs om uw situatie en wensen te bespreken. Samen kijken we wat de beste zorgoplossing is.' },
      { vraag: 'Bent u BIG-geregistreerd?', antwoord: 'Ja, ik ben BIG-geregistreerd als verpleegkundige. Mijn registratie is te controleren via het BIG-register.' },
    ],
  },
  cta: {
    titel: 'Klaar om de beste zorg te ontvangen?',
    tekst: 'Neem vandaag nog contact op voor een vrijblijvend kennismakingsgesprek. Samen bespreken we hoe ik u het beste kan helpen.',
    button: 'Neem Contact Op',
  },
  contact: {
    titel: 'Contact',
    intro: 'Heeft u vragen of wilt u een afspraak maken? Neem gerust contact met mij op. Ik reageer meestal binnen 24 uur.',
    cta: 'Stuur een bericht',
  },
  stats: [
    { value: '12+', label: 'Jaar ervaring' },
    { value: '200+', label: 'Tevreden cliënten' },
    { value: '4.9', label: 'Gemiddelde beoordeling' },
    { value: '24/7', label: 'Bereikbaarheid' },
  ],
  seo: {
    metaTitle: 'Lisa van der Berg - Verpleegkundige aan huis | Amsterdam',
    metaDescription: 'Persoonlijke verpleegkundige zorg aan huis in Amsterdam, Haarlem en Amstelveen. BIG-geregistreerd, 12+ jaar ervaring.',
  },
  quote: 'Goede zorg begint met luisteren — en daar neem ik alle tijd voor.',
};
