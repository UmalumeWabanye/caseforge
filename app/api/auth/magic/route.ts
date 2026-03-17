import { NextResponse } from "next/server";
import supabase from "../../../../lib/supabase";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
