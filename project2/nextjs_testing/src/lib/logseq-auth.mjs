const encoder = new TextEncoder();

export const LOGSEQ_COOKIE_NAME = "logseq_session";
export const LOGSEQ_SESSION_MAX_AGE = 12 * 60 * 60;

function bytesToBase64Url(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary)
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replace(/=+$/u, "");
}

async function hmac(value, secret) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { hash: "SHA-256", name: "HMAC" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return bytesToBase64Url(new Uint8Array(signature));
}

function constantTimeEqual(left, right) {
  const leftBytes = encoder.encode(left);
  const rightBytes = encoder.encode(right);
  const length = Math.max(leftBytes.length, rightBytes.length);
  let difference = leftBytes.length ^ rightBytes.length;

  for (let index = 0; index < length; index += 1) {
    difference |= (leftBytes[index] ?? 0) ^ (rightBytes[index] ?? 0);
  }

  return difference === 0;
}

export async function verifyPassword(candidate, configuredPassword) {
  if (!candidate || !configuredPassword) return false;
  return constantTimeEqual(candidate, configuredPassword);
}

export async function createSessionToken(
  secret,
  now = Date.now(),
  maxAgeSeconds = LOGSEQ_SESSION_MAX_AGE,
) {
  if (!secret) throw new Error("LOGSEQ_SESSION_SECRET is not configured");
  const expiresAt = now + maxAgeSeconds * 1_000;
  const payload = `v1.${expiresAt}`;
  return `${payload}.${await hmac(payload, secret)}`;
}

export async function verifySessionToken(token, secret, now = Date.now()) {
  if (!token || !secret) return false;
  const parts = token.split(".");
  if (parts.length !== 3 || parts[0] !== "v1") return false;

  const expiresAt = Number(parts[1]);
  if (!Number.isSafeInteger(expiresAt) || expiresAt <= now) return false;

  const payload = `${parts[0]}.${parts[1]}`;
  const expected = await hmac(payload, secret);
  return constantTimeEqual(parts[2], expected);
}

export function isProtectedLogseqPath(pathname) {
  return (
    pathname === "/log" ||
    pathname.startsWith("/log/") ||
    pathname === "/logseq" ||
    pathname.startsWith("/logseq/") ||
    pathname === "/hughes" ||
    pathname.startsWith("/hughes/") ||
    pathname === "/hughes_rain" ||
    pathname.startsWith("/hughes_rain/") ||
    pathname === "/messages.json" ||
    pathname === "/api/hughes" ||
    pathname.startsWith("/api/hughes/") ||
    pathname === "/api/comments" ||
    pathname.startsWith("/api/comments/")
  );
}

export function logseqHostname(host) {
  const [hostname, port] = host.toLowerCase().split(":", 2);
  const labels = hostname.split(".");
  if (labels[0] !== "logs") return null;
  labels[0] = "logseq";
  return `${labels.join(".")}${port ? `:${port}` : ""}`;
}

export function safeReturnPath(value) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/logseq";
  }

  try {
    const url = new URL(value, "https://logseq.invalid");
    if (url.origin !== "https://logseq.invalid") return "/logseq";
    const path = `${url.pathname}${url.search}`;
    return isProtectedLogseqPath(url.pathname) ? path : "/logseq";
  } catch {
    return "/logseq";
  }
}
