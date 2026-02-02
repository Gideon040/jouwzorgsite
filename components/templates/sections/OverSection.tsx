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
  
  switch (style) {
    case 'editorial':
      return <OverEditorial {...{ theme, palette, content, overMij, jarenErvaring, expertises, images }} />;
    case 'proactief':
      return <OverProactief {...{ theme, palette, content, overMij, images }} />;
    case 'portfolio':
      return <OverPortfolio {...{ theme, palette, content, overMij, images }} />;
    case 'mindoor':
      return <OverMindoor {...{ theme, palette, content, overMij, images }} />;
    case 'split':
      return <OverSplit {...{ theme, palette, content, overMij, jarenErvaring, images }} />;
    case 'centered':
      return <OverCentered {...{ theme, palette, content, overMij, jarenErvaring }} />;
    case 'timeline':
      return <OverTimeline {...{ theme, palette, content, overMij, jarenErvaring, beroepLabel }} />;
    default:
      return <OverEditorial {...{ theme, palette, content, overMij, jarenErvaring, expertises, images }} />;
  }
}

// ============================================
// EDITORIAL - Origineel uit HTML template
// Ronde foto, expertise tags, cream achtergrond
// ============================================
function OverEditorial({ theme, palette, content, overMij, jarenErvaring, expertises, images }: any) {
  // Parse over_mij into paragraphs
  const overMijText = overMij?.body || overMij?.intro || content.over_mij || '';
  const paragraphs = overMijText.split('\n\n').filter((p: string) => p.trim());
  
  return (
    <section 
      id="over"
      className="px-6 md:px-16 lg:px-32 py-20"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl mx-auto">
        
        {/* Text Content */}
        <div className={`flex-1 flex flex-col gap-6 ${getRevealClass('left')}`}>
          
          {/* Label */}
          <span 
            className="text-xs font-semibold uppercase tracking-[0.15em]"
            style={{ fontVariant: 'small-caps', color: palette.primary }}
          >
            Over mij
          </span>
          
          {/* Titel */}
          <h2 
            className="text-3xl md:text-4xl"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            {jarenErvaring ? `${jarenErvaring} jaar ervaring` : 'Mijn verhaal'}
          </h2>
          
          {/* Paragraphs */}
          <div 
            className="flex flex-col gap-4 leading-relaxed"
            style={{ color: theme.colors.textMuted }}
          >
            {paragraphs.length > 0 ? (
              paragraphs.map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))
            ) : (
              <>
                <p>
                  Met jarenlange ervaring in de zorg heb ik gewerkt in uiteenlopende settings: 
                  van ziekenhuizen en verpleeghuizen tot thuiszorg en hospices. Deze brede achtergrond 
                  stelt me in staat om flexibel in te spelen op verschillende zorgsituaties.
                </p>
                <p>
                  Als ZZP'er combineer ik de voordelen van zelfstandigheid met de kwaliteit van 
                  professionele zorg. Ik werk voor zorginstellingen die tijdelijk versterking nodig 
                  hebben, maar ook voor particulieren die thuis zorg nodig hebben.
                </p>
                <p>
                  Wat mij drijft is het maken van een verschil in het leven van mensen. Of het nu 
                  gaat om het verzorgen van een wond, het begeleiden van iemand in de laatste levensfase, 
                  of simpelweg een luisterend oor bieden — ik doe het met passie en toewijding.
                </p>
              </>
            )}
          </div>
          
          {/* Expertise Tags */}
          {expertises.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {expertises.map((expertise: string, index: number) => (
                <span 
                  key={index}
                  className="px-3 py-1.5 border rounded text-sm"
                  style={{ 
                    backgroundColor: theme.colors.surface,
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
        
        {/* Round Photo */}
        <div className={`flex-1 flex justify-center ${getRevealClass('right')}`}>
          <div className="relative">
            <div 
              className="w-72 h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden p-1.5"
              style={{ border: `2px solid ${palette.primary}20` }}
            >
              <div 
                className="w-full h-full rounded-full bg-center bg-cover"
                style={{ backgroundImage: `url('${content.foto || images.sfeer}')` }}
              />
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}

// ============================================
// PROACTIEF - Modern met blob image, decoratieve cirkels
// ============================================
function OverProactief({ theme, palette, content, overMij, images }: any) {
  const overMijText = overMij?.body || overMij?.intro || content.over_mij || '';
  const paragraphs = overMijText.split('\n\n').filter((p: string) => p.trim());
  
  return (
    <section 
      id="over"
      className="py-24 px-6 md:px-12 relative"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          
          {/* Blob Image */}
          <div className={getRevealClass('right')}>
            <div className="relative w-[380px] h-[380px] mx-auto">
              {/* Decorative circles */}
              <div 
                className="absolute -top-6 -left-6 w-24 h-24 rounded-full opacity-10"
                style={{ backgroundColor: palette.primary }}
              />
              <div 
                className="absolute -bottom-8 -right-8 w-36 h-36 rounded-full opacity-[0.08]"
                style={{ backgroundColor: palette.primary }}
              />
              {/* Image */}
              <img 
                src={content.foto || images.sfeer}
                alt="Over mij"
                className="w-full h-full object-cover rounded-[50%_50%_50%_50%/60%_60%_40%_40%] shadow-[0_20px_50px_rgba(0,153,204,0.15)]"
              />
            </div>
          </div>
          
          {/* Content */}
          <div className={getRevealClass('left', 200)}>
            <span 
              className="text-sm italic mb-3 block"
              style={{ color: palette.primary }}
            >
              Wie zijn wij?
            </span>
            <h2 
              className="text-4xl font-bold mb-6 leading-tight"
              style={{ fontFamily: theme.fonts.heading, color: palette.primaryDark || palette.primary }}
            >
              Onze unieke<br/>benadering van zorg
            </h2>
            
            {paragraphs.length > 0 ? (
              paragraphs.map((paragraph: string, idx: number) => (
                <p 
                  key={idx}
                  className="text-[15px] leading-[1.85] mb-4"
                  style={{ color: theme.colors.textMuted }}
                >
                  {paragraph}
                </p>
              ))
            ) : (
              <p 
                className="text-[15px] leading-[1.85]"
                style={{ color: theme.colors.textMuted }}
              >
                {overMijText}
              </p>
            )}
          </div>
          
        </div>
      </div>
    </section>
  );
}

// ============================================
// PORTFOLIO - Image met floating quote, decoratieve leaves
// ============================================
function OverPortfolio({ theme, palette, content, overMij, images }: any) {
  const overMijText = overMij?.body || overMij?.intro || content.over_mij || '';
  const paragraphs = overMijText.split('\n\n').filter((p: string) => p.trim());
  
  return (
    <section 
      id="over"
      className="py-28 px-8 md:px-12"
      style={{ backgroundColor: 'white' }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-20 items-center">
          
          {/* Image with floating elements */}
          <div className={`relative ${getRevealClass('right')}`}>
            {/* Decorative leaves */}
            <div 
              className="absolute -top-5 -right-5 w-20 h-20 rounded-[50%_0_50%_50%] -rotate-45 opacity-15"
              style={{ backgroundColor: palette.accent || palette.primary }}
            />
            <div 
              className="absolute bottom-12 -left-6 w-12 h-12 rounded-[50%_0_50%_50%] -rotate-45 opacity-15"
              style={{ backgroundColor: palette.accent || palette.primary }}
            />
            
            {/* Main image */}
            <img 
              src={content.foto || images.sfeer}
              alt="Over mij"
              className="w-full h-[500px] object-cover rounded-[30px]"
            />
            
            {/* Floating quote */}
            <div 
              className="absolute -bottom-8 -right-8 p-8 rounded-[20px] max-w-[280px]"
              style={{ backgroundColor: palette.primary }}
            >
              <p 
                className="text-white text-base italic leading-relaxed"
                style={{ fontFamily: theme.fonts.heading }}
              >
                "Zorg met aandacht, passie en professionaliteit."
              </p>
            </div>
          </div>
          
          {/* Text content */}
          <div className={getRevealClass('left', 200)}>
            <span 
              className="text-[13px] font-semibold uppercase tracking-[2px] mb-4 block"
              style={{ color: palette.accent || palette.primary }}
            >
              Over mij
            </span>
            
            <h2 
              className="text-[42px] font-semibold leading-[1.2] mb-6"
              style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
            >
              Met passie voor <em className="italic" style={{ color: palette.accent || palette.primary }}>persoonlijke zorg</em>
            </h2>
            
            {paragraphs.length > 0 ? (
              paragraphs.map((paragraph: string, idx: number) => (
                <p 
                  key={idx}
                  className="text-base leading-[1.8] mb-5"
                  style={{ color: theme.colors.textMuted }}
                >
                  {paragraph}
                </p>
              ))
            ) : (
              <p 
                className="text-base leading-[1.8]"
                style={{ color: theme.colors.textMuted }}
              >
                {overMijText}
              </p>
            )}
            
            {/* Signature */}
            <p 
              className="text-[32px] italic mt-8"
              style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
            >
              {content.naam}
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}

// ============================================
// MINDOOR - 2x2 feature grid met colored icon boxes
// ============================================
function OverMindoor({ theme, palette, content, overMij, images }: any) {
  const overMijText = overMij?.body || overMij?.intro || content.over_mij || '';
  
  const features = [
    { icon: 'favorite', title: 'Persoonlijke Aanpak', desc: 'Zorg specifiek afgestemd op uw wensen en behoeften.', color: palette.primary },
    { icon: 'lock', title: '100% Vertrouwelijk', desc: 'Uw privacy wordt altijd volledig gerespecteerd.', color: palette.accent || '#d4b89b' },
    { icon: 'schedule', title: 'Flexibele Tijden', desc: 'Zorg op momenten die bij u passen.', color: palette.accent || '#e07b5f' },
    { icon: 'verified', title: 'Gecertificeerd', desc: 'BIG geregistreerd met alle benodigde diploma\'s.', color: palette.primary },
  ];
  
  return (
    <section 
      id="over"
      className="py-20 lg:py-32"
      style={{ backgroundColor: 'white' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Content */}
          <div className={getRevealClass('right')}>
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl leading-tight"
              style={{ fontFamily: theme.fonts.heading }}
            >
              Waarom Kiezen<br/>
              <span 
                className="italic"
                style={{ 
                  background: `linear-gradient(135deg, ${palette.accent || '#d4644a'}, ${palette.accentLight || '#e07b5f'})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Voor Mij?
              </span>
            </h2>
            <p className="mt-6 text-lg" style={{ color: theme.colors.textMuted }}>
              {overMijText || 'Met jarenlange ervaring combineer ik professionele expertise met een persoonlijke benadering. Goede zorg begint bij echt luisteren.'}
            </p>
            
            {/* 2x2 Features Grid */}
            <div className="mt-10 grid sm:grid-cols-2 gap-6">
              {features.map((feature, idx) => (
                <div key={idx} className={`flex gap-4 ${getRevealClass('up', (idx + 1) * 100)}`}>
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${feature.color}15` }}
                  >
                    <span className="material-symbols-outlined" style={{ color: feature.color }}>
                      {feature.icon}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold" style={{ color: theme.colors.text }}>{feature.title}</h4>
                    <p className="text-sm mt-1" style={{ color: theme.colors.textMuted }}>{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Image with offset bg */}
          <div className={`relative ${getRevealClass('left', 200)}`}>
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <img 
                src={content.foto || images.sfeer}
                alt="Over mij"
                className="w-full aspect-[4/3] object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            {/* Decorative offset */}
            <div 
              className="absolute -z-10 -bottom-6 -right-6 w-full h-full rounded-3xl"
              style={{ backgroundColor: `${palette.primary}15` }}
            />
          </div>
          
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

// ============================================
// CENTERED - Gecentreerde tekst
// ============================================
function OverCentered({ theme, palette, content, overMij, jarenErvaring }: any) {
  const overMijText = overMij?.body || overMij?.intro || content.over_mij || '';
  
  return (
    <section 
      id="over"
      className="py-20 md:py-28 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <div className={getRevealClass('up')}>
          {/* Avatar */}
          <div className="w-24 h-24 mx-auto mb-8 rounded-full overflow-hidden shadow-lg">
            <img 
              src={content.foto} 
              alt={content.naam} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            Over {content.naam?.split(' ')[0] || 'Mij'}
          </h2>
          
          <p 
            className="text-lg leading-relaxed mb-8"
            style={{ color: theme.colors.textMuted }}
          >
            {overMijText || 'Met jarenlange ervaring in de zorg sta ik klaar om u te helpen.'}
          </p>
          
          {jarenErvaring && (
            <p 
              className="text-sm uppercase tracking-widest"
              style={{ color: palette.primary }}
            >
              {jarenErvaring}+ jaar ervaring
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

// ============================================
// TIMELINE - Met werkervaring timeline
// ============================================
function OverTimeline({ theme, palette, content, overMij, jarenErvaring, beroepLabel }: any) {
  const overMijText = overMij?.body || overMij?.intro || content.over_mij || '';
  const werkervaring = content.werkervaring || [];
  
  return (
    <section 
      id="over"
      className="py-20 md:py-28 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className={`mb-12 ${getRevealClass('up')}`}>
          <p 
            className="text-sm font-bold uppercase tracking-widest mb-2"
            style={{ color: palette.primary }}
          >
            {beroepLabel}
          </p>
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            Mijn Achtergrond
          </h2>
          <p 
            className="max-w-2xl"
            style={{ color: theme.colors.textMuted }}
          >
            {overMijText.slice(0, 200)}...
          </p>
        </div>
        
        {/* Timeline */}
        {werkervaring.length > 0 && (
          <div 
            className="relative border-l-2 ml-4 space-y-8"
            style={{ borderColor: `${palette.primary}30` }}
          >
            {werkervaring.slice(0, 4).map((werk: any, index: number) => {
              const isHuidig = !werk.eind_jaar && !werk.eindJaar;
              const startJaar = werk.start_jaar || werk.startJaar;
              const eindJaar = werk.eind_jaar || werk.eindJaar;
              
              return (
                <div 
                  key={index} 
                  className={`relative pl-8 ${getRevealClass('left', index + 1)}`}
                >
                  {/* Dot */}
                  <div 
                    className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-4"
                    style={{ 
                      borderColor: theme.colors.backgroundAlt,
                      backgroundColor: isHuidig ? palette.primary : `${palette.primary}60`
                    }}
                  />
                  
                  {/* Card */}
                  <div 
                    className="p-5 rounded-lg border"
                    style={{ 
                      backgroundColor: theme.colors.surface,
                      borderColor: theme.colors.border
                    }}
                  >
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 
                        className="text-lg font-semibold"
                        style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                      >
                        {werk.functie}
                      </h3>
                      <span 
                        className="text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{ 
                          backgroundColor: isHuidig ? `${palette.primary}15` : theme.colors.backgroundAlt,
                          color: isHuidig ? palette.primary : theme.colors.textMuted
                        }}
                      >
                        {startJaar} - {isHuidig ? 'Heden' : eindJaar}
                      </span>
                    </div>
                    <p 
                      className="font-medium text-sm mb-2"
                      style={{ color: palette.primary }}
                    >
                      {werk.werkgever}
                    </p>
                    {werk.beschrijving && (
                      <p 
                        className="text-sm leading-relaxed"
                        style={{ color: theme.colors.textMuted }}
                      >
                        {werk.beschrijving}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default OverSection;
