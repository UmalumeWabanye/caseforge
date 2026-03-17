import { NextResponse } from "next/server";
import supabaseServer from "../../../../lib/supabaseServer";

export async function POST() {
  try {
    // Attempt server-side sign out (best-effort)
    try {
      await supabaseServer.auth.signOut();
    } catch (e) {
      // ignore; we'll still clear cookies
      console.warn('supabaseServer.signOut failed', e);
    }

    const res = NextResponse.json({ ok: true });

    // Clear the auth cookies we previously set
    res.cookies.set('sb-access-token', '', { httpOnly: true, path: '/', maxAge: 0 });
    res.cookies.set('sb-refresh-token', '', { httpOnly: true, path: '/', maxAge: 0 });

    return res;
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
