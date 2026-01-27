# JouwZorgSite

Professionele website builder voor ZZP zorgprofessionals in Nederland.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables
cp .env.local.example .env.local

# 3. Edit .env.local with your Supabase credentials
# NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# 4. Setup Supabase database
# Go to Supabase SQL Editor and run: database/schema.sql

# 5. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in je browser.

## 📁 Project Structuur

```
jouwzorgsite/
├── app/
│   ├── (auth)/                 # Login & Register pages
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── layout.tsx
│   │
│   ├── (dashboard)/            # Protected dashboard
│   │   ├── dashboard/page.tsx
│   │   └── layout.tsx
│   │
│   ├── site/
│   │   └── [subdomain]/        # Dynamic site rendering
│   │       └── page.tsx
│   │
│   ├── api/auth/               # Auth API routes
│   │
│   ├── wizard/page.tsx         # 8-step wizard
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home (redirects)
│   └── globals.css
│
├── components/
│   ├── ui/                     # Reusable UI (8 components)
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Textarea.tsx
│   │   ├── Card.tsx
│   │   ├── Checkbox.tsx
│   │   ├── Badge.tsx
│   │   └── ImageUpload.tsx
│   │
│   ├── wizard/                 # Wizard components
│   │   ├── WizardProgress.tsx
│   │   └── steps/              # 8 wizard steps
│   │
│   ├── site/                   # Site sections
│   │   ├── SiteHeader.tsx
│   │   ├── SiteHero.tsx
│   │   ├── SiteAbout.tsx
│   │   ├── SiteServices.tsx
│   │   ├── SiteCertificates.tsx
│   │   ├── SiteContact.tsx
│   │   └── SiteFooter.tsx
│   │
│   └── templates/              # Site templates
│       ├── TemplateWarm.tsx
│       ├── TemplateModern.tsx
│       ├── TemplateEditorial.tsx
│       └── index.ts (SiteRenderer)
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # Browser client
│   │   └── server.ts           # Server client
│   │
│   ├── actions/                # Server Actions
│   │   ├── auth.ts
│   │   ├── sites.ts
│   │   └── upload.ts
│   │
│   └── utils.ts
│
├── database/
│   └── schema.sql              # Complete Supabase schema
│
├── constants/                  # Hardcoded options
│   ├── beroepen.ts
│   ├── diensten.ts
│   └── certificaten.ts
│
├── types/
│   └── site.ts                 # TypeScript interfaces
│
└── middleware.ts               # Auth & subdomain routing
```

## 🗄️ Database Setup

1. Create a new Supabase project at https://supabase.com
2. Go to **SQL Editor**
3. Copy and paste the contents of `database/schema.sql`
4. Click **Run**

### Storage Setup
1. Go to **Storage** in Supabase
2. Create a new bucket named `site-assets`
3. Make it **public**

## 🎨 Features

### ✅ Implemented
- [x] Complete 8-step wizard
- [x] User authentication (login/register)
- [x] Dashboard with site overview
- [x] 3 template designs (Warm, Modern, Editorial)
- [x] Dynamic site rendering at /site/[subdomain]
- [x] Certificate display with proof upload
- [x] Contact section with WhatsApp integration
- [x] Server Actions for database operations
- [x] Protected routes with middleware
- [x] Responsive design

### 🚧 TODO
- [ ] Image upload to Supabase Storage
- [ ] Edit site page
- [ ] Publish/unpublish toggle
- [ ] Mollie payment integration
- [ ] Custom domain support
- [ ] Email verification

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 14 | App Router, Server Components |
| Tailwind CSS | Styling |
| Supabase | Database, Auth, Storage |
| TypeScript | Type safety |

## 📋 Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_MAIN_DOMAIN=jouwzorgsite.nl
```

## 🎯 User Flow

```
1. Register → Wizard → Create Site (unpublished)
2. Dashboard → View/Edit Sites
3. Publish → Site live at subdomain.jouwzorgsite.nl
4. (Later) Pay → Custom domain
```

## 📦 Deployment

Deploy to Vercel:

```bash
vercel
```

Set environment variables in Vercel dashboard.

## 📄 License

MIT
