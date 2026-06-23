import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const COMMENTS_FILE = path.join(DATA_DIR, "comments.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function loadComments(): Record<string, any[]> {
  ensureDataDir();
  if (fs.existsSync(COMMENTS_FILE)) {
    try { return JSON.parse(fs.readFileSync(COMMENTS_FILE, "utf-8")); }
    catch { return {}; }
  }
  return {};
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://8.140.221.75";

async function tryRemote(path: string) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(`${API_BASE_URL}${path}`, { signal: controller.signal });
    clearTimeout(timeout);
    return res;
  } catch { return null; }
}

export async function GET(request: NextRequest) {
  const messageIds = request.nextUrl.searchParams.get("message_ids");

  // parallel fetch from remote for each message ID
  const remoteJobs: Promise<any[]>[] = [];
  if (messageIds) {
    const ids = messageIds.split(",").filter(Boolean);
    for (const id of ids) {
      remoteJobs.push(
        tryRemote(`/api/comments/${encodeURIComponent(id)}`).then(async (res) => {
          if (res?.ok) {
            try { const d = await res.json(); return d.comments || []; }
            catch { return []; }
          }
          return [];
        }).catch(() => []),
      );
    }
  }

  const remoteResults = await Promise.all(remoteJobs);
  const remoteComments = remoteResults.flat();

  // merge with local
  const local = loadComments();
  const localComments: any[] = [];
  for (const arr of Object.values(local)) localComments.push(...arr);

  // dedupe by id
  const seen = new Set<string>();
  const merged = [...remoteComments, ...localComments].filter((c: any) => {
    if (seen.has(c.id)) return false;
    seen.add(c.id);
    return true;
  });

  merged.sort(
    (a, b) =>
      new Date(b.created_at || 0).getTime() -
      new Date(a.created_at || 0).getTime(),
  );

  return NextResponse.json({ comments: merged });
}
