"use client";

import React, { useState, useEffect } from 'react';
import MonochromeFireworks from '@/components/MonochromeFireworks';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  const [messages, setMessages] = useState<Message[]>([]);
  const [groupedMessages, setGroupedMessages] = useState<Record<string, MessageGroup>>({});
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grouped'>('list');

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  const fetchMessages = async () => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/hughes/messages`);
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      const data = await response.json();
      setMessages(data.messages || []);
      setLastSync(data.last_sync);
      
      // 获取分组数据
      const groupedResponse = await fetch(`${API_BASE_URL}/api/hughes/messages/grouped`);
      if (groupedResponse.ok) {
        const groupedData = await groupedResponse.json();
        setGroupedMessages(groupedData.groups || {});
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('无法连接到后端服务，请确保FastAPI服务正在运行');
      
      // 降级到读取本地JSON文件
      try {
        const localResponse = await fetch('/messages.json');
        const localData = await localResponse.json();
        setMessages(localData);
      } catch (localError) {
        console.error('Error fetching local messages:', localError);
      }
    } finally {
      setLoading(false);
    }
  };

  const syncFromGitHub = async () => {
    try {
      setSyncing(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/hughes/sync`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Sync failed');
      }
      const data = await response.json();
      console.log('Sync result:', data);
      
      // 同步后重新获取数据
      await fetchMessages();
    } catch (error: any) {
      console.error('Error syncing:', error);
      setError(error.message || '同步失败，请检查GitHub Token配置');
    } finally {
      setSyncing(false);
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

  return (
    <div className="dark min-h-screen text-foreground relative overflow-hidden bg-[radial-gradient(ellipse_farthest-corner_at_50%_130%,_rgba(100,116,139,0.5)_0%,_rgba(17,24,39,0.9)_50%,_rgba(0,0,0,1)_80%)]">
      <MonochromeFireworks />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8 mt-[40vh]">
        <div className="max-w-2xl mx-auto text-center mt-8">
          <div className="backdrop-blur-sm bg-white/5 rounded-3xl border border-white/10 p-12 shadow-2xl">
            
            <div className="space-y-6 text-lg leading-relaxed">
              
              <div className="border-white/10">
                <p className="text-white-400 italic">
                  "thank god you can hear my thoughts." 
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  — Me
                </p>
                
                {/* Sync Controls */}
                <div className="mt-4 mb-6 flex items-center justify-between">
                  <div className="flex gap-2">
                    <button
                      onClick={syncFromGitHub}
                      disabled={syncing}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50 text-sm"
                    >
                      {syncing ? '同步中...' : '从GitHub同步'}
                    </button>
                    <button
                      onClick={() => setViewMode(viewMode === 'list' ? 'grouped' : 'list')}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm"
                    >
                      {viewMode === 'list' ? '按月分组' : '列表视图'}
                    </button>
                  </div>
                  {lastSync && (
                    <p className="text-xs text-gray-500">
                      最后同步: {new Date(lastSync).toLocaleString('zh-CN')}
                    </p>
                  )}
                </div>

                {/* Error Display */}
                {error && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-300">
                    {error}
                  </div>
                )}
                
                {/* Messages List */}
                <div className="mt-8 space-y-4">
                  {loading ? (
                    <div className="text-center text-gray-400">加载中...</div>
                  ) : viewMode === 'list' ? (
                    <div className="space-y-4 font-mono">
                      <h3 className="text-xl font-semibold text-white/80">LIST</h3>
                      {messages.length === 0 ? (
                        <div className="text-center text-gray-400">
                          暂无日志，点击"从GitHub同步"获取数据
                        </div>
                      ) : (
                        messages.map((message) => (
                          <Accordion type='single' collapsible key={message.id}>
                            <AccordionItem value="item-1">
                              <AccordionTrigger>
                                {message.title}&nbsp;&nbsp;&nbsp;&nbsp;{message.date}
                              </AccordionTrigger>
                              <AccordionContent className='font-mono whitespace-pre-line text-left'>
                                {message.content || '(空)'}
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        ))
                      )}
                    </div>
                  ) : (
                    <div className="space-y-6 font-mono">
                      <h3 className="text-xl font-semibold text-white/80">GROUPED BY MONTH</h3>
                      {Object.keys(groupedMessages).length === 0 ? (
                        <div className="text-center text-gray-400">
                          暂无日志，点击"从GitHub同步"获取数据
                        </div>
                      ) : (
                        Object.entries(groupedMessages)
                          .sort((a, b) => b[0].localeCompare(a[0]))
                          .map(([key, group]) => (
                            <div key={key} className="space-y-2">
                              <h4 className="text-lg font-semibold text-white/60 mb-3">
                                {formatMonth(group.year, group.month)}
                              </h4>
                              {group.messages.map((message) => (
                                <Accordion type='single' collapsible key={message.id}>
                                  <AccordionItem value="item-1">
                                    <AccordionTrigger className="text-sm">
                                      {message.title}&nbsp;&nbsp;&nbsp;&nbsp;{message.date}
                                    </AccordionTrigger>
                                    <AccordionContent className='font-mono whitespace-pre-line text-left text-sm'>
                                      {message.content || '(空)'}
                                    </AccordionContent>
                                  </AccordionItem>
                                </Accordion>
                              ))}
                            </div>
                          ))
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}