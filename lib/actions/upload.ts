// lib/actions/upload.ts

'use server';

import { createClient } from '@/lib/supabase/server';

const BUCKET_NAME = 'site-assets';

// Upload an image to Supabase Storage
export async function uploadImage(formData: FormData) {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    return { error: 'Je moet ingelogd zijn om te uploaden' };
  }

  const file = formData.get('file') as File;
  
  if (!file) {
    return { error: 'Geen bestand geselecteerd' };
  }

  // Validate file type
  if (!file.type.startsWith('image/')) {
    return { error: 'Alleen afbeeldingen zijn toegestaan' };
  }

  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    return { error: 'Bestand mag maximaal 5MB zijn' };
  }

  // Generate unique filename
  const fileExt = file.name.split('.').pop();
  const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

  // Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('Upload error:', error);
    return { error: 'Upload mislukt' };
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(data.path);

  return { url: publicUrl };
}

// Delete an image from Supabase Storage
export async function deleteImage(imageUrl: string) {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    return { error: 'Je moet ingelogd zijn' };
  }

  // Extract path from URL
  const urlParts = imageUrl.split(`${BUCKET_NAME}/`);
  if (urlParts.length < 2) {
    return { error: 'Ongeldige URL' };
  }
  
  const filePath = urlParts[1];

  // Verify the file belongs to the user (path starts with user ID)
  if (!filePath.startsWith(user.id)) {
    return { error: 'Geen toegang tot dit bestand' };
  }

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([filePath]);

  if (error) {
    console.error('Delete error:', error);
    return { error: 'Verwijderen mislukt' };
  }

  return { success: true };
}

// Upload multiple images
export async function uploadImages(formData: FormData) {
  const files = formData.getAll('files') as File[];
  const results = [];

  for (const file of files) {
    const singleFormData = new FormData();
    singleFormData.append('file', file);
    
    const result = await uploadImage(singleFormData);
    results.push({ file: file.name, ...result });
  }

  return results;
}
