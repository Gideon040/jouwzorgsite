// components/templates/sections/ContactSection.tsx
// Contact sectie met meerdere varianten per template
// 
// ============================================
// EDGE FUNCTION REFERENTIE
// ============================================
// 
// Beschikbare styles per template:
//
// EDITORIAL:  ['editorial', 'editorial-2', 'editorial-3']
// PROACTIEF:  ['proactief', 'proactief-2', 'proactief-3']
// PORTFOLIO:  ['portfolio', 'portfolio-2', 'portfolio-3']
// MINDOOR:    ['mindoor', 'mindoor-2', 'mindoor-3']
// SERENE:     ['serene', 'serene-2', 'serene-3']
//
// Legacy (niet template-specifiek):
// ['split', 'centered', 'form-only']
//
// Voorbeeld random selectie in edge function:
// const contactVariants = ['mindoor', 'mindoor-2', 'mindoor-3'];
// const style = contactVariants[Math.floor(Math.random() * contactVariants.length)];
//
// ============================================
// VARIANT BESCHRIJVINGEN (ter referentie)
// ============================================
//
// editorial    - Split layout met interest card
// editorial-2  - TODO
// editorial-3  - TODO
//
// proactief    - Solid icons, compact met subtle card
// proactief-2  - TODO
// proactief-3  - TODO
//
// portfolio    - Elegant split met afbeelding
// portfolio-2  - TODO
// portfolio-3  - TODO
//
// mindoor      - Split layout met offset afbeelding
// mindoor-2    - Bento grid met grote kaarten
// mindoor-3    - Split met persoonlijke quote
//
// serene       - TODO
// serene-2     - TODO
// serene-3     - TODO
//
// ============================================

'use client';

import { BaseSectionProps, ContactStyle, getRevealClass } from './types';
import { ContactTrustBadges } from './ContactTrustBadges';

interface ContactSectionProps extends BaseSectionProps {
  style?: ContactStyle;
}

export function ContactSection({ 
  style = 'editorial', 
  theme, 
  palette, 
  content, 
  generated,
  beroepLabel,
}: ContactSectionProps) {
  const contactContent = generated?.contact;
  const titel = contactContent?.titel || 'Samenwerken?';
  const intro = contactContent?.intro || 'Neem gerust contact op om de mogelijkheden te bespreken.';
  const telefoon = content.contact?.telefoon || '';
  const email = content.contact?.email || '';
  const werkgebied = content.contact?.werkgebied || [];
  const naam = content.naam || '';
  
  // Shared props voor alle varianten
  const sharedProps = { 
    theme, 
    palette, 
    content,
    titel, 
    intro, 
    telefoon, 
    email, 
    werkgebied, 
    naam, 
    beroepLabel 
  };
  
  switch (style) {
    // ============================================
    // EDITORIAL VARIANTEN
    // ============================================
    case 'editorial':      // Variant 1 - Split layout met interest card
      return <ContactEditorial {...sharedProps} />;
    case 'editorial-2':    // Variant 2 - TODO
      return <ContactEditorial2 {...sharedProps} />;
    case 'editorial-3':    // Variant 3 - TODO
      return <ContactEditorial3 {...sharedProps} />;
    
    // ============================================
    // PROACTIEF VARIANTEN
    // ============================================
    case 'proactief':      // Variant 1 - Solid icons, compact met subtle card
      return <ContactProactief {...sharedProps} />;
    case 'proactief-2':    // Variant 2 - TODO
      return <ContactProactief2 {...sharedProps} />;
    case 'proactief-3':    // Variant 3 - TODO
      return <ContactProactief3 {...sharedProps} />;
    
    // ============================================
    // PORTFOLIO VARIANTEN
    // ============================================
    case 'portfolio':      // Variant 1 - Elegant met afbeelding rechts
      return <ContactPortfolio {...sharedProps} />;
    case 'portfolio-2':    // Variant 2 - TODO
      return <ContactPortfolio2 {...sharedProps} />;
    case 'portfolio-3':    // Variant 3 - TODO
      return <ContactPortfolio3 {...sharedProps} />;
    
    // ============================================
    // MINDOOR VARIANTEN
    // ============================================
    case 'mindoor':        // Variant 1 - Split layout met offset afbeelding
      return <ContactMindoor {...sharedProps} />;
    case 'mindoor-2':      // Variant 2 - Bento grid met grote kaarten
      return <ContactMindoor2 {...sharedProps} />;
    case 'mindoor-3':      // Variant 3 - Split met persoonlijke quote
      return <ContactMindoor3 {...sharedProps} />;
    
    // ============================================
    // SERENE VARIANTEN
    // ============================================
    case 'serene':         // Variant 1 - TODO
      return <ContactSerene {...sharedProps} />;
    case 'serene-2':       // Variant 2 - TODO
      return <ContactSerene2 {...sharedProps} />;
    case 'serene-3':       // Variant 3 - TODO
      return <ContactSerene3 {...sharedProps} />;
    
    // ============================================
    // LEGACY VARIANTEN
    // ============================================
    case 'split':
      return <ContactSplit {...sharedProps} />;
    case 'centered':
      return <ContactCentered {...sharedProps} />;
    case 'form-only':
      return <ContactFormOnly {...sharedProps} />;
    
    default:
      return <ContactEditorial {...sharedProps} />;
  }
}


// ============================================
// ============================================
// EDITORIAL VARIANTEN
// ============================================
// ============================================

// EDITORIAL - Split layout met interest card
function ContactEditorial({ theme, palette, content, titel, intro, telefoon, email, werkgebied, naam, beroepLabel }: any) {
  const werkgebiedString = Array.isArray(werkgebied) ? werkgebied.join(', ') : werkgebied;
  
  return (
    <section 
      id="contact"
      className="px-6 md:px-16 lg:px-32 py-20"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Left - Contact Info */}
          <div className={`flex-1 flex flex-col gap-8 ${getRevealClass('left')}`}>
            <div className="flex flex-col gap-4">
              <span 
                className="text-xs font-semibold uppercase tracking-[0.15em]"
                style={{ fontVariant: 'small-caps', color: palette.primary }}
              >
                Contact
              </span>
              <h2 
                className="text-3xl md:text-4xl"
                style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
              >
                {titel}
              </h2>
              <p 
                className="leading-relaxed"
                style={{ color: theme.colors.textMuted }}
              >
                {intro}
              </p>
            </div>
            
            {/* Contact Items */}
            <div className="flex flex-col gap-5">
              {telefoon && (
                <a href={`tel:${telefoon}`} className="flex items-center gap-4 group">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                    style={{ backgroundColor: `${palette.primary}15` }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${palette.primary}25`}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `${palette.primary}15`}
                  >
                    <span className="material-symbols-outlined" style={{ color: palette.primary }}>call</span>
                  </div>
                  <div>
                    <p className="text-xs uppercase font-semibold tracking-widest" style={{ color: theme.colors.textMuted }}>Telefoon</p>
                    <p className="text-lg" style={{ color: theme.colors.text }}>{telefoon}</p>
                  </div>
                </a>
              )}
              
              {email && (
                <a href={`mailto:${email}`} className="flex items-center gap-4 group">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                    style={{ backgroundColor: `${palette.primary}15` }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${palette.primary}25`}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `${palette.primary}15`}
                  >
                    <span className="material-symbols-outlined" style={{ color: palette.primary }}>mail</span>
                  </div>
                  <div>
                    <p className="text-xs uppercase font-semibold tracking-widest" style={{ color: theme.colors.textMuted }}>Email</p>
                    <p className="text-lg" style={{ color: theme.colors.text }}>{email}</p>
                  </div>
                </a>
              )}
              
              {werkgebiedString && (
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${palette.primary}15` }}
                  >
                    <span className="material-symbols-outlined" style={{ color: palette.primary }}>location_on</span>
                  </div>
                  <div>
                    <p className="text-xs uppercase font-semibold tracking-widest" style={{ color: theme.colors.textMuted }}>Werkgebied</p>
                    <p className="text-lg" style={{ color: theme.colors.text }}>{werkgebiedString}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Trust Badges */}
            {content?.certificaten && content.certificaten.length > 0 && (
              <ContactTrustBadges 
                certificaten={content.certificaten}
                accentColor={palette.primary}
                textMutedColor={theme.colors.textMuted}
                borderColor={theme.colors.border}
              />
            )}
          </div>
          
          {/* Right - Interest Card */}
          <div className={`flex-1 ${getRevealClass('right')}`}>
            <div 
              className="p-8 lg:p-10 rounded-lg flex flex-col gap-6 border"
              style={{ backgroundColor: theme.colors.backgroundAlt, borderColor: theme.colors.border }}
            >
              <h3 className="text-2xl" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>
                Interesse in samenwerking?
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: theme.colors.textMuted }}>
                Ik werk voor zorginstellingen, thuiszorgorganisaties en particulieren met een PGB. 
                Flexibel inzetbaar op korte en lange termijn.
              </p>
              <ul className="space-y-3 text-sm" style={{ color: theme.colors.text }}>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg" style={{ color: palette.primary }}>check</span>
                  Flexibele inzet en beschikbaarheid
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg" style={{ color: palette.primary }}>check</span>
                  ZZP met eigen KVK en verzekeringen
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg" style={{ color: palette.primary }}>check</span>
                  Snel ingewerkt, zelfstandig werkend
                </li>
              </ul>
              {email && (
                <a 
                  href={`mailto:${email}?subject=Samenwerking ${beroepLabel || 'Zorgprofessional'}`}
                  className="w-full h-12 rounded text-white text-sm font-semibold uppercase tracking-widest transition-colors flex items-center justify-center"
                  style={{ backgroundColor: palette.primary }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = palette.primaryHover || palette.primaryDark}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = palette.primary}
                >
                  Stuur een bericht
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// EDITORIAL-2 — Bento Grid Layout
// Asymmetrische cards, oversized contact details
// ============================================

function ContactEditorial2({ theme, palette, content, titel, intro, telefoon, email, werkgebied, naam, beroepLabel }: any) {
  const werkgebiedString = Array.isArray(werkgebied) ? werkgebied.join(', ') : werkgebied;
  
  // Split titel voor italic laatste woord
  const titelWords = titel.split(' ');
  const titelStart = titelWords.slice(0, -1).join(' ');
  const titelEnd = titelWords.slice(-1)[0];
  
  return (
    <section 
      id="contact"
      className="py-24 lg:py-32"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className={`flex items-center gap-4 mb-6 ${getRevealClass('up')}`}>
          <div className="w-12 h-px" style={{ backgroundColor: palette.primary }} />
          <span 
            className="text-[10px] font-medium uppercase tracking-[0.25em]"
            style={{ color: theme.colors.textMuted }}
          >
            Contact
          </span>
        </div>
        
        <h2 
          className={`text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] mb-16 ${getRevealClass('up')}`}
          style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
        >
          {titelStart}{' '}
          <span className="italic" style={{ color: palette.primary }}>{titelEnd}</span>
        </h2>
        
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-5">
          
          {/* Telefoon - Large card */}
          {telefoon && (
            <a 
              href={`tel:${telefoon}`} 
              className={`lg:col-span-5 group ${getRevealClass('left')}`}
            >
              <div 
                className="h-full p-8 lg:p-10 border transition-all duration-300"
                style={{ 
                  borderColor: theme.colors.border, 
                  backgroundColor: theme.colors.backgroundAlt 
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = palette.primary;
                  e.currentTarget.style.backgroundColor = theme.colors.background;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = theme.colors.border;
                  e.currentTarget.style.backgroundColor = theme.colors.backgroundAlt;
                }}
              >
                <span 
                  className="text-[10px] font-medium uppercase tracking-[0.25em] block mb-4"
                  style={{ color: theme.colors.textMuted }}
                >
                  Telefoon
                </span>
                <span 
                  className="text-2xl lg:text-3xl block"
                  style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                >
                  {telefoon}
                </span>
                <span 
                  className="text-xs mt-8 block opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0"
                  style={{ color: palette.primary }}
                >
                  Bel direct →
                </span>
              </div>
            </a>
          )}
          
          {/* Email - Larger card */}
          {email && (
            <a 
              href={`mailto:${email}`} 
              className={`lg:col-span-7 group ${getRevealClass('right')}`}
            >
              <div 
                className="h-full p-8 lg:p-10 border transition-all duration-300"
                style={{ borderColor: theme.colors.border }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = palette.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = theme.colors.border;
                }}
              >
                <span 
                  className="text-[10px] font-medium uppercase tracking-[0.25em] block mb-4"
                  style={{ color: theme.colors.textMuted }}
                >
                  E-mail
                </span>
                <span 
                  className="text-2xl lg:text-3xl block"
                  style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                >
                  {email}
                </span>
                <span 
                  className="text-xs mt-8 block opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0"
                  style={{ color: palette.primary }}
                >
                  Stuur een bericht →
                </span>
              </div>
            </a>
          )}
          
          {/* Werkgebied - Medium */}
          {werkgebiedString && (
            <div className={`lg:col-span-4 ${getRevealClass('up')}`}>
              <div 
                className="h-full p-8 lg:p-10 border"
                style={{ borderColor: theme.colors.border }}
              >
                <span 
                  className="text-[10px] font-medium uppercase tracking-[0.25em] block mb-4"
                  style={{ color: theme.colors.textMuted }}
                >
                  Werkgebied
                </span>
                <span 
                  className="text-xl lg:text-2xl block"
                  style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                >
                  {werkgebiedString}
                </span>
              </div>
            </div>
          )}
          
          {/* Intro + Trust badges */}
          <div className={`lg:col-span-5 ${getRevealClass('up')}`}>
            <div 
              className="h-full p-8 lg:p-10 flex flex-col justify-between"
              style={{ backgroundColor: theme.colors.backgroundAlt }}
            >
              <p 
                className="text-sm leading-relaxed"
                style={{ color: theme.colors.textMuted }}
              >
                {intro}
              </p>
              
              {/* Trust Badges */}
              {content?.certificaten && content.certificaten.length > 0 ? (
                <div className="mt-6 pt-6 border-t" style={{ borderColor: theme.colors.border }}>
                  <ContactTrustBadges 
                    certificaten={content.certificaten}
                    accentColor={palette.primary}
                    textMutedColor={theme.colors.textMuted}
                    borderColor={theme.colors.border}
                  />
                </div>
              ) : (
                <div 
                  className="mt-6 pt-6 border-t flex items-center gap-6"
                  style={{ borderColor: theme.colors.border }}
                >
                  <span className="text-[10px] font-medium tracking-wide" style={{ color: theme.colors.textMuted }}>BIG</span>
                  <span className="w-1 h-1 rounded-full" style={{ backgroundColor: theme.colors.border }} />
                  <span className="text-[10px] font-medium tracking-wide" style={{ color: theme.colors.textMuted }}>KvK</span>
                  <span className="w-1 h-1 rounded-full" style={{ backgroundColor: theme.colors.border }} />
                  <span className="text-[10px] font-medium tracking-wide" style={{ color: theme.colors.textMuted }}>Verzekerd</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Beschikbaarheid - Accent card */}
          <div className={`lg:col-span-3 ${getRevealClass('up')}`}>
            <div 
              className="h-full p-8 lg:p-10 flex flex-col justify-center text-center"
              style={{ backgroundColor: palette.primary }}
            >
              <span 
                className="text-[10px] font-medium uppercase tracking-[0.25em] block mb-3"
                style={{ color: 'rgba(255,255,255,0.6)' }}
              >
                Status
              </span>
              <span 
                className="text-xl text-white"
                style={{ fontFamily: theme.fonts.heading }}
              >
                Beschikbaar
              </span>
              <span 
                className="text-xs mt-2"
                style={{ color: 'rgba(255,255,255,0.7)' }}
              >
                per direct
              </span>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}


// ============================================
// EDITORIAL-3 — Stacked Accent Layout
// Vertical stack met primary accent card
// ============================================

function ContactEditorial3({ theme, palette, content, titel, intro, telefoon, email, werkgebied, naam, beroepLabel }: any) {
  const werkgebiedString = Array.isArray(werkgebied) ? werkgebied.join(', ') : werkgebied;
  
  // Split titel voor multi-line italic
  const titelWords = titel.split(' ');
  const titelEnd = titelWords.slice(-1)[0];
  
  return (
    <section 
      id="contact"
      className="py-24 lg:py-32"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left - Typography heavy */}
          <div className={`lg:col-span-5 flex flex-col justify-center ${getRevealClass('left')}`}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px" style={{ backgroundColor: palette.primary }} />
              <span 
                className="text-[10px] font-medium uppercase tracking-[0.25em]"
                style={{ color: theme.colors.textMuted }}
              >
                Contact
              </span>
            </div>
            
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.02em] mb-8"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              Neem<br />
              <span className="italic" style={{ color: palette.primary }}>contact</span><br />
              op
            </h2>
            
            <p 
              className="text-sm leading-relaxed max-w-sm"
              style={{ color: theme.colors.textMuted }}
            >
              {intro}
            </p>
          </div>
          
          {/* Right - Stacked cards */}
          <div className={`lg:col-span-7 flex flex-col gap-4 ${getRevealClass('right')}`}>
            
            {/* Primary accent card - Telefoon */}
            {telefoon && (
              <a href={`tel:${telefoon}`} className="group">
                <div 
                  className="p-8 lg:p-10 transition-all duration-300"
                  style={{ backgroundColor: palette.primary }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = palette.primaryHover || palette.primaryDark || palette.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = palette.primary;
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div>
                      <span 
                        className="text-[10px] font-medium uppercase tracking-[0.25em] block mb-3"
                        style={{ color: 'rgba(255,255,255,0.6)' }}
                      >
                        Telefoon
                      </span>
                      <span 
                        className="text-2xl lg:text-3xl text-white"
                        style={{ fontFamily: theme.fonts.heading }}
                      >
                        {telefoon}
                      </span>
                    </div>
                    <span className="text-sm text-white opacity-70 group-hover:opacity-100 transition-opacity">
                      Bel direct →
                    </span>
                  </div>
                </div>
              </a>
            )}
            
            {/* Email card */}
            {email && (
              <a href={`mailto:${email}`} className="group">
                <div 
                  className="p-8 lg:p-10 border transition-all duration-300"
                  style={{ 
                    backgroundColor: theme.colors.background, 
                    borderColor: theme.colors.border 
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = palette.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = theme.colors.border;
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div>
                      <span 
                        className="text-[10px] font-medium uppercase tracking-[0.25em] block mb-3"
                        style={{ color: theme.colors.textMuted }}
                      >
                        E-mail
                      </span>
                      <span 
                        className="text-2xl lg:text-3xl"
                        style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                      >
                        {email}
                      </span>
                    </div>
                    <span 
                      className="text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0"
                      style={{ color: palette.primary }}
                    >
                      Stuur bericht →
                    </span>
                  </div>
                </div>
              </a>
            )}
            
            {/* Werkgebied + Trust row */}
            <div className="grid sm:grid-cols-2 gap-4">
              {werkgebiedString && (
                <div 
                  className="p-8 border"
                  style={{ 
                    backgroundColor: theme.colors.background, 
                    borderColor: theme.colors.border 
                  }}
                >
                  <span 
                    className="text-[10px] font-medium uppercase tracking-[0.25em] block mb-3"
                    style={{ color: theme.colors.textMuted }}
                  >
                    Werkgebied
                  </span>
                  <span 
                    className="text-xl"
                    style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                  >
                    {werkgebiedString}
                  </span>
                </div>
              )}
              
              {/* Trust badges card */}
              <div 
                className="p-8 border flex flex-col justify-center"
                style={{ 
                  backgroundColor: theme.colors.background, 
                  borderColor: theme.colors.border 
                }}
              >
                {content?.certificaten && content.certificaten.length > 0 ? (
                  <ContactTrustBadges 
                    certificaten={content.certificaten}
                    accentColor={palette.primary}
                    textMutedColor={theme.colors.textMuted}
                    borderColor={theme.colors.border}
                  />
                ) : (
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="text-[10px] font-medium tracking-wide" style={{ color: theme.colors.textMuted }}>BIG</span>
                    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: theme.colors.border }} />
                    <span className="text-[10px] font-medium tracking-wide" style={{ color: theme.colors.textMuted }}>KvK</span>
                    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: theme.colors.border }} />
                    <span className="text-[10px] font-medium tracking-wide" style={{ color: theme.colors.textMuted }}>Verzekerd</span>
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

// ============================================
// ============================================
// PROACTIEF VARIANTEN
// ============================================
// ============================================

// ============================================
// PROACTIEF V1 — Clean Split
// Modern split, no rounded corners, sharp
// ============================================

function ContactProactief({ theme, palette, content, titel, intro, telefoon, email, werkgebied, naam, beroepLabel }: any) {
  const werkgebiedString = Array.isArray(werkgebied) ? werkgebied.join(', ') : werkgebied;
  
  return (
    <section 
      id="contact"
      className="py-24 lg:py-32"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left - Contact Info */}
          <div className={`lg:col-span-7 ${getRevealClass('left')}`}>
            
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-1" style={{ backgroundColor: palette.primary }} />
              <span 
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: palette.primary }}
              >
                Contact
              </span>
            </div>
            
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {titel}
            </h2>
            
            <p 
              className="text-base leading-relaxed mb-10 max-w-lg"
              style={{ color: theme.colors.textMuted }}
            >
              {intro}
            </p>
            
            {/* Contact Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              
              {telefoon && (
                <a 
                  href={`tel:${telefoon}`} 
                  className="group flex items-center gap-4 p-5 border transition-all"
                  style={{ borderColor: theme.colors.border }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = palette.primary;
                    e.currentTarget.style.backgroundColor = theme.colors.backgroundAlt;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = theme.colors.border;
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <div 
                    className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: palette.primary }}
                  >
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </div>
                  <div>
                    <p 
                      className="text-[11px] font-medium uppercase tracking-wider mb-1"
                      style={{ color: theme.colors.textMuted }}
                    >
                      Telefoon
                    </p>
                    <p 
                      className="font-semibold"
                      style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                    >
                      {telefoon}
                    </p>
                  </div>
                </a>
              )}
              
              {email && (
                <a 
                  href={`mailto:${email}`} 
                  className="group flex items-center gap-4 p-5 border transition-all"
                  style={{ borderColor: theme.colors.border }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = palette.accent || palette.primary;
                    e.currentTarget.style.backgroundColor = theme.colors.backgroundAlt;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = theme.colors.border;
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <div 
                    className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: palette.accent || palette.primary }}
                  >
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <div>
                    <p 
                      className="text-[11px] font-medium uppercase tracking-wider mb-1"
                      style={{ color: theme.colors.textMuted }}
                    >
                      Email
                    </p>
                    <p 
                      className="font-semibold"
                      style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                    >
                      {email}
                    </p>
                  </div>
                </a>
              )}
              
            </div>
            
            {/* Werkgebied + Trust */}
            <div 
              className="flex flex-wrap items-center gap-6 text-sm"
              style={{ color: theme.colors.textMuted }}
            >
              {werkgebiedString && (
                <>
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" style={{ color: palette.primary }} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    {werkgebiedString}
                  </span>
                  <span className="w-1 h-1 rounded-full" style={{ backgroundColor: theme.colors.border }} />
                </>
              )}
              {content?.certificaten && content.certificaten.length > 0 ? (
                <ContactTrustBadges 
                  certificaten={content.certificaten}
                  accentColor={palette.primary}
                  textMutedColor={theme.colors.textMuted}
                  borderColor={theme.colors.border}
                />
              ) : (
                <>
                  <span>BIG-geregistreerd</span>
                  <span className="w-1 h-1 rounded-full" style={{ backgroundColor: theme.colors.border }} />
                  <span>KvK</span>
                </>
              )}
            </div>
            
          </div>
          
          {/* Right - CTA Card */}
          <div className={`lg:col-span-5 ${getRevealClass('right')}`}>
            <div 
              className="h-full p-8 lg:p-10 border-l-4 flex flex-col"
              style={{ 
                backgroundColor: theme.colors.backgroundAlt, 
                borderColor: palette.primary 
              }}
            >
              
              <span 
                className="text-[11px] font-semibold uppercase tracking-wider mb-4"
                style={{ color: palette.primary }}
              >
                Samenwerken?
              </span>
              
              <h3 
                className="text-xl font-bold mb-4"
                style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
              >
                Interesse in samenwerking?
              </h3>
              
              <ul className="space-y-3 text-sm mb-8 flex-1" style={{ color: theme.colors.text }}>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: palette.primary }} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  Flexibele inzet en beschikbaarheid
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: palette.primary }} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  ZZP met eigen KVK en verzekeringen
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: palette.primary }} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  Snel ingewerkt, zelfstandig werkend
                </li>
              </ul>
              
              {email && (
                <a 
                  href={`mailto:${email}?subject=Samenwerking ${beroepLabel || 'Zorgprofessional'}`}
                  className="w-full h-12 text-white text-sm font-semibold uppercase tracking-wider flex items-center justify-center transition-colors"
                  style={{ backgroundColor: palette.primary }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = palette.primaryHover || palette.primaryDark || palette.primary}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = palette.primary}
                >
                  Neem contact op
                </a>
              )}
              
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}


// ============================================
// PROACTIEF V2 — Horizontal Cards
// Full-width cards, stacked, bold typography
// ============================================

function ContactProactief2({ theme, palette, content, titel, intro, telefoon, email, werkgebied, naam, beroepLabel }: any) {
  const werkgebiedString = Array.isArray(werkgebied) ? werkgebied.join(', ') : werkgebied;
  
  return (
    <section 
      id="contact"
      className="py-24 lg:py-32"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        
        {/* Header - Centered */}
        <div className={`text-center mb-16 ${getRevealClass('up')}`}>
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-1" style={{ backgroundColor: palette.primary }} />
            <span 
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: palette.primary }}
            >
              Contact
            </span>
            <div className="w-8 h-1" style={{ backgroundColor: palette.primary }} />
          </div>
          
          <h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            {titel}
          </h2>
          
          <p 
            className="text-base max-w-xl mx-auto"
            style={{ color: theme.colors.textMuted }}
          >
            {intro}
          </p>
        </div>
        
        {/* Stacked Cards */}
        <div className="space-y-4">
          
          {/* Telefoon */}
          {telefoon && (
            <a href={`tel:${telefoon}`} className={`group block ${getRevealClass('left')}`}>
              <div 
                className="flex flex-col sm:flex-row sm:items-center justify-between p-6 lg:p-8 border transition-all"
                style={{ backgroundColor: theme.colors.background, borderColor: theme.colors.border }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = palette.primary}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = theme.colors.border}
              >
                <div className="flex items-center gap-5">
                  <div 
                    className="w-14 h-14 flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: palette.primary }}
                  >
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </div>
                  <div>
                    <p 
                      className="text-[11px] font-medium uppercase tracking-wider mb-1"
                      style={{ color: theme.colors.textMuted }}
                    >
                      Telefoon
                    </p>
                    <p 
                      className="text-xl lg:text-2xl font-semibold"
                      style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                    >
                      {telefoon}
                    </p>
                  </div>
                </div>
                <span 
                  className="mt-4 sm:mt-0 text-sm font-medium opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"
                  style={{ color: palette.primary }}
                >
                  Bel direct →
                </span>
              </div>
            </a>
          )}
          
          {/* Email */}
          {email && (
            <a href={`mailto:${email}`} className={`group block ${getRevealClass('right')}`}>
              <div 
                className="flex flex-col sm:flex-row sm:items-center justify-between p-6 lg:p-8 border transition-all"
                style={{ backgroundColor: theme.colors.background, borderColor: theme.colors.border }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = palette.accent || palette.primary}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = theme.colors.border}
              >
                <div className="flex items-center gap-5">
                  <div 
                    className="w-14 h-14 flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: palette.accent || palette.primary }}
                  >
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <div>
                    <p 
                      className="text-[11px] font-medium uppercase tracking-wider mb-1"
                      style={{ color: theme.colors.textMuted }}
                    >
                      Email
                    </p>
                    <p 
                      className="text-xl lg:text-2xl font-semibold"
                      style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                    >
                      {email}
                    </p>
                  </div>
                </div>
                <span 
                  className="mt-4 sm:mt-0 text-sm font-medium opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"
                  style={{ color: palette.accent || palette.primary }}
                >
                  Stuur bericht →
                </span>
              </div>
            </a>
          )}
          
          {/* Werkgebied + Status */}
          <div className={`grid sm:grid-cols-2 gap-4 ${getRevealClass('up')}`}>
            {werkgebiedString && (
              <div 
                className="p-6 lg:p-8 border"
                style={{ backgroundColor: theme.colors.background, borderColor: theme.colors.border }}
              >
                <p 
                  className="text-[11px] font-medium uppercase tracking-wider mb-2"
                  style={{ color: theme.colors.textMuted }}
                >
                  Werkgebied
                </p>
                <p 
                  className="text-lg font-semibold"
                  style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                >
                  {werkgebiedString}
                </p>
              </div>
            )}
            
            <div 
              className="p-6 lg:p-8 flex items-center justify-between"
              style={{ backgroundColor: palette.primary }}
            >
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider mb-2 text-white/60">
                  Status
                </p>
                <p 
                  className="text-lg font-semibold text-white"
                  style={{ fontFamily: theme.fonts.heading }}
                >
                  Beschikbaar
                </p>
              </div>
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
            </div>
          </div>
          
        </div>
        
        {/* Trust badges */}
        <div className={`mt-10 flex flex-wrap justify-center items-center gap-6 text-sm ${getRevealClass('up')}`} style={{ color: theme.colors.textMuted }}>
          {content?.certificaten && content.certificaten.length > 0 ? (
            <ContactTrustBadges 
              certificaten={content.certificaten}
              accentColor={palette.primary}
              textMutedColor={theme.colors.textMuted}
              borderColor={theme.colors.border}
            />
          ) : (
            <>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" style={{ color: palette.primary }} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                BIG-geregistreerd
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" style={{ color: palette.primary }} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                KvK-ingeschreven
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" style={{ color: palette.primary }} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                Verzekerd
              </span>
            </>
          )}
        </div>
        
      </div>
    </section>
  );
}


// ============================================
// PROACTIEF V3 — Bold Statement
// Large typography, accent block, minimal
// ============================================

function ContactProactief3({ theme, palette, content, titel, intro, telefoon, email, werkgebied, naam, beroepLabel }: any) {
  const werkgebiedString = Array.isArray(werkgebied) ? werkgebied.join(', ') : werkgebied;
  
  return (
    <section 
      id="contact"
      className="min-h-[85vh]"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-7xl mx-auto">
        
        <div className="grid lg:grid-cols-2 min-h-[85vh]">
          
          {/* Left - Bold Typography */}
          <div className={`flex flex-col justify-center px-6 lg:px-16 xl:px-24 py-20 ${getRevealClass('left')}`}>
            
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-1" style={{ backgroundColor: palette.primary }} />
              <span 
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: palette.primary }}
              >
                Contact
              </span>
            </div>
            
            <h2 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              Direct aan<br />
              <span style={{ color: palette.primary }}>de slag?</span>
            </h2>
            
            <p 
              className="text-lg leading-relaxed mb-10 max-w-md"
              style={{ color: theme.colors.textMuted }}
            >
              {intro}
            </p>
            
            {/* Contact links - minimal */}
            <div className="space-y-4">
              {telefoon && (
                <a href={`tel:${telefoon}`} className="group flex items-center gap-4">
                  <span 
                    className="text-[11px] font-medium uppercase tracking-wider w-20"
                    style={{ color: theme.colors.textMuted }}
                  >
                    Tel
                  </span>
                  <span 
                    className="text-xl font-semibold transition-colors"
                    style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                    onMouseEnter={(e) => e.currentTarget.style.color = palette.primary}
                    onMouseLeave={(e) => e.currentTarget.style.color = theme.colors.text}
                  >
                    {telefoon}
                  </span>
                </a>
              )}
              {email && (
                <a href={`mailto:${email}`} className="group flex items-center gap-4">
                  <span 
                    className="text-[11px] font-medium uppercase tracking-wider w-20"
                    style={{ color: theme.colors.textMuted }}
                  >
                    Email
                  </span>
                  <span 
                    className="text-xl font-semibold transition-colors"
                    style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                    onMouseEnter={(e) => e.currentTarget.style.color = palette.primary}
                    onMouseLeave={(e) => e.currentTarget.style.color = theme.colors.text}
                  >
                    {email}
                  </span>
                </a>
              )}
              {werkgebiedString && (
                <div className="flex items-center gap-4">
                  <span 
                    className="text-[11px] font-medium uppercase tracking-wider w-20"
                    style={{ color: theme.colors.textMuted }}
                  >
                    Regio
                  </span>
                  <span 
                    className="text-xl font-semibold"
                    style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                  >
                    {werkgebiedString}
                  </span>
                </div>
              )}
            </div>
            
            {/* Trust */}
            <div 
              className="mt-12 pt-8 border-t flex items-center gap-6 text-xs font-medium"
              style={{ borderColor: theme.colors.border, color: theme.colors.textMuted }}
            >
              {content?.certificaten && content.certificaten.length > 0 ? (
                <ContactTrustBadges 
                  certificaten={content.certificaten}
                  accentColor={palette.primary}
                  textMutedColor={theme.colors.textMuted}
                  borderColor={theme.colors.border}
                />
              ) : (
                <>
                  <span>BIG</span>
                  <span className="w-1 h-1 rounded-full" style={{ backgroundColor: theme.colors.border }} />
                  <span>KvK</span>
                  <span className="w-1 h-1 rounded-full" style={{ backgroundColor: theme.colors.border }} />
                  <span>Verzekerd</span>
                </>
              )}
            </div>
            
          </div>
          
          {/* Right - Full accent block */}
          <div 
            className={`flex flex-col justify-center px-6 lg:px-16 xl:px-24 py-20 ${getRevealClass('right')}`}
            style={{ backgroundColor: palette.primary }}
          >
            
            <div className="max-w-md">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/60 block mb-6">
                Waarom samenwerken?
              </span>
              
              <ul className="space-y-6 text-white">
                <li className="flex items-start gap-4">
                  <div 
                    className="w-8 h-8 flex items-center justify-center border border-white/30 flex-shrink-0 mt-1"
                  >
                    <span className="font-bold" style={{ fontFamily: theme.fonts.heading }}>1</span>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Flexibele inzet</p>
                    <p className="text-sm text-white/70">Beschikbaar op korte en lange termijn, aangepast aan uw planning.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div 
                    className="w-8 h-8 flex items-center justify-center border border-white/30 flex-shrink-0 mt-1"
                  >
                    <span className="font-bold" style={{ fontFamily: theme.fonts.heading }}>2</span>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Volledig zelfstandig</p>
                    <p className="text-sm text-white/70">ZZP'er met eigen KVK, verzekeringen en administratie.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div 
                    className="w-8 h-8 flex items-center justify-center border border-white/30 flex-shrink-0 mt-1"
                  >
                    <span className="font-bold" style={{ fontFamily: theme.fonts.heading }}>3</span>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Direct inzetbaar</p>
                    <p className="text-sm text-white/70">Ervaren professional, snel ingewerkt en resultaatgericht.</p>
                  </div>
                </li>
              </ul>
              
              {email && (
                <a 
                  href={`mailto:${email}?subject=Samenwerking ${beroepLabel || 'Zorgprofessional'}`}
                  className="inline-flex items-center gap-3 mt-10 text-white font-semibold group"
                >
                  <span>Start de samenwerking</span>
                  <svg 
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </a>
              )}
              
            </div>
            
          </div>
          
        </div>
        
      </div>
    </section>
  );
}

// ============================================
// ============================================
// PORTFOLIO VARIANTEN
// ============================================
// ============================================

// ============================================
// PORTFOLIO V1 — Overlapping Card
// Image with overlapping contact card
// ============================================

function ContactPortfolio({ theme, palette, content, titel, intro, telefoon, email, werkgebied, naam, beroepLabel }: any) {
  const werkgebiedString = Array.isArray(werkgebied) ? werkgebied.join(', ') : werkgebied;
  
  return (
    <section 
      id="contact"
      className="relative"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-7xl mx-auto">
        
        <div className="grid lg:grid-cols-12 min-h-[90vh]">
          
          {/* Left - Large Image */}
          <div className={`lg:col-span-7 relative h-[50vh] lg:h-auto ${getRevealClass('left')}`}>
            <img 
              src={content?.foto || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1000&h=800&fit=crop"}
              alt="Contact"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div 
              className="absolute inset-0"
              style={{ background: `linear-gradient(to right, ${palette.primary}1A, transparent)` }}
            />
          </div>
          
          {/* Right - Content with overlapping card */}
          <div className="lg:col-span-5 flex items-center relative">
            
            {/* The card that overlaps */}
            <div 
              className={`w-full lg:-ml-20 p-8 lg:p-12 relative z-10 ${getRevealClass('right')}`}
              style={{ backgroundColor: theme.colors.background }}
            >
              
              <span 
                className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-6 block"
                style={{ color: palette.accent || palette.primary }}
              >
                Contact
              </span>
              
              <h2 
                className="text-4xl lg:text-5xl font-medium leading-[1.1] mb-4"
                style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
              >
                Neem gerust<br />
                <span className="italic">contact op</span>
              </h2>
              
              <p 
                className="text-base leading-relaxed mb-10"
                style={{ color: theme.colors.textMuted }}
              >
                {intro}
              </p>
              
              {/* Contact - Clean list */}
              <div className="space-y-6 mb-10">
                
                {telefoon && (
                  <a 
                    href={`tel:${telefoon}`} 
                    className="group flex items-center justify-between pb-4 border-b"
                    style={{ borderColor: theme.colors.border }}
                  >
                    <div>
                      <p 
                        className="text-[11px] font-medium uppercase tracking-wider mb-1"
                        style={{ color: theme.colors.textMuted }}
                      >
                        Telefoon
                      </p>
                      <p 
                        className="text-2xl font-medium transition-colors"
                        style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
                        onMouseEnter={(e) => e.currentTarget.style.color = palette.accent || palette.primary}
                        onMouseLeave={(e) => e.currentTarget.style.color = palette.primary}
                      >
                        {telefoon}
                      </p>
                    </div>
                    <span 
                      className="text-sm opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"
                      style={{ color: palette.accent || palette.primary }}
                    >
                      Bel →
                    </span>
                  </a>
                )}
                
                {email && (
                  <a 
                    href={`mailto:${email}`} 
                    className="group flex items-center justify-between pb-4 border-b"
                    style={{ borderColor: theme.colors.border }}
                  >
                    <div>
                      <p 
                        className="text-[11px] font-medium uppercase tracking-wider mb-1"
                        style={{ color: theme.colors.textMuted }}
                      >
                        E-mail
                      </p>
                      <p 
                        className="text-2xl font-medium transition-colors"
                        style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
                        onMouseEnter={(e) => e.currentTarget.style.color = palette.accent || palette.primary}
                        onMouseLeave={(e) => e.currentTarget.style.color = palette.primary}
                      >
                        {email}
                      </p>
                    </div>
                    <span 
                      className="text-sm opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"
                      style={{ color: palette.accent || palette.primary }}
                    >
                      Mail →
                    </span>
                  </a>
                )}
                
                {werkgebiedString && (
                  <div className="flex items-center justify-between">
                    <div>
                      <p 
                        className="text-[11px] font-medium uppercase tracking-wider mb-1"
                        style={{ color: theme.colors.textMuted }}
                      >
                        Werkgebied
                      </p>
                      <p 
                        className="text-2xl font-medium"
                        style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
                      >
                        {werkgebiedString}
                      </p>
                    </div>
                  </div>
                )}
                
              </div>
              
              {/* Trust badges */}
              {content?.certificaten && content.certificaten.length > 0 ? (
                <ContactTrustBadges 
                  certificaten={content.certificaten}
                  accentColor={palette.accent || palette.primary}
                  textMutedColor={theme.colors.textMuted}
                  borderColor={theme.colors.border}
                />
              ) : (
                <div 
                  className="flex items-center gap-6 text-xs font-medium"
                  style={{ color: theme.colors.textMuted }}
                >
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: palette.accent || palette.primary }} />
                    BIG
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: palette.accent || palette.primary }} />
                    KvK
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: palette.accent || palette.primary }} />
                    Verzekerd
                  </span>
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
// PORTFOLIO V2 — Typografisch Elegant
// Split met grote serif heading, signature element
// ============================================

function ContactPortfolio2({ theme, palette, content, titel, intro, telefoon, email, werkgebied, naam, beroepLabel }: any) {
  const werkgebiedString = Array.isArray(werkgebied) ? werkgebied.join(', ') : werkgebied;
  
  return (
    <section 
      id="contact"
      className="py-24 lg:py-32"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        
        {/* Top: Micro label met lijn */}
        <div className={`flex items-center gap-4 mb-16 ${getRevealClass('up')}`}>
          <div className="w-12 h-px" style={{ backgroundColor: palette.primary }} />
          <span 
            className="text-[11px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: palette.primary }}
          >
            Contact
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Left: Large Typography (7 cols) */}
          <div className={`lg:col-span-7 ${getRevealClass('left')}`}>
            <h2 
              className="text-4xl md:text-5xl lg:text-[52px] leading-[1.1] mb-6"
              style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
            >
              Laten we samen<br />
              kijken wat ik voor<br />
              u kan <em className="font-normal" style={{ color: palette.accent || palette.primary }}>betekenen</em>
            </h2>
            
            <p 
              className="text-lg leading-relaxed max-w-md"
              style={{ color: theme.colors.textMuted }}
            >
              {intro}
            </p>

            {/* Signature element */}
            {naam && (
              <div 
                className="mt-12 pt-8 border-t"
                style={{ borderColor: theme.colors.border }}
              >
                <p 
                  className="text-2xl italic"
                  style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
                >
                  {naam}
                </p>
                {beroepLabel && (
                  <p 
                    className="text-sm mt-1"
                    style={{ color: theme.colors.textMuted }}
                  >
                    {beroepLabel}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Right: Contact Details (5 cols) */}
          <div 
            className={`lg:col-span-5 lg:pl-8 lg:border-l ${getRevealClass('right')}`}
            style={{ borderColor: theme.colors.border }}
          >
            
            {/* Contact Items - Stacked vertical */}
            <div className="space-y-8">
              
              {/* Email */}
              {email && (
                <a href={`mailto:${email}`} className="group block">
                  <span 
                    className="text-[10px] font-semibold uppercase tracking-[0.2em] block mb-2"
                    style={{ color: theme.colors.textMuted }}
                  >
                    E-mail
                  </span>
                  <span 
                    className="text-2xl block"
                    style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
                  >
                    {email}
                  </span>
                  <div 
                    className="w-0 group-hover:w-full h-px mt-2 transition-all duration-300"
                    style={{ backgroundColor: palette.accent || palette.primary }}
                  />
                </a>
              )}

              {/* Telefoon */}
              {telefoon && (
                <a href={`tel:${telefoon}`} className="group block">
                  <span 
                    className="text-[10px] font-semibold uppercase tracking-[0.2em] block mb-2"
                    style={{ color: theme.colors.textMuted }}
                  >
                    Telefoon
                  </span>
                  <span 
                    className="text-2xl block"
                    style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
                  >
                    {telefoon}
                  </span>
                  <div 
                    className="w-0 group-hover:w-full h-px mt-2 transition-all duration-300"
                    style={{ backgroundColor: palette.accent || palette.primary }}
                  />
                </a>
              )}

              {/* Werkgebied */}
              {werkgebiedString && (
                <div>
                  <span 
                    className="text-[10px] font-semibold uppercase tracking-[0.2em] block mb-2"
                    style={{ color: theme.colors.textMuted }}
                  >
                    Werkgebied
                  </span>
                  <span style={{ color: theme.colors.text }}>
                    {werkgebiedString}
                  </span>
                </div>
              )}

            </div>

            {/* Trust Badges - Subtle */}
            {content?.certificaten && content.certificaten.length > 0 ? (
              <div 
                className="mt-12 pt-8 border-t"
                style={{ borderColor: theme.colors.border }}
              >
                <ContactTrustBadges 
                  certificaten={content.certificaten}
                  accentColor={palette.accent || palette.primary}
                  textMutedColor={theme.colors.textMuted}
                  borderColor={theme.colors.border}
                />
              </div>
            ) : (
              <div 
                className="mt-12 pt-8 border-t flex flex-wrap gap-3"
                style={{ borderColor: theme.colors.border }}
              >
                <span 
                  className="text-[10px] uppercase tracking-[0.15em] px-3 py-1.5 border"
                  style={{ color: theme.colors.textMuted, borderColor: theme.colors.border }}
                >
                  BIG Geregistreerd
                </span>
                <span 
                  className="text-[10px] uppercase tracking-[0.15em] px-3 py-1.5 border"
                  style={{ color: theme.colors.textMuted, borderColor: theme.colors.border }}
                >
                  KvK
                </span>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}


// ============================================
// PORTFOLIO V3 — Met Foto Asymmetrisch
// Foto links met overlay, content rechts
// ============================================

function ContactPortfolio3({ theme, palette, content, titel, intro, telefoon, email, werkgebied, naam, beroepLabel }: any) {
  const werkgebiedString = Array.isArray(werkgebied) ? werkgebied.join(', ') : werkgebied;
  
  return (
    <section 
      id="contact"
      className="py-24 lg:py-32"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          
          {/* Left: Foto (5 cols, offset top) */}
          <div className={`lg:col-span-5 lg:-mt-12 ${getRevealClass('left')}`}>
            <div className="relative">
              <img 
                src={content?.foto || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&h=600&fit=crop&crop=face"}
                alt="Contact"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              {/* Overlay label */}
              {naam && (
                <div 
                  className="absolute bottom-0 left-0 right-0 p-6"
                  style={{ background: `linear-gradient(to top, ${palette.primary}E6, transparent)` }}
                >
                  <p 
                    className="text-xl text-white italic"
                    style={{ fontFamily: theme.fonts.heading }}
                  >
                    {naam}
                  </p>
                  {beroepLabel && (
                    <p className="text-sm text-white/70">{beroepLabel}</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right: Content (7 cols) */}
          <div className={`lg:col-span-7 lg:pl-12 ${getRevealClass('right')}`}>
            
            {/* Micro label */}
            <div className="flex items-center gap-4 mb-8">
              <span 
                className="text-[10px] font-semibold uppercase tracking-[0.25em]"
                style={{ color: palette.primary }}
              >
                Contact
              </span>
              <div className="flex-1 h-px" style={{ backgroundColor: theme.colors.border }} />
            </div>

            <h2 
              className="text-4xl md:text-5xl leading-[1.1] mb-6"
              style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
            >
              Neem gerust<br />
              <em className="font-normal">contact</em> op
            </h2>
            
            <p 
              className="text-base leading-relaxed mb-10 max-w-md"
              style={{ color: theme.colors.textMuted }}
            >
              {intro}
            </p>

            {/* Contact grid */}
            <div className="grid grid-cols-2 gap-8 mb-10">
              {email && (
                <a href={`mailto:${email}`} className="group">
                  <span 
                    className="text-[10px] font-semibold uppercase tracking-[0.2em] block mb-2"
                    style={{ color: theme.colors.textMuted }}
                  >
                    E-mail
                  </span>
                  <span 
                    className="text-lg group-hover:underline"
                    style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
                  >
                    {email}
                  </span>
                </a>
              )}
              {telefoon && (
                <a href={`tel:${telefoon}`} className="group">
                  <span 
                    className="text-[10px] font-semibold uppercase tracking-[0.2em] block mb-2"
                    style={{ color: theme.colors.textMuted }}
                  >
                    Telefoon
                  </span>
                  <span 
                    className="text-lg group-hover:underline"
                    style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
                  >
                    {telefoon}
                  </span>
                </a>
              )}
            </div>

            {werkgebiedString && (
              <div className="mb-10">
                <span 
                  className="text-[10px] font-semibold uppercase tracking-[0.2em] block mb-2"
                  style={{ color: theme.colors.textMuted }}
                >
                  Werkgebied
                </span>
                <span style={{ color: theme.colors.text }}>
                  {werkgebiedString}
                </span>
              </div>
            )}

            {/* Trust inline */}
            {content?.certificaten && content.certificaten.length > 0 ? (
              <div 
                className="pt-8 border-t"
                style={{ borderColor: theme.colors.border }}
              >
                <ContactTrustBadges 
                  certificaten={content.certificaten}
                  accentColor={palette.accent || palette.primary}
                  textMutedColor={theme.colors.textMuted}
                  borderColor={theme.colors.border}
                />
              </div>
            ) : (
              <div 
                className="flex gap-3 pt-8 border-t"
                style={{ borderColor: theme.colors.border }}
              >
                <span 
                  className="text-[10px] uppercase tracking-[0.15em] px-3 py-1.5 border"
                  style={{ color: theme.colors.textMuted, borderColor: theme.colors.border }}
                >
                  BIG Geregistreerd
                </span>
                <span 
                  className="text-[10px] uppercase tracking-[0.15em] px-3 py-1.5 border"
                  style={{ color: theme.colors.textMuted, borderColor: theme.colors.border }}
                >
                  KvK
                </span>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// ============================================
// MINDOOR VARIANTEN
// ============================================
// ============================================

// MINDOOR - Split layout met offset afbeelding
function ContactMindoor({ theme, palette, content, titel, intro, telefoon, email, werkgebied, naam, beroepLabel }: any) {
  const werkgebiedString = Array.isArray(werkgebied) ? werkgebied.join(', ') : werkgebied;
  
  return (
    <section 
      id="contact"
      className="py-20 lg:py-32"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Contact Info */}
          <div className={getRevealClass('right')}>
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl leading-tight"
              style={{ fontFamily: theme.fonts.heading }}
            >
              Neem{' '}
              <span 
                className="italic"
                style={{ 
                  background: `linear-gradient(135deg, ${palette.accent || '#d4644a'}, ${palette.accentLight || '#e07b5f'})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Contact
              </span>{' '}Op
            </h2>
            <p className="mt-6 text-lg" style={{ color: theme.colors.textMuted }}>
              {intro || 'Neem vrijblijvend contact op voor een kennismakingsgesprek.'}
            </p>
            
            {/* Contact items */}
            <div className="mt-10 space-y-4">
              {telefoon && (
                <a 
                  href={`tel:${telefoon}`}
                  className="flex items-center gap-4 p-4 rounded-2xl transition-colors"
                  style={{ backgroundColor: theme.colors.backgroundAlt }}
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors"
                    style={{ backgroundColor: `${palette.primary}15` }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${palette.primary}25`}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `${palette.primary}15`}
                  >
                    <span className="material-symbols-outlined" style={{ color: palette.primary }}>call</span>
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: theme.colors.textMuted }}>Telefoon</p>
                    <p className="font-semibold" style={{ color: theme.colors.text }}>{telefoon}</p>
                  </div>
                </a>
              )}
              
              {email && (
                <a 
                  href={`mailto:${email}`}
                  className="flex items-center gap-4 p-4 rounded-2xl transition-colors"
                  style={{ backgroundColor: theme.colors.backgroundAlt }}
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors"
                    style={{ backgroundColor: `${palette.accent || palette.primary}15` }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${palette.accent || palette.primary}25`}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `${palette.accent || palette.primary}15`}
                  >
                    <span className="material-symbols-outlined" style={{ color: palette.accent || palette.primary }}>mail</span>
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: theme.colors.textMuted }}>E-mail</p>
                    <p className="font-semibold" style={{ color: theme.colors.text }}>{email}</p>
                  </div>
                </a>
              )}
              
              {werkgebiedString && (
                <div 
                  className="flex items-center gap-4 p-4 rounded-2xl"
                  style={{ backgroundColor: theme.colors.backgroundAlt }}
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${palette.primary}15` }}
                  >
                    <span className="material-symbols-outlined" style={{ color: palette.primary }}>location_on</span>
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: theme.colors.textMuted }}>Werkgebied</p>
                    <p className="font-semibold" style={{ color: theme.colors.text }}>{werkgebiedString}</p>
                  </div>
                </div>
              )}
            </div>

            {content?.certificaten && content.certificaten.length > 0 && (
              <div className="mt-6">
                <ContactTrustBadges 
                  certificaten={content.certificaten}
                  accentColor={palette.accent || palette.primary}
                  textMutedColor={theme.colors.textMuted}
                  borderColor={theme.colors.border}
                />
              </div>
            )}
          </div>
          
          {/* Image with offset background */}
          <div className={`relative ${getRevealClass('left', 200)}`}>
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
                alt="Contact"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
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

// MINDOOR-2 - Bento grid met grote kaarten
function ContactMindoor2({ theme, palette, content, titel, intro, telefoon, email, werkgebied, naam, beroepLabel }: any) {
  const werkgebiedString = Array.isArray(werkgebied) ? werkgebied.join(', ') : werkgebied;
  
  return (
    <section 
      id="contact"
      className="py-20 lg:py-28"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Bento Grid */}
        <div className="grid md:grid-cols-3 gap-5">
          
          {/* Large title card - spanning 2 cols */}
          <div 
            className={`md:col-span-2 p-10 lg:p-14 rounded-3xl relative overflow-hidden ${getRevealClass('up')}`}
            style={{ backgroundColor: palette.primary }}
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-10" style={{ backgroundColor: 'white' }} />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full opacity-10" style={{ backgroundColor: 'white' }} />
            
            <span className="text-sm font-medium uppercase tracking-widest text-white/70">Contact</span>
            <h2 
              className="text-4xl sm:text-5xl lg:text-6xl text-white mt-4 leading-tight"
              style={{ fontFamily: theme.fonts.heading }}
            >
              {titel || 'Laten we'} <br/>
              <span className="italic" style={{ color: palette.accentLight || '#e07b5f' }}>kennismaken</span>
            </h2>
            <p className="mt-6 text-lg text-white/80 max-w-md">
              {intro || 'Neem vrijblijvend contact op. Ik reageer meestal binnen 24 uur.'}
            </p>
          </div>
          
          {/* Image card */}
          <div className={`rounded-3xl overflow-hidden h-[300px] lg:h-auto ${getRevealClass('up', 100)}`}>
            <img 
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
              alt="Contact"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Telefoon - accent kleur */}
          {telefoon && (
            <a 
              href={`tel:${telefoon}`}
              className={`group p-8 rounded-3xl flex flex-col justify-between min-h-[180px] transition-transform hover:scale-[1.02] ${getRevealClass('up', 200)}`}
              style={{ backgroundColor: palette.accent || '#d4644a' }}
            >
              <div className="flex justify-between items-start">
                <span className="text-white/70 text-sm font-medium uppercase tracking-wider">Bel me</span>
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <span className="material-symbols-outlined text-white">call</span>
                </div>
              </div>
              <p className="text-2xl sm:text-3xl text-white" style={{ fontFamily: theme.fonts.heading }}>{telefoon}</p>
            </a>
          )}

          {/* Email */}
          {email && (
            <a 
              href={`mailto:${email}`}
              className={`group p-8 rounded-3xl flex flex-col justify-between min-h-[180px] transition-transform hover:scale-[1.02] ${getRevealClass('up', 300)}`}
              style={{ backgroundColor: 'white' }}
            >
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium uppercase tracking-wider" style={{ color: theme.colors.textMuted }}>E-mail</span>
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${palette.accent || palette.primary}15` }}>
                  <span className="material-symbols-outlined" style={{ color: palette.accent || palette.primary }}>mail</span>
                </div>
              </div>
              <p className="text-xl sm:text-2xl" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>{email}</p>
            </a>
          )}

          {/* Werkgebied + Trust badges */}
          <div 
            className={`p-8 rounded-3xl flex flex-col justify-between min-h-[180px] ${getRevealClass('up', 400)}`}
            style={{ backgroundColor: theme.colors.backgroundAlt }}
          >
            <div>
              <span className="text-sm font-medium uppercase tracking-wider" style={{ color: theme.colors.textMuted }}>Werkgebied</span>
              <p className="text-xl mt-2" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>
                {werkgebiedString || 'Op aanvraag'}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {content?.certificaten && content.certificaten.length > 0 ? (
                content.certificaten.slice(0, 3).map((cert: any, i: number) => (
                  <span 
                    key={i}
                    className="px-3 py-1 text-xs font-medium rounded-full"
                    style={{ backgroundColor: 'white', color: palette.primary }}
                  >
                    {cert.type === 'big' ? 'BIG' : cert.type === 'kvk' ? 'KvK' : cert.type === 'verzekering' ? 'Verzekerd' : cert.type} ✓
                  </span>
                ))
              ) : (
                <>
                  <span className="px-3 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: 'white', color: palette.primary }}>BIG ✓</span>
                  <span className="px-3 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: 'white', color: palette.primary }}>KvK ✓</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// MINDOOR-3 - Split met persoonlijke quote
function ContactMindoor3({ theme, palette, content, titel, intro, telefoon, email, werkgebied, naam, beroepLabel }: any) {
  const werkgebiedString = Array.isArray(werkgebied) ? werkgebied.join(', ') : werkgebied;
  const displayName = naam?.split(' ')[0] || 'Ik';
  
  return (
    <section 
      id="contact"
      className="py-20 lg:py-28"
      style={{ backgroundColor: 'white' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Links - Afbeelding met quote overlay */}
          <div className={`relative ${getRevealClass('right')}`}>
            <div className="rounded-3xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
                alt="Contact"
                className="w-full aspect-[4/5] object-cover"
              />
            </div>
            <div 
              className="absolute -bottom-6 -right-6 lg:right-auto lg:-left-6 max-w-[280px] p-6 rounded-2xl shadow-xl"
              style={{ backgroundColor: palette.primary }}
            >
              <svg className="w-8 h-8 mb-3 opacity-30 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
              </svg>
              <p className="text-lg text-white/90 leading-relaxed italic">
                Ik kijk uit naar ons gesprek en help je graag verder.
              </p>
              <p className="mt-3 text-sm font-medium" style={{ color: palette.accentLight || '#e07b5f' }}>— {displayName}</p>
            </div>
          </div>
          
          {/* Rechts - Contact info */}
          <div className={`flex flex-col justify-center lg:pl-8 ${getRevealClass('left', 200)}`}>
            <span className="text-sm font-medium uppercase tracking-widest mb-4" style={{ color: palette.accent || '#d4644a' }}>Contact</span>
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {titel || 'Neem gerust'}<br/>
              <span className="italic" style={{ color: palette.accent || '#d4644a' }}>contact</span> op
            </h2>
            <p className="text-lg mb-10" style={{ color: theme.colors.textMuted }}>
              {intro || 'Benieuwd hoe ik je kan helpen? Neem vrijblijvend contact op.'}
            </p>

            {/* Contact items - grotere typografie */}
            <div className="space-y-6 mb-10">
              {telefoon && (
                <a href={`tel:${telefoon}`} className="group flex items-center gap-5">
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center transition-colors"
                    style={{ backgroundColor: `${palette.primary}15` }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${palette.primary}25`}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `${palette.primary}15`}
                  >
                    <span className="material-symbols-outlined text-2xl" style={{ color: palette.primary }}>call</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: theme.colors.textMuted }}>Bel me</p>
                    <p className="text-2xl" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>{telefoon}</p>
                  </div>
                </a>
              )}

              {email && (
                <a href={`mailto:${email}`} className="group flex items-center gap-5">
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center transition-colors"
                    style={{ backgroundColor: `${palette.accent || palette.primary}15` }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${palette.accent || palette.primary}25`}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `${palette.accent || palette.primary}15`}
                  >
                    <span className="material-symbols-outlined text-2xl" style={{ color: palette.accent || palette.primary }}>mail</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: theme.colors.textMuted }}>E-mail</p>
                    <p className="text-2xl" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>{email}</p>
                  </div>
                </a>
              )}

              {werkgebiedString && (
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${palette.primary}15` }}>
                    <span className="material-symbols-outlined text-2xl" style={{ color: palette.primary }}>location_on</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: theme.colors.textMuted }}>Werkgebied</p>
                    <p className="text-2xl" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>{werkgebiedString}</p>
                  </div>
                </div>
              )}
            </div>

            {content?.certificaten && content.certificaten.length > 0 && (
              <ContactTrustBadges 
                certificaten={content.certificaten}
                accentColor={palette.accent || palette.primary}
                textMutedColor={theme.colors.textMuted}
                borderColor={theme.colors.border}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// ============================================
// SERENE VARIANTEN
// ============================================
// ============================================

// ============================================
// SERENE V1 — Typografisch Statement
// Oversized heading left, minimal contact list right
// ============================================

function ContactSerene({ theme, palette, content, titel, intro, telefoon, email, werkgebied, naam, beroepLabel }: any) {
  const werkgebiedString = Array.isArray(werkgebied) ? werkgebied.join(', ') : werkgebied;
  
  return (
    <section 
      id="contact"
      className="py-24 lg:py-32"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        
        {/* Top micro label met lijn */}
        <div className={`flex items-center gap-4 mb-20 ${getRevealClass('up')}`}>
          <span 
            className="text-[9px] font-medium uppercase tracking-[2px]"
            style={{ color: theme.colors.textMuted }}
          >
            Contact
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: theme.colors.border }} />
        </div>
        
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-6">
          
          {/* Left: Oversized Typography (7 cols) */}
          <div className={`lg:col-span-7 lg:pr-12 ${getRevealClass('left')}`}>
            <h2 
              className="text-5xl md:text-6xl lg:text-[72px] font-normal leading-[1.05] mb-8"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              Laten we<br />
              samen<br />
              <em className="italic" style={{ color: palette.primary }}>praten</em>
            </h2>
            
            <p 
              className="text-base leading-relaxed max-w-sm"
              style={{ color: theme.colors.textMuted }}
            >
              {intro}
            </p>
          </div>
          
          {/* Right: Contact als pure typografie (5 cols) */}
          <div 
            className={`lg:col-span-5 lg:border-l lg:pl-12 ${getRevealClass('right')}`}
            style={{ borderColor: theme.colors.border }}
          >
            
            <div className="space-y-10">
              
              {/* Telefoon */}
              {telefoon && (
                <a href={`tel:${telefoon}`} className="block group">
                  <span 
                    className="text-[9px] font-medium uppercase tracking-[2px] block mb-2"
                    style={{ color: theme.colors.textMuted }}
                  >
                    Telefoon
                  </span>
                  <span 
                    className="text-3xl md:text-4xl inline-block relative"
                    style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                  >
                    {telefoon}
                    <span 
                      className="absolute bottom-0 left-0 w-0 group-hover:w-full h-px transition-all duration-300"
                      style={{ backgroundColor: palette.primary }}
                    />
                  </span>
                </a>
              )}
              
              {/* Email */}
              {email && (
                <a href={`mailto:${email}`} className="block group">
                  <span 
                    className="text-[9px] font-medium uppercase tracking-[2px] block mb-2"
                    style={{ color: theme.colors.textMuted }}
                  >
                    E-mail
                  </span>
                  <span 
                    className="text-2xl md:text-3xl inline-block relative"
                    style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                  >
                    {email}
                    <span 
                      className="absolute bottom-0 left-0 w-0 group-hover:w-full h-px transition-all duration-300"
                      style={{ backgroundColor: palette.primary }}
                    />
                  </span>
                </a>
              )}
              
              {/* Werkgebied */}
              {werkgebiedString && (
                <div>
                  <span 
                    className="text-[9px] font-medium uppercase tracking-[2px] block mb-2"
                    style={{ color: theme.colors.textMuted }}
                  >
                    Werkgebied
                  </span>
                  <span style={{ color: theme.colors.textMuted }}>
                    {werkgebiedString}
                  </span>
                </div>
              )}
              
            </div>
            
            {/* Trust - inline, subtle */}
            {content?.certificaten && content.certificaten.length > 0 ? (
              <div 
                className="mt-16 pt-8 border-t"
                style={{ borderColor: theme.colors.border }}
              >
                <ContactTrustBadges 
                  certificaten={content.certificaten}
                  accentColor={palette.primary}
                  textMutedColor={theme.colors.textMuted}
                  borderColor={theme.colors.border}
                />
              </div>
            ) : (
              <div 
                className="mt-16 pt-8 border-t flex flex-wrap gap-x-6 gap-y-2 text-[10px] uppercase tracking-[1px]"
                style={{ borderColor: theme.colors.border, color: theme.colors.textMuted }}
              >
                <span>BIG Geregistreerd</span>
                <span>KvK</span>
                <span>Verzekerd</span>
              </div>
            )}
            
          </div>
          
        </div>
      </div>
    </section>
  );
}


// ============================================
// SERENE V2 — Asymmetrische Split
// Image 5 cols with organic edge, content 7 cols
// ============================================

function ContactSerene2({ theme, palette, content, titel, intro, telefoon, email, werkgebied, naam, beroepLabel }: any) {
  const werkgebiedString = Array.isArray(werkgebied) ? werkgebied.join(', ') : werkgebied;
  
  return (
    <section 
      id="contact"
      className="py-24 lg:py-32"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-end">
          
          {/* Left: Image (5 cols) met organische hoek */}
          <div className={`lg:col-span-5 ${getRevealClass('left')}`}>
            <div className="relative">
              <img 
                src={content?.foto || "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=750&fit=crop"}
                alt="Contact"
                className="w-full h-[400px] lg:h-[550px] object-cover"
                style={{ borderRadius: '0 80px 0 0' }}
              />
              {/* Naam overlay onderaan */}
              {naam && (
                <div className="absolute bottom-0 left-0 p-6">
                  <p 
                    className="text-xl italic text-white drop-shadow-lg"
                    style={{ fontFamily: theme.fonts.heading }}
                  >
                    {naam}
                  </p>
                  {beroepLabel && (
                    <p className="text-sm text-white/80 drop-shadow-lg">{beroepLabel}</p>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Right: Content (7 cols) */}
          <div className={`lg:col-span-7 lg:pl-8 ${getRevealClass('right')}`}>
            
            {/* Micro label */}
            <span 
              className="text-[9px] font-medium uppercase tracking-[2px] block mb-6"
              style={{ color: theme.colors.textMuted }}
            >
              Neem Contact Op
            </span>
            
            <h2 
              className="text-4xl md:text-5xl lg:text-[56px] font-normal leading-[1.1] mb-6"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              Ik hoor graag<br />
              van <em className="italic" style={{ color: palette.primary }}>u</em>
            </h2>
            
            <div className="w-16 h-px mb-8" style={{ backgroundColor: theme.colors.border }} />
            
            <p 
              className="text-base leading-relaxed mb-12 max-w-md"
              style={{ color: theme.colors.textMuted }}
            >
              {intro}
            </p>
            
            {/* Contact - horizontal grid, pure text */}
            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8 mb-12">
              
              {telefoon && (
                <a href={`tel:${telefoon}`} className="block group">
                  <span 
                    className="text-[9px] font-medium uppercase tracking-[2px] block mb-2"
                    style={{ color: theme.colors.textMuted }}
                  >
                    Bel mij
                  </span>
                  <span 
                    className="text-2xl inline-block relative"
                    style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                  >
                    {telefoon}
                    <span 
                      className="absolute bottom-0 left-0 w-0 group-hover:w-full h-px transition-all duration-300"
                      style={{ backgroundColor: palette.primary }}
                    />
                  </span>
                </a>
              )}
              
              {email && (
                <a href={`mailto:${email}`} className="block group">
                  <span 
                    className="text-[9px] font-medium uppercase tracking-[2px] block mb-2"
                    style={{ color: theme.colors.textMuted }}
                  >
                    E-mail
                  </span>
                  <span 
                    className="text-xl inline-block relative"
                    style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
                  >
                    {email}
                    <span 
                      className="absolute bottom-0 left-0 w-0 group-hover:w-full h-px transition-all duration-300"
                      style={{ backgroundColor: palette.primary }}
                    />
                  </span>
                </a>
              )}
              
            </div>
            
            {/* Werkgebied + Trust samen */}
            <div className="pt-8 border-t" style={{ borderColor: theme.colors.border }}>
              <div 
                className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm"
                style={{ color: theme.colors.textMuted }}
              >
                {werkgebiedString && (
                  <>
                    <span className="flex items-center gap-2">
                      <span style={{ color: palette.primary }}>◉</span>
                      {werkgebiedString}
                    </span>
                    <span className="hidden sm:inline" style={{ color: theme.colors.border }}>|</span>
                  </>
                )}
                {content?.certificaten && content.certificaten.length > 0 ? (
                  content.certificaten.slice(0, 3).map((cert: any, i: number) => (
                    <span 
                      key={i}
                      className="text-[10px] uppercase tracking-[1px]"
                      style={{ color: theme.colors.textMuted }}
                    >
                      {cert.type === 'big' ? 'BIG' : cert.type === 'kvk' ? 'KvK' : cert.type === 'verzekering' ? 'Verzekerd' : cert.type}
                    </span>
                  ))
                ) : (
                  <>
                    <span className="text-[10px] uppercase tracking-[1px]">BIG</span>
                    <span className="text-[10px] uppercase tracking-[1px]">KvK</span>
                    <span className="text-[10px] uppercase tracking-[1px]">Verzekerd</span>
                  </>
                )}
              </div>
            </div>
            
          </div>
          
        </div>
      </div>
    </section>
  );
}


// ============================================
// SERENE V3 — Full Banner Typografisch
// Dark background, centered, pure typography
// ============================================

function ContactSerene3({ theme, palette, content, titel, intro, telefoon, email, werkgebied, naam, beroepLabel }: any) {
  const werkgebiedString = Array.isArray(werkgebied) ? werkgebied.join(', ') : werkgebied;
  
  // Lighter accent for dark background
  const accentLight = palette.primaryLight || '#a8b5a8';
  
  return (
    <section 
      id="contact"
      className="relative overflow-hidden"
      style={{ backgroundColor: palette.primary }}
    >
      
      {/* Subtle radial gradient overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 70%)' }}
      />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 py-28 lg:py-36">
        
        {/* Centered header */}
        <div className={`text-center mb-16 ${getRevealClass('up')}`}>
          <span className="text-[9px] font-medium uppercase tracking-[2px] mb-6 block text-white/50">
            Contact
          </span>
          
          <h2 
            className="text-5xl md:text-6xl lg:text-[72px] font-normal text-white mb-8 leading-[1.05]"
            style={{ fontFamily: theme.fonts.heading }}
          >
            Klaar om kennis<br />
            te <em className="italic" style={{ color: accentLight }}>maken</em>?
          </h2>
          
          <div className="w-16 h-px mx-auto mb-8" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
          
          <p className="text-base text-white/60 max-w-lg mx-auto leading-relaxed">
            {intro}
          </p>
        </div>
        
        {/* Contact als typografie - horizontal */}
        <div className={`flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-16 mb-16 ${getRevealClass('up', 200)}`}>
          
          {telefoon && (
            <a href={`tel:${telefoon}`} className="group text-center">
              <span className="text-[9px] font-medium uppercase tracking-[2px] block mb-2 text-white/40">
                Telefoon
              </span>
              <span 
                className="text-3xl md:text-4xl text-white relative inline-block"
                style={{ fontFamily: theme.fonts.heading }}
              >
                {telefoon}
                <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-px bg-white/50 transition-all duration-300" />
              </span>
            </a>
          )}
          
          {telefoon && email && (
            <div className="hidden sm:block w-px h-16" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }} />
          )}
          
          {email && (
            <a href={`mailto:${email}`} className="group text-center">
              <span className="text-[9px] font-medium uppercase tracking-[2px] block mb-2 text-white/40">
                E-mail
              </span>
              <span 
                className="text-2xl md:text-3xl text-white relative inline-block"
                style={{ fontFamily: theme.fonts.heading }}
              >
                {email}
                <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-px bg-white/50 transition-all duration-300" />
              </span>
            </a>
          )}
          
        </div>
        
        {/* Bottom: Werkgebied + Trust in one line */}
        <div 
          className={`text-center pt-8 border-t ${getRevealClass('up', 400)}`}
          style={{ borderColor: 'rgba(255,255,255,0.1)' }}
        >
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-[10px] uppercase tracking-[1px] text-white/40">
            {werkgebiedString && (
              <>
                <span className="flex items-center gap-2">
                  <span style={{ color: accentLight }}>◉</span>
                  {werkgebiedString}
                </span>
                <span className="hidden sm:inline">—</span>
              </>
            )}
            {content?.certificaten && content.certificaten.length > 0 ? (
              content.certificaten.slice(0, 3).map((cert: any, i: number) => (
                <span key={i}>
                  {cert.type === 'big' ? 'BIG Geregistreerd' : cert.type === 'kvk' ? 'KvK' : cert.type === 'verzekering' ? 'Verzekerd' : cert.type}
                </span>
              ))
            ) : (
              <>
                <span>BIG Geregistreerd</span>
                <span>KvK</span>
                <span>Verzekerd</span>
              </>
            )}
          </div>
        </div>
        
      </div>
    </section>
  );
}

// SPLIT - Twee kolommen met CTA card (legacy)
function ContactSplit({ theme, palette, content, titel, intro, telefoon, email, werkgebied, beroepLabel }: any) {
  const werkgebiedString = Array.isArray(werkgebied) ? werkgebied.join(', ') : werkgebied;
  
  return (
    <section 
      id="contact"
      className="py-20 md:py-28 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          <div className={getRevealClass('left')}>
            <h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {titel}
            </h2>
            <p className="mb-8 leading-relaxed" style={{ color: theme.colors.textMuted }}>{intro}</p>
            
            <div className="space-y-4">
              {telefoon && (
                <a 
                  href={`tel:${telefoon}`}
                  className="flex items-center gap-3 p-4 rounded-lg transition-colors"
                  style={{ backgroundColor: theme.colors.surface }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                    style={{ backgroundColor: `${palette.primary}15` }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${palette.primary}25`}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `${palette.primary}15`}
                  >
                    <span className="material-symbols-outlined" style={{ color: palette.primary }}>call</span>
                  </div>
                  <span style={{ color: theme.colors.text }}>{telefoon}</span>
                </a>
              )}
              {email && (
                <a 
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 p-4 rounded-lg transition-colors"
                  style={{ backgroundColor: theme.colors.surface }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                    style={{ backgroundColor: `${palette.primary}15` }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${palette.primary}25`}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `${palette.primary}15`}
                  >
                    <span className="material-symbols-outlined" style={{ color: palette.primary }}>mail</span>
                  </div>
                  <span style={{ color: theme.colors.text }}>{email}</span>
                </a>
              )}
              {werkgebiedString && (
                <div className="flex items-center gap-3 p-4 rounded-lg" style={{ backgroundColor: theme.colors.surface }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${palette.primary}15` }}>
                    <span className="material-symbols-outlined" style={{ color: palette.primary }}>location_on</span>
                  </div>
                  <span style={{ color: theme.colors.text }}>{werkgebiedString}</span>
                </div>
              )}
            </div>

            {content?.certificaten && content.certificaten.length > 0 && (
              <div className="mt-6">
                <ContactTrustBadges 
                  certificaten={content.certificaten}
                  accentColor={palette.primary}
                  textMutedColor={theme.colors.textMuted}
                  borderColor={theme.colors.border}
                />
              </div>
            )}
          </div>
          
          <div className={getRevealClass('right')}>
            <div className="p-8 rounded-2xl" style={{ backgroundColor: theme.colors.surface }}>
              <h3 className="text-xl font-bold mb-4" style={{ color: theme.colors.text }}>Direct contact opnemen</h3>
              <p className="text-sm mb-6" style={{ color: theme.colors.textMuted }}>
                Stuur me een bericht en ik neem zo snel mogelijk contact met u op.
              </p>
              {email && (
                <a 
                  href={`mailto:${email}?subject=Samenwerking ${beroepLabel || 'Zorgprofessional'}`}
                  className="w-full h-12 rounded-lg text-white font-bold flex items-center justify-center gap-2 transition-colors"
                  style={{ backgroundColor: palette.primary }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = palette.primaryDark || palette.primaryHover}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = palette.primary}
                >
                  <span className="material-symbols-outlined">mail</span>
                  Stuur email
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// CENTERED - Gecentreerde layout (legacy)
function ContactCentered({ theme, palette, content, titel, intro, telefoon, email, werkgebied }: any) {
  const werkgebiedString = Array.isArray(werkgebied) ? werkgebied.join(', ') : werkgebied;
  
  return (
    <section 
      id="contact"
      className="py-20 md:py-28 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className={`max-w-2xl mx-auto text-center ${getRevealClass('up')}`}>
        <h2 
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
        >
          {titel}
        </h2>
        <p className="mb-10" style={{ color: theme.colors.textMuted }}>{intro}</p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {telefoon && (
            <a 
              href={`tel:${telefoon}`}
              className="flex items-center gap-2 px-5 py-3 rounded-full border transition-colors"
              style={{ borderColor: theme.colors.border, color: theme.colors.text }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${palette.primary}10`;
                e.currentTarget.style.borderColor = palette.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = theme.colors.border;
              }}
            >
              <span className="material-symbols-outlined" style={{ color: palette.primary }}>call</span>
              {telefoon}
            </a>
          )}
          {email && (
            <a 
              href={`mailto:${email}`}
              className="flex items-center gap-2 px-5 py-3 rounded-full border transition-colors"
              style={{ borderColor: theme.colors.border, color: theme.colors.text }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${palette.primary}10`;
                e.currentTarget.style.borderColor = palette.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = theme.colors.border;
              }}
            >
              <span className="material-symbols-outlined" style={{ color: palette.primary }}>mail</span>
              {email}
            </a>
          )}
        </div>
        
        {werkgebiedString && (
          <p className="text-sm mb-6" style={{ color: theme.colors.textMuted }}>
            <span className="material-symbols-outlined text-sm align-middle mr-1" style={{ color: palette.primary }}>location_on</span>
            Werkgebied: {werkgebiedString}
          </p>
        )}

        {content?.certificaten && content.certificaten.length > 0 && (
          <div className="flex justify-center">
            <ContactTrustBadges 
              certificaten={content.certificaten}
              accentColor={palette.primary}
              textMutedColor={theme.colors.textMuted}
              borderColor={theme.colors.border}
            />
          </div>
        )}
      </div>
    </section>
  );
}

// FORM-ONLY - Simpele email CTA (legacy)
function ContactFormOnly({ theme, palette, titel, intro, email, beroepLabel }: any) {
  return (
    <section 
      id="contact"
      className="py-20 md:py-28 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className={`max-w-xl mx-auto ${getRevealClass('up')}`}>
        <div 
          className="p-8 md:p-10 rounded-2xl border"
          style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }}
        >
          <h2 
            className="text-2xl md:text-3xl font-bold mb-4 text-center"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            {titel}
          </h2>
          <p className="text-center mb-8" style={{ color: theme.colors.textMuted }}>{intro}</p>
          
          {email && (
            <a 
              href={`mailto:${email}?subject=Samenwerking ${beroepLabel || 'Zorgprofessional'}`}
              className="w-full h-14 rounded-lg text-white font-bold text-lg flex items-center justify-center gap-2 transition-colors"
              style={{ backgroundColor: palette.primary }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = palette.primaryDark || palette.primaryHover}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = palette.primary}
            >
              <span className="material-symbols-outlined">mail</span>
              Neem contact op
            </a>
          )}
        </div>
      </div>
    </section>
  );
}


export default ContactSection;