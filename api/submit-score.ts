/**
 * Vercel Serverless Function: Submit a player's score to Supabase leaderboard
 * POST /api/submit-score
 * 
 * Body: { name: string, score: number }
 * Returns: { success: boolean, data?: LeaderboardEntry, error?: string }
 */

import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface ScorePayload {
    name?: string;
    score?: number;
}

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name, score } = req.body as ScorePayload;

        // Validate input
        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            return res.status(400).json({ error: 'Invalid name' });
        }

        if (typeof score !== 'number' || score < 0 || score > 100000) {
            return res.status(400).json({ error: 'Invalid score (0-100000)' });
        }

        // Insert into leaderboard (using service role for full write access)
        const { data, error } = await supabase
            .from('leaderboard')
            .insert([
                {
                    name: name.trim(),
                    score: Math.floor(score),
                    played_at: new Date().toISOString(),
                },
            ])
            .select();

        if (error) {
            console.error('Supabase error:', error);
            return res.status(500).json({ error: 'Failed to submit score' });
        }

        return res.status(200).json({ success: true, data });
    } catch (err) {
        console.error('API error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
