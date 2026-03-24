import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://8.140.221.75';

export async function GET(request: NextRequest) {
    const messageId = request.nextUrl.searchParams.get('message_id');
    const recent = request.nextUrl.searchParams.get('recent');

    if (recent) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/comments/recent`, { cache: 'no-store' });
            const data = await response.json();
            return NextResponse.json(data);
        } catch {
            return NextResponse.json({ comments: [] });
        }
    }

    if (!messageId) {
        return NextResponse.json({ error: 'message_id required' }, { status: 400 });
    }

    try {
        const response = await fetch(
            `${API_BASE_URL}/api/comments/${encodeURIComponent(messageId)}`,
            { cache: 'no-store' }
        );
        const data = await response.json();
        return NextResponse.json(data);
    } catch {
        return NextResponse.json({ comments: [] });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const response = await fetch(`${API_BASE_URL}/api/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const err = await response.text().catch(() => '');
            return NextResponse.json(
                { error: 'Failed to post comment', upstreamStatus: response.status, upstreamBody: err },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch {
        return NextResponse.json({ error: 'Failed to post comment' }, { status: 503 });
    }
}
