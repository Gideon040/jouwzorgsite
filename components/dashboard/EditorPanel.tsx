'use client';

import { useState, useRef, useCallback } from 'react';
import { Site, SiteContent, GeneratedContent, Theme } from '@/types';
import { createClient } from '@/lib/supabase/client';
import type { SectionConfig } from '@/components/templates/sections/types';
import { TEMPLATE_SECTIONS } from '@/components/templates/TemplateRenderer';
import { palettes, paletteMetadata, type PaletteKey, fontPairings, fontPairingMetadata, type FontPairingKey } from '@/components/templates/themes';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PROPS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
interface EditorPanelProps {
  site: Site;
  content: SiteContent;
  generated: GeneratedContent;
  siteTheme: Theme;
  onContentUpdate: (content: SiteContent) => void;
  onGeneratedUpdate: (gen: GeneratedContent) => void;
  onThemeUpdate: (theme: Theme) => void;
  onTemplateChange?: (templateId: string) => void;
  disableImageUpload?: boolean;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DEEP SET HELPER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function deepSet(obj: any, path: string, value: any): any {
  const result = Array.isArray(obj) ? [...obj] : { ...obj };
  const parts = path.split('.');

  if (parts.length === 1) {
    result[parts[0]] = value;
    return result;
  }

  const [first, ...rest] = parts;
  const child = result[first];
  result[first] = deepSet(
    child != null ? child : (isNaN(Number(rest[0])) ? {} : []),
    rest.join('.'),
    value
  );
  return result;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION META (per section type)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const SECTION_META: Record<string, {
  name: string;
  icon: string;
  styles: string[];
  required?: boolean;
  useVariant?: boolean;
}> = {
  header:       { name: 'Header',       icon: 'web',               styles: [],                                                          required: true },
  hero:         { name: 'Hero',         icon: 'campaign',          styles: ['editorial', 'editorial-2', 'editorial-3', 'proactief', 'proactief-2', 'proactief-3', 'portfolio', 'portfolio-2', 'portfolio-3', 'mindoor', 'mindoor-2', 'mindoor-3', 'serene', 'serene-2', 'serene-3'] },
  stats:        { name: 'Statistieken', icon: 'bar_chart',         styles: ['editorial', 'proactief', 'portfolio', 'mindoor', 'serene'] },
  diensten:     { name: 'Diensten',     icon: 'medical_services',  styles: ['editorial', 'editorial-2', 'editorial-3', 'proactief', 'proactief-2', 'proactief-3', 'portfolio', 'portfolio-2', 'portfolio-3', 'mindoor', 'mindoor-2', 'mindoor-3', 'serene', 'serene-2', 'serene-3'] },
  over:         { name: 'Over Mij',     icon: 'person',            styles: ['editorial', 'editorial-2', 'editorial-3', 'proactief', 'proactief-2', 'proactief-3', 'portfolio', 'portfolio-2', 'portfolio-3', 'mindoor', 'mindoor-2', 'mindoor-3', 'serene', 'serene-2', 'serene-3'] },
  credentials:  { name: 'Credentials',  icon: 'verified',          styles: ['editorial', 'proactief', 'portfolio', 'mindoor', 'serene'] },
  werkervaring: { name: 'Werkervaring', icon: 'work',              styles: ['editorial-1', 'editorial-2', 'editorial-3', 'proactief-1', 'proactief-2', 'proactief-3', 'portfolio-1', 'portfolio-2', 'portfolio-3', 'mindoor-1', 'mindoor-2', 'mindoor-3', 'serene-1', 'serene-2', 'serene-3'] },
  voorwie:      { name: 'Voor Wie',     icon: 'groups',            styles: ['editorial', 'editorial-2', 'editorial-3', 'proactief', 'proactief-2', 'proactief-3', 'portfolio', 'portfolio-2', 'portfolio-3', 'mindoor', 'mindoor-2', 'mindoor-3', 'serene', 'serene-2', 'serene-3'] },
  quote:        { name: 'Quote',        icon: 'format_quote',      styles: ['banner', 'minimal', 'dark', 'serene'] },
  werkwijze:    { name: 'Werkwijze',    icon: 'route',             styles: [],                                                          useVariant: true },
  testimonials: { name: 'Testimonials', icon: 'star',              styles: ['editorial', 'editorial-2', 'editorial-3', 'proactief', 'proactief-2', 'proactief-3', 'portfolio', 'portfolio-2', 'portfolio-3', 'mindoor', 'mindoor-2', 'mindoor-3', 'serene', 'serene-2', 'serene-3'] },
  faq:          { name: 'FAQ',          icon: 'help',              styles: ['editorial', 'editorial-2', 'editorial-3', 'proactief', 'proactief-2', 'proactief-3', 'portfolio', 'portfolio-2', 'portfolio-3', 'mindoor', 'mindoor-2', 'mindoor-3', 'serene', 'serene-2', 'serene-3'] },
  cta:          { name: 'Call to Action', icon: 'ads_click',       styles: ['editorial', 'proactief', 'portfolio', 'mindoor', 'serene'] },
  contact:      { name: 'Contact',      icon: 'call',              styles: ['editorial', 'editorial-2', 'editorial-3', 'proactief', 'proactief-2', 'proactief-3', 'portfolio', 'portfolio-2', 'portfolio-3', 'mindoor', 'mindoor-2', 'mindoor-3', 'serene', 'serene-2', 'serene-3'] },
  footer:       { name: 'Footer',       icon: 'bottom_navigation', styles: [],                                                          required: true },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ACCORDION ITEM
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function AccordionItem({ id, label, icon, isOpen, onToggle, children }: {
  id: string;
  label: string;
  icon: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-slate-100">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-5 py-3 text-left transition-colors ${
          isOpen ? 'bg-teal-50/80' : 'hover:bg-slate-50'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <span className={`material-symbols-outlined text-lg ${isOpen ? 'text-teal-600' : 'text-slate-400'}`}>{icon}</span>
          <span className={`text-sm font-semibold ${isOpen ? 'text-teal-700' : 'text-slate-700'}`}>{label}</span>
        </div>
        <span className={`material-symbols-outlined text-lg text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>expand_more</span>
      </button>
      {isOpen && (
        <div className="px-5 pb-5 pt-2 space-y-3">
          {children}
        </div>
      )}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STYLE LABEL HELPERS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const QUOTE_STYLE_LABELS: Record<string, string> = {
  banner: 'Banner',
  minimal: 'Minimaal',
  dark: 'Donker',
  serene: 'Sereen',
};

function getStyleLabel(style: string, templateStyle: string): string {
  // Quote has its own names
  if (QUOTE_STYLE_LABELS[style]) return QUOTE_STYLE_LABELS[style];
  // Base template style = "Standaard"
  if (style === templateStyle || style === `${templateStyle}-1`) return 'Standaard';
  // Numbered variants
  const match = style.match(/-(\d)$/);
  if (match) return `Variant ${match[1]}`;
  return style;
}

function getRelevantStyles(allStyles: string[], templateStyle: string): string[] {
  if (!allStyles.length) return [];
  // Only show styles that belong to the active template
  const filtered = allStyles.filter(s =>
    s === templateStyle || s.startsWith(`${templateStyle}-`)
  );
  // For quote section: show all (banner, minimal, dark, serene)
  if (filtered.length === 0) return allStyles;
  return filtered;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SCROLL TO SECTION HELPER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function scrollToSection(sectionType: string) {
  // Find the section in the preview panel via data-section attribute
  const el = document.querySelector(`.editable-preview [data-section="${sectionType}"]`);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // Brief highlight flash
    el.classList.add('ring-2', 'ring-teal-400', 'ring-offset-2');
    setTimeout(() => el.classList.remove('ring-2', 'ring-teal-400', 'ring-offset-2'), 1500);
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION MANAGER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function SectionManager({ sections, templateStyle, onSectionsChange }: {
  sections: SectionConfig[];
  templateStyle: string;
  onSectionsChange: (sections: SectionConfig[]) => void;
}) {
  const [expandedType, setExpandedType] = useState<string | null>(null);
  const [showAddMenu, setShowAddMenu] = useState(false);

  // Section types that can be added
  const existingTypes = new Set(sections.map(s => s.type));
  const addableTypes = Object.entries(SECTION_META)
    .filter(([type, meta]) => !existingTypes.has(type) && !meta.required)
    .map(([type, meta]) => ({ type, ...meta }));

  const addSection = (type: string) => {
    const meta = SECTION_META[type];
    if (!meta) return;
    const defaultStyle = meta.styles.find(s => s === templateStyle || s.startsWith(templateStyle)) || meta.styles[0] || templateStyle;
    const newSection: SectionConfig = { type, style: defaultStyle, visible: true };
    // Insert before footer
    const footerIdx = sections.findIndex(s => s.type === 'footer');
    const updated = [...sections];
    if (footerIdx >= 0) {
      updated.splice(footerIdx, 0, newSection);
    } else {
      updated.push(newSection);
    }
    onSectionsChange(updated);
    setShowAddMenu(false);
    setTimeout(() => scrollToSection(type), 200);
  };

  const toggleVisibility = (index: number) => {
    const section = sections[index];
    if (SECTION_META[section.type]?.required) return;
    const updated = sections.map((s, i) =>
      i === index ? { ...s, visible: s.visible === false ? true : false } : s
    );
    onSectionsChange(updated);
  };

  const moveSection = (index: number, direction: -1 | 1) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= sections.length) return;
    if (sections[targetIdx].type === 'header' || sections[targetIdx].type === 'footer') return;
    const updated = [...sections];
    [updated[index], updated[targetIdx]] = [updated[targetIdx], updated[index]];
    onSectionsChange(updated);
  };

  const changeStyle = (index: number, style: string) => {
    const section = sections[index];
    const updated = sections.map((s, i) =>
      i === index ? { ...s, style } : s
    );
    onSectionsChange(updated);
    setTimeout(() => scrollToSection(section.type), 100);
  };

  const changeVariant = (index: number, variant: number) => {
    const section = sections[index];
    const updated = sections.map((s, i) =>
      i === index ? { ...s, variant } : s
    );
    onSectionsChange(updated);
    setTimeout(() => scrollToSection(section.type), 100);
  };

  // Determine move boundaries (skip header at start, footer at end)
  const firstMovable = sections.findIndex(s => s.type !== 'header');
  const lastMovable = sections.length - 1 - [...sections].reverse().findIndex(s => s.type !== 'footer');

  return (
    <div className="space-y-1">
      {sections.map((section, index) => {
        const meta = SECTION_META[section.type];
        if (!meta) return null;

        const isLocked = section.type === 'header' || section.type === 'footer';
        const isVisible = section.visible !== false;
        const isExpanded = expandedType === section.type;
        const relevantStyles = getRelevantStyles(meta.styles, templateStyle);
        const hasStyles = relevantStyles.length > 1;
        const hasVariant = meta.useVariant;
        const canMoveUp = !isLocked && index > firstMovable;
        const canMoveDown = !isLocked && index < lastMovable;

        return (
          <div
            key={section.type}
            className={`rounded-lg border transition-all ${
              !isVisible ? 'border-slate-100 bg-slate-50/50 opacity-60' : 'border-slate-200 bg-white'
            }`}
          >
            {/* Row */}
            <div className="flex items-center gap-1.5 px-2 py-1.5">
              {/* Move arrows or lock */}
              {!isLocked ? (
                <div className="flex flex-col -space-y-1">
                  <button
                    onClick={() => moveSection(index, -1)}
                    disabled={!canMoveUp}
                    className={`p-0 leading-none ${canMoveUp ? 'text-slate-400 hover:text-teal-600' : 'text-slate-200'}`}
                  >
                    <span className="material-symbols-outlined text-[16px]">keyboard_arrow_up</span>
                  </button>
                  <button
                    onClick={() => moveSection(index, 1)}
                    disabled={!canMoveDown}
                    className={`p-0 leading-none ${canMoveDown ? 'text-slate-400 hover:text-teal-600' : 'text-slate-200'}`}
                  >
                    <span className="material-symbols-outlined text-[16px]">keyboard_arrow_down</span>
                  </button>
                </div>
              ) : (
                <span className="material-symbols-outlined text-sm text-slate-300 w-[18px] text-center">lock</span>
              )}

              {/* Icon + Name */}
              <span className={`material-symbols-outlined text-sm ${isVisible ? 'text-slate-400' : 'text-slate-300'}`}>{meta.icon}</span>
              <span className={`text-xs font-medium flex-1 ${isVisible ? 'text-slate-700' : 'text-slate-400'}`}>{meta.name}</span>

              {/* Style expand button */}
              {(hasStyles || hasVariant) && !isLocked && (
                <button
                  onClick={() => setExpandedType(isExpanded ? null : section.type)}
                  className={`p-0.5 rounded transition-colors ${isExpanded ? 'text-teal-600' : 'text-slate-400 hover:text-slate-600'}`}
                  title="Stijl wijzigen"
                >
                  <span className="material-symbols-outlined text-sm">tune</span>
                </button>
              )}

              {/* Visibility toggle (not on required sections) */}
              {!meta.required && (
                <button
                  onClick={() => toggleVisibility(index)}
                  className={`p-0.5 rounded transition-colors ${isVisible ? 'text-green-500 hover:text-red-400' : 'text-slate-300 hover:text-green-500'}`}
                  title={isVisible ? 'Verbergen' : 'Tonen'}
                >
                  <span className="material-symbols-outlined text-sm">
                    {isVisible ? 'visibility' : 'visibility_off'}
                  </span>
                </button>
              )}
            </div>

            {/* Style picker (filtered to active template) */}
            {isExpanded && hasStyles && (
              <div className="px-2.5 pb-2.5 pt-1 border-t border-slate-100">
                <p className="text-[10px] text-slate-400 font-medium mb-1.5">Stijlvariant</p>
                <div className="flex flex-wrap gap-1.5">
                  {relevantStyles.map(s => (
                    <button
                      key={s}
                      onClick={() => changeStyle(index, s)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg border-2 transition-all ${
                        section.style === s
                          ? 'border-teal-400 bg-teal-50 text-teal-700 font-semibold'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {getStyleLabel(s, templateStyle)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Variant picker (werkwijze) */}
            {isExpanded && hasVariant && (
              <div className="px-2.5 pb-2.5 pt-1 border-t border-slate-100">
                <p className="text-[10px] text-slate-400 font-medium mb-1.5">Layout</p>
                <div className="flex gap-1.5">
                  {[1, 2, 3].map(v => (
                    <button
                      key={v}
                      onClick={() => changeVariant(index, v)}
                      className={`text-[11px] px-3 py-1.5 rounded-lg border-2 transition-all ${
                        (section.variant || 1) === v
                          ? 'border-teal-400 bg-teal-50 text-teal-700 font-semibold'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      Layout {v}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Reset button */}
      <button
        onClick={() => {
          const defaults = TEMPLATE_SECTIONS[templateStyle] || TEMPLATE_SECTIONS.editorial;
          onSectionsChange(defaults.map(s => ({ ...s })));
        }}
        className="w-full mt-2 py-1.5 text-[11px] font-medium text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg border border-dashed border-slate-200 hover:border-red-200 transition-all flex items-center justify-center gap-1"
      >
        <span className="material-symbols-outlined text-sm">restart_alt</span>
        Standaard volgorde herstellen
      </button>

      {/* Add section */}
      {addableTypes.length > 0 && (
        <div className="mt-2">
          <button
            onClick={() => setShowAddMenu(!showAddMenu)}
            className="w-full py-1.5 text-[11px] font-medium text-slate-500 hover:text-teal-600 hover:bg-teal-50 rounded-lg border border-dashed border-slate-200 hover:border-teal-300 transition-all flex items-center justify-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">{showAddMenu ? 'close' : 'add'}</span>
            {showAddMenu ? 'Annuleren' : 'Sectie toevoegen'}
          </button>

          {showAddMenu && (
            <div className="mt-1.5 space-y-1">
              {addableTypes.map(({ type, name, icon }) => (
                <button
                  key={type}
                  onClick={() => addSection(type)}
                  className="w-full flex items-center gap-2 px-2.5 py-2 text-left rounded-lg border border-slate-200 hover:border-teal-300 hover:bg-teal-50 transition-all"
                >
                  <span className="material-symbols-outlined text-sm text-teal-400">{icon}</span>
                  <span className="text-xs font-medium text-slate-700">{name}</span>
                  <span className="material-symbols-outlined text-sm text-slate-300 ml-auto">add_circle</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION CONTENT EDITORS MAPPING
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const SECTION_EDITORS: Record<string, { label: string; icon: string }> = {
  hero:         { label: 'Hero',          icon: 'campaign' },
  stats:        { label: 'Statistieken',  icon: 'bar_chart' },
  diensten:     { label: 'Diensten',      icon: 'medical_services' },
  over:         { label: 'Over Mij',      icon: 'person' },
  credentials:  { label: 'Credentials',   icon: 'verified' },
  werkervaring: { label: 'Werkervaring',  icon: 'work' },
  voorwie:      { label: 'Voor Wie',      icon: 'groups' },
  quote:        { label: 'Quote',         icon: 'format_quote' },
  werkwijze:    { label: 'Werkwijze',     icon: 'route' },
  testimonials: { label: 'Testimonials',  icon: 'star' },
  faq:          { label: 'FAQ',           icon: 'help' },
  cta:          { label: 'Call to Action', icon: 'ads_click' },
  contact:      { label: 'Contact',       icon: 'call' },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MAIN COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function EditorPanel({ site, content, generated, siteTheme, onContentUpdate, onGeneratedUpdate, onThemeUpdate, onTemplateChange, disableImageUpload }: EditorPanelProps) {
  const [openSection, setOpenSection] = useState<string | null>('stijl');

  const toggle = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  const setGen = (path: string, value: any) => {
    onGeneratedUpdate(deepSet(generated, path, value));
  };

  const setCont = (updates: Partial<SiteContent>) => {
    onContentUpdate({ ...content, ...updates });
  };

  const setGenItem = (arrayPath: string, index: number, field: string, value: any) => {
    const parts = arrayPath.split('.');
    let arr: any = generated;
    for (const p of parts) arr = arr?.[p];
    if (!Array.isArray(arr)) return;

    const newArr = arr.map((item: any, i: number) =>
      i === index ? { ...item, [field]: value } : item
    );
    setGen(arrayPath, newArr);
  };

  const addGenItem = (arrayPath: string, item: any) => {
    const parts = arrayPath.split('.');
    let arr: any = generated;
    for (const p of parts) arr = arr?.[p];
    const current = Array.isArray(arr) ? arr : [];
    setGen(arrayPath, [...current, item]);
  };

  const removeGenItem = (arrayPath: string, index: number) => {
    const parts = arrayPath.split('.');
    let arr: any = generated;
    for (const p of parts) arr = arr?.[p];
    if (!Array.isArray(arr)) return;
    setGen(arrayPath, arr.filter((_: any, i: number) => i !== index));
  };

  // ── Resolve active sections ──
  const templateStyle = site.template_id || 'editorial';
  const activeSections: SectionConfig[] =
    (generated.sections as SectionConfig[] | undefined) ||
    TEMPLATE_SECTIONS[templateStyle] ||
    TEMPLATE_SECTIONS.editorial;

  const visibleTypes = new Set(
    activeSections.filter(s => s.visible !== false).map(s => s.type)
  );

  const handleSectionsChange = useCallback((newSections: SectionConfig[]) => {
    onGeneratedUpdate({ ...generated, sections: newSections });
  }, [generated, onGeneratedUpdate]);

  // ── Render section content editor ──
  const renderEditor = (id: string) => {
    switch (id) {
      case 'hero':         return <HeroFields gen={generated} content={content} setGen={setGen} setCont={setCont} disableImageUpload={disableImageUpload} />;
      case 'stats':        return <StatsFields gen={generated} setGenItem={setGenItem} />;
      case 'diensten':     return <DienstenFields gen={generated} setGen={setGen} setGenItem={setGenItem} addGenItem={addGenItem} removeGenItem={removeGenItem} />;
      case 'over':         return <OverFields gen={generated} content={content} setGen={setGen} setCont={setCont} disableImageUpload={disableImageUpload} />;
      case 'credentials':  return <CredentialsFields gen={generated} setGen={setGen} />;
      case 'werkervaring': return <WerkervaringFields content={content} setCont={setCont} />;
      case 'voorwie':      return <VoorWieFields gen={generated} setGen={setGen} setGenItem={setGenItem} addGenItem={addGenItem} removeGenItem={removeGenItem} />;
      case 'quote':        return <QuoteFields gen={generated} setGen={setGen} disableImageUpload={disableImageUpload} />;
      case 'werkwijze':    return <WerkwijzeFields gen={generated} setGen={setGen} setGenItem={setGenItem} addGenItem={addGenItem} removeGenItem={removeGenItem} />;
      case 'testimonials': return <TestimonialsFields gen={generated} setGen={setGen} setGenItem={setGenItem} addGenItem={addGenItem} removeGenItem={removeGenItem} />;
      case 'faq':          return <FaqFields gen={generated} setGen={setGen} setGenItem={setGenItem} addGenItem={addGenItem} removeGenItem={removeGenItem} />;
      case 'cta':          return <CtaFields gen={generated} setGen={setGen} />;
      case 'contact':      return <ContactFields gen={generated} content={content} setGen={setGen} setCont={setCont} />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header — hidden in landing preview (onTemplateChange present) on mobile */}
      {!onTemplateChange && (
        <div className="flex items-center gap-2.5 px-5 py-4 border-b border-slate-100 bg-slate-50/80 shrink-0">
          <span className="material-symbols-outlined text-teal-600 text-xl">edit_note</span>
          <h3 className="font-bold text-slate-900 text-sm">Website bewerken</h3>
        </div>
      )}

      {/* Scrollable accordion */}
      <div className="flex-1 overflow-y-auto overscroll-contain">
        {/* Template picker (only when onTemplateChange is provided) */}
        {onTemplateChange && (
          <AccordionItem
            id="template"
            label="Template"
            icon="dashboard"
            isOpen={openSection === 'template'}
            onToggle={() => toggle('template')}
          >
            <TemplatePickerFields templateStyle={templateStyle} onTemplateChange={onTemplateChange} onThemeUpdate={onThemeUpdate} onGeneratedUpdate={onGeneratedUpdate} generated={generated} siteTheme={siteTheme} />
          </AccordionItem>
        )}

        {/* Fixed: Stijl & Kleuren */}
        <AccordionItem
          id="stijl"
          label="Stijl & Kleuren"
          icon="palette"
          isOpen={openSection === 'stijl'}
          onToggle={() => toggle('stijl')}
        >
          <StijlFields siteTheme={siteTheme} templateStyle={templateStyle} onThemeUpdate={onThemeUpdate} />
        </AccordionItem>

        {/* Fixed: Secties manager */}
        <AccordionItem
          id="secties"
          label="Secties"
          icon="view_list"
          isOpen={openSection === 'secties'}
          onToggle={() => toggle('secties')}
        >
          <SectionManager sections={activeSections} templateStyle={templateStyle} onSectionsChange={handleSectionsChange} />
        </AccordionItem>

        {/* Dynamic: content editors for visible sections */}
        {activeSections
          .filter(s => s.type !== 'header' && s.type !== 'footer' && s.visible !== false)
          .map(s => {
            const editor = SECTION_EDITORS[s.type];
            if (!editor) return null;
            return (
              <AccordionItem
                key={s.type}
                id={s.type}
                label={editor.label}
                icon={editor.icon}
                isOpen={openSection === s.type}
                onToggle={() => toggle(s.type)}
              >
                {renderEditor(s.type)}
              </AccordionItem>
            );
          })}
        <div className="h-8" />
      </div>
    </div>
  );
}


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SHARED UI
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function Field({ label, value, onChange, multiline, rows, placeholder }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
}) {
  const base = "w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:border-teal-400 focus:ring-1 focus:ring-teal-200 outline-none transition-all bg-white placeholder:text-slate-300";
  return (
    <div>
      <label className="block text-xs font-medium text-slate-500 mb-1">{label}</label>
      {multiline ? (
        <textarea value={value || ''} onChange={(e) => onChange(e.target.value)} rows={rows || 3} placeholder={placeholder} className={base + " resize-none"} />
      ) : (
        <input type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={base} />
      )}
    </div>
  );
}

// ── IMAGE UPLOAD FIELD ────────────────────
function ImageField({ label, value, onChange, hint, disabled }: {
  label: string;
  value?: string;
  onChange: (url: string | undefined) => void;
  hint?: string;
  disabled?: boolean;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setError('');

    if (!file.type.startsWith('image/')) {
      setError('Alleen afbeeldingen');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Max 5MB');
      return;
    }

    setIsUploading(true);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setError('Niet ingelogd');
        setIsUploading(false);
        return;
      }

      const ext = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { data, error: uploadErr } = await supabase.storage
        .from('site-assets')
        .upload(fileName, file, { cacheControl: '3600', upsert: false });

      if (uploadErr) {
        console.error('Upload error:', uploadErr);
        setError('Upload mislukt');
        setIsUploading(false);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('site-assets')
        .getPublicUrl(data.path);

      onChange(publicUrl);
    } catch (err) {
      console.error(err);
      setError('Er ging iets mis');
    }

    setIsUploading(false);
  };

  return (
    <div>
      <label className="block text-xs font-medium text-slate-500 mb-1.5">{label}</label>

      {disabled ? (
        // Disabled state — upload not available
        <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 flex flex-col items-center gap-2 opacity-60">
          {value ? (
            <img src={value} alt="Upload" className="w-full h-32 object-cover rounded-lg border border-slate-200 mb-1" />
          ) : (
            <span className="material-symbols-outlined text-2xl text-slate-300">photo_camera</span>
          )}
          <span className="text-xs text-slate-400">Beschikbaar na registratie</span>
        </div>
      ) : value ? (
        // Preview met vervang/verwijder
        <div className="relative group">
          <img
            src={value}
            alt="Upload"
            className="w-full h-32 object-cover rounded-lg border border-slate-200"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
            <button
              onClick={() => fileRef.current?.click()}
              className="px-3 py-1.5 bg-white text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-100 transition-colors"
            >
              <span className="material-symbols-outlined text-sm mr-1">swap_horiz</span>
              Vervang
            </button>
            <button
              onClick={() => onChange(undefined)}
              className="px-3 py-1.5 bg-red-500 text-white text-xs font-medium rounded-lg hover:bg-red-600 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">delete</span>
            </button>
          </div>
        </div>
      ) : (
        // Upload zone
        <div
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('border-teal-400', 'bg-teal-50'); }}
          onDragLeave={(e) => { e.preventDefault(); e.currentTarget.classList.remove('border-teal-400', 'bg-teal-50'); }}
          onDrop={(e) => {
            e.preventDefault();
            e.currentTarget.classList.remove('border-teal-400', 'bg-teal-50');
            const file = e.dataTransfer.files[0];
            if (file) handleFile(file);
          }}
          className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer transition-colors hover:border-teal-400 hover:bg-teal-50/50 ${
            isUploading ? 'opacity-50 pointer-events-none' : 'border-slate-200'
          }`}
        >
          <span className="material-symbols-outlined text-2xl text-slate-400">
            {isUploading ? 'progress_activity' : 'add_a_photo'}
          </span>
          <span className="text-xs text-slate-500">
            {isUploading ? 'Uploaden...' : 'Klik of sleep een foto'}
          </span>
          {hint && <span className="text-[10px] text-slate-400">{hint}</span>}
        </div>
      )}

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = '';
        }}
      />
    </div>
  );
}

function ItemCard({ children, label, index, onRemove }: { children: React.ReactNode; label: string; index: number; onRemove?: () => void }) {
  return (
    <div className="relative p-3 bg-slate-50/80 rounded-lg space-y-2 border border-slate-100">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label} {index + 1}</span>
        {onRemove && (
          <button
            onClick={onRemove}
            className="p-0.5 rounded text-slate-400 hover:text-red-500 transition-colors"
            title="Verwijderen"
          >
            <span className="material-symbols-outlined text-sm">delete</span>
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

function AddItemButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full py-2 text-xs font-medium text-slate-500 hover:text-teal-600 border border-dashed border-slate-300 hover:border-teal-400 rounded-xl transition-all flex items-center justify-center gap-1"
    >
      <span className="material-symbols-outlined text-sm">add</span>
      {label}
    </button>
  );
}

function Sep() {
  return <hr className="border-slate-100" />;
}

type SetGen       = (path: string, value: any) => void;
type SetGenItem   = (arrayPath: string, index: number, field: string, value: any) => void;
type SetCont      = (updates: Partial<SiteContent>) => void;
type AddGenItem   = (arrayPath: string, item: any) => void;
type RemoveGenItem = (arrayPath: string, index: number) => void;

const MAX_ITEMS = 15;


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TEMPLATE DATA
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const TEMPLATE_OPTIONS: { id: string; name: string; description: string; icon: string; defaultPalette: PaletteKey; defaultFont: FontPairingKey }[] = [
  { id: 'editorial', name: 'Editorial', description: 'Klassiek & warm', icon: 'auto_stories', defaultPalette: 'editorial', defaultFont: 'editorial' },
  { id: 'proactief', name: 'ProActief', description: 'Modern & energiek', icon: 'bolt', defaultPalette: 'proactief', defaultFont: 'proactief' },
  { id: 'portfolio', name: 'Portfolio', description: 'Elegant & sophisticated', icon: 'workspace_premium', defaultPalette: 'portfolio', defaultFont: 'portfolio' },
  { id: 'mindoor', name: 'Mindoor', description: 'Warm & organisch', icon: 'favorite', defaultPalette: 'mindoor', defaultFont: 'mindoor' },
  { id: 'serene', name: 'Serene', description: 'Rustig & zen', icon: 'spa', defaultPalette: 'serene', defaultFont: 'serene' },
];

// Map section styles from one template to another
function remapSectionStyles(sections: SectionConfig[], fromTemplate: string, toTemplate: string): SectionConfig[] {
  return sections.map(section => {
    const { style, ...rest } = section;
    if (!style) return { ...rest, style: toTemplate };

    // Quote has its own style names — keep as-is
    if (section.type === 'quote') return section;

    // Replace old template prefix with new one
    if (style === fromTemplate) return { ...rest, style: toTemplate };
    // Handle numbered variants like 'editorial-2' → 'proactief-2'
    const match = style.match(new RegExp(`^${fromTemplate}-(\\d)$`));
    if (match) return { ...rest, style: `${toTemplate}-${match[1]}` };

    // Fallback: use new template base style
    return { ...rest, style: toTemplate };
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FIELD GROUPS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ── TEMPLATE PICKER ──────────────────────
function TemplatePickerFields({ templateStyle, onTemplateChange, onThemeUpdate, onGeneratedUpdate, generated, siteTheme }: {
  templateStyle: string;
  onTemplateChange: (templateId: string) => void;
  onThemeUpdate: (theme: Theme) => void;
  onGeneratedUpdate: (gen: GeneratedContent) => void;
  generated: GeneratedContent;
  siteTheme: Theme;
}) {
  const handleSwitch = (newId: string) => {
    if (newId === templateStyle) return;
    const option = TEMPLATE_OPTIONS.find(t => t.id === newId);
    if (!option) return;

    // 1. Remap section styles
    const currentSections: SectionConfig[] = generated.sections || TEMPLATE_SECTIONS[templateStyle] || TEMPLATE_SECTIONS.editorial;
    const remapped = remapSectionStyles(currentSections, templateStyle, newId);
    onGeneratedUpdate({ ...generated, sections: remapped });

    // 2. Update theme (palette + font to match new template)
    onThemeUpdate({ ...siteTheme, palette: option.defaultPalette, fontPairing: option.defaultFont });

    // 3. Update template_id on the site
    onTemplateChange(newId);
  };

  return (
    <div className="space-y-2">
      {TEMPLATE_OPTIONS.map(t => {
        const isActive = templateStyle === t.id;
        const p = palettes[t.defaultPalette];
        return (
          <button
            key={t.id}
            onClick={() => handleSwitch(t.id)}
            className={`w-full text-left px-3 py-3 rounded-xl border-2 transition-all ${
              isActive
                ? 'border-teal-400 bg-teal-50/50 shadow-sm'
                : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Color swatches */}
              <div className="flex -space-x-1 shrink-0">
                <div className="w-6 h-6 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: p.primary }} />
                <div className="w-6 h-6 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: p.accent }} />
                <div className="w-6 h-6 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: p.bg }} />
              </div>
              <div className="flex-1 min-w-0">
                <span className={`block text-sm font-semibold ${isActive ? 'text-teal-700' : 'text-slate-700'}`}>
                  {t.name}
                </span>
                <span className="block text-[10px] text-slate-400">{t.description}</span>
              </div>
              {isActive && (
                <span className="material-symbols-outlined text-sm text-teal-600 shrink-0">check_circle</span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ── PALETTE FAMILIES ──────────────────────
const PALETTE_FAMILIES: { label: string; keys: PaletteKey[] }[] = [
  { label: 'Editorial', keys: ['editorial', 'burgundy', 'navy', 'caramel'] },
  { label: 'ProActief', keys: ['proactief', 'electric', 'sunset', 'emerald'] },
  { label: 'Portfolio', keys: ['portfolio', 'charcoal', 'midnight', 'espresso'] },
  { label: 'Mindoor', keys: ['mindoor', 'dustyrose', 'olive', 'amber'] },
  { label: 'Serene', keys: ['serene', 'stone', 'dusk', 'moss'] },
];

// ── FONT PAIRING OPTIONS ─────────────────
// Only show the main template-specific + generic pairings (skip legacy soft/clean)
const FONT_PAIRINGS: FontPairingKey[] = [
  'editorial', 'proactief', 'portfolio', 'mindoor', 'serene',
  'classic', 'modern', 'elegant', 'friendly', 'professional',
];

// ── STIJL & KLEUREN (Palette + Font Picker) ─
function StijlFields({ siteTheme, templateStyle, onThemeUpdate }: {
  siteTheme: Theme;
  templateStyle: string;
  onThemeUpdate: (theme: Theme) => void;
}) {
  const currentPalette = siteTheme.palette || templateStyle;
  const currentFont = siteTheme.fontPairing || templateStyle;

  const selectPalette = (key: PaletteKey) => {
    onThemeUpdate({ ...siteTheme, palette: key });
  };

  const selectFont = (key: FontPairingKey) => {
    onThemeUpdate({ ...siteTheme, fontPairing: key });
  };

  return (
    <>
      {/* ── Font Pairings ── */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-slate-500 mb-2">Lettertype combinatie</label>
        <div className="space-y-1.5">
          {FONT_PAIRINGS.map((key) => {
            const fp = fontPairings[key];
            const meta = fontPairingMetadata[key];
            const isActive = currentFont === key;
            // Extract just the font family name for preview
            const headingFont = fp.heading.split(',')[0].replace(/'/g, '');
            const bodyFont = fp.body.split(',')[0].replace(/'/g, '');
            return (
              <button
                key={key}
                onClick={() => selectFont(key)}
                className={`w-full relative text-left px-3 py-2.5 rounded-lg border-2 transition-all ${
                  isActive
                    ? 'border-teal-400 bg-teal-50/50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className={`block text-sm font-semibold ${isActive ? 'text-teal-700' : 'text-slate-700'}`} style={{ fontFamily: fp.heading }}>
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
      </div>

      <Sep />

      {/* ── Palettes ── */}
      <label className="block text-xs font-medium text-slate-500 mb-1">Kleurenpalet</label>
      {PALETTE_FAMILIES.map((family) => (
        <div key={family.label} className="mb-3">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{family.label}</p>
          <div className="grid grid-cols-2 gap-2">
            {family.keys.map((key) => {
              const p = palettes[key];
              const meta = paletteMetadata[key];
              const isActive = currentPalette === key;
              return (
                <button
                  key={key}
                  onClick={() => selectPalette(key)}
                  className={`group relative text-left p-2.5 rounded-xl border-2 transition-all ${
                    isActive
                      ? 'border-teal-400 bg-teal-50/50 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  {/* Color swatches */}
                  <div className="flex gap-1 mb-2">
                    <div className="w-6 h-6 rounded-full border border-white/50 shadow-sm" style={{ backgroundColor: p.primary }} />
                    <div className="w-6 h-6 rounded-full border border-white/50 shadow-sm" style={{ backgroundColor: p.accent }} />
                    <div className="w-6 h-6 rounded-full border border-slate-200/50 shadow-sm" style={{ backgroundColor: p.bg }} />
                    <div className="w-6 h-6 rounded-full border border-slate-200/50 shadow-sm" style={{ backgroundColor: p.bgAlt }} />
                  </div>
                  {/* Label */}
                  <span className={`block text-[11px] font-semibold ${isActive ? 'text-teal-700' : 'text-slate-700'}`}>
                    {meta.name}
                  </span>
                  <span className="block text-[10px] text-slate-400 leading-tight">{meta.description}</span>
                  {/* Check mark */}
                  {isActive && (
                    <span className="absolute top-1.5 right-1.5 material-symbols-outlined text-sm text-teal-600">check_circle</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}

// ── HERO ──────────────────────────────────
function HeroFields({ gen, content, setGen, setCont, disableImageUpload }: { gen: GeneratedContent; content: SiteContent; setGen: SetGen; setCont: SetCont; disableImageUpload?: boolean }) {
  return (
    <>
      <ImageField
        label="Profielfoto"
        value={content.foto}
        onChange={(url) => setCont({ foto: url })}
        hint="Wordt getoond in hero & over mij · Max 5MB"
        disabled={disableImageUpload}
      />
      <Field label="Naam" value={content.naam} onChange={(v) => setCont({ naam: v })} />
      <Field label="Titel" value={gen.hero?.titel || ''} onChange={(v) => setGen('hero.titel', v)} placeholder="Bijv. Zorg met aandacht" />
      <Field label="Subtitel" value={gen.hero?.subtitel || ''} onChange={(v) => {
        setGen('hero.subtitel', v);
        setCont({ tagline: v });
      }} placeholder="Korte ondertitel" />
    </>
  );
}

// ── STATS ─────────────────────────────────
function StatsFields({ gen, setGenItem }: { gen: GeneratedContent; setGenItem: SetGenItem }) {
  const stats = gen.stats || [];
  if (!stats.length) return <p className="text-xs text-slate-400 italic">Geen statistieken</p>;
  return (
    <>
      {stats.map((s, i) => (
        <ItemCard key={i} label="Stat" index={i}>
          <Field label="Waarde" value={s.value} onChange={(v) => setGenItem('stats', i, 'value', v)} placeholder="10+" />
          <Field label="Label" value={s.label} onChange={(v) => setGenItem('stats', i, 'label', v)} placeholder="Jaar ervaring" />
        </ItemCard>
      ))}
    </>
  );
}

// ── DIENSTEN ──────────────────────────────
function DienstenFields({ gen, setGen, setGenItem, addGenItem, removeGenItem }: { gen: GeneratedContent; setGen: SetGen; setGenItem: SetGenItem; addGenItem: AddGenItem; removeGenItem: RemoveGenItem }) {
  const d = gen.diensten;
  const items = d?.items || [];
  return (
    <>
      <Field label="Sectie titel" value={d?.titel || ''} onChange={(v) => setGen('diensten.titel', v)} />
      <Field label="Intro" value={d?.intro || ''} onChange={(v) => setGen('diensten.intro', v)} multiline rows={2} />
      <Sep />
      {items.map((item, i) => (
        <ItemCard key={i} label="Dienst" index={i} onRemove={items.length > 1 ? () => removeGenItem('diensten.items', i) : undefined}>
          <Field label="Naam" value={item.naam} onChange={(v) => setGenItem('diensten.items', i, 'naam', v)} />
          <Field label="Beschrijving" value={item.beschrijving || ''} onChange={(v) => setGenItem('diensten.items', i, 'beschrijving', v)} multiline rows={2} />
        </ItemCard>
      ))}
      {items.length < MAX_ITEMS && (
        <AddItemButton label="Dienst toevoegen" onClick={() => addGenItem('diensten.items', { naam: '', beschrijving: '' })} />
      )}
    </>
  );
}

// ── OVER MIJ ──────────────────────────────
function OverFields({ gen, content, setGen, setCont, disableImageUpload }: { gen: GeneratedContent; content: SiteContent; setGen: SetGen; setCont: SetCont; disableImageUpload?: boolean }) {
  const o = gen.overMij;
  return (
    <>
      <ImageField
        label="Foto (over mij)"
        value={content.foto}
        onChange={(url) => setCont({ foto: url })}
        hint="Dezelfde foto als in de hero"
        disabled={disableImageUpload}
      />
      <Field label="Sectie titel" value={o?.titel || ''} onChange={(v) => setGen('overMij.titel', v)} placeholder="Over mij" />
      <Field label="Intro" value={o?.intro || ''} onChange={(v) => setGen('overMij.intro', v)} multiline rows={3} />
      <Field label="Body" value={o?.body || ''} onChange={(v) => setGen('overMij.body', v)} multiline rows={4} />
      <Field label="Persoonlijke noot" value={o?.persoonlijk || ''} onChange={(v) => setGen('overMij.persoonlijk', v)} multiline rows={2} />
    </>
  );
}

// ── CREDENTIALS ───────────────────────────
function CredentialsFields({ gen, setGen }: { gen: GeneratedContent; setGen: SetGen }) {
  return (
    <>
      <Field label="Sectie titel" value={gen.credentials?.titel || ''} onChange={(v) => setGen('credentials.titel', v)} />
      <Field label="Intro" value={gen.credentials?.intro || ''} onChange={(v) => setGen('credentials.intro', v)} multiline rows={2} />
    </>
  );
}

// ── WERKERVARING ──────────────────────────
function WerkervaringFields({ content, setCont }: { content: SiteContent; setCont: SetCont }) {
  const items = content.werkervaring || [];

  const update = (index: number, field: string, value: any) => {
    const newItems = items.map((item, i) => i === index ? { ...item, [field]: value } : item);
    setCont({ werkervaring: newItems });
  };

  const addItem = () => {
    setCont({ werkervaring: [...items, { functie: '', werkgever: '' }] });
  };

  const removeItem = (index: number) => {
    setCont({ werkervaring: items.filter((_, i) => i !== index) });
  };

  return (
    <>
      {items.length === 0 && <p className="text-xs text-slate-400 italic">Geen werkervaring</p>}
      {items.map((item, i) => (
        <ItemCard key={i} label="Positie" index={i} onRemove={() => removeItem(i)}>
          <Field label="Functie" value={item.functie} onChange={(v) => update(i, 'functie', v)} />
          <Field label="Werkgever" value={item.werkgever} onChange={(v) => update(i, 'werkgever', v)} />
          <div className="grid grid-cols-2 gap-2">
            <Field label="Van" value={String(item.startJaar || item.start_jaar || '')} onChange={(v) => update(i, 'startJaar', parseInt(v) || undefined)} />
            <Field label="Tot" value={String(item.eindJaar || item.eind_jaar || '')} onChange={(v) => update(i, 'eindJaar', parseInt(v) || undefined)} placeholder="Heden" />
          </div>
        </ItemCard>
      ))}
      {items.length < MAX_ITEMS && (
        <AddItemButton label="Werkervaring toevoegen" onClick={addItem} />
      )}
    </>
  );
}

// ── VOOR WIE ──────────────────────────────
function VoorWieFields({ gen, setGen, setGenItem, addGenItem, removeGenItem }: { gen: GeneratedContent; setGen: SetGen; setGenItem: SetGenItem; addGenItem: AddGenItem; removeGenItem: RemoveGenItem }) {
  const vw = gen.voorWie;
  const items = vw?.doelgroepen || [];
  return (
    <>
      <Field label="Sectie titel" value={vw?.titel || ''} onChange={(v) => setGen('voorWie.titel', v)} />
      <Field label="Intro" value={vw?.intro || ''} onChange={(v) => setGen('voorWie.intro', v)} multiline rows={2} />
      <Sep />
      {items.map((dg, i) => (
        <ItemCard key={i} label="Doelgroep" index={i} onRemove={items.length > 1 ? () => removeGenItem('voorWie.doelgroepen', i) : undefined}>
          <Field label="Titel" value={dg.titel} onChange={(v) => setGenItem('voorWie.doelgroepen', i, 'titel', v)} />
          <Field label="Tekst" value={dg.tekst} onChange={(v) => setGenItem('voorWie.doelgroepen', i, 'tekst', v)} multiline rows={2} />
        </ItemCard>
      ))}
      {items.length < MAX_ITEMS && (
        <AddItemButton label="Doelgroep toevoegen" onClick={() => addGenItem('voorWie.doelgroepen', { type: 'overig', titel: '', tekst: '' })} />
      )}
    </>
  );
}

// ── QUOTE ─────────────────────────────────
function QuoteFields({ gen, setGen, disableImageUpload }: { gen: GeneratedContent; setGen: SetGen; disableImageUpload?: boolean }) {
  return (
    <>
      <Field label="Quote" value={gen.quote || ''} onChange={(v) => setGen('quote', v)} multiline rows={3} placeholder="Zorg begint bij aandacht" />
      <ImageField
        label="Sfeerbeeld (banner/dark stijl)"
        value={gen.quoteImage}
        onChange={(url) => setGen('quoteImage', url)}
        hint="Optioneel · Wordt getoond bij banner en dark stijl"
        disabled={disableImageUpload}
      />
    </>
  );
}

// ── WERKWIJZE ─────────────────────────────
function WerkwijzeFields({ gen, setGen, setGenItem, addGenItem, removeGenItem }: { gen: GeneratedContent; setGen: SetGen; setGenItem: SetGenItem; addGenItem: AddGenItem; removeGenItem: RemoveGenItem }) {
  const w = gen.werkwijze;
  const items = w?.stappen || [];
  return (
    <>
      <Field label="Sectie titel" value={w?.titel || ''} onChange={(v) => setGen('werkwijze.titel', v)} />
      <Field label="Intro" value={w?.intro || ''} onChange={(v) => setGen('werkwijze.intro', v)} multiline rows={2} />
      <Sep />
      {items.map((stap, i) => (
        <ItemCard key={i} label="Stap" index={i} onRemove={items.length > 1 ? () => removeGenItem('werkwijze.stappen', i) : undefined}>
          <Field label="Titel" value={stap.titel} onChange={(v) => setGenItem('werkwijze.stappen', i, 'titel', v)} />
          <Field label="Beschrijving" value={stap.beschrijving} onChange={(v) => setGenItem('werkwijze.stappen', i, 'beschrijving', v)} multiline rows={2} />
        </ItemCard>
      ))}
      {items.length < MAX_ITEMS && (
        <AddItemButton label="Stap toevoegen" onClick={() => addGenItem('werkwijze.stappen', { titel: '', beschrijving: '', nummer: items.length + 1 })} />
      )}
    </>
  );
}

// ── TESTIMONIALS ──────────────────────────
function TestimonialsFields({ gen, setGen, setGenItem, addGenItem, removeGenItem }: { gen: GeneratedContent; setGen: SetGen; setGenItem: SetGenItem; addGenItem: AddGenItem; removeGenItem: RemoveGenItem }) {
  const t = gen.testimonials;
  const items = t?.items || [];
  return (
    <>
      <Field label="Sectie titel" value={t?.titel || ''} onChange={(v) => setGen('testimonials.titel', v)} />
      <Sep />
      {items.map((item, i) => (
        <ItemCard key={i} label="Review" index={i} onRemove={items.length > 1 ? () => removeGenItem('testimonials.items', i) : undefined}>
          <Field label="Tekst" value={item.tekst} onChange={(v) => setGenItem('testimonials.items', i, 'tekst', v)} multiline rows={3} />
          <div className="grid grid-cols-2 gap-2">
            <Field label="Naam" value={item.naam} onChange={(v) => setGenItem('testimonials.items', i, 'naam', v)} />
            <Field label="Functie" value={item.functie || ''} onChange={(v) => setGenItem('testimonials.items', i, 'functie', v)} />
          </div>
        </ItemCard>
      ))}
      {items.length < MAX_ITEMS && (
        <AddItemButton label="Review toevoegen" onClick={() => addGenItem('testimonials.items', { tekst: '', naam: '', functie: '' })} />
      )}
    </>
  );
}

// ── FAQ ───────────────────────────────────
function FaqFields({ gen, setGen, setGenItem, addGenItem, removeGenItem }: { gen: GeneratedContent; setGen: SetGen; setGenItem: SetGenItem; addGenItem: AddGenItem; removeGenItem: RemoveGenItem }) {
  const f = gen.faq;
  const items = f?.items || [];
  return (
    <>
      <Field label="Sectie titel" value={f?.titel || ''} onChange={(v) => setGen('faq.titel', v)} />
      <Sep />
      {items.map((item, i) => (
        <ItemCard key={i} label="Vraag" index={i} onRemove={items.length > 1 ? () => removeGenItem('faq.items', i) : undefined}>
          <Field label="Vraag" value={item.vraag} onChange={(v) => setGenItem('faq.items', i, 'vraag', v)} />
          <Field label="Antwoord" value={item.antwoord} onChange={(v) => setGenItem('faq.items', i, 'antwoord', v)} multiline rows={3} />
        </ItemCard>
      ))}
      {items.length < MAX_ITEMS && (
        <AddItemButton label="Vraag toevoegen" onClick={() => addGenItem('faq.items', { vraag: '', antwoord: '' })} />
      )}
    </>
  );
}

// ── CTA ───────────────────────────────────
function CtaFields({ gen, setGen }: { gen: GeneratedContent; setGen: SetGen }) {
  return (
    <>
      <Field label="Titel" value={gen.cta?.titel || ''} onChange={(v) => setGen('cta.titel', v)} />
      <Field label="Tekst" value={gen.cta?.tekst || ''} onChange={(v) => setGen('cta.tekst', v)} multiline rows={2} />
      <Field label="Button tekst" value={gen.cta?.button || ''} onChange={(v) => setGen('cta.button', v)} />
    </>
  );
}

// ── CONTACT ───────────────────────────────
function ContactFields({ gen, content, setGen, setCont }: { gen: GeneratedContent; content: SiteContent; setGen: SetGen; setCont: SetCont }) {
  return (
    <>
      <Field label="Sectie titel" value={gen.contact?.titel || ''} onChange={(v) => setGen('contact.titel', v)} />
      <Field label="Intro" value={gen.contact?.intro || ''} onChange={(v) => setGen('contact.intro', v)} multiline rows={2} />
      <Sep />
      <Field label="E-mailadres" value={content.contact?.email || ''} onChange={(v) => setCont({ contact: { ...content.contact, email: v } })} />
      <Field label="Telefoon" value={content.contact?.telefoon || content.telefoon || ''} onChange={(v) => setCont({ contact: { ...content.contact, telefoon: v } })} placeholder="06-12345678" />
      <Field
        label="Werkgebied (komma-gescheiden)"
        value={content.contact?.werkgebied?.join(', ') || ''}
        onChange={(v) => setCont({ contact: { ...content.contact, werkgebied: v.split(',').map(s => s.trim()).filter(Boolean) } })}
        placeholder="Amsterdam, Utrecht"
      />
    </>
  );
}