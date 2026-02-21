'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

function CheckoutReturnContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const siteId = searchParams.get('siteId');

  const [status, setStatus] = useState<'loading' | 'success' | 'timeout'>('loading');

  const pollSubscription = useCallback(async () => {
    if (!siteId) {
      setStatus('timeout');
      return;
    }

    const supabase = createClient();
    const maxAttempts = 15; // 15 * 2s = 30s
    let attempts = 0;

    const poll = async () => {
      attempts++;

      const { data: sub } = await supabase
        .from('subscriptions')
        .select('status')
        .eq('site_id', siteId)
        .in('status', ['active'])
        .maybeSingle();

      if (sub?.status === 'active') {
        setStatus('success');
        setTimeout(() => router.push('/dashboard'), 3000);
        return;
      }

      if (attempts >= maxAttempts) {
        setStatus('timeout');
        return;
      }

      setTimeout(poll, 2000);
    };

    poll();
  }, [siteId, router]);

  useEffect(() => {
    pollSubscription();
  }, [pollSubscription]);

  return (
    <div className="max-w-md w-full text-center">
      {status === 'loading' && (
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-10">
          <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-3xl text-teal-600 animate-spin">
              progress_activity
            </span>
          </div>
          <h1 className="text-2xl font-bold font-serif text-slate-900 mb-3">
            Je betaling wordt verwerkt...
          </h1>
          <p className="text-slate-500">
            Even geduld, we activeren je website.
          </p>
        </div>
      )}

      {status === 'success' && (
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-10">
          <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-3xl text-emerald-600">
              check_circle
            </span>
          </div>
          <h1 className="text-2xl font-bold font-serif text-slate-900 mb-3">
            Je website is live!
          </h1>
          <p className="text-slate-500 mb-6">
            Gefeliciteerd! Je proefperiode van 14 dagen is gestart.
            Je wordt zo doorgestuurd naar je dashboard.
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-teal-600 to-[#0f766e] text-white rounded-xl font-medium hover:shadow-lg transition-all"
          >
            Naar je dashboard
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>
      )}

      {status === 'timeout' && (
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-10">
          <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-3xl text-amber-600">
              schedule
            </span>
          </div>
          <h1 className="text-2xl font-bold font-serif text-slate-900 mb-3">
            Het kan even duren
          </h1>
          <p className="text-slate-500 mb-6">
            Je betaling is ontvangen, maar de verwerking duurt iets langer dan verwacht.
            Je kunt alvast naar je dashboard gaan — je site wordt automatisch geactiveerd.
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-teal-600 to-[#0f766e] text-white rounded-xl font-medium hover:shadow-lg transition-all"
          >
            Naar je dashboard
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default function CheckoutReturnPage() {
  return (
    <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center px-4">
      <Suspense
        fallback={
          <div className="max-w-md w-full text-center">
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-10">
              <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-3xl text-teal-600 animate-spin">
                  progress_activity
                </span>
              </div>
              <h1 className="text-2xl font-bold font-serif text-slate-900 mb-3">
                Je betaling wordt verwerkt...
              </h1>
              <p className="text-slate-500">
                Even geduld, we activeren je website.
              </p>
            </div>
          </div>
        }
      >
        <CheckoutReturnContent />
      </Suspense>
    </div>
  );
}
