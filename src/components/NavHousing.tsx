"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, useSpring, useMotionValue, animate } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_DIMENSIONS } from "@/lib/nav-constants";

interface NavHousingProps {
  children: React.ReactElement;
  className?: string;
}

export function NavHousing({ children, className }: NavHousingProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    setWindowWidth(window.innerWidth);

    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };

    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getPath = (width: number, isScrolledState: boolean) => {
    if (width === 0) return "M 0 0 H 100 V 100 H 0 Z"; // Fallback path

    const centerX = width / 2;
    
    const w = isScrolledState 
      ? NAV_DIMENSIONS.SCROLLED.WIDTH 
      : Math.min(width * NAV_DIMENSIONS.TOP.WIDTH_PERCENT, NAV_DIMENSIONS.TOP.WIDTH);
    const h = isScrolledState ? NAV_DIMENSIONS.SCROLLED.HEIGHT : NAV_DIMENSIONS.TOP.HEIGHT;
    const t = isScrolledState ? NAV_DIMENSIONS.SCROLLED.MARGIN_TOP : NAV_DIMENSIONS.TOP.MARGIN_TOP;
    const r = h / 2;

    const navW = w + 32; 
    const navH = h + 24; // Increased depth for overlap
    const navT = t; 
    const cornerR = r + 16; 
    
    return `
      M 0 0 
      H ${centerX - navW / 2 - cornerR}
      Q ${centerX - navW / 2} 0 ${centerX - navW / 2} ${cornerR}
      V ${navT + navH - cornerR}
      Q ${centerX - navW / 2} ${navT + navH} ${centerX - navW / 2 + cornerR} ${navT + navH}
      H ${centerX + navW / 2 - cornerR}
      Q ${centerX + navW / 2} ${navT + navH} ${centerX + navW / 2} ${navT + navH - cornerR}
      V ${cornerR}
      Q ${centerX + navW / 2} 0 ${centerX + navW / 2 + cornerR} 0
      H ${width}
      V 0
      H 0
      Z
    `;
  };

  const currentPath = useMemo(() => getPath(windowWidth || 1920, isScrolled), [windowWidth, isScrolled]);

  // Use a stable initial path for motion to avoid hydration mismatch and empty strings
  const initialPath = useMemo(() => getPath(1920, false), []);

  if (!isMounted) return null;

  return (
    <div className={cn("fixed top-0 left-0 w-full pointer-events-none z-[150]", className)}>
      <svg className="absolute top-0 left-0 w-full h-[400px]" preserveAspectRatio="none">
        <motion.path
          initial={{ d: initialPath }}
          animate={{ d: currentPath }}
          fill="#0f172a"
          transition={NAV_DIMENSIONS.SPRING}
        />
      </svg>
      
      <div className="relative pointer-events-auto">
        {React.cloneElement(children as React.ReactElement<any>, { isScrolled })}
      </div>
    </div>
  );
}
