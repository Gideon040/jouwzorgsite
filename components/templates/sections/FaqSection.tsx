// components/templates/sections/FaqSection.tsx
// FAQ section met 3 style varianten: accordion, grid, simple

'use client';

import { useState } from 'react';
import { BaseSectionProps, FaqStyle, getRevealClass } from './types';

interface FaqSectionProps extends BaseSectionProps {
  style: FaqStyle;
}

// Default FAQ items gebaseerd op zorg
const DEFAULT_FAQS = [
  {
    vraag: "Wat zijn uw werktijden?",
    antwoord: "Ik ben flexibel inzetbaar, ook in de avonden en weekenden. Samen bekijken we wat het beste past bij uw situatie."
  },
  {
    vraag: "Werkt u ook met PGB?",
    antwoord: "Ja, ik werk zowel met zorg in natura als met PGB (persoonsgebonden budget). Ik help u graag met de administratie hiervan."
  },
  {
    vraag: "In welke regio bent u werkzaam?",
    antwoord: "Ik ben werkzaam in de regio en omstreken. Neem contact op om te kijken of ik bij u in de buurt kan komen."
  },
  {
    vraag: "Hoe verloopt een eerste kennismaking?",
    antwoord: "Bij een eerste kennismaking kom ik vrijblijvend langs om kennis te maken en uw zorgvraag te bespreken. Zo kunnen we samen kijken wat u nodig heeft."
  },
  {
    vraag: "Bent u BIG-geregistreerd?",
    antwoord: "Ja, ik ben BIG-geregistreerd. Dit garandeert dat ik voldoe aan de kwaliteitseisen voor zorgverleners in Nederland."
  },
  {
    vraag: "Wat kost uw zorg?",
    antwoord: "De kosten zijn afhankelijk van uw situatie en de indicatie. Vaak wordt de zorg vergoed via de zorgverzekering of WMO. Ik adviseer u graag over de mogelijkheden."
  },
];

// Beroep-specifieke FAQs
const BEROEP_FAQS: Record<string, typeof DEFAULT_FAQS> = {
  kraamverzorgende: [
    { vraag: "Wanneer moet ik kraamzorg aanvragen?", antwoord: "Het is aan te raden om rond de 12e-16e week van uw zwangerschap kraamzorg aan te vragen. Zo heeft u voldoende tijd om alles te regelen." },
    { vraag: "Hoeveel uur kraamzorg krijg ik?", antwoord: "De indicatie wordt gesteld door het Landelijk Indicatieprotocol Kraamzorg (LIP). Gemiddeld ontvangt u 40-50 uur kraamzorg verspreid over 8-10 dagen." },
    { vraag: "Wat doet een kraamverzorgende precies?", antwoord: "Ik ondersteun bij de verzorging van moeder en baby, geef voorlichting over borstvoeding, help bij het huishouden en signaleer eventuele gezondheidsproblemen." },
    { vraag: "Komt u ook 's nachts?", antwoord: "Standaard werk ik overdag, maar in overleg zijn er mogelijkheden voor avond- of nachtdiensten bij bijzondere situaties." },
    { vraag: "Vergoedt de verzekering kraamzorg?", antwoord: "Ja, kraamzorg zit in het basispakket van uw zorgverzekering. U betaalt alleen een eigen bijdrage van ongeveer €4,80 per uur." },
  ],
  ggz: [
    { vraag: "Hoe ziet een eerste gesprek eruit?", antwoord: "In het eerste gesprek maken we kennis en bespreken we uw hulpvraag. Dit is vrijblijvend en geeft ons beiden de kans om te kijken of er een klik is." },
    { vraag: "Is alles wat ik vertel vertrouwelijk?", antwoord: "Ja, ik heb een beroepsgeheim. Alles wat u met mij deelt blijft tussen ons, tenzij er sprake is van een noodsituatie." },
    { vraag: "Hoelang duurt een behandeltraject?", antwoord: "Dit verschilt per persoon en hulpvraag. Samen stellen we doelen op en evalueren we regelmatig of de behandeling nog aansluit bij uw behoeften." },
    { vraag: "Kan ik de zorg vergoed krijgen?", antwoord: "Veel GGZ-zorg wordt vergoed vanuit de basisverzekering of via een PGB. Ik help u graag om de mogelijkheden te verkennen." },
    { vraag: "Wat als het niet klikt?", antwoord: "Een goede vertrouwensband is essentieel. Als het niet klikt, is dat geen probleem en help ik u graag verder naar een passende collega." },
  ],
};

export function FaqSection({ style, theme, palette, content, generated, beroepLabel }: FaqSectionProps) {
  // Kies FAQs op basis van beroep, of gebruik defaults
  const beroep = beroepLabel?.toLowerCase() || '';
  let faqs = DEFAULT_FAQS;
  
  if (beroep.includes('kraam')) {
    faqs = BEROEP_FAQS.kraamverzorgende;
  } else if (beroep.includes('ggz') || beroep.includes('psychi')) {
    faqs = BEROEP_FAQS.ggz;
  }
  
  // Als er generated FAQs zijn, gebruik die
  const gen = generated as any;
  if (gen?.faq?.items?.length) {
    faqs = gen.faq.items;
  }
  
  switch (style) {
    case 'accordion':
      return <FaqAccordion {...{ theme, palette, faqs }} />;
    case 'grid':
      return <FaqGrid {...{ theme, palette, faqs }} />;
    case 'simple':
      return <FaqSimple {...{ theme, palette, faqs }} />;
    default:
      return <FaqAccordion {...{ theme, palette, faqs }} />;
  }
}

// ============================================
// ACCORDION - Uitklapbare items
// ============================================
function FaqAccordion({ theme, palette, faqs }: any) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  return (
    <section 
      className={`${theme.spacing.section} px-6 md:px-12`}
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
          <p style={{ color: theme.colors.textMuted }}>
            Heeft u een andere vraag? Neem gerust contact op.
          </p>
        </div>
        
        {/* Accordion */}
        <div className={`space-y-3 ${getRevealClass('up', 1)}`}>
          {faqs.slice(0, 6).map((faq: any, i: number) => (
            <div 
              key={i}
              className={`border ${theme.radius.medium} overflow-hidden`}
              style={{ borderColor: theme.colors.border, backgroundColor: theme.colors.surface }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span 
                  className="font-semibold pr-4"
                  style={{ color: theme.colors.text }}
                >
                  {faq.vraag}
                </span>
                <span 
                  className={`material-symbols-outlined transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
                  style={{ color: palette.primary }}
                >
                  expand_more
                </span>
              </button>
              {openIndex === i && (
                <div 
                  className="px-5 pb-5"
                  style={{ color: theme.colors.textMuted }}
                >
                  {faq.antwoord}
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
// GRID - 2 kolommen grid
// ============================================
function FaqGrid({ theme, palette, faqs }: any) {
  return (
    <section 
      className={`${theme.spacing.section} px-6 md:px-12`}
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className={`${theme.spacing.container} mx-auto`}>
        {/* Header */}
        <div className={`mb-12 ${getRevealClass('up')}`}>
          <p 
            className="text-sm font-bold uppercase tracking-widest mb-2"
            style={{ color: palette.primary }}
          >
            FAQ
          </p>
          <h2 
            className="text-3xl md:text-4xl font-bold"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            Veelgestelde vragen
          </h2>
        </div>
        
        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {faqs.slice(0, 6).map((faq: any, i: number) => (
            <div 
              key={i}
              className={`${getRevealClass('up', (i % 2) + 1)}`}
            >
              <div className="flex gap-4">
                <span 
                  className="material-symbols-outlined text-xl flex-shrink-0 mt-1"
                  style={{ color: palette.primary }}
                >
                  help
                </span>
                <div>
                  <h3 
                    className="font-bold mb-2"
                    style={{ color: theme.colors.text }}
                  >
                    {faq.vraag}
                  </h3>
                  <p style={{ color: theme.colors.textMuted }}>
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
// SIMPLE - Simpele lijst (minimal style)
// ============================================
function FaqSimple({ theme, palette, faqs }: any) {
  return (
    <section 
      className={`${theme.spacing.section} px-6`}
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <h2 
          className={`text-xs uppercase tracking-[0.3em] text-center mb-16 ${getRevealClass('up')}`}
          style={{ color: palette.primary }}
        >
          Veelgestelde vragen
        </h2>
        
        {/* List */}
        <div className="space-y-10">
          {faqs.slice(0, 5).map((faq: any, i: number) => (
            <div 
              key={i}
              className={`text-center ${getRevealClass('up', (i % 3) + 1)}`}
            >
              <h3 
                className="text-lg font-medium mb-3"
                style={{ color: theme.colors.text }}
              >
                {faq.vraag}
              </h3>
              <p 
                className="leading-relaxed"
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
