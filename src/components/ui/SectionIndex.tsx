"use client";

import React from "react";
import { motion } from "framer-motion";
import { useScrollState } from "@/components/ScrollProvider";
import { cn } from "@/lib/utils";

const sections = [
  { id: 0, label: "Perspective", anchor: "home" },
  { id: 1, label: "Philosophy", anchor: "experience" },
  { id: 2, label: "Procedures", anchor: "services" },
  { id: 3, label: "Partnership", anchor: "partnership" },
];

export function SectionIndex() {
  const { activeSection } = useScrollState();
  
  const handleSectionClick = (anchor: string) => {
    const element = document.getElementById(anchor);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  return (
    <div className="fixed right-12 top-1/2 -translate-y-1/2 z-[100] hidden xl:flex flex-col gap-10">
      {sections.map((section) => {
        const isActive = activeSection === section.anchor;
        
        return (
          <div 
            key={section.id} 
            className="group flex items-center gap-6 justify-end cursor-pointer"
            onClick={() => handleSectionClick(section.anchor)}
          >
            <motion.span 
              initial={false}
              animate={{ 
                opacity: isActive ? 1 : 0, 
                x: isActive ? 0 : 20,
              }}
              className={cn(
                "text-[10px] font-bold uppercase tracking-[0.3em] pointer-events-none transition-colors duration-500",
                isActive ? "text-slate-900" : "text-slate-400 group-hover:text-slate-600"
              )}
            >
              {section.label}
            </motion.span>
            
            <div className="relative w-12 h-[1px] bg-slate-200 overflow-hidden">
              <motion.div 
                initial={false}
                animate={{ 
                  scaleX: isActive ? 1 : 0,
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 bg-slate-900 origin-left"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
