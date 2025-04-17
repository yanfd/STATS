"use client"; // 明确标记这是一个 Client Component
import MainCard from '@/components/MainCard';
import Navbar from '@/components/Navbar';
import PaintCanvas from '@/components/PaintCanvas'; 


export default function tw_testing() {
  

  return (
    <div className="min-h-screen">
      {/* 第1个背景 */}
      <Navbar />
      <div className="flex min-h-screen justify-center border-b-1 relative
        bg-[radial-gradient(ellipse_farthest-corner_at_50%_130%,_rgba(100,116,139,0.5)_0%,_rgba(17,24,39,0.9)_50%,_rgba(0,0,0,1)_80%)]
      ">
        <div className='flex flex-col-reverse'>
        <MainCard />
        </div>
      
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

      {/* 第3个背景 */}
      <div>
      <div className="flex-grow flex justify-center items-center">
        <PaintCanvas initialColor="#FF0000" initialTool="eraser" />
      </div>
    
      </div>
      
    </div>
  );
}