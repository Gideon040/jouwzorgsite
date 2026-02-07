// components/templates/sections/TestimonialsSection.tsx
// Testimonials section met meerdere style varianten

'use client';

import { useState, useEffect, useCallback } from 'react';
import { BaseSectionProps, TestimonialsStyle, getRevealClass, getInitials, DEFAULT_TESTIMONIALS } from './types';

// ============================================
// HELPERS
// ============================================

function hexToRgb(hex: string): string {
  const cleaned = hex.replace('#', '');
  const r = parseInt(cleaned.substring(0, 2), 16);
  const g = parseInt(cleaned.substring(2, 4), 16);
  const b = parseInt(cleaned.substring(4, 6), 16);
  return `${r},${g},${b}`;
}

// Sfeer images for slider (per slide)
const SFEER_IMAGES = [
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=700&q=80',
];

// Default avatar images
const DEFAULT_AVATARS = [
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
];

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
// MAIN COMPONENT — ROUTER
// ============================================

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
    case 'proactief-2':
      return <TestimonialsProactief2 {...sharedProps} />;
    case 'proactief-3':
      return <TestimonialsProactief3 {...sharedProps} />;
    
    // ============================================
    // PORTFOLIO VARIANTEN
    // ============================================
    case 'portfolio':
      return <TestimonialsPortfolio {...sharedProps} />;
    case 'portfolio-2':
      return <TestimonialsPortfolio2 {...sharedProps} />;
    case 'portfolio-3':
      return <TestimonialsPortfolio3 {...sharedProps} />;
    
    // ============================================
    // MINDOOR VARIANTEN
    // ============================================
    case 'mindoor':
      return <TestimonialsMindoor {...sharedProps} />;
    case 'mindoor-2':
      return <TestimonialsMindoor2 {...sharedProps} />;
    case 'mindoor-3':
      return <TestimonialsMindoor3 {...sharedProps} />;
    
    // ============================================
    // SERENE VARIANTEN
    // ============================================
    case 'serene':
      return <TestimonialsSerene1 {...sharedProps} />;
    case 'serene-2':
      return <TestimonialsSerene2 {...sharedProps} />;
    case 'serene-3':
      return <TestimonialsSerene3 {...sharedProps} />;
    
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
// EDITORIAL VARIANT 1 — Classic Grid
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
// PROACTIEF VARIANT 1 — Cards met sterren
// ============================================
function TestimonialsProactief({ theme, palette, testimonials, titel, intro }: TestimonialsComponentProps) {
  return (
    <section 
      id="testimonials"
      className="py-24 px-6 md:px-12 relative overflow-hidden"
      style={{ backgroundColor: palette.primaryLight || `${palette.primary}10` }}
    >
      <div 
        className="absolute top-1/2 -left-36 w-72 h-72 rounded-full opacity-5 -translate-y-1/2"
        style={{ backgroundColor: palette.primary }}
      />
      
      <div className="max-w-6xl mx-auto relative">
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
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((testimonial: any, idx: number) => (
            <div 
              key={idx}
className={`p-9 rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] relative ${getRevealClass('up', idx * 100)}`}
style={{ backgroundColor: theme.colors.background }}            >
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
                  src={testimonial.foto || DEFAULT_AVATARS[idx % DEFAULT_AVATARS.length]}
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
// PROACTIEF VARIANT 2 — Featured + Stacked
// ============================================
function TestimonialsProactief2({ theme, palette, testimonials, titel, intro }: TestimonialsComponentProps) {
  const featured = testimonials[0];
  const others = testimonials.slice(1, 3);
  
  return (
    <section 
      id="testimonials"
      className="py-24 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left: Header + Featured */}
          <div className={`lg:col-span-5 ${getRevealClass('up')}`}>
            <div className="lg:sticky lg:top-24">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px" style={{ backgroundColor: palette.primary }} />
                <span 
                  className="text-xs font-semibold uppercase tracking-[0.15em]"
                  style={{ color: palette.primary }}
                >
                  Ervaringen
                </span>
              </div>
              <h2 
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
                style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
              >
                {titel}
              </h2>
              {intro && (
                <p 
                  className="text-base leading-relaxed mb-10"
                  style={{ color: theme.colors.textMuted }}
                >
                  {intro}
                </p>
              )}
              
              {featured && (
                <div 
                  className="p-8 border-l-4"
                  style={{ 
                    backgroundColor: theme.colors.backgroundAlt,
                    borderColor: palette.primary
                  }}
                >
                  <StarRatingSvg />
                  <p 
                    className="text-lg leading-relaxed italic mt-4 mb-6"
                    style={{ color: theme.colors.text }}
                  >
                    &ldquo;{featured.tekst}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <img 
                      src={featured.foto || DEFAULT_AVATARS[0]}
                      alt={featured.naam}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold" style={{ color: theme.colors.text }}>
                        {featured.naam}
                      </p>
                      <p className="text-[13px]" style={{ color: theme.colors.textMuted }}>
                        {featured.functie || featured.relatie || 'Cliënt'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-8">
                <img 
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80"
                  alt="Tevreden cliënten"
                  className="w-full h-36 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
          
          {/* Right: Stacked testimonials */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="space-y-6">
              {others.map((testimonial: any, idx: number) => (
                <div
                  key={idx}
                  className={`group p-8 border-l-4 transition-all ${getRevealClass('up', (idx + 1) * 100)}`}
                  style={{ 
                    backgroundColor: theme.colors.backgroundAlt,
                    borderColor: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = palette.primary;
                    e.currentTarget.style.backgroundColor = palette.primaryLight || `${palette.primary}10`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.style.backgroundColor = theme.colors.backgroundAlt;
                  }}
                >
                  <div className="flex items-start gap-5">
                    <img 
                      src={testimonial.foto || DEFAULT_AVATARS[(idx + 1) % DEFAULT_AVATARS.length]}
                      alt={testimonial.naam}
                      className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <StarRatingSvg />
                      <p 
                        className="text-[15px] leading-relaxed italic mt-3 mb-4"
                        style={{ color: theme.colors.textMuted }}
                      >
                        &ldquo;{testimonial.tekst}&rdquo;
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-sm" style={{ color: theme.colors.text }}>
                            {testimonial.naam}
                          </p>
                          <p className="text-[13px]" style={{ color: theme.colors.textMuted }}>
                            {testimonial.functie || testimonial.relatie || 'Cliënt'}
                          </p>
                        </div>
                        <span 
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-sm"
                          style={{ color: palette.primary }}
                        >
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div 
              className={`mt-10 p-6 flex items-center gap-6 ${getRevealClass('up', 300)}`}
              style={{ backgroundColor: palette.primaryLight || `${palette.primary}10` }}
            >
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: palette.primary }}
              >
                <span className="material-symbols-outlined text-2xl text-white">verified_user</span>
              </div>
              <div>
                <p 
                  className="text-2xl font-bold"
                  style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                >
                  Zelfstandig &amp; betrouwbaar inzetbaar
                </p>
                <p className="text-sm" style={{ color: theme.colors.textMuted }}>
                  KvK-geregistreerd, verzekerd en DBA-compliant
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}


// ============================================
// PROACTIEF VARIANT 3 — Numbered Grid + Color Swap
// ============================================
function TestimonialsProactief3({ theme, palette, testimonials, titel, intro }: TestimonialsComponentProps) {
  return (
    <section 
      id="testimonials"
      className="py-24 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 ${getRevealClass('up')}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ backgroundColor: palette.primary }} />
            <span 
              className="text-xs font-semibold uppercase tracking-[0.15em]"
              style={{ color: palette.primary }}
            >
              Ervaringen
            </span>
            <div className="w-8 h-px" style={{ backgroundColor: palette.primary }} />
          </div>
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            {titel}
          </h2>
        </div>
        
        <div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{ backgroundColor: theme.colors.border }}
        >
          {testimonials.slice(0, 3).map((testimonial: any, idx: number) => (
            <div
              key={idx}
              className={`group p-8 lg:p-10 transition-colors duration-300 ${getRevealClass('up', (idx + 1) * 50)}`}
              style={{ backgroundColor: theme.colors.background }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = palette.primary;
                const number = e.currentTarget.querySelector('.test-number') as HTMLElement;
                const quote = e.currentTarget.querySelector('.test-quote') as HTMLElement;
                const name = e.currentTarget.querySelector('.test-name') as HTMLElement;
                const role = e.currentTarget.querySelector('.test-role') as HTMLElement;
                const stars = e.currentTarget.querySelector('.test-stars') as HTMLElement;
                if (number) number.style.color = 'rgba(255,255,255,0.2)';
                if (quote) quote.style.color = 'rgba(255,255,255,0.9)';
                if (name) name.style.color = 'white';
                if (role) role.style.color = 'rgba(255,255,255,0.7)';
                if (stars) stars.style.opacity = '0.8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = theme.colors.background;
                const number = e.currentTarget.querySelector('.test-number') as HTMLElement;
                const quote = e.currentTarget.querySelector('.test-quote') as HTMLElement;
                const name = e.currentTarget.querySelector('.test-name') as HTMLElement;
                const role = e.currentTarget.querySelector('.test-role') as HTMLElement;
                const stars = e.currentTarget.querySelector('.test-stars') as HTMLElement;
                if (number) number.style.color = palette.primary;
                if (quote) quote.style.color = theme.colors.textMuted;
                if (name) name.style.color = theme.colors.text;
                if (role) role.style.color = theme.colors.textMuted;
                if (stars) stars.style.opacity = '1';
              }}
            >
              <span 
                className="test-number text-5xl font-bold block mb-6 transition-colors"
                style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
              >
                {String(idx + 1).padStart(2, '0')}
              </span>
              
              <div className="test-stars transition-opacity">
                <StarRatingSvg />
              </div>
              
              <p 
                className="test-quote text-[15px] leading-relaxed italic mt-4 mb-8 transition-colors"
                style={{ color: theme.colors.textMuted }}
              >
                &ldquo;{testimonial.tekst}&rdquo;
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <img 
                  src={testimonial.foto || DEFAULT_AVATARS[idx % DEFAULT_AVATARS.length]}
                  alt={testimonial.naam}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                />
                <div>
                  <p 
                    className="test-name font-semibold text-sm transition-colors"
                    style={{ color: theme.colors.text }}
                  >
                    {testimonial.naam}
                  </p>
                  <p 
                    className="test-role text-[13px] transition-colors"
                    style={{ color: theme.colors.textMuted }}
                  >
                    {testimonial.functie || testimonial.relatie || 'Cliënt'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div 
          className={`mt-px grid grid-cols-3 gap-px ${getRevealClass('up', 200)}`}
          style={{ backgroundColor: theme.colors.border }}
        >
          {[
            { value: '24u', label: 'Reactietijd' },
            { value: '100%', label: 'Inzetbaarheid' },
            { value: 'DBA', label: 'Compliant' },
          ].map((stat, idx) => (
            <div 
              key={idx}
              className="py-6 text-center"
              style={{ backgroundColor: theme.colors.background }}
            >
              <span 
                className="text-2xl font-bold block"
                style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
              >
                {stat.value}
              </span>
              <span className="text-xs uppercase tracking-wider" style={{ color: theme.colors.textMuted }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


// ============================================
// PORTFOLIO VARIANT 1 — Cream Cards
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
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((testimonial: any, idx: number) => (
            <div 
              key={idx}
              className={`p-10 rounded-3xl relative ${getRevealClass('up', idx * 100)}`}
              style={{ backgroundColor: theme.colors.backgroundAlt }}
            >
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
// PORTFOLIO VARIANT 2 — Elegant Split + Featured Quote
// ============================================
function TestimonialsPortfolio2({ theme, palette, testimonials, titel, intro }: TestimonialsComponentProps) {
  const titleParts = titel.split(' ');
  const lastWord = titleParts.pop() || '';
  const restTitle = titleParts.join(' ');
  
  const featured = testimonials[0];
  const others = testimonials.slice(1, 3);
  
  return (
    <section 
      id="testimonials"
      className="px-6 md:px-12 py-24 lg:py-32"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Image + Featured quote overlay */}
          <div className={`relative ${getRevealClass('left')}`}>
            <div 
              className="absolute -top-4 -left-4 w-32 h-32 border-2 opacity-20 hidden lg:block"
              style={{ borderColor: palette.accent || palette.primary }}
            />
            <img 
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
              alt="Tevreden cliënten"
              className="w-full h-[400px] lg:h-[520px] object-cover"
              style={{ borderRadius: '0 80px 0 0' }}
            />
            
            {featured && (
              <div 
                className="absolute -bottom-8 -right-6 lg:-right-12 p-8 shadow-xl max-w-[340px]"
                style={{ backgroundColor: theme.colors.background }}
              >
                <div 
                  className="text-[60px] leading-none -mb-4 opacity-20"
                  style={{ fontFamily: theme.fonts.heading, color: palette.accent || palette.primary }}
                >
                  &ldquo;
                </div>
                <p 
                  className="text-[15px] leading-relaxed italic mb-5"
                  style={{ color: theme.colors.text }}
                >
                  {featured.tekst}
                </p>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white"
                    style={{ fontFamily: theme.fonts.heading, backgroundColor: palette.primary }}
                  >
                    {getInitials(featured.naam)}
                  </div>
                  <div>
                    <p 
                      className="text-sm font-semibold"
                      style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
                    >
                      {featured.naam}
                    </p>
                    <p className="text-[12px]" style={{ color: theme.colors.textMuted }}>
                      {featured.functie || featured.relatie || 'Cliënt'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Right: Header + Other testimonials */}
          <div className={getRevealClass('right')}>
            <span 
              className="text-[12px] font-semibold uppercase tracking-[0.2em] mb-4 block"
              style={{ color: palette.accent || palette.primary }}
            >
              Ervaringen
            </span>
            <h2 
              className="text-3xl sm:text-4xl lg:text-[44px] leading-[1.15] mb-10"
              style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
            >
              {restTitle}{' '}
              <em className="italic" style={{ color: palette.accent || palette.primary }}>{lastWord}</em>
            </h2>
            
            <div className="space-y-8">
              {others.map((testimonial: any, idx: number) => (
                <div
                  key={idx}
                  className={`group pb-8 ${idx < others.length - 1 ? 'border-b' : ''}`}
                  style={{ borderColor: theme.colors.border }}
                >
                  <StarRatingSvg color={palette.accent || palette.primary} size="w-[16px] h-[16px]" />
                  <p 
                    className="text-base leading-[1.8] italic mt-3 mb-5"
                    style={{ color: theme.colors.textMuted }}
                  >
                    &ldquo;{testimonial.tekst}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-base font-semibold text-white"
                      style={{ fontFamily: theme.fonts.heading, backgroundColor: idx === 0 ? palette.primary : (palette.accent || palette.primary) }}
                    >
                      {getInitials(testimonial.naam)}
                    </div>
                    <div>
                      <p 
                        className="text-[15px] font-semibold"
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
            
            <div className="flex items-center gap-3 mt-10">
              <div className="flex -space-x-2">
                {testimonials.slice(0, 3).map((_: any, idx: number) => (
                  <div 
                    key={idx}
                    className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-semibold text-white"
                    style={{ 
                      borderColor: theme.colors.backgroundAlt,
                      backgroundColor: idx % 2 === 0 ? palette.primary : (palette.accent || palette.primary)
                    }}
                  >
                    {getInitials(testimonials[idx]?.naam || '')}
                  </div>
                ))}
              </div>
              <p className="text-sm" style={{ color: theme.colors.textMuted }}>
                Vertrouwd door zorginstellingen en bemiddelaars
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}


// ============================================
// PORTFOLIO VARIANT 3 — Elegant Slider
// ============================================
function TestimonialsPortfolio3({ theme, palette, testimonials, titel, intro }: TestimonialsComponentProps) {
  const titleParts = titel.split(' ');
  const lastWord = titleParts.pop() || '';
  const restTitle = titleParts.join(' ');
  
  const [current, setCurrent] = useState(0);
  const total = Math.min(testimonials.length, 3);
  
  const goToSlide = useCallback((n: number) => {
    setCurrent(((n % total) + total) % total);
  }, [total]);
  
  const nextSlide = useCallback(() => goToSlide(current + 1), [current, goToSlide]);
  const prevSlide = useCallback(() => goToSlide(current - 1), [current, goToSlide]);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => ((prev + 1) % total + total) % total);
    }, 6000);
    return () => clearInterval(timer);
  }, [total]);
  
  return (
    <section 
      id="testimonials"
      className="px-6 md:px-12 py-24 lg:py-32"
      style={{ backgroundColor: 'white' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14 lg:mb-16 ${getRevealClass('up')}`}>
          <div>
            <span 
              className="text-[12px] font-semibold uppercase tracking-[0.2em] mb-3 block"
              style={{ color: palette.accent || palette.primary }}
            >
              Ervaringen
            </span>
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl leading-[1.1]"
              style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
            >
              {restTitle}{' '}
              <em className="italic" style={{ color: palette.accent || palette.primary }}>{lastWord}</em>
            </h2>
          </div>
          
          <div className="hidden lg:flex items-center gap-3">
            <button 
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border flex items-center justify-center transition-colors"
              style={{ borderColor: theme.colors.border }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = palette.primary;
                e.currentTarget.style.backgroundColor = palette.primary;
                const icon = e.currentTarget.querySelector('span') as HTMLElement;
                if (icon) icon.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = theme.colors.border;
                e.currentTarget.style.backgroundColor = 'transparent';
                const icon = e.currentTarget.querySelector('span') as HTMLElement;
                if (icon) icon.style.color = palette.primary;
              }}
            >
              <span className="material-symbols-outlined text-xl" style={{ color: palette.primary }}>arrow_back</span>
            </button>
            <button 
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border flex items-center justify-center transition-colors"
              style={{ borderColor: theme.colors.border }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = palette.primary;
                e.currentTarget.style.backgroundColor = palette.primary;
                const icon = e.currentTarget.querySelector('span') as HTMLElement;
                if (icon) icon.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = theme.colors.border;
                e.currentTarget.style.backgroundColor = 'transparent';
                const icon = e.currentTarget.querySelector('span') as HTMLElement;
                if (icon) icon.style.color = palette.primary;
              }}
            >
              <span className="material-symbols-outlined text-xl" style={{ color: palette.primary }}>arrow_forward</span>
            </button>
          </div>
        </div>

        <div className={`relative ${getRevealClass('up', 100)}`}>
          {testimonials.slice(0, 3).map((testimonial: any, idx: number) => (
            <div 
              key={idx}
              className="transition-all duration-500 ease-out"
              style={{
                opacity: current === idx ? 1 : 0,
                transform: current === idx ? 'translateY(0)' : 'translateY(12px)',
                position: current === idx ? 'relative' : 'absolute',
                inset: current === idx ? undefined : 0,
                pointerEvents: current === idx ? 'auto' : 'none',
              }}
            >
              <div className="grid lg:grid-cols-12 gap-0">
                <div className="lg:col-span-5 relative overflow-hidden">
                  <img 
                    src={SFEER_IMAGES[idx % SFEER_IMAGES.length]}
                    alt="Zorg sfeer"
                    className="w-full h-[260px] lg:h-[380px] object-cover"
                  />
                  <span 
                    className="absolute bottom-4 left-6 text-[100px] lg:text-[140px] font-light leading-none pointer-events-none select-none"
                    style={{ fontFamily: theme.fonts.heading, color: 'white', opacity: 0.2 }}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
                <div 
                  className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-center"
                  style={{ backgroundColor: theme.colors.backgroundAlt }}
                >
                  <div 
                    className="text-[80px] leading-none -mb-6"
                    style={{ fontFamily: theme.fonts.heading, color: palette.accent || palette.primary, opacity: 0.25 }}
                  >
                    &ldquo;
                  </div>
                  <p 
                    className="text-lg lg:text-[22px] leading-[1.7] italic mb-8"
                    style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                  >
                    {testimonial.tekst}
                  </p>
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-semibold text-white"
                      style={{ 
                        fontFamily: theme.fonts.heading, 
                        backgroundColor: idx === 2 ? (palette.accent || palette.primary) : palette.primary 
                      }}
                    >
                      {getInitials(testimonial.naam)}
                    </div>
                    <div>
                      <p 
                        className="text-[17px] font-semibold"
                        style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
                      >
                        {testimonial.naam}
                      </p>
                      <p className="text-[13px]" style={{ color: theme.colors.textMuted }}>
                        {testimonial.functie || testimonial.relatie || 'Cliënt'}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <StarRatingSvg color={palette.accent || palette.primary} size="w-[16px] h-[16px]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div 
          className={`flex flex-col sm:flex-row items-center justify-between gap-6 mt-10 pt-8 ${getRevealClass('up', 200)}`}
          style={{ borderTop: `1px solid ${theme.colors.border}` }}
        >
          <div className="flex items-center gap-4">
            <button 
              onClick={prevSlide}
              className="lg:hidden w-10 h-10 rounded-full border flex items-center justify-center"
              style={{ borderColor: theme.colors.border }}
            >
              <span className="material-symbols-outlined text-lg" style={{ color: palette.primary }}>arrow_back</span>
            </button>
            <div className="flex items-center gap-2">
              {testimonials.slice(0, 3).map((_: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: current === idx ? 12 : 10,
                    height: current === idx ? 12 : 10,
                    backgroundColor: current === idx ? palette.primary : theme.colors.border,
                  }}
                />
              ))}
            </div>
            <span className="text-[13px] font-medium" style={{ color: theme.colors.textMuted }}>
              <span style={{ color: palette.primary }}>{String(current + 1).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}
            </span>
            <button 
              onClick={nextSlide}
              className="lg:hidden w-10 h-10 rounded-full border flex items-center justify-center"
              style={{ borderColor: theme.colors.border }}
            >
              <span className="material-symbols-outlined text-lg" style={{ color: palette.primary }}>arrow_forward</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {testimonials.slice(0, 3).map((_: any, idx: number) => (
                <div 
                  key={idx}
                  className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-semibold text-white"
                  style={{ 
                    borderColor: 'white',
                    backgroundColor: idx % 2 === 0 ? palette.primary : (palette.accent || palette.primary)
                  }}
                >
                  {getInitials(testimonials[idx]?.naam || '')}
                </div>
              ))}
            </div>
            <p className="text-[13px]" style={{ color: theme.colors.textMuted }}>
              Vertrouwd door zorginstellingen en bemiddelaars
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


// ============================================
// MINDOOR VARIANT 1 — 3-Column: Titel | Beeld | Quote
// ============================================
function TestimonialsMindoor({ theme, palette, testimonials, titel, intro }: TestimonialsComponentProps) {
  const titleParts = titel.split(' ');
  const lastWord = titleParts.pop() || '';
  const restTitle = titleParts.join(' ');

  return (
    <section 
      id="testimonials"
      className="py-20 lg:py-32 overflow-hidden relative"
      style={{ backgroundColor: 'white' }}
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ width: 500, height: 500, opacity: 0.04 }}>
        <div className="absolute inset-0 border rounded-full" style={{ borderColor: palette.accent || palette.primary }} />
        <div className="absolute inset-16 border rounded-full" style={{ borderColor: palette.primary }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-12 items-center relative">
          
          <div className={getRevealClass('right')}>
            <span className="text-sm font-medium mb-3 block" style={{ color: palette.accent || palette.primary }}>
              Ervaringen
            </span>
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl leading-tight"
              style={{ fontFamily: theme.fonts.heading }}
            >
              {restTitle}<br/>
              <em className="italic" style={{ color: palette.accent || palette.primary }}>
                {lastWord}
              </em>
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed" style={{ color: theme.colors.textMuted }}>
              {intro || 'Cliënten en families waarderen de persoonlijke aandacht en professionele zorg.'}
            </p>
          </div>
          
          <div className={`overflow-hidden rounded-3xl shadow-xl relative ${getRevealClass('up', 200)}`}>
            <img 
              src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80"
              alt="Gelukkige familie"
              className="w-full aspect-square object-cover transition-transform duration-500 hover:scale-105"
            />
            <div 
              className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full border-2 opacity-20 pointer-events-none"
              style={{ borderColor: palette.accent || palette.primary }}
            />
          </div>
          
          <div 
            className={`rounded-3xl p-8 ${getRevealClass('left', 300)}`}
            style={{ backgroundColor: theme.colors.backgroundAlt }}
          >
            <div 
              className="text-[60px] leading-none -mb-4 opacity-15"
              style={{ fontFamily: theme.fonts.heading, color: palette.accent || palette.primary }}
            >
              &ldquo;
            </div>

            {testimonials.slice(0, 1).map((testimonial: any, idx: number) => (
              <div key={idx}>
                <blockquote 
                  className="text-lg lg:text-xl italic leading-relaxed"
                  style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                >
                  &ldquo;{testimonial.tekst}&rdquo;
                </blockquote>
                <div className="mt-6">
                  <p className="font-semibold text-[16px]" style={{ color: theme.colors.text }}>
                    {testimonial.naam.includes(' ') ? (
                      <>
                        {testimonial.naam.split(' ').slice(0, -1).join(' ')}{' '}
                        <em className="italic" style={{ color: palette.accent || palette.primary }}>
                          {testimonial.naam.split(' ').pop()}
                        </em>
                      </>
                    ) : testimonial.naam}
                  </p>
                  <p className="text-sm" style={{ color: theme.colors.textMuted }}>
                    {testimonial.functie || testimonial.relatie || 'Cliënt'}
                  </p>
                </div>
              </div>
            ))}
            
            <div className="flex gap-2 mt-8">
              {testimonials.slice(0, 3).map((_: any, idx: number) => (
                <div 
                  key={idx}
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ 
                    backgroundColor: palette.primary,
                    opacity: idx === 0 ? 1 : 0.3
                  }}
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
// MINDOOR VARIANT 2 — Featured + Cards Mosaic
// ============================================
function TestimonialsMindoor2({ theme, palette, testimonials, titel, intro }: TestimonialsComponentProps) {
  const titleParts = titel.split(' ');
  const lastWord = titleParts.pop() || '';
  const restTitle = titleParts.join(' ');

  const featured = testimonials[0];
  const others = testimonials.slice(1, 3);

  return (
    <section 
      id="testimonials"
      className="py-24 lg:py-32 overflow-hidden relative"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div 
        className="absolute top-20 right-10 w-[300px] h-[300px] rounded-full border pointer-events-none"
        style={{ borderColor: palette.accent || palette.primary, opacity: 0.08 }}
      />
      <div 
        className="absolute bottom-20 left-10 w-[200px] h-[200px] rounded-full pointer-events-none"
        style={{ backgroundColor: palette.accent || palette.primary, opacity: 0.04 }}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative">
        <div className={`max-w-xl mb-16 ${getRevealClass('up')}`}>
          <span className="text-sm font-medium mb-3 block" style={{ color: palette.accent || palette.primary }}>
            Ervaringen
          </span>
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl leading-[1.15]"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            {restTitle}{' '}
            <em className="italic" style={{ color: palette.accent || palette.primary }}>{lastWord}</em>
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Featured: Image + quote overlay */}
          <div className={`lg:col-span-7 relative ${getRevealClass('up')}`}>
            <div 
              className="absolute -top-4 -left-4 w-full h-full rounded-[2.5rem] pointer-events-none"
              style={{ backgroundColor: palette.primary, opacity: 0.06 }}
            />
            <div className="relative rounded-[2.5rem] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=900&q=80"
                alt="Tevreden cliënt"
                className="w-full h-[320px] lg:h-[400px] object-cover"
              />
              <div 
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(44,42,39,0.7), transparent 60%)' }}
              />
              
              {featured && (
                <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
                  <div 
                    className="text-[50px] leading-none -mb-2"
                    style={{ fontFamily: theme.fonts.heading, color: 'white', opacity: 0.4 }}
                  >
                    &ldquo;
                  </div>
                  <blockquote 
                    className="text-xl lg:text-2xl italic leading-relaxed text-white mb-6"
                    style={{ fontFamily: theme.fonts.heading }}
                  >
                    {featured.tekst}
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-base font-semibold text-white"
                      style={{ fontFamily: theme.fonts.heading, backgroundColor: palette.accent || palette.primary }}
                    >
                      {getInitials(featured.naam)}
                    </div>
                    <div>
                      <p 
                        className="text-white font-semibold text-[16px]"
                        style={{ fontFamily: theme.fonts.heading }}
                      >
                        {featured.naam.includes(' ') ? (
                          <>
                            {featured.naam.split(' ').slice(0, -1).join(' ')}{' '}
                            <em className="italic">{featured.naam.split(' ').pop()}</em>
                          </>
                        ) : featured.naam}
                      </p>
                      <p className="text-white/70 text-sm">
                        {featured.functie || featured.relatie || 'Cliënt'}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <StarRatingSvg color={palette.accent || palette.primary} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Right: 2 stacked cards + social proof */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {others[0] && (
              <div 
                className={`rounded-[2rem] p-7 flex-1 flex flex-col justify-between ${getRevealClass('up', 100)}`}
                style={{ backgroundColor: palette.primary }}
              >
                <div>
                  <StarRatingSvg color="rgba(255,255,255,0.5)" />
                  <p 
                    className="text-[15px] italic leading-relaxed text-white/90 mt-4"
                    style={{ fontFamily: theme.fonts.heading }}
                  >
                    &ldquo;{others[0].tekst}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-5">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2 border-white/30 text-white"
                    style={{ fontFamily: theme.fonts.heading }}
                  >
                    {getInitials(others[0].naam)}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold" style={{ fontFamily: theme.fonts.heading }}>
                      {others[0].naam.includes(' ') ? (
                        <>
                          {others[0].naam.split(' ').slice(0, -1).join(' ')}{' '}
                          <em className="italic">{others[0].naam.split(' ').pop()}</em>
                        </>
                      ) : others[0].naam}
                    </p>
                    <p className="text-white/60 text-xs">
                      {others[0].functie || others[0].relatie || 'Cliënt'}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {others[1] && (
              <div 
                className={`rounded-[2rem] p-7 flex-1 flex flex-col justify-between border ${getRevealClass('up', 200)}`}
                style={{ backgroundColor: theme.colors.background, borderColor: theme.colors.border }}
              >
                <div>
                  <StarRatingSvg color={palette.accent || palette.primary} />
                  <p 
                    className="text-[15px] italic leading-relaxed mt-4"
                    style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                  >
                    &ldquo;{others[1].tekst}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-5">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white"
                    style={{ fontFamily: theme.fonts.heading, backgroundColor: palette.accent || palette.primary }}
                  >
                    {getInitials(others[1].naam)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>
                      {others[1].naam.includes(' ') ? (
                        <>
                          {others[1].naam.split(' ').slice(0, -1).join(' ')}{' '}
                          <em className="italic" style={{ color: palette.accent || palette.primary }}>
                            {others[1].naam.split(' ').pop()}
                          </em>
                        </>
                      ) : others[1].naam}
                    </p>
                    <p className="text-xs" style={{ color: theme.colors.textMuted }}>
                      {others[1].functie || others[1].relatie || 'Cliënt'}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <div className={`flex items-center gap-3 px-2 ${getRevealClass('up', 300)}`}>
              <div className="flex -space-x-2">
                {testimonials.slice(0, 3).map((t: any, idx: number) => (
                  <div 
                    key={idx}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-semibold text-white border-2"
                    style={{ 
                      fontFamily: theme.fonts.heading, 
                      backgroundColor: idx % 2 === 0 ? palette.primary : (palette.accent || palette.primary),
                      borderColor: theme.colors.backgroundAlt
                    }}
                  >
                    {getInitials(t.naam)}
                  </div>
                ))}
              </div>
              <p className="text-[13px]" style={{ color: theme.colors.textMuted }}>
                Vertrouwd door families en zorginstellingen
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


// ============================================
// MINDOOR VARIANT 3 — Immersive Slider
// ============================================
function TestimonialsMindoor3({ theme, palette, testimonials, titel, intro }: TestimonialsComponentProps) {
  const titleParts = titel.split(' ');
  const lastWord = titleParts.pop() || '';
  const restTitle = titleParts.join(' ');

  const [current, setCurrent] = useState(0);
  const total = Math.min(testimonials.length, 3);
  
  const goToSlide = useCallback((n: number) => {
    setCurrent(((n % total) + total) % total);
  }, [total]);
  
  const nextSlide = useCallback(() => goToSlide(current + 1), [current, goToSlide]);
  const prevSlide = useCallback(() => goToSlide(current - 1), [current, goToSlide]);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => ((prev + 1) % total + total) % total);
    }, 6000);
    return () => clearInterval(timer);
  }, [total]);

  const offsetColors = [palette.primary, palette.accent || palette.primary, palette.primary];

  return (
    <section 
      id="testimonials"
      className="py-24 lg:py-32 overflow-hidden relative"
      style={{ backgroundColor: 'white' }}
    >
      <div className="absolute -top-20 -right-20 pointer-events-none" style={{ width: 400, height: 400 }}>
        <div className="absolute inset-0 border rounded-full" style={{ borderColor: palette.accent || palette.primary, opacity: 0.06 }} />
        <div className="absolute inset-12 border rounded-full" style={{ borderColor: palette.primary, opacity: 0.04 }} />
        <div className="absolute inset-24 border rounded-full" style={{ borderColor: palette.accent || palette.primary, opacity: 0.03 }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative">
        <div className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14 lg:mb-16 ${getRevealClass('up')}`}>
          <div>
            <span 
              className="text-sm font-medium mb-3 block"
              style={{ color: palette.accent || palette.primary }}
            >
              Ervaringen
            </span>
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl leading-[1.1]"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {restTitle}{' '}
              <em className="italic" style={{ color: palette.accent || palette.primary }}>{lastWord}</em>
            </h2>
          </div>
          
          <div className="hidden lg:flex items-center gap-3">
            <button 
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border flex items-center justify-center transition-colors"
              style={{ borderColor: theme.colors.border }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = palette.primary;
                e.currentTarget.style.backgroundColor = palette.primary;
                const icon = e.currentTarget.querySelector('span') as HTMLElement;
                if (icon) icon.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = theme.colors.border;
                e.currentTarget.style.backgroundColor = 'transparent';
                const icon = e.currentTarget.querySelector('span') as HTMLElement;
                if (icon) icon.style.color = palette.primary;
              }}
            >
              <span className="material-symbols-outlined text-xl" style={{ color: palette.primary }}>arrow_back</span>
            </button>
            <button 
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border flex items-center justify-center transition-colors"
              style={{ borderColor: theme.colors.border }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = palette.primary;
                e.currentTarget.style.backgroundColor = palette.primary;
                const icon = e.currentTarget.querySelector('span') as HTMLElement;
                if (icon) icon.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = theme.colors.border;
                e.currentTarget.style.backgroundColor = 'transparent';
                const icon = e.currentTarget.querySelector('span') as HTMLElement;
                if (icon) icon.style.color = palette.primary;
              }}
            >
              <span className="material-symbols-outlined text-xl" style={{ color: palette.primary }}>arrow_forward</span>
            </button>
          </div>
        </div>

        <div className={`relative ${getRevealClass('up', 100)}`}>
          {testimonials.slice(0, 3).map((testimonial: any, idx: number) => (
            <div 
              key={idx}
              className="transition-all duration-500 ease-out"
              style={{
                opacity: current === idx ? 1 : 0,
                transform: current === idx ? 'translateY(0)' : 'translateY(12px)',
                position: current === idx ? 'relative' : 'absolute',
                inset: current === idx ? undefined : 0,
                pointerEvents: current === idx ? 'auto' : 'none',
              }}
            >
              <div className="grid lg:grid-cols-12 gap-0 rounded-[2.5rem] overflow-hidden">
                <div className="lg:col-span-5 relative">
                  <div 
                    className="absolute -top-3 -left-3 w-full h-full rounded-[2.5rem] pointer-events-none -z-10"
                    style={{ backgroundColor: offsetColors[idx % offsetColors.length], opacity: 0.08 }}
                  />
                  <img 
                    src={SFEER_IMAGES[idx % SFEER_IMAGES.length]}
                    alt="Zorg sfeer"
                    className="w-full h-[260px] lg:h-[380px] object-cover rounded-t-[2.5rem] lg:rounded-l-[2.5rem] lg:rounded-tr-none"
                  />
                  <span 
                    className="absolute bottom-4 left-6 text-[100px] lg:text-[130px] font-light leading-none pointer-events-none select-none"
                    style={{ fontFamily: theme.fonts.heading, color: 'white', opacity: 0.2 }}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                <div 
                  className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-center rounded-b-[2.5rem] lg:rounded-r-[2.5rem] lg:rounded-bl-none"
                  style={{ backgroundColor: theme.colors.backgroundAlt }}
                >
                  <div 
                    className="text-[70px] leading-none -mb-6"
                    style={{ fontFamily: theme.fonts.heading, color: palette.accent || palette.primary, opacity: 0.2 }}
                  >
                    &ldquo;
                  </div>
                  <p 
                    className="text-lg lg:text-[22px] leading-[1.7] italic mb-8"
                    style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                  >
                    {testimonial.tekst}
                  </p>
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-semibold text-white"
                      style={{ 
                        fontFamily: theme.fonts.heading, 
                        backgroundColor: idx === 2 ? (palette.accent || palette.primary) : palette.primary 
                      }}
                    >
                      {getInitials(testimonial.naam)}
                    </div>
                    <div>
                      <p 
                        className="text-[17px] font-semibold"
                        style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                      >
                        {testimonial.naam.includes(' ') ? (
                          <>
                            {testimonial.naam.split(' ').slice(0, -1).join(' ')}{' '}
                            <em className="italic" style={{ color: palette.accent || palette.primary }}>
                              {testimonial.naam.split(' ').pop()}
                            </em>
                          </>
                        ) : testimonial.naam}
                      </p>
                      <p className="text-[13px]" style={{ color: theme.colors.textMuted }}>
                        {testimonial.functie || testimonial.relatie || 'Cliënt'}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <StarRatingSvg color={palette.accent || palette.primary} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div 
          className={`flex flex-col sm:flex-row items-center justify-between gap-6 mt-10 pt-8 ${getRevealClass('up', 200)}`}
          style={{ borderTop: `1px solid ${theme.colors.border}` }}
        >
          <div className="flex items-center gap-4">
            <button 
              onClick={prevSlide}
              className="lg:hidden w-10 h-10 rounded-full border flex items-center justify-center"
              style={{ borderColor: theme.colors.border }}
            >
              <span className="material-symbols-outlined text-lg" style={{ color: palette.primary }}>arrow_back</span>
            </button>
            <div className="flex items-center gap-2">
              {testimonials.slice(0, 3).map((_: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: current === idx ? 12 : 10,
                    height: current === idx ? 12 : 10,
                    backgroundColor: current === idx ? palette.primary : theme.colors.border,
                  }}
                />
              ))}
            </div>
            <span className="text-[13px] font-medium" style={{ color: theme.colors.textMuted }}>
              <span style={{ color: palette.primary }}>{String(current + 1).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}
            </span>
            <button 
              onClick={nextSlide}
              className="lg:hidden w-10 h-10 rounded-full border flex items-center justify-center"
              style={{ borderColor: theme.colors.border }}
            >
              <span className="material-symbols-outlined text-lg" style={{ color: palette.primary }}>arrow_forward</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {testimonials.slice(0, 3).map((t: any, idx: number) => (
                <div 
                  key={idx}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-semibold text-white border-2"
                  style={{ 
                    fontFamily: theme.fonts.heading,
                    borderColor: 'white',
                    backgroundColor: idx % 2 === 0 ? palette.primary : (palette.accent || palette.primary)
                  }}
                >
                  {getInitials(t.naam)}
                </div>
              ))}
            </div>
            <p className="text-[13px]" style={{ color: theme.colors.textMuted }}>
              Vertrouwd door families en zorginstellingen
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


// ============================================
// SERENE VARIANT 1 — Dark Header + Overlapping Cards
// ============================================
function TestimonialsSerene1({ theme, palette, testimonials, titel, intro }: TestimonialsComponentProps) {
  const titleParts = titel.split(' ');
  const lastWord = titleParts.pop() || '';
  const restTitle = titleParts.join(' ');

  return (
    <section id="testimonials" style={{ fontFamily: theme.fonts.body }}>
      <div 
        className={`relative py-24 lg:py-32 px-6 ${getRevealClass('up')}`}
        style={{
          background: `linear-gradient(rgba(${hexToRgb(palette.primary)},0.88), rgba(${hexToRgb(palette.primary)},0.88)), url('${SFEER_IMAGES[0]}') center/cover`,
        }}
      >
        <div className="text-center max-w-lg mx-auto">
          <p className="text-[9px] uppercase tracking-[3px] mb-4 text-white/60">
            Ervaringen
          </p>
          <h2 
            className="text-3xl lg:text-5xl text-white leading-tight"
            style={{ fontFamily: theme.fonts.heading }}
          >
            {restTitle}{' '}
            <em className="italic" style={{ color: palette.primaryLight || palette.accent || 'rgba(255,255,255,0.6)' }}>
              {lastWord}
            </em>
          </h2>
          {intro && (
            <p className="mt-4 text-sm text-white/60 leading-relaxed">
              {intro}
            </p>
          )}
        </div>
      </div>
      
      <div 
        className="px-6 md:px-12 pb-24"
        style={{ backgroundColor: theme.colors.background }}
      >
        <div className="max-w-5xl mx-auto -mt-16 relative z-10">
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((testimonial: any, idx: number) => (
              <div 
                key={idx}
                className={`rounded-[20px] p-8 shadow-sm hover:-translate-y-1 transition-transform ${getRevealClass('up', idx * 100)}`}
                style={{ backgroundColor: theme.colors.background }}
              >
                <div 
                  className="text-[56px] leading-none -mb-2"
                  style={{ fontFamily: theme.fonts.heading, color: palette.primary, opacity: 0.1 }}
                >
                  &ldquo;
                </div>
                <div className="mb-4">
                  <StarRatingSvg color={palette.primary} />
                </div>
                <blockquote 
                  className="text-[15px] italic leading-relaxed mb-6"
                  style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                >
                  &ldquo;{testimonial.tekst}&rdquo;
                </blockquote>
                <div 
                  className="h-px mb-5"
                  style={{ backgroundColor: theme.colors.border }}
                />
                <div>
                  <p 
                    className="text-sm font-semibold"
                    style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                  >
                    {testimonial.naam.includes(' ') ? (
                      <>
                        {testimonial.naam.split(' ').slice(0, -1).join(' ')}{' '}
                        <em className="italic" style={{ color: palette.primary }}>
                          {testimonial.naam.split(' ').pop()}
                        </em>
                      </>
                    ) : testimonial.naam}
                  </p>
                  <p className="text-[11px] mt-0.5" style={{ color: theme.colors.textMuted }}>
                    {testimonial.functie || testimonial.relatie || 'Cliënt'}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className={`text-center mt-12 ${getRevealClass('up', 300)}`}>
            <p className="text-[9px] uppercase tracking-[2px]" style={{ color: theme.colors.textMuted }}>
              Vertrouwd door families en zorginstellingen
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


// ============================================
// SERENE VARIANT 2 — Contained Image + Numbered Quotes
// ============================================
function TestimonialsSerene2({ theme, palette, testimonials, titel, intro }: TestimonialsComponentProps) {
  const titleParts = titel.split(' ');
  const lastWord = titleParts.pop() || '';
  const restTitle = titleParts.join(' ');

  return (
    <section 
      id="testimonials"
      className="px-6 md:px-12 py-16 lg:py-24"
      style={{ fontFamily: theme.fonts.body, backgroundColor: theme.colors.background }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
          
          <div className={`lg:col-span-5 ${getRevealClass('up')}`}>
            <div className="relative">
              <img 
                src={SFEER_IMAGES[0]}
                alt="Tevreden cliënt"
                className="w-full h-[300px] lg:h-[480px] object-cover"
                style={{ borderRadius: '0 40px 0 0' }}
              />
              <div 
                className="absolute bottom-6 left-6 backdrop-blur-sm px-5 py-3"
                style={{ backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '4px' }}
              >
                <span 
                  className="text-2xl font-light block"
                  style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
                >
                  100%
                </span>
                <span className="text-[9px] uppercase tracking-[2px]" style={{ color: theme.colors.textMuted }}>
                  Tevredenheid
                </span>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className={`mb-10 ${getRevealClass('up')}`}>
              <div 
                className="w-8 h-px mb-6"
                style={{ backgroundColor: palette.primary }}
              />
              <p className="text-[9px] uppercase tracking-[3px] mb-3" style={{ color: theme.colors.textMuted }}>
                Ervaringen
              </p>
              <h2 
                className="text-3xl lg:text-4xl"
                style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
              >
                {restTitle}{' '}
                <em className="italic" style={{ color: palette.primary }}>{lastWord}</em>
              </h2>
            </div>
            
            <div className="space-y-0">
              {testimonials.slice(0, 3).map((testimonial: any, idx: number) => (
                <div key={idx} className={`group ${getRevealClass('up', idx * 100)}`}>
                  <div className="flex gap-6 items-start py-6">
                    <span 
                      className="text-3xl lg:text-4xl font-light leading-none flex-shrink-0"
                      style={{ fontFamily: theme.fonts.heading, color: theme.colors.border }}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="pt-1">
                      <blockquote 
                        className="text-[15px] italic leading-relaxed mb-3"
                        style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                      >
                        &ldquo;{testimonial.tekst}&rdquo;
                      </blockquote>
                      <p 
                        className="text-sm font-semibold"
                        style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                      >
                        {testimonial.naam.includes(' ') ? (
                          <>
                            {testimonial.naam.split(' ').slice(0, -1).join(' ')}{' '}
                            <em className="italic" style={{ color: palette.primary }}>
                              {testimonial.naam.split(' ').pop()}
                            </em>
                          </>
                        ) : testimonial.naam}
                      </p>
                      <p className="text-[11px]" style={{ color: theme.colors.textMuted }}>
                        {testimonial.functie || testimonial.relatie || 'Cliënt'}
                      </p>
                    </div>
                  </div>
                  {idx < Math.min(testimonials.length, 3) - 1 && (
                    <div className="w-full h-px" style={{ backgroundColor: theme.colors.border }} />
                  )}
                </div>
              ))}
            </div>
            
            <div className={`mt-8 ${getRevealClass('up', 300)}`}>
              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 px-6 py-3 text-[10px] uppercase tracking-[2px] text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: palette.primary, borderRadius: '4px' }}
              >
                Neem contact op
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


// ============================================
// SERENE VARIANT 3 — Asymmetric Slider + Whitespace
// ============================================
function TestimonialsSerene3({ theme, palette, testimonials, titel, intro }: TestimonialsComponentProps) {
  const titleParts = titel.split(' ');
  const lastWord = titleParts.pop() || '';
  const restTitle = titleParts.join(' ');

  const [current, setCurrent] = useState(0);
  const total = Math.min(testimonials.length, 3);
  
  const goToSlide = useCallback((n: number) => {
    setCurrent(((n % total) + total) % total);
  }, [total]);
  
  const nextSlide = useCallback(() => goToSlide(current + 1), [current, goToSlide]);
  const prevSlide = useCallback(() => goToSlide(current - 1), [current, goToSlide]);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => ((prev + 1) % total + total) % total);
    }, 7000);
    return () => clearInterval(timer);
  }, [total]);

  return (
    <section 
      id="testimonials"
      className="px-6 md:px-12 py-24 lg:py-32"
      style={{ backgroundColor: theme.colors.background, fontFamily: theme.fonts.body }}
    >
      <div className="max-w-6xl mx-auto">
        <div className={`flex justify-end mb-14 lg:mb-20 ${getRevealClass('up')}`}>
          <div className="max-w-md text-right">
            <div 
              className="w-8 h-px ml-auto mb-6"
              style={{ backgroundColor: palette.primary }}
            />
            <p className="text-[9px] uppercase tracking-[3px] mb-4" style={{ color: theme.colors.textMuted }}>
              Ervaringen
            </p>
            <h2 
              className="text-3xl lg:text-4xl"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {restTitle}{' '}
              <em className="italic" style={{ color: palette.primary }}>{lastWord}</em>
            </h2>
          </div>
        </div>
        
        <div className={`relative ${getRevealClass('up', 100)}`}>
          {testimonials.slice(0, 3).map((testimonial: any, idx: number) => (
            <div 
              key={idx}
              className="transition-all duration-[600ms] ease-out"
              style={{
                opacity: current === idx ? 1 : 0,
                transform: current === idx ? 'translateY(0)' : 'translateY(16px)',
                position: current === idx ? 'relative' : 'absolute',
                inset: current === idx ? undefined : 0,
                pointerEvents: current === idx ? 'auto' : 'none',
              }}
            >
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
                <div className="lg:col-span-5">
                  <div className="mb-6">
                    <img 
                      src={SFEER_IMAGES[idx % SFEER_IMAGES.length]}
                      alt="Zorg"
                      className="w-full h-48 object-cover"
                      style={{ borderRadius: '0 40px 0 0' }}
                    />
                  </div>
                  <p className="text-[9px] uppercase tracking-[2px] mb-3" style={{ color: theme.colors.textMuted }}>
                    {String(idx + 1).padStart(2, '0')}
                  </p>
                  <blockquote 
                    className="text-xl lg:text-2xl italic leading-[1.4]"
                    style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                  >
                    &ldquo;{testimonial.tekst}&rdquo;
                  </blockquote>
                </div>
                
                <div className="lg:col-span-4 lg:col-start-8 lg:pt-32">
                  <div 
                    className="w-8 h-px mb-5"
                    style={{ backgroundColor: palette.primary }}
                  />
                  <p 
                    className="text-lg font-semibold mb-1"
                    style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                  >
                    {testimonial.naam.includes(' ') ? (
                      <>
                        {testimonial.naam.split(' ').slice(0, -1).join(' ')}{' '}
                        <em className="italic" style={{ color: palette.primary }}>
                          {testimonial.naam.split(' ').pop()}
                        </em>
                      </>
                    ) : testimonial.naam}
                  </p>
                  <p className="text-xs mb-4" style={{ color: theme.colors.textMuted }}>
                    {testimonial.functie || testimonial.relatie || 'Cliënt'}
                  </p>
                  <StarRatingSvg color={palette.primary} />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div 
          className={`flex flex-col sm:flex-row items-center justify-between gap-6 mt-14 pt-8 ${getRevealClass('up', 200)}`}
          style={{ borderTop: `1px solid ${theme.colors.border}` }}
        >
          <div className="flex items-center gap-5">
            <button 
              onClick={prevSlide}
              className="flex items-center gap-2 text-[10px] uppercase tracking-[2px] group"
            >
              <span 
                className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors"
                style={{ borderColor: palette.primary }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = palette.primary;
                  const icon = e.currentTarget.querySelector('span') as HTMLElement;
                  if (icon) icon.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  const icon = e.currentTarget.querySelector('span') as HTMLElement;
                  if (icon) icon.style.color = palette.primary;
                }}
              >
                <span className="material-symbols-outlined text-sm" style={{ color: palette.primary }}>
                  arrow_back
                </span>
              </span>
            </button>
            
            <div className="flex items-center gap-2">
              {testimonials.slice(0, 3).map((_: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: current === idx ? 10 : 8,
                    height: current === idx ? 10 : 8,
                    backgroundColor: current === idx ? palette.primary : theme.colors.border,
                  }}
                />
              ))}
            </div>
            
            <button 
              onClick={nextSlide}
              className="flex items-center gap-2 text-[10px] uppercase tracking-[2px] group"
            >
              <span 
                className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors"
                style={{ borderColor: palette.primary }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = palette.primary;
                  const icon = e.currentTarget.querySelector('span') as HTMLElement;
                  if (icon) icon.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  const icon = e.currentTarget.querySelector('span') as HTMLElement;
                  if (icon) icon.style.color = palette.primary;
                }}
              >
                <span className="material-symbols-outlined text-sm" style={{ color: palette.primary }}>
                  arrow_forward
                </span>
              </span>
            </button>
          </div>
          
          <p className="text-[9px] uppercase tracking-[2px]" style={{ color: theme.colors.textMuted }}>
            Vertrouwd door families en zorginstellingen
          </p>
        </div>
      </div>
    </section>
  );
}


// ============================================
// LEGACY: CARDS
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
// LEGACY: CAROUSEL
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
// LEGACY: SINGLE
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