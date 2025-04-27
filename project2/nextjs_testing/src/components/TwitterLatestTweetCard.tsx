import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

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
        {/* 保持这个静态标题，它不是可点击的部分 */}
        {/* 添加 mb-2 给下方可点击的标题留出空间 */}
        <h3 className="mt-0 text-lg font-semibold text-gray-800 mb-2">
          Latest Tweet from @MrYANFD
        </h3>
      
        {/* *** 使用 a 标签包裹 Button，并使用 Button 的样式作为链接 *** */}
        {/* 确保 latestTweet 存在 */}
        {latestTweet && (
          <a
            href={latestTweet.link?.startsWith('http') ? latestTweet.link : '#'} // 安全访问 link 属性
            target="_blank"
            rel="noopener noreferrer"
            className="block" // 让整个链接区域是块级的，方便点击
          >
            {/* 使用 Button 组件，设置 variant 和 className 来控制样式 */}
            {/* asChild 属性会使 Button 组件渲染为其子元素 (a 标签) 而不是 <button> 标签，从而保留 a 标签的链接功能 */}
            {/* variant="link" 提供链接的默认按钮样式 */}
            {/* className="p-0 h-auto text-left block" 移除默认 Button 内边距和高度，让其内容决定大小，文本左对齐，并确保它像块级元素一样排版 */}
            <Button variant="link" className="p-0 h-auto text-left block" asChild>
               {/* 将推文标题放在 Button 里面 */}
               {/* 安全访问 title 属性 */}
               <span>{latestTweet.title || 'Loading Tweet Title...'}</span>
            </Button>
          </a>
        )}
      
      
        {/* Description with Tailwind styles */}
        {latestTweet?.description && ( // 确保 latestTweet 和 description 存在
          <div
            dangerouslySetInnerHTML={{ __html: latestTweet.description }}
            className="max-h-[150px] overflow-y-auto mb-2.5 break-words text-sm text-gray-700 mt-2" // 添加 mt-2 与上方标题分隔
          />
        )}
      
        {/* Published date with Tailwind styles */}
        {latestTweet?.pubDate && ( // 确保 pubDate 存在再显示这行
            <p className="text-sm text-gray-600 mt-2">
              Published: {new Date(latestTweet.pubDate).toLocaleString()}
            </p>
        )}
      
      
         {latestTweet?.creator && ( // 如果 creator 字段也存在并需要显示
            <p className="text-sm text-gray-600">Author: {latestTweet.creator}</p>
         )}
         </div>
  );
};

export default TwitterLatestTweetCard;