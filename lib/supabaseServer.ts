import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Server-side client. Prefers SUPABASE_SERVICE_ROLE_KEY but will fall back to anon key if missing.
export const supabaseServer = createClient(supabaseUrl, serviceRoleKey)

export default supabaseServer
