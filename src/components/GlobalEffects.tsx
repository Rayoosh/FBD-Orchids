"use client";

import dynamic from "next/dynamic";
import { useIsMobile } from "@/hooks/use-mobile";
import { CursorTrail } from "@/components/CursorTrail";
import { SpotlightOverlay } from "@/components/SpotlightOverlay";
import { useReducedMotion } from "framer-motion";

const BackgroundGradient = dynamic(
  () => import("@/components/BackgroundGradient").then((mod) => mod.BackgroundGradient),
  { ssr: false }
);

export function GlobalEffects() {
  const isMobile = useIsMobile();
  const shouldReduceMotion = useReducedMotion();

  // If user prefers reduced motion or is on mobile, we disable the heaviest effects
  const showHeavyEffects = !isMobile && !shouldReduceMotion;

  return (
    <>
      <BackgroundGradient />
      {showHeavyEffects && (
        <>
          <CursorTrail />
          <SpotlightOverlay />
        </>
      )}
      
      {/* Optimized overlays */}
      {!shouldReduceMotion && (
        <>
          <div 
            className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] transform-gpu"
            style={{ 
              backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
              backgroundRepeat: "repeat",
            }}
          />
          <div 
            className="fixed inset-0 pointer-events-none z-[9998] transform-gpu"
            style={{
              background: "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.02) 100%)"
            }}
          />
        </>
      )}
    </>
  );
}
