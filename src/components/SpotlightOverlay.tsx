"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function SpotlightOverlay() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs only update when the values change
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 200);
      mouseY.set(e.clientY - 200);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          background: "radial-gradient(circle at center, rgba(59, 130, 246, 0.12) 0%, rgba(59, 130, 246, 0.02) 40%, transparent 70%)",
        }}
        className="absolute h-[400px] w-[400px] rounded-full will-change-transform transform-gpu"
      />
    </div>
  );
}
