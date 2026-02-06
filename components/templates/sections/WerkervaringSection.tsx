// components/templates/sections/WerkervaringSection.tsx
// Werkervaring section — 15 template-specific variants + 3 generic
// Converted from approved HTML previews

'use client';

import { BaseSectionProps, getRevealClass } from './types';

// Style type
export type WerkervaringStyle =
  | 'editorial-1' | 'editorial-2' | 'editorial-3'
  | 'proactief-1' | 'proactief-2' | 'proactief-3'
  | 'portfolio-1' | 'portfolio-2' | 'portfolio-3'
  | 'mindoor-1' | 'mindoor-2' | 'mindoor-3'
  | 'serene-1' | 'serene-2' | 'serene-3'
  | 'timeline' | 'cards' | 'compact';

interface WerkervaringSectionProps extends BaseSectionProps {
  style?: WerkervaringStyle;
}

export function WerkervaringSection({
  style = 'editorial-1',
  theme,
  palette,
  content,
  generated,
}: WerkervaringSectionProps) {
  const werkervaring = content.werkervaring || [];
  if (werkervaring.length === 0) return null;

  const titel = 'Mijn Ervaring';
  const intro = 'Een overzicht van mijn professionele achtergrond in de zorg.';
  const props = { theme, palette, werkervaring, titel, intro };

  switch (style) {
    case 'editorial-1': return <Editorial1 {...props} />;
    case 'editorial-2': return <Editorial2 {...props} />;
    case 'editorial-3': return <Editorial3 {...props} />;
    case 'proactief-1': return <Proactief1 {...props} />;
    case 'proactief-2': return <Proactief2 {...props} />;
    case 'proactief-3': return <Proactief3 {...props} />;
    case 'portfolio-1': return <Portfolio1 {...props} />;
    case 'portfolio-2': return <Portfolio2 {...props} />;
    case 'portfolio-3': return <Portfolio3 {...props} />;
    case 'mindoor-1': return <Mindoor1 {...props} />;
    case 'mindoor-2': return <Mindoor2 {...props} />;
    case 'mindoor-3': return <Mindoor3 {...props} />;
    case 'serene-1': return <Serene1 {...props} />;
    case 'serene-2': return <Serene2 {...props} />;
    case 'serene-3': return <Serene3 {...props} />;
    case 'timeline': return <GenericTimeline {...props} />;
    case 'cards': return <GenericCards {...props} />;
    case 'compact': return <GenericCompact {...props} />;
    default: return <Editorial1 {...props} />;
  }
}

// ============================================
// HELPERS
// ============================================
function formatPeriode(item: any): string {
  const startJaar = item.start_jaar || item.startJaar;
  const eindJaar = item.eind_jaar || item.eindJaar;
  if (eindJaar) return `${startJaar} – ${eindJaar}`;
  return `${startJaar} – Heden`;
}

function isHuidig(item: any): boolean {
  return !item.eind_jaar && !item.eindJaar;
}

function getStartJaar(item: any): string {
  return String(item.start_jaar || item.startJaar || '');
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '0,0,0';
  return `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`;
}

interface VariantProps {
  theme: any;
  palette: any;
  werkervaring: any[];
  titel: string;
  intro: string;
}


// ============================================
// EDITORIAL 1 — Classic Vertical Timeline
// Dots, hover-lift cards, current-state highlight
// ============================================
function Editorial1({ theme, palette, werkervaring, titel, intro }: VariantProps) {
  return (
    <section id="werkervaring" className="px-6 md:px-16 lg:px-32 py-20" style={{ backgroundColor: theme.colors.background }}>
      <div className="max-w-[700px] mx-auto">

        {/* Header */}
        <div className={`text-center mb-14 ${getRevealClass('up')}`}>
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.15em] block mb-3"
            style={{ fontVariant: 'small-caps', color: palette.primary }}
          >
            Achtergrond
          </span>
          <h2 className="text-4xl mb-3" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>
            {titel}
          </h2>
          <p className="max-w-[540px] mx-auto text-[15px] leading-[1.7]" style={{ color: theme.colors.textMuted }}>
            {intro}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative pl-8 border-l-2" style={{ borderColor: `${palette.primary}30` }}>
          {werkervaring.slice(0, 5).map((item: any, i: number) => {
            const huidig = isHuidig(item);
            return (
              <div key={i} className={`relative pb-10 last:pb-0 group ${getRevealClass('left', i + 1)}`}>
                {/* Dot */}
                <div
                  className="absolute -left-[41px] top-1 w-4 h-4 rounded-full border-4 transition-colors duration-300 group-hover:!bg-[var(--dot-active)]"
                  style={{
                    borderColor: theme.colors.background,
                    backgroundColor: huidig ? palette.primary : `${palette.primary}40`,
                    '--dot-active': palette.primary,
                  } as any}
                />
                {/* Card */}
                <div
                  className="p-6 rounded-xl border transition-all duration-300 group-hover:border-l-[3px]"
                  style={{
                    backgroundColor: huidig ? `${palette.primary}08` : theme.colors.surface,
                    borderColor: huidig ? palette.primary : theme.colors.border,
                    borderLeftColor: huidig ? palette.primary : 'transparent',
                    borderLeftWidth: huidig ? '3px' : '1px',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.backgroundColor = `${palette.primary}08`;
                    el.style.borderLeftColor = palette.primary;
                    el.style.borderColor = palette.primary;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.backgroundColor = huidig ? `${palette.primary}08` : theme.colors.surface;
                    el.style.borderColor = huidig ? palette.primary : theme.colors.border;
                    el.style.borderLeftColor = huidig ? palette.primary : 'transparent';
                  }}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-[17px] font-bold" style={{ color: theme.colors.text }}>{item.functie}</h3>
                    <span
                      className="text-[11px] font-semibold px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: huidig ? `${palette.primary}15` : theme.colors.backgroundAlt,
                        color: huidig ? palette.primary : theme.colors.textMuted,
                      }}
                    >
                      {formatPeriode(item)}
                    </span>
                  </div>
                  <p className="font-medium text-sm mb-2" style={{ color: palette.primary }}>{item.werkgever}</p>
                  {item.beschrijving && (
                    <p className="text-sm leading-[1.65]" style={{ color: theme.colors.textMuted }}>{item.beschrijving}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


// ============================================
// EDITORIAL 2 — Sticky Year Sidebar + Stacked Rows
// Grid layout, year badges, trust badges, hover highlight
// ============================================
function Editorial2({ theme, palette, werkervaring, titel, intro }: VariantProps) {
  return (
    <section id="werkervaring" className="px-6 md:px-16 lg:px-32 py-20" style={{ backgroundColor: theme.colors.background }}>
      <div className="max-w-[800px] mx-auto">

        <div className={`text-center mb-14 ${getRevealClass('up')}`}>
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] block mb-3" style={{ color: palette.primary }}>
            Achtergrond
          </span>
          <h2 className="text-4xl mb-3" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>{titel}</h2>
          <p className="max-w-[540px] mx-auto text-[15px] leading-[1.7]" style={{ color: theme.colors.textMuted }}>{intro}</p>
        </div>

        <div>
          {werkervaring.slice(0, 5).map((item: any, i: number) => {
            const huidig = isHuidig(item);
            return (
              <div
                key={i}
                className={`grid grid-cols-[120px_1fr] gap-8 py-7 border-b transition-all duration-300 ${getRevealClass('up', i + 1)}`}
                style={{ borderColor: theme.colors.border }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.background = `${palette.primary}08`;
                  el.style.margin = '0 -16px';
                  el.style.padding = '28px 16px';
                  el.style.borderRadius = '12px';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.background = 'transparent';
                  el.style.margin = '0';
                  el.style.padding = '28px 0';
                  el.style.borderRadius = '0';
                }}
              >
                {/* Year column */}
                <div className="pt-0.5">
                  {huidig ? (
                    <span
                      className="inline-block text-[11px] font-semibold px-2.5 py-1 rounded-md text-white"
                      style={{ backgroundColor: palette.primary }}
                    >
                      HUIDIG
                    </span>
                  ) : null}
                  <span className="block mt-1.5 text-xs" style={{ color: theme.colors.textMuted }}>
                    {formatPeriode(item)}
                  </span>
                </div>

                {/* Content column */}
                <div>
                  <h3 className="text-[17px] font-bold mb-1" style={{ color: theme.colors.text }}>{item.functie}</h3>
                  <p className="text-sm font-medium mb-2" style={{ color: palette.primary }}>{item.werkgever}</p>
                  {item.beschrijving && (
                    <p className="text-sm leading-[1.65] mb-3" style={{ color: theme.colors.textMuted }}>{item.beschrijving}</p>
                  )}
                  {/* Trust badges - only for first item as example, or based on data */}
                  {huidig && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {['BIG-geregistreerd', 'DBA-compliant', 'AGB-code'].map((badge) => (
                        <span
                          key={badge}
                          className="text-[10px] font-semibold uppercase tracking-[0.05em] px-2.5 py-[3px] rounded border"
                          style={{ borderColor: theme.colors.border, color: theme.colors.textMuted, backgroundColor: theme.colors.background }}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


// ============================================
// EDITORIAL 3 — Ghost Numbers + Check-circle
// Large ghost numbers, check-circle for current
// ============================================
function Editorial3({ theme, palette, werkervaring, titel, intro }: VariantProps) {
  return (
    <section id="werkervaring" className="px-6 md:px-16 lg:px-32 py-20" style={{ backgroundColor: theme.colors.background }}>
      <div className="max-w-[720px] mx-auto">

        <div className={`text-center mb-14 ${getRevealClass('up')}`}>
          <span
            className="inline-block border text-[10px] font-semibold uppercase tracking-[0.15em] px-[18px] py-[5px] rounded-full mb-4"
            style={{ borderColor: palette.primary, color: palette.primary }}
          >
            Loopbaan
          </span>
          <h2 className="text-4xl mb-3" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>{titel}</h2>
          <p className="max-w-[540px] mx-auto text-[15px] leading-[1.7]" style={{ color: theme.colors.textMuted }}>{intro}</p>
        </div>

        <div>
          {werkervaring.slice(0, 5).map((item: any, i: number) => {
            const huidig = isHuidig(item);
            return (
              <div
                key={i}
                className={`grid grid-cols-[72px_1fr] gap-6 py-8 border-b transition-all duration-300 cursor-default ${getRevealClass('up', i + 1)}`}
                style={{ borderColor: theme.colors.border }}
                onMouseEnter={(e) => { e.currentTarget.style.paddingLeft = '8px'; }}
                onMouseLeave={(e) => { e.currentTarget.style.paddingLeft = '0'; }}
              >
                {/* Ghost number */}
                <div
                  className="font-bold leading-none text-center select-none transition-all duration-400 text-[72px]"
                  style={{ fontFamily: theme.fonts.heading, color: palette.primary, opacity: 0.07 }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.35'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.07'; e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-bold mb-0.5" style={{ color: theme.colors.text }}>{item.functie}</h3>
                  <div className="flex flex-wrap gap-3 items-center mb-2.5">
                    <span className="text-sm font-medium" style={{ color: palette.primary }}>{item.werkgever}</span>
                    <span className="text-[13px] flex items-center gap-1" style={{ color: theme.colors.textMuted }}>
                      <span className="material-symbols-outlined text-sm" style={{ verticalAlign: '-2px' }}>calendar_today</span>
                      {formatPeriode(item)}
                    </span>
                  </div>
                  {item.beschrijving && (
                    <p className="text-sm leading-[1.65]" style={{ color: theme.colors.textMuted }}>{item.beschrijving}</p>
                  )}
                  {huidig && (
                    <div className="inline-flex items-center gap-1 text-[11px] font-semibold mt-2.5" style={{ color: palette.primary }}>
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      Huidige functie
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


// ============================================
// PROACTIEF 1 — Stacked Progress Cards
// Progress bar, numbered pills, hover translateX
// ============================================
function Proactief1({ theme, palette, werkervaring, titel, intro }: VariantProps) {
  return (
    <section id="werkervaring" className="py-20 px-6 md:px-8 relative overflow-hidden" style={{ backgroundColor: theme.colors.backgroundAlt }}>
      {/* Deco circles */}
      <div className="absolute -top-[60px] -right-10 w-[200px] h-[200px] rounded-full" style={{ backgroundColor: palette.primary, opacity: 0.05 }} />
      <div className="absolute -bottom-10 -left-[60px] w-40 h-40 rounded-full" style={{ border: `30px solid ${palette.primary}15`, opacity: 0.5 }} />

      <div className="max-w-[760px] mx-auto relative z-10">
        <div className={`mb-10 ${getRevealClass('up')}`}>
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.1em] px-5 py-1.5 rounded-full text-white mb-3.5" style={{ backgroundColor: palette.primary }}>
            Werkervaring
          </span>
          <h2 className="text-[34px] font-bold mb-2.5" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>{titel}</h2>
          <p className="text-[15px] leading-[1.7] max-w-[520px]" style={{ color: theme.colors.textMuted }}>{intro}</p>
        </div>

        {/* Progress bar */}
        <div className="flex justify-between mb-2.5 text-[11px] font-medium" style={{ color: theme.colors.textMuted }}>
          {werkervaring.slice(0, 5).map((item: any, i: number) => (
            <span key={i} style={i === 0 ? { color: palette.primary, fontWeight: 700 } : {}}>
              {isHuidig(item) ? 'Heden' : getStartJaar(item)}
            </span>
          )).reverse()}
        </div>
        <div className="h-1.5 rounded-full overflow-hidden mb-9" style={{ backgroundColor: `${palette.primary}12` }}>
          <div className="h-full rounded-full" style={{ width: '85%', backgroundColor: palette.primary }} />
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-3">
          {werkervaring.slice(0, 5).map((item: any, i: number) => {
            const huidig = isHuidig(item);
            return (
              <div
                key={i}
                className={`grid grid-cols-[56px_1fr_auto] items-start gap-5 p-6 rounded-[20px] border-l-4 border-transparent transition-all duration-[350ms] ${getRevealClass('up', i + 1)}`}
                style={{ backgroundColor: theme.colors.surface, boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = 'translateX(6px)';
                  el.style.borderLeftColor = palette.primary;
                  el.style.boxShadow = `0 8px 28px ${palette.primary}1F`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = 'translateX(0)';
                  el.style.borderLeftColor = 'transparent';
                  el.style.boxShadow = '0 2px 10px rgba(0,0,0,0.04)';
                }}
              >
                {/* Num pill */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold text-lg transition-all duration-[350ms] num-pill"
                  style={{ backgroundColor: `${palette.primary}15`, color: palette.primary }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = palette.primary; e.currentTarget.style.color = 'white'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = `${palette.primary}15`; e.currentTarget.style.color = palette.primary; }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-[16px] font-bold mb-0.5" style={{ color: theme.colors.text }}>{item.functie}</h3>
                  <p className="text-sm font-semibold mb-1.5" style={{ color: palette.primary }}>{item.werkgever}</p>
                  {item.beschrijving && (
                    <p className="text-[13px] leading-[1.6]" style={{ color: theme.colors.textMuted }}>{item.beschrijving}</p>
                  )}
                </div>

                {/* Period */}
                <div className="text-right whitespace-nowrap pt-0.5">
                  <div className="text-[13px] font-semibold" style={{ color: theme.colors.textMuted }}>{formatPeriode(item)}</div>
                  {huidig && (
                    <span
                      className="inline-block mt-1.5 text-[10px] font-bold uppercase tracking-[0.08em] px-2.5 py-[3px] rounded-full text-white"
                      style={{ backgroundColor: palette.accent || palette.primary }}
                    >
                      Huidig
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


// ============================================
// PROACTIEF 2 — Bold Bento Grid
// Hero card, asymmetric grid, stat card, live dot
// ============================================
function Proactief2({ theme, palette, werkervaring, titel, intro }: VariantProps) {
  const first = werkervaring[0];
  const rest = werkervaring.slice(1, 4);

  return (
    <section id="werkervaring" className="py-20 px-6 md:px-8 relative overflow-hidden" style={{ backgroundColor: theme.colors.background }}>
      <div className="absolute top-10 -left-20 w-60 h-60 rounded-full" style={{ backgroundColor: palette.primary, opacity: 0.04 }} />

      <div className="max-w-[880px] mx-auto relative z-10">
        <div className={`text-center mb-12 ${getRevealClass('up')}`}>
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.1em] px-5 py-1.5 rounded-full text-white mb-3.5" style={{ backgroundColor: palette.primary }}>
            Werkervaring
          </span>
          <h2 className="text-4xl font-bold mb-2.5" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>{titel}</h2>
          <p className="text-[15px] max-w-[480px] mx-auto leading-[1.7]" style={{ color: theme.colors.textMuted }}>{intro}</p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Hero card - spans 2 cols */}
          {first && (
            <div
              className={`md:col-span-2 text-white p-9 relative overflow-hidden transition-all duration-[350ms] ${getRevealClass('up', 1)}`}
              style={{ backgroundColor: palette.primary }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 12px 40px ${palette.primary}4D`; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div className="absolute -top-[30px] -right-[30px] w-[140px] h-[140px] rounded-full bg-white/[0.08]" />
              <div className="absolute -bottom-5 left-[40%] w-20 h-20 rounded-full bg-white/[0.05]" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 bg-white/[0.15] px-3.5 py-[5px] rounded-full text-[11px] font-semibold mb-4">
                  <span className="w-[7px] h-[7px] rounded-full bg-emerald-300 animate-pulse" />
                  Huidige functie
                </div>
                <h3 className="text-2xl font-bold mb-1">{first.functie}</h3>
                <p className="text-[15px] opacity-75 font-medium mb-1.5">{first.werkgever}</p>
                <p className="text-[13px] opacity-50 mb-3.5">{formatPeriode(first)}</p>
                {first.beschrijving && (
                  <p className="text-sm leading-[1.65] opacity-[0.85]">{first.beschrijving}</p>
                )}
              </div>
            </div>
          )}

          {/* Rest of cards */}
          {rest.map((item: any, i: number) => (
            <div
              key={i}
              className={`p-6 flex flex-col border-2 border-transparent transition-all duration-[350ms] ${getRevealClass('up', i + 2)}`}
              style={{ backgroundColor: theme.colors.surface, boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = palette.primary;
                el.style.boxShadow = `0 8px 28px ${palette.primary}1A`;
                el.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = 'transparent';
                el.style.boxShadow = '0 2px 10px rgba(0,0,0,0.04)';
                el.style.transform = 'translateY(0)';
              }}
            >
              <div className="text-[32px] font-extrabold mb-3 transition-opacity duration-[350ms]" style={{ color: palette.primary, opacity: 0.15 }}>
                {String(i + 2).padStart(2, '0')}
              </div>
              <h3 className="text-[15px] font-bold mb-0.5" style={{ color: theme.colors.text }}>{item.functie}</h3>
              <p className="text-[13px] font-semibold mb-1" style={{ color: palette.primary }}>{item.werkgever}</p>
              <p className="text-xs font-medium mb-2.5" style={{ color: theme.colors.textMuted }}>{formatPeriode(item)}</p>
              {item.beschrijving && (
                <p className="text-[13px] leading-[1.55] flex-1" style={{ color: theme.colors.textMuted }}>{item.beschrijving}</p>
              )}
            </div>
          ))}

          {/* Accent stat card */}
          <div
            className="p-6 flex flex-col items-center justify-center text-center text-white transition-all duration-[350ms]"
            style={{ backgroundColor: palette.accent || palette.primary }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 8px 28px ${palette.accent || palette.primary}40`; e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div className="text-[44px] font-extrabold mb-1">{werkervaring.length * 2}+</div>
            <div className="text-sm font-semibold">Jaar zorgervaring</div>
            <div className="text-xs opacity-70 mt-0.5">Diverse settings</div>
          </div>
        </div>
      </div>
    </section>
  );
}


// ============================================
// PROACTIEF 3 — Horizontal Scroll Snap Cards
// Scroll row, top-bar accent, hover color swap
// ============================================
function Proactief3({ theme, palette, werkervaring, titel, intro }: VariantProps) {
  return (
    <section id="werkervaring" className="py-20 px-6 md:px-8 relative overflow-hidden" style={{ backgroundColor: theme.colors.backgroundAlt }}>
      <div className="absolute top-1/2 -right-[60px] -translate-y-1/2 w-[180px] h-[180px] rounded-full" style={{ border: `35px solid ${palette.primary}15`, opacity: 0.4 }} />

      <div className="max-w-[960px] mx-auto relative z-10">
        <div className={`mb-10 ${getRevealClass('up')}`}>
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.1em] px-5 py-1.5 rounded-full text-white mb-3.5" style={{ backgroundColor: palette.primary }}>
            Werkervaring
          </span>
          <h2 className="text-[34px] font-bold mb-2.5" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>{titel}</h2>
          <p className="text-[15px] leading-[1.7] max-w-[480px]" style={{ color: theme.colors.textMuted }}>{intro}</p>
        </div>

        {/* Scroll row */}
        <div className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4" style={{ scrollbarWidth: 'thin', scrollbarColor: `${palette.primary}33 transparent` }}>
          {werkervaring.slice(0, 5).map((item: any, i: number) => (
            <div
              key={i}
              className="flex-[0_0_280px] snap-start flex flex-col overflow-hidden transition-all duration-[400ms] group"
              style={{ backgroundColor: theme.colors.surface, boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(-4px)';
                el.style.boxShadow = `0 12px 32px ${palette.primary}26`;
                // Color swap body
                const body = el.querySelector('.card-body') as HTMLElement;
                if (body) body.style.backgroundColor = palette.primary;
                // Update text colors
                el.querySelectorAll('.swap-text').forEach((t) => { (t as HTMLElement).style.color = 'white'; });
                el.querySelectorAll('.swap-muted').forEach((t) => { (t as HTMLElement).style.color = 'rgba(255,255,255,0.75)'; });
                el.querySelectorAll('.swap-accent').forEach((t) => { (t as HTMLElement).style.color = 'rgba(255,255,255,0.7)'; });
                // Pill
                const pill = el.querySelector('.period-pill') as HTMLElement;
                if (pill) { pill.style.backgroundColor = 'rgba(255,255,255,0.2)'; pill.style.color = 'white'; }
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = '0 2px 10px rgba(0,0,0,0.04)';
                const body = el.querySelector('.card-body') as HTMLElement;
                if (body) body.style.backgroundColor = 'transparent';
                el.querySelectorAll('.swap-text').forEach((t) => { (t as HTMLElement).style.color = theme.colors.text; });
                el.querySelectorAll('.swap-muted').forEach((t) => { (t as HTMLElement).style.color = theme.colors.textMuted; });
                el.querySelectorAll('.swap-accent').forEach((t) => { (t as HTMLElement).style.color = palette.primary; });
                const pill = el.querySelector('.period-pill') as HTMLElement;
                if (pill) { pill.style.backgroundColor = `${palette.primary}15`; pill.style.color = palette.primary; }
              }}
            >
              {/* Top bar */}
              <div className="h-1.5 transition-all duration-[400ms]" style={{ backgroundColor: palette.primary }} />

              {/* Body */}
              <div className="card-body p-6 flex-1 flex flex-col transition-all duration-[400ms]">
                <span
                  className="period-pill inline-block self-start text-[11px] font-semibold px-3 py-1 rounded-full mb-3.5 transition-all duration-[400ms]"
                  style={{ backgroundColor: `${palette.primary}15`, color: palette.primary }}
                >
                  {formatPeriode(item)}
                </span>
                <h3 className="swap-text text-lg font-bold mb-1 transition-colors duration-[400ms]" style={{ color: theme.colors.text }}>{item.functie}</h3>
                <p className="swap-accent text-sm font-semibold mb-3 transition-colors duration-[400ms]" style={{ color: palette.primary }}>{item.werkgever}</p>
                {item.beschrijving && (
                  <p className="swap-muted text-[13px] leading-[1.6] flex-1 transition-colors duration-[400ms]" style={{ color: theme.colors.textMuted }}>{item.beschrijving}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-5 text-xs font-medium" style={{ color: theme.colors.textMuted }}>
          <span className="material-symbols-outlined text-[16px] animate-bounce" style={{ color: palette.accent || palette.primary }}>swipe_right</span>
          Scroll voor meer ervaring
        </div>
      </div>
    </section>
  );
}


// ============================================
// PORTFOLIO 1 — Elegant Serif List
// Full row hover to primary color, no icons
// ============================================
function Portfolio1({ theme, palette, werkervaring, titel, intro }: VariantProps) {
  return (
    <section id="werkervaring" className="px-6 md:px-16 lg:px-32 py-20" style={{ backgroundColor: theme.colors.background }}>
      <div className="max-w-[720px] mx-auto">

        <div className={`text-center mb-14 ${getRevealClass('up')}`}>
          <div className="text-[32px] mb-2" style={{ fontFamily: theme.fonts.heading, color: palette.accent || palette.primary }}>❦</div>
          <h2 className="text-[40px] font-semibold mb-3" style={{ fontFamily: theme.fonts.heading, color: palette.primary }}>
            Mijn <em className="italic" style={{ color: palette.accent || palette.primary }}>pad</em>
          </h2>
          <div className="w-[60px] h-px mx-auto mb-4" style={{ backgroundColor: palette.accent || palette.primary, opacity: 0.5 }} />
          <p className="max-w-[480px] mx-auto text-[15px] leading-[1.7]" style={{ color: theme.colors.textMuted }}>{intro}</p>
        </div>

        <div className="flex flex-col">
          {werkervaring.slice(0, 5).map((item: any, i: number) => {
            const huidig = isHuidig(item);
            return (
              <div
                key={i}
                className={`block py-7 px-4 -mx-4 border-b transition-all duration-[350ms] rounded-lg ${getRevealClass('up', i + 1)}`}
                style={{ borderColor: theme.colors.border }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.backgroundColor = palette.primary;
                  el.style.borderColor = 'transparent';
                  el.querySelectorAll('.port-title').forEach((t) => { (t as HTMLElement).style.color = '#ffffff'; });
                  el.querySelectorAll('.port-employer').forEach((t) => { (t as HTMLElement).style.color = palette.accent ? `${palette.accent}CC` : 'rgba(255,255,255,0.7)'; });
                  el.querySelectorAll('.port-muted').forEach((t) => { (t as HTMLElement).style.color = 'rgba(255,255,255,0.5)'; });
                  el.querySelectorAll('.port-desc').forEach((t) => { (t as HTMLElement).style.color = 'rgba(255,255,255,0.7)'; });
                  el.querySelectorAll('.port-badge').forEach((t) => { (t as HTMLElement).style.color = palette.accent ? `${palette.accent}CC` : 'rgba(255,255,255,0.7)'; });
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.backgroundColor = 'transparent';
                  el.style.borderColor = theme.colors.border;
                  el.querySelectorAll('.port-title').forEach((t) => { (t as HTMLElement).style.color = palette.primary; });
                  el.querySelectorAll('.port-employer').forEach((t) => { (t as HTMLElement).style.color = palette.accent || palette.primary; });
                  el.querySelectorAll('.port-muted').forEach((t) => { (t as HTMLElement).style.color = theme.colors.textMuted; });
                  el.querySelectorAll('.port-desc').forEach((t) => { (t as HTMLElement).style.color = theme.colors.textMuted; });
                  el.querySelectorAll('.port-badge').forEach((t) => { (t as HTMLElement).style.color = palette.accent || palette.primary; });
                }}
              >
                <h3 className="port-title text-xl font-semibold mb-0.5 transition-colors duration-[350ms]" style={{ fontFamily: theme.fonts.heading, color: palette.primary }}>{item.functie}</h3>
                <div className="flex gap-4 items-center mb-2">
                  <span className="port-employer text-sm font-medium italic transition-colors duration-[350ms]" style={{ color: palette.accent || palette.primary }}>{item.werkgever}</span>
                  <span className="port-muted text-[13px] transition-colors duration-[350ms]" style={{ color: theme.colors.textMuted }}>{formatPeriode(item)}</span>
                </div>
                {item.beschrijving && (
                  <p className="port-desc text-sm leading-[1.65] transition-colors duration-[350ms]" style={{ color: theme.colors.textMuted }}>{item.beschrijving}</p>
                )}
                {huidig && (
                  <div className="port-badge inline-flex items-center gap-1 text-[11px] font-semibold mt-2 transition-colors duration-[350ms]" style={{ color: palette.accent || palette.primary }}>
                    Huidige functie
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


// ============================================
// PORTFOLIO 2 — Magazine Split Cards
// Alternating dark/light, accent hover
// ============================================
function Portfolio2({ theme, palette, werkervaring, titel, intro }: VariantProps) {
  return (
    <section id="werkervaring" className="px-6 md:px-16 lg:px-32 py-20" style={{ backgroundColor: theme.colors.background }}>
      <div className="max-w-[820px] mx-auto">

        <div className={`text-center mb-14 ${getRevealClass('up')}`}>
          <div className="text-[32px] mb-2" style={{ fontFamily: theme.fonts.heading, color: palette.accent || palette.primary }}>❦</div>
          <h2 className="text-[40px] font-semibold mb-3" style={{ fontFamily: theme.fonts.heading, color: palette.primary }}>
            Mijn <em className="italic" style={{ color: palette.accent || palette.primary }}>pad</em>
          </h2>
          <div className="w-[60px] h-px mx-auto mb-4" style={{ backgroundColor: palette.accent || palette.primary, opacity: 0.5 }} />
          <p className="max-w-[480px] mx-auto text-[15px] leading-[1.7]" style={{ color: theme.colors.textMuted }}>{intro}</p>
        </div>

        <div className="flex flex-col gap-5">
          {werkervaring.slice(0, 4).map((item: any, i: number) => {
            const huidig = isHuidig(item);
            const isEven = i % 2 === 1;
            return (
              <div
                key={i}
                className={`grid grid-cols-1 md:grid-cols-2 overflow-hidden border transition-all duration-[350ms] ${getRevealClass('up', i + 1)}`}
                style={{ borderColor: theme.colors.border, direction: isEven ? 'rtl' : 'ltr' }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = palette.accent || palette.primary;
                  const dark = el.querySelector('.split-dark') as HTMLElement;
                  if (dark) dark.style.backgroundColor = palette.accent || palette.primary;
                  const light = el.querySelector('.split-light') as HTMLElement;
                  if (light) light.style.backgroundColor = `${palette.accent || palette.primary}10`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = theme.colors.border;
                  const dark = el.querySelector('.split-dark') as HTMLElement;
                  if (dark) dark.style.backgroundColor = palette.primary;
                  const light = el.querySelector('.split-light') as HTMLElement;
                  if (light) light.style.backgroundColor = theme.colors.surface;
                }}
              >
                {/* Dark side */}
                <div
                  className="split-dark p-8 text-white flex flex-col justify-center relative transition-colors duration-[350ms]"
                  style={{ backgroundColor: palette.primary, direction: 'ltr' }}
                >
                  <div className="absolute bottom-2 right-5 text-[120px] leading-none opacity-[0.06]" style={{ fontFamily: theme.fonts.heading }}>"</div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-3" style={{ color: palette.accent || 'rgba(255,255,255,0.6)' }}>
                    {formatPeriode(item)}
                  </span>
                  <h3 className="text-[22px] font-semibold mb-1" style={{ fontFamily: theme.fonts.heading }}>{item.functie}</h3>
                  <p className="text-sm italic opacity-65">{item.werkgever}</p>
                </div>

                {/* Light side */}
                <div
                  className="split-light p-8 flex flex-col justify-center transition-colors duration-[350ms]"
                  style={{ backgroundColor: theme.colors.surface, direction: 'ltr' }}
                >
                  {item.beschrijving && (
                    <p className="text-sm leading-[1.7]" style={{ color: theme.colors.textMuted }}>{item.beschrijving}</p>
                  )}
                  {huidig && (
                    <div className="inline-flex items-center gap-1 mt-3.5 text-[11px] font-semibold" style={{ color: palette.accent || palette.primary }}>
                      <span className="material-symbols-outlined text-[15px]">check_circle</span>
                      Huidige functie
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


// ============================================
// PORTFOLIO 3 — Dark Vertical Timeline
// Dark bg, monospace accents, glow hover
// ============================================
function Portfolio3({ theme, palette, werkervaring, titel, intro }: VariantProps) {
  const darkBg = palette.primaryDark || '#0f251d';

  return (
    <section id="werkervaring" className="py-20 px-6 md:px-8" style={{ backgroundColor: darkBg }}>
      <div className="max-w-[780px] mx-auto">

        <div className={`text-center mb-[72px] ${getRevealClass('up')}`}>
          <div className="text-[11px] uppercase tracking-[0.25em] mb-4 font-mono" style={{ color: palette.accent || palette.primary }}>
            Loopbaan overzicht
          </div>
          <h2 className="text-[52px] font-normal leading-[1.1] mb-4" style={{ fontFamily: theme.fonts.heading, color: '#ffffff' }}>
            Mijn <em className="italic" style={{ color: palette.accent || palette.primary }}>pad</em>
          </h2>
          <div className="w-12 h-0.5 mx-auto mb-5" style={{ backgroundColor: palette.accent || palette.primary }} />
          <p className="max-w-[420px] mx-auto text-sm leading-[1.8] font-light" style={{ color: 'rgba(255,255,255,0.45)' }}>{intro}</p>
        </div>

        {/* Timeline */}
        <div className="relative pl-20">
          {/* Vertical line */}
          <div
            className="absolute left-8 top-0 bottom-0 w-px"
            style={{ background: `linear-gradient(to bottom, transparent, ${palette.accent || palette.primary} 5%, ${palette.accent || palette.primary} 95%, transparent)`, opacity: 0.3 }}
          />

          {werkervaring.slice(0, 5).map((item: any, i: number) => {
            const huidig = isHuidig(item);
            return (
              <div
                key={i}
                className={`relative py-8 border-b group ${getRevealClass('up', i + 1)}`}
                style={{ borderColor: 'rgba(255,255,255,0.04)' }}
              >
                {/* Node dot */}
                <div
                  className="absolute -left-[56px] top-[38px] w-3.5 h-3.5 rounded-full border-2 z-[2] transition-all duration-[400ms] group-hover:scale-[1.3]"
                  style={{
                    backgroundColor: darkBg,
                    borderColor: palette.accent || palette.primary,
                  }}
                />

                {/* Year (vertical) */}
                <span
                  className="absolute -left-[80px] top-14 font-mono text-[11px] tracking-[0.05em] transition-colors duration-[400ms] group-hover:!text-[var(--accent)]"
                  style={{ color: 'rgba(255,255,255,0.25)', writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)', '--accent': palette.accent || palette.primary } as any}
                >
                  {getStartJaar(item)}
                </span>

                <div className="font-mono text-xs tracking-[0.06em] mb-3 opacity-80" style={{ color: palette.accent || palette.primary }}>
                  {formatPeriode(item)}
                </div>
                <h3
                  className="text-[26px] font-normal mb-1.5 leading-[1.2] transition-all duration-[350ms] group-hover:translate-x-2"
                  style={{ fontFamily: theme.fonts.heading, color: '#ffffff' }}
                >
                  {item.functie}
                </h3>
                <p className="text-sm italic mb-4 transition-colors duration-[350ms]" style={{ color: 'rgba(255,255,255,0.35)' }}>{item.werkgever}</p>
                {item.beschrijving && (
                  <p className="text-[13px] leading-[1.8] max-w-[560px] transition-all duration-[400ms] translate-y-1 opacity-60 group-hover:translate-y-0 group-hover:opacity-100" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    {item.beschrijving}
                  </p>
                )}
                {huidig && (
                  <div
                    className="inline-flex items-center gap-2 mt-4 px-3.5 py-1.5 rounded-[20px] font-mono text-[10px] font-bold uppercase tracking-[0.15em]"
                    style={{ backgroundColor: `${palette.accent || palette.primary}1A`, border: `1px solid ${palette.accent || palette.primary}33`, color: palette.accent || palette.primary }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: palette.accent || palette.primary }} />
                    Actief
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


// ============================================
// MINDOOR 1 — Warme Cards Grid
// Rounded-20, deco circles, icon circles, trust bar
// ============================================
function Mindoor1({ theme, palette, werkervaring, titel, intro }: VariantProps) {
  const icons = ['home_health', 'apartment', 'local_hospital', 'school', 'work'];

  return (
    <section id="werkervaring" className="py-20 px-6 md:px-8 relative overflow-hidden" style={{ backgroundColor: theme.colors.backgroundAlt }}>
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[120px] h-[120px] rounded-full" style={{ backgroundColor: `${palette.primary}15` }} />
      <div className="absolute -bottom-[60px] -right-[60px] w-[200px] h-[200px] rounded-full" style={{ backgroundColor: palette.accent || palette.primary, opacity: 0.06 }} />

      <div className="max-w-[820px] mx-auto relative z-10">
        <div className={`text-center mb-12 ${getRevealClass('up')}`}>
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.1em] px-5 py-1.5 rounded-full text-white mb-4" style={{ backgroundColor: palette.primary }}>
            Werkervaring
          </span>
          <h2 className="text-4xl mb-3" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>{titel}</h2>
          <p className="max-w-[520px] mx-auto text-[15px] leading-[1.7]" style={{ color: theme.colors.textMuted }}>{intro}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {werkervaring.slice(0, 4).map((item: any, i: number) => {
            const huidig = isHuidig(item);
            return (
              <div
                key={i}
                className={`relative overflow-hidden rounded-[20px] p-7 border-2 border-transparent transition-all duration-[350ms] ${getRevealClass('up', i + 1)}`}
                style={{ backgroundColor: theme.colors.surface, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = 'translateY(-4px)';
                  el.style.boxShadow = `0 12px 32px ${palette.primary}1F`;
                  el.style.borderColor = palette.accent || palette.primary;
                  const icon = el.querySelector('.icon-circle') as HTMLElement;
                  if (icon) { icon.style.backgroundColor = palette.accent || palette.primary; }
                  const iconSpan = el.querySelector('.icon-circle span') as HTMLElement;
                  if (iconSpan) { iconSpan.style.color = 'white'; }
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)';
                  el.style.borderColor = 'transparent';
                  const icon = el.querySelector('.icon-circle') as HTMLElement;
                  if (icon) { icon.style.backgroundColor = `${palette.primary}15`; }
                  const iconSpan = el.querySelector('.icon-circle span') as HTMLElement;
                  if (iconSpan) { iconSpan.style.color = palette.primary; }
                }}
              >
                {/* Deco circle */}
                <div className="absolute -top-6 -right-6 w-[72px] h-[72px] rounded-full transition-all duration-[350ms]" style={{ backgroundColor: `${palette.primary}15` }} />

                {/* Icon */}
                <div className="icon-circle w-11 h-11 rounded-full flex items-center justify-center mb-4 relative z-10 transition-all duration-[350ms]" style={{ backgroundColor: `${palette.primary}15` }}>
                  <span className="material-symbols-outlined text-[22px] transition-colors duration-[350ms]" style={{ color: palette.primary }}>
                    {icons[i] || 'work'}
                  </span>
                </div>

                <h3 className="text-[16px] font-bold mb-1 relative z-10" style={{ color: theme.colors.text }}>{item.functie}</h3>
                <p className="text-sm font-semibold mb-1 relative z-10" style={{ color: palette.primary }}>{item.werkgever}</p>
                <p className={`text-xs font-medium mb-3 relative z-10 ${huidig ? 'font-semibold' : ''}`} style={{ color: huidig ? (palette.accent || palette.primary) : theme.colors.textMuted }}>
                  {formatPeriode(item)}
                </p>
                {item.beschrijving && (
                  <p className="text-[13px] leading-[1.6] relative z-10" style={{ color: theme.colors.textMuted }}>{item.beschrijving}</p>
                )}
              </div>
            );
          })}
        </div>

        {/* Trust bar */}
        <div className="flex flex-wrap justify-center gap-6 mt-10 pt-7 border-t relative z-10" style={{ borderColor: theme.colors.border }}>
          {['BIG-geregistreerd', 'DBA-compliant', 'VOG & Verzekerd'].map((label, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="material-symbols-outlined text-lg" style={{ color: palette.accent || palette.primary }}>
                {['verified', 'gavel', 'shield'][i]}
              </span>
              <span className="text-[13px] font-medium" style={{ color: theme.colors.textMuted }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


// ============================================
// MINDOOR 2 — Warm Split Layout
// Sticky left header, cards right with border-left accent
// ============================================
function Mindoor2({ theme, palette, werkervaring, titel, intro }: VariantProps) {
  return (
    <section id="werkervaring" className="py-20 px-6 md:px-8 relative overflow-hidden" style={{ backgroundColor: theme.colors.backgroundAlt }}>
      <div className="absolute top-20 -right-20 w-[280px] h-[280px] rounded-full" style={{ backgroundColor: palette.accent || palette.primary, opacity: 0.04 }} />

      <div className="grid md:grid-cols-[5fr_7fr] gap-14 max-w-[960px] mx-auto relative z-10">

        {/* Left: Sticky */}
        <div className="md:sticky md:top-20 md:self-start">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: palette.accent || palette.primary }} />
            <span className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: palette.accent || palette.primary }}>Werkervaring</span>
          </div>
          <h2 className="text-[38px] font-medium mb-3.5 leading-[1.2]" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>
            Mijn <em className="italic" style={{ color: palette.accent || palette.primary }}>loopbaan</em> in de zorg
          </h2>
          <p className="text-[15px] leading-[1.7] mb-7" style={{ color: theme.colors.textMuted }}>{intro}</p>
          <button
            className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold rounded-[28px] text-white border-none cursor-pointer transition-all duration-[250ms]"
            style={{ backgroundColor: palette.accent || palette.primary }}
          >
            Neem contact op
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* Right: Cards */}
        <div className="flex flex-col gap-3.5 cards-wrapper">
          {werkervaring.slice(0, 4).map((item: any, i: number) => {
            const huidig = isHuidig(item);
            return (
              <div
                key={i}
                className={`block py-5 px-6 rounded-2xl border-l-[3px] relative overflow-hidden transition-all duration-300 ${getRevealClass('up', i + 1)}`}
                style={{
                  backgroundColor: huidig ? `${palette.accent || palette.primary}08` : theme.colors.background,
                  borderLeftColor: huidig ? (palette.accent || palette.primary) : 'transparent',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.backgroundColor = `${palette.accent || palette.primary}08`;
                  el.style.borderLeftColor = palette.accent || palette.primary;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.backgroundColor = huidig ? `${palette.accent || palette.primary}08` : theme.colors.background;
                  el.style.borderLeftColor = huidig ? (palette.accent || palette.primary) : 'transparent';
                }}
              >
                <h3 className="text-[19px] font-semibold mb-0.5" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>{item.functie}</h3>
                <p className="text-sm font-medium mb-[3px]" style={{ color: `${palette.primary}AA` }}>{item.werkgever}</p>
                <p className="text-xs font-medium mb-2.5" style={{ color: theme.colors.textMuted }}>{formatPeriode(item)}</p>
                {item.beschrijving && (
                  <p className="text-[13px] leading-[1.65]" style={{ color: theme.colors.textMuted }}>{item.beschrijving}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


// ============================================
// MINDOOR 3 — Gestapelde Kaarten met Accent Zijlijn
// Side strip with year, deco circles, hover swap
// ============================================
function Mindoor3({ theme, palette, werkervaring, titel, intro }: VariantProps) {
  return (
    <section id="werkervaring" className="py-20 px-6 md:px-8 relative overflow-hidden" style={{ backgroundColor: theme.colors.backgroundAlt }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full" style={{ backgroundColor: palette.primary, opacity: 0.02 }} />

      <div className="max-w-[700px] mx-auto relative z-10">
        <div className={`text-center mb-14 ${getRevealClass('up')}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-7 h-px" style={{ backgroundColor: palette.accent || palette.primary }} />
            <span className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: palette.accent || palette.primary }}>Werkervaring</span>
            <div className="w-7 h-px" style={{ backgroundColor: palette.accent || palette.primary }} />
          </div>
          <h2 className="text-[44px] font-medium mb-3 leading-[1.15]" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>
            Mijn <em className="italic" style={{ color: palette.accent || palette.primary }}>pad</em>
          </h2>
          <p className="max-w-[440px] mx-auto text-[15px] leading-[1.7]" style={{ color: theme.colors.textMuted }}>{intro}</p>
        </div>

        <div className="flex flex-col gap-4">
          {werkervaring.slice(0, 5).map((item: any, i: number) => {
            const huidig = isHuidig(item);
            return (
              <div
                key={i}
                className={`grid grid-cols-[64px_1fr] overflow-hidden rounded-[20px] border transition-all duration-[400ms] ${getRevealClass('up', i + 1)}`}
                style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = palette.accent || palette.primary;
                  const side = el.querySelector('.side-strip') as HTMLElement;
                  if (side) side.style.backgroundColor = palette.accent || palette.primary;
                  const yr = el.querySelector('.side-year') as HTMLElement;
                  if (yr) yr.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = theme.colors.border;
                  const side = el.querySelector('.side-strip') as HTMLElement;
                  if (side) side.style.backgroundColor = `${palette.primary}08`;
                  const yr = el.querySelector('.side-year') as HTMLElement;
                  if (yr) yr.style.color = palette.primary;
                }}
              >
                {/* Side strip */}
                <div className="side-strip flex flex-col items-center justify-center py-5 transition-colors duration-[400ms]" style={{ backgroundColor: `${palette.primary}08` }}>
                  <span
                    className="side-year text-sm font-semibold transition-colors duration-[400ms]"
                    style={{ fontFamily: theme.fonts.heading, color: palette.primary, writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)', letterSpacing: '0.04em' }}
                  >
                    {getStartJaar(item)}
                  </span>
                </div>

                {/* Content */}
                <div className="py-6 px-7 relative overflow-hidden">
                  <div className="absolute -top-6 -right-6 w-[72px] h-[72px] rounded-full transition-all duration-[350ms]" style={{ backgroundColor: `${palette.primary}15` }} />

                  <div className="flex items-start justify-between mb-1">
                    <span className="text-xs font-medium" style={{ color: theme.colors.textMuted }}>{formatPeriode(item)}</span>
                    {huidig && (
                      <span className="text-[10px] font-bold px-3 py-[3px] rounded-[20px] uppercase tracking-[0.06em]" style={{ backgroundColor: `${palette.accent || palette.primary}10`, color: palette.accent || palette.primary }}>
                        Huidig
                      </span>
                    )}
                  </div>
                  <h3 className="text-[22px] font-semibold mb-[3px] leading-[1.3]" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>{item.functie}</h3>
                  <p className="text-[15px] font-medium italic mb-3" style={{ fontFamily: theme.fonts.heading, color: palette.accent || palette.primary }}>{item.werkgever}</p>
                  {item.beschrijving && (
                    <p className="text-[13px] leading-[1.75]" style={{ color: theme.colors.textMuted }}>{item.beschrijving}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


// ============================================
// SERENE 1 — Numbered Minimal List
// Numbered squares, vertical line, hover indent
// ============================================
function Serene1({ theme, palette, werkervaring, titel, intro }: VariantProps) {
  return (
    <section id="werkervaring" className="py-[100px] px-6" style={{ backgroundColor: theme.colors.background }}>
      <div className="max-w-[800px] mx-auto">

        <div className={`text-center mb-20 ${getRevealClass('up')}`}>
          <div className="text-[9px] uppercase tracking-[3px] font-semibold mb-4" style={{ color: theme.colors.textMuted }}>Werkervaring</div>
          <h2 className="text-[42px] font-normal mb-5" style={{ fontFamily: theme.fonts.heading, color: palette.primary, letterSpacing: '-0.5px' }}>
            Professionele achtergrond
          </h2>
          <div className="w-8 h-px mx-auto mb-6" style={{ backgroundColor: theme.colors.border }} />
          <p className="text-[15px] leading-[1.7] max-w-[480px] mx-auto" style={{ color: theme.colors.textMuted }}>{intro}</p>
        </div>

        {/* List with vertical line */}
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px" style={{ backgroundColor: theme.colors.border }} />

          {werkervaring.slice(0, 5).map((item: any, i: number) => (
            <div
              key={i}
              className={`flex gap-10 py-10 relative transition-all duration-[400ms] ${i < werkervaring.length - 1 ? 'border-b' : ''} ${getRevealClass('up', i + 1)}`}
              style={{ borderColor: `${theme.colors.border}80` }}
              onMouseEnter={(e) => { e.currentTarget.style.paddingLeft = '8px'; }}
              onMouseLeave={(e) => { e.currentTarget.style.paddingLeft = '0'; }}
            >
              {/* Number */}
              <div
                className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-xl font-medium border relative z-10 transition-all duration-300"
                style={{ fontFamily: theme.fonts.heading, color: palette.primary, backgroundColor: theme.colors.background, borderColor: theme.colors.border, borderRadius: '4px' }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.backgroundColor = palette.primary;
                  el.style.color = '#fff';
                  el.style.borderColor = palette.primary;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.backgroundColor = theme.colors.background;
                  el.style.color = palette.primary;
                  el.style.borderColor = theme.colors.border;
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <div className="text-[9px] uppercase tracking-[3px] font-semibold mb-2" style={{ color: theme.colors.textMuted }}>{formatPeriode(item)}</div>
                <div className="text-[26px] font-medium mb-1.5" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text, letterSpacing: '-0.3px' }}>{item.functie}</div>
                <div className="text-sm font-medium mb-3.5" style={{ color: theme.colors.textMuted }}>{item.werkgever}</div>
                {item.beschrijving && (
                  <p className="text-sm leading-[1.75] max-w-[560px]" style={{ color: theme.colors.textMuted }}>{item.beschrijving}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


// ============================================
// SERENE 2 — Dark Header + Stacked Cards
// Dark header overlay, organic corner radius (0 40px 0 0)
// ============================================
function Serene2({ theme, palette, werkervaring, titel, intro }: VariantProps) {
  return (
    <section id="werkervaring" style={{ backgroundColor: theme.colors.background }}>
      {/* Dark header */}
      <div className="py-20 px-6 text-center" style={{ backgroundColor: palette.primary }}>
        <div className="text-[9px] uppercase tracking-[3px] font-semibold mb-4" style={{ color: 'rgba(255,255,255,0.45)' }}>Werkervaring</div>
        <h2 className="text-[42px] font-normal mb-5" style={{ fontFamily: theme.fonts.heading, color: '#fff', letterSpacing: '-0.5px' }}>Mijn loopbaan</h2>
        <div className="w-8 h-px mx-auto" style={{ backgroundColor: 'rgba(255,255,255,0.25)' }} />
        <p className="text-sm leading-[1.7] max-w-[440px] mx-auto mt-5" style={{ color: 'rgba(255,255,255,0.6)' }}>{intro}</p>
      </div>

      {/* Cards */}
      <div className="max-w-[900px] mx-auto px-6 py-[60px] flex flex-col gap-5">
        {werkervaring.slice(0, 5).map((item: any, i: number) => {
          const huidig = isHuidig(item);
          return (
            <div
              key={i}
              className={`grid grid-cols-1 md:grid-cols-[140px_1fr] border overflow-hidden transition-all duration-[400ms] ${getRevealClass('up', i + 1)}`}
              style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: '0 40px 0 0' }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = palette.primary;
                const left = el.querySelector('.card-left') as HTMLElement;
                if (left) left.style.backgroundColor = palette.primary;
                el.querySelectorAll('.card-left-text').forEach((t) => { (t as HTMLElement).style.color = '#fff'; });
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = theme.colors.border;
                const left = el.querySelector('.card-left') as HTMLElement;
                if (left) left.style.backgroundColor = `${palette.primary}08`;
                el.querySelectorAll('.card-left-text').forEach((t) => { (t as HTMLElement).style.color = palette.primary; });
              }}
            >
              {/* Left: Year */}
              <div className="card-left p-8 flex flex-col items-center justify-center text-center border-r transition-colors duration-[400ms]" style={{ backgroundColor: `${palette.primary}08`, borderColor: theme.colors.border }}>
                <div className="card-left-text text-[32px] font-normal mb-1.5 transition-colors duration-[400ms]" style={{ fontFamily: theme.fonts.heading, color: palette.primary }}>{getStartJaar(item)}</div>
                <div className="card-left-text text-[9px] uppercase tracking-[2px] leading-[1.5] transition-colors duration-[400ms]" style={{ color: theme.colors.textMuted }}>
                  {getStartJaar(item)}<br />{isHuidig(item) ? 'heden' : (item.eind_jaar || item.eindJaar)}
                </div>
              </div>

              {/* Right: Content */}
              <div className="p-8">
                {huidig && (
                  <div className="text-[9px] uppercase tracking-[3px] font-semibold mb-2.5" style={{ color: palette.primary }}>● Huidige functie</div>
                )}
                <div className="text-2xl font-medium mb-1.5" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text, letterSpacing: '-0.3px' }}>{item.functie}</div>
                <div className="text-[13px] font-medium mb-4" style={{ color: palette.accent || theme.colors.textMuted }}>{item.werkgever}</div>
                {item.beschrijving && (
                  <p className="text-sm leading-[1.75]" style={{ color: theme.colors.textMuted }}>{item.beschrijving}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}


// ============================================
// SERENE 3 — Asymmetric Split
// Big year left, content right, zen whitespace
// ============================================
function Serene3({ theme, palette, werkervaring, titel, intro }: VariantProps) {
  return (
    <section id="werkervaring" className="py-[100px] px-6" style={{ backgroundColor: theme.colors.background }}>
      <div className="max-w-[960px] mx-auto">

        {/* Header - split */}
        <div className={`flex flex-col md:flex-row md:items-end md:justify-between mb-20 pb-8 border-b ${getRevealClass('up')}`} style={{ borderColor: theme.colors.border }}>
          <div>
            <div className="text-[9px] uppercase tracking-[3px] font-semibold mb-4" style={{ color: theme.colors.textMuted }}>Werkervaring</div>
            <h2 className="text-[42px] font-normal" style={{ fontFamily: theme.fonts.heading, color: palette.primary, letterSpacing: '-0.5px' }}>Loopbaanoverzicht</h2>
          </div>
          <div className="md:text-right mt-4 md:mt-0">
            <p className="text-sm leading-[1.7] max-w-[320px]" style={{ color: theme.colors.textMuted }}>{intro}</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="flex flex-col">
          {werkervaring.slice(0, 5).map((item: any, i: number) => {
            const huidig = isHuidig(item);
            return (
              <div
                key={i}
                className={`grid grid-cols-1 md:grid-cols-[200px_1fr] min-h-[180px] border-b transition-all duration-[400ms] ${i === 0 ? 'border-t' : ''} ${getRevealClass('up', i + 1)}`}
                style={{ borderColor: `${theme.colors.border}80` }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = `${palette.primary}05`; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                {/* Left: Year */}
                <div className="py-10 pr-8 border-r flex flex-col justify-center" style={{ borderColor: theme.colors.border }}>
                  <div
                    className="text-[56px] font-normal leading-none mb-2 transition-all duration-300"
                    style={{ fontFamily: theme.fonts.heading, color: palette.primary, letterSpacing: '-2px' }}
                  >
                    {getStartJaar(item)}
                  </div>
                  <span className="text-[9px] uppercase tracking-[3px] font-semibold" style={{ color: theme.colors.textMuted }}>
                    {isHuidig(item) ? 'Heden' : formatPeriode(item)}
                  </span>
                </div>

                {/* Right: Content */}
                <div className="py-10 md:pl-12 flex flex-col justify-center">
                  {huidig && (
                    <div
                      className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[3px] font-semibold px-3 py-1 mb-3 w-fit"
                      style={{ color: palette.primary, backgroundColor: `${palette.primary}10`, borderRadius: '4px' }}
                    >
                      <span className="w-[5px] h-[5px] rounded-full" style={{ background: palette.primary }} />
                      Actief
                    </div>
                  )}
                  <h3 className="text-[26px] font-medium mb-1.5" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text, letterSpacing: '-0.3px' }}>
                    {item.functie}
                  </h3>
                  <p className="text-[13px] font-medium flex items-center gap-2 mb-4" style={{ color: palette.accent || theme.colors.textMuted }}>
                    <span className="inline-block w-3 h-px" style={{ background: palette.accent || theme.colors.textMuted }} />
                    {item.werkgever}
                  </p>
                  {item.beschrijving && (
                    <p className="text-sm leading-[1.75] max-w-[500px]" style={{ color: theme.colors.textMuted }}>{item.beschrijving}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


// ============================================
// GENERIC: Timeline
// ============================================
function GenericTimeline({ theme, palette, werkervaring, titel, intro }: VariantProps) {
  return (
    <section id="werkervaring" className="py-20 px-6 md:px-12" style={{ backgroundColor: theme.colors.backgroundAlt }}>
      <div className="max-w-3xl mx-auto">
        <div className={`text-center mb-12 ${getRevealClass('up')}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>{titel}</h2>
        </div>
        <div className="relative border-l-2 ml-4" style={{ borderColor: palette.primary }}>
          {werkervaring.map((item: any, i: number) => {
            const huidig = isHuidig(item);
            return (
              <div key={i} className={`relative pl-8 pb-8 last:pb-0 ${getRevealClass('left', i + 1)}`}>
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full" style={{ backgroundColor: huidig ? palette.primary : theme.colors.surface, border: `3px solid ${palette.primary}` }} />
                <span className="text-xs font-bold px-2 py-1 rounded mb-2 inline-block" style={{ backgroundColor: `${palette.primary}15`, color: palette.primary }}>{formatPeriode(item)}</span>
                <h3 className="text-lg font-bold" style={{ color: theme.colors.text }}>{item.functie}</h3>
                <p className="text-sm font-medium" style={{ color: palette.primary }}>{item.werkgever}</p>
                {item.beschrijving && <p className="text-sm mt-2" style={{ color: theme.colors.textMuted }}>{item.beschrijving}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


// ============================================
// GENERIC: Cards
// ============================================
function GenericCards({ theme, palette, werkervaring, titel, intro }: VariantProps) {
  return (
    <section id="werkervaring" className="py-20 px-6 md:px-12" style={{ backgroundColor: theme.colors.background }}>
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-12 ${getRevealClass('up')}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>{titel}</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {werkervaring.slice(0, 6).map((item: any, i: number) => (
            <div key={i} className={`p-6 rounded-xl border ${getRevealClass('up', i + 1)}`} style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }}>
              <span className="text-xs font-medium px-2 py-1 rounded-full inline-block mb-3" style={{ backgroundColor: `${palette.primary}15`, color: palette.primary }}>{formatPeriode(item)}</span>
              <h3 className="font-bold mb-1" style={{ color: theme.colors.text }}>{item.functie}</h3>
              <p className="text-sm" style={{ color: theme.colors.textMuted }}>{item.werkgever}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


// ============================================
// GENERIC: Compact
// ============================================
function GenericCompact({ theme, palette, werkervaring, titel, intro }: VariantProps) {
  return (
    <section id="werkervaring" className="py-12 px-6 border-y" style={{ borderColor: theme.colors.border, backgroundColor: theme.colors.backgroundAlt }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-6">
          <span className="font-bold" style={{ color: theme.colors.text }}>Ervaring:</span>
          {werkervaring.slice(0, 4).map((item: any, i: number) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: theme.colors.surface }}>
              <span className="font-medium" style={{ color: theme.colors.text }}>{item.functie}</span>
              <span className="text-sm" style={{ color: theme.colors.textMuted }}>@ {item.werkgever}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


export default WerkervaringSection;