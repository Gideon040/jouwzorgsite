// components/site/SiteContact.tsx

import { cn } from '@/lib/utils';
import { Contact } from '@/types';

interface SiteContactProps {
  contact: Contact;
  naam: string;
  template?: 'warm' | 'modern' | 'editorial';
}

export function SiteContact({ contact, naam, template = 'warm' }: SiteContactProps) {
  const containerStyles = {
    warm: 'bg-orange-100',
    modern: 'bg-blue-50',
    editorial: 'bg-slate-900',
  };

  const titleStyles = {
    warm: 'text-orange-900',
    modern: 'text-slate-900',
    editorial: 'text-white',
  };

  const textStyles = {
    warm: 'text-orange-800',
    modern: 'text-slate-700',
    editorial: 'text-slate-300',
  };

  const cardStyles = {
    warm: 'bg-white border-orange-200',
    modern: 'bg-white border-slate-200 shadow-lg',
    editorial: 'bg-slate-800 border-slate-700',
  };

  const iconStyles = {
    warm: 'bg-orange-100 text-orange-600',
    modern: 'bg-blue-100 text-blue-600',
    editorial: 'bg-slate-700 text-slate-300',
  };

  const accentStyles = {
    warm: 'bg-orange-500',
    modern: 'bg-blue-600',
    editorial: 'bg-white',
  };

  const buttonStyles = {
    warm: 'bg-orange-500 hover:bg-orange-600 text-white',
    modern: 'bg-blue-600 hover:bg-blue-700 text-white',
    editorial: 'bg-white hover:bg-slate-100 text-slate-900',
  };

  return (
    <section id="contact" className={cn('py-16 md:py-20 px-4', containerStyles[template])}>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <div className={cn('w-12 h-1 rounded-full', accentStyles[template])} />
          <h2 className={cn('text-2xl md:text-3xl font-bold', titleStyles[template])}>
            Neem contact op
          </h2>
        </div>
        <p className={cn('mb-12 max-w-2xl', textStyles[template])}>
          Heeft u vragen of wilt u een afspraak maken? Neem gerust contact met mij op.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info Card */}
          <div className={cn('p-8 rounded-xl border', cardStyles[template])}>
            <h3 className={cn('text-xl font-bold mb-6', titleStyles[template])}>
              Contactgegevens
            </h3>

            <div className="space-y-4">
              {/* Email */}
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-4 group"
              >
                <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center', iconStyles[template])}>
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <p className={cn('text-sm', textStyles[template])}>E-mail</p>
                  <p className={cn('font-semibold group-hover:underline', titleStyles[template])}>
                    {contact.email}
                  </p>
                </div>
              </a>

              {/* Phone */}
              {contact.telefoon && (
                <a
                  href={`tel:${contact.telefoon.replace(/[^+\d]/g, '')}`}
                  className="flex items-center gap-4 group"
                >
                  <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center', iconStyles[template])}>
                    <span className="material-symbols-outlined">phone</span>
                  </div>
                  <div>
                    <p className={cn('text-sm', textStyles[template])}>Telefoon</p>
                    <p className={cn('font-semibold group-hover:underline', titleStyles[template])}>
                      {contact.telefoon}
                    </p>
                  </div>
                </a>
              )}

              {/* Werkgebied */}
              {contact.werkgebied.length > 0 && (
                <div className="flex items-start gap-4">
                  <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center', iconStyles[template])}>
                    <span className="material-symbols-outlined">location_on</span>
                  </div>
                  <div>
                    <p className={cn('text-sm', textStyles[template])}>Werkgebied</p>
                    <p className={cn('font-semibold', titleStyles[template])}>
                      {contact.werkgebied.join(', ')}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <a
              href={`mailto:${contact.email}?subject=Contactverzoek via website`}
              className={cn(
                'mt-8 w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold transition-all',
                buttonStyles[template]
              )}
            >
              <span className="material-symbols-outlined">send</span>
              Stuur een bericht
            </a>
          </div>

          {/* Quick Info Card */}
          <div className={cn('p-8 rounded-xl border', cardStyles[template])}>
            <h3 className={cn('text-xl font-bold mb-6', titleStyles[template])}>
              Direct contact
            </h3>

            <div className={cn('space-y-4 text-sm', textStyles[template])}>
              <p>
                Ik sta klaar om uw vragen te beantwoorden over mijn diensten en beschikbaarheid.
              </p>
              <p>
                U kunt mij bereiken via e-mail{contact.telefoon ? ' of telefoon' : ''}. 
                Ik probeer binnen 24 uur te reageren.
              </p>

              {/* Availability indicator */}
              <div className="flex items-center gap-2 pt-4">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                <span className="font-semibold">Momenteel beschikbaar</span>
              </div>
            </div>

            {/* WhatsApp button (if phone available) */}
            {contact.telefoon && (
              <a
                href={`https://wa.me/${contact.telefoon.replace(/[^+\d]/g, '').replace(/^0/, '31')}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'mt-8 w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold transition-all',
                  'bg-emerald-500 hover:bg-emerald-600 text-white'
                )}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
