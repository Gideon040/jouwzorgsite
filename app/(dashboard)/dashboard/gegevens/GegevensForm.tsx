// app/(dashboard)/dashboard/gegevens/GegevensForm.tsx
'use client';

import { useState } from 'react';
import { updateSite } from '@/lib/actions/sites';
import { SiteContent } from '@/types';

interface GegevensFormProps {
  siteId: string;
  content: SiteContent;
}

export function GegevensForm({ siteId, content: initialContent }: GegevensFormProps) {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<'idle' | 'saved' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSave = async () => {
    setSaving(true);
    setStatus('idle');

    const result = await updateSite(siteId, { content });

    if (result.error) {
      setStatus('error');
      setErrorMessage(result.error);
    } else {
      setStatus('saved');
      setTimeout(() => setStatus('idle'), 3000);
    }

    setSaving(false);
  };

  const updateContact = (field: string, value: string | string[]) => {
    setContent(prev => ({
      ...prev,
      contact: { ...prev.contact, [field]: value },
    }));
    setStatus('idle');
  };

  const updateZakelijk = (field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      zakelijk: { ...prev.zakelijk, [field]: value },
    }));
    setStatus('idle');
  };

  const updateSocials = (field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      socials: { ...prev.socials, [field]: value },
    }));
    setStatus('idle');
  };

  return (
    <div className="space-y-4">
      {/* Contactgegevens */}
      <div className="bg-white rounded-xl border border-slate-200/60 p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-slate-400 text-xl">contact_mail</span>
          <h3 className="text-sm font-semibold text-slate-900">Contactgegevens</h3>
        </div>
        <div className="space-y-3">
          <Field
            label="E-mailadres"
            value={content.contact?.email || ''}
            onChange={(v) => updateContact('email', v)}
            type="email"
            placeholder="je@email.nl"
          />
          <Field
            label="Telefoonnummer"
            value={content.contact?.telefoon || content.telefoon || ''}
            onChange={(v) => {
              updateContact('telefoon', v);
              setContent(prev => ({ ...prev, telefoon: v }));
            }}
            type="tel"
            placeholder="06 12345678"
          />
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Werkgebied
            </label>
            <WerkgebiedInput
              value={content.contact?.werkgebied || []}
              onChange={(v) => updateContact('werkgebied', v)}
            />
          </div>
        </div>
      </div>

      {/* Zakelijke gegevens */}
      <div className="bg-white rounded-xl border border-slate-200/60 p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-slate-400 text-xl">business</span>
          <h3 className="text-sm font-semibold text-slate-900">Zakelijke gegevens</h3>
        </div>
        <div className="space-y-3">
          <Field
            label="KvK-nummer"
            value={content.zakelijk?.kvk || ''}
            onChange={(v) => updateZakelijk('kvk', v)}
            placeholder="12345678"
          />
          <Field
            label="BTW-nummer"
            value={content.zakelijk?.btw || ''}
            onChange={(v) => updateZakelijk('btw', v)}
            placeholder="NL123456789B01"
          />
          <Field
            label="Handelsnaam"
            value={content.zakelijk?.handelsnaam || ''}
            onChange={(v) => updateZakelijk('handelsnaam', v)}
            placeholder="Naam zoals bij KvK geregistreerd"
          />
        </div>
      </div>

      {/* Sociale media */}
      <div className="bg-white rounded-xl border border-slate-200/60 p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-slate-400 text-xl">share</span>
          <h3 className="text-sm font-semibold text-slate-900">Sociale media</h3>
        </div>
        <div className="space-y-3">
          <Field
            label="LinkedIn"
            value={content.socials?.linkedin || ''}
            onChange={(v) => updateSocials('linkedin', v)}
            placeholder="https://linkedin.com/in/jouw-profiel"
            type="url"
          />
          <Field
            label="Instagram"
            value={content.socials?.instagram || ''}
            onChange={(v) => updateSocials('instagram', v)}
            placeholder="https://instagram.com/jouw-account"
            type="url"
          />
          <Field
            label="Facebook"
            value={content.socials?.facebook || ''}
            onChange={(v) => updateSocials('facebook', v)}
            placeholder="https://facebook.com/jouw-pagina"
            type="url"
          />
        </div>
      </div>

      {/* Save button */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? 'Opslaan...' : 'Gegevens opslaan'}
        </button>
        {status === 'saved' && (
          <span className="flex items-center gap-1 text-sm text-emerald-600">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            Opgeslagen
          </span>
        )}
        {status === 'error' && (
          <span className="text-sm text-red-600">{errorMessage}</span>
        )}
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FIELD COMPONENTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-700 mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
      />
    </div>
  );
}

function WerkgebiedInput({
  value,
  onChange,
}: {
  value: string[];
  onChange: (value: string[]) => void;
}) {
  const [input, setInput] = useState('');

  const addItem = () => {
    const trimmed = input.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
      setInput('');
    }
  };

  const removeItem = (item: string) => {
    onChange(value.filter(v => v !== item));
  };

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addItem(); } }}
          placeholder="Voeg regio toe, bijv. Amsterdam"
          className="flex-1 px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
        />
        <button
          type="button"
          onClick={addItem}
          disabled={!input.trim()}
          className="px-3 py-2.5 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
        </button>
      </div>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {value.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 rounded-full"
            >
              {item}
              <button
                type="button"
                onClick={() => removeItem(item)}
                className="text-slate-400 hover:text-slate-600"
              >
                <span className="material-symbols-outlined text-[14px]">close</span>
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
