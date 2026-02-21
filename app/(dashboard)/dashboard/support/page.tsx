// app/(dashboard)/dashboard/support/page.tsx

import Link from 'next/link';

export const metadata = { title: 'Hulp & Support' };

const SUPPORT_EMAIL = 'support@jouwzorgsite.nl';
const WHATSAPP_NUMBER = '31612345678'; // Pas aan naar jullie nummer

const faqItems = [
  {
    vraag: 'Hoe pas ik mijn website aan?',
    antwoord: 'Ga naar je dashboard en klik op "Site bewerken". Daar kun je teksten, foto\'s en kleuren aanpassen via de editor.',
  },
  {
    vraag: 'Hoe zet ik mijn website online?',
    antwoord: 'Op je dashboard staat een schakelaar bij je website. Zet deze aan om je site live te zetten. Je site is dan direct bereikbaar op jouw subdomain.',
  },
  {
    vraag: 'Kan ik mijn website opnieuw laten genereren?',
    antwoord: 'Ja! Klik op "AI Wizard" op je dashboard. De wizard genereert nieuwe teksten op basis van je gegevens.',
  },
  {
    vraag: 'Wat is het kwaliteitskeurmerk?',
    antwoord: 'Het kwaliteitskeurmerk is een vertrouwenswidget op je website. Het toont bezoekers dat je voldoet aan professionele eisen zoals BIG-registratie en Wkkgz.',
  },
  {
    vraag: 'Hoe wijzig ik mijn wachtwoord?',
    antwoord: 'Ga naar Instellingen in het menu links. Daar kun je je wachtwoord en naam aanpassen.',
  },
];

export default function SupportPage() {
  return (
    <div className="max-w-[700px] space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Hulp & Support</h2>
        <p className="text-sm text-slate-500 mt-0.5">Vragen? We helpen je graag.</p>
      </div>

      {/* Contact opties */}
      <div className="grid sm:grid-cols-2 gap-4">
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="flex items-start gap-4 bg-white rounded-xl border border-slate-200/60 p-5 hover:border-blue-200 hover:shadow-sm transition-all"
        >
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[24px] text-blue-600">mail</span>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-1">E-mail ons</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Stuur een e-mail naar {SUPPORT_EMAIL}
            </p>
          </div>
        </a>

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hallo, ik heb een vraag over JouwZorgSite.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-4 bg-white rounded-xl border border-slate-200/60 p-5 hover:border-emerald-200 hover:shadow-sm transition-all"
        >
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[24px] text-emerald-600">chat</span>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-1">WhatsApp</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Stuur ons een berichtje via WhatsApp
            </p>
          </div>
        </a>
      </div>

      {/* FAQ */}
      <div className="bg-white rounded-xl border border-slate-200/60 p-6">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">Veelgestelde vragen</h3>
        <div className="divide-y divide-slate-100">
          {faqItems.map((item) => (
            <div key={item.vraag} className="py-4 first:pt-0 last:pb-0">
              <h4 className="text-sm font-medium text-slate-900 mb-1.5">{item.vraag}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{item.antwoord}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Terug */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
      >
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Terug naar dashboard
      </Link>
    </div>
  );
}
