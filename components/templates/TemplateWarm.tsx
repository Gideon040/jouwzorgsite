// components/templates/TemplateWarm.tsx
// Premium warm template - Soft, inviting, trustworthy

import { Site } from '@/types';
import { getBeroepLabel, getCertificaatTypeConfig } from '@/constants';

interface TemplateWarmProps {
  site: Site;
}

export function TemplateWarm({ site }: TemplateWarmProps) {
  const { content, beroep } = site;
  
  const initials = content.naam
    ?.split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || '?';

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-amber-50/30 to-white font-sans">
      
      {/* ============ HEADER ============ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-orange-100/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            {content.foto ? (
              <img src={content.foto} alt="" className="w-10 h-10 rounded-full object-cover border-2 border-orange-200" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-rose-400 flex items-center justify-center text-white font-bold text-sm">
                {initials}
              </div>
            )}
            <span className="font-bold text-slate-800 hidden sm:block">{content.naam}</span>
          </a>
          
          <nav className="hidden md:flex items-center gap-8">
            {content.over_mij && <a href="#over" className="text-sm font-medium text-slate-600 hover:text-orange-600 transition-colors">Over mij</a>}
            {content.diensten?.length > 0 && <a href="#diensten" className="text-sm font-medium text-slate-600 hover:text-orange-600 transition-colors">Diensten</a>}
            {content.certificaten?.length > 0 && <a href="#kwalificaties" className="text-sm font-medium text-slate-600 hover:text-orange-600 transition-colors">Kwalificaties</a>}
          </nav>
          
          <a 
            href="#contact" 
            className="bg-gradient-to-r from-orange-500 to-rose-500 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:shadow-lg hover:shadow-orange-500/25 transition-all hover:-translate-y-0.5"
          >
            Contact
          </a>
        </div>
      </header>

      {/* ============ HERO ============ */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6 overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gradient-to-br from-orange-200/40 to-rose-200/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-amber-200/50 to-orange-200/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />
        
        <div className="relative max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Photo Section */}
            <div className="relative flex-shrink-0">
              {/* Background shapes */}
              <div className="absolute -inset-4 bg-gradient-to-br from-orange-200 to-rose-200 rounded-[2.5rem] rotate-6 opacity-60" />
              <div className="absolute -inset-4 bg-gradient-to-tr from-amber-200 to-orange-200 rounded-[2.5rem] -rotate-3 opacity-40" />
              
              {content.foto ? (
                <img
                  src={content.foto}
                  alt={content.naam}
                  className="relative w-64 h-64 md:w-80 md:h-80 rounded-[2rem] object-cover shadow-2xl shadow-orange-900/20 border-4 border-white"
                />
              ) : (
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-[2rem] bg-gradient-to-br from-orange-400 via-rose-400 to-amber-400 flex items-center justify-center shadow-2xl shadow-orange-900/20 border-4 border-white">
                  <span className="text-6xl md:text-7xl font-bold text-white/90">{initials}</span>
                </div>
              )}
              
              {/* Verified floating badge */}
              <div className="absolute -bottom-3 -right-3 bg-white rounded-2xl px-4 py-3 shadow-xl shadow-slate-900/10 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="material-symbols-outlined text-emerald-600 text-lg">verified</span>
                </div>
                <span className="text-sm font-semibold text-slate-700">Gecertificeerd</span>
              </div>
            </div>

            {/* Content Section */}
            <div className="text-center lg:text-left flex-1 max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100/80 backdrop-blur text-orange-700 text-sm font-semibold mb-6">
                <span className="material-symbols-outlined text-lg">medical_services</span>
                {getBeroepLabel(beroep)}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-[1.1]">
                {content.naam}
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-600 mb-10 leading-relaxed">
                {content.tagline}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <a
                  href="#contact"
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold text-lg shadow-xl shadow-orange-500/25 hover:shadow-2xl hover:shadow-orange-500/30 transition-all hover:-translate-y-1"
                >
                  <span>Neem contact op</span>
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </a>
                <a
                  href="#diensten"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-slate-700 font-bold text-lg border-2 border-slate-200 hover:border-orange-300 hover:text-orange-600 transition-all"
                >
                  <span className="material-symbols-outlined">favorite</span>
                  Bekijk diensten
                </a>
              </div>
            </div>
          </div>
          
          {/* Stats */}
          {(content.certificaten?.length > 0 || content.diensten?.length > 0) && (
            <div className="mt-20 flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {content.certificaten?.length > 0 && (
                <div className="text-center">
                  <div className="text-4xl font-extrabold text-orange-500">{content.certificaten.length}</div>
                  <div className="text-sm text-slate-500 font-medium">Certificaten</div>
                </div>
              )}
              {content.diensten?.length > 0 && (
                <div className="text-center">
                  <div className="text-4xl font-extrabold text-orange-500">{content.diensten.length}</div>
                  <div className="text-sm text-slate-500 font-medium">Diensten</div>
                </div>
              )}
              {content.contact?.werkgebied?.length > 0 && (
                <div className="text-center">
                  <div className="text-4xl font-extrabold text-orange-500">{content.contact.werkgebied.length}</div>
                  <div className="text-sm text-slate-500 font-medium">Regio's</div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      {content.over_mij && (
        <section id="over" className="py-20 md:py-28 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold">
                <span className="material-symbols-outlined text-lg">person</span>
                Over mij
              </span>
            </div>
            
            <div className="relative">
              {/* Decorative quote mark */}
              <div className="absolute -top-8 -left-4 text-9xl font-serif text-orange-200/50 select-none">"</div>
              
              <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-orange-900/5 border border-orange-100">
                <div className="space-y-6">
                  {content.over_mij.split('\n').filter(p => p.trim()).map((paragraph, index) => (
                    <p key={index} className="text-lg text-slate-600 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============ SERVICES ============ */}
      {content.diensten && content.diensten.length > 0 && (
        <section id="diensten" className="py-20 md:py-28 px-6 bg-gradient-to-b from-white to-orange-50/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold mb-4">
                <span className="material-symbols-outlined text-lg">favorite</span>
                Diensten
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                Hoe ik u kan helpen
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                Persoonlijke zorg afgestemd op uw wensen en behoeften
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.diensten.map((dienst, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl p-8 border border-orange-100 hover:border-orange-200 shadow-sm hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-rose-400 flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-2xl text-white">
                      {dienst.icon || 'favorite'}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{dienst.naam}</h3>
                  
                  {dienst.beschrijving && (
                    <p className="text-slate-500 leading-relaxed">{dienst.beschrijving}</p>
                  )}
                  
                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-6 right-6 h-1 bg-gradient-to-r from-orange-400 to-rose-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ CERTIFICATES ============ */}
      {content.certificaten && content.certificaten.length > 0 && (
        <section id="kwalificaties" className="py-20 md:py-28 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-4">
                <span className="material-symbols-outlined text-lg">verified</span>
                Kwalificaties
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                Certificaten & Registraties
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                Mijn registraties en diploma's die garanderen dat u verzekerd bent van professionele zorg
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.certificaten.map((cert, index) => {
                const config = getCertificaatTypeConfig(cert.type);
                const isOfficial = cert.type === 'big' || cert.type === 'agb';
                
                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 bg-white rounded-2xl p-6 border border-slate-100 hover:border-orange-200 shadow-sm hover:shadow-lg transition-all"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isOfficial 
                        ? 'bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/20' 
                        : 'bg-gradient-to-br from-orange-400 to-rose-400 shadow-lg shadow-orange-500/20'
                    }`}>
                      <span className="material-symbols-outlined text-white text-xl">
                        {config?.icon || 'verified'}
                      </span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-slate-900">{cert.label}</h3>
                        {isOfficial && (
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold whitespace-nowrap">
                            <span className="material-symbols-outlined text-sm">verified</span>
                            Geverifieerd
                          </span>
                        )}
                      </div>
                      
                      <p className="text-sm text-slate-500 mt-1">
                        {cert.sublabel && <span>{cert.sublabel}</span>}
                        {cert.sublabel && cert.value && <span> • </span>}
                        {cert.value && <span className="font-medium text-slate-700">{cert.value}</span>}
                      </p>
                      
                      {cert.expires_at && (
                        <p className={`text-xs mt-2 flex items-center gap-1 ${
                          new Date(cert.expires_at) < new Date() ? 'text-red-500' : 'text-emerald-600'
                        }`}>
                          <span className="material-symbols-outlined text-sm">
                            {new Date(cert.expires_at) < new Date() ? 'warning' : 'check_circle'}
                          </span>
                          {new Date(cert.expires_at) < new Date() 
                            ? 'Verlopen' 
                            : `Geldig t/m ${new Date(cert.expires_at).toLocaleDateString('nl-NL')}`
                          }
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ============ CONTACT ============ */}
      <section id="contact" className="py-20 md:py-28 px-6 bg-gradient-to-b from-orange-50 to-orange-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-200 text-orange-800 text-sm font-semibold mb-4">
              <span className="material-symbols-outlined text-lg">mail</span>
              Contact
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
              Neem contact op
            </h2>
            <p className="text-lg text-slate-600">
              Heeft u vragen of wilt u een afspraak maken? Ik help u graag verder.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-orange-900/10 border border-orange-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              
              {/* Contact Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Contactgegevens</h3>
                
                <a
                  href={`mailto:${content.contact?.email}`}
                  className="flex items-center gap-4 p-4 rounded-2xl hover:bg-orange-50 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                    <span className="material-symbols-outlined text-xl text-orange-600">mail</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">E-mail</p>
                    <p className="text-slate-900 font-semibold">{content.contact?.email}</p>
                  </div>
                </a>

                {content.contact?.telefoon && (
                  <a
                    href={`tel:${content.contact.telefoon.replace(/[^+\d]/g, '')}`}
                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-orange-50 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                      <span className="material-symbols-outlined text-xl text-orange-600">call</span>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Telefoon</p>
                      <p className="text-slate-900 font-semibold">{content.contact.telefoon}</p>
                    </div>
                  </a>
                )}

                {content.contact?.werkgebied && content.contact.werkgebied.length > 0 && (
                  <div className="flex items-center gap-4 p-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                      <span className="material-symbols-outlined text-xl text-orange-600">location_on</span>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Werkgebied</p>
                      <p className="text-slate-900 font-semibold">{content.contact.werkgebied.join(', ')}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* CTA Side */}
              <div className="flex flex-col justify-center p-8 bg-gradient-to-br from-orange-50 to-rose-50 rounded-2xl">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-rose-400 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/25">
                    <span className="material-symbols-outlined text-3xl text-white">waving_hand</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Klaar om te starten?</h3>
                  <p className="text-slate-600 mb-8">Ik reageer meestal binnen 24 uur</p>
                  
                  <a
                    href={`mailto:${content.contact?.email}?subject=Contact via website`}
                    className="block w-full bg-gradient-to-r from-orange-500 to-rose-500 text-white px-6 py-4 rounded-xl font-bold hover:shadow-xl hover:shadow-orange-500/25 transition-all hover:-translate-y-0.5 mb-3"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined">send</span>
                      Stuur een bericht
                    </span>
                  </a>

                  {content.contact?.telefoon && (
                    <a
                      href={`https://wa.me/${content.contact.telefoon.replace(/[^0-9]/g, '').replace(/^0/, '31')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-[#25D366] text-white px-6 py-4 rounded-xl font-bold hover:bg-[#20bd5a] transition-all"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        WhatsApp
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-slate-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-1">{content.naam}</h3>
              <p className="text-slate-400">{getBeroepLabel(beroep)}</p>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
              {content.contact?.email && (
                <a href={`mailto:${content.contact.email}`} className="hover:text-white transition-colors">
                  {content.contact.email}
                </a>
              )}
              {content.contact?.telefoon && (
                <a href={`tel:${content.contact.telefoon}`} className="hover:text-white transition-colors">
                  {content.contact.telefoon}
                </a>
              )}
            </div>
          </div>
          
          <div className="mt-10 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <p>© {new Date().getFullYear()} {content.naam}. Alle rechten voorbehouden.</p>
            <p className="flex items-center gap-1">
              Gemaakt met <span className="text-rose-400">♥</span> door{' '}
              <a href="https://jouwzorgsite.nl" className="text-orange-400 hover:text-orange-300 transition-colors">
                JouwZorgSite
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
