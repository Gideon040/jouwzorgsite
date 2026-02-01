// types/site.ts - Core site content types

// Certificaat types - inclusief compliance registraties
export type CertificaatType = 
  | 'big'               // BIG-registratie (verplicht voor veel zorgberoepen)
  | 'agb'               // AGB-code (voor declaraties)
  | 'kvk'               // KvK-nummer
  | 'btw'               // BTW-nummer
  | 'vog'               // Verklaring Omtrent Gedrag
  | 'kiwa'              // KIWA/HKZ Keurmerk
  | 'diploma'           // Diploma of certificaat
  | 'verzekering'       // Beroepsaansprakelijkheidsverzekering
  | 'wtza'              // Wtza-melding bij IGJ (verplicht sinds 2022)
  | 'wkkgz'             // Wkkgz compliant (klachten- en geschillenregeling)
  | 'klachtenregeling'; // Aangesloten bij klachtenfunctionaris (SCAG, etc.)

export interface Certificaat {
  type: CertificaatType;
  label: string;
  value?: string;
  sublabel?: string;
  image_url?: string | null;
  expires_at?: string | null;
  verified?: boolean;        // Voor BIG: via API geverifieerd
  verified_at?: string | null;
}

export interface Dienst {
  naam: string;
  beschrijving?: string;
  icon?: string;
}

export interface Contact {
  telefoon?: string;
  email: string;
  werkgebied: string[];
}

export interface Zakelijk {
  kvk: string;
  btw?: string;
  handelsnaam?: string;      // Voor weergave in credentials sectie
}

export interface Kleuren {
  primary?: string;
  secondary?: string;
}

export interface Socials {
  linkedin?: string;
  instagram?: string;
  facebook?: string;
}

// === PROFESSIONAL FEATURES ===

export interface Werkervaring {
  functie: string;
  werkgever: string;
  start_jaar?: number;
  startJaar?: number;
  eind_jaar?: number;
  eindJaar?: number;
  beschrijving?: string;
}

export interface Testimonial {
  tekst: string;
  naam: string;
  relatie?: string;
}

// === AI GENERATED CONTENT ===

export interface HeroContent {
  titel: string;
  subtitel: string;
  beschrijving?: string;
}

export interface OverMijContent {
  intro: string;
  body: string;
  persoonlijk?: string;
}

export interface Doelgroep {
  type: 'instellingen' | 'bemiddelaars' | 'pgb';
  titel: string;
  tekst: string;
}

export interface VoorWieContent {
  titel: string;
  intro: string;
  doelgroepen: Doelgroep[];
}

export interface DienstenContent {
  titel: string;
  intro?: string;
  items: Dienst[];
}

export interface WerkwijzeContent {
  titel: string;
  stappen: { titel: string; beschrijving: string }[];
}

export interface BeschikbaarheidContent {
  titel: string;
  status: string;
  details: string;
  regio: string;
}

export interface ContactContent {
  titel: string;
  intro: string;
  cta: string;
}

export interface CtaContent {
  titel: string;
  tekst: string;
}

export interface TestimonialGenerated {
  tekst: string;
  naam: string;
  functie: string;
}

export interface SEOContent {
  metaTitle: string;
  metaDescription: string;
}

export interface SectionConfig {
  type: 'hero' | 'stats' | 'diensten' | 'over' | 'quote' | 'credentials' | 'testimonials' | 'faq' | 'cta' | 'contact' | 'footer';
  style?: string;
}

export interface GeneratedContent {
  hero?: HeroContent;
  overMij?: OverMijContent;
  voorWie?: VoorWieContent;
  diensten?: DienstenContent;
  werkwijze?: WerkwijzeContent;
  beschikbaarheid?: BeschikbaarheidContent;
  contact?: ContactContent;
  cta?: CtaContent;
  quote?: string;
  testimonials?: TestimonialGenerated[];
  seo?: SEOContent;
  sections?: SectionConfig[];
}

// === THEME CONFIGURATIE ===

export type ThemePalette = 
  | 'sage' | 'lavender' | 'slate' | 'mint' | 'sand' | 'rose' | 'ocean'
  | 'forest' | 'coral' | 'teal';

export type ThemeFonts = 'friendly' | 'soft' | 'modern' | 'contemporary' | 'traditional';

export type ThemeFontPairing = 
  | 'classic' | 'modern' | 'elegant' | 'friendly' | 'professional'
  | 'editorial' | 'soft' | 'clean';

export type ThemeVariant = 'classic' | 'bold' | 'minimal' | 'magazine' | 'cards';
export type BorderRadius = 'none' | 'sm' | 'small' | 'medium' | 'lg' | 'large' | 'full';
export type Spacing = 'compact' | 'comfortable' | 'normal' | 'relaxed' | 'airy';
export type CardStyle = 'flat' | 'elevated' | 'bordered' | 'glass';
export type ImageTreatment = 'square' | 'rounded' | 'circle' | 'blob-mask';
export type Animation = 'none' | 'fade' | 'slide-up' | 'stagger';

export type HeroLayout = 'centered' | 'split' | 'editorial' | 'fullwidth';
export type DienstenLayout = 'cards' | 'list' | 'icons-only' | 'numbered' | null;
export type CertificatenLayout = 'badges' | 'inline' | 'grid' | null;
export type WerkervaringLayout = 'timeline' | 'cards' | 'simple' | null;
export type TestimonialsLayout = 'carousel' | 'grid' | 'single-quote' | 'cards' | null;
export type ContactLayout = 'form' | 'details-only' | 'split' | 'centered';

export interface ThemeSections {
  hero: HeroLayout;
  diensten: DienstenLayout;
  certificaten: CertificatenLayout;
  werkervaring: WerkervaringLayout;
  testimonials: TestimonialsLayout;
  contact: ContactLayout;
  ctaBanner?: boolean;
}

export interface Theme {
  palette?: ThemePalette;
  fonts?: ThemeFonts;
  fontPairing?: ThemeFontPairing;
  variant?: ThemeVariant;
  borderRadius?: BorderRadius;
  spacing?: Spacing;
  cardStyle?: CardStyle;
  imageTreatment?: ImageTreatment;
  animation?: Animation;
  sections?: ThemeSections | SectionConfig[];
  generatedContent?: GeneratedContent;
}

// === SITE CONTENT ===

export interface SiteContent {
  naam: string;
  foto?: string;
  tagline: string;
  over_mij: string;
  contact: Contact;
  diensten: Dienst[];
  certificaten: Certificaat[];
  zakelijk: Zakelijk;
  kleuren?: Kleuren;
  socials?: Socials;
  beschikbaar?: boolean;
  start_carriere?: number;
  werkervaring?: Werkervaring[];
  expertises?: string[];
  testimonials?: Testimonial[];
  generated?: {
    hero?: HeroContent;
    overMij?: OverMijContent;
    voorWie?: VoorWieContent;
    diensten?: DienstenContent;
    beschikbaarheid?: BeschikbaarheidContent;
    contact?: ContactContent;
    seo?: SEOContent;
  };
}

export type SubscriptionPlan = 'starter' | 'professional';

export interface Site {
  id: string;
  user_id: string;
  subdomain: string;
  custom_domain?: string | null;
  template_id: string;
  beroep: string;
  content: SiteContent;
  theme?: Theme;
  generated_content?: GeneratedContent;
  published: boolean;
  plan?: SubscriptionPlan;
  created_at: string;
  updated_at: string;
}

// === HELPER FUNCTIONS ===

export function hasProfessionalFeatures(site: Site): boolean {
  return true;
}

export function getJarenErvaring(werkervaringOrStartJaar?: Werkervaring[] | number): number | null {
  if (typeof werkervaringOrStartJaar === 'number') {
    return new Date().getFullYear() - werkervaringOrStartJaar;
  }
  
  if (Array.isArray(werkervaringOrStartJaar) && werkervaringOrStartJaar.length > 0) {
    const startYears = werkervaringOrStartJaar
      .map(w => w.start_jaar || w.startJaar)
      .filter((year): year is number => typeof year === 'number');
    
    if (startYears.length === 0) return null;
    
    const earliest = Math.min(...startYears);
    return new Date().getFullYear() - earliest;
  }
  
  return null;
}

export function isOfficialCredential(type: CertificaatType): boolean {
  return ['big', 'agb', 'kvk', 'wtza', 'wkkgz'].includes(type);
}

export function isComplianceCredential(type: CertificaatType): boolean {
  return ['wtza', 'wkkgz', 'klachtenregeling', 'verzekering', 'vog'].includes(type);
}

export function groupCertificaten(certificaten: Certificaat[]): {
  registraties: Certificaat[];
  onderneming: Certificaat[];
  compliance: Certificaat[];
  kwalificaties: Certificaat[];
} {
  return {
    registraties: certificaten.filter(c => ['big', 'agb'].includes(c.type)),
    onderneming: certificaten.filter(c => ['kvk', 'btw'].includes(c.type)),
    compliance: certificaten.filter(c => ['wtza', 'wkkgz', 'klachtenregeling', 'verzekering', 'vog'].includes(c.type)),
    kwalificaties: certificaten.filter(c => ['diploma', 'kiwa'].includes(c.type)),
  };
}

// === PROFILE & SUBSCRIPTION ===

export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  site_id: string;
  mollie_customer_id?: string;
  mollie_subscription_id?: string;
  plan: 'starter' | 'professional' | 'expert';
  status: 'pending' | 'active' | 'cancelled' | 'past_due';
  current_period_end?: string;
  created_at: string;
}