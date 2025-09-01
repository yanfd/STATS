"use client";

import React, { useState, useEffect } from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MonochromeRain from '@/components/MonochromeRain';

interface Message {
  id: number;
  date: string;
  title: string;
  content: string;
  timestamp: string;
  year?: number;
  month?: number;
  day?: number;
}

interface MessageGroup {
  year: number;
  month: number;
  messages: Message[];
}

export default function Hughes() {
  const [groupedMessages, setGroupedMessages] = useState<Record<string, MessageGroup>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const fetchMessages = async () => {
    try {
      setError(null);
      // 使用本地API路由避免CORS问题
      const response = await fetch('/api/hughes/messages');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Fetched messages data:', data);
      
      // 获取分组数据
      const groupedResponse = await fetch('/api/hughes/messages/grouped');
      
      if (groupedResponse.ok) {
        const groupedData = await groupedResponse.json();
        console.log('Fetched grouped data:', groupedData);
        setGroupedMessages(groupedData.groups || {});
      }
    } catch (error: any) {
      console.error('Error fetching messages:', error);
      
      // 更详细的错误信息
      setError(`获取数据失败: ${error.message || '请检查网络连接'}`);
      
      // 降级到使用模拟数据
      const mockData = {
        '2024-01': {
          year: 2024,
          month: 1,
          messages: [
            {
              id: 1,
              date: '2024-01-15',
              title: '示例日志',
              content: '这是一条示例日志内容，当无法连接到后端时显示',
              timestamp: '2024-01-15 10:30:00'
            }
          ]
        }
      };
      setGroupedMessages(mockData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const formatMonth = (year: number, month: number) => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${year} ${monthNames[month - 1]}`;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.getDate().toString();
  };

  // 自动选择第一个月份
  useEffect(() => {
    const months = Object.keys(groupedMessages).sort((a, b) => b.localeCompare(a));
    if (months.length > 0 && !selectedMonth) {
      setSelectedMonth(months[0]);
    }
  }, [groupedMessages, selectedMonth]);

  return (
    <div className="dark min-h-screen text-foreground relative overflow-hidden bg-[radial-gradient(ellipse_farthest-corner_at_50%_130%,_rgba(100,116,139,0.5)_0%,_rgba(17,24,39,0.9)_50%,_rgba(0,0,0,1)_80%)]">
      <MonochromeRain />
      
      <div className="relative z-10 min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-white-400 italic text-xl">
              "thank god you can hear my thoughts." 
            </p>
            <p className="text-gray-500 text-sm mt-2">
              — Me
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-sm text-red-300">
              {error}
            </div>
          )}

          {/* Main Content */}
          <div className="flex gap-6 h-[calc(100vh-200px)] rounded-none">
            {/* Left Panel - Month List */}
            <Card className="w-64 backdrop-blur-sm bg-white/5 border-white/10 rounded-none">
              <CardHeader>
                <CardTitle className="text-white/80">月份</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {loading ? (
                  <div className="text-center p-4 text-gray-400">loading...</div>
                ) : (
                  <div className="overflow-y-auto max-h-[calc(100vh-300px)] ">
                    {Object.entries(groupedMessages)
                      .sort((a, b) => b[0].localeCompare(a[0]))
                      .map(([key, group]) => (
                        <Button
                          key={key}
                          variant={selectedMonth === key ? "secondary" : "ghost"}
                          className="w-full justify-start px-4 py-3 hover:bg-white/10"
                          onClick={() => setSelectedMonth(key)}
                        >
                          <div className="flex flex-col items-start">
                            <span className="font-semibold">
                              {formatMonth(group.year, group.month)}
                            </span>
                            <span className="text-xs text-gray-400">
                              {group.messages.length} 条记录
                            </span>
                          </div>
                        </Button>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Right Panel - Daily Content */}
            <Card className="flex-1 backdrop-blur-sm bg-white/5 border-white/10 rounded-none">
              <CardHeader>
                <CardTitle className="text-white/80">
                  {selectedMonth && groupedMessages[selectedMonth] ? 
                    formatMonth(groupedMessages[selectedMonth].year, groupedMessages[selectedMonth].month) + ' 日志' : 
                    '选择月份查看日志'
                  }
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center text-gray-400">loading...</div>
                ) : selectedMonth && groupedMessages[selectedMonth] ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-[calc(100vh-350px)]">
                    {groupedMessages[selectedMonth].messages.map((message) => (
                      <Card key={message.id} className="backdrop-blur-sm bg-white/5 border-white/10 hover:bg-white/10 transition-colors rounded-none">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="text-2xl font-bold text-white/60">
                              {formatDate(message.date)}
                            </div>
                            <div className="text-xs text-gray-500">
                              {message.timestamp?.split(' ')[1] || ''}
                            </div>
                          </div>
                          <CardTitle className="text-sm font-medium text-white/80 mt-2">
                            {message.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Accordion type="single" collapsible>
                            <AccordionItem value="content" className="border-0">
                              <AccordionTrigger className="text-xs text-gray-400 hover:text-white/60 py-1">
                                查看内容
                              </AccordionTrigger>
                              <AccordionContent className="text-sm text-white/70 whitespace-pre-line pt-2">
                                {message.content || '(空)'}
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-400">
                    {Object.keys(groupedMessages).length === 0 ? 
                      '暂无日志数据' : 
                      '请从左侧选择月份'
                    }
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}