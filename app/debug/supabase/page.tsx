export default function DebugSupabasePage() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'MISSING'
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const anonPreview = anon ? `${anon.slice(0, 6)}...${anon.slice(-6)}` : 'MISSING'
  const serviceRolePresent = !!process.env.SUPABASE_SERVICE_ROLE_KEY

  return (
    <main className="min-h-screen p-8 bg-slate-50">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-semibold mb-4">Supabase debug</h1>
        <p className="text-sm text-slate-600 mb-6">This page is intended for local/dev debugging — it only shows public/diagnostic values.</p>

        <div className="space-y-3 text-sm">
          <div>
            <div className="font-medium">NEXT_PUBLIC_SUPABASE_URL</div>
            <div className="text-slate-700">{url}</div>
          </div>

          <div>
            <div className="font-medium">NEXT_PUBLIC_SUPABASE_ANON_KEY (masked)</div>
            <div className="text-slate-700">{anonPreview}</div>
          </div>

          <div>
            <div className="font-medium">SUPABASE_SERVICE_ROLE_KEY present (server)</div>
            <div className="text-slate-700">{serviceRolePresent ? 'yes' : 'no'}</div>
          </div>
        </div>

        <div className="mt-6 text-xs text-slate-500">
          Note: anon key is public and safe to include in client code. Do not share the service role key.
        </div>
      </div>
    </main>
  )
}
