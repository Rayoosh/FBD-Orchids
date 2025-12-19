"use client";

import { Navbar } from "@/components/Navbar";
import { NavHousing } from "@/components/NavHousing";
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
      <main className="relative w-full bg-[#0f172a] selection:bg-accent selection:text-white">
        <CustomCursor />
        <SpotlightOverlay />
        <div className="grain-overlay" />
        <NavHousing>
          <Navbar />
        </NavHousing>
        <SectionIndex />
        
        <div className="relative w-full pt-20">
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
