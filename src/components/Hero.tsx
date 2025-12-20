"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Shield, Star, Users } from "lucide-react";
import { Magnetic } from "./ui/Magnetic";
import { GeometricAccent, CornerAccent } from "./ui/Accents";
import { TextReveal, Reveal } from "./ui/Reveal";
import { Button } from "./ui/button";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={containerRef} className="relative h-full min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-transparent">
      {/* Visual Accents */}
      <GeometricAccent className="absolute top-20 right-20 w-40 h-40 text-brand-blue-500 hidden xl:block" />
      <CornerAccent className="absolute top-40 left-10 hidden xl:block" />
      <CornerAccent className="absolute bottom-40 right-10 rotate-180 hidden xl:block" />
      
      {/* Atmospheric Light Leaks */}
      <div className="light-leak top-[-10%] left-[-10%] opacity-20" />
      <div className="light-leak bottom-[-10%] right-[-10%] opacity-15 rotate-180" />
      
      <div className="container mx-auto px-6 md:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7">
              <Reveal delay={0.1}>
                  <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-brand-blue-50/50 backdrop-blur-sm border border-brand-blue-100/50 rounded-xl text-brand-blue-900 text-xs font-display uppercase tracking-[0.2em] mb-10 editorial-shadow">
                    <Shield className="w-4 h-4 text-brand-blue-500" />
                    <span>Central Auckland's Family Practice</span>
                  </div>
                </Reveal>
                
                  <TextReveal 
                    text="Gentle Care. Healthy Smiles." 
                    className="text-6xl md:text-9xl font-light text-brand-blue-900 leading-[0.85] tracking-tighter mb-10 premium-gradient-text"
                    delay={0.2}
                  />
                
                <Reveal delay={0.6}>
                  <p className="text-xl md:text-2xl text-slate-600 max-w-xl mb-14 leading-relaxed font-light">
                    Affordable, high-quality dentistry in the heart of Auckland. From emergency relief to family check-ups, we use modern technology to keep your smile healthy.
                  </p>
                </Reveal>
            
            <Reveal delay={0.8}>
              <div className="flex flex-wrap gap-8 items-center">
                  <Magnetic>
                    <Button variant="premium" size="lg" className="h-16 px-12 luxury-shadow group">
                      Book Consultation
                      <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Button>
                  </Magnetic>
                
                  <Magnetic strength={0.2}>
                    <Button variant="premium-outline" size="lg" className="h-16 px-10">
                      Our Services
                    </Button>
                  </Magnetic>
                </div>
              </Reveal>

            <Reveal delay={1}>
              <div className="mt-20 flex items-center gap-12">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-14 h-14 rounded-xl border-4 border-white overflow-hidden luxury-shadow">
                      <img src={`https://i.pravatar.cc/150?u=${i + 20}`} alt="Patient" className="grayscale hover:grayscale-0 transition-all duration-500" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-1.5 text-brand-blue-500 mb-1.5">
                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                    <p className="text-sm font-display uppercase tracking-widest text-brand-blue-900">1.2k+ Patient Reviews</p>

                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 relative">
            <motion.div
              style={{ y, opacity, scale }}
              className="relative"
            >
              <div className="relative z-10 aspect-[3/4] rounded-2xl overflow-hidden editorial-shadow group">
                <div className="absolute inset-0 bg-brand-blue-900/10 group-hover:bg-transparent transition-colors duration-700 z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop" 
                  alt="Modern Dental Studio" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating Cards */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2, duration: 1 }}
                className="absolute -top-12 -right-8 bg-white/90 backdrop-blur-md p-7 rounded-2xl luxury-shadow z-20 hidden md:block border border-white/20"
              >
                <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-brand-blue-50 rounded-xl flex items-center justify-center text-brand-blue-900">
                      <Users className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-[10px] text-brand-blue-500 uppercase tracking-[0.2em] font-bold mb-0.5">Emergency</p>
                      <p className="text-xl font-serif text-brand-blue-950 italic">Same-day Care</p>
                    </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.4, duration: 1 }}
                className="absolute -bottom-12 -left-8 bg-brand-blue-900 p-10 rounded-2xl luxury-shadow z-20 hidden md:block text-white"
              >
                <p className="text-5xl font-light mb-2 tracking-tighter italic">Free</p>
                <p className="text-brand-blue-200 text-[10px] uppercase tracking-[0.2em] leading-relaxed font-medium">Dental Care for <br /> Year 9 to 18</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
