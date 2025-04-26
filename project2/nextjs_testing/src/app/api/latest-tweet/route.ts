// src/app/api/latest-tweet/route.ts (使用 rss-parser 在后端获取解析 RSS Hub)
import { NextResponse } from 'next/server';
import Parser from 'rss-parser'; // *** 导入 rss-parser ***

// 请确保你已安装 rss-parser: npm install rss-parser

const RSS_FEED_URL = 'https://rsshub.app/twitter/user/MrYANFD';
const parser = new Parser(); // *** 创建一个新的 Parser 实例 ***

export async function GET() {
  try {
    // *** 在后端使用 parser.parseURL() 获取和解析 RSS Feed ***
    // 在后端环境下，fetch 是内置的，且没有浏览器 CORS 限制
    const feed = await parser.parseURL(RSS_FEED_URL);

    // rss-parser 通常会把 feed.items 解析成一个数组，每个元素代表一个条目
    const latestItem = feed.items[0]; // 获取数组的第一个元素（通常是最新推文）

    if (!latestItem) {
         console.warn('RSS feed fetched and parsed, but no items found.');
         // 打印 feed 的一些信息，帮助调试为何没有 item
         console.log('Received feed info:', { title: feed.title, link: feed.link, itemsCount: feed.items.length });
         return NextResponse.json({ error: 'No tweet item found in the RSS feed.' }, { status: 404 });
    }

    // *** 格式化数据，使其符合前端 Tweet 接口的结构 ***
    // rss-parser 会自动解析常见的 RSS/Atom 字段，并映射到 item 对象上
    const tweet = {
        title: latestItem.title || 'No Title Available', // 推文文本通常在 title 字段
        link: latestItem.link || '#', // 推文链接通常在 link 字段
        pubDate: latestItem.pubDate || latestItem.isoDate || new Date().toISOString(), // 发布日期
        description: latestItem.content || latestItem.contentSnippet || undefined, // 推文内容可能在 content 或 contentSnippet
        creator: latestItem.creator || undefined, // 作者信息 (如果 Feed 提供且 rss-parser 解析了)
        // 如果 Feed 包含图片等附件信息，并且 rss-parser 解析了 enclosure/image 字段，
        // 你也可以添加到这里，比如 imageUrl: latestItem.enclosure?.url || latestItem.image?.url || undefined,
    };

    // 返回格式化后的 JSON 数据给前端
    return NextResponse.json(tweet);

  } catch (error) {
    console.error('Backend RSS processing error (using rss-parser):', error);
    console.error('Detailed Error:', error); // 打印详细错误对象
    // 捕获并处理 rss-parser 在 fetch 或解析过程中可能抛出的错误
    return NextResponse.json({ error: `Internal Server Error during RSS fetch/parsing.` }, { status: 500 });
  }
}