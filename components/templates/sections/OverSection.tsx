// components/templates/sections/OverSection.tsx
// Over mij section met 3 style varianten: split, centered, timeline

'use client';

import { BaseSectionProps, OverStyle, getBeroepImages, getRevealClass } from './types';
import { getJarenErvaring } from '@/types';

interface OverSectionProps extends BaseSectionProps {
  style: OverStyle;
}

export function OverSection({ style, theme, palette, content, generated, beroepLabel }: OverSectionProps) {
  const images = getBeroepImages(content.naam || '');
  const overMij = generated?.overMij;
  const bigCert = content.certificaten?.some((c: any) => c.type === 'big');
  const jarenErvaring = getJarenErvaring(content.werkervaring);
  
  switch (style) {
    case 'split':
      return <OverSplit {...{ theme, palette, content, overMij, bigCert, jarenErvaring, images }} />;
    case 'centered':
      return <OverCentered {...{ theme, palette, content, overMij, bigCert, jarenErvaring }} />;
    case 'timeline':
      return <OverTimeline {...{ theme, palette, content, overMij, bigCert, jarenErvaring, beroepLabel }} />;
    default:
      return <OverSplit {...{ theme, palette, content, overMij, bigCert, jarenErvaring, images }} />;
  }
}

// ============================================
// SPLIT - Foto + tekst naast elkaar
// ============================================
function OverSplit({ theme, palette, content, overMij, bigCert, jarenErvaring, images }: any) {
  return (
    <section 
      id="over"
      className={`${theme.spacing.section} px-6 md:px-12`}
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className={`${theme.spacing.container} mx-auto`}>
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className={getRevealClass('left')}>
            <div 
              className={`aspect-[4/5] bg-cover bg-center ${theme.radius.large} ${theme.shadows.medium}`}
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
              {overMij ? (
                <>
                  <p 
                    className="text-xl leading-relaxed"
                    style={{ color: theme.colors.text }}
                  >
                    {overMij.intro}
                  </p>
                  <p style={{ color: theme.colors.textMuted }}>
                    {overMij.body}
                  </p>
                  {overMij.persoonlijk && (
                    <p 
                      className={`italic border-l-4 pl-4`}
                      style={{ borderColor: palette.primary, color: theme.colors.textMuted }}
                    >
                      {overMij.persoonlijk}
                    </p>
                  )}
                </>
              ) : (
                <p style={{ color: theme.colors.textMuted }}>
                  {content.over_mij}
                </p>
              )}
            </div>
            
            {/* Badges */}
            <div className="flex flex-wrap gap-3">
              {bigCert && (
                <div 
                  className={`flex items-center gap-2 px-4 py-2 ${theme.radius.full}`}
                  style={{ backgroundColor: palette.primaryLight }}
                >
                  <span className="material-symbols-outlined text-lg" style={{ color: palette.primary }}>verified</span>
                  <span className="font-semibold text-sm" style={{ color: palette.primary }}>BIG Geregistreerd</span>
                </div>
              )}
              {jarenErvaring && (
                <div 
                  className={`flex items-center gap-2 px-4 py-2 ${theme.radius.full}`}
                  style={{ backgroundColor: palette.primaryLight }}
                >
                  <span className="material-symbols-outlined text-lg" style={{ color: palette.primary }}>workspace_premium</span>
                  <span className="font-semibold text-sm" style={{ color: palette.primary }}>{jarenErvaring}+ Jaar Ervaring</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// CENTERED - Alles gecentreerd (minimal style)
// ============================================
function OverCentered({ theme, palette, content, overMij, bigCert, jarenErvaring }: any) {
  return (
    <section 
      id="over"
      className={`${theme.spacing.section} px-6`}
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <h2 
          className={`text-xs uppercase tracking-[0.3em] mb-12 ${getRevealClass('up')}`}
          style={{ color: palette.primary }}
        >
          Over mij
        </h2>
        
        <div className={`space-y-6 ${getRevealClass('up', 1)}`}>
          {overMij ? (
            <>
              <p 
                className="text-lg leading-loose"
                style={{ color: theme.colors.text }}
              >
                {overMij.intro}
              </p>
              <p 
                className="leading-loose"
                style={{ color: theme.colors.textMuted }}
              >
                {overMij.body}
              </p>
              {overMij.persoonlijk && (
                <p 
                  className="italic"
                  style={{ color: theme.colors.textMuted }}
                >
                  {overMij.persoonlijk}
                </p>
              )}
            </>
          ) : (
            <p style={{ color: theme.colors.textMuted }}>
              {content.over_mij}
            </p>
          )}
        </div>
        
        {/* Stats */}
        <div className={`flex justify-center gap-12 mt-12 ${getRevealClass('up', 2)}`}>
          {bigCert && (
            <div className="text-center">
              <p className="text-2xl font-light" style={{ color: palette.primary }}>BIG</p>
              <p className="text-xs uppercase tracking-wider mt-1" style={{ color: theme.colors.textMuted }}>Geregistreerd</p>
            </div>
          )}
          {jarenErvaring && (
            <div className="text-center">
              <p className="text-2xl font-light" style={{ color: palette.primary }}>{jarenErvaring}+</p>
              <p className="text-xs uppercase tracking-wider mt-1" style={{ color: theme.colors.textMuted }}>Jaar ervaring</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ============================================
// TIMELINE - Met werkervaring timeline
// ============================================
function OverTimeline({ theme, palette, content, overMij, bigCert, jarenErvaring, beroepLabel }: any) {
  const werkervaring = content.werkervaring || [];
  
  return (
    <section 
      id="over"
      className={`${theme.spacing.section} px-6 md:px-12`}
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className={`${theme.spacing.container} mx-auto`}>
        <div className="grid md:grid-cols-2 gap-16">
          {/* Left - About */}
          <div className={getRevealClass('left')}>
            <p 
              className="text-sm font-bold uppercase tracking-widest mb-2"
              style={{ color: palette.primary }}
            >
              Achtergrond
            </p>
            <h2 
              className="text-3xl md:text-4xl font-bold mb-8"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              Over Mij
            </h2>
            
            <div className="space-y-4">
              {overMij ? (
                <>
                  <p style={{ color: theme.colors.text }}>{overMij.intro}</p>
                  <p style={{ color: theme.colors.textMuted }}>{overMij.body}</p>
                </>
              ) : (
                <p style={{ color: theme.colors.textMuted }}>{content.over_mij}</p>
              )}
            </div>
            
            {/* Credentials */}
            <div className="flex flex-wrap gap-4 mt-8">
              {bigCert && (
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined" style={{ color: palette.primary }}>verified</span>
                  <span className="font-semibold" style={{ color: theme.colors.text }}>BIG Geregistreerd</span>
                </div>
              )}
              {jarenErvaring && (
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined" style={{ color: palette.primary }}>history_edu</span>
                  <span className="font-semibold" style={{ color: theme.colors.text }}>{jarenErvaring}+ Jaar Ervaring</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Right - Timeline */}
          <div className={getRevealClass('right')}>
            <h3 
              className="text-xl font-bold mb-8"
              style={{ color: theme.colors.text }}
            >
              Werkervaring
            </h3>
            
            <div className="relative">
              {/* Timeline line */}
              <div 
                className="absolute left-3 top-2 bottom-2 w-0.5"
                style={{ backgroundColor: palette.primaryLight }}
              />
              
              {/* Timeline items */}
              <div className="space-y-8">
                {werkervaring.length > 0 ? (
                  werkervaring.slice(0, 4).map((werk: any, i: number) => (
                    <div key={i} className="flex gap-6">
                      <div 
                        className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center"
                        style={{ backgroundColor: palette.primary }}
                      >
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                      <div>
                        <p className="font-bold" style={{ color: theme.colors.text }}>
                          {werk.functie}
                        </p>
                        <p className="text-sm" style={{ color: theme.colors.textMuted }}>
                          {werk.werkgever} • {werk.start_jaar || werk.startJaar} - {werk.eind_jaar || werk.eindJaar || 'Heden'}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex gap-6">
                    <div 
                      className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center"
                      style={{ backgroundColor: palette.primary }}
                    >
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <div>
                      <p className="font-bold" style={{ color: theme.colors.text }}>{beroepLabel}</p>
                      <p className="text-sm" style={{ color: theme.colors.textMuted }}>Werkzaam als ZZP'er</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OverSection;
