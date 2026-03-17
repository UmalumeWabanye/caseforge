"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "../../lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  async function sendMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setMessage("Sending magic link…");
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) setMessage(error.message);
    else setMessage("Magic link sent — check your email.");
  }

  async function signInWithPassword(e: React.FormEvent) {
    e.preventDefault();
    setMessage("Signing in…");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMessage(error.message);
    else {
      setMessage("Signed in");
      router.push("/dashboard");
    }
  }

  return (
    <main className="flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md">
        <div className="card">
          <h1 className="text-2xl font-semibold mb-2">Welcome back</h1>
          <p className="text-sm text-muted mb-6">Sign in to continue to Caseforge</p>

          <form onSubmit={sendMagicLink} className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              className="w-full p-2 rounded-md border border-slate-200 mb-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@example.com"
            />
            <button className="btn w-full" type="submit">Send magic link</button>
          </form>

          <div className="my-4 text-center text-sm text-muted">or</div>

          <form onSubmit={signInWithPassword}>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              className="w-full p-2 rounded-md border border-slate-200 mb-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@example.com"
            />
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              className="w-full p-2 rounded-md border border-slate-200 mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
            />
            <button className="btn w-full" type="submit">Sign in</button>
          </form>

          {message && <p className="mt-4 text-sm text-muted">{message}</p>}

          <p className="mt-4 text-sm text-center">
            Don’t have an account? <a className="text-primary font-medium" href="/signup">Sign up</a>
          </p>
        </div>
      </div>
    </main>
  );
}
