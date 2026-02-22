'use client';

import { useState, useCallback, useEffect } from 'react';
import { Site, SiteContent, GeneratedContent, Theme } from '@/types';
import { EditablePreview } from '@/components/dashboard/EditablePreview';
import { EditorPanel } from '@/components/dashboard/EditorPanel';
import { MobileStyleSheet } from '@/components/landing/MobileStyleSheet';
import { DEFAULT_DOELGROEPEN, DEFAULT_FAQS } from '@/components/templates/sections/types';

interface PreviewSectionProps {
  site: Site;
  content: SiteContent;
  generated: GeneratedContent;
  siteTheme: Theme;
  onContentUpdate: (content: SiteContent) => void;
  onGeneratedUpdate: (gen: GeneratedContent) => void;
  onThemeUpdate: (theme: Theme) => void;
  onTemplateChange: (templateId: string) => void;
  onCheckout: () => void;
  onBackToStyle: () => void;
  canRegenerate: boolean;
  regenerationsLeft: number;
}

export function PreviewSection({
  site,
  content,
  generated,
  siteTheme,
  onContentUpdate,
  onGeneratedUpdate,
  onThemeUpdate,
  onTemplateChange,
  onCheckout,
  onBackToStyle,
  canRegenerate,
  regenerationsLeft,
}: PreviewSectionProps) {
  const [styleSheetOpen, setStyleSheetOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);

  // Auto-dismiss onboarding after 6 seconds
  useEffect(() => {
    if (!showOnboarding) return;
    const timer = setTimeout(() => setShowOnboarding(false), 6000);
    return () => clearTimeout(timer);
  }, [showOnboarding]);

  const livePreviewSite: Site = {
    ...site,
    content: content,
    generated_content: generated,
    theme: siteTheme,
  };

  const handleImageReplace = useCallback((key: string, newUrl: string) => {
    const customImages = (generated as any)?.customImages || {};
    onGeneratedUpdate({
      ...generated,
      customImages: { ...customImages, [key]: newUrl },
    } as GeneratedContent);
  }, [generated, onGeneratedUpdate]);

  const handleTextChange = useCallback((originalText: string, newText: string) => {
    const customTexts = (generated as any)?.customTexts || {};
    onGeneratedUpdate({
      ...generated,
      customTexts: { ...customTexts, [originalText]: newText },
    } as GeneratedContent);
  }, [generated, onGeneratedUpdate]);

  const handleAddItem = useCallback((sectionType: string) => {
    switch (sectionType) {
      case 'diensten': {
        const items = (generated as any)?.diensten?.items || content?.diensten || [];
        onGeneratedUpdate({ ...generated, diensten: { ...(generated as any)?.diensten, items: [...items, { naam: 'Nieuwe dienst', beschrijving: 'Beschrijf hier uw dienst...' }] } } as GeneratedContent);
        break;
      }
      case 'faq': {
        const items = (generated as any)?.faq?.items || DEFAULT_FAQS;
        onGeneratedUpdate({ ...generated, faq: { ...(generated as any)?.faq, items: [...items, { vraag: 'Nieuwe vraag?', antwoord: 'Typ hier het antwoord...' }] } } as GeneratedContent);
        break;
      }
      case 'voorwie': {
        const doelgroepen = (generated as any)?.voorWie?.doelgroepen || DEFAULT_DOELGROEPEN;
        const typeRotation = ['thuiszorg', 'ouderenzorg', 'ggz', 'particulieren', 'wijkverpleging', 'overig'];
        const nextType = typeRotation[doelgroepen.length % typeRotation.length];
        onGeneratedUpdate({ ...generated, voorWie: { ...(generated as any)?.voorWie, doelgroepen: [...doelgroepen, { type: nextType, titel: 'Nieuwe doelgroep', tekst: 'Beschrijf voor wie u werkt en wat u voor hen kunt betekenen.' }] } } as GeneratedContent);
        break;
      }
      case 'werkervaring': {
        const items = content?.werkervaring || [];
        onContentUpdate({ ...content, werkervaring: [...items, { functie: 'Nieuwe functie', werkgever: 'Werkgever' }] });
        break;
      }
    }
  }, [generated, content, onGeneratedUpdate, onContentUpdate]);

  const handleRemoveItem = useCallback((sectionType: string, index: number) => {
    switch (sectionType) {
      case 'diensten': {
        const items = [...((generated as any)?.diensten?.items || content?.diensten || [])];
        items.splice(index, 1);
        onGeneratedUpdate({ ...generated, diensten: { ...(generated as any)?.diensten, items } } as GeneratedContent);
        break;
      }
      case 'faq': {
        const items = [...((generated as any)?.faq?.items || DEFAULT_FAQS)];
        items.splice(index, 1);
        onGeneratedUpdate({ ...generated, faq: { ...(generated as any)?.faq, items } } as GeneratedContent);
        break;
      }
      case 'voorwie': {
        const doelgroepen = [...((generated as any)?.voorWie?.doelgroepen || DEFAULT_DOELGROEPEN)];
        doelgroepen.splice(index, 1);
        onGeneratedUpdate({ ...generated, voorWie: { ...(generated as any)?.voorWie, doelgroepen } } as GeneratedContent);
        break;
      }
      case 'werkervaring': {
        const items = [...(content?.werkervaring || [])];
        items.splice(index, 1);
        onContentUpdate({ ...content, werkervaring: items });
        break;
      }
    }
  }, [generated, content, onGeneratedUpdate, onContentUpdate]);

  const handleButtonChange = useCallback((btnId: string, style: any) => {
    const customButtons = (generated as any)?.customButtons || {};
    const updated = { ...customButtons };
    if (style === null) {
      delete updated[btnId];
    } else {
      updated[btnId] = style;
    }
    onGeneratedUpdate({
      ...generated,
      customButtons: updated,
    } as GeneratedContent);
  }, [generated, onGeneratedUpdate]);

  return (
    <div className="min-h-screen relative">

      {/* ── DESKTOP: Fixed sidebar + normal scrolling preview ── */}
      <div className="hidden lg:block">
        {/* Fixed editor sidebar */}
        <div className="fixed top-0 left-0 bottom-0 w-[380px] z-[60] border-r border-slate-200 bg-white overflow-y-auto overflow-x-hidden">
          <EditorPanel
            site={livePreviewSite}
            content={content}
            generated={generated}
            siteTheme={siteTheme}
            onContentUpdate={onContentUpdate}
            onGeneratedUpdate={onGeneratedUpdate}
            onThemeUpdate={onThemeUpdate}
            onTemplateChange={onTemplateChange}
          />
        </div>

        {/* Preview — offset by sidebar width, normal page flow */}
        <div className="ml-[380px] preview-landing">
          <style>{`
            /* Clip fixed header to preview area (don't overlap sidebar) */
            .preview-landing .fixed.top-0 { left: 380px !important; }
            /* Hide WhatsApp button in preview */
            .preview-landing a.fixed.bottom-6[href*="wa.me"] { display: none !important; }
            /* Move trust widget to the left side */
            .preview-landing .fixed.bottom-4 {
              right: auto !important;
              left: 396px !important;
            }
          `}</style>
          <EditablePreview
            site={livePreviewSite}
            onImageReplace={handleImageReplace}
            onTextChange={handleTextChange}
            onButtonChange={handleButtonChange}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
          />
        </div>
      </div>

      {/* ── MOBILE: Full preview + style bottom sheet ── */}
      <div className="lg:hidden">
        {/* Full-screen preview */}
        <div className="pb-14 preview-landing-mobile">
          <style>{`
            /* Hide WhatsApp button in preview */
            .preview-landing-mobile a.fixed.bottom-6[href*="wa.me"] { display: none !important; }
            /* Move trust widget to the left side */
            .preview-landing-mobile .fixed.bottom-4 {
              right: auto !important;
              left: 1rem !important;
            }
          `}</style>
          <EditablePreview
            site={livePreviewSite}
            onImageReplace={handleImageReplace}
            onTextChange={handleTextChange}
            onButtonChange={handleButtonChange}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
          />
        </div>

        {/* ── Onboarding overlay (shows once) ── */}
        {showOnboarding && (
          <div
            className="fixed inset-0 z-[130] bg-black/50 flex items-center justify-center px-6"
            onClick={() => setShowOnboarding(false)}
          >
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-4" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-teal-600">auto_awesome</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Jouw site is klaar!</h3>
                  <p className="text-xs text-slate-500">Pas hem aan voor je doorgaat</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-lg text-teal-500 mt-0.5 shrink-0">touch_app</span>
                  <div>
                    <p className="text-sm font-medium text-slate-800">Tik op teksten</p>
                    <p className="text-xs text-slate-500">Bewerk titels en beschrijvingen direct in de preview</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-lg text-teal-500 mt-0.5 shrink-0">palette</span>
                  <div>
                    <p className="text-sm font-medium text-slate-800">Verander de stijl</p>
                    <p className="text-xs text-slate-500">Kies template, kleuren en lettertype via &quot;Stijl&quot; onderaan</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-lg text-teal-500 mt-0.5 shrink-0">arrow_forward</span>
                  <div>
                    <p className="text-sm font-medium text-slate-800">Doorgaan</p>
                    <p className="text-xs text-slate-500">Na activatie krijg je de volledige editor met foto&apos;s, secties, content en meer</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowOnboarding(false)}
                className="w-full py-2.5 bg-teal-600 text-white text-sm font-semibold rounded-xl hover:bg-teal-700 transition-colors"
              >
                Begrepen
              </button>
            </div>
          </div>
        )}

        {/* ── Style bottom sheet ── */}
        {styleSheetOpen && (
          <MobileStyleSheet
            site={livePreviewSite}
            generated={generated}
            siteTheme={siteTheme}
            onGeneratedUpdate={onGeneratedUpdate}
            onThemeUpdate={onThemeUpdate}
            onTemplateChange={onTemplateChange}
            onClose={() => setStyleSheetOpen(false)}
          />
        )}
      </div>

      {/* ── Action Bar ── */}
      <div className="fixed bottom-0 left-0 right-0 z-[120] lg:bottom-6 lg:left-auto lg:right-6 lg:w-auto lg:max-w-md">
        <div className="bg-white/95 backdrop-blur-md border-t lg:border border-slate-200 shadow-xl shadow-slate-300/30 lg:rounded-2xl overflow-hidden">
          {/* Mobile hint: full editor after activation */}
          <div className="lg:hidden flex items-center justify-center gap-1.5 px-4 py-1.5 bg-teal-50/80 border-b border-teal-100">
            <span className="material-symbols-outlined text-xs text-teal-600">verified</span>
            <p className="text-[11px] text-teal-700">Na activatie: foto&apos;s, secties, content en meer aanpassen</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5">

            {/* Mobile: style CTA */}
            <button
              onClick={() => setStyleSheetOpen(!styleSheetOpen)}
              className={`lg:hidden flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                styleSheetOpen
                  ? 'bg-teal-100 text-teal-700 ring-1 ring-teal-300'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 ring-1 ring-slate-200'
              }`}
            >
              <span className="material-symbols-outlined text-lg">palette</span>
              <span>Pas stijl aan</span>
            </button>

            {/* Desktop: back to style */}
            {canRegenerate && (
              <button
                onClick={onBackToStyle}
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-colors text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                title={`Kies een andere stijl (nog ${regenerationsLeft}x)`}
              >
                <span className="material-symbols-outlined text-lg">palette</span>
                <span>Andere stijl</span>
                <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full">
                  {regenerationsLeft}
                </span>
              </button>
            )}

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
        </div>
      </div>

      {/* ── Max Regenerations Banner ── */}
      {!canRegenerate && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100]">
          <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-full px-5 py-2.5 shadow-lg">
            <span className="material-symbols-outlined text-amber-600 text-lg">info</span>
            <p className="text-sm text-amber-800">Maximum gratis stijlwijzigingen bereikt</p>
          </div>
        </div>
      )}
    </div>
  );
}
