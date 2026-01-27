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
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-orange-100 rounded-lg">
              <svg className="size-6 text-orange-600" fill="none" viewBox="0 0 48 48">
                <path
                  clipRule="evenodd"
                  d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
                  fill="currentColor"
                  fillRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-slate-900">JouwZorgSite</span>
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
