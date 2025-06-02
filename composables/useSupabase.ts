// composables/useSupabase.ts
import { createClient } from '@supabase/supabase-js'

export const useSupabase = () => {
  const config = useRuntimeConfig()
  const supabase = createClient(config.public.SUPABASE_URL, config.public.SUPABASE_ANON_KEY)
  return { supabase }
}
