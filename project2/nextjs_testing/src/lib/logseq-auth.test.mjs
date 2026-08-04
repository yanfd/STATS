import assert from "node:assert/strict";
import { test } from "node:test";

import {
  createSessionToken,
  isProtectedLogseqPath,
  logseqHostname,
  safeReturnPath,
  verifyPassword,
  verifySessionToken,
} from "./logseq-auth.mjs";

test("password verification accepts only the configured password", async () => {
  assert.equal(await verifyPassword("correct", "correct"), true);
  assert.equal(await verifyPassword("wrong", "correct"), false);
  assert.equal(await verifyPassword("correct", ""), false);
});

test("session tokens are signed, expire, and reject tampering", async () => {
  const token = await createSessionToken("secret", 1_000, 60);

  assert.equal(await verifySessionToken(token, "secret", 1_001), true);
  assert.equal(await verifySessionToken(`${token}x`, "secret", 1_001), false);
  assert.equal(await verifySessionToken(token, "other", 1_001), false);
  assert.equal(await verifySessionToken(token, "secret", 61_001), false);
});

test("only sensitive log routes and data endpoints are protected", () => {
  for (const path of [
    "/logseq",
    "/logseq/entry",
    "/log",
    "/hughes",
    "/hughes_rain",
    "/api/hughes/messages",
    "/api/comments/all",
    "/messages.json",
  ]) {
    assert.equal(isProtectedLogseqPath(path), true, path);
  }

  assert.equal(isProtectedLogseqPath("/home"), false);
  assert.equal(isProtectedLogseqPath("/api/latest-tweet"), false);
});

test("legacy logs hostname maps to logseq without changing other hosts", () => {
  assert.equal(logseqHostname("logs.yanfd.cn"), "logseq.yanfd.cn");
  assert.equal(logseqHostname("logs.yanfd.cn:3000"), "logseq.yanfd.cn:3000");
  assert.equal(logseqHostname("mylogs.yanfd.cn"), null);
  assert.equal(logseqHostname("stats.yanfd.cn"), null);
});

test("login return path cannot redirect off-site", () => {
  assert.equal(safeReturnPath("/logseq?month=2026-07"), "/logseq?month=2026-07");
  assert.equal(safeReturnPath("https://evil.example"), "/logseq");
  assert.equal(safeReturnPath("//evil.example"), "/logseq");
  assert.equal(safeReturnPath("/home"), "/logseq");
});
