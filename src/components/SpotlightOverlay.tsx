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

    const background = useTransform(
      [smoothX, smoothY],
      ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(59, 130, 246, 0.08), transparent 80%)`,
      {
        // Add a small delay/throttle to the transform if needed, 
        // but usually Framer Motion handles this well.
      }
    );

    useEffect(() => {
      setIsMounted(true);
      const handleMouseMove = (e: MouseEvent) => {
        // Use requestAnimationFrame for smoother updates
        requestAnimationFrame(() => {
          mouseX.set(e.clientX);
          mouseY.set(e.clientY);
        });
      };
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

  if (!isMounted) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{ background }}
    />
  );
}
