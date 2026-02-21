'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(
        error.message === 'Invalid login credentials'
          ? 'Ongeldige inloggegevens. Controleer je e-mail en wachtwoord.'
          : error.message
      );
      setIsLoading(false);
      return;
    }

    router.push('/dashboard');
    router.refresh();
  };

  return (
    <div className="w-full max-w-sm">
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xl shadow-stone-200/40 overflow-hidden">
        <div className="p-8 pb-0">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-serif text-stone-900 mb-1.5">
              Welkom terug
            </h1>
            <p className="text-sm text-stone-500">
              Log in om je website te beheren
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-100">
              <p className="text-sm text-red-600 flex items-center gap-2">
                <span className="material-symbols-outlined text-base">error</span>
                {error}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">
                E-mailadres
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jouw@email.nl"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-900 placeholder:text-stone-400 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">
                Wachtwoord
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-900 placeholder:text-stone-400 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-colors"
              />
            </div>

            <div className="flex items-center justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-teal-600 hover:text-teal-700 font-medium transition-colors"
              >
                Wachtwoord vergeten?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-xl bg-gradient-to-br from-teal-600 to-[#0f766e] text-white font-semibold text-sm shadow-sm shadow-teal-600/20 hover:shadow-md hover:shadow-teal-600/25 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
                  Bezig...
                </>
              ) : (
                'Inloggen'
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-6 px-8 py-4 bg-stone-50 border-t border-stone-100 text-center">
          <p className="text-sm text-stone-500">
            Nog geen account?{' '}
            <Link href="/" className="text-teal-600 font-semibold hover:text-teal-700 transition-colors">
              Maak gratis een website
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
