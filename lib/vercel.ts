// lib/vercel.ts
// Vercel API client for adding/removing domains from project

const VERCEL_API_URL = 'https://api.vercel.com';

interface VercelDomainResponse {
  name: string;
  apexName: string;
  verified: boolean;
  verification?: Array<{ type: string; domain: string; value: string; reason: string }>;
  error?: { code: string; message: string };
}

/**
 * Add a domain to the Vercel project
 */
export async function addDomainToVercel(domain: string): Promise<{
  success: boolean;
  verified: boolean;
  error?: string;
}> {
  const token = process.env.VERCEL_API_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  const teamId = process.env.VERCEL_TEAM_ID;

  if (!token || !projectId) {
    console.error('Vercel: VERCEL_API_TOKEN or VERCEL_PROJECT_ID not configured');
    return { success: false, verified: false, error: 'Vercel configuratie ontbreekt' };
  }

  try {
    const url = new URL(`${VERCEL_API_URL}/v10/projects/${projectId}/domains`);
    if (teamId) url.searchParams.set('teamId', teamId);

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: domain }),
    });

    const data = await response.json() as VercelDomainResponse;

    if (!response.ok) {
      // Domain already exists on this project — that's fine
      if (data.error?.code === 'domain_already_in_use') {
        console.log(`Vercel: domain ${domain} already added`);
        return { success: true, verified: true };
      }
      console.error('Vercel add domain error:', data);
      return { success: false, verified: false, error: data.error?.message || 'Vercel fout' };
    }

    console.log(`Vercel: domain ${domain} added, verified=${data.verified}`);
    return { success: true, verified: data.verified };
  } catch (error) {
    console.error('Vercel add domain exception:', error);
    return { success: false, verified: false, error: 'Kon domein niet toevoegen aan Vercel' };
  }
}

/**
 * Remove a domain from the Vercel project
 */
export async function removeDomainFromVercel(domain: string): Promise<boolean> {
  const token = process.env.VERCEL_API_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  const teamId = process.env.VERCEL_TEAM_ID;

  if (!token || !projectId) {
    return false;
  }

  try {
    const url = new URL(`${VERCEL_API_URL}/v10/projects/${projectId}/domains/${domain}`);
    if (teamId) url.searchParams.set('teamId', teamId);

    const response = await fetch(url.toString(), {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.ok;
  } catch (error) {
    console.error('Vercel remove domain error:', error);
    return false;
  }
}

/**
 * Check domain configuration status in Vercel
 */
export async function checkDomainInVercel(domain: string): Promise<{
  configured: boolean;
  verified: boolean;
  error?: string;
}> {
  const token = process.env.VERCEL_API_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  const teamId = process.env.VERCEL_TEAM_ID;

  if (!token || !projectId) {
    return { configured: false, verified: false, error: 'Vercel configuratie ontbreekt' };
  }

  try {
    const url = new URL(`${VERCEL_API_URL}/v10/projects/${projectId}/domains/${domain}`);
    if (teamId) url.searchParams.set('teamId', teamId);

    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.status === 404) {
      return { configured: false, verified: false };
    }

    const data = await response.json() as VercelDomainResponse;
    return { configured: true, verified: data.verified };
  } catch (error) {
    console.error('Vercel check domain error:', error);
    return { configured: false, verified: false, error: 'Kon Vercel status niet ophalen' };
  }
}
