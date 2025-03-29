"use client";

import React, { useState, useEffect, useRef } from 'react';

const TiltCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    const content = contentRef.current;

    if (card && glow && content) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const percentX = (x - centerX) / centerX;
        const percentY = -((y - centerY) / centerY);

        card.style.transform = `perspective(1000px) rotateY(${percentX * 10}deg) rotateX(${percentY * 10}deg)`;
        if (content) {
          content.style.transform = `translateZ(50px)`; // 对内容应用基础的 Z 轴位移

          // 获取内容的所有直接子元素并应用微小的 Z 轴位移
          Array.from(content.children).forEach((child: Element) => {
            const depth = 10; // 控制浮动的强度
            const translateX = (x - centerX) * 0.02; // 微调 X 轴位移
            const translateY = (y - centerY) * 0.02; // 微调 Y 轴位移
            (child as HTMLElement).style.transform = `translateZ(${depth}px) translateX(${translateX}px) translateY(${translateY}px)`;
          });
        }
        glow.style.opacity = '1';
        glow.style.backgroundImage = `
          radial-gradient(
            circle at
            ${x}px ${y}px,
            #ffffff44,
            #0000000f
          )
        `;
      };

      const handleMouseLeave = () => {
        card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
        if (content) {
          content.style.transform = 'translateZ(0px)';
          Array.from(content.children).forEach((child: Element) => {
            (child as HTMLElement).style.transform = `translateZ(0px) translateX(0px) translateY(0px)`;
          });
        }
        glow.style.opacity = '0';
      };

      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  return (
    <div className="bg-gray-900 h-screen flex items-center justify-center overflow-hidden">
      <div
        ref={cardRef}
        className="tilt-card w-80 h-96 bg-gradient-to-br from-blue-900 to-gray-600 rounded-2xl shadow-2xl relative cursor-pointer transition-all duration-300 ease-out hover:scale-105"
      >
        <div ref={glowRef} className="glow opacity-0 transition-opacity duration-300"></div>
        <div ref={contentRef} className="tilt-card-content p-6 flex flex-col h-full justify-between relative z-10">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">YANFD PRODUCTS</h2>
            <p className="text-gray-200">Experience the future of technology with our revolutionary quantum computing
              solution.</p>
          </div>
          <div className="space-y-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-3">
              <div className="text-xs text-gray-300 uppercase">Processing Power</div>
              <div className="text-2xl font-bold text-white">100 Qubits</div>
            </div>
            <button className="w-full py-2 bg-white text-blue-700 rounded-lg font-semibold transform transition hover:scale-105 active:scale-95">
            <a href="https://www.yanfd.tech" target="_blank" rel="noopener noreferrer">
  前往 YANFD
</a>
                
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TiltCard;