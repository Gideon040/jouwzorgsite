// components/wizard/steps/StepProfessional.tsx
// Professional features: beschikbaar badge, jaren ervaring, expertises

'use client';

import { useState } from 'react';
import { Input, Checkbox } from '@/components/ui';
import { SiteContent } from '@/types';

// Suggesties voor expertises per beroep
const EXPERTISE_SUGGESTIES: Record<string, string[]> = {
  verpleegkundige: [
    'Palliatieve zorg',
    'Wondzorg',
    'Klinisch redeneren',
    'Dementiezorg',
    'Medicatiebeheer',
    'Pijnbestrijding',
    'Oncologie',
    'Post-operatieve zorg',
    'Diabeteszorg',
    'COPD zorg',
  ],
  verzorgende_ig: [
    'Persoonlijke verzorging',
    'Huishoudelijke hulp',
    'Begeleiding',
    'Palliatieve zorg',
    'Dementiezorg',
    'Mobiliteit',
    'Dagbesteding',
  ],
  helpende: [
    'Huishoudelijke hulp',
    'Boodschappen',
    'Maaltijdbereiding',
    'Gezelschap',
    'Lichte verzorging',
  ],
  kraamverzorgende: [
    'Borstvoeding',
    'Babyverzorging',
    'Kraamzorg',
    'Lactatiekunde',
    'Thuisbevalling',
  ],
  thuiszorg: [
    'ADL ondersteuning',
    'Medicatiebegeleiding',
    'Dagstructuur',
    'Huishouden',
    'Sociale activering',
  ],
  pgb_zorgverlener: [
    'Persoonlijke begeleiding',
    'Dagbesteding',
    'Vervoer',
    'Administratie',
    'Sociale ondersteuning',
  ],
  anders: [
    'Persoonlijke zorg',
    'Begeleiding',
    'Ondersteuning',
  ],
};

interface StepProfessionalProps {
  content: Partial<SiteContent>;
  beroep: string;
  onChange: (updates: Partial<SiteContent>) => void;
}

export function StepProfessional({ content, beroep, onChange }: StepProfessionalProps) {
  const [nieuwExpertise, setNieuwExpertise] = useState('');
  
  const suggesties = EXPERTISE_SUGGESTIES[beroep] || EXPERTISE_SUGGESTIES.anders;
  const huidigeExpertises = content.expertises || [];

  const toggleExpertise = (expertise: string) => {
    if (huidigeExpertises.includes(expertise)) {
      onChange({ expertises: huidigeExpertises.filter(e => e !== expertise) });
    } else {
      onChange({ expertises: [...huidigeExpertises, expertise] });
    }
  };

  const voegExpertiseToe = () => {
    if (nieuwExpertise.trim() && !huidigeExpertises.includes(nieuwExpertise.trim())) {
      onChange({ expertises: [...huidigeExpertises, nieuwExpertise.trim()] });
      setNieuwExpertise('');
    }
  };

  const currentYear = new Date().getFullYear();
  const jarenOptions = Array.from({ length: 40 }, (_, i) => currentYear - i);

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Professionele details
        </h2>
        <p className="text-slate-500">
          Deze informatie helpt potentiële cliënten om u beter te leren kennen.
        </p>
      </div>

      <div className="space-y-8">
        {/* Beschikbaar Badge */}
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
          <label className="flex items-start gap-4 cursor-pointer">
            <input
              type="checkbox"
              checked={content.beschikbaar || false}
              onChange={(e) => onChange({ beschikbaar: e.target.checked })}
              className="mt-1 w-5 h-5 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
            />
            <div>
              <span className="font-bold text-emerald-800 block">
                Beschikbaar voor opdrachten
              </span>
              <span className="text-sm text-emerald-600">
                Toon een badge op je website dat je momenteel beschikbaar bent
              </span>
            </div>
          </label>
        </div>

        {/* Jaren Ervaring */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            Wanneer bent u begonnen in de zorg?
          </label>
          <p className="text-sm text-slate-500 mb-3">
            Dit wordt getoond als "X jaar ervaring" op uw website
          </p>
          <select
            value={content.start_carriere || ''}
            onChange={(e) => onChange({ start_carriere: e.target.value ? parseInt(e.target.value) : undefined })}
            className="w-full md:w-64 h-12 px-4 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
          >
            <option value="">-- Selecteer jaar --</option>
            {jarenOptions.map(jaar => (
              <option key={jaar} value={jaar}>{jaar}</option>
            ))}
          </select>
          {content.start_carriere && (
            <p className="mt-2 text-sm text-primary font-medium">
              → {currentYear - content.start_carriere} jaar ervaring
            </p>
          )}
        </div>

        {/* Expertises */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            Uw expertises & specialisaties
          </label>
          <p className="text-sm text-slate-500 mb-4">
            Selecteer of voeg uw specialisaties toe
          </p>

          {/* Suggesties */}
          <div className="flex flex-wrap gap-2 mb-4">
            {suggesties.map(expertise => (
              <button
                key={expertise}
                type="button"
                onClick={() => toggleExpertise(expertise)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  huidigeExpertises.includes(expertise)
                    ? 'bg-primary text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {huidigeExpertises.includes(expertise) && (
                  <span className="material-symbols-outlined text-sm mr-1 align-middle">check</span>
                )}
                {expertise}
              </button>
            ))}
          </div>

          {/* Custom expertise toevoegen */}
          <div className="flex gap-2">
            <Input
              value={nieuwExpertise}
              onChange={(e) => setNieuwExpertise(e.target.value)}
              placeholder="Voeg eigen expertise toe..."
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), voegExpertiseToe())}
            />
            <button
              type="button"
              onClick={voegExpertiseToe}
              disabled={!nieuwExpertise.trim()}
              className="px-4 h-12 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>

          {/* Geselecteerde expertises */}
          {huidigeExpertises.length > 0 && (
            <div className="mt-4 p-4 bg-slate-50 rounded-xl">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
                Geselecteerd ({huidigeExpertises.length})
              </p>
              <div className="flex flex-wrap gap-2">
                {huidigeExpertises.map(expertise => (
                  <span
                    key={expertise}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm"
                  >
                    {expertise}
                    <button
                      type="button"
                      onClick={() => toggleExpertise(expertise)}
                      className="text-slate-400 hover:text-red-500"
                    >
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
