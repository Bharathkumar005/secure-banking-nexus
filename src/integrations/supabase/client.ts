
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://bufbcfzwcklicopbfisb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1ZmJjZnp3Y2tsaWNvcGJmaXNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5OTM0ODYsImV4cCI6MjA1NDU2OTQ4Nn0.04wRPFh7955b68cyaokblP0F-PCyO3tMHe_0qotyh9g";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});
