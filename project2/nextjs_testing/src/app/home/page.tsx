"use client"; // 明确标记这是一个 Client Component
import { useState } from "react";
import { twMerge as tw } from "tailwind-merge";
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import MainCard from '@/components/MainCard';
import FeatureCard from '@/components/FeatureCard';
import avatar from '../../../public/next.svg'; // 替换为你的头像路径

export default function tw_testing() {

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex 
        min-h-screen 
        //items-center 
        justify-center 
        border-b-1
        relative
        // --- 使用更明确的直接 CSS 渐变语法背景 ---
        bg-[radial-gradient(ellipse_farthest-corner_at_50%_130%,_rgba(100,116,139,0.5)_0%,_rgba(17,24,39,0.9)_50%,_rgba(0,0,0,1)_80%)]
        // 解释:
        // ellipse_farthest-corner: 椭圆形状，延伸到最远角
        // at_50%_40%: 中心点在水平中点，垂直方向距离顶部 40%
        // rgba(51,65,85,0.5): 起始颜色 (Slate-800 带 50% 透明) 在 0% 位置
        // rgba(17,24,39,0.9): 中间过渡色 (Gray-900 带 90% 透明) 在 60% 位置
        // rgba(0,0,0,1): 结束颜色 (纯黑) 在 100% 位置
        // -----------------------------------
      ">
        <div>

        </div>
        {/* <div className="flex flex-col mx-auto justify-end">
        <MainCard />
        </div> */}
        <div className="absolute left-0 right-0 bottom-[-50px] flex flex-col items-center"> {/* 修改：absolute定位 */}
          <MainCard />
          
        </div>

          

        
      </div>
      {/* 这里是第二个背景 */}
      <div className="flex 
        min-h-screen 
        //items-center 
        justify-center 
        border-b-chart-1
      ">
        <div className="flex flex-col mt-2">
            <div className="text-white p-8 bg-gray-900/50 rounded-lg shadow-xl">
              <h1 className="text-2xl font-bold mb-4">Learn Next.js</h1>
              <p>16 chapters that take you from React to Next.js.</p>
              <button className="mt-6 px-4 py-2 bg-white text-black rounded">Start Learning →</button>
            </div>
        </div>
        
      </div>
      
      

      </div>

    

  );
}

