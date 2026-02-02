// components/templates/sections/WerkwijzeSection.tsx
// Werkwijze sectie - Stappen/proces hoe samenwerking werkt

'use client';

import { BaseSectionProps, WerkwijzeStyle, getRevealClass, DEFAULT_WERKWIJZE_STAPPEN } from './types';

interface WerkwijzeSectionProps extends BaseSectionProps {
  style?: WerkwijzeStyle;
}

export function WerkwijzeSection({ 
  style = 'editorial', 
  theme, 
  palette, 
  content, 
  generated 
}: WerkwijzeSectionProps) {
  // Edge function genereert: { titel, intro, stappen: [{ nummer, titel, beschrijving, icon }], footer }
  const werkwijzeContent = generated?.werkwijze;
  const titel = werkwijzeContent?.titel || 'Hoe werkt het?';
  const intro = werkwijzeContent?.intro;
  const stappen = werkwijzeContent?.stappen || DEFAULT_WERKWIJZE_STAPPEN;
  const footer = werkwijzeContent?.footer || 'Flexibel inzetbaar op korte en lange termijn. Zowel voor zorginstellingen als particulieren (PGB).';
  
  switch (style) {
    case 'editorial':
      return <WerkwijzeEditorial {...{ theme, palette, titel, intro, stappen, footer }} />;
    case 'proactief':
    case 'bento':
      return <WerkwijzeBento {...{ theme, palette, titel, intro }} />;
    case 'portfolio':
      return <WerkwijzePortfolio {...{ theme, palette, titel, intro, stappen }} />;
    case 'mindoor':
      return <WerkwijzeMindoor {...{ theme, palette, titel, intro, stappen }} />;
    case 'steps':
      return <WerkwijzeSteps {...{ theme, palette, titel, intro, stappen, footer }} />;
    case 'timeline':
      return <WerkwijzeTimeline {...{ theme, palette, titel, intro, stappen, footer }} />;
    case 'cards':
      return <WerkwijzeCards {...{ theme, palette, titel, intro, stappen, footer }} />;
    default:
      return <WerkwijzeEditorial {...{ theme, palette, titel, intro, stappen, footer }} />;
  }
}

// ============================================
// EDITORIAL - Origineel uit HTML template
// Genummerde cirkels, 4-kolom grid
// ============================================
function WerkwijzeEditorial({ theme, palette, titel, intro, stappen, footer }: any) {
  return (
    <section 
      id="werkwijze"
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
            Samenwerken
          </span>
          <h2 
            className="text-3xl md:text-4xl"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            {titel}
          </h2>
          {intro && (
            <p 
              className="mt-4 max-w-2xl mx-auto"
              style={{ color: theme.colors.textMuted }}
            >
              {intro}
            </p>
          )}
        </div>
        
        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stappen.slice(0, 4).map((stap: any, index: number) => (
            <div 
              key={index}
              className={`flex flex-col gap-4 ${getRevealClass('up', index + 1)}`}
            >
              {/* Numbered circle */}
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold text-white"
                style={{ backgroundColor: palette.primary }}
              >
                {index + 1}
              </div>
              
              {/* Title */}
              <h3 
                className="text-lg font-semibold"
                style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
              >
                {stap.titel}
              </h3>
              
              {/* Description */}
              <p 
                className="text-sm leading-relaxed"
                style={{ color: theme.colors.textMuted }}
              >
                {stap.beschrijving}
              </p>
            </div>
          ))}
        </div>
        
        {/* Footer text */}
        {footer && (
          <p 
            className={`text-center text-sm mt-12 ${getRevealClass('up', 3)}`}
            style={{ color: theme.colors.textMuted }}
          >
            {footer}
          </p>
        )}
        
      </div>
    </section>
  );
}

// ============================================
// BENTO / PROACTIEF - Modern bento grid met featured items
// ============================================
function WerkwijzeBento({ theme, palette, titel, intro }: any) {
  // Bento items - hardcoded for proactief style
  const bentoItems = [
    {
      title: 'Cliënt centraal',
      description: 'Bij alles wat we doen staat u centraal. Uw wensen, behoeften en comfort zijn onze hoogste prioriteit. We luisteren, begrijpen en handelen naar wat voor u het beste is.',
      icon: 'check_circle',
      featured: true,
      large: true,
    },
    {
      title: 'Zorgplan op maat',
      description: 'Samen met u stellen we een persoonlijk zorgplan op dat perfect aansluit bij uw situatie.',
      icon: 'description',
    },
    {
      title: 'Vaste zorgverleners',
      description: 'Vertrouwde gezichten die u kennen en begrijpen, voor continuïteit in uw zorg.',
      icon: 'group',
    },
    {
      title: '24/7 bereikbaar',
      description: 'Altijd iemand beschikbaar wanneer u ons nodig heeft, dag en nacht.',
      icon: 'schedule',
    },
    {
      title: 'Met hart en ziel',
      description: 'Onze zorgverleners werken niet alleen met vakkennis, maar bovenal met passie en empathie. We geloven dat echte zorg verder gaat dan alleen medische handelingen.',
      icon: 'favorite',
      large: true,
    },
  ];
  
  return (
    <section 
      id="werkwijze"
      className="py-24 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`text-center max-w-xl mx-auto mb-16 ${getRevealClass('up')}`}>
          <span 
            className="text-sm italic mb-3 block"
            style={{ color: palette.primary }}
          >
            Onze aanpak
          </span>
          <h2 
            className="text-4xl font-bold"
            style={{ fontFamily: theme.fonts.heading, color: palette.primaryDark || palette.primary }}
          >
            {titel}
          </h2>
        </div>
        
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bentoItems.map((item, idx) => (
            <div 
              key={idx}
              className={`
                rounded-3xl p-9 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,153,204,0.1)]
                ${item.large ? 'md:col-span-2' : ''}
                ${getRevealClass(item.featured ? 'right' : 'up', idx * 100)}
              `}
              style={{ 
                backgroundColor: item.featured 
                  ? undefined 
                  : theme.colors.backgroundAlt,
                background: item.featured 
                  ? `linear-gradient(135deg, ${palette.primary} 0%, ${palette.primaryDark || palette.primary} 100%)`
                  : undefined,
              }}
            >
              {/* Icon */}
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                style={{ 
                  backgroundColor: item.featured 
                    ? 'rgba(255,255,255,0.2)' 
                    : palette.primaryLight || `${palette.primary}15`
                }}
              >
                <span 
                  className="material-symbols-outlined text-2xl"
                  style={{ color: item.featured ? 'white' : palette.primary }}
                >
                  {item.icon}
                </span>
              </div>
              
              {/* Content */}
              <h3 
                className="text-xl font-semibold mb-3"
                style={{ color: item.featured ? 'white' : theme.colors.text }}
              >
                {item.title}
              </h3>
              <p 
                className="text-sm leading-relaxed"
                style={{ color: item.featured ? 'white' : theme.colors.textMuted }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// PORTFOLIO - Zigzag timeline met dots
// ============================================
function WerkwijzePortfolio({ theme, palette, titel, intro, stappen }: any) {
  // Timeline items (werkervaring style)
  const timelineItems = stappen.length > 0 ? stappen : [
    { titel: 'Kennismaking', beschrijving: 'We bespreken uw zorgbehoefte en wensen tijdens een vrijblijvend gesprek.' },
    { titel: 'Zorgplan', beschrijving: 'Samen stellen we een persoonlijk zorgplan op dat past bij uw situatie.' },
    { titel: 'Start zorg', beschrijving: 'We starten met de zorgverlening, met aandacht voor uw comfort.' },
    { titel: 'Evaluatie', beschrijving: 'Regelmatige evaluatie zorgt ervoor dat de zorg blijft aansluiten.' },
  ];
  
  return (
    <section 
      id="werkwijze"
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
            Werkervaring
          </span>
          <h2 
            className="text-[42px] font-semibold leading-[1.2]"
            style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
          >
            Mijn <em className="italic" style={{ color: palette.accent || palette.primary }}>pad</em>
          </h2>
        </div>
        
        {/* Timeline */}
        <div className="max-w-[900px] mx-auto relative">
          {/* Center line */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 w-[3px] h-full rounded"
            style={{ 
              background: `linear-gradient(180deg, ${palette.accent || palette.primary}, ${palette.primary})`
            }}
          />
          
          {/* Timeline items */}
          {timelineItems.map((item: any, idx: number) => (
            <div 
              key={idx}
              className={`flex mb-12 relative ${idx % 2 === 0 ? 'justify-end pr-[50px] md:w-1/2' : 'justify-start pl-[50px] md:ml-[50%]'} ${getRevealClass('up', idx * 100)}`}
            >
              {/* Dot */}
              <div 
                className={`absolute top-5 w-6 h-6 bg-white border-4 rounded-full z-10 ${idx % 2 === 0 ? '-right-3' : '-left-3'}`}
                style={{ borderColor: palette.accent || palette.primary }}
              />
              
              {/* Content card */}
              <div 
                className="max-w-[380px] p-8 rounded-[20px] transition-all hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(26,58,47,0.1)]"
                style={{ backgroundColor: theme.colors.backgroundAlt }}
              >
                <span 
                  className="inline-block px-4 py-1 rounded-full text-[13px] font-semibold text-white mb-4"
                  style={{ backgroundColor: palette.accent || palette.primary }}
                >
                  Stap {idx + 1}
                </span>
                <h4 
                  className="text-xl font-semibold mb-2"
                  style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
                >
                  {item.titel}
                </h4>
                <p 
                  className="text-sm leading-[1.7]"
                  style={{ color: theme.colors.textMuted }}
                >
                  {item.beschrijving}
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
// MINDOOR - Numbered circles (01, 02, 03, 04)
// ============================================
function WerkwijzeMindoor({ theme, palette, titel, intro, stappen }: any) {
  // Split title for gradient accent
  const titleParts = titel.split(' ');
  const accentWord = titleParts[titleParts.length - 1];
  const restTitle = titleParts.slice(0, -1).join(' ');
  
  const defaultStappen = [
    { titel: 'Kennismaking', beschrijving: 'Een vrijblijvend gesprek om uw situatie en wensen te bespreken.', icon: 'call' },
    { titel: 'Zorgplan', beschrijving: 'Samen stellen we een persoonlijk zorgplan op maat op.', icon: 'description' },
    { titel: 'Start Zorg', beschrijving: 'De zorg start op een moment dat u het beste uitkomt.', icon: 'medical_services' },
    { titel: 'Evaluatie', beschrijving: 'Regelmatige evaluatie om de zorg optimaal af te stemmen.', icon: 'autorenew' },
  ];
  
  const items = stappen.length > 0 ? stappen : defaultStappen;
  
  return (
    <section 
      id="werkwijze"
      className="py-20 lg:py-32"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 ${getRevealClass('up')}`}>
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
            <p className="mt-4 text-lg max-w-2xl mx-auto" style={{ color: theme.colors.textMuted }}>
              {intro}
            </p>
          )}
        </div>
        
        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.slice(0, 4).map((stap: any, idx: number) => (
            <div 
              key={idx}
              className={`text-center ${getRevealClass('up', (idx + 1) * 100)}`}
            >
              {/* Numbered circle */}
              <div className="relative mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: `${palette.accent || '#d4b89b'}20` }}
              >
                <span 
                  className="text-2xl"
                  style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
                >
                  0{idx + 1}
                </span>
                {/* Small icon badge */}
                <div 
                  className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: palette.primary }}
                >
                  <span className="material-symbols-outlined text-white text-sm">
                    {stap.icon || ['call', 'description', 'medical_services', 'autorenew'][idx]}
                  </span>
                </div>
              </div>
              
              <h3 
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
              >
                {stap.titel}
              </h3>
              <p className="text-sm" style={{ color: theme.colors.textMuted }}>
                {stap.beschrijving}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// STEPS - Horizontale stappen met verbindingslijnen
// ============================================
function WerkwijzeSteps({ theme, palette, titel, intro, stappen, footer }: any) {
  return (
    <section 
      id="werkwijze"
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
            <p style={{ color: theme.colors.textMuted }}>{intro}</p>
          )}
        </div>
        
        {/* Steps with connecting line */}
        <div className="relative">
          {/* Connecting line (desktop only) */}
          <div 
            className="hidden lg:block absolute top-6 left-[10%] right-[10%] h-0.5"
            style={{ backgroundColor: palette.primaryLight }}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stappen.slice(0, 4).map((stap: any, index: number) => (
              <div 
                key={index}
                className={`relative flex flex-col items-center text-center ${getRevealClass('up', index + 1)}`}
              >
                {/* Number circle */}
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white mb-6 relative z-10"
                  style={{ backgroundColor: palette.primary }}
                >
                  {index + 1}
                </div>
                
                {/* Content */}
                <h3 
                  className="font-bold mb-2"
                  style={{ color: theme.colors.text }}
                >
                  {stap.titel}
                </h3>
                <p 
                  className="text-sm"
                  style={{ color: theme.colors.textMuted }}
                >
                  {stap.beschrijving}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Footer */}
        {footer && (
          <p 
            className="text-center text-sm mt-12"
            style={{ color: theme.colors.textMuted }}
          >
            {footer}
          </p>
        )}
      </div>
    </section>
  );
}

// ============================================
// TIMELINE - Verticale tijdlijn
// ============================================
function WerkwijzeTimeline({ theme, palette, titel, intro, stappen, footer }: any) {
  return (
    <section 
      id="werkwijze"
      className="py-20 md:py-28 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className={`mb-12 ${getRevealClass('up')}`}>
          <span 
            className="text-sm font-bold uppercase tracking-widest block mb-2"
            style={{ color: palette.primary }}
          >
            Werkwijze
          </span>
          <h2 
            className="text-3xl md:text-4xl font-bold"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            {titel}
          </h2>
        </div>
        
        {/* Timeline */}
        <div 
          className="relative border-l-2 ml-4 space-y-8"
          style={{ borderColor: palette.primaryLight }}
        >
          {stappen.map((stap: any, index: number) => (
            <div 
              key={index}
              className={`relative pl-8 ${getRevealClass('left', index + 1)}`}
            >
              {/* Dot */}
              <div 
                className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-4"
                style={{ 
                  borderColor: theme.colors.background,
                  backgroundColor: palette.primary
                }}
              />
              
              {/* Content */}
              <div 
                className="p-6 rounded-xl border"
                style={{ 
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span 
                    className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: palette.primary }}
                  >
                    Stap {index + 1}
                  </span>
                  <h3 
                    className="font-bold"
                    style={{ color: theme.colors.text }}
                  >
                    {stap.titel}
                  </h3>
                </div>
                <p 
                  className="text-sm"
                  style={{ color: theme.colors.textMuted }}
                >
                  {stap.beschrijving}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer */}
        {footer && (
          <p 
            className="text-sm mt-8 ml-12"
            style={{ color: theme.colors.textMuted }}
          >
            {footer}
          </p>
        )}
      </div>
    </section>
  );
}

// ============================================
// CARDS - Kaarten met icons
// ============================================
function WerkwijzeCards({ theme, palette, titel, intro, stappen, footer }: any) {
  const STAP_ICONS = ['call', 'handshake', 'play_arrow', 'thumb_up'];
  
  return (
    <section 
      id="werkwijze"
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
            <p style={{ color: theme.colors.textMuted }}>{intro}</p>
          )}
        </div>
        
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stappen.slice(0, 4).map((stap: any, index: number) => (
            <div 
              key={index}
              className={`group p-8 rounded-xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${getRevealClass('up', index + 1)}`}
              style={{ 
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border
              }}
            >
              {/* Icon with number */}
              <div className="relative mb-6">
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: palette.primaryLight }}
                >
                  <span 
                    className="material-symbols-outlined text-2xl"
                    style={{ color: palette.primary }}
                  >
                    {STAP_ICONS[index] || 'check_circle'}
                  </span>
                </div>
                <span 
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold text-white flex items-center justify-center"
                  style={{ backgroundColor: palette.primary }}
                >
                  {index + 1}
                </span>
              </div>
              
              {/* Content */}
              <h3 
                className="font-bold mb-2"
                style={{ color: theme.colors.text }}
              >
                {stap.titel}
              </h3>
              <p 
                className="text-sm"
                style={{ color: theme.colors.textMuted }}
              >
                {stap.beschrijving}
              </p>
            </div>
          ))}
        </div>
        
        {/* Footer */}
        {footer && (
          <p 
            className="text-center text-sm mt-12"
            style={{ color: theme.colors.textMuted }}
          >
            {footer}
          </p>
        )}
      </div>
    </section>
  );
}

export default WerkwijzeSection;
