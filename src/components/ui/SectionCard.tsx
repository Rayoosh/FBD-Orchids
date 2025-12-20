"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  children: React.ReactNode;
  index: number;
  bgColor?: string;
  id?: string;
}

export function SectionCard({ children, index, bgColor = "bg-white/70", id }: SectionCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (bgColor.includes("slate") || bgColor.includes("zinc") || bgColor.includes("black")) {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, [bgColor]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);
  const contentY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section 
      id={id}
      ref={containerRef} 
      className={cn(
        "relative min-h-screen w-full snap-start flex flex-col items-center justify-center py-20 px-4 md:px-8",
        bgColor
      )}
    >
      <div className="max-w-7xl w-full">
        <motion.div
          style={{ opacity, scale }}
          className="relative w-full"
        >
          <div className="absolute -left-12 top-0 hidden xl:flex flex-col items-center gap-4 opacity-20">
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
    </section>
  );
}
