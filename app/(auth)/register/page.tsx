// app/(auth)/register/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button, Input, Card, CardContent } from '@/components/ui';

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validate password
    if (password.length < 6) {
      setError('Wachtwoord moet minimaal 6 tekens zijn');
      setIsLoading(false);
      return;
    }

    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
      return;
    }

    // Success - redirect to wizard
    router.push('/wizard');
    router.refresh();
  };

  return (
    <div className="w-full max-w-md">
      <Card variant="elevated">
        <CardContent className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Account aanmaken
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              Maak je professionele zorgwebsite in 10 minuten
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">error</span>
                {error}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Volledige naam"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Jan Jansen"
              required
            />

            <Input
              label="E-mailadres"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jouw@email.nl"
              required
            />

            <Input
              label="Wachtwoord"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimaal 6 tekens"
              hint="Minimaal 6 tekens"
              required
            />

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
              />
              <label htmlFor="terms" className="text-sm text-slate-600 dark:text-slate-400">
                Ik ga akkoord met de{' '}
                <a href="/terms" className="text-primary hover:underline">
                  algemene voorwaarden
                </a>{' '}
                en het{' '}
                <a href="/privacy" className="text-primary hover:underline">
                  privacybeleid
                </a>
              </label>
            </div>

            <Button type="submit" className="w-full" isLoading={isLoading}>
              Account aanmaken
            </Button>
          </form>

          {/* Features */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                Gratis uitproberen
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                Geen creditcard
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                Direct online
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                AVG-compliant
              </div>
            </div>
          </div>

          {/* Login link */}
          <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-6">
            Al een account?{' '}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Log in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
