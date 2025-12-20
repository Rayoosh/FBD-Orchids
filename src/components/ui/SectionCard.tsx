"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface SectionCardProps {
  children: React.ReactNode;
  className?: string;
  index: number;
  bgColor?: string;
  isDark?: boolean;
  id?: string;
}

export function SectionCard({ 
  children, 
  className = "", 
  index, 
  bgColor = "bg-white",
  isDark = false,
  id,
}: SectionCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const isMobile = useIsMobile();

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

  const cardVisibleHeight = viewportHeight;
  const scrollDistance = Math.max(0, contentHeight - cardVisibleHeight);
  
  const overlapAmount = viewportHeight;
  const bufferAmount = viewportHeight * 0.5;
  
  const totalContainerHeight = isMobile ? "auto" : Math.max(1, viewportHeight + scrollDistance + overlapAmount + bufferAmount);

    const { scrollYProgress: internalProgress } = useScroll({
      target: containerRef,
      offset: ["start end", "end end"],
    });
  
    // Use raw progress to avoid "double-smoothing" with Lenis
    const safeProgress = internalProgress;


  // Calculate the progress points based on the new total height
  const entryEnd = !isMobile && typeof totalContainerHeight === "number" && totalContainerHeight > 0 ? viewportHeight / totalContainerHeight : 0;
  const contentEnd = !isMobile && typeof totalContainerHeight === "number" && totalContainerHeight > 0 ? (viewportHeight + scrollDistance) / totalContainerHeight : 0.5;
  const coverEnd = !isMobile && typeof totalContainerHeight === "number" && totalContainerHeight > 0 ? (viewportHeight + scrollDistance + overlapAmount) / totalContainerHeight : 1;

  const entryProgress = useTransform(safeProgress, (v) => {
    const val = (v - 0) / (Math.max(0.001, entryEnd) - 0);
    return isNaN(val) ? 1 : Math.max(0, Math.min(1, val));
  });
  
    const yEntry = useTransform(entryProgress, [0, 1], [viewportHeight, 0]);

    const coverProgress = useTransform(safeProgress, (v) => {
    const start = Math.max(0.001, contentEnd);
    const end = Math.max(0.002, coverEnd);
    const val = (v - start) / (end - start || 1);
    return isNaN(val) ? 0 : Math.max(0, Math.min(1, val));
  });

  const scale = useTransform(coverProgress, (v) => 1 - (v * 0.04));
  const opacity = useTransform(coverProgress, (v) => 1 - v);

  const contentY = useTransform(safeProgress, (v) => {
    if (isMobile) return 0;
    const start = Math.max(0.001, entryEnd);
    const end = Math.max(0.002, contentEnd);
    const val = (v - start) / (end - start || 1);
    const progress = isNaN(val) ? 0 : Math.max(0, Math.min(1, val));
    return -progress * scrollDistance;
  });

  const zIndexValue = (index + 1) * 10;

  if (isMobile) {
    return (
      <div 
        id={id}
        ref={containerRef} 
        className={cn(
          "relative w-full p-3 mb-4",
          index === 0 ? "pt-24" : "pt-4"
        )}
        style={{ zIndex: zIndexValue }}
      >
        <div
          className={cn(
            "relative w-full overflow-hidden rounded-[24px] shadow-lg ring-1",
            isDark ? "ring-white/10 bg-slate-900" : "ring-black/5",
            bgColor,
            className
          )}
        >
          <div ref={contentRef} className="w-full flex flex-col">
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
      <div 
        id={id}
        ref={containerRef} 
        className={cn("relative w-full")}
        style={{ 
          height: totalContainerHeight,
          zIndex: zIndexValue,
          marginTop: index === 0 ? 0 : `-${overlapAmount + bufferAmount}px`,
          willChange: "transform"
        }}
      >
          <div className="sticky top-0 h-screen w-full p-4 md:p-6 lg:p-8 overflow-hidden">
            <motion.div
              style={{ 
                y: index === 0 ? 0 : yEntry,
                scale, 
                opacity,
                willChange: "transform, opacity"
              }}
              className={cn(
                "relative w-full h-full overflow-hidden rounded-[32px] md:rounded-[48px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] ring-1 backdrop-blur-xl transform-gpu",
                isDark ? "ring-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)]" : "ring-black/10",
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
