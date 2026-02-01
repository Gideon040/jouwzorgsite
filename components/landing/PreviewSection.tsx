'use client';

import { Site, SiteContent } from '@/types';
import { SiteRenderer } from '@/components/templates';

interface PreviewSectionProps {
  site: Site;
  content: SiteContent;
  setContent: (c: SiteContent) => void;
  onCheckout: () => void;
  onRegenerate: () => void;
  isCustomizing: boolean;
  setIsCustomizing: (v: boolean) => void;
  isRegenerating?: boolean;
  regenerateCount: number;
  maxRegenerations: number;
}

export function PreviewSection({ 
  site, 
  content, 
  setContent, 
  onCheckout, 
  onRegenerate,
  isCustomizing, 
  setIsCustomizing,
  isRegenerating = false,
  regenerateCount,
  maxRegenerations,
}: PreviewSectionProps) {
  // Maak een live site object met de huidige content
  const livePreviewSite: Site = {
    ...site,
    content: content,
  };

  const canRegenerate = regenerateCount < maxRegenerations;
  const regenerationsLeft = maxRegenerations - regenerateCount;

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-200 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              <span className="text-sm font-medium text-slate-600">Preview van jouw website</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Opnieuw genereren knop */}
            <button
              onClick={onRegenerate}
              disabled={!canRegenerate || isRegenerating}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                canRegenerate && !isRegenerating
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  : 'text-slate-300 cursor-not-allowed'
              }`}
              title={canRegenerate ? `Nog ${regenerationsLeft}x gratis opnieuw genereren` : 'Maximum bereikt'}
            >
              <span className={`material-symbols-outlined text-xl ${isRegenerating ? 'animate-spin' : ''}`}>
                {isRegenerating ? 'progress_activity' : 'refresh'}
              </span>
              <span className="hidden sm:inline">
                {isRegenerating ? 'Genereren...' : 'Opnieuw'}
              </span>
              {canRegenerate && !isRegenerating && (
                <span className="text-xs bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded-full">
                  {regenerationsLeft}x
                </span>
              )}
            </button>

            <button
              onClick={() => setIsCustomizing(!isCustomizing)}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined text-xl">edit</span>
              <span className="hidden sm:inline">Aanpassen</span>
            </button>
            
            <button
              onClick={onCheckout}
              className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition-colors"
            >
              <span>Doorgaan</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Customize sidebar */}
        {isCustomizing && (
          <CustomizeSidebar 
            content={content} 
            setContent={setContent} 
            onClose={() => setIsCustomizing(false)} 
          />
        )}

        {/* Site preview */}
        <div className="flex-1">
          <div className="max-w-6xl mx-auto p-4 md:p-8">
            {/* Regenerate banner - toon als max bereikt */}
            {!canRegenerate && (
              <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-amber-600">info</span>
                  <p className="text-sm text-amber-800">
                    Je hebt het maximum aantal gratis regeneraties bereikt.
                  </p>
                </div>
                <button className="text-sm font-medium text-amber-700 hover:text-amber-900 underline">
                  Upgrade voor onbeperkt
                </button>
              </div>
            )}

            {/* Browser frame */}
            <div className="bg-white rounded-2xl shadow-2xl shadow-slate-300/50 overflow-hidden">
              {/* Browser bar */}
              <div className="bg-slate-100 px-4 py-3 flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 bg-white rounded-lg px-4 py-1.5 text-sm text-slate-500 font-mono">
                  {site.subdomain}.jouwzorgsite.nl
                </div>
              </div>
              
              {/* Loading overlay when regenerating */}
              {isRegenerating && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center">
                  <div className="text-center">
                    <span className="material-symbols-outlined text-5xl text-orange-500 animate-spin">
                      progress_activity
                    </span>
                    <p className="mt-4 font-medium text-slate-700">Nieuwe website genereren...</p>
                    <p className="text-sm text-slate-500">Dit duurt een paar seconden</p>
                  </div>
                </div>
              )}
              
              {/* Echte template preview */}
              <div className="max-h-[70vh] overflow-y-auto relative">
                <SiteRenderer site={livePreviewSite} />
              </div>
            </div>
            
            {/* Info cards */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-5 border border-slate-200">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-emerald-500">check_circle</span>
                  <span className="font-semibold text-slate-900">100% uniek design</span>
                </div>
                <p className="text-sm text-slate-500">
                  Jouw website is speciaal voor jou gegenereerd
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-5 border border-slate-200">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-emerald-500">verified</span>
                  <span className="font-semibold text-slate-900">BIG verificatie</span>
                </div>
                <p className="text-sm text-slate-500">
                  Voeg je officiële BIG-badge toe in de volgende stap
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-5 border border-slate-200">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-emerald-500">rocket_launch</span>
                  <span className="font-semibold text-slate-900">Direct online</span>
                </div>
                <p className="text-sm text-slate-500">
                  Je website staat binnen 5 minuten live
                </p>
              </div>
            </div>
            
            {/* CTA below preview */}
            <div className="mt-8 text-center">
              <p className="text-slate-600 mb-4">
                {canRegenerate 
                  ? 'Niet helemaal tevreden? Genereer gratis een nieuwe versie of ga door naar verificatie.'
                  : 'Tevreden? Voeg je BIG-registratie toe voor extra vertrouwen!'
                }
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {canRegenerate && (
                  <button
                    onClick={onRegenerate}
                    disabled={isRegenerating}
                    className="flex items-center gap-2 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl font-medium hover:border-slate-400 hover:bg-slate-50 transition-all"
                  >
                    <span className={`material-symbols-outlined ${isRegenerating ? 'animate-spin' : ''}`}>
                      {isRegenerating ? 'progress_activity' : 'refresh'}
                    </span>
                    Opnieuw genereren ({regenerationsLeft}x over)
                  </button>
                )}
                <button
                  onClick={onCheckout}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-orange-500 text-white rounded-xl font-bold text-lg hover:bg-orange-600 transition-all hover:shadow-xl hover:shadow-orange-500/25"
                >
                  Doorgaan naar verificatie
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
              <p className="text-sm text-slate-400 mt-3">
                Verificatie is optioneel · Je kunt altijd later aanvullen
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Customize sidebar
function CustomizeSidebar({ 
  content, setContent, onClose 
}: { 
  content: SiteContent; 
  setContent: (c: SiteContent) => void; 
  onClose: () => void;
}) {
  return (
    <div className="w-80 bg-white border-r border-slate-200 p-6 sticky top-[57px] h-[calc(100vh-57px)] overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-slate-900">Personaliseer je site</h3>
        <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg">
          <span className="material-symbols-outlined text-slate-500">close</span>
        </button>
      </div>
      
      {/* Naam */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">Naam</label>
        <input
          type="text"
          value={content.naam}
          onChange={(e) => setContent({ ...content, naam: e.target.value })}
          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-orange-500 focus:ring-0 outline-none"
        />
      </div>
      
      {/* Tagline */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">Tagline</label>
        <input
          type="text"
          value={content.tagline}
          onChange={(e) => setContent({ ...content, tagline: e.target.value })}
          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-orange-500 focus:ring-0 outline-none"
        />
      </div>
      
      {/* Over mij */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">Over mij</label>
        <textarea
          value={content.over_mij}
          onChange={(e) => setContent({ ...content, over_mij: e.target.value })}
          rows={5}
          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-orange-500 focus:ring-0 outline-none resize-none"
        />
      </div>
      
      {/* Contact email */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">E-mail</label>
        <input
          type="email"
          value={content.contact?.email || ''}
          onChange={(e) => setContent({ 
            ...content, 
            contact: { ...content.contact, email: e.target.value, werkgebied: content.contact?.werkgebied || [] } 
          })}
          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-orange-500 focus:ring-0 outline-none"
        />
      </div>
      
      {/* Foto upload placeholder */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">Profielfoto</label>
        <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-orange-300 transition-colors cursor-pointer">
          <span className="material-symbols-outlined text-3xl text-slate-300 mb-2">add_photo_alternate</span>
          <p className="text-sm text-slate-500">Upload na registratie</p>
        </div>
      </div>
      
      <p className="text-xs text-slate-400 text-center">
        Meer opties beschikbaar in je dashboard na registratie
      </p>
    </div>
  );
}
