// types/site.ts - Core site content types
// ALIGNED: Types matchen EXACT met edge function output

// ============================================
// CERTIFICAAT TYPES
// ============================================

export type CertificaatType = 
  | 'big' | 'agb' | 'kvk' | 'btw' | 'vog' | 'kiwa' 
  | 'diploma' | 'verzekering' | 'wtza' | 'wkkgz' | 'klachtenregeling';

export interface Certificaat {
  type: CertificaatType;
  label: string;
  value?: string;
  sublabel?: string;
  image_url?: string | null;
  expires_at?: string | null;
  verified?: boolean;
  verified_at?: string | null;
}

// ============================================
// BASIS CONTENT TYPES
// ============================================

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
  handelsnaam?: string;
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
  functie?: string;
}

// ============================================
// GENERATED CONTENT - EXACT MATCH MET EDGE FUNCTION
// ============================================

// Hero sectie
export interface HeroContent {
  titel: string;
  subtitel: string;
}

// Over mij sectie
export interface OverMijContent {
  titel?: string;
  intro: string;
  body: string;
  persoonlijk?: string;
}

// Diensten sectie
export interface DienstenContent {
  titel: string;
  intro?: string;
  items: Dienst[];
}

// Voor wie sectie
export type DoelgroepType = 
  | 'thuiszorg' | 'verpleeghuis' | 'verzorgingshuis' | 'ziekenhuis' | 'kliniek'
  | 'bemiddelaar' | 'intermediair' | 'instellingen'
  | 'ggz' | 'gehandicaptenzorg' | 'revalidatie'
  | 'hospice' | 'palliatief'
  | 'jeugdzorg' | 'kraamzorg'
  | 'huisarts' | 'ouderenzorg' | 'wijkverpleging'
  | 'pgb' | 'particulieren';

export interface Doelgroep {
  type: DoelgroepType;
  titel: string;
  tekst: string;
  tags?: string[];
  highlight?: string;
}

export interface VoorWieContent {
  titel: string;
  intro: string;
  doelgroepen: Doelgroep[];
}

// Werkwijze sectie
export interface WerkwijzeStap {
  nummer?: number;
  titel: string;
  beschrijving: string;  // Edge function gebruikt "beschrijving"
  icon?: string;
}

export interface WerkwijzeContent {
  titel: string;
  intro?: string;
  stappen: WerkwijzeStap[];
  footer?: string;
}

// Credentials sectie
export interface CredentialsContent {
  titel: string;
  intro?: string;
}

// Testimonials sectie
export interface TestimonialItem {
  tekst: string;
  naam: string;
  functie?: string;
}

export interface TestimonialsContent {
  titel: string;
  intro?: string;
  items: TestimonialItem[];
}

// FAQ sectie
export interface FaqItem {
  vraag: string;
  antwoord: string;
}

export interface FaqContent {
  titel: string;
  intro?: string;
  items: FaqItem[];
}

// CTA sectie - Let op: "tekst" en "button" (niet subtitel/buttonText)
export interface CtaContent {
  titel: string;
  tekst: string;    // Edge function gebruikt "tekst"
  button: string;   // Edge function gebruikt "button"
}

// Contact sectie
export interface ContactContent {
  titel: string;
  intro: string;
  cta?: string;
}

// Stats
export interface StatItem {
  value: string;
  label: string;
}

// SEO
export interface SEOContent {
  metaTitle: string;
  metaDescription: string;
}

// Section config
export interface SectionConfig {
  type: string;
  style?: string;
  visible?: boolean;
}

// ============================================
// GENERATED CONTENT - COMPLETE INTERFACE
// ============================================

// Updated: complete GeneratedContent
export interface GeneratedContent {
  hero?: HeroContent;
  overMij?: OverMijContent;
  diensten?: DienstenContent;
  voorWie?: VoorWieContent;
  werkwijze?: WerkwijzeContent;
  credentials?: CredentialsContent;
  testimonials?: TestimonialsContent;
  faq?: FaqContent;
  cta?: CtaContent;
  contact?: ContactContent;
  stats?: StatItem[];
  seo?: SEOContent;
  sections?: SectionConfig[];
  quote?: string;
}

// ============================================
// THEME TYPES
// ============================================

export type ThemePalette = 
  | 'sage' | 'lavender' | 'slate' | 'mint' | 'sand' | 'rose' | 'ocean'
  | 'forest' | 'coral' | 'teal'
  | 'editorial' | 'proactief' | 'portfolio' | 'mindoor';

export type ThemeFontPairing = 
  | 'classic' | 'modern' | 'elegant' | 'friendly' | 'professional'
  | 'editorial' | 'proactief' | 'portfolio' | 'mindoor'
  | 'soft' | 'clean';

export type ThemeVariant = 
  | 'classic' | 'bold' | 'minimal' | 'magazine' | 'cards'
  | 'editorial' | 'proactief' | 'portfolio' | 'mindoor';

export type TemplateId = 'editorial' | 'proactief' | 'portfolio' | 'mindoor';

export type BorderRadius = 'none' | 'sm' | 'small' | 'medium' | 'lg' | 'large' | 'full';
export type Spacing = 'compact' | 'comfortable' | 'normal' | 'relaxed' | 'airy';
export type CardStyle = 'flat' | 'elevated' | 'bordered' | 'glass';
export type ImageTreatment = 'square' | 'rounded' | 'circle' | 'blob-mask';
export type Animation = 'none' | 'fade' | 'slide-up' | 'stagger';

export interface Theme {
  palette?: ThemePalette;
  fonts?: ThemeFontPairing;
  fontPairing?: ThemeFontPairing;
  variant?: ThemeVariant;
  template?: TemplateId;
  borderRadius?: BorderRadius;
  spacing?: Spacing;
  cardStyle?: CardStyle;
  imageTreatment?: ImageTreatment;
  animation?: Animation;
  sections?: Record<string, string | null>;
}

// ============================================
// SITE CONTENT
// ============================================

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
  telefoon?: string;
  generated?: GeneratedContent;
}

// ============================================
// SITE
// ============================================

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

// ============================================
// HELPER FUNCTIONS
// ============================================

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

export function isNewTemplateSystem(site: Site): boolean {
  return ['editorial', 'proactief', 'portfolio', 'mindoor'].includes(site.template_id);
}

// ============================================
// PROFILE & SUBSCRIPTION
// ============================================

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