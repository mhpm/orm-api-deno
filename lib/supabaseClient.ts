import { createClient } from 'supabase';

const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseKey = Deno.env.get('SUPABASE_KEY') || '';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase URL or Key in environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
