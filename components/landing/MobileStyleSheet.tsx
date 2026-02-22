'use client';

import { useState } from 'react';
import { Site, GeneratedContent, Theme } from '@/types';
import type { SectionConfig } from '@/components/templates/sections/types';
import { TEMPLATE_SECTIONS } from '@/components/templates/TemplateRenderer';
import { palettes, paletteMetadata, type PaletteKey, fontPairings, fontPairingMetadata, type FontPairingKey } from '@/components/templates/themes';

// ── Template data ──
const TEMPLATES = [
  { id: 'editorial', name: 'Editorial', desc: 'Klassiek & warm', palette: 'editorial' as PaletteKey, font: 'editorial' as FontPairingKey },
  { id: 'proactief', name: 'ProActief', desc: 'Modern & energiek', palette: 'proactief' as PaletteKey, font: 'proactief' as FontPairingKey },
  { id: 'portfolio', name: 'Portfolio', desc: 'Elegant & strak', palette: 'portfolio' as PaletteKey, font: 'portfolio' as FontPairingKey },
  { id: 'mindoor', name: 'Mindoor', desc: 'Warm & organisch', palette: 'mindoor' as PaletteKey, font: 'mindoor' as FontPairingKey },
  { id: 'serene', name: 'Serene', desc: 'Rustig & zen', palette: 'serene' as PaletteKey, font: 'serene' as FontPairingKey },
];

const PALETTE_FAMILIES: { label: string; keys: PaletteKey[] }[] = [
  { label: 'Editorial', keys: ['editorial', 'burgundy', 'navy', 'caramel'] },
  { label: 'ProActief', keys: ['proactief', 'electric', 'sunset', 'emerald'] },
  { label: 'Portfolio', keys: ['portfolio', 'charcoal', 'midnight', 'espresso'] },
  { label: 'Mindoor', keys: ['mindoor', 'dustyrose', 'olive', 'amber'] },
  { label: 'Serene', keys: ['serene', 'stone', 'dusk', 'moss'] },
];

const FONT_OPTIONS: FontPairingKey[] = [
  'editorial', 'proactief', 'portfolio', 'mindoor', 'serene',
  'classic', 'modern', 'elegant', 'friendly', 'professional',
];

function remapSectionStyles(sections: SectionConfig[], from: string, to: string): SectionConfig[] {
  return sections.map(s => {
    if (s.type === 'quote' || !s.style) return { ...s, style: s.style || to };
    if (s.style === from) return { ...s, style: to };
    const m = s.style.match(new RegExp(`^${from}-(\\d)$`));
    if (m) return { ...s, style: `${to}-${m[1]}` };
    return { ...s, style: to };
  });
}

// ── Props ──
interface MobileStyleSheetProps {
  site: Site;
  generated: GeneratedContent;
  siteTheme: Theme;
  onGeneratedUpdate: (gen: GeneratedContent) => void;
  onThemeUpdate: (theme: Theme) => void;
  onTemplateChange: (templateId: string) => void;
  onClose: () => void;
}

type Tab = 'template' | 'kleur' | 'font';

export function MobileStyleSheet({
  site,
  generated,
  siteTheme,
  onGeneratedUpdate,
  onThemeUpdate,
  onTemplateChange,
  onClose,
}: MobileStyleSheetProps) {
  const [tab, setTab] = useState<Tab>('template');

  const templateStyle = site.template_id || 'editorial';
  const currentPalette = siteTheme.palette || templateStyle;
  const currentFont = siteTheme.fontPairing || templateStyle;

  const switchTemplate = (newId: string) => {
    if (newId === templateStyle) return;
    const t = TEMPLATES.find(t => t.id === newId);
    if (!t) return;
    const sections: SectionConfig[] = generated.sections || TEMPLATE_SECTIONS[templateStyle] || TEMPLATE_SECTIONS.editorial;
    onGeneratedUpdate({ ...generated, sections: remapSectionStyles(sections, templateStyle, newId) });
    onThemeUpdate({ ...siteTheme, palette: t.palette, fontPairing: t.font });
    onTemplateChange(newId);
  };

  const selectPalette = (key: PaletteKey) => {
    onThemeUpdate({ ...siteTheme, palette: key });
  };

  const selectFont = (key: FontPairingKey) => {
    onThemeUpdate({ ...siteTheme, fontPairing: key });
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[125] bg-black/30" onClick={onClose} />

      {/* Sheet */}
      <div className="fixed bottom-12 left-0 right-0 z-[126] bg-white rounded-t-2xl shadow-2xl max-h-[55vh] flex flex-col">
        {/* Handle + tabs */}
        <div className="pt-3 pb-2 px-4 shrink-0">
          <div className="w-10 h-1 rounded-full bg-slate-300 mx-auto mb-3" />
          <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
            {([
              { id: 'template' as Tab, label: 'Template', icon: 'dashboard' },
              { id: 'kleur' as Tab, label: 'Kleuren', icon: 'palette' },
              { id: 'font' as Tab, label: 'Fonts', icon: 'text_fields' },
            ]).map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                  tab === t.id
                    ? 'bg-white text-teal-700 shadow-sm'
                    : 'text-slate-500'
                }`}
              >
                <span className="material-symbols-outlined text-base">{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">

          {/* ── Template tab ── */}
          {tab === 'template' && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              {TEMPLATES.map(t => {
                const p = palettes[t.palette];
                const isActive = templateStyle === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => switchTemplate(t.id)}
                    className={`text-left p-3 rounded-xl border-2 transition-all ${
                      isActive
                        ? 'border-teal-400 bg-teal-50/50'
                        : 'border-slate-200 active:border-slate-300'
                    }`}
                  >
                    <div className="flex gap-1 mb-2">
                      <div className="w-5 h-5 rounded-full border border-white shadow-sm" style={{ backgroundColor: p.primary }} />
                      <div className="w-5 h-5 rounded-full border border-white shadow-sm" style={{ backgroundColor: p.accent }} />
                      <div className="w-5 h-5 rounded-full border border-slate-200 shadow-sm" style={{ backgroundColor: p.bg }} />
                    </div>
                    <p className={`text-xs font-semibold ${isActive ? 'text-teal-700' : 'text-slate-700'}`}>{t.name}</p>
                    <p className="text-[10px] text-slate-400">{t.desc}</p>
                    {isActive && (
                      <span className="material-symbols-outlined text-xs text-teal-600 absolute top-2 right-2">check_circle</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* ── Kleuren tab ── */}
          {tab === 'kleur' && (
            <div className="space-y-4 pt-2">
              {PALETTE_FAMILIES.map(family => (
                <div key={family.label}>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">{family.label}</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {family.keys.map(key => {
                      const p = palettes[key];
                      const meta = paletteMetadata[key];
                      const isActive = currentPalette === key;
                      return (
                        <button
                          key={key}
                          onClick={() => selectPalette(key)}
                          className={`flex items-center gap-2 p-2 rounded-xl border-2 transition-all ${
                            isActive
                              ? 'border-teal-400 bg-teal-50/50'
                              : 'border-slate-200 active:border-slate-300'
                          }`}
                        >
                          <div className="flex -space-x-1 shrink-0">
                            <div className="w-5 h-5 rounded-full border border-white shadow-sm" style={{ backgroundColor: p.primary }} />
                            <div className="w-5 h-5 rounded-full border border-white shadow-sm" style={{ backgroundColor: p.accent }} />
                            <div className="w-5 h-5 rounded-full border border-slate-200 shadow-sm" style={{ backgroundColor: p.bg }} />
                          </div>
                          <span className={`text-[11px] font-medium truncate ${isActive ? 'text-teal-700' : 'text-slate-700'}`}>
                            {meta.name}
                          </span>
                          {isActive && (
                            <span className="material-symbols-outlined text-xs text-teal-600 ml-auto shrink-0">check_circle</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Font tab ── */}
          {tab === 'font' && (
            <div className="space-y-1.5 pt-2">
              {FONT_OPTIONS.map(key => {
                const fp = fontPairings[key];
                const meta = fontPairingMetadata[key];
                const isActive = currentFont === key;
                const headingFont = fp.heading.split(',')[0].replace(/'/g, '');
                const bodyFont = fp.body.split(',')[0].replace(/'/g, '');
                return (
                  <button
                    key={key}
                    onClick={() => selectFont(key)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl border-2 transition-all ${
                      isActive
                        ? 'border-teal-400 bg-teal-50/50'
                        : 'border-slate-200 active:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span
                          className={`block text-sm font-semibold ${isActive ? 'text-teal-700' : 'text-slate-700'}`}
                          style={{ fontFamily: fp.heading }}
                        >
                          {meta.name}
                        </span>
                        <span className="block text-[10px] text-slate-400" style={{ fontFamily: fp.body }}>
                          {headingFont} + {bodyFont}
                        </span>
                      </div>
                      {isActive && (
                        <span className="material-symbols-outlined text-sm text-teal-600">check_circle</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
