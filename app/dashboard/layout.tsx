"use client";
import React from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  async function signOut() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/auth/login');
    } catch (err) {
      console.error('Sign out failed', err);
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-[70vh] bg-[color:var(--bg)] rounded-lg overflow-hidden shadow-sm">
        <div className="flex">
          <aside className="w-72 p-6 bg-white border-r min-h-[60vh] flex flex-col">
            <div>
              <h2 className="text-lg font-semibold">Navigation</h2>
              <nav className="mt-6">
                <ul className="space-y-2 text-sm">
                  <li>
                    <a className="block py-2 px-3 rounded hover:bg-slate-100" href="/dashboard">Home</a>
                  </li>
                  <li>
                    <a className="block py-2 px-3 rounded hover:bg-slate-100" href="/dashboard/create">Create</a>
                  </li>
                  <li>
                    <a className="block py-2 px-3 rounded hover:bg-slate-100" href="/dashboard/case-studies">Case studies</a>
                  </li>
                  <li>
                    <a className="block py-2 px-3 rounded hover:bg-slate-100" href="/dashboard/profile">Profile</a>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="mt-auto">
              <button
                className="btn w-full"
                onClick={() => signOut()}
              >
                Sign out
              </button>
            </div>
          </aside>
          <section className="flex-1 p-6 bg-[var(--bg)]">{children}</section>
        </div>
      </div>
    </ProtectedRoute>
  );
}
