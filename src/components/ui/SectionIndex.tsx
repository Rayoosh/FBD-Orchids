"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const sections = [
  { id: 0, label: "Perspective" },
  { id: 1, label: "Philosophy" },
  { id: 2, label: "Procedures" },
  { id: 3, label: "Partnership" },
];

interface SectionIndexProps {
  // scrollContainerRef removed as we now use window scroll
}

export function SectionIndex({}: SectionIndexProps) {
  const { scrollYProgress } = useScroll();
  
  return (
    <div className="fixed right-12 top-1/2 -translate-y-1/2 z-[100] hidden xl:flex flex-col gap-10">
      {sections.map((section, i) => {
        const start = i / sections.length;
        const end = (i + 1) / sections.length;
        
        return (
          <div key={section.id} className="group flex items-center gap-6 justify-end cursor-pointer">
                 <motion.span 
                   initial={{ opacity: 0, x: 20 }}
                   whileHover={{ opacity: 1, x: 0 }}
                   className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 group-hover:text-white pointer-events-none transition-colors"
                 >
                   {section.label}
                 </motion.span>
                 
                 <div className="relative w-12 h-[1px] bg-white/10 overflow-hidden">
                    <motion.div 
                      style={{ 
                        scaleX: useTransform(scrollYProgress, [start, end], [0, 1]),
                        transformOrigin: "left"
                      }}
                      className="absolute inset-0 bg-white"
                    />
                 </div>
          </div>
        );
      })}
    </div>
  );
}
