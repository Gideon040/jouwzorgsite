// app/api/track/route.ts
// Lightweight page view tracker — called from SiteTracker component

import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { siteId, pathname, referrer } = await req.json();

    if (!siteId) {
      return NextResponse.json({ error: 'Missing siteId' }, { status: 400 });
    }

    // Device detection from User-Agent
    const ua = req.headers.get('user-agent') || '';
    const device = /mobile|android|iphone/i.test(ua)
      ? 'mobile'
      : /tablet|ipad/i.test(ua)
        ? 'tablet'
        : 'desktop';

    // Country from Vercel/CF headers
    const country =
      req.headers.get('x-vercel-ip-country') ||
      req.headers.get('cf-ipcountry') ||
      null;

    const supabase = await createClient();

    await supabase.from('site_visits').insert({
      site_id: siteId,
      pathname: pathname || '/',
      referrer: referrer || null,
      country,
      device,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Track failed' }, { status: 500 });
  }
}
