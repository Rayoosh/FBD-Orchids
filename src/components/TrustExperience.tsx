"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Heart, ShieldCheck, Clock, Award, Star } from "lucide-react";

const trustSignals = [
  { label: "Clinical Mastery", icon: Award },
  { label: "Bespoke Care", icon: Heart },
  { label: "Precision Tech", icon: ShieldCheck },
  { label: "Time Honored", icon: Clock },
];

export function TrustExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section ref={containerRef} id="experience" className="py-32 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Minimalist Trust Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-40 border-b border-border pb-12">
          {trustSignals.map((signal, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center space-y-4 group"
            >
              <signal.icon className="w-5 h-5 text-accent group-hover:scale-110 transition-transform duration-500" />
              <span className="text-[10px] font-display uppercase tracking-[0.3em] text-muted-foreground">{signal.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Asymmetrical Layout */}
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-24 items-start relative">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="sticky top-32"
            >
              <h2 className="text-display text-xs text-accent mb-6">The Boutique Philosophy</h2>
              <h3 className="text-5xl md:text-7xl font-serif font-light leading-tight mb-8">
                Clinical Excellence. <br />
                <span className="text-serif-italic pl-8 text-primary">Redefined.</span>
              </h3>
              <p className="text-xl text-muted-foreground leading-relaxed font-light max-w-md mb-12">
                We believe that world-class dentistry should feel like a sanctuary, not a clinical appointment. Every detail of Freemans Bay Dental has been curated to provide a frictionless, restorative experience.
              </p>
              
              <div className="space-y-12">
                <div className="flex items-start space-x-8 group">
                  <div className="text-4xl font-serif italic text-accent opacity-30 group-hover:opacity-100 transition-opacity duration-700">01.</div>
                  <div>
                    <h4 className="text-display text-xs mb-2 tracking-widest">Mastery of Craft</h4>
                    <p className="text-muted-foreground font-light">Combining decades of clinical expertise with the latest in digital dentistry to ensure perfection in every procedure.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-8 group">
                  <div className="text-4xl font-serif italic text-accent opacity-30 group-hover:opacity-100 transition-opacity duration-700">02.</div>
                  <div>
                    <h4 className="text-display text-xs mb-2 tracking-widest">Unrivaled Comfort</h4>
                    <p className="text-muted-foreground font-light">From our aromatherapy-infused lobby to our bespoke sedation options, we prioritize your nervous system's health.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="relative pt-20">
            {/* Parallax Image Grid */}
            <motion.div
              style={{ y: y1 }}
              className="relative w-full aspect-[3/4] rounded-sm overflow-hidden luxury-shadow mb-20"
            >
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2000"
                alt="Modern Dentistry"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-primary/5" />
            </motion.div>

              <motion.div
                style={{ y: y2 }}
                className="lg:absolute -left-20 top-1/2 w-[60%] aspect-square bg-brand-blue-900 p-12 text-white flex flex-col justify-center rounded-sm luxury-shadow"
              >
              <Star className="w-8 h-8 text-accent mb-6 fill-accent" />
              <p className="text-2xl font-serif italic mb-8 leading-relaxed">
                "Their approach to patient care is fundamentally different. It's the first time I've felt truly understood by a clinician."
              </p>
              <p className="text-display text-[10px] tracking-[0.3em] opacity-60">James Harrington — Patient</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-40 lg:ml-20 max-w-sm"
            >
               <h4 className="text-display text-xs mb-4 text-accent">Commitment</h4>
               <p className="text-muted-foreground font-light leading-relaxed">
                 Located in the heart of Freemans Bay, our practice serves as a cornerstone for those who seek high-performance dental care without compromise.
               </p>
               <div className="mt-8 h-px w-20 bg-primary/20" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
