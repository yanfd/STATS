// src/app/api/latest-tweet/route.ts
import { NextResponse } from 'next/server';
import Parser from 'rss-parser'; // Import rss-parser

const RSS_FEED_URL = 'https://rsshub.app/twitter/user/MrYANFD';
const parser = new Parser(); // Create a new parser instance

export async function GET() {
  try {
    console.log('Backend: Attempting to fetch RSS feed from RSS Hub.'); // Add log
    const feed = await parser.parseURL(RSS_FEED_URL);
    console.log('Backend: RSS feed fetched and parsed successfully.'); // Add log
    // 打印一些 Feed 整体信息，确认结构正常
    console.log('Backend: Feed title:', feed.title);
    console.log('Backend: Number of items:', feed.items.length);


    const latestItem = feed.items[0]; // 获取数组的第一个元素（通常是最新推文）

    // *** 添加这一行，打印出 latestItem 对象的完整结构 ***
    console.log('Backend: Latest item object:', latestItem);


    if (!latestItem) {
         console.warn('Backend: RSS feed fetched and parsed, but no items found.');
         // 打印更多 Feed 信息，帮助调试
         console.log('Backend: Full feed structure (might be large):', feed);
         return NextResponse.json({ error: 'No tweet item found in the RSS feed.' }, { status: 404 });
    }

    // *** 格式化数据，使其符合前端 Tweet 接口的结构 ***
    // 在这里，根据你对上面 latestItem 打印结果的观察来调整字段提取
    const tweet = {
        title: latestItem.title || 'No Title Available', // 检查原创推文的 title 是否正常
        link: latestItem.link || '#', // 检查原创推文的 link 是否正常
        pubDate: latestItem.pubDate || latestItem.isoDate || new Date().toISOString(), // 检查日期
        description: latestItem.content || latestItem.contentSnippet || latestItem.description || undefined, // *** 尝试多个字段作为 description 的来源 ***
        creator: latestItem.creator || undefined, // 检查作者字段

        // 可能还有其他字段，比如媒体信息，如果需要可以在这里提取
        // 如果发现有其他字段包含你想要的内容，比如 original_tweet_text 或 similar
        // originalContent: latestItem.original_tweet_text || undefined, // 这是一个假设的字段名
    };

    console.log('Backend: Formatted tweet data:', tweet); // Add log

    // 返回格式化后的 JSON 数据给前端
    return NextResponse.json(tweet);

  } catch (error) {
    console.error('Backend: RSS processing error (using rss-parser):', error);
    // 打印详细错误对象，特别是如果 rss-parser 抛出了特定类型的错误
    console.error('Backend: Detailed Error:', error);
    console.error('Backend: Error name:', (error as Error).name); // 打印错误的名称
    // 检查 error 对象是否有额外的属性，如 error.parserError
    // console.error('Backend: Additional error properties:', error); // 如果需要更详细的错误对象结构

    return NextResponse.json({ error: `Internal Server Error during RSS fetch/parsing.` }, { status: 500 });
  }
}