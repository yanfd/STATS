'use client';

import React, { useState, useEffect } from 'react';
import TerminalLoader from '@/components/TerminalLoader';

const TerminalPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 模拟加载过程
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 6000); // 6秒后显示内容

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <TerminalLoader />;
  }

  return (
    <div className="min-h-screen bg-black p-4 font-mono text-xs md:text-sm">
      <div className="max-w-6xl mx-auto pt-8">
        
        {/* 简化的终端窗口 */}
        <div className="bg-gray-950 border border-gray-700 rounded-lg overflow-hidden">
          {/* 窗口标题栏 */}
          <div className="bg-gray-900 p-3 flex items-center justify-between">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full hover:opacity-80 cursor-pointer"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full hover:opacity-80 cursor-pointer"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full hover:opacity-80 cursor-pointer"></div>
            </div>
            <div className="text-gray-500 text-xs">yanfd@terminal</div>
          </div>
          
          {/* 终端内容 */}
          <div className="p-6 space-y-4">
            {/* 欢迎信息 */}
            <div className="text-green-400">
              <pre className="text-xs md:text-sm">{`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║     ██╗   ██╗ █████╗ ███╗   ██╗███████╗██████╗             ║
║     ╚██╗ ██╔╝██╔══██╗████╗  ██║██╔════╝██╔══██╗            ║
║      ╚████╔╝ ███████║██╔██╗ ██║█████╗  ██║  ██║            ║
║       ╚██╔╝  ██╔══██║██║╚██╗██║██╔══╝  ██║  ██║            ║
║        ██║   ██║  ██║██║ ╚████║██║     ██████╔╝             ║
║        ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝     ╚═════╝             ║
║                                                              ║
║                    Welcome to my terminal                    ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝`}</pre>
            </div>

            {/* 系统信息 */}
            <div>
              <div className="mb-2">
                <span className="text-blue-400">╭─</span>
                <span className="text-cyan-400">yanfd</span>
                <span className="text-gray-500">@</span>
                <span className="text-green-400">dev</span>
                <span className="text-gray-500"> in </span>
                <span className="text-yellow-400">~/projects</span>
                <span className="text-gray-500"> on </span>
                <span className="text-red-400">main</span>
              </div>
              <div className="mb-3">
                <span className="text-blue-400">╰─</span>
                <span className="text-gray-400">❯ </span>
                <span className="text-white">neofetch</span>
              </div>
            </div>

            {/* 系统状态 */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="text-cyan-400">System Info:</div>
                <div className="ml-4 space-y-1 text-gray-300">
                  <div><span className="text-green-400">OS:</span> macOS Sequoia</div>
                  <div><span className="text-green-400">Shell:</span> zsh 5.9</div>
                  <div><span className="text-green-400">Terminal:</span> iTerm2</div>
                  <div><span className="text-green-400">Node:</span> v20.10.0</div>
                  <div><span className="text-green-400">npm:</span> 10.2.3</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-cyan-400">Current Projects:</div>
                <div className="ml-4 space-y-1 text-gray-300">
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-400">📦</span>
                    <span>Next.js Application</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-400">🌱</span>
                    <span>Tailwind CSS v4</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-400">⚡</span>
                    <span>TypeScript</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-purple-400">🎨</span>
                    <span>Framer Motion</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 命令提示符 */}
            <div className="mt-6">
              <div className="mb-2">
                <span className="text-blue-400">╭─</span>
                <span className="text-cyan-400">yanfd</span>
                <span className="text-gray-500">@</span>
                <span className="text-green-400">dev</span>
                <span className="text-gray-500"> in </span>
                <span className="text-yellow-400">~/projects</span>
                <span className="text-gray-500"> on </span>
                <span className="text-red-400">main</span>
              </div>
              <div className="flex items-center">
                <span className="text-blue-400">╰─</span>
                <span className="text-gray-400">❯ </span>
                <span className="text-white ml-1">_</span>
                <span className="animate-pulse ml-0.5 inline-block w-2 h-4 bg-green-400"></span>
              </div>
            </div>
          </div>
        </div>

        {/* 快捷命令 */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { cmd: 'ls -la', desc: 'List files' },
            { cmd: 'git status', desc: 'Check status' },
            { cmd: 'npm run dev', desc: 'Start dev' },
            { cmd: 'code .', desc: 'Open editor' },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-900 border border-gray-700 rounded p-3 hover:border-green-400 transition-colors cursor-pointer group"
            >
              <div className="text-green-400 font-mono text-sm group-hover:text-green-300">
                $ {item.cmd}
              </div>
              <div className="text-gray-500 text-xs mt-1">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TerminalPage;