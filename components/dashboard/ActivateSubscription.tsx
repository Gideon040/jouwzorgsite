'use client';

import { useState } from 'react';

interface ActivateSubscriptionProps {
  siteId: string;
  siteName: string;
}

export function ActivateSubscription({ siteId, siteName }: ActivateSubscriptionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleActivate = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/mollie/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteId }),
      });

      const data = await res.json();

      if (!res.ok || !data.checkoutUrl) {
        setError(data.error || 'Er ging iets mis. Probeer het opnieuw.');
        setIsLoading(false);
        return;
      }

      window.location.href = data.checkoutUrl;
    } catch {
      setError('Er ging iets mis. Probeer het opnieuw.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-3xl text-teal-600">
              rocket_launch
            </span>
          </div>

          <h1 className="text-2xl font-bold font-serif text-slate-900 mb-3">
            Activeer je proefperiode
          </h1>
          <p className="text-slate-500 mb-2">
            Je website <strong>{siteName}</strong> staat klaar.
            Start je gratis proefperiode van 14 dagen om je site live te zetten.
          </p>

          {/* Pricing info */}
          <div className="bg-slate-50 rounded-xl p-4 mb-6 mt-6 text-left">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">JouwZorgSite abonnement</span>
              <span className="text-sm font-bold text-slate-900">€14,95/mnd</span>
            </div>
            <hr className="border-slate-200 my-2" />
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-900">Vandaag</span>
              <span className="text-sm font-bold text-emerald-600">€0,01</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Eenmalig €0,01 om je betaalmethode te verifiëren. 14 dagen gratis, daarna €14,95/maand. Elk moment opzegbaar.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-sm text-red-600 flex items-center gap-2">
                <span className="material-symbols-outlined text-base">error</span>
                {error}
              </p>
            </div>
          )}

          <button
            onClick={handleActivate}
            disabled={isLoading}
            className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg transition-all ${
              isLoading
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-br from-teal-600 to-[#0f766e] text-white hover:shadow-lg'
            }`}
          >
            {isLoading ? (
              <>
                <span className="material-symbols-outlined animate-spin">progress_activity</span>
                Even geduld...
              </>
            ) : (
              <>
                Start gratis proefperiode
                <span className="material-symbols-outlined">arrow_forward</span>
              </>
            )}
          </button>

          <p className="text-xs text-slate-400 text-center mt-4">
            Door te activeren ga je akkoord met onze{' '}
            <a href="/voorwaarden" className="underline hover:text-slate-600">algemene voorwaarden</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
