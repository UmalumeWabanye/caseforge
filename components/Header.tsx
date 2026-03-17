"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import supabase from '../lib/supabase'

export default function Header() {
  const [email, setEmail] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    let mounted = true

    async function init() {
      try {
        const { data } = await supabase.auth.getUser()
        if (!mounted) return
        setEmail(data?.user?.email ?? null)
      } catch (e) {
        console.warn('Header: failed to read user', e)
      }
    }

    init()

    const { data: sub } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user?.email) setEmail(session.user.email)
      else setEmail(null)
    })

    return () => {
      mounted = false
      sub?.subscription?.unsubscribe()
    }
  }, [])

  async function signOut() {
    try {
      await supabase.auth.signOut()
    } catch (e) {
      console.warn('client signOut failed', e)
    }

    try {
      // clear server-side cookies
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch (e) {
      console.warn('server logout failed', e)
    }

    setEmail(null)
    router.push('/')
  }

  function initialsFromEmail(email?: string | null) {
    if (!email) return 'U'
    const name = email.split('@')[0]
    const parts = name.split(/\.|_|-|\s+/).filter(Boolean)
    if (parts.length === 0) return email.slice(0, 1).toUpperCase()
    if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase()
    return (parts[0].slice(0, 1) + parts[1].slice(0, 1)).toUpperCase()
  }
  // Gravatar/avatar lookup removed — show initials until OAuth/upload avatar is implemented.

  // If on the landing page, show a simple product nav (no avatar/email)
  if (pathname === "/") {
    return (
      <div className="max-w-6xl mx-auto p-4 relative">
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold">Caseforge</div>

          <div className="flex items-center gap-4">
            <nav className="hidden sm:flex items-center space-x-4 text-sm">
              <a href="#features" className="text-slate-700 hover:underline">Features</a>
              <a href="#use-cases" className="text-slate-700 hover:underline">Use cases</a>
              <Link href="/auth/login" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 text-sm">Log in</Link>
            </nav>

            <button
              className="sm:hidden p-2 rounded-md focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((s) => !s)}
            >
              {mobileOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="sm:hidden mt-3 bg-white border rounded-md shadow py-3">
            <div className="flex flex-col px-4 space-y-2">
              <a href="#features" onClick={() => setMobileOpen(false)} className="py-2 text-slate-700">Features</a>
              <a href="#use-cases" onClick={() => setMobileOpen(false)} className="py-2 text-slate-700">Use cases</a>
              <Link href="/auth/login" onClick={() => setMobileOpen(false)} className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-md">Log in</Link>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
      <Link href="/" className="text-lg font-semibold">Caseforge</Link>

      <div className="flex items-center space-x-4">
        {email ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-sm font-medium">
                {initialsFromEmail(email)}
              </div>
              <span className="text-sm text-muted">{email}</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="text-sm hover:underline">Log in</Link>
            <Link href="/auth/signup" className="text-sm hover:underline">Sign up</Link>
          </div>
        )}
      </div>
    </div>
  )
}
