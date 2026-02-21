// app/(dashboard)/dashboard/domein/DomeinManager.tsx
'use client';

import { useState } from 'react';

interface DomainResult {
  domain: string;
  available: boolean | null;
  status: string;
  tld: string;
}

interface DomeinManagerProps {
  siteId: string;
  naam: string;
  beroep: string;
}

export function DomeinManager({ siteId, naam, beroep }: DomeinManagerProps) {
  const [tab, setTab] = useState<'registreer' | 'koppel'>('registreer');

  return (
    <div className="space-y-4">
      {/* Tab switcher */}
      <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
        <button
          onClick={() => setTab('registreer')}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            tab === 'registreer'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Nieuw domein registreren
        </button>
        <button
          onClick={() => setTab('koppel')}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            tab === 'koppel'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Bestaand domein koppelen
        </button>
      </div>

      {tab === 'registreer' ? (
        <RegistreerTab siteId={siteId} naam={naam} beroep={beroep} />
      ) : (
        <KoppelTab siteId={siteId} />
      )}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TAB 1: Nieuw domein registreren
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function RegistreerTab({ siteId, naam, beroep }: { siteId: string; naam: string; beroep: string }) {
  const [query, setQuery] = useState('');
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<DomainResult | null>(null);
  const [suggestions, setSuggestions] = useState<DomainResult[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [registering, setRegistering] = useState<string | null>(null);
  const [registerResult, setRegisterResult] = useState<{ success: boolean; message: string } | null>(null);
  const [error, setError] = useState('');

  // Ensure domain ends with .nl if no TLD provided
  const normalizeDomain = (input: string): string => {
    const trimmed = input.trim().toLowerCase();
    if (!trimmed) return '';
    // If it already has a dot (user typed a TLD), leave it
    if (trimmed.includes('.')) return trimmed;
    return trimmed + '.nl';
  };

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    const domain = normalizeDomain(query);
    if (!domain) return;

    setChecking(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/domains/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Kon domein niet controleren');
      } else {
        setResult(data);
      }
    } catch {
      setError('Er ging iets mis. Probeer het opnieuw.');
    } finally {
      setChecking(false);
    }
  };

  const loadSuggestions = async () => {
    if (!naam) return;
    setLoadingSuggestions(true);

    try {
      const res = await fetch('/api/domains/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ naam, beroep }),
      });
      const data = await res.json();

      if (data.suggestions) {
        setSuggestions(data.suggestions.filter((s: DomainResult) => s.available !== false).slice(0, 8));
      }
    } catch {
      // Suggestions are optional
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const handleRegister = async (domain: string) => {
    setRegistering(domain);
    setRegisterResult(null);

    try {
      const res = await fetch('/api/domains/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain, siteId }),
      });
      const data = await res.json();

      if (!res.ok) {
        setRegisterResult({ success: false, message: data.error || 'Registratie mislukt' });
      } else {
        setRegisterResult({ success: true, message: data.message || 'Domein geregistreerd!' });
      }
    } catch {
      setRegisterResult({ success: false, message: 'Er ging iets mis. Probeer het opnieuw.' });
    } finally {
      setRegistering(null);
    }
  };

  if (registerResult?.success) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
        <span className="material-symbols-outlined text-4xl text-emerald-500 mb-3 block">check_circle</span>
        <h3 className="text-sm font-semibold text-emerald-900 mb-1">{registerResult.message}</h3>
        <p className="text-xs text-emerald-700">
          Het kan tot 24 uur duren voordat het domein volledig actief is.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Zoeken */}
      <div className="bg-white rounded-xl border border-slate-200/60 p-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-slate-400 text-xl">search</span>
          <h3 className="text-sm font-semibold text-slate-900">Domein zoeken</h3>
        </div>
        <p className="text-xs text-emerald-600 font-medium mb-4">
          Gratis bij je abonnement
        </p>

        <form onSubmit={handleCheck} className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setResult(null); setError(''); }}
              placeholder="mijnpraktijk"
              className="w-full px-4 py-2.5 pr-12 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
            {!query.includes('.') && query.trim() && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">.nl</span>
            )}
          </div>
          <button
            type="submit"
            disabled={!query.trim() || checking}
            className="px-5 py-2.5 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {checking ? 'Checken...' : 'Check'}
          </button>
        </form>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        {result && (
          <div className={`mt-4 p-4 rounded-lg border ${
            result.available ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`material-symbols-outlined text-lg ${
                  result.available ? 'text-emerald-500' : 'text-red-500'
                }`}>
                  {result.available ? 'check_circle' : 'cancel'}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{result.domain}</p>
                  <p className={`text-xs ${result.available ? 'text-emerald-600' : 'text-red-600'}`}>
                    {result.available ? 'Beschikbaar — gratis bij je abonnement' : 'Niet beschikbaar'}
                  </p>
                </div>
              </div>
              {result.available && (
                <button
                  onClick={() => handleRegister(result.domain)}
                  disabled={!!registering}
                  className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors disabled:opacity-50"
                >
                  {registering === result.domain ? 'Bezig...' : 'Registreer'}
                </button>
              )}
            </div>
          </div>
        )}

        {registerResult && !registerResult.success && (
          <p className="mt-3 text-sm text-red-600">{registerResult.message}</p>
        )}
      </div>

      {/* Suggesties */}
      <div className="bg-white rounded-xl border border-slate-200/60 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-slate-400 text-xl">lightbulb</span>
            <h3 className="text-sm font-semibold text-slate-900">Suggesties</h3>
          </div>
          {suggestions.length === 0 && (
            <button
              onClick={loadSuggestions}
              disabled={loadingSuggestions}
              className="text-xs font-medium text-teal-600 hover:text-teal-700 transition-colors disabled:opacity-50"
            >
              {loadingSuggestions ? 'Laden...' : 'Toon suggesties'}
            </button>
          )}
        </div>

        {suggestions.length === 0 && !loadingSuggestions && (
          <p className="text-xs text-slate-500">
            Op basis van je naam genereren we domeinsuggesties.
          </p>
        )}

        {loadingSuggestions && (
          <div className="flex items-center gap-2 text-xs text-slate-500 py-4">
            <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
            Suggesties laden...
          </div>
        )}

        {suggestions.length > 0 && (
          <div className="space-y-2">
            {suggestions.map((s) => (
              <div
                key={s.domain}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100"
              >
                <div>
                  <p className="text-sm font-medium text-slate-900">{s.domain}</p>
                  <p className="text-xs text-emerald-600">Gratis bij je abonnement</p>
                </div>
                {s.available !== false && (
                  <button
                    onClick={() => handleRegister(s.domain)}
                    disabled={!!registering}
                    className="px-3 py-1.5 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {registering === s.domain ? 'Bezig...' : 'Registreer'}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TAB 2: Bestaand domein koppelen
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function KoppelTab({ siteId }: { siteId: string }) {
  const [domain, setDomain] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = domain.trim().toLowerCase();
    if (!trimmed || !trimmed.includes('.')) {
      setError('Voer een geldig domein in, bijv. mijnpraktijk.nl');
      return;
    }

    setSaving(true);
    setError('');

    try {
      // Save custom domain to the site
      const res = await fetch('/api/domains/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: trimmed, siteId }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Kon domein niet koppelen');
      } else {
        setSaved(true);
      }
    } catch {
      setError('Er ging iets mis. Probeer het opnieuw.');
    } finally {
      setSaving(false);
    }
  };

  if (saved) {
    const trimmed = domain.trim().toLowerCase();
    return (
      <div className="bg-white rounded-xl border border-slate-200/60 p-6 space-y-5">
        <div className="flex items-center gap-2 text-emerald-600">
          <span className="material-symbols-outlined text-xl">check_circle</span>
          <h3 className="text-sm font-semibold">Domein gekoppeld!</h3>
        </div>
        <p className="text-sm text-slate-600">
          Stel nu de volgende DNS-records in bij je domeinprovider:
        </p>
        <DNSInstructions domain={trimmed} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200/60 p-6">
      <div className="flex items-center gap-2 mb-1">
        <span className="material-symbols-outlined text-slate-400 text-xl">link</span>
        <h3 className="text-sm font-semibold text-slate-900">Bestaand domein koppelen</h3>
      </div>
      <p className="text-xs text-slate-500 mb-4">
        Heb je al een domeinnaam? Koppel deze aan je website en stel de DNS-records in.
      </p>

      <form onSubmit={handleSave} className="space-y-4">
        <input
          type="text"
          value={domain}
          onChange={(e) => { setDomain(e.target.value); setError(''); }}
          placeholder="mijnpraktijk.nl"
          className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={!domain.trim() || saving}
          className="px-5 py-2.5 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? 'Opslaan...' : 'Domein koppelen'}
        </button>
      </form>

      {/* DNS instructions preview */}
      <div className="mt-6 pt-5 border-t border-slate-100">
        <p className="text-xs font-medium text-slate-700 mb-3">
          Na het koppelen stel je deze DNS-records in:
        </p>
        <DNSInstructions domain="jouwdomein.nl" />
      </div>
    </div>
  );
}

function DNSInstructions({ domain }: { domain: string }) {
  const isWww = domain.startsWith('www.');
  const rootDomain = isWww ? domain.replace('www.', '') : domain;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="text-left text-slate-500 border-b border-slate-100">
            <th className="pb-2 pr-4 font-medium">Type</th>
            <th className="pb-2 pr-4 font-medium">Naam</th>
            <th className="pb-2 font-medium">Waarde</th>
          </tr>
        </thead>
        <tbody className="text-slate-700">
          <tr className="border-b border-slate-50">
            <td className="py-2 pr-4 font-mono font-medium">A</td>
            <td className="py-2 pr-4 font-mono">@</td>
            <td className="py-2 font-mono">76.76.21.21</td>
          </tr>
          <tr>
            <td className="py-2 pr-4 font-mono font-medium">CNAME</td>
            <td className="py-2 pr-4 font-mono">www</td>
            <td className="py-2 font-mono">cname.vercel-dns.com</td>
          </tr>
        </tbody>
      </table>
      <p className="text-[11px] text-slate-400 mt-3">
        Het kan tot 24-48 uur duren voordat DNS-wijzigingen actief zijn.
      </p>
    </div>
  );
}
