// components/templates/TemplateFlex.tsx
// Flexibele template die secties rendert op basis van AI configuratie

'use client';

import { useEffect } from 'react';
import { Site } from '@/types';
import { getBeroepLabel } from '@/constants';

interface TemplateFlexProps {
  site: Site;
}

// ============================================
// INTERNAL TYPES
// ============================================

interface SectionConfig {
  type: string;
  style?: string;
}

interface ThemeConfig {
  colors: {
    primary: string;
    primaryHover: string;
    background: string;
    backgroundAlt: string;
    text: string;
    textMuted: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
}

// ============================================
// DEFAULT CONFIGURATIONS
// ============================================

const DEFAULT_SECTIONS: SectionConfig[] = [
  { type: 'hero', style: 'split' },
  { type: 'diensten', style: 'numbered' },
  { type: 'werkwijze', style: 'steps' },
  { type: 'over', style: 'split' },
  { type: 'testimonials', style: 'cards' },
  { type: 'cta', style: 'banner' },
  { type: 'contact', style: 'split' },
];

const DEFAULT_THEME: ThemeConfig = {
  colors: {
    primary: '#5a7c6f',
    primaryHover: '#4a6b5f',
    background: '#ffffff',
    backgroundAlt: '#faf9f7',
    text: '#1f2937',
    textMuted: '#6b7280',
  },
  fonts: {
    heading: 'Newsreader',
    body: 'Open Sans',
  },
};

// ============================================
// COLOR PALETTES
// ============================================

const COLOR_PALETTES: Record<string, Partial<ThemeConfig['colors']>> = {
  sage: { primary: '#5a7c6f', primaryHover: '#4a6b5f' },
  lavender: { primary: '#7c6f9e', primaryHover: '#6b5f8d' },
  slate: { primary: '#475569', primaryHover: '#334155' },
  mint: { primary: '#059669', primaryHover: '#047857' },
  sand: { primary: '#b45309', primaryHover: '#92400e' },
  rose: { primary: '#be185d', primaryHover: '#9d174d' },
  ocean: { primary: '#0369a1', primaryHover: '#075985' },
};

// ============================================
// FONT PAIRINGS
// ============================================

const FONT_PAIRINGS: Record<string, { heading: string; body: string }> = {
  classic: { heading: 'Newsreader', body: 'Open Sans' },
  modern: { heading: 'DM Sans', body: 'Inter' },
  elegant: { heading: 'Libre Baskerville', body: 'Open Sans' },
  friendly: { heading: 'Nunito', body: 'Open Sans' },
  professional: { heading: 'Manrope', body: 'Inter' },
};

// ============================================
// SCROLL REVEAL HOOK
// ============================================

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ============================================
// MAIN COMPONENT
// ============================================

export function TemplateFlex({ site }: TemplateFlexProps) {
  // DEBUG LOG
  console.log('🎯 TemplateFlex MOUNTED');
  console.log('🎯 site.template_id:', site.template_id);
  console.log('🎯 site.generated_content:', site.generated_content);
  console.log('🎯 site.theme:', site.theme);

  const { content, beroep, theme: siteTheme, generated_content } = site;

  // Build theme
  const palette = (siteTheme as any)?.palette || 'sage';
  const fontPairing = (siteTheme as any)?.fontPairing || 'classic';

  console.log('🎯 Using palette:', palette);
  console.log('🎯 Using fontPairing:', fontPairing);

  const theme: ThemeConfig = {
    ...DEFAULT_THEME,
    colors: {
      ...DEFAULT_THEME.colors,
      ...(COLOR_PALETTES[palette] || {}),
    },
    fonts: FONT_PAIRINGS[fontPairing] || FONT_PAIRINGS.classic,
  };

  // Get sections
  let sections: SectionConfig[] = DEFAULT_SECTIONS;
  if (generated_content?.sections && Array.isArray(generated_content.sections)) {
    sections = generated_content.sections as SectionConfig[];
    console.log('🎯 Using generated sections:', sections.length);
  } else if ((siteTheme as any)?.sections && Array.isArray((siteTheme as any).sections)) {
    sections = (siteTheme as any).sections;
    console.log('🎯 Using theme sections:', sections.length);
  } else {
    console.log('🎯 Using DEFAULT sections');
  }

  // Get beroep label
  const beroepLabel = typeof getBeroepLabel === 'function' ? getBeroepLabel(beroep) : beroep;

  // Get generated content
  const gen = generated_content || (content as any)?.generated || {};

  // Initials for placeholder
  const initials = content.naam?.split(' ').map((n: string) => n[0]).join('').slice(0, 2) || 'ZP';

  useScrollReveal();

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        fontFamily: `'${theme.fonts.body}', system-ui, sans-serif`,
      }}
    >
      {/* Google Fonts */}
      <link
        rel="stylesheet"
        href={`https://fonts.googleapis.com/css2?family=${theme.fonts.heading.replace(' ', '+')}:ital,wght@0,400;0,600;0,700;1,400&family=${theme.fonts.body.replace(' ', '+')}:wght@400;500;600;700&display=swap`}
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
      />

      {/* Styles */}
      <style>{`
        .font-heading { font-family: '${theme.fonts.heading}', Georgia, serif; }
        .small-caps { font-variant: small-caps; letter-spacing: 0.15em; font-size: 11px; font-weight: 600; }
        .reveal { opacity: 0; transition: opacity 0.8s ease, transform 0.8s ease; }
        .reveal-up { transform: translateY(40px); }
        .reveal-left { transform: translateX(-40px); }
        .reveal-right { transform: translateX(40px); }
        .reveal.revealed { opacity: 1; transform: translateY(0) translateX(0); }
        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }
      `}</style>

      {/* Header */}
      <header className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-6 border-b border-gray-100">
        <h1 className="font-heading text-xl md:text-2xl font-semibold">{content.naam}</h1>
        <nav className="hidden md:flex gap-8">
          <a href="#diensten" className="text-xs uppercase tracking-widest font-medium" style={{ color: theme.colors.primary }}>
            Diensten
          </a>
          <a href="#over" className="text-xs uppercase tracking-widest font-medium" style={{ color: theme.colors.primary }}>
            Over mij
          </a>
          <a href="#contact" className="text-xs uppercase tracking-widest font-medium" style={{ color: theme.colors.primary }}>
            Contact
          </a>
        </nav>
      </header>

      {/* Render sections */}
      <main>
        {sections
          .filter((s) => s.type !== 'footer')
          .map((section, index) => {
            console.log('🎯 Rendering section:', section.type);
            
            switch (section.type) {
              case 'hero':
                return (
                  <section key={index} className="px-6 md:px-16 lg:px-32 py-16 lg:py-24">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                      <div className="flex flex-col flex-1 gap-8 reveal reveal-left revealed">
                        <div className="flex flex-col gap-5">
                          <span className="small-caps" style={{ color: theme.colors.primary }}>
                            {beroepLabel?.toUpperCase()}
                          </span>
                          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl leading-[1.1] italic">
                            {content.naam}
                          </h1>
                          <h2 className="font-heading text-xl" style={{ color: theme.colors.textMuted }}>
                            {gen?.hero?.titel || 'Persoonlijke zorg met aandacht'}
                          </h2>
                          <p className="text-base leading-relaxed max-w-lg" style={{ color: theme.colors.textMuted }}>
                            {gen?.hero?.beschrijving || gen?.overMij?.intro || content.tagline}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {content.certificaten?.some((c: any) => c.type === 'big') && (
                            <span
                              className="inline-flex items-center gap-2 px-4 py-2 border rounded text-sm"
                              style={{
                                backgroundColor: `${theme.colors.primary}08`,
                                borderColor: `${theme.colors.primary}30`,
                              }}
                            >
                              <span className="material-symbols-outlined text-base" style={{ color: theme.colors.primary }}>
                                verified
                              </span>
                              BIG Geregistreerd
                            </span>
                          )}
                          <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded text-sm text-emerald-700">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                            Beschikbaar
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-4 pt-2">
                          <a
                            href="#contact"
                            className="flex items-center justify-center rounded h-12 px-6 text-white text-sm font-semibold uppercase tracking-widest"
                            style={{ backgroundColor: theme.colors.primary }}
                          >
                            Neem contact op
                          </a>
                        </div>
                      </div>
                      <div className="flex-1 w-full max-w-md lg:max-w-none reveal reveal-right revealed">
                        <div
                          className="aspect-[4/5] w-full rounded-lg overflow-hidden flex items-center justify-center"
                          style={{ backgroundColor: `${theme.colors.primary}10` }}
                        >
                          {content.foto ? (
                            <img src={content.foto} alt={content.naam} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-7xl font-heading" style={{ color: `${theme.colors.primary}40` }}>
                              {initials}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </section>
                );

              case 'diensten':
                const diensten = gen?.diensten?.items || content.diensten || [];
                return (
                  <section
                    key={index}
                    id="diensten"
                    className="px-6 md:px-16 lg:px-32 py-20"
                    style={{ backgroundColor: theme.colors.backgroundAlt }}
                  >
                    <div className="max-w-6xl mx-auto">
                      <div className="mb-14 reveal reveal-up revealed">
                        <span className="small-caps block mb-3" style={{ color: theme.colors.primary }}>
                          DIENSTEN
                        </span>
                        <h2 className="font-heading text-3xl md:text-4xl">{gen?.diensten?.titel || 'Mijn expertise'}</h2>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {diensten.slice(0, 6).map((d: any, i: number) => (
                          <div key={i} className="flex flex-col gap-5 reveal reveal-up revealed">
                            <div
                              className="flex items-center gap-3 border-b pb-4"
                              style={{ borderColor: `${theme.colors.text}20` }}
                            >
                              <span className="material-symbols-outlined" style={{ color: theme.colors.primary }}>
                                {i === 0 ? 'healing' : i === 1 ? 'medication' : 'monitor_heart'}
                              </span>
                              <h3 className="font-heading text-xl font-semibold">
                                {i + 1}. {d.naam}
                              </h3>
                            </div>
                            <p className="text-sm leading-relaxed" style={{ color: theme.colors.textMuted }}>
                              {d.beschrijving}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                );

              case 'werkwijze':
                const stappen = gen?.werkwijze?.stappen || [
                  { titel: 'Contact', beschrijving: 'Neem vrijblijvend contact op.' },
                  { titel: 'Kennismaken', beschrijving: 'We bespreken de opdracht.' },
                  { titel: 'Aan de slag', beschrijving: 'Flexibele inzet op locatie.' },
                  { titel: 'Evaluatie', beschrijving: 'Goede communicatie.' },
                ];
                return (
                  <section key={index} id="werkwijze" className="px-6 md:px-16 lg:px-32 py-20">
                    <div className="max-w-6xl mx-auto">
                      <div className="text-center mb-14 reveal reveal-up revealed">
                        <span className="small-caps block mb-3" style={{ color: theme.colors.primary }}>
                          SAMENWERKEN
                        </span>
                        <h2 className="font-heading text-3xl md:text-4xl">
                          {gen?.werkwijze?.titel || 'Hoe werkt het?'}
                        </h2>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {stappen.map((stap: any, i: number) => (
                          <div key={i} className="flex flex-col gap-4 reveal reveal-up revealed">
                            <div
                              className="w-12 h-12 rounded-full text-white font-semibold flex items-center justify-center text-lg"
                              style={{ backgroundColor: theme.colors.primary }}
                            >
                              {i + 1}
                            </div>
                            <h3 className="font-heading text-lg font-semibold">{stap.titel}</h3>
                            <p className="text-sm leading-relaxed" style={{ color: theme.colors.textMuted }}>
                              {stap.beschrijving}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                );

              case 'over':
                return (
                  <section
                    key={index}
                    id="over"
                    className="px-6 md:px-16 lg:px-32 py-20"
                    style={{ backgroundColor: theme.colors.backgroundAlt }}
                  >
                    <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl mx-auto">
                      <div className="flex-1 flex flex-col gap-6 reveal reveal-left revealed">
                        <span className="small-caps" style={{ color: theme.colors.primary }}>
                          OVER MIJ
                        </span>
                        <h2 className="font-heading text-3xl md:text-4xl">Mijn verhaal</h2>
                        <div className="flex flex-col gap-4 leading-relaxed" style={{ color: theme.colors.textMuted }}>
                          {gen?.overMij ? (
                            <>
                              <p>{gen.overMij.intro}</p>
                              <p>{gen.overMij.body}</p>
                              {gen.overMij.persoonlijk && <p>{gen.overMij.persoonlijk}</p>}
                            </>
                          ) : (
                            <p>{content.over_mij}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex-1 flex justify-center reveal reveal-right revealed">
                        <div
                          className="w-72 h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-2 p-1.5"
                          style={{ borderColor: `${theme.colors.primary}30` }}
                        >
                          <div
                            className="w-full h-full rounded-full flex items-center justify-center overflow-hidden"
                            style={{ backgroundColor: `${theme.colors.primary}10` }}
                          >
                            {content.foto ? (
                              <img src={content.foto} alt={content.naam} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-5xl font-heading" style={{ color: `${theme.colors.primary}40` }}>
                                {initials}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                );

              case 'testimonials':
                const testimonials = gen?.testimonials || [
                  { tekst: 'Professioneel en betrouwbaar.', naam: 'Teamleider', functie: 'Thuiszorg' },
                  { tekst: 'Altijd bereikbaar en deskundig.', naam: 'Coördinator', functie: 'Zorginstelling' },
                  { tekst: 'Goede communicatie.', naam: 'Familie', functie: 'Mantelzorger' },
                ];
                return (
                  <section key={index} className="px-6 md:px-16 lg:px-32 py-20">
                    <div className="max-w-6xl mx-auto">
                      <div className="text-center mb-14 reveal reveal-up revealed">
                        <span className="small-caps block mb-3" style={{ color: theme.colors.primary }}>
                          REFERENTIES
                        </span>
                        <h2 className="font-heading text-3xl md:text-4xl">Wat opdrachtgevers zeggen</h2>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((t: any, i: number) => (
                          <div
                            key={i}
                            className="flex flex-col gap-6 p-8 rounded-lg reveal reveal-up revealed"
                            style={{ backgroundColor: theme.colors.backgroundAlt }}
                          >
                            <div className="flex gap-1">
                              {[...Array(5)].map((_, j) => (
                                <span
                                  key={j}
                                  className="material-symbols-outlined text-amber-400 text-lg"
                                  style={{ fontVariationSettings: "'FILL' 1" }}
                                >
                                  star
                                </span>
                              ))}
                            </div>
                            <p className="text-sm leading-relaxed italic" style={{ color: theme.colors.textMuted }}>
                              "{t.tekst}"
                            </p>
                            <div
                              className="flex items-center gap-3 pt-2 border-t"
                              style={{ borderColor: `${theme.colors.text}15` }}
                            >
                              <div
                                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
                                style={{ backgroundColor: `${theme.colors.primary}20`, color: theme.colors.primary }}
                              >
                                {t.naam.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                              </div>
                              <div>
                                <p className="font-semibold text-sm">{t.naam}</p>
                                <p className="text-xs" style={{ color: theme.colors.textMuted }}>
                                  {t.functie}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                );

              case 'cta':
                return (
                  <section
                    key={index}
                    className="px-6 md:px-16 lg:px-32 py-16"
                    style={{ backgroundColor: theme.colors.primary }}
                  >
                    <div className="max-w-3xl mx-auto text-center text-white reveal reveal-up revealed">
                      <h2 className="font-heading text-3xl md:text-4xl mb-4">
                        {gen?.cta?.titel || 'Op zoek naar versterking?'}
                      </h2>
                      <p className="text-white/80 mb-8 max-w-xl mx-auto">
                        {gen?.cta?.tekst || 'Neem contact op om de mogelijkheden te bespreken.'}
                      </p>
                      <a
                        href="#contact"
                        className="inline-block px-8 py-3 bg-white font-semibold text-sm uppercase tracking-widest rounded"
                        style={{ color: theme.colors.primary }}
                      >
                        Neem contact op
                      </a>
                    </div>
                  </section>
                );

              case 'contact':
                return (
                  <section key={index} id="contact" className="px-6 md:px-16 lg:px-32 py-20">
                    <div className="max-w-6xl mx-auto">
                      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                        <div className="flex-1 flex flex-col gap-8 reveal reveal-left revealed">
                          <div className="flex flex-col gap-4">
                            <span className="small-caps" style={{ color: theme.colors.primary }}>
                              CONTACT
                            </span>
                            <h2 className="font-heading text-3xl md:text-4xl">
                              {gen?.contact?.titel || 'Samenwerken?'}
                            </h2>
                            <p className="leading-relaxed" style={{ color: theme.colors.textMuted }}>
                              {gen?.contact?.intro || 'Neem gerust contact op.'}
                            </p>
                          </div>
                          <div className="flex flex-col gap-5">
                            {content.contact?.telefoon && (
                              <a href={`tel:${content.contact.telefoon}`} className="flex items-center gap-4 group">
                                <span className="material-symbols-outlined" style={{ color: theme.colors.primary }}>
                                  call
                                </span>
                                <div>
                                  <p className="text-xs uppercase font-semibold tracking-widest" style={{ color: theme.colors.textMuted }}>
                                    Telefoon
                                  </p>
                                  <p className="text-lg group-hover:underline">{content.contact.telefoon}</p>
                                </div>
                              </a>
                            )}
                            {content.contact?.email && (
                              <a href={`mailto:${content.contact.email}`} className="flex items-center gap-4 group">
                                <span className="material-symbols-outlined" style={{ color: theme.colors.primary }}>
                                  mail
                                </span>
                                <div>
                                  <p className="text-xs uppercase font-semibold tracking-widest" style={{ color: theme.colors.textMuted }}>
                                    Email
                                  </p>
                                  <p className="text-lg group-hover:underline">{content.contact.email}</p>
                                </div>
                              </a>
                            )}
                            {content.contact?.werkgebied && content.contact.werkgebied.length > 0 && (
                              <div className="flex items-center gap-4">
                                <span className="material-symbols-outlined" style={{ color: theme.colors.primary }}>
                                  location_on
                                </span>
                                <div>
                                  <p className="text-xs uppercase font-semibold tracking-widest" style={{ color: theme.colors.textMuted }}>
                                    Werkgebied
                                  </p>
                                  <p className="text-lg">{content.contact.werkgebied.join(', ')}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex-1 reveal reveal-right revealed">
                          <div
                            className="p-8 lg:p-10 rounded-lg flex flex-col gap-6 border"
                            style={{ backgroundColor: theme.colors.backgroundAlt, borderColor: `${theme.colors.text}15` }}
                          >
                            <h3 className="font-heading text-2xl">Interesse in samenwerking?</h3>
                            <p className="text-sm leading-relaxed" style={{ color: theme.colors.textMuted }}>
                              Ik werk voor zorginstellingen, thuiszorgorganisaties en particulieren.
                            </p>
                            <ul className="space-y-3 text-sm" style={{ color: theme.colors.textMuted }}>
                              <li className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg" style={{ color: theme.colors.primary }}>
                                  check
                                </span>
                                Flexibele inzet
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg" style={{ color: theme.colors.primary }}>
                                  check
                                </span>
                                ZZP met eigen KVK
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg" style={{ color: theme.colors.primary }}>
                                  check
                                </span>
                                Snel ingewerkt
                              </li>
                            </ul>
                            <a
                              href={`mailto:${content.contact?.email}?subject=Samenwerking`}
                              className="w-full h-12 rounded text-white text-sm font-semibold uppercase tracking-widest flex items-center justify-center"
                              style={{ backgroundColor: theme.colors.primary }}
                            >
                              {gen?.contact?.cta || 'Stuur een bericht'}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                );

              default:
                console.log('⚠️ Unknown section type:', section.type);
                return null;
            }
          })}
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#1f2420', color: 'white' }}>
        <div className="px-6 md:px-16 lg:px-32 py-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <h3 className="font-heading text-xl font-semibold mb-4">{content.naam}</h3>
              <p className="text-sm text-gray-400">{beroepLabel}</p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest font-semibold mb-6" style={{ color: theme.colors.primary }}>
                Pagina's
              </h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#diensten" className="hover:text-white">Diensten</a></li>
                <li><a href="#over" className="hover:text-white">Over mij</a></li>
                <li><a href="#contact" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest font-semibold mb-6" style={{ color: theme.colors.primary }}>
                Contact
              </h4>
              <ul className="space-y-3 text-sm text-gray-400">
                {content.contact?.telefoon && <li>{content.contact.telefoon}</li>}
                {content.contact?.email && <li>{content.contact.email}</li>}
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest font-semibold mb-6" style={{ color: theme.colors.primary }}>
                Gegevens
              </h4>
              <ul className="space-y-3 text-sm text-gray-400">
                {content.zakelijk?.kvk && <li>KVK: {content.zakelijk.kvk}</li>}
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 px-6 md:px-16 lg:px-32 py-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>© {new Date().getFullYear()} {content.naam}</p>
            <p>
              Gemaakt met <span className="text-red-400">♥</span> door{' '}
              <a href="https://jouwzorgsite.nl" style={{ color: theme.colors.primary }}>
                JouwZorgSite
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      {content.contact?.telefoon && (
        <a
          href={`https://wa.me/${content.contact.telefoon.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50"
        >
          <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      )}
    </div>
  );
}

export default TemplateFlex;
