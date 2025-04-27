// src/app/api/latest-tweet/route.ts
import { NextResponse } from 'next/server';
import Parser from 'rss-parser'; // Import rss-parser

const RSS_FEED_URL = 'https://rsshub.app/twitter/user/MrYANFD';
const parser = new Parser(); // Create a new parser instance

export async function GET() {
  try {
    console.log('Backend: Attempting to fetch RSS feed from RSS Hub.');
    const feed = await parser.parseURL(RSS_FEED_URL);
    console.log('Backend: RSS feed fetched and parsed successfully.');
    console.log('Backend: Feed title:', feed.title);
    console.log('Backend: Number of items:', feed.items.length);


    const latestItem = feed.items[0]; // 获取数组的第一个元素（通常是最新推文）

    console.log('Backend: Latest item object:', latestItem);


    if (!latestItem) {
         console.warn('Backend: RSS feed fetched and parsed, but no items found.');
         console.log('Backend: Full feed structure (might be large):', feed);
         return NextResponse.json({ error: 'No tweet item found in the RSS feed.' }, { status: 404 });
    }

    // *** 在将内容发送到前端之前，处理 description/content 字段 ***
    let rawContent = latestItem.content || latestItem.contentSnippet || latestItem.description || ''; // 获取原始 HTML 字符串

    // 使用正则表达式替换连续的 <br> 标签
    // (<br\s*>\s*) 匹配一个 <br> 标签后面可能跟着的空白字符，以及它自身后面可能跟着的空白字符
    // {2,} 表示匹配前一个模式（一个 <br> 及空白）至少两次
    // gi 表示全局匹配 (g) 且不区分大小写 (i)
    // 替换成单个 '<br>'
    let cleanedContent = rawContent.replace(/<br\s*>/gi, '');

    // 你可以根据需要添加其他清理规则，例如移除特定的 HTML 标签等

    // *** 格式化数据，将处理后的内容赋值给 description ***
    const tweet = {
        title: latestItem.title || 'No Title Available',
        link: latestItem.link || '#',
        pubDate: latestItem.pubDate || latestItem.isoDate || new Date().toISOString(),
        description: cleanedContent, // *** 使用清理后的内容 ***
        creator: latestItem.creator || undefined,
    };

    console.log('Backend: Formatted tweet data:', tweet);

    // 返回格式化后的 JSON 数据给前端
    return NextResponse.json(tweet);

  } catch (error) {
    console.error('Backend: RSS processing error (using rss-parser):', error);
    console.error('Backend: Detailed Error:', error);
    console.error('Backend: Error name:', (error as Error).name);

    return NextResponse.json({ error: `Internal Server Error during RSS fetch/parsing.` }, { status: 500 });
  }
}