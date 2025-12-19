"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ 
      lerp: 0.05, 
      duration: 1.5,
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 2,
      infinite: false,
    }}>
      {children}
    </ReactLenis>
  );
}
