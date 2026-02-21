'use client';

import { useState } from 'react';

interface ActivateSubscriptionProps {
  siteId: string;
  siteName: string;
}

type PlanChoice = 'starter' | 'professional';

export function ActivateSubscription({ siteId, siteName }: ActivateSubscriptionProps) {
  const [selectedPlan, setSelectedPlan] = useState<PlanChoice>('professional');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const planPrijs = selectedPlan === 'professional' ? '€19,95' : '€14,95';

  const handleActivate = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/mollie/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteId, plan: selectedPlan }),
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
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-3xl text-teal-600">
              rocket_launch
            </span>
          </div>
          <h1 className="text-2xl font-bold font-serif text-slate-900 mb-2">
            Activeer je proefperiode
          </h1>
          <p className="text-slate-500">
            Je website <strong>{siteName}</strong> staat klaar.
            Kies je abonnement om je site live te zetten.
          </p>
        </div>

        {/* Plan Selection */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {/* Starter */}
          <button
            onClick={() => setSelectedPlan('starter')}
            className={`relative p-4 rounded-xl border-2 text-left transition-all ${
              selectedPlan === 'starter'
                ? 'border-teal-600 bg-teal-50/50'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            {selectedPlan === 'starter' && (
              <span className="absolute top-3 right-3 material-symbols-outlined text-teal-600 text-lg">check_circle</span>
            )}
            <div className="text-sm font-semibold text-slate-900">Starter</div>
            <div className="text-xl font-bold text-slate-900 mt-1">€14,95<span className="text-sm font-normal text-slate-500">/mnd</span></div>
            <ul className="mt-3 space-y-1.5">
              <li className="flex items-center gap-1.5 text-xs text-slate-600">
                <span className="material-symbols-outlined text-emerald-500 text-sm">check</span>
                Professionele website
              </li>
              <li className="flex items-center gap-1.5 text-xs text-slate-600">
                <span className="material-symbols-outlined text-emerald-500 text-sm">check</span>
                naam.jouwzorgsite.nl
              </li>
              <li className="flex items-center gap-1.5 text-xs text-slate-600">
                <span className="material-symbols-outlined text-emerald-500 text-sm">check</span>
                BIG-badge & SSL
              </li>
            </ul>
          </button>

          {/* Professional */}
          <button
            onClick={() => setSelectedPlan('professional')}
            className={`relative p-4 rounded-xl border-2 text-left transition-all ${
              selectedPlan === 'professional'
                ? 'border-teal-600 bg-teal-50/50'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <span className="absolute -top-2.5 left-3 px-2 py-0.5 bg-teal-600 text-white text-[10px] font-bold uppercase tracking-wide rounded-full">
              Populair
            </span>
            {selectedPlan === 'professional' && (
              <span className="absolute top-3 right-3 material-symbols-outlined text-teal-600 text-lg">check_circle</span>
            )}
            <div className="text-sm font-semibold text-slate-900">Professional</div>
            <div className="text-xl font-bold text-slate-900 mt-1">€19,95<span className="text-sm font-normal text-slate-500">/mnd</span></div>
            <ul className="mt-3 space-y-1.5">
              <li className="flex items-center gap-1.5 text-xs text-slate-600">
                <span className="material-symbols-outlined text-emerald-500 text-sm">check</span>
                Alles van Starter
              </li>
              <li className="flex items-center gap-1.5 text-xs font-medium text-slate-900">
                <span className="material-symbols-outlined text-teal-600 text-sm">add_circle</span>
                Eigen .nl domein
              </li>
            </ul>
          </button>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8">
          {/* Pricing summary */}
          <div className="bg-slate-50 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">
                JouwZorgSite {selectedPlan === 'professional' ? 'Professional' : 'Starter'}
              </span>
              <span className="text-sm font-bold text-slate-900">{planPrijs}/mnd</span>
            </div>
            <hr className="border-slate-200 my-2" />
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-900">Vandaag</span>
              <span className="text-sm font-bold text-emerald-600">€0,01</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Eenmalig €0,01 om je betaalmethode te verifiëren. 14 dagen gratis, daarna {planPrijs}/maand. Elk moment opzegbaar.
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
