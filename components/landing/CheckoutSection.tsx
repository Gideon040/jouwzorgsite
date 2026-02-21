'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Site, SiteContent } from '@/types';
import { trackSignupComplete } from '@/lib/pixel';
import { createClient } from '@/lib/supabase/client';

interface CheckoutSectionProps {
  site: Site;
  content: SiteContent;
  email: string;
  onBack: () => void;
  onComplete: () => void;
}

type PlanChoice = 'starter' | 'professional';

export function CheckoutSection({ site, content, email, onBack, onComplete }: CheckoutSectionProps) {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<PlanChoice>('professional');
  const [subdomain, setSubdomain] = useState(site.subdomain);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [localEmail, setLocalEmail] = useState(email);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Custom domain state (only for professional — no TransIP check, just collect name)
  const [customDomain, setCustomDomain] = useState('');

  const planPrijs = selectedPlan === 'professional' ? '€19,95' : '€14,95';

  // Derive a clean domain suggestion from the name
  const nameSuggestion = (content.naam || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

  // Check subdomain availability via API (runs in background for both plans)
  useEffect(() => {
    if (!subdomain.trim() || subdomain.length < 3) {
      setIsAvailable(null);
      return;
    }

    const timer = setTimeout(async () => {
      setIsChecking(true);
      setError(null);

      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .rpc('is_subdomain_available', { check_subdomain: subdomain.toLowerCase() });

        if (error) throw error;
        setIsAvailable(data === true);
      } catch (err) {
        console.error('Subdomain check error:', err);
        setIsAvailable(true);
      } finally {
        setIsChecking(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [subdomain]);

  // Normalize domain input: ensure it ends with .nl
  const normalizeDomain = (input: string): string => {
    const trimmed = input.trim().toLowerCase();
    if (!trimmed) return '';
    if (trimmed.includes('.')) return trimmed;
    return trimmed + '.nl';
  };

  const handleSubmit = async () => {
    // Starter needs subdomain check; Professional needs domain name
    if (selectedPlan === 'starter' && !isAvailable) return;
    if (selectedPlan === 'professional' && !customDomain.trim()) return;
    if (!localEmail.includes('@') || password.length < 8) return;

    setIsLoading(true);
    setError(null);

    const supabase = createClient();

    try {
      // 1. Create Supabase account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: localEmail,
        password,
        options: {
          data: {
            full_name: content.naam,
          },
        },
      });

      if (authError) {
        if (authError.message.includes('already registered')) {
          setError('Dit e-mailadres is al geregistreerd. Probeer in te loggen.');
        } else {
          setError(authError.message);
        }
        setIsLoading(false);
        return;
      }

      if (!authData.user) {
        setError('Er ging iets mis bij het aanmaken van je account.');
        setIsLoading(false);
        return;
      }

      // 2. Create the site in database
      const finalDomain = selectedPlan === 'professional' ? normalizeDomain(customDomain) : undefined;

      const { data: siteData, error: siteError } = await supabase
        .from('sites')
        .insert({
          user_id: authData.user.id,
          subdomain: subdomain.toLowerCase(),
          template_id: site.template_id,
          beroep: site.beroep,
          content: content,
          theme: site.theme || null,
          generated_content: site.generated_content || null,
          published: false,
        })
        .select()
        .single();

      if (siteError) {
        console.error('Site creation error:', siteError);
        if (siteError.message.includes('unique') || siteError.message.includes('subdomain')) {
          setError('Dit subdomein is helaas net bezet. Kies een ander.');
        } else {
          setError('Er ging iets mis bij het aanmaken van je site.');
        }
        setIsLoading(false);
        return;
      }

      // 3. Track conversion
      trackSignupComplete(localEmail);

      // 4. Redirect to Mollie checkout (domain registration happens AFTER payment via dashboard)
      const mollieRes = await fetch('/api/mollie/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siteId: siteData.id,
          plan: selectedPlan,
          customDomain: finalDomain,
        }),
      });

      const mollieData = await mollieRes.json();

      if (!mollieRes.ok || !mollieData.checkoutUrl) {
        setError(mollieData.error || 'Kon betaling niet starten. Probeer het opnieuw.');
        setIsLoading(false);
        return;
      }

      // Redirect to Mollie payment page
      window.location.href = mollieData.checkoutUrl;

    } catch (err) {
      console.error('Signup error:', err);
      setError('Er ging iets mis. Probeer het opnieuw.');
      setIsLoading(false);
    }
  };

  // Can submit check
  const canSubmit = (() => {
    if (!localEmail.includes('@') || password.length < 8 || isLoading) return false;
    if (selectedPlan === 'starter') return isAvailable === true;
    // Professional: subdomain must be available (background check) + domain filled in
    return isAvailable !== false && customDomain.trim().length > 0;
  })();

  return (
    <div className="min-h-screen bg-[#fafaf9] py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-3xl text-teal-600">rocket_launch</span>
          </div>
          <h1 className="text-2xl font-bold font-serif text-slate-900 mb-2">
            Laatste stap!
          </h1>
          <p className="text-slate-500">
            Kies je abonnement en maak je account aan
          </p>
        </div>

        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-700 mb-6 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Terug naar verificatie
        </button>

        {/* Plan Selection */}
        <div className="grid grid-cols-[5fr_7fr] gap-3 mb-4">
          {/* Starter — compact */}
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
            <div className="text-sm font-semibold text-slate-500">Starter</div>
            <div className="text-xl font-bold text-slate-900 mt-1">€14,95<span className="text-sm font-normal text-slate-500">/mnd</span></div>
            <ul className="mt-3 space-y-1.5">
              <li className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="material-symbols-outlined text-slate-400 text-sm">check</span>
                Professionele website
              </li>
              <li className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="material-symbols-outlined text-slate-400 text-sm">check</span>
                naam.jouwzorgsite.nl
              </li>
              <li className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="material-symbols-outlined text-slate-400 text-sm">check</span>
                BIG-badge & SSL
              </li>
              <li className="flex items-center gap-1.5 text-xs text-red-400">
                <span className="material-symbols-outlined text-red-300 text-sm">close</span>
                Niet zichtbaar in Google
              </li>
            </ul>
          </button>

          {/* Professional — prominent */}
          <button
            onClick={() => setSelectedPlan('professional')}
            className={`relative p-4 rounded-xl border-2 text-left transition-all ${
              selectedPlan === 'professional'
                ? 'border-teal-600 bg-teal-50/50 shadow-md shadow-teal-100'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <span className="absolute -top-2.5 left-3 px-2 py-0.5 bg-teal-600 text-white text-[10px] font-bold uppercase tracking-wide rounded-full">
              Meest gekozen
            </span>
            {selectedPlan === 'professional' && (
              <span className="absolute top-3 right-3 material-symbols-outlined text-teal-600 text-lg">check_circle</span>
            )}
            <div className="text-sm font-semibold text-slate-900">Professional</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-sm text-slate-400 line-through">€24,95</span>
              <span className="text-xl font-bold text-slate-900">€19,95<span className="text-sm font-normal text-slate-500">/mnd</span></span>
            </div>
            <ul className="mt-3 space-y-1.5">
              <li className="flex items-center gap-1.5 text-xs font-medium text-slate-900">
                <span className="material-symbols-outlined text-teal-600 text-sm">add_circle</span>
                Eigen .nl domein (gratis)
              </li>
              <li className="flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                <span className="material-symbols-outlined text-emerald-500 text-sm">check</span>
                Zichtbaar in Google
              </li>
              <li className="flex items-center gap-1.5 text-xs text-slate-600">
                <span className="material-symbols-outlined text-emerald-500 text-sm">check</span>
                Aanpasbare kleuren & stijl
              </li>
              <li className="flex items-center gap-1.5 text-xs text-slate-600">
                <span className="material-symbols-outlined text-emerald-500 text-sm">check</span>
                Kwaliteitskeurmerk widget
              </li>
              <li className="flex items-center gap-1.5 text-xs text-slate-600">
                <span className="material-symbols-outlined text-emerald-500 text-sm">check</span>
                Prioriteit support
              </li>
            </ul>
          </button>
        </div>

        {/* URL vergelijking nudge */}
        {selectedPlan === 'starter' && (
          <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="text-xs text-amber-800 flex items-start gap-2">
              <span className="material-symbols-outlined text-sm mt-0.5">info</span>
              <span>
                Met Starter wordt je adres <strong className="font-mono">{subdomain || 'jouwnaam'}.jouwzorgsite.nl</strong> en ben je niet vindbaar in Google. Voor slechts €5/mnd meer krijg je <strong className="font-mono">{nameSuggestion || 'jouwnaam'}.nl</strong> en vinden opdrachtgevers je wél.
              </span>
            </p>
          </div>
        )}

        {selectedPlan === 'professional' && <div className="mb-6" />}

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8">

          {/* Website adres — different per plan */}
          {selectedPlan === 'starter' ? (
            /* Starter: subdomain input */
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Jouw website adres
              </label>
              <div className="flex items-center border-2 border-slate-200 rounded-xl overflow-hidden focus-within:border-teal-600 transition-colors">
                <input
                  type="text"
                  value={subdomain}
                  onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  className="flex-1 px-4 py-3 outline-none text-slate-900"
                  placeholder="jouw-naam"
                />
                <span className="px-4 py-3 bg-slate-50 text-slate-500 text-sm font-mono border-l border-slate-200">
                  .jouwzorgsite.nl
                </span>
              </div>
              {isChecking && (
                <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                  <span className="material-symbols-outlined animate-spin text-xs">progress_activity</span>
                  Controleren...
                </p>
              )}
              {!isChecking && isAvailable === true && subdomain.length >= 3 && (
                <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">check_circle</span>
                  Beschikbaar!
                </p>
              )}
              {!isChecking && isAvailable === false && (
                <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">error</span>
                  Helaas bezet, kies een andere naam
                </p>
              )}
            </div>
          ) : (
            /* Professional: eigen .nl domein input (geen TransIP check, pas na betaling) */
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Jouw eigen domeinnaam
              </label>
              <div className="flex items-center border-2 border-slate-200 rounded-xl overflow-hidden focus-within:border-teal-600 transition-colors">
                <input
                  type="text"
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value.toLowerCase().replace(/[^a-z0-9.-]/g, ''))}
                  className="flex-1 px-4 py-3 outline-none text-slate-900"
                  placeholder={nameSuggestion || 'jouwnaam'}
                />
                {!customDomain.includes('.') && (
                  <span className="px-4 py-3 bg-slate-50 text-slate-500 text-sm font-mono border-l border-slate-200">
                    .nl
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-2">
                We registreren je domein na het activeren van je proefperiode.
              </p>
            </div>
          )}

          {/* Email */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              E-mailadres
            </label>
            <input
              type="email"
              value={localEmail}
              onChange={(e) => setLocalEmail(e.target.value)}
              placeholder="je@email.nl"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-teal-600 outline-none transition-colors"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Kies een wachtwoord
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-teal-600 outline-none transition-colors"
              placeholder="Minimaal 8 tekens"
            />
            {password.length > 0 && password.length < 8 && (
              <p className="text-xs text-amber-600 mt-2">
                Nog {8 - password.length} teken{8 - password.length !== 1 ? 's' : ''} nodig
              </p>
            )}
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-sm text-red-600 flex items-center gap-2">
                <span className="material-symbols-outlined text-base">error</span>
                {error}
              </p>
            </div>
          )}

          {/* Pricing summary */}
          <div className="bg-slate-50 rounded-xl p-5 mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-slate-600">
                JouwZorgSite {selectedPlan === 'professional' ? 'Professional' : 'Starter'}
              </span>
              <div className="text-right">
                {selectedPlan === 'professional' && (
                  <span className="text-xs text-slate-400 line-through mr-2">€24,95</span>
                )}
                <span className="font-bold text-slate-900">{planPrijs}/mnd</span>
              </div>
            </div>
            {selectedPlan === 'professional' ? (
              <>
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>{customDomain ? normalizeDomain(customDomain) : `${nameSuggestion || 'jouwnaam'}.nl`}</span>
                  <span className="text-emerald-600 font-medium text-xs">Inbegrepen</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-500 mt-1">
                  <span>Google indexering</span>
                  <span className="text-emerald-600 font-medium text-xs">Inbegrepen</span>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>{subdomain}.jouwzorgsite.nl</span>
                <span className="text-emerald-600 font-medium text-xs">Inbegrepen</span>
              </div>
            )}
            <hr className="my-3 border-slate-200" />
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">Vandaag</span>
              <span className="font-bold text-emerald-600">€0,01</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Eenmalig €0,01 om je betaalmethode te verifiëren. 14 dagen gratis, daarna {planPrijs}/maand. Elk moment opzegbaar.
            </p>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg transition-all ${
              canSubmit
                ? 'bg-gradient-to-br from-teal-600 to-[#0f766e] text-white hover:shadow-lg'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
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

          {/* Terms */}
          <p className="text-xs text-slate-400 text-center mt-4">
            Door te registreren ga je akkoord met onze{' '}
            <a href="/voorwaarden" className="underline hover:text-slate-600">algemene voorwaarden</a>
            {' '}en{' '}
            <a href="/privacy" className="underline hover:text-slate-600">privacybeleid</a>.
          </p>
        </div>

        {/* Trust badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-500 text-base">lock</span>
            SSL beveiligd
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-500 text-base">verified</span>
            AVG-compliant
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-500 text-base">support_agent</span>
            Nederlandse support
          </div>
        </div>
      </div>
    </div>
  );
}
