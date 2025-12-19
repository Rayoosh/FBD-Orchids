"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface SectionCardProps {
  children: React.ReactNode;
  className?: string;
  index: number;
  bgColor?: string;
  isDark?: boolean;
}

export function SectionCard({ 
  children, 
  className = "", 
  index, 
  bgColor = "bg-white",
  isDark = false 
}: SectionCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Entry: when the card is coming from the bottom
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  // Exit: when the card is at the top and the next one is coming
  const { scrollYProgress: exitProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Entry animations (y position and subtle scale up)
  const y = useTransform(scrollYProgress, [0, 1], ["85vh", "0vh"]);
  const entryScale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const entryOpacity = useTransform(scrollYProgress, [0.3, 1], [0, 1]);

  // Exit animations (scale down and darken)
  const exitScale = useTransform(exitProgress, [0, 1], [1, 0.94]);
  const exitBrightness = useTransform(exitProgress, [0, 1], [1, 0.75]);
  const exitY = useTransform(exitProgress, [0, 1], ["0vh", "-5vh"]);

  // Combine transformations
  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const smoothY = useSpring(useTransform(() => y.get() + parseFloat(exitY.get())), springConfig);
  const smoothScale = useSpring(useTransform(() => entryScale.get() * exitScale.get()), springConfig);
  const smoothOpacity = useSpring(entryOpacity, springConfig);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[120vh] -mt-[20vh] first:mt-0"
      style={{ zIndex: (index + 1) * 10 }}
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center p-4 md:p-6 lg:p-8 pointer-events-none">
        <motion.div
          style={{
            y: smoothY,
            scale: smoothScale,
            opacity: smoothOpacity,
            filter: useTransform(exitBrightness, (b) => `brightness(${b})`),
          }}
          className={`relative w-full h-full max-h-[92vh] overflow-hidden luxury-shadow rounded-[3rem] md:rounded-[4.5rem] border border-black/[0.03] pointer-events-auto ${bgColor} ${className}`}
        >
          {/* Section Index Indicator */}
          <div className={`absolute top-12 left-12 z-50 flex items-center gap-4 ${isDark ? "text-white/40" : "text-black/20"}`}>
            <span className="font-display text-sm tracking-[0.3em]">0{index + 1}</span>
            <div className={`w-8 h-[1px] ${isDark ? "bg-white/20" : "bg-black/10"}`} />
          </div>

          {/* Internal content wrapper */}
          <div className="h-full w-full relative overflow-hidden">
            {children}
          </div>
          
          {/* Subtle edge highlight */}
          <div className={`absolute inset-0 pointer-events-none rounded-[inherit] border ${isDark ? "border-white/10" : "border-black/5"} z-10`} />
          <div className="luxury-card-glow opacity-50" />
        </motion.div>
      </div>
    </div>
  );
}
