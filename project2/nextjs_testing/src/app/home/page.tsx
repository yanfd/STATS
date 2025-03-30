"use client"; // 明确标记这是一个 Client Component
import Navbar from '@/components/Navbar';
import MainCard from '@/components/MainCard';
import FlipCard from '@/components/Flipcard';
import { useEffect, useRef, useState } from 'react';

export default function tw_testing() {
  const flipCardContainerRef = useRef<HTMLDivElement>(null);
  const [isSpreadOut, setIsSpreadOut] = useState(false);
  const numberOfCards = 5;
  const spreadDistance = 150; // 控制卡片分散的距离

  const cardPositions = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const container = flipCardContainerRef.current;
    if (container) {
      cardPositions.current = Array.from(container.children) as HTMLElement[];
      updateCardPositions(isSpreadOut);
    }
  }, [isSpreadOut]);

  const updateCardPositions = (spreadOut: boolean) => {
    cardPositions.current.forEach((card, index) => {
      if (spreadOut) {
        let translateX = 0;
        let translateY = 0;

        // 根据索引分配大致的方向和偏移量
        if (index === 0) { // 左上
          translateX = -spreadDistance;
          translateY = -spreadDistance / 2;
        } else if (index === 1) { // 稍微靠左上
          translateX = -spreadDistance / 2;
          translateY = -spreadDistance / 4;
        } else if (index === 2) { // 中间（稍微向上）
          translateY = -spreadDistance / 4;
        } else if (index === 3) { // 稍微靠右上
          translateX = spreadDistance / 2;
          translateY = -spreadDistance / 4;
        } else if (index === 4) { // 右上
          translateX = spreadDistance;
          translateY = -spreadDistance / 2;
        }

        card.style.transform = `translate(${translateX}px, ${translateY}px)`;
        card.style.opacity = '1';
        card.style.transition = 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out';
      } else {
        card.style.transform = 'translate(0px, 0px)';
        card.style.opacity = '0';
        card.style.transition = 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out';
      }
    });
  };

  const toggleSpread = () => {
    setIsSpreadOut(!isSpreadOut);
  };

  return (
    <div className="min-h-screen">
      {/* 第1个背景 */}
      <Navbar />
      <div className="flex min-h-screen justify-center border-b-1 relative
        bg-[radial-gradient(ellipse_farthest-corner_at_50%_130%,_rgba(100,116,139,0.5)_0%,_rgba(17,24,39,0.9)_50%,_rgba(0,0,0,1)_80%)]
      ">
        {/* 翻转卡片容器 */}
        <div ref={flipCardContainerRef} className="relative flex justify-center items-center mt-20">
          {Array.from({ length: numberOfCards }).map((_, index) => (
            <div key={index} className="absolute opacity-0 transition-transform duration-500 ease-in-out">
              <FlipCard />
            </div>
          ))}
        </div>

        {/* 主卡片 */}
        <div className="absolute left-0 right-0 bottom-[-50px] flex flex-col items-center">
          <MainCard />
        </div>

        {/* 控制展开/收起的按钮 */}
        <button onClick={toggleSpread} className="absolute top-16 right-8 bg-gray-700 text-white py-2 px-4 rounded-md">
          {isSpreadOut ? '收起' : '展开'}
        </button>
      </div>
      {/* 第2个背景 */}
      <div className="flex min-h-screen justify-center border-b-chart-1">
        <div className="flex flex-col mt-20 items-center"> {/* 使用 items-center 使内容居中 */}
          <div className="text-white p-8 bg-gray-900/50 rounded-lg shadow-xl my-1">
            <h1 className="text-2xl font-bold mb-4">Learn Next.js</h1>
            <p>16 chapters that take you from React to Next.js.</p>
            <button className="mt-6 px-4 py-2 bg-white text-black rounded">Start Learning →</button>
          </div>
          <div className="text-white p-8 bg-gray-900/50 rounded-lg shadow-xl my-1">
            <h1 className="text-2xl font-bold mb-4">Learn Next.js</h1>
            <p>16 chapters that take you from React to Next.js.</p>
            <button className="mt-6 px-4 py-2 bg-white text-black rounded">Start Learning →</button>
          </div>
          <div className="text-white p-8 bg-gray-900/50 rounded-lg shadow-xl my-1">
            <h1 className="text-2xl font-bold mb-4">Learn Next.js</h1>
            <p>16 chapters that take you from React to Next.js.</p>
            <button className="mt-6 px-4 py-2 bg-white text-black rounded">Start Learning →</button>
          </div>
        </div>
      </div>
    </div>
  );
}