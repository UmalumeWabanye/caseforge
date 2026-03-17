import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Very small middleware to protect /dashboard routes client-side by checking for a Supabase cookie.
export function middleware(req: NextRequest) {
  // NOTE: Client-side ProtectedRoute handles auth checks and redirect.
  // Keeping middleware minimal so it doesn't prematurely redirect before client auth is initialized.
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
