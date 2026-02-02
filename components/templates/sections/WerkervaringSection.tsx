// components/templates/sections/WerkervaringSection.tsx
// Werkervaring timeline sectie - toont professionele achtergrond

'use client';

import { BaseSectionProps, getRevealClass } from './types';

// Style type voor deze sectie
export type WerkervaringStyle = 'editorial' | 'proactief' | 'portfolio' | 'mindoor' | 'timeline' | 'cards' | 'compact';

interface WerkervaringSectionProps extends BaseSectionProps {
  style?: WerkervaringStyle;
}

export function WerkervaringSection({ 
  style = 'editorial', 
  theme, 
  palette, 
  content,
  generated,
}: WerkervaringSectionProps) {
  // Werkervaring komt uit content, NIET uit generated
  const werkervaring = content.werkervaring || [];
  
  // Geen werkervaring? Toon niets
  if (werkervaring.length === 0) return null;
  
  // Titel en intro (kunnen uit generated komen als die er zijn)
  const titel = 'Mijn Ervaring';
  const intro = 'Een overzicht van mijn professionele achtergrond in de zorg.';
  
  switch (style) {
    case 'editorial':
      return <WerkervaringEditorial {...{ theme, palette, werkervaring, titel, intro }} />;
    case 'proactief':
      return <WerkervaringProactief {...{ theme, palette, werkervaring, titel, intro }} />;
    case 'portfolio':
      return <WerkervaringPortfolio {...{ theme, palette, werkervaring, titel, intro }} />;
    case 'mindoor':
      return <WerkervaringMindoor {...{ theme, palette, werkervaring, titel, intro }} />;
    case 'timeline':
      return <WerkervaringTimeline {...{ theme, palette, werkervaring, titel, intro }} />;
    case 'cards':
      return <WerkervaringCards {...{ theme, palette, werkervaring, titel, intro }} />;
    case 'compact':
      return <WerkervaringCompact {...{ theme, palette, werkervaring, titel, intro }} />;
    default:
      return <WerkervaringEditorial {...{ theme, palette, werkervaring, titel, intro }} />;
  }
}

// Helper: Format periode
function formatPeriode(item: any): string {
  const startJaar = item.start_jaar || item.startJaar;
  const eindJaar = item.eind_jaar || item.eindJaar;
  
  if (eindJaar) {
    return `${startJaar} - ${eindJaar}`;
  }
  return `${startJaar} - Heden`;
}

// Helper: Check of huidige baan
function isHuidig(item: any): boolean {
  return !item.eind_jaar && !item.eindJaar;
}

// ============================================
// EDITORIAL - Elegante verticale timeline
// ============================================
function WerkervaringEditorial({ theme, palette, werkervaring, titel, intro }: any) {
  return (
    <section 
      id="werkervaring"
      className="px-6 md:px-16 lg:px-32 py-20"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className={`text-center mb-14 ${getRevealClass('up')}`}>
          <span 
            className="text-xs font-semibold uppercase tracking-[0.15em] block mb-3"
            style={{ fontVariant: 'small-caps', color: palette.primary }}
          >
            Achtergrond
          </span>
          <h2 
            className="text-3xl md:text-4xl mb-4"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            {titel}
          </h2>
          <p 
            className="max-w-2xl mx-auto"
            style={{ color: theme.colors.textMuted }}
          >
            {intro}
          </p>
        </div>
        
        {/* Timeline */}
        <div 
          className="relative border-l-2 ml-4 md:ml-8"
          style={{ borderColor: `${palette.primary}30` }}
        >
          {werkervaring.slice(0, 5).map((item: any, index: number) => {
            const huidig = isHuidig(item);
            
            return (
              <div 
                key={index}
                className={`relative pl-8 pb-10 last:pb-0 ${getRevealClass('left', index + 1)}`}
              >
                {/* Dot */}
                <div 
                  className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-4"
                  style={{ 
                    borderColor: theme.colors.background,
                    backgroundColor: huidig ? palette.primary : `${palette.primary}60`
                  }}
                />
                
                {/* Content */}
                <div 
                  className="p-6 rounded-xl border"
                  style={{ 
                    backgroundColor: theme.colors.surface,
                    borderColor: huidig ? palette.primary : theme.colors.border,
                    borderWidth: huidig ? '2px' : '1px'
                  }}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 
                      className="text-lg font-bold"
                      style={{ color: theme.colors.text }}
                    >
                      {item.functie}
                    </h3>
                    <span 
                      className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{ 
                        backgroundColor: huidig ? palette.primaryLight : theme.colors.backgroundAlt,
                        color: huidig ? palette.primary : theme.colors.textMuted
                      }}
                    >
                      {formatPeriode(item)}
                    </span>
                  </div>
                  
                  <p 
                    className="font-medium mb-2"
                    style={{ color: palette.primary }}
                  >
                    {item.werkgever}
                  </p>
                  
                  {item.beschrijving && (
                    <p 
                      className="text-sm"
                      style={{ color: theme.colors.textMuted }}
                    >
                      {item.beschrijving}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}

// ============================================
// PROACTIEF - Cards met gradient accenten
// ============================================
function WerkervaringProactief({ theme, palette, werkervaring, titel, intro }: any) {
  return (
    <section 
      id="werkervaring"
      className="py-24 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className={`text-center mb-16 ${getRevealClass('up')}`}>
          <span 
            className="text-sm font-medium italic mb-3 block"
            style={{ color: palette.primary }}
          >
            Mijn achtergrond
          </span>
          <h2 
            className="text-4xl font-bold"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            {titel}
          </h2>
        </div>
        
        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {werkervaring.slice(0, 4).map((item: any, index: number) => {
            const huidig = isHuidig(item);
            
            return (
              <div 
                key={index}
                className={`relative p-6 rounded-2xl overflow-hidden ${getRevealClass('up', index + 1)}`}
                style={{ 
                  backgroundColor: huidig ? palette.primary : theme.colors.surface,
                }}
              >
                {/* Gradient overlay voor huidige */}
                {huidig && (
                  <div 
                    className="absolute inset-0 opacity-90"
                    style={{ 
                      background: `linear-gradient(135deg, ${palette.primary} 0%, ${palette.primaryDark || palette.primary} 100%)`
                    }}
                  />
                )}
                
                <div className="relative z-10">
                  {/* Badge */}
                  <span 
                    className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4"
                    style={{ 
                      backgroundColor: huidig ? 'rgba(255,255,255,0.2)' : palette.primaryLight,
                      color: huidig ? 'white' : palette.primary
                    }}
                  >
                    {formatPeriode(item)}
                  </span>
                  
                  {/* Title */}
                  <h3 
                    className="text-xl font-bold mb-2"
                    style={{ color: huidig ? 'white' : theme.colors.text }}
                  >
                    {item.functie}
                  </h3>
                  
                  {/* Employer */}
                  <p 
                    className="font-medium mb-3"
                    style={{ color: huidig ? 'rgba(255,255,255,0.8)' : palette.primary }}
                  >
                    {item.werkgever}
                  </p>
                  
                  {/* Description */}
                  {item.beschrijving && (
                    <p 
                      className="text-sm"
                      style={{ color: huidig ? 'rgba(255,255,255,0.7)' : theme.colors.textMuted }}
                    >
                      {item.beschrijving}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}

// ============================================
// PORTFOLIO - Zigzag timeline met elegante styling
// ============================================
function WerkervaringPortfolio({ theme, palette, werkervaring, titel, intro }: any) {
  return (
    <section 
      id="werkervaring"
      className="py-28 px-8 md:px-12"
      style={{ backgroundColor: 'white' }}
    >
      <div className="max-w-[1000px] mx-auto">
        
        {/* Header */}
        <div className={`text-center mb-16 ${getRevealClass('up')}`}>
          <span 
            className="text-[13px] font-semibold uppercase tracking-[2px] mb-4 block"
            style={{ color: palette.accent || palette.primary }}
          >
            Achtergrond
          </span>
          <h2 
            className="text-[42px] font-semibold leading-[1.2]"
            style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
          >
            Mijn <em className="italic" style={{ color: palette.accent || palette.primary }}>pad</em>
          </h2>
        </div>
        
        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 w-[3px] h-full rounded hidden md:block"
            style={{ 
              background: `linear-gradient(180deg, ${palette.accent || palette.primary}, ${palette.primary})`
            }}
          />
          
          {werkervaring.slice(0, 4).map((item: any, index: number) => {
            const isLeft = index % 2 === 0;
            const huidig = isHuidig(item);
            
            return (
              <div 
                key={index}
                className={`relative flex mb-12 ${getRevealClass('up', index + 1)}`}
              >
                {/* Mobile: Simple layout */}
                <div className="md:hidden w-full">
                  <div 
                    className="p-6 rounded-2xl border"
                    style={{ 
                      backgroundColor: theme.colors.surface,
                      borderColor: huidig ? palette.primary : theme.colors.border
                    }}
                  >
                    <span 
                      className="text-xs font-bold px-3 py-1 rounded-full inline-block mb-3"
                      style={{ 
                        backgroundColor: huidig ? palette.primaryLight : theme.colors.backgroundAlt,
                        color: huidig ? palette.primary : theme.colors.textMuted
                      }}
                    >
                      {formatPeriode(item)}
                    </span>
                    <h3 className="text-xl font-semibold mb-1" style={{ color: palette.primary }}>
                      {item.functie}
                    </h3>
                    <p className="text-sm font-medium mb-2" style={{ color: theme.colors.textMuted }}>
                      {item.werkgever}
                    </p>
                    {item.beschrijving && (
                      <p className="text-sm" style={{ color: theme.colors.textMuted }}>
                        {item.beschrijving}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Desktop: Zigzag layout */}
                <div className={`hidden md:flex w-full ${isLeft ? 'justify-end pr-12' : 'justify-start pl-12'}`}>
                  <div className={`w-[45%] ${isLeft ? 'text-right' : 'text-left'}`}>
                    {/* Dot */}
                    <div 
                      className={`absolute top-6 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-4 z-10`}
                      style={{ 
                        backgroundColor: huidig ? palette.accent || palette.primary : 'white',
                        borderColor: palette.primary
                      }}
                    />
                    
                    {/* Content */}
                    <div 
                      className="p-6 rounded-2xl"
                      style={{ backgroundColor: theme.colors.backgroundAlt }}
                    >
                      <span 
                        className="text-xs font-bold px-3 py-1 rounded-full inline-block mb-3"
                        style={{ 
                          backgroundColor: huidig ? `${palette.accent || palette.primary}20` : 'white',
                          color: palette.primary
                        }}
                      >
                        {formatPeriode(item)}
                      </span>
                      <h3 
                        className="text-xl font-semibold mb-1"
                        style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
                      >
                        {item.functie}
                      </h3>
                      <p 
                        className="text-sm font-medium mb-2"
                        style={{ color: theme.colors.textMuted }}
                      >
                        {item.werkgever}
                      </p>
                      {item.beschrijving && (
                        <p 
                          className="text-sm"
                          style={{ color: theme.colors.textMuted }}
                        >
                          {item.beschrijving}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}

// ============================================
// MINDOOR - Warme, organische cards
// ============================================
function WerkervaringMindoor({ theme, palette, werkervaring, titel, intro }: any) {
  return (
    <section 
      id="werkervaring"
      className="py-20 lg:py-28"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className={`text-center mb-16 ${getRevealClass('up')}`}>
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl mb-4"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            Mijn{' '}
            <span 
              className="italic"
              style={{ 
                background: `linear-gradient(135deg, ${palette.accent || '#d4644a'}, ${palette.accentLight || '#e07b5f'})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              achtergrond
            </span>
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: theme.colors.textMuted }}>
            {intro}
          </p>
        </div>
        
        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {werkervaring.slice(0, 4).map((item: any, index: number) => {
            const huidig = isHuidig(item);
            
            return (
              <div 
                key={index}
                className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 ${getRevealClass('up', index + 1)}`}
              >
                {/* Header met badge */}
                <div className="flex items-start justify-between mb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${palette.primary}15` }}
                  >
                    <span 
                      className="material-symbols-outlined text-2xl"
                      style={{ color: palette.primary }}
                    >
                      work
                    </span>
                  </div>
                  
                  {huidig && (
                    <span 
                      className="text-xs font-bold px-3 py-1 rounded-full"
                      style={{ 
                        backgroundColor: `${palette.accent || '#d4644a'}20`,
                        color: palette.accent || '#d4644a'
                      }}
                    >
                      Huidig
                    </span>
                  )}
                </div>
                
                {/* Content */}
                <h3 
                  className="text-lg font-bold mb-1"
                  style={{ color: theme.colors.text }}
                >
                  {item.functie}
                </h3>
                <p 
                  className="text-sm font-medium mb-2"
                  style={{ color: palette.primary }}
                >
                  {item.werkgever}
                </p>
                <p 
                  className="text-sm mb-3"
                  style={{ color: theme.colors.textMuted }}
                >
                  {formatPeriode(item)}
                </p>
                {item.beschrijving && (
                  <p 
                    className="text-sm"
                    style={{ color: theme.colors.textMuted }}
                  >
                    {item.beschrijving}
                  </p>
                )}
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}

// ============================================
// TIMELINE - Klassieke verticale timeline
// ============================================
function WerkervaringTimeline({ theme, palette, werkervaring, titel, intro }: any) {
  return (
    <section 
      id="werkervaring"
      className="py-20 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
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
        
        {/* Timeline */}
        <div 
          className="relative border-l-2 ml-4"
          style={{ borderColor: palette.primary }}
        >
          {werkervaring.map((item: any, index: number) => {
            const huidig = isHuidig(item);
            
            return (
              <div 
                key={index}
                className={`relative pl-8 pb-8 last:pb-0 ${getRevealClass('left', index + 1)}`}
              >
                {/* Dot */}
                <div 
                  className="absolute -left-[9px] top-0 w-4 h-4 rounded-full"
                  style={{ backgroundColor: huidig ? palette.primary : theme.colors.surface, border: `3px solid ${palette.primary}` }}
                />
                
                {/* Year badge */}
                <span 
                  className="text-xs font-bold px-2 py-1 rounded mb-2 inline-block"
                  style={{ backgroundColor: palette.primaryLight, color: palette.primary }}
                >
                  {formatPeriode(item)}
                </span>
                
                {/* Content */}
                <h3 
                  className="text-lg font-bold"
                  style={{ color: theme.colors.text }}
                >
                  {item.functie}
                </h3>
                <p 
                  className="text-sm font-medium"
                  style={{ color: palette.primary }}
                >
                  {item.werkgever}
                </p>
                {item.beschrijving && (
                  <p 
                    className="text-sm mt-2"
                    style={{ color: theme.colors.textMuted }}
                  >
                    {item.beschrijving}
                  </p>
                )}
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}

// ============================================
// CARDS - Simpele kaarten grid
// ============================================
function WerkervaringCards({ theme, palette, werkervaring, titel, intro }: any) {
  return (
    <section 
      id="werkervaring"
      className="py-20 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.background }}
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {werkervaring.slice(0, 6).map((item: any, index: number) => (
            <div 
              key={index}
              className={`p-6 rounded-xl border ${getRevealClass('up', index + 1)}`}
              style={{ 
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border
              }}
            >
              <span 
                className="text-xs font-medium px-2 py-1 rounded-full inline-block mb-3"
                style={{ backgroundColor: palette.primaryLight, color: palette.primary }}
              >
                {formatPeriode(item)}
              </span>
              <h3 
                className="font-bold mb-1"
                style={{ color: theme.colors.text }}
              >
                {item.functie}
              </h3>
              <p 
                className="text-sm"
                style={{ color: theme.colors.textMuted }}
              >
                {item.werkgever}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}

// ============================================
// COMPACT - Inline weergave
// ============================================
function WerkervaringCompact({ theme, palette, werkervaring, titel, intro }: any) {
  return (
    <section 
      id="werkervaring"
      className="py-12 px-6 border-y"
      style={{ borderColor: theme.colors.border, backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-6">
          <span 
            className="font-bold"
            style={{ color: theme.colors.text }}
          >
            Ervaring:
          </span>
          {werkervaring.slice(0, 4).map((item: any, index: number) => (
            <div 
              key={index}
              className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{ backgroundColor: theme.colors.surface }}
            >
              <span className="font-medium" style={{ color: theme.colors.text }}>
                {item.functie}
              </span>
              <span className="text-sm" style={{ color: theme.colors.textMuted }}>
                @ {item.werkgever}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WerkervaringSection;