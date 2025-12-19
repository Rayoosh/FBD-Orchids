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

export default function Home() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#f0f0f2] relative selection:bg-accent selection:text-white overflow-x-hidden">
        <CustomCursor />
        <SpotlightOverlay />
        <div className="grain-overlay" />
        <div className="vignette" />
        <Navbar />
        
        <SectionCard>
          <Hero />
        </SectionCard>

        <SectionCard>
          <TrustExperience />
        </SectionCard>

        <SectionCard>
          <ServicesTestimonials />
        </SectionCard>

        <SectionCard>
          <AboutBooking />
        </SectionCard>

        <Footer />
      </main>
    </SmoothScroll>
  );
}
