import { NextRequest, NextResponse } from 'next/server';
import { createClient as createSupabaseAdmin } from '@supabase/supabase-js';
import { getMollieClient } from '@/lib/mollie';

// Use service role for webhook — no user session available
function getAdminClient() {
  return createSupabaseAdmin(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const paymentId = formData.get('id') as string;

    if (!paymentId) {
      return NextResponse.json({ error: 'Missing payment ID' }, { status: 400 });
    }

    // Fetch payment from Mollie to verify and get details
    const payment = await getMollieClient().payments.get(paymentId);
    const metadata = typeof payment.metadata === 'string'
      ? JSON.parse(payment.metadata)
      : payment.metadata as { siteId?: string; userId?: string } | null;

    const siteId = metadata?.siteId;
    const userId = metadata?.userId;

    if (!siteId || !userId) {
      console.error('Webhook: missing metadata', { paymentId, metadata });
      return new NextResponse('OK', { status: 200 });
    }

    const supabase = getAdminClient();

    // First payment completed — create subscription + publish site
    if (payment.status === 'paid' && payment.sequenceType === 'first') {
      // Get the subscription record
      const { data: sub } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('site_id', siteId)
        .eq('user_id', userId)
        .single();

      if (!sub) {
        console.error('Webhook: subscription record not found', { siteId, userId });
        return new NextResponse('OK', { status: 200 });
      }

      // Create Mollie recurring subscription (starts after 14 day trial)
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + 14);
      const startDateStr = startDate.toISOString().split('T')[0]; // YYYY-MM-DD

      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://jouwzorgsite.nl';

      const mollieSubscription = await getMollieClient().customerSubscriptions.create({
        customerId: sub.mollie_customer_id,
        amount: { currency: 'EUR', value: '14.95' },
        interval: '1 month',
        startDate: startDateStr,
        description: 'JouwZorgSite Starter - Maandelijks',
        webhookUrl: `${baseUrl}/api/mollie/webhook`,
        metadata: JSON.stringify({ siteId, userId }),
      });

      // Calculate trial period end
      const periodEnd = new Date(startDateStr);
      periodEnd.setMonth(periodEnd.getMonth() + 1);

      // Update subscription record
      await supabase
        .from('subscriptions')
        .update({
          mollie_subscription_id: mollieSubscription.id,
          status: 'active',
          current_period_end: periodEnd.toISOString(),
        })
        .eq('id', sub.id);

      // Publish the site
      await supabase
        .from('sites')
        .update({ published: true })
        .eq('id', siteId);

      console.log('Webhook: subscription created, site published', { siteId, mollieSubscriptionId: mollieSubscription.id });

      return new NextResponse('OK', { status: 200 });
    }

    // Recurring payment succeeded
    if (payment.status === 'paid' && payment.subscriptionId) {
      const periodStart = new Date().toISOString();
      const periodEnd = new Date();
      periodEnd.setMonth(periodEnd.getMonth() + 1);

      await supabase
        .from('subscriptions')
        .update({
          status: 'active',
          current_period_end: periodEnd.toISOString(),
        })
        .eq('mollie_subscription_id', payment.subscriptionId);

      console.log('Webhook: recurring payment received', { subscriptionId: payment.subscriptionId });

      return new NextResponse('OK', { status: 200 });
    }

    // Payment failed or expired
    if (payment.status === 'failed' || payment.status === 'expired') {
      if (payment.subscriptionId) {
        await supabase
          .from('subscriptions')
          .update({ status: 'past_due' })
          .eq('mollie_subscription_id', payment.subscriptionId);

        console.log('Webhook: payment failed/expired', { subscriptionId: payment.subscriptionId, status: payment.status });
      }

      return new NextResponse('OK', { status: 200 });
    }

    // All other statuses — just acknowledge
    return new NextResponse('OK', { status: 200 });

  } catch (error) {
    console.error('Webhook error:', error);
    // Always return 200 to prevent Mollie from retrying endlessly
    return new NextResponse('OK', { status: 200 });
  }
}
