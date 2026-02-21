// app/(dashboard)/edit/[siteId]/page.tsx

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Site, SiteContent, GeneratedContent, Theme } from '@/types';
import { EditorPanel } from '@/components/dashboard/EditorPanel';
import { EditablePreview } from '@/components/dashboard/EditablePreview';
import { revalidateSite } from '@/lib/actions/sites';

interface EditPageProps {
  params: { siteId: string };
}

export default function EditPage({ params }: EditPageProps) {
  const router = useRouter();
  const [site, setSite] = useState<Site | null>(null);
  const [content, setContent] = useState<SiteContent | null>(null);
  const [generated, setGenerated] = useState<GeneratedContent>({});
  const [siteTheme, setSiteTheme] = useState<Theme>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'error'>('idle');
  const [hasChanges, setHasChanges] = useState(false);

  // ── Load site ────────────────────────────
  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('sites')
        .select('*')
        .eq('id', params.siteId)
        .single();

      if (error || !data) {
        router.push('/dashboard');
        return;
      }

      const s = data as Site;
      setSite(s);
      setContent(s.content);
      setGenerated((s.generated_content || {}) as GeneratedContent);
      setSiteTheme((s.theme || {}) as Theme);
      setIsLoading(false);
    };
    load();
  }, [params.siteId, router]);

  // ── Update handlers ──────────────────────
  const handleContentUpdate = useCallback((newContent: SiteContent) => {
    setContent(newContent);
    setHasChanges(true);
    setSaveStatus('idle');
  }, []);

  const handleGeneratedUpdate = useCallback((newGen: GeneratedContent) => {
    setGenerated(newGen);
    setHasChanges(true);
    setSaveStatus('idle');
  }, []);

  const handleThemeUpdate = useCallback((newTheme: Theme) => {
    setSiteTheme(newTheme);
    setHasChanges(true);
    setSaveStatus('idle');
  }, []);

  // ── Image replace ────────────────────────
  const handleImageReplace = useCallback((imageKey: string, newUrl: string) => {
    setGenerated(prev => ({
      ...prev,
      customImages: { ...((prev as any).customImages || {}), [imageKey]: newUrl },
    }));
    setHasChanges(true);
    setSaveStatus('idle');
  }, []);

  // ── Text change ──────────────────────────
  const handleTextChange = useCallback((originalText: string, newText: string) => {
    setGenerated(prev => ({
      ...prev,
      customTexts: { ...((prev as any).customTexts || {}), [originalText]: newText },
    }));
    setHasChanges(true);
    setSaveStatus('idle');
  }, []);

  // ── Button change ────────────────────────
  const handleButtonChange = useCallback((btnId: string, style: { bgColor?: string; textColor?: string; radius?: string } | null) => {
    setGenerated(prev => {
      const existing = { ...((prev as any).customButtons || {}) };
      if (!style) {
        delete existing[btnId]; // reset to original
      } else {
        existing[btnId] = style;
      }
      return { ...prev, customButtons: existing };
    });
    setHasChanges(true);
    setSaveStatus('idle');
  }, []);

  // ── Save ─────────────────────────────────
  const handleSave = useCallback(async () => {
    if (!site || !content) return;

    setIsSaving(true);
    setSaveStatus('idle');

    const supabase = createClient();
    const { error } = await supabase
      .from('sites')
      .update({
        content: content,
        generated_content: generated,
        theme: siteTheme,
        updated_at: new Date().toISOString(),
      })
      .eq('id', site.id);

    if (error) {
      console.error('Save error:', error);
      setSaveStatus('error');
    } else {
      setSaveStatus('saved');
      setHasChanges(false);
      setSite(prev => prev ? { ...prev, content, generated_content: generated, theme: siteTheme } : prev);
      // Invalidate public site cache
      if (site.subdomain) {
        revalidateSite(site.subdomain).catch(() => {});
      }
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
    setIsSaving(false);
  }, [site, content, generated, siteTheme]);

  // ── Cmd+S ────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        if (hasChanges && !isSaving) handleSave();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [hasChanges, isSaving, handleSave]);

  // ── Loading ──────────────────────────────
  if (isLoading || !site || !content) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <div className="text-center">
          <span className="material-symbols-outlined text-4xl text-orange-500 animate-spin">progress_activity</span>
          <p className="text-slate-500 mt-4">Site laden...</p>
        </div>
      </div>
    );
  }

  const previewSite: Site = { ...site, content, generated_content: generated, theme: siteTheme };

  return (
    <div className="h-screen flex flex-col bg-slate-100">
      {/* ── Top bar ── */}
      <div className="shrink-0 bg-white border-b border-slate-200 px-4 py-3 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="flex items-center gap-1.5 text-slate-500 hover:text-slate-700 transition-colors"
            >
              <span className="material-symbols-outlined text-xl">arrow_back</span>
              <span className="hidden sm:inline text-sm">Dashboard</span>
            </button>
            <div className="h-6 w-px bg-slate-200" />
            <div>
              <h1 className="text-sm font-bold text-slate-900">{content.naam}</h1>
              <p className="text-xs text-slate-400">{site.subdomain}.jouwzorgsite.nl</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Hints */}
            <div className="hidden xl:flex items-center gap-2 text-[11px] text-slate-400">
              <span className="flex items-center gap-0.5">
                <span className="material-symbols-outlined text-sm">photo_camera</span>
                Foto's
              </span>
              <span className="text-slate-300">·</span>
              <span className="flex items-center gap-0.5">
                <span className="material-symbols-outlined text-sm">edit</span>
                Teksten
              </span>
              <span className="text-slate-300">·</span>
              <span className="flex items-center gap-0.5">
                <span className="material-symbols-outlined text-sm text-purple-400">smart_button</span>
                Buttons
              </span>
              <span className="text-slate-300 mx-1">– klik om te bewerken</span>
            </div>

            <div className="h-4 w-px bg-slate-200 hidden lg:block" />

            {saveStatus === 'saved' && (
              <span className="text-xs text-emerald-600 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">check_circle</span> Opgeslagen
              </span>
            )}
            {saveStatus === 'error' && (
              <span className="text-xs text-red-500 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">error</span> Fout
              </span>
            )}
            {hasChanges && saveStatus === 'idle' && (
              <span className="text-xs text-amber-600 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">edit</span> Niet opgeslagen
              </span>
            )}

            <a
              href={`/site/${site.subdomain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined text-lg">open_in_new</span>
              <span className="hidden sm:inline">Preview</span>
            </a>

            <button
              onClick={handleSave}
              disabled={!hasChanges || isSaving}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                hasChanges && !isSaving
                  ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-sm'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              {isSaving ? (
                <><span className="material-symbols-outlined text-lg animate-spin">progress_activity</span> Opslaan...</>
              ) : (
                <><span className="material-symbols-outlined text-lg">save</span> Opslaan <kbd className="hidden sm:inline text-[10px] bg-white/20 px-1.5 py-0.5 rounded">⌘S</kbd></>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Main ── */}
      <div className="flex flex-1 min-h-0">
        <div className="w-[380px] min-w-[380px] border-r border-slate-200 bg-white overflow-hidden">
          <EditorPanel
            site={previewSite}
            content={content}
            generated={generated}
            siteTheme={siteTheme}
            onContentUpdate={handleContentUpdate}
            onGeneratedUpdate={handleGeneratedUpdate}
            onThemeUpdate={handleThemeUpdate}
          />
        </div>

        <div className="flex-1 overflow-y-auto bg-slate-50">
          <div className="w-full">
            <div className="overflow-hidden">
              <EditablePreview
                site={previewSite}
                onImageReplace={handleImageReplace}
                onTextChange={handleTextChange}
                onButtonChange={handleButtonChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}