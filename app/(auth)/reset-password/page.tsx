'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button, Input, Card, CardContent } from '@/components/ui';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Supabase handles the token exchange automatically via the URL hash
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        // User arrived via reset link — ready to set new password
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Wachtwoord moet minimaal 8 tekens bevatten');
      return;
    }

    if (password !== confirmPassword) {
      setError('Wachtwoorden komen niet overeen');
      return;
    }

    setIsLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError('Er ging iets mis. Probeer het opnieuw of vraag een nieuwe link aan.');
      setIsLoading(false);
      return;
    }

    setIsSuccess(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="w-full max-w-md">
        <Card variant="elevated">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-3xl text-emerald-600">check_circle</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Wachtwoord gewijzigd
            </h1>
            <p className="text-slate-500">
              Je wordt doorgestuurd naar je dashboard...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <Card variant="elevated">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Nieuw wachtwoord instellen
            </h1>
            <p className="text-slate-500">
              Kies een nieuw wachtwoord voor je account.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200">
              <p className="text-sm text-red-600 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">error</span>
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Nieuw wachtwoord"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimaal 8 tekens"
              required
            />

            <Input
              label="Wachtwoord bevestigen"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Herhaal je wachtwoord"
              required
            />

            <Button type="submit" className="w-full" isLoading={isLoading}>
              Wachtwoord opslaan
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
