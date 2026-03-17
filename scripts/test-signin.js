#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

function loadEnvFile(filePath) {
  try {
    const text = fs.readFileSync(filePath, 'utf8')
  const lines = text.split(/\n/).map(l => l.trim()).filter(Boolean)
    const env = {}
    for (const line of lines) {
      if (line.startsWith('#')) continue
      const idx = line.indexOf('=')
      if (idx === -1) continue
      const key = line.slice(0, idx).trim()
      const val = line.slice(idx + 1).trim()
      env[key] = val.replace(/(^\"|\"$)/g, '')
    }
    return env
  } catch (e) {
    return {}
  }
}

async function main() {
  const args = process.argv.slice(2)
  if (args.length < 2) {
    console.error('Usage: node scripts/test-signin.js <email> <password>')
    process.exit(2)
  }
  const [email, password] = args

  const repoRoot = path.resolve(__dirname, '..')
  const envPath = path.join(repoRoot, '.env.local')
  const env = loadEnvFile(envPath)

  const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const SUPABASE_ANON = env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!SUPABASE_URL || !SUPABASE_ANON) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Check .env.local or environment variables.')
    process.exit(1)
  }

  console.log('Using SUPABASE_URL=', SUPABASE_URL)

  try {
    const params = new URLSearchParams({ grant_type: 'password', email, password })
    const res = await fetch(`${SUPABASE_URL}/auth/v1/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        apikey: SUPABASE_ANON,
      },
      body: params.toString(),
    })

    const body = await res.text()
    let json
    try { json = JSON.parse(body) } catch (e) { json = { raw: body } }

    console.log('HTTP', res.status)
    console.log(JSON.stringify(json, null, 2))
  } catch (err) {
    console.error('Request failed:', err)
    process.exit(1)
  }
}

main()
