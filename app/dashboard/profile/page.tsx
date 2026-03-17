"use client";
import React, { useEffect, useState } from "react";
import supabase from "../../../lib/supabase";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data }: any) => {
      if (!mounted) return;
      setUser(data.user || data);
    });
    return () => { mounted = false };
  }, []);

  if (!user) return <div>Loading profile…</div>;

  return (
    <div>
      <h1 className="text-2xl font-semibold">Profile</h1>
      <div className="card mt-4">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>ID:</strong> {user.id}</p>
      </div>
    </div>
  );
}
