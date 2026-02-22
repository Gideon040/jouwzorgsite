'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { SiteRenderer } from '@/components/templates';
import { Site } from '@/types';
import { createClient } from '@/lib/supabase/client';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const TEXT_SELECTORS = 'h1, h2, h3, h4, h5, h6, p, li, blockquote, span, figcaption, dt, dd, label, td, th';
const SKIP_CLASSES = ['material-symbols-outlined', 'icon', 'sr-only'];
const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'SVG', 'PATH', 'INPUT', 'TEXTAREA', 'SELECT', 'IMG']);
const MIN_TEXT_LENGTH = 2;

// Sections that support "+" add buttons and "x" remove buttons in the preview
const ADD_BUTTON_SECTIONS = [
  { section: 'diensten', label: '+ Dienst toevoegen' },
  { section: 'faq', label: '+ Vraag toevoegen' },
  { section: 'werkervaring', label: '+ Werkervaring toevoegen' },
  { section: 'voorwie', label: '+ Doelgroep toevoegen' },
];

// Find the repeating items container within a section by looking for the
// grid/list/flex container with the most block-level children (≥2).
// Searches the entire section element to handle templates with split wrappers.
function findItemsInSection(sectionEl: Element): { container: Element; items: HTMLElement[] } | null {
  const selectors = '.grid, [class*="space-y"], [class*="divide-y"], [class*="flex-col"], [class*="pl-8"]';
  const candidates = sectionEl.querySelectorAll(selectors);

  let bestContainer: Element | null = null;
  let bestCount = 1;

  candidates.forEach(c => {
    const blockChildren = Array.from(c.children).filter(child =>
      ['DIV', 'ARTICLE', 'A', 'SECTION', 'BUTTON'].includes(child.tagName) &&
      !child.hasAttribute('data-add-btn') &&
      !child.hasAttribute('data-remove-btn')
    );
    if (blockChildren.length > bestCount) {
      bestContainer = c;
      bestCount = blockChildren.length;
    }
  });

  if (!bestContainer) return null;

  const items = Array.from((bestContainer as Element).children).filter(child =>
    ['DIV', 'ARTICLE', 'A', 'SECTION', 'BUTTON'].includes(child.tagName) &&
    !child.hasAttribute('data-add-btn') &&
    !child.hasAttribute('data-remove-btn')
  ) as HTMLElement[];

  return { container: bestContainer, items };
}

interface EditablePreviewProps {
  site: Site;
  onImageReplace: (key: string, newUrl: string) => void;
  onTextChange: (originalText: string, newText: string) => void;
  onButtonChange?: (btnId: string, style: any) => void;
  onAddItem?: (sectionType: string) => void;
  onRemoveItem?: (sectionType: string, index: number) => void;
  disableImageUpload?: boolean;
}

export function EditablePreview({ site, onImageReplace, onTextChange, onAddItem, onRemoveItem, disableImageUpload }: EditablePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [clickedImgSrc, setClickedImgSrc] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingEl, setUploadingEl] = useState<HTMLElement | null>(null);
  const [activeEditEl, setActiveEditEl] = useState<HTMLElement | null>(null);
  const [imageDisabledMsg, setImageDisabledMsg] = useState(false);

  // ── Custom data from generated_content ──
  const customImages: Record<string, string> = (site.generated_content as any)?.customImages || {};
  const customTexts: Record<string, string> = (site.generated_content as any)?.customTexts || {};
  const customStyles: Record<string, string> = (site.generated_content as any)?.customStyles || {};

  // ── Assign IDs & apply custom replacements after every render ──
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Images
    el.querySelectorAll('img').forEach((img, i) => {
      const imgId = `img-${i}`;
      img.dataset.imgId = imgId;
      if (!img.dataset.originalSrc) img.dataset.originalSrc = img.src;
      if (customImages[imgId]) img.src = customImages[imgId];
    });

    // Texts
    applyTextReplacements(el, customTexts);

    // Force-reveal all animated elements in editor (no scroll animation needed)
    el.querySelectorAll('.reveal').forEach(revealEl => {
      revealEl.classList.add('revealed');
    });

    // ── Inject "+" add buttons & "x" remove buttons per section ──
    el.querySelectorAll('[data-add-btn]').forEach(b => b.remove());
    el.querySelectorAll('[data-remove-btn]').forEach(b => b.remove());

    if (onAddItem || onRemoveItem) {
      ADD_BUTTON_SECTIONS.forEach(({ section, label }) => {
        const sectionEl = el.querySelector(`[data-section="${section}"]`);
        if (!sectionEl) return;

        const found = findItemsInSection(sectionEl);
        // Inner container for the "+" button — place it inside the section's content area
        const innerContainer =
          sectionEl.querySelector('[class*="max-w-"]') ||
          sectionEl.querySelector('section > div') ||
          sectionEl.querySelector('section') ||
          sectionEl;

        // ── "X" remove buttons on items ──
        if (onRemoveItem && found && found.items.length > 1) {
          found.items.forEach((htmlItem, idx) => {
            const prev = htmlItem.style.position;
            if (!prev || prev === 'static') htmlItem.style.position = 'relative';
            const xBtn = document.createElement('button');
            xBtn.setAttribute('data-remove-btn', `${section}-${idx}`);
            Object.assign(xBtn.style, {
              position: 'absolute',
              top: '6px',
              right: '6px',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: '#ef4444',
              color: 'white',
              border: '2px solid white',
              fontSize: '14px',
              fontWeight: '700',
              lineHeight: '1',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: '40',
              opacity: '0',
              transition: 'opacity 0.15s ease, transform 0.15s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
            });
            xBtn.textContent = '\u00d7';
            xBtn.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              onRemoveItem(section, idx);
            });
            htmlItem.addEventListener('mouseenter', () => { xBtn.style.opacity = '1'; });
            htmlItem.addEventListener('mouseleave', () => { xBtn.style.opacity = '0'; });
            htmlItem.appendChild(xBtn);
          });
        }

        // ── "+" add button ──
        if (onAddItem) {
          const btn = document.createElement('button');
          btn.setAttribute('data-add-btn', section);
          btn.textContent = label;
          Object.assign(btn.style, {
            display: 'block',
            width: '100%',
            maxWidth: '280px',
            margin: '20px auto 0',
            padding: '10px 20px',
            background: 'rgba(249, 115, 22, 0.06)',
            color: '#ea580c',
            border: '2px dashed rgba(249, 115, 22, 0.3)',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          });
          btn.addEventListener('mouseenter', () => {
            btn.style.background = 'rgba(249, 115, 22, 0.12)';
            btn.style.borderColor = 'rgba(249, 115, 22, 0.5)';
          });
          btn.addEventListener('mouseleave', () => {
            btn.style.background = 'rgba(249, 115, 22, 0.06)';
            btn.style.borderColor = 'rgba(249, 115, 22, 0.3)';
          });
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            onAddItem(section);
          });
          innerContainer.appendChild(btn);
        }
      });
    }
  });

  // ── Click handler ──
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // ── Skip add/remove buttons — let their own handlers fire ──
      if (target.closest('[data-add-btn]') || target.closest('[data-remove-btn]')) return;

      // ── Link navigation block ──
      const link = target.closest('a');
      if (link) e.preventDefault();

      // ── IMAGE in link ──
      if (link) {
        const imgInLink = link.querySelector('img') as HTMLImageElement | null;
        if (imgInLink) {
          e.stopPropagation();
          if (disableImageUpload) {
            setImageDisabledMsg(true);
            setTimeout(() => setImageDisabledMsg(false), 2500);
            return;
          }
          const imgId = imgInLink.dataset.imgId || imgInLink.src;
          setClickedImgSrc(imgId);
          setUploadingEl(imgInLink);
          fileInputRef.current?.click();
          return;
        }
      }

      // ── IMAGE CLICK ──
      const img = target.closest('img') as HTMLImageElement | null;
      if (img) {
        e.preventDefault();
        e.stopPropagation();
        if (disableImageUpload) {
          setImageDisabledMsg(true);
          setTimeout(() => setImageDisabledMsg(false), 2500);
          return;
        }
        setClickedImgSrc(img.dataset.imgId || img.src);
        setUploadingEl(img);
        fileInputRef.current?.click();
        return;
      }

      // ── TEXT CLICK ──
      const textEl = findEditableTextElement(target);
      if (textEl && textEl !== activeEditEl) {
        e.preventDefault();
        e.stopPropagation();
        startTextEdit(textEl);
        return;
      }

      // ── BG IMAGE CLICK ──
      const bgDiv = findBgImageElement(target);
      if (bgDiv && !isTextElement(target)) {
        e.preventDefault();
        e.stopPropagation();
        if (disableImageUpload) {
          setImageDisabledMsg(true);
          setTimeout(() => setImageDisabledMsg(false), 2500);
          return;
        }
        if (!bgDiv.dataset.bgId) {
          const allBgs = containerRef.current?.querySelectorAll('[data-bg-id]') || [];
          bgDiv.dataset.bgId = `bg-${allBgs.length}`;
        }
        setClickedImgSrc(bgDiv.dataset.bgId);
        setUploadingEl(bgDiv);
        fileInputRef.current?.click();
        return;
      }
    };

    el.addEventListener('click', handler, true);
    return () => el.removeEventListener('click', handler, true);
  }, [activeEditEl, disableImageUpload]);

  // ── Start inline text editing ──
  const startTextEdit = (el: HTMLElement) => {
    if (!el.dataset.originalText) el.dataset.originalText = el.innerText.trim();

    el.contentEditable = 'true';
    el.focus();
    el.classList.add('editing-active');
    setActiveEditEl(el);

    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);

    const handleBlur = () => {
      el.contentEditable = 'false';
      el.classList.remove('editing-active');
      setActiveEditEl(null);
      const original = el.dataset.originalText || '';
      const newText = el.innerText.trim();
      if (newText && newText !== original) {
        onTextChange(original, newText);
      } else if (!newText) {
        el.innerText = original;
      }
      el.removeEventListener('blur', handleBlur);
      el.removeEventListener('keydown', handleKeydown);
    };
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); el.blur(); }
      if (e.key === 'Escape') { el.innerText = el.dataset.originalText || ''; el.blur(); }
    };
    el.addEventListener('blur', handleBlur);
    el.addEventListener('keydown', handleKeydown);
  };

  // ── Image upload ──
  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !clickedImgSrc) return;
    if (!file.type.startsWith('image/')) return;
    if (file.size > 5 * 1024 * 1024) { alert('Max 5MB'); return; }

    setIsUploading(true);
    if (uploadingEl) { uploadingEl.style.opacity = '0.5'; uploadingEl.style.filter = 'blur(2px)'; }

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { alert('Niet ingelogd'); return; }

      const ext = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { data, error } = await supabase.storage.from('site-assets').upload(fileName, file, { cacheControl: '3600', upsert: false });
      if (error) { alert('Upload mislukt'); return; }
      const { data: { publicUrl } } = supabase.storage.from('site-assets').getPublicUrl(data.path);

      if (uploadingEl instanceof HTMLImageElement) uploadingEl.src = publicUrl;
      else if (uploadingEl) uploadingEl.style.backgroundImage = `url(${publicUrl})`;

      onImageReplace(clickedImgSrc, publicUrl);
    } catch { alert('Er ging iets mis'); } finally {
      if (uploadingEl) { uploadingEl.style.opacity = ''; uploadingEl.style.filter = ''; }
      setIsUploading(false);
      setClickedImgSrc(null);
      setUploadingEl(null);
    }
    e.target.value = '';
  }, [clickedImgSrc, uploadingEl, onImageReplace]);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // RENDER
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  return (
    <>
      {/* Upload overlay */}
      {isUploading && (
        <div className="fixed inset-0 z-[100] bg-black/20 flex items-center justify-center pointer-events-none">
          <div className="bg-white rounded-xl px-6 py-4 shadow-lg flex items-center gap-3">
            <span className="material-symbols-outlined text-orange-500 animate-spin">progress_activity</span>
            <span className="text-sm font-medium text-slate-700">Uploaden...</span>
          </div>
        </div>
      )}

      {/* Image disabled message */}
      {imageDisabledMsg && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[110] animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="bg-slate-800 text-white rounded-xl px-5 py-3 shadow-lg flex items-center gap-2.5">
            <span className="material-symbols-outlined text-lg text-amber-400">photo_camera</span>
            <span className="text-sm font-medium">Foto&apos;s uploaden kan na registratie</span>
          </div>
        </div>
      )}

      {/* Preview container */}
      <div ref={containerRef} className="editable-preview relative">
        <SiteRenderer site={site} />
      </div>

      {/* Hidden file input */}
      {!disableImageUpload && (
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
      )}

      {/* Styles */}
      <style>{`
        /* ── GLOBAL CUSTOM STYLE OVERRIDES ── */
        ${customStyles.primaryColor ? `
        .editable-preview .text-primary,
        .editable-preview [class*="text-teal"],
        .editable-preview [class*="text-emerald"],
        .editable-preview [class*="text-green"],
        .editable-preview [class*="text-blue"],
        .editable-preview [class*="text-indigo"],
        .editable-preview [class*="text-violet"],
        .editable-preview [class*="text-purple"] {
          color: ${customStyles.primaryColor} !important;
        }
        .editable-preview .bg-primary,
        .editable-preview [class*="bg-teal-6"], .editable-preview [class*="bg-teal-7"], .editable-preview [class*="bg-teal-8"],
        .editable-preview [class*="bg-emerald-6"], .editable-preview [class*="bg-emerald-7"], .editable-preview [class*="bg-emerald-8"],
        .editable-preview [class*="bg-green-6"], .editable-preview [class*="bg-green-7"],
        .editable-preview [class*="bg-blue-6"], .editable-preview [class*="bg-blue-7"],
        .editable-preview [class*="bg-indigo-6"], .editable-preview [class*="bg-indigo-7"] {
          background-color: ${customStyles.primaryColor} !important;
        }
        .editable-preview [class*="border-teal"], .editable-preview [class*="border-emerald"],
        .editable-preview [class*="border-green"], .editable-preview [class*="border-blue"],
        .editable-preview [class*="border-indigo"] {
          border-color: ${customStyles.primaryColor} !important;
        }
        ` : ''}
        ${customStyles.headingColor ? `
        .editable-preview h1, .editable-preview h2, .editable-preview h3, .editable-preview h4 {
          color: ${customStyles.headingColor} !important;
        }
        ` : ''}
        ${customStyles.bodyColor ? `
        .editable-preview p, .editable-preview li, .editable-preview dd, .editable-preview td,
        .editable-preview span:not(.material-symbols-outlined) {
          color: ${customStyles.bodyColor} !important;
        }
        ` : ''}
        /* ── IMAGE HOVER ── */
        .editable-preview img {
          cursor: ${disableImageUpload ? 'not-allowed' : 'pointer'} !important;
          transition: all 0.2s ease !important;
        }
        .editable-preview img:hover {
          outline: 3px solid ${disableImageUpload ? '#94a3b8' : '#f97316'} !important;
          outline-offset: 2px !important;
          ${disableImageUpload ? '' : 'filter: brightness(0.92) !important;'}
        }

        /* ── TEXT HOVER ── */
        .editable-preview h1, .editable-preview h2, .editable-preview h3,
        .editable-preview h4, .editable-preview h5, .editable-preview h6,
        .editable-preview p, .editable-preview li, .editable-preview blockquote,
        .editable-preview figcaption, .editable-preview dt, .editable-preview dd,
        .editable-preview td, .editable-preview th {
          transition: outline 0.15s ease, background-color 0.15s ease !important;
        }
        .editable-preview h1:hover, .editable-preview h2:hover, .editable-preview h3:hover,
        .editable-preview h4:hover, .editable-preview h5:hover, .editable-preview h6:hover,
        .editable-preview p:hover, .editable-preview li:hover, .editable-preview blockquote:hover,
        .editable-preview figcaption:hover, .editable-preview dt:hover, .editable-preview dd:hover,
        .editable-preview td:hover, .editable-preview th:hover {
          outline: 2px dashed #94a3b8 !important;
          outline-offset: 2px !important;
          cursor: text !important;
        }

        /* ── ACTIVE EDITING ── */
        .editable-preview .editing-active {
          outline: 2px solid #f97316 !important;
          outline-offset: 2px !important;
          background-color: rgba(249, 115, 22, 0.05) !important;
          cursor: text !important;
          min-height: 1em;
        }
        .editable-preview .editing-active:hover {
          outline: 2px solid #f97316 !important;
        }

        /* ── Disable link navigation but allow clicking ── */
        .editable-preview a {
          cursor: pointer !important;
        }
        .editable-preview a img {
          pointer-events: auto !important;
          cursor: pointer !important;
        }

        /* ── SKIP: icons ── */
        .editable-preview .material-symbols-outlined {
          pointer-events: none;
        }

        /* ── ADD / REMOVE ITEM BUTTONS ── */
        .editable-preview [data-add-btn],
        .editable-preview [data-remove-btn] {
          pointer-events: auto !important;
        }
        .editable-preview [data-add-btn]:hover,
        .editable-preview [data-remove-btn]:hover {
          outline: none !important;
        }
        .editable-preview [data-remove-btn]:hover {
          transform: scale(1.15) !important;
          background: #dc2626 !important;
        }
      `}</style>
    </>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// HELPERS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function findEditableTextElement(el: HTMLElement): HTMLElement | null {
  let current: HTMLElement | null = el;
  for (let i = 0; i < 5; i++) {
    if (!current) return null;
    if (SKIP_TAGS.has(current.tagName)) return null;
    if (SKIP_CLASSES.some(c => current!.classList.contains(c))) return null;
    if (current.closest('button, nav, [role="navigation"]')) return null;
    if (current.matches(TEXT_SELECTORS)) {
      const text = current.innerText?.trim();
      if (text && text.length >= MIN_TEXT_LENGTH) {
        const childTextEls = current.querySelectorAll(TEXT_SELECTORS);
        const hasEditableChildren = Array.from(childTextEls).some(
          child => (child as HTMLElement).innerText?.trim().length >= MIN_TEXT_LENGTH && child !== current
        );
        if (!hasEditableChildren) return current;
      }
    }
    current = current.parentElement;
  }
  return null;
}

function isTextElement(el: HTMLElement): boolean {
  return el.matches(TEXT_SELECTORS) && (el.innerText?.trim().length || 0) >= MIN_TEXT_LENGTH;
}

function findBgImageElement(el: HTMLElement): HTMLElement | null {
  let current: HTMLElement | null = el;
  for (let i = 0; i < 3; i++) {
    if (!current) return null;
    const bg = window.getComputedStyle(current).backgroundImage;
    if (bg && bg !== 'none' && bg.includes('url(')) return current;
    current = current.parentElement;
  }
  return null;
}

function applyTextReplacements(container: HTMLElement, customTexts: Record<string, string>) {
  if (!Object.keys(customTexts).length) return;

  // Build a reverse lookup: customText value → original key
  const reverseMap = new Map<string, string>();
  for (const [orig, replacement] of Object.entries(customTexts)) {
    reverseMap.set(replacement, orig);
  }

  const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node) => {
      const el = node as HTMLElement;
      if (SKIP_TAGS.has(el.tagName)) return NodeFilter.FILTER_REJECT;
      if (el.matches(TEXT_SELECTORS)) return NodeFilter.FILTER_ACCEPT;
      return NodeFilter.FILTER_SKIP;
    }
  });
  let node: Node | null;
  while ((node = walker.nextNode())) {
    const el = node as HTMLElement;
    const text = el.innerText?.trim();
    if (!text) continue;

    // Re-detect originalText each cycle:
    // If React re-rendered with a NEW value (sidebar edit), text won't match
    // the old originalText OR any customTexts value — so reset originalText.
    const storedOriginal = el.dataset.originalText;
    if (storedOriginal) {
      const isCustomValue = reverseMap.has(text);
      const matchesOriginal = text === storedOriginal;
      if (!matchesOriginal && !isCustomValue) {
        // Sidebar changed the source text → update baseline
        el.dataset.originalText = text;
      }
    } else {
      el.dataset.originalText = text;
    }

    const original = el.dataset.originalText;
    if (original && customTexts[original]) {
      const childTextEls = el.querySelectorAll(TEXT_SELECTORS);
      const hasEditableChildren = Array.from(childTextEls).some(
        child => (child as HTMLElement).innerText?.trim().length >= MIN_TEXT_LENGTH
      );
      if (!hasEditableChildren) el.innerText = customTexts[original];
    }
  }
}