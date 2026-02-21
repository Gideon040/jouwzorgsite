// app/api/widget/[subdomain]/route.ts
// Publieke API voor de trust widget data
// Geen authenticatie nodig - RPC is SECURITY DEFINER

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { subdomain: string } }
) {
  try {
    const supabase = await createClient();
    const { subdomain } = params;

    if (!subdomain) {
      return NextResponse.json(
        { error: 'Subdomain is verplicht' },
        { status: 400 }
      );
    }

    // RPC is SECURITY DEFINER — werkt zonder service role key
    const { data, error } = await supabase.rpc('get_widget_data', {
      site_subdomain: subdomain,
    });

    if (error) {
      console.error('Widget data error:', error);
      return NextResponse.json(
        { error: 'Widget niet beschikbaar' },
        { status: 404 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Geen widget gevonden voor deze site' },
        { status: 404 }
      );
    }

    // Haal widget_style op (RPC retourneert dit niet)
    const { data: siteRow } = await supabase
      .from('sites')
      .select('id')
      .eq('subdomain', subdomain)
      .single();

    let widgetStyle = 'default';
    if (siteRow) {
      const { data: declData } = await supabase
        .from('professional_declarations')
        .select('widget_style')
        .eq('site_id', siteRow.id)
        .single();
      if (declData?.widget_style) {
        widgetStyle = declData.widget_style;
      }
    }

    const responseData = {
      ...data,
      widget_style: widgetStyle,
    };

    // Cache de response voor 5 minuten (publieke data)
    return NextResponse.json(responseData, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Widget API error:', error);
    return NextResponse.json(
      { error: 'Er ging iets mis' },
      { status: 500 }
    );
  }
}