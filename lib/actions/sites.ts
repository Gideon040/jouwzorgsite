// lib/actions/sites.ts

'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { SiteContent } from '@/types';

// Create a new site
export async function createSite(data: {
  subdomain: string;
  template_id: string;
  beroep: string;
  content: Partial<SiteContent>;
  custom_domain?: string;
}) {
  const supabase = await createClient();
  
  // Get current user
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    return { error: 'Je moet ingelogd zijn om een site aan te maken' };
  }

  // Check if subdomain is available
  const { data: isAvailable } = await supabase
    .rpc('is_subdomain_available', { check_subdomain: data.subdomain.toLowerCase() });

  if (!isAvailable) {
    return { error: 'Dit subdomein is al in gebruik' };
  }

  // Create the site
  const { data: site, error } = await supabase
    .from('sites')
    .insert({
      user_id: user.id,
      subdomain: data.subdomain.toLowerCase(),
      template_id: data.template_id,
      beroep: data.beroep,
      content: data.content,
      custom_domain: data.custom_domain || null,
      published: false, // Start unpublished until payment
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating site:', error);
    return { error: 'Er ging iets mis bij het aanmaken van je site' };
  }

  revalidatePath('/dashboard');
  
  return { site, data: site };
}

// Update an existing site
export async function updateSite(
  siteId: string,
  updates: {
    template_id?: string;
    content?: Partial<SiteContent>;
  }
) {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    return { error: 'Je moet ingelogd zijn' };
  }

  const { data: site, error } = await supabase
    .from('sites')
    .update(updates)
    .eq('id', siteId)
    .eq('user_id', user.id) // Ensure user owns the site
    .select()
    .single();

  if (error) {
    console.error('Error updating site:', error);
    return { error: 'Er ging iets mis bij het updaten van je site' };
  }

  // Revalidate the site page
  if (site) {
    revalidatePath(`/site/${site.subdomain}`);
    revalidatePath('/dashboard');
  }

  return { data: site };
}

// Publish or unpublish a site
export async function togglePublish(siteId: string, publish: boolean) {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    return { error: 'Je moet ingelogd zijn' };
  }

  const { data: site, error } = await supabase
    .from('sites')
    .update({ published: publish })
    .eq('id', siteId)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) {
    console.error('Error toggling publish:', error);
    return { error: 'Er ging iets mis' };
  }

  if (site) {
    revalidatePath(`/site/${site.subdomain}`);
    revalidatePath('/dashboard');
  }

  return { data: site };
}

// Delete a site
export async function deleteSite(siteId: string) {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    return { error: 'Je moet ingelogd zijn' };
  }

  const { error } = await supabase
    .from('sites')
    .delete()
    .eq('id', siteId)
    .eq('user_id', user.id);

  if (error) {
    console.error('Error deleting site:', error);
    return { error: 'Er ging iets mis bij het verwijderen' };
  }

  revalidatePath('/dashboard');
  redirect('/dashboard');
}

// Get user's sites
export async function getUserSites() {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    return { error: 'Je moet ingelogd zijn', data: [] };
  }

  const { data: sites, error } = await supabase
    .from('sites')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching sites:', error);
    return { error: 'Er ging iets mis', data: [] };
  }

  return { data: sites };
}

// Get a single site by ID
export async function getSiteById(siteId: string) {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    return { error: 'Je moet ingelogd zijn' };
  }

  const { data: site, error } = await supabase
    .from('sites')
    .select('*')
    .eq('id', siteId)
    .eq('user_id', user.id)
    .single();

  if (error) {
    console.error('Error fetching site:', error);
    return { error: 'Site niet gevonden' };
  }

  return { data: site };
}

// Check subdomain availability
export async function checkSubdomainAvailability(subdomain: string) {
  const supabase = await createClient();
  
  const { data: isAvailable, error } = await supabase
    .rpc('is_subdomain_available', { check_subdomain: subdomain.toLowerCase() });

  if (error) {
    console.error('Error checking subdomain:', error);
    return { available: false };
  }

  return { available: isAvailable };
}
