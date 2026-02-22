// app/(dashboard)/dashboard/support/page.tsx

import Link from 'next/link';

export const metadata = { title: 'Hulp & Support' };

const SUPPORT_EMAIL = 'support@jouwzorgsite.nl';
const WHATSAPP_NUMBER = '31612345678'; // Pas aan naar jullie nummer

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
      <Link
        href="/faq"
        className="flex items-center justify-between bg-white rounded-xl border border-slate-200/60 p-5 hover:border-slate-300 hover:shadow-sm transition-all group"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[24px] text-amber-600">quiz</span>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-1">Veelgestelde vragen</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Bekijk alle veelgestelde vragen over JouwZorgSite, abonnementen, het keurmerk en meer.
            </p>
          </div>
        </div>
        <span className="material-symbols-outlined text-[20px] text-slate-400 group-hover:text-slate-600 transition-colors">
          arrow_forward
        </span>
      </Link>

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
