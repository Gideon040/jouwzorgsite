// types/site.ts - Toevoegen aan je bestaande types file

// ============ HELPER FUNCTION ============
// Voeg deze functie toe aan je types/site.ts of maak een aparte utils file

export function getJarenErvaring(werkervaring?: Werkervaring[]): number | null {
  if (!werkervaring?.length) return null;
  
  // Support both snake_case and camelCase
  const startYears = werkervaring.map(w => {
    return (w as any).start_jaar || (w as any).startJaar;
  }).filter(Boolean);
  
  if (!startYears.length) return null;
  
  const earliest = Math.min(...startYears);
  return new Date().getFullYear() - earliest;
}

// ============ WERKERVARING TYPE ============
// Zorg dat deze interface beide formats ondersteunt

export interface Werkervaring {
  functie: string;
  werkgever: string;
  start_jaar?: number;  // snake_case
  startJaar?: number;   // camelCase (legacy)
  eind_jaar?: number;
  eindJaar?: number;
  beschrijving?: string;
}
