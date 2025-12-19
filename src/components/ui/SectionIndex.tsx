"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const sections = [
  { id: 0, label: "Perspective" },
  { id: 1, label: "Philosophy" },
  { id: 2, label: "Procedures" },
  { id: 3, label: "Partnership" },
];

export function SectionIndex() {
  const [scrollProgress, setScrollProgress] = React.useState(0);

  useEffect(() => {
    const main = document.querySelector('main');
    if (!main) return;

    const handleScroll = () => {
      const progress = main.scrollTop / (main.scrollHeight - main.clientHeight);
      setScrollProgress(progress);
    };

    main.addEventListener('scroll', handleScroll);
    return () => main.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="fixed right-12 top-1/2 -translate-y-1/2 z-[100] hidden xl:flex flex-col gap-10">
      {sections.map((section, i) => {
        const start = i / (sections.length + 0.5); // Adjust for footer
        const end = (i + 1) / (sections.length + 0.5);
        
        const isActive = scrollProgress >= start && scrollProgress < end;
        const progress = Math.min(Math.max((scrollProgress - start) / (end - start), 0), 1);
        
        return (
          <div key={section.id} className="group flex items-center gap-6 justify-end cursor-pointer">
             <span className={cn(
               "text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-500",
               isActive ? "text-accent opacity-100 translate-x-0" : "text-black/20 opacity-0 translate-x-4 group-hover:opacity-40 group-hover:translate-x-0"
             )}>
               {section.label}
             </span>
             
             <div className="relative w-12 h-[1px] bg-black/10 overflow-hidden">
                <motion.div 
                  style={{ 
                    scaleX: progress,
                    transformOrigin: "left"
                  }}
                  className="absolute inset-0 bg-accent"
                />
             </div>
          </div>
        );
      })}
    </div>
  );
}
