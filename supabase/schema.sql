-- Create leaderboard table for storing player scores
-- Run this SQL in Supabase SQL Editor to set up the table

CREATE TABLE public.leaderboard (
  id bigserial PRIMARY KEY,
  name text NOT NULL,
  score integer NOT NULL,
  played_at timestamptz DEFAULT now()
);

-- Create index for fast TOP N queries
CREATE INDEX idx_leaderboard_score ON public.leaderboard (score DESC);

-- Enable Realtime on the table so clients can subscribe to changes
ALTER TABLE public.leaderboard REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.leaderboard;

-- (Optional) RLS Policy - Allow anonymous reads, restrict writes via API only
ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read access to all" ON public.leaderboard
  FOR SELECT USING (true);

CREATE POLICY "Allow insert for leaderboard submissions" ON public.leaderboard
  FOR INSERT WITH CHECK (true);

-- The app now writes directly with the anon key, so insert access must be allowed.
