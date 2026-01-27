// components/templates/sections/DienstenSection.tsx
// Diensten section met 4 style varianten: cards, numbered, list, grid

'use client';

import { BaseSectionProps, DienstenStyle, getRevealClass } from './types';

interface DienstenSectionProps extends BaseSectionProps {
  style: DienstenStyle;
}

const DIENST_ICONS = ['favorite', 'healing', 'monitor_heart', 'medication', 'elderly', 'psychology'];

export function DienstenSection({ style, theme, palette, content, generated }: DienstenSectionProps) {
  const diensten = generated?.diensten?.items || content.diensten || [];
  const titel = generated?.diensten?.titel || 'Mijn Diensten';
  const intro = generated?.diensten?.intro;
  
  if (!diensten.length) return null;
  
  switch (style) {
    case 'cards':
      return <DienstenCards {...{ theme, palette, diensten, titel, intro }} />;
    case 'numbered':
      return <DienstenNumbered {...{ theme, palette, diensten, titel, intro }} />;
    case 'list':
      return <DienstenList {...{ theme, palette, diensten, titel, intro }} />;
    case 'grid':
      return <DienstenGrid {...{ theme, palette, diensten, titel, intro }} />;
    default:
      return <DienstenCards {...{ theme, palette, diensten, titel, intro }} />;
  }
}

// ============================================
// CARDS - Kaarten met icons
// ============================================
function DienstenCards({ theme, palette, diensten, titel, intro }: any) {
  return (
    <section 
      id="diensten"
      className={`${theme.spacing.section} px-6 md:px-12`}
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className={`${theme.spacing.container} mx-auto`}>
        {/* Header */}
        <div className={`text-center mb-16 ${getRevealClass('up')}`}>
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            {titel}
          </h2>
          {intro && (
            <p className="text-lg max-w-2xl mx-auto" style={{ color: theme.colors.textMuted }}>
              {intro}
            </p>
          )}
        </div>
        
        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {diensten.slice(0, 6).map((dienst: any, i: number) => (
            <div 
              key={i}
              className={`p-8 ${theme.radius.large} ${theme.shadows.small} transition-all hover:${theme.shadows.medium} ${getRevealClass('up', (i % 3) + 1)}`}
              style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }}
            >
              <div 
                className={`w-14 h-14 ${theme.radius.medium} flex items-center justify-center mb-6`}
                style={{ backgroundColor: palette.primaryLight }}
              >
                <span 
                  className="material-symbols-outlined text-2xl"
                  style={{ color: palette.primary }}
                >
                  {DIENST_ICONS[i % DIENST_ICONS.length]}
                </span>
              </div>
              <h3 
                className="text-xl font-bold mb-3"
                style={{ color: theme.colors.text }}
              >
                {dienst.naam}
              </h3>
              <p style={{ color: theme.colors.textMuted }}>
                {dienst.beschrijving}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// NUMBERED - Genummerde lijst (magazine style)
// ============================================
function DienstenNumbered({ theme, palette, diensten, titel, intro }: any) {
  return (
    <section 
      id="diensten"
      className={`${theme.spacing.section} px-6 md:px-12`}
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className={`${theme.spacing.container} mx-auto`}>
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 border-l" style={{ borderColor: theme.colors.border }}>
          {diensten.slice(0, 6).map((dienst: any, i: number) => (
            <div 
              key={i}
              className={`p-8 md:p-12 border-r border-b ${getRevealClass('up', (i % 3) + 1)}`}
              style={{ borderColor: theme.colors.border }}
            >
              <span 
                className="text-6xl font-light block mb-6"
                style={{ color: palette.primaryLight }}
              >
                0{i + 1}
              </span>
              <h3 
                className="text-xl font-bold mb-3 uppercase tracking-wide"
                style={{ color: theme.colors.text }}
              >
                {dienst.naam}
              </h3>
              <p style={{ color: theme.colors.textMuted }}>
                {dienst.beschrijving}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// LIST - Simpele lijst (minimal style)
// ============================================
function DienstenList({ theme, palette, diensten, titel }: any) {
  return (
    <section 
      id="diensten"
      className={`${theme.spacing.section} px-6`}
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-2xl mx-auto">
        <h2 
          className={`text-xs uppercase tracking-[0.3em] text-center mb-16 ${getRevealClass('up')}`}
          style={{ color: palette.primary }}
        >
          {titel}
        </h2>
        
        <div className="space-y-12">
          {diensten.slice(0, 5).map((dienst: any, i: number) => (
            <div 
              key={i}
              className={`text-center ${getRevealClass('up', (i % 3) + 1)}`}
            >
              <h3 
                className="text-xl font-medium mb-3"
                style={{ color: theme.colors.text }}
              >
                {dienst.naam}
              </h3>
              <p 
                className="leading-relaxed max-w-md mx-auto"
                style={{ color: theme.colors.textMuted }}
              >
                {dienst.beschrijving}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// GRID - Bento grid style (cards theme)
// ============================================
function DienstenGrid({ theme, palette, diensten, titel }: any) {
  return (
    <section 
      id="diensten"
      className={`${theme.spacing.section} px-6`}
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className={`${theme.spacing.container} mx-auto`}>
        <div className={`${theme.radius.large} p-8 ${theme.shadows.small}`} style={{ backgroundColor: theme.colors.surface }}>
          <h2 
            className={`text-2xl font-bold mb-8 ${getRevealClass('up')}`}
            style={{ color: theme.colors.text }}
          >
            {titel}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {diensten.slice(0, 6).map((dienst: any, i: number) => (
              <div 
                key={i}
                className={`p-5 ${theme.radius.medium} border ${getRevealClass('up', (i % 2) + 1)}`}
                style={{ backgroundColor: palette.primaryLight, borderColor: theme.colors.border }}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className={`w-10 h-10 ${theme.radius.medium} flex items-center justify-center flex-shrink-0`}
                    style={{ backgroundColor: theme.colors.surface }}
                  >
                    <span 
                      className="material-symbols-outlined text-xl"
                      style={{ color: palette.primary }}
                    >
                      {DIENST_ICONS[i % DIENST_ICONS.length]}
                    </span>
                  </div>
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
                      {dienst.beschrijving}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DienstenSection;
