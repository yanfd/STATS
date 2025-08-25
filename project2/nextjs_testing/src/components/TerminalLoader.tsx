'use client';

import React from 'react';

const TerminalLoader = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="relative">
        {/* SVG 动画 */}
        <svg
          width="400"
          height="300"
          viewBox="0 0 400 300"
          className="w-full max-w-md"
        >
          {/* 终端窗口背景 */}
          <rect
            x="10"
            y="10"
            width="380"
            height="280"
            rx="8"
            fill="#0a0a0a"
            stroke="#333"
            strokeWidth="2"
          />
          
          {/* 窗口顶部栏 */}
          <rect
            x="10"
            y="10"
            width="380"
            height="30"
            rx="8"
            fill="#1a1a1a"
          />
          
          {/* 窗口控制按钮 */}
          <circle cx="30" cy="25" r="5" fill="#ff5f56">
            <animate
              attributeName="opacity"
              values="1;0.5;1"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="50" cy="25" r="5" fill="#ffbd2e">
            <animate
              attributeName="opacity"
              values="1;0.5;1"
              dur="2s"
              begin="0.5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="70" cy="25" r="5" fill="#27c93f">
            <animate
              attributeName="opacity"
              values="1;0.5;1"
              dur="2s"
              begin="1s"
              repeatCount="indefinite"
            />
          </circle>
          
          {/* 终端文字动画 - 第一行 */}
          <text x="25" y="70" fill="#00ff00" fontFamily="monospace" fontSize="14">
            <tspan>
              $
              <animate
                attributeName="opacity"
                values="0;1"
                dur="0.5s"
                fill="freeze"
              />
            </tspan>
            <tspan dx="10">
              npm run dev
              <animate
                attributeName="opacity"
                values="0;0;1"
                dur="2s"
                fill="freeze"
              />
            </tspan>
          </text>
          
          {/* Loading 动画文字 */}
          <text x="25" y="100" fill="#0EA5E9" fontFamily="monospace" fontSize="14">
            <tspan>
              ⚡ Starting server
              <animate
                attributeName="opacity"
                values="0;0;0;1"
                dur="3s"
                fill="freeze"
              />
            </tspan>
          </text>
          
          {/* 进度条容器 */}
          <rect
            x="25"
            y="120"
            width="350"
            height="6"
            rx="3"
            fill="#1a1a1a"
            opacity="0"
          >
            <animate
              attributeName="opacity"
              values="0;0;0;0;1"
              dur="3.5s"
              fill="freeze"
            />
          </rect>
          
          {/* 进度条 */}
          <rect
            x="25"
            y="120"
            width="0"
            height="6"
            rx="3"
            fill="#00ff00"
          >
            <animate
              attributeName="width"
              values="0;0;0;0;350"
              dur="5s"
              fill="freeze"
            />
          </rect>
          
          {/* Ready 文字 */}
          <text x="25" y="150" fill="#00ff00" fontFamily="monospace" fontSize="14">
            <tspan>
              ✓ Ready on http://localhost:3000
              <animate
                attributeName="opacity"
                values="0;0;0;0;0;0;1"
                dur="5.5s"
                fill="freeze"
              />
            </tspan>
          </text>
          
          {/* 闪烁的光标 */}
          <rect x="25" y="160" width="10" height="20" fill="#00ff00">
            <animate
              attributeName="opacity"
              values="1;0;1;0;1"
              dur="1s"
              repeatCount="indefinite"
              begin="5.5s"
            />
          </rect>
          
          {/* 矩阵雨效果 */}
          {[...Array(10)].map((_, i) => (
            <text
              key={i}
              x={40 + i * 35}
              y="0"
              fill="#00ff0088"
              fontFamily="monospace"
              fontSize="12"
              opacity="0.3"
            >
              {String.fromCharCode(65 + Math.floor(Math.random() * 26))}
              <animate
                attributeName="y"
                values="-20;320"
                dur={`${3 + i * 0.5}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0;0.5;0.8;0.5;0"
                dur={`${3 + i * 0.5}s`}
                repeatCount="indefinite"
              />
            </text>
          ))}
          
          {/* 扫描线效果 */}
          <rect
            x="10"
            y="40"
            width="380"
            height="2"
            fill="url(#scanGradient)"
          >
            <animate
              attributeName="y"
              values="40;280;40"
              dur="3s"
              repeatCount="indefinite"
            />
          </rect>
          
          {/* 渐变定义 */}
          <defs>
            <linearGradient id="scanGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00ff00" stopOpacity="0" />
              <stop offset="50%" stopColor="#00ff00" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00ff00" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Loading 文字 */}
        <div className="text-center mt-8">
          <div className="text-green-400 font-mono text-lg">
            Initializing
            <span className="inline-block ml-1">
              <span className="animate-pulse">.</span>
              <span className="animate-pulse animation-delay-200">.</span>
              <span className="animate-pulse animation-delay-400">.</span>
            </span>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-400 {
          animation-delay: 400ms;
        }
      `}</style>
    </div>
  );
};

export default TerminalLoader;