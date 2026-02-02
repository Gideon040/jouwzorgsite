// components/templates/sections/FaqSection.tsx
// FAQ sectie met clickable accordion

'use client';

import { useState } from 'react';
import { BaseSectionProps, FaqStyle, getRevealClass, DEFAULT_FAQS } from './types';

interface FaqSectionProps extends BaseSectionProps {
  style?: FaqStyle;
}

export function FaqSection({ 
  style = 'editorial', 
  theme, 
  palette, 
  content, 
  generated,
  beroepLabel,
}: FaqSectionProps) {
  // Edge function genereert: { titel, intro, items: [{ vraag, antwoord }] }
  const faqContent = generated?.faq;
  const faqs = faqContent?.items || DEFAULT_FAQS;
  const titel = faqContent?.titel || 'Veelgestelde vragen';
  const intro = faqContent?.intro;
  
  if (!faqs || !faqs.length) return null;
  
  switch (style) {
    case 'editorial':
      return <FaqEditorial {...{ theme, palette, faqs }} />;
    case 'proactief':
      return <FaqProactief {...{ theme, palette, faqs }} />;
    case 'portfolio':
      return <FaqPortfolio {...{ theme, palette, faqs }} />;
    case 'mindoor':
      return <FaqMindoor {...{ theme, palette, faqs }} />;
    case 'accordion':
      return <FaqAccordion {...{ theme, palette, faqs }} />;
    case 'grid':
      return <FaqGrid {...{ theme, palette, faqs }} />;
    case 'simple':
      return <FaqSimple {...{ theme, palette, faqs }} />;
    default:
      return <FaqEditorial {...{ theme, palette, faqs }} />;
  }
}

// ============================================
// EDITORIAL - Stijlvolle accordion in editorial stijl
// ============================================
function FaqEditorial({ theme, palette, faqs }: any) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
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
            style={{ fontVariant: 'small-caps', color: palette.primary }}
          >
            Veelgestelde vragen
          </span>
          <h2 
            className="text-3xl md:text-4xl"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            Heeft u vragen?
          </h2>
        </div>
        
        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq: any, index: number) => (
            <div 
              key={index}
              className={`rounded-lg overflow-hidden border transition-all duration-300 ${getRevealClass('up', Math.min(index + 1, 3))}`}
              style={{ 
                backgroundColor: theme.colors.surface,
                borderColor: openIndex === index ? palette.primary : theme.colors.border
              }}
            >
              {/* Question - Clickable */}
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-6 text-left transition-colors hover:bg-black/5"
              >
                <span 
                  className="font-semibold pr-4"
                  style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                >
                  {faq.vraag}
                </span>
                <span 
                  className={`material-symbols-outlined flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                  style={{ color: palette.primary }}
                >
                  expand_more
                </span>
              </button>
              
              {/* Answer - Collapsible */}
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div 
                  className="px-6 pb-6 text-sm leading-relaxed"
                  style={{ color: theme.colors.textMuted }}
                >
                  {faq.antwoord}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA */}
        <div className={`text-center mt-12 ${getRevealClass('up', 3)}`}>
          <p 
            className="text-sm mb-4"
            style={{ color: theme.colors.textMuted }}
          >
            Staat uw vraag er niet bij?
          </p>
          <a 
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 text-white text-sm font-semibold uppercase tracking-widest rounded transition-colors"
            style={{ backgroundColor: palette.primary }}
          >
            Neem contact op
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </a>
        </div>
        
      </div>
    </section>
  );
}

// ============================================
// PROACTIEF - 2-kolom grid, + icon toggle, cards
// ============================================
function FaqProactief({ theme, palette, faqs }: any) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <section 
      id="faq"
      className="py-24 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`text-center max-w-xl mx-auto mb-16 ${getRevealClass('up')}`}>
          <span 
            className="text-sm italic mb-3 block"
            style={{ color: palette.primary }}
          >
            Veelgestelde vragen
          </span>
          <h2 
            className="text-4xl font-bold"
            style={{ fontFamily: theme.fonts.heading, color: palette.primaryDark || palette.primary }}
          >
            Heeft u vragen?
          </h2>
        </div>
        
        {/* 2-column Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {faqs.map((faq: any, idx: number) => (
            <div 
              key={idx}
              className={`bg-white rounded-2xl p-7 shadow-[0_5px_20px_rgba(0,0,0,0.03)] cursor-pointer transition-shadow hover:shadow-[0_10px_30px_rgba(0,153,204,0.08)] ${getRevealClass('up', idx * 100)}`}
              onClick={() => toggleFaq(idx)}
            >
              {/* Question */}
              <div className="flex justify-between items-center gap-4">
                <h4 
                  className="font-semibold"
                  style={{ color: theme.colors.text }}
                >
                  {faq.vraag}
                </h4>
                <div 
                  className="w-8 h-8 min-w-[32px] rounded-full flex items-center justify-center transition-colors"
                  style={{ backgroundColor: palette.primaryLight || `${palette.primary}15` }}
                >
                  <svg 
                    className={`w-4 h-4 transition-transform ${openIndex === idx ? 'rotate-45' : ''}`}
                    viewBox="0 0 24 24"
                    fill={palette.primary}
                  >
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                  </svg>
                </div>
              </div>
              
              {/* Answer */}
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === idx ? 'max-h-48 mt-4 pt-4 border-t' : 'max-h-0'
                }`}
                style={{ borderColor: theme.colors.border }}
              >
                <p 
                  className="text-sm leading-relaxed"
                  style={{ color: theme.colors.textMuted }}
                >
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
// PORTFOLIO - 2-kolom grid, cream cards, + toggle
// ============================================
function FaqPortfolio({ theme, palette, faqs }: any) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <section 
      id="faq"
      className="py-28 px-8 md:px-12"
      style={{ backgroundColor: 'white' }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className={`text-center max-w-[600px] mx-auto mb-16 ${getRevealClass('up')}`}>
          <span 
            className="text-[13px] font-semibold uppercase tracking-[2px] mb-4 block"
            style={{ color: palette.accent || palette.primary }}
          >
            Veelgestelde vragen
          </span>
          <h2 
            className="text-[42px] font-semibold leading-[1.2]"
            style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
          >
            Praktische <em className="italic" style={{ color: palette.accent || palette.primary }}>informatie</em>
          </h2>
        </div>
        
        {/* 2-column Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-[1000px] mx-auto">
          {faqs.map((faq: any, idx: number) => (
            <div 
              key={idx}
              className={`p-8 rounded-[20px] cursor-pointer transition-all hover:shadow-[0_15px_40px_rgba(26,58,47,0.08)] ${getRevealClass('up', idx * 100)}`}
              style={{ backgroundColor: theme.colors.backgroundAlt }}
              onClick={() => toggleFaq(idx)}
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
                  className="w-9 h-9 min-w-[36px] rounded-full flex items-center justify-center bg-white transition-colors"
                  style={{ 
                    backgroundColor: openIndex === idx ? (palette.accent || palette.primary) : 'white'
                  }}
                >
                  <svg 
                    className={`w-3.5 h-3.5 transition-all ${openIndex === idx ? 'rotate-45' : ''}`}
                    viewBox="0 0 24 24"
                    fill={openIndex === idx ? 'white' : palette.primary}
                  >
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                  </svg>
                </div>
              </div>
              
              {/* Answer */}
              {openIndex === idx && (
                <div className="mt-5 pt-5 border-t border-black/10">
                  <p 
                    className="text-[15px] leading-[1.7]"
                    style={{ color: theme.colors.textMuted }}
                  >
                    {faq.antwoord}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// MINDOOR - 2-col met image, white cards accordion
// ============================================
function FaqMindoor({ theme, palette, faqs }: any) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <section 
      id="faq"
      className="py-20 lg:py-32"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 ${getRevealClass('up')}`}>
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl"
            style={{ fontFamily: theme.fonts.heading }}
          >
            Veelgestelde Vragen
          </h2>
          <p className="mt-4 max-w-2xl mx-auto" style={{ color: theme.colors.textMuted }}>
            Thuiszorg kan veel vragen oproepen. Hier vindt u antwoorden op de meest gestelde vragen.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq: any, idx: number) => (
              <div 
                key={idx}
                className={`bg-white rounded-2xl p-6 cursor-pointer transition-shadow hover:shadow-lg ${getRevealClass('up', (idx + 1) * 100)}`}
                onClick={() => toggleFaq(idx)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold pr-4" style={{ color: theme.colors.text }}>
                    {faq.vraag}
                  </h3>
                  <span 
                    className={`material-symbols-outlined transition-transform ${openIndex === idx ? 'rotate-180' : ''}`}
                    style={{ color: theme.colors.textMuted }}
                  >
                    expand_more
                  </span>
                </div>
                
                {openIndex === idx && (
                  <div className="mt-4 pt-4 border-t" style={{ borderColor: theme.colors.border }}>
                    <p style={{ color: theme.colors.textMuted }}>
                      {faq.antwoord}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Image */}
          <div className={`hidden lg:block overflow-hidden rounded-3xl shadow-xl ${getRevealClass('left', 200)}`}>
            <img 
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
              alt="Zorgprofessional in gesprek"
              className="w-full aspect-[4/3] object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// ACCORDION - Klassieke accordion
// ============================================
function FaqAccordion({ theme, palette, faqs }: any) {
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
            Veelgestelde vragen
          </h2>
        </div>
        
        {/* Accordion */}
        <div 
          className="rounded-xl overflow-hidden border"
          style={{ 
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
          }}
        >
          {faqs.map((faq: any, index: number) => (
            <div 
              key={index}
              className={index > 0 ? 'border-t' : ''}
              style={index > 0 ? { borderColor: theme.colors.border } : {}}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-black/5"
              >
                <span 
                  className="font-medium pr-4"
                  style={{ color: theme.colors.text }}
                >
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
                <div 
                  className="px-5 pb-5 text-sm leading-relaxed"
                  style={{ color: theme.colors.textMuted }}
                >
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
// GRID - 2-kolom grid layout
// ============================================
function FaqGrid({ theme, palette, faqs }: any) {
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
            FAQ
          </h2>
          <p style={{ color: theme.colors.textMuted }}>
            Antwoorden op veelgestelde vragen
          </p>
        </div>
        
        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {faqs.map((faq: any, index: number) => (
            <div 
              key={index}
              className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 hover:shadow-lg ${getRevealClass('up', (index % 2) + 1)}`}
              style={{ 
                backgroundColor: theme.colors.surface,
                borderColor: openIndex === index ? palette.primary : theme.colors.border
              }}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 
                  className="font-semibold"
                  style={{ color: theme.colors.text }}
                >
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
                <p 
                  className="text-sm leading-relaxed"
                  style={{ color: theme.colors.textMuted }}
                >
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
// SIMPLE - Simpele lijst, altijd open
// ============================================
function FaqSimple({ theme, palette, faqs }: any) {
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
            Veelgestelde vragen
          </h2>
        </div>
        
        {/* Simple list */}
        <div className="space-y-8">
          {faqs.map((faq: any, index: number) => (
            <div 
              key={index}
              className={getRevealClass('up', Math.min(index + 1, 3))}
            >
              <h3 
                className="font-semibold mb-2 flex items-start gap-3"
                style={{ color: theme.colors.text }}
              >
                <span 
                  className="material-symbols-outlined text-lg mt-0.5"
                  style={{ color: palette.primary }}
                >
                  help
                </span>
                {faq.vraag}
              </h3>
              <p 
                className="text-sm leading-relaxed ml-8"
                style={{ color: theme.colors.textMuted }}
              >
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