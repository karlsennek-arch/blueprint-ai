-- ═══════════════════════════════════════════
-- Ventrix AI — Supabase Migration
-- Run this in Supabase SQL Editor
-- ═══════════════════════════════════════════

-- 1. Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  paid BOOLEAN DEFAULT FALSE,
  stripe_customer_id TEXT,
  stripe_session_id TEXT,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Blueprints table (stores generated blueprints)
CREATE TABLE IF NOT EXISTS public.blueprints (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  answers JSONB NOT NULL,           -- quiz answers
  report JSONB NOT NULL,            -- full generated blueprint
  language TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blueprints ENABLE ROW LEVEL SECURITY;

-- Profiles: users can only read/update their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Blueprints: users can only read/insert their own blueprints
CREATE POLICY "Users can view own blueprints"
  ON public.blueprints FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own blueprints"
  ON public.blueprints FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 4. Auto-create profile on signup (trigger)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if any, then create
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. Service role policy for webhook (Stripe webhook needs to update paid status)
-- This uses the service_role key, which bypasses RLS
-- No extra policy needed — just use supabaseAdmin client in webhook

-- 6. Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_stripe_session ON public.profiles(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_blueprints_user_id ON public.blueprints(user_id);
