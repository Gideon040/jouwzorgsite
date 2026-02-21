// lib/actions/declarations.ts
// Server Actions voor het beheren van professional declarations

'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { ProfessionalDeclaration, VerklaringKey } from '@/types/declarations';

// ============================================
// GET DECLARATION
// ============================================

export async function getDeclaration(siteId: string) {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return { error: 'Je moet ingelogd zijn' };
  }

  const { data, error } = await supabase
    .from('professional_declarations')
    .select('*')
    .eq('site_id', siteId)
    .eq('user_id', user.id)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching declaration:', error);
    return { error: 'Er ging iets mis' };
  }

  return { data: data as ProfessionalDeclaration | null };
}

// ============================================
// CREATE OR UPDATE DECLARATION
// ============================================

export async function upsertDeclaration(
  siteId: string,
  updates: Partial<ProfessionalDeclaration>
) {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return { error: 'Je moet ingelogd zijn' };
  }

  // Check of er al een declaration bestaat
  const { data: existing } = await supabase
    .from('professional_declarations')
    .select('id')
    .eq('site_id', siteId)
    .eq('user_id', user.id)
    .single();

  let result;

  if (existing) {
    // Update
    const { data, error } = await supabase
      .from('professional_declarations')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', existing.id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating declaration:', error);
      return { error: 'Er ging iets mis bij het opslaan' };
    }
    result = data;
  } else {
    // Insert
    const { data, error } = await supabase
      .from('professional_declarations')
      .insert({
        site_id: siteId,
        user_id: user.id,
        ...updates,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating declaration:', error);
      return { error: 'Er ging iets mis bij het aanmaken' };
    }
    result = data;
  }

  revalidatePath('/dashboard');
  return { data: result as ProfessionalDeclaration };
}

// ============================================
// VERIFY BIG + SAVE
// ============================================

export async function verifyAndSaveBig(
  siteId: string,
  bigData: {
    bigNummer: string;
    beroep: string;
    specialismen: { code: string; naam: string }[];
    isGeldig: boolean;
  }
) {
  return upsertDeclaration(siteId, {
    big_nummer: bigData.bigNummer,
    big_beroep: bigData.beroep,
    big_specialismen: bigData.specialismen as any,
    big_verified: bigData.isGeldig,
    big_verified_at: new Date().toISOString(),
    big_geldig: bigData.isGeldig,
  });
}

// ============================================
// SAVE KVK
// ============================================

export async function saveKvk(
  siteId: string,
  kvkNummer: string,
  handelsnaam?: string
) {
  if (kvkNummer.length !== 8 || !/^\d{8}$/.test(kvkNummer)) {
    return { error: 'KvK-nummer moet 8 cijfers zijn' };
  }

  return upsertDeclaration(siteId, {
    kvk_nummer: kvkNummer,
    kvk_handelsnaam: handelsnaam || null,
  });
}

// ============================================
// TOGGLE VERKLARING
// ============================================

export async function toggleVerklaring(
  siteId: string,
  key: VerklaringKey,
  value: boolean
) {
  const fieldName = `verklaring_${key}`;
  return upsertDeclaration(siteId, {
    [fieldName]: value,
  } as any);
}

// ============================================
// BULK UPDATE VERKLARINGEN
// ============================================

export async function bulkUpdateVerklaringen(
  siteId: string,
  verklaringen: Record<VerklaringKey, boolean>
) {
  const updates: Record<string, boolean> = {};
  for (const [key, value] of Object.entries(verklaringen)) {
    updates[`verklaring_${key}`] = value;
  }
  return upsertDeclaration(siteId, updates as any);
}

// ============================================
// SIGN DECLARATION
// ============================================

export async function signDeclaration(siteId: string) {
  return upsertDeclaration(siteId, {
    declaration_accepted_at: new Date().toISOString(),
    widget_enabled: true,
  });
}

// ============================================
// TOGGLE WIDGET
// ============================================

export async function toggleWidget(siteId: string, enabled: boolean) {
  return upsertDeclaration(siteId, {
    widget_enabled: enabled,
  });
}

// ============================================
// RE-VERIFY (periodieke herbevestiging)
// ============================================

export async function reverifyDeclaration(siteId: string) {
  return upsertDeclaration(siteId, {
    last_reverified_at: new Date().toISOString(),
  });
}