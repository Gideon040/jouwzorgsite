// components/templates/TemplateMagazine.tsx
// Editorial, premium, thought-leader
// Voor: consultants, adviseurs, experts

'use client';

import { useEffect } from 'react';
import { Site } from '@/types';
import { getBeroepLabel } from '@/constants';
import { getBeroepImages, getColors, ContactForm, GLOBAL_STYLES } from './shared';

interface TemplateMagazineProps {
  site: Site;
}

// Helper function
function getJarenErvaring(werkervaring?: any[]): number | null {
  if (!werkervaring?.length) return null;
  const startYears = werkervaring.map(w => w.start_jaar || w.startJaar).filter(Boolean);
  if (!startYears.length) return null;
  const earliest = Math.min(...startYears);
  return new Date().getFullYear() - earliest;
}

export function TemplateMagazine({ site }: TemplateMagazineProps) {
  const { content, beroep, theme, generated_content } = site;
  const gen = generated_content;
  const colors = getColors(theme?.palette || 'slate');
  const images = getBeroepImages(beroep);
  
  const heroTitel = gen?.hero?.titel || `Expert in ${getBeroepLabel(beroep)}`;
  const heroSubtitel = gen?.hero?.subtitel || gen?.overMij?.intro || 'Professionele zorgverlening op het hoogste niveau';
  const bigCert = content.certificaten?.some((c: any) => c.type === 'big');
  const jarenErvaring = getJarenErvaring(content.werkervaring);

  const bgCream = '#fdfcf8';
  const charcoal = '#2d2d2d';

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('revealed');
      });
    }, { threshold: 0.1 });
    revealElements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: bgCream }}>
      <style jsx global>{GLOBAL_STYLES}</style>
      
      <div className="font-display" style={{ backgroundColor: bgCream, color: charcoal }}>
        {/* Editorial Header */}
        <header className="sticky top-0 z-50 backdrop-blur-md border-b px-6 md:px-20 py-4" style={{ backgroundColor: `${bgCream}ee`, borderColor: `${charcoal}10` }}>
          <div className="max-w-[1400px] mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold tracking-tighter">{content.naam?.split(' ')[0]?.charAt(0)}<span style={{ color: colors.primary }}>.</span>{content.naam?.split(' ')[1]?.charAt(0) || 'Z'}</span>
            </div>
            <nav className="hidden md:flex items-center gap-12">
              <a href="#diensten" className="text-sm font-medium uppercase tracking-widest hover:opacity-70" style={{ color: colors.primary }}>Diensten</a>
              <a href="#over" className="text-sm font-medium uppercase tracking-widest hover:opacity-70" style={{ color: colors.primary }}>Over</a>
              <a href="#contact" className="text-sm font-medium uppercase tracking-widest hover:opacity-70" style={{ color: colors.primary }}>Contact</a>
            </nav>
            <a href="#contact" className="px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-widest text-white" style={{ backgroundColor: colors.primary }}>
              Consultatie
            </a>
          </div>
        </header>

        <main className="max-w-[1400px] mx-auto px-6 md:px-20">
          {/* Hero - Split Editorial */}
          <section className="flex flex-col md:flex-row min-h-[80vh] items-center gap-12 py-16 md:py-24 border-b" style={{ borderColor: `${charcoal}10` }}>
            <div className="w-full md:w-1/2 relative reveal reveal-left">
              <div className="aspect-[4/5] rounded-lg overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl">
                <img src={content.foto || images.hero} alt={content.naam} className="w-full h-full object-cover" />
              </div>
            </div>
            
            <div className="w-full md:w-1/2 flex flex-col gap-8 reveal reveal-right">
              <span className="font-bold uppercase tracking-[0.3em] text-sm" style={{ color: colors.primary }}>
                {getBeroepLabel(beroep)} — {content.contact?.werkgebied?.[0] || 'Nederland'}
              </span>
              <h2 className="text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight">{heroTitel}</h2>
              <p className="text-xl md:text-2xl leading-relaxed opacity-80 max-w-xl">{heroSubtitel}</p>
              <a href="#diensten" className="flex items-center gap-2 group font-bold uppercase tracking-widest border-b-2 pb-1 w-fit" style={{ borderColor: colors.primary }}>
                Bekijk diensten
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </a>
            </div>
          </section>

          {/* Pull Quote */}
          <section className="py-24 text-center">
            <div className="max-w-4xl mx-auto reveal reveal-up">
              <span className="material-symbols-outlined text-5xl mb-6 block" style={{ color: `${colors.primary}40` }}>format_quote</span>
              <h3 className="text-3xl md:text-4xl font-display italic leading-snug">
                {gen?.quote || gen?.overMij?.intro || "Expertise, toewijding en een persoonlijke aanpak vormen de kern van kwaliteitszorg."}
              </h3>
              <p className="mt-8 uppercase tracking-[0.2em] font-bold text-sm">— {content.naam}</p>
            </div>
          </section>

          {/* Numbered Services Grid */}
          {(gen?.diensten?.items?.length || content.diensten?.length) && (
            <section id="diensten" className="py-24 border-t" style={{ borderColor: `${charcoal}10` }}>
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div className="reveal reveal-left">
                  <h4 className="text-sm font-bold uppercase tracking-[0.3em] mb-2" style={{ color: colors.primary }}>Expertise</h4>
                  <h3 className="text-4xl md:text-5xl font-bold tracking-tight">{gen?.diensten?.titel || 'Diensten'}</h3>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l border-r" style={{ borderColor: `${charcoal}10` }}>
                {(gen?.diensten?.items || content.diensten)?.slice(0, 6).map((d: any, i: number) => (
                  <div key={i} className={`p-12 border-b flex flex-col gap-10 hover:bg-white transition-colors reveal reveal-up reveal-delay-${(i % 3) + 1}`}
                    style={{ borderColor: `${charcoal}10`, borderRight: (i + 1) % 3 !== 0 ? `1px solid ${charcoal}10` : 'none' }}>
                    <span className="text-7xl font-display font-extralight" style={{ color: `${colors.primary}20` }}>0{i + 1}</span>
                    <div>
                      <h5 className="text-xl font-bold mb-4 uppercase tracking-tight">{d.naam}</h5>
                      <p className="opacity-80 leading-relaxed">{d.beschrijving}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Over */}
          <section id="over" className="py-24 border-t" style={{ borderColor: `${charcoal}10` }}>
            <div className="grid md:grid-cols-2 gap-16">
              <div className="reveal reveal-left">
                <h4 className="text-sm font-bold uppercase tracking-[0.3em] mb-2" style={{ color: colors.primary }}>Achtergrond</h4>
                <h3 className="text-4xl font-bold tracking-tight mb-8">Over Mij</h3>
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
                </div>
              </div>
              <div className="reveal reveal-right">
                <div className="text-lg leading-relaxed opacity-80 space-y-4">
                  <p>{gen?.overMij?.intro}</p>
                  <p>{gen?.overMij?.body || content.over_mij}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="py-24 border-t" style={{ borderColor: `${charcoal}10` }}>
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div className="reveal reveal-left">
                <h4 className="text-sm font-bold uppercase tracking-[0.3em] mb-2" style={{ color: colors.primary }}>Contact</h4>
                <h3 className="text-4xl font-bold tracking-tight mb-6">{gen?.contact?.titel || 'Neem Contact Op'}</h3>
                <p className="opacity-70 text-lg leading-relaxed mb-8">{gen?.contact?.intro || 'Klaar om de mogelijkheden te bespreken?'}</p>
                <div className="space-y-4">
                  {content.contact?.email && (
                    <a href={`mailto:${content.contact.email}`} className="flex items-center gap-3 group">
                      <span className="material-symbols-outlined" style={{ color: colors.primary }}>mail</span>
                      <span className="group-hover:underline">{content.contact.email}</span>
                    </a>
                  )}
                  {content.contact?.telefoon && (
                    <a href={`tel:${content.contact.telefoon}`} className="flex items-center gap-3 group">
                      <span className="material-symbols-outlined" style={{ color: colors.primary }}>phone</span>
                      <span className="group-hover:underline">{content.contact.telefoon}</span>
                    </a>
                  )}
                </div>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg border reveal reveal-right" style={{ borderColor: `${charcoal}10` }}>
                <h4 className="text-xl font-bold mb-6">Stuur een bericht</h4>
                <ContactForm colors={colors} email={content.contact?.email} />
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="py-16 px-6 md:px-20 border-t" style={{ borderColor: `${charcoal}10` }}>
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm opacity-60">
            <p>© {new Date().getFullYear()} {content.naam}</p>
            <a href="https://jouwzorgsite.nl" style={{ color: colors.primary }}>JouwZorgSite</a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default TemplateMagazine;
