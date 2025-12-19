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

  const cardVisibleHeight = viewportHeight;
  const scrollDistance = Math.max(0, contentHeight - cardVisibleHeight);
  
  const overlapAmount = viewportHeight;
  const bufferAmount = viewportHeight * 0.5;
    const totalContainerHeight = Math.max(1, viewportHeight + scrollDistance + overlapAmount + bufferAmount);

    const { scrollYProgress: internalProgress } = useScroll({
      target: containerRef,
      offset: ["start end", "end end"],
    });

    // Ensure progress is always a valid number
    const safeProgress = useTransform(internalProgress, (v) => isNaN(v) ? 0 : v);

    // Calculate the progress points based on the new total height
    const entryEnd = totalContainerHeight > 0 ? viewportHeight / totalContainerHeight : 0;
    const contentEnd = totalContainerHeight > 0 ? (viewportHeight + scrollDistance) / totalContainerHeight : 0.5;
    const coverEnd = totalContainerHeight > 0 ? (viewportHeight + scrollDistance + overlapAmount) / totalContainerHeight : 1;

    const entryProgress = useTransform(safeProgress, (v) => {
      const val = (v - 0) / (Math.max(0.001, entryEnd) - 0);
      return isNaN(val) ? 1 : Math.max(0, Math.min(1, val));
    });
    
    const yEntry = useTransform(entryProgress, (v) => `${(v - 1) * 100}%`);

    const coverProgress = useTransform(safeProgress, (v) => {
      const start = Math.max(0.001, contentEnd);
      const end = Math.max(0.002, coverEnd);
      const val = (v - start) / (end - start || 1);
      return isNaN(val) ? 0 : Math.max(0, Math.min(1, val));
    });

    const scale = useTransform(coverProgress, (v) => 1 - (v * 0.04));
    const opacity = useTransform(coverProgress, (v) => 1 - v);

    const contentY = useTransform(safeProgress, (v) => {
      const start = Math.max(0.001, entryEnd);
      const end = Math.max(0.002, contentEnd);
      const val = (v - start) / (end - start || 1);
      const progress = isNaN(val) ? 0 : Math.max(0, Math.min(1, val));
      return -progress * scrollDistance;
    });

    const zIndexValue = (index + 1) * 10;
    const topSpacing = index === 0 ? "pt-48" : "p-4 md:p-6 lg:p-8";

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
        <div className={cn("sticky top-0 h-screen w-full overflow-hidden", topSpacing)}>
        <motion.div
          style={{ 
            y: index === 0 ? 0 : yEntry,
            scale, 
            opacity 
          }}
          className={cn(
            "relative w-full h-full overflow-hidden rounded-[32px] md:rounded-[48px] shadow-[0_-20px_50px_-10px_rgba(0,0,0,0.3)]",
            bgColor,
            className
          )}
        >
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
