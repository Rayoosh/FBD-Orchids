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
      wheelMultiplier: 1.1,
      touchMultiplier: 2,
      infinite: false,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    }), []);

  if (!isMounted) return <>{children}</>;

  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  );
}
