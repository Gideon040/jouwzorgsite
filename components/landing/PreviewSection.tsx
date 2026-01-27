'use client';

import { Site, SiteContent } from '@/types';
import { SiteRenderer } from '@/components/templates';

interface PreviewSectionProps {
  site: Site;
  content: SiteContent;
  setContent: (c: SiteContent) => void;
  onCheckout: () => void;
  isCustomizing: boolean;
  setIsCustomizing: (v: boolean) => void;
}

export function PreviewSection({ 
  site, content, setContent, onCheckout, isCustomizing, setIsCustomizing 
}: PreviewSectionProps) {
  // Maak een live site object met de huidige content
  const livePreviewSite: Site = {
    ...site,
    content: content,
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-200 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              <span className="text-sm font-medium text-slate-600">Preview van jouw website</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCustomizing(!isCustomizing)}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined text-xl">edit</span>
              <span className="hidden sm:inline">Aanpassen</span>
            </button>
            
            <button
              onClick={onCheckout}
              className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition-colors"
            >
              <span>Claim je domein</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Customize sidebar */}
        {isCustomizing && (
          <CustomizeSidebar 
            content={content} 
            setContent={setContent} 
            onClose={() => setIsCustomizing(false)} 
          />
        )}

        {/* Site preview */}
        <div className="flex-1">
          <div className="max-w-6xl mx-auto p-4 md:p-8">
            {/* Browser frame */}
            <div className="bg-white rounded-2xl shadow-2xl shadow-slate-300/50 overflow-hidden">
              {/* Browser bar */}
              <div className="bg-slate-100 px-4 py-3 flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 bg-white rounded-lg px-4 py-1.5 text-sm text-slate-500 font-mono">
                  {site.subdomain}.jouwzorgsite.nl
                </div>
              </div>
              
              {/* Echte template preview */}
              <div className="max-h-[70vh] overflow-y-auto">
                <SiteRenderer site={livePreviewSite} />
              </div>
            </div>
            
            {/* CTA below preview */}
            <div className="mt-8 text-center">
              <p className="text-slate-600 mb-4">
                Tevreden met je website? Claim nu je eigen domein!
              </p>
              <button
                onClick={onCheckout}
                className="inline-flex items-center gap-3 px-8 py-4 bg-orange-500 text-white rounded-xl font-bold text-lg hover:bg-orange-600 transition-all hover:shadow-xl hover:shadow-orange-500/25"
              >
                Claim {site.subdomain}.nl
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <p className="text-sm text-slate-400 mt-3">
                €14,95/maand · Eigen .nl domein · Direct online
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Customize sidebar
function CustomizeSidebar({ 
  content, setContent, onClose 
}: { 
  content: SiteContent; 
  setContent: (c: SiteContent) => void; 
  onClose: () => void;
}) {
  return (
    <div className="w-80 bg-white border-r border-slate-200 p-6 sticky top-[57px] h-[calc(100vh-57px)] overflow-y-auto">
      <h3 className="font-bold text-slate-900 mb-4">Personaliseer je site</h3>
      
      {/* Foto upload placeholder */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">Profielfoto</label>
        <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-orange-300 cursor-pointer transition-colors">
          <span className="material-symbols-outlined text-3xl text-slate-400 mb-2">add_photo_alternate</span>
          <p className="text-sm text-slate-500">Upload een foto</p>
        </div>
      </div>
      
      {/* Tagline */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">Tagline</label>
        <textarea
          value={content.tagline}
          onChange={(e) => setContent({ ...content, tagline: e.target.value })}
          className="w-full px-4 py-3 border border-slate-200 rounded-lg resize-none focus:border-orange-500 focus:ring-0 outline-none"
          rows={2}
        />
      </div>
      
      {/* Over mij */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">Over mij</label>
        <textarea
          value={content.over_mij}
          onChange={(e) => setContent({ ...content, over_mij: e.target.value })}
          className="w-full px-4 py-3 border border-slate-200 rounded-lg resize-none focus:border-orange-500 focus:ring-0 outline-none"
          rows={5}
        />
      </div>
      
      {/* Telefoon */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">Telefoon (optioneel)</label>
        <input
          type="tel"
          value={content.contact?.telefoon || ''}
          onChange={(e) => setContent({ 
            ...content, 
            contact: { ...content.contact, telefoon: e.target.value }
          })}
          placeholder="06-12345678"
          className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-orange-500 focus:ring-0 outline-none"
        />
      </div>
      
      {/* Werkgebied */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">Werkgebied</label>
        <input
          type="text"
          value={content.contact?.werkgebied?.join(', ') || ''}
          onChange={(e) => setContent({ 
            ...content, 
            contact: { ...content.contact, werkgebied: e.target.value.split(',').map(s => s.trim()) }
          })}
          placeholder="Amsterdam, Haarlem, Zaandam"
          className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-orange-500 focus:ring-0 outline-none"
        />
      </div>
      
      <button
        onClick={onClose}
        className="w-full py-3 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors"
      >
        Sluiten
      </button>
    </div>
  );
}
