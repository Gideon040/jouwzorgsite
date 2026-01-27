// app/api/domains/suggestions/route.ts
// Generate domain suggestions based on user's name

import { NextRequest, NextResponse } from 'next/server';
import { 
  checkMultipleDomains, 
  getTransIPConfig, 
  getDomainPrice,
  getTLD 
} from '@/lib/transip';

// Generate domain suggestions based on name
function generateSuggestions(naam: string, beroep?: string): string[] {
  // Clean name - remove special chars, lowercase
  const cleanName = naam
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim();
  
  // Split into parts
  const parts = cleanName.split(/\s+/).filter(Boolean);
  const firstName = parts[0] || 'zorg';
  const lastName = parts[parts.length - 1] || '';
  const fullName = parts.join('');
  const fullNameDash = parts.join('-');

  // Beroep keywords
  const beroepKeywords: Record<string, string[]> = {
    verpleegkundige: ['verpleging', 'zorg', 'care', 'nursing'],
    verzorgende_ig: ['verzorging', 'zorg', 'care'],
    kraamverzorgende: ['kraam', 'kraamzorg', 'baby'],
    thuiszorg: ['thuiszorg', 'thuis', 'home'],
    pgb_zorgverlener: ['pgb', 'zorg', 'care'],
    anders: ['zorg', 'care'],
  };
  
  const keywords = beroepKeywords[beroep || 'anders'] || ['zorg'];

  // TLDs to try (in order of preference)
  const tlds = ['.nl', '.com', '.eu', '.online', '.site'];
  
  // Generate variations
  const suggestions: string[] = [];
  
  // Name variations
  const nameVariations = [
    fullName,                           // lisadevries
    fullNameDash,                       // lisa-de-vries
    firstName,                          // lisa
    firstName + lastName,               // lisavries
    firstName + '-' + lastName,         // lisa-vries
    ...keywords.map(k => firstName + k), // lisazorg, lisacare
    ...keywords.map(k => firstName + '-' + k), // lisa-zorg
    ...keywords.map(k => fullName + k),  // lisadevriesvzorg
  ].filter(n => n.length >= 3 && n.length <= 30);

  // Combine with TLDs
  for (const name of nameVariations) {
    for (const tld of tlds) {
      suggestions.push(name + tld);
    }
  }

  // Return unique suggestions, prioritize .nl
  return [...new Set(suggestions)].slice(0, 20);
}

export async function POST(request: NextRequest) {
  try {
    const { naam, beroep } = await request.json();

    if (!naam || typeof naam !== 'string') {
      return NextResponse.json(
        { error: 'Naam is verplicht' },
        { status: 400 }
      );
    }

    // Generate suggestions
    const suggestions = generateSuggestions(naam, beroep);
    
    // Check availability via TransIP (batch)
    const config = getTransIPConfig();
    const results = await checkMultipleDomains(suggestions, config);

    // Format results with pricing
    const formattedResults = results.map(r => ({
      domain: r.domain,
      available: r.available,
      status: r.status,
      tld: getTLD(r.domain),
      price: getDomainPrice(r.domain),
      priceFormatted: `€${getDomainPrice(r.domain).toFixed(2).replace('.', ',')}/jaar`,
    }));

    // Sort: available first, then by TLD preference (.nl first)
    const tldPriority: Record<string, number> = {
      '.nl': 1,
      '.eu': 2,
      '.com': 3,
      '.online': 4,
      '.site': 5,
    };

    formattedResults.sort((a, b) => {
      // Available first
      if (a.available !== b.available) return a.available ? -1 : 1;
      // Then by TLD
      const aPri = tldPriority[a.tld] || 10;
      const bPri = tldPriority[b.tld] || 10;
      return aPri - bPri;
    });

    return NextResponse.json({
      suggestions: formattedResults,
      availableCount: formattedResults.filter(r => r.available).length,
    });

  } catch (error) {
    console.error('Suggestions error:', error);

    // If TransIP not configured, return suggestions without availability
    const { naam, beroep } = await request.json().catch(() => ({ naam: '', beroep: '' }));
    const suggestions = generateSuggestions(naam || 'zorg', beroep);

    return NextResponse.json({
      suggestions: suggestions.map(domain => ({
        domain,
        available: null, // Unknown
        status: 'unchecked',
        tld: getTLD(domain),
        price: getDomainPrice(domain),
        priceFormatted: `€${getDomainPrice(domain).toFixed(2).replace('.', ',')}/jaar`,
      })),
      availableCount: null,
      note: 'Beschikbaarheid kon niet worden gecontroleerd',
    });
  }
}
