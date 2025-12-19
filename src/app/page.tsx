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

import { BackgroundGradient } from "@/components/BackgroundGradient";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative w-full bg-transparent selection:bg-brand-blue-100 selection:text-brand-blue-900">
        <BackgroundGradient />
        <CustomCursor />
        <SpotlightOverlay />
        <div className="grain-overlay" />
        <Navbar />
        <SectionIndex />
        
        <div className="relative w-full">
          <SectionCard index={0} bgColor="bg-white/80 backdrop-blur-md">
            <Hero />
          </SectionCard>

          <SectionCard index={1} bgColor="bg-slate-50/70 backdrop-blur-md">
            <TrustExperience />
          </SectionCard>

          <SectionCard index={2} bgColor="bg-brand-blue-900/95 backdrop-blur-md" isDark>
            <ServicesTestimonials />
          </SectionCard>

          <SectionCard index={3} bgColor="bg-white/90 backdrop-blur-md">
            <AboutBooking />
            <Footer />
          </SectionCard>
        </div>
      </main>
    </SmoothScroll>
  );
}
