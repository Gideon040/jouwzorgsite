// components/templates/sections/CtaSection.tsx
// Call to Action section — v2 rewrite
// Fixes: typed props, dynamic data from edge function, serene variant, design elevation

'use client';

import { ThemeConfig } from '../themes';
import { SiteContent, GeneratedContent } from '@/types';
import { BaseSectionProps, CtaStyle, getRevealClass } from './types';

// ============================================
// SECTION PROPS
// ============================================

interface CtaSectionProps extends BaseSectionProps {
  style?: CtaStyle;
}

// ============================================
// SHARED VARIANT PROPS (no more `any`)
// ============================================

interface CtaVariantProps {
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
  titel: string;
  subtitel: string;
  buttonText: string;
  telefoon?: string;
  email?: string;
}

// ============================================
// HELPER: CTA Button Pair
// Extracts the repeating primary + secondary button pattern
// ============================================

interface CtaButtonProps {
  buttonText: string;
  telefoon?: string;
  email?: string;
  primaryColor: string;
  variant: 'rounded' | 'pill' | 'sharp';
  secondaryAction?: 'call' | 'email';
}

function CtaButtons({ buttonText, telefoon, email, primaryColor, variant, secondaryAction = 'call' }: CtaButtonProps) {
  const radiusClass = variant === 'pill' ? 'rounded-full' : variant === 'sharp' ? 'rounded-none' : 'rounded-lg';

  const secondaryHref = secondaryAction === 'email' && email
    ? `mailto:${email}`
    : telefoon
      ? `tel:${telefoon}`
      : null;

  const secondaryLabel = secondaryAction === 'email' ? 'Stuur een email' : 'Bel direct';
  const secondaryIcon = secondaryAction === 'email' ? (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ) : (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <a
        href="#contact"
        className={`group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white font-semibold text-sm uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl ${radiusClass}`}
        style={{ color: primaryColor }}
      >
        {buttonText}
        <svg
          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
      {secondaryHref && (
        <a
          href={secondaryHref}
          className={`inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold text-sm uppercase tracking-wider transition-all duration-300 hover:bg-white/10 hover:border-white/50 ${radiusClass}`}
        >
          {secondaryIcon}
          {secondaryLabel}
        </a>
      )}
    </div>
  );
}

// ============================================
// HELPER: Decorative element
// ============================================

function DecorativeAccent({ color, className }: { color: string; className?: string }) {
  return (
    <div
      className={`h-px w-16 mx-auto ${className ?? ''}`}
      style={{ backgroundColor: color }}
    />
  );
}

// ============================================
// MAIN EXPORT
// ============================================

export function CtaSection({
  style = 'editorial',
  theme,
  palette,
  content,
  generated,
}: CtaSectionProps) {
  // Edge function genereert: { titel, tekst, button }
  const ctaContent = generated?.cta;
  const titel = ctaContent?.titel || 'Op zoek naar versterking?';
  const subtitel = ctaContent?.tekst || 'Neem contact op om de mogelijkheden te bespreken.';
  const buttonText = ctaContent?.button || 'Neem contact op';
  const telefoon = content.contact?.telefoon;
  const email = content.contact?.email;

  const sharedProps: CtaVariantProps = { theme, palette, titel, subtitel, buttonText, telefoon, email };

  switch (style) {
    case 'editorial':
      return <CtaEditorial {...sharedProps} />;
    case 'proactief':
      return <CtaProactief {...sharedProps} />;
    case 'portfolio':
      return <CtaPortfolio {...sharedProps} />;
    case 'mindoor':
      return <CtaMindoor {...sharedProps} />;
    case 'serene':
      return <CtaSerene {...sharedProps} />;
    default:
      return <CtaEditorial {...sharedProps} />;
  }
}

// ============================================
// EDITORIAL — Oversized typography, accent line, confident
// Full-width primary bg, decorative top border accent
// ============================================
function CtaEditorial({ theme, palette, titel, subtitel, buttonText, telefoon }: CtaVariantProps) {
  return (
    <section
      id="cta"
      className="relative overflow-hidden"
    >
      {/* Accent top border */}
      <div
        className="h-1 w-full"
        style={{ backgroundColor: palette.accent ?? palette.primaryDark }}
      />

      <div
        className="px-6 md:px-16 lg:px-32 py-20 md:py-28"
        style={{ backgroundColor: palette.primary }}
      >
        {/* Subtle oversized decorative letter */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] md:text-[30rem] font-bold leading-none text-white/[0.03] pointer-events-none select-none"
          style={{ fontFamily: theme.fonts.heading }}
          aria-hidden="true"
        >
          ?
        </div>

        <div className={`relative max-w-3xl mx-auto text-center ${getRevealClass('up')}`}>
          {/* Micro label */}
          <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-6">
            Laten we kennismaken
          </p>

          {/* Titel — oversized */}
          <h2
            className="text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-[1.1]"
            style={{ fontFamily: theme.fonts.heading }}
          >
            {titel}
          </h2>

          {/* Accent line */}
          <DecorativeAccent color="rgba(255,255,255,0.3)" className="mb-6" />

          {/* Subtitel */}
          <p className="text-white/75 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            {subtitel}
          </p>

          {/* Buttons */}
          <CtaButtons
            buttonText={buttonText}
            telefoon={telefoon}
            primaryColor={palette.primary}
            variant="sharp"
          />
        </div>
      </div>
    </section>
  );
}

// ============================================
// PROACTIEF — Gradient mesh bg, geometric shapes, energetic
// ============================================
function CtaProactief({ theme, palette, titel, subtitel, buttonText, telefoon }: CtaVariantProps) {
  return (
    <section
      id="cta"
      className="relative py-28 md:py-36 px-6 md:px-12 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${palette.primary} 0%, ${palette.primaryDark} 50%, ${palette.accent ?? palette.primaryDark} 100%)`,
      }}
    >
      {/* Geometric decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large rotating ring */}
        <div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] border-[3px] border-white/[0.06] rounded-full"
          style={{ animation: 'spin 60s linear infinite' }}
        />
        {/* Small orbit dot */}
        <div
          className="absolute top-20 right-40 w-3 h-3 rounded-full bg-white/20"
        />
        {/* Bottom left glow */}
        <div
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${palette.accent ?? palette.primaryLight}22 0%, transparent 70%)`,
          }}
        />
        {/* Grid lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-white/[0.04]" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-white/[0.04]" />
      </div>

      <div className={`relative max-w-3xl mx-auto text-center z-10 ${getRevealClass('up')}`}>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-white/80 text-xs uppercase tracking-widest mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Beschikbaar
        </div>

        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          style={{ fontFamily: theme.fonts.heading }}
        >
          {titel}
        </h2>
        <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          {subtitel}
        </p>

        <CtaButtons
          buttonText={buttonText}
          telefoon={telefoon}
          primaryColor={palette.primary}
          variant="pill"
        />
      </div>
    </section>
  );
}

// ============================================
// PORTFOLIO — Dark, premium, subtle grain overlay
// ============================================
function CtaPortfolio({ theme, palette, titel, subtitel, buttonText, telefoon }: CtaVariantProps) {
  return (
    <section
      id="cta"
      className="relative py-28 md:py-36 px-8 md:px-12 overflow-hidden"
      style={{
        background: `linear-gradient(160deg, ${palette.primaryDark} 0%, ${palette.primary} 100%)`,
      }}
    >
      {/* Noise/grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative corner elements */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-white/10" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-white/10" />

      {/* Accent line left */}
      <div
        className="absolute left-0 top-1/4 h-1/2 w-1"
        style={{ backgroundColor: palette.accentLight ?? palette.primaryLight }}
      />

      <div className={`relative max-w-[800px] mx-auto text-center z-10 ${getRevealClass('up')}`}>
        {/* Micro label */}
        <p
          className="text-[10px] uppercase tracking-[0.4em] mb-8"
          style={{ color: palette.accentLight ?? palette.primaryLight }}
        >
          Samenwerking
        </p>

        <h2
          className="text-4xl md:text-[52px] font-semibold text-white leading-[1.15] mb-6"
          style={{ fontFamily: theme.fonts.heading }}
        >
          {titel}
        </h2>

        <p className="text-lg text-white/70 leading-relaxed mb-12 max-w-2xl mx-auto">
          {subtitel}
        </p>

        {/* Buttons with icons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white font-semibold text-sm rounded-none transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
            style={{ color: palette.primaryDark }}
          >
            <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            {buttonText}
          </a>
          {telefoon && (
            <a
              href={`tel:${telefoon}`}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/20 text-white font-semibold text-sm rounded-none transition-all duration-300 hover:bg-white/5 hover:border-white/40"
            >
              <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              Bel direct
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

// ============================================
// MINDOOR — Warm gradient card, organic shapes, no stock photos
// Rounded container within page, concentric decorative rings
// ============================================
function CtaMindoor({ theme, palette, titel, subtitel, buttonText, telefoon, email }: CtaVariantProps) {
  const accentColor = palette.accent ?? '#d4644a';
  const accentLightColor = palette.accentLight ?? palette.primaryLight;

  return (
    <section
      id="cta"
      className="py-20 lg:py-32"
      style={{ backgroundColor: palette.bg ?? theme.colors.background }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden py-16 lg:py-24 px-8 lg:px-16"
          style={{
            background: `linear-gradient(to bottom right, ${accentColor}, ${accentLightColor})`,
          }}
        >
          {/* Organic blob decorations instead of stock photos */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Floating organic blobs */}
            <div
              className="absolute -top-10 left-[10%] w-32 h-32 rounded-full opacity-20 blur-2xl"
              style={{ backgroundColor: 'white' }}
            />
            <div
              className="absolute top-1/3 -right-8 w-40 h-40 rounded-full opacity-10 blur-3xl"
              style={{ backgroundColor: 'white' }}
            />
            <div
              className="absolute -bottom-12 left-[30%] w-48 h-48 rounded-full opacity-15 blur-2xl"
              style={{ backgroundColor: palette.primary }}
            />

            {/* Concentric circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/[0.08] rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/[0.06] rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-white/[0.04] rounded-full" />
          </div>

          {/* Content */}
          <div className={`relative text-center max-w-2xl mx-auto z-10 ${getRevealClass('up')}`}>
            {/* Warm icon */}
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/15 mb-8">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-2"
              style={{ fontFamily: theme.fonts.heading }}
            >
              {titel}
            </h2>

            <p className="mt-5 text-lg text-white/80 leading-relaxed max-w-lg mx-auto">
              {subtitel}
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              {telefoon && (
                <a
                  href={`tel:${telefoon}`}
                  className="inline-flex items-center justify-center gap-2 bg-white px-8 py-4 rounded-full font-medium shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                  style={{ color: accentColor }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Bel {telefoon}
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-full font-medium border border-white/20 transition-all duration-300 hover:bg-white/20"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Stuur een email
                </a>
              )}
              {/* Fallback if neither telefoon nor email */}
              {!telefoon && !email && (
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 bg-white px-8 py-4 rounded-full font-medium shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                  style={{ color: accentColor }}
                >
                  {buttonText}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// SERENE — Zen minimal, breathing space, thin lines
// Light background with centered text and subtle decoration
// ============================================
function CtaSerene({ theme, palette, titel, subtitel, buttonText, telefoon }: CtaVariantProps) {
  const textColor = palette.text ?? '#1a1a1a';
  const textMuted = palette.textMuted ?? '#6b7280';
  const borderColor = palette.border ?? '#e5e7eb';

  return (
    <section
      id="cta"
      className="relative py-24 md:py-36 px-6"
      style={{ backgroundColor: palette.bg ?? theme.colors.background }}
    >
      {/* Subtle top/bottom borders */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px"
        style={{ backgroundColor: borderColor }}
      />

      <div className={`max-w-2xl mx-auto text-center ${getRevealClass('up')}`}>
        {/* Decorative dot cluster */}
        <div className="flex items-center justify-center gap-1.5 mb-10">
          <div className="w-1 h-1 rounded-full" style={{ backgroundColor: palette.primary, opacity: 0.3 }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: palette.primary, opacity: 0.6 }} />
          <div className="w-1 h-1 rounded-full" style={{ backgroundColor: palette.primary, opacity: 0.3 }} />
        </div>

        <h2
          className="text-3xl md:text-4xl lg:text-[44px] font-light leading-[1.2] mb-6"
          style={{
            fontFamily: theme.fonts.heading,
            color: textColor,
          }}
        >
          {titel}
        </h2>

        <p
          className="text-base md:text-lg leading-relaxed mb-10 max-w-md mx-auto"
          style={{ color: textMuted }}
        >
          {subtitel}
        </p>

        {/* Single elegant CTA link */}
        <div className="flex flex-col items-center gap-6">
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] font-medium transition-colors duration-300"
            style={{ color: palette.primary }}
          >
            <span className="relative">
              {buttonText}
              <span
                className="absolute -bottom-1 left-0 w-full h-px transition-transform duration-300 origin-left group-hover:scale-x-100 scale-x-50"
                style={{ backgroundColor: palette.primary }}
              />
            </span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          {telefoon && (
            <a
              href={`tel:${telefoon}`}
              className="inline-flex items-center gap-2 text-sm transition-colors duration-300 hover:opacity-80"
              style={{ color: textMuted }}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {telefoon}
            </a>
          )}
        </div>
      </div>

      {/* Subtle bottom border */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-px"
        style={{ backgroundColor: borderColor }}
      />
    </section>
  );
}

export default CtaSection;