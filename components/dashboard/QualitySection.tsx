// components/dashboard/QualitySection.tsx
// Dashboard sectie voor Kwaliteit & Compliance beheer
// Hier beheert de zorgverlener BIG/KvK verificatie + zelfverklaringen

'use client';

import { useState, useEffect, useCallback } from 'react';
import { Site } from '@/types';
import {
  ProfessionalDeclaration,
  VerklaringConfig,
  VerklaringKey,
  VERKLARING_CONFIGS,
  countActiveDeclarations,
} from '@/types/declarations';
import { createClient } from '@/lib/supabase/client';

// ============================================
// PROPS
// ============================================

interface QualitySectionProps {
  site: Site;
}

// ============================================
// MAIN COMPONENT
// ============================================

export function QualitySection({ site }: QualitySectionProps) {
  const [declaration, setDeclaration] = useState<ProfessionalDeclaration | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'verificatie' | 'verklaringen' | 'widget'>('verificatie');

  // BIG verification state
  const [bigSearchName, setBigSearchName] = useState('');
  const [bigResults, setBigResults] = useState<any[]>([]);
  const [isSearchingBig, setIsSearchingBig] = useState(false);
  const [bigError, setBigError] = useState<string | null>(null);

  // KvK state
  const [kvkInput, setKvkInput] = useState('');

  // Local verklaring state (for batch saving)
  const [localVerklaringen, setLocalVerklaringen] = useState<Record<string, boolean>>({});
  const [verklaringenDirty, setVerklaringenDirty] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const supabase = createClient();

  // ============================================
  // LOAD DECLARATION
  // ============================================

  useEffect(() => {
    loadDeclaration();
  }, [site.id]);

  const loadDeclaration = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('professional_declarations')
      .select('*')
      .eq('site_id', site.id)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error loading declaration:', error);
    }

    if (data) {
      setDeclaration(data as ProfessionalDeclaration);
      setKvkInput(data.kvk_nummer || '');
      // Sync local verklaring state
      const vState: Record<string, boolean> = {};
      VERKLARING_CONFIGS.forEach((c) => {
        const key = `verklaring_${c.key}`;
        vState[key] = (data as any)[key] ?? false;
      });
      setLocalVerklaringen(vState);
    }
    setLoading(false);
  };

  // ============================================
  // CREATE OR UPDATE DECLARATION
  // ============================================

  const ensureDeclaration = async (): Promise<ProfessionalDeclaration | null> => {
    if (declaration) return declaration;

    // Create new declaration
    const { data, error } = await supabase
      .from('professional_declarations')
      .insert({
        site_id: site.id,
        user_id: site.user_id,
        website_actief: site.published,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating declaration:', error);
      return null;
    }

    const newDecl = data as ProfessionalDeclaration;
    setDeclaration(newDecl);
    return newDecl;
  };

  const updateDeclaration = async (updates: Partial<ProfessionalDeclaration>) => {
    setSaving(true);
    const decl = await ensureDeclaration();
    if (!decl) {
      setSaving(false);
      return;
    }

    const { data, error } = await supabase
      .from('professional_declarations')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', decl.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating declaration:', error);
    } else {
      setDeclaration(data as ProfessionalDeclaration);
    }
    setSaving(false);
  };

  // ============================================
  // BIG VERIFICATION
  // ============================================

  const handleBigSearch = async () => {
    if (!bigSearchName.trim()) return;

    setIsSearchingBig(true);
    setBigError(null);
    setBigResults([]);

    try {
      const params = new URLSearchParams({ naam: bigSearchName.trim() });
      const response = await fetch(`/api/big/verify?${params}`);
      const data = await response.json();

      if (data.error) {
        setBigError(data.error);
      } else if (data.results?.length > 0) {
        setBigResults(data.results);
      } else {
        setBigError('Geen resultaten gevonden. Controleer de naam.');
      }
    } catch {
      setBigError('Er ging iets mis. Probeer het later opnieuw.');
    } finally {
      setIsSearchingBig(false);
    }
  };

  const selectBigResult = async (result: any) => {
    await updateDeclaration({
      big_nummer: result.bigNummer,
      big_beroep: result.beroep,
      big_specialismen: result.specialismen || [],
      big_verified: result.isGeldig,
      big_verified_at: new Date().toISOString(),
      big_geldig: result.isGeldig,
    });
    setBigResults([]);
  };

  const removeBigVerification = async () => {
    await updateDeclaration({
      big_nummer: null,
      big_beroep: null,
      big_specialismen: [],
      big_verified: false,
      big_verified_at: null,
      big_geldig: false,
    });
  };

  // ============================================
  // KVK
  // ============================================

  const saveKvk = async () => {
    if (kvkInput.length !== 8) return;
    await updateDeclaration({
      kvk_nummer: kvkInput,
      kvk_handelsnaam: site.content.zakelijk?.handelsnaam || `${site.content.naam} Zorg`,
    });
  };

  // ============================================
  // TOGGLE VERKLARING
  // ============================================

  const toggleVerklaring = (key: VerklaringKey, value: boolean) => {
    const fieldName = `verklaring_${key}`;
    setLocalVerklaringen((prev) => ({ ...prev, [fieldName]: value }));
    setVerklaringenDirty(true);
    setSaveSuccess(false);
  };

  const saveVerklaringen = async () => {
    setSaving(true);
    setSaveSuccess(false);
    const decl = await ensureDeclaration();
    if (!decl) {
      setSaving(false);
      return;
    }

    const { data, error } = await supabase
      .from('professional_declarations')
      .update({ ...localVerklaringen, updated_at: new Date().toISOString() })
      .eq('id', decl.id)
      .select()
      .single();

    if (error) {
      console.error('Error saving verklaringen:', error);
    } else {
      setDeclaration(data as ProfessionalDeclaration);
      setVerklaringenDirty(false);
      setSaveSuccess(true);
      // Hide success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    }
    setSaving(false);
  };

  // ============================================
  // SIGN DECLARATION
  // ============================================

  const signDeclaration = async () => {
    await updateDeclaration({
      declaration_accepted_at: new Date().toISOString(),
      widget_enabled: true,
    });
  };

  // ============================================
  // STATS
  // ============================================

  const stats = declaration ? countActiveDeclarations(declaration) : null;

  // ============================================
  // RENDER
  // ============================================

  if (loading) {
    return (
      <div className="animate-pulse space-y-4 p-6">
        <div className="h-8 bg-slate-200 rounded w-1/3" />
        <div className="h-4 bg-slate-100 rounded w-2/3" />
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-slate-100 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ========== HEADER ========== */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-600">verified_user</span>
            Kwaliteit & Compliance
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Beheer je professionele verklaringen en activeer de vertrouwenswidget
          </p>
        </div>

        {stats && (
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-xl">
            <div className="text-2xl font-bold text-emerald-700">{stats.score}%</div>
            <div className="text-xs text-emerald-600">
              <div>compliant</div>
              <div>{stats.verified + stats.declared}/12</div>
            </div>
          </div>
        )}
      </div>

      {/* ========== TABS ========== */}
      <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
        {[
          { id: 'verificatie' as const, label: 'Verificatie', icon: 'verified' },
          { id: 'verklaringen' as const, label: 'Verklaringen', icon: 'fact_check' },
          { id: 'widget' as const, label: 'Widget', icon: 'widgets' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <span className="material-symbols-outlined text-lg">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ========== TAB: VERIFICATIE ========== */}
      {activeTab === 'verificatie' && (
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
                    <p className="text-sm text-slate-500">Automatische verificatie via het BIG-register</p>
                  </div>
                </div>
                {declaration?.big_verified && (
                  <span className="flex items-center gap-1 text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                    <span className="material-symbols-outlined text-base">check_circle</span>
                    Geverifieerd
                  </span>
                )}
              </div>
            </div>

            <div className="p-6">
              {declaration?.big_verified ? (
                <div className="space-y-4">
                  <div className="bg-emerald-50 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-emerald-600">verified</span>
                      <div>
                        <div className="font-medium text-emerald-900">
                          BIG-nummer: {declaration.big_nummer}
                        </div>
                        <div className="text-sm text-emerald-700">
                          {declaration.big_beroep} — {declaration.big_geldig ? 'Registratie geldig' : 'Registratie verlopen'}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={removeBigVerification}
                    className="text-sm text-slate-500 hover:text-red-600 transition-colors"
                  >
                    Verificatie verwijderen
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={bigSearchName}
                      onChange={(e) => setBigSearchName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleBigSearch()}
                      placeholder="Zoek op achternaam..."
                      className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                    <button
                      onClick={handleBigSearch}
                      disabled={isSearchingBig || !bigSearchName.trim()}
                      className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isSearchingBig ? 'Zoeken...' : 'Zoeken'}
                    </button>
                  </div>

                  {bigError && (
                    <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">{bigError}</p>
                  )}

                  {bigResults.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm text-slate-500 font-medium">
                        {bigResults.length} resultaten gevonden — selecteer je registratie:
                      </p>
                      {bigResults.map((result, idx) => (
                        <button
                          key={idx}
                          onClick={() => selectBigResult(result)}
                          className="w-full text-left p-4 border border-slate-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-all"
                        >
                          <div className="font-medium text-slate-900">{result.volledigeNaam}</div>
                          <div className="text-sm text-slate-600 mt-1">
                            {result.beroep} · BIG-nr: {result.bigNummer}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              result.isGeldig 
                                ? 'bg-emerald-100 text-emerald-700' 
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {result.isGeldig ? '✓ Geldig' : '✗ Verlopen'}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
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
                {declaration?.kvk_nummer && (
                  <span className="flex items-center gap-1 text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    <span className="material-symbols-outlined text-base">check</span>
                    Toegevoegd
                  </span>
                )}
              </div>
            </div>

            <div className="p-6">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={kvkInput}
                  onChange={(e) => setKvkInput(e.target.value.replace(/\D/g, '').slice(0, 8))}
                  placeholder="12345678"
                  maxLength={8}
                  className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={saveKvk}
                  disabled={kvkInput.length !== 8 || saving}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Opslaan
                </button>
              </div>
              {declaration?.kvk_nummer && (
                <a
                  href={`https://www.kvk.nl/zoeken/handelsregister/?kvknummer=${declaration.kvk_nummer}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline mt-3"
                >
                  Bekijk in KvK-register
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </a>
              )}
            </div>
          </div>

          {/* Website Status */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
                  <span className="material-symbols-outlined text-violet-600">language</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Professionele website</h3>
                  <p className="text-sm text-slate-500">Online presentatie via JouwZorgSite</p>
                </div>
              </div>
              <span className={`flex items-center gap-1 text-sm font-medium px-3 py-1 rounded-full ${
                site.published 
                  ? 'text-emerald-600 bg-emerald-50' 
                  : 'text-amber-600 bg-amber-50'
              }`}>
                <span className="material-symbols-outlined text-base">
                  {site.published ? 'check_circle' : 'pending'}
                </span>
                {site.published ? 'Actief' : 'Niet gepubliceerd'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ========== TAB: VERKLARINGEN ========== */}
      {activeTab === 'verklaringen' && (
        <div className="space-y-6">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex gap-3">
              <span className="material-symbols-outlined text-amber-600 mt-0.5">info</span>
              <div className="text-sm text-amber-800">
                <p className="font-medium">Verklaring van professionele werkwijze</p>
                <p className="mt-1">
                  Onderstaande items zijn zelfverklaringen. Je geeft hiermee aan dat je
                  voldoet aan de genoemde eisen. JouwZorgSite controleert deze niet inhoudelijk.
                </p>
              </div>
            </div>
          </div>

          {/* Groepen */}
          {(['registratie', 'compliance', 'kwaliteit'] as const).map((category) => {
            const items = VERKLARING_CONFIGS.filter((v) => v.category === category);
            const categoryLabels = {
              registratie: { title: 'Registraties', icon: 'app_registration' },
              compliance: { title: 'Wet- en regelgeving', icon: 'gavel' },
              kwaliteit: { title: 'Kwaliteit & professionaliteit', icon: 'workspace_premium' },
            };
            const cat = categoryLabels[category];

            return (
              <div key={category} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-600">{cat.icon}</span>
                    <h3 className="font-semibold text-slate-800">{cat.title}</h3>
                  </div>
                </div>

                <div className="divide-y divide-slate-100">
                  {items.map((item) => {
                    const fieldKey = `verklaring_${item.key}`;
                    const isActive = localVerklaringen[fieldKey] ?? false;

                    return (
                      <div
                        key={item.key}
                        className="flex items-start gap-4 p-4 hover:bg-slate-50 transition-colors"
                      >
                        <button
                          onClick={() => toggleVerklaring(item.key, !isActive)}
                          className={`mt-0.5 w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                            isActive
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'border-slate-300 hover:border-emerald-400'
                          }`}
                        >
                          {isActive && (
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                            </svg>
                          )}
                        </button>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-slate-400 text-lg">
                              {item.icon}
                            </span>
                            <span className="font-medium text-slate-900 text-sm">
                              {item.label}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-1 ml-7">
                            {item.description}
                          </p>
                          {item.helpUrl && (
                            <a
                              href={item.helpUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-blue-500 hover:underline mt-1 ml-7"
                            >
                              Meer info
                              <span className="material-symbols-outlined text-xs">open_in_new</span>
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Opslaan knop */}
          <div className="flex items-center gap-4">
            <button
              onClick={saveVerklaringen}
              disabled={!verklaringenDirty || saving}
              className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${
                verklaringenDirty
                  ? 'bg-slate-900 text-white hover:bg-slate-800'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Opslaan...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-lg">save</span>
                  Wijzigingen opslaan
                </>
              )}
            </button>
            {saveSuccess && (
              <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-600 animate-fade-in">
                <span className="material-symbols-outlined text-base">check_circle</span>
                Opgeslagen!
              </span>
            )}
            {verklaringenDirty && (
              <span className="text-xs text-amber-600">Niet-opgeslagen wijzigingen</span>
            )}
          </div>

          {/* Sign Declaration */}
          {declaration && !declaration.declaration_accepted_at && (
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
              <h3 className="text-lg font-bold text-emerald-900 mb-2">
                Verklaring ondertekenen
              </h3>
              <p className="text-sm text-emerald-700 mb-4">
                Door te ondertekenen bevestig je dat bovenstaande verklaringen naar waarheid
                zijn ingevuld. De vertrouwenswidget wordt automatisch geactiveerd op je website.
              </p>
              <button
                onClick={signDeclaration}
                disabled={saving}
                className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 disabled:opacity-50 transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined">draw</span>
                Verklaring ondertekenen & widget activeren
              </button>
            </div>
          )}

          {declaration?.declaration_accepted_at && (
            <div className="bg-emerald-50 rounded-xl p-4 flex items-center gap-3">
              <span className="material-symbols-outlined text-emerald-600">task_alt</span>
              <div className="text-sm text-emerald-800">
                <span className="font-medium">Verklaring ondertekend</span> op{' '}
                {new Date(declaration.declaration_accepted_at).toLocaleDateString('nl-NL', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========== TAB: WIDGET ========== */}
      {activeTab === 'widget' && (
        <div className="space-y-6">
          {/* Widget Toggle */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Vertrouwenswidget</h3>
                <p className="text-sm text-slate-500 mt-1">
                  Toon de kwaliteitswidget op je website
                </p>
              </div>
              <button
                onClick={() =>
                  updateDeclaration({ widget_enabled: !declaration?.widget_enabled })
                }
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  declaration?.widget_enabled ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${
                    declaration?.widget_enabled ? 'translate-x-7' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Interactive Widget Preview */}
          {declaration?.widget_enabled && (
            <WidgetLivePreview
              declaration={declaration}
              site={site}
              onStyleChange={(style) => updateDeclaration({ widget_style: style })}
            />
          )}
        </div>
      )}

      {/* Saving indicator */}
      {saving && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Opslaan...
        </div>
      )}
    </div>
  );
}

// ============================================
// WIDGET LIVE PREVIEW
// Full interactive preview with style switching,
// expandable panel, score ring, and simulated
// website background
// ============================================

const VERKLARING_LABELS: Record<VerklaringKey, string> = {
  lrza: 'Geregistreerd in het Zorgaanbiedersportaal (LRZa)',
  wtza: 'Voldoet aan de meldplicht Wtza',
  wkkgz: 'Klachtenregeling conform Wkkgz',
  dossiervoering: 'Werkt met zorgdossier en passende dossiervoering',
  avg: 'Voldoet aan AVG-verplichtingen in de zorg',
  richtlijnen: 'Werkt volgens professionele richtlijnen en kwaliteitsnormen',
  incidenten: 'Registreert incidenten zorgvuldig',
  scholing: 'Investeert in deskundigheidsbevordering en intervisie',
  afspraken: 'Werkt met duidelijke afspraken over zorgverlening',
};

function WidgetLivePreview({
  declaration,
  site,
  onStyleChange,
}: {
  declaration: ProfessionalDeclaration;
  site: Site;
  onStyleChange: (style: 'default' | 'compact' | 'minimal') => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<'left' | 'right'>('left');
  const activeStyle = declaration.widget_style || 'default';
  const color = '#059669'; // emerald-600

  const stats = countActiveDeclarations(declaration);
  const verifiedCount = [declaration.big_verified, !!declaration.kvk_nummer, declaration.website_actief].filter(Boolean).length;

  const activeDeclarations = VERKLARING_CONFIGS.filter(
    (c) => declaration[`verklaring_${c.key}` as keyof ProfessionalDeclaration]
  );

  // Close panel when switching styles
  const switchStyle = (style: 'default' | 'compact' | 'minimal') => {
    setIsOpen(false);
    onStyleChange(style);
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Live preview</h3>
            <p className="text-xs text-slate-500 mt-0.5">Klik op de widget om het panel te openen</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Style pills */}
            <div className="flex gap-1 bg-slate-100 rounded-lg p-0.5">
              {([
                { id: 'default' as const, label: 'Standaard' },
                { id: 'compact' as const, label: 'Compact' },
                { id: 'minimal' as const, label: 'Minimaal' },
              ]).map((s) => (
                <button
                  key={s.id}
                  onClick={() => switchStyle(s.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    activeStyle === s.id
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Position toggle */}
            <button
              onClick={() => { setPosition(p => p === 'left' ? 'right' : 'left'); setIsOpen(false); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">
                {position === 'left' ? 'align_horizontal_left' : 'align_horizontal_right'}
              </span>
              {position === 'left' ? 'Links' : 'Rechts'}
            </button>
          </div>
        </div>
      </div>

      {/* Preview Container — simulated website */}
      <div className="bg-white rounded-2xl border border-slate-200" style={{ overflow: 'visible' }}>
        <div className="relative" style={{ minHeight: 700, overflow: 'visible' }}>
          {/* Simulated website background */}
          <div className="p-8">
            {/* Fake hero area */}
            <div
              className="rounded-xl p-10 mb-6"
              style={{ background: `linear-gradient(135deg, ${color}10, ${color}05)`, border: `1px solid ${color}12` }}
            >
              <div className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color }}>
                {site.beroep} · ZZP
              </div>
              <h2 className="text-3xl font-light text-slate-900 mb-2">
                Zorg met <span className="font-bold italic">aandacht</span>
              </h2>
              <p className="text-sm text-slate-500 max-w-md">
                {site.content.naam || 'Uw naam'} — Zelfstandig zorgverlener.
                Uw vertrouwenswidget verschijnt hieronder.
              </p>
            </div>

            {/* Fake content blocks */}
            <div className="grid grid-cols-2 gap-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="bg-slate-50 rounded-lg p-5 border border-slate-100">
                  <div className="w-10 h-1 bg-slate-200 rounded mb-3" />
                  <div className="w-3/4 h-1 bg-slate-100 rounded mb-2" />
                  <div className="w-1/2 h-1 bg-slate-100 rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* THE WIDGET — positioned inside the preview */}
          <div
            className={`absolute bottom-6 ${position === 'left' ? 'left-5' : 'right-5'}`}
            style={{ zIndex: 10 }}
          >
            {/* Expandable Panel */}
            {isOpen && (
              <div
                className={`absolute bottom-full mb-3 ${position === 'left' ? 'left-0' : 'right-0'}`}
                style={{ animation: 'slideUp 0.2s ease-out' }}
              >
                <WidgetPanel
                  declaration={declaration}
                  activeDeclarations={activeDeclarations}
                  verifiedCount={verifiedCount}
                  stats={stats}
                  color={color}
                  siteName={site.content.naam}
                  onClose={() => setIsOpen(false)}
                />
              </div>
            )}

            {/* Badge: Default */}
            {activeStyle === 'default' && (
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-2xl border border-slate-200 bg-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                style={{ maxWidth: 280 }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: color }}>
                  <ShieldIcon size={20} />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="text-xs font-bold text-slate-900">Professioneel zorgprofiel</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {verifiedCount} geverifieerd · {stats.score}% compliant
                  </div>
                </div>
                <ChevronIcon up={isOpen} />
              </button>
            )}

            {/* Badge: Compact (circle) */}
            {activeStyle === 'compact' && (
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer border-0"
                style={{ background: color }}
              >
                <ShieldIcon size={28} />
              </button>
            )}

            {/* Badge: Minimal (small bar) */}
            {activeStyle === 'minimal' && (
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-full border border-slate-200 bg-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: color }}>
                  <ShieldIcon size={16} />
                </div>
                <span className="text-xs font-semibold text-slate-900">Zorgprofiel</span>
                <span
                  className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: `${color}15`, color }}
                >
                  {stats.score}%
                </span>
                <ChevronIcon up={isOpen} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Style animation keyframes */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ────────────────────────────────────────
// WIDGET PANEL — The expandable detail panel
// ────────────────────────────────────────
function WidgetPanel({
  declaration,
  activeDeclarations,
  verifiedCount,
  stats,
  color,
  siteName,
  onClose,
}: {
  declaration: ProfessionalDeclaration;
  activeDeclarations: VerklaringConfig[];
  verifiedCount: number;
  stats: ReturnType<typeof countActiveDeclarations>;
  color: string;
  siteName: string;
  onClose: () => void;
}) {
  return (
    <div
      className="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
      style={{ width: 370, maxHeight: '80vh', overflowY: 'auto' }}
    >
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-slate-100 px-5 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: color }}>
            <ShieldIcon size={20} />
          </div>
          <div>
            <div className="text-[13px] font-bold text-slate-900">Professioneel zorgprofiel</div>
            <div className="text-[11px] text-slate-500">Verklaring zelfstandige zorgverlener</div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      </div>

      {/* Intro */}
      <div className="px-5 py-3 bg-slate-50 border-b border-slate-100">
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Deze zelfstandig werkende zorgverlener heeft onderstaande gegevens aangeleverd
          en verklaart te werken volgens de professionele eisen die gelden voor zzp'ers
          in de zorg.
        </p>
      </div>

      <div className="px-5 py-4">
        {/* Geverifieerd */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: color }}>
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </div>
            <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">Geverifieerde gegevens</span>
          </div>
          <div className="space-y-1">
            <WidgetVerifiedRow active={!!declaration.big_verified} label="BIG-registratie gecontroleerd" color={color} />
            <WidgetVerifiedRow active={!!declaration.kvk_nummer} label="KvK-inschrijving zichtbaar" color={color} />
            <WidgetVerifiedRow active={!!declaration.website_actief} label="Professionele website actief" color={color} />
          </div>
        </div>

        <div className="h-px bg-slate-100 mb-5" />

        {/* Zelfverklaard */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
              <svg className="w-3 h-3 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </div>
            <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">Verklaring van professionele werkwijze</span>
          </div>
          {activeDeclarations.length > 0 ? (
            <div className="space-y-1.5">
              {activeDeclarations.map((c) => (
                <div key={c.key} className="flex items-start gap-2.5 py-1">
                  <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill={color} viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <span className="text-xs text-slate-700 leading-relaxed">{VERKLARING_LABELS[c.key]}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">Nog geen verklaringen afgelegd</p>
          )}
        </div>

        {/* Score */}
        <div className="bg-slate-50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-medium text-slate-500">Compliance score</div>
              <div className="text-2xl font-bold mt-0.5" style={{ color }}>{stats.score}%</div>
            </div>
            <ScoreRing score={stats.score} color={color} size={56} />
          </div>
          {declaration.declaration_accepted_at && (
            <div className="text-[10px] text-slate-400 mt-2">
              Verklaring ondertekend op{' '}
              {new Date(declaration.declaration_accepted_at).toLocaleDateString('nl-NL', {
                day: 'numeric', month: 'long', year: 'numeric',
              })}
            </div>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="px-5 py-3 bg-slate-50 border-t border-slate-100">
        <p className="text-[10px] text-slate-400 leading-relaxed">
          Deze verklaring is gebaseerd op informatie die door de zorgverlener zelf is verstrekt.
          JouwZorgSite controleert niet alle onderdelen inhoudelijk en geeft geen juridisch of kwaliteitskeurmerk af.
        </p>
        <div className="flex items-center gap-1 mt-2">
          <ShieldIcon size={10} colorOverride="#94a3b8" />
          <span className="text-[10px] text-slate-400">
            Aangeboden door <span className="font-semibold" style={{ color }}>JouwZorgSite</span>
          </span>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────
// WIDGET SUB-COMPONENTS
// ────────────────────────────────────────

function WidgetVerifiedRow({ active, label, color }: { active: boolean; label: string; color: string }) {
  return (
    <div className="flex items-center gap-2.5 py-1.5">
      <div
        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: active ? `${color}15` : '#f1f5f9' }}
      >
        {active ? (
          <svg className="w-3 h-3" fill={color} viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        ) : (
          <svg className="w-3 h-3" fill="#cbd5e1" viewBox="0 0 24 24">
            <path d="M19 13H5v-2h14v2z" />
          </svg>
        )}
      </div>
      <span className={`text-xs ${active ? 'text-slate-700 font-medium' : 'text-slate-400'}`}>{label}</span>
    </div>
  );
}

function ScoreRing({ score, color, size = 56 }: { score: number; color: string; size?: number }) {
  const r = (size / 2) - 4;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#f1f5f9" strokeWidth={3} />
        <circle
          cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={3}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
      </svg>
      <div
        className="absolute inset-0 flex items-center justify-center text-[13px] font-bold"
        style={{ color }}
      >
        {score}%
      </div>
    </div>
  );
}

function ShieldIcon({ size = 20, colorOverride }: { size?: number; colorOverride?: string }) {
  return (
    <svg width={size} height={size} fill={colorOverride || 'white'} viewBox="0 0 24 24">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
    </svg>
  );
}

function ChevronIcon({ up }: { up: boolean }) {
  return (
    <svg
      width={16} height={16} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}
      className="text-slate-400 transition-transform"
      style={{ transform: up ? 'rotate(180deg)' : 'rotate(0deg)' }}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}