"use client";

import { Navbar } from "@/components/Navbar";
import { ConciergeBar } from "@/components/ConciergeBar";
import { Hero } from "@/components/Hero";
import { TrustExperience } from "@/components/TrustExperience";
import { ServicesTestimonials } from "@/components/ServicesTestimonials";
import { AboutBooking } from "@/components/AboutBooking";
import { Footer } from "@/components/Footer";
import { SectionCard } from "@/components/ui/SectionCard";
import { SectionIndex } from "@/components/ui/SectionIndex";

export default function Home() {
  return (
    <main className="relative w-full bg-transparent selection:bg-brand-blue-100 selection:text-brand-blue-900">
      <Navbar />
      <ConciergeBar />
      <SectionIndex />
      
      <div className="relative w-full overflow-x-hidden">
        <SectionCard id="home" index={0} bgColor="bg-white md:bg-white/70 backdrop-blur-none md:backdrop-blur-2xl">
          <Hero />
        </SectionCard>

        <SectionCard id="experience" index={1} bgColor="bg-white md:bg-slate-50/70 backdrop-blur-none md:backdrop-blur-2xl">
          <TrustExperience />
        </SectionCard>

        <SectionCard id="services" index={2} bgColor="bg-white md:bg-slate-50/70 backdrop-blur-none md:backdrop-blur-2xl">
          <ServicesTestimonials />
        </SectionCard>

          <SectionCard id="partnership" index={3} bgColor="bg-white md:bg-white/70 backdrop-blur-none md:backdrop-blur-2xl">
          <AboutBooking />
          <Footer />
        </SectionCard>
      </div>
    </main>
  );
}
