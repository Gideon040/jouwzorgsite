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

export function CheckoutSection({ site, content, email, onBack, onComplete }: CheckoutSectionProps) {
  const router = useRouter();
  const [subdomain, setSubdomain] = useState(site.subdomain);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Custom domain state - nu optioneel
  const [wantCustomDomain, setWantCustomDomain] = useState(false);
  const [customDomain, setCustomDomain] = useState('');
  const [domainAvailable, setDomainAvailable] = useState<boolean | null>(null);
  const [isCheckingDomain, setIsCheckingDomain] = useState(false);
  const [domainError, setDomainError] = useState<string | null>(null);
  const [domainPrice, setDomainPrice] = useState('€14,95/jaar');

  // Check subdomain availability via API
  useEffect(() => {
    if (!subdomain.trim() || subdomain.length < 3) {
      setIsAvailable(null);
      return;
    }

    const timer = setTimeout(async () => {
      setIsChecking(true);
      setError(null);
      
      try {
        // Check subdomain availability in database
        const supabase = createClient();
        const { data, error } = await supabase
          .rpc('is_subdomain_available', { check_subdomain: subdomain.toLowerCase() });
        
        if (error) throw error;
        setIsAvailable(data === true);
      } catch (err) {
        console.error('Subdomain check error:', err);
        // Fallback: assume available if check fails
        setIsAvailable(true);
      } finally {
        setIsChecking(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [subdomain]);

  // Check custom domain availability via TransIP API
  const checkCustomDomain = async (domain: string) => {
    if (!domain || !domain.includes('.')) return;
    
    setIsCheckingDomain(true);
    try {
      const response = await fetch('/api/domains/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain }),
      });
      
      const data = await response.json();
      
      if (data.error) {
        setDomainError(data.error);
        setDomainAvailable(false);
      } else {
        setDomainAvailable(data.available);
        setDomainPrice(data.priceFormatted || '€14,95/jaar');
        setDomainError(null);
      }
    } catch (err) {
      console.error('Domain check error:', err);
      setDomainError('Kon beschikbaarheid niet controleren');
      setDomainAvailable(false);
    } finally {
      setIsCheckingDomain(false);
    }
  };

  const handleSubmit = async () => {
    if (!isAvailable || password.length < 8) return;
    
    setIsLoading(true);
    setError(null);
    
    const supabase = createClient();
    
    try {
      // 1. Create Supabase account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: content.naam,
          },
        },
      });

      if (authError) {
        // Handle specific errors
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
          published: false, // Unpublished until payment confirmed
        })
        .select()
        .single();

      if (siteError) {
        console.error('Site creation error:', siteError);
        // If subdomain taken, show friendly error
        if (siteError.message.includes('unique') || siteError.message.includes('subdomain')) {
          setError('Dit subdomein is helaas net bezet. Kies een ander.');
        } else {
          setError('Er ging iets mis bij het aanmaken van je site.');
        }
        setIsLoading(false);
        return;
      }

      // 3. Track conversion
      trackSignupComplete(email);

      // 4. TODO: Redirect to Mollie checkout
      // For now, we'll go to onComplete which shows success
      // Later: router.push(`/api/checkout?siteId=${siteData.id}`);
      
      onComplete();

    } catch (err) {
      console.error('Signup error:', err);
      setError('Er ging iets mis. Probeer het opnieuw.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-3xl text-orange-600">rocket_launch</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Laatste stap!
          </h1>
          <p className="text-slate-500">
            Maak je account aan en je website gaat direct online
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
        
        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8">
          
          {/* Subdomain */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Jouw website adres
            </label>
            <div className="flex items-center border-2 border-slate-200 rounded-xl overflow-hidden focus-within:border-orange-500 transition-colors">
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
          
          {/* Custom domain toggle */}
          <div className="mb-6 p-4 bg-slate-50 rounded-xl">
            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-500">language</span>
                <div>
                  <span className="font-medium text-slate-700">Eigen .nl domein</span>
                  <p className="text-xs text-slate-400">Bijvoorbeeld: {subdomain || 'jouw-naam'}.nl</p>
                </div>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={wantCustomDomain}
                  onChange={(e) => setWantCustomDomain(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:ring-4 peer-focus:ring-orange-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </div>
            </label>
            
            {wantCustomDomain && (
              <div className="mt-4 pt-4 border-t border-slate-200">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Welk domein wil je?
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customDomain}
                    onChange={(e) => {
                      setCustomDomain(e.target.value.toLowerCase());
                      setDomainAvailable(null);
                      setDomainError(null);
                    }}
                    placeholder="mijn-naam.nl"
                    className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg focus:border-orange-500 outline-none"
                  />
                  <button
                    onClick={() => checkCustomDomain(customDomain)}
                    disabled={!customDomain.includes('.') || isCheckingDomain}
                    className={`px-4 py-2.5 rounded-lg font-medium transition-colors ${
                      customDomain.includes('.') && !isCheckingDomain
                        ? 'bg-slate-900 text-white hover:bg-slate-800'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {isCheckingDomain ? (
                      <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
                    ) : (
                      'Check'
                    )}
                  </button>
                </div>
                {domainError && (
                  <p className="text-xs text-red-500 mt-2">{domainError}</p>
                )}
                {domainAvailable === true && (
                  <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">check_circle</span>
                    {customDomain} is beschikbaar voor {domainPrice}
                  </p>
                )}
                {domainAvailable === false && !domainError && (
                  <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">error</span>
                    Dit domein is niet beschikbaar
                  </p>
                )}
              </div>
            )}
          </div>
          
          {/* Email (read-only) */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              E-mailadres
            </label>
            <input
              type="email"
              value={email}
              readOnly
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600"
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
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-orange-500 outline-none transition-colors"
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
              <span className="text-slate-600">JouwZorgSite abonnement</span>
              <span className="font-bold text-slate-900">€14,95/mnd</span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-500">
              <span>Subdomein {subdomain}.jouwzorgsite.nl</span>
              <span className="text-emerald-600 font-medium">Inbegrepen</span>
            </div>
            {wantCustomDomain && customDomain && domainAvailable && (
              <div className="flex items-center justify-between text-sm text-slate-500 mt-2">
                <span>Domein {customDomain}</span>
                <span className="text-slate-900 font-medium">{domainPrice}</span>
              </div>
            )}
            <hr className="my-3 border-slate-200" />
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">Vandaag</span>
              <span className="font-bold text-emerald-600">€0,00</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              14 dagen gratis, daarna €14,95/maand{wantCustomDomain && domainAvailable ? ` + ${domainPrice} domein` : ''}. Elk moment opzegbaar.
            </p>
          </div>
          
          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!isAvailable || password.length < 8 || isLoading}
            className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg transition-all ${
              isAvailable && password.length >= 8 && !isLoading
                ? 'bg-orange-500 text-white hover:bg-orange-600 hover:shadow-lg'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <>
                <span className="material-symbols-outlined animate-spin">progress_activity</span>
                Account aanmaken...
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
