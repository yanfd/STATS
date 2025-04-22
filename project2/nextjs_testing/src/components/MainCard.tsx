import Image from 'next/image';
import React, { useEffect, useRef } from 'react';

const MainCard: React.FC = () => {
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

        // Apply perspective rotation to the card
        card.style.transform = `perspective(1000px) rotateY(${percentX * 10}deg) rotateX(${percentY * 10}deg)`;
        
        // Apply perspective/transforms to content - ensure parent has transform-style
        if (content) {
          // Base Z translation for the whole content block
          content.style.transform = `translateZ(40px)`; // Lift the content slightly forward

          // Parallax for direct children of content
          Array.from(content.children).forEach((child: Element) => {
            const depth = 20; // How much children lift relative to contentRef base
            const moveFactor = 0.015; // How much children shift with mouse
            const translateX = (x - centerX) * moveFactor;
            const translateY = (y - centerY) * moveFactor;
            (child as HTMLElement).style.transform = `translateZ(${depth}px) translateX(${translateX}px) translateY(${translateY}px)`;
          });
        }

        // Update glow effect
        glow.style.opacity = '1';
        glow.style.backgroundImage = `
          radial-gradient(
            circle at ${x}px ${y}px,
            #ffffff33, // Slightly adjusted glow color/alpha
            #00000000   // Fade to transparent
          )
        `;
      };

      const handleMouseLeave = () => {
        // Reset card tilt
        card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
        
        // Reset content transforms
        if (content) {
          content.style.transform = 'translateZ(0px)';
          Array.from(content.children).forEach((child: Element) => {
            (child as HTMLElement).style.transform = `translateZ(0px) translateX(0px) translateY(0px)`;
          });
        }
        
        // Hide glow
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

  // --- Main Change Here: Removed the wrapper divs ---
  // The component now returns the tilt-card directly
  return (
    <div
      ref={cardRef}
      className="tilt-card w-80 h-110 bg-gradient-to-t from-blue-900 to-black-800 rounded-2xl shadow-2xl relative cursor-pointer transition-transform duration-300 ease-out hover:scale-105" // Use transition-transform
      // Add transform-style preserve-3d for correct 3D nesting
      style={{ transformStyle: "preserve-3d" }} 
    >
      {/* Glow Element: Needs absolute positioning */}
      <div 
        ref={glowRef} 
        className="absolute inset-0 opacity-0 transition-opacity duration-300 rounded-2xl pointer-events-none overflow-hidden" // Added positioning & overflow hidden for glow itself
        // Glow background is set by JS
      ></div>
      
      {/* Content Container */}
      <div 
        ref={contentRef} 
        className="tilt-card-content p-6 flex flex-col h-full justify-between relative z-10"
        // Add preserve-3d here too for the children's transforms
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Top Content Block */}
        {/* You might add a base translateZ here if desired via style or className */}
        <div> 
          {/* Logo */}
          <div className="w-full rounded-lg overflow-hidden mb-2">
            <img
                src="/source/profilepic.jpg"
                alt="Logo"
                className="w-full h-full object-contain"
            />
            </div>
          {/* Title & Description */}
          <h2 className="text-3xl font-bold text-white mb-2">YANFD PRODUCTS</h2>

          {/* <p className="text-gray-200 text-sm"> 
            Experience the future of technology with our revolutionary quantum computing solution.
          </p> */}
        </div>
        
        {/* Bottom Content Block */}
        <div className="space-y-4"> 

          <button className="w-full py-2 bg-white text-blue-700 rounded-lg font-semibold transform transition hover:scale-105 active:scale-95">
            <a href="https://www.yanfd.tech" target="_blank" rel="noopener noreferrer">
              MY BLOG
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainCard;