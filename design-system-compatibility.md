# JouwZorgSite Design System Compatibility

## Overzicht

Dit document beschrijft welke template stijlen met elkaar compatibel zijn voor het mixen van section varianten.

---

## Design Kenmerken per Template

| Template | Corners | Layout Style | Typography | Vibe |
|----------|---------|--------------|------------|------|
| **Editorial** | Sharp (geen rounded) | Typography-first, borders | Playfair + Inter | Magazine, strak, €10k |
| **Proactief** | Sharp (geen rounded) | Cards met borders | Space Grotesk + Inter | Zakelijk, modern, actief |
| **Portfolio** | Sharp + organic image corners | Typography-first, foto-gericht | Cormorant + Nunito Sans | Elegant, persoonlijk, fotografisch |
| **Mindoor** | Rounded (2xl/3xl) | Cards, bento grids | DM Sans + Inter | Warm, friendly, toegankelijk |
| **Serene** | Sharp + organic image corners | Typography-first, zen | Playfair + Inter | Rustig, zen, vertrouwenwekkend |

---

## Compatibiliteitsmatrix

Welke templates kunnen secties met elkaar delen:

|           | Editorial | Proactief | Portfolio | Mindoor | Serene |
|-----------|:---------:|:---------:|:---------:|:-------:|:------:|
| **Editorial** | ✅ | ⚠️ | ✅ | ❌ | ✅ |
| **Proactief** | ⚠️ | ✅ | ❌ | ❌ | ❌ |
| **Portfolio** | ✅ | ❌ | ✅ | ❌ | ✅ |
| **Mindoor** | ❌ | ❌ | ❌ | ✅ | ❌ |
| **Serene** | ✅ | ❌ | ✅ | ❌ | ✅ |

### Legenda
- ✅ Volledig compatibel
- ⚠️ Beperkt compatibel (kan, maar niet ideaal)
- ❌ Niet compatibel (mixen veroorzaakt visuele breuk)

---

## Design Groepen

### Groep A: Elegant Typography (kunnen onderling mixen)
- `editorial`
- `portfolio`
- `serene`

**Kenmerken:**
- Typography-first approach
- Sharp corners op UI elementen
- Organic corners toegestaan op afbeeldingen
- Expanding underline hovers
- Micro labels (9-11px, uppercase, tracking)
- Borders ipv fills voor separatie

### Groep B: Professional (standalone)
- `proactief`

**Kenmerken:**
- Card-based layout met borders
- Sharp corners overal
- Icon boxes (vierkant)
- Meer structured/grid-based
- Zakelijke uitstraling

### Groep C: Friendly (standalone)
- `mindoor`

**Kenmerken:**
- Rounded corners OVERAL (rounded-2xl, rounded-3xl)
- Card-based met shadows
- Bento grid layouts
- Warme, toegankelijke sfeer
- Gradient accenten toegestaan

---

## TypeScript Configuratie

```typescript
// types/design-system.ts

export type TemplateName = 'editorial' | 'proactief' | 'portfolio' | 'mindoor' | 'serene';

export type DesignGroup = 'elegant' | 'professional' | 'friendly';

export const DESIGN_GROUPS: Record<DesignGroup, TemplateName[]> = {
  elegant: ['editorial', 'portfolio', 'serene'],
  professional: ['proactief'],
  friendly: ['mindoor'],
};

export const TEMPLATE_TO_GROUP: Record<TemplateName, DesignGroup> = {
  editorial: 'elegant',
  proactief: 'professional',
  portfolio: 'elegant',
  mindoor: 'friendly',
  serene: 'elegant',
};

export const COMPATIBILITY_MAP: Record<TemplateName, TemplateName[]> = {
  editorial: ['editorial', 'portfolio', 'serene'],
  proactief: ['proactief'],
  portfolio: ['editorial', 'portfolio', 'serene'],
  mindoor: ['mindoor'],
  serene: ['editorial', 'portfolio', 'serene'],
};

/**
 * Check of twee templates compatibel zijn voor section mixing
 */
export function areTemplatesCompatible(a: TemplateName, b: TemplateName): boolean {
  return COMPATIBILITY_MAP[a].includes(b);
}

/**
 * Get alle compatibele templates voor een gegeven template
 */
export function getCompatibleTemplates(template: TemplateName): TemplateName[] {
  return COMPATIBILITY_MAP[template];
}

/**
 * Get de design group van een template
 */
export function getDesignGroup(template: TemplateName): DesignGroup {
  return TEMPLATE_TO_GROUP[template];
}
```

---

## Edge Function Gebruik

```typescript
// In je edge function voor website generatie

import { areTemplatesCompatible, getCompatibleTemplates } from '@/types/design-system';

// Bij het selecteren van section varianten
function selectSectionVariant(
  baseTemplate: TemplateName,
  sectionType: SectionType,
  allowMixing: boolean = false
): SectionStyle {
  
  if (!allowMixing) {
    // Standaard: alleen varianten van dezelfde template
    return getRandomVariant(baseTemplate, sectionType);
  }
  
  // Met mixing: kies uit compatibele templates
  const compatibleTemplates = getCompatibleTemplates(baseTemplate);
  const randomTemplate = compatibleTemplates[Math.floor(Math.random() * compatibleTemplates.length)];
  
  return getRandomVariant(randomTemplate, sectionType);
}
```

---

## Visuele Regels

### ❌ Wat NIET mag
- Mindoor rounded cards naast Editorial sharp borders
- Proactief icon boxes naast Portfolio typography-only
- Shadows (Mindoor) naast border-only (Editorial)
- Gradient buttons naast outlined buttons

### ✅ Wat WEL mag binnen Elegant groep
- Editorial numbered list naast Portfolio typography contact
- Serene organic image corners naast Editorial sharp UI
- Portfolio expanding underlines naast Serene micro labels
- Alle drie delen dezelfde hover patterns (underlines, border color changes)

---

## Section Style Naming Convention

```
[SectionType][Template][Variant?]

Voorbeelden:
- ContactEditorial      (V1 - default)
- ContactEditorial2     (V2)
- ContactEditorial3     (V3)
- ContactProactief
- ContactProactief2
- ContactPortfolio
- ContactMindoor
- ContactSerene
```

Style strings voor switch statements:
```typescript
type ContactStyle = 
  | 'editorial' | 'editorial-2' | 'editorial-3'
  | 'proactief' | 'proactief-2' | 'proactief-3'
  | 'portfolio' | 'portfolio-2' | 'portfolio-3'
  | 'mindoor' | 'mindoor-2' | 'mindoor-3'
  | 'serene' | 'serene-2' | 'serene-3';
```

---

## Toekomstige Uitbreidingen

### Mogelijke nieuwe templates
- **Minimalist**: Ultra-clean, bijna geen kleur, max whitespace
- **Bold**: Grote contrasten, oversized elements, statement
- **Classic**: Traditioneel, conservatief, vertrouwd

### Compatibiliteit planning
| Nieuw | Zou passen bij |
|-------|----------------|
| Minimalist | Elegant groep |
| Bold | Standalone |
| Classic | Professional groep |

---

## Changelog

| Datum | Wijziging |
|-------|-----------|
| 2025-02 | Initiële versie met 5 templates |
| - | Contact secties compleet (15 varianten) |