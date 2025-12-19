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

  // Use full height to avoid "floating" look if not explicitly requested
  const cardVisibleHeight = viewportHeight;
  const scrollDistance = Math.max(0, contentHeight - cardVisibleHeight);
  
  // Each card's scroll area is its own height + the distance needed to scroll its internal content
  const totalContainerHeight = viewportHeight + scrollDistance;

  // Track scroll progress within this card's container
  const { scrollYProgress: internalProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Internal content scroll: 0 to -scrollDistance
  // Direct mapping for 1:1 tactile feel
  const contentY = useTransform(internalProgress, [0, 1], [0, -scrollDistance]);

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
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          className={cn(
            "relative w-full h-full overflow-hidden",
            bgColor,
            className
          )}
        >
          {/* Section Index Indicator - Subtle and minimal */}
          <div className={cn(
            "absolute top-12 left-12 z-50 flex items-center gap-4 pointer-events-none opacity-40",
            isDark ? "text-white" : "text-black"
          )}>
            <span className="font-display text-sm tracking-[0.3em]">0{index + 1}</span>
            <div className={cn("w-8 h-[1px]", isDark ? "bg-white/20" : "bg-black/10")} />
          </div>

          {/* Internal content wrapper */}
          <motion.div 
            ref={contentRef}
            style={{ y: contentY }}
            className="w-full flex flex-col"
          >
            {children}
          </motion.div>
          
          {/* Edge highlight - very subtle */}
          <div className={cn(
            "absolute inset-0 pointer-events-none border-t border-black/5",
            index === 0 && "border-t-0"
          )} />
        </motion.div>
      </div>
    </div>
  );
}
