// app/api/domains/disconnect/route.ts
// Disconnect a custom domain from a site

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { removeDomainFromVercel } from '@/lib/vercel';

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

    // Get site with current custom domain
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

    // Remove from Vercel
    await removeDomainFromVercel(domain);
    await removeDomainFromVercel(`www.${domain}`);

    // Remove from site
    const { error: updateError } = await supabase
      .from('sites')
      .update({ custom_domain: null })
      .eq('id', siteId);

    if (updateError) {
      return NextResponse.json(
        { error: 'Kon domein niet loskoppelen' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Domein losgekoppeld',
    });

  } catch (error) {
    console.error('Domain disconnect error:', error);
    return NextResponse.json(
      { error: 'Er ging iets mis' },
      { status: 500 }
    );
  }
}
