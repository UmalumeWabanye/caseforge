import React from "react";

export default function VerifyEmailPage() {
  return (
    <main className="flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md">
        <div className="card text-center">
          <h1 className="text-2xl font-semibold mb-2">Check your inbox</h1>
          <p className="text-sm text-muted">We have sent a magic link to your email. Click it to sign in.</p>
        </div>
      </div>
    </main>
  );
}
