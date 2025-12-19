"use client";

import { ReactLenis } from "lenis/react";

export function SmoothScroll({ 
  children,
  wrapper
}: { 
  children: React.ReactNode;
  wrapper?: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <ReactLenis 
      root={!wrapper} 
      options={{ 
        lerp: 0.1, 
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.5,
        infinite: false,
        wrapper: wrapper?.current || undefined,
        content: wrapper?.current?.firstElementChild as HTMLElement || undefined,
      }}
    >
      {children}
    </ReactLenis>
  );
}
