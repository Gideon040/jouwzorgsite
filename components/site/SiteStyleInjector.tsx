'use client';

import { useEffect } from 'react';

interface SiteStyleInjectorProps {
  customImages?: Record<string, string>;
  customTexts?: Record<string, string>;
  customButtons?: Record<string, { bgColor?: string; textColor?: string; radius?: string }>;
  customStyles?: Record<string, string>;
}

const TEXT_SELECTORS = 'h1, h2, h3, h4, h5, h6, p, li, blockquote, span, figcaption, dt, dd, label, td, th';
const BTN_SELECTORS = [
  'a[class*="bg-"]',
  'a[class*="btn"]',
  'a[class*="rounded"][class*="bg-"]',
  'a[style*="background"]',
  'button[class*="bg-"]:not([class*="bg-white"]):not([class*="bg-slate"]):not([class*="bg-gray"])',
  'button[style*="background"]',
].join(', ');
const MIN_TEXT_LENGTH = 2;

function stripQuotes(s: string): string {
  return s.replace(/^[\s"'""''«»„‟‹›\u201C\u201D]+|[\s"'""''«»„‟‹›\u201C\u201D]+$/g, '');
}

export function SiteStyleInjector({ customImages, customTexts, customButtons, customStyles }: SiteStyleInjectorProps) {

  // ── ALL DOM modifications run in useEffect = AFTER hydration ──
  // This means zero hydration mismatch errors.
  useEffect(() => {
    const container = document.querySelector('.site-content') || document.body;

    // ── Images (index-based) ──
    if (customImages && Object.keys(customImages).length) {
      container.querySelectorAll('img').forEach((img, i) => {
        const replacement = customImages[`img-${i}`];
        if (replacement) {
          (img as HTMLImageElement).src = replacement;
        }
      });
    }

    // ── Buttons (index-based, !important + override hover handlers) ──
    if (customButtons && Object.keys(customButtons).length) {
      container.querySelectorAll(BTN_SELECTORS).forEach((btn, i) => {
        const style = customButtons[`btn-${i}`];
        if (style) {
          const el = btn as HTMLElement;
          if (style.bgColor) {
            el.style.setProperty('background-color', style.bgColor, 'important');
            // Override React onMouseEnter/onMouseLeave that reset colors
            el.onmouseenter = (e) => {
              (e.currentTarget as HTMLElement).style.setProperty('background-color', style.bgColor!, 'important');
            };
            el.onmouseleave = (e) => {
              (e.currentTarget as HTMLElement).style.setProperty('background-color', style.bgColor!, 'important');
            };
          }
          if (style.textColor) el.style.setProperty('color', style.textColor, 'important');
          if (style.radius) el.style.setProperty('border-radius', style.radius, 'important');
        }
      });
    }

    // ── Texts (walk DOM, match with quote-stripping) ──
    if (customTexts && Object.keys(customTexts).length) {
      // Build lookup with stripped variants
      const lookup = new Map<string, string>();
      for (const [key, val] of Object.entries(customTexts)) {
        lookup.set(key, val);
        lookup.set(key.trim(), val);
        lookup.set(stripQuotes(key), val);
        lookup.set(stripQuotes(key).trim(), val);
      }

      const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
        acceptNode: (node) => {
          const el = node as HTMLElement;
          if (['SCRIPT', 'STYLE', 'SVG', 'PATH', 'IMG', 'INPUT', 'TEXTAREA'].includes(el.tagName)) return NodeFilter.FILTER_REJECT;
          if (el.matches(TEXT_SELECTORS)) return NodeFilter.FILTER_ACCEPT;
          return NodeFilter.FILTER_SKIP;
        }
      });

      let node: Node | null;
      while ((node = walker.nextNode())) {
        const el = node as HTMLElement;
        const text = el.innerText?.trim();
        if (!text || text.length < MIN_TEXT_LENGTH) continue;

        // Check for editable children (skip parents)
        const children = el.querySelectorAll(TEXT_SELECTORS);
        const hasEditableChildren = Array.from(children).some(
          child => (child as HTMLElement).innerText?.trim().length >= MIN_TEXT_LENGTH
        );
        if (hasEditableChildren) continue;

        // Try all match variants
        const replacement = lookup.get(text) || lookup.get(stripQuotes(text)) || lookup.get(stripQuotes(text).trim());
        if (replacement) {
          el.innerText = replacement;
        }
      }
    }
  }, [customImages, customTexts, customButtons]);

  // ── CSS for global style overrides (these are safe, no hydration issue) ──
  if (!customStyles || !Object.keys(customStyles).length) return null;

  const css = `
    ${customStyles.primaryColor ? `
    .site-content a:not(nav a) { color: ${customStyles.primaryColor} !important; }
    .site-content .text-primary,
    .site-content [class*="text-teal"], .site-content [class*="text-emerald"],
    .site-content [class*="text-green"], .site-content [class*="text-blue"],
    .site-content [class*="text-indigo"], .site-content [class*="text-violet"],
    .site-content [class*="text-purple"] { color: ${customStyles.primaryColor} !important; }
    .site-content .bg-primary,
    .site-content [class*="bg-teal-6"], .site-content [class*="bg-teal-7"], .site-content [class*="bg-teal-8"],
    .site-content [class*="bg-emerald-6"], .site-content [class*="bg-emerald-7"], .site-content [class*="bg-emerald-8"],
    .site-content [class*="bg-green-6"], .site-content [class*="bg-green-7"],
    .site-content [class*="bg-blue-6"], .site-content [class*="bg-blue-7"],
    .site-content [class*="bg-indigo-6"], .site-content [class*="bg-indigo-7"] { background-color: ${customStyles.primaryColor} !important; }
    .site-content [class*="border-teal"], .site-content [class*="border-emerald"],
    .site-content [class*="border-green"], .site-content [class*="border-blue"],
    .site-content [class*="border-indigo"] { border-color: ${customStyles.primaryColor} !important; }
    ` : ''}
    ${customStyles.headingColor ? `
    .site-content h1, .site-content h2, .site-content h3, .site-content h4 { color: ${customStyles.headingColor} !important; }
    ` : ''}
    ${customStyles.bodyColor ? `
    .site-content p, .site-content li, .site-content dd, .site-content td,
    .site-content span:not(.material-symbols-outlined) { color: ${customStyles.bodyColor} !important; }
    ` : ''}
    ${customStyles.buttonColor ? `
    .site-content a[class*="bg-"],
    .site-content a[class*="btn"],
    .site-content a[class*="rounded"][class*="bg-"],
    .site-content a[style*="background"],
    .site-content button[class*="bg-"]:not([class*="bg-white"]):not([class*="bg-slate"]):not([class*="bg-gray"]),
    .site-content button[style*="background"] { background-color: ${customStyles.buttonColor} !important; }
    ` : ''}
    ${customStyles.buttonTextColor ? `
    .site-content a[class*="bg-"],
    .site-content a[class*="btn"],
    .site-content a[class*="rounded"][class*="bg-"],
    .site-content a[style*="background"],
    .site-content button[class*="bg-"]:not([class*="bg-white"]):not([class*="bg-slate"]):not([class*="bg-gray"]),
    .site-content button[style*="background"] { color: ${customStyles.buttonTextColor} !important; }
    ` : ''}
    ${customStyles.buttonRadius ? `
    .site-content a[class*="bg-"],
    .site-content a[class*="btn"],
    .site-content a[class*="rounded"][class*="bg-"],
    .site-content a[style*="background"],
    .site-content button[class*="bg-"]:not([class*="bg-white"]):not([class*="bg-slate"]):not([class*="bg-gray"]),
    .site-content button[style*="background"] { border-radius: ${customStyles.buttonRadius} !important; }
    ` : ''}
  `;

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}