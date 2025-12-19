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

    const xPos = useTransform(smoothX, (v) => `${v}px`);
    const yPos = useTransform(smoothY, (v) => `${v}px`);

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
      <motion.div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{ 
          background: `radial-gradient(600px circle at var(--x) var(--y), rgba(59, 130, 246, 0.08), transparent 80%)`,
          // @ts-ignore
          "--x": xPos,
          "--y": yPos,
        }}
      />
    );
}
