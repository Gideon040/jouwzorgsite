// components/templates/TemplateCards.tsx
// Modern, bento grid, app-like
// Voor: jonge professionals, starters

'use client';

import { useEffect } from 'react';
import { Site } from '@/types';
import { getBeroepLabel } from '@/constants';
import { getBeroepImages, getColors, ContactForm, GLOBAL_STYLES } from './shared';

interface TemplateCardsProps {
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

export function TemplateCards({ site }: TemplateCardsProps) {
  const { content, beroep, theme, generated_content } = site;
  const gen = generated_content;
  const colors = getColors(theme?.palette || 'mint');
  const images = getBeroepImages(beroep);
  
  const heroTitel = gen?.hero?.titel || `${getBeroepLabel(beroep)} ZZP'er`;
  const heroSubtitel = gen?.hero?.subtitel || 'Flexibel en professioneel beschikbaar';
  const bigCert = content.certificaten?.some((c: any) => c.type === 'big');
  const jarenErvaring = getJarenErvaring(content.werkervaring);
  const initials = content.naam?.split(' ').map((n: string) => n[0]).join('').slice(0, 2) || 'ZP';

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
    <div className="min-h-screen bg-[#f6f7f8]">
      <style jsx global>{GLOBAL_STYLES}</style>
      
      <div className="font-modern text-slate-800 bg-[#f6f7f8] min-h-screen">
        {/* Floating Navigation */}
        <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
          <nav className="flex items-center gap-1 px-2 py-2 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-slate-100">
            <a href="#diensten" className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Diensten</a>
            <a href="#over" className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Over</a>
            <a href="#contact" className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors" style={{ backgroundColor: colors.primary }}>Contact</a>
          </nav>
        </header>

        {/* Bento Grid Layout */}
        <main className="max-w-[1200px] mx-auto px-4 py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Hero Card - 8 cols */}
            <section className="md:col-span-8 bg-white rounded-xl shadow-sm border border-slate-100 p-8 md:p-12 reveal reveal-up">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold overflow-hidden" style={{ backgroundColor: colors.primary }}>
                      {content.foto ? (
                        <img src={content.foto} alt={content.naam} className="w-full h-full object-cover" />
                      ) : initials}
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold">{content.naam}</h1>
                      <p className="text-slate-500">{getBeroepLabel(beroep)}</p>
                    </div>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{heroTitel}</h2>
                  <p className="text-slate-600 text-lg leading-relaxed max-w-lg">{heroSubtitel}</p>
                </div>
                <div className="flex gap-3 mt-8">
                  <a href="#contact" className="px-6 py-3 text-white font-bold rounded-xl transition-all hover:opacity-90" style={{ backgroundColor: colors.primary }}>
                    Contact opnemen
                  </a>
                  <a href="#diensten" className="px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">
                    Bekijk diensten
                  </a>
                </div>
              </div>
            </section>

            {/* Quick Stats Card - 4 cols */}
            <section className="md:col-span-4 bg-white rounded-xl shadow-sm border border-slate-100 p-8 reveal reveal-up reveal-delay-1">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6">Quick Stats</h3>
              <div className="space-y-6">
                {jarenErvaring && (
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-2xl" style={{ color: colors.primary }}>calendar_month</span>
                    <div>
                      <p className="text-2xl font-bold">{jarenErvaring}+</p>
                      <p className="text-slate-500 text-sm">Jaar ervaring</p>
                    </div>
                  </div>
                )}
                {bigCert && (
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-2xl" style={{ color: colors.primary }}>verified</span>
                    <div>
                      <p className="text-2xl font-bold">BIG</p>
                      <p className="text-slate-500 text-sm">Geregistreerd</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-2xl" style={{ color: colors.primary }}>schedule</span>
                  <div>
                    <p className="text-2xl font-bold">Flexibel</p>
                    <p className="text-slate-500 text-sm">Beschikbaar</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Services Card - 7 cols */}
            {(gen?.diensten?.items?.length || content.diensten?.length) && (
              <section id="diensten" className="md:col-span-7 bg-white rounded-xl shadow-sm border border-slate-100 p-8 reveal reveal-up">
                <h2 className="text-2xl font-bold tracking-tight mb-8">{gen?.diensten?.titel || 'Diensten'}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(gen?.diensten?.items || content.diensten)?.slice(0, 6).map((d: any, i: number) => (
                    <div key={i} className="flex flex-col gap-3 p-4 rounded-xl border border-slate-200" style={{ backgroundColor: `${colors.primary}05` }}>
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                        <span className="material-symbols-outlined">{i === 0 ? 'favorite' : i === 1 ? 'healing' : 'clinical_notes'}</span>
                      </div>
                      <h3 className="font-bold">{d.naam}</h3>
                      <p className="text-slate-500 text-sm">{d.beschrijving}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Credentials Card - 5 cols */}
            <section className="md:col-span-5 bg-white rounded-xl shadow-sm border border-slate-100 p-8 reveal reveal-up reveal-delay-1">
              <h2 className="text-xl font-bold mb-6">Certificeringen</h2>
              <div className="flex flex-wrap gap-3">
                {bigCert && (
                  <span className="px-4 py-2.5 rounded-full text-sm font-bold border flex items-center gap-2" style={{ backgroundColor: `${colors.primary}10`, color: colors.primary, borderColor: `${colors.primary}20` }}>
                    <span className="material-symbols-outlined text-lg">verified</span> BIG Geregistreerd
                  </span>
                )}
                {content.certificaten?.slice(0, 3).map((c: any, i: number) => (
                  <span key={i} className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-full text-sm font-bold border border-slate-200 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">workspace_premium</span> {c.label}
                  </span>
                ))}
              </div>
            </section>

            {/* Over Mij Card - 12 cols */}
            <section id="over" className="md:col-span-12 bg-white rounded-xl shadow-sm border border-slate-100 p-8 reveal reveal-up">
              <h2 className="text-xl font-bold mb-6">Over Mij</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-4 text-slate-600 leading-relaxed">
                  {gen?.overMij ? (
                    <>
                      <p className="text-lg">{gen.overMij.intro}</p>
                      <p>{gen.overMij.body}</p>
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

            {/* Contact Form Card - 12 cols */}
            <section id="contact" className="md:col-span-12 bg-white rounded-xl shadow-sm border border-slate-100 p-8 reveal reveal-up">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-xl font-bold mb-4">Stuur een bericht</h2>
                  <p className="text-slate-500 mb-6">{gen?.contact?.intro || 'Vul het formulier in en ik neem zo snel mogelijk contact met u op.'}</p>
                  <ContactForm colors={colors} variant="card" email={content.contact?.email} />
                </div>
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
            <p className="text-sm text-slate-500">© {new Date().getFullYear()} {content.naam}</p>
            <a href="https://jouwzorgsite.nl" className="text-sm font-medium" style={{ color: colors.primary }}>JouwZorgSite</a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default TemplateCards;
