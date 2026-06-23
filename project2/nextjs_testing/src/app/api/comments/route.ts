import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

/* ---------- local file storage (works without FastAPI backend) ---------- */

const DATA_DIR = path.join(process.cwd(), "data");
const COMMENTS_FILE = path.join(DATA_DIR, "comments.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function loadComments(): Record<string, any[]> {
  ensureDataDir();
  if (fs.existsSync(COMMENTS_FILE)) {
    try {
      const raw = fs.readFileSync(COMMENTS_FILE, "utf-8");
      return JSON.parse(raw);
    } catch {
      return {};
    }
  }
  return {};
}

function saveComments(data: Record<string, any[]>) {
  ensureDataDir();
  fs.writeFileSync(COMMENTS_FILE, JSON.stringify(data, null, 2), "utf-8");
}

/* ---------- remote backend (optional) ---------- */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://8.140.221.75";

async function tryRemote(path: string, options?: RequestInit) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeout);
    return res;
  } catch {
    return null;
  }
}

/* ---------- route handlers ---------- */

export async function GET(request: NextRequest) {
  const messageId = request.nextUrl.searchParams.get("message_id");
  const recent = request.nextUrl.searchParams.get("recent");
  const fetchAll = request.nextUrl.searchParams.get("all");

  /* all comments — for comment center */
  if (fetchAll) {
    const data = loadComments();
    const flat: any[] = [];
    for (const arr of Object.values(data)) flat.push(...arr);
    flat.sort(
      (a, b) =>
        new Date(b.created_at || 0).getTime() -
        new Date(a.created_at || 0).getTime(),
    );
    return NextResponse.json({ comments: flat });
  }

  /* recent comments (for notifications) */
  if (recent) {
    // try remote first
    const remote = await tryRemote(`/api/comments/recent`);
    if (remote?.ok) {
      try {
        const data = await remote.json();
        return NextResponse.json(data);
      } catch { /* fall through */ }
    }

    // local fallback
    const all = loadComments();
    const flat: any[] = [];
    for (const arr of Object.values(all)) flat.push(...arr);
    flat.sort(
      (a, b) =>
        new Date(b.created_at || 0).getTime() -
        new Date(a.created_at || 0).getTime(),
    );
    return NextResponse.json({ comments: flat.slice(0, 20) });
  }

  /* comments for a specific message */
  if (!messageId) {
    return NextResponse.json({ error: "message_id required" }, { status: 400 });
  }

  // try remote first
  const remote = await tryRemote(
    `/api/comments/${encodeURIComponent(messageId)}`,
  );
  if (remote?.ok) {
    try {
      const data = await remote.json();
      return NextResponse.json(data);
    } catch { /* fall through */ }
  }

  // local fallback
  const all = loadComments();
  return NextResponse.json({ comments: all[messageId] || [] });
}

export async function POST(request: NextRequest) {
  let body: { message_id?: string; author_name?: string; content?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { message_id, author_name, content } = body;
  if (!message_id || !author_name?.trim() || !content?.trim()) {
    return NextResponse.json(
      { error: "message_id, author_name, and content are required" },
      { status: 400 },
    );
  }

  const newComment = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    message_id,
    author_name: author_name.trim(),
    content: content.trim(),
    created_at: new Date().toISOString(),
  };

  // try remote first
  const remote = await tryRemote(`/api/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message_id,
      author_name: author_name.trim(),
      content: content.trim(),
    }),
  });
  if (remote?.ok) {
    try {
      const data = await remote.json();
      return NextResponse.json(data);
    } catch { /* fall through */ }
  }

  // local fallback
  const all = loadComments();
  if (!all[message_id]) all[message_id] = [];
  all[message_id].push(newComment);
  saveComments(all);

  return NextResponse.json({ comment: newComment });
}
