// components/templates/sections/ContactSection.tsx
// Contact sectie

'use client';

import { BaseSectionProps, ContactStyle, getRevealClass } from './types';

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
  
  switch (style) {
    case 'editorial':
      return <ContactEditorial {...{ theme, palette, titel, intro, telefoon, email, werkgebied, naam, beroepLabel }} />;
    case 'proactief':
      return <ContactProactief {...{ theme, palette, titel, intro, telefoon, email, werkgebied, naam }} />;
    case 'portfolio':
      return <ContactPortfolio {...{ theme, palette, titel, intro, telefoon, email, werkgebied, naam }} />;
    case 'mindoor':
      return <ContactMindoor {...{ theme, palette, titel, intro, telefoon, email, werkgebied, naam }} />;
    case 'split':
      return <ContactSplit {...{ theme, palette, titel, intro, telefoon, email, werkgebied }} />;
    case 'centered':
      return <ContactCentered {...{ theme, palette, titel, intro, telefoon, email, werkgebied }} />;
    case 'form-only':
      return <ContactFormOnly {...{ theme, palette, titel, intro, email }} />;
    default:
      return <ContactEditorial {...{ theme, palette, titel, intro, telefoon, email, werkgebied, naam, beroepLabel }} />;
  }
}

// ============================================
// EDITORIAL - Origineel uit HTML template
// Split layout, contact items links, interest card rechts
// ============================================
function ContactEditorial({ theme, palette, titel, intro, telefoon, email, werkgebied, naam, beroepLabel }: any) {
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
              
              {/* Telefoon */}
              {telefoon && (
                <a 
                  href={`tel:${telefoon}`} 
                  className="flex items-center gap-4 group"
                >
                  <span 
                    className="material-symbols-outlined"
                    style={{ color: palette.primary }}
                  >
                    call
                  </span>
                  <div>
                    <p 
                      className="text-xs uppercase font-semibold tracking-widest"
                      style={{ color: theme.colors.textMuted }}
                    >
                      Telefoon
                    </p>
                    <p 
                      className="text-lg transition-colors group-hover:text-[var(--hover-color)]"
                      style={{ 
                        color: theme.colors.text,
                        ['--hover-color' as string]: palette.primary
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = palette.primary}
                      onMouseLeave={(e) => e.currentTarget.style.color = theme.colors.text}
                    >
                      {telefoon}
                    </p>
                  </div>
                </a>
              )}
              
              {/* Email */}
              {email && (
                <a 
                  href={`mailto:${email}`} 
                  className="flex items-center gap-4 group"
                >
                  <span 
                    className="material-symbols-outlined"
                    style={{ color: palette.primary }}
                  >
                    mail
                  </span>
                  <div>
                    <p 
                      className="text-xs uppercase font-semibold tracking-widest"
                      style={{ color: theme.colors.textMuted }}
                    >
                      Email
                    </p>
                    <p 
                      className="text-lg transition-colors"
                      style={{ color: theme.colors.text }}
                      onMouseEnter={(e) => e.currentTarget.style.color = palette.primary}
                      onMouseLeave={(e) => e.currentTarget.style.color = theme.colors.text}
                    >
                      {email}
                    </p>
                  </div>
                </a>
              )}
              
              {/* Werkgebied */}
              {werkgebiedString && (
                <div className="flex items-center gap-4">
                  <span 
                    className="material-symbols-outlined"
                    style={{ color: palette.primary }}
                  >
                    location_on
                  </span>
                  <div>
                    <p 
                      className="text-xs uppercase font-semibold tracking-widest"
                      style={{ color: theme.colors.textMuted }}
                    >
                      Werkgebied
                    </p>
                    <p 
                      className="text-lg"
                      style={{ color: theme.colors.text }}
                    >
                      {werkgebiedString}
                    </p>
                  </div>
                </div>
              )}
              
            </div>
          </div>
          
          {/* Right - Interest Card */}
          <div className={`flex-1 ${getRevealClass('right')}`}>
            <div 
              className="p-8 lg:p-10 rounded-lg flex flex-col gap-6 border"
              style={{ 
                backgroundColor: theme.colors.backgroundAlt,
                borderColor: theme.colors.border
              }}
            >
              
              <h3 
                className="text-2xl"
                style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
              >
                Interesse in samenwerking?
              </h3>
              
              <p 
                className="text-sm leading-relaxed"
                style={{ color: theme.colors.textMuted }}
              >
                Ik werk voor zorginstellingen, thuiszorgorganisaties en particulieren met een PGB. 
                Flexibel inzetbaar op korte en lange termijn.
              </p>
              
              {/* Checkmarks */}
              <ul className="space-y-3 text-sm" style={{ color: theme.colors.text }}>
                <li className="flex items-center gap-2">
                  <span 
                    className="material-symbols-outlined text-lg"
                    style={{ color: palette.primary }}
                  >
                    check
                  </span>
                  Flexibele inzet en beschikbaarheid
                </li>
                <li className="flex items-center gap-2">
                  <span 
                    className="material-symbols-outlined text-lg"
                    style={{ color: palette.primary }}
                  >
                    check
                  </span>
                  ZZP met eigen KVK en verzekeringen
                </li>
                <li className="flex items-center gap-2">
                  <span 
                    className="material-symbols-outlined text-lg"
                    style={{ color: palette.primary }}
                  >
                    check
                  </span>
                  Snel ingewerkt, zelfstandig werkend
                </li>
              </ul>
              
              {/* CTA Button */}
              {email && (
                <a 
                  href={`mailto:${email}?subject=Samenwerking ${beroepLabel || 'Zorgprofessional'}`}
                  className="w-full h-12 rounded text-white text-sm font-semibold uppercase tracking-widest transition-colors flex items-center justify-center"
                  style={{ backgroundColor: palette.primary }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = palette.primaryHover}
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
// PROACTIEF - Modern split layout met icons
// ============================================
function ContactProactief({ theme, palette, titel, intro, telefoon, email, werkgebied, naam }: any) {
  const werkgebiedString = Array.isArray(werkgebied) ? werkgebied.join(', ') : werkgebied;
  
  return (
    <section 
      id="contact"
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
            Neem contact op
          </span>
          <h2 
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: theme.fonts.heading, color: palette.primaryDark || palette.primary }}
          >
            {titel}
          </h2>
          <p 
            className="text-[15px] leading-relaxed"
            style={{ color: theme.colors.textMuted }}
          >
            {intro}
          </p>
        </div>
        
        {/* Contact Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Telefoon */}
          {telefoon && (
            <a 
              href={`tel:${telefoon}`}
              className={`bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] text-center transition-transform hover:-translate-y-1 ${getRevealClass('up', 100)}`}
            >
              <div 
                className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: palette.primaryLight || `${palette.primary}15` }}
              >
                <svg 
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill={palette.primary}
                >
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </div>
              <p 
                className="text-lg font-semibold"
                style={{ color: theme.colors.text }}
              >
                {telefoon}
              </p>
              <p 
                className="text-sm mt-1"
                style={{ color: theme.colors.textMuted }}
              >
                Bel ons
              </p>
            </a>
          )}
          
          {/* Email */}
          {email && (
            <a 
              href={`mailto:${email}`}
              className={`bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] text-center transition-transform hover:-translate-y-1 ${getRevealClass('up', 200)}`}
            >
              <div 
                className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: palette.primaryLight || `${palette.primary}15` }}
              >
                <svg 
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill={palette.primary}
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <p 
                className="text-lg font-semibold"
                style={{ color: theme.colors.text }}
              >
                E-mail
              </p>
              <p 
                className="text-sm mt-1"
                style={{ color: theme.colors.textMuted }}
              >
                {email}
              </p>
            </a>
          )}
          
          {/* Locatie */}
          {werkgebiedString && (
            <div 
              className={`bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] text-center ${getRevealClass('up', 300)}`}
            >
              <div 
                className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: palette.primaryLight || `${palette.primary}15` }}
              >
                <svg 
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill={palette.primary}
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <p 
                className="text-lg font-semibold"
                style={{ color: theme.colors.text }}
              >
                Werkgebied
              </p>
              <p 
                className="text-sm mt-1"
                style={{ color: theme.colors.textMuted }}
              >
                {werkgebiedString}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ============================================
// PORTFOLIO - (Combined with CTA in portfolio template, minimal section)
// ============================================
function ContactPortfolio({ theme, palette, titel, intro, telefoon, email, werkgebied, naam }: any) {
  const werkgebiedString = Array.isArray(werkgebied) ? werkgebied.join(', ') : werkgebied;
  
  return (
    <section 
      id="contact"
      className="py-28 px-8 md:px-12"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          
          {/* Contact Info */}
          <div className={getRevealClass('right')}>
            <span 
              className="text-[13px] font-semibold uppercase tracking-[2px] mb-4 block"
              style={{ color: palette.accent || palette.primary }}
            >
              Contact
            </span>
            <h2 
              className="text-[42px] font-semibold leading-[1.2] mb-6"
              style={{ fontFamily: theme.fonts.heading, color: palette.primary }}
            >
              Neem <em className="italic" style={{ color: palette.accent || palette.primary }}>contact</em> op
            </h2>
            <p 
              className="text-base leading-[1.8] mb-8"
              style={{ color: theme.colors.textMuted }}
            >
              {intro}
            </p>
            
            {/* Contact Items */}
            <div className="space-y-4">
              {email && (
                <a 
                  href={`mailto:${email}`}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl transition-shadow hover:shadow-md"
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: theme.colors.backgroundAlt }}
                  >
                    <svg className="w-5 h-5" fill={palette.primary} viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">E-mail</p>
                    <p className="font-semibold" style={{ color: palette.primary }}>{email}</p>
                  </div>
                </a>
              )}
              
              {telefoon && (
                <a 
                  href={`tel:${telefoon}`}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl transition-shadow hover:shadow-md"
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: theme.colors.backgroundAlt }}
                  >
                    <svg className="w-5 h-5" fill={palette.primary} viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Telefoon</p>
                    <p className="font-semibold" style={{ color: palette.primary }}>{telefoon}</p>
                  </div>
                </a>
              )}
              
              {werkgebiedString && (
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: theme.colors.backgroundAlt }}
                  >
                    <svg className="w-5 h-5" fill={palette.primary} viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Werkgebied</p>
                    <p className="font-semibold" style={{ color: palette.primary }}>{werkgebiedString}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Image */}
          <div className={getRevealClass('left', 200)}>
            <img 
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=500&fit=crop"
              alt="Contact"
              className="w-full h-[400px] object-cover rounded-[30px]"
            />
          </div>
          
        </div>
      </div>
    </section>
  );
}

// ============================================
// MINDOOR - Simple contact details with icons
// ============================================
function ContactMindoor({ theme, palette, titel, intro, telefoon, email, werkgebied, naam }: any) {
  const werkgebiedString = Array.isArray(werkgebied) ? werkgebied.join(', ') : werkgebied;
  
  return (
    <section 
      id="contact"
      className="py-20 lg:py-32"
      style={{ backgroundColor: 'white' }}
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
                  className="flex items-center gap-4 p-4 rounded-2xl transition-colors hover:bg-gray-50"
                  style={{ backgroundColor: theme.colors.backgroundAlt }}
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${palette.primary}15` }}
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
                  className="flex items-center gap-4 p-4 rounded-2xl transition-colors hover:bg-gray-50"
                  style={{ backgroundColor: theme.colors.backgroundAlt }}
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${palette.accent || palette.primary}15` }}
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
          </div>
          
          {/* Image */}
          <div className={`relative ${getRevealClass('left', 200)}`}>
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
                alt="Contact"
                className="w-full aspect-[4/3] object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            {/* Offset bg */}
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
// SPLIT - Twee kolommen met form
// ============================================
function ContactSplit({ theme, palette, titel, intro, telefoon, email, werkgebied }: any) {
  const werkgebiedString = Array.isArray(werkgebied) ? werkgebied.join(', ') : werkgebied;
  
  return (
    <section 
      id="contact"
      className="py-20 md:py-28 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Left - Info */}
          <div className={getRevealClass('left')}>
            <h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {titel}
            </h2>
            <p 
              className="mb-8 leading-relaxed"
              style={{ color: theme.colors.textMuted }}
            >
              {intro}
            </p>
            
            {/* Contact details */}
            <div className="space-y-4">
              {telefoon && (
                <a 
                  href={`tel:${telefoon}`}
                  className="flex items-center gap-3 p-4 rounded-lg transition-colors"
                  style={{ backgroundColor: theme.colors.surface }}
                >
                  <span 
                    className="material-symbols-outlined"
                    style={{ color: palette.primary }}
                  >
                    call
                  </span>
                  <span style={{ color: theme.colors.text }}>{telefoon}</span>
                </a>
              )}
              {email && (
                <a 
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 p-4 rounded-lg transition-colors"
                  style={{ backgroundColor: theme.colors.surface }}
                >
                  <span 
                    className="material-symbols-outlined"
                    style={{ color: palette.primary }}
                  >
                    mail
                  </span>
                  <span style={{ color: theme.colors.text }}>{email}</span>
                </a>
              )}
              {werkgebiedString && (
                <div 
                  className="flex items-center gap-3 p-4 rounded-lg"
                  style={{ backgroundColor: theme.colors.surface }}
                >
                  <span 
                    className="material-symbols-outlined"
                    style={{ color: palette.primary }}
                  >
                    location_on
                  </span>
                  <span style={{ color: theme.colors.text }}>{werkgebiedString}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Right - CTA Card */}
          <div className={getRevealClass('right')}>
            <div 
              className="p-8 rounded-2xl"
              style={{ backgroundColor: theme.colors.surface }}
            >
              <h3 
                className="text-xl font-bold mb-4"
                style={{ color: theme.colors.text }}
              >
                Direct contact opnemen
              </h3>
              <p 
                className="text-sm mb-6"
                style={{ color: theme.colors.textMuted }}
              >
                Stuur me een bericht en ik neem zo snel mogelijk contact met u op.
              </p>
              {email && (
                <a 
                  href={`mailto:${email}`}
                  className="w-full h-12 rounded-lg text-white font-bold flex items-center justify-center gap-2 transition-colors"
                  style={{ backgroundColor: palette.primary }}
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

// ============================================
// CENTERED - Gecentreerde layout
// ============================================
function ContactCentered({ theme, palette, titel, intro, telefoon, email, werkgebied }: any) {
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
        <p 
          className="mb-10"
          style={{ color: theme.colors.textMuted }}
        >
          {intro}
        </p>
        
        {/* Contact methods */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {telefoon && (
            <a 
              href={`tel:${telefoon}`}
              className="flex items-center gap-2 px-6 py-3 rounded-full border transition-colors"
              style={{ borderColor: theme.colors.border, color: theme.colors.text }}
            >
              <span className="material-symbols-outlined" style={{ color: palette.primary }}>call</span>
              {telefoon}
            </a>
          )}
          {email && (
            <a 
              href={`mailto:${email}`}
              className="flex items-center gap-2 px-6 py-3 rounded-full border transition-colors"
              style={{ borderColor: theme.colors.border, color: theme.colors.text }}
            >
              <span className="material-symbols-outlined" style={{ color: palette.primary }}>mail</span>
              {email}
            </a>
          )}
        </div>
        
        {werkgebiedString && (
          <p 
            className="text-sm"
            style={{ color: theme.colors.textMuted }}
          >
            <span className="material-symbols-outlined text-sm align-middle mr-1" style={{ color: palette.primary }}>
              location_on
            </span>
            Werkgebied: {werkgebiedString}
          </p>
        )}
      </div>
    </section>
  );
}

// ============================================
// FORM-ONLY - Simpele email form focus
// ============================================
function ContactFormOnly({ theme, palette, titel, intro, email }: any) {
  return (
    <section 
      id="contact"
      className="py-20 md:py-28 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className={`max-w-xl mx-auto ${getRevealClass('up')}`}>
        <div 
          className="p-8 md:p-10 rounded-2xl border"
          style={{ 
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border
          }}
        >
          <h2 
            className="text-2xl md:text-3xl font-bold mb-4 text-center"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
          >
            {titel}
          </h2>
          <p 
            className="text-center mb-8"
            style={{ color: theme.colors.textMuted }}
          >
            {intro}
          </p>
          
          {email && (
            <a 
              href={`mailto:${email}`}
              className="w-full h-14 rounded-lg text-white font-bold text-lg flex items-center justify-center gap-2 transition-colors"
              style={{ backgroundColor: palette.primary }}
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
