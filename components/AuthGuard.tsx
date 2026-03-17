"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "../lib/supabaseClient";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Check current session
    supabase.auth.getSession().then(({ data }: any) => {
      if (!mounted) return;
      if (!data?.session) {
        router.replace("/login");
      } else {
        setLoading(false);
      }
    });

    const { data } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) router.replace("/login");
    });

    return () => {
      mounted = false;
      // unsubscribe if available
      data?.subscription?.unsubscribe();
    };
  }, [router]);

  if (loading) return <div>Checking authentication…</div>;

  return <>{children}</>;
}
