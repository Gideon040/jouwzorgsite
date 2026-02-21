'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button, Input, Card, CardContent } from '@/components/ui';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const supabase = createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setError('Er ging iets mis. Probeer het opnieuw.');
      setIsLoading(false);
      return;
    }

    setIsSent(true);
    setIsLoading(false);
  };

  if (isSent) {
    return (
      <div className="w-full max-w-md">
        <Card variant="elevated">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-3xl text-teal-600">mark_email_read</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Check je e-mail
            </h1>
            <p className="text-slate-500 mb-6">
              We hebben een wachtwoord-reset link gestuurd naar <strong className="text-slate-700">{email}</strong>. Check ook je spamfolder.
            </p>
            <Link
              href="/login"
              className="text-sm text-primary font-semibold hover:underline"
            >
              Terug naar inloggen
            </Link>
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
              Wachtwoord vergeten?
            </h1>
            <p className="text-slate-500">
              Vul je e-mailadres in en we sturen een reset-link.
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
              label="E-mailadres"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jouw@email.nl"
              required
            />

            <Button type="submit" className="w-full" isLoading={isLoading}>
              Reset-link versturen
            </Button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Terug naar inloggen
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
