// components/wizard/steps/StepContact.tsx

'use client';

import { useState } from 'react';
import { Input, Badge } from '@/components/ui';
import { Contact } from '@/types';

interface StepContactProps {
  contact: Partial<Contact>;
  onContactChange: (contact: Partial<Contact>) => void;
}

export function StepContact({ contact, onContactChange }: StepContactProps) {
  const [werkgebiedInput, setWerkgebiedInput] = useState('');

  const handleAddWerkgebied = () => {
    if (werkgebiedInput.trim()) {
      onContactChange({
        ...contact,
        werkgebied: [...(contact.werkgebied || []), werkgebiedInput.trim()],
      });
      setWerkgebiedInput('');
    }
  };

  const handleRemoveWerkgebied = (index: number) => {
    onContactChange({
      ...contact,
      werkgebied: (contact.werkgebied || []).filter((_, i) => i !== index),
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddWerkgebied();
    }
  };

  return (
    <div className="p-6 md:p-8 flex flex-col gap-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold leading-tight mb-2">
          Contact & Werkgebied
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-base">
          Hoe kunnen cliënten je bereiken?
        </p>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-6">
        <Input
          label="E-mailadres"
          type="email"
          icon="mail"
          placeholder="info@jouwdomein.nl"
          value={contact.email || ''}
          onChange={(e) => onContactChange({ ...contact, email: e.target.value })}
        />

        <Input
          label="Telefoonnummer (optioneel)"
          type="tel"
          icon="phone"
          placeholder="06-12345678"
          value={contact.telefoon || ''}
          onChange={(e) => onContactChange({ ...contact, telefoon: e.target.value })}
        />

        <div className="flex flex-col gap-2">
          <label className="text-slate-900 dark:text-white text-base font-semibold">
            Werkgebied
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                location_on
              </span>
              <input
                type="text"
                className="form-input w-full rounded-lg text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-primary focus:ring-2 focus:ring-primary/20 h-12 pl-11 pr-4 text-base placeholder:text-slate-400 transition-all duration-200"
                placeholder="bijv. Amsterdam"
                value={werkgebiedInput}
                onChange={(e) => setWerkgebiedInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <button
              type="button"
              onClick={handleAddWerkgebied}
              className="h-12 px-4 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-colors"
            >
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Druk op Enter of klik + om toe te voegen
          </p>

          {/* Werkgebied Tags */}
          {contact.werkgebied && contact.werkgebied.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {contact.werkgebied.map((gebied, index) => (
                <Badge key={index} variant="primary" className="flex items-center gap-1">
                  {gebied}
                  <button
                    type="button"
                    onClick={() => handleRemoveWerkgebied(index)}
                    className="hover:text-red-500 transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
