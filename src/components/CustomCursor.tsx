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

  // Velocity-based scaling for liquid effect
  const [velocity, setVelocity] = useState(0);
  
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
    
    if (!isVisible) setIsVisible(true);

    // Simple velocity approximation
    const speed = Math.sqrt(Math.pow(e.movementX, 2) + Math.pow(e.movementY, 2));
    setVelocity(speed);

    // Detect hoverable elements
    const target = e.target as HTMLElement;
    const isPointer = window.getComputedStyle(target).cursor === "pointer";
    setIsHovered(isPointer || target.closest('button') !== null || target.closest('a') !== null);
  }, [mouseX, mouseY, isVisible]);

  const handleMouseDown = () => setIsClicking(true);
  const handleMouseUp = () => setIsClicking(false);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    
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
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-blue-500 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          scale,
          opacity,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-blue-500/30 rounded-full pointer-events-none z-[9998]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          scale: isHovered ? 1.5 : 1,
          opacity: isVisible ? 0.5 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      />
    </>
  );
}
