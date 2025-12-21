"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function SpotlightOverlay() {
  const [isMounted, setIsMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20, mass: 0.1 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    useEffect(() => {
      setIsMounted(true);
      const handleMouseMove = (e: MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      };
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    if (!isMounted) return null;

    return (
      <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
        <motion.div
          className="absolute opacity-100 will-change-transform"
          style={{ 
            x: smoothX,
            y: smoothY,
            background: "radial-gradient(circle at center, rgba(59, 130, 246, 0.08) 0%, transparent 70%)",
            width: 600,
            height: 600,
            left: -300,
            top: -300,
          }}
        />
      </div>
    );
}
