# Supabase Realtime Leaderboard Setup Guide

## Overview
This project uses **Supabase Realtime Database** to store player scores and sync leaderboards across all players in real-time. When a player finishes a game, their score is submitted via a serverless API and appears on all connected clients instantly.

## Architecture
1. **Frontend** (Vite/React)
   - Submits score via Vercel serverless API endpoint `/api/submit-score`
   - Subscribes to Supabase realtime `INSERT` events on the `leaderboard` table
   - Automatically fetches and displays top-10 scores

2. **Serverless API** (`api/submit-score.ts` on Vercel)
   - Validates player name and score
   - Uses `SUPABASE_SERVICE_ROLE_KEY` (server-side only) to insert into database
   - Prevents client from directly writing to DB (security via RLS)

3. **Supabase Database** (Postgres)
   - Stores leaderboard data in `public.leaderboard` table
   - Realtime subscriptions enabled for `INSERT` events
   - RLS policies restrict public writes, allows reads

---

## Step 1: Create Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Click **"New Project"**
3. Fill in:
   - **Project Name**: e.g., `philosophy-game`
   - **Database Password**: Create a strong password
   - **Region**: Select closest to your users
4. Click **"Create new project"** and wait ~2 min for setup

---

## Step 2: Create Database Table (Run SQL)

1. Open your Supabase project
2. Go to **SQL Editor** (left sidebar)
3. Copy and paste the entire SQL from `supabase/schema.sql`:
   ```sql
   CREATE TABLE public.leaderboard (
     id bigserial PRIMARY KEY,
     name text NOT NULL,
     score integer NOT NULL,
     played_at timestamptz DEFAULT now()
   );

   CREATE INDEX idx_leaderboard_score ON public.leaderboard (score DESC);

   ALTER TABLE public.leaderboard REPLICA IDENTITY FULL;
   ALTER PUBLICATION supabase_realtime ADD TABLE public.leaderboard;

   ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;

   CREATE POLICY "Allow read access to all" ON public.leaderboard
     FOR SELECT USING (true);
   ```
4. Click **"Run"** button
5. You should see a success message

---

## Step 3: Get Your API Keys

1. Go to **Project Settings** (bottom of left sidebar)
2. Click **"API"**
3. Copy these values:
   - **Project URL** → save as `SUPABASE_URL`
   - **Anon Key** → save as `VITE_SUPABASE_ANON_KEY` (safe for frontend)
   - **Service Role Key** → save as `SUPABASE_SERVICE_ROLE_KEY` (server-only, keep secret!)

---

## Step 4: Local Development Setup

1. Create `.env.local` in project root (copy from `.env.example`):
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

2. Install dependencies:
   ```bash
   npm ci
   ```

3. Run dev server:
   ```bash
   npm run dev
   ```

4. Test:
   - Open app at http://localhost:3000
   - Start a game, finish and submit your score
   - Open another browser tab, refresh the leaderboard — your score should appear!

---

## Step 5: Deploy to Vercel

1. **Commit and push** changes to GitHub:
   ```bash
   git add .
   git commit -m "Add Supabase realtime leaderboard"
   git push
   ```

2. Go to [https://vercel.com](https://vercel.com)
3. Click **"New Project"** → select your GitHub repo
4. In **Environment Variables** section, add:
   - `VITE_SUPABASE_URL` = (your Supabase URL)
   - `VITE_SUPABASE_ANON_KEY` = (your Anon Key)
   - `SUPABASE_URL` = (your Supabase URL, same as above)
   - `SUPABASE_SERVICE_ROLE_KEY` = (your Service Role Key, KEEP SECRET!)

5. Click **"Deploy"**
6. Wait for build to complete
7. Open your Vercel app URL and test with multiple browsers/devices!

---

## Troubleshooting

### Leaderboard not updating?
- Check browser console (F12 → Console tab) for errors
- Verify env vars are set correctly in Vercel Project Settings
- Check Supabase project is active (Project Settings → Status)

### "Failed to submit score" error?
- Verify `SUPABASE_SERVICE_ROLE_KEY` is set in Vercel
- Check API logs in Vercel (Deployments → Function logs)
- Ensure table `leaderboard` exists in Supabase

### Can't see realtime updates?
- Verify Realtime is enabled: go to Supabase → Database → Replications → ensure `supabase_realtime` has `leaderboard` table

### Rows not inserting?
- Check RLS policies in Supabase (Table → leaderboard → RLS policies)
- Service role key should bypass RLS and allow insert

---

## Cost & Limits

**Supabase Free Tier:**
- 500MB database size
- 2 GB bandwidth/month
- Unlimited realtime connections
- Sufficient for small classes/pilot programs

**Scaling tips:**
- Limit leaderboard fetches (only when needed)
- Consider archiving old scores if DB grows large
- Use Supabase's built-in monitoring (Project → Database → Connections)

---

## Next Steps

- Add anti-cheat (server-side score validation, rate limiting per user)
- Add user accounts (Supabase Auth) to prevent duplicate entries
- Archive past leaderboards (add `season` column)
- Add analytics (query top scores, average scores, etc.)
