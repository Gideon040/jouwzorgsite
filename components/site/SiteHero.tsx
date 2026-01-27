// components/site/SiteHero.tsx

import { cn } from '@/lib/utils';
import { getBeroepLabel } from '@/constants';

interface SiteHeroProps {
  naam: string;
  foto?: string | null;
  tagline: string;
  beroep: string;
  template?: 'warm' | 'modern' | 'editorial';
}

export function SiteHero({ naam, foto, tagline, beroep, template = 'warm' }: SiteHeroProps) {
  // Generate initials for placeholder
  const initials = naam
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  if (template === 'warm') {
    return <WarmHero naam={naam} foto={foto} tagline={tagline} beroep={beroep} initials={initials} />;
  }
  
  if (template === 'modern') {
    return <ModernHero naam={naam} foto={foto} tagline={tagline} beroep={beroep} initials={initials} />;
  }
  
  return <EditorialHero naam={naam} foto={foto} tagline={tagline} beroep={beroep} initials={initials} />;
}

// WARM HERO - Friendly, welcoming, soft curves
function WarmHero({ naam, foto, tagline, beroep, initials }: any) {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-200/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-32">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Photo */}
          <div className="relative animate-fade-in-up">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full blur-2xl opacity-30 scale-110" />
            {foto ? (
              <img
                src={foto}
                alt={naam}
                className="relative w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-white shadow-2xl"
              />
            ) : (
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full flex items-center justify-center text-5xl md:text-6xl font-bold bg-gradient-to-br from-orange-400 to-amber-500 text-white border-4 border-white shadow-2xl">
                {initials}
              </div>
            )}
            {/* Verified badge */}
            <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg">
              <div className="bg-emerald-500 rounded-full p-1.5">
                <span className="material-symbols-outlined text-white text-lg">verified</span>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="text-center md:text-left">
            <div className="animate-fade-in-up delay-100">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur text-orange-700 text-sm font-semibold shadow-sm mb-6">
                <span className="material-symbols-outlined text-lg">medical_services</span>
                {getBeroepLabel(beroep)}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-4 animate-fade-in-up delay-200">
              {naam}
            </h1>
            <p className="text-xl md:text-2xl text-orange-800/80 max-w-lg mb-8 animate-fade-in-up delay-300">
              {tagline}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start animate-fade-in-up delay-400">
              <a
                href="#contact"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all hover:scale-105"
              >
                <span>Neem contact op</span>
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </a>
              <a
                href="#diensten"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg bg-white text-orange-700 border-2 border-orange-200 hover:border-orange-400 transition-all"
              >
                <span className="material-symbols-outlined">favorite</span>
                Mijn diensten
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 50L48 45.7C96 41 192 33 288 35.2C384 37 480 50 576 55.8C672 62 768 60 864 53.3C960 47 1056 35 1152 33.3C1248 32 1344 40 1392 43.8L1440 48V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}

// MODERN HERO - Clean, professional, geometric
function ModernHero({ naam, foto, tagline, beroep, initials }: any) {
  return (
    <section className="relative overflow-hidden bg-slate-900 text-white">
      {/* Geometric background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20" />
        <div className="absolute top-20 left-20 w-72 h-72 border border-white/10 rounded-full" />
        <div className="absolute top-40 left-40 w-72 h-72 border border-white/5 rounded-full" />
        <div className="absolute bottom-20 right-20 w-96 h-96 border border-white/10 rounded-full" />
        <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl" />
      </div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-4 py-24 md:py-36">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="order-2 md:order-1">
            <div className="animate-fade-in-up">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/20 text-blue-300 text-sm font-semibold mb-6 border border-blue-500/30">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse-soft" />
                {getBeroepLabel(beroep)}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-fade-in-up delay-100">
              <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                {naam}
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-lg mb-10 animate-fade-in-up delay-200">
              {tagline}
            </p>
            
            <div className="flex flex-col sm:flex-row items-start gap-4 animate-fade-in-up delay-300">
              <a
                href="#contact"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg bg-white text-slate-900 hover:bg-blue-50 transition-all hover:scale-105"
              >
                <span>Contact opnemen</span>
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </a>
              <a
                href="#over"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg border border-white/20 text-white hover:bg-white/10 transition-all"
              >
                Meer over mij
              </a>
            </div>
          </div>

          {/* Photo */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end animate-scale-in">
            <div className="relative">
              {/* Decorative rings */}
              <div className="absolute inset-0 rounded-2xl border-2 border-blue-500/20 rotate-6 scale-105" />
              <div className="absolute inset-0 rounded-2xl border-2 border-purple-500/20 -rotate-6 scale-110" />
              
              {foto ? (
                <img
                  src={foto}
                  alt={naam}
                  className="relative w-64 h-80 md:w-80 md:h-96 rounded-2xl object-cover shadow-2xl shadow-blue-500/20"
                />
              ) : (
                <div className="relative w-64 h-80 md:w-80 md:h-96 rounded-2xl flex items-center justify-center text-6xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl shadow-blue-500/20">
                  {initials}
                </div>
              )}
              
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-slate-800 rounded-xl p-4 shadow-xl border border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-emerald-400">verified</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Geverifieerd</p>
                    <p className="text-sm font-bold text-white">BIG-geregistreerd</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// EDITORIAL HERO - Typography focused, magazine style
function EditorialHero({ naam, foto, tagline, beroep, initials }: any) {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-stone-100">
      {/* Large background image/gradient */}
      <div className="absolute inset-0">
        {foto ? (
          <>
            <img src={foto} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-100 via-stone-100/95 to-stone-100/70" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-stone-100 to-stone-200" />
        )}
      </div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-4 py-24 w-full">
        <div className="max-w-2xl">
          {/* Label */}
          <div className="animate-fade-in-up">
            <span className="inline-block text-sm font-medium tracking-[0.2em] uppercase text-stone-500 mb-8">
              {getBeroepLabel(beroep)}
            </span>
          </div>
          
          {/* Name - Editorial typography */}
          <h1 className="animate-fade-in-up delay-100">
            <span className="block text-6xl md:text-8xl lg:text-9xl font-extralight text-stone-900 tracking-tight leading-none">
              {naam.split(' ')[0]}
            </span>
            {naam.split(' ')[1] && (
              <span className="block text-6xl md:text-8xl lg:text-9xl font-bold text-stone-900 tracking-tight leading-none mt-2">
                {naam.split(' ').slice(1).join(' ')}
              </span>
            )}
          </h1>
          
          {/* Tagline with decorative line */}
          <div className="flex items-center gap-6 mt-10 animate-fade-in-up delay-200">
            <div className="w-16 h-px bg-stone-400" />
            <p className="text-lg md:text-xl text-stone-600 font-light italic max-w-md">
              "{tagline}"
            </p>
          </div>

          {/* CTA */}
          <div className="mt-12 animate-fade-in-up delay-300">
            <a
              href="#contact"
              className="group inline-flex items-center gap-4 text-stone-900 font-medium"
            >
              <span className="w-14 h-14 rounded-full border-2 border-stone-900 flex items-center justify-center group-hover:bg-stone-900 group-hover:text-white transition-all">
                <span className="material-symbols-outlined">arrow_forward</span>
              </span>
              <span className="text-lg tracking-wide group-hover:tracking-wider transition-all">
                Neem contact op
              </span>
            </a>
          </div>
        </div>

        {/* Side photo for editorial (if no background photo used) */}
        {!foto && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block animate-slide-in-right">
            <div className="w-72 h-96 rounded-sm bg-gradient-to-br from-stone-300 to-stone-400 flex items-center justify-center text-6xl font-light text-white shadow-2xl">
              {initials}
            </div>
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="flex flex-col items-center gap-2 text-stone-400">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <span className="material-symbols-outlined">expand_more</span>
        </div>
      </div>
    </section>
  );
}
