// app/(dashboard)/dashboard/dba-tools/page.tsx
// DBA compliance tools: inbeddingsanalyse + tips

import Link from 'next/link';

export const metadata = { title: 'DBA-Tools' };

export default function DBAToolsPage() {
  return (
    <div className="space-y-8 max-w-[900px]">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-teal-600">shield</span>
          <h2 className="text-lg font-semibold text-slate-900">DBA-Tools</h2>
          <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-teal-500/10 text-teal-600 rounded">
            Nieuw
          </span>
        </div>
        <p className="text-sm text-slate-500">
          Analyseer je werkrelaties en minimaliseer het risico op schijnzelfstandigheid.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Inbeddingsanalyse */}
        <ToolCard
          icon="analytics"
          iconColor="bg-teal-50 text-teal-600"
          title="AI Inbeddingsanalyse"
          description="Beantwoord 10 vragen over je werkrelatie en krijg een risicorapport met persoonlijke aanbevelingen."
          cta="Start analyse"
          ctaHref="/dashboard/dba-tools/analyse"
          status="active"
        />

        {/* Modelovereenkomst check */}
        <ToolCard
          icon="description"
          iconColor="bg-blue-50 text-blue-600"
          title="Overeenkomst Check"
          description="Upload je modelovereenkomst en laat AI controleren of deze voldoet aan de DBA-wetgeving."
          cta="Upload document"
          ctaHref="/dashboard/dba-tools/overeenkomst"
          status="coming"
        />

        {/* Website DBA compliance */}
        <ToolCard
          icon="verified"
          iconColor="bg-emerald-50 text-emerald-600"
          title="Website DBA-Proof"
          description="Check of je website de juiste signalen afgeeft richting opdrachtgevers en de Belastingdienst."
          cta="Check website"
          ctaHref="/dashboard/dba-tools/website-check"
          status="coming"
        />

        {/* Tarieven calculator */}
        <ToolCard
          icon="calculate"
          iconColor="bg-amber-50 text-amber-600"
          title="Tarieven Calculator"
          description="Bereken een DBA-proof uurtarief op basis van je ervaring, regio en specialisatie."
          cta="Bereken tarief"
          ctaHref="/dashboard/dba-tools/tarieven"
          status="coming"
        />
      </div>

      {/* Info Section */}
      <div className="bg-white rounded-xl border border-slate-200/60 p-6">
        <h3 className="text-sm font-semibold text-slate-900 mb-3">Wat is de DBA-wetgeving?</h3>
        <div className="text-[13px] text-slate-600 leading-relaxed space-y-2">
          <p>
            De Wet Deregulering Beoordeling Arbeidsrelaties (DBA) bepaalt of je als zelfstandige
            of als werknemer wordt gezien door de Belastingdienst. Als ZZP'er in de zorg is het
            essentieel dat je werkrelatie niet als "schijnzelfstandigheid" wordt aangemerkt.
          </p>
          <p>
            De handhaving is per 2025 aangescherpt. Dit betekent dat zowel jij als je opdrachtgever
            boetes riskeren als de werkrelatie niet aan de criteria voldoet.
          </p>
        </div>

        {/* Key factors */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
          {[
            { icon: 'person', label: 'Persoonlijke arbeid', risk: 'Hoog risico als verplicht' },
            { icon: 'supervisor_account', label: 'Gezagsverhouding', risk: 'Hoog risico bij instructies' },
            { icon: 'schedule', label: 'Vrije vervanging', risk: 'Toon aan dat het kan' },
            { icon: 'payments', label: 'Ondernemersrisico', risk: 'Meerdere opdrachtgevers' },
          ].map((factor) => (
            <div key={factor.label} className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <span className="material-symbols-outlined text-slate-400 text-lg mb-2 block">{factor.icon}</span>
              <p className="text-xs font-semibold text-slate-900 mb-0.5">{factor.label}</p>
              <p className="text-[10px] text-slate-500">{factor.risk}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Marketplace Teaser */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 md:p-8">
        {/* Decorative */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-500/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 flex items-start gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-teal-400">storefront</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400">Binnenkort</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Shift Marketplace
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4 max-w-md">
              Vind vervangingsopdrachten en bied jezelf aan als vervanger. DBA-compliant,
              direct matching, zonder tussenkomst van een bureau.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-medium text-slate-300 bg-white/5 rounded-full border border-white/10">
                <span className="material-symbols-outlined text-xs text-teal-400">check</span>
                Vrije vervanging aantonen
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-medium text-slate-300 bg-white/5 rounded-full border border-white/10">
                <span className="material-symbols-outlined text-xs text-teal-400">check</span>
                Direct contact
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-medium text-slate-300 bg-white/5 rounded-full border border-white/10">
                <span className="material-symbols-outlined text-xs text-teal-400">check</span>
                BIG-geverifieerd
              </span>
            </div>
          </div>

          <div className="hidden md:flex flex-col items-center justify-center w-24 h-24 rounded-2xl bg-white/5 border border-white/10">
            <span className="material-symbols-outlined text-3xl text-teal-400 mb-1">storefront</span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Q2 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolCard({
  icon, iconColor, title, description, cta, ctaHref, status,
}: {
  icon: string; iconColor: string; title: string; description: string;
  cta: string; ctaHref: string; status: 'active' | 'coming';
}) {
  const isActive = status === 'active';

  return (
    <div className={`bg-white rounded-xl border p-5 flex flex-col ${
      isActive ? 'border-slate-200/60 hover:border-teal-300 hover:shadow-sm' : 'border-slate-200/60 opacity-75'
    } transition-all`}>
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconColor.split(' ')[0]}`}>
          <span className={`material-symbols-outlined text-xl ${iconColor.split(' ')[1]}`}>{icon}</span>
        </div>
        {!isActive && (
          <span className="ml-auto px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 rounded">
            Binnenkort
          </span>
        )}
      </div>
      <h4 className="text-sm font-semibold text-slate-900 mb-1">{title}</h4>
      <p className="text-xs text-slate-500 leading-relaxed mb-4 flex-1">{description}</p>
      {isActive ? (
        <Link
          href={ctaHref}
          className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-500 rounded-lg transition-colors"
        >
          {cta}
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      ) : (
        <button
          disabled
          className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 text-xs font-medium text-slate-400 bg-slate-100 rounded-lg cursor-not-allowed"
        >
          {cta}
        </button>
      )}
    </div>
  );
}
