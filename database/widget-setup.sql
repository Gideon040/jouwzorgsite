-- ============================================
-- PROFESSIONAL DECLARATIONS TABLE
-- Run this in Supabase SQL Editor
-- ============================================

CREATE TABLE IF NOT EXISTS professional_declarations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Geverifieerde gegevens
  big_nummer TEXT,
  big_beroep TEXT,
  big_specialismen TEXT[] DEFAULT '{}',
  big_verified BOOLEAN DEFAULT false,
  big_verified_at TIMESTAMPTZ,
  big_geldig BOOLEAN DEFAULT false,

  kvk_nummer TEXT,
  kvk_handelsnaam TEXT,
  kvk_verified BOOLEAN DEFAULT false,
  kvk_verified_at TIMESTAMPTZ,

  website_actief BOOLEAN DEFAULT false,

  -- Zelfverklaarde items
  verklaring_lrza BOOLEAN DEFAULT false,
  verklaring_wtza BOOLEAN DEFAULT false,
  verklaring_wkkgz BOOLEAN DEFAULT false,
  verklaring_dossiervoering BOOLEAN DEFAULT false,
  verklaring_avg BOOLEAN DEFAULT false,
  verklaring_richtlijnen BOOLEAN DEFAULT false,
  verklaring_incidenten BOOLEAN DEFAULT false,
  verklaring_scholing BOOLEAN DEFAULT false,
  verklaring_afspraken BOOLEAN DEFAULT false,

  extra_verklaringen JSONB DEFAULT '[]',

  -- Widget config
  widget_enabled BOOLEAN DEFAULT false,
  widget_style TEXT DEFAULT 'default',

  -- Meta
  declaration_accepted_at TIMESTAMPTZ,
  declaration_ip TEXT,
  last_reverified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),

  UNIQUE(site_id, user_id)
);

-- RLS
ALTER TABLE professional_declarations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own declarations"
  ON professional_declarations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own declarations"
  ON professional_declarations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own declarations"
  ON professional_declarations FOR UPDATE
  USING (auth.uid() = user_id);

-- Updated_at trigger
CREATE TRIGGER declarations_updated_at
  BEFORE UPDATE ON professional_declarations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- GET WIDGET DATA RPC
-- ============================================

CREATE OR REPLACE FUNCTION get_widget_data(site_subdomain TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  site_record RECORD;
  decl_record RECORD;
  result JSONB;
  verified_count INT := 0;
  declared_count INT := 0;
  total_items INT := 12; -- 3 verified + 9 declarations
  compliance_score INT;
BEGIN
  -- Haal site op
  SELECT id, content, beroep, published
  INTO site_record
  FROM sites
  WHERE subdomain = site_subdomain
  LIMIT 1;

  IF NOT FOUND THEN
    RETURN NULL;
  END IF;

  -- Haal declaration op
  SELECT *
  INTO decl_record
  FROM professional_declarations
  WHERE site_id = site_record.id
    AND widget_enabled = true
  LIMIT 1;

  -- Geen declaration? Bouw basis data uit site content
  IF NOT FOUND THEN
    -- Fallback: bouw widget data uit site certificaten
    RETURN jsonb_build_object(
      'naam', site_record.content->>'naam',
      'beroep', site_record.beroep,
      'verified', jsonb_build_object(
        'big', jsonb_build_object(
          'status', EXISTS(
            SELECT 1 FROM jsonb_array_elements(COALESCE(site_record.content->'certificaten', '[]'::jsonb)) c
            WHERE c->>'type' = 'big' AND c->>'value' IS NOT NULL AND c->>'value' != ''
          ),
          'beroep', (
            SELECT c->>'sublabel' FROM jsonb_array_elements(COALESCE(site_record.content->'certificaten', '[]'::jsonb)) c
            WHERE c->>'type' = 'big' LIMIT 1
          ),
          'geldig', true
        ),
        'kvk', jsonb_build_object(
          'status', EXISTS(
            SELECT 1 FROM jsonb_array_elements(COALESCE(site_record.content->'certificaten', '[]'::jsonb)) c
            WHERE c->>'type' = 'kvk' AND c->>'value' IS NOT NULL AND c->>'value' != ''
          ),
          'handelsnaam', site_record.content->'zakelijk'->>'handelsnaam'
        ),
        'website', site_record.published
      ),
      'declarations', jsonb_build_object(
        'lrza', false, 'wtza', false, 'wkkgz', false,
        'dossiervoering', false, 'avg', false, 'richtlijnen', false,
        'incidenten', false, 'scholing', false, 'afspraken', false
      ),
      'declaration_date', NULL,
      'last_reverified', NULL,
      'compliance_score', CASE
        WHEN site_record.published THEN 25
        ELSE 8
      END
    );
  END IF;

  -- Tel verified items
  IF decl_record.big_verified THEN verified_count := verified_count + 1; END IF;
  IF decl_record.kvk_nummer IS NOT NULL AND decl_record.kvk_nummer != '' THEN verified_count := verified_count + 1; END IF;
  IF decl_record.website_actief THEN verified_count := verified_count + 1; END IF;

  -- Tel declarations
  IF decl_record.verklaring_lrza THEN declared_count := declared_count + 1; END IF;
  IF decl_record.verklaring_wtza THEN declared_count := declared_count + 1; END IF;
  IF decl_record.verklaring_wkkgz THEN declared_count := declared_count + 1; END IF;
  IF decl_record.verklaring_dossiervoering THEN declared_count := declared_count + 1; END IF;
  IF decl_record.verklaring_avg THEN declared_count := declared_count + 1; END IF;
  IF decl_record.verklaring_richtlijnen THEN declared_count := declared_count + 1; END IF;
  IF decl_record.verklaring_incidenten THEN declared_count := declared_count + 1; END IF;
  IF decl_record.verklaring_scholing THEN declared_count := declared_count + 1; END IF;
  IF decl_record.verklaring_afspraken THEN declared_count := declared_count + 1; END IF;

  compliance_score := ROUND(((verified_count + declared_count)::NUMERIC / total_items) * 100);

  RETURN jsonb_build_object(
    'naam', site_record.content->>'naam',
    'beroep', site_record.beroep,
    'verified', jsonb_build_object(
      'big', jsonb_build_object(
        'status', decl_record.big_verified,
        'beroep', decl_record.big_beroep,
        'geldig', decl_record.big_geldig
      ),
      'kvk', jsonb_build_object(
        'status', decl_record.kvk_verified,
        'handelsnaam', decl_record.kvk_handelsnaam
      ),
      'website', decl_record.website_actief
    ),
    'declarations', jsonb_build_object(
      'lrza', decl_record.verklaring_lrza,
      'wtza', decl_record.verklaring_wtza,
      'wkkgz', decl_record.verklaring_wkkgz,
      'dossiervoering', decl_record.verklaring_dossiervoering,
      'avg', decl_record.verklaring_avg,
      'richtlijnen', decl_record.verklaring_richtlijnen,
      'incidenten', decl_record.verklaring_incidenten,
      'scholing', decl_record.verklaring_scholing,
      'afspraken', decl_record.verklaring_afspraken
    ),
    'declaration_date', decl_record.declaration_accepted_at,
    'last_reverified', decl_record.last_reverified_at,
    'compliance_score', compliance_score
  );
END;
$$;
