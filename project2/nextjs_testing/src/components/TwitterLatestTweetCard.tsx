import React, { useState, useEffect } from 'react';

// 与后端返回的数据结构一致
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

  // 调用你的后端 API 路由
  const apiEndpoint = '/api/latest-tweet';

  useEffect(() => {
    const fetchTweet = async () => {
      try {
        // 直接调用后端 API
        const response = await fetch(apiEndpoint);

        if (!response.ok) {
          // 从后端 API 获取错误信息
          const errorData = await response.json().catch(() => ({ error: 'Unknown backend error format' }));
          throw new Error(`Failed to fetch tweet from API: ${response.status} - ${errorData.error || 'Unknown API error'}`);
        }

        // 后端已经解析好并返回 JSON 数据
        const tweetData: Tweet = await response.json();
        setLatestTweet(tweetData);

      } catch (err) {
        // 捕获所有错误（调用 API 失败、API 返回错误状态码等）
        setError((err as Error).message);
        console.error('Error fetching tweet from API:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTweet();
  }, [apiEndpoint]); // 依赖项是 apiEndpoint

  // 渲染逻辑（与之前基本相同）
  if (loading) {
    return <div>Loading latest tweet...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  if (!latestTweet) {
    return <div>No tweets found or unable to load.</div>;
  }

  return (
        // 请确保 latestTweet 对象及其属性是安全的，这里移除了我之前添加的部分 ?. 检查以更接近你原代码结构
    <div className="border border-gray-300 p-4 rounded-lg max-w-[400px] mx-auto my-5">
    {/* 确保 link 是有效的 URL */}
    <a href={latestTweet.link.startsWith('http') ? latestTweet.link : '#'} target="_blank" rel="noopener noreferrer">
        {/* 转换 style={{ marginTop: 0 }} 为 className="mt-0" */}
        <h3 className="mt-0">Latest Tweet from @MrYANFD</h3>
    </a>
    {/* 如果 description 字段存在且不为空，并且你想渲染其中的 HTML */}
    {latestTweet.description && (
        // 转换 style={{ maxHeight: '150px', overflowY: 'auto', marginBottom: '10px' }}
        // 为 className="max-h-[150px] overflow-y-auto mb-2.5"
        <div dangerouslySetInnerHTML={{ __html: latestTweet.description }} className="max-h-[150px] overflow-y-auto mb-2.5" />
    )}
    {/* 转换 style={{ fontSize: '0.9em', color: '#555' }} */}
    {/* 为 className="text-sm text-gray-600" */}
    <p className="text-sm text-gray-600">Published: {new Date(latestTweet.pubDate).toLocaleString()}</p>
    {/* 你原先10行里没有 creator 这段，如果不需要显示可以移除 */}
    {/* {latestTweet.creator && (
        <p className="text-sm text-gray-600">Author: {latestTweet.creator}</p>
    )} */}
    </div>
  );
};

export default TwitterLatestTweetCard;