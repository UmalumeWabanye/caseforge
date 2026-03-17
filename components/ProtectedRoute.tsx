"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "../lib/supabase";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }: any) => {
      if (!mounted) return;
      if (!data?.session) {
        router.replace("/auth/login");
      } else {
        setLoading(false);
      }
    });

    const { data } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) router.replace("/auth/login");
    });

    return () => {
      mounted = false;
      data?.subscription?.unsubscribe();
    };
  }, [router]);

  if (loading) return <div>Checking authentication…</div>;

  return <>{children}</>;
}
