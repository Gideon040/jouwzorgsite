// components/wizard/steps/StepSubdomain.tsx

'use client';

import { useState, useEffect } from 'react';
import { Input, Checkbox, Card } from '@/components/ui';
import { slugify, isValidSubdomain, isReservedSubdomain } from '@/lib/utils';

interface StepSubdomainProps {
  value: string;
  naam: string; // To suggest subdomain based on name
  onChange: (subdomain: string) => void;
}

export function StepSubdomain({ value, naam, onChange }: StepSubdomainProps) {
  const [availability, setAvailability] = useState<'checking' | 'available' | 'taken' | null>(null);
  const [wantsCustomDomain, setWantsCustomDomain] = useState(false);
  const [customDomain, setCustomDomain] = useState('');

  // Generate suggestion from name if empty
  useEffect(() => {
    if (!value && naam) {
      const suggestion = slugify(naam.split(' ')[0].toLowerCase());
      if (suggestion) {
        onChange(suggestion);
      }
    }
  }, [naam]);

  // Check availability (mock for now)
  useEffect(() => {
    if (!value) {
      setAvailability(null);
      return;
    }

    if (!isValidSubdomain(value)) {
      setAvailability(null);
      return;
    }

    if (isReservedSubdomain(value)) {
      setAvailability('taken');
      return;
    }

    setAvailability('checking');
    // Mock availability check - in real app, this would call Supabase
    const timer = setTimeout(() => {
      setAvailability('available');
    }, 500);

    return () => clearTimeout(timer);
  }, [value]);

  const handleSubdomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = slugify(e.target.value.toLowerCase());
    onChange(newValue);
  };

  const isValid = isValidSubdomain(value);
  const showError = value && !isValid;

  return (
    <div className="p-6 md:p-8 flex flex-col gap-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold leading-tight mb-2">
          Kies je websiteadres
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-base">
          Dit is de link die je deelt met je cliënten.
        </p>
      </div>

      {/* Subdomain Input */}
      <Card className="p-6" variant="outline">
        <div className="flex flex-col gap-4">
          <label className="text-slate-900 dark:text-white text-base font-semibold">
            Kies een gratis adres
          </label>

          <div className="flex items-stretch">
            <input
              type="text"
              value={value}
              onChange={handleSubdomainChange}
              className="form-input flex-1 rounded-lg rounded-r-none text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-primary focus:ring-2 focus:ring-primary/20 h-14 px-4 text-base font-medium"
              placeholder="jouwnaam"
            />
            <div className="flex items-center px-4 bg-slate-50 dark:bg-slate-800 border border-l-0 border-slate-200 dark:border-slate-700 rounded-r-lg text-slate-500 dark:text-slate-400 font-medium">
              .jouwzorgsite.nl
            </div>
          </div>

          {/* Status */}
          {showError && (
            <div className="flex items-center gap-2 text-red-500 text-sm">
              <span className="material-symbols-outlined text-lg">error</span>
              <span>Minimaal 3 tekens, alleen letters, cijfers en streepjes</span>
            </div>
          )}

          {availability === 'checking' && (
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
              <span>Beschikbaarheid controleren...</span>
            </div>
          )}

          {availability === 'available' && isValid && (
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium text-sm">
              <span className="material-symbols-outlined text-lg">check_circle</span>
              <span>Beschikbaar!</span>
            </div>
          )}

          {availability === 'taken' && (
            <div className="flex items-center gap-2 text-red-500 text-sm">
              <span className="material-symbols-outlined text-lg">error</span>
              <span>Dit adres is al in gebruik</span>
            </div>
          )}

          {/* Preview */}
          {value && isValid && (
            <div className="p-3 bg-blue-50 dark:bg-primary/10 rounded-lg border border-blue-100 dark:border-primary/20">
              <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold mb-1">
                Voorbeeld van je link:
              </p>
              <p className="text-primary font-semibold break-all">
                https://{value}.jouwzorgsite.nl
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Custom Domain Upsell */}
      <Card className="p-5 border-2 border-primary/20 bg-primary/5 dark:bg-primary/10">
        <div className="flex items-start gap-4">
          <div className="flex items-center h-6">
            <input
              type="checkbox"
              checked={wantsCustomDomain}
              onChange={(e) => setWantsCustomDomain(e.target.checked)}
              className="w-5 h-5 text-primary border-slate-300 rounded focus:ring-primary"
            />
          </div>
          <div className="flex flex-col flex-1 gap-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-slate-900 dark:text-white text-base font-bold">
                  Eigen .nl domeinnaam?
                </span>
                <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tight">
                  Aanbevolen
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Voor een extra professionele uitstraling.{' '}
                <span className="font-bold text-slate-900 dark:text-white">€5/maand extra</span>.
              </p>
            </div>

            {wantsCustomDomain && (
              <div className="flex items-stretch animate-in fade-in slide-in-from-top-2">
                <input
                  type="text"
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value.toLowerCase())}
                  className="form-input flex-1 rounded-lg rounded-r-none text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 h-11 px-4 text-sm focus:ring-primary focus:border-primary"
                  placeholder="jouwnaam"
                />
                <div className="flex items-center px-3 bg-slate-100 dark:bg-slate-700 border border-l-0 border-slate-200 dark:border-slate-700 rounded-r-lg text-slate-500 dark:text-slate-400 text-sm font-medium">
                  .nl
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Terms Notice */}
      <p className="text-center text-slate-400 dark:text-slate-500 text-xs">
        Door verder te gaan ga je akkoord met onze Algemene Voorwaarden.
      </p>
    </div>
  );
}
