"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState, useMemo } from "react";

export function SmoothScroll({ 
  children,
  wrapper
}: { 
  children: React.ReactNode;
  wrapper?: React.RefObject<HTMLDivElement | null>;
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
    touchMultiplier: 1.5,
    infinite: false,
    wrapper: wrapper?.current || undefined,
    content: wrapper?.current?.firstElementChild as HTMLElement || undefined,
  }), [isMounted, wrapper?.current]);

  if (!isMounted) return <>{children}</>;

  return (
    <ReactLenis 
      root={!wrapper} 
      options={options}
    >
      {children}
    </ReactLenis>
  );
}
