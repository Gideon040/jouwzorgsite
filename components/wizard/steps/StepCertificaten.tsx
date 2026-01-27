// components/wizard/steps/StepCertificaten.tsx

'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Input, Select, ImageUpload, Card } from '@/components/ui';
import { Certificaat, CertificaatType } from '@/types';
import { CERTIFICAAT_TYPES, getCertificaatTypeConfig } from '@/constants';

interface StepCertificatenProps {
  certificaten: Certificaat[];
  onAdd: (certificaat: Certificaat) => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, updates: Partial<Certificaat>) => void;
}

export function StepCertificaten({
  certificaten,
  onAdd,
  onRemove,
  onUpdate,
}: StepCertificatenProps) {
  const [showForm, setShowForm] = useState(false);
  const [selectedType, setSelectedType] = useState<CertificaatType | ''>('');
  const [formData, setFormData] = useState<Partial<Certificaat>>({});

  const typeOptions = CERTIFICAAT_TYPES.map((t) => ({
    value: t.id,
    label: t.label,
  }));

  const config = selectedType ? getCertificaatTypeConfig(selectedType) : null;

  const handleAdd = () => {
    if (selectedType && formData.label) {
      onAdd({
        type: selectedType,
        label: formData.label,
        value: formData.value,
        sublabel: formData.sublabel,
        image_url: formData.image_url,
        expires_at: formData.expires_at,
      });
      setSelectedType('');
      setFormData({});
      setShowForm(false);
    }
  };

  const handleTypeChange = (type: CertificaatType) => {
    setSelectedType(type);
    const typeConfig = getCertificaatTypeConfig(type);
    setFormData({
      label: typeConfig?.label || '',
    });
  };

  return (
    <div className="p-6 md:p-8 flex flex-col gap-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold leading-tight mb-2">
          Kwalificaties & Certificaten
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-base">
          Toon je registraties en diploma's. Dit wekt vertrouwen bij cliënten.
        </p>
      </div>

      {/* Added Certificates List */}
      <div className="flex flex-col gap-3">
        {certificaten.map((cert, index) => {
          const certConfig = getCertificaatTypeConfig(cert.type);
          return (
            <Card key={index} className="p-4">
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center',
                    `bg-${certConfig?.color || 'slate'}-100 dark:bg-${certConfig?.color || 'slate'}-900/30`
                  )}
                >
                  <span
                    className={cn(
                      'material-symbols-outlined',
                      `text-${certConfig?.color || 'slate'}-600 dark:text-${certConfig?.color || 'slate'}-400`
                    )}
                  >
                    {certConfig?.icon || 'description'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-900 dark:text-white font-bold truncate">
                    {cert.label}
                  </p>
                  {(cert.value || cert.sublabel) && (
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                      {cert.sublabel && <span>{cert.sublabel}</span>}
                      {cert.sublabel && cert.value && <span> • </span>}
                      {cert.value && <span>{cert.value}</span>}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {cert.image_url && (
                    <span
                      className="material-symbols-outlined text-primary cursor-pointer hover:scale-110 transition-transform"
                      title="Bewijs geüpload"
                    >
                      visibility
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => onRemove(index)}
                    className="text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Add Form */}
      {showForm ? (
        <Card className="p-5 border-2 border-dashed border-primary">
          <div className="flex flex-col gap-4">
            <Select
              label="Type certificaat"
              options={typeOptions}
              value={selectedType}
              onChange={(e) => handleTypeChange(e.target.value as CertificaatType)}
              placeholder="Selecteer type..."
            />

            {selectedType && config && (
              <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-top-2">
                <Input
                  label="Naam/Label"
                  value={formData.label || ''}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  placeholder={config.label}
                />

                {config.hasValue && (
                  <Input
                    label="Waarde/Nummer"
                    value={formData.value || ''}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    placeholder={config.placeholder}
                  />
                )}

                {config.hasSublabel && (
                  <Input
                    label="Extra info (optioneel)"
                    value={formData.sublabel || ''}
                    onChange={(e) => setFormData({ ...formData, sublabel: e.target.value })}
                    placeholder="bijv. Verpleegkundige, Hogeschool Utrecht..."
                  />
                )}

                {config.hasExpiry && (
                  <Input
                    label="Geldig tot (optioneel)"
                    type="date"
                    value={formData.expires_at || ''}
                    onChange={(e) => setFormData({ ...formData, expires_at: e.target.value })}
                  />
                )}

                {config.hasProof && (
                  <ImageUpload
                    label="Upload bewijs (optioneel)"
                    value={formData.image_url || undefined}
                    onChange={(url) => setFormData({ ...formData, image_url: url })}
                    hint="Bezoekers kunnen dit bekijken via het 👁️ icoon"
                  />
                )}
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={handleAdd}
                disabled={!selectedType || !formData.label}
                className="flex-1 bg-primary text-white px-4 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Toevoegen
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setSelectedType('');
                  setFormData({});
                }}
                className="px-4 py-3 rounded-lg font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Annuleren
              </button>
            </div>
          </div>
        </Card>
      ) : (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 dark:border-slate-700 p-6 rounded-xl text-primary font-bold hover:bg-primary/5 hover:border-primary transition-all"
        >
          <span className="material-symbols-outlined">add_circle</span>
          <span>Voeg certificaat toe</span>
        </button>
      )}

      {/* Tips */}
      <div className="flex gap-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
        <span className="material-symbols-outlined text-primary">lightbulb</span>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-bold text-primary">Tip:</p>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            BIG-registratie en VOG zijn het belangrijkst. Je kunt later altijd nog certificaten toevoegen.
          </p>
        </div>
      </div>
    </div>
  );
}
