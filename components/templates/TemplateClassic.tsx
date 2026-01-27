// components/templates/TemplateClassic.tsx
// Warm, elegant, tijdloos template
// Voor: thuiszorg, ouderenzorg, persoonlijke zorg

'use client';

import { useEffect } from 'react';
import { Site } from '@/types';
import { getBeroepLabel } from '@/constants';
import { getBeroepImages, getColors, ContactForm, GLOBAL_STYLES } from './shared';

interface TemplateClassicProps {
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

export function TemplateClassic({ site }: TemplateClassicProps) {
  const { content, beroep, theme, generated_content } = site;
  const gen = generated_content;
  const colors = getColors(theme?.palette || 'sage');
  const images = getBeroepImages(beroep);
  
  // Hero content
  const heroTitel = gen?.hero?.titel || `Zorg met Aandacht`;
  const heroSubtitel = gen?.hero?.subtitel || gen?.overMij?.intro || 'Professionele zorg in een vertrouwde omgeving';
  
  // Credentials
  const bigCert = content.certificaten?.some((c: any) => c.type === 'big');
  const jarenErvaring = getJarenErvaring(content.werkervaring);
  
  // Cream/warm background colors
  const bgCream = '#fcf9f5';
  const bgWarm = '#f4f2f0';

  // Scroll reveal
  useEffect(() => {
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
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <style jsx global>{GLOBAL_STYLES}</style>
      
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
                    {heroSubtitel}
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

        {/* About Section */}
        <section id="over" className="py-24 px-4 md:px-20" style={{ backgroundColor: bgWarm }}>
          <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-col lg:flex-row gap-16 items-start">
              {/* Photo */}
              <div className="w-full lg:w-1/3 reveal reveal-left">
                <div 
                  className="aspect-[3/4] rounded-xl bg-center bg-cover shadow-xl"
                  style={{ backgroundImage: `url("${images.sfeer}")` }}
                />
              </div>
              
              {/* Content */}
              <div className="flex-1 reveal reveal-right">
                <h2 className="text-4xl font-bold font-display mb-6">Over Mij</h2>
                <div className="text-[#181411]/70 text-lg leading-relaxed space-y-4">
                  {gen?.overMij ? (
                    <>
                      <p className="text-xl text-[#181411]">{gen.overMij.intro}</p>
                      <p>{gen.overMij.body}</p>
                      {gen.overMij.persoonlijk && (
                        <p className="italic border-l-4 pl-4" style={{ borderColor: colors.primary }}>{gen.overMij.persoonlijk}</p>
                      )}
                    </>
                  ) : (
                    <p>{content.over_mij}</p>
                  )}
                </div>
                
                {/* Credentials */}
                <div className="mt-8 flex flex-wrap gap-4">
                  {bigCert && (
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: `${colors.primary}15` }}>
                      <span className="material-symbols-outlined" style={{ color: colors.primary }}>verified</span>
                      <span className="font-semibold text-sm">BIG Geregistreerd</span>
                    </div>
                  )}
                  {jarenErvaring && (
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: `${colors.primary}15` }}>
                      <span className="material-symbols-outlined" style={{ color: colors.primary }}>workspace_premium</span>
                      <span className="font-semibold text-sm">{jarenErvaring}+ Jaar Ervaring</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        {(gen?.diensten?.items?.length || content.diensten?.length) && (
          <section id="diensten" className="py-24 px-4 md:px-20" style={{ backgroundColor: bgCream }}>
            <div className="max-w-[1200px] mx-auto">
              <div className="text-center mb-16 reveal reveal-up">
                <h2 className="text-4xl font-bold font-display mb-4">{gen?.diensten?.titel || 'Mijn Diensten'}</h2>
                <p className="text-[#181411]/60 max-w-2xl mx-auto">Professionele zorg afgestemd op uw persoonlijke situatie</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {(gen?.diensten?.items || content.diensten)?.slice(0, 4).map((d: any, i: number) => (
                  <div 
                    key={i} 
                    className={`group bg-white border p-8 rounded-xl shadow-sm hover:shadow-xl transition-all reveal reveal-up reveal-delay-${(i % 3) + 1}`}
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
            </div>
          </section>
        )}

        {/* Quote Banner */}
        <section className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-fixed bg-center bg-cover scale-110"
            style={{ backgroundImage: `url("${images.sfeer}")` }}
          />
          <div className="absolute inset-0 bg-[#181411]/60 backdrop-blur-[2px]" />
          <div className="relative z-10 text-center px-4 max-w-4xl reveal reveal-up">
            <span className="material-symbols-outlined text-6xl mb-6 block" style={{ color: colors.primary }}>format_quote</span>
            <h2 className="text-white text-4xl md:text-5xl font-display italic leading-tight">
              "{gen?.quote || 'Zorgen voor wie ooit voor ons zorgde is een van de hoogste eerbetonen.'}"
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

        {/* Contact Section */}
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
    </div>
  );
}

export default TemplateClassic;
