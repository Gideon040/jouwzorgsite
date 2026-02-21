// app/(dashboard)/dashboard/dba-tools/page.tsx

import Link from 'next/link';

export const metadata = { title: 'DBA-Tools' };

export default function DBAToolsPage() {
  return (
    <div className="max-w-[600px] mx-auto mt-12">
      <div className="bg-white rounded-2xl border border-slate-200/60 p-12 text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <span className="material-symbols-outlined text-3xl text-slate-400">shield</span>
        </div>
        <h2 className="text-lg font-semibold text-slate-900 mb-2">DBA-Tools</h2>
        <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-600 rounded-full mb-4">
          Coming soon
        </span>
        <p className="text-sm text-slate-500 max-w-sm mx-auto">
          Binnenkort kun je hier je werkrelaties analyseren en het risico op schijnzelfstandigheid minimaliseren.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 mt-6 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Terug naar dashboard
        </Link>
      </div>
    </div>
  );
}
