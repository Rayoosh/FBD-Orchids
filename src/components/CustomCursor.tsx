"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for liquid feel
  const springConfig = { stiffness: 400, damping: 28, mass: 0.2 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
    
    if (!isVisible) setIsVisible(true);

    // Detect hoverable elements
    const target = e.target as HTMLElement;
    const isPointer = window.getComputedStyle(target).cursor === "pointer";
    setIsHovered(isPointer || target.closest('button') !== null || target.closest('a') !== null);
  }, [mouseX, mouseY, isVisible]);

  const handleMouseDown = () => setIsClicking(true);
  const handleMouseUp = () => setIsClicking(false);

    useEffect(() => {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("mousedown", handleMouseDown, { passive: true });
      window.addEventListener("mouseup", handleMouseUp, { passive: true });
      
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }, [handleMouseMove]);

    const scale = isClicking ? 0.8 : isHovered ? 2.5 : 1;
    const opacity = isVisible ? 1 : 0;
    
      return (
      <>
        {/* Spotlight Glow - keeping this as it's not the 'dot' but adds atmosphere */}
        <motion.div
          className="fixed top-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none z-[9997]"
          style={{
            x: smoothX,
            y: smoothY,
            translateX: "-50%",
            translateY: "-50%",
            opacity: isVisible ? 1 : 0,
            willChange: "transform, opacity"
          }}
        />
      </>
    );
}
