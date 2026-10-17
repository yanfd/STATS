'use client';

import React, { useEffect, useState } from 'react';
import Parser from 'rss-parser';

interface Enclosure {
  url: string;
  length?: string | number | undefined;
  type?: string;
}

interface Image {
  url?: string; // 图片 URL 可能不存在
  title?: string;
  link?: string;
}

interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  contentSnippet: string;
  isoDate: string;
  enclosure?: Enclosure;
  image?: Image;
  imageUrl?: string;
}

const parser = new Parser();

async function fetchLatestPostFromRss(): Promise<BlogPost | null> {
  try {
    const feed = await parser.parseURL('https://www.yanfd.tech/atom.xml');
    const latestPost = feed.items[0];

    // 优先使用 image 标签中的 url，如果不存在则使用 enclosure 的 url
    let imageUrl: string | undefined = latestPost?.image?.url || latestPost?.enclosure?.url;

    return {
      title: latestPost?.title || '',
      link: latestPost?.link || '',
      pubDate: latestPost?.pubDate || '',
      content: latestPost?.content || '',
      contentSnippet: latestPost?.contentSnippet || '',
      isoDate: latestPost?.isoDate || '',
      enclosure: latestPost?.enclosure,
      image: latestPost?.image,
      imageUrl: imageUrl || '',
    };
  } catch (error) {
    console.error('Error fetching or parsing RSS feed:', error);
    return null;
  }
}

export default function RssTestingPage() {
  const [latestPost, setLatestPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await fetchLatestPostFromRss();
      setLatestPost(data);
      setLoading(false);
      if (!data) {
        setError('Failed to fetch latest post.');
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>加载中...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!latestPost) {
    return <div>无法获取最新推文。</div>;
  }

  return (
    <div className="latest-post-container">
      {latestPost.imageUrl && (
        <div className="image-container">
          <img src={latestPost.imageUrl} alt={latestPost.title} />
        </div>
      )}
      <div className="content">
        <h2>
          <a href={latestPost.link} target="_blank" rel="noopener noreferrer">
            {latestPost.title}
          </a>
        </h2>
        <p className="publish-date">{latestPost.isoDate}</p>
        <p className="excerpt">{latestPost.contentSnippet}</p>
      </div>

      <style jsx>{`
        .latest-post-container {
          width: 100%;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          /* 可以根据需要调整布局 */
        }

        .image-container {
          width: 100%;
          /* 可以设置固定高度或根据图片比例 */
          overflow: hidden;
        }

        .image-container img {
          display: block;
          width: 100%;
          height: auto;
          object-fit: cover; /* 保证图片覆盖容器，可能会裁剪 */
        }

        .content {
          padding: 20px;
          color: #333;
        }

        h2 {
          margin-top: 0;
          margin-bottom: 10px;
          font-size: 1.5rem;
        }

        .publish-date {
          font-size: 0.8rem;
          color: #777;
          margin-bottom: 15px;
        }

        .excerpt {
          font-size: 1rem;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
}