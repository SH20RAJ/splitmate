import { createClient } from './index';

// Helper function to get Supabase client
export function getSupabaseClient() {
  return createClient();
}