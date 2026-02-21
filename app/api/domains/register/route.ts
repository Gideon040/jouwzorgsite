// app/api/domains/register/route.ts
// Register a domain via TransIP and configure DNS for Vercel

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import {
  checkDomain,
  registerDomain,
  configureDNSForVercel,
  getTransIPConfig,
  isValidDomain,
  cleanDomain,
  getDomainPrice,
  getTLD
} from '@/lib/transip';
import { addDomainToVercel } from '@/lib/vercel';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Je moet ingelogd zijn' },
        { status: 401 }
      );
    }

    // Check subscription plan — only professional/expert can register domains
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('plan')
      .eq('user_id', user.id)
      .in('status', ['active'])
      .maybeSingle();

    if (!subscription || subscription.plan === 'starter') {
      return NextResponse.json(
        { error: 'Eigen domein is beschikbaar vanaf het Professional abonnement' },
        { status: 403 }
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

    // Clean and validate domain
    const cleanedDomain = cleanDomain(domain);
    
    if (!isValidDomain(cleanedDomain)) {
      return NextResponse.json(
        { error: 'Ongeldig domein formaat' },
        { status: 400 }
      );
    }

    // Verify site belongs to user
    const { data: site, error: siteError } = await supabase
      .from('sites')
      .select('id, subdomain')
      .eq('id', siteId)
      .eq('user_id', user.id)
      .single();

    if (siteError || !site) {
      return NextResponse.json(
        { error: 'Site niet gevonden of geen toegang' },
        { status: 404 }
      );
    }

    // Check if site already has a custom domain (max 1 per site)
    const { data: existingDomain } = await supabase
      .from('custom_domains')
      .select('id, domain')
      .eq('site_id', siteId)
      .in('status', ['active', 'dns_configuring', 'registering'])
      .limit(1)
      .maybeSingle();

    if (existingDomain) {
      return NextResponse.json(
        { error: `Deze site heeft al een domein: ${existingDomain.domain}` },
        { status: 400 }
      );
    }

    const config = getTransIPConfig();
    const price = getDomainPrice(cleanedDomain);
    const tld = getTLD(cleanedDomain);

    // 1. Check if domain is still available
    const availability = await checkDomain(cleanedDomain, config);
    if (!availability.available) {
      return NextResponse.json(
        { 
          error: 'Domein is niet meer beschikbaar',
          status: availability.status 
        },
        { status: 400 }
      );
    }

    // 2. Create pending record in database
    const { data: domainRecord, error: insertError } = await supabase
      .from('custom_domains')
      .insert({
        site_id: siteId,
        user_id: user.id,
        domain: cleanedDomain,
        tld: tld.replace('.', ''),
        status: 'registering',
        price_cents: Math.round(price * 100),
        cost_cents: 800, // ~€8 cost for .nl (adjust per TLD)
      })
      .select()
      .single();

    if (insertError) {
      console.error('DB insert error:', insertError);
      return NextResponse.json(
        { error: 'Kon domein niet opslaan' },
        { status: 500 }
      );
    }

    // 3. Register domain at TransIP
    const registration = await registerDomain(cleanedDomain, config);
    
    if (!registration.success) {
      // Update status to failed
      await supabase
        .from('custom_domains')
        .update({ status: 'failed' })
        .eq('id', domainRecord.id);

      return NextResponse.json(
        { error: `Registratie mislukt: ${registration.error}` },
        { status: 500 }
      );
    }

    // 4. Configure DNS for Vercel
    const dnsConfigured = await configureDNSForVercel(cleanedDomain, config);

    // 5. Add domain to Vercel project
    const vercelResult = await addDomainToVercel(cleanedDomain);
    // Also add www variant
    await addDomainToVercel(`www.${cleanedDomain}`);

    const isFullyActive = dnsConfigured && vercelResult.success;

    // 6. Update database with success
    await supabase
      .from('custom_domains')
      .update({
        status: isFullyActive ? 'active' : 'dns_configuring',
        dns_configured: dnsConfigured,
        vercel_verified: vercelResult.verified,
        registered_at: new Date().toISOString(),
        // Expires in 1 year
        expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      })
      .eq('id', domainRecord.id);

    // 6. Update site with custom domain
    await supabase
      .from('sites')
      .update({ custom_domain: cleanedDomain })
      .eq('id', siteId);

    return NextResponse.json({
      success: true,
      domain: cleanedDomain,
      status: isFullyActive ? 'active' : 'dns_configuring',
      message: 'Domein succesvol geregistreerd!',
      price: price,
      priceFormatted: `€${price.toFixed(2).replace('.', ',')}/jaar`,
      nextSteps: isFullyActive
        ? ['Je domein is actief en klaar voor gebruik!']
        : [
            'DNS wordt geconfigureerd (kan tot 24 uur duren)',
            'Je krijgt een email zodra alles klaar is',
          ],
    });

  } catch (error) {
    console.error('Domain registration error:', error);
    return NextResponse.json(
      { error: 'Er ging iets mis bij de registratie' },
      { status: 500 }
    );
  }
}
