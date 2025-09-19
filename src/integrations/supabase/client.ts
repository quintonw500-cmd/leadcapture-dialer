import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Provide fallback values to prevent immediate crashes during setup
const defaultUrl = supabaseUrl || 'https://placeholder.supabase.co';
const defaultKey = supabaseAnonKey || 'placeholder-anon-key';

// Create client with fallback values - will need proper values for actual functionality
export const supabase = createClient(defaultUrl, defaultKey);

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey && 
    supabaseUrl !== 'https://placeholder.supabase.co' && 
    supabaseAnonKey !== 'placeholder-anon-key');
};