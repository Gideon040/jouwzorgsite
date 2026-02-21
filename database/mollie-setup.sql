-- =============================================
-- MOLLIE PAYMENT INTEGRATION - Extra RLS policies
-- Voer dit uit in Supabase SQL Editor
-- =============================================

-- Subscriptions: users moeten INSERT + UPDATE kunnen voor checkout flow
CREATE POLICY "Users can insert own subscriptions"
  ON public.subscriptions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own subscriptions"
  ON public.subscriptions FOR UPDATE
  USING (auth.uid() = user_id);
