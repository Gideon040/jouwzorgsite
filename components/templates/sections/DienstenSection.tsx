// components/templates/sections/DienstenSection.tsx
// Diensten section met meerdere style varianten

'use client';

import { BaseSectionProps, DienstenStyle, getRevealClass, getDienstIcon } from './types';

interface DienstenSectionProps extends BaseSectionProps {
  style?: DienstenStyle;
}

export function DienstenSection({ 
  style = 'editorial', 
  theme, 
  palette, 
  content, 
  generated 
}: DienstenSectionProps) {
  const diensten = generated?.diensten?.items || content.diensten || [];
  const titel = generated?.diensten?.titel || 'Mijn expertise';
  const intro = generated?.diensten?.intro;
  
  if (!diensten.length) return null;
  
  switch (style) {
    case 'editorial':
      return <DienstenEditorial {...{ theme, palette, diensten, titel, intro }} />;
    case 'proactief':
      return <DienstenProactief {...{ theme, palette, diensten, titel, intro }} />;
    case 'portfolio':
      return <DienstenPortfolio {...{ theme, palette, diensten, titel, intro }} />;
    case 'mindoor':
      return <DienstenMindoor {...{ theme, palette, diensten, titel, intro }} />;
    case 'cards':
      return <DienstenCards {...{ theme, palette, diensten, titel, intro }} />;
    case 'numbered':
      return <DienstenNumbered {...{ theme, palette, diensten, titel, intro }} />;
    case 'list':
      return <DienstenList {...{ theme, palette, diensten, titel, intro }} />;
    case 'grid':
      return <DienstenGrid {...{ theme, palette, diensten, titel, intro }} />;
    default:
      return <DienstenEditorial {...{ theme, palette, diensten, titel, intro }} />;
  }
}

// ============================================
// EDITORIAL - Origineel uit HTML template
// Genummerd, border-bottom, "Meer info →"
// ============================================
function DienstenEditorial({ theme, palette, diensten, titel, intro }: any) {
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
          {diensten.slice(0, 6).map((dienst: any, index: number) => (
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
                  {dienst.beschrijving || 'Professionele zorg met aandacht voor uw persoonlijke situatie.'}
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
// PROACTIEF - Cards met icon, top-border hover, decoratieve cirkels
// ============================================
function DienstenProactief({ theme, palette, diensten, titel, intro }: any) {
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
            style={{ fontFamily: theme.fonts.heading, color: palette.primaryDark || palette.primary }}
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
          {diensten.map((dienst: any, idx: number) => (
            <div 
              key={idx}
              className={`bg-white p-10 rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,153,204,0.12)] group ${getRevealClass('up', idx * 100)}`}
            >
              {/* Top border on hover */}
              <div 
                className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(90deg, ${palette.primary}, ${palette.primaryDark || palette.primary})` }}
              />
              
              {/* Icon */}
              <div 
                className="w-[70px] h-[70px] rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: palette.primaryLight || `${palette.primary}15` }}
              >
                <span 
                  className="material-symbols-outlined text-3xl"
                  style={{ color: palette.primary }}
                >
                  {getDienstIcon(dienst.naam || dienst.titel)}
                </span>
              </div>
              
              {/* Content */}
              <h3 
                className="text-xl font-semibold mb-4"
                style={{ color: theme.colors.text }}
              >
                {dienst.naam || dienst.titel}
              </h3>
              <p 
                className="text-sm leading-relaxed"
                style={{ color: theme.colors.textMuted }}
              >
                {dienst.beschrijving || 'Professionele zorg met aandacht voor uw persoonlijke situatie.'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// PORTFOLIO - Cards met gradient icons, top-border hover
// ============================================
function DienstenPortfolio({ theme, palette, diensten, titel, intro }: any) {
  return (
    <section 
      id="diensten"
      className="py-28 px-8 md:px-12 relative overflow-hidden"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      {/* Decorative circle */}
      <div 
        className="absolute -top-[200px] -right-[200px] w-[500px] h-[500px] rounded-full opacity-[0.03]"
        style={{ backgroundColor: palette.accent || palette.primary }}
      />
      
      <div className="max-w-[1200px] mx-auto relative">
        {/* Header */}
        <div className={`text-center max-w-[600px] mx-auto mb-16 ${getRevealClass('up')}`}>
          <span 
            className="text-[13px] font-semibold uppercase tracking-[2px] mb-4 block"
            style={{ color: palette.accent || palette.primary }}
          >
            Mijn expertise
          </span>
          <h2 
            className="text-[42px] font-semibold leading-[1.2] mb-6"
            style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
          >
            Wat kan ik voor <em className="italic" style={{ color: palette.accent || palette.primary }}>u betekenen</em>
          </h2>
          {intro && (
            <p className="text-base" style={{ color: theme.colors.textMuted }}>
              {intro}
            </p>
          )}
        </div>
        
        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {diensten.slice(0, 6).map((dienst: any, idx: number) => (
            <div 
              key={idx}
              className={`bg-white p-10 rounded-3xl shadow-[0_10px_40px_rgba(26,58,47,0.06)] relative overflow-hidden transition-all duration-400 hover:-translate-y-2.5 hover:shadow-[0_25px_60px_rgba(26,58,47,0.12)] group ${getRevealClass('up', idx * 100)}`}
            >
              {/* Top border on hover */}
              <div 
                className="absolute top-0 left-0 right-0 h-1 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                style={{ background: `linear-gradient(90deg, ${palette.accent || palette.primary}, ${palette.accentLight || palette.primaryLight || palette.primary})` }}
              />
              
              {/* Icon */}
              <div 
                className="w-[70px] h-[70px] rounded-[20px] flex items-center justify-center mb-6"
                style={{ 
                  background: `linear-gradient(135deg, ${palette.primary} 0%, ${palette.primaryLight || palette.primary} 100%)`
                }}
              >
                <span className="material-symbols-outlined text-[32px] text-white">
                  {getDienstIcon(dienst.naam || dienst.titel)}
                </span>
              </div>
              
              {/* Content */}
              <h3 
                className="text-[22px] font-semibold mb-4"
                style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
              >
                {dienst.naam || dienst.titel}
              </h3>
              <p 
                className="text-[15px] leading-[1.7]"
                style={{ color: theme.colors.textMuted }}
              >
                {dienst.beschrijving || 'Professionele zorg met aandacht voor uw persoonlijke situatie.'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// MINDOOR - Orbital layout met concentric circles
// ============================================
function DienstenMindoor({ theme, palette, diensten, titel, intro }: any) {
  // Split title for gradient accent
  const titleParts = titel.split(' ');
  const accentWord = titleParts[titleParts.length - 1];
  const restTitle = titleParts.slice(0, -1).join(' ');
  
  return (
    <section 
      id="diensten"
      className="py-20 lg:py-40 relative overflow-hidden"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Orbital layout container */}
        <div className="relative min-h-[700px] lg:min-h-[800px] flex flex-col justify-center">
          
          {/* Central decorative circles */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px] pointer-events-none">
            <div 
              className="absolute inset-0 border-2 rounded-full"
              style={{ borderColor: `${palette.accent || '#d4b89b'}60` }}
            />
            <div 
              className="absolute inset-6 lg:inset-10 border-2 rounded-full"
              style={{ borderColor: `${palette.primary}50` }}
            />
            <div 
              className="absolute inset-12 lg:inset-20 border-2 rounded-full"
              style={{ borderColor: `${palette.accent || '#d4b89b'}40` }}
            />
          </div>
          
          {/* Top row cards */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-x-[400px] mb-6 lg:mb-0 relative z-10">
            {diensten.slice(0, 2).map((dienst: any, idx: number) => (
              <div 
                key={idx}
                className={`backdrop-blur-sm rounded-3xl p-6 lg:p-8 transition-all hover:-translate-y-2 hover:shadow-xl ${
                  idx === 1 ? 'lg:max-w-sm lg:ml-auto' : 'lg:max-w-sm'
                } ${getRevealClass('up', (idx + 1) * 100)}`}
                style={{ backgroundColor: `${theme.colors.backgroundAlt}cc` }}
              >
                <div className="w-10 h-10 mb-4" style={{ color: palette.primary }}>
                  <span className="material-symbols-outlined text-3xl">
                    {getDienstIcon(dienst.naam || dienst.titel)}
                  </span>
                </div>
                <h3 
                  className="text-xl font-semibold mb-3"
                  style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                >
                  {dienst.naam || dienst.titel}
                </h3>
                <p className="text-sm lg:text-base" style={{ color: theme.colors.textMuted }}>
                  {dienst.beschrijving || 'Professionele zorg met aandacht.'}
                </p>
              </div>
            ))}
          </div>
          
          {/* Center Title */}
          <div className={`text-center py-12 lg:py-20 relative z-10 ${getRevealClass('up')}`}>
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl"
              style={{ fontFamily: theme.fonts.heading }}
            >
              {restTitle}{' '}
              <span 
                className="italic"
                style={{ 
                  background: `linear-gradient(135deg, ${palette.accent || '#d4644a'}, ${palette.accentLight || '#e07b5f'})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {accentWord}
              </span>
            </h2>
            {intro && (
              <p className="mt-4 max-w-xl mx-auto" style={{ color: theme.colors.textMuted }}>
                {intro}
              </p>
            )}
          </div>
          
          {/* Bottom row cards */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-x-[400px] mt-6 lg:mt-0 relative z-10">
            {diensten.slice(2, 4).map((dienst: any, idx: number) => (
              <div 
                key={idx}
                className={`backdrop-blur-sm rounded-3xl p-6 lg:p-8 transition-all hover:-translate-y-2 hover:shadow-xl ${
                  idx === 1 ? 'lg:max-w-sm lg:ml-auto' : 'lg:max-w-sm'
                } ${getRevealClass('up', (idx + 3) * 100)}`}
                style={{ backgroundColor: `${theme.colors.backgroundAlt}cc` }}
              >
                <div className="w-10 h-10 mb-4" style={{ color: palette.primary }}>
                  <span className="material-symbols-outlined text-3xl">
                    {getDienstIcon(dienst.naam || dienst.titel)}
                  </span>
                </div>
                <h3 
                  className="text-xl font-semibold mb-3"
                  style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                >
                  {dienst.naam || dienst.titel}
                </h3>
                <p className="text-sm lg:text-base" style={{ color: theme.colors.textMuted }}>
                  {dienst.beschrijving || 'Professionele zorg met aandacht.'}
                </p>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}

// ============================================
// CARDS - Kaarten met icons en hover effect
// ============================================
function DienstenCards({ theme, palette, diensten, titel, intro }: any) {
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
          {diensten.slice(0, 6).map((dienst: any, index: number) => (
            <div 
              key={index}
              className={`group p-8 rounded-xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${getRevealClass('up', (index % 3) + 1)}`}
              style={{ 
                backgroundColor: theme.colors.surface,
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
                {dienst.beschrijving || 'Professionele zorg met aandacht voor uw persoonlijke situatie.'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// NUMBERED - Grote nummers met grid
// ============================================
function DienstenNumbered({ theme, palette, diensten, titel, intro }: any) {
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
          {diensten.slice(0, 6).map((dienst: any, index: number) => (
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
                {dienst.beschrijving || 'Professionele zorg met aandacht voor uw persoonlijke situatie.'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// LIST - Simpele lijst met icons
// ============================================
function DienstenList({ theme, palette, diensten, titel, intro }: any) {
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
          {diensten.map((dienst: any, index: number) => (
            <div 
              key={index}
              className={`flex items-start gap-4 p-6 rounded-xl border transition-all hover:shadow-md ${getRevealClass('up', Math.min(index + 1, 3))}`}
              style={{ 
                backgroundColor: theme.colors.surface,
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
                  {dienst.beschrijving || 'Professionele zorg met aandacht voor uw persoonlijke situatie.'}
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
// GRID - Compacte icon grid
// ============================================
function DienstenGrid({ theme, palette, diensten, titel, intro }: any) {
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
          {diensten.map((dienst: any, index: number) => (
            <div 
              key={index}
              className={`flex flex-col items-center text-center p-6 rounded-xl transition-all hover:shadow-lg ${getRevealClass('up', (index % 4) + 1)}`}
              style={{ backgroundColor: theme.colors.surface }}
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
