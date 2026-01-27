// components/site/SiteServices.tsx

import { cn } from '@/lib/utils';
import { Dienst } from '@/types';

interface SiteServicesProps {
  diensten: Dienst[];
  template?: 'warm' | 'modern' | 'editorial';
}

export function SiteServices({ diensten, template = 'warm' }: SiteServicesProps) {
  if (diensten.length === 0) return null;

  if (template === 'warm') {
    return <WarmServices diensten={diensten} />;
  }
  
  if (template === 'modern') {
    return <ModernServices diensten={diensten} />;
  }
  
  return <EditorialServices diensten={diensten} />;
}

// WARM SERVICES
function WarmServices({ diensten }: { diensten: Dienst[] }) {
  return (
    <section id="diensten" className="py-20 md:py-28 px-4 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-100 rounded-full blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2" />
      
      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold mb-4">
            <span className="material-symbols-outlined text-lg">favorite</span>
            Wat ik voor u kan betekenen
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
            Mijn diensten
          </h2>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {diensten.map((dienst, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 border border-orange-100 hover:border-orange-300 shadow-sm hover:shadow-xl transition-all duration-300 card-hover"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-orange-200">
                <span className="material-symbols-outlined text-white text-2xl">
                  {dienst.icon || 'medical_services'}
                </span>
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {dienst.naam}
              </h3>
              {dienst.beschrijving && (
                <p className="text-slate-600 leading-relaxed">
                  {dienst.beschrijving}
                </p>
              )}

              {/* Hover accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-amber-400 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// MODERN SERVICES
function ModernServices({ diensten }: { diensten: Dienst[] }) {
  return (
    <section id="diensten" className="py-20 md:py-28 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span className="text-blue-600 font-semibold tracking-wide uppercase text-sm">Diensten</span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-2">
              Hoe ik u kan helpen
            </h2>
          </div>
          <p className="text-slate-600 max-w-md">
            Professionele zorg op maat, afgestemd op uw persoonlijke situatie en wensen.
          </p>
        </div>

        {/* Services - Modern cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {diensten.map((dienst, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 hover:bg-slate-900 transition-all duration-500 cursor-pointer overflow-hidden"
            >
              {/* Number */}
              <span className="absolute top-6 right-6 text-6xl font-bold text-slate-100 group-hover:text-slate-800 transition-colors">
                {String(index + 1).padStart(2, '0')}
              </span>
              
              {/* Icon */}
              <div className="relative w-12 h-12 rounded-lg bg-blue-100 group-hover:bg-blue-600 flex items-center justify-center mb-6 transition-colors">
                <span className="material-symbols-outlined text-blue-600 group-hover:text-white text-xl transition-colors">
                  {dienst.icon || 'medical_services'}
                </span>
              </div>
              
              {/* Content */}
              <h3 className="relative text-xl font-bold text-slate-900 group-hover:text-white mb-3 transition-colors">
                {dienst.naam}
              </h3>
              {dienst.beschrijving && (
                <p className="relative text-slate-600 group-hover:text-slate-300 leading-relaxed transition-colors">
                  {dienst.beschrijving}
                </p>
              )}

              {/* Arrow */}
              <div className="relative mt-6 flex items-center gap-2 text-blue-600 group-hover:text-blue-400 font-medium transition-colors">
                <span>Meer info</span>
                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// EDITORIAL SERVICES
function EditorialServices({ diensten }: { diensten: Dienst[] }) {
  return (
    <section id="diensten" className="py-24 md:py-32 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <span className="text-sm font-medium tracking-[0.2em] uppercase text-stone-400 block mb-4">
            Diensten
          </span>
          <h2 className="text-4xl md:text-6xl font-extralight text-stone-900">
            Wat ik <span className="font-bold italic">voor u</span> kan doen
          </h2>
        </div>

        {/* Services - Editorial list */}
        <div className="space-y-0 divide-y divide-stone-200">
          {diensten.map((dienst, index) => (
            <div
              key={index}
              className="group py-10 flex flex-col md:flex-row md:items-center gap-6 cursor-pointer"
            >
              {/* Number */}
              <span className="text-sm font-medium text-stone-300 md:w-16">
                {String(index + 1).padStart(2, '0')}
              </span>
              
              {/* Content */}
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-light text-stone-900 group-hover:text-stone-600 transition-colors flex items-center gap-4">
                  {dienst.naam}
                  <span className="material-symbols-outlined opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all">
                    arrow_forward
                  </span>
                </h3>
                {dienst.beschrijving && (
                  <p className="text-stone-500 mt-2 max-w-xl">
                    {dienst.beschrijving}
                  </p>
                )}
              </div>

              {/* Icon */}
              <div className="w-14 h-14 rounded-full border border-stone-200 group-hover:border-stone-400 group-hover:bg-stone-900 flex items-center justify-center transition-all">
                <span className="material-symbols-outlined text-stone-400 group-hover:text-white transition-colors">
                  {dienst.icon || 'medical_services'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
