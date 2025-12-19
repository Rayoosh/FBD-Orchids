"use client";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustExperience } from "@/components/TrustExperience";
import { ServicesTestimonials } from "@/components/ServicesTestimonials";
import { AboutBooking } from "@/components/AboutBooking";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { SpotlightOverlay } from "@/components/SpotlightOverlay";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SectionCard } from "@/components/ui/SectionCard";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { useEffect, useRef } from "react";

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide scrollbar globally to make it feel like an "app"
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <SmoothScroll wrapper={scrollContainerRef}>
      <main className="h-screen bg-[#0f172a] relative selection:bg-accent selection:text-white overflow-hidden">
        <CustomCursor />
        <SpotlightOverlay />
        <div className="grain-overlay" />
        <Navbar />
        <SectionIndex scrollContainerRef={scrollContainerRef} />
        
        <div 
          ref={scrollContainerRef}
          className="h-screen w-full overflow-y-auto overflow-x-hidden no-scrollbar"
        >
          <SectionCard index={0} bgColor="bg-white">
            <Hero />
          </SectionCard>

          <SectionCard index={1} bgColor="bg-[#f8fafc]">
            <TrustExperience />
          </SectionCard>

          <SectionCard index={2} bgColor="bg-brand-blue-900" isDark>
            <ServicesTestimonials />
          </SectionCard>

          <SectionCard index={3} bgColor="bg-white">
            <AboutBooking />
            <Footer />
          </SectionCard>
        </div>
      </main>
    </SmoothScroll>
  );
}
