// components/site/SiteTracker.tsx
// Fires a single page view on mount — no cookies, no fingerprinting
'use client';

import { useEffect } from 'react';

export function SiteTracker({ siteId }: { siteId: string }) {
  useEffect(() => {
    // Don't track in editor/preview contexts
    if (typeof window === 'undefined') return;

    const track = async () => {
      try {
        await fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            siteId,
            pathname: window.location.pathname,
            referrer: document.referrer || null,
          }),
          // Fire and forget — don't block rendering
          keepalive: true,
        });
      } catch {
        // Silently fail — analytics should never break the site
      }
    };

    track();
  }, [siteId]);

  return null;
}
