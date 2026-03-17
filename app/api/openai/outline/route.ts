import { NextResponse } from "next/server";
import { generateOutline } from "../../../../lib/openai";

export async function POST(req: Request) {
  try {
    // Developer-friendly guard: return a clear error when the API key is missing
    if (!process.env.OPENAI_API_KEY && !process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OPENAI_API_KEY not set. Add OPENAI_API_KEY to your .env.local' }, { status: 400 })
    }
    const { title, content } = await req.json();
    const prompt = `Create a concise case study outline for the following title and brief:\nTitle: ${title}\nBrief: ${content}`;
    const outline = await generateOutline(prompt);
    return NextResponse.json({ outline });
  } catch (err) {
    // Log the error server-side for easier debugging in the dev terminal
    // (do not leak secrets in production logs)
    try { console.error('api/openai/outline error:', err) } catch (_) {}
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
