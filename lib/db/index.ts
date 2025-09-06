import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Create a Supabase client
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  
  return createSupabaseClient(supabaseUrl, supabaseAnonKey);
}

// Create connection for Drizzle (only if DATABASE_URL is available)
let dbInstance: ReturnType<typeof drizzle> | null = null;

try {
  if (process.env.DATABASE_URL) {
    // Disable prefetch as it interferes with "Transaction" mode
    const client = postgres(process.env.DATABASE_URL, { prepare: false });
    
    // Create drizzle instance
    dbInstance = drizzle(client, { schema });
  }
} catch (error) {
  console.warn('Failed to initialize Drizzle ORM:', error);
}

export const db = dbInstance;

// Export schema for type inference
export * from './schema';