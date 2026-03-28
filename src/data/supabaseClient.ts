import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if variables are present and not placeholders
const isConfigured = supabaseUrl && 
                   supabaseUrl !== '' && 
                   supabaseUrl !== 'YOUR_SUPABASE_URL' &&
                   supabaseAnonKey &&
                   supabaseAnonKey !== '';

export const supabase = isConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null as any;
