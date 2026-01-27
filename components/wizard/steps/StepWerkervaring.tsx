// components/wizard/steps/StepWerkervaring.tsx
// Werkervaring timeline voor Professional pakket

'use client';

import { useState } from 'react';
import { Input, Textarea, Button } from '@/components/ui';
import { SiteContent, Werkervaring } from '@/types';

interface StepWerkervaringProps {
  content: Partial<SiteContent>;
  onChange: (updates: Partial<SiteContent>) => void;
  addWerkervaring: (item: Werkervaring) => void;
  removeWerkervaring: (index: number) => void;
}

export function StepWerkervaring({ 
  content, 
  onChange, 
  addWerkervaring, 
  removeWerkervaring 
}: StepWerkervaringProps) {
  const [showForm, setShowForm] = useState(false);
  const [nieuw, setNieuw] = useState<Partial<Werkervaring>>({
    functie: '',
    werkgever: '',
    start_jaar: new Date().getFullYear() - 1,
    eind_jaar: undefined,
    beschrijving: '',
  });
  const [isHuidig, setIsHuidig] = useState(false);

  const werkervaring = content.werkervaring || [];
  const currentYear = new Date().getFullYear();
  const jarenOptions = Array.from({ length: 50 }, (_, i) => currentYear - i);

  const handleAdd = () => {
    if (nieuw.functie && nieuw.werkgever && nieuw.start_jaar) {
      addWerkervaring({
        functie: nieuw.functie,
        werkgever: nieuw.werkgever,
        start_jaar: nieuw.start_jaar,
        eind_jaar: isHuidig ? undefined : nieuw.eind_jaar,
        beschrijving: nieuw.beschrijving,
      });
      setNieuw({
        functie: '',
        werkgever: '',
        start_jaar: currentYear - 1,
        eind_jaar: undefined,
        beschrijving: '',
      });
      setIsHuidig(false);
      setShowForm(false);
    }
  };

  const formatPeriode = (item: Werkervaring) => {
    if (item.eind_jaar) {
      return `${item.start_jaar} - ${item.eind_jaar}`;
    }
    return `${item.start_jaar} - Heden`;
  };

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Werkervaring
        </h2>
        <p className="text-slate-500">
          Voeg uw werkervaring toe om vertrouwen op te bouwen bij potentiële cliënten.
          <span className="block text-sm text-slate-400 mt-1">
            (Optioneel - u kunt deze stap overslaan)
          </span>
        </p>
      </div>

      {/* Bestaande werkervaring */}
      {werkervaring.length > 0 && (
        <div className="relative border-l-2 border-primary/20 ml-4 mb-8 space-y-6">
          {werkervaring.map((item, index) => (
            <div key={index} className="relative pl-8">
              {/* Timeline dot */}
              <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 border-white ${
                !item.eind_jaar ? 'bg-primary' : 'bg-primary/40'
              }`} />
              
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-slate-900">{item.functie}</h3>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        !item.eind_jaar 
                          ? 'bg-primary/10 text-primary' 
                          : 'bg-slate-200 text-slate-600'
                      }`}>
                        {formatPeriode(item)}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-slate-600">{item.werkgever}</p>
                    {item.beschrijving && (
                      <p className="text-sm text-slate-500 mt-2">{item.beschrijving}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeWerkervaring(index)}
                    className="text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add form */}
      {showForm ? (
        <div className="bg-white border-2 border-primary/20 rounded-xl p-6 space-y-4">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">add_circle</span>
            Werkervaring toevoegen
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Functie *
              </label>
              <Input
                value={nieuw.functie || ''}
                onChange={(e) => setNieuw({ ...nieuw, functie: e.target.value })}
                placeholder="bijv. Wijkverpleegkundige"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Werkgever *
              </label>
              <Input
                value={nieuw.werkgever || ''}
                onChange={(e) => setNieuw({ ...nieuw, werkgever: e.target.value })}
                placeholder="bijv. Buurtzorg Nederland"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Startjaar *
              </label>
              <select
                value={nieuw.start_jaar || ''}
                onChange={(e) => setNieuw({ ...nieuw, start_jaar: parseInt(e.target.value) })}
                className="w-full h-12 px-4 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              >
                {jarenOptions.map(jaar => (
                  <option key={jaar} value={jaar}>{jaar}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Eindjaar
              </label>
              <div className="flex items-center gap-3">
                <select
                  value={nieuw.eind_jaar || ''}
                  onChange={(e) => setNieuw({ ...nieuw, eind_jaar: e.target.value ? parseInt(e.target.value) : undefined })}
                  disabled={isHuidig}
                  className="flex-1 h-12 px-4 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none disabled:bg-slate-100 disabled:text-slate-400"
                >
                  <option value="">Selecteer...</option>
                  {jarenOptions.filter(j => j >= (nieuw.start_jaar || 0)).map(jaar => (
                    <option key={jaar} value={jaar}>{jaar}</option>
                  ))}
                </select>
                <label className="flex items-center gap-2 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={isHuidig}
                    onChange={(e) => {
                      setIsHuidig(e.target.checked);
                      if (e.target.checked) {
                        setNieuw({ ...nieuw, eind_jaar: undefined });
                      }
                    }}
                    className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-medium text-slate-700">Heden</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Beschrijving (optioneel)
            </label>
            <Textarea
              value={nieuw.beschrijving || ''}
              onChange={(e) => setNieuw({ ...nieuw, beschrijving: e.target.value })}
              placeholder="Korte beschrijving van uw werkzaamheden..."
              rows={2}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button onClick={handleAdd} disabled={!nieuw.functie || !nieuw.werkgever}>
              <span className="material-symbols-outlined">add</span>
              Toevoegen
            </Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>
              Annuleren
            </Button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="w-full p-6 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined">add_circle</span>
          Werkervaring toevoegen
        </button>
      )}

      {/* Help text */}
      <div className="mt-6 p-4 bg-blue-50 rounded-xl">
        <p className="text-sm text-blue-700">
          <span className="material-symbols-outlined text-sm align-middle mr-1">lightbulb</span>
          <strong>Tip:</strong> Begin met uw meest recente of huidige functie. 
          Werkervaring toont professionaliteit en bouwt vertrouwen op.
        </p>
      </div>
    </div>
  );
}
