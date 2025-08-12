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
}

export default function Hughes() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const markdownContent = `

      Send your dreams where nobody hides
      寄送出你的梦，去到无人隐藏之地
      Give your tears to the tide
      将你的泪水，与潮汐相汇
    `;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/messages.json');
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);


  return (
    <div className="dark min-h-screen text-foreground relative overflow-hidden bg-[radial-gradient(ellipse_farthest-corner_at_50%_130%,_rgba(100,116,139,0.5)_0%,_rgba(17,24,39,0.9)_50%,_rgba(0,0,0,1)_80%)]">
      <MonochromeFireworks />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8 mt-[40vh]">
        <div className="max-w-2xl mx-auto text-center mt-8">
          <div className="backdrop-blur-sm bg-white/5 rounded-3xl border border-white/10 p-12 shadow-2xl">
          
            
            <div className="space-y-6 text-lg leading-relaxed ">
     
              
              <div className=" border-white/10">
                <p className="text-white-400 italic">
                  "thank god you can hear my thoughts." 
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  — Me
                </p>
                
                {/* Messages List */}
                <div className="mt-8 space-y-4">
                  {loading ? (
                    <div className="text-center text-gray-400">加载中...</div>
                  ) : (
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-white/80 ">消息列表</h3>
                      {messages.map((message) => (
                        <Card key={message.id} className="bg-white/5 border-white/10 backdrop-blur-sm">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-white/90 text-lg">{message.title}</CardTitle>
                            <CardDescription className="text-gray-400 text-sm">
                              {message.date}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="text-white/80 whitespace-pre-line text-sm">
                              {message.content}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
                 <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>12 Aug.</AccordionTrigger>
        <AccordionContent className='font-mono'>
            {markdownContent}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>test</AccordionTrigger>
        <AccordionContent>
          <ReactMarkdown>{markdownContent}</ReactMarkdown>
        </AccordionContent>
      </AccordionItem>

    </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}