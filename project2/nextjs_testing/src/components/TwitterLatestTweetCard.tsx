import React, { useState, useEffect } from 'react';

interface Tweet {
  title: string;
  link: string;
  pubDate: string;
  description?: string;
  creator?: string;
}

const TwitterLatestTweetCard: React.FC = () => {
  const [latestTweet, setLatestTweet] = useState<Tweet | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const rssFeedUrl = 'https://rsshub.app/twitter/user/MrYANFD';
  // *** 使用 CORS 代理 allorigins.win ***
  const corsProxyUrl = 'https://api.allorigins.win/get?url=';
  const fetchUrl = `${corsProxyUrl}${encodeURIComponent(rssFeedUrl)}`;

  useEffect(() => {
    const fetchTweet = async () => {
      try {
        const response = await fetch(fetchUrl);

        if (!response.ok) {
          // 尝试读取错误响应的文本
          const errorText = await response.text().catch(() => 'Unknown error response');
          throw new Error(`HTTP error! status: ${response.status}. Proxy response: ${errorText.substring(0, 200)}...`);
        }

        // *** 代理返回的是 JSON，需要先解析 JSON ***
        const data = await response.json();

        // 检查 JSON 结构
        if (!data || typeof data.contents !== 'string') {
             console.error('Unexpected data structure from proxy:', data);
             throw new Error('Invalid data format received from proxy. Missing or invalid "contents".');
        }

        // *** 从 JSON 中提取 XML 字符串 ***
        const xmlString = data.contents;

        // 打印日志，确认获取到的是 XML 字符串
        console.log('Received XML content:', xmlString);
        console.log('Parsing content starts with:', xmlString.substring(0, 20));

        // 使用 DOMParser 解析 XML 字符串
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

        // 检查解析错误
        const parserError = xmlDoc.querySelector('parsererror');
        if (parserError) {
           const errorMessage = parserError.textContent || 'Unknown DOMParser error details';
           console.error('DOMParser failed. Error details:', errorMessage);
           throw new Error(`Error parsing RSS feed XML: ${errorMessage}`);
        }

        // 提取最新的推文信息 (通常是第一个 item)
        const items = xmlDoc.getElementsByTagName('item');
        if (items.length > 0) {
          const latestItem = items[0];

          // 安全地获取元素内容
          const titleElement = latestItem.getElementsByTagName('title')[0];
          const linkElement = latestItem.getElementsByTagName('link')[0];
          const pubDateElement = latestItem.getElementsByTagName('pubDate')[0];
          const descriptionElement = latestItem.getElementsByTagName('description')[0]; // 假设有 description

          const tweet: Tweet = {
            title: titleElement?.textContent?.trim() || 'No Title Available', // trim 掉可能的空白
            link: linkElement?.textContent || '#',
            pubDate: pubDateElement?.textContent || new Date().toISOString(),
            description: descriptionElement?.textContent || undefined,
          };
          setLatestTweet(tweet);
        } else {
          setLatestTweet(null); // 没有找到 item
          console.warn('RSS feed fetched and parsed, but no <item> elements found.');
        }

      } catch (err) {
        // 捕获所有错误
        setError(`Failed to load tweet: ${(err as Error).message}`);
        console.error('Full error details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTweet();
  }, [fetchUrl]); // fetchUrl 改变时重新获取

  // 渲染逻辑
  if (loading) {
    return <div>Loading latest tweet...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  if (!latestTweet) {
     // 当没有找到推文 item 时显示的消息
    return <div>No tweets found or feed empty.</div>;
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', maxWidth: '400px', margin: '20px auto' }}>
      <h3 style={{ marginTop: 0 }}>Latest Tweet from @MrYANFD</h3>
      {/* 链接检查 */}
      <h4>
        <a href={latestTweet.link.startsWith('http') || latestTweet.link === '#' ? latestTweet.link : '#'} target="_blank" rel="noopener noreferrer">
          {latestTweet.title}
        </a>
      </h4>
      {/* description 可能包含 HTML */}
      {latestTweet.description && (
        <div dangerouslySetInnerHTML={{ __html: latestTweet.description }} style={{ maxHeight: '150px', overflowY: 'auto', marginBottom: '10px', wordBreak: 'break-word' }} />
      )}
      {/* 尝试解析并格式化日期 */}
      <p style={{ fontSize: '0.9em', color: '#555' }}>Published: {latestTweet.pubDate ? new Date(latestTweet.pubDate).toLocaleString() : 'Invalid Date'}</p>
    </div>
  );
};

export default TwitterLatestTweetCard;