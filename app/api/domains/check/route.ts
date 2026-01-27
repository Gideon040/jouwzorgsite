// app/api/domains/check/route.ts
// Check if a domain is available via TransIP API

import { NextRequest, NextResponse } from 'next/server';
import { 
  checkDomain, 
  getTransIPConfig, 
  isValidDomain, 
  cleanDomain,
  getDomainPrice,
  getTLD 
} from '@/lib/transip';

export async function POST(request: NextRequest) {
  try {
    const { domain } = await request.json();

    if (!domain || typeof domain !== 'string') {
      return NextResponse.json(
        { error: 'Domein is verplicht' },
        { status: 400 }
      );
    }

    // Clean and validate
    const clean = cleanDomain(domain);
    
    if (!isValidDomain(clean)) {
      return NextResponse.json(
        { error: 'Ongeldig domein formaat. Voorbeeld: mijnzorg.nl' },
        { status: 400 }
      );
    }

    // Check availability via TransIP
    const config = getTransIPConfig();
    const result = await checkDomain(clean, config);

    return NextResponse.json({
      domain: clean,
      available: result.available,
      status: result.status,
      tld: getTLD(clean),
      price: getDomainPrice(clean),
      priceFormatted: `€${getDomainPrice(clean).toFixed(2).replace('.', ',')}/jaar`,
    });

  } catch (error) {
    console.error('Domain check error:', error);
    
    // Check if it's a config error
    if (error instanceof Error && error.message.includes('must be set')) {
      return NextResponse.json(
        { error: 'Domein service tijdelijk niet beschikbaar' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'Kon beschikbaarheid niet controleren' },
      { status: 500 }
    );
  }
}

// GET for quick check via query param
export async function GET(request: NextRequest) {
  const domain = request.nextUrl.searchParams.get('domain');
  
  if (!domain) {
    return NextResponse.json(
      { error: 'domain parameter is verplicht' },
      { status: 400 }
    );
  }

  // Forward to POST handler
  return POST(new NextRequest(request.url, {
    method: 'POST',
    body: JSON.stringify({ domain }),
  }));
}
