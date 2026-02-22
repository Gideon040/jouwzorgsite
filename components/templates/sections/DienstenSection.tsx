// components/templates/sections/DienstenSection.tsx
// Diensten section met meerdere style varianten
// v2: Fully typed, dynamic data, extracted helpers, varied images

'use client';

import { BaseSectionProps, PaletteColors, DienstenStyle, getRevealClass, getDienstIcon, getJarenErvaring, DIENSTEN_SFEER_IMAGES, resolvePalette } from './types';
import { ThemeConfig } from '../themes';

// ============================================
// TYPES
// ============================================

interface DienstenSectionProps extends BaseSectionProps {
  style?: DienstenStyle;
}

/** Single dienst item from generated content or user input */
interface DienstItem {
  naam: string;
  beschrijving?: string;
  icon?: string;
}

/** Shared props passed to all variant components */
interface DienstenComponentProps {
  theme: ThemeConfig;
  palette: BaseSectionProps['palette'];
  diensten: DienstItem[];
  titel: string;
  intro?: string;
  jarenErvaring: number | null;
  ctaButtonText: string;
}

// DIENSTEN_SFEER_IMAGES imported from ./types

function getSfeerImage(index: number, size: 'sm' | 'md' | 'lg' = 'md'): string {
  const widths = { sm: 400, md: 600, lg: 800 };
  const w = widths[size];
  const base = DIENSTEN_SFEER_IMAGES[index % DIENSTEN_SFEER_IMAGES.length];
  return base.replace('w=800', `w=${w}`);
}

// resolvePalette imported from ./types — alias as p() for brevity
const p = resolvePalette;

// ============================================
// REUSABLE MICRO-COMPONENTS
// ============================================

/** Micro label: "DIENSTEN" / "EXPERTISE" style */
function MicroLabel({ 
  text, 
  color, 
  centered = false,
  withLines = false,
  lineColor,
}: { 
  text: string; 
  color: string; 
  centered?: boolean;
  withLines?: boolean;
  lineColor?: string;
}) {
  if (withLines) {
    return (
      <div className={`flex items-center ${centered ? 'justify-center' : ''} gap-4 mb-6`}>
        {centered && <div className="w-12 h-px" style={{ backgroundColor: lineColor ?? color }} />}
        <span 
          className="text-[10px] font-medium uppercase tracking-[0.2em]"
          style={{ color }}
        >
          {text}
        </span>
        <div className={centered ? 'w-12 h-px' : 'flex-1 h-px'} style={{ backgroundColor: lineColor ?? color }} />
      </div>
    );
  }

  return (
    <span 
      className={`text-[10px] font-medium uppercase tracking-[0.2em] block mb-3 ${centered ? 'text-center' : ''}`}
      style={{ color }}
    >
      {text}
    </span>
  );
}

/** Section title with optional italic last word */
function SectionTitle({
  text,
  font,
  color,
  accentColor,
  size = 'lg',
  centered = false,
  italicLastWord = false,
}: {
  text: string;
  font: string;
  color: string;
  accentColor?: string;
  size?: 'md' | 'lg' | 'xl';
  centered?: boolean;
  italicLastWord?: boolean;
}) {
  const sizeClass = {
    md: 'text-2xl sm:text-3xl lg:text-4xl',
    lg: 'text-3xl sm:text-4xl lg:text-5xl',
    xl: 'text-4xl sm:text-5xl lg:text-6xl',
  }[size];

  if (italicLastWord && text.includes(' ')) {
    const words = text.split(' ');
    const lastWord = words.pop()!;
    const rest = words.join(' ');
    return (
      <h2 
        className={`${sizeClass} leading-[1.1] ${centered ? 'text-center' : ''}`}
        style={{ fontFamily: font, color }}
      >
        {rest}{' '}
        <em className="italic" style={{ color: accentColor ?? color }}>{lastWord}</em>
      </h2>
    );
  }

  return (
    <h2 
      className={`${sizeClass} leading-[1.1] ${centered ? 'text-center' : ''}`}
      style={{ fontFamily: font, color }}
    >
      {text}
    </h2>
  );
}

/** Animated arrow link */
function ArrowLink({
  text,
  color,
  href = '#contact',
  size = 'sm',
}: {
  text: string;
  color: string;
  href?: string;
  size?: 'xs' | 'sm';
}) {
  return (
    <a 
      href={href}
      className={`inline-flex items-center gap-2 ${size === 'xs' ? 'text-xs' : 'text-sm'} font-medium group`}
      style={{ color }}
    >
      <span className="relative">
        {text}
        <span 
          className="absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
          style={{ backgroundColor: color }}
        />
      </span>
      <span className="group-hover:translate-x-1 transition-transform">→</span>
    </a>
  );
}

/** Dienst description fallback */
function dienstBeschrijving(dienst: DienstItem): string {
  return dienst.beschrijving || 'Professionele zorg met aandacht voor uw persoonlijke situatie.';
}

// ============================================
// MAIN COMPONENT — ROUTER
// ============================================

export function DienstenSection({ 
  style = 'editorial', 
  theme, 
  palette, 
  content, 
  generated,
}: DienstenSectionProps) {
  const diensten: DienstItem[] = generated?.diensten?.items || content.diensten || [];
  const titel = generated?.diensten?.titel || 'Mijn expertise';
  const intro = generated?.diensten?.intro;
  const jarenErvaring = getJarenErvaring(content.werkervaring);
  const ctaButtonText = generated?.cta?.button || 'Neem contact op';
  
  if (!diensten.length) return null;
  
  const sharedProps: DienstenComponentProps = { 
    theme, 
    palette,
    diensten, 
    titel, 
    intro,
    jarenErvaring,
    ctaButtonText,
  };
  
  switch (style) {
    // ============================================
    // EDITORIAL VARIANTEN
    // ============================================
    case 'editorial':
      return <DienstenEditorial {...sharedProps} />;
    case 'editorial-2':
      return <DienstenEditorial2 {...sharedProps} />;
    case 'editorial-3':
      return <DienstenEditorial3 {...sharedProps} />;
    
    // ============================================
    // PROACTIEF VARIANTEN
    // ============================================
    case 'proactief':
      return <DienstenProactief {...sharedProps} />;
    case 'proactief-2':
      return <DienstenProactief2 {...sharedProps} />;
    case 'proactief-3':
      return <DienstenProactief3 {...sharedProps} />;
    
    // ============================================
    // PORTFOLIO VARIANTEN
    // ============================================
    case 'portfolio':
      return <DienstenPortfolio {...sharedProps} />;
    case 'portfolio-2':
      return <DienstenPortfolio2 {...sharedProps} />;
    case 'portfolio-3':
      return <DienstenPortfolio3 {...sharedProps} />;
    
    // ============================================
    // MINDOOR VARIANTEN
    // ============================================
    case 'mindoor':
      return <DienstenMindoor {...sharedProps} />;
    case 'mindoor-2':
      return <DienstenMindoor2 {...sharedProps} />;
    case 'mindoor-3':
      return <DienstenMindoor3 {...sharedProps} />;
    
    // ============================================
    // SERENE VARIANTEN
    // ============================================
    case 'serene':
      return <DienstenSerene {...sharedProps} />;
    case 'serene-2':
      return <DienstenSerene2 {...sharedProps} />;
    case 'serene-3':
      return <DienstenSerene3 {...sharedProps} />;
    
    // ============================================
    // LEGACY/UTILITY STYLES
    // ============================================
    case 'cards':
      return <DienstenCards {...sharedProps} />;
    case 'numbered':
      return <DienstenNumbered {...sharedProps} />;
    case 'list':
      return <DienstenList {...sharedProps} />;
    case 'grid':
      return <DienstenGrid {...sharedProps} />;
    
    default:
      return <DienstenEditorial {...sharedProps} />;
  }
}


// ============================================
// EDITORIAL — Genummerd, border-bottom, "Meer info →"
// ============================================
function DienstenEditorial({ theme, palette, diensten, titel, intro, ctaButtonText }: DienstenComponentProps) {
  return (
    <section 
      id="diensten"
      className="px-6 md:px-16 lg:px-32 py-20"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className={`mb-14 ${getRevealClass('up')}`}>
          <span 
            className="text-xs font-semibold uppercase tracking-[0.15em] block mb-3"
            style={{ fontVariant: 'small-caps', color: palette.primary }}
          >
            Inzetbaar voor
          </span>
          <h2 
            className="text-3xl md:text-4xl"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            {titel}
          </h2>
          {intro && (
            <p className="mt-4 max-w-2xl" style={{ color: theme.colors.textMuted }}>
              {intro}
            </p>
          )}
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {diensten.slice(0, 8).map((dienst, index) => (
            <div 
              key={index} 
              className={`flex flex-col gap-5 ${getRevealClass('up', (index % 3) + 1)}`}
            >
              <div className="flex flex-col gap-4">
                <div 
                  className="flex items-center gap-3 border-b pb-4"
                  style={{ borderColor: theme.colors.border }}
                >
                  <span 
                    className="material-symbols-outlined"
                    style={{ color: palette.primary }}
                  >
                    {dienst.icon || getDienstIcon(index)}
                  </span>
                  <h3 
                    className="text-xl font-semibold"
                    style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                  >
                    {index + 1}. {dienst.naam}
                  </h3>
                </div>
                <p 
                  className="text-sm leading-relaxed"
                  style={{ color: theme.colors.textMuted }}
                >
                  {dienstBeschrijving(dienst)}
                </p>
              </div>
              <a 
                href="#contact"
                className="text-xs font-semibold uppercase tracking-widest flex items-center gap-1 hover:underline underline-offset-4 transition-all"
                style={{ color: palette.primary }}
              >
                Meer info 
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}

// ============================================
// EDITORIAL VARIANT 2 — Asymmetrisch Split + Ghost Numbers
// ============================================
function DienstenEditorial2({ theme, palette, diensten, titel, intro, ctaButtonText }: DienstenComponentProps) {
  const safe = p(palette);

  return (
    <section 
      id="diensten"
      className="px-6 md:px-16 lg:px-20 py-20 lg:py-32"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left: Sticky header */}
          <div className={`lg:col-span-4 lg:sticky lg:top-24 lg:self-start ${getRevealClass('up')}`}>
            <MicroLabel text="Expertise" color={safe.textMuted} withLines lineColor={safe.border} />
            <SectionTitle 
              text={titel} 
              font={theme.fonts.heading} 
              color={theme.colors.text}
              accentColor={palette.primary}
              italicLastWord
            />
            <p 
              className="text-sm leading-relaxed mb-8 mt-6"
              style={{ color: theme.colors.textMuted }}
            >
              {intro || 'Professionele zorg afgestemd op uw persoonlijke situatie en wensen.'}
            </p>
            <ArrowLink text={ctaButtonText} color={palette.primary} />
          </div>
          
          {/* Right: Services list */}
          <div className="lg:col-span-8">
            <div className="space-y-0">
              {diensten.map((dienst, idx) => (
                <a
                  key={idx}
                  href="#contact"
                  className={`group relative block py-10 border-b transition-colors ${getRevealClass('up', (idx + 1) * 100)}`}
                  style={{ borderColor: theme.colors.border }}
                >
                  {/* Ghost number */}
                  <span 
                    className="absolute -left-4 lg:left-0 top-6 text-[100px] lg:text-[140px] font-light leading-none pointer-events-none select-none"
                    style={{ 
                      fontFamily: theme.fonts.heading, 
                      color: palette.primary, 
                      opacity: 0.06 
                    }}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="relative">
                    <h3 
                      className="text-xl lg:text-2xl font-medium mb-3"
                      style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                    >
                      {dienst.naam}
                    </h3>
                    <p 
                      className="text-sm leading-relaxed max-w-lg"
                      style={{ color: theme.colors.textMuted }}
                    >
                      {dienstBeschrijving(dienst)}
                    </p>
                    <span 
                      className="inline-block mt-4 text-xs font-medium uppercase tracking-widest opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"
                      style={{ color: palette.primary }}
                    >
                      Meer weten →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

// ============================================
// EDITORIAL VARIANT 3 — Full-width Minimal + Hover Expand
// ============================================
function DienstenEditorial3({ theme, palette, diensten, titel, intro, ctaButtonText }: DienstenComponentProps) {
  return (
    <section 
      id="diensten"
      className="px-6 md:px-16 lg:px-20 py-20 lg:py-32"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-5xl mx-auto">
        
        {/* Centered Header */}
        <div className={`text-center mb-16 lg:mb-20 ${getRevealClass('up')}`}>
          <MicroLabel text="Diensten" color={theme.colors.textMuted} withLines lineColor={palette.primary} centered />
          <SectionTitle 
            text={titel} 
            font={theme.fonts.heading} 
            color={theme.colors.text}
            accentColor={palette.primary}
            italicLastWord
            centered
          />
        </div>
        
        {/* Services as expandable items */}
        <div className="space-y-0">
          {diensten.map((dienst, idx) => (
            <a
              key={idx}
              href="#contact"
              className={`group block border-t py-6 lg:py-8 ${idx === diensten.length - 1 ? 'border-b' : ''} ${getRevealClass('up', (idx + 1) * 50)}`}
              style={{ borderColor: theme.colors.border }}
            >
              <div className="flex items-start justify-between gap-8">
                <div className="flex-1">
                  <div className="flex items-baseline gap-6">
                    <span 
                      className="text-xs font-medium"
                      style={{ color: theme.colors.textMuted }}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h3 
                      className="text-lg lg:text-xl font-medium group-hover:translate-x-2 transition-transform"
                      style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                    >
                      {dienst.naam}
                    </h3>
                  </div>
                  <p 
                    className="ml-10 mt-3 text-sm leading-relaxed max-w-xl opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-40 overflow-hidden transition-all duration-300"
                    style={{ color: theme.colors.textMuted }}
                  >
                    {dienstBeschrijving(dienst)}
                  </p>
                </div>
                <span 
                  className="text-lg opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                  style={{ color: palette.primary }}
                >
                  →
                </span>
              </div>
            </a>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className={`text-center mt-12 lg:mt-16 ${getRevealClass('up')}`}>
          <p className="text-sm mb-4" style={{ color: theme.colors.textMuted }}>
            Andere zorgvraag?
          </p>
          <ArrowLink text={ctaButtonText} color={palette.primary} />
        </div>
        
      </div>
    </section>
  );
}


// ============================================
// PROACTIEF — Cards met icon, top-border hover, decoratieve cirkels
// ============================================
function DienstenProactief({ theme, palette, diensten, titel, intro }: DienstenComponentProps) {
  return (
    <section 
      id="diensten"
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
          <span 
            className="text-sm italic mb-3 block"
            style={{ color: palette.primary }}
          >
            Onze diensten
          </span>
          <h2 
            className="text-4xl font-bold mb-6"
            style={{ fontFamily: theme.fonts.heading, color: palette.primaryDark }}
          >
            {titel}
          </h2>
          {intro && (
            <p 
              className="text-[15px] leading-relaxed"
              style={{ color: theme.colors.textMuted }}
            >
              {intro}
            </p>
          )}
        </div>
        
        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {diensten.map((dienst, idx) => (
            <div 
              key={idx}
              className={`bg-white p-10 shadow-[0_10px_40px_rgba(0,0,0,0.04)] relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,153,204,0.12)] group ${getRevealClass('up', idx * 100)}`}
            >
              {/* Top border on hover */}
              <div 
                className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(90deg, ${palette.primary}, ${palette.primaryDark})` }}
              />
              
              {/* Icon */}
              <div 
                className="w-[70px] h-[70px] rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: palette.primaryLight }}
              >
                <span 
                  className="material-symbols-outlined text-3xl"
                  style={{ color: palette.primary }}
                >
                  {dienst.icon || getDienstIcon(idx)}
                </span>
              </div>
              
              {/* Content */}
              <h3 
                className="text-xl font-semibold mb-4"
                style={{ color: theme.colors.text }}
              >
                {dienst.naam}
              </h3>
              <p 
                className="text-sm leading-relaxed"
                style={{ color: theme.colors.textMuted }}
              >
                {dienstBeschrijving(dienst)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// PROACTIEF VARIANT 2 — Split Layout + Border-Left Accent
// ============================================
function DienstenProactief2({ theme, palette, diensten, titel, intro, ctaButtonText }: DienstenComponentProps) {
  const safe = p(palette);

  return (
    <section 
      id="diensten"
      className="py-24 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left: Header */}
          <div className={`lg:col-span-5 ${getRevealClass('up')}`}>
            <div className="lg:sticky lg:top-24">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px" style={{ backgroundColor: palette.primary }} />
                <span 
                  className="text-xs font-semibold uppercase tracking-[0.15em]"
                  style={{ color: palette.primary }}
                >
                  Diensten
                </span>
              </div>
              <h2 
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
                style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
              >
                {titel}
              </h2>
              <p 
                className="text-base leading-relaxed mb-8"
                style={{ color: theme.colors.textMuted }}
              >
                {intro || 'Professionele zorg afgestemd op uw persoonlijke situatie. Flexibel, betrouwbaar en met aandacht voor kwaliteit.'}
              </p>
              <a 
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-colors"
                style={{ backgroundColor: palette.primary }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = palette.primaryHover}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = palette.primary}
              >
                {ctaButtonText}
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </a>
              
              {/* Sfeerbeeld */}
              <div className="mt-10">
                <img 
                  src={getSfeerImage(0, 'sm')}
                  alt="Zorgverlener aan het werk"
                  className="w-full h-40 object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* Right: Services list */}
          <div className="lg:col-span-7">
            <div className="space-y-6">
              {diensten.map((dienst, idx) => (
                <a
                  key={idx}
                  href="#contact"
                  className={`group block p-6 border-l-4 transition-all ${getRevealClass('up', (idx + 1) * 100)}`}
                  style={{ 
                    backgroundColor: theme.colors.backgroundAlt,
                    borderColor: idx === 0 ? palette.primary : 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = palette.primary;
                    e.currentTarget.style.backgroundColor = palette.primaryLight;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = idx === 0 ? palette.primary : 'transparent';
                    e.currentTarget.style.backgroundColor = theme.colors.backgroundAlt;
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                      style={{ 
                        backgroundColor: idx === 0 ? palette.primary : theme.colors.border 
                      }}
                    >
                      <span 
                        className="material-symbols-outlined text-xl"
                        style={{ color: idx === 0 ? 'white' : theme.colors.textMuted }}
                      >
                        {dienst.icon || getDienstIcon(idx)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 
                          className="text-lg font-semibold"
                          style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                        >
                          {dienst.naam}
                        </h3>
                        <span 
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ color: palette.primary }}
                        >
                          →
                        </span>
                      </div>
                      <p className="text-sm" style={{ color: theme.colors.textMuted }}>
                        {dienstBeschrijving(dienst)}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

// ============================================
// PROACTIEF VARIANT 3 — Numbered Grid + Stats Feel
// ============================================
function DienstenProactief3({ theme, palette, diensten, titel, intro, ctaButtonText }: DienstenComponentProps) {
  return (
    <section 
      id="diensten"
      className="py-24 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className={`text-center mb-16 ${getRevealClass('up')}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ backgroundColor: palette.primary }} />
            <span 
              className="text-xs font-semibold uppercase tracking-[0.15em]"
              style={{ color: palette.primary }}
            >
              Expertise
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
        
        {/* Numbered Grid */}
        <div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{ backgroundColor: theme.colors.border }}
        >
          {diensten.slice(0, 8).map((dienst, idx) => (
            <a
              key={idx}
              href="#contact"
              className={`group p-8 transition-colors duration-300 ${getRevealClass('up', (idx + 1) * 50)}`}
              style={{ backgroundColor: theme.colors.background }}
              // NOTE: querySelector is used for hover effects because Tailwind cannot apply
              // hover styles with runtime-dynamic palette colors (e.g. hover:text-[${color}]).
              // A CSS custom properties approach would be cleaner but requires refactoring all variants.
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = palette.primary;
                const number = e.currentTarget.querySelector('.dienst-number') as HTMLElement;
                const title = e.currentTarget.querySelector('.dienst-title') as HTMLElement;
                const desc = e.currentTarget.querySelector('.dienst-desc') as HTMLElement;
                const btn = e.currentTarget.querySelector('.dienst-btn') as HTMLElement;
                if (number) number.style.color = 'rgba(255,255,255,0.3)';
                if (title) title.style.color = 'white';
                if (desc) desc.style.color = 'rgba(255,255,255,0.8)';
                if (btn) {
                  btn.style.borderColor = 'white';
                  btn.style.backgroundColor = 'white';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = theme.colors.background;
                const number = e.currentTarget.querySelector('.dienst-number') as HTMLElement;
                const title = e.currentTarget.querySelector('.dienst-title') as HTMLElement;
                const desc = e.currentTarget.querySelector('.dienst-desc') as HTMLElement;
                const btn = e.currentTarget.querySelector('.dienst-btn') as HTMLElement;
                if (number) number.style.color = palette.primary;
                if (title) title.style.color = theme.colors.text;
                if (desc) desc.style.color = theme.colors.textMuted;
                if (btn) {
                  btn.style.borderColor = palette.primary;
                  btn.style.backgroundColor = 'transparent';
                }
              }}
            >
              <div className="flex items-start justify-between mb-6">
                <span 
                  className="dienst-number text-5xl font-bold transition-colors"
                  style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span 
                  className="dienst-btn w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors"
                  style={{ borderColor: palette.primary }}
                >
                  <span 
                    className="material-symbols-outlined text-lg"
                    style={{ color: palette.primary }}
                  >
                    arrow_forward
                  </span>
                </span>
              </div>
              <h3 
                className="dienst-title text-xl font-bold mb-3 transition-colors"
                style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
              >
                {dienst.naam}
              </h3>
              <p 
                className="dienst-desc text-sm transition-colors"
                style={{ color: theme.colors.textMuted }}
              >
                {dienstBeschrijving(dienst)}
              </p>
            </a>
          ))}
          
          {/* CTA Card with background image */}
          <a
            href="#contact"
            className={`group relative p-8 overflow-hidden flex flex-col justify-center min-h-[200px] ${getRevealClass('up', 300)}`}
          >
            <img 
              src={getSfeerImage(2, 'md')}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div 
              className="absolute inset-0 transition-colors"
              style={{ backgroundColor: `${palette.primary}e6` }}
            />
            <div className="relative z-10">
              <h3 
                className="text-xl font-bold mb-3 text-white"
                style={{ fontFamily: theme.fonts.heading }}
              >
                Andere zorgvraag?
              </h3>
              <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Neem contact op om de mogelijkheden te bespreken.
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                {ctaButtonText}
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
// PORTFOLIO — Featured + Bento Grid met Sfeerbeeld
// ============================================
function DienstenPortfolio({ theme, palette, diensten, titel, intro, ctaButtonText }: DienstenComponentProps) {
  const safe = p(palette);
  const firstDienst = diensten[0];
  const otherDiensten = diensten.slice(1, 8);
  
  return (
    <section 
      id="diensten"
      className="px-6 md:px-12 py-24 lg:py-32"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16 ${getRevealClass('up')}`}>
          <div>
            <MicroLabel text="Mijn expertise" color={safe.accent} />
            <SectionTitle 
              text={titel} 
              font={theme.fonts.heading} 
              color={palette.primary}
              accentColor={safe.accent}
              italicLastWord
            />
          </div>
          <ArrowLink text={ctaButtonText} color={palette.primary} />
        </div>
        
        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Featured: Image card spanning 2 rows */}
          {firstDienst && (
            <a 
              href="#contact"
              className={`group relative md:row-span-2 overflow-hidden min-h-[300px] lg:min-h-[400px] ${getRevealClass('up')}`}
              style={{ borderRadius: '0 80px 0 0' }}
            >
              <img 
                src={getSfeerImage(0, 'md')}
                alt={firstDienst.naam}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div 
                className="absolute inset-0"
                style={{ background: `linear-gradient(to top, ${palette.primary}e6, ${palette.primary}33, transparent)` }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <span className="text-xs uppercase tracking-wider text-white/60 mb-2 block">Hoofddienst</span>
                <h3 
                  className="text-2xl lg:text-3xl font-medium text-white mb-2"
                  style={{ fontFamily: theme.fonts.heading }}
                >
                  {firstDienst.naam}
                </h3>
                <p className="text-sm text-white/80 mb-4">
                  {dienstBeschrijving(firstDienst)}
                </p>
                <span className="text-sm font-medium text-white flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  Meer info <span>→</span>
                </span>
              </div>
            </a>
          )}
          
          {/* Other services as bordered cards */}
          {otherDiensten.map((dienst, idx) => (
            <a
              key={idx}
              href="#contact"
              className={`group p-6 lg:p-8 flex flex-col justify-between min-h-[180px] border transition-colors ${getRevealClass('up', (idx + 1) * 50)}`}
              style={{ 
                borderColor: theme.colors.border, 
                backgroundColor: theme.colors.background 
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = safe.accent}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = theme.colors.border}
            >
              <div>
                <h3 
                  className="text-xl font-medium mb-2"
                  style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
                >
                  {dienst.naam}
                </h3>
                <p className="text-sm" style={{ color: theme.colors.textMuted }}>
                  {dienstBeschrijving(dienst)}
                </p>
              </div>
              <span 
                className="text-sm font-medium flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: safe.accent }}
              >
                Meer info <span>→</span>
              </span>
            </a>
          ))}
          
        </div>
      </div>
    </section>
  );
}

// ============================================
// PORTFOLIO VARIANT 2 — Elegant Split + Large Image
// ============================================
function DienstenPortfolio2({ theme, palette, diensten, titel, intro, jarenErvaring, ctaButtonText }: DienstenComponentProps) {
  const safe = p(palette);
  const ervaringLabel = jarenErvaring ? `${jarenErvaring}+` : '10+';
  
  return (
    <section 
      id="diensten"
      className="px-6 md:px-12 py-24 lg:py-32"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Image */}
          <div className={`relative ${getRevealClass('left')}`}>
            <div 
              className="absolute -top-4 -left-4 w-32 h-32 border-2 opacity-20"
              style={{ borderColor: safe.accent }}
            />
            <img 
              src={getSfeerImage(1, 'lg')}
              alt="Zorgverlener"
              className="w-full h-[400px] lg:h-[500px] object-cover"
              style={{ borderRadius: '0 80px 0 0' }}
            />
            <div 
              className="absolute -bottom-6 -right-6 p-6 shadow-xl max-w-[200px]"
              style={{ backgroundColor: theme.colors.background }}
            >
              <span 
                className="text-4xl font-light block mb-1"
                style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
              >
                {ervaringLabel}
              </span>
              <span className="text-xs uppercase tracking-wider" style={{ color: theme.colors.textMuted }}>
                Jaar ervaring
              </span>
            </div>
          </div>
          
          {/* Right: Content */}
          <div className={getRevealClass('right')}>
            <MicroLabel text="Mijn expertise" color={safe.accent} />
            <SectionTitle 
              text={titel} 
              font={theme.fonts.heading} 
              color={palette.primary}
              accentColor={safe.accent}
              size="lg"
              italicLastWord
            />
            
            {/* Services list */}
            <div className="space-y-6 mt-8">
              {diensten.slice(0, 8).map((dienst, idx) => (
                <a
                  key={idx}
                  href="#contact"
                  className={`group flex items-start gap-5 pb-6 ${idx < Math.min(diensten.length, 8) - 1 ? 'border-b' : ''}`}
                  style={{ borderColor: theme.colors.border }}
                >
                  <span 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: idx === 0 ? palette.primary : theme.colors.border }}
                  >
                    <span 
                      className="material-symbols-outlined text-xl"
                      style={{ color: idx === 0 ? 'white' : palette.primary }}
                    >
                      {dienst.icon || getDienstIcon(idx)}
                    </span>
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 
                        className="text-lg font-medium mb-1"
                        style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
                      >
                        {dienst.naam}
                      </h3>
                      <span 
                        className="text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: safe.accent }}
                      >
                        Meer info →
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: theme.colors.textMuted }}>
                      {dienstBeschrijving(dienst)}
                    </p>
                  </div>
                </a>
              ))}
            </div>
            
            <a 
              href="#contact"
              className="inline-flex items-center gap-3 mt-10 px-8 py-4 rounded-full text-sm font-medium text-white transition-all hover:gap-4"
              style={{ backgroundColor: palette.primary }}
            >
              {ctaButtonText}
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </a>
          </div>
          
        </div>
      </div>
    </section>
  );
}

// ============================================
// PORTFOLIO VARIANT 3 — Alternating Image + Text Rows
// ============================================
function DienstenPortfolio3({ theme, palette, diensten, titel, intro, ctaButtonText }: DienstenComponentProps) {
  const safe = p(palette);
  
  return (
    <section 
      id="diensten"
      className="px-6 md:px-12 py-24 lg:py-32"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className={`text-center mb-16 lg:mb-24 ${getRevealClass('up')}`}>
          <MicroLabel text="Wat ik bied" color={safe.accent} centered />
          <SectionTitle 
            text={titel} 
            font={theme.fonts.heading} 
            color={palette.primary}
            accentColor={safe.accent}
            italicLastWord
            centered
          />
        </div>
        
        {/* Alternating rows */}
        {diensten.slice(0, 8).map((dienst, idx) => (
          <a
            key={idx}
            href="#contact"
            className={`group grid md:grid-cols-2 gap-8 lg:gap-16 items-center ${idx < Math.min(diensten.length, 8) - 1 ? 'mb-16 lg:mb-24' : ''} ${getRevealClass('up', (idx + 1) * 100)}`}
          >
            <div className={`relative overflow-hidden ${idx % 2 === 1 ? 'md:order-2' : ''}`} style={{ borderRadius: '0 80px 0 0' }}>
              <img 
                src={getSfeerImage(idx, 'md')}
                alt={dienst.naam}
                className="w-full h-64 lg:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className={idx % 2 === 1 ? 'md:order-1' : ''}>
              <span 
                className="text-6xl lg:text-7xl font-light opacity-10 block mb-2"
                style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
              >
                {String(idx + 1).padStart(2, '0')}
              </span>
              <h3 
                className="text-2xl lg:text-3xl font-medium mb-4 -mt-8"
                style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
              >
                {dienst.naam}
              </h3>
              <p className="text-base mb-6" style={{ color: theme.colors.textMuted }}>
                {dienstBeschrijving(dienst)}
              </p>
              <span 
                className="text-sm font-medium flex items-center gap-2 group-hover:gap-4 transition-all"
                style={{ color: safe.accent }}
              >
                Meer informatie <span>→</span>
              </span>
            </div>
          </a>
        ))}
        
      </div>
    </section>
  );
}


// ============================================
// MINDOOR — Orbital layout met concentric circles
// ============================================
function DienstenMindoor({ theme, palette, diensten, titel, intro, ctaButtonText }: DienstenComponentProps) {
  const safe = p(palette);
  
  return (
    <section 
      id="diensten"
      className="px-6 md:px-12 py-24 lg:py-32"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="relative min-h-[600px] lg:min-h-[700px] flex flex-col justify-center">
          
          {/* Central decorative circles */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] pointer-events-none">
            <div 
              className="absolute inset-0 border rounded-full"
              style={{ borderColor: `${safe.accent}60` }}
            />
            <div 
              className="absolute inset-8 lg:inset-12 border rounded-full"
              style={{ borderColor: `${palette.primary}50` }}
            />
            <div 
              className="absolute inset-16 lg:inset-24 border rounded-full"
              style={{ borderColor: `${safe.accent}40` }}
            />
          </div>
          
          {/* Center Title */}
          <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 ${getRevealClass('up')}`}>
            <span className="text-sm font-medium mb-2 block" style={{ color: palette.primary }}>
              Mijn expertise
            </span>
            <SectionTitle 
              text={titel} 
              font={theme.fonts.heading} 
              color={theme.colors.text}
              accentColor={safe.accent}
              size="md"
              italicLastWord
              centered
            />
          </div>
          
          {/* Top row cards */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-x-[450px] mb-auto relative z-10">
            {diensten.slice(0, 2).map((dienst, idx) => (
              <MindoorCard
                key={idx}
                dienst={dienst}
                index={idx}
                theme={theme}
                palette={palette}
                hoverColor={palette.primary}
                position={idx === 1 ? 'right' : 'left'}
              />
            ))}
          </div>
          
          {/* Spacer for center */}
          <div className="py-16 lg:py-24" />
          
          {/* Bottom row cards */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-x-[450px] mt-auto relative z-10">
            {diensten.slice(2, 8).map((dienst, idx) => (
              <MindoorCard
                key={idx}
                dienst={dienst}
                index={idx + 2}
                theme={theme}
                palette={palette}
                hoverColor={idx === 0 ? safe.accent : palette.primary}
                position={idx === 1 ? 'right' : 'left'}
              />
            ))}
          </div>
          
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-8">
          <ArrowLink text={ctaButtonText} color={palette.primary} />
        </div>
        
      </div>
    </section>
  );
}

/** Reusable card for Mindoor orbital layout */
function MindoorCard({ 
  dienst, index, theme, palette, hoverColor, position 
}: { 
  dienst: DienstItem; 
  index: number; 
  theme: ThemeConfig; 
  palette: PaletteColors; 
  hoverColor: string;
  position: 'left' | 'right';
}) {
  const safe = p(palette);
  const bgColor = theme.colors.background === '#f0fdf4' ? 'white' : theme.colors.backgroundAlt;
  const iconColor = index < 2 ? palette.primary : (index === 2 ? safe.accent : palette.primary);

  return (
    <a
      href="#contact"
      className={`group p-6 rounded-3xl transition-colors ${position === 'right' ? 'lg:max-w-xs lg:ml-auto' : 'lg:max-w-xs'} ${getRevealClass('up', (index + 1) * 100)}`}
      style={{ backgroundColor: bgColor }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = hoverColor;
        const h3 = e.currentTarget.querySelector('h3') as HTMLElement;
        const desc = e.currentTarget.querySelector('p') as HTMLElement;
        const icon = e.currentTarget.querySelector('.icon') as HTMLElement;
        if (h3) h3.style.color = 'white';
        if (desc) desc.style.color = 'rgba(255,255,255,0.8)';
        if (icon) icon.style.color = 'rgba(255,255,255,0.7)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = bgColor;
        const h3 = e.currentTarget.querySelector('h3') as HTMLElement;
        const desc = e.currentTarget.querySelector('p') as HTMLElement;
        const icon = e.currentTarget.querySelector('.icon') as HTMLElement;
        if (h3) h3.style.color = theme.colors.text;
        if (desc) desc.style.color = theme.colors.textMuted;
        if (icon) icon.style.color = iconColor;
      }}
    >
      <span 
        className="icon material-symbols-outlined text-2xl mb-3 block transition-colors"
        style={{ color: iconColor }}
      >
        {dienst.icon || getDienstIcon(index)}
      </span>
      <h3 
        className="text-lg font-medium mb-1 transition-colors"
        style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
      >
        {dienst.naam}
      </h3>
      <p className="text-sm transition-colors" style={{ color: theme.colors.textMuted }}>
        {dienst.beschrijving || 'Professionele zorg met aandacht.'}
      </p>
    </a>
  );
}

// ============================================
// MINDOOR VARIANT 2 — Bento Mosaic + Sfeerbeelden
// ============================================
function DienstenMindoor2({ theme, palette, diensten, titel, intro, jarenErvaring, ctaButtonText }: DienstenComponentProps) {
  const safe = p(palette);
  const ervaringLabel = jarenErvaring ? `${jarenErvaring}+` : '10+';
  
  return (
    <section 
      id="diensten"
      className="px-6 md:px-12 py-24 lg:py-32"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className={`max-w-2xl mb-12 lg:mb-16 ${getRevealClass('up')}`}>
          <span className="text-sm font-medium mb-3 block" style={{ color: palette.primaryDark }}>
            Mijn expertise
          </span>
          <SectionTitle
            text={titel}
            font={theme.fonts.heading}
            color={theme.colors.text}
            accentColor={safe.accent}
            italicLastWord
          />
          {intro && (
            <p className="mt-4" style={{ color: theme.colors.textMuted }}>{intro}</p>
          )}
        </div>
        
        {/* Bento Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          
          {/* Large image card */}
          <a
            href="#contact"
            className={`group col-span-2 row-span-2 relative rounded-[32px] overflow-hidden min-h-[350px] lg:min-h-[420px] ${getRevealClass('up')}`}
          >
            <img 
              src={getSfeerImage(0, 'lg')}
              alt={diensten[0]?.naam || 'Zorg'}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
              <span className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Hoofddienst</span>
              <h3 
                className="text-2xl lg:text-3xl font-medium text-white mb-2"
                style={{ fontFamily: theme.fonts.heading }}
              >
                {diensten[0]?.naam || 'Thuiszorg'}
              </h3>
              <p className="text-white/80 text-sm hidden sm:block">
                {diensten[0] ? dienstBeschrijving(diensten[0]) : 'Persoonlijke verzorging in uw eigen omgeving.'}
              </p>
            </div>
          </a>
          
          {/* Service card 1 - colored */}
          <a
            href="#contact"
            className={`group p-6 rounded-[24px] flex flex-col justify-between min-h-[180px] transition-all hover:-translate-y-1 ${getRevealClass('up', 100)}`}
            style={{ backgroundColor: palette.primary }}
          >
            <span className="material-symbols-outlined text-2xl text-white/80">
              {diensten[1]?.icon || getDienstIcon(1)}
            </span>
            <div>
              <h3 
                className="text-lg font-medium text-white mb-1"
                style={{ fontFamily: theme.fonts.heading }}
              >
                {diensten[1]?.naam || 'Medicatie'}
              </h3>
              <span className="text-sm text-white/70 group-hover:text-white transition-colors">Bekijk →</span>
            </div>
          </a>
          
          {/* Service card 2 - white */}
          <a
            href="#contact"
            className={`group p-6 rounded-[24px] flex flex-col justify-between min-h-[180px] transition-all hover:-translate-y-1 ${getRevealClass('up', 150)}`}
            style={{ backgroundColor: theme.colors.background }}
          >
            <span className="material-symbols-outlined text-2xl" style={{ color: palette.primary }}>
              {diensten[2]?.icon || getDienstIcon(2)}
            </span>
            <div>
              <h3 
                className="text-lg font-medium mb-1"
                style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
              >
                {diensten[2]?.naam || 'Wondzorg'}
              </h3>
              <span 
                className="text-sm group-hover:translate-x-1 inline-block transition-transform"
                style={{ color: palette.primary }}
              >
                Bekijk →
              </span>
            </div>
          </a>
          
          {/* Stat card */}
          <div 
            className={`p-6 rounded-[24px] flex flex-col justify-center text-center ${getRevealClass('up', 200)}`}
            style={{ backgroundColor: safe.accentLight ?? palette.primaryLight }}
          >
            <span 
              className="text-4xl font-light mb-2"
              style={{ fontFamily: theme.fonts.heading, color: safe.accent }}
            >
              {ervaringLabel}
            </span>
            <span className="text-xs uppercase tracking-wider" style={{ color: theme.colors.textMuted }}>
              Jaar ervaring
            </span>
          </div>
          
          {/* Service card 3 - white */}
          <a
            href="#contact"
            className={`group p-6 rounded-[24px] flex flex-col justify-between min-h-[180px] transition-all hover:-translate-y-1 ${getRevealClass('up', 250)}`}
            style={{ backgroundColor: theme.colors.background }}
          >
            <span className="material-symbols-outlined text-2xl" style={{ color: palette.primary }}>
              {diensten[3]?.icon || getDienstIcon(3)}
            </span>
            <div>
              <h3
                className="text-lg font-medium mb-1"
                style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
              >
                {diensten[3]?.naam || 'Palliatieve zorg'}
              </h3>
              <span
                className="text-sm group-hover:translate-x-1 inline-block transition-transform"
                style={{ color: palette.primary }}
              >
                Bekijk →
              </span>
            </div>
          </a>

          {/* Extra service cards (5+) */}
          {diensten.slice(4, 8).map((dienst, idx) => (
            <a
              key={idx + 4}
              href="#contact"
              className={`group p-6 rounded-[24px] flex flex-col justify-between min-h-[180px] transition-all hover:-translate-y-1 ${getRevealClass('up', (idx + 4) * 50)}`}
              style={{ backgroundColor: theme.colors.background }}
            >
              <span className="material-symbols-outlined text-2xl" style={{ color: palette.primary }}>
                {dienst.icon || getDienstIcon(idx + 4)}
              </span>
              <div>
                <h3
                  className="text-lg font-medium mb-1"
                  style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                >
                  {dienst.naam}
                </h3>
                <span
                  className="text-sm group-hover:translate-x-1 inline-block transition-transform"
                  style={{ color: palette.primary }}
                >
                  Bekijk →
                </span>
              </div>
            </a>
          ))}

          {/* Small image */}
          <div className={`rounded-[24px] overflow-hidden ${getRevealClass('up', 300)}`}>
            <img 
              src={getSfeerImage(3, 'sm')}
              alt="Zorg sfeer"
              className="w-full h-full object-cover min-h-[180px]"
            />
          </div>
          
          {/* CTA card */}
          <a
            href="#contact"
            className={`group col-span-2 p-6 lg:p-8 rounded-[24px] flex items-center justify-between ${getRevealClass('up', 350)}`}
            style={{ backgroundColor: theme.colors.text }}
          >
            <div>
              <h3 
                className="text-lg lg:text-xl font-medium text-white mb-1"
                style={{ fontFamily: theme.fonts.heading }}
              >
                Andere zorgvraag?
              </h3>
              <p className="text-sm text-white/60">Laten we kennismaken</p>
            </div>
            <span className="w-12 h-12 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined" style={{ color: theme.colors.text }}>arrow_forward</span>
            </span>
          </a>
          
        </div>
      </div>
    </section>
  );
}

// ============================================
// MINDOOR VARIANT 3 — Horizontal Scroll + Overlap
// ============================================
function DienstenMindoor3({ theme, palette, diensten, titel, intro, ctaButtonText }: DienstenComponentProps) {
  const safe = p(palette);
  
  return (
    <section 
      id="diensten"
      className="py-24 lg:py-32"
      style={{ backgroundColor: theme.colors.background }}
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mb-12 lg:mb-16">
        <div className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 ${getRevealClass('up')}`}>
          <div>
            <span className="text-sm font-medium mb-3 block" style={{ color: palette.primary }}>
              Diensten
            </span>
            <SectionTitle 
              text={titel} 
              font={theme.fonts.heading} 
              color={theme.colors.text}
              accentColor={safe.accent}
              italicLastWord
            />
          </div>
          <ArrowLink text={ctaButtonText} color={palette.primary} />
        </div>
      </div>
      
      {/* Cards grid */}
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {diensten.slice(0, 8).map((dienst, idx) => {
            const isImageCard = idx % 2 === 0;
            const isAccentCard = idx % 4 === 3;
            const bgColor = theme.colors.background === '#f0fdf4' ? 'white' : theme.colors.backgroundAlt;

            if (isImageCard) {
              return (
                <a
                  key={idx}
                  href="#contact"
                  className={`group ${getRevealClass('up', (idx + 1) * 50)}`}
                >
                  <div className="relative h-[220px] rounded-t-[28px] overflow-hidden">
                    <img
                      src={getSfeerImage(idx, 'md')}
                      alt={dienst.naam}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div
                    className="p-6 rounded-b-[28px] -mt-6 relative z-10"
                    style={{ backgroundColor: bgColor }}
                  >
                    <h3
                      className="text-xl font-medium mb-2"
                      style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                    >
                      {dienst.naam}
                    </h3>
                    <p className="text-sm mb-4" style={{ color: theme.colors.textMuted }}>
                      {dienst.beschrijving || 'Professionele zorg met aandacht.'}
                    </p>
                    <span
                      className="text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all"
                      style={{ color: palette.primary }}
                    >
                      Meer weten <span>→</span>
                    </span>
                  </div>
                </a>
              );
            } else {
              return (
                <a
                  key={idx}
                  href="#contact"
                  className={`group p-8 rounded-[28px] flex flex-col justify-between min-h-[350px] transition-all hover:-translate-y-1 ${getRevealClass('up', (idx + 1) * 50)}`}
                  style={{ backgroundColor: isAccentCard ? safe.accent : palette.primary }}
                >
                  <span className="material-symbols-outlined text-3xl text-white/70">
                    {dienst.icon || getDienstIcon(idx)}
                  </span>
                  <div>
                    <h3
                      className="text-2xl font-medium text-white mb-3"
                      style={{ fontFamily: theme.fonts.heading }}
                    >
                      {dienst.naam}
                    </h3>
                    <p className="text-sm text-white/80 mb-4">
                      {dienst.beschrijving || 'Professionele zorg met aandacht.'}
                    </p>
                    <span className="text-sm font-medium text-white flex items-center gap-2 group-hover:gap-3 transition-all">
                      Meer weten <span>→</span>
                    </span>
                  </div>
                </a>
              );
            }
          })}
        </div>
      </div>
    </section>
  );
}


// ============================================
// SERENE — Overlapping Cards + Image Header
// ============================================
function DienstenSerene({ theme, palette, diensten, titel, intro, ctaButtonText }: DienstenComponentProps) {
  const safe = p(palette);

  return (
    <section id="diensten" style={{ fontFamily: theme.fonts.body }}>
      {/* Header with image */}
      <div 
        className="relative py-24 lg:py-32 px-6"
        style={{ 
          background: `linear-gradient(rgba(61,74,61,0.88), rgba(61,74,61,0.88)), url('${getSfeerImage(0, 'lg')}') center/cover`
        }}
      >
        <div className={`text-center ${getRevealClass('up')}`}>
          <p className="text-[9px] uppercase tracking-[2px] mb-4 text-white/70">Mijn Diensten</p>
          <h2 
            className="text-3xl lg:text-4xl text-white"
            style={{ fontFamily: theme.fonts.heading }}
          >
            {titel}
          </h2>
        </div>
      </div>
      
      {/* Cards overlapping */}
      <div className="px-6 md:px-12 pb-24" style={{ backgroundColor: theme.colors.background }}>
        <div className="max-w-5xl mx-auto -mt-16 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {diensten.slice(0, 8).map((dienst, idx) => (
              <a 
                key={idx}
                href="#contact" 
                className={`group bg-white rounded-[20px] p-8 text-center transition-transform hover:-translate-y-1 ${getRevealClass('up', (idx + 1) * 50)}`}
              >
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ backgroundColor: theme.colors.background }}
                >
                  <span className="material-symbols-outlined text-2xl" style={{ color: palette.primary }}>
                    {dienst.icon || getDienstIcon(idx)}
                  </span>
                </div>
                <h3 
                  className="text-lg font-medium mb-3"
                  style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                >
                  {dienst.naam}
                </h3>
                <p className="text-xs leading-relaxed mb-5" style={{ color: theme.colors.textMuted }}>
                  {dienst.beschrijving || 'Professionele zorg met aandacht.'}
                </p>
                <span 
                  className="inline-block px-5 py-2 rounded text-[10px] uppercase tracking-wider text-white"
                  style={{ backgroundColor: palette.primary }}
                >
                  Meer info
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// SERENE VARIANT 2 — Split Image + Numbered List
// ============================================
function DienstenSerene2({ theme, palette, diensten, titel, intro, ctaButtonText }: DienstenComponentProps) {
  return (
    <section 
      id="diensten"
      className="grid lg:grid-cols-2 min-h-[600px]"
      style={{ fontFamily: theme.fonts.body }}
    >
      {/* Left: Full height image */}
      <div className={`relative h-[300px] lg:h-auto ${getRevealClass('left')}`}>
        <img 
          src={getSfeerImage(1, 'lg')}
          alt="Zorg"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0"
          style={{ background: `linear-gradient(to right, transparent, ${theme.colors.background}4d)` }}
        />
      </div>
      
      {/* Right: Content */}
      <div 
        className="px-8 lg:px-16 py-16 lg:py-24 flex flex-col justify-center"
        style={{ backgroundColor: theme.colors.background }}
      >
        {/* Header */}
        <div className={`mb-12 ${getRevealClass('up')}`}>
          <div className="w-8 h-px mb-6" style={{ backgroundColor: palette.primary }} />
          <p className="text-[9px] uppercase tracking-[3px] mb-3" style={{ color: theme.colors.textMuted }}>
            Mijn Diensten
          </p>
          <h2 
            className="text-3xl lg:text-4xl"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            {titel}
          </h2>
        </div>
        
        {/* Diensten list */}
        <div className="space-y-6">
          {diensten.slice(0, 8).map((dienst, idx) => (
            <div key={idx} className={getRevealClass('up', (idx + 1) * 50)}>
              <a href="#contact" className="group flex gap-6 items-start">
                <span 
                  className="text-3xl lg:text-4xl font-light leading-none"
                  style={{ fontFamily: theme.fonts.heading, color: theme.colors.border }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div className="pt-1">
                  <h3 
                    className="text-lg mb-1 group-hover:translate-x-1 transition-transform"
                    style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                  >
                    {dienst.naam}
                  </h3>
                  <p className="text-xs" style={{ color: theme.colors.textMuted }}>
                    {dienst.beschrijving || 'Professionele zorg met aandacht.'}
                  </p>
                </div>
              </a>
              {idx < diensten.slice(0, 8).length - 1 && (
                <div className="w-full h-px mt-6" style={{ backgroundColor: theme.colors.border }} />
              )}
            </div>
          ))}
        </div>
        
        {/* CTA */}
        <div className={`mt-12 ${getRevealClass('up', 250)}`}>
          <a 
            href="#contact" 
            className="inline-flex items-center gap-2 px-6 py-3 text-[10px] uppercase tracking-[2px] text-white"
            style={{ backgroundColor: palette.primary, borderRadius: '4px' }}
          >
            {ctaButtonText}
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================
// SERENE VARIANT 3 — Asymmetric Grid + Whitespace
// ============================================
function DienstenSerene3({ theme, palette, diensten, titel, intro, ctaButtonText }: DienstenComponentProps) {
  return (
    <section 
      id="diensten"
      className="px-6 md:px-12 py-24 lg:py-32"
      style={{ backgroundColor: theme.colors.background, fontFamily: theme.fonts.body }}
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Header aligned right */}
        <div className={`flex justify-end mb-16 lg:mb-24 ${getRevealClass('up')}`}>
          <div className="max-w-md text-right">
            <div className="w-8 h-px ml-auto mb-6" style={{ backgroundColor: palette.primary }} />
            <p className="text-[9px] uppercase tracking-[3px] mb-4" style={{ color: theme.colors.textMuted }}>
              Diensten
            </p>
            <h2 
              className="text-3xl lg:text-4xl"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {titel}
            </h2>
          </div>
        </div>
        
        {/* Asymmetric layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left column - 2 diensten + image */}
          <div className="lg:col-span-5 space-y-8">
            {diensten.slice(0, 2).map((dienst, idx) => (
              <a 
                key={idx}
                href="#contact" 
                className={`group block border-b pb-8 ${getRevealClass('up', (idx + 1) * 100)}`}
                style={{ borderColor: theme.colors.border }}
              >
                <p className="text-[9px] uppercase tracking-[2px] mb-2" style={{ color: theme.colors.textMuted }}>
                  {String(idx + 1).padStart(2, '0')}
                </p>
                <h3 
                  className="text-2xl lg:text-3xl mb-3 group-hover:translate-x-2 transition-transform"
                  style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                >
                  {dienst.naam}
                </h3>
                <p className="text-sm" style={{ color: theme.colors.textMuted }}>
                  {dienst.beschrijving || 'Professionele zorg met aandacht.'}
                </p>
              </a>
            ))}
            
            {/* Small image */}
            <div className={`pt-4 ${getRevealClass('up', 300)}`}>
              <img 
                src={getSfeerImage(4, 'sm')}
                alt="Zorg"
                className="w-full h-48 object-cover"
                style={{ borderRadius: '0 40px 0 0' }}
              />
            </div>
          </div>
          
          {/* Right column - offset down, 2 diensten + CTA */}
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-32 space-y-8">
            {diensten.slice(2, 8).map((dienst, idx) => (
              <a 
                key={idx}
                href="#contact" 
                className={`group block border-b pb-8 ${getRevealClass('up', (idx + 3) * 100)}`}
                style={{ borderColor: theme.colors.border }}
              >
                <p className="text-[9px] uppercase tracking-[2px] mb-2" style={{ color: theme.colors.textMuted }}>
                  {String(idx + 3).padStart(2, '0')}
                </p>
                <h3 
                  className="text-2xl lg:text-3xl mb-3 group-hover:translate-x-2 transition-transform"
                  style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                >
                  {dienst.naam}
                </h3>
                <p className="text-sm" style={{ color: theme.colors.textMuted }}>
                  {dienst.beschrijving || 'Professionele zorg met aandacht.'}
                </p>
              </a>
            ))}
            
            {/* CTA */}
            <div className={`pt-8 ${getRevealClass('up', 500)}`}>
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
                {ctaButtonText}
              </a>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}


// ============================================
// CARDS — Kaarten met icons en hover effect
// ============================================
function DienstenCards({ theme, palette, diensten, titel, intro }: DienstenComponentProps) {
  return (
    <section 
      id="diensten"
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
          {intro && (
            <p className="max-w-2xl mx-auto" style={{ color: theme.colors.textMuted }}>
              {intro}
            </p>
          )}
        </div>
        
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {diensten.slice(0, 8).map((dienst, index) => (
            <div 
              key={index}
              className={`group p-8 rounded-xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${getRevealClass('up', (index % 3) + 1)}`}
              style={{ 
                backgroundColor: theme.colors.surface ?? theme.colors.background,
                borderColor: theme.colors.border
              }}
            >
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors"
                style={{ backgroundColor: palette.primaryLight }}
              >
                <span 
                  className="material-symbols-outlined text-2xl"
                  style={{ color: palette.primary }}
                >
                  {dienst.icon || getDienstIcon(index)}
                </span>
              </div>
              <h3 
                className="text-xl font-bold mb-3"
                style={{ color: theme.colors.text }}
              >
                {dienst.naam}
              </h3>
              <p 
                className="text-sm leading-relaxed"
                style={{ color: theme.colors.textMuted }}
              >
                {dienstBeschrijving(dienst)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// NUMBERED — Grote nummers met grid
// ============================================
function DienstenNumbered({ theme, palette, diensten, titel, intro }: DienstenComponentProps) {
  return (
    <section 
      id="diensten"
      className="py-20 md:py-28 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`mb-16 ${getRevealClass('up')}`}>
          <p 
            className="text-sm font-bold uppercase tracking-widest mb-2"
            style={{ color: palette.primary }}
          >
            Expertise
          </p>
          <h2 
            className="text-3xl md:text-5xl font-bold"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            {titel}
          </h2>
        </div>
        
        {/* Numbered Grid */}
        <div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 border-l"
          style={{ borderColor: theme.colors.border }}
        >
          {diensten.slice(0, 8).map((dienst, index) => (
            <div 
              key={index}
              className={`p-8 md:p-12 border-r border-b ${getRevealClass('up', (index % 3) + 1)}`}
              style={{ borderColor: theme.colors.border }}
            >
              <span 
                className="text-6xl font-light block mb-6"
                style={{ color: palette.primaryLight }}
              >
                0{index + 1}
              </span>
              <h3 
                className="text-xl font-bold mb-3 uppercase tracking-wide"
                style={{ color: theme.colors.text }}
              >
                {dienst.naam}
              </h3>
              <p style={{ color: theme.colors.textMuted }}>
                {dienstBeschrijving(dienst)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// LIST — Simpele lijst met icons
// ============================================
function DienstenList({ theme, palette, diensten, titel, intro }: DienstenComponentProps) {
  return (
    <section 
      id="diensten"
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
          {intro && (
            <p style={{ color: theme.colors.textMuted }}>{intro}</p>
          )}
        </div>
        
        {/* List */}
        <div className="space-y-4">
          {diensten.map((dienst, index) => (
            <div 
              key={index}
              className={`flex items-start gap-4 p-6 rounded-xl border transition-all hover:shadow-md ${getRevealClass('up', Math.min(index + 1, 3))}`}
              style={{ 
                backgroundColor: theme.colors.surface ?? theme.colors.background,
                borderColor: theme.colors.border
              }}
            >
              <span 
                className="material-symbols-outlined text-xl mt-0.5"
                style={{ color: palette.primary }}
              >
                {dienst.icon || getDienstIcon(index)}
              </span>
              <div>
                <h3 
                  className="font-bold mb-1"
                  style={{ color: theme.colors.text }}
                >
                  {dienst.naam}
                </h3>
                <p 
                  className="text-sm"
                  style={{ color: theme.colors.textMuted }}
                >
                  {dienstBeschrijving(dienst)}
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
// GRID — Compacte icon grid
// ============================================
function DienstenGrid({ theme, palette, diensten, titel, intro }: DienstenComponentProps) {
  return (
    <section 
      id="diensten"
      className="py-20 md:py-28 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-12 ${getRevealClass('up')}`}>
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            {titel}
          </h2>
        </div>
        
        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {diensten.map((dienst, index) => (
            <div 
              key={index}
              className={`flex flex-col items-center text-center p-6 rounded-xl transition-all hover:shadow-lg ${getRevealClass('up', (index % 4) + 1)}`}
              style={{ backgroundColor: theme.colors.surface ?? theme.colors.background }}
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: palette.primaryLight }}
              >
                <span 
                  className="material-symbols-outlined"
                  style={{ color: palette.primary }}
                >
                  {dienst.icon || getDienstIcon(index)}
                </span>
              </div>
              <h3 
                className="font-semibold text-sm"
                style={{ color: theme.colors.text }}
              >
                {dienst.naam}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DienstenSection;