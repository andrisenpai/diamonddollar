import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE!

export const useSupabase = () => {
  return createClient(supabaseUrl, supabaseServiceRole)
}
