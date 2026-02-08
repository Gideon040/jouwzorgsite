// components/templates/sections/WerkwijzeSection.tsx
// Werkwijze sectie — v2 rewrite
// 5 thema's × 3 varianten = 15 unieke layouts
// Fixes: typed props, palette fallbacks, extracted helpers, no stap.label

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { ThemeConfig } from '../themes';
import { WerkwijzeStap } from '@/types';
import { BaseSectionProps, WerkwijzeStyle, getRevealClass, DEFAULT_WERKWIJZE_STAPPEN } from './types';

// ============================================
// SECTION PROPS
// ============================================

interface WerkwijzeSectionProps extends BaseSectionProps {
  style?: WerkwijzeStyle;
  variant?: 1 | 2 | 3;
}

// ============================================
// SHARED VARIANT PROPS (no more `any`)
// ============================================

interface PaletteWithOptionals {
  primary: string;
  primaryHover: string;
  primaryLight: string;
  primaryDark: string;
  accent?: string;
  accentLight?: string;
  bg?: string;
  bgAlt?: string;
  text?: string;
  textMuted?: string;
  border?: string;
}

interface WerkwijzeVariantProps {
  theme: ThemeConfig;
  palette: PaletteWithOptionals;
  titel: string;
  intro?: string;
  stappen: WerkwijzeStap[];
  footer?: string;
}

// ============================================
// SHARED HOOK: Auto-cycling stepper
// ============================================

function useStepCycle(totalSteps: number, duration = 4500, autoStart = true) {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(!autoStart);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((step: number) => {
    setCurrent(step);
    setProgress(0);
  }, []);

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);

  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    const tick = 30;
    let elapsed = 0;
    intervalRef.current = setInterval(() => {
      elapsed += tick;
      setProgress(Math.min((elapsed / duration) * 100, 100));
      if (elapsed >= duration) {
        elapsed = 0;
        setCurrent(prev => (prev + 1) % totalSteps);
        setProgress(0);
      }
    }, tick);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, duration, totalSteps]);

  return { current, progress, goTo, pause, resume, isPaused };
}

// ============================================
// SHARED: Default stappen icons
// ============================================

const STAP_ICONS = ['mail', 'groups', 'handshake', 'rocket_launch'];

function getStapIcon(stap: WerkwijzeStap, idx: number): string {
  return stap.icon || STAP_ICONS[idx % STAP_ICONS.length];
}

function padNum(n: number): string {
  return String(n).padStart(2, '0');
}

// ============================================
// HELPER: Section Header
// ============================================

interface SectionHeaderProps {
  theme: ThemeConfig;
  palette: PaletteWithOptionals;
  titel: string;
  intro?: string;
  variant: 'editorial' | 'proactief' | 'serene' | 'mindoor' | 'portfolio';
}

function SectionHeader({ theme, palette, titel, intro, variant }: SectionHeaderProps) {
  const accent = palette.accent ?? palette.primary;

  switch (variant) {
    case 'editorial':
      return (
        <div className={`text-center mb-16 ${getRevealClass('up')}`}>
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] block mb-3" style={{ color: accent }}>
            Samenwerken
          </span>
          <h2 className="text-3xl md:text-4xl" style={{ fontFamily: theme.fonts.heading, color: palette.primary }}>
            {titel}
          </h2>
          <div className="w-12 h-px mx-auto mt-4" style={{ backgroundColor: accent }} />
          {intro && (
            <p className="mt-5 max-w-lg mx-auto text-base leading-relaxed" style={{ color: theme.colors.textMuted }}>
              {intro}
            </p>
          )}
        </div>
      );

    case 'proactief':
      return (
        <div className={`text-center max-w-xl mx-auto mb-16 ${getRevealClass('up')}`}>
          <span className="text-sm italic mb-3 block" style={{ color: palette.primary }}>Werkwijze</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: theme.fonts.heading, color: palette.primaryDark }}>
            {titel}
          </h2>
          {intro && <p className="text-[15px] leading-relaxed" style={{ color: theme.colors.textMuted }}>{intro}</p>}
        </div>
      );

    case 'serene':
      return (
        <div className={`mb-20 ${getRevealClass('up')}`}>
          <span className="text-[9px] font-semibold uppercase tracking-[3px] block mb-4" style={{ color: theme.colors.textMuted }}>
            Werkwijze
          </span>
          <h2 className="text-4xl sm:text-[54px] font-light leading-[1.08]" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>
            {titel}
          </h2>
        </div>
      );

    case 'mindoor':
      return (
        <div className={`text-center mb-20 ${getRevealClass('up')}`}>
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-4 block" style={{ color: accent }}>
            Werkwijze
          </span>
          <h2 className="text-4xl sm:text-[52px] font-medium leading-[1.1]" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>
            {titel}
          </h2>
          {intro && <p className="text-[15px] leading-relaxed max-w-md mx-auto mt-6" style={{ color: theme.colors.textMuted }}>{intro}</p>}
        </div>
      );

    case 'portfolio':
      return (
        <div className={`text-center mb-20 ${getRevealClass('up')}`}>
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] mb-3 block" style={{ color: accent }}>
            ✦ &nbsp; Werkwijze &nbsp; ✦
          </span>
          <h2 className="text-4xl sm:text-5xl font-semibold mb-4" style={{ fontFamily: theme.fonts.heading, color: palette.primary }}>
            {titel}
          </h2>
          <div className="w-16 h-px mx-auto mt-5 mb-5" style={{ backgroundColor: accent, opacity: 0.4 }} />
          {intro && <p className="text-[15px] leading-relaxed max-w-md mx-auto" style={{ color: theme.colors.textMuted }}>{intro}</p>}
        </div>
      );
  }
}

// ============================================
// HELPER: Footer Trust Badges
// ============================================

function FooterBadges({ theme, palette }: { theme: ThemeConfig; palette: PaletteWithOptionals }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-5 mt-12 pt-8" style={{ borderTop: `1px solid ${theme.colors.border}` }}>
      <span className="flex items-center gap-1.5 text-xs" style={{ color: theme.colors.textMuted }}>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Beschikbaar
      </span>
      <span className="flex items-center gap-1.5 text-xs" style={{ color: theme.colors.textMuted }}>
        <span className="material-symbols-outlined text-xs" style={{ color: palette.primary }}>schedule</span> 24h reactietijd
      </span>
      <span className="flex items-center gap-1.5 text-xs" style={{ color: theme.colors.textMuted }}>
        <span className="material-symbols-outlined text-xs" style={{ color: palette.primary }}>verified</span> DBA-compliant
      </span>
    </div>
  );
}

// ============================================
// HELPER: Stepper Track (horizontal)
// Used by Editorial V2, Proactief V1, Serene V2, Mindoor V2, Portfolio V2
// ============================================

interface StepperTrackProps {
  items: WerkwijzeStap[];
  current: number;
  progress: number;
  goTo: (idx: number) => void;
  theme: ThemeConfig;
  palette: PaletteWithOptionals;
  nodeStyle: 'circle' | 'square' | 'pill' | 'corner';
}

function StepperTrack({ items, current, goTo, theme, palette, nodeStyle }: StepperTrackProps) {
  const accent = palette.accent ?? palette.primary;
  const filledWidth = current === 0 ? 0 : (current / (items.length - 1)) * 100;

  const getNodeRadius = () => {
    switch (nodeStyle) {
      case 'circle': return '9999px';
      case 'square': return '2px';
      case 'corner': return '0 20px 0 0';
      default: return '9999px';
    }
  };

  return (
    <div className={`relative px-8 mb-10 ${getRevealClass('up', 1)}`}>
      {/* Track line */}
      <div className="h-[2px] rounded" style={{ backgroundColor: theme.colors.border }}>
        <div
          className="h-full rounded transition-[width] duration-500"
          style={{
            width: `${filledWidth}%`,
            background: `linear-gradient(90deg, ${palette.primary}, ${accent})`,
          }}
        />
      </div>
      {/* Nodes */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-0">
        {items.map((_, idx) => (
          <div
            key={idx}
            className="w-12 h-12 border-[3px] flex items-center justify-center cursor-pointer transition-all duration-300 relative z-[2]"
            style={{
              borderRadius: getNodeRadius(),
              backgroundColor: idx <= current ? palette.primary : 'white',
              borderColor: idx <= current ? palette.primary : theme.colors.border,
              transform: idx === current ? 'scale(1.15)' : 'scale(1)',
              boxShadow: idx === current ? `0 0 0 6px ${palette.primary}15` : 'none',
            }}
            onClick={() => goTo(idx)}
          >
            <span
              className="material-symbols-outlined text-xl"
              style={{ color: idx <= current ? 'white' : theme.colors.textMuted }}
            >
              {getStapIcon(items[idx], idx)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// HELPER: Stepper Labels row
// ============================================

function StepperLabels({ items, current, theme, palette }: {
  items: WerkwijzeStap[];
  current: number;
  theme: ThemeConfig;
  palette: PaletteWithOptionals;
}) {
  return (
    <div className="flex justify-between px-0 mb-10">
      {items.map((stap, idx) => (
        <span
          key={idx}
          className="text-sm text-center w-1/4 transition-all duration-300"
          style={{
            color: idx === current ? palette.primary : theme.colors.textMuted,
            fontWeight: idx === current ? 600 : 400,
          }}
        >
          {stap.titel}
        </span>
      ))}
    </div>
  );
}

// ============================================
// HELPER: Progress Bar
// ============================================

function ProgressBar({ progress, theme, palette }: {
  progress: number;
  theme: ThemeConfig;
  palette: PaletteWithOptionals;
}) {
  const accent = palette.accent ?? palette.primary;
  return (
    <div className="h-[2px] mt-5 overflow-hidden rounded" style={{ backgroundColor: theme.colors.border }}>
      <div
        className="h-full rounded transition-[width] duration-50"
        style={{
          width: `${progress}%`,
          background: `linear-gradient(90deg, ${palette.primary}, ${accent})`,
        }}
      />
    </div>
  );
}

// ============================================
// HELPER: isAccentStep — last step gets accent treatment
// ============================================

function isAccentStep(idx: number, total: number): boolean {
  return idx === total - 1;
}

// ============================================
// MAIN COMPONENT
// ============================================

export function WerkwijzeSection({
  style = 'editorial',
  variant = 1,
  theme,
  palette,
  content,
  generated,
}: WerkwijzeSectionProps) {
  const werkwijzeContent = generated?.werkwijze;
  const titel = werkwijzeContent?.titel || 'Hoe werkt het?';
  const intro = werkwijzeContent?.intro;
  const stappen = werkwijzeContent?.stappen || DEFAULT_WERKWIJZE_STAPPEN;
  const footer = werkwijzeContent?.footer || 'Flexibel inzetbaar op korte en lange termijn. Zowel voor zorginstellingen als particulieren (PGB).';

  const props: WerkwijzeVariantProps = { theme, palette, titel, intro, stappen, footer };

  switch (style) {
    case 'editorial':
      if (variant === 2) return <EditorialV2Stepper {...props} />;
      if (variant === 3) return <EditorialV3Ghost {...props} />;
      return <EditorialV1Cards {...props} />;
    case 'proactief':
    case 'bento':
      if (variant === 2) return <ProactiefV2Vertical {...props} />;
      if (variant === 3) return <ProactiefV3Expanding {...props} />;
      return <ProactiefV1Stepper {...props} />;
    case 'serene':
      if (variant === 2) return <SereneV2ZenStepper {...props} />;
      if (variant === 3) return <SereneV3Timeline {...props} />;
      return <SereneV1Typographic {...props} />;
    case 'mindoor':
      if (variant === 2) return <MindoorV2Stepper {...props} />;
      if (variant === 3) return <MindoorV3Floating {...props} />;
      return <MindoorV1Bento {...props} />;
    case 'portfolio':
      if (variant === 2) return <PortfolioV2Stepper {...props} />;
      if (variant === 3) return <PortfolioV3Timeline {...props} />;
      return <PortfolioV1Cards {...props} />;
    default:
      return <EditorialV1Cards {...props} />;
  }
}


// ╔════════════════════════════════════════════╗
// ║           EDITORIAL VARIANTEN              ║
// ╚════════════════════════════════════════════╝

// ============================================
// EDITORIAL V1 — Cards
// Border cards, gold top-line hover, serif numbers, icon boxes
// ============================================
function EditorialV1Cards({ theme, palette, titel, intro, stappen }: WerkwijzeVariantProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const accent = palette.accent ?? palette.primary;
  const items = stappen.slice(0, 4);

  return (
    <section id="werkwijze" className="px-6 md:px-16 lg:px-32 py-20" style={{ backgroundColor: theme.colors.background }}>
      <div className="max-w-5xl mx-auto">
        <SectionHeader theme={theme} palette={palette} titel={titel} intro={intro} variant="editorial" />

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {items.map((stap, idx) => {
            const isAccent = isAccentStep(idx, items.length);
            const isHover = hovered === idx;
            return (
              <div
                key={idx}
                className={`relative overflow-hidden border p-9 transition-all duration-300 ${getRevealClass('up', idx + 1)}`}
                style={{
                  backgroundColor: isAccent ? palette.primary : theme.colors.background,
                  borderColor: isHover ? accent : (isAccent ? palette.primary : theme.colors.border),
                  borderRadius: '2px',
                  transform: isHover ? 'translateY(-2px)' : 'none',
                  boxShadow: isHover ? `0 8px 32px ${palette.primary}10` : 'none',
                }}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Top line accent on hover */}
                <div
                  className="absolute top-0 left-0 h-0.5 transition-all duration-400"
                  style={{ width: isHover ? '100%' : '0%', backgroundColor: accent }}
                />

                {/* Number + Icon row */}
                <div className="flex items-start justify-between mb-5">
                  <span
                    className="text-[56px] font-normal leading-none"
                    style={{
                      fontFamily: theme.fonts.heading,
                      color: isHover ? accent : (isAccent ? `${palette.primary}25` : theme.colors.border),
                      transition: 'color 0.35s ease',
                    }}
                  >
                    {padNum(idx + 1)}
                  </span>
                  <div
                    className="w-11 h-11 flex items-center justify-center border transition-all duration-300"
                    style={{
                      borderRadius: '2px',
                      backgroundColor: isHover ? palette.primary : (isAccent ? `${palette.primary}15` : theme.colors.backgroundAlt),
                      borderColor: isHover ? palette.primary : (isAccent ? `${palette.primary}25` : theme.colors.border),
                    }}
                  >
                    <span
                      className="material-symbols-outlined text-xl"
                      style={{ color: isHover || isAccent ? 'white' : palette.primary }}
                    >
                      {getStapIcon(stap, idx)}
                    </span>
                  </div>
                </div>

                {/* Step label + divider */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em]" style={{ color: accent }}>
                    Stap {idx + 1}
                  </span>
                  <div className="flex-1 h-px" style={{ backgroundColor: isAccent ? 'rgba(255,255,255,0.12)' : theme.colors.border }} />
                </div>

                <h3
                  className="text-xl mb-2"
                  style={{ fontFamily: theme.fonts.heading, color: isAccent ? 'white' : palette.primary }}
                >
                  {stap.titel}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: isAccent ? 'rgba(255,255,255,0.7)' : theme.colors.textMuted }}
                >
                  {stap.beschrijving}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================
// EDITORIAL V2 — Sidebar Stepper
// Horizontal stepper labels + track, auto-cycling panels
// ============================================
function EditorialV2Stepper({ theme, palette, titel, intro, stappen }: WerkwijzeVariantProps) {
  const accent = palette.accent ?? palette.primary;
  const items = stappen.slice(0, 4);
  const { current, progress, goTo, pause, resume } = useStepCycle(items.length, 4500);

  return (
    <section id="werkwijze" className="px-6 md:px-16 lg:px-32 py-20" style={{ backgroundColor: theme.colors.background }}>
      <div className="max-w-5xl mx-auto">
        {/* Header — left-aligned editorial variant */}
        <div className={`mb-14 ${getRevealClass('up')}`}>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px" style={{ backgroundColor: accent }} />
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em]" style={{ color: accent }}>
              Samenwerken
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl" style={{ fontFamily: theme.fonts.heading, color: palette.primary }}>
            {titel}
          </h2>
        </div>

        {/* Desktop Stepper */}
        <div className="hidden md:block" onMouseEnter={pause} onMouseLeave={resume}>
          {/* Step labels */}
          <div className={`flex gap-0 mb-6 ${getRevealClass('up', 1)}`}>
            {items.map((stap, idx) => (
              <div
                key={idx}
                className="flex-1 text-[11px] font-semibold uppercase tracking-[0.12em] cursor-pointer transition-colors duration-300 py-3"
                style={{ color: idx === current ? palette.primary : theme.colors.textMuted }}
                onClick={() => goTo(idx)}
              >
                <span style={{ color: accent, marginRight: 6 }}>{padNum(idx + 1)}</span>
                {stap.titel}
              </div>
            ))}
          </div>

          {/* Track */}
          <div className="relative h-0.5 mb-8" style={{ backgroundColor: theme.colors.border }}>
            {items.map((_, idx) => (
              <div
                key={idx}
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 border-2 bg-white transition-all duration-300 cursor-pointer"
                style={{
                  left: `${12.5 + (idx * 25)}%`,
                  borderColor: idx <= current ? palette.primary : theme.colors.border,
                  backgroundColor: idx === current ? palette.primary : 'white',
                  borderRadius: '2px',
                }}
                onClick={() => goTo(idx)}
              />
            ))}
            <div
              className="absolute top-0 left-0 h-full transition-[width] duration-100"
              style={{
                width: `${(current / items.length) * 100 + (progress / 100) * (100 / items.length)}%`,
                backgroundColor: accent,
              }}
            />
          </div>

          {/* Panels */}
          <div className="relative" style={{ minHeight: 200 }}>
            {items.map((stap, idx) => {
              const isAccent = isAccentStep(idx, items.length);
              return (
                <div
                  key={idx}
                  className="transition-all duration-400"
                  style={{
                    opacity: idx === current ? 1 : 0,
                    transform: idx === current ? 'translateY(0)' : 'translateY(12px)',
                    display: idx === current ? 'block' : 'none',
                  }}
                >
                  <div
                    className="flex items-start gap-8 p-8 border"
                    style={{
                      backgroundColor: isAccent ? palette.primary : theme.colors.background,
                      borderColor: isAccent ? palette.primary : theme.colors.border,
                      borderRadius: '2px',
                    }}
                  >
                    <div
                      className="w-11 h-11 flex items-center justify-center border flex-shrink-0"
                      style={{
                        borderRadius: '2px',
                        backgroundColor: isAccent ? 'rgba(255,255,255,0.1)' : theme.colors.backgroundAlt,
                        borderColor: isAccent ? 'rgba(255,255,255,0.15)' : theme.colors.border,
                      }}
                    >
                      <span
                        className="material-symbols-outlined text-xl"
                        style={{ color: isAccent ? 'rgba(255,255,255,0.9)' : palette.primary }}
                      >
                        {getStapIcon(stap, idx)}
                      </span>
                    </div>
                    <div>
                      <h3
                        className="text-2xl mb-3"
                        style={{ fontFamily: theme.fonts.heading, color: isAccent ? 'white' : palette.primary }}
                      >
                        {stap.titel}
                      </h3>
                      <p
                        className="text-base leading-relaxed"
                        style={{ color: isAccent ? 'rgba(255,255,255,0.7)' : theme.colors.textMuted }}
                      >
                        {stap.beschrijving}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: Stacked cards */}
        <div className="md:hidden flex flex-col gap-4">
          {items.map((stap, idx) => {
            const isAccent = isAccentStep(idx, items.length);
            return (
              <div
                key={idx}
                className={`p-6 border ${getRevealClass('up', idx + 1)}`}
                style={{
                  borderRadius: '2px',
                  backgroundColor: isAccent ? palette.primary : theme.colors.background,
                  borderColor: isAccent ? palette.primary : theme.colors.border,
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-lg" style={{ fontFamily: theme.fonts.heading, color: accent }}>
                    {padNum(idx + 1)}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em]"
                    style={{ color: isAccent ? 'rgba(255,255,255,0.5)' : theme.colors.textMuted }}>
                    {stap.titel}
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: isAccent ? 'rgba(255,255,255,0.7)' : theme.colors.textMuted }}>
                  {stap.beschrijving}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================
// EDITORIAL V3 — Ghost Numbers
// Large outlined numbers, content offset, expanding underlines
// ============================================
function EditorialV3Ghost({ theme, palette, titel, intro, stappen }: WerkwijzeVariantProps) {
  const accent = palette.accent ?? palette.primary;
  const [hovered, setHovered] = useState<number | null>(null);
  const items = stappen.slice(0, 4);

  return (
    <section id="werkwijze" className="px-6 md:px-16 lg:px-32 py-20" style={{ backgroundColor: theme.colors.background }}>
      <div className="max-w-4xl mx-auto">
        {/* Header — left-aligned with line */}
        <div className={`mb-4 ${getRevealClass('up')}`}>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em]" style={{ color: accent }}>
              Samenwerken
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: theme.colors.border }} />
          </div>
          <h2 className="text-3xl md:text-4xl mb-3" style={{ fontFamily: theme.fonts.heading, color: palette.primary }}>
            {titel}
          </h2>
          {intro && (
            <p className="text-base max-w-lg leading-relaxed" style={{ color: theme.colors.textMuted }}>{intro}</p>
          )}
        </div>

        {/* Rows */}
        {items.map((stap, idx) => {
          const isHover = hovered === idx;
          const isAccent = isAccentStep(idx, items.length);
          return (
            <div
              key={idx}
              className={`relative py-12 transition-all duration-300 ${getRevealClass('up', idx + 1)}`}
              style={{
                borderBottom: idx < items.length - 1 ? `1px solid ${theme.colors.border}` : 'none',
                paddingLeft: isHover ? 8 : 0,
              }}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Ghost number */}
              <span
                className="absolute top-6 left-0 select-none transition-all duration-500"
                style={{
                  fontFamily: theme.fonts.heading,
                  fontSize: 'clamp(72px, 10vw, 120px)',
                  fontWeight: 400,
                  lineHeight: 1,
                  color: isHover || isAccent ? `${accent}06` : 'transparent',
                  WebkitTextStroke: `1px ${isHover || isAccent ? accent : theme.colors.border}`,
                }}
              >
                {padNum(idx + 1)}
              </span>

              {/* Content */}
              <div className="relative z-[2]" style={{ paddingLeft: 'clamp(60px, 8vw, 100px)' }}>
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em]" style={{ color: accent }}>
                  Stap {idx + 1}
                </span>
                <h3 className="text-xl md:text-2xl mt-2 mb-3" style={{ fontFamily: theme.fonts.heading, color: palette.primary }}>
                  <span className="relative inline-block">
                    {stap.titel}
                    <span
                      className="absolute bottom-[-2px] left-0 h-[1.5px] transition-all duration-400"
                      style={{ width: isHover ? '100%' : '0%', backgroundColor: accent }}
                    />
                  </span>
                  {isHover && (
                    <span className="inline-flex items-center ml-2 transition-all duration-300">
                      <span className="material-symbols-outlined" style={{ fontSize: 16, color: accent }}>east</span>
                    </span>
                  )}
                </h3>
                <p className="text-sm leading-relaxed max-w-md" style={{ color: theme.colors.textMuted }}>
                  {stap.beschrijving}
                </p>
                <div className="flex items-center gap-3 mt-4">
                  <span className="material-symbols-outlined" style={{ fontSize: 16, color: accent }}>
                    {getStapIcon(stap, idx)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}


// ╔════════════════════════════════════════════╗
// ║          PROACTIEF VARIANTEN               ║
// ╚════════════════════════════════════════════╝

// ============================================
// PROACTIEF V1 — Horizontal Stepper
// Circular nodes, track fill, auto-cycling panels
// ============================================
function ProactiefV1Stepper({ theme, palette, titel, intro, stappen, footer }: WerkwijzeVariantProps) {
  const items = stappen.slice(0, 4);
  const accent = palette.accent ?? palette.primary;
  const { current, progress, goTo, pause, resume } = useStepCycle(items.length, 4000);

  return (
    <section id="werkwijze" className="py-24 px-6 md:px-12 relative overflow-hidden" style={{ backgroundColor: theme.colors.backgroundAlt }}>
      {/* Decorative circles */}
      <div className="absolute -top-16 -right-24 w-72 h-72 rounded-full" style={{ backgroundColor: palette.primary, opacity: 0.03 }} />
      <div className="absolute -bottom-12 -left-16 w-52 h-52 rounded-full" style={{ backgroundColor: accent, opacity: 0.04 }} />

      <div className="max-w-5xl mx-auto relative">
        <SectionHeader theme={theme} palette={palette} titel={titel} intro={intro} variant="proactief" />

        {/* Desktop: Stepper track */}
        <div className="hidden md:block mb-12" onMouseEnter={pause} onMouseLeave={resume}>
          <StepperTrack
            items={items} current={current} progress={progress}
            goTo={goTo} theme={theme} palette={palette} nodeStyle="circle"
          />
          <StepperLabels items={items} current={current} theme={theme} palette={palette} />
        </div>

        {/* Panel content */}
        <div className="hidden md:block relative">
          {items.map((stap, idx) => {
            const isLast = isAccentStep(idx, items.length);
            return (
              <div
                key={idx}
                className="transition-all duration-450"
                style={{
                  opacity: idx === current ? 1 : 0,
                  transform: idx === current ? 'translateY(0)' : 'translateY(12px)',
                  maxHeight: idx === current ? 300 : 0,
                  overflow: 'hidden',
                  position: idx === current ? 'relative' : 'absolute',
                }}
              >
                <a href="#contact" className="block bg-white rounded-[20px] p-8 md:p-10 shadow-sm hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: isLast ? `${accent}15` : `${palette.primary}10` }}
                    >
                      <span className="material-symbols-outlined text-3xl" style={{ color: isLast ? accent : palette.primary }}>
                        {getStapIcon(stap, idx)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                          style={{ backgroundColor: isLast ? accent : palette.primary }}
                        >
                          Stap {idx + 1}
                        </span>
                        <h3 className="text-xl font-bold" style={{ color: theme.colors.text }}>{stap.titel}</h3>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: theme.colors.textMuted }}>
                        {stap.beschrijving}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold flex-shrink-0" style={{ color: isLast ? accent : palette.primary }}>
                      Contact <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </div>
                  </div>
                </a>
              </div>
            );
          })}
        </div>

        {/* Mobile: Stacked */}
        <div className="md:hidden space-y-4">
          {items.map((stap, idx) => (
            <a key={idx} href="#contact" className={`block bg-white rounded-2xl p-6 ${getRevealClass('up', idx + 1)}`}>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ backgroundColor: isAccentStep(idx, items.length) ? accent : palette.primary }}>
                  {idx + 1}
                </div>
                <h3 className="font-bold">{stap.titel}</h3>
              </div>
              <p className="text-sm" style={{ color: theme.colors.textMuted }}>{stap.beschrijving}</p>
            </a>
          ))}
        </div>

        {footer && <FooterBadges theme={theme} palette={palette} />}
      </div>
    </section>
  );
}

// ============================================
// PROACTIEF V2 — Vertical Progress
// Left progress track, auto-highlight rows
// ============================================
function ProactiefV2Vertical({ theme, palette, titel, intro, stappen }: WerkwijzeVariantProps) {
  const items = stappen.slice(0, 4);
  const accent = palette.accent ?? palette.primary;
  const { current, goTo, pause, resume } = useStepCycle(items.length, 3500);

  return (
    <section id="werkwijze" className="py-24 px-6 md:px-12 relative overflow-hidden" style={{ backgroundColor: theme.colors.background }}>
      <div className="max-w-5xl mx-auto">
        <div className={`text-center max-w-xl mx-auto mb-16 ${getRevealClass('up')}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-1" style={{ backgroundColor: palette.primary }} />
            <span className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: palette.primary }}>Werkwijze</span>
            <div className="w-10 h-1" style={{ backgroundColor: palette.primary }} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>
            {titel}
          </h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Progress track */}
          <div className="absolute left-[23px] top-0 bottom-0 w-1 rounded" style={{ backgroundColor: theme.colors.border }}>
            <div
              className="absolute top-0 left-0 right-0 rounded transition-[height] duration-600"
              style={{
                height: `${current === 0 ? 12 : 12 + (current / 3) * 88}%`,
                background: `linear-gradient(180deg, ${palette.primary}, ${accent})`,
              }}
            />
          </div>

          <div className="space-y-8">
            {items.map((stap, idx) => {
              const isActive = idx === current;
              const isPassed = idx < current;
              const isLast = isAccentStep(idx, items.length);
              return (
                <div
                  key={idx}
                  className={`flex gap-6 items-start cursor-pointer ${getRevealClass('up', idx + 1)}`}
                  onMouseEnter={pause}
                  onMouseLeave={resume}
                  onClick={() => goTo(idx)}
                >
                  {/* Dot */}
                  <div className="flex flex-col items-center pt-5">
                    <div
                      className="w-3.5 h-3.5 rounded-full border-[3px] relative z-[2] transition-all duration-300 flex-shrink-0"
                      style={{
                        backgroundColor: idx <= current ? palette.primary : 'white',
                        borderColor: idx <= current ? palette.primary : theme.colors.border,
                        boxShadow: isActive ? `0 0 0 5px ${palette.primary}12` : 'none',
                      }}
                    />
                  </div>

                  {/* Content card */}
                  <a href="#contact" className="flex-1 rounded p-5 transition-all duration-350"
                    style={{
                      borderLeft: `3px solid ${isActive || isPassed ? palette.primary : 'transparent'}`,
                      background: isActive ? `linear-gradient(90deg, ${palette.primary}10, transparent)` : (isPassed ? `linear-gradient(90deg, ${palette.primary}04, transparent)` : 'transparent'),
                      boxShadow: isActive ? `0 4px 24px ${palette.primary}10` : 'none',
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-400"
                        style={{
                          backgroundColor: isLast ? `${accent}15` : `${palette.primary}10`,
                          transform: isActive ? 'scale(1.08)' : 'scale(1)',
                        }}
                      >
                        <span className="material-symbols-outlined text-xl" style={{ color: isLast ? accent : palette.primary }}>
                          {getStapIcon(stap, idx)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider block mb-1.5" style={{ color: isActive ? palette.primary : theme.colors.textMuted }}>
                          Stap {idx + 1}
                        </span>
                        <h3 className="text-lg font-bold mb-1.5" style={{ color: theme.colors.text }}>{stap.titel}</h3>
                        <p className="text-sm" style={{ color: theme.colors.textMuted }}>{stap.beschrijving}</p>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-14">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white rounded-lg transition-all hover:gap-3"
            style={{ backgroundColor: palette.primary }}
          >
            Vraag beschikbaarheid aan
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================
// PROACTIEF V3 — Expanding Steps
// Accordion with auto-cycle, progress bars
// ============================================
function ProactiefV3Expanding({ theme, palette, titel, intro, stappen, footer }: WerkwijzeVariantProps) {
  const items = stappen.slice(0, 4);
  const accent = palette.accent ?? palette.primary;
  const [expanded, setExpanded] = useState(0);
  const { current, progress, goTo, pause, resume } = useStepCycle(items.length, 4500);

  useEffect(() => { setExpanded(current); }, [current]);

  const handleToggle = (idx: number) => {
    pause();
    setExpanded(prev => prev === idx ? -1 : idx);
    goTo(idx);
    setTimeout(resume, 8000);
  };

  return (
    <section id="werkwijze" className="py-24 px-6 md:px-12" style={{ backgroundColor: theme.colors.backgroundAlt }}>
      <div className="max-w-3xl mx-auto">
        <SectionHeader theme={theme} palette={palette} titel={titel} intro={intro} variant="proactief" />

        <div className={getRevealClass('up', 1)}>
          {items.map((stap, idx) => {
            const isExpanded = expanded === idx;
            const isLast = isAccentStep(idx, items.length);
            return (
              <div key={idx}>
                <div
                  className="cursor-pointer transition-all duration-400 p-6 md:p-8 relative overflow-hidden"
                  style={{
                    borderLeft: `4px solid ${isExpanded ? palette.primary : 'transparent'}`,
                    backgroundColor: isExpanded ? 'white' : 'transparent',
                    boxShadow: isExpanded ? `0 8px 30px ${palette.primary}08` : 'none',
                    borderRadius: '2px',
                  }}
                  onClick={() => handleToggle(idx)}
                >
                  {/* Progress bar */}
                  {isExpanded && (
                    <div className="absolute bottom-0 left-0 h-[3px]"
                      style={{
                        width: `${progress}%`,
                        background: `linear-gradient(90deg, ${palette.primary}, ${accent})`,
                      }}
                    />
                  )}

                  {/* Header row */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-5">
                      <span
                        className="text-[48px] font-bold leading-none transition-colors duration-400"
                        style={{ color: isExpanded ? palette.primary : theme.colors.border }}
                      >
                        {padNum(idx + 1)}
                      </span>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider block mb-0.5"
                          style={{ color: isExpanded ? palette.primary : theme.colors.textMuted }}>
                          Stap {idx + 1}
                        </span>
                        <h3 className="text-xl font-bold" style={{ color: isExpanded ? palette.primary : theme.colors.text }}>
                          {stap.titel}
                        </h3>
                      </div>
                    </div>
                    <div
                      className="w-8 h-8 rounded flex items-center justify-center border-2 transition-all duration-350 flex-shrink-0"
                      style={{
                        borderColor: isExpanded ? palette.primary : theme.colors.border,
                        backgroundColor: isExpanded ? palette.primary : 'transparent',
                        transform: isExpanded ? 'rotate(45deg)' : 'none',
                      }}
                    >
                      <span className="material-symbols-outlined text-lg" style={{ color: isExpanded ? 'white' : palette.primary }}>add</span>
                    </div>
                  </div>

                  {/* Expand content */}
                  <div
                    className="transition-all duration-450 overflow-hidden"
                    style={{ maxHeight: isExpanded ? 250 : 0, opacity: isExpanded ? 1 : 0 }}
                  >
                    <div className="mt-5 ml-0 md:ml-[84px] flex flex-col md:flex-row gap-5">
                      <div
                        className="w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: isLast ? `${accent}15` : `${palette.primary}10` }}
                      >
                        <span className="material-symbols-outlined text-2xl" style={{ color: isLast ? accent : palette.primary }}>
                          {getStapIcon(stap, idx)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm leading-relaxed mb-4" style={{ color: theme.colors.textMuted }}>
                          {stap.beschrijving}
                        </p>
                        <a href="#contact" className="inline-flex items-center gap-2 text-sm font-semibold"
                          style={{ color: isLast ? accent : palette.primary }}>
                          Neem contact op <span className="material-symbols-outlined text-base">arrow_forward</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connector */}
                {idx < items.length - 1 && (
                  <div className="w-0.5 h-6 mx-auto" style={{ backgroundColor: idx < expanded ? palette.primary : theme.colors.border }} />
                )}
              </div>
            );
          })}
        </div>

        {footer && <FooterBadges theme={theme} palette={palette} />}
      </div>
    </section>
  );
}


// ╔════════════════════════════════════════════╗
// ║           SERENE VARIANTEN                 ║
// ╚════════════════════════════════════════════╝

// ============================================
// SERENE V1 — Typographic List
// No cards, border-bottom, large serif numbers, max breathing room
// ============================================
function SereneV1Typographic({ theme, palette, titel, intro, stappen }: WerkwijzeVariantProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const items = stappen.slice(0, 4);

  return (
    <section id="werkwijze" className="py-28 px-6 md:px-12" style={{ backgroundColor: theme.colors.background }}>
      <div className="max-w-3xl mx-auto">
        <SectionHeader theme={theme} palette={palette} titel={titel} intro={intro} variant="serene" />

        {/* Items */}
        {items.map((stap, idx) => {
          const isHover = hovered === idx;
          return (
            <a
              key={idx}
              href="#contact"
              className={`flex items-start gap-6 md:gap-10 py-12 relative transition-all duration-500 ${getRevealClass('up', idx + 1)}`}
              style={{
                borderTop: idx === 0 ? `1px solid ${theme.colors.border}` : 'none',
                borderBottom: `1px solid ${theme.colors.border}`,
                paddingLeft: isHover ? 8 : 0,
              }}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Expanding underline */}
              <div className="absolute bottom-[-1px] left-0 h-px transition-all duration-600"
                style={{ width: isHover ? '100%' : '0%', backgroundColor: palette.primary }} />

              {/* Number */}
              <span
                className="flex-shrink-0 w-16 text-right transition-all duration-500"
                style={{
                  fontFamily: theme.fonts.heading,
                  fontSize: 56,
                  fontWeight: 300,
                  lineHeight: 1,
                  letterSpacing: -2,
                  color: isHover ? palette.primaryLight : theme.colors.border,
                }}
              >
                {padNum(idx + 1)}
              </span>

              {/* Content */}
              <div className="flex-1 pt-2">
                <span className="text-[9px] font-semibold uppercase tracking-[2px] block mb-2" style={{ color: theme.colors.textMuted }}>
                  Stap {idx + 1}
                </span>
                <h3
                  className="text-[26px] font-medium mb-3 transition-all duration-500"
                  style={{ fontFamily: theme.fonts.heading, color: theme.colors.text, letterSpacing: isHover ? 0.3 : 0 }}
                >
                  {stap.titel}
                </h3>
                <p className="text-[14px] leading-[1.8] max-w-lg" style={{ color: theme.colors.textMuted }}>
                  {stap.beschrijving}
                </p>
              </div>

              {/* Arrow */}
              <span
                className="material-symbols-outlined text-lg pt-5 flex-shrink-0 transition-all duration-400"
                style={{ color: palette.primary, opacity: isHover ? 1 : 0, transform: isHover ? 'translateX(0)' : 'translateX(-8px)' }}
              >
                arrow_forward
              </span>
            </a>
          );
        })}

        <div className={`mt-16 ${getRevealClass('up', 3)}`}>
          <p className="text-[9px] uppercase tracking-[3px]" style={{ color: theme.colors.textMuted }}>
            Vertrouwd door zorginstellingen en bemiddelaars
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================
// SERENE V2 — Zen Stepper
// Minimal circles, thin line, soft panels, auto-cycle
// ============================================
function SereneV2ZenStepper({ theme, palette, titel, intro, stappen }: WerkwijzeVariantProps) {
  const items = stappen.slice(0, 4);
  const { current, progress, goTo, pause, resume } = useStepCycle(items.length, 5000);

  return (
    <section id="werkwijze" className="py-28 px-6 md:px-12" style={{ backgroundColor: theme.colors.background }}>
      <div className="max-w-4xl mx-auto">
        <div className={`text-center mb-20 ${getRevealClass('up')}`}>
          <span className="text-[9px] font-semibold uppercase tracking-[3px] block mb-5" style={{ color: theme.colors.textMuted }}>Werkwijze</span>
          <h2 className="text-3xl sm:text-[48px] font-light leading-[1.1]" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>
            {titel}
          </h2>
        </div>

        {/* Desktop stepper */}
        <div className="hidden md:block" onMouseEnter={pause} onMouseLeave={resume}>
          {/* Track + nodes */}
          <div className={`relative px-6 mb-10 ${getRevealClass('up', 1)}`}>
            <div className="h-px" style={{ backgroundColor: theme.colors.border }}>
              <div className="h-full transition-[width] duration-500" style={{ width: `${current === 0 ? 0 : (current / 3) * 100}%`, backgroundColor: palette.primary }} />
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between">
              {items.map((_, idx) => (
                <div
                  key={idx}
                  className="w-11 h-11 rounded-full border flex items-center justify-center cursor-pointer transition-all duration-500 relative z-[2]"
                  style={{
                    backgroundColor: idx === current ? palette.primary : (idx < current ? palette.primaryLight : theme.colors.background),
                    borderColor: idx <= current ? palette.primary : theme.colors.border,
                    boxShadow: idx === current ? `0 0 0 6px ${palette.primary}08` : 'none',
                  }}
                  onClick={() => goTo(idx)}
                >
                  <span className="text-lg" style={{ fontFamily: theme.fonts.heading, fontWeight: 500, color: idx <= current ? 'white' : theme.colors.textMuted }}>
                    {padNum(idx + 1)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <StepperLabels items={items} current={current} theme={theme} palette={palette} />

          {/* Panels */}
          <div className="relative">
            {items.map((stap, idx) => (
              <div key={idx} style={{
                opacity: idx === current ? 1 : 0,
                transform: idx === current ? 'translateY(0)' : 'translateY(8px)',
                maxHeight: idx === current ? 300 : 0,
                overflow: 'hidden',
                position: idx === current ? 'relative' : 'absolute',
                transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}>
                <a href="#contact" className="block rounded-[20px] border p-9 transition-colors duration-300 hover:bg-opacity-50"
                  style={{ borderColor: theme.colors.border, backgroundColor: theme.colors.background }}>
                  <div className="flex flex-col md:flex-row md:items-start gap-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="w-6 h-px" style={{ backgroundColor: palette.primary }} />
                        <span className="text-[9px] font-semibold uppercase tracking-[2px]" style={{ color: theme.colors.textMuted }}>Stap {idx + 1}</span>
                      </div>
                      <h3 className="text-[24px] font-medium mb-3" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>
                        {stap.titel}
                      </h3>
                      <p className="text-[14px] leading-[1.8]" style={{ color: theme.colors.textMuted }}>{stap.beschrijving}</p>
                    </div>
                    <div className="flex items-center gap-2 text-[13px] font-semibold flex-shrink-0 pt-1" style={{ color: palette.primary }}>
                      Contact <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>

          <ProgressBar progress={progress} theme={theme} palette={palette} />
        </div>

        {/* Mobile stacked */}
        <div className="md:hidden space-y-0">
          {items.map((stap, idx) => (
            <a key={idx} href="#contact" className={`block py-6 ${getRevealClass('up', idx + 1)}`}
              style={{ borderBottom: idx < items.length - 1 ? `1px solid ${theme.colors.border}` : 'none' }}>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-light" style={{ fontFamily: theme.fonts.heading, color: theme.colors.border }}>
                  {padNum(idx + 1)}
                </span>
                <div>
                  <h3 className="font-medium text-lg" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>{stap.titel}</h3>
                  <p className="text-sm mt-1" style={{ color: theme.colors.textMuted }}>{stap.beschrijving}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// SERENE V3 — Editorial Timeline
// Left-aligned numbers, vertical connector with dots
// ============================================
function SereneV3Timeline({ theme, palette, titel, intro, stappen }: WerkwijzeVariantProps) {
  const items = stappen.slice(0, 4);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="werkwijze" className="py-28 px-6 md:px-12" style={{ backgroundColor: theme.colors.background }}>
      <div className="max-w-3xl mx-auto">
        <div className={`mb-24 ${getRevealClass('up')}`}>
          <div className="flex items-center gap-4 mb-6">
            <span className="w-8 h-px" style={{ backgroundColor: palette.primary }} />
            <span className="text-[9px] font-semibold uppercase tracking-[3px]" style={{ color: theme.colors.textMuted }}>Werkwijze</span>
          </div>
          <h2 className="text-3xl sm:text-[48px] font-light leading-[1.1]" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>
            {titel}
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {items.map((stap, idx) => {
            const isHover = hovered === idx;
            const isLast = isAccentStep(idx, items.length);
            return (
              <div
                key={idx}
                className={`relative transition-all duration-400 ${getRevealClass('up', idx + 1)}`}
                style={{ paddingLeft: 'clamp(72px, 10vw, 120px)', paddingBottom: isLast ? 0 : 64 }}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Vertical connector */}
                {!isLast && (
                  <div className="absolute top-0 bottom-0 w-px" style={{ left: 47, backgroundColor: theme.colors.border }} />
                )}

                {/* Dot */}
                <div
                  className="absolute top-2 w-[11px] h-[11px] rounded-full border-2 z-[2] transition-all duration-400"
                  style={{
                    left: 42,
                    backgroundColor: isHover || isLast ? palette.primary : theme.colors.background,
                    borderColor: isHover || isLast ? palette.primary : theme.colors.border,
                    boxShadow: isHover ? `0 0 0 4px ${palette.primary}08` : 'none',
                  }}
                />

                {/* Number (desktop) */}
                <span
                  className="absolute left-0 -top-2 hidden md:block transition-colors duration-400"
                  style={{
                    fontFamily: theme.fonts.heading,
                    fontSize: 36,
                    fontWeight: 300,
                    lineHeight: 1,
                    letterSpacing: -1,
                    color: isHover ? palette.primaryLight : theme.colors.border,
                  }}
                >
                  {padNum(idx + 1)}
                </span>

                {/* Content */}
                <div>
                  <div className="flex items-center mb-2">
                    <span className="inline-block h-px transition-all duration-500 mr-2.5"
                      style={{ width: isHover ? 24 : 0, backgroundColor: palette.primary }} />
                    <span className="text-[9px] font-semibold uppercase tracking-[2px]"
                      style={{ color: isLast ? palette.primary : theme.colors.textMuted }}>
                      Stap {idx + 1}
                    </span>
                  </div>
                  <h3 className="text-[24px] font-medium mb-3" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>
                    {stap.titel}
                  </h3>
                  <p className="text-[14px] leading-[1.8] max-w-md mb-4" style={{ color: theme.colors.textMuted }}>
                    {stap.beschrijving}
                  </p>
                  <span
                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold transition-all duration-400"
                    style={{ color: palette.primary, opacity: isHover ? 1 : 0, transform: isHover ? 'translateY(0)' : 'translateY(4px)' }}
                  >
                    Contact <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className={`mt-20 ${getRevealClass('up', 3)}`}>
          <p className="text-[9px] uppercase tracking-[3px]" style={{ color: theme.colors.textMuted }}>
            Vertrouwd door zorginstellingen en bemiddelaars
          </p>
        </div>
      </div>
    </section>
  );
}


// ╔════════════════════════════════════════════╗
// ║           MINDOOR VARIANTEN                ║
// ╚════════════════════════════════════════════╝

// ============================================
// MINDOOR V1 — Warm Bento Cards
// Stacked cards, large numbers, icon boxes, decorative circles
// ============================================
function MindoorV1Bento({ theme, palette, titel, intro, stappen }: WerkwijzeVariantProps) {
  const items = stappen.slice(0, 4);
  const accent = palette.accent ?? '#d4644a';

  return (
    <section id="werkwijze" className="py-24 px-6 md:px-12 relative overflow-hidden" style={{ backgroundColor: theme.colors.backgroundAlt }}>
      <div className="absolute -top-20 -right-16 w-[300px] h-[300px] rounded-full" style={{ backgroundColor: accent, opacity: 0.04 }} />
      <div className="absolute bottom-16 -left-12 w-[200px] h-[200px] rounded-full" style={{ backgroundColor: palette.primary, opacity: 0.05 }} />

      <div className="max-w-3xl mx-auto relative">
        <SectionHeader theme={theme} palette={palette} titel={titel} intro={intro} variant="mindoor" />

        <div className="space-y-5">
          {items.map((stap, idx) => {
            const isLast = isAccentStep(idx, items.length);
            return (
              <div key={idx}>
                <div className={getRevealClass('up', idx + 1)}>
                  <a
                    href="#contact"
                    className="block group rounded-3xl p-9 relative overflow-hidden border transition-all duration-500 hover:-translate-y-1.5"
                    style={{
                      backgroundColor: isLast ? palette.primary : (theme.colors.surface ?? 'white'),
                      borderColor: isLast ? palette.primary : theme.colors.border,
                    }}
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-5">
                      <div className="flex items-start gap-5 flex-shrink-0">
                        <span
                          className="text-[72px] font-light leading-none"
                          style={{
                            fontFamily: theme.fonts.heading,
                            letterSpacing: -3,
                            color: isLast ? 'rgba(255,255,255,0.12)' : theme.colors.backgroundAlt,
                          }}
                        >
                          {padNum(idx + 1)}
                        </span>
                        <div
                          className="mt-3 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-400"
                          style={{ backgroundColor: isLast ? 'rgba(255,255,255,0.12)' : `${palette.primary}10` }}
                        >
                          <span className="material-symbols-outlined text-xl" style={{ color: isLast ? 'white' : palette.primary }}>
                            {getStapIcon(stap, idx)}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 pt-1">
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em] block mb-2" style={{ color: isLast ? (palette.accentLight ?? accent) : accent }}>
                          Stap {idx + 1}
                        </span>
                        <h3 className="text-[22px] font-semibold mb-2" style={{ fontFamily: theme.fonts.heading, color: isLast ? 'white' : theme.colors.text }}>
                          {stap.titel}
                        </h3>
                        <p className="text-sm leading-[1.7]" style={{ color: isLast ? 'rgba(255,255,255,0.6)' : theme.colors.textMuted }}>
                          {stap.beschrijving}
                        </p>
                      </div>
                      <div className="flex items-center pt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="material-symbols-outlined text-base" style={{ color: isLast ? (palette.accentLight ?? accent) : accent }}>
                          arrow_forward
                        </span>
                      </div>
                    </div>
                  </a>
                </div>

                {!isLast && (
                  <div className="w-1.5 h-1.5 rounded-full mx-auto my-3" style={{ backgroundColor: palette.primaryLight, opacity: 0.3 }} />
                )}
              </div>
            );
          })}
        </div>

        <div className={`text-center mt-16 ${getRevealClass('up', 3)}`}>
          <p className="text-[11px] uppercase tracking-[0.2em] font-medium" style={{ color: theme.colors.textMuted }}>
            Vertrouwd door zorginstellingen en bemiddelaars
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================
// MINDOOR V2 — Organic Stepper
// Pill nodes, warm palette, auto-cycle, terracotta progress
// ============================================
function MindoorV2Stepper({ theme, palette, titel, intro, stappen }: WerkwijzeVariantProps) {
  const items = stappen.slice(0, 4);
  const accent = palette.accent ?? '#d4644a';
  const { current, progress, goTo, pause, resume } = useStepCycle(items.length, 4500);

  return (
    <section id="werkwijze" className="py-24 px-6 md:px-12 relative overflow-hidden" style={{ backgroundColor: theme.colors.backgroundAlt }}>
      <div className="max-w-5xl mx-auto relative">
        <div className={`text-center mb-16 ${getRevealClass('up')}`}>
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>Werkwijze</span>
          <h2 className="text-3xl sm:text-[46px] font-medium leading-[1.1] mt-3" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>
            {titel}
          </h2>
        </div>

        {/* Desktop stepper */}
        <div className="hidden md:block" onMouseEnter={pause} onMouseLeave={resume}>
          <div className={`relative px-8 mb-10 ${getRevealClass('up', 1)}`}>
            <div className="h-[3px] rounded" style={{ backgroundColor: theme.colors.border }}>
              <div className="h-full rounded transition-[width] duration-500" style={{ width: `${current === 0 ? 0 : (current / 3) * 100}%`, backgroundColor: accent }} />
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between">
              {items.map((_, idx) => (
                <div
                  key={idx}
                  className="w-[52px] h-[52px] rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-450 relative z-[2]"
                  style={{
                    backgroundColor: idx === current ? palette.primary : (idx < current ? accent : (theme.colors.surface ?? 'white')),
                    borderColor: idx === current ? palette.primary : (idx < current ? accent : theme.colors.border),
                    transform: idx === current ? 'scale(1.12)' : 'scale(1)',
                    boxShadow: idx === current ? `0 0 0 8px ${palette.primary}10` : 'none',
                  }}
                  onClick={() => goTo(idx)}
                >
                  <span className="text-xl" style={{ fontFamily: theme.fonts.heading, fontWeight: 600, color: idx <= current ? 'white' : theme.colors.textMuted }}>
                    {padNum(idx + 1)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <StepperLabels items={items} current={current} theme={theme} palette={palette} />

          {/* Panels */}
          <div className="relative">
            {items.map((stap, idx) => {
              const isLast = isAccentStep(idx, items.length);
              return (
                <div key={idx} style={{
                  opacity: idx === current ? 1 : 0,
                  transform: idx === current ? 'translateY(0)' : 'translateY(12px)',
                  maxHeight: idx === current ? 350 : 0,
                  overflow: 'hidden',
                  position: idx === current ? 'relative' : 'absolute',
                  transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}>
                  <a href="#contact" className="block rounded-3xl border p-8 transition-shadow hover:shadow-lg"
                    style={{
                      backgroundColor: isLast ? palette.primary : (theme.colors.surface ?? 'white'),
                      borderColor: isLast ? palette.primary : theme.colors.border,
                    }}>
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: isLast ? 'rgba(255,255,255,0.12)' : `${palette.primary}10` }}>
                        <span className="material-symbols-outlined text-2xl" style={{ color: isLast ? 'white' : palette.primary }}>
                          {getStapIcon(stap, idx)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-[0.12em] px-3 py-1 text-white rounded-full"
                            style={{ backgroundColor: isLast ? accent : palette.primary }}>
                            Stap {idx + 1}
                          </span>
                          <h3 className="text-xl font-semibold" style={{ fontFamily: theme.fonts.heading, color: isLast ? 'white' : theme.colors.text }}>
                            {stap.titel}
                          </h3>
                        </div>
                        <p className="text-sm leading-[1.7]" style={{ color: isLast ? 'rgba(255,255,255,0.6)' : theme.colors.textMuted }}>
                          {stap.beschrijving}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold flex-shrink-0" style={{ color: isLast ? (palette.accentLight ?? accent) : accent }}>
                        Contact <span className="material-symbols-outlined text-base">arrow_forward</span>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>

          <ProgressBar progress={progress} theme={theme} palette={palette} />
        </div>

        {/* Mobile */}
        <div className="md:hidden space-y-4">
          {items.map((stap, idx) => {
            const isLast = isAccentStep(idx, items.length);
            return (
              <a key={idx} href="#contact" className={`block p-6 rounded-[20px] border ${getRevealClass('up', idx + 1)}`}
                style={{
                  backgroundColor: isLast ? palette.primary : (theme.colors.surface ?? 'white'),
                  borderColor: isLast ? palette.primary : theme.colors.border,
                }}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl font-semibold" style={{ fontFamily: theme.fonts.heading, color: isLast ? (palette.accentLight ?? accent) : accent }}>
                    {padNum(idx + 1)}
                  </span>
                  <h3 className="font-semibold" style={{ fontFamily: theme.fonts.heading, color: isLast ? 'white' : theme.colors.text }}>{stap.titel}</h3>
                </div>
                <p className="text-sm" style={{ color: isLast ? 'rgba(255,255,255,0.6)' : theme.colors.textMuted }}>{stap.beschrijving}</p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================
// MINDOOR V3 — Floating Timeline
// Offset background shapes, alternating zigzag, circle nodes
// ============================================
function MindoorV3Floating({ theme, palette, titel, intro, stappen }: WerkwijzeVariantProps) {
  const items = stappen.slice(0, 4);
  const accent = palette.accent ?? '#d4644a';

  return (
    <section id="werkwijze" className="py-24 px-6 md:px-12 relative overflow-hidden" style={{ backgroundColor: theme.colors.backgroundAlt }}>
      <div className="max-w-3xl mx-auto relative">
        <SectionHeader theme={theme} palette={palette} titel={titel} intro={intro} variant="mindoor" />

        <div className="relative">
          {/* Vertical dotted line */}
          <div
            className="absolute left-7 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[2px]"
            style={{
              background: `repeating-linear-gradient(to bottom, ${palette.primaryLight} 0, ${palette.primaryLight} 6px, transparent 6px, transparent 14px)`,
              opacity: 0.3,
            }}
          />

          {items.map((stap, idx) => {
            const isRight = idx % 2 !== 0;
            const isLast = isAccentStep(idx, items.length);
            return (
              <div key={idx} className={`relative mb-14 ${getRevealClass('up', idx + 1)}`}>
                {/* Node */}
                <div className="absolute left-7 md:left-1/2 -translate-x-1/2 top-10 z-10">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: isLast ? accent : palette.primary }}
                  >
                    <span className="text-[22px] font-semibold text-white" style={{ fontFamily: theme.fonts.heading }}>
                      {padNum(idx + 1)}
                    </span>
                  </div>
                </div>

                {/* Card */}
                <div className={`ml-20 ${isRight ? 'md:ml-auto' : 'md:ml-0 md:mr-auto'} md:w-[calc(50%-48px)]`}>
                  <div className="relative">
                    {/* Offset shape */}
                    <div
                      className="absolute rounded-[2rem] z-[1] transition-all duration-500"
                      style={{
                        inset: isRight ? '6px 6px -6px -6px' : '6px -6px -6px 6px',
                        backgroundColor: idx % 2 === 0 ? accent : palette.primary,
                        opacity: 0.08,
                      }}
                    />
                    <a
                      href="#contact"
                      className="block relative z-[2] rounded-[2rem] border p-10 group transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                      style={{
                        backgroundColor: isLast ? palette.primary : (theme.colors.surface ?? 'white'),
                        borderColor: isLast ? palette.primary : theme.colors.border,
                      }}
                    >
                      <div className="flex items-center gap-3 mb-1">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: isLast ? 'rgba(255,255,255,0.12)' : `${palette.primary}10` }}>
                          <span className="material-symbols-outlined text-lg" style={{ color: isLast ? 'white' : palette.primary }}>
                            {getStapIcon(stap, idx)}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: isLast ? (palette.accentLight ?? accent) : accent }}>
                          Stap {idx + 1}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mt-3 mb-2" style={{ fontFamily: theme.fonts.heading, color: isLast ? 'white' : theme.colors.text }}>
                        {stap.titel}
                      </h3>
                      <p className="text-sm leading-[1.7] mb-4" style={{ color: isLast ? 'rgba(255,255,255,0.6)' : theme.colors.textMuted }}>
                        {stap.beschrijving}
                      </p>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300"
                        style={{ color: isLast ? (palette.accentLight ?? accent) : accent }}>
                        Contact <span className="material-symbols-outlined text-base transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className={`text-center mt-20 ${getRevealClass('up', 3)}`}>
          <p className="text-[11px] uppercase tracking-[0.2em] font-medium" style={{ color: theme.colors.textMuted }}>
            Vertrouwd door zorginstellingen en bemiddelaars
          </p>
        </div>
      </div>
    </section>
  );
}


// ╔════════════════════════════════════════════╗
// ║          PORTFOLIO VARIANTEN               ║
// ╚════════════════════════════════════════════╝

// ============================================
// PORTFOLIO V1 — Signature Corner Cards
// Luxe cards with signature rounded corner, hover color invert
// ============================================
function PortfolioV1Cards({ theme, palette, titel, intro, stappen }: WerkwijzeVariantProps) {
  const items = stappen.slice(0, 4);
  const accent = palette.accent ?? palette.primary;
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="werkwijze" className="py-24 px-6 md:px-12" style={{ backgroundColor: theme.colors.backgroundAlt }}>
      <div className="max-w-4xl mx-auto">
        <SectionHeader theme={theme} palette={palette} titel={titel} intro={intro} variant="portfolio" />

        <div className="space-y-0">
          {items.map((stap, idx) => {
            const isHover = hovered === idx;
            return (
              <div key={idx}>
                <div className={getRevealClass('up', idx + 1)}>
                  <a
                    href="#contact"
                    className="block relative overflow-hidden border p-10 cursor-pointer transition-all duration-450"
                    style={{
                      borderRadius: '0 48px 0 0',
                      backgroundColor: isHover ? palette.primary : (theme.colors.surface ?? 'white'),
                      borderColor: isHover ? palette.primary : theme.colors.border,
                      transform: isHover ? 'translateY(-4px)' : 'none',
                      boxShadow: isHover ? `0 16px 48px ${palette.primary}15` : 'none',
                    }}
                    onMouseEnter={() => setHovered(idx)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {/* Left accent line */}
                    <div className="absolute top-0 left-0 w-[3px] transition-all duration-450"
                      style={{ height: isHover ? '100%' : '0%', backgroundColor: accent }} />

                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      <span
                        className="text-[64px] font-bold leading-none flex-shrink-0 transition-colors duration-450"
                        style={{ fontFamily: theme.fonts.heading, color: isHover ? accent : theme.colors.backgroundAlt }}
                      >
                        {padNum(idx + 1)}
                      </span>
                      <div className="flex-1 pt-2">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="material-symbols-outlined text-lg transition-colors duration-450" style={{ color: accent }}>
                            {getStapIcon(stap, idx)}
                          </span>
                          <span className="text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ color: accent }}>Stap {idx + 1}</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 transition-colors duration-450"
                          style={{ fontFamily: theme.fonts.heading, color: isHover ? (palette.accentLight ?? accent) : palette.primary }}>
                          {stap.titel}
                        </h3>
                        <div className="w-10 h-px mb-3 transition-colors duration-450"
                          style={{ backgroundColor: isHover ? `${accent}50` : theme.colors.border }} />
                        <p className="text-sm leading-relaxed transition-colors duration-450"
                          style={{ color: isHover ? 'rgba(255,255,255,0.7)' : theme.colors.textMuted }}>
                          {stap.beschrijving}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium flex-shrink-0 pt-3 transition-colors duration-450"
                        style={{ color: isHover ? accent : palette.primary }}>
                        Contact <span className="material-symbols-outlined text-base">arrow_forward</span>
                      </div>
                    </div>
                  </a>
                </div>

                {idx < items.length - 1 && (
                  <div className="w-px h-8 mx-auto relative" style={{ backgroundColor: theme.colors.border }}>
                    <span className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 text-[10px] px-1.5"
                      style={{ color: accent, backgroundColor: theme.colors.backgroundAlt }}>✦</span>
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
// PORTFOLIO V2 — Elegant Stepper
// Signature corner nodes, auto-cycle, progress bar
// ============================================
function PortfolioV2Stepper({ theme, palette, titel, intro, stappen }: WerkwijzeVariantProps) {
  const items = stappen.slice(0, 4);
  const accent = palette.accent ?? palette.primary;
  const { current, progress, goTo, pause, resume } = useStepCycle(items.length, 4500);

  return (
    <section id="werkwijze" className="py-24 px-6 md:px-12" style={{ backgroundColor: theme.colors.backgroundAlt }}>
      <div className="max-w-5xl mx-auto">
        <div className={`text-center mb-16 ${getRevealClass('up')}`}>
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="w-12 h-px" style={{ backgroundColor: accent, opacity: 0.4 }} />
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em]" style={{ color: accent }}>Werkwijze</span>
            <div className="w-12 h-px" style={{ backgroundColor: accent, opacity: 0.4 }} />
          </div>
          <h2 className="text-3xl sm:text-[44px] font-semibold leading-tight" style={{ fontFamily: theme.fonts.heading, color: palette.primary }}>
            {titel}
          </h2>
        </div>

        {/* Desktop stepper */}
        <div className="hidden md:block" onMouseEnter={pause} onMouseLeave={resume}>
          <div className={`relative px-8 mb-10 ${getRevealClass('up', 1)}`}>
            <div className="h-0.5" style={{ backgroundColor: theme.colors.border }}>
              <div className="h-full transition-[width] duration-500"
                style={{ width: `${current === 0 ? 0 : (current / 3) * 100}%`, backgroundColor: palette.primary }} />
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between">
              {items.map((_, idx) => (
                <div
                  key={idx}
                  className="w-14 h-14 border-2 flex items-center justify-center cursor-pointer transition-all duration-400 relative z-[2]"
                  style={{
                    borderRadius: '0 20px 0 0',
                    backgroundColor: idx <= current ? palette.primary : (theme.colors.surface ?? 'white'),
                    borderColor: idx <= current ? palette.primary : theme.colors.border,
                    transform: idx === current ? 'scale(1.1)' : 'scale(1)',
                    boxShadow: idx === current ? `0 0 0 6px ${palette.primary}12` : 'none',
                  }}
                  onClick={() => goTo(idx)}
                >
                  <span className="text-xl" style={{ fontFamily: theme.fonts.heading, fontWeight: 600, color: idx <= current ? accent : theme.colors.textMuted }}>
                    {padNum(idx + 1)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <StepperLabels items={items} current={current} theme={theme} palette={palette} />

          {/* Panels */}
          <div className="relative">
            {items.map((stap, idx) => {
              const isLast = isAccentStep(idx, items.length);
              return (
                <div key={idx} style={{
                  opacity: idx === current ? 1 : 0,
                  transform: idx === current ? 'translateY(0)' : 'translateY(10px)',
                  maxHeight: idx === current ? 350 : 0,
                  overflow: 'hidden',
                  position: idx === current ? 'relative' : 'absolute',
                  transition: 'all 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
                }}>
                  <a href="#contact" className="block border p-9 transition-shadow hover:shadow-lg"
                    style={{
                      borderRadius: '0 48px 0 0',
                      backgroundColor: theme.colors.surface ?? 'white',
                      borderColor: theme.colors.border,
                    }}>
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      <div className="w-14 h-14 rounded flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${accent}10` }}>
                        <span className="material-symbols-outlined text-2xl" style={{ color: accent }}>
                          {getStapIcon(stap, idx)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 text-white"
                            style={{ backgroundColor: isLast ? accent : palette.primary, borderRadius: '0 8px 0 0' }}>
                            Stap {idx + 1}
                          </span>
                          <h3 className="text-xl font-semibold" style={{ fontFamily: theme.fonts.heading, color: palette.primary }}>{stap.titel}</h3>
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: theme.colors.textMuted }}>{stap.beschrijving}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium flex-shrink-0"
                        style={{ color: isLast ? accent : palette.primary }}>
                        Contact <span className="material-symbols-outlined text-base">arrow_forward</span>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>

          <ProgressBar progress={progress} theme={theme} palette={palette} />
        </div>

        {/* Mobile */}
        <div className="md:hidden space-y-4">
          {items.map((stap, idx) => (
            <a key={idx} href="#contact" className={`block bg-white p-5 border ${getRevealClass('up', idx + 1)}`}
              style={{ borderColor: theme.colors.border, borderRadius: '0 24px 0 0' }}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl font-semibold" style={{ fontFamily: theme.fonts.heading, color: accent }}>
                  {padNum(idx + 1)}
                </span>
                <h3 className="font-semibold" style={{ fontFamily: theme.fonts.heading, color: palette.primary }}>{stap.titel}</h3>
              </div>
              <p className="text-sm" style={{ color: theme.colors.textMuted }}>{stap.beschrijving}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// PORTFOLIO V3 — Split Timeline
// Zigzag timeline with signature corner nodes
// ============================================
function PortfolioV3Timeline({ theme, palette, titel, intro, stappen }: WerkwijzeVariantProps) {
  const items = stappen.slice(0, 4);
  const accent = palette.accent ?? palette.primary;

  return (
    <section id="werkwijze" className="py-24 px-6 md:px-12" style={{ backgroundColor: theme.colors.backgroundAlt }}>
      <div className="max-w-3xl mx-auto">
        <div className={`text-center mb-20 ${getRevealClass('up')}`}>
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] mb-3 block" style={{ color: accent }}>
            ✦ &nbsp; Werkwijze &nbsp; ✦
          </span>
          <h2 className="text-3xl sm:text-5xl font-semibold" style={{ fontFamily: theme.fonts.heading, color: palette.primary }}>
            {titel}
          </h2>
          <div className="w-16 h-px mx-auto mt-6" style={{ backgroundColor: accent, opacity: 0.4 }} />
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[2px]" style={{ backgroundColor: theme.colors.border }} />

          {items.map((stap, idx) => {
            const isRight = idx % 2 !== 0;
            const isLast = isAccentStep(idx, items.length);
            return (
              <div key={idx} className={`relative mb-16 ${getRevealClass('up', idx + 1)}`}>
                {/* Node */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-8 z-10">
                  <div
                    className="w-12 h-12 flex items-center justify-center"
                    style={{
                      background: isLast ? `linear-gradient(135deg, ${palette.primary}, ${accent})` : palette.primary,
                      borderRadius: '0 16px 0 0',
                    }}
                  >
                    <span className="text-lg font-semibold" style={{ fontFamily: theme.fonts.heading, color: isLast ? 'white' : accent }}>
                      {padNum(idx + 1)}
                    </span>
                  </div>
                </div>

                {/* Card */}
                <div className={`ml-16 ${isRight ? 'md:ml-auto' : 'md:ml-0 md:mr-auto'} md:w-[calc(50%-40px)]`}>
                  <a
                    href="#contact"
                    className="block p-7 relative group transition-all duration-350 hover:-translate-y-1 hover:shadow-lg"
                    style={{
                      backgroundColor: isLast ? palette.primary : (theme.colors.surface ?? 'white'),
                      border: `1px solid ${isLast ? palette.primary : theme.colors.border}`,
                      borderRadius: '0 32px 0 0',
                    }}
                  >
                    <div className="absolute top-3 left-3 w-4 h-4"
                      style={{ borderTop: `2px solid ${accent}`, borderLeft: `2px solid ${accent}`, opacity: 0.3 }} />

                    <span className="text-[10px] font-semibold uppercase tracking-[0.12em] block mb-2"
                      style={{ color: accent }}>
                      Stap {idx + 1}
                    </span>
                    <h3 className="text-xl font-semibold mb-3"
                      style={{ fontFamily: theme.fonts.heading, color: isLast ? 'white' : palette.primary }}>
                      {stap.titel}
                    </h3>
                    <p className="text-sm leading-relaxed mb-4"
                      style={{ color: isLast ? 'rgba(255,255,255,0.65)' : theme.colors.textMuted }}>
                      {stap.beschrijving}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium"
                      style={{ color: isLast ? accent : palette.primary }}>
                      Contact <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WerkwijzeSection;