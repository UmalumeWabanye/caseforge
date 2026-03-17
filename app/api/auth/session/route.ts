import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { access_token, refresh_token, expires_at } = await req.json();

    if (!access_token) return NextResponse.json({ error: 'access_token required' }, { status: 400 });

    const res = NextResponse.json({ ok: true });

    const secure = process.env.NODE_ENV === 'production';
    const maxAge = expires_at ? Math.max(60, Math.floor(expires_at - Math.floor(Date.now() / 1000))) : 60 * 60 * 24 * 7; // at least 60s

    // Set access and refresh tokens as HttpOnly cookies so server-side middleware can detect them
    res.cookies.set('sb-access-token', access_token, {
      httpOnly: true,
      secure,
      sameSite: 'lax',
      path: '/',
      maxAge,
    });

    if (refresh_token) {
      res.cookies.set('sb-refresh-token', refresh_token, {
        httpOnly: true,
        secure,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    return res;
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
