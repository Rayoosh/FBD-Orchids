"use client";

import React, { useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useScrollState } from "@/components/ScrollProvider";

interface SectionCardProps {
  children: React.ReactNode;
  className?: string;
  index: number;
  bgColor?: string;
  isDark?: boolean;
  id: string; // id is now required for tracking
}

export function SectionCard({ 
  children, 
  className = "", 
  index, 
  bgColor = "bg-white",
  isDark = false,
  id,
}: SectionCardProps) {
  const { activeSection } = useScrollState();
  const isMobile = useIsMobile();

  const isActive = activeSection === id;
  
  // Define sections in order to determine "past" and "future"
  const sectionIds = ["home", "experience", "services", "partnership"];
  const currentIndex = sectionIds.indexOf(id);
  const activeIndex = sectionIds.indexOf(activeSection);
  
  const isPast = currentIndex < activeIndex;
  const isFuture = currentIndex > activeIndex;

  // Helper for mobile background
  const mobileBg = useMemo(() => {
    if (!bgColor) return isDark ? "bg-slate-900" : "bg-white";
    return bgColor
      .replace(/\/70|\/80|\/90/g, "")
      .replace(/backdrop-blur-\w+/g, "")
      .trim();
  }, [bgColor, isDark]);

  if (isMobile) {
    return (
      <section 
        id={id}
        className={cn(
          "relative w-full py-12 px-4",
          isDark ? "bg-slate-900" : mobileBg,
          className
        )}
      >
        <div className="w-full flex flex-col">
          {children}
        </div>
      </section>
    );
  }

  return (
    <section 
      id={id}
      className="relative w-full h-[120vh]" // Extra height for overlap
      style={{ zIndex: (index + 1) * 10 }}
    >
      <div className="sticky top-0 h-screen w-full p-6 lg:p-8 overflow-hidden">
        <motion.div
          initial={index === 0 ? "active" : "future"}
          animate={isPast ? "past" : isActive ? "active" : "future"}
          variants={{
            active: { 
              y: 0, 
              scale: 1, 
              opacity: 1,
              transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
            },
            past: { 
              y: 0, 
              scale: 0.95, 
              opacity: 0,
              transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
            },
            future: { 
              y: "100%", 
              scale: 1, 
              opacity: 1,
              transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
            }
          }}
          className={cn(
            "relative w-full h-full overflow-y-auto rounded-[48px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] ring-1 transform-gpu no-scrollbar",
            isDark ? "ring-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)]" : "ring-black/5",
            bgColor,
            className
          )}
        >
          {/* Premium Inner Glow */}
          <div className={cn(
            "absolute inset-0 pointer-events-none sticky top-0 h-full w-full z-50",
            isDark ? "inner-glow-dark" : "inner-glow"
          )} />
          
          <div className={cn(
            "absolute top-12 left-12 z-50 flex items-center gap-4 pointer-events-none opacity-40",
            isDark ? "text-white" : "text-black"
          )}>
            <span className="font-display text-sm tracking-[0.3em]">0{index + 1}</span>
            <div className={cn("w-8 h-[1px]", isDark ? "bg-white/20" : "bg-black/10")} />
          </div>

          <div className="w-full flex flex-col">
            {children}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
