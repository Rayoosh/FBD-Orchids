"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavHousingProps {
  children: React.ReactNode;
  className?: string;
}

export function NavHousing({ children, className }: NavHousingProps) {
  const [navRect, setNavRect] = useState({ width: 0, height: 0, top: 0, left: 0 });
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1920);
  const navWrapperRef = useRef<HTMLDivElement>(null);
  
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
  const path = useMemo(() => {
    if (navRect.width === 0) return "";

    const paddingX = 24; 
    const paddingY = 16; 
    
    const centerX = windowWidth / 2;
    const navW = navRect.width + paddingX * 2;
    const navH = navRect.height + paddingY * 2;
    const navT = navRect.top - paddingY;
    
    // Match the Navbar's rounded-full corner radius
    const cornerRadius = navH / 2;
    
    // Architectural path with smooth curves matching the Navbar's rounded-full
    return `
      M 0 0 
      H ${centerX - navW / 2 - cornerRadius}
      Q ${centerX - navW / 2} 0 ${centerX - navW / 2} ${cornerRadius}
      V ${navT + navH - cornerRadius}
      Q ${centerX - navW / 2} ${navT + navH} ${centerX - navW / 2 + cornerRadius} ${navT + navH}
      H ${centerX + navW / 2 - cornerRadius}
      Q ${centerX + navW / 2} ${navT + navH} ${centerX + navW / 2} ${navT + navH - cornerRadius}
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
        className="absolute top-0 left-0 w-full h-[300px]" 
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
