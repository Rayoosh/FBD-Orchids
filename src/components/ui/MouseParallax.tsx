"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function MouseParallax({ children, strength = 20, className = "" }: { children: React.ReactNode, strength?: number, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 30, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const translateX = useTransform(springX, [-0.5, 0.5], [-strength, strength]);
  const translateY = useTransform(springY, [-0.5, 0.5], [-strength, strength]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    const mouseX = (clientX - left) / width - 0.5;
    const mouseY = (clientY - top) / height - 0.5;
    
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      ref={ref} 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.div style={{ x: translateX, y: translateY }}>
        {children}
      </motion.div>
    </div>
  );
}
