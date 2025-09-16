"use client";

import React, { useState, useEffect } from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MonochromeRain from '@/components/MonochromeRain';
import { X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

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
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

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
      
      <div className="relative z-10 min-h-screen p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-white-400 italic text-xl">
              "thank god you can hear my thoughts." 
            </p>
            <p className="text-gray-500 text-sm mt-2">
              — still Me
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-sm text-red-300">
              {error}
            </div>
          )}

          {/* Main Content */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 h-auto md:h-[calc(100vh-200px)] rounded-none">
            {/* Left Panel - Month List */}
            <Card className="w-full md:w-64 backdrop-blur-sm bg-white/5 border-white/10 rounded-none">
              <CardHeader>
                <CardTitle className="text-white/80">月份</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {loading ? (
                  <div className="text-center p-4 text-gray-400">loading...</div>
                ) : (
                  <div className="overflow-y-auto h-auto md:h-[calc(100vh-200px)] ">
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
                  {/* {selectedMonth && groupedMessages[selectedMonth] ? 
                    formatMonth(groupedMessages[selectedMonth].year, groupedMessages[selectedMonth].month) + ' 日志' : 
                    '选择月份查看日志'
                  } */}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center text-gray-400">loading...</div>
                ) : selectedMonth && groupedMessages[selectedMonth] ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 overflow-y-auto h-auto md:h-[calc(100vh-200px)] relative">
                    {groupedMessages[selectedMonth].messages.map((message) => {
                      const isExpanded = selectedMessage?.id === message.id;
                      return (
                        <React.Fragment key={message.id}>
                          <Card 
                            className={`backdrop-blur-sm bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 rounded-none cursor-pointer flex flex-col
                              ${isExpanded ? 'opacity-0' : ''}
                            `}
                            onClick={() => setSelectedMessage(message)}
                          >
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
                          </Card>
                          
                          {/* 展开的覆盖层 */}
                          {isExpanded && (
                            <div 
                              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm text-card-foreground gap-6 border py-6 shadow-sm flex-1 border-white/10 rounded-none"
                              onClick={() => setSelectedMessage(null)}
                            >
                              <Card 
                                className="w-[100%] max-w-4xl h-[100%] backdrop-blur-md bg-white/10 border-white/20 rounded-none overflow-hidden flex flex-col"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <CardHeader className="pb-3 border-b border-white/10">
                                  <div className="flex items-start justify-between">
                                    <div>
                                      <div className="text-3xl font-bold text-white/80 mb-2">
                                        {formatDate(message.date)}
                                      </div>
                                      <CardTitle className="text-xl font-medium text-white/90">
                                        {message.title}
                                      </CardTitle>
                                    </div>
                                    <button 
                                      onClick={() => setSelectedMessage(null)}
                                      className="text-white/60 hover:text-white/90 text-2xl"
                                    >
                                      <X />
                                    </button>
                                  </div>
                                </CardHeader>
                                <CardContent className="flex-1 overflow-y-auto p-6">
                                  <div className="text-base text-white/80 whitespace-pre-line">
                                    {message.content || '(空)'}
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })}
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