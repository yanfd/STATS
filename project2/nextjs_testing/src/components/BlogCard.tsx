'use client';

import React, { useEffect, useState } from 'react';
import Parser from 'rss-parser';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import Link from 'next/link'; // 导入 Link 组件
import { Button } from '@/components/ui/button'; // 仍然导入 Button，但可能不再需要 as prop

interface Enclosure {
  url: string;
  length?: string | number | undefined;
  type?: string;
}

interface Image {
  url?: string;
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

const BlogCard = () => {
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
        setError('');
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>LOADING...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!latestPost) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
        <CardTitle className="font-mono text-2xl font-medium ">LATEST BLOG</CardTitle>
        <span>
          {new Date(latestPost.isoDate).toLocaleDateString('en-US').slice(0,3)}
          <span className="ml-1 text-sm font-normal text-muted-foreground">
            {new Date(latestPost.isoDate).toLocaleDateString().slice(6,10)}
          </span>
        </span>
      </CardHeader>

      <CardContent className="">
        <span className='font-mono text-sm'>{latestPost.title.toUpperCase()}</span>
        <CardDescription className="text-sm">
        {latestPost.contentSnippet ? latestPost.contentSnippet.substring(0, 200) : ''}
        {latestPost.contentSnippet && latestPost.contentSnippet.length > 200 ? '...' : ''}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-center"> {/* 设置 CardFooter 为 flex 容器并居中 */}
        <Link href={latestPost.link} target="_blank" rel="noopener noreferrer" className="w-full"> {/* 让 Link 占据 CardFooter 的宽度 */}
          <Button className="w-full" size="sm">
            CHECK THIS OUT!
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;