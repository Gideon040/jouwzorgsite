// app/(dashboard)/edit/[siteId]/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { updateSite } from '@/lib/actions/sites';
import { Button, Card, CardContent } from '@/components/ui';
import { 
  StepGegevens,
  StepContact,
  StepDiensten,
  StepCertificaten,
  StepOverMij,
  StepTemplate,
} from '@/components/wizard/steps';
import { Site, SiteContent, Contact, Certificaat } from '@/types';
import { TemplateId } from '@/constants';

interface EditPageProps {
  params: { siteId: string };
}

type EditTab = 'gegevens' | 'contact' | 'diensten' | 'certificaten' | 'over_mij' | 'template';

const TABS: { id: EditTab; label: string; icon: string }[] = [
  { id: 'gegevens', label: 'Gegevens', icon: 'person' },
  { id: 'contact', label: 'Contact', icon: 'call' },
  { id: 'diensten', label: 'Diensten', icon: 'medical_services' },
  { id: 'certificaten', label: 'Certificaten', icon: 'verified' },
  { id: 'over_mij', label: 'Over mij', icon: 'description' },
  { id: 'template', label: 'Template', icon: 'palette' },
];

export default function EditPage({ params }: EditPageProps) {
  const router = useRouter();
  const [site, setSite] = useState<Site | null>(null);
  const [content, setContent] = useState<Partial<SiteContent>>({});
  const [templateId, setTemplateId] = useState<TemplateId>('warm');
  const [activeTab, setActiveTab] = useState<EditTab>('gegevens');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Load site data
  useEffect(() => {
    const loadSite = async () => {
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

      setSite(data as Site);
      setContent(data.content as SiteContent);
      setTemplateId(data.template_id as TemplateId);
      setIsLoading(false);
    };

    loadSite();
  }, [params.siteId, router]);

  const updateContent = (updates: Partial<SiteContent>) => {
    setContent((prev) => ({ ...prev, ...updates }));
  };

  const handleSave = async () => {
    if (!site) return;
    
    setIsSaving(true);
    setSaveMessage('');

    const result = await updateSite(site.id, {
      template_id: templateId,
      content: content,
    });

    if (result.error) {
      setSaveMessage(`❌ ${result.error}`);
    } else {
      setSaveMessage('✅ Opgeslagen!');
      setTimeout(() => setSaveMessage(''), 3000);
    }

    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-500">Laden...</p>
        </div>
      </div>
    );
  }

  if (!site) return null;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'gegevens':
        return (
          <StepGegevens
            naam={content.naam || ''}
            foto={content.foto}
            tagline={content.tagline || ''}
            onNaamChange={(naam) => updateContent({ naam })}
            onFotoChange={(foto) => updateContent({ foto: foto || undefined })}
            onTaglineChange={(tagline) => updateContent({ tagline })}
          />
        );
      case 'contact':
        return (
          <StepContact
            contact={content.contact || { email: '', werkgebied: [] }}
            onContactChange={(contact) => updateContent({ contact: contact as Contact })}
          />
        );
      case 'diensten':
        return (
          <StepDiensten
            beroep={site.beroep}
            diensten={content.diensten || []}
            onDienstenChange={(diensten) => updateContent({ diensten })}
          />
        );
      case 'certificaten':
        return (
          <StepCertificaten
            certificaten={content.certificaten || []}
            onAdd={(cert) =>
              updateContent({ certificaten: [...(content.certificaten || []), cert] })
            }
            onRemove={(index) =>
              updateContent({
                certificaten: (content.certificaten || []).filter((_, i) => i !== index),
              })
            }
            onUpdate={(index, updates) =>
              updateContent({
                certificaten: (content.certificaten || []).map((cert, i) =>
                  i === index ? { ...cert, ...updates } : cert
                ),
              })
            }
          />
        );
      case 'over_mij':
        return (
          <StepOverMij
            value={content.over_mij || ''}
            onChange={(over_mij) => updateContent({ over_mij })}
          />
        );
      case 'template':
        return <StepTemplate value={templateId} onChange={setTemplateId} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
            <a href="/dashboard" className="hover:text-primary">Dashboard</a>
            <span>/</span>
            <span>Bewerken</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {content.naam || 'Site bewerken'}
          </h1>
          <p className="text-slate-500">
            {site.subdomain}.jouwzorgsite.nl
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saveMessage && (
            <span className="text-sm font-medium">{saveMessage}</span>
          )}
          <a
            href={`/site/${site.subdomain}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline">
              <span className="material-symbols-outlined">visibility</span>
              Preview
            </Button>
          </a>
          <Button onClick={handleSave} isLoading={isSaving}>
            <span className="material-symbols-outlined">save</span>
            Opslaan
          </Button>
        </div>
      </div>

      {/* Tabs + Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:w-64 flex-shrink-0">
          <Card>
            <nav className="p-2">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors
                    ${activeTab === tab.id 
                      ? 'bg-primary text-white' 
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                    }
                  `}
                >
                  <span className="material-symbols-outlined text-xl">{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </Card>
        </div>

        {/* Content */}
        <div className="flex-1">
          <Card>
            <CardContent className="p-0">
              {renderTabContent()}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
