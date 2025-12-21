"use client";

import dynamic from "next/dynamic";
import { useIsMobile } from "@/hooks/use-mobile";
import { CursorTrail } from "@/components/CursorTrail";
import { SpotlightOverlay } from "@/components/SpotlightOverlay";

const BackgroundGradient = dynamic(
  () => import("@/components/BackgroundGradient").then((mod) => mod.BackgroundGradient),
  { ssr: false }
);

export function GlobalEffects() {
  const isMobile = useIsMobile();

  return (
    <>
      <BackgroundGradient />
      {!isMobile && (
        <>
          <CursorTrail />
          <SpotlightOverlay />
        </>
      )}
      <div className="grain-overlay" />
      <div className="vignette" />
    </>
  );
}
