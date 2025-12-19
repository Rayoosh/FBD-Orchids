"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
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
    
    // Also update after a short delay to catch any dynamic content loading
    const timer = setTimeout(updateDimensions, 500);
    
    return () => {
      window.removeEventListener("resize", updateDimensions);
      clearTimeout(timer);
    };
  }, [children]);

  // The card occupies 92% of the viewport height.
  const cardVisibleHeight = viewportHeight * 0.92;
  const scrollDistance = Math.max(0, contentHeight - cardVisibleHeight);
  
    // Total height = 100vh (for the entry transition) + scrollDistance (for pinning)
    const totalContainerHeight = viewportHeight + scrollDistance;

    // Entry: slides up from bottom
    // This starts when the container top is at the bottom of the viewport
    // and ends when the container top is at the top of the viewport.
    // This takes exactly 100vh of scroll.
    const { scrollYProgress: entryProgress } = useScroll({
      target: containerRef,
      offset: ["start end", "start start"],
    });

    // Internal scroll: scrolls content while sticky
    // This starts when the container top is at the top of the viewport
    // and ends when the container bottom is at the bottom of the viewport.
    // This takes exactly (totalContainerHeight - vh) = scrollDistance pixels of scroll.
    const { scrollYProgress: internalProgress } = useScroll({
      target: containerRef,
      offset: ["start start", "end end"],
    });

  // Exit: scales down/darkens as the NEXT card enters
  const { scrollYProgress: exitProgress } = useScroll({
    target: containerRef,
    offset: ["end end", "end start"],
  });

  // Entry animations: 100vh to 0
  const y = useTransform(entryProgress, [0, 1], ["100vh", "0vh"]);
  const entryScale = useTransform(entryProgress, [0, 1], [0.94, 1]);
  const entryOpacity = useTransform(entryProgress, [0.4, 0.8], [0, 1]);

  // Internal content scroll: 0 to -scrollDistance
  // This happens between "start start" and "end end" of the container
  const contentY = useTransform(internalProgress, [0, 1], [0, -scrollDistance]);

  // Exit animations: happens when the NEXT card starts sliding over
  const exitScale = useTransform(exitProgress, [0, 1], [1, 0.95]);
  const exitBrightness = useTransform(exitProgress, [0, 1], [1, 0.7]);
  const exitBlur = useTransform(exitProgress, [0, 1], [0, 4]);

  // Snappier spring for better 1:1 feel
  const springConfig = { damping: 40, stiffness: 200, mass: 0.2 };
  
  const smoothY = useSpring(y, springConfig);
  const smoothContentY = useSpring(contentY, springConfig);
  const smoothScale = useSpring(useTransform(() => entryScale.get() * exitScale.get()), springConfig);
  const smoothOpacity = useSpring(entryOpacity, springConfig);
  const smoothBrightness = useSpring(exitBrightness, springConfig);
  const smoothBlur = useSpring(exitBlur, springConfig);

  const zIndexValue = (index + 1) * 10;

  return (
    <div 
      ref={containerRef} 
      className="relative w-full"
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
              style={{ y: smoothContentY }}
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
