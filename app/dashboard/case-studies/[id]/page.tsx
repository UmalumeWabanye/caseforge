"use client";
import React, { useEffect, useState } from "react";
import supabase from "../../../../lib/supabase";

export default function CaseStudyDetail({ params }: { params: { id: string } }) {
  const { id } = params;
  const [item, setItem] = useState<any | null>(null);

  useEffect(() => {
    let mounted = true;
    supabase.from('case_studies').select('*').eq('id', id).single().then(({ data, error }) => {
      if (!mounted) return;
      if (error) console.error(error);
      else setItem(data);
    })
    return () => { mounted = false }
  }, [id])

  if (!item) return <div>Loading…</div>

  return (
    <div>
      <h1 className="text-2xl font-semibold">{item.title}</h1>
      <div className="card mt-4">
        <h3 className="font-medium">Outline</h3>
        <pre className="whitespace-pre-wrap">{item.outline}</pre>

        <h3 className="font-medium mt-4">Content</h3>
        <p className="mt-2">{item.content}</p>
      </div>
    </div>
  )
}
