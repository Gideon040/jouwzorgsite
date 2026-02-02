// components/templates/themes/index.ts
// SINGLE SOURCE OF TRUTH voor palettes, fonts en theme configs

// ============================================
// THEME CONFIG INTERFACE
// ============================================
export interface ThemeConfig {
  id: string;
  name: string;
  colors: {
    background: string;
    backgroundAlt: string;
    surface: string;
    text: string;
    textMuted: string;
    border: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  spacing: {
    section: string;
    container: string;
    gap: string;
  };
  radius: {
    small: string;
    medium: string;
    large: string;
    full: string;
  };
  shadows: {
    small: string;
    medium: string;
    large: string;
  };
  isDark: boolean;
  headerStyle: 'solid' | 'transparent' | 'floating';
  cardStyle: 'flat' | 'elevated' | 'bordered' | 'glass';
  buttonStyle: 'solid' | 'outline' | 'ghost';
}

// ============================================
// COLOR PALETTES (14 totaal)
// ============================================
export const palettes = {
  // === ORIGINELE PALETTES ===
  sage: {
    primary: '#5a7c6f',
    primaryHover: '#4a6b5f',
    primaryLight: 'rgba(90, 124, 111, 0.1)',
    primaryDark: '#3d5a4f',
    accent: '#5a7c6f',
  },
  lavender: {
    primary: '#7c6f9e',
    primaryHover: '#6b5f8d',
    primaryLight: 'rgba(124, 111, 158, 0.1)',
    primaryDark: '#5a4f7a',
    accent: '#7c6f9e',
  },
  slate: {
    primary: '#475569',
    primaryHover: '#334155',
    primaryLight: 'rgba(71, 85, 105, 0.1)',
    primaryDark: '#1e293b',
    accent: '#475569',
  },
  mint: {
    primary: '#059669',
    primaryHover: '#047857',
    primaryLight: 'rgba(5, 150, 105, 0.1)',
    primaryDark: '#065f46',
    accent: '#059669',
  },
  sand: {
    primary: '#b45309',
    primaryHover: '#92400e',
    primaryLight: 'rgba(180, 83, 9, 0.1)',
    primaryDark: '#78350f',
    accent: '#b45309',
  },
  rose: {
    primary: '#be185d',
    primaryHover: '#9d174d',
    primaryLight: 'rgba(190, 24, 93, 0.1)',
    primaryDark: '#831843',
    accent: '#be185d',
  },
  ocean: {
    primary: '#0369a1',
    primaryHover: '#075985',
    primaryLight: 'rgba(3, 105, 161, 0.1)',
    primaryDark: '#0c4a6e',
    accent: '#0369a1',
  },
  
  // === TEMPLATE-SPECIFIEKE PALETTES ===
  
  // Editorial template - sage tones
  editorial: {
    primary: '#5a7c6f',
    primaryHover: '#4a6b5f',
    primaryLight: 'rgba(90, 124, 111, 0.15)',
    primaryDark: '#3d5a4f',
    accent: '#5a7c6f',
  },
  
  // ProActief template - cyan + orange
  proactief: {
    primary: '#0099cc',
    primaryHover: '#007aa3',
    primaryLight: 'rgba(0, 153, 204, 0.1)',
    primaryDark: '#004466',
    accent: '#ff6b35',
    accentLight: '#f7931e',
  },
  
  // Portfolio template - forest green + lime
  portfolio: {
    primary: '#1a3a2f',
    primaryHover: '#2d5a47',
    primaryLight: '#3d7a5f',
    primaryDark: '#0f251d',
    accent: '#7cb342',
    accentLight: '#9ccc65',
  },
  
  // Mindoor template - sage green + coral
  mindoor: {
    primary: '#5a7c5a',
    primaryHover: '#4a6349',
    primaryLight: 'rgba(90, 124, 90, 0.1)',
    primaryDark: '#3d503d',
    accent: '#d4644a',
    accentLight: '#e07b5f',
  },
  
  // Legacy aliases
  forest: {
    primary: '#1a3a2f',
    primaryHover: '#2d5a47',
    primaryLight: 'rgba(26, 58, 47, 0.1)',
    primaryDark: '#0f251d',
    accent: '#7cb342',
  },
  coral: {
    primary: '#d4644a',
    primaryHover: '#c25438',
    primaryLight: 'rgba(212, 100, 74, 0.1)',
    primaryDark: '#a34432',
    accent: '#e07b5f',
  },
  teal: {
    primary: '#0099cc',
    primaryHover: '#007aa3',
    primaryLight: 'rgba(0, 153, 204, 0.1)',
    primaryDark: '#004466',
    accent: '#ff6b35',
  },
};

export type PaletteKey = keyof typeof palettes;

export function getPalette(paletteId: string) {
  return palettes[paletteId as PaletteKey] || palettes.sage;
}

// ============================================
// FONT PAIRINGS (10 totaal)
// ============================================
export const fontPairings = {
  // === ORIGINELE PAIRINGS ===
  classic: {
    heading: "'Libre Baskerville', Georgia, serif",
    body: "'Open Sans', system-ui, sans-serif",
  },
  modern: {
    heading: "'DM Sans', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
  },
  elegant: {
    heading: "'Playfair Display', Georgia, serif",
    body: "'Lato', system-ui, sans-serif",
  },
  friendly: {
    heading: "'Nunito', system-ui, sans-serif",
    body: "'Open Sans', system-ui, sans-serif",
  },
  professional: {
    heading: "'Manrope', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
  },
  
  // === TEMPLATE-SPECIFIEKE PAIRINGS ===
  
  // Editorial - Newsreader serif
  editorial: {
    heading: "'Newsreader', Georgia, serif",
    body: "'Open Sans', system-ui, sans-serif",
  },
  
  // ProActief - Poppins everywhere
  proactief: {
    heading: "'Poppins', system-ui, sans-serif",
    body: "'Poppins', system-ui, sans-serif",
  },
  
  // Portfolio - Playfair + Inter
  portfolio: {
    heading: "'Playfair Display', Georgia, serif",
    body: "'Inter', system-ui, sans-serif",
  },
  
  // Mindoor - Playfair + DM Sans
  mindoor: {
    heading: "'Playfair Display', Georgia, serif",
    body: "'DM Sans', system-ui, sans-serif",
  },
  
  // Legacy
  soft: {
    heading: "'Libre Baskerville', Georgia, serif",
    body: "'DM Sans', system-ui, sans-serif",
  },
  clean: {
    heading: "'Poppins', system-ui, sans-serif",
    body: "'Poppins', system-ui, sans-serif",
  },
};

export type FontPairingKey = keyof typeof fontPairings;

export function getFontPairing(pairingId: string) {
  return fontPairings[pairingId as FontPairingKey] || fontPairings.classic;
}

// ============================================
// TEMPLATE THEMES (4 hoofdtemplates)
// ============================================

export const editorialTheme: ThemeConfig = {
  id: 'editorial',
  name: 'Editorial - Klassiek & Warm',
  colors: {
    background: '#faf9f6',
    backgroundAlt: '#f5f3f0',
    surface: '#ffffff',
    text: '#1a2e28',
    textMuted: '#5a6b65',
    border: 'rgba(0,0,0,0.08)',
  },
  fonts: fontPairings.editorial,
  spacing: {
    section: 'py-20 md:py-28',
    container: 'max-w-6xl',
    gap: 'gap-8',
  },
  radius: {
    small: 'rounded-lg',
    medium: 'rounded-xl',
    large: 'rounded-2xl',
    full: 'rounded-full',
  },
  shadows: {
    small: 'shadow-sm',
    medium: 'shadow-lg',
    large: 'shadow-2xl',
  },
  isDark: false,
  headerStyle: 'solid',
  cardStyle: 'elevated',
  buttonStyle: 'solid',
};

export const proActiefTheme: ThemeConfig = {
  id: 'proactief',
  name: 'ProActief - Modern & Energiek',
  colors: {
    background: '#ffffff',
    backgroundAlt: '#f8fafc',
    surface: '#ffffff',
    text: '#0f172a',
    textMuted: '#64748b',
    border: 'rgba(0,0,0,0.06)',
  },
  fonts: fontPairings.proactief,
  spacing: {
    section: 'py-20 md:py-28',
    container: 'max-w-7xl',
    gap: 'gap-8',
  },
  radius: {
    small: 'rounded-xl',
    medium: 'rounded-2xl',
    large: 'rounded-3xl',
    full: 'rounded-full',
  },
  shadows: {
    small: 'shadow-md',
    medium: 'shadow-xl',
    large: 'shadow-2xl',
  },
  isDark: false,
  headerStyle: 'transparent',
  cardStyle: 'elevated',
  buttonStyle: 'solid',
};

export const portfolioTheme: ThemeConfig = {
  id: 'portfolio',
  name: 'Portfolio - Elegant & Sophisticated',
  colors: {
    background: '#f8f6f2',
    backgroundAlt: '#ebe7df',
    surface: '#ffffff',
    text: '#1a2e28',
    textMuted: '#5a6b65',
    border: 'rgba(26,58,47,0.1)',
  },
  fonts: fontPairings.portfolio,
  spacing: {
    section: 'py-28',
    container: 'max-w-[1200px]',
    gap: 'gap-8',
  },
  radius: {
    small: 'rounded-xl',
    medium: 'rounded-[20px]',
    large: 'rounded-3xl',
    full: 'rounded-full',
  },
  shadows: {
    small: 'shadow-[0_10px_40px_rgba(26,58,47,0.06)]',
    medium: 'shadow-[0_15px_40px_rgba(26,58,47,0.1)]',
    large: 'shadow-[0_25px_60px_rgba(26,58,47,0.12)]',
  },
  isDark: false,
  headerStyle: 'transparent',
  cardStyle: 'elevated',
  buttonStyle: 'solid',
};

export const mindoorTheme: ThemeConfig = {
  id: 'mindoor',
  name: 'Mindoor - Warm & Organisch',
  colors: {
    background: '#faf8f5',
    backgroundAlt: '#f5f0e8',
    surface: '#ffffff',
    text: '#1a1a1a',
    textMuted: '#6b6560',
    border: 'rgba(0,0,0,0.08)',
  },
  fonts: fontPairings.mindoor,
  spacing: {
    section: 'py-20 lg:py-32',
    container: 'max-w-7xl',
    gap: 'gap-8',
  },
  radius: {
    small: 'rounded-xl',
    medium: 'rounded-2xl',
    large: 'rounded-3xl',
    full: 'rounded-full',
  },
  shadows: {
    small: 'shadow-md',
    medium: 'shadow-lg',
    large: 'shadow-2xl',
  },
  isDark: false,
  headerStyle: 'solid',
  cardStyle: 'elevated',
  buttonStyle: 'solid',
};

// ============================================
// LEGACY BASE THEMES (voor backwards compatibility)
// ============================================

export const classicTheme: ThemeConfig = editorialTheme;

export const boldTheme: ThemeConfig = {
  id: 'bold',
  name: 'Bold & Professioneel',
  colors: {
    background: '#17191b',
    backgroundAlt: '#1e2124',
    surface: '#242729',
    text: '#ffffff',
    textMuted: 'rgba(255,255,255,0.6)',
    border: 'rgba(255,255,255,0.1)',
  },
  fonts: fontPairings.modern,
  spacing: {
    section: 'py-16 md:py-24',
    container: 'max-w-6xl',
    gap: 'gap-6',
  },
  radius: {
    small: 'rounded-lg',
    medium: 'rounded-xl',
    large: 'rounded-2xl',
    full: 'rounded-full',
  },
  shadows: {
    small: 'shadow-sm',
    medium: 'shadow-lg shadow-black/20',
    large: 'shadow-2xl shadow-black/30',
  },
  isDark: true,
  headerStyle: 'transparent',
  cardStyle: 'glass',
  buttonStyle: 'solid',
};

export const minimalTheme: ThemeConfig = {
  id: 'minimal',
  name: 'Minimaal & Rustig',
  colors: {
    background: '#ffffff',
    backgroundAlt: '#fafafa',
    surface: '#ffffff',
    text: '#374151',
    textMuted: '#9ca3af',
    border: 'rgba(0,0,0,0.06)',
  },
  fonts: fontPairings.professional,
  spacing: {
    section: 'py-24 md:py-32',
    container: 'max-w-3xl',
    gap: 'gap-12',
  },
  radius: {
    small: 'rounded',
    medium: 'rounded-lg',
    large: 'rounded-xl',
    full: 'rounded-full',
  },
  shadows: {
    small: 'shadow-sm',
    medium: 'shadow-md',
    large: 'shadow-lg',
  },
  isDark: false,
  headerStyle: 'solid',
  cardStyle: 'flat',
  buttonStyle: 'outline',
};

export const magazineTheme: ThemeConfig = portfolioTheme;
export const cardsTheme: ThemeConfig = proActiefTheme;

// ============================================
// THEME REGISTRY
// ============================================
export const themes: Record<string, ThemeConfig> = {
  // Main 4 templates
  editorial: editorialTheme,
  proactief: proActiefTheme,
  portfolio: portfolioTheme,
  mindoor: mindoorTheme,
  // Legacy aliases
  classic: classicTheme,
  bold: boldTheme,
  minimal: minimalTheme,
  magazine: magazineTheme,
  cards: cardsTheme,
};

export function getTheme(themeId: string): ThemeConfig {
  return themes[themeId] || editorialTheme;
}

// ============================================
// TEMPLATE PRESETS (theme + palette + fonts)
// ============================================
export interface TemplatePreset {
  id: string;
  name: string;
  description: string;
  theme: ThemeConfig;
  palette: typeof palettes.sage;
  sectionStyle: string; // maps to section component style prop
}

export const templatePresets: Record<string, TemplatePreset> = {
  editorial: {
    id: 'editorial',
    name: 'Editorial',
    description: 'Klassiek en warm, met serif fonts en subtiele kleuren',
    theme: editorialTheme,
    palette: palettes.editorial,
    sectionStyle: 'editorial',
  },
  proactief: {
    id: 'proactief',
    name: 'ProActief',
    description: 'Modern en energiek, met waves en gradients',
    theme: proActiefTheme,
    palette: palettes.proactief,
    sectionStyle: 'proactief',
  },
  portfolio: {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Elegant en sophisticated, met forest green en lime accenten',
    theme: portfolioTheme,
    palette: palettes.portfolio,
    sectionStyle: 'portfolio',
  },
  mindoor: {
    id: 'mindoor',
    name: 'Mindoor',
    description: 'Warm en organisch, met coral accenten en zachte vormen',
    theme: mindoorTheme,
    palette: palettes.mindoor,
    sectionStyle: 'mindoor',
  },
};

export function getTemplatePreset(presetId: string): TemplatePreset {
  return templatePresets[presetId] || templatePresets.editorial;
}

// ============================================
// METADATA
// ============================================
export const paletteMetadata: Record<PaletteKey, { name: string; description: string }> = {
  sage: { name: 'Sage', description: 'Rustgevend groen' },
  lavender: { name: 'Lavender', description: 'Zacht paars' },
  slate: { name: 'Slate', description: 'Professioneel grijs' },
  mint: { name: 'Mint', description: 'Fris groen' },
  sand: { name: 'Sand', description: 'Warm amber' },
  rose: { name: 'Rose', description: 'Zacht roze' },
  ocean: { name: 'Ocean', description: 'Diep blauw' },
  editorial: { name: 'Editorial', description: 'Klassiek sage groen' },
  proactief: { name: 'ProActief', description: 'Cyaan + oranje' },
  portfolio: { name: 'Portfolio', description: 'Forest + lime' },
  mindoor: { name: 'Mindoor', description: 'Sage + coral' },
  forest: { name: 'Forest', description: 'Donker groen' },
  coral: { name: 'Coral', description: 'Warm terracotta' },
  teal: { name: 'Teal', description: 'Modern cyaan' },
};

export const fontPairingMetadata: Record<FontPairingKey, { name: string; description: string }> = {
  classic: { name: 'Klassiek', description: 'Libre Baskerville + Open Sans' },
  modern: { name: 'Modern', description: 'DM Sans + Inter' },
  elegant: { name: 'Elegant', description: 'Playfair Display + Lato' },
  friendly: { name: 'Vriendelijk', description: 'Nunito + Open Sans' },
  professional: { name: 'Professioneel', description: 'Manrope + Inter' },
  editorial: { name: 'Editorial', description: 'Newsreader + Open Sans' },
  proactief: { name: 'ProActief', description: 'Poppins' },
  portfolio: { name: 'Portfolio', description: 'Playfair Display + Inter' },
  mindoor: { name: 'Mindoor', description: 'Playfair Display + DM Sans' },
  soft: { name: 'Zacht', description: 'Libre Baskerville + DM Sans' },
  clean: { name: 'Clean', description: 'Poppins' },
};

export const templateMetadata: Record<string, { name: string; description: string; tags: string[] }> = {
  editorial: { 
    name: 'Editorial', 
    description: 'Klassiek en warm design met serif fonts',
    tags: ['klassiek', 'warm', 'serif', 'professioneel']
  },
  proactief: { 
    name: 'ProActief', 
    description: 'Modern en energiek met gradients en waves',
    tags: ['modern', 'energiek', 'blauw', 'dynamisch']
  },
  portfolio: { 
    name: 'Portfolio', 
    description: 'Elegant design met donkergroene accenten',
    tags: ['elegant', 'premium', 'groen', 'sophisticated']
  },
  mindoor: { 
    name: 'Mindoor', 
    description: 'Warm en organisch met zachte vormen',
    tags: ['warm', 'organisch', 'coral', 'friendly']
  },
};
