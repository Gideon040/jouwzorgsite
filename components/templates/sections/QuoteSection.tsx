// components/templates/sections/QuoteSection.tsx
// Quote section — 4 style varianten: banner, minimal, dark, serene
//
// ============================================
// DESIGN PHILOSOPHY
// ============================================
//
// De Quote section is een visueel rustpunt tussen informatiedichte secties.
// Het doel: één krachtige zin die emotie oproept en de pagina laat ademen.
//
// VARIANTEN:
//   banner  — Cinematic parallax met sfeerbeeld + kleur-overlay
//   minimal — Typography-first, geen afbeelding, elegante decoratie
//   dark    — Donkere overlay met vignette, dramatisch
//   serene  — Zen-achtig, maximum whitespace, organische lijnen
//
// EDGE FUNCTION STIJL MAPPING:
//   editorial:  ['minimal', 'banner', 'dark']
//   proactief:  ['banner', 'dark', 'minimal']
//   portfolio:  ['dark', 'banner', 'minimal']
//   mindoor:    ['minimal', 'banner', 'dark']
//   serene:     ['serene']
//
// DATA FLOW:
//   generated?.quote → AI-gegenereerde quote (optioneel, niet in huidige prompt)
//   DEFAULT_QUOTES   → Fallback quotes per categorie
//   content.naam     → Voor attribuering
//   beroepLabel      → Voor image selectie (getBeroepImages)
//
// ============================================

'use client';

import { ThemeConfig } from '../themes';
import { SiteContent, GeneratedContent } from '@/types';
import { BaseSectionProps, getBeroepImages, getRevealClass, QUOTE_SFEER_IMAGES, DEFAULT_QUOTES, hashString } from './types';

// ============================================
// TYPE: QuoteStyle uitgebreid met 'serene'
// ============================================
// NOTE: types.ts moet worden bijgewerkt:
//   export type QuoteStyle = 'banner' | 'minimal' | 'dark' | 'serene';

type QuoteStyleExtended = 'banner' | 'minimal' | 'dark' | 'serene';

interface QuoteSectionProps extends BaseSectionProps {
  style: QuoteStyleExtended;
}

// ============================================
// TYPED SUB-COMPONENT PROPS
// ============================================

interface QuoteVariantProps {
  theme: ThemeConfig;
  palette: {
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
  };
  quote: string;
  naam: string;
}

interface QuoteWithImageProps extends QuoteVariantProps {
  imageUrl: string;
}

// ============================================
// DEFAULT QUOTES
// ============================================

// DEFAULT_QUOTES, QUOTE_SFEER_IMAGES, hashString imported from ./types

/** Selecteer quote deterministic op basis van content */
function selectQuote(generated: GeneratedContent | undefined, content: SiteContent): string {
  // 1. AI-gegenereerde quote (toekomstig)
  if (generated?.quote) return generated.quote;

  // 2. Fallback: deterministische selectie op basis van naam + tagline
  const seed = hashString((content.naam || '') + (content.tagline || ''));
  return DEFAULT_QUOTES[seed % DEFAULT_QUOTES.length];
}

/** Selecteer sfeer-afbeelding: beroep-specifiek of uit gevarieerde pool */
function selectSfeerImage(beroepLabel: string, content: SiteContent): string {
  const beroepImages = getBeroepImages(beroepLabel);
  
  // Als er een beroep-specifiek sfeerbeeld is, gebruik dat
  if (beroepImages.sfeer) return beroepImages.sfeer;
  
  // Anders: deterministische keuze uit pool
  const seed = hashString(content.naam || '');
  return QUOTE_SFEER_IMAGES[seed % QUOTE_SFEER_IMAGES.length];
}

// ============================================
// MAIN COMPONENT
// ============================================

export function QuoteSection({ 
  style, 
  theme, 
  palette, 
  content, 
  generated, 
  beroepLabel 
}: QuoteSectionProps) {
  const quote = selectQuote(generated, content);
  const naam = content.naam || '';
  const imageUrl = generated?.quoteImage || selectSfeerImage(beroepLabel, content);

  const baseProps: QuoteVariantProps = { theme, palette, quote, naam };
  const imageProps: QuoteWithImageProps = { ...baseProps, imageUrl };

  switch (style) {
    case 'banner':
      return <QuoteBanner {...imageProps} />;
    case 'minimal':
      return <QuoteMinimal {...baseProps} />;
    case 'dark':
      return <QuoteDark {...imageProps} />;
    case 'serene':
      return <QuoteSerene {...baseProps} />;
    default:
      return <QuoteBanner {...imageProps} />;
  }
}

// ============================================
// DECORATIVE SVG QUOTE MARK
// ============================================

function QuoteMark({ 
  color, 
  size = 64, 
  opacity = 0.15,
  className = '',
}: { 
  color: string; 
  size?: number; 
  opacity?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
    </svg>
  );
}

// ============================================
// BANNER — Cinematic parallax met kleur-overlay
// ============================================
//
// Design:
// - Parallax achtergrondafbeelding (bg-fixed)
// - Primaire kleur gradient overlay (niet puur zwart)
// - Oversized SVG quote mark als decoratie
// - Serif heading font voor dramatisch effect
// - Subtiele horizontale lijn met accent kleur
// - Vignette effect via radial-gradient

function QuoteBanner({ theme, palette, quote, naam, imageUrl }: QuoteWithImageProps) {
  const accentColor = palette.accent ?? palette.primary;

  return (
    <section className="relative w-full h-[520px] md:h-[600px] flex items-center justify-center overflow-hidden">
      {/* Parallax achtergrond */}
      <div
        className="absolute inset-0 bg-fixed bg-center bg-cover will-change-transform"
        style={{ 
          backgroundImage: `url("${imageUrl}")`,
          transform: 'scale(1.1)',
        }}
      />

      {/* Kleur-gradient overlay — palette-gebaseerd, niet puur zwart */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            160deg,
            ${palette.primaryDark}e6 0%,
            rgba(0, 0, 0, 0.7) 50%,
            ${palette.primaryDark}cc 100%
          )`,
        }}
      />

      {/* Vignette effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.3) 100%)',
        }}
      />

      {/* Decoratieve quote marks — groot, positie absoluut */}
      <QuoteMark
        color="#ffffff"
        size={200}
        opacity={0.06}
        className="absolute top-8 left-8 md:top-12 md:left-16 pointer-events-none"
      />
      <QuoteMark
        color="#ffffff"
        size={120}
        opacity={0.04}
        className="absolute bottom-8 right-8 md:bottom-12 md:right-16 rotate-180 pointer-events-none"
      />

      {/* Content */}
      <div className={`relative z-10 text-center px-8 md:px-12 max-w-4xl ${getRevealClass('up')}`}>
        {/* Accent lijn boven */}
        <div
          className="w-12 h-0.5 mx-auto mb-10"
          style={{ backgroundColor: accentColor }}
        />

        <blockquote>
          <p
            className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] italic leading-[1.3] md:leading-[1.35] font-light"
            style={{ fontFamily: theme.fonts.heading }}
          >
            &ldquo;{quote}&rdquo;
          </p>
        </blockquote>

        {/* Attribuering */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <div
            className="w-8 h-px"
            style={{ backgroundColor: `${accentColor}80` }}
          />
          <span
            className="text-[10px] font-semibold uppercase tracking-[3px] text-white/60"
          >
            {naam}
          </span>
          <div
            className="w-8 h-px"
            style={{ backgroundColor: `${accentColor}80` }}
          />
        </div>
      </div>
    </section>
  );
}

// ============================================
// MINIMAL — Typography-first, geen afbeelding
// ============================================
//
// Design:
// - Geen afbeelding, puur typografie
// - Oversized decoratieve quote marks als achtergrond
// - Maximale whitespace (py-28/py-36)
// - Dunne border-top/bottom als scheiding
// - Accent kleur voor decoratieve elementen
// - Elegante split-line met naam
//
// Past bij: Editorial, Mindoor (warme, rustige templates)

function QuoteMinimal({ theme, palette, quote, naam }: QuoteVariantProps) {
  const bgColor = palette.bg ?? theme.colors.background;
  const borderColor = palette.border ?? theme.colors.border;
  const textColor = palette.text ?? theme.colors.text;
  const mutedColor = palette.textMuted ?? theme.colors.textMuted;
  const accentColor = palette.accent ?? palette.primary;

  return (
    <section
      className="relative py-28 md:py-36 overflow-hidden"
      style={{
        backgroundColor: bgColor,
        borderTop: `1px solid ${borderColor}`,
        borderBottom: `1px solid ${borderColor}`,
      }}
    >
      {/* Decoratieve oversized quote mark — achtergrond */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <QuoteMark
          color={palette.primary}
          size={320}
          opacity={0.04}
        />
      </div>

      {/* Content */}
      <div className={`relative z-10 max-w-3xl mx-auto text-center px-8 md:px-12 ${getRevealClass('up')}`}>
        {/* Micro label */}
        <span
          className="text-[9px] font-semibold uppercase tracking-[3px] block mb-8"
          style={{ color: mutedColor }}
        >
          Gedreven door
        </span>

        <blockquote>
          <p
            className="text-2xl sm:text-3xl md:text-[2.25rem] font-light leading-[1.45] italic"
            style={{ fontFamily: theme.fonts.heading, color: textColor }}
          >
            &ldquo;{quote}&rdquo;
          </p>
        </blockquote>

        {/* Attribuering met elegante lijnen */}
        <div className="mt-12 flex items-center justify-center gap-5">
          <div
            className="flex-1 max-w-[60px] h-px"
            style={{ backgroundColor: `${accentColor}30` }}
          />
          <span
            className="text-[10px] font-semibold uppercase tracking-[3px]"
            style={{ color: mutedColor }}
          >
            {naam}
          </span>
          <div
            className="flex-1 max-w-[60px] h-px"
            style={{ backgroundColor: `${accentColor}30` }}
          />
        </div>
      </div>
    </section>
  );
}

// ============================================
// DARK — Cinematic donkere overlay
// ============================================
//
// Design:
// - Sfeerbeeld met zware donkere overlay
// - Vignette via radial-gradient
// - Subtiele primary-kleur gradient in overlay
// - Grotere tekst, meer dramatisch dan banner
// - Geen parallax (voor mobiel-vriendelijk)
// - Accent lijn onderaan
//
// Past bij: Portfolio, Proactief (krachtige templates)

function QuoteDark({ theme, palette, quote, naam, imageUrl }: QuoteWithImageProps) {
  const accentColor = palette.accent ?? palette.primary;

  return (
    <section className="relative w-full h-[450px] md:h-[550px] flex items-center justify-center overflow-hidden">
      {/* Achtergrond */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ 
          backgroundImage: `url("${imageUrl}")`,
          transform: 'scale(1.05)',
        }}
      />

      {/* Donkere overlay met subtiele kleur-tint */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.82) 0%,
            ${palette.primaryDark}d9 50%,
            rgba(0, 0, 0, 0.85) 100%
          )`,
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.4) 100%)',
        }}
      />

      {/* Content */}
      <div className={`relative z-10 text-center px-8 md:px-16 max-w-4xl ${getRevealClass('up')}`}>
        {/* Decoratieve quote mark */}
        <QuoteMark
          color={accentColor}
          size={56}
          opacity={0.5}
          className="mx-auto mb-8"
        />

        <blockquote>
          <p
            className="text-white text-xl sm:text-2xl md:text-4xl lg:text-[2.5rem] italic leading-[1.4] font-light"
            style={{ 
              fontFamily: theme.fonts.heading,
              textShadow: '0 2px 20px rgba(0,0,0,0.3)',
            }}
          >
            &ldquo;{quote}&rdquo;
          </p>
        </blockquote>

        {/* Attribuering */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <div
            className="w-16 h-0.5"
            style={{ backgroundColor: accentColor }}
          />
          <span className="text-[10px] font-semibold uppercase tracking-[3px] text-white/50">
            {naam}
          </span>
        </div>
      </div>
    </section>
  );
}

// ============================================
// SERENE — Zen-achtig, maximum whitespace
// ============================================
//
// Design DNA (uit design-system-compatibility.md):
// - Typography-first, zen
// - Cormorant Garamond heading font
// - Sharp + organic image corners
// - text-[9px] uppercase tracking-[3px] micro labels
// - Subtiele borders als separators
// - Maximum breathing room
//
// Specifiek voor deze variant:
// - Geen afbeelding — puur typografie en ruimte
// - Organische decoratieve lijn (SVG brushstroke)
// - Gedempte sage-achtige kleuren
// - Extra grote padding (py-32/py-44)
// - Kleine decoratieve accenten: dunne lijn, punt
// - Bewust rustig, geen drukke elementen

function QuoteSerene({ theme, palette, quote, naam }: QuoteVariantProps) {
  const bgColor = palette.bg ?? theme.colors.background;
  const textColor = palette.text ?? theme.colors.text;
  const mutedColor = palette.textMuted ?? theme.colors.textMuted;
  const borderColor = palette.border ?? theme.colors.border;

  return (
    <section
      className="relative py-32 md:py-44 overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      {/* Subtiele decoratieve achtergrond — organische lijn */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg
          viewBox="0 0 600 120"
          className="w-[80%] max-w-[500px] opacity-[0.035]"
          fill="none"
          stroke={palette.primary}
          strokeWidth="1"
          aria-hidden="true"
        >
          <path
            d="M0,60 C100,20 200,100 300,60 C400,20 500,100 600,60"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className={`relative z-10 max-w-2xl mx-auto text-center px-8 md:px-12 ${getRevealClass('up')}`}>
        {/* Micro label */}
        <span
          className="text-[9px] font-semibold uppercase tracking-[3px] block mb-6"
          style={{ color: mutedColor }}
        >
          Filosofie
        </span>

        {/* Decoratieve punt */}
        <div
          className="w-1.5 h-1.5 rounded-full mx-auto mb-10"
          style={{ backgroundColor: `${palette.primary}40` }}
        />

        <blockquote>
          <p
            className="text-xl sm:text-2xl md:text-3xl lg:text-[2rem] font-light leading-[1.6] md:leading-[1.65] italic"
            style={{ fontFamily: theme.fonts.heading, color: textColor }}
          >
            &ldquo;{quote}&rdquo;
          </p>
        </blockquote>

        {/* Attribuering — minimaal */}
        <div className="mt-14 flex flex-col items-center gap-5">
          {/* Organische lijn */}
          <svg
            viewBox="0 0 80 4"
            className="w-16"
            fill="none"
            stroke={palette.primary}
            strokeWidth="0.5"
            strokeLinecap="round"
            aria-hidden="true"
            style={{ opacity: 0.3 }}
          >
            <path d="M0,2 C20,0 60,4 80,2" />
          </svg>

          <span
            className="text-[10px] font-light tracking-[4px] uppercase"
            style={{ color: mutedColor }}
          >
            {naam}
          </span>
        </div>
      </div>
    </section>
  );
}

export default QuoteSection;