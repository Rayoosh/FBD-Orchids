"use client";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustExperience } from "@/components/TrustExperience";
import { ServicesTestimonials } from "@/components/ServicesTestimonials";
import { AboutBooking } from "@/components/AboutBooking";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { CursorTrail } from "@/components/CursorTrail";
import { SpotlightOverlay } from "@/components/SpotlightOverlay";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SectionCard } from "@/components/ui/SectionCard";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import dynamic from "next/dynamic";

const BackgroundGradient = dynamic(
  () => import("@/components/BackgroundGradient").then((mod) => mod.BackgroundGradient),
  { ssr: false }
);

export default function Home() {
  const isMobile = useIsMobile();

  return (
    <main className="relative w-full bg-transparent selection:bg-brand-blue-100 selection:text-brand-blue-900">
      <BackgroundGradient />
      {!isMobile && (
        <>
          <CursorTrail />
          <CustomCursor />
          <SpotlightOverlay />
        </>
      )}
      <div className="grain-overlay" />
      <Navbar />
      <SectionIndex />
      
      <div className="relative w-full">
        <SectionCard id="home" index={0} bgColor="bg-white/70 backdrop-blur-lg md:backdrop-blur-xl">
          <Hero />
        </SectionCard>

        <SectionCard id="experience" index={1} bgColor="bg-slate-50/70 backdrop-blur-lg md:backdrop-blur-xl">
          <TrustExperience />
        </SectionCard>

        <SectionCard id="services" index={2} bgColor="bg-slate-50/70 backdrop-blur-lg md:backdrop-blur-xl">
          <ServicesTestimonials />
        </SectionCard>

          <SectionCard id="partnership" index={3} bgColor="bg-white/70 backdrop-blur-lg md:backdrop-blur-xl">
          <AboutBooking />
          <Footer />
        </SectionCard>
      </div>
    </main>
  );
}
