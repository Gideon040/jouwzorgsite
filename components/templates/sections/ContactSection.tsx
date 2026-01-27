// components/templates/sections/ContactSection.tsx
// Contact section met 3 style varianten: split, centered, form-only

'use client';

import { BaseSectionProps, ContactStyle, getRevealClass } from './types';

interface ContactSectionProps extends BaseSectionProps {
  style: ContactStyle;
}

export function ContactSection({ style, theme, palette, content, generated }: ContactSectionProps) {
  const contactTitel = generated?.contact?.titel || 'Neem contact op';
  const contactIntro = generated?.contact?.intro || 'Klaar om de mogelijkheden te bespreken? Neem gerust contact op.';
  
  switch (style) {
    case 'split':
      return <ContactSplit {...{ theme, palette, content, contactTitel, contactIntro }} />;
    case 'centered':
      return <ContactCentered {...{ theme, palette, content, contactTitel, contactIntro }} />;
    case 'form-only':
      return <ContactFormOnly {...{ theme, palette, content, contactTitel, contactIntro }} />;
    default:
      return <ContactSplit {...{ theme, palette, content, contactTitel, contactIntro }} />;
  }
}

// Shared Contact Form Component
function ContactForm({ theme, palette, email }: any) {
  const isDark = theme.isDark;
  
  const inputClasses = isDark 
    ? `w-full bg-white/10 border border-white/20 text-white placeholder-white/50 ${theme.radius.medium} h-12 px-4 focus:ring-2 focus:border-transparent`
    : `w-full bg-white border border-gray-200 text-gray-900 placeholder-gray-400 ${theme.radius.medium} h-12 px-4 focus:ring-2 focus:border-transparent`;
  
  const labelClasses = isDark 
    ? 'block text-sm font-semibold mb-2 text-white/80'
    : 'block text-sm font-semibold mb-2 text-gray-700';

  const textareaClasses = isDark
    ? `w-full bg-white/10 border border-white/20 text-white placeholder-white/50 ${theme.radius.medium} px-4 py-3 focus:ring-2 focus:border-transparent resize-none`
    : `w-full bg-white border border-gray-200 text-gray-900 placeholder-gray-400 ${theme.radius.medium} px-4 py-3 focus:ring-2 focus:border-transparent resize-none`;

  return (
    <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); if(email) window.location.href = `mailto:${email}`; }}>
      <div>
        <label className={labelClasses}>Naam</label>
        <input 
          type="text" 
          placeholder="Uw naam" 
          className={inputClasses}
          style={{ ['--tw-ring-color' as any]: palette.primary }}
        />
      </div>
      <div>
        <label className={labelClasses}>E-mail</label>
        <input 
          type="email" 
          placeholder="uw@email.nl" 
          className={inputClasses}
          style={{ ['--tw-ring-color' as any]: palette.primary }}
        />
      </div>
      <div>
        <label className={labelClasses}>Bericht</label>
        <textarea 
          placeholder="Vertel over uw zorgvraag..." 
          rows={4}
          className={textareaClasses}
          style={{ ['--tw-ring-color' as any]: palette.primary }}
        />
      </div>
      <button 
        type="submit"
        className={`w-full h-12 font-bold ${theme.radius.medium} transition-all hover:opacity-90 ${
          isDark ? 'bg-white' : 'text-white'
        }`}
        style={{ 
          backgroundColor: isDark ? undefined : palette.primary, 
          color: isDark ? palette.primary : undefined 
        }}
      >
        Verstuur bericht
      </button>
    </form>
  );
}

// ============================================
// SPLIT - Info links, formulier rechts
// ============================================
function ContactSplit({ theme, palette, content, contactTitel, contactIntro }: any) {
  return (
    <section 
      id="contact"
      className={`${theme.spacing.section} px-6 md:px-12`}
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className={`${theme.spacing.container} mx-auto`}>
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Left - Info */}
          <div className={getRevealClass('left')}>
            <h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {contactTitel}
            </h2>
            <p 
              className="text-lg mb-8 leading-relaxed"
              style={{ color: theme.colors.textMuted }}
            >
              {contactIntro}
            </p>
            
            {/* Contact Details */}
            <div className="space-y-6">
              {content.contact?.telefoon && (
                <a href={`tel:${content.contact.telefoon}`} className="flex items-center gap-4 group">
                  <div 
                    className={`w-12 h-12 ${theme.radius.full} flex items-center justify-center`}
                    style={{ backgroundColor: palette.primaryLight }}
                  >
                    <span className="material-symbols-outlined" style={{ color: palette.primary }}>phone_in_talk</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider" style={{ color: palette.primary }}>Bel direct</p>
                    <p className="font-medium group-hover:underline" style={{ color: theme.colors.text }}>{content.contact.telefoon}</p>
                  </div>
                </a>
              )}
              
              {content.contact?.email && (
                <a href={`mailto:${content.contact.email}`} className="flex items-center gap-4 group">
                  <div 
                    className={`w-12 h-12 ${theme.radius.full} flex items-center justify-center`}
                    style={{ backgroundColor: palette.primaryLight }}
                  >
                    <span className="material-symbols-outlined" style={{ color: palette.primary }}>mail</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider" style={{ color: palette.primary }}>Email</p>
                    <p className="font-medium group-hover:underline" style={{ color: theme.colors.text }}>{content.contact.email}</p>
                  </div>
                </a>
              )}
              
              {content.contact?.werkgebied?.length > 0 && (
                <div className="flex items-center gap-4">
                  <div 
                    className={`w-12 h-12 ${theme.radius.full} flex items-center justify-center`}
                    style={{ backgroundColor: palette.primaryLight }}
                  >
                    <span className="material-symbols-outlined" style={{ color: palette.primary }}>location_on</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider" style={{ color: palette.primary }}>Werkgebied</p>
                    <p className="font-medium" style={{ color: theme.colors.text }}>{content.contact.werkgebied.slice(0, 3).join(', ')}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Right - Form */}
          <div 
            className={`p-8 ${theme.radius.large} ${theme.shadows.medium} ${getRevealClass('right')}`}
            style={{ backgroundColor: theme.colors.surface }}
          >
            <h3 
              className="text-xl font-bold mb-2"
              style={{ color: theme.colors.text }}
            >
              Stuur een bericht
            </h3>
            <p 
              className="text-sm mb-6"
              style={{ color: theme.colors.textMuted }}
            >
              Vul het formulier in en ik neem zo snel mogelijk contact op.
            </p>
            <ContactForm theme={theme} palette={palette} email={content.contact?.email} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// CENTERED - Alles gecentreerd
// ============================================
function ContactCentered({ theme, palette, content, contactTitel, contactIntro }: any) {
  return (
    <section 
      id="contact"
      className={`${theme.spacing.section} px-6`}
      style={{ backgroundColor: theme.colors.backgroundAlt }}
    >
      <div className="max-w-lg mx-auto text-center">
        <h2 
          className={`text-2xl font-light mb-4 ${getRevealClass('up')}`}
          style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
        >
          {contactTitel}
        </h2>
        <p 
          className={`mb-10 ${getRevealClass('up', 1)}`}
          style={{ color: theme.colors.textMuted }}
        >
          {contactIntro}
        </p>
        
        <div className={`text-left ${getRevealClass('up', 2)}`}>
          <ContactForm theme={theme} palette={palette} email={content.contact?.email} />
        </div>
        
        {/* Contact info below form */}
        {(content.contact?.telefoon || content.contact?.email) && (
          <div className={`flex justify-center gap-8 mt-10 ${getRevealClass('up', 3)}`}>
            {content.contact?.telefoon && (
              <a 
                href={`tel:${content.contact.telefoon}`} 
                className="flex items-center gap-2"
                style={{ color: palette.primary }}
              >
                <span className="material-symbols-outlined text-lg">phone</span>
                <span className="text-sm font-medium">{content.contact.telefoon}</span>
              </a>
            )}
            {content.contact?.email && (
              <a 
                href={`mailto:${content.contact.email}`} 
                className="flex items-center gap-2"
                style={{ color: palette.primary }}
              >
                <span className="material-symbols-outlined text-lg">mail</span>
                <span className="text-sm font-medium">{content.contact.email}</span>
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

// ============================================
// FORM-ONLY - Alleen formulier (cards theme)
// ============================================
function ContactFormOnly({ theme, palette, content, contactTitel, contactIntro }: any) {
  return (
    <section 
      id="contact"
      className={`${theme.spacing.section} px-6`}
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className={`${theme.spacing.container} mx-auto`}>
        <div 
          className={`${theme.radius.large} p-8 ${theme.shadows.small} ${getRevealClass('up')}`}
          style={{ backgroundColor: theme.colors.surface, border: `1px solid ${theme.colors.border}` }}
        >
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left - Form */}
            <div>
              <h2 
                className="text-xl font-bold mb-4"
                style={{ color: theme.colors.text }}
              >
                {contactTitel}
              </h2>
              <p 
                className="text-sm mb-6"
                style={{ color: theme.colors.textMuted }}
              >
                {contactIntro}
              </p>
              <ContactForm theme={theme} palette={palette} email={content.contact?.email} />
            </div>
            
            {/* Right - Quote/Info */}
            <div 
              className={`hidden md:flex flex-col justify-center items-center p-8 ${theme.radius.medium}`}
              style={{ backgroundColor: palette.primaryLight }}
            >
              <span 
                className="material-symbols-outlined text-5xl mb-4"
                style={{ color: `${palette.primary}40` }}
              >
                support_agent
              </span>
              <p 
                className="text-center text-lg leading-relaxed"
                style={{ color: theme.colors.text }}
              >
                Persoonlijke zorg begint met een goed gesprek. Ik neem graag de tijd voor u.
              </p>
              <div 
                className="w-12 h-1 rounded-full mt-6"
                style={{ backgroundColor: palette.primary }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
