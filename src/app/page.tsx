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

export default function Home() {
  return (
    <main className="h-screen overflow-y-auto snap-y snap-mandatory bg-[#0a0a0b] relative selection:bg-accent selection:text-white overflow-x-hidden">
      <CustomCursor />
      <SpotlightOverlay />
      <div className="grain-overlay" />
      <div className="vignette" />
      <Navbar />
      <SectionIndex />
      
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
      </SectionCard>

      <div className="snap-start min-h-screen">
        <Footer />
      </div>
    </main>
  );
}
