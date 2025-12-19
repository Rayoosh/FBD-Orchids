"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SectionCardProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionCard({ children, className = "" }: SectionCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  // Scale and Y-offset for the entry animation
  // As the section reaches the top, it stays there while the next one comes up
  const scale = useTransform(scrollYProgress, [0, 0.7, 1], [0.92, 0.98, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["60vh", "0vh"]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0.8, 1]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-screen sticky top-0 pt-6 pb-6 px-4 md:px-8 overflow-hidden"
    >
      <motion.div
        style={{
          scale,
          y,
          opacity,
          borderRadius: "4rem",
        }}
        className={`relative w-full h-full overflow-hidden bg-white luxury-shadow border border-black/[0.05] ${className}`}
      >
        <div className="h-full w-full overflow-y-auto no-scrollbar scroll-smooth">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
