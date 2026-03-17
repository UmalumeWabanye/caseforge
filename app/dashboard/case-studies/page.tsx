"use client";
import React, { useEffect, useState } from "react";
import supabase from "../../../lib/supabase";

export default function CaseStudiesList() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    supabase.from('case_studies').select('*').order('created_at', { ascending: false }).then(({ data, error }) => {
      if (!mounted) return;
      if (error) {
        console.error(error);
      } else {
        setItems(data || [])
      }
      setLoading(false)
    })
    return () => { mounted = false }
  }, [])

  if (loading) return <div>Loading…</div>

  return (
    <div>
      <h1 className="text-2xl font-semibold">Case Studies</h1>
      <div className="mt-4 space-y-3">
        {items.map((it) => (
          <a key={it.id} href={`/dashboard/case-studies/${it.id}`} className="block card">
            <h3 className="text-lg font-medium">{it.title}</h3>
            <p className="text-sm text-muted">{it.content?.slice(0, 120)}...</p>
          </a>
        ))}
      </div>
    </div>
  )
}
