// components/templates/TemplateMinimal.tsx
// Zen, rustig, veel witruimte
// Voor: GGZ, coaching, therapie

'use client';

import { useEffect } from 'react';
import { Site } from '@/types';
import { getBeroepLabel } from '@/constants';
import { getBeroepImages, getColors, ContactForm, QuoteBanner, GLOBAL_STYLES } from './shared';

interface TemplateMinimalProps {
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

export function TemplateMinimal({ site }: TemplateMinimalProps) {
  const { content, beroep, theme, generated_content } = site;
  const gen = generated_content;
  const colors = getColors(theme?.palette || 'lavender');
  const images = getBeroepImages(beroep);
  
  const heroTitel = gen?.hero?.titel || `${getBeroepLabel(beroep)} met Aandacht`;
  const heroSubtitel = gen?.hero?.subtitel || 'Rust en ruimte in professionele zorg';
  const bigCert = content.certificaten?.some((c: any) => c.type === 'big');
  const jarenErvaring = getJarenErvaring(content.werkervaring);

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
    <div className="min-h-screen bg-white">
      <style jsx global>{GLOBAL_STYLES}</style>
      
      <div className="font-body text-gray-700 bg-white min-h-screen">
        {/* Minimal header */}
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

        {/* Hero */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
          <div className="text-center max-w-2xl mx-auto">
            <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-10 reveal reveal-up ring-4 ring-gray-50">
              <img src={content.foto || images.sfeer} alt={content.naam} className="w-full h-full object-cover" />
            </div>
            <p className="text-[10px] tracking-[0.4em] uppercase mb-6 reveal reveal-up text-gray-400">{getBeroepLabel(beroep)}</p>
            <h1 className="text-3xl md:text-5xl font-light leading-relaxed mb-6 reveal reveal-up text-gray-800">{heroTitel}</h1>
            <p className="text-lg text-gray-500 mb-12 reveal reveal-up max-w-lg mx-auto">{heroSubtitel}</p>
            <a href="#contact" className="inline-block px-10 py-4 text-sm tracking-[0.15em] uppercase text-white rounded-sm hover:opacity-80 reveal reveal-up" style={{ backgroundColor: colors.primary }}>
              Contact
            </a>
          </div>
        </section>

        {/* Pull Quote */}
        <QuoteBanner image={images.sfeer} quote={gen?.quote || "In rust en aandacht ligt de ware kracht van zorg."} colors={colors} variant="minimal" />

        {/* Diensten */}
        {(gen?.diensten?.items?.length || content.diensten?.length) && (
          <section id="diensten" className="px-6 py-24 bg-gray-50/50">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-[10px] tracking-[0.4em] uppercase text-center mb-20 reveal reveal-up" style={{ color: colors.primary }}>Diensten</h2>
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

        {/* Over mij */}
        <section id="over" className="px-6 py-24">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-[10px] tracking-[0.4em] uppercase mb-12 reveal reveal-up" style={{ color: colors.primary }}>Over mij</h2>
            <div className="text-gray-600 leading-loose space-y-6 reveal reveal-up">
              {gen?.overMij ? (
                <>
                  <p className="text-lg">{gen.overMij.body}</p>
                  {gen.overMij.persoonlijk && <p className="text-gray-400 italic">{gen.overMij.persoonlijk}</p>}
                </>
              ) : (
                <p>{content.over_mij}</p>
              )}
            </div>
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

        {/* Contact */}
        <section id="contact" className="px-6 py-24 bg-gray-50/50">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-2xl font-light mb-4 reveal reveal-up text-gray-800">{gen?.contact?.titel || 'Laten we kennismaken'}</h2>
            <p className="text-gray-500 mb-10 reveal reveal-up">{gen?.contact?.intro || 'Neem gerust contact op voor een vrijblijvend gesprek.'}</p>
            <div className="text-left reveal reveal-up">
              <ContactForm colors={colors} variant="minimal" email={content.contact?.email} />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-12 border-t border-gray-100">
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
            <p>© {new Date().getFullYear()} {content.naam}</p>
            <a href="https://jouwzorgsite.nl" style={{ color: colors.primary }}>JouwZorgSite</a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default TemplateMinimal;
