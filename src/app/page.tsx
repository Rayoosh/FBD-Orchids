import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustExperience } from "@/components/TrustExperience";
import { ServicesTestimonials } from "@/components/ServicesTestimonials";
import { AboutBooking } from "@/components/AboutBooking";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative selection:bg-accent selection:text-white">
      <CustomCursor />
      <div className="grain-overlay" />
      <Navbar />
      <Hero />
      <TrustExperience />
      <ServicesTestimonials />
      <AboutBooking />
      <Footer />
    </main>
  );
}
