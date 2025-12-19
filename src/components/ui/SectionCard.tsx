"use client";

import React, { useRef, useEffect } from "react";
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = scrollContainerRef.current;
    if (!element) return;

    const handleWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = element;
      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      // If scrolling down and not at bottom, scroll internally and prevent parent scroll
      if (isScrollingDown && scrollTop + clientHeight < scrollHeight - 1) {
        element.scrollTop += e.deltaY;
        e.preventDefault();
      }
      // If scrolling up and not at top, scroll internally and prevent parent scroll
      else if (isScrollingUp && scrollTop > 1) {
        element.scrollTop += e.deltaY;
        e.preventDefault();
      }
    };

    // Use non-passive to allow stopPropagation/preventDefault if needed
    // Actually stopPropagation on wheel might not stop the parent snap-container from reacting in some browsers
    // but it's a good start.
    element.addEventListener("wheel", handleWheel, { passive: false });
    return () => element.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <section 
      className="h-screen w-full snap-start sticky top-0 overflow-hidden flex flex-col shadow-[0_-20px_50px_-10px_rgba(0,0,0,0.3)]"
      style={{ zIndex: (index + 1) * 10 }}
    >
      <div 
        ref={scrollContainerRef}
        className={cn(
          "flex-1 overflow-y-auto overscroll-behavior-y-contain p-4 md:p-6 transition-colors duration-700",
          bgColor,
          className
        )}
      >
        <div className="relative w-full h-full max-w-[1800px] mx-auto">
          <div className={cn(
            "relative w-full min-h-full rounded-[40px] shadow-2xl border border-white/5 flex flex-col",
            bgColor
          )}>
            {/* Section Index Indicator */}
            <div className={cn(
              "sticky top-8 left-10 z-50 flex items-center gap-4 pointer-events-none opacity-40",
              isDark ? "text-white" : "text-black"
            )}>
              <span className="font-display text-sm tracking-[0.3em]">0{index + 1}</span>
              <div className={cn("w-8 h-[1px]", isDark ? "bg-white/20" : "bg-black/10")} />
            </div>

            <div className="w-full flex flex-col">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
