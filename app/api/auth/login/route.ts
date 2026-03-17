import { NextResponse } from "next/server";
import supabaseServer from "../../../../lib/supabaseServer";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
  const { data, error } = await supabaseServer.auth.signInWithPassword({ email, password });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ session: data.session });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
