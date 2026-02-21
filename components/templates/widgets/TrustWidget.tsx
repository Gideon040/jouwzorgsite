// components/templates/widgets/TrustWidget.tsx
// Uitklapbare vertrouwenswidget voor gegenereerde websites
// Vergelijkbaar met WebwinkelKeur / Trustpilot badge
// Palette-aware: past zich aan de template kleuren aan

'use client';

import { useState, useEffect } from 'react';
import { PaletteColors } from '../sections/types';
import { WidgetData, VERKLARING_CONFIGS, VerklaringKey } from '@/types/declarations';

// ============================================
// TYPES
// ============================================

interface TrustWidgetProps {
  subdomain: string;
  palette: PaletteColors;
  style?: 'default' | 'compact' | 'minimal';
  position?: 'bottom-left' | 'bottom-right';
}

// ============================================
// MAIN WIDGET
// ============================================

export function TrustWidget({
  subdomain,
  palette,
  style = 'default',
  position = 'bottom-left',
}: TrustWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [widgetData, setWidgetData] = useState<WidgetData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchWidgetData();
  }, [subdomain]);

  const fetchWidgetData = async () => {
    try {
      const response = await fetch(`/api/widget/${subdomain}`);
      if (!response.ok) throw new Error('Widget not available');
      const data = await response.json();
      setWidgetData(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Don't render if no data or error
  if (loading || error || !widgetData) return null;

  const positionClasses = position === 'bottom-right' ? 'right-4' : 'left-4';

  // Use style from API response if available, otherwise fall back to prop
  const activeStyle = (widgetData as any).widget_style || style;

  // Compact: just the badge (circle)
  if (activeStyle === 'compact') {
    return (
      <div className={`fixed bottom-4 ${positionClasses} z-50`}>
        <TrustBadge
          palette={palette}
          score={widgetData.compliance_score}
          onClick={() => setIsOpen(!isOpen)}
        />
        {isOpen && (
          <TrustPanel
            data={widgetData}
            palette={palette}
            onClose={() => setIsOpen(false)}
            position={position}
          />
        )}
      </div>
    );
  }

  // Minimal: small bar
  if (activeStyle === 'minimal') {
    return (
      <div className={`fixed bottom-4 ${positionClasses} z-50`}>
        <CompactBar
          data={widgetData}
          palette={palette}
          onClick={() => setIsOpen(!isOpen)}
        />
        {isOpen && (
          <TrustPanel
            data={widgetData}
            palette={palette}
            onClose={() => setIsOpen(false)}
            position={position}
          />
        )}
      </div>
    );
  }

  // Default: full badge + expandable panel
  return (
    <div className={`fixed bottom-4 ${positionClasses} z-50`}>
      <DefaultBadge
        data={widgetData}
        palette={palette}
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <TrustPanel
          data={widgetData}
          palette={palette}
          onClose={() => setIsOpen(false)}
          position={position}
        />
      )}
    </div>
  );
}

// ============================================
// TRUST BADGE (minimal)
// ============================================

function TrustBadge({
  palette,
  score,
  onClick,
}: {
  palette: PaletteColors;
  score: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
      style={{ backgroundColor: palette.primary }}
      aria-label="Bekijk professioneel zorgprofiel"
    >
      <div className="flex items-center justify-center h-full">
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
        </svg>
      </div>
      {/* Score ring */}
      <svg
        className="absolute inset-0 w-full h-full -rotate-90"
        viewBox="0 0 56 56"
      >
        <circle
          cx="28"
          cy="28"
          r="26"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="2"
        />
        <circle
          cx="28"
          cy="28"
          r="26"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeDasharray={`${(score / 100) * 163.36} 163.36`}
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}

// ============================================
// COMPACT BAR
// ============================================

function CompactBar({
  data,
  palette,
  onClick,
}: {
  data: WidgetData;
  palette: PaletteColors;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all bg-white border border-slate-200 hover:border-slate-300"
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: palette.primary }}
      >
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
        </svg>
      </div>
      <span className="text-sm font-semibold text-slate-800">Zorgprofiel</span>
      <span
        className="text-xs font-bold px-2 py-0.5 rounded-full"
        style={{ backgroundColor: `${palette.primary}15`, color: palette.primary }}
      >
        {data.compliance_score}%
      </span>
      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}

// ============================================
// DEFAULT BADGE
// ============================================

function DefaultBadge({
  data,
  palette,
  isOpen,
  onClick,
}: {
  data: WidgetData;
  palette: PaletteColors;
  isOpen: boolean;
  onClick: () => void;
}) {
  const verifiedCount =
    (data.verified.big.status ? 1 : 0) +
    (data.verified.kvk.status ? 1 : 0) +
    (data.verified.website ? 1 : 0);

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 pl-3 pr-4 py-2.5 rounded-2xl shadow-lg hover:shadow-xl transition-all bg-white border border-slate-200 hover:border-slate-300 max-w-[300px]"
    >
      {/* Shield icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: palette.primary }}
      >
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
        </svg>
      </div>

      {/* Text */}
      <div className="flex-1 text-left min-w-0">
        <div className="text-xs font-bold text-slate-900 leading-tight">
          Professioneel zorgprofiel
        </div>
        <div className="text-[10px] text-slate-500 leading-tight mt-0.5">
          {verifiedCount} geverifieerd · {data.compliance_score}% compliant
        </div>
      </div>

      {/* Arrow */}
      <svg
        className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}

// ============================================
// TRUST PANEL (het uitklapbare deel)
// ============================================

function TrustPanel({
  data,
  palette,
  onClose,
  position,
}: {
  data: WidgetData;
  palette: PaletteColors;
  onClose: () => void;
  position: 'bottom-left' | 'bottom-right';
}) {
  const activeDeclarations = Object.entries(data.declarations).filter(([, v]) => v);
  const positionClass = position === 'bottom-right' ? 'right-0' : 'left-0';

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Panel */}
      <div
        className={`absolute bottom-full mb-3 ${positionClass} w-[380px] max-h-[70vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 animate-slide-up`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-100 px-5 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: palette.primary }}
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Professioneel zorgprofiel
                </h3>
                <p className="text-[11px] text-slate-500">
                  Verklaring zelfstandige zorgverlener
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Intro */}
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-100">
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Deze zelfstandig werkende zorgverlener heeft onderstaande gegevens aangeleverd
            en verklaart te werken volgens de professionele eisen die gelden voor zzp'ers
            in de zorg. Sommige onderdelen zijn geverifieerd via openbare registers, andere
            zijn door de zorgverlener zelf bevestigd.
          </p>
        </div>

        <div className="px-5 py-4 space-y-5">
          {/* ======= GEVERIFIEERDE GEGEVENS ======= */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{ backgroundColor: palette.primary }}
              >
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Geverifieerde gegevens
              </span>
            </div>

            <div className="space-y-2">
              {/* BIG */}
              <VerifiedItem
                palette={palette}
                verified={data.verified.big.status}
                label="BIG-registratie gecontroleerd"
                detail={data.verified.big.beroep || undefined}
              />
              {/* KvK */}
              <VerifiedItem
                palette={palette}
                verified={data.verified.kvk.status}
                label="KvK-inschrijving zichtbaar"
                detail={data.verified.kvk.handelsnaam || undefined}
              />
              {/* Website */}
              <VerifiedItem
                palette={palette}
                verified={data.verified.website}
                label="Professionele online presentatie actief"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-slate-100" />

          {/* ======= ZELFVERKLAARDE ITEMS ======= */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
                <svg className="w-3 h-3 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Verklaring van professionele werkwijze
              </span>
            </div>

            <p className="text-[11px] text-slate-500 mb-3">
              Deze zorgverlener verklaart:
            </p>

            <div className="space-y-1.5">
              {activeDeclarations.map(([key]) => {
                const config = VERKLARING_CONFIGS.find((c) => c.key === key);
                if (!config) return null;
                return (
                  <DeclarationItem key={key} label={config.label} palette={palette} />
                );
              })}
            </div>
          </div>

          {/* ======= COMPLIANCE SCORE ======= */}
          <div className="bg-slate-50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-medium text-slate-500">Compliance score</div>
                <div className="text-2xl font-bold" style={{ color: palette.primary }}>
                  {data.compliance_score}%
                </div>
              </div>
              <ScoreRing score={data.compliance_score} palette={palette} />
            </div>
            {data.declaration_date && (
              <div className="text-[10px] text-slate-400 mt-2">
                Verklaring ondertekend op{' '}
                {new Date(data.declaration_date).toLocaleDateString('nl-NL', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer disclaimer */}
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 rounded-b-2xl">
          <p className="text-[10px] text-slate-400 leading-relaxed">
            Deze verklaring is gebaseerd op informatie die door de zorgverlener zelf is
            verstrekt. JouwZorgSite controleert niet alle onderdelen inhoudelijk en geeft
            geen juridisch of kwaliteitskeurmerk af.
          </p>
          <div className="flex items-center gap-1 mt-2">
            <svg className="w-3 h-3 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
            </svg>
            <span className="text-[10px] text-slate-400">
              Aangeboden door{' '}
              <a
                href="https://jouwzorgsite.nl"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{ color: palette.primary }}
              >
                JouwZorgSite
              </a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

// ============================================
// SUB-COMPONENTS
// ============================================

function VerifiedItem({
  palette,
  verified,
  label,
  detail,
}: {
  palette: PaletteColors;
  verified: boolean;
  label: string;
  detail?: string;
}) {
  return (
    <div className="flex items-start gap-2.5 py-1.5">
      <div
        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{
          backgroundColor: verified ? `${palette.primary}15` : '#f1f5f9',
        }}
      >
        {verified ? (
          <svg className="w-3 h-3" style={{ color: palette.primary }} fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        ) : (
          <svg className="w-3 h-3 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 13H5v-2h14v2z" />
          </svg>
        )}
      </div>
      <div>
        <div className={`text-xs font-medium ${verified ? 'text-slate-800' : 'text-slate-400'}`}>
          {label}
        </div>
        {detail && verified && (
          <div className="text-[10px] text-slate-500 mt-0.5">{detail}</div>
        )}
      </div>
    </div>
  );
}

function DeclarationItem({
  label,
  palette,
}: {
  label: string;
  palette: PaletteColors;
}) {
  return (
    <div className="flex items-start gap-2.5 py-1">
      <svg
        className="w-4 h-4 flex-shrink-0 mt-0.5"
        style={{ color: palette.primary }}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
      </svg>
      <span className="text-xs text-slate-700 leading-relaxed">{label}</span>
    </div>
  );
}

function ScoreRing({
  score,
  palette,
}: {
  score: number;
  palette: PaletteColors;
}) {
  const circumference = 2 * Math.PI * 22;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-14 h-14">
      <svg className="w-14 h-14 -rotate-90" viewBox="0 0 48 48">
        <circle
          cx="24"
          cy="24"
          r="22"
          fill="none"
          stroke="#f1f5f9"
          strokeWidth="3"
        />
        <circle
          cx="24"
          cy="24"
          r="22"
          fill="none"
          stroke={palette.primary}
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold" style={{ color: palette.primary }}>
          {score}%
        </span>
      </div>
    </div>
  );
}

// ============================================
// CSS ANIMATION (add to globals.css)
// ============================================
// @keyframes slide-up {
//   from { opacity: 0; transform: translateY(8px); }
//   to { opacity: 1; transform: translateY(0); }
// }
// .animate-slide-up {
//   animation: slide-up 0.2s ease-out;
// }