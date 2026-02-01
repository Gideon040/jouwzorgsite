'use client';

import { useState } from 'react';
import { Site, SiteContent, Certificaat } from '@/types';

interface BigResult {
  volledigeNaam: string;
  bigNummer: string;
  beroep: string;
  beroepCode: string;
  isGeldig: boolean;
  specialismen: { code: string; naam: string }[];
  werkadres: {
    straat: string;
    huisnummer: string;
    postcode: string;
    stad: string;
  } | null;
}

interface VerificationSectionProps {
  site: Site;
  content: SiteContent;
  setContent: (c: SiteContent) => void;
  onContinue: () => void;
  onBack: () => void;
}

export function VerificationSection({
  site,
  content,
  setContent,
  onContinue,
  onBack,
}: VerificationSectionProps) {
  // BIG verification state
  const [bigSearchName, setBigSearchName] = useState(content.naam || '');
  const [bigSearchInitials, setBigSearchInitials] = useState('');
  const [bigResults, setBigResults] = useState<BigResult[]>([]);
  const [isSearchingBig, setIsSearchingBig] = useState(false);
  const [bigError, setBigError] = useState<string | null>(null);
  const [selectedBig, setSelectedBig] = useState<BigResult | null>(null);
  
  // KvK state (placeholder voor later)
  const [kvkNumber, setKvkNumber] = useState('');
  
  // Check if any verification is added
  const hasVerification = selectedBig !== null || kvkNumber.length === 8;

  // Search BIG register
  const handleBigSearch = async () => {
    if (!bigSearchName.trim()) return;
    
    setIsSearchingBig(true);
    setBigError(null);
    setBigResults([]);
    
    try {
      const params = new URLSearchParams({
        naam: bigSearchName.trim(),
      });
      if (bigSearchInitials.trim()) {
        params.append('initials', bigSearchInitials.trim());
      }
      
      const response = await fetch(`/api/big/verify?${params}`);
      const data = await response.json();
      
      if (data.error) {
        setBigError(data.error);
        if (data.hint) {
          setBigError(`${data.error}. ${data.hint}`);
        }
      } else if (data.results && data.results.length > 0) {
        setBigResults(data.results);
      } else {
        setBigError('Geen resultaten gevonden. Controleer de naam en probeer opnieuw.');
      }
    } catch (err) {
      console.error('BIG search error:', err);
      setBigError('Er ging iets mis. Probeer het later opnieuw.');
    } finally {
      setIsSearchingBig(false);
    }
  };

  // Select a BIG result
  const handleSelectBig = (result: BigResult) => {
    setSelectedBig(result);
    
    // Add to certificaten
    const bigCertificaat: Certificaat = {
      type: 'big',
      label: 'BIG-registratie',
      value: result.bigNummer,
      sublabel: result.beroep,
    };
    
    // Update content with BIG certificaat
    const existingCerts = content.certificaten?.filter(c => c.type !== 'big') || [];
    setContent({
      ...content,
      certificaten: [...existingCerts, bigCertificaat],
    });
  };

  // Remove BIG selection
  const handleRemoveBig = () => {
    setSelectedBig(null);
    const existingCerts = content.certificaten?.filter(c => c.type !== 'big') || [];
    setContent({
      ...content,
      certificaten: existingCerts,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            <span className="hidden sm:inline">Terug naar preview</span>
          </button>
          
          <div className="flex items-center gap-3">
            <button
              onClick={onContinue}
              className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition-colors"
            >
              <span>{hasVerification ? 'Doorgaan' : 'Overslaan'}</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Title */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-3xl text-emerald-600">verified</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-3">
            Verificatie toevoegen
          </h1>
          <p className="text-lg text-slate-600 max-w-lg mx-auto">
            Voeg je officiële registraties toe voor extra vertrouwen bij cliënten.
            <span className="text-slate-400"> Dit is optioneel.</span>
          </p>
        </div>

        {/* Verification Options */}
        <div className="space-y-6">
          
          {/* BIG Verificatie */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <span className="material-symbols-outlined text-emerald-600">medical_information</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">BIG-registratie</h3>
                    <p className="text-sm text-slate-500">Officiële verificatie via het BIG-register</p>
                  </div>
                </div>
                {selectedBig && (
                  <span className="flex items-center gap-1 text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                    <span className="material-symbols-outlined text-base">check</span>
                    Toegevoegd
                  </span>
                )}
              </div>
            </div>
            
            <div className="p-6">
              {selectedBig ? (
                // Show selected BIG
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-emerald-600">verified</span>
                        <span className="font-bold text-emerald-800">{selectedBig.volledigeNaam}</span>
                      </div>
                      <p className="text-sm text-emerald-700 mb-1">
                        {selectedBig.beroep}
                      </p>
                      <p className="text-sm text-emerald-600 font-mono">
                        BIG-nummer: {selectedBig.bigNummer}
                      </p>
                      {selectedBig.specialismen.length > 0 && (
                        <p className="text-sm text-emerald-600 mt-1">
                          Specialismen: {selectedBig.specialismen.map(s => s.naam).join(', ')}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={handleRemoveBig}
                      className="text-emerald-600 hover:text-emerald-800 p-1"
                    >
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>
                </div>
              ) : (
                // Search form
                <>
                  <div className="flex flex-col sm:flex-row gap-3 mb-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-slate-700 mb-1">Achternaam</label>
                      <input
                        type="text"
                        value={bigSearchName}
                        onChange={(e) => setBigSearchName(e.target.value)}
                        placeholder="Jansen"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-orange-500 focus:ring-0 outline-none"
                        onKeyDown={(e) => e.key === 'Enter' && handleBigSearch()}
                      />
                    </div>
                    <div className="w-full sm:w-32">
                      <label className="block text-sm font-medium text-slate-700 mb-1">Initialen</label>
                      <input
                        type="text"
                        value={bigSearchInitials}
                        onChange={(e) => setBigSearchInitials(e.target.value)}
                        placeholder="A.B."
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-orange-500 focus:ring-0 outline-none"
                        onKeyDown={(e) => e.key === 'Enter' && handleBigSearch()}
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        onClick={handleBigSearch}
                        disabled={!bigSearchName.trim() || isSearchingBig}
                        className={`w-full sm:w-auto px-6 py-2.5 rounded-lg font-medium transition-colors ${
                          bigSearchName.trim() && !isSearchingBig
                            ? 'bg-slate-900 text-white hover:bg-slate-800'
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        {isSearchingBig ? (
                          <span className="flex items-center gap-2">
                            <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
                            Zoeken...
                          </span>
                        ) : (
                          'Zoeken'
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-xs text-slate-400 mb-4">
                    Tip: Voeg initialen toe voor preciezere resultaten
                  </p>
                  
                  {/* Error */}
                  {bigError && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl mb-4">
                      <p className="text-sm text-red-600 flex items-center gap-2">
                        <span className="material-symbols-outlined text-base">error</span>
                        {bigError}
                      </p>
                    </div>
                  )}
                  
                  {/* Results */}
                  {bigResults.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-slate-700">
                        {bigResults.length} resultaat{bigResults.length !== 1 ? 'en' : ''} gevonden:
                      </p>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {bigResults.map((result, index) => (
                          <button
                            key={index}
                            onClick={() => handleSelectBig(result)}
                            className="w-full text-left p-4 border border-slate-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold text-slate-900">{result.volledigeNaam}</p>
                                <p className="text-sm text-slate-600">{result.beroep}</p>
                                <p className="text-xs text-slate-400 font-mono mt-1">
                                  BIG: {result.bigNummer}
                                </p>
                                {result.werkadres?.stad && (
                                  <p className="text-xs text-slate-400 mt-1">
                                    📍 {result.werkadres.stad}
                                  </p>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                {result.isGeldig ? (
                                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                                    Geldig
                                  </span>
                                ) : (
                                  <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                                    Verlopen
                                  </span>
                                )}
                                <span className="material-symbols-outlined text-slate-400">
                                  chevron_right
                                </span>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* KvK Verificatie */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <span className="material-symbols-outlined text-blue-600">business</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">KvK-nummer</h3>
                    <p className="text-sm text-slate-500">Kamer van Koophandel inschrijving</p>
                  </div>
                </div>
                <span className="text-xs bg-slate-100 text-slate-500 px-3 py-1 rounded-full">
                  Binnenkort beschikbaar
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={kvkNumber}
                  onChange={(e) => setKvkNumber(e.target.value.replace(/\D/g, '').slice(0, 8))}
                  placeholder="12345678"
                  maxLength={8}
                  disabled
                  className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-400 cursor-not-allowed"
                />
                <button
                  disabled
                  className="px-6 py-2.5 bg-slate-100 text-slate-400 rounded-lg cursor-not-allowed"
                >
                  Verifiëren
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                KvK verificatie wordt binnenkort toegevoegd
              </p>
            </div>
          </div>

          {/* Continue section */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              {hasVerification ? 'Verificatie toegevoegd!' : 'Verificatie is optioneel'}
            </h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              {hasVerification 
                ? 'Je BIG-registratie wordt op je website getoond. Je kunt nu doorgaan naar de laatste stap.'
                : 'Je kunt altijd later verificaties toevoegen via je dashboard. Wil je nu doorgaan?'
              }
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 px-6 py-3 text-slate-600 hover:text-slate-900 transition-colors"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Terug naar preview
              </button>
              <button
                onClick={onContinue}
                className="flex items-center gap-3 px-8 py-4 bg-orange-500 text-white rounded-xl font-bold text-lg hover:bg-orange-600 transition-all hover:shadow-xl hover:shadow-orange-500/25"
              >
                {hasVerification ? 'Doorgaan naar checkout' : 'Overslaan en doorgaan'}
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
