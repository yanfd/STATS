'use client';

import React from 'react';

const TerminalPage = () => {
  return (
    <div className="min-h-screen bg-black p-2 md:p-4 font-mono text-xs md:text-sm">
      <div className="grid lg:grid-cols-2 lg:grid-rows-2 gap-2 md:gap-4 h-screen">
        
        {/* Top Left Block */}
        <div className="group relative bg-gray-950 border border-gray-700 hover:border-gray-500 transition-colors duration-200 p-3 md:p-4 overflow-hidden lg:row-span-1 lg:col-span-1">
          <div className="absolute top-3 left-3 flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          
          <div className="mt-8 text-gray-300">
            <div className="mb-2">
              <span className="text-blue-400">╭─</span>
              <span className="text-cyan-400">yanfd</span>
              <span className="text-gray-500">@</span>
              <span className="text-green-400">dev</span>
              <span className="text-gray-500"> in </span>
              <span className="text-yellow-400">~/project</span>
              <span className="text-gray-500"> on </span>
              <span className="text-red-400">main</span>
            </div>
            <div className="mb-3">
              <span className="text-blue-400">╰─</span>
              <span className="text-gray-400">❯ </span>
              <span className="text-white">local branch = </span>
              <span className="text-green-400">"main"</span>
            </div>
            
            <div className="mb-2">
              <span className="text-orange-400">📁 from start</span>
            </div>
            <div className="mb-2">
              <span className="text-gray-400">🔸 literal character: "</span>
              <span className="text-cyan-400">h</span>
              <span className="text-gray-400">"</span>
            </div>
            <div className="mb-2">
              <span className="text-gray-400">🔸 literal character: "</span>
              <span className="text-cyan-400">e</span>
              <span className="text-gray-400">"</span>
            </div>
            <div className="mb-2">
              <span className="text-gray-400">🔸 literal character: "</span>
              <span className="text-cyan-400">l</span>
              <span className="text-gray-400">"</span>
            </div>
            <div className="mb-2">
              <span className="text-gray-400">🔸 literal character: "</span>
              <span className="text-cyan-400">l</span>
              <span className="text-gray-400">"</span>
            </div>
            <div className="mb-4">
              <span className="text-gray-400">🔸 literal character: "</span>
              <span className="text-cyan-400">o</span>
              <span className="text-gray-400">"</span>
            </div>
            
            <div className="mb-2">
              <span className="text-purple-400">local match_2 = </span>
              <span className="text-yellow-400">string.find</span>
              <span className="text-white">(example, </span>
              <span className="text-green-400">"hello"</span>
              <span className="text-white">)</span>
            </div>
            <div className="ml-4">
              <div className="bg-gray-900 p-3 rounded border border-gray-700">
                <span className="text-cyan-400">▶ Character set</span>
                <div className="ml-4 text-xs md:text-sm">
                  <span className="text-gray-400">🔸 Character class: "</span>
                  <span className="text-green-400">a</span>
                  <span className="text-gray-400">"</span>
                </div>
                <div className="ml-4 text-xs md:text-sm">
                  <span className="text-gray-400">🔸 Character range: </span>
                  <span className="text-green-400">a-z</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Left Block */}
        <div className="group relative bg-gray-950 border border-gray-700 hover:border-gray-500 transition-colors duration-200 p-3 md:p-4 overflow-hidden lg:row-span-1 lg:col-span-1">
          <div className="absolute top-3 left-3 flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          
          <div className="mt-8 text-gray-300">
            <div className="mb-2">
              <span className="text-blue-400">╭─</span>
              <span className="text-cyan-400">root</span>
              <span className="text-gray-500">@</span>
              <span className="text-green-400">server</span>
              <span className="text-gray-500"> in </span>
              <span className="text-yellow-400">~/project</span>
              <span className="text-gray-500"> on </span>
              <span className="text-red-400">dev</span>
            </div>
            <div className="mb-3">
              <span className="text-blue-400">╰─</span>
              <span className="text-gray-400">❯ </span>
              <span className="text-white">npm install</span>
            </div>
            
            <div className="mb-2">
              <span className="text-gray-500">Installing dependencies...</span>
            </div>
            <div className="mb-2">
              <span className="text-green-400">✓ </span>
              <span className="text-white">react@18.2.0</span>
            </div>
            <div className="mb-2">
              <span className="text-green-400">✓ </span>
              <span className="text-white">next@15.0.0</span>
            </div>
            <div className="mb-2">
              <span className="text-green-400">✓ </span>
              <span className="text-white">tailwindcss@4.0.0</span>
            </div>
            <div className="mb-4">
              <span className="text-green-400">✓ </span>
              <span className="text-white">typescript@5.0.0</span>
            </div>
            
            <div className="mb-2">
              <span className="text-blue-400">╭─</span>
              <span className="text-cyan-400">root</span>
              <span className="text-gray-500">@</span>
              <span className="text-green-400">server</span>
              <span className="text-gray-500"> in </span>
              <span className="text-yellow-400">~/project</span>
              <span className="text-gray-500"> on </span>
              <span className="text-red-400">dev</span>
            </div>
            <div className="mb-3">
              <span className="text-blue-400">╰─</span>
              <span className="text-gray-400">❯ </span>
              <span className="text-white">npm run dev</span>
            </div>
            
            <div className="mb-2">
              <span className="text-gray-500">Starting development server...</span>
            </div>
            <div className="mb-2">
              <span className="text-cyan-400">▶ Local: </span>
              <span className="text-blue-400">http://localhost:3000</span>
            </div>
            <div className="mb-2">
              <span className="text-cyan-400">▶ Network: </span>
              <span className="text-blue-400">http://192.168.1.100:3000</span>
            </div>
            <div className="mb-2">
              <span className="text-green-400">✓ Ready in </span>
              <span className="text-white">1.2s</span>
            </div>
          </div>
        </div>

        {/* Right Block (spans 2 rows) */}
        <div className="group relative bg-gray-950 border border-gray-700 hover:border-gray-500 transition-colors duration-200 p-3 md:p-4 overflow-hidden lg:row-span-2 lg:col-span-1 lg:row-start-1 lg:col-start-2">
          <div className="absolute top-3 left-3 flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          
          <div className="absolute top-3 right-3">
            <span className="text-gray-600 text-xs font-bold">GitHub</span>
          </div>
          
          <div className="mt-8 text-gray-300">
            <div className="mb-4">
              <span className="text-blue-400">Tree-sitter based </span>
              <span className="text-yellow-400">Lua</span>
              <span className="text-blue-400"> patterns & </span>
              <span className="text-yellow-400">Regex</span>
              <span className="text-blue-400"> explainer and tester. Shows pattern explanations either through hovering or commands.</span>
            </div>
            <div className="mb-4">
              <span className="text-blue-400">Also comes with it's own </span>
              <span className="text-yellow-400">tree-sitter</span>
              <span className="text-blue-400"> server to test patterns.</span>
            </div>
            
            <div className="space-y-3">
              <div className="border-l-2 border-blue-500 pl-3">
                <span className="text-orange-400">📦 Featured projects</span>
              </div>
              
              <div className="ml-4 space-y-2 text-xs md:text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-400">🎬</span>
                  <span className="text-cyan-400">Neovim plugin</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">🌳</span>
                  <span className="text-cyan-400">Tree-sitter parser</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-purple-400">📝</span>
                  <span className="text-cyan-400">Website</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-red-400">📚</span>
                  <span className="text-cyan-400">CLI</span>
                </div>
              </div>
              
              <div className="mt-6 p-3 bg-gray-900 rounded border border-gray-700">
                <div className="mb-2 text-xs md:text-sm">
                  <span className="text-yellow-400">Hackable</span>
                  <span className="text-white"> markdown, </span>
                  <span className="text-yellow-400">typst, </span>
                  <span className="text-yellow-400">LaTeX</span>
                  <span className="text-white"> & </span>
                  <span className="text-yellow-400">YAML</span>
                  <span className="text-white"> previewer.</span>
                </div>
                <div className="mb-2 text-xs md:text-sm">
                  <span className="text-cyan-400">Fancy </span>
                  <span className="text-yellow-400">Video/Math</span>
                  <span className="text-cyan-400"> file previewer.</span>
                </div>
                <div className="mb-2 text-xs md:text-sm">
                  <span className="text-green-400">Lua patterns & Regex explainer & tester with a focus on extensibility.</span>
                </div>
                <div className="mb-2 text-xs md:text-sm">
                  <span className="text-purple-400">A feature-rich tree-sitter server for the CLI video recorder.</span>
                </div>
                <div className="text-xs md:text-sm">
                  <span className="text-orange-400">A simple portfolio-style website built entirely on a phone!</span>
                </div>
                <div className="mt-2 text-xs">
                  <span className="text-gray-500">Setup profiles</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TerminalPage;