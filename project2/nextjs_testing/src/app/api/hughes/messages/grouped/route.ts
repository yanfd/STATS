import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.yanfd.tech';

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/hughes/messages/grouped`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch grouped messages', details: error.message },
      { status: 500 }
    );
  }
}