// app/api/domains/connect/route.ts
// Connect an existing domain to a site (user manages their own DNS)

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { cleanDomain, isValidDomain } from '@/lib/transip';

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

    const { domain, siteId } = await request.json();

    if (!domain || typeof domain !== 'string') {
      return NextResponse.json(
        { error: 'Domein is verplicht' },
        { status: 400 }
      );
    }

    if (!siteId) {
      return NextResponse.json(
        { error: 'Site ID is verplicht' },
        { status: 400 }
      );
    }

    const cleanedDomain = cleanDomain(domain);

    if (!isValidDomain(cleanedDomain)) {
      return NextResponse.json(
        { error: 'Ongeldig domein formaat. Voorbeeld: mijnzorg.nl' },
        { status: 400 }
      );
    }

    // Verify site belongs to user
    const { data: site, error: siteError } = await supabase
      .from('sites')
      .select('id, subdomain, custom_domain')
      .eq('id', siteId)
      .eq('user_id', user.id)
      .single();

    if (siteError || !site) {
      return NextResponse.json(
        { error: 'Site niet gevonden of geen toegang' },
        { status: 404 }
      );
    }

    // Check if site already has a custom domain
    if (site.custom_domain) {
      return NextResponse.json(
        { error: `Deze site heeft al een domein: ${site.custom_domain}` },
        { status: 400 }
      );
    }

    // Check domain is not already used by another site
    const { data: existing } = await supabase
      .from('sites')
      .select('id')
      .eq('custom_domain', cleanedDomain)
      .neq('id', siteId)
      .limit(1)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { error: 'Dit domein is al gekoppeld aan een andere site' },
        { status: 400 }
      );
    }

    // Save custom domain to site
    const { error: updateError } = await supabase
      .from('sites')
      .update({ custom_domain: cleanedDomain })
      .eq('id', siteId);

    if (updateError) {
      return NextResponse.json(
        { error: 'Kon domein niet opslaan' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      domain: cleanedDomain,
      message: 'Domein gekoppeld! Stel nu je DNS-records in.',
      dns: {
        a: { type: 'A', name: '@', value: '76.76.21.21' },
        cname: { type: 'CNAME', name: 'www', value: 'cname.vercel-dns.com' },
      },
    });

  } catch (error) {
    console.error('Domain connect error:', error);
    return NextResponse.json(
      { error: 'Er ging iets mis' },
      { status: 500 }
    );
  }
}
