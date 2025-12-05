"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';

// ... (interface and component definition remain same)

// Swaying animation variants
const swayVariant: Variants = {
    animate: {
        rotate: [-2, 2, -2],
        transition: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

const swayVariantReverse: Variants = {
    animate: {
        rotate: [2, -2, 2],
        transition: {
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
        }
    }
};

return (
    <div className="relative w-full h-full flex items-center justify-center">
        {/* Ground */}
        <motion.div
            className="absolute bottom-0 w-full h-1/4 rounded-t-[100%] opacity-80"
            animate={{ backgroundColor: colors.ground }}
            transition={{ duration: 1 }}
        />

        {/* Pine Tree Container */}
        <div className="relative z-10 flex flex-col items-center mb-10">

            {/* Tree Layers (Stacked Triangles) */}
            <div className="relative flex flex-col items-center -space-y-12">

                {/* Top Layer */}
                <motion.div
                    variants={swayVariant}
                    animate="animate"
                    className="z-30 origin-bottom"
                >
                    <div
                        className="w-0 h-0 border-l-[40px] border-r-[40px] border-b-[80px] border-l-transparent border-r-transparent transition-colors duration-1000"
                        style={{ borderBottomColor: colors.leaves }}
                    />
                    {season === 'winter' && (
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[40px] border-r-[40px] border-b-[20px] border-l-transparent border-r-transparent border-b-white/20" />
                    )}
                </motion.div>

                {/* Middle Layer */}
                <motion.div
                    variants={swayVariantReverse}
                    animate="animate"
                    className="z-20 origin-bottom"
                >
                    <div
                        className="w-0 h-0 border-l-[60px] border-r-[60px] border-b-[100px] border-l-transparent border-r-transparent transition-colors duration-1000"
                        style={{ borderBottomColor: colors.leavesLight }}
                    />
                    {season === 'winter' && (
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[60px] border-r-[60px] border-b-[25px] border-l-transparent border-r-transparent border-b-white/20" />
                    )}
                </motion.div>

                {/* Bottom Layer */}
                <motion.div
                    variants={swayVariant}
                    animate="animate"
                    className="z-10 origin-bottom"
                >
                    <div
                        className="w-0 h-0 border-l-[80px] border-r-[80px] border-b-[120px] border-l-transparent border-r-transparent transition-colors duration-1000"
                        style={{ borderBottomColor: colors.leaves }}
                    />
                    {season === 'winter' && (
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[80px] border-r-[80px] border-b-[30px] border-l-transparent border-r-transparent border-b-white/20" />
                    )}
                </motion.div>

            </div>

            {/* Trunk */}
            <motion.div
                className="w-12 h-24 -mt-2 z-0"
                animate={{ backgroundColor: colors.trunk }}
                transition={{ duration: 1 }}
            />

            {/* Shadow */}
            <div className="w-40 h-8 bg-black/20 rounded-[50%] -mt-4 blur-sm" />

        </div>

        {/* Gloomy Atmosphere Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-black/10 mix-blend-multiply" />
    </div>
);
}
