-- =============================================
-- JOUWZORGSITE MVP - COMPLETE DATABASE SCHEMA
-- Voer dit uit in Supabase SQL Editor
-- =============================================

-- =============================================
-- 1. PROFILES TABLE (extends auth.users)
-- =============================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', '')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- =============================================
-- 2. SITES TABLE (core table with JSONB content)
-- =============================================
CREATE TABLE IF NOT EXISTS public.sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  
  -- Identifiers
  subdomain TEXT UNIQUE NOT NULL,
  custom_domain TEXT UNIQUE,
  
  -- Site configuration
  template_id TEXT NOT NULL DEFAULT 'warm',
  beroep TEXT NOT NULL,
  
  -- ALL content stored as JSONB
  -- Structure: { naam, foto, tagline, over_mij, contact, diensten, certificaten, zakelijk, kleuren, socials }
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  
  -- Status
  published BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  new.updated_at = now();
  RETURN new;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS sites_updated_at ON public.sites;

CREATE TRIGGER sites_updated_at
  BEFORE UPDATE ON public.sites
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- =============================================
-- 3. SUBSCRIPTIONS TABLE (Mollie billing)
-- =============================================
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  site_id UUID REFERENCES public.sites(id) ON DELETE CASCADE NOT NULL,
  
  -- Mollie identifiers
  mollie_customer_id TEXT,
  mollie_subscription_id TEXT,
  
  -- Plan details
  plan TEXT NOT NULL DEFAULT 'starter' CHECK (plan IN ('starter', 'professional', 'expert')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'cancelled', 'past_due')),
  
  -- Billing period
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now()
);


-- =============================================
-- 4. CUSTOM DOMAINS TABLE (TransIP registraties)
-- =============================================
CREATE TABLE IF NOT EXISTS public.custom_domains (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID REFERENCES public.sites(id) ON DELETE SET NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  
  -- Domain info
  domain TEXT UNIQUE NOT NULL,
  tld TEXT NOT NULL, -- nl, com, eu, etc.
  
  -- Status tracking
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
    'pending',           -- Wacht op betaling
    'registering',       -- Bezig met registreren bij TransIP
    'dns_configuring',   -- DNS wordt ingesteld
    'vercel_adding',     -- Wordt toegevoegd aan Vercel
    'active',            -- Volledig actief
    'failed',            -- Registratie mislukt
    'cancelled',         -- Opgezegd door klant
    'transferred_out'    -- Verhuisd naar andere provider
  )),
  
  -- DNS status
  dns_configured BOOLEAN DEFAULT false,
  ssl_active BOOLEAN DEFAULT false,
  
  -- Vercel integration
  vercel_domain_id TEXT,
  vercel_verified BOOLEAN DEFAULT false,
  
  -- Pricing (stored at time of purchase)
  price_cents INTEGER NOT NULL DEFAULT 0, -- Wat klant betaalde
  cost_cents INTEGER NOT NULL DEFAULT 0,  -- Wat TransIP kost
  
  -- Transfer info (when customer leaves)
  auth_code TEXT, -- Verhuiscode
  
  -- Dates
  registered_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Auto-update updated_at
DROP TRIGGER IF EXISTS custom_domains_updated_at ON public.custom_domains;
CREATE TRIGGER custom_domains_updated_at
  BEFORE UPDATE ON public.custom_domains
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_domains ENABLE ROW LEVEL SECURITY;

-- Drop existing policies (clean slate)
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own sites" ON public.sites;
DROP POLICY IF EXISTS "Anyone can view published sites" ON public.sites;
DROP POLICY IF EXISTS "Users can insert own sites" ON public.sites;
DROP POLICY IF EXISTS "Users can update own sites" ON public.sites;
DROP POLICY IF EXISTS "Users can delete own sites" ON public.sites;
DROP POLICY IF EXISTS "Users can view own subscriptions" ON public.subscriptions;
DROP POLICY IF EXISTS "Users can view own domains" ON public.custom_domains;
DROP POLICY IF EXISTS "Users can insert own domains" ON public.custom_domains;
DROP POLICY IF EXISTS "Users can update own domains" ON public.custom_domains;

-- PROFILES policies
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- SITES policies
CREATE POLICY "Users can view own sites"
  ON public.sites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view published sites"
  ON public.sites FOR SELECT
  USING (published = true);

CREATE POLICY "Users can insert own sites"
  ON public.sites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sites"
  ON public.sites FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own sites"
  ON public.sites FOR DELETE
  USING (auth.uid() = user_id);

-- SUBSCRIPTIONS policies
CREATE POLICY "Users can view own subscriptions"
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- CUSTOM_DOMAINS policies
CREATE POLICY "Users can view own domains"
  ON public.custom_domains FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own domains"
  ON public.custom_domains FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own domains"
  ON public.custom_domains FOR UPDATE
  USING (auth.uid() = user_id);


-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

CREATE INDEX IF NOT EXISTS idx_sites_subdomain ON public.sites(subdomain);
CREATE INDEX IF NOT EXISTS idx_sites_custom_domain ON public.sites(custom_domain) WHERE custom_domain IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_sites_user_id ON public.sites(user_id);
CREATE INDEX IF NOT EXISTS idx_sites_published ON public.sites(published) WHERE published = true;
CREATE INDEX IF NOT EXISTS idx_sites_template ON public.sites(template_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_site_id ON public.subscriptions(site_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON public.subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_custom_domains_domain ON public.custom_domains(domain);
CREATE INDEX IF NOT EXISTS idx_custom_domains_site_id ON public.custom_domains(site_id);
CREATE INDEX IF NOT EXISTS idx_custom_domains_user_id ON public.custom_domains(user_id);
CREATE INDEX IF NOT EXISTS idx_custom_domains_status ON public.custom_domains(status);


-- =============================================
-- HELPER FUNCTIONS
-- =============================================

-- Check if subdomain is available
CREATE OR REPLACE FUNCTION public.is_subdomain_available(check_subdomain TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  reserved_subdomains TEXT[] := ARRAY[
    'www', 'app', 'api', 'admin', 'dashboard', 'login', 'register',
    'auth', 'mail', 'email', 'help', 'support', 'blog', 'news',
    'static', 'cdn', 'assets', 'images', 'files', 'media', 'test'
  ];
BEGIN
  -- Check if reserved
  IF lower(check_subdomain) = ANY(reserved_subdomains) THEN
    RETURN false;
  END IF;
  
  -- Check if already taken
  RETURN NOT EXISTS (
    SELECT 1 FROM public.sites WHERE subdomain = lower(check_subdomain)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Get published site by subdomain (for public rendering)
CREATE OR REPLACE FUNCTION public.get_published_site(site_subdomain TEXT)
RETURNS public.sites AS $$
  SELECT * FROM public.sites 
  WHERE subdomain = lower(site_subdomain) 
  AND published = true
  LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER;


-- Get site by subdomain (includes unpublished for owner preview)
CREATE OR REPLACE FUNCTION public.get_site_by_subdomain(site_subdomain TEXT)
RETURNS public.sites AS $$
  SELECT * FROM public.sites 
  WHERE subdomain = lower(site_subdomain)
  LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER;


-- =============================================
-- STORAGE BUCKET
-- =============================================
-- Run this separately or in Storage settings:

-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('site-assets', 'site-assets', true)
-- ON CONFLICT (id) DO NOTHING;

-- Storage policies (run after creating bucket):
/*
CREATE POLICY "Anyone can view site assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'site-assets');

CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'site-assets' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Users can update own uploads"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'site-assets' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete own uploads"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'site-assets' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);
*/


-- =============================================
-- SAMPLE DATA (optional, for testing)
-- =============================================

-- Uncomment to insert test data:
/*
INSERT INTO public.sites (user_id, subdomain, template_id, beroep, content, published)
VALUES (
  '00000000-0000-0000-0000-000000000000', -- Replace with actual user_id
  'lisa',
  'warm',
  'verpleegkundige',
  '{
    "naam": "Lisa de Vries",
    "foto": null,
    "tagline": "Persoonlijke thuiszorg met aandacht",
    "over_mij": "Met meer dan 10 jaar ervaring in de thuiszorg help ik cliënten met alle facetten van persoonlijke verzorging en verpleging. Mijn aanpak is warm, professioneel en altijd gericht op uw welzijn.",
    "contact": {
      "email": "lisa@voorbeeld.nl",
      "telefoon": "06-12345678",
      "werkgebied": ["Amsterdam", "Amstelveen", "Diemen"]
    },
    "diensten": [
      {"naam": "Wondverzorging", "beschrijving": "Professionele verzorging van acute en chronische wonden"},
      {"naam": "Medicatiebeheer", "beschrijving": "Toedienen en beheren van medicatie"},
      {"naam": "Persoonlijke verzorging", "beschrijving": "Hulp bij wassen, aankleden en persoonlijke hygiëne"}
    ],
    "certificaten": [
      {"type": "big", "label": "BIG-registratie", "value": "99123456789", "sublabel": "Verpleegkundige"},
      {"type": "vog", "label": "VOG", "value": "Januari 2024"},
      {"type": "diploma", "label": "HBO-V", "value": "2014", "sublabel": "Hogeschool van Amsterdam"}
    ],
    "zakelijk": {
      "kvk": "12345678",
      "btw": "NL001234567B01"
    }
  }'::jsonb,
  true
);
*/
