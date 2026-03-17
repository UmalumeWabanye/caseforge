import { NextResponse } from "next/server";
import supabaseServer from "../../../../lib/supabaseServer";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
  const { data, error } = await supabaseServer.auth.signUp({ email, password });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ user: data.user });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
