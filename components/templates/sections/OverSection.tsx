// components/templates/sections/OverSection.tsx
// Over mij section met meerdere style varianten

'use client';

import { BaseSectionProps, OverStyle, getBeroepImages, getRevealClass, getJarenErvaring } from './types';

interface OverSectionProps extends BaseSectionProps {
  style?: OverStyle;
}

export function OverSection({ 
  style = 'editorial', 
  theme, 
  palette, 
  content, 
  generated, 
  beroepLabel 
}: OverSectionProps) {
  const images = getBeroepImages(beroepLabel);
  const overMij = generated?.overMij;
  const jarenErvaring = getJarenErvaring(content.werkervaring);
  const expertises = content.expertises || [];
  
  // Gemeenschappelijke props voor alle varianten
  const props = { theme, palette, content, overMij, jarenErvaring, expertises, images };
  
  switch (style) {
    // Editorial varianten
    case 'editorial':
      return <OverEditorial {...props} />;
    case 'editorial-2':
      return <OverEditorial2 {...props} />;
    case 'editorial-3':
      return <OverEditorial3 {...props} />;
    
    // Proactief varianten
    case 'proactief':
      return <OverProactief {...props} />;
    case 'proactief-2':
      return <OverProactief2 {...props} />;
    case 'proactief-3':
      return <OverProactief3 {...props} />;
    
    // Portfolio varianten
    case 'portfolio':
      return <OverPortfolio {...props} />;
    case 'portfolio-2':
      return <OverPortfolio2 {...props} />;
    case 'portfolio-3':
      return <OverPortfolio3 {...props} />;
    
    // Mindoor varianten
    case 'mindoor':
      return <OverMindoor {...props} />;
    case 'mindoor-2':
      return <OverMindoor2 {...props} />;
    case 'mindoor-3':
      return <OverMindoor3 {...props} />;
    
    // Serene varianten
    case 'serene':
      return <OverSerene {...props} />;
    case 'serene-2':
      return <OverSerene2 {...props} />;
    case 'serene-3':
      return <OverSerene3 {...props} />;

    default:
      return <OverEditorial {...props} />;
  }
}



function getParagraphs(overMij: any, content: any): string[] {
  const overMijText = overMij?.body || overMij?.intro || content.over_mij || '';
  return overMijText.split('\n\n').filter((p: string) => p.trim());
}

function getQuote(overMij: any): string {
  return overMij?.persoonlijk || "Goede zorg begint bij echt luisteren naar wat iemand nodig heeft.";
}

function getNaamParts(naam: string): { voornaam: string; achternaam: string } {
  const parts = naam.split(' ');
  if (parts.length <= 2) {
    return { voornaam: parts[0], achternaam: parts.slice(1).join(' ') };
  }
  // "Anna de Vries" → voornaam: "Anna", achternaam: "de Vries"
  return { voornaam: parts[0], achternaam: parts.slice(1).join(' ') };
}

function getTitleWithAccent(titel: string, accentWordCount: number = 1): { rest: string; accent: string } {
  const words = titel.split(' ');
  const accent = words.slice(-accentWordCount).join(' ');
  const rest = words.slice(0, -accentWordCount).join(' ');
  return { rest, accent };
}


// Duotone image style - grayscale + sepia warmte
const duotoneStyle = {
  filter: 'grayscale(100%) sepia(25%) brightness(0.7) contrast(1.05)',
};

// ============================================
// EDITORIAL 1: Quote Lead
// Grote quote als opening statement, ronde duotone foto rechts
// ============================================
export function OverEditorial({ theme, palette, content, overMij, jarenErvaring, expertises, images }: any) {
  const paragraphs = getParagraphs(overMij, content);
  const quote = getQuote(overMij);
  
  // Split paragraphs for two-column layout
  const midPoint = Math.ceil(paragraphs.length / 2);
  const leftParagraphs = paragraphs.slice(0, midPoint);
  const rightParagraphs = paragraphs.slice(midPoint);
  
  return (
    <section 
      id="over"
      className="px-6 md:px-12 lg:px-20 py-20 lg:py-28"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Top: Quote + Photo */}
        <div className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 mb-16 ${getRevealClass('up')}`}>
          
          {/* Quote (dominant) */}
          <div className="flex-1">
            <span 
              className="text-6xl lg:text-7xl leading-none block mb-2"
              style={{ fontFamily: theme.fonts.heading, color: `${palette.primary}30` }}
            >
              "
            </span>
            <p 
              className="text-2xl lg:text-3xl italic leading-snug mb-6 -mt-6"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {quote}
            </p>
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-px"
                style={{ backgroundColor: palette.primary }}
              />
              <span 
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: palette.primary }}
              >
                {content.naam}
              </span>
            </div>
          </div>
          
          {/* Photo (rond, duotone) */}
          <div className="shrink-0">
            <div className="relative">
              <div className="w-48 h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden">
                <img 
                  src={content.foto || images.sfeer}
                  alt={`Over ${content.naam}`}
                  className="w-full h-full object-cover"
                  style={duotoneStyle}
                />
              </div>
              {/* Accent ring */}
              <div 
                className="absolute -inset-2 rounded-full border-2 opacity-30"
                style={{ borderColor: palette.primary }}
              />
            </div>
          </div>
        </div>
        
        {/* Divider + Label */}
        <div className={`flex items-center gap-4 mb-10 ${getRevealClass('left')}`}>
          <span 
            className="text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ fontVariant: 'small-caps', color: palette.primary }}
          >
            Over mij
          </span>
          <div 
            className="flex-1 h-px"
            style={{ backgroundColor: theme.colors.border }}
          />
        </div>
        
        {/* Title */}
        <h2 
          className={`text-3xl md:text-4xl mb-10 ${getRevealClass('up', 100)}`}
          style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
        >
          {jarenErvaring ? (
            <>Mijn <em className="italic" style={{ color: palette.primary }}>verhaal</em></>
          ) : (
            <>Mijn <em className="italic" style={{ color: palette.primary }}>verhaal</em></>
          )}
        </h2>
        
        {/* Two-column text */}
        <div className={`grid md:grid-cols-2 gap-8 lg:gap-12 mb-10 ${getRevealClass('up', 150)}`}>
          <div 
            className="flex flex-col gap-4 leading-[1.8]"
            style={{ color: theme.colors.textMuted }}
          >
            {leftParagraphs.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div 
            className="flex flex-col gap-4 leading-[1.8]"
            style={{ color: theme.colors.textMuted }}
          >
            {rightParagraphs.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
        
        {/* Tags */}
        {expertises && expertises.length > 0 && (
          <div className={`flex flex-wrap gap-2 ${getRevealClass('up', 200)}`}>
            {expertises.map((expertise: string, index: number) => (
              <span 
                key={index}
                className="px-3 py-1.5 border text-sm"
                style={{ 
                  borderColor: theme.colors.border,
                  color: theme.colors.textMuted
                }}
              >
                {expertise}
              </span>
            ))}
          </div>
        )}
        
      </div>
    </section>
  );
}

// ============================================
// EDITORIAL 2: Visual Margin
// Foto + quote als sidebar links, content rechts
// ============================================
function OverEditorial2({ theme, palette, content, overMij, jarenErvaring, expertises, images }: any) {
  const overMijText = overMij?.body || overMij?.intro || content.over_mij || '';
  const paragraphs = overMijText.split('\n\n').filter((p: string) => p.trim());
  const quote = overMij?.persoonlijk || "Goede zorg begint bij echt luisteren.";
  
  const midPoint = Math.ceil(paragraphs.length / 2);
  const leftParagraphs = paragraphs.slice(0, midPoint);
  const rightParagraphs = paragraphs.slice(midPoint);
  
  // Duotone style
  const duotoneStyle = { filter: 'grayscale(100%) sepia(25%) brightness(0.7) contrast(1.05)' };
  
  return (
    <section 
      id="over"
      className="px-6 md:px-12 lg:px-20 py-20 lg:py-28"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* Left: Visual Margin (foto + quote) */}
          <div className={`lg:col-span-4 ${getRevealClass('left')}`}>
            <div className="relative mb-8">
              <img 
                src={content.foto || images.sfeer}
                alt={`Over ${content.naam}`}
                className="w-full aspect-[3/4] object-cover"
                style={duotoneStyle}
              />
              <div 
                className="absolute bottom-0 left-0 w-full h-1"
                style={{ backgroundColor: palette.primary }}
              />
            </div>
            
            <div 
              className="border-l-2 pl-5"
              style={{ borderColor: palette.primary }}
            >
              <p 
                className="text-lg italic leading-relaxed mb-4"
                style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
              >
                "{quote}"
              </p>
              <p 
                className="text-sm font-medium"
                style={{ color: palette.primary }}
              >
                — {content.naam?.split(' ')[0]}
              </p>
            </div>
          </div>
          
          {/* Right: Content */}
          <div className={`lg:col-span-8 ${getRevealClass('right')}`}>
            <div className="flex items-center gap-4 mb-6">
              <span 
                className="text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ fontVariant: 'small-caps', color: palette.primary }}
              >
                Over mij
              </span>
              <div className="flex-1 h-px" style={{ backgroundColor: theme.colors.border }} />
            </div>
            
            <h2 
              className="text-3xl md:text-4xl mb-8"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              Persoonlijke <em className="italic" style={{ color: palette.primary }}>zorg</em> op maat
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="flex flex-col gap-4 leading-[1.8]" style={{ color: theme.colors.textMuted }}>
                {leftParagraphs.map((p: string, i: number) => <p key={i}>{p}</p>)}
              </div>
              <div className="flex flex-col gap-4 leading-[1.8]" style={{ color: theme.colors.textMuted }}>
                {rightParagraphs.map((p: string, i: number) => <p key={i}>{p}</p>)}
              </div>
            </div>
            
            <div 
              className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pt-8 border-t"
              style={{ borderColor: theme.colors.border }}
            >
              {expertises?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {expertises.map((expertise: string, index: number) => (
                    <span key={index} className="px-3 py-1.5 border text-sm" style={{ borderColor: theme.colors.border, color: theme.colors.textMuted }}>
                      {expertise}
                    </span>
                  ))}
                </div>
              )}
              <p className="text-2xl italic shrink-0" style={{ fontFamily: theme.fonts.heading, color: palette.primary }}>
                {content.naam}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// EDITORIAL 3: Compact Header
// Vierkante foto + quote als header block
// ============================================
function OverEditorial3({ theme, palette, content, overMij, jarenErvaring, expertises, images }: any) {
  const overMijText = overMij?.body || overMij?.intro || content.over_mij || '';
  const paragraphs = overMijText.split('\n\n').filter((p: string) => p.trim());
  const quote = overMij?.persoonlijk || "Goede zorg begint bij echt luisteren.";
  
  const midPoint = Math.ceil(paragraphs.length / 2);
  const leftParagraphs = paragraphs.slice(0, midPoint);
  const rightParagraphs = paragraphs.slice(midPoint);
  
  const duotoneStyle = { filter: 'grayscale(100%) sepia(25%) brightness(0.7) contrast(1.05)' };
  
  return (
    <section 
      id="over"
      className="px-6 md:px-12 lg:px-20 py-20 lg:py-28"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-5xl mx-auto">
        
        <div className={`flex items-center gap-4 mb-10 ${getRevealClass('up')}`}>
          <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ fontVariant: 'small-caps', color: palette.primary }}>
            Over mij
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: theme.colors.border }} />
        </div>
        
        {/* Header block: Photo + Quote */}
        <div className={`flex flex-col md:flex-row gap-8 lg:gap-12 mb-12 ${getRevealClass('up', 100)}`}>
          <div className="shrink-0">
            <div className="relative w-40 h-40 lg:w-48 lg:h-48 overflow-hidden">
              <img 
                src={content.foto || images.sfeer}
                alt={`Over ${content.naam}`}
                className="w-full h-full object-cover"
                style={duotoneStyle}
              />
              <div className="absolute bottom-0 right-0 w-8 h-8 opacity-80" style={{ backgroundColor: palette.primary }} />
            </div>
          </div>
          
          <div className="flex-1 flex flex-col justify-center">
            <span className="text-5xl leading-none block mb-1" style={{ fontFamily: theme.fonts.heading, color: `${palette.primary}30` }}>"</span>
            <p className="text-xl lg:text-2xl italic leading-snug mb-4 -mt-4" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>
              {quote}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-px" style={{ backgroundColor: palette.primary }} />
              <span className="text-sm font-medium" style={{ color: palette.primary }}>{content.naam?.split(' ')[0]}</span>
            </div>
          </div>
        </div>
        
        <h2 className={`text-3xl md:text-4xl lg:text-5xl mb-10 ${getRevealClass('up', 150)}`} style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>
          {jarenErvaring ? (
            <>Al {jarenErvaring} jaar met <em className="italic" style={{ color: palette.primary }}>toewijding</em> in de zorg</>
          ) : (
            <>Met <em className="italic" style={{ color: palette.primary }}>passie</em> voor persoonlijke zorg</>
          )}
        </h2>
        
        <div className={`grid md:grid-cols-2 gap-8 lg:gap-12 mb-12 ${getRevealClass('up', 200)}`}>
          <div className="flex flex-col gap-4 leading-[1.8]" style={{ color: theme.colors.textMuted }}>
            {leftParagraphs.map((p: string, i: number) => <p key={i}>{p}</p>)}
          </div>
          <div className="flex flex-col gap-4 leading-[1.8]" style={{ color: theme.colors.textMuted }}>
            {rightParagraphs.map((p: string, i: number) => <p key={i}>{p}</p>)}
          </div>
        </div>
        
        <div className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 pt-8 border-t ${getRevealClass('up', 250)}`} style={{ borderColor: theme.colors.border }}>
          {expertises?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {expertises.map((expertise: string, index: number) => (
                <span key={index} className="px-3 py-1.5 border text-sm" style={{ borderColor: theme.colors.border, color: theme.colors.textMuted }}>
                  {expertise}
                </span>
              ))}
            </div>
          )}
          <p className="text-2xl italic shrink-0" style={{ fontFamily: theme.fonts.heading, color: palette.primary }}>
            {content.naam}
          </p>
        </div>
      </div>
    </section>
  );
}
// ============================================
// PROACTIEF OVER SECTION VARIANTEN
// ============================================
// 
// Styling DNA:
// - Primary: #0099cc (cyaan)
// - Accent: #ff6b35 (oranje)
// - Font: Poppins
// - Modern, clean, geen shadows
// - Hover effects (hele block wordt primary)
// - Border-l-4 accents
// - Numbered sections (01, 02, 03)
// - Pills voor tags
//
// Varianten:
// - proactief:   Split Numbered - Foto links, genummerde blokken rechts
// - proactief-2: Split Sticky - Foto + quote sticky, max tekst ruimte
// - proactief-3: Grid Numbered - Strak grid met hover
//
// ============================================


// ============================================
// PROACTIEF 1: Split Numbered
// Foto links, genummerde tekst blokken rechts met hover
// ============================================
export function OverProactief({ theme, palette, content, overMij, jarenErvaring, expertises, images }: any) {
  const paragraphs = getParagraphs(overMij, content);
  
  // Split paragraphs into numbered blocks (max 3)
  const blocks = [
    { num: '01', title: 'Mijn achtergrond', text: paragraphs[0] || 'Met jarenlange ervaring in de zorg heb ik gewerkt in uiteenlopende settings: van ziekenhuizen en verpleeghuizen tot thuiszorg en hospices.' },
    { num: '02', title: 'Wat mij drijft', text: paragraphs[1] || 'Het maken van een verschil in het leven van mensen. Of het nu gaat om wondzorg, palliatieve begeleiding, of een luisterend oor.' },
    { num: '03', title: 'Mijn aanpak', text: paragraphs[2] || 'Als ZZP\'er combineer ik zelfstandigheid met professionele kwaliteit. Flexibel en betrouwbaar.' },
  ].filter(block => block.text);

  return (
    <section 
      id="over"
      className="py-24 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className={`flex items-center gap-3 mb-10 ${getRevealClass('up')}`}>
          <div className="w-8 h-px" style={{ backgroundColor: palette.primary }} />
          <span 
            className="text-xs font-semibold uppercase tracking-[0.15em]"
            style={{ color: palette.primary }}
          >
            Over mij
          </span>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left: Photo */}
          <div className={getRevealClass('left')}>
            <img 
              src={content.foto || images.sfeer}
              alt={`Over ${content.naam}`}
              className="w-full aspect-[4/5] object-cover"
            />
          </div>
          
          {/* Right: Numbered sections */}
          <div className={getRevealClass('right')}>
            <h2 
              className="text-3xl lg:text-4xl font-bold mb-8"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {content.naam}
            </h2>
            
            {/* Numbered blocks */}
            <div className="space-y-0 mb-8">
              {blocks.map((block, idx) => (
                <div 
                  key={idx}
                  className="p-6 border-l-4 transition-all cursor-pointer group"
                  style={{ 
                    borderColor: idx === 0 ? palette.primary : 'transparent',
                    backgroundColor: idx === 0 ? (palette.primaryLight || `${palette.primary}15`) : theme.colors.background
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = palette.primary;
                    e.currentTarget.style.backgroundColor = palette.primary;
                    e.currentTarget.querySelectorAll('.block-num').forEach(el => (el as HTMLElement).style.color = 'rgba(255,255,255,0.3)');
                    e.currentTarget.querySelectorAll('.block-title').forEach(el => (el as HTMLElement).style.color = 'white');
                    e.currentTarget.querySelectorAll('.block-text').forEach(el => (el as HTMLElement).style.color = 'rgba(255,255,255,0.9)');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = idx === 0 ? palette.primary : 'transparent';
                    e.currentTarget.style.backgroundColor = idx === 0 ? (palette.primaryLight || `${palette.primary}15`) : theme.colors.background;
                    e.currentTarget.querySelectorAll('.block-num').forEach(el => (el as HTMLElement).style.color = palette.primary);
                    e.currentTarget.querySelectorAll('.block-title').forEach(el => (el as HTMLElement).style.color = theme.colors.text);
                    e.currentTarget.querySelectorAll('.block-text').forEach(el => (el as HTMLElement).style.color = theme.colors.textMuted);
                  }}
                >
                  <div className="flex gap-4">
                    <span 
                      className="block-num text-3xl font-bold transition-colors"
                      style={{ color: palette.primary }}
                    >
                      {block.num}
                    </span>
                    <div>
                      <h3 
                        className="block-title font-bold mb-2 transition-colors"
                        style={{ color: theme.colors.text }}
                      >
                        {block.title}
                      </h3>
                      <p 
                        className="block-text text-[15px] leading-[1.8] transition-colors"
                        style={{ color: theme.colors.textMuted }}
                      >
                        {block.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Tags + CTA */}
            <div 
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t"
              style={{ borderColor: theme.colors.border }}
            >
              {expertises && expertises.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {expertises.slice(0, 3).map((expertise: string, index: number) => (
                    <span 
                      key={index}
                      className="px-3 py-1.5 text-sm"
                      style={{ backgroundColor: palette.primaryLight || `${palette.primary}15`, color: palette.primary }}
                    >
                      {expertise}
                    </span>
                  ))}
                </div>
              )}
              <a 
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white transition-colors"
                style={{ backgroundColor: palette.primary }}
              >
                Contact
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </a>
            </div>
            
          </div>
          
        </div>
      </div>
    </section>
  );
}

// ============================================
// PROACTIEF 2: Split Sticky
// Foto + quote sticky links, max tekst ruimte rechts
// ============================================
export function OverProactief2({ theme, palette, content, overMij, jarenErvaring, expertises, images }: any) {
  const paragraphs = getParagraphs(overMij, content);
  const quote = getQuote(overMij);

  return (
    <section 
      id="over"
      className="py-24 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left: Sticky photo + quote */}
          <div className={`lg:col-span-5 ${getRevealClass('left')}`}>
            <div className="lg:sticky lg:top-24">
              
              {/* Photo */}
              <div className="mb-6">
                <img 
                  src={content.foto || images.sfeer}
                  alt={`Over ${content.naam}`}
                  className="w-full aspect-[4/5] object-cover"
                />
              </div>
              
              {/* Quote met border-left */}
              <div 
                className="border-l-4 pl-5"
                style={{ borderColor: palette.accent || palette.primary }}
              >
                <p 
                  className="italic mb-2"
                  style={{ color: theme.colors.text }}
                >
                  "{quote}"
                </p>
                <p 
                  className="text-sm font-medium"
                  style={{ color: palette.primary }}
                >
                  — {content.naam?.split(' ')[0]}
                </p>
              </div>
              
            </div>
          </div>
          
          {/* Right: Content */}
          <div className={`lg:col-span-7 ${getRevealClass('right')}`}>
            
            {/* Label */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ backgroundColor: palette.primary }} />
              <span 
                className="text-xs font-semibold uppercase tracking-[0.15em]"
                style={{ color: palette.primary }}
              >
                Over mij
              </span>
            </div>
            
            {/* Title */}
            <h2 
              className="text-3xl lg:text-4xl font-bold mb-6"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              Mijn benadering van zorg
            </h2>
            
            {/* Text */}
            <div className="space-y-4 mb-8">
              {paragraphs.length > 0 ? (
                paragraphs.map((p: string, i: number) => (
                  <p 
                    key={i}
                    className="text-[15px] leading-[1.8]"
                    style={{ color: theme.colors.textMuted }}
                  >
                    {p}
                  </p>
                ))
              ) : (
                <>
                  <p className="text-[15px] leading-[1.8]" style={{ color: theme.colors.textMuted }}>
                    Met jarenlange ervaring in de zorg heb ik gewerkt in uiteenlopende settings: 
                    van ziekenhuizen en verpleeghuizen tot thuiszorg en hospices.
                  </p>
                  <p className="text-[15px] leading-[1.8]" style={{ color: theme.colors.textMuted }}>
                    Wat mij drijft is het maken van een verschil in het leven van mensen.
                  </p>
                </>
              )}
            </div>
            
            {/* Tags */}
            {expertises && expertises.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {expertises.map((expertise: string, index: number) => (
                  <span 
                    key={index}
                    className="px-3 py-1.5 text-sm"
                    style={{ backgroundColor: palette.primaryLight || `${palette.primary}15`, color: palette.primary }}
                  >
                    {expertise}
                  </span>
                ))}
              </div>
            )}
            
            {/* CTA */}
            <a 
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-colors"
              style={{ backgroundColor: palette.primary }}
            >
              Neem contact op
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </a>
            
          </div>
          
        </div>
      </div>
    </section>
  );
}

// ============================================
// PROACTIEF 3: Grid Numbered
// Strak grid met nummers, hover effect, quote cell
// ============================================
export function OverProactief3({ theme, palette, content, overMij, jarenErvaring, expertises, images }: any) {
  const paragraphs = getParagraphs(overMij, content);
  const quote = getQuote(overMij);

  return (
    <section 
      id="over"
      className="py-24 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className={`text-center mb-12 ${getRevealClass('up')}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ backgroundColor: palette.primary }} />
            <span 
              className="text-xs font-semibold uppercase tracking-[0.15em]"
              style={{ color: palette.primary }}
            >
              Over mij
            </span>
            <div className="w-8 h-px" style={{ backgroundColor: palette.primary }} />
          </div>
          <h2 
            className="text-3xl lg:text-4xl font-bold"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            {content.naam}
          </h2>
        </div>
        
        {/* Grid */}
        <div 
          className="grid md:grid-cols-2 gap-px"
          style={{ backgroundColor: theme.colors.border }}
        >
          
          {/* Cell 1: Photo */}
          <div className={`row-span-2 ${getRevealClass('left')}`} style={{ backgroundColor: theme.colors.background }}>
            <img 
              src={content.foto || images.sfeer}
              alt={`Over ${content.naam}`}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Cell 2: Intro */}
          <div 
            className={`p-8 lg:p-10 group cursor-pointer transition-colors ${getRevealClass('right')}`}
            style={{ backgroundColor: theme.colors.background }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = palette.primary;
              e.currentTarget.querySelectorAll('.cell-num').forEach(el => (el as HTMLElement).style.color = 'rgba(255,255,255,0.3)');
              e.currentTarget.querySelectorAll('.cell-title').forEach(el => (el as HTMLElement).style.color = 'white');
              e.currentTarget.querySelectorAll('.cell-text').forEach(el => (el as HTMLElement).style.color = 'rgba(255,255,255,0.9)');
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = theme.colors.background;
              e.currentTarget.querySelectorAll('.cell-num').forEach(el => (el as HTMLElement).style.color = palette.primary);
              e.currentTarget.querySelectorAll('.cell-title').forEach(el => (el as HTMLElement).style.color = theme.colors.text);
              e.currentTarget.querySelectorAll('.cell-text').forEach(el => (el as HTMLElement).style.color = theme.colors.textMuted);
            }}
          >
            <span className="cell-num text-5xl font-bold block mb-4 transition-colors" style={{ color: palette.primary }}>01</span>
            <h3 className="cell-title text-lg font-bold mb-3 transition-colors" style={{ color: theme.colors.text }}>Mijn achtergrond</h3>
            <p className="cell-text text-[15px] leading-[1.8] transition-colors" style={{ color: theme.colors.textMuted }}>
              {paragraphs[0] || 'Met jarenlange ervaring in de zorg heb ik gewerkt in uiteenlopende settings: van ziekenhuizen en verpleeghuizen tot thuiszorg en hospices.'}
            </p>
          </div>
          
          {/* Cell 3: Motivatie */}
          <div 
            className={`p-8 lg:p-10 group cursor-pointer transition-colors ${getRevealClass('right', 100)}`}
            style={{ backgroundColor: theme.colors.background }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = palette.primary;
              e.currentTarget.querySelectorAll('.cell-num').forEach(el => (el as HTMLElement).style.color = 'rgba(255,255,255,0.3)');
              e.currentTarget.querySelectorAll('.cell-title').forEach(el => (el as HTMLElement).style.color = 'white');
              e.currentTarget.querySelectorAll('.cell-text').forEach(el => (el as HTMLElement).style.color = 'rgba(255,255,255,0.9)');
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = theme.colors.background;
              e.currentTarget.querySelectorAll('.cell-num').forEach(el => (el as HTMLElement).style.color = palette.primary);
              e.currentTarget.querySelectorAll('.cell-title').forEach(el => (el as HTMLElement).style.color = theme.colors.text);
              e.currentTarget.querySelectorAll('.cell-text').forEach(el => (el as HTMLElement).style.color = theme.colors.textMuted);
            }}
          >
            <span className="cell-num text-5xl font-bold block mb-4 transition-colors" style={{ color: palette.primary }}>02</span>
            <h3 className="cell-title text-lg font-bold mb-3 transition-colors" style={{ color: theme.colors.text }}>Wat mij drijft</h3>
            <p className="cell-text text-[15px] leading-[1.8] transition-colors" style={{ color: theme.colors.textMuted }}>
              {paragraphs[1] || 'Het maken van een verschil in het leven van mensen. Of het nu gaat om wondzorg, palliatieve begeleiding, of een luisterend oor — ik doe het met passie.'}
            </p>
          </div>
          
          {/* Cell 4: Quote */}
          <div 
            className={`p-8 lg:p-10 ${getRevealClass('up', 150)}`}
            style={{ background: `linear-gradient(135deg, ${palette.primary}, ${palette.primaryDark || palette.primary})` }}
          >
            <span className="text-5xl font-bold block mb-4" style={{ color: 'rgba(255,255,255,0.2)' }}>"</span>
            <p className="text-lg italic text-white mb-4">
              {quote}
            </p>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>— {content.naam?.split(' ')[0]}</p>
          </div>
          
          {/* Cell 5: Expertises + CTA */}
          <div 
            className={`p-8 lg:p-10 ${getRevealClass('up', 200)}`}
            style={{ backgroundColor: theme.colors.background }}
          >
            <span 
              className="text-xs font-semibold uppercase tracking-wider block mb-4"
              style={{ color: palette.primary }}
            >
              Expertises
            </span>
            {expertises && expertises.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {expertises.map((expertise: string, index: number) => (
                  <span 
                    key={index}
                    className="px-3 py-1.5 text-sm"
                    style={{ backgroundColor: palette.primaryLight || `${palette.primary}15`, color: palette.primary }}
                  >
                    {expertise}
                  </span>
                ))}
              </div>
            )}
            
            <a 
              href="#contact"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
              style={{ color: palette.primary }}
            >
              Neem contact op
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </a>
          </div>
          
        </div>
        
      </div>
    </section>
  );
}
// ============================================
// PORTFOLIO OVER SECTION VARIANTEN
// ============================================
// 
// Styling DNA:
// - Primary: #2d5a4a (donker groen/teal)
// - Accent: #9ccc65 (lime groen)
// - Fonts: Playfair Display (heading), Inter (body)
// - Elegant, portfolio-achtig
// - Organic corners (border-radius: 0 80px 0 0)
// - Italic accent in headings
// - Subtiele borders, GEEN shadows
//
// Focus van Over sectie:
// - WIE is deze persoon (niet WAT kan deze persoon)
// - Foto + tekst + naam/signature
// - Quote optioneel voor persoonlijkheid
//
// Wat hier NIET hoort:
// - Timeline → WerkervaringSection
// - Certificaten/BIG → CredentialsSection
// - Diensten → DienstenSection
//
// Varianten:
// - portfolio:   Classic Split - Balans foto/tekst, organic corner
// - portfolio-2: Quote Focus - Quote prominent, ronde foto
// - portfolio-3: Typography First - Grote statement, foto als accent
//
// ============================================


// ============================================
// PORTFOLIO 1: Classic Split
// Balans tussen foto en tekst, organic corner, signature
// ============================================
export function OverPortfolio({ theme, palette, content, overMij, jarenErvaring, expertises, images }: any) {
  const paragraphs = getParagraphs(overMij, content);
  
  // Titel met italic accent
  const titel = overMij?.titel || 'Met passie voor persoonlijke zorg';
  const { rest: titelRest, accent: titelAccent } = getTitleWithAccent(titel);
  
  return (
    <section 
      id="over"
      className="py-24 lg:py-32 px-6 md:px-12"
      style={{ backgroundColor: 'white' }}
    >
      <div className="max-w-[1100px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Foto met organic corner */}
          <div className={`relative ${getRevealClass('left')}`}>
            {/* Decoratieve border (subtiel) */}
            <div 
              className="absolute -top-3 -left-3 w-24 h-24 border-2 opacity-20"
              style={{ borderColor: palette.accent || palette.primary }}
            />
            
            <img 
              src={content.foto || images.sfeer}
              alt={`Over ${content.naam}`}
              className="w-full h-[450px] lg:h-[480px] object-cover"
              style={{ borderRadius: '0 80px 0 0' }}
            />
          </div>
          
          {/* Content */}
          <div className={getRevealClass('right')}>
            {/* Label */}
            <span 
              className="text-[12px] font-semibold uppercase tracking-[0.2em] mb-4 block"
              style={{ color: palette.accent || palette.primary }}
            >
              Over mij
            </span>
            
            {/* Titel met italic accent */}
            <h2 
              className="text-3xl lg:text-[40px] leading-[1.2] mb-6"
              style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
            >
              {titelRest}{' '}
              <em className="italic" style={{ color: palette.accent || palette.primary }}>
                {titelAccent}
              </em>
            </h2>
            
            {/* Tekst */}
            <div className="space-y-4 mb-8">
              {paragraphs.length > 0 ? (
                paragraphs.map((p: string, idx: number) => (
                  <p 
                    key={idx}
                    className="leading-[1.8]"
                    style={{ color: theme.colors.textMuted }}
                  >
                    {p}
                  </p>
                ))
              ) : (
                <p className="leading-[1.8]" style={{ color: theme.colors.textMuted }}>
                  Met jarenlange ervaring in de zorg koos ik bewust voor zelfstandigheid. 
                  Nu kan ik de zorg bieden zoals ik altijd al wilde: met aandacht, rust en 
                  persoonlijke betrokkenheid.
                </p>
              )}
            </div>
            
            {/* Signature */}
            <div 
              className="flex items-center gap-4 pt-6"
              style={{ borderTop: `1px solid ${theme.colors.border}` }}
            >
              <p 
                className="text-2xl lg:text-3xl italic"
                style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
              >
                {content.naam}
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

// ============================================
// PORTFOLIO 2: Quote Focus
// Quote prominent, ronde foto, persoonlijkheid centraal
// ============================================
export function OverPortfolio2({ theme, palette, content, overMij, jarenErvaring, expertises, images }: any) {
  const paragraphs = getParagraphs(overMij, content);
  const quote = getQuote(overMij);
  
  // Split paragraphs voor twee kolommen
  const midPoint = Math.ceil(paragraphs.length / 2);
  const leftParagraphs = paragraphs.slice(0, midPoint);
  const rightParagraphs = paragraphs.slice(midPoint);
  
  return (
    <section 
      id="over"
      className="py-24 lg:py-32 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-[900px] mx-auto">
        
        {/* Top: Quote + Foto */}
        <div className={`flex flex-col md:flex-row items-center gap-10 lg:gap-16 mb-12 ${getRevealClass('up')}`}>
          
          {/* Quote (dominant) */}
          <div className="flex-1">
            <span 
              className="text-6xl lg:text-7xl leading-none block mb-2"
              style={{ fontFamily: theme.fonts.heading, color: `${palette.primary}15` }}
            >
              "
            </span>
            <p 
              className="text-2xl lg:text-3xl italic leading-snug mb-6 -mt-8"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {quote}
            </p>
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-px"
                style={{ backgroundColor: palette.primary }}
              />
              <span 
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: palette.primary }}
              >
                {content.naam}
              </span>
            </div>
          </div>
          
          {/* Foto (rond) */}
          <div className="shrink-0">
            <div className="relative">
              <img 
                src={content.foto || images.sfeer}
                alt={`Over ${content.naam}`}
                className="w-48 h-48 lg:w-56 lg:h-56 rounded-full object-cover"
              />
              {/* Accent ring */}
              <div 
                className="absolute -inset-2 rounded-full border-2 opacity-30"
                style={{ borderColor: palette.accent || palette.primary }}
              />
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className={`flex items-center gap-4 mb-8 ${getRevealClass('left', 100)}`}>
          <span 
            className="text-[11px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: palette.accent || palette.primary }}
          >
            Mijn verhaal
          </span>
          <div 
            className="flex-1 h-px"
            style={{ backgroundColor: theme.colors.border }}
          />
        </div>
        
        {/* Tekst in twee kolommen */}
        <div className={`grid md:grid-cols-2 gap-8 lg:gap-12 ${getRevealClass('up', 150)}`}>
          <div className="space-y-4">
            {leftParagraphs.length > 0 ? (
              leftParagraphs.map((p: string, idx: number) => (
                <p key={idx} className="leading-[1.8]" style={{ color: theme.colors.textMuted }}>
                  {p}
                </p>
              ))
            ) : (
              <p className="leading-[1.8]" style={{ color: theme.colors.textMuted }}>
                Met jarenlange ervaring in de zorg koos ik bewust voor zelfstandigheid. 
                In ziekenhuizen en zorginstellingen leerde ik het vak, maar miste ik vaak 
                de tijd voor een goed gesprek.
              </p>
            )}
          </div>
          <div className="space-y-4">
            {rightParagraphs.length > 0 ? (
              rightParagraphs.map((p: string, idx: number) => (
                <p key={idx} className="leading-[1.8]" style={{ color: theme.colors.textMuted }}>
                  {p}
                </p>
              ))
            ) : (
              <p className="leading-[1.8]" style={{ color: theme.colors.textMuted }}>
                Nu kan ik de zorg bieden zoals ik altijd al wilde: met aandacht, rust en 
                persoonlijke betrokkenheid. Elke cliënt is uniek en verdient zorg die daarbij past.
              </p>
            )}
          </div>
        </div>
        
      </div>
    </section>
  );
}

// ============================================
// PORTFOLIO 3: Typography First
// Grote statement titel, minimaal, foto als accent
// ============================================
export function OverPortfolio3({ theme, palette, content, overMij, jarenErvaring, expertises, images }: any) {
  const paragraphs = getParagraphs(overMij, content);
  
  return (
    <section 
      id="over"
      className="py-24 lg:py-32 px-6 md:px-12"
      style={{ backgroundColor: 'white' }}
    >
      <div className="max-w-[1000px] mx-auto">
        
        {/* Label */}
        <div className={`flex items-center gap-4 mb-6 ${getRevealClass('up')}`}>
          <span 
            className="text-[11px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: palette.accent || palette.primary }}
          >
            Over mij
          </span>
          <div 
            className="flex-1 h-px"
            style={{ backgroundColor: theme.colors.border }}
          />
        </div>
        
        {/* Grote statement titel */}
        <h2 
          className={`text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mb-10 ${getRevealClass('up', 50)}`}
          style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
        >
          Zorg is voor mij geen{' '}
          <em className="italic" style={{ color: palette.accent || palette.primary }}>werk</em>,
          <br />
          het is wie ik{' '}
          <em className="italic" style={{ color: palette.accent || palette.primary }}>ben</em>.
        </h2>
        
        {/* Content grid: tekst + kleine foto */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* Tekst */}
          <div className={`lg:col-span-7 space-y-5 ${getRevealClass('up', 100)}`}>
            {paragraphs.length > 0 ? (
              <>
                <p 
                  className="text-lg leading-[1.8]"
                  style={{ color: theme.colors.textMuted }}
                >
                  {paragraphs[0]}
                </p>
                {paragraphs.slice(1).map((p: string, idx: number) => (
                  <p 
                    key={idx}
                    className="leading-[1.8]"
                    style={{ color: theme.colors.textMuted }}
                  >
                    {p}
                  </p>
                ))}
              </>
            ) : (
              <>
                <p 
                  className="text-lg leading-[1.8]"
                  style={{ color: theme.colors.textMuted }}
                >
                  Na meer dan {jarenErvaring || 15} jaar ervaring in ziekenhuizen, verpleeghuizen 
                  en de thuiszorg, koos ik voor zelfstandigheid. Niet om de zorg te verlaten, 
                  maar om dichter bij de mens te komen.
                </p>
                <p className="leading-[1.8]" style={{ color: theme.colors.textMuted }}>
                  Wat mij drijft is simpel: het verschil maken in iemands dag. Soms is dat 
                  medische zorg, soms een goed gesprek. Altijd met aandacht en respect.
                </p>
              </>
            )}
            
            {/* Signature */}
            <p 
              className="text-2xl italic pt-4"
              style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
            >
              {content.naam}
            </p>
          </div>
          
          {/* Kleine foto als accent */}
          <div className={`lg:col-span-5 ${getRevealClass('right', 150)}`}>
            <img 
              src={content.foto || images.sfeer}
              alt={`Over ${content.naam}`}
              className="w-full h-64 lg:h-80 object-cover"
              style={{ borderRadius: '0 0 0 60px' }}
            />
          </div>
          
        </div>
        
      </div>
    </section>
  );
}


// components/templates/sections/over/OverMindoorVariants.tsx
// Mindoor Over Section - 3 Varianten
// Design DNA: Cormorant Garamond + Mulish | Primary #7c6a5d | Accent #d4644a
//
// ============================================
// MINDOOR OVER SECTION VARIANTEN
// ============================================
// 
// Styling DNA (uit Hero + Diensten):
// - Primary: #7c6a5d (warm bruin/taupe)
// - Accent: #d4644a (terracotta)
// - Fonts: Cormorant Garamond (heading serif), Mulish (body)
// - Warm, persoonlijk, uitnodigend
// - Decoratieve cirkels: opacity-[0.08] tot opacity-[0.12] (subtiel!)
// - Offset backgrounds: ${primary}15 achter foto
// - Rounded corners: rounded-3xl, rounded-[2.5rem], rounded-[3rem]
// - Floating cards: bg-white rounded-2xl border (GEEN shadow!)
// - Italic accent op achternaam in primary/accent kleur
// - NO gradient text, NO heavy shadows
//
// Focus van Over sectie:
// - WIE is deze persoon (niet WAT kan deze persoon)
// - Foto + tekst + naam/signature
// - Quote optioneel voor persoonlijkheid
//
// Wat hier NIET hoort:
// - USPs (BIG, DBA, VOG) → CredentialsSection
// - Stats (jaren, 100%, 24h) → Hero of StatsSection
// - Social proof card → Hero
// - Timeline → WerkervaringSection
// - Feature grid → CredentialsSection
//
// Varianten:
// - mindoor:   Warm Split - Rotated bg shape, decoratieve cirkels
// - mindoor-2: Quote Overlay - Offset bg, floating quote card
// - mindoor-3: Centered Statement - Offset bg, floating white card
//
// ============================================




// ============================================
// MINDOOR 1: Warm Split
// Patronen uit Hero 1: rotated bg shape, decoratieve cirkels, rounded-[2.5rem]
// ============================================
export function OverMindoor({ theme, palette, content, overMij, jarenErvaring, expertises, images }: any) {
  const paragraphs = getParagraphs(overMij, content);
  const { voornaam, achternaam } = getNaamParts(content.naam || 'Zorgprofessional');
  
  const titel = overMij?.titel || 'Zorg met warmte en aandacht';
  const { rest: titelRest, accent: titelAccent } = getTitleWithAccent(titel);
  
  return (
    <section 
      id="over"
      className="relative py-24 lg:py-32 px-6 md:px-12 overflow-hidden"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      {/* Decorative circles (subtiel, kleiner dan Hero) */}
      <div 
        className="absolute -top-16 -right-16 w-56 h-56 rounded-full"
        style={{ background: palette.primary, opacity: 0.07 }}
      />
      <div 
        className="absolute bottom-16 -left-12 w-40 h-40 rounded-full"
        style={{ background: palette.accent || palette.primary, opacity: 0.07 }}
      />
      
      <div className="relative max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Foto met rotated bg shape (exact als Hero 1) */}
          <div className={`relative ${getRevealClass('left')}`}>
            {/* Rotated background shape */}
            <div 
              className="absolute inset-0 rounded-[3rem] transform rotate-3"
              style={{ 
                background: `linear-gradient(to bottom right, ${theme.colors.border}, ${palette.primary}15)` 
              }}
            />
            {/* Main image */}
            <div className="relative rounded-[2.5rem] overflow-hidden">
              <img 
                src={content.foto || images.sfeer}
                alt={`Over ${content.naam}`}
                className="w-full aspect-[4/5] object-cover"
              />
            </div>
          </div>
          
          {/* Content */}
          <div className={getRevealClass('right')}>
            <span 
              className="text-sm font-medium mb-4 block"
              style={{ color: palette.accent || palette.primary }}
            >
              Over mij
            </span>
            
            <h2 
              className="text-3xl sm:text-4xl lg:text-[42px] leading-[1.2] mb-6"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {titelRest}{' '}
              <em className="italic" style={{ color: palette.accent || palette.primary }}>
                {titelAccent}
              </em>
            </h2>
            
            <div className="space-y-4 mb-8">
              {paragraphs.length > 0 ? (
                paragraphs.map((p: string, idx: number) => (
                  <p 
                    key={idx}
                    className="leading-[1.8]"
                    style={{ color: theme.colors.textMuted }}
                  >
                    {p}
                  </p>
                ))
              ) : (
                <>
                  <p className="leading-[1.8]" style={{ color: theme.colors.textMuted }}>
                    Zorg verlenen is voor mij meer dan een beroep — het is een roeping. 
                    Na jarenlange ervaring in verschillende zorgsettings koos ik bewust 
                    voor zelfstandigheid, zodat ik de tijd kan nemen die goede zorg vraagt.
                  </p>
                  <p className="leading-[1.8]" style={{ color: theme.colors.textMuted }}>
                    Wat mij drijft? Het verschil maken in iemands dag. Een luisterend oor 
                    bieden, een helpende hand zijn, en altijd met respect voor wie u bent.
                  </p>
                </>
              )}
            </div>
            
            {/* Signature met border-top */}
            <div 
              className="pt-6"
              style={{ borderTop: `1px solid ${theme.colors.border}` }}
            >
              <p 
                className="text-2xl lg:text-3xl italic"
                style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
              >
                {voornaam}{' '}
                <em style={{ color: palette.accent || palette.primary }}>{achternaam}</em>
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}


// ============================================
// MINDOOR 2: Quote Overlay
// Patronen uit Hero 3: offset bg, floating quote card (primary bg, witte tekst)
// ============================================
export function OverMindoor2({ theme, palette, content, overMij, jarenErvaring, expertises, images }: any) {
  const paragraphs = getParagraphs(overMij, content);
  const quote = getQuote(overMij);
  const { voornaam, achternaam } = getNaamParts(content.naam || 'Zorgprofessional');
  
  const titel = overMij?.titel || 'Persoonlijke zorg, op maat';
  const { rest: titelRest, accent: titelAccent } = getTitleWithAccent(titel, 2);
  
  return (
    <section 
      id="over"
      className="py-24 lg:py-32 px-6 md:px-12 relative overflow-hidden"
      style={{ backgroundColor: theme.colors.background }}
    >
      {/* Decorative circles (subtiel) */}
      <div 
        className="absolute -top-20 -left-20 w-56 h-56 rounded-full"
        style={{ background: palette.primary, opacity: 0.06 }}
      />
      <div 
        className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full"
        style={{ background: palette.accent || palette.primary, opacity: 0.07 }}
      />
      
      <div className="relative max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Foto met offset bg + floating quote card */}
          <div className={`relative ${getRevealClass('left')}`}>
            <div className="rounded-3xl overflow-hidden">
              <img 
                src={content.foto || images.sfeer}
                alt={`Over ${content.naam}`}
                className="w-full aspect-[4/5] object-cover"
              />
            </div>
            
            {/* Offset background (exact als Hero 2/3) */}
            <div 
              className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-3xl"
              style={{ background: `${palette.primary}15` }}
            />
            
            {/* Floating quote card (exact als Hero 3) */}
            <div 
              className="absolute -bottom-8 -left-4 lg:-left-8 max-w-[280px] p-6 rounded-2xl"
              style={{ background: palette.primary }}
            >
              <svg className="w-7 h-7 mb-2 opacity-30 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
              </svg>
              <p 
                className="text-base text-white/90 leading-relaxed italic"
                style={{ fontFamily: theme.fonts.heading }}
              >
                {quote}
              </p>
              <p 
                className="mt-3 text-sm font-medium"
                style={{ color: palette.accentLight || palette.accent || '#e07b5f' }}
              >
                — {voornaam}
              </p>
            </div>
          </div>
          
          {/* Content */}
          <div className={getRevealClass('right')}>
            <span 
              className="text-sm font-medium mb-4 block"
              style={{ color: palette.accent || palette.primary }}
            >
              Over mij
            </span>
            
            <h2 
              className="text-3xl sm:text-4xl lg:text-[42px] leading-[1.2] mb-6"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {titelRest}{' '}
              <em className="italic" style={{ color: palette.accent || palette.primary }}>
                {titelAccent}
              </em>
            </h2>
            
            <div className="space-y-4 mb-8">
              {paragraphs.length > 0 ? (
                paragraphs.map((p: string, idx: number) => (
                  <p 
                    key={idx}
                    className="leading-[1.8]"
                    style={{ color: theme.colors.textMuted }}
                  >
                    {p}
                  </p>
                ))
              ) : (
                <>
                  <p className="leading-[1.8]" style={{ color: theme.colors.textMuted }}>
                    Na meer dan 15 jaar ervaring in de zorg weet ik één ding zeker: elk mens 
                    is uniek en verdient zorg die daarbij past. In ziekenhuizen en zorginstellingen 
                    leerde ik het vak, maar miste ik vaak de ruimte voor persoonlijke aandacht.
                  </p>
                  <p className="leading-[1.8]" style={{ color: theme.colors.textMuted }}>
                    Als zelfstandige kan ik de zorg bieden zoals die bedoeld is: met warmte, 
                    geduld en oprechte betrokkenheid. Geen haast, geen afvinken van lijstjes, 
                    maar echte menselijke verbinding.
                  </p>
                </>
              )}
            </div>
            
            {/* Signature */}
            <div 
              className="pt-6"
              style={{ borderTop: `1px solid ${theme.colors.border}` }}
            >
              <p 
                className="text-2xl lg:text-3xl italic"
                style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
              >
                {voornaam}{' '}
                <em style={{ color: palette.accent || palette.primary }}>{achternaam}</em>
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}


// ============================================
// MINDOOR 3: Centered Statement
// Patronen uit Hero 2: offset bg, floating white card met border, 12-col grid
// ============================================
export function OverMindoor3({ theme, palette, content, overMij, jarenErvaring, expertises, images }: any) {
  const paragraphs = getParagraphs(overMij, content);
  const { voornaam, achternaam } = getNaamParts(content.naam || 'Zorgprofessional');
  
  const titel = overMij?.titel || 'Met hart en ziel in de zorg';
  const { rest: titelRest, accent: titelAccent } = getTitleWithAccent(titel);
  
  // Quote voor floating card
  const quote = getQuote(overMij);
  
  return (
    <section 
      id="over"
      className="py-24 lg:py-32 px-6 md:px-12 relative overflow-hidden"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      {/* Decorative circles (subtiel) */}
      <div 
        className="absolute -top-12 -right-20 w-48 h-48 rounded-full"
        style={{ background: palette.primary, opacity: 0.06 }}
      />
      <div 
        className="absolute bottom-20 -left-10 w-32 h-32 rounded-full"
        style={{ background: palette.accent || palette.primary, opacity: 0.07 }}
      />
      
      <div className="relative max-w-5xl mx-auto">
        
        {/* Centered header */}
        <div className={`text-center mb-12 lg:mb-16 ${getRevealClass('up')}`}>
          <span 
            className="text-sm font-medium mb-4 block"
            style={{ color: palette.accent || palette.primary }}
          >
            Over mij
          </span>
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl leading-[1.2]"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            {titelRest}{' '}
            <em className="italic" style={{ color: palette.accent || palette.primary }}>
              {titelAccent}
            </em>
          </h2>
        </div>
        
        {/* Grid: Tekst + Foto */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Tekst (5 kolommen) */}
          <div className={`lg:col-span-5 lg:pt-4 ${getRevealClass('up', 50)}`}>
            <div className="space-y-4 mb-8">
              {paragraphs.length > 0 ? (
                paragraphs.map((p: string, idx: number) => (
                  <p 
                    key={idx}
                    className="leading-[1.85]"
                    style={{ color: theme.colors.textMuted }}
                  >
                    {p}
                  </p>
                ))
              ) : (
                <>
                  <p className="leading-[1.85]" style={{ color: theme.colors.textMuted }}>
                    Mijn naam is {content.naam}. Al meer dan {jarenErvaring || 15} jaar werk 
                    ik in de zorg, en nog steeds word ik gedreven door hetzelfde: het verschil 
                    maken in iemands leven.
                  </p>
                  <p className="leading-[1.85]" style={{ color: theme.colors.textMuted }}>
                    Als zelfstandige combineer ik professionele expertise met persoonlijke 
                    aandacht. Geen haast, geen afvinken van lijstjes. Gewoon goede zorg, 
                    zoals die bedoeld is.
                  </p>
                </>
              )}
            </div>
            
            {/* Signature */}
            <div 
              className="pt-6"
              style={{ borderTop: `1px solid ${theme.colors.border}` }}
            >
              <p 
                className="text-2xl italic"
                style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
              >
                {voornaam}{' '}
                <em style={{ color: palette.accent || palette.primary }}>{achternaam}</em>
              </p>
            </div>
          </div>
          
          {/* Foto (7 kolommen) met floating card */}
          <div className={`lg:col-span-7 relative ${getRevealClass('up', 100)}`}>
            <div className="rounded-3xl overflow-hidden">
              <img 
                src={content.foto || images.sfeer}
                alt={`Over ${content.naam}`}
                className="w-full aspect-[3/4] object-cover"
              />
            </div>
            
            {/* Offset background (exact als Hero 2) */}
            <div 
              className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-3xl"
              style={{ background: `${palette.primary}15` }}
            />
            
            {/* Floating quote card (bg-white rounded-2xl border, exact als Hero 2 floating cards) */}
            <div 
              className="absolute -bottom-6 -left-6 max-w-[260px] p-5 rounded-2xl bg-white border"
              style={{ borderColor: theme.colors.border }}
            >
              <div className="flex items-start gap-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${palette.primary}15` }}
                >
                  <span 
                    className="material-symbols-outlined text-xl" 
                    style={{ color: palette.primary }}
                  >
                    format_quote
                  </span>
                </div>
                <div>
                  <p 
                    className="text-sm italic leading-relaxed"
                    style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                  >
                    "{quote}"
                  </p>
                  <p 
                    className="text-xs mt-2" 
                    style={{ color: theme.colors.textMuted }}
                  >
                    — {content.naam}
                  </p>
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
// SERENE OVER SECTION VARIANTEN
// ============================================
//
// Styling DNA:
// - Primary: #3d4a3d (sage groen)
// - PrimaryLight: #a8b5a8
// - Accent: #5a6b5a
// - Font heading: Cormorant Garamond (serif)
// - Font body: Nunito Sans (sans-serif)
// - Minimalistisch, rustgevend, veel whitespace
// - Typography-first: oversized serif headings
// - text-[9px] uppercase tracking-[2px] labels
// - Organic corners: border-radius: 0 80px 0 0
// - Subtiele borders als separators
// - Duotone foto behandeling
//
// Varianten:
// - serene:   Quote Lead — Grote quote + ronde duotone foto, twee-kolom tekst
// - serene-2: Visual Margin — Foto + quote sticky links, content rechts
// - serene-3: Numbered Blocks — Compact header, genummerde blokken, asymmetrisch
//
// ============================================

// ============================================
// SERENE 1: Quote Lead
// Grote quote als opening, ronde duotone foto, twee-kolom tekst
// ============================================
export function OverSerene({ theme, palette, content, overMij, jarenErvaring, expertises, images }: any) {
  const paragraphs = getParagraphs(overMij, content);
  const quote = getQuote(overMij);
  
  // Split paragraphs voor twee-kolom layout
  const midPoint = Math.ceil(paragraphs.length / 2);
  const leftParagraphs = paragraphs.slice(0, midPoint);
  const rightParagraphs = paragraphs.slice(midPoint);
  
  return (
    <section 
      id="over"
      className="px-6 md:px-12 lg:px-20 py-20 lg:py-28"
      style={{ backgroundColor: theme.colors.backgroundAlt, fontFamily: theme.fonts.body }}
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Quote + Photo header */}
        <div className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 mb-16 ${getRevealClass('up')}`}>
          
          {/* Quote (dominant) */}
          <div className="flex-1">
            <span 
              className="text-6xl lg:text-7xl leading-none block mb-2"
              style={{ fontFamily: theme.fonts.heading, color: `${palette.primary}30` }}
            >
              &ldquo;
            </span>
            <p 
              className="text-2xl lg:text-3xl italic leading-snug mb-6 -mt-6"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {quote}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-px" style={{ backgroundColor: palette.primary }} />
              <span 
                className="text-[9px] font-medium uppercase tracking-[2px]"
                style={{ color: palette.primary }}
              >
                {content.naam}
              </span>
            </div>
          </div>
          
          {/* Photo (rond, duotone) */}
          <div className="shrink-0">
            <div className="relative">
              <div className="w-48 h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden">
                <img 
                  src={content.foto || images.sfeer}
                  alt={`Over ${content.naam}`}
                  className="w-full h-full object-cover"
                  style={duotoneStyle}
                />
              </div>
              {/* Accent ring */}
              <div 
                className="absolute -inset-3 rounded-full border opacity-20"
                style={{ borderColor: palette.primary }}
              />
            </div>
          </div>
        </div>
        
        {/* Divider + Label */}
        <div className={`flex items-center gap-4 mb-10 ${getRevealClass('up', 100)}`}>
          <span 
            className="text-[9px] font-medium uppercase tracking-[2px]"
            style={{ color: theme.colors.textMuted }}
          >
            Over mij
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: theme.colors.border }} />
        </div>
        
        {/* Title */}
        <h2 
          className={`text-3xl md:text-4xl mb-10 ${getRevealClass('up', 150)}`}
          style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
        >
          {jarenErvaring ? (
            <>Al {jarenErvaring} jaar met <em className="italic" style={{ color: palette.primary }}>toewijding</em> in de zorg</>
          ) : (
            <>Mijn <em className="italic" style={{ color: palette.primary }}>verhaal</em></>
          )}
        </h2>
        
        {/* Two-column text */}
        <div className={`grid md:grid-cols-2 gap-8 lg:gap-12 mb-10 ${getRevealClass('up', 200)}`}>
          <div className="flex flex-col gap-4 leading-[1.8]" style={{ color: theme.colors.textMuted }}>
            {leftParagraphs.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="flex flex-col gap-4 leading-[1.8]" style={{ color: theme.colors.textMuted }}>
            {rightParagraphs.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
        
        {/* Expertise tags */}
        {expertises && expertises.length > 0 && (
          <div className={`flex flex-wrap gap-2 ${getRevealClass('up', 250)}`}>
            {expertises.map((expertise: string, index: number) => (
              <span 
                key={index}
                className="px-3 py-1.5 border text-sm"
                style={{ borderColor: theme.colors.border, color: theme.colors.textMuted }}
              >
                {expertise}
              </span>
            ))}
          </div>
        )}
        
      </div>
    </section>
  );
}


// ============================================
// SERENE 2: Visual Margin
// Foto + quote sticky links, content rechts, signature naam
// ============================================
export function OverSerene2({ theme, palette, content, overMij, jarenErvaring, expertises, images }: any) {
  const paragraphs = getParagraphs(overMij, content);
  const quote = getQuote(overMij);
  
  const midPoint = Math.ceil(paragraphs.length / 2);
  const leftParagraphs = paragraphs.slice(0, midPoint);
  const rightParagraphs = paragraphs.slice(midPoint);
  
  return (
    <section 
      id="over"
      className="px-6 md:px-12 lg:px-20 py-20 lg:py-28"
      style={{ backgroundColor: theme.colors.background, fontFamily: theme.fonts.body }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* Left: Visual Margin (foto + quote) — sticky */}
          <div className={`lg:col-span-4 ${getRevealClass('left')}`}>
            <div className="lg:sticky lg:top-24">
              
              {/* Photo met organic corner */}
              <div className="relative mb-8">
                <img 
                  src={content.foto || images.sfeer}
                  alt={`Over ${content.naam}`}
                  className="w-full aspect-[3/4] object-cover"
                  style={{ ...duotoneStyle, borderRadius: '0 80px 0 0' }}
                />
                {/* Accent lijn onderaan foto */}
                <div 
                  className="absolute bottom-0 left-0 w-full h-px"
                  style={{ backgroundColor: palette.primary }}
                />
              </div>
              
              {/* Quote met border-left */}
              <div 
                className="border-l pl-5"
                style={{ borderColor: palette.primary }}
              >
                <p 
                  className="text-lg italic leading-relaxed mb-4"
                  style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                >
                  &ldquo;{quote}&rdquo;
                </p>
                <p 
                  className="text-[9px] font-medium uppercase tracking-[2px]"
                  style={{ color: palette.primary }}
                >
                  — {content.naam?.split(' ')[0]}
                </p>
              </div>
              
            </div>
          </div>
          
          {/* Right: Content */}
          <div className={`lg:col-span-8 ${getRevealClass('right')}`}>
            
            {/* Label + lijn */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px" style={{ backgroundColor: palette.primary }} />
              <span 
                className="text-[9px] font-medium uppercase tracking-[3px]"
                style={{ color: theme.colors.textMuted }}
              >
                Over mij
              </span>
            </div>
            
            {/* Heading */}
            <h2 
              className="text-3xl md:text-4xl mb-8"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              Persoonlijke <em className="italic" style={{ color: palette.primary }}>zorg</em> op maat
            </h2>
            
            {/* Two-column text */}
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="flex flex-col gap-4 leading-[1.8]" style={{ color: theme.colors.textMuted }}>
                {leftParagraphs.map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="flex flex-col gap-4 leading-[1.8]" style={{ color: theme.colors.textMuted }}>
                {rightParagraphs.map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
            
            {/* Bottom: tags + signature naam */}
            <div 
              className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pt-8 border-t"
              style={{ borderColor: theme.colors.border }}
            >
              {expertises && expertises.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {expertises.map((expertise: string, index: number) => (
                    <span 
                      key={index}
                      className="px-3 py-1.5 border text-sm"
                      style={{ borderColor: theme.colors.border, color: theme.colors.textMuted }}
                    >
                      {expertise}
                    </span>
                  ))}
                </div>
              )}
              <p 
                className="text-2xl italic shrink-0"
                style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
              >
                {content.naam}
              </p>
            </div>
            
          </div>
          
        </div>
      </div>
    </section>
  );
}


// ============================================
// SERENE 3: Numbered Blocks
// Compact header, genummerde blokken, asymmetrisch grid
// ============================================
export function OverSerene3({ theme, palette, content, overMij, jarenErvaring, expertises, images }: any) {
  const paragraphs = getParagraphs(overMij, content);
  const quote = getQuote(overMij);
  
  // Split paragraphs into numbered blocks (max 3)
  const blocks = [
    { num: '01', title: 'Mijn achtergrond', text: paragraphs[0] },
    { num: '02', title: 'Wat mij drijft', text: paragraphs[1] },
    { num: '03', title: 'Mijn aanpak', text: paragraphs[2] },
  ].filter(block => block.text);
  
  // Fallback als er minder dan 3 paragraphs zijn
  const defaultBlocks = [
    { num: '01', title: 'Mijn achtergrond', text: 'Met jarenlange ervaring in de zorg heb ik een brede basis opgebouwd. Van ziekenhuiszorg en revalidatie tot thuiszorg en palliatieve begeleiding.' },
    { num: '02', title: 'Wat mij drijft', text: 'Het maken van een verschil in het leven van mensen. Of het nu gaat om wondzorg, palliatieve begeleiding, of een luisterend oor.' },
    { num: '03', title: 'Mijn aanpak', text: 'Als ZZP\'er combineer ik zelfstandigheid met professionele kwaliteit. Flexibel, betrouwbaar en met persoonlijke aandacht.' },
  ];
  
  const displayBlocks = blocks.length >= 2 ? blocks : defaultBlocks;
  
  // Split blocks: eerste helft links, rest rechts (offset)
  const leftBlocks = displayBlocks.slice(0, 2);
  const rightBlocks = displayBlocks.slice(2);
  
  return (
    <section 
      id="over"
      className="px-6 md:px-12 lg:px-20 py-20 lg:py-28"
      style={{ backgroundColor: theme.colors.backgroundAlt, fontFamily: theme.fonts.body }}
    >
      <div className="max-w-5xl mx-auto">
        
        {/* Label + lijn */}
        <div className={`flex items-center gap-4 mb-10 ${getRevealClass('up')}`}>
          <div className="w-8 h-px" style={{ backgroundColor: palette.primary }} />
          <span 
            className="text-[9px] font-medium uppercase tracking-[3px]"
            style={{ color: theme.colors.textMuted }}
          >
            Over mij
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: theme.colors.border }} />
        </div>
        
        {/* Compact header: Photo + Quote */}
        <div className={`flex flex-col md:flex-row gap-8 lg:gap-12 mb-12 ${getRevealClass('up', 100)}`}>
          {/* Vierkante foto */}
          <div className="shrink-0">
            <div className="relative w-40 h-40 lg:w-48 lg:h-48 overflow-hidden">
              <img 
                src={content.foto || images.sfeer}
                alt={`Over ${content.naam}`}
                className="w-full h-full object-cover"
                style={duotoneStyle}
              />
              {/* Accent block rechtsonder */}
              <div 
                className="absolute bottom-0 right-0 w-8 h-8 opacity-80"
                style={{ backgroundColor: palette.primary }}
              />
            </div>
          </div>
          
          {/* Quote */}
          <div className="flex-1 flex flex-col justify-center">
            <span 
              className="text-5xl leading-none block mb-1"
              style={{ fontFamily: theme.fonts.heading, color: `${palette.primary}30` }}
            >
              &ldquo;
            </span>
            <p 
              className="text-xl lg:text-2xl italic leading-snug mb-4 -mt-4"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {quote}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-px" style={{ backgroundColor: palette.primary }} />
              <span 
                className="text-[9px] font-medium uppercase tracking-[2px]"
                style={{ color: palette.primary }}
              >
                {content.naam?.split(' ')[0]}
              </span>
            </div>
          </div>
        </div>
        
        {/* Grote heading met jaren ervaring */}
        <h2 
          className={`text-3xl md:text-4xl lg:text-[42px] leading-[1.15] mb-12 ${getRevealClass('up', 150)}`}
          style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
        >
          {jarenErvaring ? (
            <>Al {jarenErvaring} jaar met <em className="italic" style={{ color: palette.primary }}>toewijding</em> in de zorg</>
          ) : (
            <>Met <em className="italic" style={{ color: palette.primary }}>passie</em> voor persoonlijke zorg</>
          )}
        </h2>
        
        {/* Genummerde blokken in asymmetrisch grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          
          {/* Linker kolom */}
          <div className="lg:col-span-6 space-y-0">
            {leftBlocks.map((block, idx) => (
              <div 
                key={idx}
                className={`border-l pl-6 py-6 ${getRevealClass('up', (idx + 2) * 50)}`}
                style={{ borderColor: idx === 0 ? palette.primary : theme.colors.border }}
              >
                <span 
                  className="text-[9px] font-medium uppercase tracking-[2px] block mb-2"
                  style={{ color: theme.colors.textMuted }}
                >
                  {block.num}
                </span>
                <h3 
                  className="text-xl mb-3"
                  style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                >
                  {block.title}
                </h3>
                <p className="text-sm leading-[1.8]" style={{ color: theme.colors.textMuted }}>
                  {block.text}
                </p>
              </div>
            ))}
          </div>
          
          {/* Rechter kolom: offset naar beneden */}
          <div className="lg:col-span-6 lg:pt-16 space-y-0">
            {rightBlocks.map((block, idx) => (
              <div 
                key={idx}
                className={`border-l pl-6 py-6 ${getRevealClass('up', (idx + 3) * 50)}`}
                style={{ borderColor: theme.colors.border }}
              >
                <span 
                  className="text-[9px] font-medium uppercase tracking-[2px] block mb-2"
                  style={{ color: theme.colors.textMuted }}
                >
                  {block.num}
                </span>
                <h3 
                  className="text-xl mb-3"
                  style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                >
                  {block.title}
                </h3>
                <p className="text-sm leading-[1.8]" style={{ color: theme.colors.textMuted }}>
                  {block.text}
                </p>
              </div>
            ))}
            
            {/* Sfeerbeeld */}
            <div className={`pt-6 ${getRevealClass('up', 200)}`}>
              <img 
                src={images.sfeer}
                alt="Zorg sfeer"
                className="w-full h-48 object-cover"
                style={{ borderRadius: '0 40px 0 0' }}
              />
            </div>
          </div>
          
        </div>
        
        {/* Bottom: tags + CTA */}
        <div 
          className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 pt-8 border-t ${getRevealClass('up', 250)}`}
          style={{ borderColor: theme.colors.border }}
        >
          {expertises && expertises.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {expertises.map((expertise: string, index: number) => (
                <span 
                  key={index}
                  className="px-3 py-1.5 border text-sm"
                  style={{ borderColor: theme.colors.border, color: theme.colors.textMuted }}
                >
                  {expertise}
                </span>
              ))}
            </div>
          )}
          
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
            Neem contact op
          </a>
        </div>
        
      </div>
    </section>
  );
}

// ============================================
// SPLIT - Foto links, tekst rechts
// ============================================
function OverSplit({ theme, palette, content, overMij, jarenErvaring, images }: any) {
  const overMijText = overMij?.body || overMij?.intro || content.over_mij || '';
  
  return (
    <section 
      id="over"
      className="py-20 md:py-28 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className={getRevealClass('left')}>
            <div 
              className="aspect-[4/5] bg-cover bg-center rounded-2xl shadow-lg"
              style={{ backgroundImage: `url("${content.foto || images.sfeer}")` }}
            />
          </div>
          
          {/* Content */}
          <div className={getRevealClass('right')}>
            <h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              Over Mij
            </h2>
            
            <div className="space-y-4 mb-8">
              <p style={{ color: theme.colors.textMuted, lineHeight: 1.8 }}>
                {overMijText || 'Met jarenlange ervaring in de zorg sta ik klaar om u te helpen met professionele en persoonlijke zorg.'}
              </p>
            </div>
            
            {/* Stats */}
            <div 
              className="grid grid-cols-2 gap-4 p-6 rounded-xl"
              style={{ backgroundColor: theme.colors.surface }}
            >
              {jarenErvaring && (
                <div>
                  <p className="text-3xl font-bold" style={{ color: palette.primary }}>
                    {jarenErvaring}+
                  </p>
                  <p className="text-sm" style={{ color: theme.colors.textMuted }}>
                    Jaar ervaring
                  </p>
                </div>
              )}
              <div>
                <p className="text-3xl font-bold" style={{ color: palette.primary }}>
                  100%
                </p>
                <p className="text-sm" style={{ color: theme.colors.textMuted }}>
                  Inzet
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
  
export default OverSection;