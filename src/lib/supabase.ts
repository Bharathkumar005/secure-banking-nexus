
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rxtlwjxoylkzajvvoyck.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4dGx3anhveWxremFqdnZveWNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0MDA4NzksImV4cCI6MjAyNTk3Njg3OX0.IwMqHK1a6i2mWpWL2XbPaB_0u7MXThNWLY4EbDnhIbk';

if (!supabaseUrl) throw new Error('Missing SUPABASE_URL');
if (!supabaseAnonKey) throw new Error('Missing SUPABASE_ANON_KEY');

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  },
  db: {
    schema: 'public'
  }
});
