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
    const cardVisibleHeight = viewportHeight || 800; // Fallback for initial render
    const scrollDistance = Math.max(0, contentHeight - cardVisibleHeight);
    
    // Each card's scroll area is its own height + internal scroll + 100vh for the next card to slide over
    const nextCardSpace = index === 3 ? 0 : cardVisibleHeight;
    const totalContainerHeight = cardVisibleHeight + scrollDistance + nextCardSpace;
  
    // Track scroll progress within this card's container
    const { scrollYProgress: containerProgress } = useScroll({
      target: containerRef,
      offset: ["start start", "end end"],
    });

    // We need to split the progress:
    // 0 to (viewportHeight + scrollDistance) / totalHeight -> internal scroll
    // (viewportHeight + scrollDistance) / totalHeight to 1 -> being covered by next card

    const pinningEndBase = cardVisibleHeight + scrollDistance;
    const pinningEndRatio = totalContainerHeight > 0 ? pinningEndBase / totalContainerHeight : 1;

    // Internal content scroll: 0 to -scrollDistance
    const contentY = useTransform(
      containerProgress, 
      [0, pinningEndRatio], 
      [0, -scrollDistance]
    );

    // Animation when being covered by next card (only if not the last card)
    const isLastCard = index === 3;
    const animationStart = isLastCard ? 1 : pinningEndRatio;
    const animationEnd = 1;

    const scale = useTransform(
      containerProgress,
      [animationStart, animationEnd],
      [1, isLastCard ? 1 : 0.95]
    );
    
    const opacity = useTransform(
      containerProgress,
      [animationStart, animationEnd],
      [1, isLastCard ? 1 : 0.8]
    );

    const blur = useTransform(
      containerProgress,
      [animationStart, animationEnd],
      [0, isLastCard ? 0 : 4]
    );

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
        <div className="sticky top-0 h-screen w-full flex items-center justify-center p-4 md:p-6 overflow-hidden">
          <motion.div
            style={{ 
              scale,
              opacity,
              filter: `blur(${blur}px)`
            }}
            className={cn(
              "relative w-full h-full overflow-hidden rounded-[40px] shadow-[0_-20px_50px_-10px_rgba(0,0,0,0.5)] border border-white/5",
              bgColor,
              className
            )}
          >
            {/* Section Index Indicator - Subtle and minimal */}
            <div className={cn(
              "absolute top-8 left-10 z-50 flex items-center gap-4 pointer-events-none opacity-40",
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
          </motion.div>
        </div>
      </div>
    );
}
