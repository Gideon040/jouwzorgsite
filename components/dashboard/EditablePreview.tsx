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

// Selectors for "button-like" elements
const BTN_SELECTORS = [
  'a[class*="bg-"]',
  'a[class*="btn"]',
  'a[class*="rounded"][class*="bg-"]',
  'a[style*="background"]',
  'button[class*="bg-"]:not([class*="bg-white"]):not([class*="bg-slate"]):not([class*="bg-gray"])',
  'button[style*="background"]',
].join(', ');

interface ButtonStyle {
  bgColor?: string;
  textColor?: string;
  radius?: string;
}

interface EditablePreviewProps {
  site: Site;
  onImageReplace: (key: string, newUrl: string) => void;
  onTextChange: (originalText: string, newText: string) => void;
  onButtonChange: (btnId: string, style: ButtonStyle | null) => void;
}

export function EditablePreview({ site, onImageReplace, onTextChange, onButtonChange }: EditablePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  const [clickedImgSrc, setClickedImgSrc] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingEl, setUploadingEl] = useState<HTMLElement | null>(null);
  const [activeEditEl, setActiveEditEl] = useState<HTMLElement | null>(null);

  // Button toolbar state
  const [activeBtnId, setActiveBtnId] = useState<string | null>(null);
  const [activeBtnEl, setActiveBtnEl] = useState<HTMLElement | null>(null);
  const [toolbarPos, setToolbarPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [btnStyle, setBtnStyle] = useState<ButtonStyle>({});

  // ── Custom data from generated_content ──
  const customImages: Record<string, string> = (site.generated_content as any)?.customImages || {};
  const customTexts: Record<string, string> = (site.generated_content as any)?.customTexts || {};
  const customStyles: Record<string, string> = (site.generated_content as any)?.customStyles || {};
  const customButtons: Record<string, ButtonStyle> = (site.generated_content as any)?.customButtons || {};

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

    // Buttons — assign IDs & apply saved styles
    el.querySelectorAll(BTN_SELECTORS).forEach((btn, i) => {
      const htmlBtn = btn as HTMLElement;
      const btnId = `btn-${i}`;
      htmlBtn.dataset.btnId = btnId;

      const saved = customButtons[btnId];
      if (saved) {
        if (saved.bgColor) {
          htmlBtn.style.setProperty('background-color', saved.bgColor, 'important');
          // Override hover handlers that would reset the color
          htmlBtn.onmouseenter = (e) => {
            (e.currentTarget as HTMLElement).style.setProperty('background-color', saved.bgColor!, 'important');
          };
          htmlBtn.onmouseleave = (e) => {
            (e.currentTarget as HTMLElement).style.setProperty('background-color', saved.bgColor!, 'important');
          };
        }
        if (saved.textColor) htmlBtn.style.setProperty('color', saved.textColor, 'important');
        if (saved.radius) htmlBtn.style.setProperty('border-radius', saved.radius, 'important');
      }
    });

    // Texts
    applyTextReplacements(el, customTexts);

    // Force-reveal all animated elements in editor (no scroll animation needed)
    el.querySelectorAll('.reveal').forEach(revealEl => {
      revealEl.classList.add('revealed');
    });
  });

  // ── Close button toolbar on outside click ──
  useEffect(() => {
    if (!activeBtnId) return;
    const handler = (e: MouseEvent) => {
      if (toolbarRef.current?.contains(e.target as Node)) return;
      if (activeBtnEl?.contains(e.target as Node)) return;
      setActiveBtnId(null);
      setActiveBtnEl(null);
    };
    // Delay to avoid immediate close
    const timer = setTimeout(() => document.addEventListener('click', handler), 50);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handler);
    };
  }, [activeBtnId, activeBtnEl]);

  // ── Click handler ──
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // ── Link navigation block ──
      const link = target.closest('a');
      if (link) e.preventDefault();

      // ── IMAGE in link ──
      if (link) {
        const imgInLink = link.querySelector('img') as HTMLImageElement | null;
        if (imgInLink) {
          e.stopPropagation();
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
        setClickedImgSrc(img.dataset.imgId || img.src);
        setUploadingEl(img);
        fileInputRef.current?.click();
        return;
      }

      // ── TEXT CLICK (before button — text inside a button-like card should be editable) ──
      const textEl = findEditableTextElement(target);
      if (textEl && textEl !== activeEditEl) {
        e.preventDefault();
        e.stopPropagation();
        setActiveBtnId(null);
        startTextEdit(textEl);
        return;
      }

      // ── BUTTON CLICK (only if no editable text was found) ──
      const btnEl = target.closest(BTN_SELECTORS) as HTMLElement | null;
      if (btnEl && btnEl.dataset.btnId) {
        e.preventDefault();
        e.stopPropagation();
        const btnId = btnEl.dataset.btnId;

        // Position toolbar above the button
        const rect = btnEl.getBoundingClientRect();
        const containerRect = containerRef.current?.getBoundingClientRect() || { top: 0, left: 0 };
        setToolbarPos({
          top: rect.top - containerRect.top - 10,
          left: rect.left - containerRect.left + rect.width / 2,
        });

        // Load existing style
        setBtnStyle(customButtons[btnId] || {});
        setActiveBtnId(btnId);
        setActiveBtnEl(btnEl);
        setActiveEditEl(null);
        return;
      }

      // ── BG IMAGE CLICK ──
      const bgDiv = findBgImageElement(target);
      if (bgDiv && !isTextElement(target)) {
        e.preventDefault();
        e.stopPropagation();
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
  }, [activeEditEl, customButtons]);

  // ── Button style change ──
  const updateBtnStyle = useCallback((key: keyof ButtonStyle, value: string) => {
    if (!activeBtnId || !activeBtnEl) return;

    const newStyle = { ...btnStyle, [key]: value };
    setBtnStyle(newStyle);

    // Apply immediately to DOM
    if (key === 'bgColor') {
      activeBtnEl.style.setProperty('background-color', value, 'important');
      // Override hover handlers
      activeBtnEl.onmouseenter = (e) => {
        (e.currentTarget as HTMLElement).style.setProperty('background-color', value, 'important');
      };
      activeBtnEl.onmouseleave = (e) => {
        (e.currentTarget as HTMLElement).style.setProperty('background-color', value, 'important');
      };
    }
    if (key === 'textColor') activeBtnEl.style.setProperty('color', value, 'important');
    if (key === 'radius') activeBtnEl.style.setProperty('border-radius', value, 'important');

    // Persist
    onButtonChange(activeBtnId, newStyle);
  }, [activeBtnId, activeBtnEl, btnStyle, onButtonChange]);

  // ── Reset button to original ──
  const resetBtnStyle = useCallback(() => {
    if (!activeBtnId || !activeBtnEl) return;

    // Remove inline styles so original Tailwind/React styles take over
    activeBtnEl.style.removeProperty('background-color');
    activeBtnEl.style.removeProperty('color');
    activeBtnEl.style.removeProperty('border-radius');
    // Clear our hover overrides
    activeBtnEl.onmouseenter = null;
    activeBtnEl.onmouseleave = null;

    setBtnStyle({});
    onButtonChange(activeBtnId, null); // signal deletion
    setActiveBtnId(null);
    setActiveBtnEl(null);
  }, [activeBtnId, activeBtnEl, onButtonChange]);

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
  const RADIUS_OPTIONS = [
    { label: 'Scherp', value: '0px' },
    { label: 'Licht', value: '6px' },
    { label: 'Rond', value: '12px' },
    { label: 'Pill', value: '9999px' },
  ];

  const BTN_COLORS = [
    '#1e293b', '#0f172a', '#334155',
    '#f97316', '#ea580c',
    '#2563eb', '#1d4ed8',
    '#059669', '#047857',
    '#7c3aed', '#6d28d9',
    '#dc2626', '#b91c1c',
    '#0d9488', '#d97706',
    '#ffffff', '#f1f5f9',
  ];

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

      {/* Preview container */}
      <div ref={containerRef} className="editable-preview relative">
        <SiteRenderer site={site} />

        {/* ── BUTTON TOOLBAR ── */}
        {activeBtnId && (
          <div
            ref={toolbarRef}
            className="absolute z-[60] -translate-x-1/2 -translate-y-full"
            style={{ top: toolbarPos.top, left: toolbarPos.left }}
          >
            <div className="bg-white rounded-xl shadow-2xl border border-slate-200 p-3 w-[260px]">
              {/* Arrow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full">
                <div className="w-3 h-3 bg-white border-r border-b border-slate-200 rotate-45 -translate-y-1.5" />
              </div>

              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Button stijl</p>

              {/* Background Color */}
              <div className="mb-2.5">
                <label className="block text-[10px] font-medium text-slate-500 mb-1">Achtergrond</label>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <input
                    type="color"
                    value={btnStyle.bgColor || '#1e293b'}
                    onChange={(e) => updateBtnStyle('bgColor', e.target.value)}
                    className="w-7 h-7 rounded border border-slate-200 cursor-pointer p-0.5"
                  />
                  <div className="flex flex-wrap gap-1">
                    {BTN_COLORS.map(c => (
                      <button
                        key={c}
                        onClick={() => updateBtnStyle('bgColor', c)}
                        className={`w-5 h-5 rounded-full border transition-transform hover:scale-110 ${
                          btnStyle.bgColor === c ? 'border-orange-400 scale-110' : 'border-slate-200'
                        }`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Text Color */}
              <div className="mb-2.5">
                <label className="block text-[10px] font-medium text-slate-500 mb-1">Tekst kleur</label>
                <div className="flex gap-1.5">
                  {[
                    { label: 'Wit', value: '#ffffff' },
                    { label: 'Zwart', value: '#000000' },
                    { label: 'Donker', value: '#1e293b' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => updateBtnStyle('textColor', opt.value)}
                      className={`flex-1 py-1.5 text-[10px] font-medium rounded border-2 transition-all ${
                        (btnStyle.textColor || '#ffffff') === opt.value
                          ? 'border-orange-400 bg-orange-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span className="inline-block w-2.5 h-2.5 rounded-full mr-0.5 align-middle border border-slate-300" style={{ backgroundColor: opt.value }} />
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Border Radius */}
              <div className="mb-2.5">
                <label className="block text-[10px] font-medium text-slate-500 mb-1">Vorm</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {RADIUS_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => updateBtnStyle('radius', opt.value)}
                      className={`flex flex-col items-center gap-0.5 py-1.5 rounded-lg border-2 transition-all ${
                        (btnStyle.radius || '6px') === opt.value
                          ? 'border-orange-400 bg-orange-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="w-10 h-4 bg-slate-700" style={{ borderRadius: opt.value }} />
                      <span className="text-[9px] font-medium text-slate-500">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset to original */}
              <button
                onClick={resetBtnStyle}
                className="w-full py-1.5 text-[10px] font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg border border-dashed border-slate-200 hover:border-red-200 transition-all flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-xs">undo</span>
                Origineel herstellen
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />

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
        ${customStyles.buttonColor ? `
        .editable-preview a[class*="bg-"],
        .editable-preview a[class*="btn"],
        .editable-preview a[class*="rounded"][class*="bg-"],
        .editable-preview a[style*="background"],
        .editable-preview button[class*="bg-"]:not([class*="bg-white"]):not([class*="bg-slate"]):not([class*="bg-gray"]),
        .editable-preview button[style*="background"] { background-color: ${customStyles.buttonColor} !important; }
        ` : ''}
        ${customStyles.buttonTextColor ? `
        .editable-preview a[class*="bg-"],
        .editable-preview a[class*="btn"],
        .editable-preview a[class*="rounded"][class*="bg-"],
        .editable-preview a[style*="background"],
        .editable-preview button[class*="bg-"]:not([class*="bg-white"]):not([class*="bg-slate"]):not([class*="bg-gray"]),
        .editable-preview button[style*="background"] { color: ${customStyles.buttonTextColor} !important; }
        ` : ''}
        ${customStyles.buttonRadius ? `
        .editable-preview a[class*="bg-"],
        .editable-preview a[class*="btn"],
        .editable-preview a[class*="rounded"][class*="bg-"],
        .editable-preview a[style*="background"],
        .editable-preview button[class*="bg-"]:not([class*="bg-white"]):not([class*="bg-slate"]):not([class*="bg-gray"]),
        .editable-preview button[style*="background"] { border-radius: ${customStyles.buttonRadius} !important; }
        ` : ''}

        /* ── IMAGE HOVER ── */
        .editable-preview img {
          cursor: pointer !important;
          transition: all 0.2s ease !important;
        }
        .editable-preview img:hover {
          outline: 3px solid #f97316 !important;
          outline-offset: 2px !important;
          filter: brightness(0.92) !important;
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

        /* ── BUTTON HOVER ── */
        .editable-preview a[class*="bg-"]:hover,
        .editable-preview a[class*="btn"]:hover,
        .editable-preview a[style*="background"]:hover,
        .editable-preview a[class*="rounded"][class*="bg-"]:hover,
        .editable-preview button[class*="bg-"]:not([class*="bg-white"]):not([class*="bg-slate"]):not([class*="bg-gray"]):hover,
        .editable-preview button[style*="background"]:hover {
          outline: 3px solid #a855f7 !important;
          outline-offset: 2px !important;
          cursor: pointer !important;
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
    // Skip if it's a button-like element
    if (current.matches(BTN_SELECTORS)) return null;
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