# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

JouwZorgSite is a SaaS website builder for Dutch healthcare freelancers (ZZP zorgprofessionals). All UI text and domain terminology is in **Dutch**. Users go through a multi-step wizard to create a site, then manage it via a dashboard with a split-panel editor.

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

No test framework is configured.

## Tech Stack

- **Next.js 14** (App Router), **TypeScript** (strict), **Tailwind CSS 3.4**
- **Supabase** for auth, PostgreSQL database, and file storage (`site-assets` bucket)
- **Icons**: Google Material Symbols Outlined (`<span className="material-symbols-outlined">icon_name</span>`)
- **Path alias**: `@/*` maps to project root

## Architecture

### Route Groups & Auth

- `(auth)/` — login/register pages (unauthenticated)
- `(dashboard)/` — protected dashboard pages; layout does server-side auth check with `redirect('/login')`
- `middleware.ts` — refreshes Supabase sessions, protects `/dashboard`/`/edit`/`/settings`, rewrites subdomain requests (`naam.jouwzorgsite.nl` → `/site/naam`)

### Supabase Client Usage

- **Server components/actions**: `import { createServerClient } from '@/lib/supabase/server'`
- **Client components**: `import { createBrowserClient } from '@/lib/supabase/client'`

### Server Actions (`lib/actions/`)

All mutations use Next.js Server Actions with `'use server'`. Pattern:
1. Call `supabase.auth.getUser()` to verify authentication
2. Perform operation
3. Call `revalidatePath()` for cache invalidation
4. Return `{ error: string }` on failure or `{ data: ... }` on success

### Template System

Entry point: `SiteRenderer` (`components/templates/index.tsx`) routes to `TemplateRenderer` for all modern templates, or falls back to legacy components (`TemplateWarm`, `TemplateModern`) for old template IDs.

#### Template IDs

Main templates (rendered by `TemplateRenderer`): `editorial`, `proactief`, `portfolio`, `mindoor`, `serene`

Legacy IDs that map to main templates: `classic` → `editorial`, `bold` → `proactief`, `minimal` → `editorial`, `magazine` → `portfolio`, `cards` → `proactief`

Legacy standalone: `warm` (TemplateWarm), `modern` (TemplateModern)

Note: `constants/index.ts` exports a separate `TEMPLATES` array with only `warm`, `modern`, `editorial` — used in the wizard UI. The `TemplateId` type there is narrower than the full set of supported IDs.

#### Section Resolution

`TemplateRenderer` resolves which sections to render in this priority:
1. `generated_content.sections` (AI-generated, highest priority)
2. `siteTheme.sections` from DB
3. `TEMPLATE_SECTIONS[templateStyle]` (static defaults per template)
4. `TEMPLATE_SECTIONS.editorial` (ultimate fallback)

`header` is always rendered first (before `<main>`), `footer` always last (after `<main>`). All other sections render in array order inside `<main>`.

#### SectionConfig

```typescript
interface SectionConfig {
  type: SectionType;    // which section component
  style?: string;       // visual variant (usually template name, e.g. 'editorial', 'proactief-2')
  visible?: boolean;    // for AI toggling
  variant?: number;     // numeric sub-variant (used by WerkwijzeSection: 1|2|3)
}
```

Section types: `header`, `hero`, `stats`, `diensten`, `over`, `credentials`, `werkervaring`, `voorwie`, `quote`, `werkwijze`, `testimonials`, `faq`, `cta`, `contact`, `footer`

#### Style Variants

Each main template has base + numbered variants per section (e.g. `editorial`, `editorial-2`, `editorial-3`). Werkervaring uses `-1`/`-2`/`-3` numbering. Quote has its own styles: `banner`, `minimal`, `dark`, `serene`.

If a section has no explicit `style`, it falls back to the template name (for main templates) or `'editorial'`.

#### Theme, Palette, and Fonts

`components/templates/themes/index.ts` defines three layers:

**ThemeConfig** — structural: fonts, spacing, radius, shadows, `isDark`, `headerStyle`, `cardStyle`, `buttonStyle`. One per template family.

**PaletteColors** — visual: `primary`, `primaryHover`, `primaryLight`, `primaryDark`, `accent`, `accentLight`, `bg`, `bgAlt`, `text`, `textMuted`, `border`. 20 named palettes organized in families of 4 per template:
- Editorial: `editorial` (sage), `burgundy`, `navy`, `caramel`
- ProActief: `proactief` (cyan), `electric`, `sunset`, `emerald`
- Portfolio: `portfolio` (forest), `charcoal`, `midnight`, `espresso`
- Mindoor: `mindoor` (sage), `dustyrose`, `olive`, `amber`
- Serene: `serene` (sage), `stone`, `dusk`, `moss`
- Plus 10 legacy aliases (`sage`, `lavender`, `slate`, etc.)

Palette overrides theme background/text colors — each palette creates a fully distinct page look.

**Font pairings** (12 total): `editorial` (Newsreader/Open Sans), `proactief` (Poppins/Poppins), `portfolio` (Playfair Display/Inter), `mindoor` (Playfair Display/DM Sans), `serene` (Cormorant Garamond/Nunito Sans), plus `classic`, `modern`, `elegant`, `friendly`, `professional`, `soft`, `clean`. Override via `siteTheme.fontPairing`.

Lookup: `getTheme(id)`, `getPalette(id)`, `getFontPairing(id)` — all fall back to editorial defaults.

#### BaseSectionProps

All section components extend this:
```typescript
interface BaseSectionProps {
  theme: ThemeConfig;
  palette: PaletteColors;
  content: SiteContent;
  generated?: GeneratedContent;
  beroepLabel: string;
  className?: string;
}
```
Each adds its own `style` prop (e.g. `HeroSectionProps extends BaseSectionProps { style?: HeroStyle }`).

#### Visual Behaviors

- Scroll reveal: elements with class `reveal` + `reveal-up`/`reveal-left`/`reveal-right` animate on intersection (IntersectionObserver in TemplateRenderer `useEffect`)
- Root class: `<div className="min-h-screen theme-{templateStyle}">` scopes template-specific CSS
- WhatsApp button: sticky bottom-right, rendered when `content.telefoon` is present
- Trust widget (`TrustWidget`): sticky bottom-left, fetches compliance data from `/api/widget/[subdomain]`

### Wizard Flow

The 11-step site creation wizard lives at `app/wizard/page.tsx` (client component). All state is local `useState` — no external state manager. Steps are in `components/wizard/steps/`.

#### Steps in Order

| # | Label | Component | Data Collected |
|---|-------|-----------|----------------|
| 1 | Introductie | StepBeroep | `beroep` (profession ID), `customBeroep` if 'anders' |
| 2 | Over jou | StepGegevens | `content.naam`, `content.foto`, `content.tagline` |
| 3 | Contact gegevens | StepContact | `content.contact.{email, telefoon, werkgebied[]}` |
| 4 | Diensten | StepDiensten | `content.diensten[]` — preset list per beroep + custom |
| 5 | Certificaten | StepCertificaten | `content.certificaten[]` — type-dependent fields |
| 6 | Over mij tekst | StepOverMij | `content.over_mij` (max 1000 chars) |
| 7 | Professioneel | StepProfessional | `content.beschikbaar`, `content.start_carriere`, `content.expertises[]` |
| 8 | Werkervaring | StepWerkervaring | `content.werkervaring[]` (optional step) |
| 9 | Reviews | StepTestimonials | `content.testimonials[]` (optional, max 3) |
| 10 | Template kiezen | StepTemplate | `templateId` |
| 11 | Eigen domein | StepDomain | `wantsCustomDomain`, `customDomain` |

`StepSubdomain` exists but is unused in the current flow — subdomain is auto-derived from `content.naam` at submit time.

#### State Pattern

```typescript
const [content, setContent] = useState<Partial<SiteContent>>(initialContent);
const updateContent = (updates: Partial<SiteContent>) => {
  setContent(prev => ({ ...prev, ...updates }));
};
```

Steps receive `content` + `updateContent` (or specific callbacks like `addWerkervaring`, `removeTestimonial`) as props.

#### Navigation & Validation

`goNext()` advances step (or calls `handleSubmit()` on step 11). `goPrevious()` goes back. No per-step validation gates navigation — the Next button is always enabled. Individual steps have local UX validation only (e.g. disabled "Toevoegen" buttons).

#### Submission (handleSubmit)

Calls `createSite` server action with:
- `subdomain`: derived from `content.naam` (lowercased, spaces removed)
- `template_id`, `beroep`, `content`, `custom_domain`
- Site starts as `published: false`

If `customDomain` was selected, a fire-and-forget `POST /api/domains/register` follows. On success: `router.push('/dashboard')`.

### Site Editor (`/edit/[siteId]`)

Split-panel interface:
- Left: `EditorPanel` (form-based editing, 380px)
- Right: `EditablePreview` (live template preview with click-to-edit)
- Customizations stored in `generated_content.customImages`, `customTexts`, `customButtons`, `customStyles`

### Database

All tables use RLS. Schema in `database/schema.sql` (partially incomplete — see notes).

#### Tables

**`profiles`** — auto-created via trigger on `auth.users` insert. Columns: `id` (UUID, PK, FK → auth.users), `email`, `full_name`, `avatar_url`, `created_at`, `updated_at`. Users can only view/update own profile.

**`sites`** — core table. Key columns:
- `id` UUID PK, `user_id` FK → profiles, `subdomain` UNIQUE NOT NULL, `custom_domain` UNIQUE nullable
- `template_id` TEXT NOT NULL DEFAULT `'warm'`
- `beroep` TEXT NOT NULL
- `content` JSONB NOT NULL (see structure below)
- `published` BOOLEAN DEFAULT false
- RLS: owners full CRUD + anyone can SELECT published sites
- Indexes on `subdomain`, `custom_domain`, `user_id`, `published`, `template_id`

**`subscriptions`** — Mollie billing. Columns: `user_id`, `site_id`, `mollie_customer_id`, `mollie_subscription_id`, `plan` (starter/professional/expert), `status` (pending/active/cancelled/past_due). Read-only for users (writes via service role).

**`custom_domains`** — TransIP domain tracking. Status flow: `pending` → `registering` → `dns_configuring` → `vercel_adding` → `active`. Tracks `dns_configured`, `ssl_active`, `vercel_verified`, pricing, and expiry.

**`professional_declarations`** — compliance records (not in schema.sql, exists in production). Keyed by `(site_id, user_id)`. Stores BIG/KvK verification results and 9 boolean `verklaring_*` fields (lrza, wtza, wkkgz, dossiervoering, avg, richtlijnen, incidenten, scholing, afspraken). Controls the trust widget via `widget_enabled`.

#### RPC Functions

- `is_subdomain_available(check_subdomain)` — checks reserved list + existing rows
- `get_published_site(site_subdomain)` — returns published site by subdomain (SECURITY DEFINER)
- `get_site_by_subdomain(site_subdomain)` — returns any site by subdomain (for previews)
- `get_widget_data(site_subdomain)` — returns trust widget data (not in schema.sql, called via service role)

#### Triggers

- `on_auth_user_created` → `handle_new_user()`: auto-creates profile row
- `sites_updated_at` / `custom_domains_updated_at` → `update_updated_at()`: auto-sets `updated_at`

#### `content` JSONB Structure (SiteContent)

```
{
  naam, foto, tagline, over_mij,
  contact: { email, telefoon, werkgebied[] },
  diensten: [{ naam, beschrijving?, icon? }],
  certificaten: [{ type, label, value?, sublabel?, image_url?, expires_at? }],
  zakelijk: { kvk, btw?, handelsnaam? },
  kleuren: { primary?, secondary? },
  socials: { linkedin?, instagram?, facebook? },
  beschikbaar?, start_carriere?, expertises[],
  werkervaring: [{ functie, werkgever, start_jaar?, eind_jaar?, beschrijving? }],
  testimonials: [{ tekst, naam, relatie?, functie? }],
  telefoon?,
  generated?: { ...GeneratedContent }
}
```

#### `generated_content` / `content.generated` (GeneratedContent)

AI-generated text and section config:
```
{
  hero: { titel, subtitel },
  overMij: { titel?, intro, body, persoonlijk? },
  diensten: { titel, intro?, items[] },
  voorWie: { titel, intro, doelgroepen: [{ type, titel, tekst, tags?, highlight? }] },
  werkwijze: { titel, intro?, stappen: [{ nummer?, titel, beschrijving, icon? }], footer? },
  credentials: { titel, intro? },
  testimonials: { titel, intro?, items[] },
  faq: { titel, intro?, items: [{ vraag, antwoord }] },
  cta: { titel, tekst, button },
  contact: { titel, intro, cta? },
  stats: [{ value, label }],
  seo: { metaTitle, metaDescription },
  sections: SectionConfig[],
  quote?
}
```

#### Theme Structure (stored in site)

```
{
  palette, fonts/fontPairing, variant, template,
  borderRadius, spacing, cardStyle, imageTreatment, animation,
  sections: Record<string, string | null>
}
```

#### Schema Gaps

- `professional_declarations` table and `get_widget_data` RPC are **not in `schema.sql`** — must be created separately
- `generated_content` and `theme` may be separate columns added via migration (not in schema.sql) or stored within `content`

### Supabase Edge Function: `generate-site`

**File:** `supabase/functions/generate-site/index.ts` (Deno runtime, deployed to Supabase)

AI-powered content generation that runs when a site is created. Uses Anthropic API (Claude) in a 4-step pipeline:

#### Pipeline

1. **Analyse** (Haiku `claude-3-5-haiku-20241022`) — Classifies the professional's personality (`warm`/`zakelijk`/`rustig`/`energiek`/`vriendelijk`) and work domain. Result can be cached via `cachedAnalyse` input to skip on regeneration.

2. **Template selection** — Maps `stijlKeuze` from wizard to template ID:
   - `warm` → `editorial`, `calm` → `serene`, `modern` → `proactief`, `zakelijk` → `portfolio`, `energiek` → `mindoor`
   - Falls back to analyse personality if no `stijlKeuze`, then to `editorial`

3. **Content generation** (Sonnet `claude-sonnet-4-20250514`) — Generates all section text (hero, overMij, diensten, voorWie, werkwijze, credentials, testimonials, faq, cta, contact, stats). Fixed counts: 4 diensten, 3 testimonials, 5 FAQ, 4 werkwijze stappen, 4 doelgroepen, 4 stats.

4. **Section style randomization** — Generates `SectionConfig[]` with randomized style variants per section using crypto-random. Three naming patterns:
   - `first-plain`: variant 1 = template name, 2/3 get suffix (e.g. `editorial`, `editorial-2`, `editorial-3`) — used by hero, diensten, over, faq, testimonials, voorwie, contact
   - `numbered`: all variants get suffix (e.g. `editorial-1`, `editorial-2`) — used by werkervaring
   - `plain-only`: always template name, no variants — used by header, stats, cta, werkwijze, credentials, footer
   - `quote`: own style names per template with weighted random (`minimal`/`banner`/`dark`/`serene`)
   - `werkwijze`: uses `variant: 1|2|3` prop instead of style suffix

#### Input (`WizardInput`)

Accepts: `naam`, `beroep` (required), plus optional: `email`, `telefoon`, `werkgebied[]`, `omschrijving`, `stijlKeuze`, `specialisaties[]`, `expertises[]`, `jarenErvaring`, `startJaarZZP`, `werkervaring[]`, `certificaten[]`, `diensten[]`, `beschikbaarheid`, `persoonlijkeNoot`, `tagline`, `cachedAnalyse`, `regeneration`, `regenerationCount`

Adds default werkervaring (3 items) and certificaten (5 items) if not provided.

#### Output

```
{
  template_id,
  theme: { palette, fontPairing, template },
  generated_content: { ...AI text sections..., sections: SectionConfig[] },
  input_data: { werkervaring, certificaten, specialisaties, expertises, ... },
  _meta: { requestId, analyse, templateConfig, generatedAt, totalTimeMs, version }
}
```

Palette is randomly selected from the template's family of 4 (e.g. editorial → one of `editorial`/`burgundy`/`navy`/`caramel`).

#### Environment

Requires `ANTHROPIC_API_KEY` in Supabase Edge Function secrets.

### External Integrations

- **Anthropic Claude API**: AI content generation via Supabase Edge Function (Haiku for analysis, Sonnet for content)
- **TransIP API v6**: domain checks/registration/DNS (RSA-SHA512 signed JWT in `lib/transip.ts`)
- **BIG Register**: Dutch healthcare registry SOAP API for BIG number verification
- **Meta/Facebook Pixel**: conversion tracking
- **Mollie**: payment processing (partially implemented)

## Key Conventions

- Use `cn()` from `lib/utils.ts` for conditional Tailwind class names (`clsx` + `tailwind-merge`)
- Primary color: `#137fec`; dark mode uses Tailwind `class` strategy
- No external state management — server components query Supabase directly; client components use `useState`/`useCallback`
- Constants for healthcare professions (`constants/beroepen.ts`), services (`diensten.ts`), certificates (`certificaten.ts`)

## Dutch Domain Terms

- **Beroep**: profession (e.g., verpleegkundige, fysiotherapeut)
- **BIG-register**: mandatory Dutch healthcare professional registry
- **KvK**: Chamber of Commerce number
- **Kwaliteitskeurmerk**: quality/trust badge widget shown on published sites
- **Verklaringen**: self-declared compliance statements (Wtza, Wkkgz, AVG, etc.)
