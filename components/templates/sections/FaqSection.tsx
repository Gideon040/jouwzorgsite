// components/templates/sections/FaqSection.tsx
// FAQ sectie met clickable accordion - 3 varianten per template
// Refactored: proper types, dynamic data, shared helpers, varied images

'use client';

import { useState } from 'react';
import { ThemeConfig } from '../themes';
import { FaqItem, FaqContent, SiteContent, GeneratedContent } from '@/types';
import { BaseSectionProps, FaqStyle, getRevealClass, DEFAULT_FAQS } from './types';

// ============================================
// SECTION PROPS
// ============================================

interface FaqSectionProps extends BaseSectionProps {
  style?: FaqStyle;
}

// ============================================
// PALETTE TYPE (matches BaseSectionProps + optional Color Story fields)
// ============================================

interface FaqPalette {
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

// ============================================
// SHARED PROPS FOR ALL VARIANT COMPONENTS
// ============================================

interface FaqComponentProps {
  theme: ThemeConfig;
  palette: FaqPalette;
  faqs: FaqItem[];
  titel: string;
  intro?: string;
  ctaLabel?: string;
  beroepLabel?: string;
}

// ============================================
// VARIED UNSPLASH IMAGES
// ============================================

const FAQ_IMAGES = {
  zorg1: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
  zorg2: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&w=800&q=80',
  zorg3: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80',
  zorg4: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
  zorg5: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
} as const;

// ============================================
// SHARED HELPER: Accordion Item
// ============================================

interface AccordionItemProps {
  faq: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  questionStyle: React.CSSProperties;
  answerStyle: React.CSSProperties;
  iconStyle: React.CSSProperties;
  iconType?: 'chevron' | 'plus' | 'plusminus';
  className?: string;
  headingFont?: string;
}

function AccordionItem({
  faq,
  index,
  isOpen,
  onToggle,
  questionStyle,
  answerStyle,
  iconStyle,
  iconType = 'chevron',
  className = '',
  headingFont,
}: AccordionItemProps) {
  const renderIcon = () => {
    if (iconType === 'plusminus') {
      return (
        <span className="text-xl font-light transition-all duration-300" style={iconStyle}>
          {isOpen ? '−' : '+'}
        </span>
      );
    }
    if (iconType === 'plus') {
      return (
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
          viewBox="0 0 24 24"
          fill={iconStyle.color as string}
        >
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
      );
    }
    // chevron (default)
    return (
      <span
        className={`material-symbols-outlined flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        style={iconStyle}
      >
        expand_more
      </span>
    );
  };

  return (
    <div className={`cursor-pointer ${className}`} onClick={onToggle}>
      <div className="flex items-center justify-between gap-4">
        <span
          className="font-semibold pr-4"
          style={{ ...questionStyle, fontFamily: headingFont }}
        >
          {faq.vraag}
        </span>
        {renderIcon()}
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-sm leading-relaxed mt-4" style={answerStyle}>
          {faq.antwoord}
        </p>
      </div>
    </div>
  );
}

// ============================================
// SHARED HELPER: Split Title (last word italic)
// ============================================

function SplitTitle({
  titel,
  style,
  italicStyle,
}: {
  titel: string;
  style: React.CSSProperties;
  italicStyle?: React.CSSProperties;
}) {
  const parts = titel.split(' ');
  const lastWord = parts.pop() || '';
  const rest = parts.join(' ');

  return (
    <span style={style}>
      {rest}{' '}
      <em className="italic" style={italicStyle}>
        {lastWord}
      </em>
    </span>
  );
}

// ============================================
// MAIN COMPONENT — ROUTER
// ============================================

export function FaqSection({
  style = 'editorial',
  theme,
  palette,
  content,
  generated,
  beroepLabel,
}: FaqSectionProps) {
  const faqContent = generated?.faq;
  const faqs: FaqItem[] = faqContent?.items || DEFAULT_FAQS;
  const titel = faqContent?.titel || 'Veelgestelde vragen';
  const intro = faqContent?.intro;
  const ctaLabel = generated?.cta?.button || 'Neem contact op';

  if (!faqs || !faqs.length) return null;

  const sharedProps: FaqComponentProps = {
    theme,
    palette: palette as FaqPalette,
    faqs,
    titel,
    intro,
    ctaLabel,
    beroepLabel,
  };

  switch (style) {
    // ============================================
    // EDITORIAL VARIANTEN
    // ============================================
    case 'editorial':
      return <FaqEditorial {...sharedProps} />;
    case 'editorial-2':
      return <FaqEditorial2 {...sharedProps} />;
    case 'editorial-3':
      return <FaqEditorial3 {...sharedProps} />;

    // ============================================
    // PROACTIEF VARIANTEN
    // ============================================
    case 'proactief':
      return <FaqProactief {...sharedProps} />;
    case 'proactief-2':
      return <FaqProactief2 {...sharedProps} />;
    case 'proactief-3':
      return <FaqProactief3 {...sharedProps} />;

    // ============================================
    // PORTFOLIO VARIANTEN
    // ============================================
    case 'portfolio':
      return <FaqPortfolio {...sharedProps} />;
    case 'portfolio-2':
      return <FaqPortfolio2 {...sharedProps} />;
    case 'portfolio-3':
      return <FaqPortfolio3 {...sharedProps} />;

    // ============================================
    // MINDOOR VARIANTEN
    // ============================================
    case 'mindoor':
      return <FaqMindoor {...sharedProps} />;
    case 'mindoor-2':
      return <FaqMindoor2 {...sharedProps} />;
    case 'mindoor-3':
      return <FaqMindoor3 {...sharedProps} />;

    // ============================================
    // SERENE VARIANTEN
    // ============================================
    case 'serene':
      return <FaqSerene {...sharedProps} />;
    case 'serene-2':
      return <FaqSerene2 {...sharedProps} />;
    case 'serene-3':
      return <FaqSerene3 {...sharedProps} />;

    // ============================================
    // LEGACY STYLES
    // ============================================
    case 'accordion':
      return <FaqAccordion {...sharedProps} />;
    case 'grid':
      return <FaqGrid {...sharedProps} />;
    case 'simple':
      return <FaqSimple {...sharedProps} />;

    default:
      return <FaqEditorial {...sharedProps} />;
  }
}

// ============================================
// EDITORIAL - Centered Accordion with Cards
// ============================================
function FaqEditorial({ theme, palette, faqs, titel, ctaLabel }: FaqComponentProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="px-6 md:px-16 lg:px-32 py-20"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-14 ${getRevealClass('up')}`}>
          <span
            className="text-xs font-semibold uppercase tracking-[0.15em] block mb-3"
            style={{ color: palette.primary }}
          >
            Veelgestelde vragen
          </span>
          <h2
            className="text-3xl md:text-4xl"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            {titel}
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-lg overflow-hidden border transition-all duration-300 ${getRevealClass('up', Math.min(index + 1, 3) * 100)}`}
              style={{
                backgroundColor: theme.colors.surface,
                borderColor: openIndex === index ? palette.primary : (palette.border ?? theme.colors.border),
              }}
            >
              <AccordionItem
                faq={faq}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                questionStyle={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                answerStyle={{ color: theme.colors.textMuted }}
                iconStyle={{ color: palette.primary }}
                headingFont={theme.fonts.heading}
                className="p-6"
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center mt-12 ${getRevealClass('up', 300)}`}>
          <p className="text-sm mb-4" style={{ color: theme.colors.textMuted }}>
            Staat uw vraag er niet bij?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 text-white text-sm font-semibold uppercase tracking-widest transition-colors"
            style={{ backgroundColor: palette.primary }}
          >
            {ctaLabel}
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================
// EDITORIAL 2 - Split Layout + Numbered
// ============================================
function FaqEditorial2({ theme, palette, faqs, titel, intro, ctaLabel }: FaqComponentProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="px-6 md:px-12 py-20 lg:py-28"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left: Sticky header */}
          <div className="lg:col-span-4">
            <div className={`lg:sticky lg:top-24 ${getRevealClass('up')}`}>
              <span
                className="text-xs font-semibold uppercase tracking-[0.15em] block mb-3"
                style={{ color: palette.primary }}
              >
                FAQ
              </span>
              <h2
                className="text-3xl md:text-4xl mb-6"
                style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
              >
                <SplitTitle
                  titel={titel}
                  style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                />
              </h2>
              <p className="text-sm mb-8" style={{ color: theme.colors.textMuted }}>
                {intro || 'Hier vindt u antwoorden op de meest gestelde vragen over mijn zorgdiensten.'}
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-medium"
                style={{ color: theme.colors.text }}
              >
                Andere vraag? {ctaLabel} <span>→</span>
              </a>
            </div>
          </div>

          {/* Right: FAQ list */}
          <div className="lg:col-span-8">
            <div className="space-y-0">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`border-b cursor-pointer py-8 ${getRevealClass('up', (index + 1) * 50)}`}
                  style={{ borderColor: palette.border ?? theme.colors.border }}
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <div className="flex gap-6">
                    <span
                      className="text-4xl font-light opacity-20"
                      style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3
                          className="text-lg font-medium pr-4"
                          style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                        >
                          {faq.vraag}
                        </h3>
                        <span
                          className={`material-symbols-outlined flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                          style={{ color: theme.colors.text }}
                        >
                          expand_more
                        </span>
                      </div>
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <p className="text-sm leading-relaxed mt-4" style={{ color: theme.colors.textMuted }}>
                          {faq.antwoord}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// EDITORIAL 3 - Full Width Minimal
// ============================================
function FaqEditorial3({ theme, palette, faqs, titel, ctaLabel }: FaqComponentProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="px-6 md:px-12 py-20 lg:py-28"
      style={{ backgroundColor: theme.colors.surface }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 ${getRevealClass('up')}`}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px" style={{ backgroundColor: theme.colors.text }} />
            <span
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: theme.colors.text }}
            >
              FAQ
            </span>
            <div className="w-12 h-px" style={{ backgroundColor: theme.colors.text }} />
          </div>
          <h2
            className="text-3xl md:text-4xl"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            <SplitTitle
              titel={titel}
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            />
          </h2>
        </div>

        {/* FAQ - Full width rows */}
        <div>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border-t cursor-pointer ${index === faqs.length - 1 ? 'border-b' : ''} ${getRevealClass('up', (index + 1) * 50)}`}
              style={{ borderColor: palette.border ?? theme.colors.border }}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="py-6 flex items-center justify-between">
                <h3
                  className="text-lg md:text-xl pr-4"
                  style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                >
                  {faq.vraag}
                </h3>
                <span
                  className={`material-symbols-outlined flex-shrink-0 transition-transform duration-300 text-xl ${openIndex === index ? 'rotate-180' : ''}`}
                  style={{ color: theme.colors.text }}
                >
                  expand_more
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p
                  className="pb-6 text-sm leading-relaxed max-w-2xl"
                  style={{ color: theme.colors.textMuted }}
                >
                  {faq.antwoord}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-12 ${getRevealClass('up', 300)}`}>
          <a href="#contact" className="inline-flex items-center gap-2 text-sm" style={{ color: theme.colors.text }}>
            Staat uw vraag er niet bij?{' '}
            <span className="underline">{ctaLabel}</span> →
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================
// PROACTIEF 1 - FAQ Cards + Sticky CTA Card
// ============================================
function FaqProactief({ theme, palette, faqs, titel, ctaLabel, beroepLabel }: FaqComponentProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="py-24 px-6 md:px-12 relative overflow-hidden"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      {/* Decorative circle */}
      <div
        className="absolute -top-12 -right-24 w-72 h-72 rounded-full opacity-[0.03]"
        style={{ backgroundColor: palette.primary }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className={`text-center max-w-xl mx-auto mb-16 ${getRevealClass('up')}`}>
          <span className="text-sm italic mb-3 block" style={{ color: palette.primary }}>
            Veelgestelde vragen
          </span>
          <h2
            className="text-4xl font-bold"
            style={{ fontFamily: theme.fonts.heading, color: palette.primaryDark }}
          >
            {titel}
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* FAQ Cards */}
          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`p-7 rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] cursor-pointer relative overflow-hidden group hover:shadow-[0_20px_50px_rgba(37,99,235,0.12)] transition-all ${getRevealClass('up', idx * 50)}`}
                style={{ backgroundColor: theme.colors.surface }}
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                {/* Top border on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(90deg, ${palette.primary}, ${palette.primaryLight})` }}
                />

                <div className="flex justify-between items-center gap-4">
                  <h4 className="font-semibold" style={{ color: theme.colors.text }}>
                    {faq.vraag}
                  </h4>
                  <div
                    className="w-8 h-8 min-w-[32px] rounded-full flex items-center justify-center"
                    style={{ backgroundColor: palette.primaryLight }}
                  >
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${openIndex === idx ? 'rotate-45' : ''}`}
                      viewBox="0 0 24 24"
                      fill={palette.primary}
                    >
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                    </svg>
                  </div>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === idx ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="mt-4 pt-4 border-t" style={{ borderColor: palette.border ?? theme.colors.border }}>
                    <p className="text-sm leading-relaxed" style={{ color: theme.colors.textMuted }}>
                      {faq.antwoord}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sticky CTA Card */}
          <div className="lg:col-span-5">
            <div className={`lg:sticky lg:top-24 ${getRevealClass('left', 200)}`}>
              <div
                className="rounded-[20px] p-8 lg:p-10"
                style={{ background: `linear-gradient(135deg, ${palette.primary} 0%, ${palette.primaryDark} 100%)` }}
              >
                <span className="material-symbols-outlined text-4xl text-white/80 mb-6 block">contact_support</span>
                <h3
                  className="text-2xl font-bold text-white mb-4"
                  style={{ fontFamily: theme.fonts.heading }}
                >
                  Staat uw vraag er niet bij?
                </h3>
                <p className="text-white/80 mb-8">
                  Neem gerust contact op. Ik help u graag verder met al uw vragen
                  {beroepLabel ? ` over ${beroepLabel.toLowerCase()}` : ''}.
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg transition-transform hover:scale-105"
                  style={{ backgroundColor: palette.bg ?? '#ffffff', color: palette.primary }}
                >
                  {ctaLabel}
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// PROACTIEF 2 - Split met Border-Left Accent
// ============================================
function FaqProactief2({ theme, palette, faqs, titel, intro, ctaLabel }: FaqComponentProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="py-24 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.surface }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Header */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px" style={{ backgroundColor: palette.primary }} />
                <span
                  className="text-xs font-semibold uppercase tracking-[0.15em]"
                  style={{ color: palette.primary }}
                >
                  FAQ
                </span>
              </div>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
                style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
              >
                {titel}
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: theme.colors.textMuted }}>
                {intro || 'Hier vindt u antwoorden op de meest gestelde vragen over mijn zorgdiensten.'}
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-colors"
                style={{ backgroundColor: palette.primary }}
              >
                {ctaLabel}
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </a>
            </div>
          </div>

          {/* Right: FAQ list with border-left */}
          <div className="lg:col-span-7">
            <div className="space-y-0">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className={`group border-l-4 cursor-pointer transition-all ${getRevealClass('up', idx * 50)}`}
                  style={{
                    borderColor: openIndex === idx ? palette.primary : 'transparent',
                    backgroundColor: openIndex === idx ? palette.primaryLight : theme.colors.backgroundAlt,
                  }}
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-4">
                      <h4 className="font-semibold" style={{ color: theme.colors.text }}>
                        {faq.vraag}
                      </h4>
                      <span
                        className={`material-symbols-outlined transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`}
                        style={{ color: palette.primary }}
                      >
                        expand_more
                      </span>
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openIndex === idx ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <p className="mt-4 text-sm leading-relaxed" style={{ color: theme.colors.textMuted }}>
                        {faq.antwoord}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// PROACTIEF 3 - Grid met Nummers + Hover Kleur
// ============================================
function FaqProactief3({ theme, palette, faqs, titel, ctaLabel }: FaqComponentProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="py-24 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 ${getRevealClass('up')}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ backgroundColor: palette.primary }} />
            <span
              className="text-xs font-semibold uppercase tracking-[0.15em]"
              style={{ color: palette.primary }}
            >
              FAQ
            </span>
            <div className="w-8 h-px" style={{ backgroundColor: palette.primary }} />
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            {titel}
          </h2>
        </div>

        {/* Grid */}
        <div
          className="grid md:grid-cols-2 gap-px"
          style={{ backgroundColor: palette.border ?? theme.colors.border }}
        >
          {faqs.map((faq, idx) => {
            const isHovered = hoveredIndex === idx;
            return (
              <div
                key={idx}
                className={`group p-8 cursor-pointer transition-colors duration-300 ${getRevealClass('up', idx * 50)}`}
                style={{
                  backgroundColor: isHovered ? palette.primary : theme.colors.surface,
                }}
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex items-start justify-between mb-4">
                  <span
                    className="text-4xl font-bold transition-colors"
                    style={{
                      fontFamily: theme.fonts.heading,
                      color: isHovered ? 'rgba(255,255,255,0.3)' : palette.primary,
                    }}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`material-symbols-outlined transition-all duration-300 ${openIndex === idx ? 'rotate-180' : ''}`}
                    style={{ color: isHovered ? 'white' : palette.primary }}
                  >
                    expand_more
                  </span>
                </div>
                <h4
                  className="font-bold mb-2 transition-colors"
                  style={{
                    fontFamily: theme.fonts.heading,
                    color: isHovered ? 'white' : theme.colors.text,
                  }}
                >
                  {faq.vraag}
                </h4>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === idx ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p
                    className="text-sm transition-colors"
                    style={{ color: isHovered ? 'rgba(255,255,255,0.8)' : theme.colors.textMuted }}
                  >
                    {faq.antwoord}
                  </p>
                </div>
              </div>
            );
          })}

          {/* CTA cell */}
          <a
            href="#contact"
            className={`group relative p-8 overflow-hidden flex flex-col justify-center ${getRevealClass('up', faqs.length * 50)}`}
          >
            <img
              src={FAQ_IMAGES.zorg2}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 transition-colors"
              style={{ backgroundColor: `${palette.primary}dd` }}
            />
            <div className="relative z-10">
              <h4
                className="font-bold mb-2 text-white"
                style={{ fontFamily: theme.fonts.heading }}
              >
                Andere vraag?
              </h4>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                {ctaLabel}
                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================
// PORTFOLIO 1 - 2-kolom Grid, Cream Cards
// ============================================
function FaqPortfolio({ theme, palette, faqs, titel }: FaqComponentProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const accentColor = palette.accent ?? palette.primary;

  return (
    <section
      id="faq"
      className="py-28 px-8 md:px-12"
      style={{ backgroundColor: theme.colors.surface }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className={`text-center max-w-[600px] mx-auto mb-16 ${getRevealClass('up')}`}>
          <span
            className="text-[13px] font-semibold uppercase tracking-[2px] mb-4 block"
            style={{ color: accentColor }}
          >
            Veelgestelde vragen
          </span>
          <h2
            className="text-[42px] font-semibold leading-[1.2]"
            style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
          >
            <SplitTitle
              titel={titel}
              style={{ color: palette.primary }}
              italicStyle={{ color: accentColor }}
            />
          </h2>
        </div>

        {/* 2-column Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-[1000px] mx-auto">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-[20px] cursor-pointer transition-all hover:shadow-[0_15px_40px_rgba(26,58,47,0.08)] ${getRevealClass('up', idx * 50)}`}
              style={{ backgroundColor: theme.colors.backgroundAlt }}
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              {/* Question */}
              <div className="flex justify-between items-center gap-4">
                <h4
                  className="text-[17px] font-semibold"
                  style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
                >
                  {faq.vraag}
                </h4>
                <div
                  className="w-9 h-9 min-w-[36px] rounded-full flex items-center justify-center transition-colors"
                  style={{
                    backgroundColor: openIndex === idx ? accentColor : theme.colors.surface,
                  }}
                >
                  <svg
                    className={`w-3.5 h-3.5 transition-all duration-300 ${openIndex === idx ? 'rotate-45' : ''}`}
                    viewBox="0 0 24 24"
                    fill={openIndex === idx ? 'white' : palette.primary}
                  >
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                  </svg>
                </div>
              </div>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === idx ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div
                  className="mt-5 pt-5 border-t"
                  style={{ borderColor: palette.border ?? theme.colors.border }}
                >
                  <p className="text-[15px] leading-[1.7]" style={{ color: theme.colors.textMuted }}>
                    {faq.antwoord}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// PORTFOLIO 2 - Split met Signature Corner Image
// ============================================
function FaqPortfolio2({ theme, palette, faqs, titel, ctaLabel }: FaqComponentProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const accentColor = palette.accent ?? palette.primary;

  return (
    <section
      id="faq"
      className="py-28 px-8 md:px-12"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Image with signature corner */}
          <div className={`relative ${getRevealClass('right', 100)}`}>
            <img
              src={FAQ_IMAGES.zorg3}
              alt="Zorgverlener"
              className="w-full aspect-[4/5] object-cover"
              style={{ borderRadius: '0 80px 0 0' }}
            />
            {/* Accent corner */}
            <div
              className="absolute -bottom-6 -right-6 w-32 h-32"
              style={{ backgroundColor: accentColor, borderRadius: '0 40px 0 0' }}
            />
          </div>

          {/* Right: FAQ */}
          <div>
            <span
              className={`text-[13px] font-semibold uppercase tracking-[2px] mb-4 block ${getRevealClass('up')}`}
              style={{ color: accentColor }}
            >
              FAQ
            </span>
            <h2
              className={`text-[38px] font-semibold leading-[1.2] mb-10 ${getRevealClass('up', 50)}`}
              style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
            >
              <SplitTitle titel={titel} style={{ color: palette.primary }} />
            </h2>

            <div className="space-y-0">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className={`border-b cursor-pointer py-6 ${getRevealClass('up', (idx + 2) * 50)}`}
                  style={{ borderColor: `${palette.primary}25` }}
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h4
                      className="text-[17px] font-medium"
                      style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
                    >
                      {faq.vraag}
                    </h4>
                    <span
                      className={`material-symbols-outlined transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`}
                      style={{ color: accentColor }}
                    >
                      expand_more
                    </span>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === idx ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="mt-4 text-[15px] leading-[1.7]" style={{ color: theme.colors.textMuted }}>
                      {faq.antwoord}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className={`mt-10 ${getRevealClass('up', 300)}`}>
              <a
                href="#contact"
                className="inline-flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[2px] transition-all hover:gap-4"
                style={{ color: palette.primary }}
              >
                Andere vraag? {ctaLabel}
                <span className="material-symbols-outlined">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// PORTFOLIO 3 - Full Width Dark + Nummers
// ============================================
function FaqPortfolio3({ theme, palette, faqs, titel, ctaLabel }: FaqComponentProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const accentColor = palette.accent ?? '#c9a87c';

  return (
    <section
      id="faq"
      className="py-28 px-8 md:px-12"
      style={{ backgroundColor: palette.primary }}
    >
      <div className="max-w-[900px] mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 ${getRevealClass('up')}`}>
          <span
            className="text-[13px] font-semibold uppercase tracking-[2px] mb-4 block"
            style={{ color: accentColor }}
          >
            FAQ
          </span>
          <h2
            className="text-[42px] font-semibold leading-[1.2] text-white"
            style={{ fontFamily: theme.fonts.heading }}
          >
            <SplitTitle
              titel={titel}
              style={{ color: 'white' }}
              italicStyle={{ color: accentColor }}
            />
          </h2>
        </div>

        {/* FAQ items */}
        <div className="space-y-0">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`border-t cursor-pointer py-8 group ${idx === faqs.length - 1 ? 'border-b' : ''} ${getRevealClass('up', (idx + 1) * 50)}`}
              style={{ borderColor: 'rgba(255,255,255,0.15)' }}
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              <div className="flex items-start gap-8">
                <span
                  className="text-[48px] font-light leading-none"
                  style={{ fontFamily: theme.fonts.heading, color: `${accentColor}66` }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <h4
                      className="text-[20px] font-medium text-white group-hover:opacity-80 transition-colors"
                      style={{ fontFamily: theme.fonts.heading }}
                    >
                      {faq.vraag}
                    </h4>
                    <span
                      className={`material-symbols-outlined transition-transform duration-300 text-white/50 ${openIndex === idx ? 'rotate-180' : ''}`}
                    >
                      expand_more
                    </span>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === idx ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="mt-4 text-[15px] leading-[1.8] text-white/70">{faq.antwoord}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center mt-12 ${getRevealClass('up', 300)}`}>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 text-[13px] font-semibold uppercase tracking-[2px] transition-all hover:gap-4"
            style={{ backgroundColor: accentColor, color: palette.primary }}
          >
            Andere vraag? {ctaLabel}
            <span className="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================
// MINDOOR 1 - Split met Image + Hover
// ============================================
function FaqMindoor({ theme, palette, faqs, titel, ctaLabel }: FaqComponentProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const accentColor = palette.accent ?? palette.primary;

  return (
    <section
      id="faq"
      className="py-20 lg:py-32"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 ${getRevealClass('up')}`}>
          <span className="text-sm font-medium mb-3 block" style={{ color: palette.primary }}>
            Veelgestelde vragen
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            <SplitTitle
              titel={titel}
              style={{ color: theme.colors.text }}
              italicStyle={{ color: palette.primary }}
            />
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isHovered = hoveredIndex === idx;
              const isAccentHover = idx === 2;
              const hoverBg = isAccentHover ? accentColor : palette.primary;

              return (
                <div
                  key={idx}
                  className={`rounded-2xl p-6 cursor-pointer transition-all duration-300 ${getRevealClass('up', (idx + 1) * 100)}`}
                  style={{
                    backgroundColor: isHovered ? hoverBg : theme.colors.surface,
                  }}
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="flex justify-between items-center">
                    <h3
                      className="font-semibold pr-4 transition-colors"
                      style={{ color: isHovered ? 'white' : theme.colors.text }}
                    >
                      {faq.vraag}
                    </h3>
                    <span
                      className={`material-symbols-outlined transition-all duration-300 ${openIndex === idx ? 'rotate-180' : ''}`}
                      style={{ color: isHovered ? 'white' : theme.colors.textMuted }}
                    >
                      expand_more
                    </span>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p
                      className="mt-4 text-sm transition-colors"
                      style={{ color: isHovered ? 'rgba(255,255,255,0.8)' : theme.colors.textMuted }}
                    >
                      {faq.antwoord}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Image */}
          <div className={`hidden lg:block overflow-hidden rounded-[32px] ${getRevealClass('left', 200)}`}>
            <img
              src={FAQ_IMAGES.zorg4}
              alt="Zorgprofessional"
              className="w-full aspect-[4/3] object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>

        {/* CTA */}
        <div className={`text-center mt-12 ${getRevealClass('up', 400)}`}>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all"
            style={{ color: palette.primary }}
          >
            Interesse in samenwerking? {ctaLabel} <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================
// MINDOOR 2 - Two Column Select Style
// ============================================
function FaqMindoor2({ theme, palette, faqs, titel, ctaLabel }: FaqComponentProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const faqIcons = ['verified', 'receipt_long', 'event_available', 'workspace_premium', 'bolt'];

  return (
    <section
      id="faq"
      className="py-20 lg:py-28"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className={`text-center mb-16 ${getRevealClass('up')}`}>
          <span className="text-sm font-medium mb-3 block" style={{ color: palette.primary }}>
            Veelgestelde vragen
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            <SplitTitle
              titel={titel}
              style={{ color: theme.colors.text }}
              italicStyle={{ color: palette.primary }}
            />
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Question buttons */}
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <button
                key={idx}
                className={`w-full text-left p-5 rounded-2xl transition-all flex items-center justify-between gap-4 ${getRevealClass('up', (idx + 1) * 50)}`}
                style={{
                  backgroundColor: selectedIndex === idx ? palette.primary : theme.colors.surface,
                  color: selectedIndex === idx ? 'white' : theme.colors.text,
                }}
                onClick={() => setSelectedIndex(idx)}
              >
                <span className="font-medium">{faq.vraag}</span>
                <span className="material-symbols-outlined text-xl" style={{ opacity: 0.7 }}>
                  arrow_forward
                </span>
              </button>
            ))}
          </div>

          {/* Right: Answer panel */}
          <div className="relative">
            <div className="lg:sticky lg:top-24">
              <div
                className={`rounded-[28px] p-8 lg:p-10 ${getRevealClass('left', 100)}`}
                style={{ backgroundColor: theme.colors.surface }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: palette.primaryLight }}
                >
                  <span className="material-symbols-outlined text-2xl" style={{ color: palette.primary }}>
                    {faqIcons[selectedIndex] || 'help'}
                  </span>
                </div>
                <h3
                  className="text-2xl font-semibold mb-4"
                  style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                >
                  {faqs[selectedIndex]?.vraag}
                </h3>
                <p className="text-lg leading-relaxed mb-6" style={{ color: theme.colors.textMuted }}>
                  {faqs[selectedIndex]?.antwoord}
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all"
                  style={{ color: palette.primary }}
                >
                  {ctaLabel} <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// MINDOOR 3 - Full Width Accordion + Sticky CTA
// ============================================
function FaqMindoor3({ theme, palette, faqs, titel, ctaLabel }: FaqComponentProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="py-20 lg:py-28"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* FAQ Items */}
          <div className="lg:col-span-8">
            {/* Header */}
            <div className={`mb-10 ${getRevealClass('up')}`}>
              <span className="text-sm font-medium mb-3 block" style={{ color: palette.primary }}>
                Veelgestelde vragen
              </span>
              <h2
                className="text-3xl sm:text-4xl"
                style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
              >
                <SplitTitle
                  titel={titel}
                  style={{ color: theme.colors.text }}
                  italicStyle={{ color: palette.primary }}
                />
              </h2>
            </div>

            {/* Accordion */}
            <div className="space-y-0">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className={`border-b py-6 cursor-pointer ${getRevealClass('up', (idx + 1) * 50)}`}
                  style={{ borderColor: `${palette.primary}33` }}
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                >
                  <div className="flex justify-between items-center gap-4">
                    <h4 className="text-lg font-medium" style={{ color: theme.colors.text }}>
                      {faq.vraag}
                    </h4>
                    <span
                      className={`material-symbols-outlined transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`}
                      style={{ color: palette.primary }}
                    >
                      expand_more
                    </span>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="mt-4 leading-relaxed" style={{ color: theme.colors.textMuted }}>
                      {faq.antwoord}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sticky CTA */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <div
                className={`rounded-[28px] p-8 text-center ${getRevealClass('left', 100)}`}
                style={{ backgroundColor: palette.primary }}
              >
                <span className="material-symbols-outlined text-4xl text-white/70 mb-4 block">handshake</span>
                <h3
                  className="text-xl font-medium text-white mb-3"
                  style={{ fontFamily: theme.fonts.heading }}
                >
                  Klaar om samen te werken?
                </h3>
                <p className="text-white/70 text-sm mb-6">
                  Neem contact op voor een vrijblijvende kennismaking.
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full transition-transform hover:scale-105"
                  style={{ backgroundColor: palette.bg ?? '#ffffff', color: palette.primary }}
                >
                  {ctaLabel}
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </a>
              </div>

              {/* Small image */}
              <div className="mt-5 rounded-[24px] overflow-hidden hidden lg:block">
                <img
                  src={FAQ_IMAGES.zorg5}
                  alt="Zorg sfeer"
                  className="w-full h-48 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// SERENE 1 - FAQ + Sticky DBA Statement Rechts
// ============================================
function FaqSerene({ theme, palette, faqs, titel, intro, ctaLabel }: FaqComponentProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="px-6 md:px-12 py-24 lg:py-32"
      style={{ backgroundColor: theme.colors.surface, fontFamily: theme.fonts.body }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`mb-16 ${getRevealClass('up')}`}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px" style={{ backgroundColor: palette.primary }} />
            <p
              className="text-[9px] uppercase tracking-[3px]"
              style={{ color: theme.colors.textMuted }}
            >
              FAQ
            </p>
          </div>
          <h2
            className="text-4xl lg:text-5xl"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            {titel}
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: FAQ accordion */}
          <div className="lg:col-span-7">
            <div className="border-t" style={{ borderColor: palette.border ?? theme.colors.border }}>
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className={`cursor-pointer ${getRevealClass('up', idx * 50)}`}
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                >
                  <div
                    className="py-6 flex justify-between items-center gap-6 border-b"
                    style={{ borderColor: palette.border ?? theme.colors.border }}
                  >
                    <h4
                      className="text-lg lg:text-xl"
                      style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                    >
                      {faq.vraag}
                    </h4>
                    <span
                      className="text-xl font-light transition-all duration-300"
                      style={{ color: palette.primary }}
                    >
                      {openIndex === idx ? '−' : '+'}
                    </span>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === idx ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="py-5 leading-[1.9] text-sm" style={{ color: theme.colors.textMuted }}>
                      {faq.antwoord}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA onder FAQ */}
            <div className={`mt-10 flex items-center gap-4 ${getRevealClass('up', 300)}`}>
              <a
                href="#contact"
                className="text-[10px] uppercase tracking-[2px]"
                style={{ color: palette.primary }}
              >
                Andere vraag? {ctaLabel}
              </a>
              <div className="flex-1 h-px" style={{ backgroundColor: palette.border ?? theme.colors.border }} />
              <span className="material-symbols-outlined text-sm" style={{ color: palette.primary }}>
                arrow_forward
              </span>
            </div>
          </div>

          {/* Right: Sticky DBA Statement */}
          <div className="lg:col-span-5">
            <div className={`lg:sticky lg:top-24 ${getRevealClass('left', 200)}`}>
              <div className="p-8 lg:p-10" style={{ backgroundColor: theme.colors.backgroundAlt }}>
                <div className="w-8 h-px mb-6" style={{ backgroundColor: palette.primary }} />
                <p
                  className="text-[9px] uppercase tracking-[3px] mb-4"
                  style={{ color: theme.colors.textMuted }}
                >
                  Zekerheid
                </p>
                <h3
                  className="text-2xl lg:text-3xl mb-6"
                  style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                >
                  Ik werk 100%
                  <br />
                  DBA-compliant
                </h3>
                <p className="text-sm leading-[1.8] mb-8" style={{ color: theme.colors.textMuted }}>
                  Dit betekent dat u als instelling of bemiddelaar zonder risico op schijnzelfstandigheid met mij kunt
                  samenwerken. Alle documentatie en werkwijzen zijn hierop ingericht.
                </p>
                <div className="space-y-3 text-sm" style={{ color: theme.colors.text }}>
                  {['Eigen opdrachten', 'Vrije vervanging mogelijk', 'Geen gezagsverhouding'].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-base" style={{ color: palette.primary }}>
                        check
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
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
// SERENE 2 - Statement Boven + 2-Koloms FAQ
// ============================================
function FaqSerene2({ theme, palette, faqs, titel, intro, ctaLabel }: FaqComponentProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const midpoint = Math.ceil(faqs.length / 2);
  const leftFaqs = faqs.slice(0, midpoint);
  const rightFaqs = faqs.slice(midpoint);

  const complianceItems = ['Eigen opdrachten', 'Vrije vervanging mogelijk', 'Geen gezagsverhouding'];

  return (
    <section
      id="faq"
      className="px-6 md:px-12 py-24 lg:py-32"
      style={{ backgroundColor: theme.colors.backgroundAlt, fontFamily: theme.fonts.body }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Top: Statement Block */}
        <div className={`mb-20 grid lg:grid-cols-2 gap-8 lg:gap-16 items-end ${getRevealClass('up')}`}>
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px" style={{ backgroundColor: palette.primary }} />
              <p className="text-[9px] uppercase tracking-[3px]" style={{ color: theme.colors.textMuted }}>
                Voor opdrachtgevers
              </p>
            </div>
            <h2
              className="text-4xl lg:text-5xl"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              Ik werk volledig DBA-compliant
            </h2>
          </div>
          <div>
            <p className="text-sm leading-[1.9] mb-6" style={{ color: theme.colors.textMuted }}>
              U kunt zonder risico op schijnzelfstandigheid met mij samenwerken. Mijn werkwijze, facturatie en
              documentatie zijn volledig ingericht op de huidige wet- en regelgeving.
            </p>
            <div
              className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm"
              style={{ color: theme.colors.text }}
            >
              {complianceItems.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base" style={{ color: palette.primary }}>
                    check
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mb-16" style={{ backgroundColor: palette.border ?? theme.colors.border }} />

        {/* FAQ in 2 columns */}
        <div>
          <p
            className={`text-[9px] uppercase tracking-[3px] mb-10 ${getRevealClass('up')}`}
            style={{ color: theme.colors.textMuted }}
          >
            Veelgestelde vragen
          </p>

          <div className="grid md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-0">
            {/* Column 1 */}
            <div>
              {leftFaqs.map((faq, idx) => (
                <div
                  key={idx}
                  className={`cursor-pointer ${getRevealClass('up', idx * 50)}`}
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                >
                  <div
                    className="py-5 flex justify-between items-start gap-4 border-b"
                    style={{ borderColor: palette.border ?? theme.colors.border }}
                  >
                    <h4 className="text-lg" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>
                      {faq.vraag}
                    </h4>
                    <span className="text-base font-light mt-1" style={{ color: palette.primary }}>
                      {openIndex === idx ? '−' : '+'}
                    </span>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === idx ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="py-4 text-sm leading-[1.8]" style={{ color: theme.colors.textMuted }}>
                      {faq.antwoord}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 2 */}
            <div>
              {rightFaqs.map((faq, idx) => {
                const actualIdx = idx + midpoint;
                return (
                  <div
                    key={actualIdx}
                    className={`cursor-pointer ${getRevealClass('up', (idx + midpoint) * 50)}`}
                    onClick={() => setOpenIndex(openIndex === actualIdx ? null : actualIdx)}
                  >
                    <div
                      className="py-5 flex justify-between items-start gap-4 border-b"
                      style={{ borderColor: palette.border ?? theme.colors.border }}
                    >
                      <h4 className="text-lg" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>
                        {faq.vraag}
                      </h4>
                      <span className="text-base font-light mt-1" style={{ color: palette.primary }}>
                        {openIndex === actualIdx ? '−' : '+'}
                      </span>
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openIndex === actualIdx ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <p className="py-4 text-sm leading-[1.8]" style={{ color: theme.colors.textMuted }}>
                        {faq.antwoord}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className={`mt-16 text-center ${getRevealClass('up', 300)}`}>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-6 py-3 text-[10px] uppercase tracking-[2px] border transition-colors"
            style={{ color: palette.primary, borderColor: palette.primary }}
          >
            {ctaLabel}
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================
// SERENE 3 - FAQ Links + Groot Statement Rechts
// ============================================
function FaqSerene3({ theme, palette, faqs, titel, intro, ctaLabel }: FaqComponentProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const complianceItems = ['Eigen opdrachten', 'Vrije vervanging mogelijk', 'Geen gezagsverhouding'];

  return (
    <section
      id="faq"
      className="px-6 md:px-12 py-24 lg:py-32"
      style={{ backgroundColor: theme.colors.surface, fontFamily: theme.fonts.body }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-0">
          {/* Left: FAQ */}
          <div
            className="lg:col-span-5 lg:pr-12 xl:pr-16 lg:border-r"
            style={{ borderColor: palette.border ?? theme.colors.border }}
          >
            <div className={`flex items-center gap-4 mb-8 ${getRevealClass('up')}`}>
              <div className="w-8 h-px" style={{ backgroundColor: palette.primary }} />
              <p className="text-[9px] uppercase tracking-[3px]" style={{ color: theme.colors.textMuted }}>
                FAQ
              </p>
            </div>

            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`cursor-pointer ${getRevealClass('up', idx * 50)}`}
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <div
                  className="py-5 flex justify-between items-center gap-4 border-b"
                  style={{ borderColor: palette.border ?? theme.colors.border }}
                >
                  <h4
                    className="text-lg lg:text-xl"
                    style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                  >
                    {faq.vraag}
                  </h4>
                  <span className="text-base font-light" style={{ color: palette.primary }}>
                    {openIndex === idx ? '−' : '+'}
                  </span>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === idx ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="py-5 text-sm leading-[1.8]" style={{ color: theme.colors.textMuted }}>
                    {faq.antwoord}
                  </p>
                </div>
              </div>
            ))}

            <a
              href="#contact"
              className={`inline-flex items-center gap-2 mt-8 text-[10px] uppercase tracking-[2px] ${getRevealClass('up', 300)}`}
              style={{ color: palette.primary }}
            >
              Meer vragen?
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>

          {/* Right: Big Statement */}
          <div className="lg:col-span-7 lg:pl-12 xl:pl-16 flex flex-col justify-center">
            <div className={`lg:sticky lg:top-24 ${getRevealClass('left', 100)}`}>
              <p className="text-[9px] uppercase tracking-[3px] mb-6" style={{ color: theme.colors.textMuted }}>
                Compliance
              </p>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-6 lg:mb-8 leading-[1.1]"
                style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
              >
                Ik werk
                <br />
                DBA-compliant
              </h2>
              <div className="w-12 lg:w-16 h-px mb-6 lg:mb-8" style={{ backgroundColor: palette.primary }} />
              <p className="text-sm leading-[1.9] max-w-md mb-8 lg:mb-10" style={{ color: theme.colors.textMuted }}>
                U kunt zonder risico op schijnzelfstandigheid met mij samenwerken. Mijn werkwijze en documentatie zijn
                volledig ingericht op de huidige wet- en regelgeving.
              </p>
              <div
                className="flex flex-col sm:flex-row lg:flex-col gap-3 sm:gap-5 lg:gap-3 text-sm"
                style={{ color: theme.colors.text }}
              >
                {complianceItems.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-base" style={{ color: palette.primary }}>
                      check
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// ACCORDION - Klassieke accordion (legacy)
// ============================================
function FaqAccordion({ theme, palette, faqs, titel }: FaqComponentProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="py-20 md:py-28 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-12 ${getRevealClass('up')}`}>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            {titel}
          </h2>
        </div>

        {/* Accordion */}
        <div
          className="rounded-xl overflow-hidden border"
          style={{
            backgroundColor: theme.colors.surface,
            borderColor: palette.border ?? theme.colors.border,
          }}
        >
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={index > 0 ? 'border-t' : ''}
              style={index > 0 ? { borderColor: palette.border ?? theme.colors.border } : {}}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-black/5"
              >
                <span className="font-medium pr-4" style={{ color: theme.colors.text }}>
                  {faq.vraag}
                </span>
                <span
                  className={`material-symbols-outlined flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-45' : ''}`}
                  style={{ color: palette.primary }}
                >
                  add
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: theme.colors.textMuted }}>
                  {faq.antwoord}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// GRID - 2-kolom grid layout (legacy)
// ============================================
function FaqGrid({ theme, palette, faqs, titel }: FaqComponentProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="py-20 md:py-28 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 ${getRevealClass('up')}`}>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            {titel}
          </h2>
          <p style={{ color: theme.colors.textMuted }}>Antwoorden op veelgestelde vragen</p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 hover:shadow-lg ${getRevealClass('up', (index % 2) + 1)}`}
              style={{
                backgroundColor: theme.colors.surface,
                borderColor: openIndex === index ? palette.primary : (palette.border ?? theme.colors.border),
              }}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-semibold" style={{ color: theme.colors.text }}>
                  {faq.vraag}
                </h3>
                <span
                  className={`material-symbols-outlined flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                  style={{ color: palette.primary }}
                >
                  expand_more
                </span>
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 mt-4 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-sm leading-relaxed" style={{ color: theme.colors.textMuted }}>
                  {faq.antwoord}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// SIMPLE - Simpele lijst, altijd open (legacy)
// ============================================
function FaqSimple({ theme, palette, faqs, titel }: FaqComponentProps) {
  return (
    <section
      id="faq"
      className="py-20 md:py-28 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className={`mb-12 ${getRevealClass('up')}`}>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            {titel}
          </h2>
        </div>

        {/* Simple list */}
        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className={getRevealClass('up', Math.min(index + 1, 3))}>
              <h3 className="font-semibold mb-2 flex items-start gap-3" style={{ color: theme.colors.text }}>
                <span className="material-symbols-outlined text-lg mt-0.5" style={{ color: palette.primary }}>
                  help
                </span>
                {faq.vraag}
              </h3>
              <p className="text-sm leading-relaxed ml-8" style={{ color: theme.colors.textMuted }}>
                {faq.antwoord}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FaqSection;