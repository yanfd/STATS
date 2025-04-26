import { NextResponse } from 'next/server';
import { parseStringPromise } from 'xml2js';
// 在 App Router 的 Edge 运行时或 Node.js 运行时，fetch 是内置的，通常无需安装 node-fetch

const RSS_FEED_URL = 'https://rsshub.app/twitter/user/MrYANFD';

export async function GET() {
  try {
    // 在后端获取 RSS Feed，没有 CORS 问题
    const response = await fetch(RSS_FEED_URL);

    if (!response.ok) {
      // 尝试读取错误响应的文本，提供更多信息
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error(`Backend fetch error: ${response.status} - ${errorText.substring(0, 200)}...`);
      return NextResponse.json({ error: `Failed to fetch RSS feed: ${response.status}` }, { status: response.status });
    }

    const xmlText = await response.text();

    // 使用 xml2js 库解析 XML 到 JavaScript 对象
    const result = await parseStringPromise(xmlText, { explicitArray: false, ignoreAttrs: true });

    // 根据 RSS Hub Twitter feed 的典型结构提取最新的推文信息
    const latestItem = result?.rss?.channel?.item;

    if (!latestItem) {
         console.warn('RSS feed fetched successfully, but no <item> elements found.');
         return NextResponse.json({ error: 'No tweet item found in the RSS feed' }, { status: 404 });
    }

    // 格式化数据，只返回前端需要的字段
    const tweet = {
        title: latestItem.title || 'No Title Available',
        link: latestItem.link || '#',
        pubDate: latestItem.pubDate || new Date().toISOString(),
        description: latestItem.description || undefined,
        creator: latestItem.creator || undefined,
    };

    // 返回 JSON 格式的数据给前端
    return NextResponse.json(tweet);

  } catch (error) {
    console.error('Backend RSS processing error:', error);
    return NextResponse.json({ error: 'Internal Server Error during RSS processing' }, { status: 500 });
  }
}