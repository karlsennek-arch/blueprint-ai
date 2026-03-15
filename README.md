# Ventrix AI — Project Files

## File Structure
```
app/
  page.js                  — Main landing page + quiz + report + chat
  globals.css              — Global styles
  success/page.js          — Success page after Stripe payment
  lib/supabase.js          — Supabase client helpers
  api/
    checkout/route.js      — Stripe checkout session creator
    chat/route.js          — AI chat API route (proxies to Anthropic)
    webhook/route.js       — Stripe webhook (marks user as paid)
    auth/route.js          — Auth check (returns user + paid status)
    blueprint/route.js     — Save/load blueprints to Supabase
supabase/
  migration.sql            — Database schema (run in Supabase SQL Editor)
```

## Setup Guide

### 1. Supabase Setup
1. Create project at supabase.com (EU West region)
2. Go to SQL Editor → paste and run `supabase/migration.sql`
3. Go to Authentication → Providers:
   - Enable **Email** (magic link, no password)
   - Enable **Google** OAuth (optional, needs Google Cloud credentials)
4. Go to Authentication → URL Configuration:
   - Site URL: `https://ventrixai.com`
   - Redirect URLs: `https://ventrixai.com/**`
5. Copy your keys from Project Settings → API:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

### 2. Stripe Webhook Setup
1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://ventrixai.com/api/webhook`
3. Select event: `checkout.session.completed`
4. Copy the webhook signing secret → `STRIPE_WEBHOOK_SECRET`

### 3. Environment Variables (Vercel)
```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_URL=https://ventrixai.com
ANTHROPIC_API_KEY=sk-ant-...
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

### 4. Install Dependencies
```bash
npm install @supabase/supabase-js stripe
```

## How Payment Verification Works
1. User clicks "Unlock $19" → Stripe Checkout opens
2. User pays → Stripe fires `checkout.session.completed` webhook
3. Webhook route (`/api/webhook`) receives event, matches email, sets `paid=true` in Supabase
4. User redirects to `/success?session_id=xxx`
5. Frontend checks auth status via `/api/auth` → sees `paid: true`
6. Cookie is set as immediate fallback, but DB is source of truth

## How Auth Works
- Quiz is open to everyone (no login)
- After quiz, user enters email to see results
- Supabase creates account + sends magic link (or Google OAuth)
- Profile auto-created via DB trigger
- Blueprint saved to `blueprints` table
- User can log back in anytime to see their blueprints

## Domain
ventrixai.com (via Vercel)

## GitHub
github.com/karlsennek-arch/blueprint-ai
