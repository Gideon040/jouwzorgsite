// components/templates/sections/TestimonialsSection.tsx
// Testimonials/Referenties sectie

'use client';

import { BaseSectionProps, TestimonialsStyle, getRevealClass, DEFAULT_TESTIMONIALS, getInitials } from './types';

interface TestimonialsSectionProps extends BaseSectionProps {
  style?: TestimonialsStyle;
}

export function TestimonialsSection({ 
  style = 'editorial', 
  theme, 
  palette, 
  content, 
  generated 
}: TestimonialsSectionProps) {
  // Edge function genereert: { titel, intro, items: [{ tekst, naam, functie }] }
  const testimonialContent = generated?.testimonials;
  const testimonials = testimonialContent?.items || content.testimonials || DEFAULT_TESTIMONIALS;
  const titel = testimonialContent?.titel || 'Wat anderen zeggen';
  const intro = testimonialContent?.intro;
  
  if (!testimonials || !testimonials.length) return null;
  
  switch (style) {
    case 'editorial':
      return <TestimonialsEditorial {...{ theme, palette, testimonials }} />;
    case 'proactief':
      return <TestimonialsProactief {...{ theme, palette, testimonials }} />;
    case 'portfolio':
      return <TestimonialsPortfolio {...{ theme, palette, testimonials }} />;
    case 'mindoor':
      return <TestimonialsMindoor {...{ theme, palette, testimonials }} />;
    case 'cards':
      return <TestimonialsCards {...{ theme, palette, testimonials }} />;
    case 'carousel':
      return <TestimonialsCarousel {...{ theme, palette, testimonials }} />;
    case 'single':
      return <TestimonialsSingle {...{ theme, palette, testimonials }} />;
    default:
      return <TestimonialsEditorial {...{ theme, palette, testimonials }} />;
  }
}

// ============================================
// EDITORIAL - Origineel uit HTML template
// 3-kolom grid, sterren, cream cards
// ============================================
function TestimonialsEditorial({ theme, palette, testimonials }: any) {
  return (
    <section 
      id="testimonials"
      className="px-6 md:px-16 lg:px-32 py-20"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Header (centered) */}
        <div className={`text-center mb-14 ${getRevealClass('up')}`}>
          <span 
            className="text-xs font-semibold uppercase tracking-[0.15em] block mb-3"
            style={{ fontVariant: 'small-caps', color: palette.primary }}
          >
            Referenties
          </span>
          <h2 
            className="text-3xl md:text-4xl"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            Wat opdrachtgevers zeggen
          </h2>
        </div>
        
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((testimonial: any, index: number) => (
            <div 
              key={index}
              className={`flex flex-col gap-6 p-8 rounded-lg ${getRevealClass('up', index + 1)}`}
              style={{ backgroundColor: theme.colors.backgroundAlt }}
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span 
                    key={i}
                    className="material-symbols-outlined text-lg"
                    style={{ 
                      color: '#fbbf24',
                      fontVariationSettings: "'FILL' 1"
                    }}
                  >
                    star
                  </span>
                ))}
              </div>
              
              {/* Quote */}
              <p 
                className="text-sm leading-relaxed italic"
                style={{ color: theme.colors.textMuted }}
              >
                "{testimonial.tekst}"
              </p>
              
              {/* Divider + Author */}
              <div 
                className="flex items-center gap-3 pt-2 border-t"
                style={{ borderColor: theme.colors.border }}
              >
                {/* Avatar with initials */}
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
                  style={{ 
                    backgroundColor: `${palette.primary}20`,
                    color: palette.primary
                  }}
                >
                  {getInitials(testimonial.naam)}
                </div>
                <div>
                  <p 
                    className="font-semibold text-sm"
                    style={{ color: theme.colors.text }}
                  >
                    {testimonial.naam}
                  </p>
                  <p 
                    className="text-xs"
                    style={{ color: theme.colors.textMuted }}
                  >
                    {testimonial.functie || testimonial.relatie || 'Cliënt'}
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
// PROACTIEF - Cards met sterren, foto avatars, lichtblauwe achtergrond
// ============================================
function TestimonialsProactief({ theme, palette, testimonials }: any) {
  // Default avatar images
  const defaultAvatars = [
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  ];
  
  return (
    <section 
      id="testimonials"
      className="py-24 px-6 md:px-12 relative overflow-hidden"
      style={{ backgroundColor: palette.primaryLight || `${palette.primary}10` }}
    >
      {/* Decorative circle */}
      <div 
        className="absolute top-1/2 -left-36 w-72 h-72 rounded-full opacity-5 -translate-y-1/2"
        style={{ backgroundColor: palette.primary }}
      />
      
      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className={`text-center max-w-xl mx-auto mb-16 ${getRevealClass('up')}`}>
          <span 
            className="text-sm italic mb-3 block"
            style={{ color: palette.primary }}
          >
            Ervaringen
          </span>
          <h2 
            className="text-4xl font-bold"
            style={{ fontFamily: theme.fonts.heading, color: palette.primaryDark || palette.primary }}
          >
            Wat onze cliënten zeggen
          </h2>
        </div>
        
        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((testimonial: any, idx: number) => (
            <div 
              key={idx}
              className={`bg-white p-9 rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] relative ${getRevealClass('up', idx * 100)}`}
            >
              {/* Quote mark */}
              <div 
                className="absolute top-5 right-6 text-7xl font-serif leading-none opacity-10"
                style={{ color: palette.primary }}
              >
                "
              </div>
              
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star}
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="#fbbf24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                ))}
              </div>
              
              {/* Quote */}
              <p 
                className="text-[15px] leading-relaxed italic mb-6"
                style={{ color: theme.colors.textMuted }}
              >
                "{testimonial.tekst}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.foto || defaultAvatars[idx % defaultAvatars.length]}
                  alt={testimonial.naam}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <p 
                    className="font-semibold"
                    style={{ color: theme.colors.text }}
                  >
                    {testimonial.naam}
                  </p>
                  <p 
                    className="text-[13px]"
                    style={{ color: theme.colors.textMuted }}
                  >
                    {testimonial.functie || testimonial.relatie || 'Cliënt'}
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
// PORTFOLIO - Cream cards, sterren, initialen avatar
// ============================================
function TestimonialsPortfolio({ theme, palette, testimonials }: any) {
  return (
    <section 
      id="testimonials"
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
            Ervaringen
          </span>
          <h2 
            className="text-[42px] font-semibold leading-[1.2]"
            style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
          >
            Wat anderen <em className="italic" style={{ color: palette.accent || palette.primary }}>zeggen</em>
          </h2>
        </div>
        
        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((testimonial: any, idx: number) => (
            <div 
              key={idx}
              className={`p-10 rounded-3xl relative ${getRevealClass('up', idx * 100)}`}
              style={{ backgroundColor: theme.colors.backgroundAlt }}
            >
              {/* Quote mark */}
              <div 
                className="absolute top-8 right-9 text-[100px] leading-none opacity-15"
                style={{ fontFamily: theme.fonts.heading, color: palette.accent || palette.primary }}
              >
                "
              </div>
              
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star}
                    className="w-[18px] h-[18px]"
                    viewBox="0 0 24 24"
                    fill={palette.accent || palette.primary}
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                ))}
              </div>
              
              {/* Quote text */}
              <p 
                className="text-base leading-[1.8] italic mb-8"
                style={{ color: theme.colors.textMuted }}
              >
                "{testimonial.tekst}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-4">
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-semibold text-white"
                  style={{ 
                    fontFamily: theme.fonts.heading,
                    backgroundColor: palette.primary 
                  }}
                >
                  {getInitials(testimonial.naam)}
                </div>
                <div>
                  <p 
                    className="text-[17px] font-semibold mb-1"
                    style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
                  >
                    {testimonial.naam}
                  </p>
                  <p 
                    className="text-[13px]"
                    style={{ color: theme.colors.textMuted }}
                  >
                    {testimonial.functie || testimonial.relatie || 'Cliënt'}
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
// MINDOOR - 3-col layout met image in middle, carousel card
// ============================================
function TestimonialsMindoor({ theme, palette, testimonials }: any) {
  return (
    <section 
      id="testimonials"
      className="py-20 lg:py-32 overflow-hidden"
      style={{ backgroundColor: 'white' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          
          {/* Title */}
          <div className={getRevealClass('right')}>
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl leading-tight"
              style={{ fontFamily: theme.fonts.heading }}
            >
              Elke Dag<br/>
              <span 
                className="italic"
                style={{ 
                  background: `linear-gradient(135deg, ${palette.accent || '#d4644a'}, ${palette.accentLight || '#e07b5f'})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Telt
              </span>
            </h2>
            <p className="mt-4" style={{ color: theme.colors.textMuted }}>
              Cliënten en families waarderen de persoonlijke aandacht en professionele zorg.
            </p>
          </div>
          
          {/* Image */}
          <div className={`overflow-hidden rounded-3xl shadow-xl ${getRevealClass('up', 200)}`}>
            <img 
              src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80"
              alt="Gelukkige familie"
              className="w-full aspect-square object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          
          {/* Testimonial Card */}
          <div 
            className={`rounded-3xl p-8 ${getRevealClass('left', 300)}`}
            style={{ backgroundColor: `${theme.colors.backgroundAlt}80` }}
          >
            {testimonials.slice(0, 1).map((testimonial: any, idx: number) => (
              <div key={idx}>
                <blockquote 
                  className="text-lg lg:text-xl italic leading-relaxed"
                  style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                >
                  "{testimonial.tekst}"
                </blockquote>
                <div className="mt-6">
                  <p className="font-semibold" style={{ color: theme.colors.text }}>
                    {testimonial.naam}
                  </p>
                  <p className="text-sm" style={{ color: theme.colors.textMuted }}>
                    {testimonial.functie || testimonial.relatie || 'Cliënt'}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Navigation dots */}
            <div className="flex gap-2 mt-8">
              {testimonials.slice(0, 3).map((_: any, idx: number) => (
                <div 
                  key={idx}
                  className={`w-2 h-2 rounded-full ${idx === 0 ? '' : 'opacity-30'}`}
                  style={{ backgroundColor: palette.primary }}
                />
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

// ============================================
// CARDS - Moderne kaarten met hover effect
// ============================================
function TestimonialsCards({ theme, palette, testimonials }: any) {
  return (
    <section 
      id="testimonials"
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
            Ervaringen
          </h2>
          <p style={{ color: theme.colors.textMuted }}>
            Wat anderen over mij zeggen
          </p>
        </div>
        
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial: any, index: number) => (
            <div 
              key={index}
              className={`group p-8 rounded-xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${getRevealClass('up', index + 1)}`}
              style={{ 
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border
              }}
            >
              {/* Quote icon */}
              <span 
                className="material-symbols-outlined text-3xl mb-4 block opacity-30"
                style={{ color: palette.primary }}
              >
                format_quote
              </span>
              
              {/* Quote text */}
              <p 
                className="text-sm leading-relaxed mb-6"
                style={{ color: theme.colors.textMuted }}
              >
                "{testimonial.tekst}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ 
                    backgroundColor: palette.primaryLight,
                    color: palette.primary
                  }}
                >
                  {getInitials(testimonial.naam)}
                </div>
                <div>
                  <p 
                    className="font-semibold text-sm"
                    style={{ color: theme.colors.text }}
                  >
                    {testimonial.naam}
                  </p>
                  <p 
                    className="text-xs"
                    style={{ color: theme.colors.textMuted }}
                  >
                    {testimonial.functie || testimonial.relatie}
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
// CAROUSEL - Enkele testimonial met navigatie
// ============================================
function TestimonialsCarousel({ theme, palette, testimonials }: any) {
  // For simplicity, show first testimonial (could add state for actual carousel)
  const testimonial = testimonials[0];
  
  return (
    <section 
      id="testimonials"
      className="py-20 md:py-28 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Quote icon */}
        <span 
          className={`material-symbols-outlined text-6xl mb-8 block ${getRevealClass('up')}`}
          style={{ color: `${palette.primary}30` }}
        >
          format_quote
        </span>
        
        {/* Quote */}
        <blockquote 
          className={`text-2xl md:text-3xl font-light leading-relaxed mb-8 ${getRevealClass('up', 1)}`}
          style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
        >
          "{testimonial.tekst}"
        </blockquote>
        
        {/* Author */}
        <div className={`flex flex-col items-center ${getRevealClass('up', 2)}`}>
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mb-4"
            style={{ 
              backgroundColor: palette.primaryLight,
              color: palette.primary
            }}
          >
            {getInitials(testimonial.naam)}
          </div>
          <p 
            className="font-semibold"
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
        
        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.slice(0, 3).map((_: any, i: number) => (
            <div 
              key={i}
              className={`w-2 h-2 rounded-full ${i === 0 ? '' : 'opacity-30'}`}
              style={{ backgroundColor: palette.primary }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// SINGLE - Enkele grote testimonial
// ============================================
function TestimonialsSingle({ theme, palette, testimonials }: any) {
  const testimonial = testimonials[0];
  
  return (
    <section 
      id="testimonials"
      className="py-16 px-6 md:px-12"
      style={{ backgroundColor: palette.primaryLight }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <div className={getRevealClass('up')}>
          {/* Stars */}
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <span 
                key={i}
                className="material-symbols-outlined text-xl"
                style={{ 
                  color: '#fbbf24',
                  fontVariationSettings: "'FILL' 1"
                }}
              >
                star
              </span>
            ))}
          </div>
          
          {/* Quote */}
          <p 
            className="text-xl md:text-2xl leading-relaxed italic mb-6"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            "{testimonial.tekst}"
          </p>
          
          {/* Author */}
          <p 
            className="font-semibold"
            style={{ color: palette.primary }}
          >
            — {testimonial.naam}
            {testimonial.functie && (
              <span style={{ color: theme.colors.textMuted }}>
                , {testimonial.functie}
              </span>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
