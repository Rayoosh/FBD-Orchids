"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SectionIndex() {
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    { id: "hero", label: "Home" },
    { id: "experience", label: "Experience" },
    { id: "services", label: "Services" },
    { id: "booking", label: "Booking" },
  ];

  useEffect(() => {
    const observers = sections.map((section, index) => {
      const element = document.getElementById(section.id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(index);
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-6">
      {sections.map((section, index) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className="group relative flex items-center justify-end"
        >
          <span className={cn(
            "absolute right-8 font-display text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0",
            activeSection === index ? "text-brand-blue-900" : "text-slate-400"
          )}>
            {section.label}
          </span>
          <div className="relative flex items-center justify-center">
            <motion.div
              animate={{
                scale: activeSection === index ? 1 : 0.4,
                opacity: activeSection === index ? 1 : 0.2,
              }}
              className={cn(
                "w-3 h-3 rounded-full transition-colors duration-500",
                activeSection === index ? "bg-brand-blue-900" : "bg-slate-900"
              )}
            />
            {activeSection === index && (
              <motion.div
                layoutId="active-ring"
                className="absolute inset-[-4px] border border-brand-blue-900/20 rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
