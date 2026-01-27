// components/wizard/steps/StepTestimonials.tsx
// Testimonials / reviews van cliënten

'use client';

import { useState } from 'react';
import { Input, Textarea, Button } from '@/components/ui';
import { SiteContent, Testimonial } from '@/types';

interface StepTestimonialsProps {
  content: Partial<SiteContent>;
  onChange: (updates: Partial<SiteContent>) => void;
  addTestimonial: (item: Testimonial) => void;
  removeTestimonial: (index: number) => void;
}

export function StepTestimonials({ 
  content, 
  onChange, 
  addTestimonial, 
  removeTestimonial 
}: StepTestimonialsProps) {
  const [showForm, setShowForm] = useState(false);
  const [nieuw, setNieuw] = useState<Partial<Testimonial>>({
    tekst: '',
    naam: '',
    relatie: '',
  });

  const testimonials = content.testimonials || [];

  const handleAdd = () => {
    if (nieuw.tekst && nieuw.naam) {
      addTestimonial({
        tekst: nieuw.tekst,
        naam: nieuw.naam,
        relatie: nieuw.relatie,
      });
      setNieuw({ tekst: '', naam: '', relatie: '' });
      setShowForm(false);
    }
  };

  // Get initials for avatar
  const getInitials = (naam: string) => {
    return naam
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Wat zeggen cliënten?
        </h2>
        <p className="text-slate-500">
          Reviews van tevreden cliënten zijn krachtig voor nieuwe bezoekers.
          <span className="block text-sm text-slate-400 mt-1">
            (Optioneel - u kunt maximaal 3 reviews toevoegen)
          </span>
        </p>
      </div>

      {/* Bestaande testimonials */}
      {testimonials.length > 0 && (
        <div className="grid gap-4 mb-6">
          {testimonials.map((item, index) => (
            <div 
              key={index} 
              className="bg-white border border-slate-200 rounded-xl p-5 relative group"
            >
              <button
                type="button"
                onClick={() => removeTestimonial(index)}
                className="absolute top-3 right-3 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
              
              <p className="text-slate-600 italic mb-4">
                "{item.tekst}"
              </p>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  {getInitials(item.naam)}
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{item.naam}</p>
                  {item.relatie && (
                    <p className="text-xs text-primary font-medium">{item.relatie}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add form */}
      {showForm ? (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">rate_review</span>
            Review toevoegen
          </h3>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Wat zei de cliënt? *
            </label>
            <Textarea
              value={nieuw.tekst || ''}
              onChange={(e) => setNieuw({ ...nieuw, tekst: e.target.value })}
              placeholder="bijv. De zorg was professioneel en warm. Een echte aanrader!"
              rows={3}
            />
            <p className="text-xs text-slate-400 mt-1">
              Tip: Houd het kort en krachtig (max 2-3 zinnen)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Naam *
              </label>
              <Input
                value={nieuw.naam || ''}
                onChange={(e) => setNieuw({ ...nieuw, naam: e.target.value })}
                placeholder="bijv. Familie Jansen"
              />
              <p className="text-xs text-slate-400 mt-1">
                Gebruik initialen voor privacy: "J. de Vries"
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Relatie (optioneel)
              </label>
              <Input
                value={nieuw.relatie || ''}
                onChange={(e) => setNieuw({ ...nieuw, relatie: e.target.value })}
                placeholder="bijv. Cliënt sinds 2022"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button onClick={handleAdd} disabled={!nieuw.tekst || !nieuw.naam}>
              <span className="material-symbols-outlined">add</span>
              Toevoegen
            </Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>
              Annuleren
            </Button>
          </div>
        </div>
      ) : testimonials.length < 3 ? (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="w-full p-6 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined">add_circle</span>
          Review toevoegen {testimonials.length > 0 && `(${testimonials.length}/3)`}
        </button>
      ) : (
        <div className="text-center p-4 bg-emerald-50 rounded-xl text-emerald-700 text-sm">
          <span className="material-symbols-outlined align-middle mr-1">check_circle</span>
          Je hebt het maximum van 3 reviews bereikt
        </div>
      )}

      {/* Privacy notice */}
      <div className="mt-6 p-4 bg-amber-50 rounded-xl">
        <p className="text-sm text-amber-700">
          <span className="material-symbols-outlined text-sm align-middle mr-1">privacy_tip</span>
          <strong>Let op:</strong> Vraag altijd toestemming voordat u een review van een cliënt plaatst. 
          Gebruik bij voorkeur initialen of alleen de voornaam voor privacy.
        </p>
      </div>

      {/* Empty state help */}
      {testimonials.length === 0 && !showForm && (
        <div className="mt-4 p-4 bg-blue-50 rounded-xl">
          <p className="text-sm text-blue-700">
            <span className="material-symbols-outlined text-sm align-middle mr-1">lightbulb</span>
            <strong>Geen reviews?</strong> Vraag tevreden cliënten of hun familie om een korte 
            aanbeveling. Dit vergroot het vertrouwen bij nieuwe bezoekers enorm!
          </p>
        </div>
      )}
    </div>
  );
}
