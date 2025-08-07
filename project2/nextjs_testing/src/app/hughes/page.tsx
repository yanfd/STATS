"use client";

import React from 'react';
import MonochromeFireworks from '@/components/MonochromeFireworks';

export default function Hughes() {
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
              {/* <p className="text-gray-200">
                thank god you can hear my thoughts.
              </p> */}
              
              <div className=" border-white/10">
                <p className="text-white-400 italic">
                  "thank god you can hear my thoughts." 
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  — Me
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}