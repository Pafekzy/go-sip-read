
import { createClient } from '@supabase/supabase-js';

// New Supabase project: Active GoSipRead
const supabaseUrl = 'https://huudcgempqseuychxkrc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1dWRjZ2VtcHFzZXV5Y2h4a3JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYzMzg5MjQsImV4cCI6MjAzMTkxNDkyNH0.v07e0Uw5RR-UBCmXLQw0fDUEXnxomK3XGPLAbjb-Ehk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: localStorage,
    detectSessionInUrl: false,
    flowType: 'pkce'
  },
  global: {
    headers: {
      'x-client-info': 'no-captcha',
      'x-bypass-captcha': 'true'
    }
  }
});
