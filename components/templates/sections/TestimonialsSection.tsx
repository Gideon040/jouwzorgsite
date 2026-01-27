// components/templates/sections/TestimonialsSection.tsx
// Testimonials section met 3 style varianten: cards, carousel, single

'use client';

import { BaseSectionProps, TestimonialsStyle, getRevealClass } from './types';

interface TestimonialsSectionProps extends BaseSectionProps {
  style: TestimonialsStyle;
}

// Default testimonials als er geen zijn
const DEFAULT_TESTIMONIALS = [
  {
    tekst: "Zeer professionele en persoonlijke zorg. Voelt echt als een vertrouwd iemand over de vloer.",
    naam: "Familie Jansen",
    functie: "Cliënt thuiszorg"
  },
  {
    tekst: "Altijd bereikbaar, flexibel en met een warm hart voor de zorg. Absolute aanrader!",
    naam: "M. de Vries",
    functie: "Mantelzorger"
  },
  {
    tekst: "De rust en aandacht die wordt gegeven is precies wat we zochten. Heel tevreden.",
    naam: "Familie Bakker",
    functie: "Cliënt"
  },
];

export function TestimonialsSection({ style, theme, palette, content, generated }: TestimonialsSectionProps) {
  const testimonials = generated?.testimonials || content.testimonials || DEFAULT_TESTIMONIALS;
  
  if (!testimonials.length) return null;
  
  switch (style) {
    case 'cards':
      return <TestimonialsCards {...{ theme, palette, testimonials }} />;
    case 'carousel':
      return <TestimonialsCarousel {...{ theme, palette, testimonials }} />;
    case 'single':
      return <TestimonialsSingle {...{ theme, palette, testimonials }} />;
    default:
      return <TestimonialsCards {...{ theme, palette, testimonials }} />;
  }
}

// ============================================
// CARDS - Meerdere kaarten naast elkaar
// ============================================
function TestimonialsCards({ theme, palette, testimonials }: any) {
  return (
    <section 
      className={`${theme.spacing.section} px-6 md:px-12`}
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className={`${theme.spacing.container} mx-auto`}>
        {/* Header */}
        <div className={`text-center mb-12 ${getRevealClass('up')}`}>
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            Wat anderen zeggen
          </h2>
        </div>
        
        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((t: any, i: number) => (
            <div 
              key={i}
              className={`p-8 ${theme.radius.large} ${theme.shadows.small} ${getRevealClass('up', i + 1)}`}
              style={{ backgroundColor: theme.colors.surface }}
            >
              <span 
                className="material-symbols-outlined text-3xl mb-4 block"
                style={{ color: `${palette.primary}40` }}
              >
                format_quote
              </span>
              <p 
                className="mb-6 leading-relaxed"
                style={{ color: theme.colors.text }}
              >
                "{t.tekst}"
              </p>
              <div className="flex items-center gap-3">
                <div 
                  className={`w-10 h-10 ${theme.radius.full} flex items-center justify-center text-white font-bold`}
                  style={{ backgroundColor: palette.primary }}
                >
                  {t.naam?.charAt(0) || '?'}
                </div>
                <div>
                  <p 
                    className="font-semibold text-sm"
                    style={{ color: theme.colors.text }}
                  >
                    {t.naam}
                  </p>
                  <p 
                    className="text-xs"
                    style={{ color: theme.colors.textMuted }}
                  >
                    {t.functie || t.relatie}
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
// CAROUSEL - Horizontaal scrollbare kaarten
// ============================================
function TestimonialsCarousel({ theme, palette, testimonials }: any) {
  return (
    <section 
      className={`${theme.spacing.section} px-6`}
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className={`${theme.spacing.container} mx-auto`}>
        {/* Header */}
        <div className={`mb-10 ${getRevealClass('up')}`}>
          <p 
            className="text-sm font-bold uppercase tracking-widest mb-2"
            style={{ color: palette.primary }}
          >
            Ervaringen
          </p>
          <h2 
            className="text-3xl font-bold"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            Wat cliënten zeggen
          </h2>
        </div>
        
        {/* Carousel */}
        <div className={`flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory ${getRevealClass('up', 1)}`}>
          {testimonials.slice(0, 5).map((t: any, i: number) => (
            <div 
              key={i}
              className={`flex-none w-80 p-6 ${theme.radius.large} border snap-start`}
              style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <span key={j} className="material-symbols-outlined text-lg" style={{ color: palette.primary }}>star</span>
                ))}
              </div>
              <p 
                className="mb-4 text-sm leading-relaxed"
                style={{ color: theme.colors.text }}
              >
                "{t.tekst}"
              </p>
              <p 
                className="font-semibold text-sm"
                style={{ color: theme.colors.text }}
              >
                — {t.naam}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// SINGLE - Één grote testimonial
// ============================================
function TestimonialsSingle({ theme, palette, testimonials }: any) {
  const testimonial = testimonials[0];
  if (!testimonial) return null;
  
  return (
    <section 
      className={`${theme.spacing.section} px-6`}
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className={`max-w-3xl mx-auto text-center ${getRevealClass('up')}`}>
        <span 
          className="material-symbols-outlined text-5xl mb-6 block"
          style={{ color: `${palette.primary}30` }}
        >
          format_quote
        </span>
        <p 
          className="text-2xl md:text-3xl leading-relaxed mb-8 italic"
          style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
        >
          "{testimonial.tekst}"
        </p>
        <div className="flex items-center justify-center gap-4">
          <div 
            className={`w-14 h-14 ${theme.radius.full} flex items-center justify-center text-white text-xl font-bold`}
            style={{ backgroundColor: palette.primary }}
          >
            {testimonial.naam?.charAt(0) || '?'}
          </div>
          <div className="text-left">
            <p 
              className="font-bold"
              style={{ color: theme.colors.text }}
            >
              {testimonial.naam}
            </p>
            <p 
              className="text-sm"
              style={{ color: theme.colors.textMuted }}
            >
              {testimonial.functie || testimonial.relatie}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
