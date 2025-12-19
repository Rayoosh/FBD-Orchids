"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavHousingProps {
  children: React.ReactNode;
  className?: string;
}

export function NavHousing({ children, className }: NavHousingProps) {
  const [navRect, setNavRect] = useState({ width: 0, height: 0, top: 0, left: 0 });
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1920);
  const containerRef = useRef<HTMLDivElement>(null);
  const navWrapperRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const isScrolled = useTransform(scrollY, [0, 50], [0, 1]);
  
  // Track nav dimensions and window size
  useEffect(() => {
    const updateDimensions = () => {
      setWindowWidth(window.innerWidth);
      if (navWrapperRef.current) {
        const child = navWrapperRef.current.firstElementChild;
        if (child) {
          const rect = child.getBoundingClientRect();
          setNavRect({
            width: rect.width,
            height: rect.height,
            top: rect.top,
            left: rect.left
          });
        }
      }
    };

    updateDimensions();
    
    const observer = new ResizeObserver(updateDimensions);
    if (navWrapperRef.current) {
      observer.observe(navWrapperRef.current);
      if (navWrapperRef.current.firstElementChild) {
        observer.observe(navWrapperRef.current.firstElementChild);
      }
    }

    window.addEventListener("scroll", updateDimensions);
    window.addEventListener("resize", updateDimensions);
    
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateDimensions);
      window.removeEventListener("resize", updateDimensions);
    };
  }, [children]);

  // SVG Path generation for the "carved" shape
  // This shape creates a horizontal bar with a central "dip"
  const path = useMemo(() => {
    if (navRect.width === 0) return "";

    const paddingX = 24; // Horizontal breath room
    const paddingY = 16; // Vertical breath room
    const cornerRadius = 32; // Architectural soft curve
    
    const centerX = windowWidth / 2;
    const navW = navRect.width + paddingX * 2;
    const navH = navRect.height + paddingY * 2;
    const navT = navRect.top - paddingY;
    
    const xStart = centerX - navW / 2;
    const xEnd = centerX + navW / 2;
    const yBottom = navT + navH;
    
    // Architectural path with smooth curves
    return `
      M 0 0 
      H ${centerX - navW / 2 - cornerRadius}
      Q ${centerX - navW / 2} 0 ${centerX - navW / 2} ${cornerRadius}
      V ${yBottom - cornerRadius}
      Q ${centerX - navW / 2} ${yBottom} ${centerX - navW / 2 + cornerRadius} ${yBottom}
      H ${centerX + navW / 2 - cornerRadius}
      Q ${centerX + navW / 2} ${yBottom} ${centerX + navW / 2} ${yBottom - cornerRadius}
      V ${cornerRadius}
      Q ${centerX + navW / 2} 0 ${centerX + navW / 2 + cornerRadius} 0
      H ${windowWidth}
      V 0
      H 0
      Z
    `;
  }, [navRect, windowWidth]);

  return (
    <div className={cn("fixed top-0 left-0 w-full pointer-events-none z-[150]", className)}>
      <svg 
        className="absolute top-0 left-0 w-full h-[300px] drop-shadow-sm" 
        style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}
      >
        <motion.path
          d={path}
          fill="#0f172a"
          initial={false}
          animate={{ d: path }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 30,
            mass: 0.8
          }}
        />
      </svg>
      
      <div ref={navWrapperRef} className="pointer-events-auto">
        {children}
      </div>
    </div>
  );
}
