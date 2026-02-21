// supabase/functions/generate-site/index.ts
// Edge function met 5 templates: editorial, proactief, portfolio, mindoor, serene
// v9: Color Story System — 20 unique palettes
//     - CHANGED: TEMPLATE_PALETTES now uses 20 truly distinct palettes
//     - No more clones (editorial≠sage, portfolio≠forest, proactief≠teal)
//     - Each palette has primary ≠ accent + unique bg tints
//     - Inherited from v8: equal weights, no mixing, unlocked variants
//     - v9-fix: Fixed all tagged template literal syntax errors

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import Anthropic from 'npm:@anthropic-ai/sdk@0.39.0'

// ============================================
// TYPES
// ============================================

interface WizardInput {
  naam: string
  beroep: string
  email?: string
  telefoon?: string
  werkgebied?: string[]
  omschrijving?: string
  stijlKeuze?: string
  specialisaties?: string[]
  expertises?: string[]
  jarenErvaring?: number
  startJaarZZP?: number
  werkervaring?: { functie: string; werkgever: string; startJaar: number; eindJaar?: number }[]
  certificaten?: { type: string; label: string; value?: string; sublabel?: string }[]
  diensten?: { naam: string; beschrijving?: string }[]
  beschikbaarheid?: { status: 'beschikbaar' | 'beperkt' | 'niet_beschikbaar'; uren?: string; opmerking?: string }
  persoonlijkeNoot?: string
  tagline?: string
  cachedAnalyse?: any
  regeneration?: boolean
  regenerationCount?: number
}

// ============================================
// 5 HOOFDTEMPLATES
// ============================================

type TemplateId = 'editorial' | 'proactief' | 'portfolio' | 'mindoor' | 'serene';

// ============================================
// DESIGN GROUPS — Bepaalt welke templates mogen mixen
// ============================================
// Elegant: editorial, portfolio, serene → kunnen onderling mixen
// Professional: proactief → standalone
// Friendly: mindoor → standalone

const COMPATIBILITY_MAP: Record<TemplateId, TemplateId[]> = {
  editorial: ['editorial', 'portfolio', 'serene'],
  proactief: ['proactief'],
  portfolio: ['editorial', 'portfolio', 'serene'],
  mindoor: ['mindoor'],
  serene: ['editorial', 'portfolio', 'serene'],
};

// ============================================
// STIJLKEUZE → TEMPLATE (5 keuzes → 5 unieke templates)
// ============================================

const STIJL_TEMPLATE_MAP: Record<string, TemplateId> = {
  // Must match StijlKeuze type in WizardSection.tsx:
  // 'warm' | 'modern' | 'zakelijk' | 'energiek' | 'calm'
  warm: 'editorial',
  calm: 'serene',
  modern: 'proactief',
  zakelijk: 'portfolio',
  energiek: 'mindoor',
  // Legacy values (backwards compatibility)
  rustig: 'serene',
  vriendelijk: 'mindoor',
  // Fallback
  default: 'editorial',
};

function getTemplateForStijl(stijlKeuze: string): TemplateId {
  return STIJL_TEMPLATE_MAP[stijlKeuze] || STIJL_TEMPLATE_MAP.default;
}

// ============================================
// PALETTE OPTIES PER TEMPLATE
// ============================================

const TEMPLATE_PALETTES: Record<TemplateId, string[]> = {
  editorial: ['editorial', 'burgundy', 'navy', 'caramel'],
  proactief: ['proactief', 'electric', 'sunset', 'emerald'],
  portfolio: ['portfolio', 'charcoal', 'midnight', 'espresso'],
  mindoor:   ['mindoor', 'dustyrose', 'olive', 'amber'],
  serene:    ['serene', 'stone', 'dusk', 'moss'],
};

const TEMPLATES: Record<TemplateId, { name: string; description: string; fonts: string }> = {
  editorial: {
    name: 'Editorial',
    description: 'Klassiek & warm met serif fonts',
    fonts: 'editorial',
  },
  proactief: {
    name: 'ProActief',
    description: 'Modern & energiek met gradients',
    fonts: 'proactief',
  },
  portfolio: {
    name: 'Portfolio',
    description: 'Elegant & sophisticated',
    fonts: 'portfolio',
  },
  mindoor: {
    name: 'Mindoor',
    description: 'Warm & organisch',
    fonts: 'mindoor',
  },
  serene: {
    name: 'Serene',
    description: 'Rustig & elegant met cream tinten',
    fonts: 'serene',
  },
};

// ============================================
// PROMPTS
// ============================================

const ANALYSE_PROMPT = `Analyseer deze zorgprofessional kort en bondig.

OUTPUT (alleen JSON, geen uitleg):
{
  "persoonlijkheid": "warm" | "zakelijk" | "rustig" | "energiek" | "vriendelijk",
  "werkgebied": "thuiszorg" | "instelling" | "ggz" | "ziekenhuis" | "kraamzorg" | "mix",
  "kernwoorden": ["woord1", "woord2", "woord3"]
}

REGELS:
- "warm": woorden als empathie, verbinding, persoonlijk, zorgzaam
- "zakelijk": woorden als expertise, specialist, resultaat, kwaliteit  
- "rustig": woorden als rust, balans, ruimte, veiligheid, sereen
- "energiek": woorden als flexibel, dynamisch, actief, jong
- "vriendelijk": woorden als welkom, toegankelijk, open, samen`

const CONTENT_PROMPT = `Je bent copywriter voor Nederlandse zorg. Genereer website content.

=== PROFIEL ===
{CONTEXT}

=== STIJL ===
Persoonlijkheid: {PERSOONLIJKHEID}
Template: {TEMPLATE}

=== TEMPLATE BESCHRIJVING ===
- editorial: Klassiek, warm, persoonlijk. Serif fonts, rustige uitstraling.
- proactief: Modern, energiek, dynamisch. Sans-serif, frisse kleuren.
- portfolio: Elegant, sophisticated, premium. Playfair fonts, donkergroen.
- mindoor: Warm, organisch, vriendelijk. Zachte vormen, coral accenten.
- serene: Rustig, elegant, sereen. Playfair fonts, cream tinten, minimalistisch.

=== SCHRIJFSTIJL PER TEMPLATE ===
- editorial: "ik", persoonlijk, woorden als "verbinding", "aandacht", "samen"
- proactief: actief, modern, woorden als "flexibel", "dynamisch", "resultaat"
- portfolio: professioneel, premium, woorden als "expertise", "kwaliteit", "ervaring"
- mindoor: warm, uitnodigend, woorden als "welkom", "ruimte", "persoonlijk"
- serene: kalm, sereen, woorden als "rust", "balans", "veiligheid", "stilte"

=== BELANGRIJKE REGELS ===
1. Diensten: Genereer ALTIJD EXACT 4 diensten (niet 3, niet 5)
2. Testimonials: Genereer ALTIJD EXACT 3 testimonials
3. FAQ: Genereer ALTIJD EXACT 5 vragen
4. Werkwijze: Genereer ALTIJD EXACT 4 stappen
5. VoorWie: Genereer ALTIJD EXACT 4 doelgroepen
6. Stats: Genereer ALTIJD EXACT 4 statistieken
7. CTA sectie: Kort en actiegericht (voor BOVEN de contactgegevens)
8. Contact sectie: Alleen een warme intro (contactgegevens komen uit het systeem)
9. Quote: Een persoonlijke, krachtige quote die past bij de zorgvisie (GEEN generiek citaat)
10. SEO: metaTitle max 60 tekens, metaDescription max 155 tekens, inclusief locatie/specialisatie

=== OUTPUT (alleen JSON, geen markdown) ===
{
  "hero": {
    "titel": "Max 6 woorden, pakkend",
    "subtitel": "Max 60 tekens, ondertitel"
  },
  "overMij": {
    "titel": "Sectie titel (bv: 'Over Mij', 'Mijn Aanpak', 'Wie Ben Ik')",
    "intro": "2 zinnen opening",
    "body": "2-3 zinnen over aanpak",
    "persoonlijk": "1 zin persoonlijk detail"
  },
  "diensten": {
    "titel": "Sectie titel",
    "intro": "Korte intro zin",
    "items": [
      { "naam": "Dienst 1", "beschrijving": "Max 100 tekens", "icon": "medical_services" },
      { "naam": "Dienst 2", "beschrijving": "Max 100 tekens", "icon": "favorite" },
      { "naam": "Dienst 3", "beschrijving": "Max 100 tekens", "icon": "healing" },
      { "naam": "Dienst 4", "beschrijving": "Max 100 tekens", "icon": "volunteer_activism" }
    ]
  },
  "voorWie": {
    "titel": "Voor Wie Werk Ik?",
    "intro": "Korte intro",
    "doelgroepen": [
      { "type": "instellingen", "titel": "Zorginstellingen", "tekst": "2 zinnen over samenwerking met zorginstellingen" },
      { "type": "bemiddelaars", "titel": "Bemiddelingsbureaus", "tekst": "2 zinnen over samenwerking met bureaus" },
      { "type": "pgb", "titel": "PGB Houders", "tekst": "2 zinnen over particuliere zorg" },
      { "type": "particulieren", "titel": "Particulieren", "tekst": "2 zinnen over directe zorg aan particulieren" }
    ]
  },
  "werkwijze": {
    "titel": "Mijn Werkwijze",
    "intro": "Hoe een samenwerking verloopt",
    "stappen": [
      { "nummer": 1, "titel": "Kennismaking", "beschrijving": "Beschrijving kennismakingsfase (2 zinnen)", "icon": "handshake" },
      { "nummer": 2, "titel": "Plan op Maat", "beschrijving": "Beschrijving planfase (2 zinnen)", "icon": "assignment" },
      { "nummer": 3, "titel": "Zorg Verlenen", "beschrijving": "Beschrijving zorgverlening (2 zinnen)", "icon": "favorite" },
      { "nummer": 4, "titel": "Evaluatie", "beschrijving": "Beschrijving evaluatie (2 zinnen)", "icon": "verified" }
    ],
    "footer": "Flexibel inzetbaar op korte en lange termijn."
  },
  "werkervaring": {
    "titel": "Sectie titel (bv: 'Mijn Ervaring', 'Professionele Achtergrond')",
    "intro": "Korte intro over werkervaring en loopbaan (1-2 zinnen)"
  },
  "credentials": {
    "titel": "Kwalificaties & Registraties",
    "intro": "Korte intro over kwalificaties (1-2 zinnen)"
  },
  "testimonials": {
    "titel": "Wat Anderen Zeggen",
    "intro": "Korte intro (1 zin)",
    "items": [
      { "tekst": "Positieve review (2-3 zinnen)", "naam": "Familie Jansen", "functie": "Cliënt thuiszorg" },
      { "tekst": "Andere positieve review (2-3 zinnen)", "naam": "M. de Vries", "functie": "Mantelzorger" },
      { "tekst": "Derde positieve review (2-3 zinnen)", "naam": "R. Bakker", "functie": "Familie van cliënt" }
    ]
  },
  "faq": {
    "titel": "Veelgestelde Vragen",
    "intro": "Antwoorden op veelgestelde vragen",
    "items": [
      { "vraag": "Wat zijn uw werktijden?", "antwoord": "Antwoord (2-3 zinnen)" },
      { "vraag": "Werkt u ook met PGB?", "antwoord": "Antwoord (2-3 zinnen)" },
      { "vraag": "In welke regio bent u werkzaam?", "antwoord": "Antwoord (2-3 zinnen)" },
      { "vraag": "Hoe verloopt een eerste kennismaking?", "antwoord": "Antwoord (2-3 zinnen)" },
      { "vraag": "Bent u BIG-geregistreerd?", "antwoord": "Antwoord (2-3 zinnen)" }
    ]
  },
  "cta": {
    "titel": "Zullen We Kennismaken?",
    "tekst": "Korte, uitnodigende zin (max 15 woorden)",
    "button": "Plan een Gesprek"
  },
  "contact": {
    "titel": "Contact Opnemen",
    "intro": "Warme uitnodiging om contact op te nemen (1-2 zinnen)"
  },
  "stats": [
    { "value": "{jarenErvaring}+", "label": "Jaren Ervaring" },
    { "value": "100+", "label": "Tevreden Cliënten" },
    { "value": "24/7", "label": "Bereikbaar" },
    { "value": "BIG", "label": "Geregistreerd" }
  ],
  "quote": "Een persoonlijke, inspirerende quote die de zorgvisie van deze professional samenvat (1 zin, max 20 woorden)",
  "seo": {
    "metaTitle": "Naam - Beroep | Korte tagline (max 60 tekens)",
    "metaDescription": "Overtuigende meta description voor Google zoekresultaten, max 155 tekens, met locatie en specialisatie"
  }
}`

// ============================================
// CRYPTO-BASED RANDOM
// ============================================

function cryptoRandom(): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] / (0xFFFFFFFF + 1);
}

function weightedRandomSimple<T>(items: T[], weights: number[]): T {
  const totalWeight = weights.reduce((sum, w) => sum + w, 0)
  let random = cryptoRandom() * totalWeight
  for (let i = 0; i < items.length; i++) {
    random -= weights[i]
    if (random <= 0) return items[i]
  }
  return items[items.length - 1]
}

// ============================================
// PALETTE SELECTIE
// ============================================

function selectPaletteForTemplate(template: TemplateId): string {
  const palettes = TEMPLATE_PALETTES[template];
  const index = Math.floor(cryptoRandom() * palettes.length);
  return palettes[index];
}

// ============================================
// SECTION STYLE GENERATION
// ============================================

const SECTION_ORDER = [
  'header',
  'hero',
  'stats',
  'diensten',
  'over',
  'credentials',
  'werkervaring',
  'voorwie',
  'quote',
  'werkwijze',
  'testimonials',
  'faq',
  'cta',
  'contact',
  'footer',
];

interface SectionConfig {
  type: string;
  style: string;
  variant?: number;  // For sections that use internal variant routing (e.g. werkwijze: 1, 2, or 3)
}

// ============================================
// SECTION NAMING PATTERNS (audited from components)
// ============================================

type NamingPattern = 'numbered' | 'first-plain' | 'plain-only' | 'quote';

const SECTION_NAMING: Record<string, { pattern: NamingPattern; variants: number }> = {
  // Numbered: all variants use -N suffix (editorial-1, editorial-2, editorial-3)
  werkervaring:  { pattern: 'numbered',     variants: 3 },
  // First-plain: variant 1 = plain name, 2/3 have suffix (editorial, editorial-2, editorial-3)
  hero:          { pattern: 'first-plain',  variants: 3 },
  diensten:      { pattern: 'first-plain',  variants: 3 },
  over:          { pattern: 'first-plain',  variants: 3 },
  faq:           { pattern: 'first-plain',  variants: 3 },
  testimonials:  { pattern: 'first-plain',  variants: 3 },
  voorwie:       { pattern: 'first-plain',  variants: 3 },
  contact:       { pattern: 'first-plain',  variants: 3 },
  // Plain-only: style = template name only (no -2/-3 components)
  header:        { pattern: 'plain-only',   variants: 1 },
  stats:         { pattern: 'plain-only',   variants: 1 },
  cta:           { pattern: 'plain-only',   variants: 1 },
  // werkwijze: uses internal variant prop (1/2/3), NOT style suffix
  werkwijze:     { pattern: 'plain-only',   variants: 1 },
  credentials:   { pattern: 'plain-only',   variants: 1 },
  footer:        { pattern: 'plain-only',   variants: 1 },
};

// Quote section has its own style names per template
const QUOTE_STYLES: Record<TemplateId, { styles: string[]; weights: number[] }> = {
  editorial: { styles: ['minimal', 'banner', 'dark'], weights: [0.4, 0.35, 0.25] },
  proactief: { styles: ['banner', 'dark', 'minimal'], weights: [0.4, 0.35, 0.25] },
  portfolio: { styles: ['dark', 'banner', 'minimal'], weights: [0.4, 0.35, 0.25] },
  mindoor:   { styles: ['minimal', 'banner', 'dark'], weights: [0.4, 0.35, 0.25] },
  serene:    { styles: ['serene'], weights: [1.0] },
};

// ============================================
// STYLE FORMAT HELPER
// ============================================

function formatStyle(template: string, variant: number, pattern: NamingPattern): string {
  if (pattern === 'plain-only') return template;
  if (pattern === 'numbered') return `${template}-${variant}`;
  // first-plain: variant 1 = plain name, 2+ get suffix
  return variant === 1 ? template : `${template}-${variant}`;
}

// ============================================
// STYLE SELECTION LOGIC
// ============================================

function selectSectionStyle(sectionType: string, baseTemplate: TemplateId): string {
  // Quote has its own naming
  if (sectionType === 'quote') {
    const config = QUOTE_STYLES[baseTemplate];
    if (!config) return 'minimal';
    return weightedRandomSimple(config.styles, config.weights);
  }

  const naming = SECTION_NAMING[sectionType];
  if (!naming) return baseTemplate; // unknown section → plain template name

  // Pick variant (1-based) — always within the same template
  const maxVariant = naming.variants;
  const variantNum = maxVariant > 1 ? Math.floor(cryptoRandom() * maxVariant) + 1 : 1;
  
  return formatStyle(baseTemplate, variantNum, naming.pattern);
}

function generateSections(template: TemplateId, requestId: string): SectionConfig[] {
  console.log(`🎲 [${requestId}] Generating section styles for template: ${template}`)
  console.log(`🎲 [${requestId}] Compatible templates: ${COMPATIBILITY_MAP[template].join(', ')}`)
  
  const sections = SECTION_ORDER.map(sectionType => {
    const style = selectSectionStyle(sectionType, template);
    
    const config: SectionConfig = { type: sectionType, style };
    
    // Werkwijze uses internal variant routing (1, 2, or 3) instead of style suffixes
    if (sectionType === 'werkwijze') {
      config.variant = Math.floor(cryptoRandom() * 3) + 1;
    }
    
    return config;
  });
  
  // Log results
  sections.forEach(s => {
    const isVariation = !s.style.startsWith(template);
    const variantStr = s.variant ? ` (v${s.variant})` : '';
    if (isVariation) {
      console.log(`   🔀 ${s.type}: ${s.style}${variantStr} (variatie!)`)
    } else {
      console.log(`   ✓  ${s.type}: ${s.style}${variantStr}`)
    }
  });
  
  const variations = sections.filter(s => !s.style.startsWith(template));
  console.log(`🎲 [${requestId}] Variaties: ${variations.length} van ${sections.length} secties`)
  
  return sections;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function buildContextString(data: WizardInput): string {
  const lines: string[] = []
  
  lines.push(`Naam: ${data.naam}`)
  lines.push(`Beroep: ${data.beroep}`)
  
  if (data.telefoon) lines.push(`Telefoon: ${data.telefoon}`)
  if (data.email) lines.push(`Email: ${data.email}`)
  if (data.werkgebied?.length) lines.push(`Werkgebied: ${data.werkgebied.join(', ')}`)
  if (data.specialisaties?.length) lines.push(`Specialisaties: ${data.specialisaties.join(', ')}`)
  if (data.expertises?.length) lines.push(`Expertises: ${data.expertises.join(', ')}`)
  if (data.jarenErvaring) lines.push(`Jaren ervaring: ${data.jarenErvaring}`)
  if (data.startJaarZZP) lines.push(`ZZP sinds: ${data.startJaarZZP}`)
  
  if (data.werkervaring?.length) {
    lines.push(`Werkervaring:`)
    data.werkervaring.forEach(w => {
      const periode = w.eindJaar ? `${w.startJaar}-${w.eindJaar}` : `${w.startJaar}-heden`
      lines.push(`- ${w.functie} bij ${w.werkgever} (${periode})`)
    })
  }
  
  if (data.certificaten?.length) {
    lines.push(`Certificaten/Registraties:`)
    data.certificaten.forEach(c => {
      if (c.value) {
        lines.push(`- ${c.label}: ${c.value}`)
      } else {
        lines.push(`- ${c.label}`)
      }
    })
  }
  
  if (data.diensten?.length) {
    lines.push(`Diensten:`)
    data.diensten.forEach(d => {
      if (d.beschrijving) {
        lines.push(`- ${d.naam}: ${d.beschrijving}`)
      } else {
        lines.push(`- ${d.naam}`)
      }
    })
  }
  
  if (data.beschikbaarheid) {
    lines.push(`Beschikbaarheid: ${data.beschikbaarheid.status}`)
    if (data.beschikbaarheid.uren) lines.push(`  Uren: ${data.beschikbaarheid.uren}`)
    if (data.beschikbaarheid.opmerking) lines.push(`  Opmerking: ${data.beschikbaarheid.opmerking}`)
  }
  
  if (data.omschrijving) {
    lines.push(``)
    lines.push(`EIGEN OMSCHRIJVING: "${data.omschrijving}"`)
  }
  
  if (data.persoonlijkeNoot) {
    lines.push(`PERSOONLIJKE NOOT: "${data.persoonlijkeNoot}"`)
  }
  
  if (data.tagline) {
    lines.push(`TAGLINE: "${data.tagline}"`)
  }
  
  if (data.stijlKeuze) {
    lines.push(`Stijlvoorkeur: ${data.stijlKeuze}`)
  }
  
  return lines.join('\n')
}

// ============================================
// RESPONSE VALIDATION — ensure all fields exist
// ============================================

function validateAndFillDefaults(json: any, input: WizardInput, template: TemplateId): any {
  const naam = input.naam || 'Zorgprofessional'
  const beroep = input.beroep || 'zorgprofessional'
  const werkgebied = input.werkgebied?.[0] || ''
  const jarenErvaring = input.jarenErvaring || 5

  // hero
  if (!json.hero || typeof json.hero !== 'object') {
    json.hero = { titel: `Zorg met Aandacht`, subtitel: `${naam} - ${beroep}` }
  }
  if (!json.hero.titel) json.hero.titel = 'Zorg met Aandacht'
  if (!json.hero.subtitel) json.hero.subtitel = `${naam} - ${beroep}`

  // overMij
  if (!json.overMij || typeof json.overMij !== 'object') {
    json.overMij = { titel: 'Over Mij', intro: '', body: '', persoonlijk: '' }
  }
  if (!json.overMij.titel) json.overMij.titel = 'Over Mij'
  if (!json.overMij.intro) json.overMij.intro = `Als ${beroep} sta ik klaar voor persoonlijke en professionele zorg.`
  if (!json.overMij.body) json.overMij.body = json.overMij.intro
  if (!json.overMij.persoonlijk) json.overMij.persoonlijk = 'Goede zorg begint bij echt luisteren naar wat iemand nodig heeft.'

  // diensten
  if (!json.diensten || typeof json.diensten !== 'object') {
    json.diensten = { titel: 'Mijn Diensten', intro: '', items: [] }
  }
  if (!json.diensten.titel) json.diensten.titel = 'Mijn Diensten'
  if (!json.diensten.intro) json.diensten.intro = `Professionele zorg afgestemd op uw situatie.`
  if (!Array.isArray(json.diensten.items) || json.diensten.items.length === 0) {
    json.diensten.items = [
      { naam: 'Persoonlijke Verzorging', beschrijving: 'Ondersteuning bij dagelijkse verzorging met aandacht voor waardigheid.', icon: 'favorite' },
      { naam: 'Verpleegkundige Zorg', beschrijving: 'Professionele verpleegkundige handelingen aan huis.', icon: 'medical_services' },
      { naam: 'Begeleiding', beschrijving: 'Hulp bij het behouden van zelfredzaamheid en dagstructuur.', icon: 'support' },
      { naam: 'Palliatieve Zorg', beschrijving: 'Zorgzame begeleiding in de laatste levensfase.', icon: 'volunteer_activism' },
    ]
  }

  // voorWie
  if (!json.voorWie || typeof json.voorWie !== 'object') {
    json.voorWie = { titel: 'Voor Wie Werk Ik?', intro: '', doelgroepen: [] }
  }
  if (!json.voorWie.titel) json.voorWie.titel = 'Voor Wie Werk Ik?'
  if (!json.voorWie.intro) json.voorWie.intro = `Als zelfstandig ${beroep} werk ik samen met diverse opdrachtgevers.`
  if (!Array.isArray(json.voorWie.doelgroepen) || json.voorWie.doelgroepen.length === 0) {
    json.voorWie.doelgroepen = [
      { type: 'instellingen', titel: 'Zorginstellingen', tekst: 'Samenwerking met zorginstellingen voor kwalitatieve zorgverlening.' },
      { type: 'bemiddelaars', titel: 'Bemiddelingsbureaus', tekst: 'Flexibele inzet via bemiddelingsbureaus in de zorg.' },
      { type: 'pgb', titel: 'PGB Houders', tekst: 'Persoonlijke zorg gefinancierd via een persoonsgebonden budget.' },
      { type: 'particulieren', titel: 'Particulieren', tekst: 'Directe zorg aan particulieren met persoonlijke aandacht.' },
    ]
  }

  // werkwijze
  if (!json.werkwijze || typeof json.werkwijze !== 'object') {
    json.werkwijze = { titel: 'Mijn Werkwijze', intro: '', stappen: [], footer: '' }
  }
  if (!json.werkwijze.titel) json.werkwijze.titel = 'Mijn Werkwijze'
  if (!json.werkwijze.intro) json.werkwijze.intro = 'Hoe een samenwerking met mij verloopt.'
  if (!Array.isArray(json.werkwijze.stappen) || json.werkwijze.stappen.length === 0) {
    json.werkwijze.stappen = [
      { nummer: 1, titel: 'Kennismaking', beschrijving: 'We bespreken uw situatie en wensen in een vrijblijvend gesprek.', icon: 'handshake' },
      { nummer: 2, titel: 'Plan op Maat', beschrijving: 'Samen stellen we een persoonlijk zorgplan op.', icon: 'assignment' },
      { nummer: 3, titel: 'Zorg Verlenen', beschrijving: 'Ik lever de afgesproken zorg met aandacht en professionaliteit.', icon: 'favorite' },
      { nummer: 4, titel: 'Evaluatie', beschrijving: 'Regelmatig evalueren we samen of de zorg nog aansluit.', icon: 'verified' },
    ]
  }
  if (!json.werkwijze.footer) json.werkwijze.footer = 'Flexibel inzetbaar op korte en lange termijn.'

  // werkervaring (titel/intro only)
  if (!json.werkervaring || typeof json.werkervaring !== 'object') {
    json.werkervaring = { titel: 'Mijn Ervaring', intro: '' }
  }
  if (!json.werkervaring.titel) json.werkervaring.titel = 'Mijn Ervaring'
  if (!json.werkervaring.intro) json.werkervaring.intro = 'Een overzicht van mijn professionele achtergrond in de zorg.'

  // credentials
  if (!json.credentials || typeof json.credentials !== 'object') {
    json.credentials = { titel: 'Kwalificaties & Registraties', intro: '' }
  }
  if (!json.credentials.titel) json.credentials.titel = 'Kwalificaties & Registraties'
  if (!json.credentials.intro) json.credentials.intro = 'Als zelfstandig zorgverlener vind ik transparantie essentieel.'

  // testimonials
  if (!json.testimonials || typeof json.testimonials !== 'object') {
    json.testimonials = { titel: 'Wat Anderen Zeggen', intro: '', items: [] }
  }
  if (!json.testimonials.titel) json.testimonials.titel = 'Wat Anderen Zeggen'
  if (!json.testimonials.intro) json.testimonials.intro = 'Ervaringen van opdrachtgevers en cliënten.'
  if (!Array.isArray(json.testimonials.items) || json.testimonials.items.length === 0) {
    json.testimonials.items = [
      { tekst: `${naam} levert uitstekende zorg met oprechte aandacht voor de cliënt.`, naam: 'Familie Jansen', functie: 'Cliënt' },
      { tekst: 'Professioneel, betrouwbaar en altijd bereid om een stap extra te zetten.', naam: 'M. de Vries', functie: 'Mantelzorger' },
      { tekst: 'Fijne samenwerking, goede communicatie en warme persoonlijkheid.', naam: 'R. Bakker', functie: 'Opdrachtgever' },
    ]
  }

  // faq
  if (!json.faq || typeof json.faq !== 'object') {
    json.faq = { titel: 'Veelgestelde Vragen', intro: '', items: [] }
  }
  if (!json.faq.titel) json.faq.titel = 'Veelgestelde Vragen'
  if (!json.faq.intro) json.faq.intro = 'Antwoorden op veelgestelde vragen.'
  if (!Array.isArray(json.faq.items) || json.faq.items.length === 0) {
    json.faq.items = [
      { vraag: 'Wat zijn uw werktijden?', antwoord: 'Ik ben flexibel inzetbaar, ook in avonden en weekenden.' },
      { vraag: 'Werkt u ook met PGB?', antwoord: 'Ja, ik werk zowel via instellingen als met PGB-houders.' },
      { vraag: 'In welke regio bent u werkzaam?', antwoord: werkgebied ? `Ik ben werkzaam in de regio ${werkgebied} en omstreken.` : 'Ik ben werkzaam in diverse regio\'s, neem contact op voor de mogelijkheden.' },
      { vraag: 'Hoe verloopt een eerste kennismaking?', antwoord: 'We plannen een vrijblijvend kennismakingsgesprek om uw wensen te bespreken.' },
      { vraag: 'Bent u BIG-geregistreerd?', antwoord: 'Ja, ik ben BIG-geregistreerd en werk volgens de geldende richtlijnen.' },
    ]
  }

  // cta
  if (!json.cta || typeof json.cta !== 'object') {
    json.cta = { titel: 'Zullen We Kennismaken?', tekst: '', button: '' }
  }
  if (!json.cta.titel) json.cta.titel = 'Zullen We Kennismaken?'
  if (!json.cta.tekst) json.cta.tekst = 'Neem vrijblijvend contact op om de mogelijkheden te bespreken.'
  if (!json.cta.button) json.cta.button = 'Neem contact op'

  // contact
  if (!json.contact || typeof json.contact !== 'object') {
    json.contact = { titel: 'Contact Opnemen', intro: '' }
  }
  if (!json.contact.titel) json.contact.titel = 'Contact Opnemen'
  if (!json.contact.intro) json.contact.intro = 'Neem gerust contact op om de mogelijkheden te bespreken.'

  // stats
  if (!Array.isArray(json.stats) || json.stats.length < 4) {
    json.stats = [
      { value: `${jarenErvaring}+`, label: 'Jaren Ervaring' },
      { value: '100+', label: 'Tevreden Cliënten' },
      { value: '24/7', label: 'Bereikbaar' },
      { value: 'BIG', label: 'Geregistreerd' },
    ]
  }

  // quote
  if (!json.quote || typeof json.quote !== 'string' || json.quote.length < 5) {
    json.quote = 'Goede zorg begint bij echt luisteren naar wat iemand nodig heeft.'
  }

  // seo
  if (!json.seo || typeof json.seo !== 'object') {
    json.seo = { metaTitle: '', metaDescription: '' }
  }
  if (!json.seo.metaTitle) {
    json.seo.metaTitle = werkgebied
      ? `${naam} - ${beroep} | ${werkgebied}`
      : `${naam} - ${beroep}`
  }
  if (!json.seo.metaDescription) {
    json.seo.metaDescription = werkgebied
      ? `${naam} is een ervaren ${beroep} in ${werkgebied}. ${jarenErvaring}+ jaar ervaring. Neem contact op voor professionele zorg.`
      : `${naam} is een ervaren ${beroep}. ${jarenErvaring}+ jaar ervaring in de zorg. Neem contact op voor een kennismaking.`
  }

  return json
}

function extractJson(text: string): any {
  const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    console.error('❌ No JSON found in:', text.slice(0, 300))
    throw new Error('No JSON found in response')
  }
  return JSON.parse(jsonMatch[0])
}

// ============================================
// MAIN HANDLER
// ============================================

serve(async (req: Request) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Content-Type': 'application/json',
  }

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers })
  }

  const totalStart = Date.now()
  const requestId = crypto.randomUUID().slice(0, 8)
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log(`🚀 [${requestId}] generate-site v9: Color Story System`)
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

  try {
    const wizardData: WizardInput = await req.json()
    
    console.log(`📥 [${requestId}] Input naam:`, wizardData.naam)
    console.log(`📥 [${requestId}] Input beroep:`, wizardData.beroep)
    console.log(`📥 [${requestId}] Input stijlKeuze:`, wizardData.stijlKeuze || '❌ NIET INGEVULD')
    console.log(`📥 [${requestId}] Input werkgebied:`, wizardData.werkgebied || '—')
    console.log(`📥 [${requestId}] Input jarenErvaring:`, wizardData.jarenErvaring || '—')
    console.log(`📥 [${requestId}] Input omschrijving:`, wizardData.omschrijving ? '✅' : '—')
    console.log(`📥 [${requestId}] Is regeneration:`, wizardData.regeneration || false)
    
    // Validatie
    if (!wizardData.naam || !wizardData.beroep) {
      console.error(`❌ [${requestId}] Validatie gefaald: naam of beroep ontbreekt`)
      return new Response(
        JSON.stringify({ error: 'Naam en beroep zijn verplicht' }),
        { status: 400, headers }
      )
    }

    // Default data
    if (!wizardData.werkervaring || wizardData.werkervaring.length === 0) {
      const currentYear = new Date().getFullYear();
      wizardData.werkervaring = [
        { functie: 'Zelfstandig Zorgprofessional', werkgever: 'Eigen praktijk', startJaar: currentYear - 2 },
        { functie: 'Zorgverlener', werkgever: 'Zorginstelling', startJaar: currentYear - 6, eindJaar: currentYear - 2 },
        { functie: 'Junior Zorgverlener', werkgever: 'Ziekenhuis', startJaar: currentYear - 10, eindJaar: currentYear - 6 },
      ];
      console.log(`📋 [${requestId}] Default werkervaring toegevoegd`)
    }
    
    if (!wizardData.certificaten || wizardData.certificaten.length === 0) {
      wizardData.certificaten = [
        { type: 'big', label: 'BIG-registratie', value: '29XXXXXXXXX', sublabel: 'Zorgprofessional' },
        { type: 'kvk', label: 'KvK-inschrijving', value: '12345678' },
        { type: 'wtza', label: 'Wtza-melding' },
        { type: 'wkkgz', label: 'Wkkgz compliant' },
        { type: 'verzekering', label: 'Beroepsaansprakelijkheid' },
      ];
      console.log(`📋 [${requestId}] Default certificaten toegevoegd`)
    }

    if (!wizardData.expertises || wizardData.expertises.length === 0) {
      wizardData.expertises = [
        'Persoonlijke verzorging',
        'Wondverzorging',
        'Medicatiebeheer',
        'Palliatieve zorg',
      ];
      console.log(`📋 [${requestId}] Default expertises toegevoegd`)
    }

    if (!wizardData.specialisaties || wizardData.specialisaties.length === 0) {
      wizardData.specialisaties = [
        'Thuiszorg',
        'Ouderenzorg',
        'Chronische aandoeningen',
      ];
      console.log(`📋 [${requestId}] Default specialisaties toegevoegd`)
    }

    // Default contactgegevens (mock data voor preview)
    if (!wizardData.telefoon) {
      wizardData.telefoon = '06 12345678'
      console.log(`📋 [${requestId}] Default telefoon toegevoegd`)
    }
    if (!wizardData.email) {
      wizardData.email = `info@${wizardData.naam.toLowerCase().replace(/[^a-z0-9]/g, '')}.nl`
      console.log(`📋 [${requestId}] Default email toegevoegd`)
    }

    // Check of stijlKeuze bekend is
    if (wizardData.stijlKeuze && !STIJL_TEMPLATE_MAP[wizardData.stijlKeuze]) {
      console.warn(`⚠️ [${requestId}] Onbekende stijlKeuze: "${wizardData.stijlKeuze}"`)
      console.warn(`⚠️ [${requestId}] Bekende opties: ${Object.keys(STIJL_TEMPLATE_MAP).filter(k => k !== 'default').join(', ')}`)
    }

    const anthropic = new Anthropic({
      apiKey: Deno.env.get('ANTHROPIC_API_KEY')!,
    })

    const contextString = buildContextString(wizardData)

    // ============================================
    // STAP 1: ANALYSE (Haiku)
    // ============================================
    let analyse: any
    
    if (wizardData.cachedAnalyse) {
      console.log(`⚡ [${requestId}] Using cached analyse`)
      analyse = wizardData.cachedAnalyse
    } else {
      console.log(`🔍 [${requestId}] STAP 1: ANALYSE (Haiku)`)
      const analyseStart = Date.now()

      const analyseResult = await anthropic.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 300,
        messages: [{
          role: 'user',
          content: `${ANALYSE_PROMPT}\n\n=== INFO ===\n${contextString}`
        }]
      })

      const analyseText = analyseResult.content[0].type === 'text' ? analyseResult.content[0].text : ''
      analyse = extractJson(analyseText)
      
      console.log(`⏱️ [${requestId}] Analyse: ${Date.now() - analyseStart}ms`)
      console.log(`📊 [${requestId}] Persoonlijkheid:`, analyse.persoonlijkheid)
      console.log(`📊 [${requestId}] Werkgebied:`, analyse.werkgebied)
    }

    // ============================================
    // STAP 2: TEMPLATE SELECTIE
    // ============================================
    console.log(`🎨 [${requestId}] STAP 2: TEMPLATE SELECTIE`)
    
    const key = wizardData.stijlKeuze || analyse.persoonlijkheid || 'default';
    const template = getTemplateForStijl(key);
    const templateConfig = TEMPLATES[template]
    
    console.log(`🎯 [${requestId}] StijlKeuze: "${wizardData.stijlKeuze}" → Template: ${template}`)
    console.log(`🎯 [${requestId}] Compatible group: ${COMPATIBILITY_MAP[template].join(', ')}`)
    
    const selectedPalette = selectPaletteForTemplate(template)
    console.log(`🎨 [${requestId}] Palette: ${selectedPalette}`)

    // ============================================
    // STAP 3: CONTENT GENERATIE (Sonnet)
    // ============================================
    console.log(`✍️ [${requestId}] STAP 3: CONTENT GENERATIE (Sonnet)`)
    const contentStart = Date.now()

    const contentPromptFilled = CONTENT_PROMPT
      .replace('{CONTEXT}', contextString)
      .replace('{PERSOONLIJKHEID}', analyse.persoonlijkheid || 'warm')
      .replace('{TEMPLATE}', template)
      .replace('{jarenErvaring}', String(wizardData.jarenErvaring || 5))

    const contentResult = await anthropic.messages.create({
     model: 'claude-sonnet-4-5-20250929',
      max_tokens: 4500,
      messages: [{
        role: 'user',
        content: contentPromptFilled
      }]
    })

    const contentText = contentResult.content[0].type === 'text' ? contentResult.content[0].text : ''
    const contentJson = extractJson(contentText)

    console.log(`⏱️ [${requestId}] Content: ${Date.now() - contentStart}ms`)

    // ============================================
    // STAP 3b: RESPONSE VALIDATIE & DEFAULTS
    // ============================================
    // Ensure all required fields exist even if AI skipped them
    const validated = validateAndFillDefaults(contentJson, wizardData, template)

    // ============================================
    // STAP 4: SECTIONS MET VARIATIE
    // ============================================
    const sections = generateSections(template, requestId)

    // ============================================
    // BUILD RESPONSE
    // ============================================
    const response = {
      template_id: template,
      theme: {
        palette: selectedPalette,
        fontPairing: templateConfig.fonts,
        template: template,
      },
      generated_content: {
        ...validated,
        sections: sections,
      },
      input_data: {
        werkervaring: wizardData.werkervaring,
        certificaten: wizardData.certificaten,
        specialisaties: wizardData.specialisaties,
        expertises: wizardData.expertises,
        jarenErvaring: wizardData.jarenErvaring,
        beschikbaarheid: wizardData.beschikbaarheid,
        werkgebied: wizardData.werkgebied,
        telefoon: wizardData.telefoon,
        email: wizardData.email,
        zakelijk: {
          kvk: wizardData.certificaten?.find(c => c.type === 'kvk')?.value,
          handelsnaam: `${wizardData.naam} Zorg`,
        },
      },
      _meta: {
        requestId,
        analyse,
        templateConfig,
        generatedAt: new Date().toISOString(),
        totalTimeMs: Date.now() - totalStart,
        version: 'v9',
        compatibleGroup: COMPATIBILITY_MAP[template],
      }
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(`✅ [${requestId}] KLAAR in ${Date.now() - totalStart}ms`)
    console.log(`📋 [${requestId}] template_id: ${template}`)
    console.log(`🎨 [${requestId}] palette: ${selectedPalette}`)
    console.log(`📦 [${requestId}] Sections:`)
    sections.forEach(s => console.log(`   ${s.type}: ${s.style}`))
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

    return new Response(JSON.stringify(response), { status: 200, headers })

  } catch (error) {
    console.error(`❌ [${requestId}] Error:`, error)
    return new Response(
      JSON.stringify({ 
        error: 'Er ging iets mis bij het genereren',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { status: 500, headers }
    )
  }
});