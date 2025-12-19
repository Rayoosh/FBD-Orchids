"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

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
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    const updateDimensions = () => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
      setViewportHeight(window.innerHeight);
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    
    const timer = setTimeout(updateDimensions, 500);
    
    return () => {
      window.removeEventListener("resize", updateDimensions);
      clearTimeout(timer);
    };
  }, [children]);

  const cardVisibleHeight = viewportHeight * 0.92;
  const scrollDistance = Math.max(0, contentHeight - cardVisibleHeight);
  
  // Controlled Overlap Logic:
  // We reduce the 'travel' distance for the entry phase to 80vh to make it snappier.
  const entryDistance = index === 0 ? 0 : 80; 
  const totalContainerHeight = (viewportHeight * (entryDistance / 100)) + scrollDistance + (index === 0 ? viewportHeight * 0.1 : 0);

  // Entry: slides up
  const { scrollYProgress: entryProgress } = useScroll({
    target: containerRef,
    offset: index === 0 ? ["start start", "start start"] : ["start end", "start 15%"],
  });

  // Internal scroll: MUST be perfectly 1:1 with page scroll to feel stationary.
  const { scrollYProgress: internalProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const { scrollYProgress: exitProgress } = useScroll({
    target: containerRef,
    offset: ["end end", "end start"],
  });

  // Entry animations
  const y = useTransform(entryProgress, [0, 1], [index === 0 ? "0vh" : "80vh", "0vh"]);
  const entryScale = useTransform(entryProgress, [0, 1], [index === 0 ? 1 : 0.95, 1]);
  const entryOpacity = useTransform(entryProgress, [0, 0.4], [index === 0 ? 1 : 0, 1]);

  // Internal content scroll: 0 to -scrollDistance
  // No spring here to ensure pixel-perfect tracking
  const contentY = useTransform(internalProgress, [0, 1], [0, -scrollDistance]);

  // Exit animations
  const exitScale = useTransform(exitProgress, [0, 1], [1, 0.94]);
  const exitBrightness = useTransform(exitProgress, [0, 1], [1, 0.6]);
  const exitBlur = useTransform(exitProgress, [0, 1], [0, 8]);

  const springConfig = { damping: 50, stiffness: 300, mass: 0.1 };
  
  const smoothY = useSpring(y, springConfig);
  const smoothScale = useSpring(useTransform(() => entryScale.get() * exitScale.get()), springConfig);
  const smoothOpacity = useSpring(entryOpacity, springConfig);
  const smoothBrightness = useSpring(exitBrightness, springConfig);
  const smoothBlur = useSpring(exitBlur, springConfig);

  const zIndexValue = (index + 1) * 10;

  return (
    <div 
      ref={containerRef} 
      className={cn(
        "relative w-full",
        index !== 0 && "-mt-[15vh]" // Tighten the vertical stack
      )}
      style={{ 
        height: totalContainerHeight,
        zIndex: zIndexValue 
      }}
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center p-4 md:p-6 lg:p-8 pointer-events-none">
        <motion.div
          style={{
            y: smoothY,
            scale: smoothScale,
            opacity: smoothOpacity,
            filter: useTransform(smoothBrightness, (b) => `brightness(${b}) blur(${smoothBlur.get()}px)`),
          }}
          className={cn(
            "relative w-full h-full max-h-[92vh] overflow-hidden luxury-shadow rounded-[3rem] md:rounded-[4.5rem] border border-black/[0.03] pointer-events-auto",
            bgColor,
            className
          )}
        >
          {/* Section Index Indicator */}
          <div className={cn(
            "absolute top-12 left-12 z-50 flex items-center gap-4 pointer-events-none",
            isDark ? "text-white/40" : "text-black/20"
          )}>
            <span className="font-display text-sm tracking-[0.3em]">0{index + 1}</span>
            <div className={cn("w-8 h-[1px]", isDark ? "bg-white/20" : "bg-black/10")} />
          </div>

          {/* Internal content wrapper */}
          <div className="h-full w-full relative overflow-hidden">
            <motion.div 
              ref={contentRef}
              style={{ y: contentY }}
              className="w-full flex flex-col"
            >
              {children}
            </motion.div>
          </div>
          
          {/* Subtle edge highlight */}
          <div className={cn(
            "absolute inset-0 pointer-events-none rounded-[inherit] border z-10",
            isDark ? "border-white/10" : "border-black/5"
          )} />
          <div className="luxury-card-glow opacity-50" />
        </motion.div>
      </div>
    </div>
  );
}
