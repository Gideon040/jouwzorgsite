// lib/pixel.ts - Meta Pixel tracking helper

export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
  }
}

export const pageview = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
  }
};

export const event = (name: string, options: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', name, options);
  }
};

// Specifieke events voor JouwZorgSite funnel
export const trackWizardStart = () => {
  event('InitiateCheckout', { content_name: 'wizard_start' });
};

export const trackSitePreview = () => {
  event('ViewContent', { content_name: 'website_preview' });
};

export const trackSignupComplete = (email: string) => {
  event('CompleteRegistration', { 
    content_name: 'free_trial',
    value: 0,
    currency: 'EUR',
  });
};

export const trackPayment = () => {
  event('Purchase', {
    value: 14.95,
    currency: 'EUR',
  });
};

export const trackWizardStep = (step: number, stepName: string) => {
  event('CustomEvent', {
    step_number: step,
    step_name: stepName,
  });
};
