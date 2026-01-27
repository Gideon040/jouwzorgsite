// components/templates/TemplateModern.tsx
// Premium modern template - Clean, professional, cyan accent
// Includes all Professional features: beschikbaar badge, ervaring, expertises, werkervaring, testimonials

import { Site, getJarenErvaring } from '@/types';
import { getBeroepLabel, getCertificaatTypeConfig } from '@/constants';

interface TemplateModernProps {
  site: Site;
}

export function TemplateModern({ site }: TemplateModernProps) {
  const { content, beroep } = site;
  
  const initials = content.naam
    ?.split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || '?';

  // Find BIG registration if exists
  const bigCert = content.certificaten?.find(c => c.type === 'big');
  
  // Calculate years of experience
  const jarenErvaring = getJarenErvaring(content.start_carriere);

  return (
    <div className="min-h-screen bg-[#f6f8f8] font-sans text-[#0d191b]">
      
      {/* ============ HEADER ============ */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#e7f1f3]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-10 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 text-[#13c8ec]">
            <div className="size-8">
              <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"></path>
              </svg>
            </div>
            <h2 className="text-[#0d191b] text-xl font-extrabold leading-tight tracking-tight">{content.naam?.split(' ')[0] || 'ZZP Zorg'}</h2>
          </div>
          
          <nav className="hidden md:flex items-center gap-9">
            {content.over_mij && <a className="text-[#0d191b] text-sm font-semibold hover:text-[#13c8ec] transition-colors" href="#over">Over mij</a>}
            {content.diensten?.length > 0 && <a className="text-[#0d191b] text-sm font-semibold hover:text-[#13c8ec] transition-colors" href="#diensten">Diensten</a>}
            {content.werkervaring && content.werkervaring.length > 0 && <a className="text-[#0d191b] text-sm font-semibold hover:text-[#13c8ec] transition-colors" href="#ervaring">Ervaring</a>}
            {content.certificaten?.length > 0 && <a className="text-[#0d191b] text-sm font-semibold hover:text-[#13c8ec] transition-colors" href="#certificaten">Certificaten</a>}
            <a className="text-[#0d191b] text-sm font-semibold hover:text-[#13c8ec] transition-colors" href="#contact">Contact</a>
          </nav>
          
          <a 
            href="#contact"
            className="flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#13c8ec] text-white text-sm font-bold shadow-lg shadow-[#13c8ec]/20 hover:scale-105 transition-transform"
          >
            <span className="truncate">Direct Contact</span>
          </a>
        </div>
      </header>

      <main className="flex-1">
        
        {/* ============ HERO ============ */}
        <section className="max-w-[1200px] mx-auto px-4 py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Text Content */}
            <div className="flex flex-col gap-8 order-2 md:order-1">
              <div className="flex flex-col gap-4">
                {/* Beschikbaar Badge */}
                {content.beschikbaar && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider w-fit">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    Beschikbaar voor opdrachten
                  </span>
                )}
                
                <span className="text-[#13c8ec] font-bold tracking-widest uppercase text-xs">
                  {getBeroepLabel(beroep)}
                </span>
                <h1 className="text-[#0d191b] text-4xl lg:text-6xl font-black leading-[1.1] tracking-[-0.03em]">
                  {content.tagline?.split(' ').slice(0, 3).join(' ')} <span className="text-[#13c8ec]">{content.tagline?.split(' ').slice(3).join(' ') || 'met zorg'}</span>
                </h1>
                <p className="text-[#4c8d9a] text-lg md:text-xl font-medium leading-relaxed max-w-[500px]">
                  {content.over_mij?.split('\n')[0]?.slice(0, 150) || content.tagline}
                  {content.over_mij && content.over_mij.length > 150 ? '...' : ''}
                </p>
              </div>
              
              {/* Stats badges */}
              <div className="flex flex-wrap gap-3">
                {jarenErvaring && (
                  <div className="flex items-center gap-2 bg-white border border-[#13c8ec]/20 px-4 py-2 rounded-lg">
                    <span className="material-symbols-outlined text-[#13c8ec]">history_edu</span>
                    <span className="text-sm font-semibold">{jarenErvaring} jaar ervaring</span>
                  </div>
                )}
                {bigCert && (
                  <div className="flex items-center gap-2 bg-white border border-[#13c8ec]/20 px-4 py-2 rounded-lg">
                    <span className="material-symbols-outlined text-[#13c8ec]">verified_user</span>
                    <span className="text-sm font-semibold">BIG Geregistreerd</span>
                  </div>
                )}
                {content.contact?.werkgebied && content.contact.werkgebied.length > 0 && (
                  <div className="flex items-center gap-2 bg-white border border-[#13c8ec]/20 px-4 py-2 rounded-lg">
                    <span className="material-symbols-outlined text-[#13c8ec]">location_on</span>
                    <span className="text-sm font-semibold">Regio {content.contact.werkgebied[0]}</span>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#contact"
                  className="flex min-w-[200px] cursor-pointer items-center justify-center rounded-xl h-14 px-6 bg-[#13c8ec] text-white text-base font-bold shadow-xl shadow-[#13c8ec]/30 hover:opacity-90 transition-all"
                >
                  Vrijblijvend Kennismaken
                </a>
                <a 
                  href="#diensten"
                  className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-xl h-14 px-6 border-2 border-[#13c8ec] text-[#13c8ec] text-base font-bold hover:bg-[#13c8ec]/5 transition-all"
                >
                  Mijn Diensten
                </a>
              </div>
            </div>
            
            {/* Photo */}
            <div className="relative order-1 md:order-2">
              {content.foto ? (
                <div 
                  className="w-full aspect-square bg-center bg-no-repeat bg-cover rounded-3xl shadow-2xl relative z-10"
                  style={{ backgroundImage: `url("${content.foto}")` }}
                />
              ) : (
                <div className="w-full aspect-square bg-gradient-to-br from-[#13c8ec] to-[#0891b2] rounded-3xl shadow-2xl relative z-10 flex items-center justify-center">
                  <span className="text-8xl font-bold text-white/80">{initials}</span>
                </div>
              )}
              
              {/* BIG Badge Floating Card */}
              {bigCert && (
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl z-20 border border-[#e7f1f3]">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#13c8ec]/10 rounded-full text-[#13c8ec]">
                      <span className="material-symbols-outlined text-3xl">verified</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase">Geregistreerd</p>
                      <p className="text-lg font-extrabold text-[#0d191b]">BIG Professional</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ============ DIENSTEN / SPECIALISATIES ============ */}
        {content.diensten && content.diensten.length > 0 && (
          <section id="diensten" className="bg-white py-20">
            <div className="max-w-[1200px] mx-auto px-4">
              <div className="flex flex-col items-center text-center mb-16">
                <h2 className="text-[#0d191b] text-3xl md:text-4xl font-bold mb-4 tracking-tight">Mijn Specialisaties</h2>
                <div className="w-20 h-1.5 bg-[#13c8ec] rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {content.diensten.slice(0, 8).map((dienst, index) => (
                  <div 
                    key={index}
                    className="group flex flex-col gap-4 rounded-2xl border border-[#cfe3e7] bg-[#f6f8f8] p-8 hover:shadow-2xl hover:shadow-[#13c8ec]/10 transition-all duration-300"
                  >
                    <div className="size-14 rounded-xl bg-[#13c8ec]/10 flex items-center justify-center text-[#13c8ec] group-hover:bg-[#13c8ec] group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-3xl">{dienst.icon || 'medical_services'}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-[#0d191b] text-xl font-bold leading-tight">{dienst.naam}</h3>
                      {dienst.beschrijving && (
                        <p className="text-[#4c8d9a] text-sm leading-relaxed">{dienst.beschrijving}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============ OVER MIJ / WAAROM KIEZEN ============ */}
        {content.over_mij && (
          <section id="over" className="max-w-[1200px] mx-auto px-4 py-20">
            <div className="flex flex-col lg:flex-row gap-16 items-start">
              
              {/* Text Side */}
              <div className="w-full lg:w-1/2 flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <h2 className="text-[#0d191b] text-4xl font-extrabold leading-tight tracking-tight">
                    Waarom voor mij kiezen?
                  </h2>
                  <div className="prose text-[#4c8d9a] text-lg leading-relaxed">
                    {content.over_mij.split('\n').filter(p => p.trim()).map((paragraph, index) => (
                      <p key={index} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                </div>
                
                {/* Feature List */}
                <div className="space-y-4">
                  <div className="flex gap-4 items-start p-4 rounded-xl hover:bg-white transition-colors">
                    <div className="p-2 bg-[#13c8ec]/20 text-[#13c8ec] rounded-lg">
                      <span className="material-symbols-outlined">schedule</span>
                    </div>
                    <div>
                      <p className="text-[#0d191b] font-bold">Flexibel inzetbaar</p>
                      <p className="text-[#4c8d9a] text-sm">Direct beschikbaar voor zowel ad-hoc diensten als langdurige trajecten.</p>
                    </div>
                  </div>
                  
                  {bigCert && (
                    <div className="flex gap-4 items-start p-4 rounded-xl hover:bg-white transition-colors">
                      <div className="p-2 bg-[#13c8ec]/20 text-[#13c8ec] rounded-lg">
                        <span className="material-symbols-outlined">shield</span>
                      </div>
                      <div>
                        <p className="text-[#0d191b] font-bold">Gediplomeerd & BIG-geregistreerd</p>
                        <p className="text-[#4c8d9a] text-sm">Voldoet aan alle wettelijke kwaliteitseisen en bijscholing.</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-4 items-start p-4 rounded-xl hover:bg-white transition-colors">
                    <div className="p-2 bg-[#13c8ec]/20 text-[#13c8ec] rounded-lg">
                      <span className="material-symbols-outlined">diversity_3</span>
                    </div>
                    <div>
                      <p className="text-[#0d191b] font-bold">Persoonlijke aandacht</p>
                      <p className="text-[#4c8d9a] text-sm">Eén vast gezicht, korte lijntjes en oprechte betrokkenheid.</p>
                    </div>
                  </div>
                </div>

                {/* Expertises Tags */}
                {content.expertises && content.expertises.length > 0 && (
                  <div className="bg-[#13c8ec]/5 rounded-xl p-6 border border-[#13c8ec]/10">
                    <h3 className="text-lg font-bold mb-4">Mijn Expertises</h3>
                    <div className="flex flex-wrap gap-2">
                      {content.expertises.map((expertise, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1.5 bg-white rounded text-sm font-medium shadow-sm border border-[#13c8ec]/10"
                        >
                          {expertise}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Image Grid Side */}
              <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
                {content.foto ? (
                  <>
                    <div 
                      className="w-full aspect-[4/5] bg-cover bg-center rounded-3xl"
                      style={{ backgroundImage: `url("${content.foto}")` }}
                    />
                    <div className="w-full aspect-[4/5] bg-gradient-to-br from-[#13c8ec]/20 to-[#0891b2]/20 rounded-3xl mt-12 flex items-center justify-center">
                      <div className="text-center p-6">
                        <span className="material-symbols-outlined text-6xl text-[#13c8ec]/40">favorite</span>
                        <p className="text-[#13c8ec] font-bold mt-2">Zorg met hart</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-full aspect-[4/5] bg-gradient-to-br from-[#13c8ec] to-[#0891b2] rounded-3xl flex items-center justify-center">
                      <span className="text-6xl font-bold text-white/80">{initials}</span>
                    </div>
                    <div className="w-full aspect-[4/5] bg-gradient-to-br from-[#13c8ec]/20 to-[#0891b2]/20 rounded-3xl mt-12 flex items-center justify-center">
                      <span className="material-symbols-outlined text-6xl text-[#13c8ec]/40">favorite</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ============ WERKERVARING TIMELINE ============ */}
        {content.werkervaring && content.werkervaring.length > 0 && (
          <section id="ervaring" className="bg-white py-20">
            <div className="max-w-[1200px] mx-auto px-4">
              <div className="flex flex-col items-center text-center mb-12">
                <h2 className="text-[#0d191b] text-3xl md:text-4xl font-bold mb-4 tracking-tight flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#13c8ec]">timeline</span>
                  Werkervaring
                </h2>
                <div className="w-20 h-1.5 bg-[#13c8ec] rounded-full"></div>
              </div>
              
              <div className="max-w-3xl mx-auto">
                <div className="relative border-l-2 border-[#13c8ec]/20 ml-4 md:ml-6 flex flex-col gap-10">
                  {content.werkervaring.map((item, index) => (
                    <div key={index} className="relative pl-8">
                      {/* Timeline dot */}
                      <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 border-white ${
                        !item.eind_jaar ? 'bg-[#13c8ec]' : 'bg-[#13c8ec]/40'
                      }`} />
                      
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                        <h3 className="text-lg font-bold text-[#0d191b]">{item.functie}</h3>
                        <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                          !item.eind_jaar 
                            ? 'bg-[#13c8ec]/10 text-[#13c8ec]' 
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {item.start_jaar} - {item.eind_jaar || 'Heden'}
                        </span>
                      </div>
                      <p className="text-md font-semibold text-[#4c8d9a]">{item.werkgever}</p>
                      {item.beschrijving && (
                        <p className="text-sm text-[#4c8d9a] mt-2 leading-relaxed max-w-3xl">
                          {item.beschrijving}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ============ TESTIMONIALS ============ */}
        {content.testimonials && content.testimonials.length > 0 && (
          <section className="bg-[#13c8ec]/5 py-20">
            <div className="max-w-[1200px] mx-auto px-4">
              <div className="flex flex-col items-center text-center mb-12">
                <h2 className="text-[#0d191b] text-3xl font-bold">Wat cliënten zeggen</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {content.testimonials.slice(0, 3).map((testimonial, index) => {
                  const reviewInitials = testimonial.naam
                    .split(' ')
                    .map(n => n[0])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase();
                    
                  return (
                    <div 
                      key={index}
                      className="bg-white p-8 rounded-2xl shadow-sm border border-[#e7f1f3] italic text-[#4c8d9a]"
                    >
                      &ldquo;{testimonial.tekst}&rdquo;
                      <div className="not-italic mt-6 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#13c8ec]/20 flex items-center justify-center font-bold text-[#13c8ec]">
                          {reviewInitials}
                        </div>
                        <div>
                          <p className="text-[#0d191b] font-bold text-sm">{testimonial.naam}</p>
                          {testimonial.relatie && (
                            <p className="text-xs text-[#13c8ec] font-medium">{testimonial.relatie}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ============ CERTIFICATEN ============ */}
        {content.certificaten && content.certificaten.length > 0 && (
          <section id="certificaten" className="bg-white py-20">
            <div className="max-w-[1200px] mx-auto px-4">
              <div className="flex flex-col items-center text-center mb-12">
                <h2 className="text-[#0d191b] text-3xl md:text-4xl font-bold mb-4 tracking-tight">Certificaten & Registraties</h2>
                <div className="w-20 h-1.5 bg-[#13c8ec] rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* BIG Number Card - Highlighted */}
                {bigCert && (
                  <div className="md:col-span-1 bg-[#f6f8f8] p-6 rounded-xl border-l-4 border-[#13c8ec]">
                    <p className="text-sm font-medium text-[#4c8d9a] uppercase tracking-wider mb-2">BIG-Registratie</p>
                    <p className="text-3xl font-bold tracking-tight text-[#0d191b]">{bigCert.value || '•••••••••••'}</p>
                    <p className="text-xs text-[#4c8d9a] mt-2 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[#13c8ec] text-sm">verified</span>
                      Geverifieerd & Actueel
                    </p>
                  </div>
                )}
                
                {/* Other Certificates */}
                <div className={`${bigCert ? 'md:col-span-2' : 'md:col-span-3'} grid grid-cols-2 sm:grid-cols-3 gap-4`}>
                  {content.certificaten.filter(c => c.type !== 'big').map((cert, index) => {
                    const config = getCertificaatTypeConfig(cert.type);
                    return (
                      <div 
                        key={index}
                        className="flex flex-col items-center gap-2 p-4 bg-[#f6f8f8] rounded-xl hover:shadow-lg transition-all text-center"
                      >
                        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                          <span className="material-symbols-outlined text-[#13c8ec]">{config?.icon || 'verified'}</span>
                        </div>
                        <span className="text-sm font-bold text-[#0d191b]">{cert.label}</span>
                        {cert.value && (
                          <span className="text-xs text-[#4c8d9a]">{cert.value}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ============ CONTACT ============ */}
        <section id="contact" className="max-w-[1200px] mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Info */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#cfe3e7]">
              <h2 className="text-[#0d191b] text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#13c8ec]">contact_support</span>
                Neem contact op
              </h2>
              
              <div className="space-y-4 mb-8">
                {content.contact?.email && (
                  <a 
                    href={`mailto:${content.contact.email}`}
                    className="flex items-center gap-4 p-4 rounded-lg bg-[#f6f8f8] border border-transparent hover:border-[#13c8ec]/30 transition-all"
                  >
                    <span className="material-symbols-outlined text-[#13c8ec] size-10 flex items-center justify-center bg-[#13c8ec]/10 rounded-full">mail</span>
                    <div>
                      <p className="text-[#4c8d9a] text-xs font-semibold uppercase tracking-wider">Email</p>
                      <p className="text-[#0d191b] font-medium">{content.contact.email}</p>
                    </div>
                  </a>
                )}
                
                {content.contact?.telefoon && (
                  <a 
                    href={`tel:${content.contact.telefoon}`}
                    className="flex items-center gap-4 p-4 rounded-lg bg-[#f6f8f8] border border-transparent hover:border-[#13c8ec]/30 transition-all"
                  >
                    <span className="material-symbols-outlined text-[#13c8ec] size-10 flex items-center justify-center bg-[#13c8ec]/10 rounded-full">call</span>
                    <div>
                      <p className="text-[#4c8d9a] text-xs font-semibold uppercase tracking-wider">Telefoon</p>
                      <p className="text-[#0d191b] font-medium">{content.contact.telefoon}</p>
                    </div>
                  </a>
                )}
                
                {content.contact?.werkgebied && content.contact.werkgebied.length > 0 && (
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-[#f6f8f8]">
                    <span className="material-symbols-outlined text-[#13c8ec] size-10 flex items-center justify-center bg-[#13c8ec]/10 rounded-full">location_on</span>
                    <div>
                      <p className="text-[#4c8d9a] text-xs font-semibold uppercase tracking-wider">Werkgebied</p>
                      <p className="text-[#0d191b] font-medium">{content.contact.werkgebied.join(', ')}</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* WhatsApp CTA */}
              {content.contact?.telefoon && (
                <a
                  href={`https://wa.me/${content.contact.telefoon.replace(/[^0-9]/g, '').replace(/^0/, '31')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] text-white font-bold py-4 rounded-lg hover:bg-[#20bd5a] transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Bericht
                </a>
              )}
            </div>
            
            {/* CTA Card */}
            <div className="bg-[#0d191b] rounded-2xl p-8 text-white flex flex-col justify-between items-start gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="material-symbols-outlined text-[100px]">mail</span>
              </div>
              <div className="relative">
                <h3 className="text-2xl font-bold mb-2">Samenwerken?</h3>
                <p className="text-slate-300 leading-relaxed">
                  Bent u op zoek naar een ervaren {getBeroepLabel(beroep).toLowerCase()} voor uw afdeling of cliënt? Laten we kennismaken.
                </p>
              </div>
              
              <div className="relative w-full space-y-4">
                <a 
                  href={`mailto:${content.contact?.email}?subject=Contact via website`}
                  className="w-full bg-[#13c8ec] text-white px-8 py-4 rounded-lg font-bold hover:brightness-105 transition-all flex items-center justify-center gap-2"
                >
                  Direct Contact Opnemen
                  <span className="material-symbols-outlined">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ============ FOOTER ============ */}
      <footer className="bg-white border-t border-[#e7f1f3] pt-16 pb-8">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 text-[#13c8ec] mb-6">
                <div className="size-6">
                  <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"></path>
                  </svg>
                </div>
                <h2 className="text-[#0d191b] text-lg font-extrabold">{content.naam}</h2>
              </div>
              <p className="text-[#4c8d9a] text-sm leading-relaxed mb-6 max-w-md">
                {getBeroepLabel(beroep)} met aandacht, professionaliteit en een persoonlijke benadering. 
                {content.contact?.werkgebied && content.contact.werkgebied.length > 0 && (
                  <> Werkzaam in regio {content.contact.werkgebied[0]}.</>
                )}
              </p>
              <div className="flex gap-4">
                {content.contact?.email && (
                  <a className="text-[#13c8ec] hover:opacity-70" href={`mailto:${content.contact.email}`}>
                    <span className="material-symbols-outlined">mail</span>
                  </a>
                )}
                {content.contact?.telefoon && (
                  <a className="text-[#13c8ec] hover:opacity-70" href={`tel:${content.contact.telefoon}`}>
                    <span className="material-symbols-outlined">call</span>
                  </a>
                )}
                {content.socials?.linkedin && (
                  <a className="text-[#13c8ec] hover:opacity-70" href={content.socials.linkedin} target="_blank" rel="noopener noreferrer">
                    <span className="material-symbols-outlined">share</span>
                  </a>
                )}
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-[#0d191b] font-bold mb-6">Snelmenu</h4>
              <ul className="space-y-4 text-sm text-[#4c8d9a]">
                <li><a className="hover:text-[#13c8ec] transition-colors" href="#over">Over mij</a></li>
                <li><a className="hover:text-[#13c8ec] transition-colors" href="#diensten">Diensten</a></li>
                {content.werkervaring && content.werkervaring.length > 0 && (
                  <li><a className="hover:text-[#13c8ec] transition-colors" href="#ervaring">Ervaring</a></li>
                )}
                <li><a className="hover:text-[#13c8ec] transition-colors" href="#certificaten">Certificaten</a></li>
                <li><a className="hover:text-[#13c8ec] transition-colors" href="#contact">Contact</a></li>
              </ul>
            </div>
            
            {/* Contact Details */}
            <div>
              <h4 className="text-[#0d191b] font-bold mb-6">Gegevens</h4>
              <ul className="space-y-4 text-sm text-[#4c8d9a]">
                {content.contact?.werkgebied && content.contact.werkgebied.length > 0 && (
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">pin_drop</span>
                    {content.contact.werkgebied[0]}, Nederland
                  </li>
                )}
                {content.contact?.telefoon && (
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">call</span>
                    {content.contact.telefoon}
                  </li>
                )}
                {bigCert && (
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">badge</span>
                    BIG: {bigCert.value || '•••••••••••'}
                  </li>
                )}
                {content.zakelijk?.kvk && (
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">history_edu</span>
                    KVK: {content.zakelijk.kvk}
                  </li>
                )}
              </ul>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-[#e7f1f3] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#4c8d9a] font-medium">
            <p>© {new Date().getFullYear()} {content.naam}. Alle rechten voorbehouden.</p>
            <p className="flex items-center gap-1">
              Gemaakt met <span className="text-[#13c8ec]">♥</span> door{' '}
              <a href="https://jouwzorgsite.nl" className="text-[#13c8ec] hover:underline">
                JouwZorgSite
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
