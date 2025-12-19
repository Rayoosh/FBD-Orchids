"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden bg-background">
      {/* Editorial Decorative Text */}
      <div className="absolute top-40 left-10 text-[15vw] font-serif font-black text-primary/5 leading-none select-none pointer-events-none uppercase">
        Mastery
      </div>
      
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center relative z-10">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center space-x-4 mb-8">
              <span className="h-px w-12 bg-accent" />
              <span className="text-display text-xs text-muted-foreground">The Art of Clinical Excellence</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-serif font-light leading-[0.95] mb-8 tracking-tighter">
              A New <br />
              <span className="text-serif-italic pl-[0.5em] text-accent">Standard</span> <br />
              of Care.
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-xl font-light">
              Experience dentistry redefined. Where clinical precision meets a tailored, high-end environment designed for your ultimate peace of mind.
            </p>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Button asChild size="lg" className="bg-primary hover:bg-brand-blue-900 text-white rounded-full h-16 px-10 text-lg group transition-all duration-500">
                <Link href="#booking" className="flex items-center">
                  Book Your Experience 
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </motion.span>
                </Link>
              </Button>
              <Link href="#services" className="text-display text-xs group flex items-center space-x-2 py-4">
                <span className="relative overflow-hidden inline-block">
                  View Our Specialties
                  <span className="absolute bottom-0 left-0 w-full h-px bg-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </span>
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="relative lg:h-[80vh] flex flex-col justify-center">
          {/* Main Asymmetrical Image */}
          <motion.div
            style={{ y: y1 }}
            className="relative w-full aspect-[4/5] rounded-sm overflow-hidden luxury-shadow group"
          >
            <img
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=2000"
              alt="Freemans Bay Dental Interior"
              className="object-cover w-full h-full scale-110 group-hover:scale-100 transition-transform duration-[2s] ease-out"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
          </motion.div>

          {/* Overlapping Secondary Image */}
          <motion.div
            style={{ y: y2 }}
            className="absolute -bottom-20 -left-20 w-1/2 aspect-square rounded-sm overflow-hidden luxury-shadow hidden xl:block border-[12px] border-background"
          >
            <img
              src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1000"
              alt="Clinical Precision"
              className="object-cover w-full h-full"
            />
          </motion.div>

          {/* Floating Reassurance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute top-20 -right-12 glass-morphism p-8 max-w-[200px] hidden md:block"
          >
            <div className="flex text-accent mb-2">
              {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-3 h-3 fill-current" />)}
            </div>
            <p className="text-xs font-display tracking-widest uppercase mb-2">Patient Rating</p>
            <p className="text-sm font-serif italic text-muted-foreground leading-snug">"The most sophisticated dental practice I've ever visited in Auckland."</p>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4"
      >
        <span className="text-display text-[10px] text-muted-foreground rotate-90 origin-left ml-4">Discover More</span>
        <div className="w-px h-16 bg-gradient-to-b from-primary/20 via-primary to-transparent" />
      </motion.div>
    </section>
  );
}
