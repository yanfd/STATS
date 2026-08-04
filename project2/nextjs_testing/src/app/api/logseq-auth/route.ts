import { NextResponse } from "next/server";

import {
  createSessionToken,
  LOGSEQ_COOKIE_NAME,
  LOGSEQ_SESSION_MAX_AGE,
  safeReturnPath,
  verifyPassword,
} from "@/lib/logseq-auth.mjs";

type LoginBody = { password?: unknown; returnTo?: unknown };

export async function POST(request: Request) {
  let body: LoginBody;
  try {
    body = (await request.json()) as LoginBody;
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  const password = typeof body.password === "string" ? body.password : "";
  const configuredPassword = process.env.LOGSEQ_PASSWORD ?? "";
  const sessionSecret = process.env.LOGSEQ_SESSION_SECRET ?? "";

  if (!configuredPassword || !sessionSecret) {
    return NextResponse.json(
      { error: "Access control is not configured" },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  if (!(await verifyPassword(password, configuredPassword))) {
    return NextResponse.json(
      { error: "Invalid password" },
      { status: 401, headers: { "Cache-Control": "no-store" } },
    );
  }

  const returnTo = safeReturnPath(
    typeof body.returnTo === "string" ? body.returnTo : undefined,
  );
  const response = NextResponse.json(
    { returnTo },
    { headers: { "Cache-Control": "no-store" } },
  );
  response.cookies.set({
    name: LOGSEQ_COOKIE_NAME,
    value: await createSessionToken(sessionSecret),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: LOGSEQ_SESSION_MAX_AGE,
    priority: "high",
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json(
    { success: true },
    { headers: { "Cache-Control": "no-store" } },
  );
  response.cookies.set({
    name: LOGSEQ_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  return response;
}
