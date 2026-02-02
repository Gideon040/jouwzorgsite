// components/templates/sections/VoorWieSection.tsx
// Voor Wie sectie - Doelgroepen (Instellingen, Bemiddelaars, PGB)

'use client';

import { BaseSectionProps, VoorWieStyle, getRevealClass, DEFAULT_DOELGROEPEN } from './types';

interface VoorWieSectionProps extends BaseSectionProps {
  style?: VoorWieStyle;
}

// Icons per doelgroep type
const DOELGROEP_ICONS: Record<string, string> = {
  instellingen: 'apartment',
  bemiddelaars: 'handshake',
  pgb: 'home',
  particulieren: 'person',
  thuiszorg: 'home_health',
  ziekenhuizen: 'local_hospital',
};

export function VoorWieSection({ 
  style = 'editorial', 
  theme, 
  palette, 
  content, 
  generated 
}: VoorWieSectionProps) {
  // Get doelgroepen from generated content or use defaults
  const voorWieContent = generated?.voorWie;
  const titel = voorWieContent?.titel || 'Voor wie werk ik?';
  const intro = voorWieContent?.intro || 'Ik ben flexibel inzetbaar voor verschillende opdrachtgevers en situaties.';
  const doelgroepen = voorWieContent?.doelgroepen || DEFAULT_DOELGROEPEN;
  
  switch (style) {
    case 'editorial':
      return <VoorWieEditorial {...{ theme, palette, titel, intro, doelgroepen }} />;
    case 'proactief':
      return <VoorWieProactief {...{ theme, palette, titel, intro, doelgroepen }} />;
    case 'portfolio':
      return <VoorWiePortfolio {...{ theme, palette, titel, intro, doelgroepen }} />;
    case 'mindoor':
      return <VoorWieMindoor {...{ theme, palette, titel, intro, doelgroepen }} />;
    case 'cards':
      return <VoorWieCards {...{ theme, palette, titel, intro, doelgroepen }} />;
    case 'grid':
      return <VoorWieGrid {...{ theme, palette, titel, intro, doelgroepen }} />;
    case 'list':
      return <VoorWieList {...{ theme, palette, titel, intro, doelgroepen }} />;
    default:
      return <VoorWieEditorial {...{ theme, palette, titel, intro, doelgroepen }} />;
  }
}

// ============================================
// EDITORIAL - Stijlvol met icons en beschrijvingen
// ============================================
function VoorWieEditorial({ theme, palette, titel, intro, doelgroepen }: any) {
  return (
    <section 
      id="voorwie"
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
            Doelgroepen
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
        
        {/* Doelgroepen Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {doelgroepen.map((doelgroep: any, index: number) => (
            <div 
              key={index}
              className={`group p-8 rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${getRevealClass('up', index + 1)}`}
              style={{ 
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border
              }}
            >
              {/* Icon */}
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                style={{ backgroundColor: palette.primaryLight }}
              >
                <span 
                  className="material-symbols-outlined text-2xl"
                  style={{ color: palette.primary }}
                >
                  {DOELGROEP_ICONS[doelgroep.type] || 'group'}
                </span>
              </div>
              
              {/* Content */}
              <h3 
                className="text-xl font-bold mb-3"
                style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
              >
                {doelgroep.titel}
              </h3>
              <p 
                className="text-sm leading-relaxed"
                style={{ color: theme.colors.textMuted }}
              >
                {doelgroep.tekst}
              </p>
              
              {/* Link */}
              <a 
                href="#contact"
                className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest mt-6 hover:underline underline-offset-4"
                style={{ color: palette.primary }}
              >
                Neem contact op
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
// PROACTIEF - Kaarten met foto's, 4-kolom grid
// ============================================
function VoorWieProactief({ theme, palette, titel, intro, doelgroepen }: any) {
  // Images for doelgroepen (can be overridden)
  const DOELGROEP_IMAGES: Record<string, string> = {
    instellingen: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?w=400&h=300&fit=crop',
    bemiddelaars: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=300&fit=crop',
    pgb: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=400&h=300&fit=crop',
    particulieren: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=400&h=300&fit=crop',
  };
  
  return (
    <section 
      id="voorwie"
      className="py-24 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`text-center max-w-xl mx-auto mb-16 ${getRevealClass('up')}`}>
          <span 
            className="text-sm italic mb-3 block"
            style={{ color: palette.primary }}
          >
            Onze doelgroepen
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {doelgroepen.map((doelgroep: any, idx: number) => (
            <div 
              key={idx}
              className={`bg-white rounded-[20px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.05)] transition-transform duration-300 hover:-translate-y-1 ${getRevealClass('up', idx * 100)}`}
            >
              {/* Image */}
              <div className="h-44 overflow-hidden">
                <img 
                  src={doelgroep.image || DOELGROEP_IMAGES[doelgroep.type] || DOELGROEP_IMAGES.particulieren}
                  alt={doelgroep.titel}
                  className="w-full h-full object-cover transition-transform duration-400 hover:scale-105"
                />
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h4 
                  className="text-lg font-semibold mb-2"
                  style={{ color: theme.colors.text }}
                >
                  {doelgroep.titel}
                </h4>
                <p 
                  className="text-[13px] leading-relaxed"
                  style={{ color: theme.colors.textMuted }}
                >
                  {doelgroep.tekst}
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
// PORTFOLIO - Cards met image overlay en gradient
// ============================================
function VoorWiePortfolio({ theme, palette, titel, intro, doelgroepen }: any) {
  const DOELGROEP_IMAGES: Record<string, string> = {
    instellingen: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop',
    bemiddelaars: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=300&fit=crop',
    pgb: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=400&h=300&fit=crop',
    particulieren: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=400&h=300&fit=crop',
  };
  
  return (
    <section 
      id="voorwie"
      className="py-28 px-8 md:px-12"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className={`text-center max-w-[600px] mx-auto mb-16 ${getRevealClass('up')}`}>
          <span 
            className="text-[13px] font-semibold uppercase tracking-[2px] mb-4 block"
            style={{ color: palette.accent || palette.primary }}
          >
            Doelgroepen
          </span>
          <h2 
            className="text-[42px] font-semibold leading-[1.2] mb-6"
            style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
          >
            Voor wie werk <em className="italic" style={{ color: palette.accent || palette.primary }}>ik</em>
          </h2>
          {intro && (
            <p className="text-base" style={{ color: theme.colors.textMuted }}>
              {intro}
            </p>
          )}
        </div>
        
        {/* Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {doelgroepen.map((doelgroep: any, idx: number) => (
            <div 
              key={idx}
              className={`bg-white rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(26,58,47,0.06)] transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(26,58,47,0.12)] group ${getRevealClass('up', idx * 100)}`}
            >
              {/* Image with gradient overlay */}
              <div className="h-[180px] relative overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[rgba(26,58,47,0.3)] to-transparent z-10" />
                <img 
                  src={doelgroep.image || DOELGROEP_IMAGES[doelgroep.type] || DOELGROEP_IMAGES.particulieren}
                  alt={doelgroep.titel}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.08]"
                />
              </div>
              
              {/* Content */}
              <div className="p-7">
                <h4 
                  className="text-xl font-semibold mb-2"
                  style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
                >
                  {doelgroep.titel}
                </h4>
                <p 
                  className="text-sm leading-relaxed"
                  style={{ color: theme.colors.textMuted }}
                >
                  {doelgroep.tekst}
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
// MINDOOR - Simple cards met warm bg
// ============================================
function VoorWieMindoor({ theme, palette, titel, intro, doelgroepen }: any) {
  // Split title for gradient accent
  const titleParts = titel.split(' ');
  const accentWord = titleParts[titleParts.length - 1];
  const restTitle = titleParts.slice(0, -1).join(' ');
  
  return (
    <section 
      id="voorwie"
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
            <p className="mt-4 max-w-2xl mx-auto" style={{ color: theme.colors.textMuted }}>
              {intro}
            </p>
          )}
        </div>
        
        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {doelgroepen.map((doelgroep: any, idx: number) => (
            <div 
              key={idx}
              className={`bg-white rounded-3xl p-8 shadow-lg transition-all hover:-translate-y-2 hover:shadow-xl ${getRevealClass('up', (idx + 1) * 100)}`}
            >
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                style={{ backgroundColor: `${palette.primary}15` }}
              >
                <span className="material-symbols-outlined text-2xl" style={{ color: palette.primary }}>
                  {DOELGROEP_ICONS[doelgroep.type] || 'apartment'}
                </span>
              </div>
              <h4 
                className="text-lg font-semibold mb-3"
                style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
              >
                {doelgroep.titel}
              </h4>
              <p className="text-sm" style={{ color: theme.colors.textMuted }}>
                {doelgroep.tekst}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// CARDS - Gekleurde kaarten met grote icons
// ============================================
function VoorWieCards({ theme, palette, titel, intro, doelgroepen }: any) {
  return (
    <section 
      id="voorwie"
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
          <p style={{ color: theme.colors.textMuted }}>{intro}</p>
        </div>
        
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {doelgroepen.map((doelgroep: any, index: number) => (
            <div 
              key={index}
              className={`relative overflow-hidden p-8 rounded-2xl transition-transform hover:scale-105 ${getRevealClass('up', index + 1)}`}
              style={{ backgroundColor: palette.primary }}
            >
              {/* Background pattern */}
              <div 
                className="absolute top-0 right-0 w-32 h-32 opacity-10"
                style={{
                  background: `radial-gradient(circle, white 0%, transparent 70%)`,
                  transform: 'translate(30%, -30%)'
                }}
              />
              
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl text-white">
                  {DOELGROEP_ICONS[doelgroep.type] || 'group'}
                </span>
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3">
                {doelgroep.titel}
              </h3>
              <p className="text-white/80 text-sm leading-relaxed">
                {doelgroep.tekst}
              </p>
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
function VoorWieGrid({ theme, palette, titel, intro, doelgroepen }: any) {
  return (
    <section 
      id="voorwie"
      className="py-20 md:py-28 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-4xl mx-auto">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {doelgroepen.map((doelgroep: any, index: number) => (
            <div 
              key={index}
              className={`flex flex-col items-center ${getRevealClass('up', index + 1)}`}
            >
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: palette.primaryLight }}
              >
                <span 
                  className="material-symbols-outlined text-3xl"
                  style={{ color: palette.primary }}
                >
                  {DOELGROEP_ICONS[doelgroep.type] || 'group'}
                </span>
              </div>
              <h3 
                className="font-bold mb-2"
                style={{ color: theme.colors.text }}
              >
                {doelgroep.titel}
              </h3>
              <p 
                className="text-sm"
                style={{ color: theme.colors.textMuted }}
              >
                {doelgroep.tekst}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// LIST - Simpele lijst weergave
// ============================================
function VoorWieList({ theme, palette, titel, intro, doelgroepen }: any) {
  return (
    <section 
      id="voorwie"
      className="py-20 md:py-28 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className={`mb-12 ${getRevealClass('up')}`}>
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            {titel}
          </h2>
          <p style={{ color: theme.colors.textMuted }}>{intro}</p>
        </div>
        
        {/* List */}
        <div className="space-y-4">
          {doelgroepen.map((doelgroep: any, index: number) => (
            <div 
              key={index}
              className={`flex items-start gap-4 p-6 rounded-xl border transition-all hover:shadow-md ${getRevealClass('up', index + 1)}`}
              style={{ 
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border
              }}
            >
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: palette.primaryLight }}
              >
                <span 
                  className="material-symbols-outlined"
                  style={{ color: palette.primary }}
                >
                  {DOELGROEP_ICONS[doelgroep.type] || 'group'}
                </span>
              </div>
              <div>
                <h3 
                  className="font-bold mb-1"
                  style={{ color: theme.colors.text }}
                >
                  {doelgroep.titel}
                </h3>
                <p 
                  className="text-sm"
                  style={{ color: theme.colors.textMuted }}
                >
                  {doelgroep.tekst}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default VoorWieSection;
