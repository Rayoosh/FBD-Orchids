"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, useSpring, useMotionValue, animate } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavHousingProps {
  children: React.ReactElement;
  className?: string;
}

export function NavHousing({ children, className }: NavHousingProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1920);
  
  // Shared progress value: 0 is top, 1 is scrolled
  const progress = useMotionValue(0);
  const springProgress = useSpring(progress, {
    stiffness: 200,
    damping: 30,
    mass: 0.8
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
      animate(progress, scrolled ? 1 : 0, { duration: 0.4 });
    };

    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [progress]);

  // Dimensions based on progress
  // We'll use estimated dimensions for the two states to ensure instant sync
  // Full width state (progress 0)
  // Shrunk state (progress 1)
  
  const path = useMemo(() => {
    // We'll calculate the path based on the current window size
    // and estimated navbar dimensions to ensure they are reactive.
    // However, SVG 'd' attribute animation is best handled by framer-motion's animate prop.
    // So we'll define the two paths and let it interpolate.
    
    const centerX = windowWidth / 2;
    
    // Config for State 0 (Top)
    const w0 = Math.min(windowWidth * 0.9, 1200);
    const h0 = 76; // Height + Padding
    const t0 = 24; // MarginTop
    const r0 = h0 / 2;

    // Config for State 1 (Scrolled)
    // The icons-only navbar is roughly 400-500px wide
    const w1 = 480; 
    const h1 = 56; // Height + Padding
    const t1 = 16; // MarginTop
    const r1 = h1 / 2;

    const getPath = (w: number, h: number, t: number, r: number) => {
      const navW = w + 32; // Optimized padding
      const navH = h;
      const navT = t; 
      
      return `
        M 0 0 
        H ${centerX - navW / 2 - r}
        Q ${centerX - navW / 2} 0 ${centerX - navW / 2} ${r}
        V ${navT + navH - r}
        Q ${centerX - navW / 2} ${navT + navH} ${centerX - navW / 2 + r} ${navT + navH}
        H ${centerX + navW / 2 - r}
        Q ${centerX + navW / 2} ${navT + navH} ${centerX + navW / 2} ${navT + navH - r}
        V ${r}
        Q ${centerX + navW / 2} 0 ${centerX + navW / 2 + r} 0
        H ${windowWidth}
        V 0
        H 0
        Z
      `;
    };

    return {
      top: getPath(w0, h0, t0, r0),
      scrolled: getPath(w1, h1, t1, r1)
    };
  }, [windowWidth]);

  return (
    <div className={cn("fixed top-0 left-0 w-full pointer-events-none z-[150]", className)}>
      <svg className="absolute top-0 left-0 w-full h-[200px]">
        <motion.path
          d={isScrolled ? path.scrolled : path.top}
          fill="#0f172a"
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 30,
            mass: 0.8
          }}
        />
      </svg>
      
      <div className="pointer-events-auto">
        {React.cloneElement(children as React.ReactElement<any>, { isScrolled })}
      </div>
    </div>
  );
}
