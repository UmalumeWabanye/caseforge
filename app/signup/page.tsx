"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "../../lib/supabaseClient";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  async function signUp(e: React.FormEvent) {
    e.preventDefault();
    setMessage("Creating account…");
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) setMessage(error.message);
    else {
      setMessage("Account created. Check your email to confirm if required.");
      router.push("/dashboard");
    }
  }

  return (
    <main className="flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md">
        <div className="card">
          <h1 className="text-2xl font-semibold mb-2">Create your account</h1>
          <p className="text-sm text-muted mb-6">Start a free account to access your dashboard</p>

          <form onSubmit={signUp}>
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
              placeholder="At least 8 characters"
            />
            <button className="btn w-full" type="submit">Create account</button>
          </form>

          {message && <p className="mt-4 text-sm text-muted">{message}</p>}

          <p className="mt-4 text-sm text-center">
            Already have an account? <a className="text-primary font-medium" href="/login">Log in</a>
          </p>
        </div>
      </div>
    </main>
  );
}
