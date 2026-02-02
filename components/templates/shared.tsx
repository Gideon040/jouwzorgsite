// components/templates/shared.tsx
// Gedeelde utilities, componenten en constanten voor alle templates

'use client';

import { Theme } from '@/types';

// ============ THEME PALETTES ============
export const PALETTES = {
  // === ORIGINELE PALETTES ===
  sage: {
    primary: '#5a7c6f',
    primaryHover: '#4a6b5f',
    primaryLight: 'rgba(90, 124, 111, 0.08)',
    primaryBorder: 'rgba(90, 124, 111, 0.2)',
    gradient: 'from-emerald-50 to-teal-50',
  },
  lavender: {
    primary: '#7c6f9e',
    primaryHover: '#6b5f8d',
    primaryLight: 'rgba(124, 111, 158, 0.08)',
    primaryBorder: 'rgba(124, 111, 158, 0.2)',
    gradient: 'from-violet-50 to-purple-50',
  },
  slate: {
    primary: '#475569',
    primaryHover: '#334155',
    primaryLight: 'rgba(71, 85, 105, 0.08)',
    primaryBorder: 'rgba(71, 85, 105, 0.2)',
    gradient: 'from-slate-50 to-gray-100',
  },
  mint: {
    primary: '#059669',
    primaryHover: '#047857',
    primaryLight: 'rgba(5, 150, 105, 0.08)',
    primaryBorder: 'rgba(5, 150, 105, 0.2)',
    gradient: 'from-emerald-50 to-green-50',
  },
  sand: {
    primary: '#b45309',
    primaryHover: '#92400e',
    primaryLight: 'rgba(180, 83, 9, 0.08)',
    primaryBorder: 'rgba(180, 83, 9, 0.2)',
    gradient: 'from-amber-50 to-orange-50',
  },
  rose: {
    primary: '#be185d',
    primaryHover: '#9d174d',
    primaryLight: 'rgba(190, 24, 93, 0.08)',
    primaryBorder: 'rgba(190, 24, 93, 0.2)',
    gradient: 'from-rose-50 to-pink-50',
  },
  ocean: {
    primary: '#0369a1',
    primaryHover: '#075985',
    primaryLight: 'rgba(3, 105, 161, 0.08)',
    primaryBorder: 'rgba(3, 105, 161, 0.2)',
    gradient: 'from-sky-50 to-blue-50',
  },
  
  // === TEMPLATE-SPECIFIEKE PALETTES ===
  
  // Editorial - klassiek sage groen
  editorial: {
    primary: '#5a7c6f',
    primaryHover: '#4a6b5f',
    primaryLight: 'rgba(90, 124, 111, 0.15)',
    primaryBorder: 'rgba(90, 124, 111, 0.2)',
    primaryDark: '#3d5a4f',
    accent: '#5a7c6f',
    gradient: 'from-emerald-50 to-teal-50',
  },
  
  // ProActief - cyaan + oranje
  proactief: {
    primary: '#0099cc',
    primaryHover: '#007aa3',
    primaryLight: 'rgba(0, 153, 204, 0.1)',
    primaryBorder: 'rgba(0, 153, 204, 0.2)',
    primaryDark: '#004466',
    accent: '#ff6b35',
    accentLight: '#f7931e',
    gradient: 'from-cyan-50 to-blue-50',
  },
  
  // Portfolio - forest green + lime
  portfolio: {
    primary: '#1a3a2f',
    primaryHover: '#2d5a47',
    primaryLight: '#3d7a5f',
    primaryBorder: 'rgba(26, 58, 47, 0.2)',
    primaryDark: '#0f251d',
    accent: '#7cb342',
    accentLight: '#9ccc65',
    gradient: 'from-green-50 to-emerald-50',
  },
  
  // Mindoor - sage green + coral
  mindoor: {
    primary: '#5a7c5a',
    primaryHover: '#4a6349',
    primaryLight: 'rgba(90, 124, 90, 0.1)',
    primaryBorder: 'rgba(90, 124, 90, 0.2)',
    primaryDark: '#3d503d',
    accent: '#d4644a',
    accentLight: '#e07b5f',
    gradient: 'from-amber-50 to-orange-50',
  },
  
  // Legacy aliases
  forest: {
    primary: '#1a3a2f',
    primaryHover: '#2d5a47',
    primaryLight: 'rgba(26, 58, 47, 0.1)',
    primaryBorder: 'rgba(26, 58, 47, 0.2)',
    accent: '#7cb342',
    gradient: 'from-green-50 to-emerald-50',
  },
  coral: {
    primary: '#d4644a',
    primaryHover: '#c25438',
    primaryLight: 'rgba(212, 100, 74, 0.1)',
    primaryBorder: 'rgba(212, 100, 74, 0.2)',
    accent: '#e07b5f',
    gradient: 'from-orange-50 to-red-50',
  },
  teal: {
    primary: '#0099cc',
    primaryHover: '#007aa3',
    primaryLight: 'rgba(0, 153, 204, 0.1)',
    primaryBorder: 'rgba(0, 153, 204, 0.2)',
    accent: '#ff6b35',
    gradient: 'from-cyan-50 to-blue-50',
  },
};

export type PaletteKey = keyof typeof PALETTES;

// ============ SFEERBEELDEN PER BEROEP ============
export const BEROEP_IMAGES: Record<string, { hero: string; sfeer: string; alt: string }> = {
  verpleegkundige: {
    hero: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1920&q=80',
    sfeer: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&q=80',
    alt: 'Verpleegkundige zorg',
  },
  verzorgende_ig: {
    hero: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1920&q=80',
    sfeer: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Verzorgende zorg',
  },
  helpende: {
    hero: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=1920&q=80',
    sfeer: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80',
    alt: 'Helpende zorg',
  },
  kraamverzorgende: {
    hero: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=1920&q=80',
    sfeer: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1200&q=80',
    alt: 'Kraamzorg',
  },
  thuiszorg: {
    hero: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1920&q=80',
    sfeer: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Thuiszorg',
  },
  pgb_zorgverlener: {
    hero: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1920&q=80',
    sfeer: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&q=80',
    alt: 'PGB Zorg',
  },
  ggz: {
    hero: 'https://images.unsplash.com/photo-1527137342181-19aab11a8ee8?auto=format&fit=crop&w=1920&q=80',
    sfeer: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    alt: 'GGZ Zorg',
  },
  anders: {
    hero: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=1920&q=80',
    sfeer: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    alt: 'Zorgprofessional',
  },
};

const DEFAULT_IMAGES = BEROEP_IMAGES.anders;

export function getBeroepImages(beroep: string) {
  return BEROEP_IMAGES[beroep] || DEFAULT_IMAGES;
}

export function getColors(palette: string) {
  return PALETTES[palette as PaletteKey] || PALETTES.sage;
}

// ============ DEFAULT THEME ============
export const DEFAULT_THEME: Theme = {
  palette: 'sage',
  fonts: 'friendly',
  variant: 'editorial', // Changed from 'classic'
  borderRadius: 'lg',
  spacing: 'relaxed',
  cardStyle: 'elevated',
  imageTreatment: 'rounded',
  animation: 'fade',
  sections: {
    hero: 'editorial',
    diensten: 'editorial',
    certificaten: 'editorial',
    werkervaring: 'editorial',
    testimonials: 'editorial',
    contact: 'editorial',
  },
};

// ============ SHARED COMPONENTS ============

interface QuoteBannerProps {
  image: string;
  quote?: string;
  colors: any;
  variant?: 'default' | 'dark' | 'minimal';
}

export function QuoteBanner({ 
  image, 
  quote = "Zorgen voor wie ooit voor ons zorgde is een van de hoogste eerbetonen.",
  colors,
  variant = 'default'
}: QuoteBannerProps) {
  if (variant === 'minimal') {
    return (
      <section className="py-24 border-t border-b border-gray-100">
        <div className="max-w-3xl mx-auto text-center px-6">
          <span className="material-symbols-outlined text-4xl mb-6 block" style={{ color: `${colors.primary}40` }}>format_quote</span>
          <p className="text-2xl md:text-3xl font-light leading-relaxed text-gray-700 italic">
            "{quote}"
          </p>
          <div className="w-12 h-px mx-auto mt-8" style={{ backgroundColor: colors.primary }} />
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-fixed bg-center bg-cover scale-110"
        style={{ backgroundImage: `url("${image}")` }}
      />
      <div className={`absolute inset-0 ${variant === 'dark' ? 'bg-black/70' : 'bg-black/60'} backdrop-blur-[2px]`} />
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <span className="material-symbols-outlined text-5xl md:text-6xl mb-6 block" style={{ color: colors.primary }}>format_quote</span>
        <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-display italic leading-tight">
          "{quote}"
        </h2>
        <div className="mt-8 w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: colors.primary }} />
      </div>
    </section>
  );
}

interface ContactFormProps {
  colors: any;
  variant?: 'default' | 'dark' | 'card' | 'minimal';
  titel?: string;
  intro?: string;
  email?: string;
}

export function ContactForm({ 
  colors, 
  variant = 'default',
  email
}: ContactFormProps) {
  const isDark = variant === 'dark';
  const isMinimal = variant === 'minimal';
  
  const inputClasses = isDark 
    ? 'w-full bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-lg h-12 px-4 focus:ring-2 focus:border-transparent'
    : isMinimal
    ? 'w-full bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 rounded-sm h-12 px-4 focus:ring-1 focus:border-transparent'
    : 'w-full bg-white border border-gray-200 text-gray-900 placeholder-gray-400 rounded-lg h-12 px-4 focus:ring-2 focus:border-transparent';
  
  const labelClasses = isDark 
    ? 'block text-sm font-semibold mb-2 text-white/80'
    : 'block text-sm font-semibold mb-2 text-gray-700';

  const textareaClasses = isDark
    ? 'w-full bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-lg px-4 py-3 focus:ring-2 focus:border-transparent resize-none'
    : isMinimal
    ? 'w-full bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 rounded-sm px-4 py-3 focus:ring-1 focus:border-transparent resize-none'
    : 'w-full bg-white border border-gray-200 text-gray-900 placeholder-gray-400 rounded-lg px-4 py-3 focus:ring-2 focus:border-transparent resize-none';

  return (
    <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); if(email) window.location.href = `mailto:${email}`; }}>
      <div>
        <label className={labelClasses}>Naam</label>
        <input 
          type="text" 
          placeholder="Uw naam" 
          className={inputClasses}
          style={{ ['--tw-ring-color' as any]: colors.primary }}
        />
      </div>
      <div>
        <label className={labelClasses}>E-mail</label>
        <input 
          type="email" 
          placeholder="uw@email.nl" 
          className={inputClasses}
          style={{ ['--tw-ring-color' as any]: colors.primary }}
        />
      </div>
      <div>
        <label className={labelClasses}>Bericht</label>
        <textarea 
          placeholder="Vertel over uw zorgvraag..." 
          rows={4}
          className={textareaClasses}
          style={{ ['--tw-ring-color' as any]: colors.primary }}
        />
      </div>
      <button 
        type="submit"
        className={`w-full h-12 font-bold rounded-lg transition-all hover:opacity-90 ${
          isDark ? 'bg-white text-gray-900' : 'text-white'
        } ${isMinimal ? 'rounded-sm tracking-wider uppercase text-sm' : ''}`}
        style={{ backgroundColor: isDark ? undefined : colors.primary, color: isDark ? colors.primary : undefined }}
      >
        Verstuur bericht
      </button>
    </form>
  );
}

// ============ SCROLL REVEAL HOOK ============
export function useScrollReveal() {
  if (typeof window === 'undefined') return;
  
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.1, rootMargin: '-50px' });
  
  revealElements.forEach(el => observer.observe(el));
  
  return () => observer.disconnect();
}

// ============ GLOBAL STYLES ============
export const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Manrope:wght@300;400;500;600;700;800&family=Nunito:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Lato:wght@300;400;700&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');
  
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
  
  .font-display { font-family: 'Libre Baskerville', Georgia, serif; }
  .font-body { font-family: 'Inter', system-ui, sans-serif; }
  .font-modern { font-family: 'DM Sans', system-ui, sans-serif; }
  .font-manrope { font-family: 'Manrope', system-ui, sans-serif; }
  .font-heading { font-family: 'Newsreader', Georgia, serif; }
  .font-editorial { font-family: 'Newsreader', Georgia, serif; }
  .font-proactief { font-family: 'Poppins', system-ui, sans-serif; }
  .font-portfolio { font-family: 'Playfair Display', Georgia, serif; }
  .font-mindoor { font-family: 'Playfair Display', Georgia, serif; }
  
  .reveal { opacity: 0; transition: opacity 0.8s ease, transform 0.8s ease; }
  .reveal-up { transform: translateY(40px); }
  .reveal-left { transform: translateX(-40px); }
  .reveal-right { transform: translateX(40px); }
  .reveal.revealed { opacity: 1; transform: translateY(0) translateX(0); }
  .reveal-delay-1 { transition-delay: 0.1s; }
  .reveal-delay-2 { transition-delay: 0.2s; }
  .reveal-delay-3 { transition-delay: 0.3s; }
  .reveal-delay-4 { transition-delay: 0.4s; }
  
  html { scroll-behavior: smooth; }
`;

// ============ TEMPLATE STYLE HELPERS ============

// Get the recommended palette for a template
export function getTemplatePalette(templateId: string): PaletteKey {
  const templatePalettes: Record<string, PaletteKey> = {
    editorial: 'editorial',
    proactief: 'proactief',
    portfolio: 'portfolio',
    mindoor: 'mindoor',
    classic: 'sage',
    bold: 'slate',
    minimal: 'sage',
    magazine: 'forest',
    cards: 'teal',
  };
  return templatePalettes[templateId] || 'sage';
}

// Get the recommended fonts for a template
export function getTemplateFonts(templateId: string): { heading: string; body: string } {
  const templateFonts: Record<string, { heading: string; body: string }> = {
    editorial: { heading: "'Newsreader', Georgia, serif", body: "'Open Sans', system-ui, sans-serif" },
    proactief: { heading: "'Poppins', system-ui, sans-serif", body: "'Poppins', system-ui, sans-serif" },
    portfolio: { heading: "'Playfair Display', Georgia, serif", body: "'Inter', system-ui, sans-serif" },
    mindoor: { heading: "'Playfair Display', Georgia, serif", body: "'DM Sans', system-ui, sans-serif" },
  };
  return templateFonts[templateId] || templateFonts.editorial;
}
