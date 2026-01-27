// components/wizard/steps/StepDiensten.tsx

'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Checkbox, Input, Textarea } from '@/components/ui';
import { Dienst } from '@/types';
import { getDienstenForBeroep, DienstPreset } from '@/constants';

interface StepDienstenProps {
  beroep: string;
  diensten: Dienst[];
  onDienstenChange: (diensten: Dienst[]) => void;
}

export function StepDiensten({ beroep, diensten, onDienstenChange }: StepDienstenProps) {
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customNaam, setCustomNaam] = useState('');
  const [customBeschrijving, setCustomBeschrijving] = useState('');

  const presets = getDienstenForBeroep(beroep);

  const isDienstSelected = (presetId: string) => {
    return diensten.some((d) => d.naam === presets.find((p) => p.id === presetId)?.naam);
  };

  const toggleDienst = (preset: DienstPreset) => {
    if (isDienstSelected(preset.id)) {
      onDienstenChange(diensten.filter((d) => d.naam !== preset.naam));
    } else {
      onDienstenChange([
        ...diensten,
        { naam: preset.naam, beschrijving: preset.beschrijving, icon: preset.icon },
      ]);
    }
  };

  const updateDienstBeschrijving = (naam: string, beschrijving: string) => {
    onDienstenChange(
      diensten.map((d) => (d.naam === naam ? { ...d, beschrijving } : d))
    );
  };

  const addCustomDienst = () => {
    if (customNaam.trim()) {
      onDienstenChange([
        ...diensten,
        { naam: customNaam.trim(), beschrijving: customBeschrijving.trim() || undefined },
      ]);
      setCustomNaam('');
      setCustomBeschrijving('');
      setShowCustomForm(false);
    }
  };

  return (
    <div className="p-6 md:p-8 flex flex-col gap-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold leading-tight mb-2">
          Diensten & Specialisaties
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-base">
          Geef aan welke zorgdiensten u aanbiedt.
        </p>
      </div>

      {/* Diensten List */}
      <div className="flex flex-col gap-4">
        {presets.map((preset) => {
          const isSelected = isDienstSelected(preset.id);
          const selectedDienst = diensten.find((d) => d.naam === preset.naam);

          return (
            <div
              key={preset.id}
              className={cn(
                'flex flex-col bg-white dark:bg-slate-900 rounded-xl p-5 transition-all',
                'border-2',
                isSelected
                  ? 'border-primary shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 hover:border-primary/50 opacity-80 hover:opacity-100'
              )}
            >
              <label className="flex items-center gap-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleDienst(preset)}
                  className="h-6 w-6 rounded border-2 border-slate-300 dark:border-slate-600 text-primary bg-transparent checked:bg-primary checked:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer transition-all"
                />
                <div className="flex-1">
                  <span className="text-slate-900 dark:text-white text-lg font-bold">
                    {preset.naam}
                  </span>
                </div>
                {preset.icon && (
                  <span className="material-symbols-outlined text-slate-400">
                    {preset.icon}
                  </span>
                )}
              </label>

              {/* Beschrijving textarea when selected */}
              {isSelected && (
                <div className="mt-4 animate-in slide-in-from-top-2">
                  <Textarea
                    placeholder="Beschrijf uw ervaring of specialisatie (optioneel)..."
                    value={selectedDienst?.beschrijving || ''}
                    onChange={(e) => updateDienstBeschrijving(preset.naam, e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>
              )}
            </div>
          );
        })}

        {/* Add Custom Dienst */}
        {showCustomForm ? (
          <div className="border-2 border-dashed border-primary rounded-xl p-5 space-y-4">
            <Input
              label="Naam dienst"
              placeholder="Bijv. Nachtdiensten"
              value={customNaam}
              onChange={(e) => setCustomNaam(e.target.value)}
            />
            <Textarea
              label="Beschrijving (optioneel)"
              placeholder="Beschrijf de dienst..."
              value={customBeschrijving}
              onChange={(e) => setCustomBeschrijving(e.target.value)}
              className="min-h-[80px]"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={addCustomDienst}
                className="flex-1 bg-primary text-white px-4 py-2 rounded-lg font-bold hover:bg-primary/90 transition-colors"
              >
                Toevoegen
              </button>
              <button
                type="button"
                onClick={() => setShowCustomForm(false)}
                className="px-4 py-2 rounded-lg font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Annuleren
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowCustomForm(true)}
            className="flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 dark:border-slate-700 p-6 rounded-xl text-primary font-bold hover:bg-primary/5 hover:border-primary transition-all"
          >
            <span className="material-symbols-outlined">add_circle</span>
            <span>Voeg eigen dienst toe</span>
          </button>
        )}
      </div>
    </div>
  );
}
