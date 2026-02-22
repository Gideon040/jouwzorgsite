// app/api/domains/retry-vercel/route.ts
// Retry adding a custom domain to Vercel

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { addDomainToVercel } from '@/lib/vercel';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Je moet ingelogd zijn' },
        { status: 401 }
      );
    }

    const { siteId } = await request.json();

    if (!siteId) {
      return NextResponse.json(
        { error: 'Site ID is verplicht' },
        { status: 400 }
      );
    }

    const { data: site, error: siteError } = await supabase
      .from('sites')
      .select('id, custom_domain')
      .eq('id', siteId)
      .eq('user_id', user.id)
      .single();

    if (siteError || !site) {
      return NextResponse.json(
        { error: 'Site niet gevonden of geen toegang' },
        { status: 404 }
      );
    }

    if (!site.custom_domain) {
      return NextResponse.json(
        { error: 'Deze site heeft geen gekoppeld domein' },
        { status: 400 }
      );
    }

    const domain = site.custom_domain;

    const result = await addDomainToVercel(domain);
    await addDomainToVercel(`www.${domain}`);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Kon domein niet toevoegen aan Vercel' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      verified: result.verified,
      message: result.verified
        ? 'Domein succesvol gekoppeld aan Vercel'
        : 'Domein toegevoegd aan Vercel — DNS-verificatie in afwachting',
    });

  } catch (error) {
    console.error('Domain retry-vercel error:', error);
    return NextResponse.json(
      { error: 'Er ging iets mis' },
      { status: 500 }
    );
  }
}
