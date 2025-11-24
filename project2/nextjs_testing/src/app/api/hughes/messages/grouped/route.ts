import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.yanfd.cn';

export async function GET() {
  try {
    const url = `${API_BASE_URL}/api/hughes/messages/grouped`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // 禁用缓存，每次都获取最新数据
      next: { revalidate: 0 } // 不进行重新验证缓存
    });

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      console.error('Backend error body:', body);
      throw new Error(`API responded with status ${response.status} for ${url}`);
    }

    const data = await response.json();

    // 返回响应并设置缓存控制头
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error: any) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch grouped messages', details: String(error?.message || error) },
      { status: 500 }
    );
  }
}
