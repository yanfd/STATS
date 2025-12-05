import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://150.109.205.114:8000';

export async function GET() {
  try {
    const url = `${API_BASE_URL}/api/hughes/messages`;

    // Set a timeout for the fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
        next: { revalidate: 0 },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const body = await response.text().catch(() => '');
        console.error('Backend error body:', body);
        throw new Error(`API responded with status ${response.status} for ${url}`);
      }

      const data = await response.json();

      return NextResponse.json(data, {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });
    } catch (fetchError: any) {
      clearTimeout(timeoutId);

      // Handle specific fetch errors
      if (fetchError.name === 'AbortError') {
        throw new Error('Request timed out');
      }
      throw fetchError;
    }
  } catch (error: any) {
    console.error('Proxy error:', error);

    // Return a graceful error response instead of 500 if possible, 
    // or at least a structured 500 that the frontend can handle.
    // In this case, since the backend is down, we return a 503 Service Unavailable
    // or a 500 with a clear message.

    return NextResponse.json(
      {
        error: 'Failed to fetch messages',
        details: String(error?.message || error),
        isBackendError: true
      },
      { status: 503 } // Service Unavailable is more appropriate for connection issues
    );
  }
}
