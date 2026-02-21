'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface DoneSectionProps {
  naam: string;
  subdomain?: string;
}

export function DoneSection({ naam, subdomain }: DoneSectionProps) {
  const router = useRouter();
  const firstName = naam.split(' ')[0];
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/dashboard');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-8">
          <span className="material-symbols-outlined text-5xl text-emerald-600">celebration</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold font-serif text-slate-900 mb-4">
          Gefeliciteerd, {firstName}!
        </h1>

        <p className="text-lg text-slate-600 mb-8">
          Je account en website zijn aangemaakt! Check je e-mail om je account te bevestigen.
        </p>

        {subdomain && (
          <div className="bg-white rounded-2xl p-4 shadow-md mb-6 inline-block">
            <p className="text-sm text-slate-500 mb-1">Jouw website adres:</p>
            <p className="text-lg font-mono font-bold text-teal-600">
              {subdomain}.jouwzorgsite.nl
            </p>
          </div>
        )}

        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <h3 className="font-bold text-slate-900 mb-3">Wat kun je doen in je dashboard?</h3>
          <ul className="text-left space-y-3">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-teal-600 mt-0.5">edit_note</span>
              <span className="text-slate-600">Teksten, foto&apos;s en kleuren aanpassen</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-teal-600 mt-0.5">verified</span>
              <span className="text-slate-600">BIG-registratie en kwaliteitskeurmerk toevoegen</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-teal-600 mt-0.5">publish</span>
              <span className="text-slate-600">Je site publiceren wanneer je klaar bent</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => router.push('/dashboard')}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-br from-teal-600 to-[#0f766e] text-white rounded-xl font-bold text-lg transition-all hover:shadow-lg"
          >
            Naar mijn dashboard
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>

        <p className="text-sm text-slate-400 mt-4">
          Je wordt automatisch doorgestuurd over {countdown} seconden...
        </p>
      </div>
    </div>
  );
}
