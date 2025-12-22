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
  const points = useMemo(() => {
    if (isMobile || typeof totalContainerHeight !== "number" || totalContainerHeight <= 0) {
      return { entryEnd: 0, contentEnd: 0.5, coverEnd: 1 };
    }
    return {
      entryEnd: viewportHeight / totalContainerHeight,
      contentEnd: (viewportHeight + scrollDistance) / totalContainerHeight,
      coverEnd: (viewportHeight + scrollDistance + overlapAmount) / totalContainerHeight
    };
  }, [isMobile, totalContainerHeight, viewportHeight, scrollDistance, overlapAmount]);

  // Use array-based transforms for better performance in Chrome
  // This avoids running JS functions on every scroll frame
  const yEntry = useTransform(
    safeProgress, 
    [0, Math.max(0.001, points.entryEnd)], 
    [viewportHeight, 0],
    { clamp: true }
  );

  const scale = useTransform(
    safeProgress,
    [points.contentEnd, Math.max(points.contentEnd + 0.001, points.coverEnd)],
    [1, 0.96],
    { clamp: true }
  );

  const opacity = useTransform(
    safeProgress,
    [points.contentEnd, Math.max(points.contentEnd + 0.001, points.coverEnd)],
    [1, 0],
    { clamp: true }
  );

  const contentY = useTransform(
    safeProgress,
    [points.entryEnd, Math.max(points.entryEnd + 0.001, points.contentEnd)],
    [0, -scrollDistance],
    { clamp: true }
  );

  const zIndexValue = (index + 1) * 10;

  if (isMobile) {
    return (
      <div 
        id={id}
        ref={containerRef} 
        className={cn(
          "relative w-full",
          isDark ? "bg-slate-900" : bgColor,
          className
        )}
        style={{ zIndex: zIndexValue }}
      >
        <div ref={contentRef} className="w-full flex flex-col">
          {children}
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
          }}
        >
            <div className="sticky top-0 h-screen w-full p-4 md:p-6 lg:p-8 overflow-hidden">
                <motion.div
                      style={{ 
                        y: index === 0 ? 0 : yEntry,
                        scale, 
                        opacity,
                        willChange: "transform, opacity",
                      }}
                  className={cn(
                    "relative w-full h-full overflow-hidden rounded-[32px] md:rounded-[48px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] ring-1 transform-gpu",
                    isDark ? "ring-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)]" : "ring-black/5",
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
