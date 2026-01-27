// components/ui/ImageUpload.tsx

'use client';

import { cn } from '@/lib/utils';
import { useCallback, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export interface ImageUploadProps {
  value?: string;
  onChange: (url: string | null) => void;
  label?: string;
  hint?: string;
  className?: string;
  bucket?: string;
}

export function ImageUpload({ 
  value, 
  onChange, 
  label, 
  hint, 
  className,
  bucket = 'site-assets'
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  }, []);

  const handleFile = async (file: File) => {
    setUploadError('');
    
    // Validate file
    if (!file.type.startsWith('image/')) {
      setUploadError('Alleen afbeeldingen zijn toegestaan');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Bestand mag maximaal 5MB zijn');
      return;
    }

    setIsUploading(true);
    
    try {
      const supabase = createClient();
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setUploadError('Je moet ingelogd zijn om te uploaden');
        setIsUploading(false);
        return;
      }

      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        console.error('Upload error:', error);
        setUploadError('Upload mislukt. Probeer opnieuw.');
        setIsUploading(false);
        return;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);

      onChange(publicUrl);
    } catch (err) {
      console.error('Upload error:', err);
      setUploadError('Er ging iets mis');
    }
    
    setIsUploading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleRemove = async () => {
    // Optionally delete from storage (for now just remove reference)
    onChange(null);
  };

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && (
        <label className="text-slate-900 dark:text-white text-base font-semibold">
          {label}
        </label>
      )}
      
      {value ? (
        // Preview
        <div className="relative group">
          <div
            className="w-full aspect-square max-w-[200px] rounded-xl bg-cover bg-center border-2 border-slate-200 dark:border-slate-700"
            style={{ backgroundImage: `url(${value})` }}
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <span className="material-symbols-outlined text-lg">delete</span>
          </button>
        </div>
      ) : (
        // Upload area
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            'border-2 border-dashed rounded-xl p-8',
            'flex flex-col items-center justify-center gap-4',
            'bg-slate-50 dark:bg-slate-800/50',
            'hover:border-primary transition-colors cursor-pointer group',
            isDragging && 'border-primary bg-primary/5',
            isUploading && 'opacity-50 pointer-events-none',
            uploadError && 'border-red-300'
          )}
        >
          <div className={cn(
            'size-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform',
            uploadError ? 'bg-red-100 text-red-500' : 'bg-primary/10 text-primary'
          )}>
            <span className="material-symbols-outlined text-3xl">
              {isUploading ? 'progress_activity' : uploadError ? 'error' : 'add_a_photo'}
            </span>
          </div>
          <div className="text-center">
            {uploadError ? (
              <p className="text-red-500 font-medium">{uploadError}</p>
            ) : (
              <p className="text-slate-900 dark:text-white font-medium">
                {isUploading ? 'Uploaden...' : 'Klik om te uploaden of sleep een foto hierheen'}
              </p>
            )}
            {hint && !uploadError && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{hint}</p>
            )}
          </div>
          <label className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-primary/90 transition-colors cursor-pointer">
            Bestand kiezen
            <input
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              className="hidden"
              disabled={isUploading}
            />
          </label>
        </div>
      )}
    </div>
  );
}
