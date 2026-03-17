import { NextResponse } from 'next/server'
import supabaseServer from '../../../../lib/supabaseServer'

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: 'email required' }, { status: 400 });

    // Try to insert into a welcome_emails table if it exists. If not, just return ok.
    try {
      // Safe: if table doesn't exist, Supabase returns an error which we catch and ignore below.
      const { error } = await supabaseServer.from('welcome_emails').insert([{ email, created_at: new Date().toISOString() }]);
      if (error) {
        // If the table doesn't exist or insertion fails, log and continue.
        console.warn('welcome email insert failed:', error.message);
      }
    } catch (e) {
      console.warn('welcome email flow skipped:', e);
    }

    // In a real app, replace above with transactional email provider integration.
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
