// components/templates/sections/VoorWieSection.tsx
// Voor Wie sectie — voor wie/inzetbaar voor
// B2B gericht: zorginstellingen, bemiddelaars, intermediairs
'use client';

import { BaseSectionProps, VoorWieStyle, getRevealClass, DEFAULT_DOELGROEPEN, DOELGROEP_IMAGES } from './types';

// ============================================
// DOELGROEP ICONS MAP
// ============================================
const DOELGROEP_ICONS: Record<string, string> = {
  thuiszorg: 'home_health',
  verpleeghuis: 'apartment',
  verzorgingshuis: 'apartment',
  ziekenhuis: 'local_hospital',
  kliniek: 'local_hospital',
  bemiddelaar: 'handshake',
  intermediair: 'handshake',
  ggz: 'psychology',
  gehandicaptenzorg: 'accessibility_new',
  revalidatie: 'sprint',
  hospice: 'favorite',
  palliatief: 'favorite',
  jeugdzorg: 'child_care',
  kraamzorg: 'pregnant_woman',
  huisarts: 'stethoscope',
  ouderenzorg: 'elderly',
  wijkverpleging: 'directions_walk',
  instellingen: 'apartment',
  bemiddelaars: 'handshake',
  pgb: 'home',
  particulieren: 'person',
  ziekenhuizen: 'local_hospital',
  overig: 'groups',
};

// DOELGROEP_IMAGES imported from ./types

// ============================================
// SHARED TYPES
// ============================================
interface VoorWieComponentProps {
  theme: any;
  palette: any;
  titel: string;
  intro: string;
  doelgroepen: any[];
}

// ============================================
// MAIN COMPONENT — ROUTER
// ============================================
interface VoorWieSectionProps extends BaseSectionProps {
  style?: VoorWieStyle;
}

export function VoorWieSection({
  style = 'editorial',
  theme,
  palette,
  content,
  generated,
}: VoorWieSectionProps) {
  const doelgroepen = generated?.voorWie?.doelgroepen || DEFAULT_DOELGROEPEN;
  const titel = generated?.voorWie?.titel || 'Waar u op mij kunt rekenen';
  const intro =
    generated?.voorWie?.intro ||
    'Als zelfstandig verpleegkundige werk ik samen met zorginstellingen, bemiddelaars en teams in uiteenlopende zorgsettings.';

  if (!doelgroepen.length) return null;

  const sharedProps = { theme, palette, titel, intro, doelgroepen };

  switch (style) {
    // EDITORIAL
    case 'editorial':
      return <VoorWieEditorial {...sharedProps} />;
    case 'editorial-2':
      return <VoorWieEditorial2 {...sharedProps} />;
    case 'editorial-3':
      return <VoorWieEditorial3 {...sharedProps} />;

    // PROACTIEF
    case 'proactief':
      return <VoorWieProactief {...sharedProps} />;
    case 'proactief-2':
      return <VoorWieProactief2 {...sharedProps} />;
    case 'proactief-3':
      return <VoorWieProactief3 {...sharedProps} />;

    // PORTFOLIO
    case 'portfolio':
      return <VoorWiePortfolio {...sharedProps} />;
    case 'portfolio-2':
      return <VoorWiePortfolio2 {...sharedProps} />;
    case 'portfolio-3':
      return <VoorWiePortfolio3 {...sharedProps} />;

    // MINDOOR
    case 'mindoor':
      return <VoorWieMindoor {...sharedProps} />;
    case 'mindoor-2':
      return <VoorWieMindoor2 {...sharedProps} />;
    case 'mindoor-3':
      return <VoorWieMindoor3 {...sharedProps} />;

    // SERENE
    case 'serene':
      return <VoorWieSerene {...sharedProps} />;
    case 'serene-2':
      return <VoorWieSerene2 {...sharedProps} />;
    case 'serene-3':
      return <VoorWieSerene3 {...sharedProps} />;

    default:
      return <VoorWieEditorial {...sharedProps} />;
  }
}


// ============================================
// EDITORIAL 1 — Classic Grid Cards
// 3-koloms kaarten, icon-box, hover-lift, CTA per kaart
// ============================================
function VoorWieEditorial({ theme, palette, titel, intro, doelgroepen }: VoorWieComponentProps) {
  return (
    <section className="py-24 lg:py-36" style={{ background: palette.bg }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="block mb-4 text-sm font-medium uppercase tracking-widest"
            style={{ color: palette.accent }}
          >
            Inzetbaar voor
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl leading-tight mb-5"
            style={{ fontFamily: theme.fonts.heading, color: palette.text }}
          >
            {titel}
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: palette.textMuted }}>
            {intro}
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doelgroepen.slice(0, 6).map((doelgroep: any, index: number) => (
            <div
              key={index}
              className="group p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{ background: palette.bgAlt, border: `1px solid ${palette.border}` }}
            >
              {/* Icon */}
              <div
                className="w-14 h-14 flex items-center justify-center mb-6"
                style={{ background: `${palette.primary}15` }}
              >
                <span className="material-symbols-outlined text-2xl" style={{ color: palette.primary }}>
                  {DOELGROEP_ICONS[doelgroep.type] || 'group'}
                </span>
              </div>

              {/* Content */}
              <h3
                className="text-xl font-semibold mb-3"
                style={{ fontFamily: theme.fonts.heading, color: palette.text }}
              >
                {doelgroep.titel}
              </h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: palette.textMuted }}>
                {doelgroep.tekst}
              </p>

              {/* Link */}
              <a href="#contact" className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all" style={{ color: palette.primary }}>
                {doelgroep.type === 'bemiddelaar' || doelgroep.type === 'intermediair'
                  ? 'Samenwerking bespreken'
                  : 'Beschikbaarheid bekijken'}
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


// ============================================
// EDITORIAL 2 — Sticky Sidebar + Stacked List
// ============================================
function VoorWieEditorial2({ theme, palette, titel, intro, doelgroepen }: VoorWieComponentProps) {
  const titleParts = titel.split(' ');
  const lastWord = titleParts.pop() || '';
  const restTitle = titleParts.join(' ');

  return (
    <section className="py-24 lg:py-36" style={{ background: palette.bg }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Left: Sticky header */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <span className="block mb-4 text-sm font-medium uppercase tracking-widest" style={{ color: palette.accent }}>
                Inzetbaar voor
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-tight mb-5" style={{ fontFamily: theme.fonts.heading, color: palette.text }}>
                {restTitle}{' '}
                <span style={{ color: palette.accent }}>{lastWord}</span>
              </h2>
              <p className="mb-8" style={{ color: palette.textMuted }}>{intro}</p>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-3">
                {[
                  { val: 'DBA', lbl: 'Compliant' },
                  { val: 'BIG', lbl: 'Geregistreerd' },
                  { val: 'KvK', lbl: 'Ingeschreven' },
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-2" style={{ background: palette.bgAlt }}>
                    <span className="text-sm font-bold" style={{ color: palette.primary }}>{badge.val}</span>
                    <span className="text-xs" style={{ color: palette.textMuted }}>{badge.lbl}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Stacked items */}
          <div className="lg:col-span-7 space-y-6">
            {doelgroepen.slice(0, 6).map((doelgroep: any, idx: number) => (
              <a
                key={idx}
                href="#contact"
                className="group flex items-start gap-6 p-6 transition-all duration-300 hover:shadow-md"
                style={{ background: palette.bgAlt, border: `1px solid ${palette.border}` }}
              >
                {/* Number + Icon */}
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <span className="text-2xl font-light" style={{ fontFamily: theme.fonts.heading, color: palette.border }}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="material-symbols-outlined text-xl" style={{ color: palette.primary }}>
                    {DOELGROEP_ICONS[doelgroep.type] || 'group'}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: theme.fonts.heading, color: palette.text }}>
                    {doelgroep.titel}
                  </h3>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: palette.textMuted }}>
                    {doelgroep.tekst}
                  </p>

                  {/* Tags */}
                  {doelgroep.tags && doelgroep.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {doelgroep.tags.map((tag: string, ti: number) => (
                        <span key={ti} className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: `${palette.primary}12`, color: palette.primary }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Arrow */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                  <span className="text-sm font-medium" style={{ color: palette.accent }}>Contact</span>
                  <span className="material-symbols-outlined text-lg" style={{ color: palette.accent }}>arrow_forward</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


// ============================================
// EDITORIAL 3 — Typographic Alternating Rows
// ============================================
function VoorWieEditorial3({ theme, palette, titel, intro, doelgroepen }: VoorWieComponentProps) {
  const titleParts = titel.split(' ');
  const lastWord = titleParts.pop() || '';
  const restTitle = titleParts.join(' ');

  return (
    <section className="py-24 lg:py-36" style={{ background: palette.bg }}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">

        {/* Centered Header */}
        <div className="text-center mb-20">
          <span className="block mb-4 text-sm font-medium uppercase tracking-widest" style={{ color: palette.accent }}>
            Inzetbaar voor
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-tight mb-5" style={{ fontFamily: theme.fonts.heading, color: palette.text }}>
            {restTitle}{' '}
            <span style={{ color: palette.accent }}>{lastWord}</span>
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: palette.textMuted }}>{intro}</p>
        </div>

        {/* Alternating rows */}
        <div className="space-y-12">
          {doelgroepen.slice(0, 6).map((doelgroep: any, idx: number) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={idx}
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
              >
                {/* Ghost number + icon */}
                <div className="relative flex items-center justify-center w-32 h-32 flex-shrink-0">
                  <span className="absolute text-8xl font-bold opacity-[0.06]" style={{ fontFamily: theme.fonts.heading, color: palette.text }}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="w-16 h-16 flex items-center justify-center" style={{ background: `${palette.primary}12` }}>
                    <span className="material-symbols-outlined text-2xl" style={{ color: palette.primary }}>
                      {DOELGROEP_ICONS[doelgroep.type] || 'group'}
                    </span>
                  </div>
                  <span className="absolute -top-2 -right-2 text-xs font-medium px-2 py-1 rounded-full" style={{ background: palette.bgAlt, color: palette.textMuted }}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: theme.fonts.heading, color: palette.text }}>
                    {doelgroep.titel}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: palette.textMuted }}>
                    {doelgroep.tekst}
                  </p>

                  {/* Highlight */}
                  {doelgroep.highlight && (
                    <div className="flex items-center gap-2 mt-4">
                      <span className="material-symbols-outlined text-lg" style={{ color: palette.accent }}>check_circle</span>
                      <span className="text-sm font-medium" style={{ color: palette.accent }}>{doelgroep.highlight}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <a href="#contact" className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: palette.primary }}>
            Beschikbaarheid bespreken →
          </a>
        </div>
      </div>
    </section>
  );
}


// ============================================
// PROACTIEF 1 — Photo Cards Grid
// 4-kolom grid, foto + icon overlay, rounded-[20px],
// hover lift, trust bar onderaan
// ============================================
function VoorWieProactief({ theme, palette, titel, intro, doelgroepen }: VoorWieComponentProps) {
  return (
    <section className="py-24 px-6 md:px-12 relative overflow-hidden" style={{ background: palette.bgAlt }}>
      {/* Decorative circle */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-[0.04]" style={{ background: palette.primary }} />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-sm italic mb-3 block" style={{ color: palette.primary }}>Voor wie</span>
          <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: theme.fonts.heading, color: palette.text }}>
            {titel}
          </h2>
          {intro && (
            <p className="text-[15px] leading-relaxed" style={{ color: palette.textMuted }}>{intro}</p>
          )}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doelgroepen.slice(0, 6).map((doelgroep: any, idx: number) => (
            <div key={idx} className="bg-white overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
              <div className="h-44 overflow-hidden relative">
                <img
                  src={doelgroep.afbeelding || DOELGROEP_IMAGES[doelgroep.type] || DOELGROEP_IMAGES.thuiszorg}
                  alt={doelgroep.titel}
                  className="w-full h-full object-cover"
                />
                {/* Icon overlay */}
                <div className="absolute bottom-3 right-3 w-10 h-10 rounded-xl bg-white/90 backdrop-blur flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-xl" style={{ color: palette.primary }}>
                    {DOELGROEP_ICONS[doelgroep.type] || 'group'}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-semibold mb-2" style={{ fontFamily: theme.fonts.heading, color: palette.text }}>
                  {doelgroep.titel}
                </h4>
                <p className="text-[13px] leading-relaxed" style={{ color: palette.textMuted }}>
                  {doelgroep.tekst}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-14 pt-8" style={{ borderTop: `1px solid ${palette.border}` }}>
          {[
            { icon: 'verified', label: 'BIG-geregistreerd' },
            { icon: 'gavel', label: 'DBA-compliant' },
            { icon: 'shield', label: 'VOG & Verzekerd' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="material-symbols-outlined text-lg" style={{ color: palette.primary }}>{item.icon}</span>
              <span className="text-sm font-medium" style={{ color: palette.textMuted }}>{item.label}</span>
              {i < 2 && <div className="w-px h-4 ml-4" style={{ background: palette.border }} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


// ============================================
// PROACTIEF 2 — Split Layout + Border-Left Accent
// Sticky header links met sfeerbeeld + CTA,
// Rechts: icon + border-left-4 cards met tags
// ============================================
function VoorWieProactief2({ theme, palette, titel, intro, doelgroepen }: VoorWieComponentProps) {
  return (
    <section className="py-24 px-6 md:px-12" style={{ background: palette.bg }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Left: Sticky header */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px" style={{ background: palette.primary }} />
                <span className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: palette.primary }}>
                  Voor wie
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold leading-tight mb-6" style={{ fontFamily: theme.fonts.heading, color: palette.text }}>
                {titel}
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: palette.textMuted }}>{intro}</p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-lg transition-opacity hover:opacity-90"
                style={{ background: palette.primary }}
              >
                Neem contact op
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </a>

              {/* Sfeerbeeld */}
              <div className="mt-10 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=500&q=80"
                  alt="Zorgverlener aan het werk"
                  className="w-full h-44 object-cover"
                />
              </div>

              {/* Trust pills */}
              <div className="flex flex-wrap gap-2 mt-6">
                {[
                  { icon: 'verified', label: 'BIG-geregistreerd' },
                  { icon: 'gavel', label: 'DBA-compliant' },
                  { icon: 'shield', label: 'VOG & Verzekerd' },
                ].map((item, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: `${palette.primary}15`, color: palette.primary }}>
                    <span className="material-symbols-outlined text-sm">{item.icon}</span>
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Doelgroepen list */}
          <div className="lg:col-span-7 space-y-5">
            {doelgroepen.slice(0, 6).map((doelgroep: any, idx: number) => {
              const isFirst = idx === 0;
              const isLast = idx === doelgroepen.slice(0, 6).length - 1;
              return (
                <a
                  key={idx}
                  href="#contact"
                  className="group block p-6 border-l-4 transition-all duration-300"
                  style={{
                    background: isFirst ? `${palette.primary}12` : palette.bgAlt,
                    borderColor: isFirst ? palette.primary : 'transparent',
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors"
                      style={{ background: isFirst ? 'white' : palette.border }}
                    >
                      <span className="material-symbols-outlined text-xl" style={{ color: isFirst ? palette.primary : palette.textMuted }}>
                        {DOELGROEP_ICONS[doelgroep.type] || 'group'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold" style={{ fontFamily: theme.fonts.heading, color: palette.text }}>
                          {doelgroep.titel}
                        </h3>
                        <span className="material-symbols-outlined opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: palette.primary }}>
                          arrow_forward
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed mb-3" style={{ color: palette.textMuted }}>
                        {doelgroep.tekst}
                      </p>
                      {doelgroep.tags && doelgroep.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {doelgroep.tags.map((tag: string, ti: number) => (
                            <span key={ti} className="inline-block px-2.5 py-1 rounded-full text-[11px] font-medium" style={{ background: isFirst ? 'white' : palette.border, color: isFirst ? palette.primary : palette.textMuted }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}


// ============================================
// PROACTIEF 3 — Numbered Blocks + Stat Grid + CTA Card
// Nummer-driven grid blocks, full hover color swap,
// afsluitend CTA blok met sfeerbeeld, trust stats onderaan
// ============================================
function VoorWieProactief3({ theme, palette, titel, intro, doelgroepen }: VoorWieComponentProps) {
  return (
    <section className="py-24 px-6 md:px-12" style={{ background: palette.bgAlt }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: palette.primary }} />
            <span className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: palette.primary }}>
              Zorgsettings
            </span>
            <div className="w-8 h-px" style={{ background: palette.primary }} />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold" style={{ fontFamily: theme.fonts.heading, color: palette.text }}>
            {titel}
          </h2>
        </div>

        {/* Numbered Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: palette.border }}>

          {doelgroepen.slice(0, 6).map((doelgroep: any, idx: number) => {
            const useAccent = idx === doelgroepen.slice(0, 6).length - 1;
            return (
              <a
                key={idx}
                href="#contact"
                className="group p-8 lg:p-10 cursor-pointer transition-all duration-300 hover:opacity-90"
                style={{ background: 'white' }}
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="text-5xl font-bold" style={{ fontFamily: theme.fonts.heading, color: useAccent ? palette.accent : palette.primary }}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="w-10 h-10 rounded-full border-2 flex items-center justify-center" style={{ borderColor: useAccent ? palette.accent : palette.primary }}>
                    <span className="material-symbols-outlined text-lg" style={{ color: useAccent ? palette.accent : palette.primary }}>arrow_forward</span>
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: theme.fonts.heading, color: palette.text }}>
                  {doelgroep.titel}
                </h3>
                <p className="text-sm mb-4" style={{ color: palette.textMuted }}>
                  {doelgroep.tekst}
                </p>
                {doelgroep.highlight && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium" style={{ background: useAccent ? `${palette.accent}15` : `${palette.primary}15`, color: useAccent ? palette.accent : palette.primary }}>
                    <span className="material-symbols-outlined text-sm" style={{ color: useAccent ? palette.accent : palette.primary }}>check_circle</span>
                    {doelgroep.highlight}
                  </span>
                )}
              </a>
            );
          })}

          {/* Stat highlight block */}
          <div className="p-8 lg:p-10 flex flex-col justify-center text-center" style={{ background: `${palette.primary}12` }}>
            <span className="text-5xl lg:text-6xl font-bold mb-2" style={{ fontFamily: theme.fonts.heading, color: palette.primary }}>15+</span>
            <span className="text-sm font-medium mb-1" style={{ color: palette.primary }}>Jaar ervaring</span>
            <span className="text-xs" style={{ color: palette.textMuted }}>In diverse zorgsettings</span>
            <div className="flex justify-center gap-1.5 mt-4">
              <span className="w-2 h-2 rounded-full" style={{ background: palette.primary }} />
              <span className="w-2 h-2 rounded-full" style={{ background: palette.primary, opacity: 0.4 }} />
              <span className="w-2 h-2 rounded-full" style={{ background: palette.primary, opacity: 0.2 }} />
            </div>
          </div>

          {/* CTA block with image */}
          <a href="#contact" className="group relative p-8 lg:p-10 overflow-hidden flex flex-col justify-center min-h-[200px]">
            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: palette.primary, opacity: 0.88 }} />
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: theme.fonts.heading }}>
                Andere zorgsetting?
              </h3>
              <p className="text-sm text-white/80 mb-4">Neem contact op om de mogelijkheden te bespreken.</p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                Neem contact op
                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </span>
            </div>
          </a>
        </div>

        {/* Bottom trust bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12 pt-8" style={{ borderTop: `1px solid ${palette.border}` }}>
          {[
            { val: '100%', lbl: 'Inzet' },
            { val: '24h', lbl: 'Reactietijd' },
            { val: 'DBA', lbl: 'Compliant' },
            { val: 'VOG', lbl: '& Verzekerd' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <span className="text-2xl font-bold block" style={{ color: palette.primary }}>{stat.val}</span>
              <span className="text-xs" style={{ color: palette.textMuted }}>{stat.lbl}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


// ============================================
// PORTFOLIO 1 — Image Cards Grid
// 4-kolom grid, foto met gradient overlay, rounded-3xl,
// serif headings, trust line
// ============================================
function VoorWiePortfolio({ theme, palette, titel, intro, doelgroepen }: VoorWieComponentProps) {
  return (
    <section className="py-28 px-8 md:px-12" style={{ background: palette.bgAlt }}>
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <div className="text-center max-w-[600px] mx-auto mb-16">
          <span className="text-[13px] font-semibold uppercase tracking-[2px] mb-4 block" style={{ color: palette.accent }}>
            Doelgroepen
          </span>
          <h2 className="text-[42px] font-semibold leading-[1.2] mb-6" style={{ fontFamily: theme.fonts.heading, color: palette.primary }}>
            {titel}
          </h2>
          {intro && (
            <p className="text-base" style={{ color: palette.textMuted }}>{intro}</p>
          )}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doelgroepen.slice(0, 6).map((doelgroep: any, idx: number) => (
            <div key={idx} className="bg-white rounded-3xl overflow-hidden group">
              <div className="h-[180px] relative overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/30 to-transparent z-10" />
                <img
                  src={doelgroep.afbeelding || DOELGROEP_IMAGES[doelgroep.type] || DOELGROEP_IMAGES.thuiszorg}
                  alt={doelgroep.titel}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-7">
                <h4 className="text-xl font-semibold mb-2" style={{ fontFamily: theme.fonts.heading, color: palette.primary }}>
                  {doelgroep.titel}
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: palette.textMuted }}>
                  {doelgroep.tekst}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust line */}
        <div className="flex items-center justify-center gap-4 mt-14 pt-8" style={{ borderTop: `1px solid ${palette.border}` }}>
          <div className="flex -space-x-2">
            {['TZ', 'VH', 'ZK'].map((abbr, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-semibold text-white border-2"
                style={{ background: i % 2 === 0 ? palette.primary : palette.accent, borderColor: palette.bgAlt }}
              >
                {abbr}
              </div>
            ))}
          </div>
          <p className="text-[13px]" style={{ color: palette.textMuted }}>
            Vertrouwd door zorginstellingen en bemiddelaars
          </p>
        </div>
      </div>
    </section>
  );
}


// ============================================
// PORTFOLIO 2 — Featured Split + Bordered Cards
// Grote featured afbeelding links (row-span-2) met overlay,
// rechts: bordered cards met icon + border hover accent
// ============================================
function VoorWiePortfolio2({ theme, palette, titel, intro, doelgroepen }: VoorWieComponentProps) {
  const firstDoelgroep = doelgroepen[0];
  const restDoelgroepen = doelgroepen.slice(1, 6);

  return (
    <section className="py-28 px-8 md:px-12" style={{ background: palette.bgAlt }}>
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16">
          <div>
            <span className="text-[13px] font-semibold uppercase tracking-[2px] mb-3 block" style={{ color: palette.accent }}>
              Doelgroepen
            </span>
            <h2 className="text-[38px] lg:text-[44px] font-semibold leading-[1.15]" style={{ fontFamily: theme.fonts.heading, color: palette.primary }}>
              {titel}
            </h2>
          </div>
          <a href="#contact" className="text-sm font-medium flex items-center gap-2 hover:gap-3 transition-all" style={{ color: palette.primary }}>
            Neem contact op <span>→</span>
          </a>
        </div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Featured: Large image card spanning 2 rows */}
          {firstDoelgroep && (
            <a href="#contact" className="group relative md:row-span-2 overflow-hidden min-h-[320px] lg:min-h-[420px]" style={{ borderRadius: '0 80px 0 0' }}>
              <img
                src={firstDoelgroep.afbeelding || DOELGROEP_IMAGES[firstDoelgroep.type] || DOELGROEP_IMAGES.thuiszorg}
                alt={firstDoelgroep.titel}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${palette.primary}e6, ${palette.primary}33, transparent)` }} />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <span className="text-xs uppercase tracking-wider text-white/60 mb-2 block">Primair werkgebied</span>
                <h3 className="text-2xl lg:text-3xl font-medium text-white mb-2" style={{ fontFamily: theme.fonts.heading }}>
                  {firstDoelgroep.titel}
                </h3>
                <p className="text-sm text-white/80 mb-4">{firstDoelgroep.tekst}</p>
                <span className="text-sm font-medium text-white flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  Contact <span>→</span>
                </span>
              </div>
            </a>
          )}

          {/* Rest: Bordered cards */}
          {restDoelgroepen.map((doelgroep: any, idx: number) => (
            <a
              key={idx}
              href="#contact"
              className={`group p-6 lg:p-8 flex flex-col justify-between min-h-[190px] border transition-colors hover:border-current ${idx === restDoelgroepen.length - 1 ? 'lg:col-span-2' : ''}`}
              style={{ borderColor: palette.border, background: palette.bg, color: palette.accent }}
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="material-symbols-outlined text-xl" style={{ color: palette.primary }}>
                    {DOELGROEP_ICONS[doelgroep.type] || 'group'}
                  </span>
                  <h3 className="text-xl font-medium" style={{ fontFamily: theme.fonts.heading, color: palette.primary }}>
                    {doelgroep.titel}
                  </h3>
                </div>
                <p className="text-sm" style={{ color: palette.textMuted }}>{doelgroep.tekst}</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                {doelgroep.tags && doelgroep.tags.length > 0 && (
                  <div className="flex gap-3">
                    {doelgroep.tags.slice(0, 2).map((tag: string, ti: number) => (
                      <span key={ti} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium" style={{ background: `${palette.primary}10`, color: palette.primary }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <span className="text-sm font-medium flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: palette.accent }}>
                  Contact <span>→</span>
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Trust line */}
        <div className="flex items-center justify-center gap-4 mt-14 pt-8" style={{ borderTop: `1px solid ${palette.border}` }}>
          <div className="flex -space-x-2">
            {['TZ', 'VH', 'ZK'].map((abbr, i) => (
              <div key={i} className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-semibold text-white border-2" style={{ background: i % 2 === 0 ? palette.primary : palette.accent, borderColor: palette.bgAlt }}>
                {abbr}
              </div>
            ))}
          </div>
          <p className="text-[13px]" style={{ color: palette.textMuted }}>Vertrouwd door zorginstellingen en bemiddelaars</p>
        </div>
      </div>
    </section>
  );
}


// ============================================
// PORTFOLIO 3 — Elegant List + Image Accent
// Split: afbeelding links met decorative square,
// rechts: doelgroepen met icon circles, hover reveal
// ============================================
function VoorWiePortfolio3({ theme, palette, titel, intro, doelgroepen }: VoorWieComponentProps) {
  return (
    <section className="py-28 px-8 md:px-12" style={{ background: palette.bgAlt }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: Image with decorative elements */}
          <div className="relative">
            {/* Decorative corner square */}
            <div className="absolute -top-4 -left-4 w-28 h-28 border-2 opacity-20 hidden lg:block" style={{ borderColor: palette.accent }} />

            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=900&fit=crop"
              alt="Zorgverlener"
              className="w-full h-[400px] lg:h-[520px] object-cover"
              style={{ borderRadius: '0 80px 0 0' }}
            />

            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-4 lg:-right-8 p-6 shadow-xl" style={{ background: 'white' }}>
              <span className="text-[42px] font-light block mb-1" style={{ fontFamily: theme.fonts.heading, color: palette.primary }}>
                4+
              </span>
              <span className="text-xs uppercase tracking-wider" style={{ color: palette.textMuted }}>Zorgsettings</span>
            </div>
          </div>

          {/* Right: Content */}
          <div>
            <span className="text-[13px] font-semibold uppercase tracking-[2px] mb-4 block" style={{ color: palette.accent }}>
              Doelgroepen
            </span>
            <h2 className="text-[34px] lg:text-[42px] font-semibold leading-[1.15] mb-10" style={{ fontFamily: theme.fonts.heading, color: palette.primary }}>
              {titel}
            </h2>

            {/* Doelgroepen list */}
            <div className="space-y-0">
              {doelgroepen.slice(0, 6).map((doelgroep: any, idx: number) => {
                const isFirst = idx === 0;
                const isLast = idx === Math.min(doelgroepen.length, 6) - 1;
                return (
                  <a
                    key={idx}
                    href="#contact"
                    className={`group flex items-start gap-5 px-4 py-5 transition-all duration-300 ${!isLast ? 'pb-7 mb-7 border-b' : ''}`}
                    style={{ borderColor: palette.border }}
                  >
                    <span
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
                      style={{ background: isFirst ? palette.primary : palette.border }}
                    >
                      <span className="material-symbols-outlined text-xl" style={{ color: isFirst ? 'white' : palette.primary }}>
                        {DOELGROEP_ICONS[doelgroep.type] || 'group'}
                      </span>
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium mb-1" style={{ fontFamily: theme.fonts.heading, color: palette.primary }}>
                          {doelgroep.titel}
                        </h3>
                        <span className="text-sm transition-all opacity-0 group-hover:opacity-100" style={{ color: palette.accent }}>
                          Contact →
                        </span>
                      </div>
                      <p className="text-sm" style={{ color: palette.textMuted }}>{doelgroep.tekst}</p>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* CTA */}
            <a href="#contact" className="inline-flex items-center gap-2 mt-10 text-sm font-medium hover:gap-3 transition-all" style={{ color: palette.primary }}>
              Neem contact op <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


// ============================================
// MINDOOR 1 — Warm Cards
// Decoratieve circles bg, 4-kolom cards met icon boxes,
// rounded-3xl, hover color swap naar primary/accent
// ============================================
function VoorWieMindoor({ theme, palette, titel, intro, doelgroepen }: VoorWieComponentProps) {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden" style={{ background: palette.bgAlt }}>

      {/* Decorative circles */}
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-[0.08]" style={{ background: palette.accent }} />
      <div className="absolute bottom-20 -left-20 w-48 h-48 rounded-full opacity-[0.06]" style={{ background: palette.primary }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-medium mb-3 block" style={{ color: palette.primary }}>
            Doelgroepen
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl" style={{ fontFamily: theme.fonts.heading, color: palette.text }}>
            {titel}
          </h2>
          {intro && (
            <p className="mt-4 max-w-2xl mx-auto" style={{ color: palette.textMuted }}>{intro}</p>
          )}
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {doelgroepen.slice(0, 6).map((doelgroep: any, idx: number) => (
            <a
              key={idx}
              href="#contact"
              className="group bg-white rounded-3xl p-8 transition-all duration-300 hover:shadow-lg"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-colors"
                style={{ background: `${palette.primary}15` }}
              >
                <span className="material-symbols-outlined text-2xl transition-colors" style={{ color: palette.primary }}>
                  {DOELGROEP_ICONS[doelgroep.type] || 'group'}
                </span>
              </div>
              <h4 className="text-lg font-semibold mb-3 transition-colors" style={{ fontFamily: theme.fonts.heading, color: palette.text }}>
                {doelgroep.titel}
              </h4>
              <p className="text-sm leading-relaxed transition-colors" style={{ color: palette.textMuted }}>
                {doelgroep.tekst}
              </p>
            </a>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <a href="#contact" className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: palette.primary }}>
            Neem contact op <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}


// ============================================
// MINDOOR 2 — Bento Mosaic + Sfeerbeeld
// Large image card (col-span-2, row-span-2),
// colored cards, stat card, CTA card
// ============================================
function VoorWieMindoor2({ theme, palette, titel, intro, doelgroepen }: VoorWieComponentProps) {
  const firstDoelgroep = doelgroepen[0];
  const restDoelgroepen = doelgroepen.slice(1, 6);

  return (
    <section className="py-20 lg:py-32" style={{ background: palette.bgAlt }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="max-w-2xl mb-12 lg:mb-16">
          <span className="text-sm font-medium mb-3 block" style={{ color: palette.primary }}>
            Doelgroepen
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-[1.15] mb-4" style={{ fontFamily: theme.fonts.heading, color: palette.text }}>
            {titel}
          </h2>
          {intro && (
            <p style={{ color: palette.textMuted }}>{intro}</p>
          )}
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">

          {/* Large image card (col-span-2, row-span-2) */}
          {firstDoelgroep && (
            <a href="#contact" className="group col-span-2 row-span-2 relative rounded-[28px] overflow-hidden min-h-[350px] lg:min-h-[420px]">
              <img
                src={firstDoelgroep.afbeelding || 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&h=800&fit=crop'}
                alt={firstDoelgroep.titel}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <span className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Primair werkgebied</span>
                <h3 className="text-2xl lg:text-3xl font-medium text-white mb-2" style={{ fontFamily: theme.fonts.heading }}>
                  {firstDoelgroep.titel}
                </h3>
                <p className="text-white/80 text-sm hidden sm:block">{firstDoelgroep.tekst}</p>
              </div>
            </a>
          )}

          {/* Doelgroep cards — alternating colored/white */}
          {restDoelgroepen.map((doelgroep: any, idx: number) => {
            const isColored = idx === 0;
            const useAccent = idx >= 2;

            if (isColored) {
              return (
                <a key={idx} href="#contact" className="group p-6 rounded-[24px] flex flex-col justify-between min-h-[180px] transition-all duration-300" style={{ background: palette.primary }}>
                  <span className="material-symbols-outlined text-2xl text-white/80">
                    {DOELGROEP_ICONS[doelgroep.type] || 'group'}
                  </span>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1" style={{ fontFamily: theme.fonts.heading }}>
                      {doelgroep.titel}
                    </h3>
                    <span className="text-sm text-white/70 group-hover:text-white transition-colors">Contact →</span>
                  </div>
                </a>
              );
            }

            return (
              <a key={idx} href="#contact" className="group p-6 rounded-[24px] flex flex-col justify-between min-h-[180px] transition-all duration-300 bg-white hover:shadow-md">
                <span className="material-symbols-outlined text-2xl" style={{ color: useAccent ? palette.accent : palette.primary }}>
                  {DOELGROEP_ICONS[doelgroep.type] || 'group'}
                </span>
                <div>
                  <h3 className="text-lg font-medium mb-1" style={{ fontFamily: theme.fonts.heading, color: palette.text }}>
                    {doelgroep.titel}
                  </h3>
                  <span className="text-sm" style={{ color: useAccent ? palette.accent : palette.primary }}>Contact →</span>
                </div>
              </a>
            );
          })}

          {/* Stat card */}
          <div className="p-6 rounded-[24px] flex flex-col justify-center text-center" style={{ background: `${palette.accent}15` }}>
            <span className="text-4xl font-light mb-2" style={{ fontFamily: theme.fonts.heading, color: palette.accent }}>
              15+
            </span>
            <span className="text-xs uppercase tracking-wider" style={{ color: palette.textMuted }}>Jaar ervaring</span>
          </div>

          {/* CTA card (dark) — col-span-full */}
          <a href="#contact" className="group col-span-full p-6 lg:p-8 rounded-[24px] flex items-center justify-between" style={{ background: palette.text }}>
            <div>
              <h3 className="text-lg lg:text-xl font-medium text-white mb-1" style={{ fontFamily: theme.fonts.heading }}>
                Andere zorgsetting?
              </h3>
              <p className="text-sm text-white/60">Laten we kennismaken</p>
            </div>
            <span className="w-12 h-12 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined" style={{ color: palette.text }}>arrow_forward</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}


// ============================================
// MINDOOR 3 — Split Image + List
// Image links met social proof card,
// rechts: list items met icon circles, hover color swap
// ============================================
function VoorWieMindoor3({ theme, palette, titel, intro, doelgroepen }: VoorWieComponentProps) {
  return (
    <section className="py-20 lg:py-32" style={{ background: palette.bg }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: Image with offset bg shape */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full rounded-3xl" style={{ background: palette.accent, opacity: 0.12 }} />
            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=900&fit=crop"
              alt="Zorgverlener"
              className="relative w-full h-[400px] lg:h-[520px] object-cover rounded-3xl"
            />

            {/* Social proof card */}
            <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-white p-5 rounded-2xl shadow-xl max-w-[240px]">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4" viewBox="0 0 20 20" fill="none">
                      <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.33L10 13.27l-4.77 2.51.91-5.33L2.27 6.68l5.34-.78L10 1z" fill={palette.accent} />
                    </svg>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1.5">
                  {['FJ', 'MV', 'RB'].map((initials, i) => (
                    <div key={i} className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white" style={{ background: i % 2 === 0 ? palette.primary : palette.accent }}>
                      {initials}
                    </div>
                  ))}
                </div>
                <p className="text-[11px]" style={{ color: palette.textMuted }}>Vertrouwd door zorginstellingen</p>
              </div>
            </div>
          </div>

          {/* Right: Content + List */}
          <div>
            <span className="text-sm font-medium mb-3 block" style={{ color: palette.primary }}>
              Doelgroepen
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] leading-[1.15] mb-4" style={{ fontFamily: theme.fonts.heading, color: palette.text }}>
              {titel}
            </h2>
            <p className="mb-10" style={{ color: palette.textMuted }}>{intro}</p>

            {/* Doelgroepen list */}
            <div className="space-y-0">
              {doelgroepen.slice(0, 6).map((doelgroep: any, idx: number) => {
                const isLast = idx === Math.min(doelgroepen.length, 6) - 1;
                const useAccent = doelgroep.type === 'bemiddelaar' || doelgroep.type === 'intermediair';
                return (
                  <a
                    key={idx}
                    href="#contact"
                    className={`group flex items-start gap-5 px-4 py-4 rounded-2xl transition-all duration-300 ${!isLast ? 'pb-6 mb-6 border-b' : ''}`}
                    style={{ borderColor: palette.border }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors"
                      style={{ background: useAccent ? `${palette.accent}15` : `${palette.primary}15` }}
                    >
                      <span className="material-symbols-outlined text-xl transition-colors" style={{ color: useAccent ? palette.accent : palette.primary }}>
                        {DOELGROEP_ICONS[doelgroep.type] || 'group'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium mb-1 transition-colors" style={{ fontFamily: theme.fonts.heading, color: palette.text }}>
                          {doelgroep.titel}
                        </h3>
                        <span className="text-sm transition-all opacity-0 group-hover:opacity-100" style={{ color: palette.accent }}>
                          Contact →
                        </span>
                      </div>
                      <p className="text-sm transition-colors" style={{ color: palette.textMuted }}>
                        {doelgroep.tekst}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-8">
              <a href="#contact" className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: palette.primary }}>
                Neem contact op <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


// ============================================
// SERENE 1 — Numbered Minimal
// Generous whitespace, numbered items met border-bottom,
// tiny uppercase labels, centered header
// ============================================
function VoorWieSerene({ theme, palette, titel, intro, doelgroepen }: VoorWieComponentProps) {
  return (
    <section className="py-24 lg:py-36" style={{ background: palette.bg }}>
      <div className="max-w-4xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="text-center mb-20">
          <span className="block mb-5 uppercase tracking-[3px] font-medium" style={{ fontSize: '9px', color: palette.accent }}>
            Doelgroepen
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-[1.15] mb-5" style={{ fontFamily: theme.fonts.heading, color: palette.text }}>
            {titel}
          </h2>
          <p className="max-w-lg mx-auto text-sm leading-relaxed" style={{ color: palette.textMuted }}>
            {intro}
          </p>
        </div>

        {/* Numbered list */}
        <div>
          {doelgroepen.slice(0, 6).map((doelgroep: any, idx: number) => {
            const isLast = idx === Math.min(doelgroepen.length, 6) - 1;
            return (
              <a
                key={idx}
                href="#contact"
                className={`group flex items-start gap-6 lg:gap-10 py-8 transition-all duration-300 ${!isLast ? 'border-b' : ''}`}
                style={{ borderColor: palette.border }}
              >
                <span
                  className="text-5xl lg:text-6xl font-light leading-none transition-colors duration-300 group-hover:!text-[var(--hover)]"
                  style={{ fontFamily: theme.fonts.heading, color: palette.border, '--hover': idx % 2 === 0 ? palette.primary : palette.accent } as any}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 pt-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg lg:text-xl font-medium" style={{ fontFamily: theme.fonts.heading, color: palette.text }}>
                      {doelgroep.titel}
                    </h3>
                    <span className="text-xs uppercase tracking-[2px] transition-all duration-300 opacity-0 group-hover:opacity-100" style={{ color: palette.accent }}>
                      Contact →
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: palette.textMuted }}>
                    {doelgroep.tekst}
                  </p>
                </div>
              </a>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <a
            href="#contact"
            className="inline-block px-7 py-3 text-xs uppercase tracking-[2px] font-medium text-white transition-all duration-300 hover:opacity-90 rounded"
            style={{ background: palette.primary }}
          >
            Neem contact op
          </a>
        </div>
      </div>
    </section>
  );
}


// ============================================
// SERENE 2 — Dark Overlay Grid
// Icon + organic radius cards, stat element,
// wide bemiddelaars card, tiny labels
// ============================================
function VoorWieSerene2({ theme, palette, titel, intro, doelgroepen }: VoorWieComponentProps) {
  const cornerRadii = ['0 40px 0 0', '4px', '0 0 40px 0', '4px', '0 0 0 40px'];

  return (
    <section className="py-24 lg:py-36" style={{ background: palette.bg }}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <span className="block mb-5 uppercase tracking-[3px] font-medium" style={{ fontSize: '9px', color: palette.accent }}>
            Doelgroepen
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-[1.15] mb-4" style={{ fontFamily: theme.fonts.heading, color: palette.text }}>
            {titel}
          </h2>
          <p className="max-w-xl text-sm leading-relaxed" style={{ color: palette.textMuted }}>
            {intro}
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {doelgroepen.slice(0, 6).map((doelgroep: any, idx: number) => (
            <a
              key={idx}
              href="#contact"
              className="group p-7 lg:p-8 flex flex-col justify-between min-h-[220px] transition-all duration-300 hover:shadow-md"
              style={{ background: palette.bgAlt, borderRadius: cornerRadii[idx] || '4px' }}
            >
              <div>
                <span className="material-symbols-outlined text-2xl mb-4 block transition-colors" style={{ color: palette.primary }}>
                  {DOELGROEP_ICONS[doelgroep.type] || 'group'}
                </span>
                <span className="block mb-3 uppercase tracking-[3px] font-medium transition-colors" style={{ fontSize: '9px', color: palette.accent }}>
                  {doelgroep.label || doelgroep.type}
                </span>
                <h3 className="text-lg font-medium mb-2 transition-colors" style={{ fontFamily: theme.fonts.heading, color: palette.text }}>
                  {doelgroep.titel}
                </h3>
                <p className="text-sm leading-relaxed transition-colors" style={{ color: palette.textMuted }}>
                  {doelgroep.tekst}
                </p>
              </div>
              <span className="text-xs uppercase tracking-[2px] mt-5 transition-colors" style={{ color: palette.accent }}>
                Contact →
              </span>
            </a>
          ))}

          {/* Stat card */}
          <div
            className="p-7 lg:p-8 flex flex-col justify-center items-center text-center min-h-[180px]"
            style={{ background: `${palette.primary}12`, borderRadius: '4px' }}
          >
            <span className="material-symbols-outlined text-3xl mb-3" style={{ color: palette.primary }}>verified</span>
            <span className="text-base font-medium mb-1" style={{ color: palette.primary }}>DBA-compliant</span>
            <span className="uppercase tracking-[3px] font-medium" style={{ fontSize: '9px', color: palette.textMuted }}>
              Volledig verzekerd
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}


// ============================================
// SERENE 3 — Asymmetric Split
// Image links met dark overlay + tekst,
// rechts numbered doelgroepen cards met hover color swap,
// organic corners
// ============================================
function VoorWieSerene3({ theme, palette, titel, intro, doelgroepen }: VoorWieComponentProps) {
  const cardRadii = ['0 40px 0 0', '4px', '4px', '0 0 40px 0'];

  return (
    <section className="py-24 lg:py-36" style={{ background: palette.bg }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Top label */}
        <div className="mb-16 lg:mb-20">
          <span className="block mb-5 uppercase tracking-[3px] font-medium" style={{ fontSize: '9px', color: palette.accent }}>
            Doelgroepen
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-[1.15]" style={{ fontFamily: theme.fonts.heading, color: palette.text }}>
              {titel}
            </h2>
            <p className="max-w-sm text-sm leading-relaxed lg:text-right" style={{ color: palette.textMuted }}>
              {intro}
            </p>
          </div>
        </div>

        {/* Split layout */}
        <div className="grid lg:grid-cols-5 gap-5">

          {/* Left: Image with dark overlay (2 cols) */}
          <div
            className="lg:col-span-2 relative overflow-hidden min-h-[400px] lg:min-h-[560px]"
            style={{ borderRadius: '0 40px 0 40px' }}
          >
            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=900&fit=crop"
              alt="Zorgverlener"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(26,26,26,0.85) 0%, rgba(26,26,26,0.3) 50%, rgba(26,26,26,0.1) 100%)' }} />

            {/* Overlay content */}
            <div className="absolute bottom-0 left-0 right-0 p-7 lg:p-9">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full" style={{ background: palette.accent }} />
                <span className="uppercase tracking-[3px] font-medium text-white/40" style={{ fontSize: '9px' }}>
                  Beschikbaar
                </span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                Direct inzetbaar als ZZP&apos;er. Volledig verzekerd, BIG-geregistreerd en DBA-compliant.
              </p>
              <a
                href="#contact"
                className="inline-block mt-5 px-5 py-2.5 text-xs uppercase tracking-[2px] font-medium text-white transition-all duration-300 hover:opacity-80 rounded"
                style={{ background: palette.accent }}
              >
                Contact
              </a>
            </div>
          </div>

          {/* Right: Doelgroepen cards (3 cols) */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {doelgroepen.slice(0, 6).map((doelgroep: any, idx: number) => (
              <a
                key={idx}
                href="#contact"
                className="group p-6 lg:p-7 flex flex-col justify-between min-h-[180px] transition-all duration-500 hover:shadow-md"
                style={{ background: palette.bgAlt, borderRadius: cardRadii[idx] || '4px' }}
              >
                <span className="text-3xl font-light transition-colors" style={{ fontFamily: theme.fonts.heading, color: palette.border }}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-base font-medium mb-1.5 transition-colors" style={{ fontFamily: theme.fonts.heading, color: palette.text }}>
                    {doelgroep.titel}
                  </h3>
                  <p className="text-sm leading-relaxed transition-colors" style={{ color: palette.textMuted }}>
                    {doelgroep.tekst}
                  </p>
                  <span className="block mt-3 text-xs uppercase tracking-[2px] transition-all duration-300 opacity-0 group-hover:opacity-100" style={{ color: palette.accent }}>
                    Contact →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


export default VoorWieSection;
