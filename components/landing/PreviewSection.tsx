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
  const livePreviewSite: Site = {
    ...site,
    content: content,
  };

  const canRegenerate = regenerateCount < maxRegenerations;
  const regenerationsLeft = maxRegenerations - regenerateCount;

  return (
    <div className="min-h-screen relative">

      {/* ── Floating Action Bar ──────────────────────── */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100]">
        <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl shadow-slate-300/30 rounded-full px-3 py-2">
          
          {/* Status indicator */}
          <div className="flex items-center gap-2 px-3 border-r border-slate-200">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-xs font-medium text-slate-500 hidden sm:inline">Preview</span>
          </div>

          {/* Regenerate */}
          <button
            onClick={onRegenerate}
            disabled={!canRegenerate || isRegenerating}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-colors ${
              canRegenerate && !isRegenerating
                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                : 'text-slate-300 cursor-not-allowed'
            }`}
            title={canRegenerate ? `Nog ${regenerationsLeft}x gratis opnieuw genereren` : 'Maximum bereikt'}
          >
            <span className={`material-symbols-outlined text-lg ${isRegenerating ? 'animate-spin' : ''}`}>
              {isRegenerating ? 'progress_activity' : 'refresh'}
            </span>
            <span className="hidden md:inline">
              {isRegenerating ? 'Bezig...' : 'Opnieuw'}
            </span>
            {canRegenerate && !isRegenerating && (
              <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full">
                {regenerationsLeft}
              </span>
            )}
          </button>

          {/* Customize */}
          <button
            onClick={() => setIsCustomizing(!isCustomizing)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-colors ${
              isCustomizing 
                ? 'bg-slate-100 text-slate-900' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span className="material-symbols-outlined text-lg">edit</span>
            <span className="hidden md:inline">Aanpassen</span>
          </button>

          {/* Checkout CTA */}
          <button
            onClick={onCheckout}
            className="flex items-center gap-1.5 px-5 py-2 bg-orange-500 text-white rounded-full font-bold text-sm hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
          >
            <span>Doorgaan</span>
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* ── Loading Overlay ──────────────────────────── */}
      {isRegenerating && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[90] flex items-center justify-center">
          <div className="text-center">
            <span className="material-symbols-outlined text-5xl text-orange-500 animate-spin">
              progress_activity
            </span>
            <p className="mt-4 font-medium text-slate-700">Nieuwe website genereren...</p>
            <p className="text-sm text-slate-500">Dit duurt een paar seconden</p>
          </div>
        </div>
      )}

      {/* ── Customize Sidebar ────────────────────────── */}
      {isCustomizing && (
        <div className="fixed top-0 right-0 z-[80] h-screen w-80 bg-white border-l border-slate-200 shadow-2xl overflow-y-auto">
          <CustomizeSidebar 
            content={content} 
            setContent={setContent} 
            onClose={() => setIsCustomizing(false)} 
          />
        </div>
      )}

      {/* ── Max Regenerations Banner ─────────────────── */}
      {!canRegenerate && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100]">
          <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-full px-5 py-2.5 shadow-lg">
            <span className="material-symbols-outlined text-amber-600 text-lg">info</span>
            <p className="text-sm text-amber-800">Maximum gratis regeneraties bereikt</p>
          </div>
        </div>
      )}

      {/* ── Full Website Render ──────────────────────── */}
      <SiteRenderer site={livePreviewSite} />

      {/* ── Bottom CTA ───────────────────────────────── */}
      <div className="bg-slate-50 border-t border-slate-200 py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-slate-600 mb-6">
            {canRegenerate 
              ? 'Niet helemaal tevreden? Genereer gratis een nieuwe versie of ga door.'
              : 'Tevreden? Voeg je BIG-registratie toe voor extra vertrouwen!'
            }
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {canRegenerate && (
              <button
                onClick={onRegenerate}
                disabled={isRegenerating}
                className="flex items-center gap-2 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl font-medium hover:border-slate-400 hover:bg-white transition-all"
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
  );
}

// ── Customize Sidebar ───────────────────────────
function CustomizeSidebar({ 
  content, setContent, onClose 
}: { 
  content: SiteContent; 
  setContent: (c: SiteContent) => void; 
  onClose: () => void;
}) {
  return (
    <div className="p-6 pt-20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-slate-900">Personaliseer</h3>
        <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-lg">
          <span className="material-symbols-outlined text-slate-500">close</span>
        </button>
      </div>
      
      {/* Naam */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Naam</label>
        <input
          type="text"
          value={content.naam}
          onChange={(e) => setContent({ ...content, naam: e.target.value })}
          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-orange-500 focus:ring-0 outline-none text-sm"
        />
      </div>
      
      {/* Tagline */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Tagline</label>
        <input
          type="text"
          value={content.tagline}
          onChange={(e) => setContent({ ...content, tagline: e.target.value })}
          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-orange-500 focus:ring-0 outline-none text-sm"
        />
      </div>
      
      {/* Over mij */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Over mij</label>
        <textarea
          value={content.over_mij}
          onChange={(e) => setContent({ ...content, over_mij: e.target.value })}
          rows={4}
          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-orange-500 focus:ring-0 outline-none resize-none text-sm"
        />
      </div>
      
      {/* Email */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-slate-700 mb-1.5">E-mail</label>
        <input
          type="email"
          value={content.contact?.email || ''}
          onChange={(e) => setContent({ 
            ...content, 
            contact: { ...content.contact, email: e.target.value, werkgebied: content.contact?.werkgebied || [] } 
          })}
          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-orange-500 focus:ring-0 outline-none text-sm"
        />
      </div>
      
      {/* Foto placeholder */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Profielfoto</label>
        <div className="border-2 border-dashed border-slate-200 rounded-xl p-5 text-center hover:border-orange-300 transition-colors cursor-pointer">
          <span className="material-symbols-outlined text-2xl text-slate-300 mb-1">add_photo_alternate</span>
          <p className="text-xs text-slate-500">Upload na registratie</p>
        </div>
      </div>
      
      <p className="text-xs text-slate-400 text-center">
        Meer opties na registratie
      </p>
    </div>
  );
}