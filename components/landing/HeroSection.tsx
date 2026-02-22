'use client';

interface HeroSectionProps {
  onStart: () => void;
}

export function HeroSection({ onStart }: HeroSectionProps) {
  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <img src="/logo.png" alt="JouwZorgSite" className="h-[70px]" />
          </div>
          <button 
            onClick={onStart}
            className="bg-orange-500 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-orange-600 transition-colors"
          >
            Start gratis
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-orange-50 to-white min-h-screen flex items-center">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-6">
            <span className="material-symbols-outlined text-lg">verified</span>
            Geen technische kennis nodig
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            Jouw zorgwebsite<br />
            <span className="text-orange-500">in 30 seconden</span> online
          </h1>
          
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Vul je naam en specialisatie in. Wij maken direct je professionele website. 
            Gratis uitproberen, geen creditcard nodig.
          </p>
          
          <button 
            onClick={onStart}
            className="group bg-orange-500 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-orange-600 transition-all hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25 flex items-center gap-3 mx-auto"
          >
            Start nu gratis
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
          
          <p className="text-sm text-slate-500 mt-6">
            ✓ Klaar in 30 seconden &nbsp;&nbsp; ✓ Geen technische kennis &nbsp;&nbsp; ✓ Direct resultaat
          </p>
          
          {/* Trust indicators */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-500">shield</span>
              AVG-compliant
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-500">verified</span>
              BIG-verificatie
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-500">lock</span>
              SSL beveiligd
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
