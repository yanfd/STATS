"use client";

import React from 'react';
import MonochromeFireworks from '@/components/MonochromeFireworks';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import ReactMarkdown from 'react-markdown';

export default function Hughes() {

    const markdownContent = `

> [!NOTE]
>光盘里：系统自检报告 接口说明书 
>~~修改所有文件，把人员按梁总的来~~ 已修改
华为平板的系统配置截图需要打印出来
缺一个智搜的袋子，智搜的那几个东西放到无名称里了，和咱们准备的馆长要求文件一起
ai阅览室那部分可能要换成智叟的，等通知
>

18.103.158.104:81

技术参数文档进行了更新，需要增加封面后重新打印

- [ ] 确认完一遍后需要把“准备好的验收文件”中已修改部分重新打印，放到“需要重新打印的“部分
- [ ] 给静音仓报告做一个封面


    `;


  return (
    <div className="dark min-h-screen text-foreground relative overflow-hidden bg-[radial-gradient(ellipse_farthest-corner_at_50%_130%,_rgba(100,116,139,0.5)_0%,_rgba(17,24,39,0.9)_50%,_rgba(0,0,0,1)_80%)]">
      <MonochromeFireworks />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="backdrop-blur-sm bg-white/5 rounded-3xl border border-white/10 p-12 shadow-2xl">
            {/* <div className="mb-8">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                🎉 彩蛋页面
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-pink-400 mx-auto rounded-full"></div>
            </div> */}
            
            <div className="space-y-6 text-lg leading-relaxed">
     
              
              <div className=" border-white/10">
                <p className="text-white-400 italic">
                  "thank god you can hear my thoughts." 
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  — Me
                </p>
                 <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>12 Aug.</AccordionTrigger>
        <AccordionContent className='font-mono'>

          Send your dreams where nobody hides
          寄送出你的梦，去到无人隐藏之地
          Give your tears to the tide
          将你的泪水，与潮汐相汇
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