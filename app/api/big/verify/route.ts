// app/api/big/verify/route.ts
// BIG Register API - Zoek zorgverleners en verifieer BIG-nummer

import { NextRequest, NextResponse } from 'next/server';

const BIG_API_URL = 'https://api.bigregister.nl:443/zksrv/soap/4';

// SOAP request builder
function buildSoapRequest(name: string, city?: string, postalcode?: string, professionalGroup?: string, initials?: string): string {
  return `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://services.cibg.nl/ExternalUser">
  <soap:Body>
    <tns:listHcpApproxRequest>
      <tns:WebSite>Ribiz</tns:WebSite>
      ${name ? `<tns:Name>${escapeXml(name)}</tns:Name>` : ''}
      ${initials ? `<tns:Initials>${escapeXml(initials)}</tns:Initials>` : ''}
      ${city ? `<tns:City>${escapeXml(city)}</tns:City>` : ''}
      ${postalcode ? `<tns:Postalcode>${escapeXml(postalcode)}</tns:Postalcode>` : ''}
      ${professionalGroup ? `<tns:ProfessionalGroup>${escapeXml(professionalGroup)}</tns:ProfessionalGroup>` : ''}
    </tns:listHcpApproxRequest>
  </soap:Body>
</soap:Envelope>`;
}

// Escape XML special characters
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Parse SOAP response
function parseSoapResponse(xml: string): BigRegistration[] {
  const results: BigRegistration[] = [];
  
  // Extract all ListHcpApprox4 elements
  const personMatches = xml.match(/<ListHcpApprox4>([\s\S]*?)<\/ListHcpApprox4>/g) || [];
  
  for (const personXml of personMatches) {
    const registration: BigRegistration = {
      naam: '',
      voorletters: '',
      tussenvoegsel: '',
      geslacht: '',
      bigNummer: '',
      beroep: '',
      beroepCode: '',
      specialismen: [],
      geldigVan: '',
      geldigTot: '',
      werkadres: null,
    };
    
    // Parse basic info
    registration.naam = extractValue(personXml, 'BirthSurname') || extractValue(personXml, 'MailingName') || '';
    registration.voorletters = extractValue(personXml, 'Initial') || '';
    registration.tussenvoegsel = extractValue(personXml, 'Prefix') || '';
    registration.geslacht = extractValue(personXml, 'Gender') || '';
    
    // Parse BIG registration
    const articleMatch = personXml.match(/<ArticleRegistrationExtApp>([\s\S]*?)<\/ArticleRegistrationExtApp>/);
    if (articleMatch) {
      registration.bigNummer = extractValue(articleMatch[1], 'ArticleRegistrationNumber') || '';
      registration.geldigVan = extractValue(articleMatch[1], 'ArticleRegistrationStartDate') || '';
      registration.geldigTot = extractValue(articleMatch[1], 'ArticleRegistrationEndDate') || '';
      registration.beroepCode = extractValue(articleMatch[1], 'ProfessionalGroupCode') || '';
      registration.beroep = mapBeroepCode(registration.beroepCode);
    }
    
    // Parse work address
    const addressMatch = personXml.match(/<WorkAddress1>([\s\S]*?)<\/WorkAddress1>/);
    if (addressMatch) {
      registration.werkadres = {
        straat: extractValue(addressMatch[1], 'StreetName') || '',
        huisnummer: extractValue(addressMatch[1], 'HouseNumber') || '',
        postcode: extractValue(addressMatch[1], 'PostalCode') || '',
        stad: extractValue(addressMatch[1], 'City') || '',
      };
    }
    
    // Parse specialisms
    const specialismMatches = personXml.match(/<SpecialismExtApp1>([\s\S]*?)<\/SpecialismExtApp1>/g) || [];
    for (const specXml of specialismMatches) {
      const specId = extractValue(specXml, 'TypeOfSpecialismId');
      if (specId) {
        const specNaam = mapSpecialismeCode(specId);
        if (specNaam) {
          registration.specialismen.push({
            code: specId,
            naam: specNaam,
          });
        }
      }
    }
    
    if (registration.bigNummer) {
      results.push(registration);
    }
  }
  
  return results;
}

// Extract value from XML
function extractValue(xml: string, tag: string): string | null {
  const match = xml.match(new RegExp(`<${tag}>([^<]*)</${tag}>`));
  return match ? match[1].trim() : null;
}

// Map beroep code to readable name (officiële CIBG codes)
function mapBeroepCode(code: string): string {
  const beroepen: Record<string, string> = {
    '01': 'Arts',
    '02': 'Tandarts',
    '03': 'Verloskundige',
    '04': 'Fysiotherapeut',
    '16': 'Psychotherapeut',
    '17': 'Apotheker',
    '18': 'Apotheekhoudend arts',
    '25': 'Gezondheidszorgpsycholoog',
    '30': 'Verpleegkundige',
    '31': 'Orthopedagoog-generalist',
    '32': 'Regieverpleegkundige',
    '79': 'Geregistreerd-mondhygiënist',
    '80': 'Bachelor Medisch Hulpverlener',
    '81': 'Physician assistant',
    '82': 'Klinisch technoloog',
    '83': 'Apothekersassistent',
    '84': 'Klinisch fysicus',
    '85': 'Tandprotheticus',
    '86': 'Verzorgende IG',
    '87': 'Optometrist',
    '88': 'Huidtherapeut',
    '89': 'Diëtist',
    '90': 'Ergotherapeut',
    '91': 'Logopedist',
    '92': 'Mondhygiënist',
    '93': 'Oefentherapeut Mensendieck',
    '94': 'Oefentherapeut',
    '95': 'Orthoptist',
    '96': 'Podotherapeut',
    '97': 'Radiodiagnostisch laborant',
    '98': 'Radiotherapeutisch laborant',
    '99': 'Onbekend',
  };
  return beroepen[code] || `Onbekend beroep (${code})`;
}

// Map specialisme code to readable name
function mapSpecialismeCode(code: string): string | null {
  const specialismen: Record<string, string> = {
    // Arts specialismen
    '2': 'Allergologie',
    '3': 'Anesthesiologie',
    '8': 'Bedrijfsgeneeskunde',
    '10': 'Cardiologie',
    '11': 'Cardio-thoracale chirurgie',
    '12': 'Dermatologie',
    '13': 'Maag-darm-leverziekten',
    '14': 'Heelkunde',
    '15': 'Huisartsgeneeskunde',
    '16': 'Interne geneeskunde',
    '18': 'KNO-heelkunde',
    '19': 'Kindergeneeskunde',
    '20': 'Klinische chemie',
    '21': 'Klinische genetica',
    '22': 'Klinische geriatrie',
    '23': 'Longziekten',
    '24': 'Medische microbiologie',
    '25': 'Neurochirurgie',
    '26': 'Neurologie',
    '30': 'Nucleaire geneeskunde',
    '31': 'Oogheelkunde',
    '32': 'Orthopedie',
    '33': 'Pathologie',
    '34': 'Plastische chirurgie',
    '35': 'Psychiatrie',
    '39': 'Radiologie',
    '40': 'Radiotherapie',
    '41': 'Reumatologie',
    '42': 'Revalidatiegeneeskunde',
    '45': 'Urologie',
    '46': 'Gynaecologie',
    '47': 'Ouderengeneeskunde',
    '48': 'Verzekeringsgeneeskunde',
    '50': 'Zenuw- en zielsziekten',
    '55': 'Maatschappij en gezondheid',
    '56': 'Geneeskunde verstandelijk gehandicapten',
    '70': 'Jeugdgezondheidszorg',
    '71': 'Spoedeisende geneeskunde',
    '74': 'Sportgeneeskunde',
    // Tandarts specialismen
    '53': 'Orthodontie',
    '54': 'Kaakchirurgie',
    // Apotheker specialismen
    '60': 'Ziekenhuisfarmacie',
    '75': 'Openbare farmacie',
    // GZ-psycholoog specialismen
    '61': 'Klinische psychologie',
    '63': 'Klinische neuropsychologie',
    // Verpleegkundig specialist specialismen
    '65': 'Preventieve zorg somatiek',
    '66': 'Acute zorg somatiek',
    '67': 'Intensieve zorg somatiek',
    '68': 'Chronische zorg somatiek',
    '69': 'Geestelijke gezondheidszorg',
    '76': 'Algemene gezondheidszorg',
  };
  return specialismen[code] ?? null;
}

// Types
interface BigRegistration {
  naam: string;
  voorletters: string;
  tussenvoegsel: string;
  geslacht: string;
  bigNummer: string;
  beroep: string;
  beroepCode: string;
  specialismen: { code: string; naam: string }[];
  geldigVan: string;
  geldigTot: string;
  werkadres: {
    straat: string;
    huisnummer: string;
    postcode: string;
    stad: string;
  } | null;
}

// Check if BIG registration is currently valid
function isValid(registration: BigRegistration): boolean {
  if (!registration.geldigTot) return false;
  const endDate = new Date(registration.geldigTot);
  return endDate > new Date();
}

// API Route Handler
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { naam, stad, postcode, beroepCode } = body;
    
    if (!naam || naam.length < 2) {
      return NextResponse.json(
        { error: 'Naam is verplicht (minimaal 2 karakters)' },
        { status: 400 }
      );
    }
    
    // Build SOAP request
    const soapRequest = buildSoapRequest(naam, stad, postcode, beroepCode);
    
    console.log('🔍 BIG API Request voor:', naam, stad || '');
    
    // Call BIG API
    const response = await fetch(BIG_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': 'http://services.cibg.nl/ExternalUser/ListHcpApprox4',
      },
      body: soapRequest,
    });
    
    if (!response.ok) {
      console.error('BIG API error:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'BIG Register niet bereikbaar' },
        { status: 502 }
      );
    }
    
    const xmlResponse = await response.text();
    
    // Parse response
    const registrations = parseSoapResponse(xmlResponse);
    
    console.log(`✅ BIG API: ${registrations.length} resultaten gevonden`);
    
    // Add validity status and format response
    const results = registrations.map(reg => ({
      ...reg,
      isGeldig: isValid(reg),
      volledigeNaam: [reg.voorletters, reg.tussenvoegsel, reg.naam].filter(Boolean).join(' ').trim(),
      geslachtLabel: reg.geslacht === 'M' ? 'Man' : reg.geslacht === 'V' ? 'Vrouw' : 'Onbekend',
      specialismenLabels: reg.specialismen.map(s => s.naam),
    }));
    
    return NextResponse.json({
      success: true,
      count: results.length,
      results,
    });
    
  } catch (error) {
    console.error('BIG verify error:', error);
    return NextResponse.json(
      { error: 'Er ging iets mis bij het verifiëren' },
      { status: 500 }
    );
  }
}

// GET endpoint for simple testing
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const naam = searchParams.get('naam');
  const initials = searchParams.get('initials');
  const stad = searchParams.get('stad');
  
  if (!naam) {
    return NextResponse.json({
      usage: 'GET /api/big/verify?naam=Jansen&initials=A.',
      description: 'Zoek zorgverleners in het BIG Register',
    });
  }
  
  console.log('🔍 BIG API Request voor:', naam, initials || '');
  
  try {
    // Build SOAP request
    const soapRequest = buildSoapRequest(naam, undefined, undefined, undefined, initials || undefined);
    
    // Call BIG API
    const response = await fetch(BIG_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': 'http://services.cibg.nl/ExternalUser/ListHcpApprox4',
      },
      body: soapRequest,
    });
    
    if (!response.ok) {
      console.error('BIG API error:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'BIG Register niet bereikbaar' },
        { status: 502 }
      );
    }
    
    const xmlResponse = await response.text();
    
    // Check for SOAP fault
    if (xmlResponse.includes('soap:Fault')) {
      const faultMatch = xmlResponse.match(/<faultstring>([^<]*)<\/faultstring>/);
      const faultMessage = faultMatch ? faultMatch[1] : 'Onbekende fout';
      console.error('SOAP Fault:', faultMessage);
      return NextResponse.json(
        { error: faultMessage, hint: 'Probeer specifieker te zoeken (voeg initialen toe)' },
        { status: 400 }
      );
    }
    
    // Parse response
    const registrations = parseSoapResponse(xmlResponse);
    
    console.log(`✅ BIG API: ${registrations.length} resultaten gevonden`);
    
    // Add validity status and format response
    const results = registrations.map(reg => ({
      ...reg,
      isGeldig: isValid(reg),
      volledigeNaam: [reg.voorletters, reg.tussenvoegsel, reg.naam].filter(Boolean).join(' ').trim(),
      geslachtLabel: reg.geslacht === 'M' ? 'Man' : reg.geslacht === 'V' ? 'Vrouw' : 'Onbekend',
      specialismenLabels: reg.specialismen.map(s => s.naam),
    }));
    
    return NextResponse.json({
      success: true,
      count: results.length,
      results,
    });
    
  } catch (error) {
    console.error('BIG API error:', error);
    return NextResponse.json(
      { error: 'Er ging iets mis bij het verifiëren' },
      { status: 500 }
    );
  }
}