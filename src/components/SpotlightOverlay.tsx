"use client";

import React, { useEffect, useRef } from "react";

export function SpotlightOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spotlight = spotlightRef.current;
    if (!spotlight) return;

    let rafId: number;
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const updatePosition = () => {
      // Very light smoothing for that "premium" feel without heavy springs
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;
      
      spotlight.style.transform = `translate3d(${currentX - 300}px, ${currentY - 300}px, 0)`;
      rafId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
    >
      <div
        ref={spotlightRef}
        className="absolute h-[600px] w-[600px] rounded-full will-change-transform"
        style={{
          background: "radial-gradient(circle at center, rgba(59, 130, 246, 0.07) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
