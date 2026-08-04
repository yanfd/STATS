import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import {
  isProtectedLogseqPath,
  LOGSEQ_COOKIE_NAME,
  logseqHostname,
  verifySessionToken,
} from "@/lib/logseq-auth.mjs";

const CANONICAL_PATHS = new Set(["/log", "/hughes", "/hughes_rain"]);

function noStore(response: NextResponse): NextResponse {
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export async function proxy(request: NextRequest) {
  const replacementHost = logseqHostname(request.headers.get("host") ?? "");
  if (replacementHost) {
    const url = request.nextUrl.clone();
    url.host = replacementHost;
    return noStore(NextResponse.redirect(url, 308));
  }

  const { pathname } = request.nextUrl;
  if (!isProtectedLogseqPath(pathname)) return NextResponse.next();

  const secret = process.env.LOGSEQ_SESSION_SECRET;
  const token = request.cookies.get(LOGSEQ_COOKIE_NAME)?.value;
  const authenticated = await verifySessionToken(token, secret ?? "");

  if (!authenticated) {
    if (pathname.startsWith("/api/") || pathname === "/messages.json") {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401, headers: { "Cache-Control": "no-store" } },
      );
    }

    const loginUrl = new URL("/logseq-login", request.url);
    loginUrl.searchParams.set("returnTo", `${pathname}${request.nextUrl.search}`);
    return noStore(NextResponse.redirect(loginUrl));
  }

  if (CANONICAL_PATHS.has(pathname)) {
    const canonicalUrl = request.nextUrl.clone();
    canonicalUrl.pathname = "/logseq";
    canonicalUrl.search = "";
    return noStore(NextResponse.redirect(canonicalUrl, 308));
  }

  return noStore(NextResponse.next());
}

export const config = {
  matcher: [
    "/log/:path*",
    "/logseq/:path*",
    "/hughes/:path*",
    "/hughes_rain/:path*",
    "/api/hughes/:path*",
    "/api/comments/:path*",
    "/messages.json",
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
