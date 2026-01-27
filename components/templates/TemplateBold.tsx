// components/templates/TemplateBold.tsx
// Dark mode, impactful, statement template
// Voor: IC, specialisten, ziekenhuis

'use client';

import { useEffect } from 'react';
import { Site } from '@/types';
import { getBeroepLabel } from '@/constants';
import { getBeroepImages, getColors, ContactForm, QuoteBanner, GLOBAL_STYLES } from './shared';

interface TemplateBoldProps {
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

export function TemplateBold({ site }: TemplateBoldProps) {
  const { content, beroep, theme, generated_content } = site;
  const gen = generated_content;
  const colors = getColors(theme?.palette || 'slate');
  const images = getBeroepImages(beroep);
  
  const heroTitel = gen?.hero?.titel || `Expertise in ${getBeroepLabel(beroep)}`;
  const heroSubtitel = gen?.hero?.subtitel || 'Professionele zorg op het hoogste niveau';
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
    <div className="min-h-screen">
      <style jsx global>{GLOBAL_STYLES}</style>
      
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
            <a href="#contact" className="hidden md:flex items-center justify-center px-5 h-11 rounded-full text-white text-sm font-bold" style={{ backgroundColor: colors.primary }}>
              Contact opnemen
            </a>
          </div>
        </header>

        {/* Hero */}
        <section className="relative min-h-screen flex items-center pt-20">
          <div className="absolute inset-0" style={{ backgroundImage: `url("${content.foto || images.hero}")`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(23,25,27,0.95) 0%, rgba(23,25,27,0.7) 40%, rgba(23,25,27,0.1) 100%)' }} />
          
          <div className="relative z-10 px-6 md:px-20 max-w-6xl mx-auto w-full">
            <div className="max-w-2xl">
              {bigCert && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 reveal reveal-up" style={{ backgroundColor: `${colors.primary}30` }}>
                  <span className="material-symbols-outlined text-lg" style={{ color: colors.primary }}>verified</span>
                  <span className="text-sm font-bold">BIG Geregistreerd</span>
                </div>
              )}
              <h1 className="text-5xl md:text-7xl font-black leading-[1.05] mb-6 reveal reveal-left">{heroTitel}</h1>
              <p className="text-xl text-white/70 mb-10 leading-relaxed max-w-xl reveal reveal-left">{heroSubtitel}</p>
              <a href="#contact" className="inline-flex items-center gap-2 px-8 h-14 text-white font-bold rounded-full reveal reveal-up" style={{ backgroundColor: colors.primary }}>
                {gen?.contact?.cta || 'Neem contact op'}
                <span className="material-symbols-outlined">arrow_forward</span>
              </a>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="px-6 md:px-20 py-16 border-t border-white/10">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {jarenErvaring && (
              <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 reveal reveal-up">
                <p className="text-4xl font-black" style={{ color: colors.primary }}>{jarenErvaring}+</p>
                <p className="text-white/50 text-sm mt-1">Jaar Ervaring</p>
              </div>
            )}
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 reveal reveal-up reveal-delay-1">
              <p className="text-4xl font-black" style={{ color: colors.primary }}>24/7</p>
              <p className="text-white/50 text-sm mt-1">Beschikbaar</p>
            </div>
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 reveal reveal-up reveal-delay-2">
              <p className="text-4xl font-black" style={{ color: colors.primary }}>100%</p>
              <p className="text-white/50 text-sm mt-1">Professioneel</p>
            </div>
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 reveal reveal-up reveal-delay-3">
              <p className="text-4xl font-black" style={{ color: colors.primary }}>ZZP</p>
              <p className="text-white/50 text-sm mt-1">Flexibel</p>
            </div>
          </div>
        </section>

        {/* Services */}
        {(gen?.diensten?.items?.length || content.diensten?.length) && (
          <section id="diensten" className="px-6 md:px-20 py-20">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-white text-4xl md:text-5xl font-black mb-16 reveal reveal-up">{gen?.diensten?.titel || 'Expertise'}</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {(gen?.diensten?.items || content.diensten)?.slice(0, 6).map((d: any, i: number) => (
                  <div key={i} className={`group p-8 rounded-2xl border border-white/10 bg-[#1e2124] hover:border-white/30 transition-all reveal reveal-up reveal-delay-${(i % 3) + 1}`}>
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: `${colors.primary}20` }}>
                      <span className="material-symbols-outlined text-3xl" style={{ color: colors.primary }}>
                        {i === 0 ? 'stethoscope' : i === 1 ? 'healing' : i === 2 ? 'monitor_heart' : 'clinical_notes'}
                      </span>
                    </div>
                    <h3 className="text-white text-xl font-bold mb-3">{d.naam}</h3>
                    <p className="text-white/50 text-sm">{d.beschrijving}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Quote Banner */}
        <QuoteBanner image={images.sfeer} quote={gen?.quote || "Excellentie in zorg komt voort uit passie, precisie en toewijding."} colors={colors} variant="dark" />

        {/* Over Mij */}
        <section id="over" className="px-6 md:px-20 py-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-white text-4xl md:text-5xl font-black mb-12 reveal reveal-up">Over Mij</h2>
            <div className="space-y-6 reveal reveal-up">
              {gen?.overMij ? (
                <>
                  <p className="text-2xl text-white font-medium leading-relaxed">{gen.overMij.intro}</p>
                  <p className="text-lg text-white/60 leading-relaxed">{gen.overMij.body}</p>
                </>
              ) : (
                <p className="text-lg text-white/60 leading-relaxed">{content.over_mij}</p>
              )}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="px-6 md:px-20 py-24">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            <div className="reveal reveal-left">
              <h2 className="text-white text-4xl md:text-5xl font-black mb-6">{gen?.contact?.titel || 'Klaar om samen te werken?'}</h2>
              <p className="text-white/60 text-lg mb-8">{gen?.contact?.intro || 'Neem contact op om de mogelijkheden te bespreken.'}</p>
              <div className="space-y-4">
                {content.contact?.email && (
                  <a href={`mailto:${content.contact.email}`} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-white/10">
                      <span className="material-symbols-outlined text-white">mail</span>
                    </div>
                    <span className="text-white font-semibold group-hover:underline">{content.contact.email}</span>
                  </a>
                )}
                {content.contact?.telefoon && (
                  <a href={`tel:${content.contact.telefoon}`} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-white/10">
                      <span className="material-symbols-outlined text-white">phone</span>
                    </div>
                    <span className="text-white font-semibold group-hover:underline">{content.contact.telefoon}</span>
                  </a>
                )}
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 reveal reveal-right">
              <h3 className="text-white text-xl font-bold mb-6">Stuur een bericht</h3>
              <ContactForm colors={colors} variant="dark" email={content.contact?.email} />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 md:px-20 py-12 border-t border-white/5">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-white text-lg font-bold">{content.naam}</span>
            <p className="text-white/30 text-sm">© {new Date().getFullYear()} {content.naam}. <a href="https://jouwzorgsite.nl" style={{ color: colors.primary }}>JouwZorgSite</a></p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default TemplateBold;
