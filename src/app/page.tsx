import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustExperience } from "@/components/TrustExperience";
import { ServicesTestimonials } from "@/components/ServicesTestimonials";
import { AboutBooking } from "@/components/AboutBooking";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { SpotlightOverlay } from "@/components/SpotlightOverlay";

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative selection:bg-accent selection:text-white overflow-x-hidden">
      <CustomCursor />
      <SpotlightOverlay />
      <div className="grain-overlay" />
      <div className="vignette" />
      <Navbar />
      <Hero />
      <TrustExperience />
      <ServicesTestimonials />
      <AboutBooking />
      <Footer />
    </main>
  );
}
