import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { createHash, randomUUID } from "node:crypto";
import { validateLead } from "@/lib/lead-validation";

// Best-effort per-process throttling; production edge/WAF limits should supplement this.
const attempts = new Map<string, { count: number; expires: number }>();
export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (origin && origin !== new URL(req.url).origin && origin !== process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")) {
    return NextResponse.json({ success: false, error: "Please submit from our website." }, { status: 403 });
  }
  if (!req.headers.get("content-type")?.includes("application/json")) return NextResponse.json({ success: false, error: "Expected JSON." }, { status: 415 });
  const raw = await req.text();
  if (Buffer.byteLength(raw, "utf8") > 24000) return NextResponse.json({ success: false, error: "Submission is too large." }, { status: 413 });
  let body: unknown;
  try { body = JSON.parse(raw); } catch { return NextResponse.json({ success: false, error: "Invalid submission." }, { status: 400 }); }
  const parsed = validateLead(body);
  if ("error" in parsed) return NextResponse.json({ success: false, error: parsed.error }, { status: 400 });
  const { eventId = randomUUID(), ...lead } = parsed.data;
  const now = Date.now();
  for (const [key, entry] of attempts) if (entry.expires <= now) attempts.delete(key);
  const key = createHash("sha256").update(lead.email + lead.phone).digest("hex");
  const entry = attempts.get(key) || { count: 0, expires: now + 600000 };
  if (entry.count >= 5 || (!attempts.has(key) && attempts.size >= 5000)) return NextResponse.json({ success: false, error: "Too many requests. Please try again in ten minutes." }, { status: 429, headers: { "Retry-After": "600" } });
  attempts.set(key, { ...entry, count: entry.count + 1 });
  if (!process.env.SANITY_WRITE_TOKEN) return NextResponse.json({ success: false, error: "Enquiries are temporarily unavailable. Please call us or try again later." }, { status: 503 });
  try {
    const client = createClient({ projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, apiVersion: "2026-06-12", useCdn: false, token: process.env.SANITY_WRITE_TOKEN });
    await client.createIfNotExists({ _id: "lead." + eventId, _type: "leads", ...lead });
    return NextResponse.json({ success: true, eventId }, { status: 200, headers: { "Cache-Control": "no-store" } });
  } catch {
    console.error("Lead storage failed");
    return NextResponse.json({ success: false, error: "We could not save your enquiry. Please try again or call us." }, { status: 502 });
  }
}
