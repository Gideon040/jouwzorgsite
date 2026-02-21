'use client';

import { BEROEPEN } from '@/constants';

type WizardStep = 1 | 2 | 3 | 4;

export type StijlKeuze = 'warm' | 'modern' | 'zakelijk' | 'energiek' | 'calm';

// Regio opties (12 provincies)
export const REGIO_OPTIES = [
  { id: 'groningen', label: 'Groningen' },
  { id: 'friesland', label: 'Friesland' },
  { id: 'drenthe', label: 'Drenthe' },
  { id: 'overijssel', label: 'Overijssel' },
  { id: 'flevoland', label: 'Flevoland' },
  { id: 'gelderland', label: 'Gelderland' },
  { id: 'utrecht', label: 'Utrecht' },
  { id: 'noord-holland', label: 'Noord-Holland' },
  { id: 'zuid-holland', label: 'Zuid-Holland' },
  { id: 'zeeland', label: 'Zeeland' },
  { id: 'noord-brabant', label: 'Noord-Brabant' },
  { id: 'limburg', label: 'Limburg' },
] as const;

export type RegioId = typeof REGIO_OPTIES[number]['id'];

// Ervaring opties
export const ERVARING_OPTIES = [
  { id: '0-2', label: '0-2 jaar', value: 1 },
  { id: '2-5', label: '2-5 jaar', value: 3 },
  { id: '5-10', label: '5-10 jaar', value: 7 },
  { id: '10-15', label: '10-15 jaar', value: 12 },
  { id: '15+', label: '15+ jaar', value: 20 },
] as const;

export type ErvaringId = typeof ERVARING_OPTIES[number]['id'];

// Beroep-specifieke placeholder teksten voor specialisatie
const SPECIALISATIE_PLACEHOLDERS: Record<string, string> = {
  verpleegkundige: 'Bijv. Gespecialiseerd in palliatieve zorg en wondzorg. Ik werk graag met ouderen in de thuissituatie.',
  verzorgende_ig: 'Bijv. Ervaren in dementiezorg en persoonlijke begeleiding. Ik richt me op het behouden van eigen regie.',
  helpende: 'Bijv. Ik help bij dagelijkse activiteiten en bied structuur. Ervaring met licht huishoudelijk werk en begeleiding.',
  kraamverzorgende: 'Bijv. Ik begeleid gezinnen in de eerste week na de bevalling. Lactatiekundige en ervaren met meerlingen.',
  thuiszorg: 'Bijv. Brede ervaring in thuiszorg, van persoonlijke verzorging tot lichte huishoudelijke hulp.',
  pgb_zorgverlener: 'Bijv. Ik bied persoonlijke zorg via PGB. Ervaring met NAH en psychiatrische problematiek.',
  anders: 'Bijv. Beschrijf kort wat je doet en wat je uniek maakt als zorgprofessional.',
};

interface WizardSectionProps {
  step: WizardStep;
  naam: string;
  setNaam: (v: string) => void;
  beroep: string;
  setBeroep: (v: string) => void;
  omschrijving: string;
  setOmschrijving: (v: string) => void;
  regio: string;
  setRegio: (v: string) => void;
  jarenErvaring: ErvaringId | '';
  setJarenErvaring: (v: ErvaringId) => void;
  stijl: StijlKeuze | '';
  setStijl: (v: StijlKeuze) => void;
  onNext: () => void;
  onBack: () => void;
}

const STIJL_OPTIES: { id: StijlKeuze; label: string; description: string; icon: string; color: string }[] = [
  {
    id: 'warm',
    label: 'Warm & Persoonlijk',
    description: 'Uitnodigend, vriendelijk, klassieke uitstraling',
    icon: 'favorite',
    color: 'from-orange-400 to-rose-400',
  },
  {
    id: 'calm',
    label: 'Zacht & Kalmerend',
    description: 'Rustgevend, sereen, zachte kleuren',
    icon: 'spa',
    color: 'from-violet-400 to-purple-400',
  },
  {
    id: 'modern',
    label: 'Modern & Fris',
    description: 'Dynamisch, energiek, met gradients',
    icon: 'bolt',
    color: 'from-cyan-400 to-blue-500',
  },
  {
    id: 'zakelijk',
    label: 'Zakelijk & Premium',
    description: 'Elegant, sophisticated, professioneel',
    icon: 'workspace_premium',
    color: 'from-emerald-600 to-teal-700',
  },
  {
    id: 'energiek',
    label: 'Energiek & Dynamisch',
    description: 'Levendig, jong, opvallend',
    icon: 'rocket_launch',
    color: 'from-orange-500 to-pink-500',
  },
];

export function WizardSection({ 
  step, naam, setNaam, beroep, setBeroep, 
  omschrijving, setOmschrijving,
  regio, setRegio, jarenErvaring, setJarenErvaring,
  stijl, setStijl, onNext, onBack,
}: WizardSectionProps) {
  // Step 3 (profiel) can ALWAYS proceed — fields are encouraged but not blocking
  const canProceed = 
    (step === 1 && naam.trim().length >= 2) ||
    (step === 2 && beroep) ||
    (step === 3) ||
    (step === 4 && stijl);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && canProceed) {
      onNext();
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`h-2 rounded-full transition-all duration-500 ${
                s < step ? 'w-12 bg-teal-600' :
                s === step ? 'w-16 bg-teal-600' :
                'w-12 bg-slate-200'
              }`} />
            </div>
          ))}
        </div>
        
        {/* Step content */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 p-8 md:p-10">
          {step === 1 && (
            <StepNaam naam={naam} setNaam={setNaam} onKeyDown={handleKeyDown} />
          )}
          
          {step === 2 && (
            <StepBeroep beroep={beroep} setBeroep={setBeroep} />
          )}
          
          {step === 3 && (
            <StepProfiel
              beroep={beroep}
              regio={regio}
              setRegio={setRegio}
              jarenErvaring={jarenErvaring}
              setJarenErvaring={setJarenErvaring}
              omschrijving={omschrijving}
              setOmschrijving={setOmschrijving}
            />
          )}
          
          {step === 4 && (
            <StepStijl
              stijl={stijl}
              setStijl={setStijl}
            />
          )}
          
          {/* Navigation */}
          <div className="flex items-center gap-4 mt-8">
            {step > 1 && (
              <button
                onClick={onBack}
                className="flex items-center gap-2 px-6 py-3 text-slate-600 hover:text-slate-900 transition-colors"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Terug
              </button>
            )}
            
            <button
              onClick={onNext}
              disabled={!canProceed}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-lg transition-all ${
                canProceed
                  ? 'bg-gradient-to-br from-teal-600 to-[#0f766e] text-white hover:shadow-lg hover:shadow-teal-600/25'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              {step === 4 ? (
                <>
                  Genereer mijn website
                  <span className="material-symbols-outlined">auto_awesome</span>
                </>
              ) : (
                <>
                  Volgende
                  <span className="material-symbols-outlined">arrow_forward</span>
                </>
              )}
            </button>
          </div>
        </div>
        
        <p className="text-center text-slate-400 mt-6 text-sm">
          Stap {step} van 4
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// SUB-COMPONENTS
// ═══════════════════════════════════════════════

function StepNaam({ 
  naam, setNaam, onKeyDown 
}: { 
  naam: string; 
  setNaam: (v: string) => void; 
  onKeyDown: (e: React.KeyboardEvent) => void;
}) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center mx-auto mb-6">
        <span className="material-symbols-outlined text-3xl text-teal-600">person</span>
      </div>
      <h2 className="text-2xl font-bold font-serif text-slate-900 mb-2">Hoe heet je?</h2>
      <p className="text-slate-500 mb-8">Je volledige naam zoals je die op je website wilt tonen</p>
      
      <input
        type="text"
        value={naam}
        onChange={(e) => setNaam(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Bijv. Lisa de Vries"
        className="w-full px-5 py-4 text-lg border-2 border-slate-200 rounded-xl focus:border-teal-600 focus:ring-0 outline-none transition-colors"
        autoFocus
      />
    </div>
  );
}

function StepBeroep({ 
  beroep, setBeroep 
}: { 
  beroep: string; 
  setBeroep: (v: string) => void;
}) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center mx-auto mb-6">
        <span className="material-symbols-outlined text-3xl text-teal-600">medical_services</span>
      </div>
      <h2 className="text-2xl font-bold font-serif text-slate-900 mb-2">Wat is je specialisatie?</h2>
      <p className="text-slate-500 mb-8">We passen je website aan op je vakgebied</p>
      
      <div className="grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto">
        {BEROEPEN.filter(b => b.id !== 'anders').map((b) => (
          <button
            key={b.id}
            onClick={() => setBeroep(b.id)}
            className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
              beroep === b.id
                ? 'border-teal-600 bg-teal-50'
                : 'border-slate-200 hover:border-teal-300'
            }`}
          >
            <span className={`material-symbols-outlined text-2xl ${
              beroep === b.id ? 'text-teal-600' : 'text-slate-400'
            }`}>
              {b.icon}
            </span>
            <div>
              <div className={`font-semibold ${beroep === b.id ? 'text-teal-700' : 'text-slate-700'}`}>
                {b.label}
              </div>
              <div className="text-sm text-slate-500">{b.description}</div>
            </div>
            {beroep === b.id && (
              <span className="material-symbols-outlined text-teal-600 ml-auto">check_circle</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function StepProfiel({
  beroep,
  regio,
  setRegio,
  jarenErvaring,
  setJarenErvaring,
  omschrijving,
  setOmschrijving,
}: {
  beroep: string;
  regio: string;
  setRegio: (v: string) => void;
  jarenErvaring: ErvaringId | '';
  setJarenErvaring: (v: ErvaringId) => void;
  omschrijving: string;
  setOmschrijving: (v: string) => void;
}) {
  const placeholder = SPECIALISATIE_PLACEHOLDERS[beroep] || SPECIALISATIE_PLACEHOLDERS.anders;

  return (
    <div>
      <div className="text-center mb-6">
        <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-3xl text-teal-600">tune</span>
        </div>
        <h2 className="text-2xl font-bold font-serif text-slate-900 mb-2">Vertel meer over jezelf</h2>
        <p className="text-slate-500">Hoe meer we weten, hoe persoonlijker je website</p>
      </div>

      {/* Regio dropdown */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Werkgebied <span className="text-slate-400">(optioneel)</span>
        </label>
        <select
          value={regio}
          onChange={(e) => setRegio(e.target.value)}
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-teal-600 focus:ring-0 outline-none transition-colors bg-white text-slate-700 appearance-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '20px' }}
        >
          <option value="">Selecteer je regio</option>
          {REGIO_OPTIES.map((r) => (
            <option key={r.id} value={r.id}>{r.label}</option>
          ))}
        </select>
      </div>

      {/* Jaren ervaring buttons */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Jaren ervaring <span className="text-slate-400">(optioneel)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {ERVARING_OPTIES.map((e) => (
            <button
              key={e.id}
              onClick={() => setJarenErvaring(e.id)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${
                jarenErvaring === e.id
                  ? 'border-teal-600 bg-teal-50 text-teal-700'
                  : 'border-slate-200 text-slate-600 hover:border-teal-300'
              }`}
            >
              {e.label}
            </button>
          ))}
        </div>
      </div>

      {/* Specialisatie textarea */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Wat maakt jou uniek? <span className="text-slate-400">(optioneel)</span>
        </label>
        <textarea
          value={omschrijving}
          onChange={(e) => setOmschrijving(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-teal-600 focus:ring-0 outline-none transition-colors resize-none text-slate-700"
        />
        <p className="text-xs text-slate-400 mt-1.5">
          Deze info helpt de AI om teksten te schrijven die echt bij jou passen
        </p>
      </div>
    </div>
  );
}

function StepStijl({
  stijl,
  setStijl,
}: {
  stijl: StijlKeuze | '';
  setStijl: (v: StijlKeuze) => void;
}) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center mx-auto mb-6">
        <span className="material-symbols-outlined text-3xl text-teal-600">palette</span>
      </div>
      <h2 className="text-2xl font-bold font-serif text-slate-900 mb-2">Kies je stijl</h2>
      <p className="text-slate-500 mb-8">Welke uitstraling past het beste bij jou?</p>
      
      <div className="grid grid-cols-1 gap-3">
        {STIJL_OPTIES.map((s) => (
          <button
            key={s.id}
            onClick={() => setStijl(s.id)}
            className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
              stijl === s.id
                ? 'border-teal-600 bg-teal-50'
                : 'border-slate-200 hover:border-teal-300'
            }`}
          >
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center flex-shrink-0`}>
              <span className="material-symbols-outlined text-white text-xl">{s.icon}</span>
            </div>
            <div>
              <div className={`font-semibold ${stijl === s.id ? 'text-teal-700' : 'text-slate-700'}`}>
                {s.label}
              </div>
              <div className="text-sm text-slate-500">{s.description}</div>
            </div>
            {stijl === s.id && (
              <span className="material-symbols-outlined text-teal-600 ml-auto">check_circle</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}