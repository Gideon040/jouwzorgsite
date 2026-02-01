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
// COLOR PALETTES (10 totaal)
// ============================================
export const palettes = {
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
  // NIEUWE PALETTES
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
// FONT PAIRINGS (8 totaal)
// ============================================
export const fontPairings = {
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
  // NIEUWE FONT PAIRINGS
  editorial: {
    heading: "'Playfair Display', Georgia, serif",
    body: "'Inter', system-ui, sans-serif",
  },
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
// BASE THEMES
// ============================================
export const classicTheme: ThemeConfig = {
  id: 'classic',
  name: 'Klassiek & Warm',
  colors: {
    background: '#fcf9f5',
    backgroundAlt: '#f4f2f0',
    surface: '#ffffff',
    text: '#181411',
    textMuted: '#6b6560',
    border: 'rgba(0,0,0,0.08)',
  },
  fonts: {
    heading: "'Libre Baskerville', Georgia, serif",
    body: "'Inter', system-ui, sans-serif",
  },
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
  fonts: {
    heading: "'DM Sans', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
  },
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
  fonts: {
    heading: "'Inter', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
  },
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

export const magazineTheme: ThemeConfig = {
  id: 'magazine',
  name: 'Magazine & Premium',
  colors: {
    background: '#fdfcf8',
    backgroundAlt: '#f8f7f4',
    surface: '#ffffff',
    text: '#2d2d2d',
    textMuted: '#6b6b6b',
    border: 'rgba(0,0,0,0.08)',
  },
  fonts: {
    heading: "'Playfair Display', Georgia, serif",
    body: "'Inter', system-ui, sans-serif",
  },
  spacing: {
    section: 'py-20 md:py-28',
    container: 'max-w-7xl',
    gap: 'gap-16',
  },
  radius: {
    small: 'rounded',
    medium: 'rounded-lg',
    large: 'rounded-xl',
    full: 'rounded-full',
  },
  shadows: {
    small: 'shadow-sm',
    medium: 'shadow-xl',
    large: 'shadow-2xl',
  },
  isDark: false,
  headerStyle: 'solid',
  cardStyle: 'bordered',
  buttonStyle: 'solid',
};

export const cardsTheme: ThemeConfig = {
  id: 'cards',
  name: 'Modern & Fresh',
  colors: {
    background: '#f6f7f8',
    backgroundAlt: '#eef0f2',
    surface: '#ffffff',
    text: '#1e293b',
    textMuted: '#64748b',
    border: 'rgba(0,0,0,0.06)',
  },
  fonts: {
    heading: "'DM Sans', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
  },
  spacing: {
    section: 'py-6',
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
    medium: 'shadow-md',
    large: 'shadow-xl',
  },
  isDark: false,
  headerStyle: 'floating',
  cardStyle: 'elevated',
  buttonStyle: 'solid',
};

// ============================================
// THEME REGISTRY
// ============================================
export const themes: Record<string, ThemeConfig> = {
  classic: classicTheme,
  bold: boldTheme,
  minimal: minimalTheme,
  magazine: magazineTheme,
  cards: cardsTheme,
};

export function getTheme(themeId: string): ThemeConfig {
  return themes[themeId] || classicTheme;
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
  editorial: { name: 'Editorial', description: 'Playfair Display + Inter' },
  soft: { name: 'Zacht', description: 'Libre Baskerville + DM Sans' },
  clean: { name: 'Clean', description: 'Poppins' },
};