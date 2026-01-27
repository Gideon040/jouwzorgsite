// components/dashboard/PublishToggle.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { togglePublish } from '@/lib/actions/sites';

interface PublishToggleProps {
  siteId: string;
  published: boolean;
}

export function PublishToggle({ siteId, published }: PublishToggleProps) {
  const router = useRouter();
  const [isPublished, setIsPublished] = useState(published);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    setIsLoading(true);
    
    const result = await togglePublish(siteId, !isPublished);
    
    if (result.error) {
      alert(result.error);
    } else {
      setIsPublished(!isPublished);
      router.refresh();
    }
    
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className={`material-symbols-outlined text-lg ${isPublished ? 'text-emerald-500' : 'text-slate-400'}`}>
          {isPublished ? 'public' : 'public_off'}
        </span>
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {isPublished ? 'Website is live' : 'Website is offline'}
        </span>
      </div>
      
      <button
        onClick={handleToggle}
        disabled={isLoading}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full transition-colors
          ${isPublished ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}
          ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <span
          className={`
            inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform
            ${isPublished ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
      </button>
    </div>
  );
}
