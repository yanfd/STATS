"use client";

import { type FormEvent, useEffect, useState } from "react";

export default function LogseqLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [returnTo, setReturnTo] = useState("/logseq");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("returnTo");
    if (value) setReturnTo(value);
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/logseq-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          returnTo,
        }),
      });
      const data: { error?: string; returnTo?: string } = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Authentication failed");
        return;
      }
      window.location.assign(data.returnTo ?? "/logseq");
    } catch {
      setError("Authentication service unavailable");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="grid min-h-svh place-items-center bg-black px-6 text-white">
      <form onSubmit={submit} className="w-full max-w-sm border border-white/20 bg-white/[0.04] p-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/45">Private archive</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">LOGSEQ</h1>
        <label className="mt-8 block font-mono text-[11px] uppercase tracking-[0.2em] text-white/60" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          autoFocus
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-3 w-full border border-white/25 bg-black px-4 py-3 text-white outline-none transition focus:border-white/70"
        />
        {error ? <p className="mt-3 text-sm text-red-300" role="alert">{error}</p> : null}
        <button
          type="submit"
          disabled={submitting}
          className="mt-6 w-full border border-white bg-white px-4 py-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-black disabled:opacity-50"
        >
          {submitting ? "Verifying" : "Enter"}
        </button>
      </form>
    </main>
  );
}
