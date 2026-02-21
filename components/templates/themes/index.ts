// components/templates/themes/index.ts
// v3: Complete Color Story System
//
// CHANGELOG v3:
// - 20 unieke palettes (4 per template), GEEN klonen meer
// - Elke palette bevat een volledig kleurenverhaal:
//   primary, accent, bg, bgAlt, text, textMuted, border
// - primary ≠ accent overal → natuurlijke sectie-variatie
// - Achtergrondtinten per palette → hele pagina voelt anders aan
// - Components die palette.bg/palette.text/etc. gebruiken
//   krijgen automatisch palette-specifieke kleuren

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
// COLOR PALETTES — 20 unieke kleurenverhalen
// ============================================
//
// Structuur per palette:
//   primary      → Knoppen, links, headings, CTA
//   primaryHover → Hover state
//   primaryLight → Lichte tint voor badges, highlights
//   primaryDark  → Donkere variant voor emphasis
//   accent       → Secundaire kleur (ANDERS dan primary!)
//   accentLight  → Lichte accent voor subtiele elementen
//   bg           → Pagina achtergrond (overschrijft theme.colors.background)
//   bgAlt        → Alternatieve sectie achtergrond
//   text         → Tekst kleur
//   textMuted    → Gedempt tekst
//   border       → Border kleur
//
// Components kunnen palette.bg / palette.text etc. gebruiken
// voor palette-specifieke kleuren. Als ze dat niet doen,
// vallen ze terug op theme.colors.

export const palettes = {

  // ╔══════════════════════════════════════════╗
  // ║  EDITORIAL — Klassiek, Warm, Serif       ║
  // ╚══════════════════════════════════════════╝

  // 1. Editorial Sage — Standaard, rustgevend groen
  editorial: {
    primary: '#5a7c6f',
    primaryHover: '#4a6b5f',
    primaryLight: 'rgba(90, 124, 111, 0.12)',
    primaryDark: '#3d5a4f',
    accent: '#b8860b',         // Warm goud — contrast met koel groen
    accentLight: '#d4a84b',
    bg: '#faf9f6',
    bgAlt: '#eeebe8',
    text: '#1a2e28',
    textMuted: '#5a6b65',
    border: 'rgba(90, 124, 111, 0.12)',
  },

  // 2. Burgundy — Sophisticated wijn rood
  burgundy: {
    primary: '#7c3a50',
    primaryHover: '#6b2d42',
    primaryLight: 'rgba(124, 58, 80, 0.10)',
    primaryDark: '#5a2538',
    accent: '#ae855e',         // Dusty goud — warm complement (darkened for WCAG 3:1)
    accentLight: '#d4b08a',
    bg: '#faf8f8',
    bgAlt: '#f0e9e9',
    text: '#2d1f24',
    textMuted: '#6b5a60',
    border: 'rgba(124, 58, 80, 0.10)',
  },

  // 3. Navy — Betrouwbaar, professioneel blauw
  navy: {
    primary: '#3d4a6b',
    primaryHover: '#2d3a5a',
    primaryLight: 'rgba(61, 74, 107, 0.10)',
    primaryDark: '#252d45',
    accent: '#bc8058',         // Warm koper — zachte warmte bij koel blauw (darkened for WCAG 3:1)
    accentLight: '#d4a080',
    bg: '#f8f9fc',
    bgAlt: '#e9ecf1',
    text: '#1a2030',
    textMuted: '#5a6580',
    border: 'rgba(61, 74, 107, 0.10)',
  },

  // 4. Caramel — Aards, warm bruin
  caramel: {
    primary: '#7c6a4f',
    primaryHover: '#6b5a40',
    primaryLight: 'rgba(124, 106, 79, 0.10)',
    primaryDark: '#5a4d38',
    accent: '#5a7c6f',         // Sage groen — fris contrast bij warm bruin
    accentLight: '#7a9c8f',
    bg: '#faf9f5',
    bgAlt: '#f0ece4',
    text: '#2a2318',
    textMuted: '#6b6255',
    border: 'rgba(124, 106, 79, 0.10)',
  },

  // ╔══════════════════════════════════════════╗
  // ║  PROACTIEF — Modern, Energiek, Sans      ║
  // ╚══════════════════════════════════════════╝

  // 5. ProActief Cyan — Standaard, dynamisch blauw
  proactief: {
    primary: '#007fa9',
    primaryHover: '#007095',
    primaryLight: 'rgba(0, 127, 169, 0.10)',
    primaryDark: '#004466',
    accent: '#f26632',         // Oranje — energiek complement (darkened for WCAG 3:1)
    accentLight: '#ff8c5a',
    bg: '#ffffff',
    bgAlt: '#e9f5fb',
    text: '#0f172a',
    textMuted: '#607085',
    border: 'rgba(0, 127, 169, 0.08)',
  },

  // 6. Electric — Krachtig paars
  electric: {
    primary: '#7c3aed',
    primaryHover: '#6d28d9',
    primaryLight: 'rgba(124, 58, 237, 0.08)',
    primaryDark: '#5b21b6',
    accent: '#0ea170',         // Smaragd groen — frisse tegenhanger (darkened for WCAG 3:1)
    accentLight: '#34d399',
    bg: '#faf8ff',
    bgAlt: '#e7e3ff',
    text: '#1a1033',
    textMuted: '#6b6190',
    border: 'rgba(124, 58, 237, 0.08)',
  },

  // 7. Sunset — Warm koraal-rood
  sunset: {
    primary: '#d14635',
    primaryHover: '#b83e2f',
    primaryLight: 'rgba(209, 70, 53, 0.08)',
    primaryDark: '#a52d1c',
    accent: '#0891b2',         // Teal — koel contrast bij warm rood
    accentLight: '#22d3ee',
    bg: '#fffaf8',
    bgAlt: '#ffe8e2',
    text: '#1a1210',
    textMuted: '#6b5c58',
    border: 'rgba(220, 74, 56, 0.08)',
  },

  // 8. Emerald — Fris, gezond groen
  emerald: {
    primary: '#05875f',
    primaryHover: '#047754',
    primaryLight: 'rgba(5, 135, 95, 0.08)',
    primaryDark: '#065f46',
    accent: '#d97706',         // Amber — warm accent bij koel groen
    accentLight: '#f59e0b',
    bg: '#f8fffe',
    bgAlt: '#e9f6ee',
    text: '#0a1f18',
    textMuted: '#4a6b60',
    border: 'rgba(5, 150, 105, 0.08)',
  },

  // ╔══════════════════════════════════════════╗
  // ║  PORTFOLIO — Elegant, Sophisticated      ║
  // ╚══════════════════════════════════════════╝

  // 9. Portfolio Forest — Standaard, diep groen + lime
  portfolio: {
    primary: '#1a3a2f',
    primaryHover: '#2d5a47',
    primaryLight: 'rgba(26, 58, 47, 0.08)',
    primaryDark: '#0f251d',
    accent: '#699838',         // Lime groen — fris tegen donker (darkened for WCAG 3:1)
    accentLight: '#9ccc65',
    bg: '#f8f6f2',
    bgAlt: '#ebe7df',
    text: '#1a2e28',
    textMuted: '#5a6b65',
    border: 'rgba(26, 58, 47, 0.08)',
  },

  // 10. Charcoal — Strak, premium grijs + goud
  charcoal: {
    primary: '#2d3436',
    primaryHover: '#1e2628',
    primaryLight: 'rgba(45, 52, 54, 0.08)',
    primaryDark: '#1a1e1f',
    accent: '#ac8843',         // Goud — luxe accent bij neutraal grijs (darkened for WCAG 3:1)
    accentLight: '#e4c478',
    bg: '#f8f8f6',
    bgAlt: '#ecebe7',
    text: '#1a1c1e',
    textMuted: '#5a5e60',
    border: 'rgba(45, 52, 54, 0.08)',
  },

  // 11. Midnight — Diep navy + staal blauw
  midnight: {
    primary: '#1e293b',
    primaryHover: '#334155',
    primaryLight: 'rgba(30, 41, 59, 0.08)',
    primaryDark: '#0f172a',
    accent: '#7d8db0',         // Staal blauw — subtiel, sophisticated (darkened for WCAG 3:1)
    accentLight: '#a8b8d8',
    bg: '#f8f9fb',
    bgAlt: '#e9ebf0',
    text: '#0f172a',
    textMuted: '#475569',
    border: 'rgba(30, 41, 59, 0.08)',
  },

  // 12. Espresso — Warm donkerbruin + sage
  espresso: {
    primary: '#3e2723',
    primaryHover: '#4e342e',
    primaryLight: 'rgba(62, 39, 35, 0.08)',
    primaryDark: '#2a1a17',
    accent: '#6b9a39',         // Sage groen — fris leven bij donker bruin (darkened for WCAG 3:1)
    accentLight: '#8bc34a',
    bg: '#f9f7f5',
    bgAlt: '#eeeae5',
    text: '#2a1e1a',
    textMuted: '#6b5d55',
    border: 'rgba(62, 39, 35, 0.08)',
  },

  // ╔══════════════════════════════════════════╗
  // ║  MINDOOR — Warm, Organisch, Friendly     ║
  // ╚══════════════════════════════════════════╝

  // 13. Mindoor Sage+Coral — Standaard, organisch warm
  mindoor: {
    primary: '#5a7c5a',
    primaryHover: '#4a6349',
    primaryLight: 'rgba(90, 124, 90, 0.10)',
    primaryDark: '#3d503d',
    accent: '#d4644a',         // Coral — warm, uitnodigend
    accentLight: '#e07b5f',
    bg: '#faf8f5',
    bgAlt: '#f2ece1',
    text: '#1a1a1a',
    textMuted: '#6b6560',
    border: 'rgba(90, 124, 90, 0.08)',
  },

  // 14. Dusty Rose — Zacht roze + olijf
  dustyrose: {
    primary: '#946b74',
    primaryHover: '#825e66',
    primaryLight: 'rgba(148, 107, 116, 0.10)',
    primaryDark: '#6f5057',
    accent: '#6b705c',         // Olijf groen — aards, geaard
    accentLight: '#858a76',
    bg: '#fdf8f8',
    bgAlt: '#f4eaea',
    text: '#2d2024',
    textMuted: '#76676b',
    border: 'rgba(181, 131, 141, 0.08)',
  },

  // 15. Olive — Aards groen + terracotta
  olive: {
    primary: '#6b705c',
    primaryHover: '#5a5f4e',
    primaryLight: 'rgba(107, 112, 92, 0.10)',
    primaryDark: '#4a4e3f',
    accent: '#c4694a',         // Terracotta — warm aards complement
    accentLight: '#d4845c',
    bg: '#f9f9f6',
    bgAlt: '#edede5',
    text: '#1e2018',
    textMuted: '#5a5e50',
    border: 'rgba(107, 112, 92, 0.08)',
  },

  // 16. Amber — Gouden warmte + bos groen
  amber: {
    primary: '#937133',
    primaryHover: '#81632d',
    primaryLight: 'rgba(147, 113, 51, 0.10)',
    primaryDark: '#6e5526',
    accent: '#4a6b4a',         // Bos groen — natuur accent
    accentLight: '#6a8b6a',
    bg: '#fdfaf5',
    bgAlt: '#f6efe0',
    text: '#2a2418',
    textMuted: '#6b6050',
    border: 'rgba(161, 124, 56, 0.08)',
  },

  // ╔══════════════════════════════════════════╗
  // ║  SERENE — Zen, Minimalistisch, Rustig    ║
  // ╚══════════════════════════════════════════╝

  // 17. Serene Sage — Standaard, gedempte sage
  serene: {
    primary: '#3d4a3d',
    primaryHover: '#2d382d',
    primaryLight: 'rgba(61, 74, 61, 0.08)',
    primaryDark: '#2a332a',
    accent: '#86927c',         // Licht sage — zacht, zen (darkened for WCAG 3:1)
    accentLight: '#a8b5a0',
    bg: '#f9faf8',
    bgAlt: '#edf0ea',
    text: '#2d3a2d',
    textMuted: '#617061',
    border: 'rgba(61, 74, 61, 0.08)',
  },

  // 18. Stone — Koel mineraal grijs
  stone: {
    primary: '#6b7280',
    primaryHover: '#4b5563',
    primaryLight: 'rgba(107, 114, 128, 0.08)',
    primaryDark: '#374151',
    accent: '#5a7c6f',         // Sage groen — organic touch
    accentLight: '#7a9c8f',
    bg: '#f9fafb',
    bgAlt: '#ecedf0',
    text: '#1f2937',
    textMuted: '#656b79',
    border: 'rgba(107, 114, 128, 0.08)',
  },

  // 19. Dusk — Gedempt blauw-paars
  dusk: {
    primary: '#5a6b8a',
    primaryHover: '#4a5a78',
    primaryLight: 'rgba(90, 107, 138, 0.08)',
    primaryDark: '#3d4a62',
    accent: '#8b7c6a',         // Warm taupe — aardse warmte bij koel blauw
    accentLight: '#a89880',
    bg: '#f8f9fc',
    bgAlt: '#e7eaf4',
    text: '#1a2030',
    textMuted: '#5a6580',
    border: 'rgba(90, 107, 138, 0.08)',
  },

  // 20. Moss — Diep mosgroen
  moss: {
    primary: '#4a5d4a',
    primaryHover: '#3a4d3a',
    primaryLight: 'rgba(74, 93, 74, 0.08)',
    primaryDark: '#2d3d2d',
    accent: '#7c6a5d',         // Warm hout — organisch complement
    accentLight: '#9c8a7d',
    bg: '#f8faf7',
    bgAlt: '#eaefe8',
    text: '#1e2a1e',
    textMuted: '#5a6b5a',
    border: 'rgba(74, 93, 74, 0.08)',
  },

  // ╔══════════════════════════════════════════╗
  // ║  LEGACY — Backward compatibility         ║
  // ╚══════════════════════════════════════════╝
  // Oude palettes mappen naar nieuwe. Componenten die
  // nog 'sage', 'ocean', etc. refereren blijven werken.

  sage: {
    primary: '#5a7c6f',
    primaryHover: '#4a6b5f',
    primaryLight: 'rgba(90, 124, 111, 0.12)',
    primaryDark: '#3d5a4f',
    accent: '#b8860b',
    accentLight: '#d4a84b',
    bg: '#faf9f6',
    bgAlt: '#eeebe8',
    text: '#1a2e28',
    textMuted: '#5a6b65',
    border: 'rgba(90, 124, 111, 0.12)',
  },
  lavender: {
    primary: '#7c6f9e',
    primaryHover: '#6b5f8d',
    primaryLight: 'rgba(124, 111, 158, 0.10)',
    primaryDark: '#5a4f7a',
    accent: '#c49670',
    accentLight: '#d4aa88',
    bg: '#faf8fc',
    bgAlt: '#eceaf2',
    text: '#1e1a28',
    textMuted: '#6b6580',
    border: 'rgba(124, 111, 158, 0.10)',
  },
  slate: {
    primary: '#475569',
    primaryHover: '#334155',
    primaryLight: 'rgba(71, 85, 105, 0.10)',
    primaryDark: '#1e293b',
    accent: '#d4a853',
    accentLight: '#e4c478',
    bg: '#f8f9fb',
    bgAlt: '#ecedf1',
    text: '#0f172a',
    textMuted: '#475569',
    border: 'rgba(71, 85, 105, 0.10)',
  },
  mint: {
    primary: '#059669',
    primaryHover: '#047857',
    primaryLight: 'rgba(5, 150, 105, 0.08)',
    primaryDark: '#065f46',
    accent: '#d97706',
    accentLight: '#f59e0b',
    bg: '#f8fffe',
    bgAlt: '#e9f6ee',
    text: '#0a1f18',
    textMuted: '#4a6b60',
    border: 'rgba(5, 150, 105, 0.08)',
  },
  sand: {
    primary: '#b45309',
    primaryHover: '#92400e',
    primaryLight: 'rgba(180, 83, 9, 0.10)',
    primaryDark: '#78350f',
    accent: '#5a7c6f',
    accentLight: '#7a9c8f',
    bg: '#fdfaf5',
    bgAlt: '#f6efe0',
    text: '#2a2418',
    textMuted: '#6b6050',
    border: 'rgba(180, 83, 9, 0.08)',
  },
  rose: {
    primary: '#be185d',
    primaryHover: '#9d174d',
    primaryLight: 'rgba(190, 24, 93, 0.08)',
    primaryDark: '#831843',
    accent: '#6b705c',
    accentLight: '#858a76',
    bg: '#fdf8f9',
    bgAlt: '#f4eaed',
    text: '#2d1020',
    textMuted: '#7a5a68',
    border: 'rgba(190, 24, 93, 0.08)',
  },
  ocean: {
    primary: '#0369a1',
    primaryHover: '#075985',
    primaryLight: 'rgba(3, 105, 161, 0.08)',
    primaryDark: '#0c4a6e',
    accent: '#d97706',
    accentLight: '#f59e0b',
    bg: '#f8faff',
    bgAlt: '#e9eff8',
    text: '#0a1828',
    textMuted: '#4a6580',
    border: 'rgba(3, 105, 161, 0.08)',
  },
  forest: {
    primary: '#1a3a2f',
    primaryHover: '#2d5a47',
    primaryLight: 'rgba(26, 58, 47, 0.08)',
    primaryDark: '#0f251d',
    accent: '#7cb342',
    accentLight: '#9ccc65',
    bg: '#f8f6f2',
    bgAlt: '#ebe7df',
    text: '#1a2e28',
    textMuted: '#5a6b65',
    border: 'rgba(26, 58, 47, 0.08)',
  },
  coral: {
    primary: '#d4644a',
    primaryHover: '#c25438',
    primaryLight: 'rgba(212, 100, 74, 0.10)',
    primaryDark: '#a34432',
    accent: '#5a7c5a',
    accentLight: '#7a9c7a',
    bg: '#fffaf8',
    bgAlt: '#f5ece7',
    text: '#2a1a14',
    textMuted: '#6b5850',
    border: 'rgba(212, 100, 74, 0.08)',
  },
  teal: {
    primary: '#0891b2',
    primaryHover: '#0e7490',
    primaryLight: 'rgba(8, 145, 178, 0.08)',
    primaryDark: '#155e75',
    accent: '#d97706',
    accentLight: '#f59e0b',
    bg: '#f8fdff',
    bgAlt: '#e9f5fb',
    text: '#0a1a20',
    textMuted: '#4a6068',
    border: 'rgba(8, 145, 178, 0.08)',
  },
};

export type PaletteKey = keyof typeof palettes;

export function getPalette(paletteId: string) {
  return palettes[paletteId as PaletteKey] || palettes.editorial;
}

// ============================================
// FONT PAIRINGS (12 totaal)
// ============================================
export const fontPairings = {
  // === TEMPLATE-SPECIFIEKE PAIRINGS ===
  editorial: {
    heading: "'Newsreader', Georgia, serif",
    body: "'Source Sans 3', system-ui, sans-serif",
  },
  proactief: {
    heading: "'Space Grotesk', system-ui, sans-serif",
    body: "'Work Sans', system-ui, sans-serif",
  },
  portfolio: {
    heading: "'DM Serif Display', Georgia, serif",
    body: "'DM Sans', system-ui, sans-serif",
  },
  mindoor: {
    heading: "'Fraunces', Georgia, serif",
    body: "'Nunito', system-ui, sans-serif",
  },
  serene: {
    heading: "'Cormorant Garamond', Georgia, serif",
    body: "'Nunito Sans', system-ui, sans-serif",
  },

  // === GENERIEKE PAIRINGS ===
  classic: {
    heading: "'Libre Baskerville', Georgia, serif",
    body: "'Karla', system-ui, sans-serif",
  },
  modern: {
    heading: "'Plus Jakarta Sans', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
  },
  elegant: {
    heading: "'Instrument Serif', Georgia, serif",
    body: "'Lato', system-ui, sans-serif",
  },
  friendly: {
    heading: "'Figtree', system-ui, sans-serif",
    body: "'Rubik', system-ui, sans-serif",
  },
  professional: {
    heading: "'Archivo', system-ui, sans-serif",
    body: "'Source Sans 3', system-ui, sans-serif",
  },

  // Legacy (backward compat)
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
// TEMPLATE THEMES (5 hoofdtemplates)
// ============================================

export const editorialTheme: ThemeConfig = {
  id: 'editorial',
  name: 'Editorial - Klassiek & Warm',
  colors: {
    background: '#faf9f6',
    backgroundAlt: '#eeebe8',
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
    small: 'rounded-none',
    medium: 'rounded-none',
    large: 'rounded-none',
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
    small: 'rounded-none',
    medium: 'rounded-none',
    large: 'rounded-none',
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
    backgroundAlt: '#f2ece1',
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

export const sereneTheme: ThemeConfig = {
  id: 'serene',
  name: 'Serene - Rustig & Zen',
  colors: {
    background: '#f9faf8',
    backgroundAlt: '#edf0ea',
    surface: '#ffffff',
    text: '#2d3a2d',
    textMuted: '#6b7b6b',
    border: 'rgba(61,74,61,0.1)',
  },
  fonts: fontPairings.serene,
  spacing: {
    section: 'py-24 lg:py-36',
    container: 'max-w-5xl',
    gap: 'gap-10',
  },
  radius: {
    small: 'rounded-lg',
    medium: 'rounded-xl',
    large: 'rounded-2xl',
    full: 'rounded-full',
  },
  shadows: {
    small: 'shadow-[0_4px_20px_rgba(61,74,61,0.04)]',
    medium: 'shadow-[0_8px_30px_rgba(61,74,61,0.06)]',
    large: 'shadow-[0_16px_50px_rgba(61,74,61,0.08)]',
  },
  isDark: false,
  headerStyle: 'solid',
  cardStyle: 'bordered',
  buttonStyle: 'outline',
};

// ============================================
// LEGACY BASE THEMES
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
  editorial: editorialTheme,
  proactief: proActiefTheme,
  portfolio: portfolioTheme,
  mindoor: mindoorTheme,
  serene: sereneTheme,
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
// TEMPLATE PRESETS
// ============================================
export interface TemplatePreset {
  id: string;
  name: string;
  description: string;
  theme: ThemeConfig;
  palette: typeof palettes.editorial;
  sectionStyle: string;
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
  serene: {
    id: 'serene',
    name: 'Serene',
    description: 'Rustig en zen, met elegante typografie en veel ademruimte',
    theme: sereneTheme,
    palette: palettes.serene,
    sectionStyle: 'serene',
  },
};

export function getTemplatePreset(presetId: string): TemplatePreset {
  return templatePresets[presetId] || templatePresets.editorial;
}

// ============================================
// METADATA
// ============================================
export const paletteMetadata: Record<PaletteKey, { name: string; description: string }> = {
  // Editorial family
  editorial: { name: 'Editorial Sage', description: 'Klassiek sage groen + warm goud' },
  burgundy:  { name: 'Burgundy', description: 'Sophisticated wijn rood + dusty goud' },
  navy:      { name: 'Navy', description: 'Betrouwbaar blauw + warm koper' },
  caramel:   { name: 'Caramel', description: 'Warm bruin + sage groen' },
  // ProActief family
  proactief: { name: 'ProActief Cyan', description: 'Dynamisch blauw + oranje' },
  electric:  { name: 'Electric', description: 'Krachtig paars + smaragd' },
  sunset:    { name: 'Sunset', description: 'Warm koraal + teal' },
  emerald:   { name: 'Emerald', description: 'Fris groen + amber' },
  // Portfolio family
  portfolio: { name: 'Portfolio Forest', description: 'Diep groen + lime' },
  charcoal:  { name: 'Charcoal', description: 'Premium grijs + goud' },
  midnight:  { name: 'Midnight', description: 'Diep navy + staal blauw' },
  espresso:  { name: 'Espresso', description: 'Donker bruin + sage' },
  // Mindoor family
  mindoor:   { name: 'Mindoor Sage', description: 'Organisch sage + coral' },
  dustyrose: { name: 'Dusty Rose', description: 'Zacht roze + olijf' },
  olive:     { name: 'Olive', description: 'Aards groen + terracotta' },
  amber:     { name: 'Amber', description: 'Gouden warmte + bosgroen' },
  // Serene family
  serene:    { name: 'Serene Sage', description: 'Gedempte sage + zachte tonen' },
  stone:     { name: 'Stone', description: 'Mineraal grijs + sage' },
  dusk:      { name: 'Dusk', description: 'Gedempt blauw + warm taupe' },
  moss:      { name: 'Moss', description: 'Diep mos + warm hout' },
  // Legacy
  sage:      { name: 'Sage', description: 'Rustgevend groen + goud' },
  lavender:  { name: 'Lavender', description: 'Zacht paars + warm goud' },
  slate:     { name: 'Slate', description: 'Professioneel grijs + goud' },
  mint:      { name: 'Mint', description: 'Fris groen + amber' },
  sand:      { name: 'Sand', description: 'Warm amber + sage' },
  rose:      { name: 'Rose', description: 'Zacht roze + olijf' },
  ocean:     { name: 'Ocean', description: 'Diep blauw + amber' },
  forest:    { name: 'Forest', description: 'Donker groen + lime' },
  coral:     { name: 'Coral', description: 'Warm terracotta + sage' },
  teal:      { name: 'Teal', description: 'Modern teal + amber' },
};

export const fontPairingMetadata: Record<FontPairingKey, { name: string; description: string }> = {
  editorial: { name: 'Editorial', description: 'Newsreader + Source Sans 3' },
  proactief: { name: 'ProActief', description: 'Space Grotesk + Work Sans' },
  portfolio: { name: 'Portfolio', description: 'DM Serif Display + DM Sans' },
  mindoor: { name: 'Mindoor', description: 'Fraunces + Nunito' },
  serene: { name: 'Serene', description: 'Cormorant Garamond + Nunito Sans' },
  classic: { name: 'Klassiek', description: 'Libre Baskerville + Karla' },
  modern: { name: 'Modern', description: 'Plus Jakarta Sans + Inter' },
  elegant: { name: 'Elegant', description: 'Instrument Serif + Lato' },
  friendly: { name: 'Speels', description: 'Figtree + Rubik' },
  professional: { name: 'Krachtig', description: 'Archivo + Source Sans 3' },
  soft: { name: 'Zacht', description: 'Libre Baskerville + DM Sans' },
  clean: { name: 'Clean', description: 'Poppins + Poppins' },
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
  serene: {
    name: 'Serene',
    description: 'Rustgevend en zen met elegante typografie',
    tags: ['rustig', 'zen', 'minimaal', 'vertrouwen']
  },
};