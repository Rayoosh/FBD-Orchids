"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState, useMemo } from "react";

export function SmoothScroll({ 
  children
}: { 
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

      const options = useMemo(() => ({
        lerp: 0.12, 
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 0.8,
        touchMultiplier: 1.5,
        infinite: false,
      }), []);

  if (!isMounted) return <>{children}</>;

  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  );
}
