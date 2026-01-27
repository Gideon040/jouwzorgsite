// components/site/SiteCertificates.tsx

import { cn } from '@/lib/utils';
import { Certificaat } from '@/types';
import { getCertificaatTypeConfig } from '@/constants';

interface SiteCertificatesProps {
  certificaten: Certificaat[];
  template?: 'warm' | 'modern' | 'editorial';
}

export function SiteCertificates({ certificaten, template = 'warm' }: SiteCertificatesProps) {
  if (certificaten.length === 0) return null;

  if (template === 'warm') {
    return <WarmCertificates certificaten={certificaten} />;
  }
  
  if (template === 'modern') {
    return <ModernCertificates certificaten={certificaten} />;
  }
  
  return <EditorialCertificates certificaten={certificaten} />;
}

// WARM CERTIFICATES
function WarmCertificates({ certificaten }: { certificaten: Certificaat[] }) {
  return (
    <section id="certificaten" className="py-20 md:py-28 px-4 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-4">
            <span className="material-symbols-outlined text-lg">verified</span>
            Kwaliteit gegarandeerd
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
            Kwalificaties & Certificaten
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Mijn registraties en diploma's die garanderen dat u verzekerd bent van professionele zorg.
          </p>
        </div>

        {/* Certificates grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certificaten.map((cert, index) => (
            <WarmCertificateCard key={index} certificaat={cert} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WarmCertificateCard({ certificaat }: { certificaat: Certificaat }) {
  const config = getCertificaatTypeConfig(certificaat.type);
  const isOfficial = certificaat.type === 'big' || certificaat.type === 'agb';
  
  return (
    <div className="group bg-white rounded-2xl p-6 border border-orange-100 hover:border-orange-300 shadow-sm hover:shadow-lg transition-all flex items-start gap-5">
      {/* Icon */}
      <div className={cn(
        'w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110',
        isOfficial 
          ? 'bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-200' 
          : 'bg-gradient-to-br from-orange-400 to-amber-400 shadow-lg shadow-orange-200'
      )}>
        <span className="material-symbols-outlined text-white text-xl">
          {config?.icon || 'verified'}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-slate-900 text-lg">
            {certificaat.label}
          </h3>
          {isOfficial && (
            <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
              <span className="material-symbols-outlined text-sm">verified</span>
              Geverifieerd
            </span>
          )}
        </div>

        {/* Details */}
        <div className="text-slate-600 text-sm mt-1">
          {certificaat.sublabel && <span>{certificaat.sublabel}</span>}
          {certificaat.sublabel && certificaat.value && <span className="mx-2">•</span>}
          {certificaat.value && <span className="font-medium">{certificaat.value}</span>}
        </div>

        {/* Expiry & proof */}
        <div className="flex items-center gap-4 mt-3">
          {certificaat.expires_at && (
            <span className={cn(
              'text-xs flex items-center gap-1',
              new Date(certificaat.expires_at) < new Date() ? 'text-red-500' : 'text-emerald-600'
            )}>
              <span className="material-symbols-outlined text-sm">
                {new Date(certificaat.expires_at) < new Date() ? 'warning' : 'check_circle'}
              </span>
              {new Date(certificaat.expires_at) < new Date() 
                ? 'Verlopen' 
                : `Geldig t/m ${new Date(certificaat.expires_at).toLocaleDateString('nl-NL')}`
              }
            </span>
          )}
          {certificaat.image_url && (
            <button
              onClick={() => window.open(certificaat.image_url!, '_blank')}
              className="text-xs text-orange-600 hover:text-orange-700 flex items-center gap-1 font-medium"
            >
              <span className="material-symbols-outlined text-sm">visibility</span>
              Bewijs bekijken
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// MODERN CERTIFICATES
function ModernCertificates({ certificaten }: { certificaten: Certificaat[] }) {
  // Separate official (BIG/AGB) from others
  const official = certificaten.filter(c => c.type === 'big' || c.type === 'agb');
  const others = certificaten.filter(c => c.type !== 'big' && c.type !== 'agb');

  return (
    <section id="certificaten" className="py-20 md:py-28 px-4 bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-blue-400 font-semibold tracking-wide uppercase text-sm">Kwalificaties</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-4">
            Certificaten & Registraties
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Transparantie over mijn kwalificaties voor uw gemoedsrust.
          </p>
        </div>

        {/* Official registrations - Highlighted */}
        {official.length > 0 && (
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {official.map((cert, index) => (
              <div key={index} className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 flex items-center gap-5">
                <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-2xl">verified</span>
                </div>
                <div>
                  <span className="text-blue-200 text-sm font-medium">Officiële registratie</span>
                  <h3 className="text-xl font-bold text-white">{cert.label}</h3>
                  <p className="text-white/80">{cert.value}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Other certificates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {others.map((cert, index) => {
            const config = getCertificaatTypeConfig(cert.type);
            return (
              <div key={index} className="bg-slate-800 rounded-xl p-5 border border-slate-700 hover:border-slate-500 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center">
                    <span className="material-symbols-outlined text-slate-300">{config?.icon || 'verified'}</span>
                  </div>
                  <h3 className="font-bold text-white">{cert.label}</h3>
                </div>
                <div className="text-slate-400 text-sm">
                  {cert.sublabel && <p>{cert.sublabel}</p>}
                  {cert.value && <p className="font-medium text-slate-300">{cert.value}</p>}
                </div>
                {cert.image_url && (
                  <button
                    onClick={() => window.open(cert.image_url!, '_blank')}
                    className="mt-3 text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">visibility</span>
                    Bekijk bewijs
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// EDITORIAL CERTIFICATES
function EditorialCertificates({ certificaten }: { certificaten: Certificaat[] }) {
  return (
    <section id="certificaten" className="py-24 md:py-32 px-4 bg-stone-100">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <span className="text-sm font-medium tracking-[0.2em] uppercase text-stone-400 block mb-4">
            Kwalificaties
          </span>
          <h2 className="text-4xl md:text-6xl font-extralight text-stone-900">
            Mijn <span className="font-bold italic">credentials</span>
          </h2>
        </div>

        {/* Certificates - Editorial style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certificaten.map((cert, index) => {
            const config = getCertificaatTypeConfig(cert.type);
            const isOfficial = cert.type === 'big' || cert.type === 'agb';
            
            return (
              <div key={index} className={cn(
                'p-8 border-l-4 bg-white',
                isOfficial ? 'border-stone-900' : 'border-stone-300'
              )}>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-medium tracking-wider uppercase text-stone-400">
                      {config?.description || 'Certificaat'}
                    </span>
                    <h3 className="text-2xl font-light text-stone-900 mt-1">
                      {cert.label}
                    </h3>
                  </div>
                  {isOfficial && (
                    <span className="material-symbols-outlined text-stone-900">verified</span>
                  )}
                </div>
                
                <div className="mt-4 text-stone-600">
                  {cert.sublabel && <p className="italic">{cert.sublabel}</p>}
                  {cert.value && <p className="font-medium text-stone-900 mt-1">{cert.value}</p>}
                </div>

                {cert.image_url && (
                  <button
                    onClick={() => window.open(cert.image_url!, '_blank')}
                    className="mt-4 text-sm text-stone-500 hover:text-stone-900 flex items-center gap-2 group"
                  >
                    <span>Bekijk document</span>
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
