"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const sections = [
  { id: 0, label: "Perspective", anchor: "home" },
  { id: 1, label: "Philosophy", anchor: "experience" },
  { id: 2, label: "Procedures", anchor: "services" },
  { id: 3, label: "Partnership", anchor: "booking" },
];

interface SectionIndexProps {
  // scrollContainerRef removed as we now use window scroll
}

export function SectionIndex({}: SectionIndexProps) {
  const { scrollYProgress } = useScroll();
  
  const handleSectionClick = (anchor: string) => {
    const element = document.getElementById(anchor);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  return (
    <div className="fixed right-12 top-1/2 -translate-y-1/2 z-[100] hidden xl:flex flex-col gap-10">
      {sections.map((section, i) => {
        const start = i / sections.length;
        const end = (i + 1) / sections.length;
        
        return (
          <div 
            key={section.id} 
            className="group flex items-center gap-6 justify-end cursor-pointer"
            onClick={() => handleSectionClick(section.anchor)}
          >
               <motion.span 
                 initial={{ opacity: 0, x: 20 }}
                 whileHover={{ opacity: 1, x: 0 }}
                 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 group-hover:text-slate-900 pointer-events-none transition-colors"
               >
                 {section.label}
               </motion.span>
               
               <div className="relative w-12 h-[1px] bg-slate-200 overflow-hidden">
                  <motion.div 
                    style={{ 
                      scaleX: useTransform(scrollYProgress, [start, end], [0, 1]),
                      transformOrigin: "left"
                    }}
                    className="absolute inset-0 bg-slate-900"
                  />
               </div>
          </div>
        );
      })}
    </div>
  );
}
