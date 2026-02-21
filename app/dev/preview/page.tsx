'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { getTheme, getPalette, palettes, paletteMetadata, type PaletteKey } from '@/components/templates/themes';
import { SECTION_REGISTRY, SIDEBAR_SECTIONS, type SectionRegistryEntry } from './sectionRegistry';
import { MOCK_CONTENT, MOCK_GENERATED, MOCK_BEROEP_LABEL } from './mockData';

// ============================================
// CONSTANTS
// ============================================

const TEMPLATE_OPTIONS = [
  { value: 'editorial', label: 'Editorial' },
  { value: 'proactief', label: 'ProActief' },
  { value: 'portfolio', label: 'Portfolio' },
  { value: 'mindoor', label: 'Mindoor' },
  { value: 'serene', label: 'Serene' },
] as const;

// Non-legacy palettes only
const PALETTE_OPTIONS: { value: string; label: string }[] = (
  Object.keys(paletteMetadata) as PaletteKey[]
).filter(k => !['sage', 'lavender', 'slate', 'mint', 'sand', 'rose', 'ocean', 'forest', 'coral', 'teal'].includes(k))
  .map(k => ({
    value: k,
    label: paletteMetadata[k].name,
  }));

// ============================================
// SECTION CARD
// ============================================

// Whether a section uses position:fixed and needs containment
const FIXED_SECTIONS = new Set(['header']);

function SectionCard({ entry, variant, theme, palette }: {
  entry: SectionRegistryEntry;
  variant: { style: string; label: string; extraProps?: Record<string, unknown> };
  theme: ReturnType<typeof getTheme>;
  palette: ReturnType<typeof getPalette>;
}) {
  const Component = entry.component;
  const props = {
    theme,
    palette,
    content: MOCK_CONTENT,
    generated: MOCK_GENERATED,
    beroepLabel: MOCK_BEROEP_LABEL,
    style: variant.style,
    ...variant.extraProps,
  };

  const isFixed = FIXED_SECTIONS.has(entry.type);

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2 px-2">
        <span className="text-xs font-mono font-bold text-gray-500 uppercase tracking-wider">
          {entry.type}
        </span>
        <span className="text-xs font-mono text-gray-400">/</span>
        <span className="text-sm font-mono font-semibold text-gray-700">
          {variant.label}
        </span>
      </div>
      <div className={`border border-gray-200 rounded-lg overflow-hidden shadow-sm ${
        isFixed ? 'relative h-20' : ''
      }`}
        // transform creates a new containing block so position:fixed stays inside
        style={isFixed ? { transform: 'translateZ(0)' } : undefined}
      >
        <Component {...props} />
      </div>
    </div>
  );
}

// ============================================
// MAIN PAGE
// ============================================

export default function SectionPreviewPage() {
  const [activeTheme, setActiveTheme] = useState('editorial');
  const [activePalette, setActivePalette] = useState('editorial');
  const [activeSection, setActiveSection] = useState(SIDEBAR_SECTIONS[0]?.type ?? 'hero');

  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const contentRef = useRef<HTMLDivElement>(null);

  const theme = getTheme(activeTheme);
  const palette = getPalette(activePalette);

  // Scroll to section on sidebar click
  const scrollToSection = useCallback((type: string) => {
    setActiveSection(type);
    const el = sectionRefs.current[type];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // IntersectionObserver for sidebar highlight
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const type = entry.target.getAttribute('data-section-type');
            if (type) setActiveSection(type);
          }
        }
      },
      { rootMargin: '-100px 0px -60% 0px', threshold: 0 }
    );

    const els = Object.values(sectionRefs.current).filter(Boolean) as HTMLDivElement[];
    els.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="sticky top-0 z-[100] bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-6 py-3 max-w-[1800px] mx-auto">
          <h1 className="text-lg font-bold text-gray-800 tracking-tight">
            Sectie Preview Catalogus
          </h1>
          <div className="flex items-center gap-4">
            {/* Theme selector */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Theme
              </label>
              <select
                value={activeTheme}
                onChange={(e) => setActiveTheme(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {TEMPLATE_OPTIONS.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            {/* Palette selector */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Palette
              </label>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: (palettes as Record<string, { primary: string }>)[activePalette]?.primary ?? '#ccc' }}
                />
                <select
                  value={activePalette}
                  onChange={(e) => setActivePalette(e.target.value)}
                  className="text-sm border border-gray-300 rounded-md px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {PALETTE_OPTIONS.map(p => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex max-w-[1800px] mx-auto">
        {/* Sidebar */}
        <aside className="sticky top-[57px] z-[90] h-[calc(100vh-57px)] w-48 shrink-0 overflow-y-auto border-r border-gray-200 bg-white py-4">
          <nav className="space-y-0.5 px-2">
            {SIDEBAR_SECTIONS.map(s => (
              <button
                key={s.type}
                onClick={() => scrollToSection(s.type)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  activeSection === s.type
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {s.label}
                <span className="ml-1.5 text-xs text-gray-400">
                  ({s.variants.length})
                </span>
              </button>
            ))}
            {/* Header & Footer at bottom */}
            <div className="pt-3 mt-3 border-t border-gray-200">
              <p className="px-3 py-1 text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                Layout
              </p>
              {SECTION_REGISTRY.filter(s => s.type === 'header' || s.type === 'footer').map(s => (
                <button
                  key={s.type}
                  onClick={() => scrollToSection(s.type)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    activeSection === s.type
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {s.label}
                  <span className="ml-1.5 text-xs text-gray-400">
                    ({s.variants.length})
                  </span>
                </button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Content area */}
        <main ref={contentRef} className="flex-1 min-w-0 p-8">
          {SECTION_REGISTRY.map(entry => (
            <div
              key={entry.type}
              ref={(el) => { sectionRefs.current[entry.type] = el; }}
              data-section-type={entry.type}
              className="mb-16"
            >
              {/* Section group header */}
              <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-gray-300">
                <h2 className="text-xl font-bold text-gray-800">{entry.label}</h2>
                <span className="text-sm text-gray-400 font-mono">
                  {entry.variants.length} variant{entry.variants.length !== 1 ? 'en' : ''}
                </span>
              </div>

              {/* All variants */}
              {entry.variants.map((variant, i) => (
                <SectionCard
                  key={`${entry.type}-${variant.style}-${variant.label}-${i}`}
                  entry={entry}
                  variant={variant}
                  theme={theme}
                  palette={palette}
                />
              ))}
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}
