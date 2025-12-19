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
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
    setViewportHeight(window.innerHeight);
    
    const handleResize = () => {
      if (contentRef.current) setContentHeight(contentRef.current.scrollHeight);
      setViewportHeight(window.innerHeight);
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [children]);

  const scrollDistance = Math.max(0, contentHeight - viewportHeight * 0.92);
  // Add extra scroll distance for the stacking effect to feel natural
  const totalContainerHeight = `calc(100vh + ${scrollDistance}px + 20vh)`;

  // Entry: when the card is coming from the bottom
  const { scrollYProgress: entryProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  // Internal scroll: when the card is pinned
  const { scrollYProgress: internalProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Exit: when the next card starts to overlap
  const { scrollYProgress: exitProgress } = useScroll({
    target: containerRef,
    offset: ["end end", "end start"],
  });

  // Entry animations
  const y = useTransform(entryProgress, [0, 1], ["85vh", "0vh"]);
  const entryScale = useTransform(entryProgress, [0, 1], [0.92, 1]);
  const entryOpacity = useTransform(entryProgress, [0.3, 1], [0, 1]);

  // Internal content scroll
  const contentY = useTransform(internalProgress, [0, 1], [0, -scrollDistance]);

  // Exit animations
  const exitScale = useTransform(exitProgress, [0, 1], [1, 0.94]);
  const exitBrightness = useTransform(exitProgress, [0, 1], [1, 0.75]);
  const exitOffset = useTransform(exitProgress, [0, 1], [0, -50]);

  // Spring physics for smoothness
  const springConfig = { damping: 30, stiffness: 150, mass: 0.5 };
  const smoothY = useSpring(y, springConfig);
  const smoothScale = useSpring(useTransform(() => entryScale.get() * exitScale.get()), springConfig);
  const smoothOpacity = useSpring(entryOpacity, springConfig);
  const smoothContentY = useSpring(contentY, springConfig);

  // Fix NaN error by ensuring index is a valid number and styles are safe
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
            filter: useTransform(exitBrightness, (b) => `brightness(${b})`),
          }}
          className={cn(
            "relative w-full h-full max-h-[92vh] overflow-hidden luxury-shadow rounded-[3rem] md:rounded-[4.5rem] border border-black/[0.03] pointer-events-auto",
            bgColor,
            className
          )}
        >
          {/* Section Index Indicator */}
          <div className={cn(
            "absolute top-12 left-12 z-50 flex items-center gap-4",
            isDark ? "text-white/40" : "text-black/20"
          )}>
            <span className="font-display text-sm tracking-[0.3em]">0{index + 1}</span>
            <div className={cn("w-8 h-[1px]", isDark ? "bg-white/20" : "bg-black/10")} />
          </div>

          {/* Internal content wrapper with animated scroll */}
          <div className="h-full w-full relative overflow-hidden">
            <motion.div 
              ref={contentRef}
              style={{ y: smoothContentY }}
              className="w-full"
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
