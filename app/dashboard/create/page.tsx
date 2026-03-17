"use client";
import React, { useState } from "react";
import supabase from "../../../lib/supabase";

export default function CreateCaseStudy() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [outline, setOutline] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function generate() {
    setMessage('Generating outline...')
    try {
      const res = await fetch('/api/openai/outline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'OpenAI request failed')
      setOutline(json.outline)
      setMessage(null)
    } catch (err) {
      setMessage((err as Error).message)
    }
  }

  async function save() {
    setMessage('Saving...')
    try {
      const user = (await supabase.auth.getUser()).data.user
      const { data, error } = await supabase.from('case_studies').insert([{ title, content, outline, user_id: user?.id }])
      if (error) throw error
      setMessage('Saved')
      setTitle('')
      setContent('')
      setOutline(null)
    } catch (err) {
      setMessage((err as Error).message)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Create Case Study</h1>
      <div className="card mt-4">
        <label className="block text-sm font-medium mb-1">Title</label>
        <input className="w-full p-2 rounded border mb-3" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label className="block text-sm font-medium mb-1">Content / Brief</label>
        <textarea className="w-full p-2 rounded border mb-3" rows={6} value={content} onChange={(e) => setContent(e.target.value)} />

        <div className="flex gap-2">
          <button className="btn" onClick={generate} type="button">Generate outline</button>
          <button className="btn" onClick={save} type="button">Save</button>
        </div>

        {message && <p className="mt-3 text-sm text-muted">{message}</p>}

        {outline && (
          <div className="mt-4 bg-slate-50 p-3 rounded">
            <h3 className="font-medium">Outline</h3>
            <pre className="whitespace-pre-wrap">{outline}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
