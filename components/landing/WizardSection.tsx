'use client';

import { BEROEPEN } from '@/constants';

type WizardStep = 1 | 2 | 3 | 4;

// Updated: Stijl opties die direct mappen naar de 4 templates
export type StijlKeuze = 'warm' | 'modern' | 'zakelijk' | 'energiek' | 'calm';

interface WizardSectionProps {
  step: WizardStep;
  naam: string;
  setNaam: (v: string) => void;
  beroep: string;
  setBeroep: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  omschrijving: string;
  setOmschrijving: (v: string) => void;
  stijl: StijlKeuze | '';
  setStijl: (v: StijlKeuze) => void;
  onNext: () => void;
  onBack: () => void;
  isGenerating?: boolean;
}

// Stijl opties - mappen naar templates via edge function:
// warm → editorial/mindoor
// modern → proactief
// zakelijk → portfolio
// energiek → proactief/mindoor
// calm → editorial/mindoor
const STIJL_OPTIES: { id: StijlKeuze; label: string; description: string; icon: string; color: string; templates: string }[] = [
  {
    id: 'warm',
    label: 'Warm & Persoonlijk',
    description: 'Uitnodigend, vriendelijk, klassieke uitstraling',
    icon: 'favorite',
    color: 'from-orange-400 to-rose-400',
    templates: 'Editorial of Mindoor',
  },
  {
    id: 'calm',
    label: 'Zacht & Kalmerend',
    description: 'Rustgevend, sereen, zachte kleuren',
    icon: 'spa',
    color: 'from-violet-400 to-purple-400',
    templates: 'Editorial of Mindoor',
  },
  {
    id: 'modern',
    label: 'Modern & Fris',
    description: 'Dynamisch, energiek, met gradients',
    icon: 'bolt',
    color: 'from-cyan-400 to-blue-500',
    templates: 'ProActief',
  },
  {
    id: 'zakelijk',
    label: 'Zakelijk & Premium',
    description: 'Elegant, sophisticated, professioneel',
    icon: 'workspace_premium',
    color: 'from-emerald-600 to-teal-700',
    templates: 'Portfolio',
  },
  {
    id: 'energiek',
    label: 'Energiek & Dynamisch',
    description: 'Levendig, jong, opvallend',
    icon: 'rocket_launch',
    color: 'from-orange-500 to-pink-500',
    templates: 'ProActief of Mindoor',
  },
];

export function WizardSection({ 
  step, naam, setNaam, beroep, setBeroep, email, setEmail, 
  omschrijving, setOmschrijving, stijl, setStijl, onNext, onBack, isGenerating 
}: WizardSectionProps) {
  const canProceed = 
    (step === 1 && naam.trim().length >= 2) ||
    (step === 2 && beroep) ||
    (step === 3 && email.includes('@')) ||
    (step === 4 && stijl);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && canProceed && !isGenerating) {
      onNext();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div 
              key={s}
              className={`h-2 w-12 rounded-full transition-colors ${
                s <= step ? 'bg-orange-500' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>
        
        {/* Step content */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 p-8 md:p-10">
          {step === 1 && (
            <StepNaam 
              naam={naam} 
              setNaam={setNaam} 
              onKeyDown={handleKeyDown} 
            />
          )}
          
          {step === 2 && (
            <StepBeroep 
              beroep={beroep} 
              setBeroep={setBeroep} 
            />
          )}
          
          {step === 3 && (
            <StepEmail 
              email={email} 
              setEmail={setEmail} 
              onKeyDown={handleKeyDown} 
            />
          )}
          
          {step === 4 && (
            <StepStijl
              omschrijving={omschrijving}
              setOmschrijving={setOmschrijving}
              stijl={stijl}
              setStijl={setStijl}
            />
          )}
          
          {/* Navigation */}
          <div className="flex items-center gap-4 mt-8">
            {step > 1 && (
              <button
                onClick={onBack}
                disabled={isGenerating}
                className="flex items-center gap-2 px-6 py-3 text-slate-600 hover:text-slate-900 transition-colors disabled:opacity-50"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Terug
              </button>
            )}
            
            <button
              onClick={onNext}
              disabled={!canProceed || isGenerating}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-lg transition-all ${
                canProceed && !isGenerating
                  ? 'bg-orange-500 text-white hover:bg-orange-600 hover:shadow-lg'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              {isGenerating ? (
                <>
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  Website genereren...
                </>
              ) : step === 4 ? (
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

// Sub-components voor elke stap
function StepNaam({ 
  naam, setNaam, onKeyDown 
}: { 
  naam: string; 
  setNaam: (v: string) => void; 
  onKeyDown: (e: React.KeyboardEvent) => void;
}) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center mx-auto mb-6">
        <span className="material-symbols-outlined text-3xl text-orange-600">person</span>
      </div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Hoe heet je?</h2>
      <p className="text-slate-500 mb-8">Je volledige naam zoals je die op je website wilt tonen</p>
      
      <input
        type="text"
        value={naam}
        onChange={(e) => setNaam(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Bijv. Lisa de Vries"
        className="w-full px-5 py-4 text-lg border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:ring-0 outline-none transition-colors"
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
      <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center mx-auto mb-6">
        <span className="material-symbols-outlined text-3xl text-orange-600">medical_services</span>
      </div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Wat is je specialisatie?</h2>
      <p className="text-slate-500 mb-8">We passen je website aan op je vakgebied</p>
      
      <div className="grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto">
        {BEROEPEN.filter(b => b.id !== 'anders').map((b) => (
          <button
            key={b.id}
            onClick={() => setBeroep(b.id)}
            className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
              beroep === b.id 
                ? 'border-orange-500 bg-orange-50' 
                : 'border-slate-200 hover:border-orange-300'
            }`}
          >
            <span className={`material-symbols-outlined text-2xl ${
              beroep === b.id ? 'text-orange-600' : 'text-slate-400'
            }`}>
              {b.icon}
            </span>
            <div>
              <div className={`font-semibold ${beroep === b.id ? 'text-orange-700' : 'text-slate-700'}`}>
                {b.label}
              </div>
              <div className="text-sm text-slate-500">{b.description}</div>
            </div>
            {beroep === b.id && (
              <span className="material-symbols-outlined text-orange-500 ml-auto">check_circle</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function StepEmail({ 
  email, setEmail, onKeyDown 
}: { 
  email: string; 
  setEmail: (v: string) => void; 
  onKeyDown: (e: React.KeyboardEvent) => void;
}) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center mx-auto mb-6">
        <span className="material-symbols-outlined text-3xl text-orange-600">mail</span>
      </div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Wat is je e-mailadres?</h2>
      <p className="text-slate-500 mb-8">Hiermee log je later in en ontvangen cliënten je</p>
      
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="je@email.nl"
        className="w-full px-5 py-4 text-lg border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:ring-0 outline-none transition-colors"
        autoFocus
      />
      
      <p className="text-xs text-slate-400 mt-4">
        We sturen je geen spam. Alleen info over je website.
      </p>
    </div>
  );
}

function StepStijl({
  omschrijving,
  setOmschrijving,
  stijl,
  setStijl,
}: {
  omschrijving: string;
  setOmschrijving: (v: string) => void;
  stijl: StijlKeuze | '';
  setStijl: (v: StijlKeuze) => void;
}) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center mx-auto mb-6">
        <span className="material-symbols-outlined text-3xl text-orange-600">auto_awesome</span>
      </div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Bijna klaar!</h2>
      <p className="text-slate-500 mb-8">Vertel iets over jezelf zodat we de perfecte website kunnen maken</p>
      
      {/* Omschrijving textarea */}
      <div className="mb-8 text-left">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Vertel kort iets over jezelf of je praktijk <span className="text-slate-400">(optioneel)</span>
        </label>
        <textarea
          value={omschrijving}
          onChange={(e) => setOmschrijving(e.target.value)}
          placeholder="Bijv. 'Ik werk vooral met ouderen in de thuiszorg en hecht waarde aan persoonlijk contact' of 'Net gestart als ZZP'er, kom uit het ziekenhuis'..."
          className="w-full px-4 py-3 text-base border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:ring-0 outline-none transition-colors resize-none"
          rows={3}
        />
        <p className="text-xs text-slate-400 mt-2">
          Dit helpt ons de juiste stijl en teksten te kiezen
        </p>
      </div>
      
      {/* Stijl keuze */}
      <div className="text-left">
        <label className="block text-sm font-medium text-slate-700 mb-3">
          Welke sfeer past bij jou?
        </label>
        <div className="grid grid-cols-1 gap-3">
          {STIJL_OPTIES.map((optie) => (
            <button
              key={optie.id}
              onClick={() => setStijl(optie.id)}
              className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                stijl === optie.id 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-slate-200 hover:border-orange-300'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${optie.color} flex items-center justify-center flex-shrink-0`}>
                <span className="material-symbols-outlined text-2xl text-white">
                  {optie.icon}
                </span>
              </div>
              <div className="flex-1">
                <div className={`font-semibold ${stijl === optie.id ? 'text-orange-700' : 'text-slate-700'}`}>
                  {optie.label}
                </div>
                <div className="text-sm text-slate-500">{optie.description}</div>
              </div>
              {stijl === optie.id && (
                <span className="material-symbols-outlined text-orange-500 ml-auto">check_circle</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
