
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aacvjcruqevqgfzcffsa.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhY3ZqY3J1cWV2cWdmemNmZnNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2NDE3NjYsImV4cCI6MjA2MTIxNzc2Nn0.1fg9q-hxN_80gM6e54WLdo3gXF7oGfU32IR9XpktH_Q';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: localStorage,
    detectSessionInUrl: false,
    flowType: 'pkce'
  }
});
