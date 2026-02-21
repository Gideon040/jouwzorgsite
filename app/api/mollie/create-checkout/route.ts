import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getMollieClient } from '@/lib/mollie';
import { SequenceType } from '@mollie/api-client';

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

    const { siteId } = await request.json();

    if (!siteId) {
      return NextResponse.json(
        { error: 'Site ID is verplicht' },
        { status: 400 }
      );
    }

    // Verify site belongs to user
    const { data: site, error: siteError } = await supabase
      .from('sites')
      .select('id, subdomain, user_id')
      .eq('id', siteId)
      .eq('user_id', user.id)
      .single();

    if (siteError || !site) {
      return NextResponse.json(
        { error: 'Site niet gevonden' },
        { status: 404 }
      );
    }

    // Check if subscription already exists
    const { data: existingSub } = await supabase
      .from('subscriptions')
      .select('id, status')
      .eq('site_id', siteId)
      .eq('user_id', user.id)
      .in('status', ['active', 'pending'])
      .maybeSingle();

    if (existingSub?.status === 'active') {
      return NextResponse.json(
        { error: 'Er bestaat al een actief abonnement voor deze site' },
        { status: 400 }
      );
    }

    // Create Mollie customer
    const customer = await getMollieClient().customers.create({
      name: user.user_metadata?.full_name || user.email || 'Klant',
      email: user.email!,
      metadata: JSON.stringify({ userId: user.id }),
    });

    // Create first payment (mandate creation)
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://jouwzorgsite.nl';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payment = await (getMollieClient().payments.create as any)({
      amount: { currency: 'EUR', value: '0.01' },
      customerId: customer.id,
      sequenceType: SequenceType.first,
      description: 'JouwZorgSite - Proefperiode activeren',
      redirectUrl: `${baseUrl}/checkout/return?siteId=${siteId}`,
      webhookUrl: `${baseUrl}/api/mollie/webhook`,
      metadata: JSON.stringify({ siteId, userId: user.id }),
    }) as { _links: { checkout?: { href: string } } };

    // Create or update subscription record
    if (existingSub) {
      await supabase
        .from('subscriptions')
        .update({
          mollie_customer_id: customer.id,
          status: 'pending',
        })
        .eq('id', existingSub.id);
    } else {
      await supabase
        .from('subscriptions')
        .insert({
          user_id: user.id,
          site_id: siteId,
          mollie_customer_id: customer.id,
          plan: 'starter',
          status: 'pending',
        });
    }

    const checkoutUrl = payment._links?.checkout?.href;

    if (!checkoutUrl) {
      return NextResponse.json(
        { error: 'Kon geen checkout URL aanmaken' },
        { status: 500 }
      );
    }

    return NextResponse.json({ checkoutUrl });

  } catch (error) {
    console.error('Mollie checkout error:', error);
    return NextResponse.json(
      { error: 'Er ging iets mis bij het starten van de betaling' },
      { status: 500 }
    );
  }
}
