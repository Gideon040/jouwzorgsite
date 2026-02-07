'use client';

import { useState, useEffect } from 'react';

interface GeneratingSectionProps {
  naam: string;
  beroep: string;
}

const GENERATING_STEPS = [
  { icon: 'psychology', label: 'Jouw profiel analyseren', duration: 2500 },
  { icon: 'palette', label: 'Design & kleuren kiezen', duration: 3000 },
  { icon: 'edit_note', label: 'Teksten schrijven', duration: 4000 },
  { icon: 'code', label: 'Website bouwen', duration: 3500 },
  { icon: 'rocket_launch', label: 'Laatste touches...', duration: 2000 },
];

const FUN_FACTS = [
  'Wist je dat 87% van cliënten eerst online zoekt naar een zorgverlener?',
  'Een professionele website vergroot je geloofwaardigheid met 75%.',
  'ZZP\'ers met een website krijgen 3x meer aanvragen.',
  'Je website wordt automatisch geoptimaliseerd voor telefoons.',
  'We gebruiken jouw BIG-registratie voor extra vertrouwen.',
];

export function GeneratingSection({ naam, beroep }: GeneratingSectionProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [factIndex, setFactIndex] = useState(0);
  const [factVisible, setFactVisible] = useState(true);

  // Progress through steps
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    let accumulated = 0;

    GENERATING_STEPS.forEach((step, idx) => {
      if (idx === 0) return; // Start at 0
      accumulated += step.duration;
      timers.push(setTimeout(() => setActiveStep(idx), accumulated));
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  // Rotate fun facts
  useEffect(() => {
    const interval = setInterval(() => {
      setFactVisible(false);
      setTimeout(() => {
        setFactIndex(prev => (prev + 1) % FUN_FACTS.length);
        setFactVisible(true);
      }, 400);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const firstName = naam.split(' ')[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 relative overflow-hidden">
      
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[150px]" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-orange-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-lg text-center">
        
        {/* Main spinner */}
        <div className="relative w-28 h-28 mx-auto mb-10">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-2 border-orange-500/20" />
          <svg className="absolute inset-0 w-28 h-28 -rotate-90" viewBox="0 0 112 112">
            <circle
              cx="56" cy="56" r="54"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${((activeStep + 1) / GENERATING_STEPS.length) * 339} 339`}
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span 
              className="material-symbols-outlined text-4xl text-orange-400 transition-all duration-500"
              key={activeStep}
              style={{ animation: 'iconPop 0.5s ease-out' }}
            >
              {GENERATING_STEPS[activeStep].icon}
            </span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Even geduld, {firstName}
        </h1>
        <p className="text-lg text-slate-400 mb-12">
          We bouwen je professionele website
        </p>

        {/* Steps */}
        <div className="space-y-3 mb-12 text-left max-w-sm mx-auto">
          {GENERATING_STEPS.map((step, idx) => (
            <div 
              key={idx}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-500 ${
                idx < activeStep 
                  ? 'bg-white/5' 
                  : idx === activeStep 
                    ? 'bg-orange-500/10 border border-orange-500/20' 
                    : 'opacity-30'
              }`}
            >
              {/* Status icon */}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                idx < activeStep 
                  ? 'bg-emerald-500/20' 
                  : idx === activeStep 
                    ? 'bg-orange-500/20' 
                    : 'bg-slate-700/50'
              }`}>
                {idx < activeStep ? (
                  <span className="material-symbols-outlined text-lg text-emerald-400">check</span>
                ) : idx === activeStep ? (
                  <span className="material-symbols-outlined text-lg text-orange-400 animate-pulse">
                    {step.icon}
                  </span>
                ) : (
                  <span className="material-symbols-outlined text-lg text-slate-600">{step.icon}</span>
                )}
              </div>
              
              {/* Label */}
              <span className={`text-sm font-medium transition-colors duration-500 ${
                idx < activeStep 
                  ? 'text-slate-400 line-through decoration-slate-600' 
                  : idx === activeStep 
                    ? 'text-white' 
                    : 'text-slate-600'
              }`}>
                {step.label}
              </span>

              {/* Active indicator */}
              {idx === activeStep && (
                <div className="ml-auto flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Fun fact */}
        <div className={`transition-all duration-400 ${factVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <div className="inline-flex items-start gap-2 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 max-w-sm">
            <span className="material-symbols-outlined text-orange-400/60 text-lg mt-0.5 flex-shrink-0">lightbulb</span>
            <p className="text-sm text-slate-400 text-left">{FUN_FACTS[factIndex]}</p>
          </div>
        </div>
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
          50% { transform: translateY(-20px) scale(1.5); opacity: 0.6; }
        }
        @keyframes iconPop {
          0% { transform: scale(0.5); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}