'use client';

import { Site, SiteContent } from '@/types';
import { SiteRenderer } from '@/components/templates';

interface PreviewSectionProps {
  site: Site;
  content: SiteContent;
  onCheckout: () => void;
  onBackToStyle: () => void;
  canRegenerate: boolean;
  regenerationsLeft: number;
}

export function PreviewSection({
  site,
  content,
  onCheckout,
  onBackToStyle,
  canRegenerate,
  regenerationsLeft,
}: PreviewSectionProps) {
  const livePreviewSite: Site = {
    ...site,
    content: content,
  };

  return (
    <div className="min-h-screen relative">

      {/* ── Floating Action Bar ──────────────────────── */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-32px)] max-w-lg">
        <div className="bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl shadow-slate-300/30 rounded-2xl overflow-hidden">

          {/* Top row: actions */}
          <div className="flex items-center gap-2 px-4 py-2.5">

            {/* Status indicator */}
            <div className="flex items-center gap-2 pr-3 border-r border-slate-200">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-xs font-medium text-slate-500 hidden sm:inline">Preview</span>
            </div>

            {/* Back to style */}
            {canRegenerate && (
              <button
                onClick={onBackToStyle}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-colors text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                title={`Kies een andere stijl (nog ${regenerationsLeft}x)`}
              >
                <span className="material-symbols-outlined text-lg">palette</span>
                <span className="hidden md:inline">Andere stijl</span>
                <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full">
                  {regenerationsLeft}
                </span>
              </button>
            )}

            {/* Spacer */}
            <div className="flex-1" />

            {/* Checkout CTA */}
            <button
              onClick={onCheckout}
              className="flex items-center gap-1.5 px-5 py-2 bg-gradient-to-br from-teal-600 to-[#0f766e] text-white rounded-full font-bold text-sm hover:shadow-lg transition-colors shadow-lg shadow-teal-600/20"
            >
              <span>Doorgaan</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>

          {/* Bottom row: info message */}
          <div className="px-4 py-2 bg-slate-50/80 border-t border-slate-100">
            <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5">
              <span className="material-symbols-outlined text-[14px] text-teal-500">edit_note</span>
              <span>Dit is een preview — na registratie pas je alles aan in de editor</span>
            </p>
          </div>

        </div>
      </div>

      {/* ── Max Regenerations Banner ─────────────────── */}
      {!canRegenerate && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100]">
          <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-full px-5 py-2.5 shadow-lg">
            <span className="material-symbols-outlined text-amber-600 text-lg">info</span>
            <p className="text-sm text-amber-800">Maximum gratis stijlwijzigingen bereikt</p>
          </div>
        </div>
      )}

      {/* ── Full Website Render ──────────────────────── */}
      <SiteRenderer site={livePreviewSite} />

      {/* ── Bottom CTA ───────────────────────────────── */}
      <div className="bg-slate-50 border-t border-slate-200 py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-slate-600 mb-2">
            {canRegenerate
              ? 'Niet je stijl? Kies een andere en genereer opnieuw.'
              : 'Tevreden? Ga door en maak je site compleet!'
            }
          </p>
          <p className="text-sm text-slate-400 mb-6">
            Na registratie kun je alles volledig aanpassen — teksten, foto&apos;s, kleuren en meer.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {canRegenerate && (
              <button
                onClick={onBackToStyle}
                className="flex items-center gap-2 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl font-medium hover:border-slate-400 hover:bg-white transition-all"
              >
                <span className="material-symbols-outlined">palette</span>
                Andere stijl kiezen ({regenerationsLeft}x over)
              </button>
            )}
            <button
              onClick={onCheckout}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-br from-teal-600 to-[#0f766e] text-white rounded-xl font-bold text-lg transition-all hover:shadow-xl hover:shadow-teal-600/25"
            >
              Doorgaan naar verificatie
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-4 flex items-center justify-center gap-1.5">
            <span className="material-symbols-outlined text-sm">edit_note</span>
            Na registratie krijg je een volledige editor om alles naar wens aan te passen
          </p>
        </div>
      </div>
    </div>
  );
}
