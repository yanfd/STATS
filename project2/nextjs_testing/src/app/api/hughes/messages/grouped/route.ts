import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.yanfd.cn';

export async function GET() {
  try {
    const url = `${API_BASE_URL}/api/hughes/messages/grouped`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      console.error('Backend error body:', body);
      throw new Error(`API responded with status ${response.status} for ${url}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch grouped messages', details: String(error?.message || error) },
      { status: 500 }
    );
  }
}
