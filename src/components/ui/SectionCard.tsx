"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
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
  isDark = false,
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

  const { scrollDistance, overlapAmount, bufferAmount, totalContainerHeight, entryEnd, contentEnd, coverEnd } = useMemo(() => {
    const distance = Math.max(0, contentHeight - viewportHeight);
    const overlap = viewportHeight;
    const buffer = viewportHeight * 0.5;
    const total = Math.max(1, viewportHeight + distance + overlap + buffer);
    
    const entry = total > 1 ? viewportHeight / total : 0;
    const content = total > 1 ? (viewportHeight + distance) / total : 0.5;
    const cover = total > 1 ? (viewportHeight + distance + overlap) / total : 1;
    
    return {
      scrollDistance: distance,
      overlapAmount: overlap,
      bufferAmount: buffer,
      totalContainerHeight: total,
      entryEnd: entry,
      contentEnd: content,
      coverEnd: cover
    };
  }, [contentHeight, viewportHeight]);

  const { scrollYProgress: internalProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const safeProgress = useTransform(internalProgress, [0, 1], [0, 1]);

  const entryProgress = useTransform(
    safeProgress, 
    [0, Math.max(0.001, entryEnd)], 
    [0, 1],
    { clamp: true }
  );
  
  const yEntry = useTransform(entryProgress, [0, 1], ["-100%", "0%"]);

  const coverProgress = useTransform(
    safeProgress,
    [Math.max(0.001, contentEnd), Math.max(0.002, coverEnd)],
    [0, 1],
    { clamp: true }
  );

  const scale = useTransform(coverProgress, [0, 1], [1, 0.96]);
  const opacity = useTransform(coverProgress, [0, 1], [1, 0]);

  const contentY = useTransform(
    safeProgress,
    [Math.max(0.001, entryEnd), Math.max(0.002, contentEnd)],
    [0, -scrollDistance],
    { clamp: true }
  );

  const zIndexValue = (index + 1) * 10;

  return (
    <div 
      ref={containerRef} 
      className={cn("relative w-full")}
      style={{ 
        height: totalContainerHeight,
        zIndex: zIndexValue,
        marginTop: index === 0 ? 0 : `-${overlapAmount + bufferAmount}px`
      }}
    >
        <div className="sticky top-0 h-screen w-full p-4 md:p-6 lg:p-8 overflow-hidden will-change-transform">
            <motion.div
              style={{ 
                y: index === 0 ? 0 : yEntry,
                scale, 
                opacity,
                willChange: "transform, opacity",
                transform: "translateZ(0)"
              }}
                className={cn(
                  "relative w-full h-full overflow-hidden rounded-[32px] md:rounded-[48px] transition-shadow duration-500",
                isDark 
                  ? "border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]" 
                  : "border border-white/20 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]",
                bgColor,
                className
              )}
          >
            {/* Premium Inner Glow */}
            <div className={cn(
              "absolute inset-0 pointer-events-none",
              isDark ? "inner-glow-dark" : "inner-glow"
            )} />
            
            <div className={cn(
              "absolute top-12 left-12 z-50 flex items-center gap-4 pointer-events-none opacity-40",
              isDark ? "text-white" : "text-black"
            )}>
            <span className="font-display text-sm tracking-[0.3em]">0{index + 1}</span>
            <div className={cn("w-8 h-[1px]", isDark ? "bg-white/20" : "bg-black/10")} />
          </div>

          <motion.div 
            ref={contentRef}
            style={{ y: contentY }}
            className="w-full flex flex-col"
          >
            {children}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
