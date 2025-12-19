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
  const totalContainerHeight = viewportHeight + scrollDistance + overlapAmount;

  const { scrollYProgress: internalProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const entryProgress = useTransform(internalProgress, [0, 0.2], [0, 1]);
  const yEntry = useTransform(entryProgress, [0, 1], ["-100%", "0%"]);

  const coverProgress = useTransform(
    internalProgress, 
    [0.8, 1], 
    [0, 1]
  );

  const scale = useTransform(coverProgress, [0, 1], [1, 0.96]);
  const opacity = useTransform(coverProgress, [0, 1], [1, 0.8]);

  const contentY = useTransform(
    internalProgress, 
    [0.2, 0.8], 
    [0, -scrollDistance]
  );

  const zIndexValue = (index + 1) * 10;

  return (
    <div 
      ref={containerRef} 
      className={cn(
        "relative w-full",
        index !== 0 && "-mt-[100vh]"
      )}
      style={{ 
        height: totalContainerHeight,
        zIndex: zIndexValue 
      }}
    >
      <div className="sticky top-0 h-screen w-full p-4 md:p-6 lg:p-8 overflow-hidden">
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
