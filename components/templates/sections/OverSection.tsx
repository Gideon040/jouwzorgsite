// components/templates/sections/OverSection.tsx
// Over mij section met meerdere style varianten
// REWRITE: Proper types, dynamic data, extracted helpers, palette fallbacks

'use client';

import { ThemeConfig } from '../themes';
import {
  BaseSectionProps,
  OverStyle,
  getBeroepImages,
  getRevealClass,
  getJarenErvaring,
} from './types';
import { OverMijContent, SiteContent, GeneratedContent } from '@/types';

// ============================================
// TYPES
// ============================================

interface OverSectionProps extends BaseSectionProps {
  style?: OverStyle;
}

interface PaletteColors {
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

/** Shared props passed to every variant function */
interface VariantProps {
  theme: ThemeConfig;
  palette: PaletteColors;
  content: SiteContent;
  overMij: OverMijContent | undefined;
  jarenErvaring: number | null;
  expertises: string[];
  images: { hero: string; sfeer: string };
}

// ============================================
// MAIN ENTRY
// ============================================

export function OverSection({
  style = 'editorial',
  theme,
  palette,
  content,
  generated,
  beroepLabel,
}: OverSectionProps) {
  const images = getBeroepImages(beroepLabel);
  const overMij = generated?.overMij;
  const jarenErvaring = getJarenErvaring(content.werkervaring);
  const expertises = content.expertises ?? [];

  const props: VariantProps = {
    theme,
    palette,
    content,
    overMij,
    jarenErvaring,
    expertises,
    images,
  };

  switch (style) {
    case 'editorial':
      return <OverEditorial {...props} />;
    case 'editorial-2':
      return <OverEditorial2 {...props} />;
    case 'editorial-3':
      return <OverEditorial3 {...props} />;
    case 'proactief':
      return <OverProactief {...props} />;
    case 'proactief-2':
      return <OverProactief2 {...props} />;
    case 'proactief-3':
      return <OverProactief3 {...props} />;
    case 'portfolio':
      return <OverPortfolio {...props} />;
    case 'portfolio-2':
      return <OverPortfolio2 {...props} />;
    case 'portfolio-3':
      return <OverPortfolio3 {...props} />;
    case 'mindoor':
      return <OverMindoor {...props} />;
    case 'mindoor-2':
      return <OverMindoor2 {...props} />;
    case 'mindoor-3':
      return <OverMindoor3 {...props} />;
    case 'serene':
      return <OverSerene {...props} />;
    case 'serene-2':
      return <OverSerene2 {...props} />;
    case 'serene-3':
      return <OverSerene3 {...props} />;
    default:
      return <OverEditorial {...props} />;
  }
}

// ============================================
// DATA HELPERS
// ============================================

/**
 * Build paragraphs from generated overMij content.
 * Priority: body → intro → fallback over_mij from content.
 * Splits on double newlines to produce multiple paragraphs.
 */
function getParagraphs(overMij: OverMijContent | undefined, content: SiteContent): string[] {
  const text = overMij?.body ?? overMij?.intro ?? content.over_mij ?? '';
  return text.split('\n\n').filter((p) => p.trim());
}

/** Get the personal quote from generated content */
function getQuote(overMij: OverMijContent | undefined): string {
  return overMij?.persoonlijk ?? 'Goede zorg begint bij echt luisteren naar wat iemand nodig heeft.';
}

/** Get generated section title with fallback */
function getTitel(overMij: OverMijContent | undefined, fallback: string): string {
  return overMij?.titel ?? fallback;
}

/** Split a title so the last N words become the italic accent */
function splitTitleAccent(titel: string, accentWordCount = 1): { rest: string; accent: string } {
  const words = titel.split(' ');
  const accent = words.slice(-accentWordCount).join(' ');
  const rest = words.slice(0, -accentWordCount).join(' ');
  return { rest, accent };
}

/** Split full name into voornaam + achternaam */
function getNaamParts(naam: string): { voornaam: string; achternaam: string } {
  const parts = naam.split(' ');
  return { voornaam: parts[0], achternaam: parts.slice(1).join(' ') };
}

/** Palette-safe accent color */
function accent(palette: PaletteColors): string {
  return palette.accent ?? palette.primary;
}

/** Palette-safe accentLight color */
function accentLight(palette: PaletteColors): string {
  return palette.accentLight ?? palette.primaryLight;
}

// ============================================
// SHARED SUB-COMPONENTS
// ============================================

/** Duotone image filter style */
const DUOTONE_STYLE: React.CSSProperties = {
  filter: 'grayscale(100%) sepia(25%) brightness(0.7) contrast(1.05)',
};

/** Section label with optional divider line */
function SectionLabel({
  label = 'Over mij',
  color,
  lineColor,
  align = 'left',
  size = 'editorial',
}: {
  label?: string;
  color: string;
  lineColor?: string;
  align?: 'left' | 'center';
  size?: 'editorial' | 'serene' | 'proactief' | 'mindoor';
}) {
  const sizeClasses = {
    editorial: 'text-xs font-semibold uppercase tracking-[0.2em]',
    serene: 'text-[9px] font-medium uppercase tracking-[2px]',
    proactief: 'text-xs font-semibold uppercase tracking-[0.15em]',
    mindoor: 'text-sm font-medium',
  };

  if (align === 'center') {
    return (
      <div className="flex items-center justify-center gap-3 mb-4">
        {lineColor && <div className="w-8 h-px" style={{ backgroundColor: lineColor }} />}
        <span className={sizeClasses[size]} style={{ color }}>{label}</span>
        {lineColor && <div className="w-8 h-px" style={{ backgroundColor: lineColor }} />}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {size === 'proactief' || size === 'serene' ? (
        <div className="w-8 h-px" style={{ backgroundColor: color }} />
      ) : null}
      <span
        className={sizeClasses[size]}
        style={{ color, ...(size === 'editorial' ? { fontVariant: 'small-caps' } : {}) }}
      >
        {label}
      </span>
      <div className="flex-1 h-px" style={{ backgroundColor: lineColor ?? 'transparent' }} />
    </div>
  );
}

/** Quote block with large opening quote mark */
function QuoteBlock({
  quote,
  naam,
  headingFont,
  primaryColor,
  textColor,
  size = 'lg',
}: {
  quote: string;
  naam: string;
  headingFont: string;
  primaryColor: string;
  textColor: string;
  size?: 'lg' | 'md';
}) {
  const quoteSize = size === 'lg' ? 'text-6xl lg:text-7xl' : 'text-5xl';
  const textSize = size === 'lg' ? 'text-2xl lg:text-3xl' : 'text-xl lg:text-2xl';
  const mtOffset = size === 'lg' ? '-mt-6' : '-mt-4';

  return (
    <div>
      <span
        className={`${quoteSize} leading-none block mb-2`}
        style={{ fontFamily: headingFont, color: `${primaryColor}30` }}
      >
        &ldquo;
      </span>
      <p
        className={`${textSize} italic leading-snug mb-6 ${mtOffset}`}
        style={{ fontFamily: headingFont, color: textColor }}
      >
        {quote}
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-px" style={{ backgroundColor: primaryColor }} />
        <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: primaryColor }}>
          {naam}
        </span>
      </div>
    </div>
  );
}

/** Circular photo with optional accent ring */
function RoundPhoto({
  src,
  alt,
  ringColor,
  duotone = false,
  size = 'lg',
}: {
  src: string;
  alt: string;
  ringColor?: string;
  duotone?: boolean;
  size?: 'lg' | 'md';
}) {
  const sizeClass = size === 'lg' ? 'w-48 h-48 lg:w-56 lg:h-56' : 'w-40 h-40 lg:w-48 lg:h-48';
  const ringInset = size === 'lg' ? '-inset-2' : '-inset-3';

  return (
    <div className="relative">
      <div className={`${sizeClass} rounded-full overflow-hidden`}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          style={duotone ? DUOTONE_STYLE : undefined}
        />
      </div>
      {ringColor && (
        <div
          className={`absolute ${ringInset} rounded-full border-2 opacity-30`}
          style={{ borderColor: ringColor }}
        />
      )}
    </div>
  );
}

/** Two-column paragraph layout */
function TwoColumnText({
  paragraphs,
  textColor,
}: {
  paragraphs: string[];
  textColor: string;
}) {
  const midPoint = Math.ceil(paragraphs.length / 2);
  const left = paragraphs.slice(0, midPoint);
  const right = paragraphs.slice(midPoint);

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      <div className="flex flex-col gap-4 leading-[1.8]" style={{ color: textColor }}>
        {left.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <div className="flex flex-col gap-4 leading-[1.8]" style={{ color: textColor }}>
        {right.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  );
}

/** Expertise / tag pills */
function ExpertiseTags({
  expertises,
  borderColor,
  textColor,
  variant = 'bordered',
  bgColor,
  pillTextColor,
}: {
  expertises: string[];
  borderColor: string;
  textColor: string;
  variant?: 'bordered' | 'filled';
  bgColor?: string;
  pillTextColor?: string;
}) {
  if (!expertises.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {expertises.map((expertise, idx) => (
        <span
          key={idx}
          className="px-3 py-1.5 text-sm"
          style={
            variant === 'filled'
              ? { backgroundColor: bgColor, color: pillTextColor }
              : { border: `1px solid ${borderColor}`, color: textColor }
          }
        >
          {expertise}
        </span>
      ))}
    </div>
  );
}

/** Italic signature name */
function Signature({
  naam,
  headingFont,
  primaryColor,
  accentColor,
  borderColor,
  showBorder = true,
  size = 'lg',
}: {
  naam: string;
  headingFont: string;
  primaryColor: string;
  accentColor?: string;
  borderColor?: string;
  showBorder?: boolean;
  size?: 'lg' | 'md';
}) {
  const { voornaam, achternaam } = getNaamParts(naam);
  const textSize = size === 'lg' ? 'text-2xl lg:text-3xl' : 'text-2xl';

  return (
    <div
      className={showBorder ? 'pt-6' : ''}
      style={showBorder && borderColor ? { borderTop: `1px solid ${borderColor}` } : undefined}
    >
      <p className={`${textSize} italic`} style={{ fontFamily: headingFont, color: primaryColor }}>
        {accentColor && achternaam ? (
          <>
            {voornaam} <em style={{ color: accentColor }}>{achternaam}</em>
          </>
        ) : (
          naam
        )}
      </p>
    </div>
  );
}

// ============================================
// EDITORIAL 1: Quote Lead
// ============================================
export function OverEditorial({ theme, palette, content, overMij, jarenErvaring, expertises, images }: VariantProps) {
  const paragraphs = getParagraphs(overMij, content);
  const quote = getQuote(overMij);
  const titel = getTitel(overMij, 'Over mij');

  return (
    <section
      id="over"
      className="px-6 md:px-12 lg:px-20 py-20 lg:py-28"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Top: Quote + Photo */}
        <div className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 mb-16 ${getRevealClass('up')}`}>
          <div className="flex-1">
            <QuoteBlock
              quote={quote}
              naam={content.naam}
              headingFont={theme.fonts.heading}
              primaryColor={palette.primary}
              textColor={theme.colors.text}
            />
          </div>
          <div className="shrink-0">
            <RoundPhoto
              src={content.foto ?? images.sfeer}
              alt={`Over ${content.naam}`}
              ringColor={palette.primary}
              duotone
            />
          </div>
        </div>

        {/* Divider + Label */}
        <div className={`mb-10 ${getRevealClass('left')}`}>
          <SectionLabel
            color={palette.primary}
            lineColor={theme.colors.border}
            size="editorial"
          />
        </div>

        {/* Title */}
        <h2
          className={`text-3xl md:text-4xl mb-10 ${getRevealClass('up', 100)}`}
          style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
        >
          {jarenErvaring ? (
            <>
              {titel} — <em className="italic" style={{ color: palette.primary }}>{jarenErvaring} jaar</em> ervaring
            </>
          ) : (
            <>
              Mijn <em className="italic" style={{ color: palette.primary }}>verhaal</em>
            </>
          )}
        </h2>

        {/* Two-column text */}
        <div className={`mb-10 ${getRevealClass('up', 150)}`}>
          <TwoColumnText paragraphs={paragraphs} textColor={theme.colors.textMuted} />
        </div>

        {/* Tags */}
        <div className={getRevealClass('up', 200)}>
          <ExpertiseTags
            expertises={expertises}
            borderColor={theme.colors.border}
            textColor={theme.colors.textMuted}
          />
        </div>
      </div>
    </section>
  );
}

// ============================================
// EDITORIAL 2: Visual Margin
// ============================================
function OverEditorial2({ theme, palette, content, overMij, jarenErvaring, expertises, images }: VariantProps) {
  const paragraphs = getParagraphs(overMij, content);
  const quote = getQuote(overMij);
  const titel = getTitel(overMij, 'Persoonlijke zorg op maat');

  return (
    <section
      id="over"
      className="px-6 md:px-12 lg:px-20 py-20 lg:py-28"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left: Visual Margin (foto + quote) */}
          <div className={`lg:col-span-4 ${getRevealClass('left')}`}>
            <div className="relative mb-8">
              <img
                src={content.foto ?? images.sfeer}
                alt={`Over ${content.naam}`}
                className="w-full aspect-[3/4] object-cover"
                style={DUOTONE_STYLE}
              />
              <div
                className="absolute bottom-0 left-0 w-full h-1"
                style={{ backgroundColor: palette.primary }}
              />
            </div>
            <div className="border-l-2 pl-5" style={{ borderColor: palette.primary }}>
              <p
                className="text-lg italic leading-relaxed mb-4"
                style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
              >
                &ldquo;{quote}&rdquo;
              </p>
              <p className="text-sm font-medium" style={{ color: palette.primary }}>
                — {content.naam.split(' ')[0]}
              </p>
            </div>
          </div>

          {/* Right: Content */}
          <div className={`lg:col-span-8 ${getRevealClass('right')}`}>
            <div className="mb-6">
              <SectionLabel color={palette.primary} lineColor={theme.colors.border} size="editorial" />
            </div>

            <h2
              className="text-3xl md:text-4xl mb-8"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {(() => {
                const { rest, accent: acc } = splitTitleAccent(titel);
                return (
                  <>
                    {rest} <em className="italic" style={{ color: palette.primary }}>{acc}</em>
                  </>
                );
              })()}
            </h2>

            <div className="mb-10">
              <TwoColumnText paragraphs={paragraphs} textColor={theme.colors.textMuted} />
            </div>

            <div
              className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pt-8 border-t"
              style={{ borderColor: theme.colors.border }}
            >
              <ExpertiseTags
                expertises={expertises}
                borderColor={theme.colors.border}
                textColor={theme.colors.textMuted}
              />
              <p
                className="text-2xl italic shrink-0"
                style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
              >
                {content.naam}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// EDITORIAL 3: Compact Header
// ============================================
function OverEditorial3({ theme, palette, content, overMij, jarenErvaring, expertises, images }: VariantProps) {
  const paragraphs = getParagraphs(overMij, content);
  const quote = getQuote(overMij);
  const titel = getTitel(overMij, 'Met passie voor persoonlijke zorg');

  return (
    <section
      id="over"
      className="px-6 md:px-12 lg:px-20 py-20 lg:py-28"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-5xl mx-auto">
        <div className={`mb-10 ${getRevealClass('up')}`}>
          <SectionLabel color={palette.primary} lineColor={theme.colors.border} size="editorial" />
        </div>

        {/* Header block: Photo + Quote */}
        <div className={`flex flex-col md:flex-row gap-8 lg:gap-12 mb-12 ${getRevealClass('up', 100)}`}>
          <div className="shrink-0">
            <div className="relative w-40 h-40 lg:w-48 lg:h-48 overflow-hidden">
              <img
                src={content.foto ?? images.sfeer}
                alt={`Over ${content.naam}`}
                className="w-full h-full object-cover"
                style={DUOTONE_STYLE}
              />
              <div
                className="absolute bottom-0 right-0 w-8 h-8 opacity-80"
                style={{ backgroundColor: palette.primary }}
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <QuoteBlock
              quote={quote}
              naam={content.naam.split(' ')[0]}
              headingFont={theme.fonts.heading}
              primaryColor={palette.primary}
              textColor={theme.colors.text}
              size="md"
            />
          </div>
        </div>

        {/* Dynamic title using jaren ervaring */}
        <h2
          className={`text-3xl md:text-4xl lg:text-5xl mb-10 ${getRevealClass('up', 150)}`}
          style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
        >
          {jarenErvaring ? (
            <>
              Al {jarenErvaring} jaar met{' '}
              <em className="italic" style={{ color: palette.primary }}>toewijding</em> in de zorg
            </>
          ) : (
            <>
              {(() => {
                const { rest, accent: acc } = splitTitleAccent(titel);
                return (
                  <>
                    {rest} <em className="italic" style={{ color: palette.primary }}>{acc}</em>
                  </>
                );
              })()}
            </>
          )}
        </h2>

        <div className={`mb-12 ${getRevealClass('up', 200)}`}>
          <TwoColumnText paragraphs={paragraphs} textColor={theme.colors.textMuted} />
        </div>

        <div
          className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 pt-8 border-t ${getRevealClass('up', 250)}`}
          style={{ borderColor: theme.colors.border }}
        >
          <ExpertiseTags
            expertises={expertises}
            borderColor={theme.colors.border}
            textColor={theme.colors.textMuted}
          />
          <p
            className="text-2xl italic shrink-0"
            style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
          >
            {content.naam}
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================
// PROACTIEF 1: Split Numbered
// ============================================
export function OverProactief({ theme, palette, content, overMij, jarenErvaring, expertises, images }: VariantProps) {
  const paragraphs = getParagraphs(overMij, content);
  const titel = getTitel(overMij, 'Over mij');

  const blocks = [
    { num: '01', title: 'Mijn achtergrond', text: paragraphs[0] },
    { num: '02', title: 'Wat mij drijft', text: paragraphs[1] },
    { num: '03', title: 'Mijn aanpak', text: paragraphs[2] },
  ].filter((b) => b.text);

  return (
    <section id="over" className="py-24 px-6 md:px-12" style={{ backgroundColor: theme.colors.backgroundAlt }}>
      <div className="max-w-6xl mx-auto">
        <div className={`mb-10 ${getRevealClass('up')}`}>
          <SectionLabel color={palette.primary} size="proactief" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Photo */}
          <div className={getRevealClass('left')}>
            <img
              src={content.foto ?? images.sfeer}
              alt={`Over ${content.naam}`}
              className="w-full aspect-[4/5] object-cover"
            />
          </div>

          {/* Right: Numbered sections */}
          <div className={getRevealClass('right')}>
            <h2
              className="text-3xl lg:text-4xl font-bold mb-8"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {content.naam}
            </h2>

            <div className="space-y-0 mb-8">
              {blocks.map((block, idx) => (
                <div
                  key={idx}
                  className="p-6 border-l-4 transition-all cursor-pointer group"
                  style={{
                    borderColor: idx === 0 ? palette.primary : 'transparent',
                    backgroundColor: idx === 0 ? palette.primaryLight : theme.colors.background,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = palette.primary;
                    e.currentTarget.style.backgroundColor = palette.primary;
                    e.currentTarget.querySelectorAll('.block-num').forEach((el) => ((el as HTMLElement).style.color = 'rgba(255,255,255,0.3)'));
                    e.currentTarget.querySelectorAll('.block-title').forEach((el) => ((el as HTMLElement).style.color = 'white'));
                    e.currentTarget.querySelectorAll('.block-text').forEach((el) => ((el as HTMLElement).style.color = 'rgba(255,255,255,0.9)'));
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = idx === 0 ? palette.primary : 'transparent';
                    e.currentTarget.style.backgroundColor = idx === 0 ? palette.primaryLight : theme.colors.background;
                    e.currentTarget.querySelectorAll('.block-num').forEach((el) => ((el as HTMLElement).style.color = palette.primary));
                    e.currentTarget.querySelectorAll('.block-title').forEach((el) => ((el as HTMLElement).style.color = theme.colors.text));
                    e.currentTarget.querySelectorAll('.block-text').forEach((el) => ((el as HTMLElement).style.color = theme.colors.textMuted));
                  }}
                >
                  <div className="flex gap-4">
                    <span className="block-num text-3xl font-bold transition-colors" style={{ color: palette.primary }}>
                      {block.num}
                    </span>
                    <div>
                      <h3 className="block-title font-bold mb-2 transition-colors" style={{ color: theme.colors.text }}>
                        {block.title}
                      </h3>
                      <p className="block-text text-[15px] leading-[1.8] transition-colors" style={{ color: theme.colors.textMuted }}>
                        {block.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t"
              style={{ borderColor: theme.colors.border }}
            >
              <ExpertiseTags
                expertises={expertises.slice(0, 3)}
                borderColor={theme.colors.border}
                textColor={palette.primary}
                variant="filled"
                bgColor={palette.primaryLight}
                pillTextColor={palette.primary}
              />
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white transition-colors"
                style={{ backgroundColor: palette.primary }}
              >
                Contact
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// PROACTIEF 2: Split Sticky
// ============================================
export function OverProactief2({ theme, palette, content, overMij, jarenErvaring, expertises, images }: VariantProps) {
  const paragraphs = getParagraphs(overMij, content);
  const quote = getQuote(overMij);
  const titel = getTitel(overMij, 'Mijn benadering van zorg');

  return (
    <section id="over" className="py-24 px-6 md:px-12" style={{ backgroundColor: theme.colors.background }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Sticky photo + quote */}
          <div className={`lg:col-span-5 ${getRevealClass('left')}`}>
            <div className="lg:sticky lg:top-24">
              <div className="mb-6">
                <img
                  src={content.foto ?? images.sfeer}
                  alt={`Over ${content.naam}`}
                  className="w-full aspect-[4/5] object-cover"
                />
              </div>
              <div className="border-l-4 pl-5" style={{ borderColor: accent(palette) }}>
                <p className="italic mb-2" style={{ color: theme.colors.text }}>
                  &ldquo;{quote}&rdquo;
                </p>
                <p className="text-sm font-medium" style={{ color: palette.primary }}>
                  — {content.naam.split(' ')[0]}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className={`lg:col-span-7 ${getRevealClass('right')}`}>
            <div className="mb-4">
              <SectionLabel color={palette.primary} size="proactief" />
            </div>

            <h2
              className="text-3xl lg:text-4xl font-bold mb-6"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {titel}
            </h2>

            <div className="space-y-4 mb-8">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-[15px] leading-[1.8]" style={{ color: theme.colors.textMuted }}>
                  {p}
                </p>
              ))}
            </div>

            <div className="mb-8">
              <ExpertiseTags
                expertises={expertises}
                borderColor={theme.colors.border}
                textColor={palette.primary}
                variant="filled"
                bgColor={palette.primaryLight}
                pillTextColor={palette.primary}
              />
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-colors"
              style={{ backgroundColor: palette.primary }}
            >
              Neem contact op
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// PROACTIEF 3: Grid Numbered
// ============================================
export function OverProactief3({ theme, palette, content, overMij, jarenErvaring, expertises, images }: VariantProps) {
  const paragraphs = getParagraphs(overMij, content);
  const quote = getQuote(overMij);

  // Hover helpers for grid cells
  const cellEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.backgroundColor = palette.primary;
    el.querySelectorAll('.cell-num').forEach((n) => ((n as HTMLElement).style.color = 'rgba(255,255,255,0.3)'));
    el.querySelectorAll('.cell-title').forEach((n) => ((n as HTMLElement).style.color = 'white'));
    el.querySelectorAll('.cell-text').forEach((n) => ((n as HTMLElement).style.color = 'rgba(255,255,255,0.9)'));
  };
  const cellLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.backgroundColor = theme.colors.background;
    el.querySelectorAll('.cell-num').forEach((n) => ((n as HTMLElement).style.color = palette.primary));
    el.querySelectorAll('.cell-title').forEach((n) => ((n as HTMLElement).style.color = theme.colors.text));
    el.querySelectorAll('.cell-text').forEach((n) => ((n as HTMLElement).style.color = theme.colors.textMuted));
  };

  return (
    <section id="over" className="py-24 px-6 md:px-12" style={{ backgroundColor: theme.colors.backgroundAlt }}>
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-12 ${getRevealClass('up')}`}>
          <SectionLabel color={palette.primary} lineColor={palette.primary} align="center" size="proactief" />
          <h2
            className="text-3xl lg:text-4xl font-bold"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            {content.naam}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-px" style={{ backgroundColor: theme.colors.border }}>
          {/* Cell 1: Photo */}
          <div className={`row-span-2 ${getRevealClass('left')}`} style={{ backgroundColor: theme.colors.background }}>
            <img
              src={content.foto ?? images.sfeer}
              alt={`Over ${content.naam}`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Cell 2: Intro */}
          <div
            className={`p-8 lg:p-10 cursor-pointer transition-colors ${getRevealClass('right')}`}
            style={{ backgroundColor: theme.colors.background }}
            onMouseEnter={cellEnter}
            onMouseLeave={cellLeave}
          >
            <span className="cell-num text-5xl font-bold block mb-4 transition-colors" style={{ color: palette.primary }}>01</span>
            <h3 className="cell-title text-lg font-bold mb-3 transition-colors" style={{ color: theme.colors.text }}>Mijn achtergrond</h3>
            <p className="cell-text text-[15px] leading-[1.8] transition-colors" style={{ color: theme.colors.textMuted }}>
              {paragraphs[0] ?? overMij?.intro ?? 'Met jarenlange ervaring in de zorg heb ik gewerkt in uiteenlopende settings.'}
            </p>
          </div>

          {/* Cell 3: Motivatie */}
          <div
            className={`p-8 lg:p-10 cursor-pointer transition-colors ${getRevealClass('right', 100)}`}
            style={{ backgroundColor: theme.colors.background }}
            onMouseEnter={cellEnter}
            onMouseLeave={cellLeave}
          >
            <span className="cell-num text-5xl font-bold block mb-4 transition-colors" style={{ color: palette.primary }}>02</span>
            <h3 className="cell-title text-lg font-bold mb-3 transition-colors" style={{ color: theme.colors.text }}>Wat mij drijft</h3>
            <p className="cell-text text-[15px] leading-[1.8] transition-colors" style={{ color: theme.colors.textMuted }}>
              {paragraphs[1] ?? overMij?.body ?? 'Het maken van een verschil in het leven van mensen.'}
            </p>
          </div>

          {/* Cell 4: Quote */}
          <div
            className={`p-8 lg:p-10 ${getRevealClass('up', 150)}`}
            style={{ background: `linear-gradient(135deg, ${palette.primary}, ${palette.primaryDark})` }}
          >
            <span className="text-5xl font-bold block mb-4" style={{ color: 'rgba(255,255,255,0.2)' }}>&ldquo;</span>
            <p className="text-lg italic text-white mb-4">{quote}</p>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>— {content.naam.split(' ')[0]}</p>
          </div>

          {/* Cell 5: Expertises + CTA */}
          <div className={`p-8 lg:p-10 ${getRevealClass('up', 200)}`} style={{ backgroundColor: theme.colors.background }}>
            <span className="text-xs font-semibold uppercase tracking-wider block mb-4" style={{ color: palette.primary }}>
              Expertises
            </span>
            <div className="mb-6">
              <ExpertiseTags
                expertises={expertises}
                borderColor={theme.colors.border}
                textColor={palette.primary}
                variant="filled"
                bgColor={palette.primaryLight}
                pillTextColor={palette.primary}
              />
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
              style={{ color: palette.primary }}
            >
              Neem contact op
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// PORTFOLIO 1: Classic Split
// ============================================
export function OverPortfolio({ theme, palette, content, overMij, jarenErvaring, expertises, images }: VariantProps) {
  const paragraphs = getParagraphs(overMij, content);
  const titel = getTitel(overMij, 'Met passie voor persoonlijke zorg');
  const { rest: titelRest, accent: titelAccent } = splitTitleAccent(titel);

  return (
    <section id="over" className="py-24 lg:py-32 px-6 md:px-12" style={{ backgroundColor: palette.bg ?? '#ffffff' }}>
      <div className="max-w-[1100px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Photo with organic corner */}
          <div className={`relative ${getRevealClass('left')}`}>
            <div
              className="absolute -top-3 -left-3 w-24 h-24 border-2 opacity-20"
              style={{ borderColor: accent(palette) }}
            />
            <img
              src={content.foto ?? images.sfeer}
              alt={`Over ${content.naam}`}
              className="w-full h-[450px] lg:h-[480px] object-cover"
              style={{ borderRadius: '0 80px 0 0' }}
            />
          </div>

          {/* Content */}
          <div className={getRevealClass('right')}>
            <span
              className="text-[12px] font-semibold uppercase tracking-[0.2em] mb-4 block"
              style={{ color: accent(palette) }}
            >
              Over mij
            </span>

            <h2
              className="text-3xl lg:text-[40px] leading-[1.2] mb-6"
              style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
            >
              {titelRest}{' '}
              <em className="italic" style={{ color: accent(palette) }}>{titelAccent}</em>
            </h2>

            <div className="space-y-4 mb-8">
              {paragraphs.map((p, idx) => (
                <p key={idx} className="leading-[1.8]" style={{ color: theme.colors.textMuted }}>
                  {p}
                </p>
              ))}
            </div>

            <Signature
              naam={content.naam}
              headingFont={theme.fonts.heading}
              primaryColor={palette.primary}
              borderColor={theme.colors.border}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// PORTFOLIO 2: Quote Focus
// ============================================
export function OverPortfolio2({ theme, palette, content, overMij, jarenErvaring, expertises, images }: VariantProps) {
  const paragraphs = getParagraphs(overMij, content);
  const quote = getQuote(overMij);

  return (
    <section id="over" className="py-24 lg:py-32 px-6 md:px-12" style={{ backgroundColor: theme.colors.backgroundAlt }}>
      <div className="max-w-[900px] mx-auto">
        {/* Top: Quote + Photo */}
        <div className={`flex flex-col md:flex-row items-center gap-10 lg:gap-16 mb-12 ${getRevealClass('up')}`}>
          <div className="flex-1">
            <QuoteBlock
              quote={quote}
              naam={content.naam}
              headingFont={theme.fonts.heading}
              primaryColor={palette.primary}
              textColor={theme.colors.text}
            />
          </div>
          <div className="shrink-0">
            <RoundPhoto
              src={content.foto ?? images.sfeer}
              alt={`Over ${content.naam}`}
              ringColor={accent(palette)}
            />
          </div>
        </div>

        {/* Divider */}
        <div className={`flex items-center gap-4 mb-8 ${getRevealClass('left', 100)}`}>
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: accent(palette) }}
          >
            Mijn verhaal
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: theme.colors.border }} />
        </div>

        {/* Two-column text */}
        <div className={getRevealClass('up', 150)}>
          <TwoColumnText paragraphs={paragraphs} textColor={theme.colors.textMuted} />
        </div>
      </div>
    </section>
  );
}

// ============================================
// PORTFOLIO 3: Typography First
// ============================================
export function OverPortfolio3({ theme, palette, content, overMij, jarenErvaring, expertises, images }: VariantProps) {
  const paragraphs = getParagraphs(overMij, content);
  const titel = getTitel(overMij, 'Zorg is voor mij geen werk, het is wie ik ben.');

  return (
    <section id="over" className="py-24 lg:py-32 px-6 md:px-12" style={{ backgroundColor: palette.bg ?? '#ffffff' }}>
      <div className="max-w-[1000px] mx-auto">
        <div className={`flex items-center gap-4 mb-6 ${getRevealClass('up')}`}>
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: accent(palette) }}>
            Over mij
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: theme.colors.border }} />
        </div>

        {/* Large statement title */}
        <h2
          className={`text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mb-10 ${getRevealClass('up', 50)}`}
          style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
        >
          {(() => {
            const { rest, accent: acc } = splitTitleAccent(titel, 2);
            return (
              <>
                {rest}{' '}
                <em className="italic" style={{ color: accent(palette) }}>{acc}</em>
              </>
            );
          })()}
        </h2>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Text */}
          <div className={`lg:col-span-7 space-y-5 ${getRevealClass('up', 100)}`}>
            {paragraphs.length > 0 && (
              <p className="text-lg leading-[1.8]" style={{ color: theme.colors.textMuted }}>
                {paragraphs[0]}
              </p>
            )}
            {paragraphs.slice(1).map((p, idx) => (
              <p key={idx} className="leading-[1.8]" style={{ color: theme.colors.textMuted }}>
                {p}
              </p>
            ))}
            <Signature
              naam={content.naam}
              headingFont={theme.fonts.heading}
              primaryColor={palette.primary}
              showBorder={false}
            />
          </div>

          {/* Small accent photo */}
          <div className={`lg:col-span-5 ${getRevealClass('right', 150)}`}>
            <img
              src={content.foto ?? images.sfeer}
              alt={`Over ${content.naam}`}
              className="w-full h-64 lg:h-80 object-cover"
              style={{ borderRadius: '0 0 0 60px' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// MINDOOR 1: Warm Split
// ============================================
export function OverMindoor({ theme, palette, content, overMij, jarenErvaring, expertises, images }: VariantProps) {
  const paragraphs = getParagraphs(overMij, content);
  const titel = getTitel(overMij, 'Zorg met warmte en aandacht');
  const { rest: titelRest, accent: titelAccent } = splitTitleAccent(titel);

  return (
    <section
      id="over"
      className="relative py-24 lg:py-32 px-6 md:px-12 overflow-hidden"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      {/* Decorative circles */}
      <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full" style={{ background: palette.primary, opacity: 0.07 }} />
      <div className="absolute bottom-16 -left-12 w-40 h-40 rounded-full" style={{ background: accent(palette), opacity: 0.07 }} />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Photo with rotated bg shape */}
          <div className={`relative ${getRevealClass('left')}`}>
            <div
              className="absolute inset-0 rounded-[3rem] transform rotate-3"
              style={{ background: `linear-gradient(to bottom right, ${theme.colors.border}, ${palette.primary}15)` }}
            />
            <div className="relative rounded-[2.5rem] overflow-hidden">
              <img
                src={content.foto ?? images.sfeer}
                alt={`Over ${content.naam}`}
                className="w-full aspect-[4/5] object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className={getRevealClass('right')}>
            <span className="text-sm font-medium mb-4 block" style={{ color: accent(palette) }}>
              Over mij
            </span>

            <h2
              className="text-3xl sm:text-4xl lg:text-[42px] leading-[1.2] mb-6"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {titelRest}{' '}
              <em className="italic" style={{ color: accent(palette) }}>{titelAccent}</em>
            </h2>

            <div className="space-y-4 mb-8">
              {paragraphs.map((p, idx) => (
                <p key={idx} className="leading-[1.8]" style={{ color: theme.colors.textMuted }}>
                  {p}
                </p>
              ))}
            </div>

            <Signature
              naam={content.naam}
              headingFont={theme.fonts.heading}
              primaryColor={palette.primary}
              accentColor={accent(palette)}
              borderColor={theme.colors.border}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// MINDOOR 2: Quote Overlay
// ============================================
export function OverMindoor2({ theme, palette, content, overMij, jarenErvaring, expertises, images }: VariantProps) {
  const paragraphs = getParagraphs(overMij, content);
  const quote = getQuote(overMij);
  const { voornaam } = getNaamParts(content.naam || 'Zorgprofessional');
  const titel = getTitel(overMij, 'Persoonlijke zorg, op maat');
  const { rest: titelRest, accent: titelAccent } = splitTitleAccent(titel, 2);

  return (
    <section
      id="over"
      className="py-24 lg:py-32 px-6 md:px-12 relative overflow-hidden"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="absolute -top-20 -left-20 w-56 h-56 rounded-full" style={{ background: palette.primary, opacity: 0.06 }} />
      <div className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full" style={{ background: accent(palette), opacity: 0.07 }} />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Photo with offset bg + floating quote card */}
          <div className={`relative ${getRevealClass('left')}`}>
            <div className="rounded-3xl overflow-hidden">
              <img
                src={content.foto ?? images.sfeer}
                alt={`Over ${content.naam}`}
                className="w-full aspect-[4/5] object-cover"
              />
            </div>
            <div
              className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-3xl"
              style={{ background: `${palette.primary}15` }}
            />
            {/* Floating quote card */}
            <div
              className="absolute -bottom-8 -left-4 lg:-left-8 max-w-[280px] p-6 rounded-2xl"
              style={{ background: palette.primary }}
            >
              <svg className="w-7 h-7 mb-2 opacity-30 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
              </svg>
              <p
                className="text-base text-white/90 leading-relaxed italic"
                style={{ fontFamily: theme.fonts.heading }}
              >
                {quote}
              </p>
              <p
                className="mt-3 text-sm font-medium"
                style={{ color: accentLight(palette) }}
              >
                — {voornaam}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className={getRevealClass('right')}>
            <span className="text-sm font-medium mb-4 block" style={{ color: accent(palette) }}>
              Over mij
            </span>

            <h2
              className="text-3xl sm:text-4xl lg:text-[42px] leading-[1.2] mb-6"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {titelRest}{' '}
              <em className="italic" style={{ color: accent(palette) }}>{titelAccent}</em>
            </h2>

            <div className="space-y-4 mb-8">
              {paragraphs.map((p, idx) => (
                <p key={idx} className="leading-[1.8]" style={{ color: theme.colors.textMuted }}>
                  {p}
                </p>
              ))}
            </div>

            <Signature
              naam={content.naam}
              headingFont={theme.fonts.heading}
              primaryColor={palette.primary}
              accentColor={accent(palette)}
              borderColor={theme.colors.border}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// MINDOOR 3: Centered Statement
// ============================================
export function OverMindoor3({ theme, palette, content, overMij, jarenErvaring, expertises, images }: VariantProps) {
  const paragraphs = getParagraphs(overMij, content);
  const quote = getQuote(overMij);
  const titel = getTitel(overMij, 'Met hart en ziel in de zorg');
  const { rest: titelRest, accent: titelAccent } = splitTitleAccent(titel);

  return (
    <section
      id="over"
      className="py-24 lg:py-32 px-6 md:px-12 relative overflow-hidden"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="absolute -top-12 -right-20 w-48 h-48 rounded-full" style={{ background: palette.primary, opacity: 0.06 }} />
      <div className="absolute bottom-20 -left-10 w-32 h-32 rounded-full" style={{ background: accent(palette), opacity: 0.07 }} />

      <div className="relative max-w-5xl mx-auto">
        {/* Centered header */}
        <div className={`text-center mb-12 lg:mb-16 ${getRevealClass('up')}`}>
          <span className="text-sm font-medium mb-4 block" style={{ color: accent(palette) }}>
            Over mij
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl leading-[1.2]"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            {titelRest}{' '}
            <em className="italic" style={{ color: accent(palette) }}>{titelAccent}</em>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Text */}
          <div className={`lg:col-span-5 lg:pt-4 ${getRevealClass('up', 50)}`}>
            <div className="space-y-4 mb-8">
              {paragraphs.map((p, idx) => (
                <p key={idx} className="leading-[1.85]" style={{ color: theme.colors.textMuted }}>
                  {p}
                </p>
              ))}
            </div>
            <Signature
              naam={content.naam}
              headingFont={theme.fonts.heading}
              primaryColor={palette.primary}
              accentColor={accent(palette)}
              borderColor={theme.colors.border}
            />
          </div>

          {/* Photo with floating card */}
          <div className={`lg:col-span-7 relative ${getRevealClass('up', 100)}`}>
            <div className="rounded-3xl overflow-hidden">
              <img
                src={content.foto ?? images.sfeer}
                alt={`Over ${content.naam}`}
                className="w-full aspect-[3/4] object-cover"
              />
            </div>
            <div
              className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-3xl"
              style={{ background: `${palette.primary}15` }}
            />
            {/* Floating quote card */}
            <div
              className="absolute -bottom-6 -left-6 max-w-[260px] p-5 rounded-2xl bg-white border"
              style={{ borderColor: theme.colors.border }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${palette.primary}15` }}
                >
                  <span className="material-symbols-outlined text-xl" style={{ color: palette.primary }}>
                    format_quote
                  </span>
                </div>
                <div>
                  <p
                    className="text-sm italic leading-relaxed"
                    style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                  >
                    &ldquo;{quote}&rdquo;
                  </p>
                  <p className="text-xs mt-2" style={{ color: theme.colors.textMuted }}>
                    — {content.naam}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// SERENE 1: Quote Lead
// ============================================
export function OverSerene({ theme, palette, content, overMij, jarenErvaring, expertises, images }: VariantProps) {
  const paragraphs = getParagraphs(overMij, content);
  const quote = getQuote(overMij);

  return (
    <section
      id="over"
      className="px-6 md:px-12 lg:px-20 py-20 lg:py-28"
      style={{ backgroundColor: theme.colors.backgroundAlt, fontFamily: theme.fonts.body }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Quote + Photo header */}
        <div className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 mb-16 ${getRevealClass('up')}`}>
          <div className="flex-1">
            <QuoteBlock
              quote={quote}
              naam={content.naam}
              headingFont={theme.fonts.heading}
              primaryColor={palette.primary}
              textColor={theme.colors.text}
            />
          </div>
          <div className="shrink-0">
            <RoundPhoto
              src={content.foto ?? images.sfeer}
              alt={`Over ${content.naam}`}
              ringColor={palette.primary}
              duotone
              size="md"
            />
          </div>
        </div>

        {/* Divider + Label */}
        <div className={`flex items-center gap-4 mb-10 ${getRevealClass('up', 100)}`}>
          <span className="text-[9px] font-medium uppercase tracking-[2px]" style={{ color: theme.colors.textMuted }}>
            Over mij
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: theme.colors.border }} />
        </div>

        {/* Title */}
        <h2
          className={`text-3xl md:text-4xl mb-10 ${getRevealClass('up', 150)}`}
          style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
        >
          {jarenErvaring ? (
            <>
              Al {jarenErvaring} jaar met{' '}
              <em className="italic" style={{ color: palette.primary }}>toewijding</em> in de zorg
            </>
          ) : (
            <>
              Mijn <em className="italic" style={{ color: palette.primary }}>verhaal</em>
            </>
          )}
        </h2>

        <div className={`mb-10 ${getRevealClass('up', 200)}`}>
          <TwoColumnText paragraphs={paragraphs} textColor={theme.colors.textMuted} />
        </div>

        <div className={getRevealClass('up', 250)}>
          <ExpertiseTags expertises={expertises} borderColor={theme.colors.border} textColor={theme.colors.textMuted} />
        </div>
      </div>
    </section>
  );
}

// ============================================
// SERENE 2: Visual Margin
// ============================================
export function OverSerene2({ theme, palette, content, overMij, jarenErvaring, expertises, images }: VariantProps) {
  const paragraphs = getParagraphs(overMij, content);
  const quote = getQuote(overMij);
  const titel = getTitel(overMij, 'Persoonlijke zorg op maat');

  return (
    <section
      id="over"
      className="px-6 md:px-12 lg:px-20 py-20 lg:py-28"
      style={{ backgroundColor: theme.colors.background, fontFamily: theme.fonts.body }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left: Visual Margin — sticky */}
          <div className={`lg:col-span-4 ${getRevealClass('left')}`}>
            <div className="lg:sticky lg:top-24">
              <div className="relative mb-8">
                <img
                  src={content.foto ?? images.sfeer}
                  alt={`Over ${content.naam}`}
                  className="w-full aspect-[3/4] object-cover"
                  style={{ ...DUOTONE_STYLE, borderRadius: '0 80px 0 0' }}
                />
                <div
                  className="absolute bottom-0 left-0 w-full h-px"
                  style={{ backgroundColor: palette.primary }}
                />
              </div>
              <div className="border-l pl-5" style={{ borderColor: palette.primary }}>
                <p
                  className="text-lg italic leading-relaxed mb-4"
                  style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                >
                  &ldquo;{quote}&rdquo;
                </p>
                <p className="text-[9px] font-medium uppercase tracking-[2px]" style={{ color: palette.primary }}>
                  — {content.naam.split(' ')[0]}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className={`lg:col-span-8 ${getRevealClass('right')}`}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px" style={{ backgroundColor: palette.primary }} />
              <span className="text-[9px] font-medium uppercase tracking-[3px]" style={{ color: theme.colors.textMuted }}>
                Over mij
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl mb-8" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>
              {(() => {
                const { rest, accent: acc } = splitTitleAccent(titel);
                return (
                  <>
                    {rest} <em className="italic" style={{ color: palette.primary }}>{acc}</em>
                  </>
                );
              })()}
            </h2>

            <div className="mb-10">
              <TwoColumnText paragraphs={paragraphs} textColor={theme.colors.textMuted} />
            </div>

            <div
              className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pt-8 border-t"
              style={{ borderColor: theme.colors.border }}
            >
              <ExpertiseTags expertises={expertises} borderColor={theme.colors.border} textColor={theme.colors.textMuted} />
              <p className="text-2xl italic shrink-0" style={{ fontFamily: theme.fonts.heading, color: palette.primary }}>
                {content.naam}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// SERENE 3: Numbered Blocks
// ============================================
export function OverSerene3({ theme, palette, content, overMij, jarenErvaring, expertises, images }: VariantProps) {
  const paragraphs = getParagraphs(overMij, content);
  const quote = getQuote(overMij);

  const blocks = [
    { num: '01', title: 'Mijn achtergrond', text: paragraphs[0] },
    { num: '02', title: 'Wat mij drijft', text: paragraphs[1] },
    { num: '03', title: 'Mijn aanpak', text: paragraphs[2] },
  ].filter((b) => b.text);

  // Fallback when < 2 paragraphs available
  const defaultBlocks = [
    { num: '01', title: 'Mijn achtergrond', text: overMij?.intro ?? 'Met jarenlange ervaring in de zorg heb ik een brede basis opgebouwd.' },
    { num: '02', title: 'Wat mij drijft', text: overMij?.body ?? 'Het maken van een verschil in het leven van mensen.' },
    { num: '03', title: 'Mijn aanpak', text: overMij?.persoonlijk ?? 'Flexibel, betrouwbaar en met persoonlijke aandacht.' },
  ];

  const displayBlocks = blocks.length >= 2 ? blocks : defaultBlocks;
  const leftBlocks = displayBlocks.slice(0, 2);
  const rightBlocks = displayBlocks.slice(2);

  return (
    <section
      id="over"
      className="px-6 md:px-12 lg:px-20 py-20 lg:py-28"
      style={{ backgroundColor: theme.colors.backgroundAlt, fontFamily: theme.fonts.body }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Label */}
        <div className={`flex items-center gap-4 mb-10 ${getRevealClass('up')}`}>
          <div className="w-8 h-px" style={{ backgroundColor: palette.primary }} />
          <span className="text-[9px] font-medium uppercase tracking-[3px]" style={{ color: theme.colors.textMuted }}>
            Over mij
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: theme.colors.border }} />
        </div>

        {/* Compact header: Photo + Quote */}
        <div className={`flex flex-col md:flex-row gap-8 lg:gap-12 mb-12 ${getRevealClass('up', 100)}`}>
          <div className="shrink-0">
            <div className="relative w-40 h-40 lg:w-48 lg:h-48 overflow-hidden">
              <img
                src={content.foto ?? images.sfeer}
                alt={`Over ${content.naam}`}
                className="w-full h-full object-cover"
                style={DUOTONE_STYLE}
              />
              <div
                className="absolute bottom-0 right-0 w-8 h-8 opacity-80"
                style={{ backgroundColor: palette.primary }}
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <QuoteBlock
              quote={quote}
              naam={content.naam.split(' ')[0]}
              headingFont={theme.fonts.heading}
              primaryColor={palette.primary}
              textColor={theme.colors.text}
              size="md"
            />
          </div>
        </div>

        {/* Heading with jaren ervaring */}
        <h2
          className={`text-3xl md:text-4xl lg:text-[42px] leading-[1.15] mb-12 ${getRevealClass('up', 150)}`}
          style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
        >
          {jarenErvaring ? (
            <>
              Al {jarenErvaring} jaar met{' '}
              <em className="italic" style={{ color: palette.primary }}>toewijding</em> in de zorg
            </>
          ) : (
            <>
              Met <em className="italic" style={{ color: palette.primary }}>passie</em> voor persoonlijke zorg
            </>
          )}
        </h2>

        {/* Numbered blocks in asymmetric grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          <div className="lg:col-span-6 space-y-0">
            {leftBlocks.map((block, idx) => (
              <div
                key={idx}
                className={`border-l pl-6 py-6 ${getRevealClass('up', (idx + 2) * 50)}`}
                style={{ borderColor: idx === 0 ? palette.primary : theme.colors.border }}
              >
                <span className="text-[9px] font-medium uppercase tracking-[2px] block mb-2" style={{ color: theme.colors.textMuted }}>
                  {block.num}
                </span>
                <h3 className="text-xl mb-3" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>
                  {block.title}
                </h3>
                <p className="text-sm leading-[1.8]" style={{ color: theme.colors.textMuted }}>
                  {block.text}
                </p>
              </div>
            ))}
          </div>

          <div className="lg:col-span-6 lg:pt-16 space-y-0">
            {rightBlocks.map((block, idx) => (
              <div
                key={idx}
                className={`border-l pl-6 py-6 ${getRevealClass('up', (idx + 3) * 50)}`}
                style={{ borderColor: theme.colors.border }}
              >
                <span className="text-[9px] font-medium uppercase tracking-[2px] block mb-2" style={{ color: theme.colors.textMuted }}>
                  {block.num}
                </span>
                <h3 className="text-xl mb-3" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>
                  {block.title}
                </h3>
                <p className="text-sm leading-[1.8]" style={{ color: theme.colors.textMuted }}>
                  {block.text}
                </p>
              </div>
            ))}
            {/* Sfeerbeeld */}
            <div className={`pt-6 ${getRevealClass('up', 200)}`}>
              <img
                src={images.sfeer}
                alt="Zorg sfeer"
                className="w-full h-48 object-cover"
                style={{ borderRadius: '0 40px 0 0' }}
              />
            </div>
          </div>
        </div>

        {/* Bottom: tags + CTA */}
        <div
          className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 pt-8 border-t ${getRevealClass('up', 250)}`}
          style={{ borderColor: theme.colors.border }}
        >
          <ExpertiseTags expertises={expertises} borderColor={theme.colors.border} textColor={theme.colors.textMuted} />
          <a
            href="#contact"
            className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[2px]"
            style={{ color: palette.primary }}
          >
            <span
              className="w-10 h-10 rounded-full border flex items-center justify-center"
              style={{ borderColor: palette.primary }}
            >
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </span>
            Neem contact op
          </a>
        </div>
      </div>
    </section>
  );
}

export default OverSection;