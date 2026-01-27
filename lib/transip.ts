// lib/transip.ts
// TransIP API v6 Client voor domein registratie
// Docs: https://api.transip.nl/rest/docs.html

import * as crypto from 'crypto';

const TRANSIP_API_URL = 'https://api.transip.nl/v6';

interface TransIPConfig {
  login: string;
  privateKey: string;
}

interface DomainAvailabilityItem {
  domainName: string;
  status: 'free' | 'notfree' | 'internalpull' | 'internalpush';
  actions: string[];
}

interface DNSEntry {
  name: string;
  expire: number;
  type: 'A' | 'AAAA' | 'CNAME' | 'MX' | 'NS' | 'TXT' | 'SRV' | 'SSHFP' | 'TLSA' | 'CAA';
  content: string;
}

// Token cache
let cachedToken: string | null = null;
let tokenExpiry: number = 0;

/**
 * Generate access token for TransIP API
 */
async function getAccessToken(config: TransIPConfig): Promise<string> {
  // Return cached token if still valid
  if (cachedToken && Date.now() < tokenExpiry) {
    return cachedToken;
  }

  const nonce = crypto.randomBytes(16).toString('hex');
  
  const requestBody = {
    login: config.login,
    nonce: nonce,
    read_only: false,
    expiration_time: '30 minutes',
    label: `JouwZorgSite-${Date.now()}`,
    global_key: true
  };

  // Create signature
  const bodyString = JSON.stringify(requestBody);
  const sign = crypto.createSign('SHA512');
  sign.update(bodyString);
  const signature = sign.sign(config.privateKey, 'base64');

  const response = await fetch(`${TRANSIP_API_URL}/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Signature': signature,
    },
    body: bodyString,
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('TransIP auth failed:', response.status, error);
    throw new Error(`TransIP auth failed: ${response.status}`);
  }

  const data = await response.json();
  cachedToken = data.token;
  tokenExpiry = Date.now() + 25 * 60 * 1000; // 25 min (token is valid for 30)
  
  return cachedToken!;
}

/**
 * Make authenticated request to TransIP API
 */
async function apiRequest<T>(
  endpoint: string,
  config: TransIPConfig,
  options: RequestInit = {}
): Promise<T> {
  const token = await getAccessToken(config);
  
  const response = await fetch(`${TRANSIP_API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  });

  const text = await response.text();
  
  if (!response.ok) {
    console.error(`TransIP API error [${endpoint}]:`, response.status, text);
    throw new Error(`TransIP API error: ${response.status} - ${text}`);
  }

  return (text ? JSON.parse(text) : {}) as T;
}

// ============ PUBLIC API FUNCTIONS ============

/**
 * Check if a domain is available
 */
export async function checkDomain(
  domain: string,
  config: TransIPConfig
): Promise<{ available: boolean; status: string }> {
  try {
    const data = await apiRequest<{ availability: DomainAvailabilityItem }>(
      `/domain-availability/${encodeURIComponent(domain)}`,
      config
    );
    
    return {
      available: data.availability.status === 'free',
      status: data.availability.status,
    };
  } catch (error) {
    console.error('Domain check error:', error);
    return { available: false, status: 'error' };
  }
}

/**
 * Check multiple domains at once
 */
export async function checkMultipleDomains(
  domains: string[],
  config: TransIPConfig
): Promise<Array<{ domain: string; available: boolean; status: string }>> {
  try {
    const queryString = domains.map(d => `domainNames[]=${encodeURIComponent(d)}`).join('&');
    const data = await apiRequest<{ availability: DomainAvailabilityItem[] }>(
      `/domain-availability?${queryString}`,
      config
    );
    
    return data.availability.map(item => ({
      domain: item.domainName,
      available: item.status === 'free',
      status: item.status,
    }));
  } catch (error) {
    console.error('Multiple domain check error:', error);
    return domains.map(d => ({ domain: d, available: false, status: 'error' }));
  }
}

/**
 * Register a new domain
 */
export async function registerDomain(
  domain: string,
  config: TransIPConfig
): Promise<{ success: boolean; error?: string }> {
  try {
    await apiRequest(
      '/domains',
      config,
      {
        method: 'POST',
        body: JSON.stringify({ domainName: domain }),
      }
    );
    
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, error: message };
  }
}

/**
 * Get all domains on account
 */
export async function listDomains(config: TransIPConfig): Promise<string[]> {
  try {
    const data = await apiRequest<{ domains: Array<{ name: string }> }>('/domains', config);
    return data.domains.map(d => d.name);
  } catch (error) {
    console.error('List domains error:', error);
    return [];
  }
}

/**
 * Get DNS entries for a domain
 */
export async function getDNS(domain: string, config: TransIPConfig): Promise<DNSEntry[]> {
  try {
    const data = await apiRequest<{ dnsEntries: DNSEntry[] }>(
      `/domains/${encodeURIComponent(domain)}/dns`,
      config
    );
    return data.dnsEntries;
  } catch (error) {
    console.error('Get DNS error:', error);
    return [];
  }
}

/**
 * Set DNS entries for a domain (replaces all existing)
 */
export async function setDNS(
  domain: string,
  entries: DNSEntry[],
  config: TransIPConfig
): Promise<boolean> {
  try {
    await apiRequest(
      `/domains/${encodeURIComponent(domain)}/dns`,
      config,
      {
        method: 'PUT',
        body: JSON.stringify({ dnsEntries: entries }),
      }
    );
    return true;
  } catch (error) {
    console.error('Set DNS error:', error);
    return false;
  }
}

/**
 * Configure DNS for Vercel hosting
 */
export async function configureDNSForVercel(
  domain: string,
  config: TransIPConfig
): Promise<boolean> {
  const entries: DNSEntry[] = [
    // Root domain → Vercel A record
    { name: '@', expire: 300, type: 'A', content: '76.76.21.21' },
    // www → CNAME to Vercel
    { name: 'www', expire: 300, type: 'CNAME', content: 'cname.vercel-dns.com' },
  ];
  
  return setDNS(domain, entries, config);
}

/**
 * Get auth code (verhuiscode) for domain transfer
 */
export async function getAuthCode(domain: string, config: TransIPConfig): Promise<string | null> {
  try {
    const data = await apiRequest<{ domain: { authCode: string } }>(
      `/domains/${encodeURIComponent(domain)}`,
      config
    );
    return data.domain.authCode;
  } catch (error) {
    console.error('Get auth code error:', error);
    return null;
  }
}

// ============ HELPER FUNCTIONS ============

/**
 * Get config from environment variables
 */
export function getTransIPConfig(): TransIPConfig {
  const login = process.env.TRANSIP_LOGIN;
  const privateKey = process.env.TRANSIP_PRIVATE_KEY;

  if (!login || !privateKey) {
    throw new Error('TRANSIP_LOGIN and TRANSIP_PRIVATE_KEY must be set');
  }

  // Handle escaped newlines in env var
  const formattedKey = privateKey.includes('-----BEGIN')
    ? privateKey
    : `-----BEGIN PRIVATE KEY-----\n${privateKey.replace(/\\n/g, '\n')}\n-----END PRIVATE KEY-----`;

  return { login, privateKey: formattedKey };
}

/**
 * Validate domain format
 */
export function isValidDomain(domain: string): boolean {
  const regex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i;
  return regex.test(domain);
}

/**
 * Clean domain input
 */
export function cleanDomain(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/.*$/, '');
}

/**
 * Extract TLD from domain
 */
export function getTLD(domain: string): string {
  const parts = domain.split('.');
  return '.' + parts[parts.length - 1];
}

// Domain pricing for customers (jouw verkoopprijzen per jaar)
export const DOMAIN_PRICES: Record<string, number> = {
  '.nl': 14.95,
  '.com': 19.95,
  '.eu': 14.95,
  '.be': 14.95,
  '.de': 14.95,
  '.net': 19.95,
  '.org': 19.95,
  '.online': 9.95,
  '.site': 9.95,
};

export function getDomainPrice(domain: string): number {
  const tld = getTLD(domain);
  return DOMAIN_PRICES[tld] || 19.95;
}