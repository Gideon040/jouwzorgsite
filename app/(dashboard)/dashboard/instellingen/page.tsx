// app/(dashboard)/dashboard/instellingen/page.tsx
'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function InstellingenPage() {
  return (
    <div className="max-w-[600px] space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Instellingen</h2>
        <p className="text-sm text-slate-500 mt-0.5">Beheer je account en beveiligingsinstellingen.</p>
      </div>

      <NaamSection />
      <WachtwoordSection />
      <AccountSection />
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// NAAM WIJZIGEN
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function NaamSection() {
  const [naam, setNaam] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!naam.trim()) return;

    setStatus('loading');
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
      data: { full_name: naam.trim() },
    });

    if (error) {
      setStatus('error');
      setMessage(error.message);
    } else {
      setStatus('success');
      setMessage('Naam bijgewerkt.');
      setNaam('');
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/60 p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="material-symbols-outlined text-slate-400 text-xl">person</span>
        <h3 className="text-sm font-semibold text-slate-900">Naam wijzigen</h3>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={naam}
          onChange={(e) => setNaam(e.target.value)}
          placeholder="Je volledige naam"
          className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
        />
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={!naam.trim() || status === 'loading'}
            className="px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Opslaan...' : 'Naam opslaan'}
          </button>
          {status === 'success' && <span className="text-sm text-emerald-600">{message}</span>}
          {status === 'error' && <span className="text-sm text-red-600">{message}</span>}
        </div>
      </form>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// WACHTWOORD WIJZIGEN
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function WachtwoordSection() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      setStatus('error');
      setMessage('Wachtwoord moet minimaal 8 tekens zijn.');
      return;
    }

    if (password !== confirmPassword) {
      setStatus('error');
      setMessage('Wachtwoorden komen niet overeen.');
      return;
    }

    setStatus('loading');
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setStatus('error');
      setMessage(error.message);
    } else {
      setStatus('success');
      setMessage('Wachtwoord bijgewerkt.');
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/60 p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="material-symbols-outlined text-slate-400 text-xl">lock</span>
        <h3 className="text-sm font-semibold text-slate-900">Wachtwoord wijzigen</h3>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setStatus('idle'); }}
          placeholder="Nieuw wachtwoord (min. 8 tekens)"
          className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => { setConfirmPassword(e.target.value); setStatus('idle'); }}
          placeholder="Herhaal nieuw wachtwoord"
          className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
        />
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={!password || !confirmPassword || status === 'loading'}
            className="px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Opslaan...' : 'Wachtwoord wijzigen'}
          </button>
          {status === 'success' && <span className="text-sm text-emerald-600">{message}</span>}
          {status === 'error' && <span className="text-sm text-red-600">{message}</span>}
        </div>
      </form>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ACCOUNT VERWIJDEREN
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function AccountSection() {
  return (
    <div className="bg-white rounded-xl border border-red-100 p-6">
      <div className="flex items-center gap-2 mb-2">
        <span className="material-symbols-outlined text-red-400 text-xl">warning</span>
        <h3 className="text-sm font-semibold text-slate-900">Account verwijderen</h3>
      </div>
      <p className="text-xs text-slate-500 mb-4">
        Wil je je account en alle bijbehorende websites verwijderen? Neem contact op met ons support team.
      </p>
      <a
        href="mailto:support@jouwzorgsite.nl?subject=Account%20verwijderen"
        className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-red-600 border border-red-200 hover:bg-red-50 rounded-lg transition-colors"
      >
        <span className="material-symbols-outlined text-[16px]">mail</span>
        Mail ons om te verwijderen
      </a>
    </div>
  );
}
