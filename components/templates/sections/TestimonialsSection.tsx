// components/templates/sections/TestimonialsSection.tsx
// Testimonials section met meerdere style varianten

'use client';

import { BaseSectionProps, TestimonialsStyle, getRevealClass, getInitials, DEFAULT_TESTIMONIALS } from './types';

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
  const testimonials = generated?.testimonials?.items || content.testimonials || DEFAULT_TESTIMONIALS;
  const titel = generated?.testimonials?.titel || 'Wat opdrachtgevers zeggen';
  const intro = generated?.testimonials?.intro;
  
  if (!testimonials.length) return null;
  
  const sharedProps = { theme, palette, testimonials, titel, intro };
  
  switch (style) {
    // ============================================
    // EDITORIAL VARIANTEN
    // ============================================
    case 'editorial':
      return <TestimonialsEditorial {...sharedProps} />;
    case 'editorial-2':
      return <TestimonialsEditorial2 {...sharedProps} />;
    case 'editorial-3':
      return <TestimonialsEditorial3 {...sharedProps} />;
    
    // ============================================
    // PROACTIEF VARIANTEN
    // ============================================
    case 'proactief':
      return <TestimonialsProactief {...sharedProps} />;
    case 'proactief-2':    // TODO
      return <TestimonialsProactief {...sharedProps} />;
    case 'proactief-3':    // TODO
      return <TestimonialsProactief {...sharedProps} />;
    
    // ============================================
    // PORTFOLIO VARIANTEN
    // ============================================
    case 'portfolio':
      return <TestimonialsPortfolio {...sharedProps} />;
    case 'portfolio-2':    // TODO
      return <TestimonialsPortfolio {...sharedProps} />;
    case 'portfolio-3':    // TODO
      return <TestimonialsPortfolio {...sharedProps} />;
    
    // ============================================
    // MINDOOR VARIANTEN
    // ============================================
    case 'mindoor':
      return <TestimonialsMindoor {...sharedProps} />;
    case 'mindoor-2':      // TODO
      return <TestimonialsMindoor {...sharedProps} />;
    case 'mindoor-3':      // TODO
      return <TestimonialsMindoor {...sharedProps} />;
    
    // ============================================
    // SERENE VARIANTEN
    // ============================================
    case 'serene':         // TODO
      return <TestimonialsEditorial {...sharedProps} />;
    case 'serene-2':       // TODO
      return <TestimonialsEditorial {...sharedProps} />;
    case 'serene-3':       // TODO
      return <TestimonialsEditorial {...sharedProps} />;
    
    // ============================================
    // LEGACY/UTILITY STYLES
    // ============================================
    case 'cards':
      return <TestimonialsCards {...sharedProps} />;
    case 'carousel':
      return <TestimonialsCarousel {...sharedProps} />;
    case 'single':
      return <TestimonialsSingle {...sharedProps} />;
    
    default:
      return <TestimonialsEditorial {...sharedProps} />;
  }
}

// ============================================
// SHARED TYPES & COMPONENTS
// ============================================

interface TestimonialsComponentProps {
  theme: any;
  palette: any;
  testimonials: any[];
  titel: string;
  intro?: string;
}

function StarRating({ size = 'text-lg', count = 5 }: { size?: string; count?: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <span 
          key={i}
          className={`material-symbols-outlined ${size}`}
          style={{ 
            color: '#fbbf24',
            fontVariationSettings: "'FILL' 1"
          }}
        >
          star
        </span>
      ))}
    </div>
  );
}

function StarRatingSvg({ color = '#fbbf24', size = 'w-5 h-5', count = 5 }: { color?: string; size?: string; count?: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(count)].map((_, i) => (
        <svg key={i} className={size} viewBox="0 0 24 24" fill={color}>
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      ))}
    </div>
  );
}


// ============================================
// EDITORIAL VARIANT 1 — Classic Grid
// 3-koloms kaarten, sterren, initialen-avatar, border-t scheiding
// ============================================
function TestimonialsEditorial({ theme, palette, testimonials, titel, intro }: TestimonialsComponentProps) {
  const titleParts = titel.split(' ');
  const lastWord = titleParts.pop() || '';
  const restTitle = titleParts.join(' ');
  
  return (
    <section 
      id="testimonials"
      className="px-6 md:px-16 lg:px-32 py-20"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
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
            {restTitle}{' '}
            <em className="italic" style={{ color: palette.accent || palette.primary }}>{lastWord}</em>
          </h2>
        </div>
        
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((testimonial: any, index: number) => (
            <div 
              key={index}
              className={`flex flex-col gap-6 p-8 ${getRevealClass('up', index + 1)}`}
              style={{ backgroundColor: theme.colors.backgroundAlt }}
            >
              <StarRating />
              
              <p 
                className="text-sm leading-relaxed italic"
                style={{ color: theme.colors.textMuted }}
              >
                &ldquo;{testimonial.tekst}&rdquo;
              </p>
              
              <div 
                className="flex items-center gap-3 pt-2 border-t"
                style={{ borderColor: theme.colors.border }}
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
                  style={{ backgroundColor: `${palette.primary}20`, color: palette.primary }}
                >
                  {getInitials(testimonial.naam)}
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: theme.colors.text }}>
                    {testimonial.naam}
                  </p>
                  <p className="text-xs" style={{ color: theme.colors.textMuted }}>
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
// EDITORIAL VARIANT 2 — Featured + Sidebar
// Sticky header links (col-4), ghost aanhalingsteken,
// stacked lijst rechts (col-8)
// ============================================
function TestimonialsEditorial2({ theme, palette, testimonials, titel, intro }: TestimonialsComponentProps) {
  const titleParts = titel.split(' ');
  const lastWord = titleParts.pop() || '';
  const restTitle = titleParts.join(' ');
  
  return (
    <section 
      id="testimonials"
      className="px-6 md:px-16 lg:px-20 py-20 lg:py-32"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left: Sticky header */}
          <div className={`lg:col-span-4 lg:sticky lg:top-24 lg:self-start ${getRevealClass('up')}`}>
            <div className="flex items-center gap-4 mb-6">
              <span 
                className="text-[10px] font-medium uppercase tracking-[0.2em]"
                style={{ color: theme.colors.textMuted }}
              >
                Referenties
              </span>
              <div className="flex-1 h-px" style={{ backgroundColor: theme.colors.border }} />
            </div>
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl leading-[1.1] mb-6"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {restTitle}{' '}
              <em className="italic" style={{ color: palette.accent || palette.primary }}>{lastWord}</em>
            </h2>
            <p 
              className="text-sm leading-relaxed mb-8"
              style={{ color: theme.colors.textMuted }}
            >
              {intro || 'Opdrachtgevers en cliënten delen hun ervaring met de geleverde zorg.'}
            </p>
            
            {/* Aggregate rating */}
            <div className="flex items-center gap-3 mb-2">
              <StarRating size="text-base" />
              <span className="text-sm font-semibold" style={{ color: theme.colors.text }}>5.0</span>
            </div>
            <p className="text-xs" style={{ color: theme.colors.textMuted }}>
              Gebaseerd op {testimonials.length} beoordelingen
            </p>
          </div>
          
          {/* Right: Testimonials list */}
          <div className="lg:col-span-8">
            <div className="space-y-0">
              {testimonials.slice(0, 4).map((testimonial: any, idx: number) => {
                const isFeatured = idx === 0;
                const items = testimonials.slice(0, 4);
                
                return (
                  <div 
                    key={idx}
                    className={`relative py-10 ${idx < items.length - 1 ? 'border-b' : ''} ${getRevealClass('up', (idx + 1) * 100)}`}
                    style={{ borderColor: theme.colors.border }}
                  >
                    {/* Ghost quote mark */}
                    <span 
                      className={`absolute -left-4 lg:left-0 -top-2 leading-none pointer-events-none select-none ${isFeatured ? 'text-[140px] lg:text-[180px]' : 'text-[120px] lg:text-[140px]'}`}
                      style={{ 
                        fontFamily: theme.fonts.heading,
                        color: isFeatured ? (palette.accent || palette.primary) : palette.primary, 
                        opacity: isFeatured ? 0.08 : 0.05 
                      }}
                    >
                      &ldquo;
                    </span>
                    <div className="relative">
                      <p 
                        className={`leading-relaxed italic mb-5 ${isFeatured ? 'text-xl lg:text-2xl' : 'text-base lg:text-lg'}`}
                        style={{ 
                          fontFamily: isFeatured ? theme.fonts.heading : undefined,
                          color: isFeatured ? theme.colors.text : theme.colors.textMuted 
                        }}
                      >
                        &ldquo;{testimonial.tekst}&rdquo;
                      </p>
                      <div className="flex items-center gap-3">
                        <div 
                          className={`rounded-full flex items-center justify-center font-semibold ${isFeatured ? 'w-10 h-10 text-sm' : 'w-9 h-9 text-xs'}`}
                          style={{ backgroundColor: `${palette.primary}20`, color: palette.primary }}
                        >
                          {getInitials(testimonial.naam)}
                        </div>
                        <div>
                          <p className="font-semibold text-sm" style={{ color: theme.colors.text }}>
                            {testimonial.naam}
                          </p>
                          <p className="text-xs" style={{ color: theme.colors.textMuted }}>
                            {testimonial.functie || testimonial.relatie || 'Cliënt'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}


// ============================================
// EDITORIAL VARIANT 3 — Typographic Centered
// 12-col grid per quote: nummer links, grote serif
// italic quote midden, auteur rechts
// ============================================
function TestimonialsEditorial3({ theme, palette, testimonials, titel, intro }: TestimonialsComponentProps) {
  const titleParts = titel.split(' ');
  const lastWord = titleParts.pop() || '';
  const restTitle = titleParts.join(' ');
  const items = testimonials.slice(0, 4);
  
  return (
    <section 
      id="testimonials"
      className="px-6 md:px-16 lg:px-20 py-20 lg:py-32"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-5xl mx-auto">
        
        {/* Centered Header */}
        <div className={`text-center mb-16 lg:mb-20 ${getRevealClass('up')}`}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px" style={{ backgroundColor: palette.accent || palette.primary }} />
            <span 
              className="text-[10px] font-medium uppercase tracking-[0.25em]"
              style={{ color: theme.colors.textMuted }}
            >
              Referenties
            </span>
            <div className="w-12 h-px" style={{ backgroundColor: palette.accent || palette.primary }} />
          </div>
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl leading-[1.1]"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            {restTitle}{' '}
            <em className="italic" style={{ color: palette.accent || palette.primary }}>{lastWord}</em>
          </h2>
        </div>
        
        {/* Testimonials as full-width items */}
        <div className="space-y-0">
          {items.map((testimonial: any, idx: number) => (
            <div 
              key={idx}
              className={`border-t py-12 lg:py-16 ${idx === items.length - 1 ? 'border-b' : ''} ${getRevealClass('up', (idx + 1) * 50)}`}
              style={{ borderColor: theme.colors.border }}
            >
              <div className="grid lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-1">
                  <span className="text-xs font-medium" style={{ color: theme.colors.textMuted }}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
                
                <div className="lg:col-span-8">
                  <p 
                    className="text-xl lg:text-2xl xl:text-[26px] leading-relaxed italic"
                    style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                  >
                    &ldquo;{testimonial.tekst}&rdquo;
                  </p>
                </div>
                
                <div className="lg:col-span-3 lg:text-right lg:pt-2">
                  <p className="font-semibold text-sm" style={{ color: theme.colors.text }}>
                    {testimonial.naam}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: theme.colors.textMuted }}>
                    {testimonial.functie || testimonial.relatie || 'Cliënt'}
                  </p>
                  <div className="flex gap-0.5 lg:justify-end mt-2">
                    <StarRating size="text-sm" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className={`text-center mt-12 lg:mt-16 ${getRevealClass('up')}`}>
          <a 
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-medium group"
            style={{ color: palette.primary }}
          >
            <span className="relative">
              Neem contact op
              <span 
                className="absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                style={{ backgroundColor: palette.primary }}
              />
            </span>
            <span>→</span>
          </a>
        </div>
        
      </div>
    </section>
  );
}


// ============================================
// PROACTIEF — Cards met sterren, foto avatars
// rounded-[20px], decoratieve cirkel, shadow
// ============================================
function TestimonialsProactief({ theme, palette, testimonials, titel, intro }: TestimonialsComponentProps) {
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
            {titel}
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
                &ldquo;
              </div>
              
              <StarRatingSvg />
              
              <p 
                className="text-[15px] leading-relaxed italic mb-6 mt-4"
                style={{ color: theme.colors.textMuted }}
              >
                &ldquo;{testimonial.tekst}&rdquo;
              </p>
              
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.foto || defaultAvatars[idx % defaultAvatars.length]}
                  alt={testimonial.naam}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold" style={{ color: theme.colors.text }}>
                    {testimonial.naam}
                  </p>
                  <p className="text-[13px]" style={{ color: theme.colors.textMuted }}>
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
// PROACTIEF VARIANT 2 — TODO
// ============================================

// ============================================
// PROACTIEF VARIANT 3 — TODO
// ============================================


// ============================================
// PORTFOLIO — Cream cards, serif quote marks,
// initialen avatar met primary bg
// ============================================
function TestimonialsPortfolio({ theme, palette, testimonials, titel, intro }: TestimonialsComponentProps) {
  const titleParts = titel.split(' ');
  const lastWord = titleParts.pop() || '';
  const restTitle = titleParts.join(' ');
  
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
            {restTitle}{' '}
            <em className="italic" style={{ color: palette.accent || palette.primary }}>{lastWord}</em>
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
                &ldquo;
              </div>
              
              <StarRatingSvg color={palette.accent || palette.primary} size="w-[18px] h-[18px]" />
              
              <p 
                className="text-base leading-[1.8] italic mb-8 mt-5"
                style={{ color: theme.colors.textMuted }}
              >
                &ldquo;{testimonial.tekst}&rdquo;
              </p>
              
              <div className="flex items-center gap-4">
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-semibold text-white"
                  style={{ fontFamily: theme.fonts.heading, backgroundColor: palette.primary }}
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
                  <p className="text-[13px]" style={{ color: theme.colors.textMuted }}>
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
// PORTFOLIO VARIANT 2 — TODO
// ============================================

// ============================================
// PORTFOLIO VARIANT 3 — TODO
// ============================================


// ============================================
// MINDOOR — 3-col layout met image in middle,
// single testimonial card met navigation dots
// ============================================
function TestimonialsMindoor({ theme, palette, testimonials, titel, intro }: TestimonialsComponentProps) {
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
              <span className="italic" style={{ color: palette.accent || palette.primary }}>
                Telt
              </span>
            </h2>
            <p className="mt-4" style={{ color: theme.colors.textMuted }}>
              {intro || 'Cliënten en families waarderen de persoonlijke aandacht en professionele zorg.'}
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
                  &ldquo;{testimonial.tekst}&rdquo;
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
// MINDOOR VARIANT 2 — TODO
// ============================================

// ============================================
// MINDOOR VARIANT 3 — TODO
// ============================================


// ============================================
// SERENE VARIANT 1 — TODO
// ============================================

// ============================================
// SERENE VARIANT 2 — TODO
// ============================================

// ============================================
// SERENE VARIANT 3 — TODO
// ============================================


// ============================================
// LEGACY: CARDS — Moderne kaarten met hover effect
// ============================================
function TestimonialsCards({ theme, palette, testimonials, titel, intro }: TestimonialsComponentProps) {
  return (
    <section 
      id="testimonials"
      className="py-20 md:py-28 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 ${getRevealClass('up')}`}>
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            {titel}
          </h2>
          {intro && (
            <p style={{ color: theme.colors.textMuted }}>{intro}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial: any, index: number) => (
            <div 
              key={index}
              className={`group p-8 rounded-xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${getRevealClass('up', index + 1)}`}
              style={{ 
                backgroundColor: theme.colors.surface || theme.colors.background,
                borderColor: theme.colors.border
              }}
            >
              <span 
                className="material-symbols-outlined text-3xl mb-4 block opacity-30"
                style={{ color: palette.primary }}
              >
                format_quote
              </span>
              
              <p 
                className="text-sm leading-relaxed mb-6"
                style={{ color: theme.colors.textMuted }}
              >
                &ldquo;{testimonial.tekst}&rdquo;
              </p>
              
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ backgroundColor: palette.primaryLight, color: palette.primary }}
                >
                  {getInitials(testimonial.naam)}
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: theme.colors.text }}>
                    {testimonial.naam}
                  </p>
                  <p className="text-xs" style={{ color: theme.colors.textMuted }}>
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
// LEGACY: CAROUSEL — Enkele testimonial met dots
// ============================================
function TestimonialsCarousel({ theme, palette, testimonials, titel, intro }: TestimonialsComponentProps) {
  const testimonial = testimonials[0];
  
  return (
    <section 
      id="testimonials"
      className="py-20 md:py-28 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <span 
          className={`material-symbols-outlined text-6xl mb-8 block ${getRevealClass('up')}`}
          style={{ color: `${palette.primary}30` }}
        >
          format_quote
        </span>
        
        <blockquote 
          className={`text-2xl md:text-3xl font-light leading-relaxed mb-8 ${getRevealClass('up', 1)}`}
          style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
        >
          &ldquo;{testimonial.tekst}&rdquo;
        </blockquote>
        
        <div className={`flex flex-col items-center ${getRevealClass('up', 2)}`}>
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mb-4"
            style={{ backgroundColor: palette.primaryLight, color: palette.primary }}
          >
            {getInitials(testimonial.naam)}
          </div>
          <p className="font-semibold" style={{ color: theme.colors.text }}>
            {testimonial.naam}
          </p>
          <p className="text-sm" style={{ color: theme.colors.textMuted }}>
            {testimonial.functie || testimonial.relatie || 'Cliënt'}
          </p>
        </div>
        
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
// LEGACY: SINGLE — Enkele grote testimonial
// ============================================
function TestimonialsSingle({ theme, palette, testimonials, titel, intro }: TestimonialsComponentProps) {
  const testimonial = testimonials[0];
  
  return (
    <section 
      id="testimonials"
      className="py-16 px-6 md:px-12"
      style={{ backgroundColor: palette.primaryLight }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <div className={getRevealClass('up')}>
          <StarRating size="text-xl" />
          
          <p 
            className="text-xl md:text-2xl leading-relaxed italic mb-6 mt-6"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            &ldquo;{testimonial.tekst}&rdquo;
          </p>
          
          <p className="font-semibold" style={{ color: palette.primary }}>
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