'use client';

interface DoneSectionProps {
  naam: string;
  subdomain?: string;
}

export function DoneSection({ naam, subdomain }: DoneSectionProps) {
  const firstName = naam.split(' ')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-8">
          <span className="material-symbols-outlined text-5xl text-emerald-600">celebration</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
          Gefeliciteerd, {firstName}! 🎉
        </h1>
        
        <p className="text-lg text-slate-600 mb-8">
          Je account is aangemaakt! Check je e-mail om je account te bevestigen.
        </p>
        
        {subdomain && (
          <div className="bg-white rounded-2xl p-4 shadow-md mb-6 inline-block">
            <p className="text-sm text-slate-500 mb-1">Jouw website adres:</p>
            <p className="text-lg font-mono font-bold text-orange-600">
              {subdomain}.jouwzorgsite.nl
            </p>
          </div>
        )}
        
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <h3 className="font-bold text-slate-900 mb-3">Wat nu?</h3>
          <ul className="text-left space-y-3">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-orange-500 mt-0.5">mark_email_read</span>
              <span className="text-slate-600">Bevestig je e-mail (check ook spam)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-orange-500 mt-0.5">login</span>
              <span className="text-slate-600">Log in om je site verder aan te passen</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-orange-500 mt-0.5">publish</span>
              <span className="text-slate-600">Publiceer je site wanneer je klaar bent</span>
            </li>
          </ul>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/login"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-500 text-white rounded-xl font-bold text-lg hover:bg-orange-600 transition-all"
          >
            Inloggen
            <span className="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>
        
        <p className="text-sm text-slate-400 mt-6">
          Hulp nodig? Mail naar support@jouwzorgsite.nl
        </p>
      </div>
    </div>
  );
}
