import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { LOGSEQ_COOKIE_NAME, verifySessionToken } from "@/lib/logseq-auth.mjs";

export async function hasLogseqSession(): Promise<boolean> {
  const secret = process.env.LOGSEQ_SESSION_SECRET;
  if (!secret) return false;

  const token = (await cookies()).get(LOGSEQ_COOKIE_NAME)?.value;
  return verifySessionToken(token, secret);
}

export async function requireLogseqApiSession(): Promise<NextResponse | null> {
  if (await hasLogseqSession()) return null;

  return NextResponse.json(
    { error: "Authentication required" },
    { status: 401, headers: { "Cache-Control": "no-store" } },
  );
}

export function hughesApiHeaders(): HeadersInit {
  const token = process.env.HUGHES_API_TOKEN;
  if (!token) throw new Error("HUGHES_API_TOKEN is not configured");

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}
