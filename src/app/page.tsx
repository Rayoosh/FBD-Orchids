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
  return (
    <SmoothScroll>
      <main className="relative w-full bg-[#0a0a0b] selection:bg-brand-blue-100 selection:text-brand-blue-900">
        <CustomCursor />
        <SpotlightOverlay />
        <div className="grain-overlay" />
        <Navbar />
        <SectionIndex />
        
        <div className="relative w-full">
          <SectionCard index={0} bgColor="bg-white">
            <Hero />
          </SectionCard>

          <SectionCard index={1} bgColor="bg-slate-50/50">
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
