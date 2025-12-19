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
        lerp: 0.1, 
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 2.0,
        infinite: false,
      }), []);

  if (!isMounted) return <>{children}</>;

  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  );
}
