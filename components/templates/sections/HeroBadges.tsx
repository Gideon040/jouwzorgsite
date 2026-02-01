// components/templates/sections/HeroBadges.tsx
// Kleine compliance badges voor in de hero sectie
// Toont BIG, KvK, Wtza, Wkkgz status als kleine icoontjes

'use client';

import { Certificaat, CertificaatType } from '@/types';
import { HERO_BADGE_ORDER, getCertificaatTypeConfig } from '@/constants/certificaten';

interface HeroBadgesProps {
  certificaten: Certificaat[];
  variant?: 'light' | 'dark' | 'glass';
  size?: 'sm' | 'md';
  showLabels?: boolean;
}

// Badge configuratie met tooltips
const BADGE_CONFIG: Record<CertificaatType, { 
  icon: string; 
  tooltip: string;
  colorVerified: string;
  colorPending: string;
}> = {
  big: {
    icon: 'verified',
    tooltip: 'BIG-geregistreerd zorgverlener',
    colorVerified: 'text-emerald-500 bg-emerald-50',
    colorPending: 'text-gray-400 bg-gray-100',
  },
  kvk: {
    icon: 'business',
    tooltip: 'Ingeschreven bij KvK',
    colorVerified: 'text-slate-600 bg-slate-100',
    colorPending: 'text-gray-400 bg-gray-100',
  },
  wtza: {
    icon: 'gavel',
    tooltip: 'Wtza gemeld bij IGJ',
    colorVerified: 'text-indigo-500 bg-indigo-50',
    colorPending: 'text-gray-400 bg-gray-100',
  },
  wkkgz: {
    icon: 'policy',
    tooltip: 'Wkkgz compliant',
    colorVerified: 'text-violet-500 bg-violet-50',
    colorPending: 'text-gray-400 bg-gray-100',
  },
  // Andere types (niet in hero badges maar voor completeness)
  agb: { icon: 'badge', tooltip: 'AGB-code', colorVerified: 'text-blue-500 bg-blue-50', colorPending: 'text-gray-400 bg-gray-100' },
  btw: { icon: 'receipt_long', tooltip: 'BTW-nummer', colorVerified: 'text-gray-500 bg-gray-50', colorPending: 'text-gray-400 bg-gray-100' },
  vog: { icon: 'shield', tooltip: 'VOG', colorVerified: 'text-amber-500 bg-amber-50', colorPending: 'text-gray-400 bg-gray-100' },
  kiwa: { icon: 'workspace_premium', tooltip: 'KIWA keurmerk', colorVerified: 'text-pink-500 bg-pink-50', colorPending: 'text-gray-400 bg-gray-100' },
  diploma: { icon: 'school', tooltip: 'Diploma', colorVerified: 'text-rose-500 bg-rose-50', colorPending: 'text-gray-400 bg-gray-100' },
  verzekering: { icon: 'health_and_safety', tooltip: 'Verzekerd', colorVerified: 'text-cyan-500 bg-cyan-50', colorPending: 'text-gray-400 bg-gray-100' },
  klachtenregeling: { icon: 'support_agent', tooltip: 'Klachtenregeling', colorVerified: 'text-purple-500 bg-purple-50', colorPending: 'text-gray-400 bg-gray-100' },
};

export function HeroBadges({ 
  certificaten, 
  variant = 'light',
  size = 'md',
  showLabels = false,
}: HeroBadgesProps) {
  const certTypes = certificaten.map(c => c.type);
  
  // Gebruik HERO_BADGE_ORDER voor consistente volgorde
  const badges = HERO_BADGE_ORDER.map(type => ({
    type,
    verified: certTypes.includes(type),
    config: BADGE_CONFIG[type],
  }));

  // Als geen enkele badge verified is, toon niets
  const hasAnyVerified = badges.some(b => b.verified);
  if (!hasAnyVerified) return null;

  const sizeClasses = size === 'sm' 
    ? 'w-8 h-8 text-base' 
    : 'w-10 h-10 text-lg';

  const containerClasses = variant === 'dark'
    ? 'bg-white/10 backdrop-blur-sm'
    : variant === 'glass'
    ? 'bg-white/50 backdrop-blur-md border border-white/20'
    : 'bg-white/80 backdrop-blur-sm border border-gray-100';

  return (
    <div className={`inline-flex items-center gap-2 p-2 rounded-2xl ${containerClasses}`}>
      {badges.map(({ type, verified, config }) => (
        <div
          key={type}
          className="group relative"
          title={config.tooltip}
        >
          {/* Badge icon */}
          <div
            className={`
              ${sizeClasses} 
              rounded-xl flex items-center justify-center transition-all
              ${verified ? config.colorVerified : config.colorPending}
              ${verified ? 'opacity-100' : 'opacity-50'}
            `}
          >
            <span className="material-symbols-outlined">
              {config.icon}
            </span>
            
            {/* Checkmark overlay voor verified */}
            {verified && (
              <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-xs">check</span>
              </span>
            )}
          </div>

          {/* Tooltip on hover */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs font-medium rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pointer-events-none z-10">
            {verified ? config.tooltip : `${getCertificaatTypeConfig(type)?.shortLabel || type} niet toegevoegd`}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900" />
          </div>

          {/* Label underneath (optional) */}
          {showLabels && (
            <span className={`block text-center text-xs font-semibold mt-1 ${verified ? 'text-gray-700' : 'text-gray-400'}`}>
              {getCertificaatTypeConfig(type)?.shortLabel || type}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

// ============================================
// SIMPLE INLINE VERSION (voor compacte hero's)
// ============================================
export function HeroBadgesInline({ 
  certificaten,
  className = '',
}: { 
  certificaten: Certificaat[];
  className?: string;
}) {
  const certTypes = certificaten.map(c => c.type);
  
  const verifiedBadges = HERO_BADGE_ORDER.filter(type => certTypes.includes(type));
  
  if (verifiedBadges.length === 0) return null;

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {verifiedBadges.map(type => {
        const config = BADGE_CONFIG[type];
        const certConfig = getCertificaatTypeConfig(type);
        
        return (
          <span
            key={type}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${config.colorVerified}`}
            title={config.tooltip}
          >
            <span className="material-symbols-outlined text-base">{config.icon}</span>
            {certConfig?.shortLabel || type}
            <span className="material-symbols-outlined text-emerald-500 text-sm">check_circle</span>
          </span>
        );
      })}
    </div>
  );
}

// ============================================
// MINI VERSION (alleen icoontjes, voor navbar)
// ============================================
export function HeroBadgesMini({ 
  certificaten,
}: { 
  certificaten: Certificaat[];
}) {
  const certTypes = certificaten.map(c => c.type);
  const verifiedCount = HERO_BADGE_ORDER.filter(type => certTypes.includes(type)).length;
  
  if (verifiedCount === 0) return null;

  return (
    <div className="flex items-center gap-1">
      {HERO_BADGE_ORDER.map(type => {
        const verified = certTypes.includes(type);
        const config = BADGE_CONFIG[type];
        
        return (
          <span
            key={type}
            className={`w-6 h-6 rounded-lg flex items-center justify-center ${
              verified ? config.colorVerified : 'text-gray-300 bg-gray-50'
            }`}
            title={verified ? config.tooltip : `${type} niet toegevoegd`}
          >
            <span className="material-symbols-outlined text-sm">{config.icon}</span>
          </span>
        );
      })}
    </div>
  );
}

export default HeroBadges;