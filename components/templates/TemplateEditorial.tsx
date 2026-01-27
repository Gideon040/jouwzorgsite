// components/templates/TemplateEditorial.tsx
// Editorial template met 5 compleet verschillende varianten:
// - classic: Split hero, traditioneel, tijdloos
// - bold: Full-width hero met overlay, statement
// - minimal: Centered, veel whitespace, zen
// - magazine: Editorial grid, 2-kolom, premium
// - cards: Alles in kaarten, modern

'use client';

import { useEffect } from 'react';
import { Site, Theme, ThemeVariant, getJarenErvaring } from '@/types';
import { getBeroepLabel } from '@/constants';

interface TemplateEditorialProps {
  site: Site;
}

// ============ THEME PALETTES ============
const PALETTES = {
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
};

// ============ SFEERBEELDEN PER BEROEP ============
const BEROEP_IMAGES: Record<string, { hero: string; sfeer: string; alt: string }> = {
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
  anders: {
    hero: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=1920&q=80',
    sfeer: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    alt: 'Zorgprofessional',
  },
};

const DEFAULT_IMAGES = BEROEP_IMAGES.anders;

function getBeroepImages(beroep: string) {
  return BEROEP_IMAGES[beroep] || DEFAULT_IMAGES;
}

// ============ SHARED COMPONENTS ============

// Quote Banner - used in all variants
function QuoteBanner({ 
  image, 
  quote = "Zorgen voor wie ooit voor ons zorgde is een van de hoogste eerbetonen.",
  colors,
  variant = 'default'
}: { 
  image: string; 
  quote?: string; 
  colors: any;
  variant?: 'default' | 'dark' | 'minimal';
}) {
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

// Contact Form - used in all variants
function ContactForm({ 
  colors, 
  variant = 'default',
  titel = 'Neem contact op',
  intro = 'Vul het formulier in en ik neem zo snel mogelijk contact met u op.',
  email
}: { 
  colors: any; 
  variant?: 'default' | 'dark' | 'card' | 'minimal';
  titel?: string;
  intro?: string;
  email?: string;
}) {
  const isDark = variant === 'dark';
  const isCard = variant === 'card';
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

// Sfeerbeeld Divider - used between sections
function SfeerbeeldDivider({ image, height = 'h-64 md:h-80' }: { image: string; height?: string }) {
  return (
    <div className={`relative ${height} overflow-hidden`}>
      <div 
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: `url("${image}")` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
    </div>
  );
}

// Default theme
const DEFAULT_THEME: Theme = {
  palette: 'sage',
  fonts: 'friendly',
  variant: 'classic',
  borderRadius: 'lg',
  spacing: 'relaxed',
  cardStyle: 'elevated',
  imageTreatment: 'rounded',
  animation: 'fade',
  sections: {
    hero: 'split',
    diensten: 'cards',
    certificaten: 'badges',
    werkervaring: 'timeline',
    testimonials: null,
    contact: 'split',
  },
};

// Scroll reveal hook
function useScrollReveal() {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    revealElements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export function TemplateEditorial({ site }: TemplateEditorialProps) {
  const { content, beroep, theme: siteTheme } = site;
  const theme = { ...DEFAULT_THEME, ...siteTheme };
const colors = PALETTES[(theme?.palette || 'sage') as keyof typeof PALETTES] || PALETTES.sage;
  const variant = theme.variant || 'classic';
  
  useScrollReveal();
  
  const initials = content.naam?.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase() || '?';
  const bigCert = content.certificaten?.find(c => c.type === 'big');
  const jarenErvaring = getJarenErvaring(content.start_carriere);
  const gen = content.generated;
  const heroTitel = gen?.hero?.titel || content.naam;
  const heroSubtitel = gen?.hero?.subtitel || content.tagline;

  // Render variant-specific template
  return (
    <div className="min-h-screen bg-white">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Manrope:wght@300;400;500;600;700;800&display=swap');
        
        .font-display { font-family: 'Libre Baskerville', Georgia, serif; }
        .font-body { font-family: 'Inter', system-ui, sans-serif; }
        .font-modern { font-family: 'DM Sans', system-ui, sans-serif; }
        .font-manrope { font-family: 'Manrope', system-ui, sans-serif; }
        
        .reveal { opacity: 0; transition: opacity 0.8s ease, transform 0.8s ease; }
        .reveal-up { transform: translateY(40px); }
        .reveal-left { transform: translateX(-40px); }
        .reveal-right { transform: translateX(40px); }
        .reveal.revealed { opacity: 1; transform: translateY(0) translateX(0); }
        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }
      `}</style>

      {variant === 'classic' && (
        <VariantClassic site={site} theme={theme} colors={colors} gen={gen} initials={initials} heroTitel={heroTitel} heroSubtitel={heroSubtitel} bigCert={bigCert} jarenErvaring={jarenErvaring} />
      )}
      {variant === 'bold' && (
        <VariantBold site={site} theme={theme} colors={colors} gen={gen} initials={initials} heroTitel={heroTitel} heroSubtitel={heroSubtitel} bigCert={bigCert} jarenErvaring={jarenErvaring} />
      )}
      {variant === 'minimal' && (
        <VariantMinimal site={site} theme={theme} colors={colors} gen={gen} initials={initials} heroTitel={heroTitel} heroSubtitel={heroSubtitel} bigCert={bigCert} jarenErvaring={jarenErvaring} />
      )}
      {variant === 'magazine' && (
        <VariantMagazine site={site} theme={theme} colors={colors} gen={gen} initials={initials} heroTitel={heroTitel} heroSubtitel={heroSubtitel} bigCert={bigCert} jarenErvaring={jarenErvaring} />
      )}
      {variant === 'cards' && (
        <VariantCards site={site} theme={theme} colors={colors} gen={gen} initials={initials} heroTitel={heroTitel} heroSubtitel={heroSubtitel} bigCert={bigCert} jarenErvaring={jarenErvaring} />
      )}
    </div>
  );
}

// ============================================================
// VARIANT: CLASSIC - Warm, elegant, tijdloos
// Inspired by Google Stitch (Lisa) - Serif fonts, rotated frame, quote banner
// ============================================================
function VariantClassic({ site, theme, colors, gen, initials, heroTitel, heroSubtitel, bigCert, jarenErvaring }: any) {
  const { content, beroep } = site;
  const images = getBeroepImages(beroep);
  
  // Cream/warm background colors
  const bgCream = '#fcf9f5';
  const bgWarm = '#f4f2f0';
  
  return (
    <div className="font-body text-[#181411]" style={{ backgroundColor: bgCream }}>
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 border-b border-black/5 px-6 md:px-10 py-5 backdrop-blur-md" style={{ backgroundColor: `${bgCream}ee` }}>
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-3xl" style={{ color: colors.primary }}>medical_services</span>
            <h2 className="text-xl font-bold tracking-tight font-display">{content.naam?.split(' ')[0]} Zorg</h2>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-9">
              <a href="#over" className="text-sm font-medium hover:opacity-70 transition-colors" style={{ color: colors.primary }}>Over mij</a>
              <a href="#diensten" className="text-sm font-medium hover:opacity-70 transition-colors" style={{ color: colors.primary }}>Diensten</a>
              <a href="#contact" className="text-sm font-medium hover:opacity-70 transition-colors" style={{ color: colors.primary }}>Contact</a>
            </nav>
            <a 
              href="#contact" 
              className="px-6 py-2.5 text-white text-sm font-bold rounded-lg shadow-lg transition-all hover:opacity-90"
              style={{ backgroundColor: colors.primary, boxShadow: `0 4px 14px ${colors.primary}30` }}
            >
              Maak een afspraak
            </a>
          </div>
        </div>
      </header>

      {/* Hero - Split layout with rotated frame */}
      <section className="px-4 md:px-20 py-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-10 py-10">
            {/* Left content */}
            <div className="flex-1 flex flex-col gap-8 reveal reveal-left">
              <div className="flex flex-col gap-4 text-left">
                <h1 className="text-[#181411] text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight font-display">
                  {heroTitel?.split(' ').slice(0, -1).join(' ')} <br/>
                  <span className="italic font-normal" style={{ color: colors.primary }}>
                    {heroTitel?.split(' ').slice(-1)[0] || 'Zorg'}
                  </span>
                </h1>
                <p className="text-[#181411]/80 text-lg font-normal leading-relaxed max-w-[500px]">
                  {heroSubtitel || gen?.overMij?.intro}
                </p>
              </div>
              
              <div className="flex gap-4">
                <a 
                  href="#contact" 
                  className="flex items-center justify-center px-6 h-14 text-white text-base font-bold rounded-lg shadow-lg transition-all hover:opacity-90"
                  style={{ backgroundColor: colors.primary, boxShadow: `0 4px 14px ${colors.primary}30` }}
                >
                  Plan een afspraak
                </a>
                <a 
                  href="#diensten" 
                  className="flex items-center justify-center px-6 h-14 border-2 text-base font-bold rounded-lg transition-all hover:bg-black/5"
                  style={{ borderColor: `${colors.primary}30`, color: colors.primary }}
                >
                  Bekijk diensten
                </a>
              </div>
              
              {/* Credential badges */}
              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-3">
                  {bigCert && (
                    <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: colors.primary, borderColor: bgCream }}>BIG</div>
                  )}
                  {jarenErvaring && (
                    <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: '#7a8d7a', borderColor: bgCream }}>{jarenErvaring}j</div>
                  )}
                </div>
                <p className="text-sm font-medium" style={{ color: '#7a8d7a' }}>Gecertificeerde Zorgprofessional</p>
              </div>
            </div>
            
            {/* Right - Photo with rotated frame */}
            <div className="flex-1 reveal reveal-right">
              <div className="relative">
                {/* Rotated background frame */}
                <div className="absolute -inset-4 rounded-xl -rotate-2" style={{ backgroundColor: `${colors.primary}15` }} />
                {/* Photo */}
                <div 
                  className="relative w-full aspect-[4/5] bg-center bg-cover rounded-xl shadow-2xl"
                  style={{ backgroundImage: `url("${content.foto || images.hero}")` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Photo left, text right */}
      <section id="over" className="py-24 px-4 md:px-20" style={{ backgroundColor: bgWarm }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            {/* Photo */}
            <div className="w-full lg:w-1/3 reveal reveal-left">
              <div 
                className="w-full aspect-square rounded-2xl bg-cover bg-center shadow-xl"
                style={{ backgroundImage: `url("${images.sfeer}")` }}
              />
            </div>
            
            {/* Content */}
            <div className="flex-1 reveal reveal-right">
              <span className="font-bold tracking-widest uppercase text-xs" style={{ color: colors.primary }}>Mijn verhaal & missie</span>
              <h2 className="text-4xl font-bold font-display mt-2 mb-6">Expertise met een Hart</h2>
              <div className="space-y-6 text-lg text-[#181411]/70 leading-relaxed">
                {gen?.overMij ? (
                  <>
                    <p>{gen.overMij.intro}</p>
                    <p>{gen.overMij.body}</p>
                  </>
                ) : (
                  <p>{content.over_mij}</p>
                )}
                
                {/* Checkmarks grid */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {bigCert && (
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined" style={{ color: colors.primary }}>check_circle</span>
                      <span className="text-base font-semibold">BIG Geregistreerd</span>
                    </div>
                  )}
                  {jarenErvaring && (
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined" style={{ color: colors.primary }}>check_circle</span>
                      <span className="text-base font-semibold">{jarenErvaring}+ Jaar Ervaring</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined" style={{ color: colors.primary }}>check_circle</span>
                    <span className="text-base font-semibold">Flexibel Inzetbaar</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined" style={{ color: colors.primary }}>check_circle</span>
                    <span className="text-base font-semibold">Persoonlijke Aanpak</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Cards with hover icons */}
      {(gen?.diensten?.items?.length > 0 || content.diensten?.length > 0) && (
        <section id="diensten" className="py-24 px-4 md:px-20" style={{ backgroundColor: bgCream }}>
          <div className="max-w-[1200px] mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">{gen?.diensten?.titel || 'Mijn Diensten'}</h2>
            <p className="text-[#181411]/60 max-w-2xl mx-auto text-lg">
              {gen?.diensten?.intro || 'Professionele zorg afgestemd op uw specifieke wensen en behoeften.'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(gen?.diensten?.items || content.diensten)?.slice(0, 4).map((d: any, i: number) => (
              <div 
                key={i} 
                className={`group bg-white border p-8 rounded-xl shadow-sm hover:shadow-xl transition-all reveal reveal-up reveal-delay-${i + 1}`}
                style={{ borderColor: `${colors.primary}10` }}
              >
                <div 
                  className="w-14 h-14 rounded-lg flex items-center justify-center mb-6 transition-colors"
                  style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}
                >
                  <span className="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform">
                    {i === 0 ? 'monitor_heart' : i === 1 ? 'healing' : i === 2 ? 'elderly' : 'medication'}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 font-display">{d.naam}</h3>
                <p className="text-sm text-[#181411]/60 leading-relaxed">{d.beschrijving}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Quote Banner - Parallax with overlay */}
      <section className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-fixed bg-center bg-cover scale-110"
          style={{ backgroundImage: `url("${images.sfeer}")` }}
        />
        <div className="absolute inset-0 bg-[#181411]/60 backdrop-blur-[2px]" />
        <div className="relative z-10 text-center px-4 max-w-4xl reveal reveal-up">
          <span className="material-symbols-outlined text-6xl mb-6 block" style={{ color: colors.primary }}>format_quote</span>
          <h2 className="text-white text-4xl md:text-5xl font-display italic leading-tight">
            "Zorgen voor wie ooit voor ons zorgde is een van de hoogste eerbetonen."
          </h2>
          <div className="mt-8 w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: colors.primary }} />
        </div>
      </section>

      {/* Voor Wie Section */}
      {gen?.voorWie && (
        <section className="py-24 px-4 md:px-20" style={{ backgroundColor: bgCream }}>
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold font-display mb-4">{gen.voorWie.titel}</h2>
              <p className="text-[#181411]/60 max-w-2xl mx-auto text-lg">{gen.voorWie.intro}</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {gen.voorWie.doelgroepen?.map((d: any, i: number) => (
                <div 
                  key={i} 
                  className={`group bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all reveal reveal-up reveal-delay-${i + 1}`}
                >
                  <div 
                    className="w-14 h-14 rounded-lg flex items-center justify-center mb-6 transition-colors group-hover:scale-105"
                    style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}
                  >
                    <span className="material-symbols-outlined text-3xl">
                      {d.type === 'instellingen' ? 'business' : d.type === 'bemiddelaars' ? 'handshake' : 'home'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-display">{d.titel}</h3>
                  <p className="text-sm text-[#181411]/60 leading-relaxed">{d.tekst}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section - Split layout with form */}
      <section id="contact" className="py-24 px-4 md:px-20" style={{ backgroundColor: bgWarm }}>
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left - Info */}
          <div className="reveal reveal-left">
            <h2 className="text-4xl font-bold font-display mb-6">{gen?.contact?.titel || 'Laten we kennismaken'}</h2>
            <p className="text-[#181411]/60 text-lg mb-8 leading-relaxed">
              {gen?.contact?.intro || 'Klaar om de zorg te bespreken die u nodig heeft? Neem vandaag nog contact op voor een vrijblijvend gesprek.'}
            </p>
            <div className="space-y-6">
              {content.contact?.telefoon && (
                <a href={`tel:${content.contact.telefoon}`} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                    <span className="material-symbols-outlined">phone_in_talk</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider" style={{ color: colors.primary }}>Bel direct</p>
                    <p className="text-lg font-medium group-hover:underline">{content.contact.telefoon}</p>
                  </div>
                </a>
              )}
              {content.contact?.email && (
                <a href={`mailto:${content.contact.email}`} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                    <span className="material-symbols-outlined">mail</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider" style={{ color: colors.primary }}>Email</p>
                    <p className="text-lg font-medium group-hover:underline">{content.contact.email}</p>
                  </div>
                </a>
              )}
              {content.contact?.werkgebied?.length > 0 && (
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                    <span className="material-symbols-outlined">location_on</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider" style={{ color: colors.primary }}>Werkgebied</p>
                    <p className="text-lg font-medium">{content.contact.werkgebied.slice(0, 3).join(', ')}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Right - Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg reveal reveal-right">
            <h3 className="text-2xl font-bold font-display mb-2">Stuur een bericht</h3>
            <p className="text-[#181411]/60 mb-6 text-sm">Vul het formulier in en ik neem zo snel mogelijk contact met u op.</p>
            <ContactForm colors={colors} email={content.contact?.email} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-6 md:px-10" style={{ backgroundColor: bgWarm, borderColor: `${colors.primary}10` }}>
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-3xl" style={{ color: colors.primary }}>medical_services</span>
            <span className="text-lg font-bold font-display tracking-tight">{content.naam}</span>
          </div>
          <div className="text-sm text-[#181411]/50">
            © {new Date().getFullYear()} {content.naam}. {bigCert && `BIG-registratienummer beschikbaar op aanvraag.`}
          </div>
          <div className="flex gap-6">
            <a href="#over" className="text-sm font-medium hover:opacity-70 transition-colors" style={{ color: colors.primary }}>Over</a>
            <a href="#diensten" className="text-sm font-medium hover:opacity-70 transition-colors" style={{ color: colors.primary }}>Diensten</a>
            <a href="https://jouwzorgsite.nl" className="text-sm font-medium hover:opacity-70 transition-colors" style={{ color: colors.primary }}>JouwZorgSite</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ============================================================
// VARIANT: BOLD - Full-width hero, statement, impactful
// Inspired by Google Stitch - Dark mode, glassmorphism, premium
// ============================================================
function VariantBold({ site, theme, colors, gen, initials, heroTitel, heroSubtitel, bigCert, jarenErvaring }: any) {
  const { content, beroep } = site;
  const images = getBeroepImages(beroep);
  
  return (
    <div className="font-modern bg-[#17191b] text-white min-h-screen">
      {/* Fixed Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-20 py-4 backdrop-blur-md bg-[#17191b]/80 border-b border-white/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primary }}>
              <span className="material-symbols-outlined text-white">medical_services</span>
            </div>
            <h2 className="text-white text-xl font-extrabold tracking-tight">{content.naam?.split(' ')[0]?.toUpperCase()}</h2>
          </div>
          <nav className="hidden md:flex items-center gap-9">
            <a href="#diensten" className="text-white/70 hover:text-white text-sm font-medium transition-colors">Diensten</a>
            <a href="#over" className="text-white/70 hover:text-white text-sm font-medium transition-colors">Over</a>
            <a href="#contact" className="text-white/70 hover:text-white text-sm font-medium transition-colors">Contact</a>
          </nav>
          <a 
            href="#contact" 
            className="hidden md:flex items-center justify-center px-5 h-11 rounded-full text-white text-sm font-bold transition-all hover:opacity-90"
            style={{ backgroundColor: colors.primary }}
          >
            Contact opnemen
          </a>
        </div>
      </header>

      {/* Hero - Full width with gradient overlay */}
      <section className="relative min-h-screen flex items-center pt-20">
        {/* Background with gradient */}
        <div className="absolute inset-0 z-0">
          <img 
            src={content.foto || images.hero} 
            alt={images.alt} 
            className="w-full h-full object-cover" 
          />
          <div 
            className="absolute inset-0" 
            style={{ 
              background: 'linear-gradient(90deg, rgba(23,25,27,0.95) 0%, rgba(23,25,27,0.7) 40%, rgba(23,25,27,0.1) 100%)' 
            }} 
          />
        </div>
        
        {/* Content - Left aligned */}
        <div className="relative z-10 px-6 md:px-20 w-full">
          <div className="max-w-[720px] flex flex-col gap-8">
            {/* Badge */}
            {bigCert && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border w-fit reveal reveal-up" style={{ backgroundColor: `${colors.primary}20`, borderColor: `${colors.primary}40` }}>
                <span className="material-symbols-outlined text-sm" style={{ color: colors.primary }}>verified_user</span>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: colors.primary }}>BIG Geregistreerd</span>
              </div>
            )}
            
            <h1 className="text-white text-5xl md:text-7xl font-black leading-tight tracking-tight reveal reveal-up">
              {heroTitel}
            </h1>
            
            {heroSubtitel && (
              <p className="text-white/70 text-lg md:text-xl font-normal leading-relaxed max-w-[600px] reveal reveal-up">
                {heroSubtitel}
              </p>
            )}
            
            <div className="flex flex-wrap gap-4 reveal reveal-up">
              <a 
                href="#contact" 
                className="flex items-center justify-center px-8 h-14 rounded-full text-white font-bold hover:scale-105 transition-transform"
                style={{ backgroundColor: colors.primary }}
              >
                Direct Contact
              </a>
              <a 
                href="#over" 
                className="flex items-center justify-center px-8 h-14 rounded-full border-2 border-white/20 text-white font-bold hover:bg-white/10 transition-colors"
              >
                Ontdek Meer
              </a>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce">
          <span className="material-symbols-outlined text-3xl">expand_more</span>
        </div>
      </section>

      {/* Stats Section - Glassmorphism cards */}
      <section className="px-6 md:px-20 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {jarenErvaring && (
              <div className="flex flex-col gap-2 rounded-xl p-6 border border-white/10 bg-white/5 backdrop-blur-sm reveal reveal-up">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined" style={{ color: colors.primary }}>history_edu</span>
                  <p className="text-white/50 text-xs font-medium uppercase tracking-wider">Ervaring</p>
                </div>
                <p className="text-white text-3xl font-black">{jarenErvaring}+ jaar</p>
              </div>
            )}
            {bigCert && (
              <div className="flex flex-col gap-2 rounded-xl p-6 border border-white/10 bg-white/5 backdrop-blur-sm reveal reveal-up reveal-delay-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined" style={{ color: colors.primary }}>verified</span>
                  <p className="text-white/50 text-xs font-medium uppercase tracking-wider">Certificering</p>
                </div>
                <p className="text-white text-3xl font-black">BIG</p>
              </div>
            )}
            {content.contact?.werkgebied?.length > 0 && (
              <div className="flex flex-col gap-2 rounded-xl p-6 border border-white/10 bg-white/5 backdrop-blur-sm reveal reveal-up reveal-delay-2">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined" style={{ color: colors.primary }}>location_on</span>
                  <p className="text-white/50 text-xs font-medium uppercase tracking-wider">Werkgebied</p>
                </div>
                <p className="text-white text-3xl font-black">{content.contact.werkgebied.length} regio's</p>
              </div>
            )}
            <div className="flex flex-col gap-2 rounded-xl p-6 border border-white/10 bg-white/5 backdrop-blur-sm reveal reveal-up reveal-delay-3">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined" style={{ color: colors.primary }}>schedule</span>
                <p className="text-white/50 text-xs font-medium uppercase tracking-wider">Beschikbaar</p>
              </div>
              <p className="text-white text-3xl font-black">Flexibel</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Cards with hover */}
      {(gen?.diensten?.items?.length > 0 || content.diensten?.length > 0) && (
        <section id="diensten" className="px-6 md:px-20 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col gap-4 max-w-[720px] mb-16">
              <h2 className="text-white text-4xl md:text-5xl font-black leading-tight reveal reveal-up">
                {gen?.diensten?.titel || 'Expertise'}
              </h2>
              {gen?.diensten?.intro && (
                <p className="text-white/60 text-lg reveal reveal-up">{gen.diensten.intro}</p>
              )}
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {(gen?.diensten?.items || content.diensten)?.slice(0, 6).map((d: any, i: number) => (
                <div 
                  key={i} 
                  className={`group flex flex-col gap-6 rounded-2xl border border-white/10 bg-[#1e2124] p-8 hover:border-white/30 transition-all duration-300 reveal reveal-up reveal-delay-${(i % 3) + 1}`}
                >
                  <div 
                    className="flex items-center justify-center w-14 h-14 rounded-xl transition-colors"
                    style={{ backgroundColor: `${colors.primary}20` }}
                  >
                    <span className="material-symbols-outlined text-3xl" style={{ color: colors.primary }}>
                      {i === 0 ? 'stethoscope' : i === 1 ? 'healing' : i === 2 ? 'monitor_heart' : i === 3 ? 'medication' : i === 4 ? 'emergency' : 'clinical_notes'}
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-white text-xl font-bold">{d.naam}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{d.beschrijving}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Voor Wie Section */}
      {gen?.voorWie && (
        <section className="px-6 md:px-20 py-20 bg-[#1e2124]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-white text-4xl md:text-5xl font-black mb-4 reveal reveal-up">{gen.voorWie.titel}</h2>
            <p className="text-white/60 text-lg mb-16 max-w-2xl reveal reveal-up">{gen.voorWie.intro}</p>
            
            <div className="space-y-0 divide-y divide-white/10">
              {gen.voorWie.doelgroepen?.map((d: any, i: number) => (
                <div 
                  key={i} 
                  className={`group flex items-center gap-8 py-10 cursor-default reveal reveal-left reveal-delay-${i + 1}`}
                >
                  <div className="text-5xl font-black font-mono leading-none transition-colors" style={{ color: `${colors.primary}40` }}>
                    0{i + 1}
                  </div>
                  <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-col">
                      <h3 className="text-white text-2xl font-bold group-hover:translate-x-2 transition-transform duration-300">{d.titel}</h3>
                      <p className="text-white/50 text-lg mt-1">{d.tekst}</p>
                    </div>
                    <div 
                      className="flex items-center justify-center w-14 h-14 rounded-full border border-white/20 group-hover:text-white transition-all duration-300"
                      style={{ ['--tw-bg-opacity' as any]: 0 }}
                    >
                      <span className="material-symbols-outlined text-2xl text-white/50 group-hover:text-white transition-colors" style={{ color: colors.primary }}>arrow_forward</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Over Mij */}
      <section id="over" className="px-6 md:px-20 py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-white text-4xl md:text-5xl font-black mb-12 reveal reveal-up">Over Mij</h2>
          <div className="space-y-6 reveal reveal-up">
            {gen?.overMij ? (
              <>
                <p className="text-2xl text-white font-medium leading-relaxed">{gen.overMij.intro}</p>
                <p className="text-lg text-white/60 leading-relaxed">{gen.overMij.body}</p>
                {gen.overMij.persoonlijk && (
                  <p className="text-lg text-white/40 italic">{gen.overMij.persoonlijk}</p>
                )}
              </>
            ) : (
              <p className="text-lg text-white/60 leading-relaxed">{content.over_mij}</p>
            )}
          </div>
        </div>
      </section>

      {/* Quote Banner */}
      <QuoteBanner 
        image={images.sfeer} 
        quote={gen?.quote || "Excellentie in zorg komt voort uit passie, precisie en toewijding."} 
        colors={colors} 
        variant="dark"
      />

      {/* Contact Section - Dark with form */}
      <section id="contact" className="px-6 md:px-20 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left - Info */}
            <div className="reveal reveal-left">
              <h2 className="text-white text-4xl md:text-5xl font-black mb-6">
                {gen?.contact?.titel || 'Klaar om samen te werken?'}
              </h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed">
                {gen?.contact?.intro || 'Neem contact op om de mogelijkheden te bespreken.'}
              </p>
              
              <div className="space-y-4">
                {content.contact?.telefoon && (
                  <a href={`tel:${content.contact.telefoon}`} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-white/10">
                      <span className="material-symbols-outlined text-white">call</span>
                    </div>
                    <div>
                      <p className="text-white/50 text-xs uppercase tracking-wider">Telefoon</p>
                      <p className="text-white font-semibold group-hover:underline">{content.contact.telefoon}</p>
                    </div>
                  </a>
                )}
                {content.contact?.email && (
                  <a href={`mailto:${content.contact.email}`} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-white/10">
                      <span className="material-symbols-outlined text-white">mail</span>
                    </div>
                    <div>
                      <p className="text-white/50 text-xs uppercase tracking-wider">Email</p>
                      <p className="text-white font-semibold group-hover:underline">{content.contact.email}</p>
                    </div>
                  </a>
                )}
                {content.contact?.werkgebied?.length > 0 && (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-white/10">
                      <span className="material-symbols-outlined text-white">location_on</span>
                    </div>
                    <div>
                      <p className="text-white/50 text-xs uppercase tracking-wider">Werkgebied</p>
                      <p className="text-white font-semibold">{content.contact.werkgebied.slice(0, 3).join(', ')}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Right - Form */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 reveal reveal-right">
              <h3 className="text-white text-xl font-bold mb-2">Stuur een bericht</h3>
              <p className="text-white/50 text-sm mb-6">Ik reageer binnen 24 uur.</p>
              <ContactForm colors={colors} variant="dark" email={content.contact?.email} />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-20 py-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${colors.primary}20` }}>
              <span className="material-symbols-outlined text-lg" style={{ color: colors.primary }}>medical_services</span>
            </div>
            <span className="text-white text-lg font-bold">{content.naam}</span>
          </div>
          <div className="flex gap-8">
            <a href="#diensten" className="text-white/50 hover:text-white text-sm font-medium transition-colors">Diensten</a>
            <a href="#over" className="text-white/50 hover:text-white text-sm font-medium transition-colors">Over</a>
            <a href="#contact" className="text-white/50 hover:text-white text-sm font-medium transition-colors">Contact</a>
          </div>
          <p className="text-white/30 text-sm">© {new Date().getFullYear()} {content.naam}. Powered by <a href="https://jouwzorgsite.nl" className="hover:text-white transition-colors" style={{ color: colors.primary }}>JouwZorgSite</a></p>
        </div>
      </footer>
    </div>
  );
}

// ============================================================
// VARIANT: MINIMAL - Zen, whitespace, rustig
// Inspired by clean therapeutic design - centered, breathable
// ============================================================
function VariantMinimal({ site, theme, colors, gen, initials, heroTitel, heroSubtitel, bigCert, jarenErvaring }: any) {
  const { content, beroep } = site;
  const images = getBeroepImages(beroep);
  
  return (
    <div className="font-body text-gray-700 bg-white min-h-screen">
      {/* Minimal fixed header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-5 flex justify-between items-center">
          <span className="text-sm font-medium tracking-wide">{content.naam?.split(' ')[0]}</span>
          <nav className="flex items-center gap-8">
            <a href="#diensten" className="text-sm text-gray-400 hover:text-gray-700 transition-colors hidden md:block">Diensten</a>
            <a href="#over" className="text-sm text-gray-400 hover:text-gray-700 transition-colors hidden md:block">Over</a>
            <a href="#contact" className="text-sm font-medium" style={{ color: colors.primary }}>Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero - Minimal centered */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        <div className="text-center max-w-2xl mx-auto">
          {/* Circular photo */}
          <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-10 reveal reveal-up ring-4 ring-gray-50">
            <img 
              src={content.foto || images.sfeer} 
              alt={content.naam || images.alt} 
              className="w-full h-full object-cover" 
            />
          </div>
          
          <p className="text-[10px] tracking-[0.4em] uppercase mb-6 reveal reveal-up text-gray-400">
            {getBeroepLabel(beroep)}
          </p>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-relaxed mb-6 reveal reveal-up text-gray-800">
            {heroTitel}
          </h1>
          
          <p className="text-lg text-gray-500 mb-12 reveal reveal-up max-w-lg mx-auto leading-relaxed">
            {heroSubtitel}
          </p>
          
          <a 
            href="#contact" 
            className="inline-block px-10 py-4 text-sm tracking-[0.15em] uppercase transition-all reveal reveal-up rounded-sm hover:opacity-80"
            style={{ backgroundColor: colors.primary, color: 'white' }}
          >
            Contact
          </a>
          
          {/* Scroll indicator */}
          <div className="mt-20 text-gray-300 animate-bounce reveal reveal-up">
            <span className="material-symbols-outlined text-2xl">keyboard_arrow_down</span>
          </div>
        </div>
      </section>

      {/* Pull Quote */}
      <section className="px-6 py-32 border-t border-gray-100">
        <div className="max-w-2xl mx-auto text-center">
          <span className="material-symbols-outlined text-4xl mb-8 block" style={{ color: `${colors.primary}40` }}>format_quote</span>
          <p className="text-2xl md:text-3xl font-light leading-relaxed text-gray-700 italic reveal reveal-up">
            {gen?.overMij?.intro || content.over_mij?.split('\n')[0]}
          </p>
          <div className="w-12 h-px mx-auto mt-10" style={{ backgroundColor: colors.primary }} />
        </div>
      </section>

      {/* Diensten - Elegant list */}
      {(gen?.diensten?.items?.length > 0 || content.diensten?.length > 0) && (
        <section id="diensten" className="px-6 py-24 bg-gray-50/50">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-[10px] tracking-[0.4em] uppercase text-center mb-20 reveal reveal-up" style={{ color: colors.primary }}>
              Diensten
            </h2>
            <div className="space-y-12">
              {(gen?.diensten?.items || content.diensten)?.slice(0, 4).map((d: any, i: number) => (
                <div key={i} className={`text-center reveal reveal-up reveal-delay-${(i % 3) + 1}`}>
                  <h3 className="text-xl font-normal mb-3 text-gray-800">{d.naam}</h3>
                  <p className="text-gray-500 leading-relaxed max-w-md mx-auto">{d.beschrijving}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Voor wie - Minimal 3-column */}
      {gen?.voorWie && (
        <section className="px-6 py-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-[10px] tracking-[0.4em] uppercase text-center mb-20 reveal reveal-up" style={{ color: colors.primary }}>
              {gen.voorWie.titel}
            </h2>
            <div className="grid md:grid-cols-3 gap-16 text-center">
              {gen.voorWie.doelgroepen?.map((d: any, i: number) => (
                <div key={i} className={`reveal reveal-up reveal-delay-${i + 1}`}>
                  <div className="w-12 h-12 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: `${colors.primary}10` }}>
                    <span className="material-symbols-outlined" style={{ color: colors.primary }}>
                      {d.type === 'instellingen' ? 'business' : d.type === 'bemiddelaars' ? 'handshake' : 'home'}
                    </span>
                  </div>
                  <h3 className="font-medium mb-3 text-gray-800">{d.titel}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{d.tekst}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Over mij - Centered text */}
      <section id="over" className="px-6 py-24 bg-gray-50/50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-[10px] tracking-[0.4em] uppercase mb-12 reveal reveal-up" style={{ color: colors.primary }}>
            Over mij
          </h2>
          <div className="text-gray-600 leading-loose space-y-6 reveal reveal-up">
            {gen?.overMij ? (
              <>
                <p className="text-lg">{gen.overMij.body}</p>
                {gen.overMij.persoonlijk && (
                  <p className="text-gray-400 italic">{gen.overMij.persoonlijk}</p>
                )}
              </>
            ) : (
              <p>{content.over_mij}</p>
            )}
          </div>
          
          {/* Credentials */}
          <div className="flex justify-center gap-8 mt-12 reveal reveal-up">
            {bigCert && (
              <div className="text-center">
                <p className="text-2xl font-light" style={{ color: colors.primary }}>BIG</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Geregistreerd</p>
              </div>
            )}
            {jarenErvaring && (
              <div className="text-center">
                <p className="text-2xl font-light" style={{ color: colors.primary }}>{jarenErvaring}+</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Jaar ervaring</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Quote Banner - Minimal style */}
      <QuoteBanner 
        image={images.sfeer} 
        quote={gen?.quote || "In rust en aandacht ligt de ware kracht van zorg."} 
        colors={colors} 
        variant="minimal"
      />

      {/* Contact - Clean centered with form */}
      <section id="contact" className="px-6 py-24">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-light mb-4 reveal reveal-up text-gray-800">
            {gen?.contact?.titel || 'Laten we kennismaken'}
          </h2>
          <p className="text-gray-500 mb-10 reveal reveal-up">
            {gen?.contact?.intro || 'Neem gerust contact op voor een vrijblijvend gesprek.'}
          </p>
          
          <div className="text-left reveal reveal-up">
            <ContactForm colors={colors} variant="minimal" email={content.contact?.email} />
          </div>
          
          <div className="mt-10 pt-8 border-t border-gray-100 reveal reveal-up">
            <div className="flex justify-center gap-8 text-sm text-gray-500">
              {content.contact?.telefoon && (
                <a href={`tel:${content.contact.telefoon}`} className="hover:opacity-70" style={{ color: colors.primary }}>
                  {content.contact.telefoon}
                </a>
              )}
              {content.contact?.werkgebied?.length > 0 && (
                <span>{content.contact.werkgebied[0]}</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer className="px-6 py-12 border-t border-gray-100">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} {content.naam}</p>
          <a href="https://jouwzorgsite.nl" className="hover:opacity-70 transition-opacity" style={{ color: colors.primary }}>JouwZorgSite</a>
        </div>
      </footer>
    </div>
  );
}

// ============================================================
// VARIANT: MAGAZINE - Editorial, premium, thought-leader
// Inspired by Google Stitch (Anna) - Grayscale hover, numbered grid, 2-column
// ============================================================
function VariantMagazine({ site, theme, colors, gen, initials, heroTitel, heroSubtitel, bigCert, jarenErvaring }: any) {
  const { content, beroep } = site;
  const images = getBeroepImages(beroep);
  
  const bgCream = '#fdfcf8';
  const charcoal = '#2d2d2d';
  
  return (
    <div className="font-display" style={{ backgroundColor: bgCream, color: charcoal }}>
      {/* Editorial Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b px-6 md:px-20 py-4" style={{ backgroundColor: `${bgCream}ee`, borderColor: `${charcoal}10` }}>
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tighter">{content.naam?.split(' ')[0]?.charAt(0)}<span style={{ color: colors.primary }}>.</span>{content.naam?.split(' ')[1]?.charAt(0) || 'Z'}</span>
            <h1 className="text-lg font-bold uppercase tracking-widest hidden md:block">{content.naam?.split(' ')[0]} Zorg</h1>
          </div>
          <nav className="hidden md:flex items-center gap-12">
            <a href="#diensten" className="text-sm font-medium uppercase tracking-widest hover:opacity-70 transition-colors" style={{ color: colors.primary }}>Diensten</a>
            <a href="#over" className="text-sm font-medium uppercase tracking-widest hover:opacity-70 transition-colors" style={{ color: colors.primary }}>Over</a>
            <a href="#contact" className="text-sm font-medium uppercase tracking-widest hover:opacity-70 transition-colors" style={{ color: colors.primary }}>Contact</a>
          </nav>
          <a 
            href="#contact"
            className="px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-widest text-white transition-all hover:opacity-90"
            style={{ backgroundColor: colors.primary }}
          >
            Consultatie
          </a>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 md:px-20">
        {/* Hero - Split Editorial */}
        <section className="flex flex-col md:flex-row min-h-[80vh] items-center gap-12 py-16 md:py-24 border-b" style={{ borderColor: `${charcoal}10` }}>
          {/* Left - Photo with grayscale hover */}
          <div className="w-full md:w-1/2 relative reveal reveal-left">
            <div className="aspect-[4/5] rounded-lg overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl">
              <img 
                src={content.foto || images.hero} 
                alt={content.naam}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating quote box */}
            <div className="absolute -bottom-6 -right-6 p-8 rounded-lg hidden lg:block" style={{ backgroundColor: colors.primary }}>
              <p className="text-white text-2xl font-display italic">"Kwaliteit boven alles."</p>
            </div>
          </div>
          
          {/* Right - Content */}
          <div className="w-full md:w-1/2 flex flex-col gap-8 reveal reveal-right">
            <span className="font-bold uppercase tracking-[0.3em] text-sm" style={{ color: colors.primary }}>
              {getBeroepLabel(beroep)} — {content.contact?.werkgebied?.[0] || 'Nederland'}
            </span>
            <h2 className="text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight">
              {heroTitel?.split(' ').slice(0, -1).join(' ')} <span className="italic font-normal">{heroTitel?.split(' ').slice(-1)[0]}</span>
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed opacity-80 max-w-xl">
              {heroSubtitel || gen?.overMij?.intro}
            </p>
            <div className="flex gap-4 pt-4">
              <a href="#diensten" className="flex items-center gap-2 group font-bold uppercase tracking-widest border-b-2 pb-1" style={{ borderColor: colors.primary }}>
                Bekijk diensten
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </a>
            </div>
          </div>
        </section>

        {/* Pull Quote */}
        <section className="py-24 text-center">
          <div className="max-w-4xl mx-auto reveal reveal-up">
            <span className="material-symbols-outlined text-5xl mb-6 block" style={{ color: `${colors.primary}40` }}>format_quote</span>
            <h3 className="text-3xl md:text-4xl font-display italic leading-snug">
              {gen?.overMij?.intro || "In de zorg, zoals in strategie, is duidelijkheid de basis van excellentie."}
            </h3>
            <p className="mt-8 uppercase tracking-[0.2em] font-bold text-sm">— {content.naam}</p>
          </div>
        </section>

        {/* Numbered Services Grid */}
        {(gen?.diensten?.items?.length > 0 || content.diensten?.length > 0) && (
          <section id="diensten" className="py-24 border-t" style={{ borderColor: `${charcoal}10` }}>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="reveal reveal-left">
                <h4 className="text-sm font-bold uppercase tracking-[0.3em] mb-2" style={{ color: colors.primary }}>Expertise</h4>
                <h3 className="text-4xl md:text-5xl font-bold tracking-tight">{gen?.diensten?.titel || 'Diensten'}</h3>
              </div>
              <p className="max-w-md opacity-70 italic text-lg reveal reveal-right">
                {gen?.diensten?.intro || 'Gespecialiseerde zorg op het hoogste niveau.'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l border-r" style={{ borderColor: `${charcoal}10` }}>
              {(gen?.diensten?.items || content.diensten)?.slice(0, 6).map((d: any, i: number) => (
                <div 
                  key={i} 
                  className={`p-12 border-b flex flex-col gap-10 hover:bg-white transition-colors reveal reveal-up reveal-delay-${(i % 3) + 1}`}
                  style={{ borderColor: `${charcoal}10`, borderRight: (i + 1) % 3 !== 0 ? `1px solid ${charcoal}10` : 'none' }}
                >
                  <span className="text-7xl font-display font-extralight" style={{ color: `${colors.primary}20` }}>
                    0{i + 1}
                  </span>
                  <div>
                    <h5 className="text-xl font-bold mb-4 uppercase tracking-tight">{d.naam}</h5>
                    <p className="opacity-80 leading-relaxed">{d.beschrijving}</p>
                  </div>
                  <a href="#contact" className="mt-auto text-sm font-bold uppercase tracking-widest flex items-center gap-2 group" style={{ color: colors.primary }}>
                    Meer info <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Two Column About */}
        <section id="over" className="py-24 border-t" style={{ borderColor: `${charcoal}10` }}>
          <div className="grid md:grid-cols-2 gap-16">
            <div className="reveal reveal-left">
              <h4 className="text-sm font-bold uppercase tracking-[0.3em] mb-2" style={{ color: colors.primary }}>Achtergrond</h4>
              <h3 className="text-4xl font-bold tracking-tight mb-8">Over Mij</h3>
              
              {/* Credentials list */}
              <div className="space-y-4">
                {bigCert && (
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined" style={{ color: colors.primary }}>verified</span>
                    <span className="font-semibold">BIG Geregistreerd</span>
                  </div>
                )}
                {jarenErvaring && (
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined" style={{ color: colors.primary }}>history_edu</span>
                    <span className="font-semibold">{jarenErvaring}+ Jaar Ervaring</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined" style={{ color: colors.primary }}>workspace_premium</span>
                  <span className="font-semibold">Professionele Kwaliteit</span>
                </div>
              </div>
            </div>
            
            <div className="reveal reveal-right">
              <div className="grid grid-cols-2 gap-8 text-lg leading-relaxed opacity-80">
                <p>{gen?.overMij?.intro}</p>
                <p>{gen?.overMij?.body || content.over_mij}</p>
              </div>
              {gen?.overMij?.persoonlijk && (
                <p className="mt-8 italic opacity-60">{gen.overMij.persoonlijk}</p>
              )}
            </div>
          </div>
        </section>

        {/* Voor Wie - Magazine style */}
        {gen?.voorWie && (
          <section className="py-24 border-t" style={{ borderColor: `${charcoal}10` }}>
            <div className="flex items-center justify-between mb-12 border-b pb-6" style={{ borderColor: `${charcoal}10` }}>
              <h3 className="text-2xl font-bold uppercase tracking-widest">{gen.voorWie.titel}</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-12">
              {gen.voorWie.doelgroepen?.map((d: any, i: number) => (
                <div key={i} className={`group cursor-default reveal reveal-up reveal-delay-${i + 1}`}>
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-4xl font-extralight" style={{ color: `${colors.primary}40` }}>0{i + 1}</span>
                    <h4 className="text-xl font-bold pt-2 group-hover:translate-x-1 transition-transform" style={{ color: colors.primary }}>{d.titel}</h4>
                  </div>
                  <p className="opacity-70 leading-relaxed">{d.tekst}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Quote Banner */}
        <QuoteBanner 
          image={images.sfeer} 
          quote={gen?.quote || "Expertise, toewijding en een persoonlijke aanpak vormen de kern van kwaliteitszorg."} 
          colors={colors}
        />

        {/* Contact Section with Form */}
        <section id="contact" className="py-24">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Left - Info */}
            <div className="reveal reveal-left">
              <h4 className="text-sm font-bold uppercase tracking-[0.3em] mb-2" style={{ color: colors.primary }}>Contact</h4>
              <h3 className="text-4xl font-bold tracking-tight mb-6">{gen?.contact?.titel || 'Neem Contact Op'}</h3>
              <p className="opacity-70 text-lg leading-relaxed mb-8">
                {gen?.contact?.intro || 'Klaar om de mogelijkheden te bespreken? Vul het formulier in of neem direct contact op.'}
              </p>
              
              <div className="space-y-4">
                {content.contact?.telefoon && (
                  <a href={`tel:${content.contact.telefoon}`} className="flex items-center gap-3 group">
                    <span className="material-symbols-outlined" style={{ color: colors.primary }}>call</span>
                    <span className="group-hover:underline">{content.contact.telefoon}</span>
                  </a>
                )}
                {content.contact?.email && (
                  <a href={`mailto:${content.contact.email}`} className="flex items-center gap-3 group">
                    <span className="material-symbols-outlined" style={{ color: colors.primary }}>mail</span>
                    <span className="group-hover:underline">{content.contact.email}</span>
                  </a>
                )}
                {content.contact?.werkgebied?.length > 0 && (
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined" style={{ color: colors.primary }}>location_on</span>
                    <span>{content.contact.werkgebied.slice(0, 3).join(', ')}</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Right - Form */}
            <div className="bg-white p-8 rounded-xl shadow-lg border reveal reveal-right" style={{ borderColor: `${charcoal}10` }}>
              <h4 className="text-xl font-bold mb-2">Stuur een bericht</h4>
              <p className="opacity-60 text-sm mb-6">Ik reageer binnen 24 uur op uw bericht.</p>
              <ContactForm colors={colors} email={content.contact?.email} />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-16 px-6 md:px-20 border-t" style={{ backgroundColor: bgCream, borderColor: `${charcoal}10` }}>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <span className="text-3xl font-bold tracking-tighter mb-6 block">{content.naam?.split(' ')[0]?.charAt(0)}.{content.naam?.split(' ')[1]?.charAt(0) || 'Z'}</span>
            <p className="text-sm opacity-60 leading-relaxed">
              Professionele zorgverlening met oog voor kwaliteit en persoonlijke aandacht.
            </p>
          </div>
          <div>
            <h6 className="text-xs font-bold uppercase tracking-[0.3em] mb-6">Diensten</h6>
            <ul className="flex flex-col gap-3 text-sm opacity-80">
              {(gen?.diensten?.items || content.diensten)?.slice(0, 4).map((d: any, i: number) => (
                <li key={i}><a href="#diensten" className="hover:opacity-70 transition-colors">{d.naam}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h6 className="text-xs font-bold uppercase tracking-[0.3em] mb-6">Navigatie</h6>
            <ul className="flex flex-col gap-3 text-sm opacity-80">
              <li><a href="#over" className="hover:opacity-70 transition-colors">Over mij</a></li>
              <li><a href="#diensten" className="hover:opacity-70 transition-colors">Diensten</a></li>
              <li><a href="#contact" className="hover:opacity-70 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h6 className="text-xs font-bold uppercase tracking-[0.3em] mb-6">Contact</h6>
            <div className="space-y-2 text-sm opacity-80">
              {content.contact?.email && <p>{content.contact.email}</p>}
              {content.contact?.telefoon && <p>{content.contact.telefoon}</p>}
            </div>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest opacity-40" style={{ borderColor: `${charcoal}10` }}>
          <p>© {new Date().getFullYear()} {content.naam}. Alle rechten voorbehouden.</p>
          <a href="https://jouwzorgsite.nl" className="hover:opacity-70 transition-colors" style={{ color: colors.primary }}>Powered by JouwZorgSite</a>
        </div>
      </footer>
    </div>
  );
}

// ============================================================
// VARIANT: CARDS - Bento grid, modern, app-like
// Inspired by Google Stitch (Tom) - Floating cards, stats, badges
// ============================================================
function VariantCards({ site, theme, colors, gen, initials, heroTitel, heroSubtitel, bigCert, jarenErvaring }: any) {
  const { content, beroep } = site;
  const images = getBeroepImages(beroep);
  
  const bgLight = '#f6f7f8';
  
  return (
    <div className="font-modern text-slate-900 min-h-screen" style={{ backgroundColor: bgLight }}>
      {/* Floating Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 md:px-10 py-4 pointer-events-none">
        <header className="max-w-[1200px] mx-auto bg-white/80 backdrop-blur-md border border-slate-200/50 rounded-xl px-6 py-3 flex items-center justify-between shadow-sm pointer-events-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
              <span className="material-symbols-outlined">health_and_safety</span>
            </div>
            <h2 className="text-lg font-bold tracking-tight">{content.naam?.split(' ')[0]}'s Portfolio</h2>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#diensten" className="text-sm font-medium hover:opacity-70 transition-colors" style={{ color: colors.primary }}>Diensten</a>
            <a href="#over" className="text-sm font-medium hover:opacity-70 transition-colors" style={{ color: colors.primary }}>Over</a>
            <a href="#credentials" className="text-sm font-medium hover:opacity-70 transition-colors" style={{ color: colors.primary }}>Certificaten</a>
            <a 
              href="#contact" 
              className="text-white text-sm font-bold py-2 px-5 rounded-lg shadow-md transition-all hover:opacity-90"
              style={{ backgroundColor: colors.primary, boxShadow: `0 4px 14px ${colors.primary}30` }}
            >
              Contact
            </a>
          </div>
        </header>
      </div>

      {/* Main Content - Bento Grid */}
      <main className="max-w-[1200px] mx-auto pt-28 pb-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Hero Card - Spans 8 columns */}
          <div className="md:col-span-8 group relative overflow-hidden bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col reveal reveal-up">
            <div 
              className="w-full h-64 md:h-80 bg-center bg-cover transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url("${content.foto || images.hero}")` }}
            />
            <div className="p-8 flex flex-col justify-center flex-grow">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{heroTitel}</h1>
              <p className="text-slate-600 text-lg leading-relaxed max-w-2xl">
                {heroSubtitel || gen?.overMij?.intro}
              </p>
              <div className="mt-6 flex gap-4">
                <a 
                  href="#contact" 
                  className="text-white px-6 py-2.5 rounded-lg font-bold transition-all hover:opacity-90"
                  style={{ backgroundColor: colors.primary }}
                >
                  Contact opnemen
                </a>
                <a 
                  href="#over" 
                  className="border border-slate-200 px-6 py-2.5 rounded-lg font-bold hover:bg-slate-50 transition-colors"
                >
                  Lees meer
                </a>
              </div>
            </div>
          </div>

          {/* Quick Stats Card - Spans 4 columns */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex-1 flex flex-col justify-between reveal reveal-up reveal-delay-1">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Quick Stats</h3>
              <div className="space-y-6">
                {jarenErvaring && (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                      <span className="material-symbols-outlined">calendar_today</span>
                    </div>
                    <div>
                      <p className="text-2xl font-bold tracking-tight">{jarenErvaring}+ Jaar</p>
                      <p className="text-sm text-slate-500">Ervaring</p>
                    </div>
                  </div>
                )}
                {bigCert && (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                      <span className="material-symbols-outlined">verified</span>
                    </div>
                    <div>
                      <p className="text-2xl font-bold tracking-tight">BIG</p>
                      <p className="text-sm text-slate-500">Geregistreerd</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                    <span className="material-symbols-outlined">schedule</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold tracking-tight">Flexibel</p>
                    <p className="text-sm text-slate-500">Beschikbaar</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* CTA Mini Card */}
            <a 
              href="#contact"
              className="rounded-xl p-6 text-white flex items-center justify-between group cursor-pointer overflow-hidden relative reveal reveal-up reveal-delay-2"
              style={{ backgroundColor: colors.primary }}
            >
              <div className="relative z-10">
                <p className="text-sm font-medium opacity-90">Klaar om te starten?</p>
                <h3 className="text-xl font-bold">Neem contact op</h3>
              </div>
              <span className="material-symbols-outlined text-4xl relative z-10 group-hover:translate-x-1 transition-transform">arrow_forward</span>
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
            </a>
          </div>

          {/* Services Card - Spans 7 columns */}
          {(gen?.diensten?.items?.length > 0 || content.diensten?.length > 0) && (
            <section id="diensten" className="md:col-span-7 bg-white rounded-xl shadow-sm border border-slate-100 p-8 reveal reveal-up">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold tracking-tight">{gen?.diensten?.titel || 'Diensten'}</h2>
                <span className="material-symbols-outlined" style={{ color: colors.primary }}>clinical_notes</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(gen?.diensten?.items || content.diensten)?.slice(0, 6).map((d: any, i: number) => (
                  <div 
                    key={i} 
                    className="group flex flex-col gap-4 p-5 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors"
                    style={{ backgroundColor: `${colors.primary}05` }}
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                      <span className="material-symbols-outlined">
                        {i === 0 ? 'favorite' : i === 1 ? 'healing' : i === 2 ? 'elderly' : i === 3 ? 'medication' : i === 4 ? 'home_health' : 'clinical_notes'}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">{d.naam}</h3>
                      <p className="text-slate-500 text-sm leading-normal">{d.beschrijving}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Credentials Card - Spans 5 columns */}
          <section id="credentials" className="md:col-span-5 bg-white rounded-xl shadow-sm border border-slate-100 p-8 reveal reveal-up reveal-delay-1">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined" style={{ color: colors.primary }}>verified</span>
              <h2 className="text-xl font-bold">Certificeringen</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {bigCert && (
                <span className="px-4 py-2.5 rounded-full text-sm font-bold border flex items-center gap-2" style={{ backgroundColor: `${colors.primary}10`, color: colors.primary, borderColor: `${colors.primary}20` }}>
                  <span className="material-symbols-outlined text-lg">verified</span> BIG Geregistreerd
                </span>
              )}
              <span className="px-4 py-2.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-bold border border-emerald-100 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">emergency</span> EHBO
              </span>
              <span className="px-4 py-2.5 bg-blue-50 text-blue-700 rounded-full text-sm font-bold border border-blue-100 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">medical_services</span> Verpleegkunde
              </span>
              {content.certificaten?.slice(0, 3).map((c: any, i: number) => (
                <span 
                  key={i}
                  className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-full text-sm font-bold border border-slate-200 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">workspace_premium</span> {c.naam}
                </span>
              ))}
            </div>
            <p className="text-slate-500 text-sm italic mt-6">Documentatie beschikbaar op aanvraag.</p>
          </section>

          {/* Over Mij Card - Spans 12 columns */}
          <section id="over" className="md:col-span-12 bg-white rounded-xl shadow-sm border border-slate-100 p-8 reveal reveal-up">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined" style={{ color: colors.primary }}>person</span>
              <h2 className="text-xl font-bold">Over Mij</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4 text-slate-600 leading-relaxed">
                {gen?.overMij ? (
                  <>
                    <p className="text-lg">{gen.overMij.intro}</p>
                    <p>{gen.overMij.body}</p>
                    {gen.overMij.persoonlijk && <p className="italic text-slate-500">{gen.overMij.persoonlijk}</p>}
                  </>
                ) : (
                  <p>{content.over_mij}</p>
                )}
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-slate-100" style={{ backgroundColor: `${colors.primary}05` }}>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Werkgebied</p>
                  <p className="font-semibold">{content.contact?.werkgebied?.slice(0, 3).join(', ') || 'Op aanvraag'}</p>
                </div>
                <div className="p-4 rounded-lg border border-slate-100" style={{ backgroundColor: `${colors.primary}05` }}>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Specialisatie</p>
                  <p className="font-semibold">{getBeroepLabel(beroep)}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Cards Row - Spans 12 columns */}
          <section className="md:col-span-12 flex flex-col md:flex-row gap-6 reveal reveal-up">
            {content.contact?.telefoon && (
              <a href={`tel:${content.contact.telefoon}`} className="flex-1 bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex items-center justify-between hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-emerald-500/10 text-emerald-500">
                    <span className="material-symbols-outlined">call</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Telefoon</p>
                    <p className="text-lg font-semibold">{content.contact.telefoon}</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-400">arrow_forward</span>
              </a>
            )}
            {content.contact?.email && (
              <a href={`mailto:${content.contact.email}`} className="flex-1 bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex items-center justify-between hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                    <span className="material-symbols-outlined">mail</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Email</p>
                    <p className="text-lg font-semibold">{content.contact.email}</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-400">arrow_forward</span>
              </a>
            )}
            {content.contact?.werkgebied?.length > 0 && (
              <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-orange-500/10 text-orange-500">
                    <span className="material-symbols-outlined">location_on</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Werkgebied</p>
                    <p className="text-lg font-semibold">{content.contact.werkgebied[0]}</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-400">map</span>
              </div>
            )}
          </section>

          {/* Contact Form Card - Spans 12 columns */}
          <section id="contact" className="md:col-span-12 bg-white rounded-xl shadow-sm border border-slate-100 p-8 reveal reveal-up">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined" style={{ color: colors.primary }}>chat</span>
                  <h2 className="text-xl font-bold">Stuur een bericht</h2>
                </div>
                <p className="text-slate-500 mb-6">
                  {gen?.contact?.intro || 'Vul het formulier in en ik neem zo snel mogelijk contact met u op.'}
                </p>
                <ContactForm colors={colors} variant="card" email={content.contact?.email} />
              </div>
              
              {/* Quote/sfeer */}
              <div className="hidden md:flex flex-col justify-center items-center p-8 rounded-xl" style={{ backgroundColor: `${colors.primary}08` }}>
                <span className="material-symbols-outlined text-5xl mb-4" style={{ color: `${colors.primary}40` }}>format_quote</span>
                <p className="text-center text-lg italic text-slate-600 leading-relaxed">
                  {gen?.quote || "Modern werken in de zorg vraagt om flexibiliteit, professionaliteit en een persoonlijke touch."}
                </p>
                <div className="w-12 h-1 rounded-full mt-6" style={{ backgroundColor: colors.primary }} />
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-[1200px] mx-auto px-4 pb-12 border-t border-slate-200 mt-6 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-slate-500">
            © {new Date().getFullYear()} {content.naam}. Alle rechten voorbehouden.
          </div>
          <div className="flex gap-6">
            <a href="#diensten" className="text-slate-400 hover:text-slate-600 text-sm font-medium transition-colors">Diensten</a>
            <a href="#over" className="text-slate-400 hover:text-slate-600 text-sm font-medium transition-colors">Over</a>
            <a href="https://jouwzorgsite.nl" className="text-sm font-medium transition-colors" style={{ color: colors.primary }}>JouwZorgSite</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
