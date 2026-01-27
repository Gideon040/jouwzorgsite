// components/wizard/steps/StepDomain.tsx
// Custom domein kiezen - GRATIS registratie + €4,95/mnd

'use client';

import { useState, useEffect } from 'react';
import { Input, Button } from '@/components/ui';

interface DomainResult {
  domain: string;
  available: boolean;
  status: string;
  tld: string;
  price: number;
  priceFormatted: string;
}

interface StepDomainProps {
  naam: string;
  beroep: string;
  customDomain: string;
  wantsCustomDomain: boolean;
  onDomainChange: (domain: string) => void;
  onWantsCustomDomainChange: (wants: boolean) => void;
}

export function StepDomain({
  naam,
  beroep,
  customDomain,
  wantsCustomDomain,
  onDomainChange,
  onWantsCustomDomainChange,
}: StepDomainProps) {
  const [suggestions, setSuggestions] = useState<DomainResult[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const [customCheckResult, setCustomCheckResult] = useState<DomainResult | null>(null);
  const [isCheckingCustom, setIsCheckingCustom] = useState(false);
  const [error, setError] = useState('');

  // Fetch suggestions when user wants custom domain
  useEffect(() => {
    if (!wantsCustomDomain || !naam) return;

    const fetchSuggestions = async () => {
      setIsLoadingSuggestions(true);
      setError('');
      try {
        const res = await fetch('/api/domains/suggestions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ naam, beroep }),
        });
        const data = await res.json();
        if (data.suggestions) {
          setSuggestions(data.suggestions);
        }
      } catch (err) {
        console.error('Failed to fetch suggestions:', err);
        setError('Kon suggesties niet laden');
      } finally {
        setIsLoadingSuggestions(false);
      }
    };

    fetchSuggestions();
  }, [naam, beroep, wantsCustomDomain]);

  // Check custom domain
  const checkCustomDomain = async () => {
    if (!customInput || customInput.length < 3) return;

    // Add .nl if no TLD
    let domainToCheck = customInput.toLowerCase().trim();
    if (!domainToCheck.includes('.')) {
      domainToCheck += '.nl';
    }

    setIsCheckingCustom(true);
    setError('');
    setCustomCheckResult(null);

    try {
      const res = await fetch('/api/domains/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: domainToCheck }),
      });
      const data = await res.json();
      
      if (data.error) {
        setError(data.error);
      } else {
        setCustomCheckResult(data);
      }
    } catch (err) {
      setError('Kon beschikbaarheid niet controleren');
    } finally {
      setIsCheckingCustom(false);
    }
  };

  const selectDomain = (domain: string) => {
    onDomainChange(domain);
  };

  const availableSuggestions = suggestions.filter(s => s.available);

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Eigen domeinnaam?
        </h2>
        <p className="text-slate-500">
          Maak je website professioneler met je eigen .nl domein
        </p>
      </div>

      {/* Choice Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Free subdomain option */}
        <button
          type="button"
          onClick={() => {
            onWantsCustomDomainChange(false);
            onDomainChange('');
          }}
          className={`p-6 rounded-xl border-2 text-left transition-all ${
            !wantsCustomDomain
              ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
              : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">🌐</span>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              GRATIS
            </span>
          </div>
          <h3 className="font-bold text-slate-900 mb-1">Subdomain</h3>
          <p className="text-sm text-slate-500 mb-3">
            Gebruik onze gratis subdomain
          </p>
          <div className="p-3 bg-slate-50 rounded-lg">
            <code className="text-sm font-mono text-primary">
              {naam ? naam.toLowerCase().replace(/\s+/g, '') : 'jouw-naam'}.jouwzorgsite.nl
            </code>
          </div>
        </button>

        {/* Custom domain option */}
        <button
          type="button"
          onClick={() => onWantsCustomDomainChange(true)}
          className={`p-6 rounded-xl border-2 text-left transition-all ${
            wantsCustomDomain
              ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
              : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <span className="text-xl">✨</span>
            </div>
            <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">
              +€4,95/mnd
            </span>
          </div>
          <h3 className="font-bold text-slate-900 mb-1">Eigen domein</h3>
          <p className="text-sm text-slate-500 mb-3">
            Professioneel met je eigen .nl adres
          </p>
          <div className="p-3 bg-slate-50 rounded-lg">
            <code className="text-sm font-mono text-primary">
              www.jouw-naam.nl
            </code>
          </div>
        </button>
      </div>

      {/* Custom Domain Selection */}
      {wantsCustomDomain && (
        <div className="space-y-6">
          {/* Benefits banner */}
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎁</span>
              <div>
                <p className="font-bold text-emerald-800">Registratie is GRATIS!</p>
                <p className="text-sm text-emerald-700">
                  Wij registreren het domein voor je. Je betaalt alleen €4,95/maand extra.
                </p>
              </div>
            </div>
          </div>

          {/* Custom input */}
          <div>
            <h3 className="text-sm font-bold text-slate-700 mb-2">
              Zoek je eigen domein
            </h3>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  placeholder="mijnzorgpraktijk"
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), checkCustomDomain())}
                />
                {!customInput.includes('.') && customInput && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-sm">
                    .nl
                  </span>
                )}
              </div>
              <Button 
                onClick={checkCustomDomain} 
                disabled={!customInput || customInput.length < 3 || isCheckingCustom}
              >
                {isCheckingCustom ? 'Checken...' : 'Check'}
              </Button>
            </div>

            {/* Custom domain result */}
            {customCheckResult && (
              <div className={`mt-3 p-4 rounded-lg ${
                customCheckResult.available 
                  ? 'bg-emerald-50 border border-emerald-200' 
                  : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">
                      {customCheckResult.available ? '✅' : '❌'}
                    </span>
                    <span className="font-mono font-medium">{customCheckResult.domain}</span>
                    <span className={`text-sm ${
                      customCheckResult.available ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {customCheckResult.available ? 'Beschikbaar!' : 'Niet beschikbaar'}
                    </span>
                  </div>
                  {customCheckResult.available && (
                    <Button
                      size="sm"
                      onClick={() => selectDomain(customCheckResult.domain)}
                      className={customDomain === customCheckResult.domain ? 'bg-emerald-600' : ''}
                    >
                      {customDomain === customCheckResult.domain ? '✓ Gekozen' : 'Selecteren'}
                    </Button>
                  )}
                </div>
              </div>
            )}

            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>

          {/* Suggestions */}
          {availableSuggestions.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-700 mb-3">
                Suggesties voor "{naam}"
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {availableSuggestions.slice(0, 6).map((suggestion) => (
                  <button
                    key={suggestion.domain}
                    type="button"
                    onClick={() => selectDomain(suggestion.domain)}
                    className={`p-3 rounded-lg border text-left transition-all flex items-center justify-between ${
                      customDomain === suggestion.domain
                        ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                        : 'border-slate-200 hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-500">✓</span>
                      <span className="font-mono text-sm">{suggestion.domain}</span>
                    </div>
                    {customDomain === suggestion.domain && (
                      <span className="text-primary font-bold">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {isLoadingSuggestions && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-3 text-slate-500">Suggesties laden...</span>
            </div>
          )}

          {/* Selected domain confirmation */}
          {customDomain && (
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Gekozen domein:</p>
                  <p className="text-xl font-bold text-primary font-mono">{customDomain}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">Registratie</p>
                  <p className="text-lg font-bold text-emerald-600">GRATIS</p>
                  <p className="text-xs text-slate-500">+€4,95/mnd</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
