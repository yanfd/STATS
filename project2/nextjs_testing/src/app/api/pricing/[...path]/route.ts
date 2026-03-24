import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://8.140.221.75';

export async function GET(request: NextRequest) {
    const { pathname, searchParams } = request.nextUrl;
    const path = pathname.replace('/api/pricing', '');
    try {
        const response = await fetch(
            `${API_BASE_URL}/api/pricing${path}?${searchParams.toString()}`,
            { cache: 'no-store' }
        );
        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch {
        return NextResponse.json({ error: 'Upstream unavailable' }, { status: 503 });
    }
}

export async function POST(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const path = pathname.replace('/api/pricing', '');
    try {
        const body = await request.json();
        const response = await fetch(`${API_BASE_URL}/api/pricing${path}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch {
        return NextResponse.json({ error: 'Upstream unavailable' }, { status: 503 });
    }
}
