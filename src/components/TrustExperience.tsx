"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Heart, ShieldCheck, Clock, Award, Star, Sparkles } from "lucide-react";
import { TextReveal, Reveal, ImageReveal } from "./ui/Reveal";

const trustSignals = [
  { label: "General Care", icon: Heart },
  { label: "Cosmetic Brilliance", icon: Sparkles },
  { label: "Emergency Support", icon: Clock },
  { label: "ACC Registered", icon: ShieldCheck },
];

export function TrustExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  return (
    <section ref={containerRef} id="experience" className="py-32 bg-transparent overflow-hidden relative min-h-full flex items-center">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-50/30 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Minimalist Trust Bar - Editorial Style */}
        <div className="flex flex-wrap items-center justify-between gap-12 mb-48 border-y border-black/5 py-10">
          {trustSignals.map((signal, index) => (
            <Reveal key={index} delay={index * 0.1} y={10}>
              <div className="flex items-center space-x-4 group">
                <div className="w-1 h-1 rounded-full bg-slate-300 group-hover:bg-blue-500 transition-colors duration-500" />
                <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-slate-400 group-hover:text-slate-900 transition-colors duration-500">
                  {signal.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Asymmetrical Layout */}
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-32 items-start">
          <div className="relative">
            <div className="sticky top-40">
              <Reveal>
                <div className="inline-flex items-center gap-3 mb-8">
                  <div className="w-8 h-[1px] bg-blue-500" />
                  <span className="text-[10px] text-blue-500 font-bold uppercase tracking-[0.3em]">Boutique Philosophy</span>
                </div>
              </Reveal>
              
                <TextReveal 
                  text="Modern Dental Care." 
                  className="text-6xl md:text-8xl font-serif text-slate-900 leading-[0.9] mb-12 tracking-tighter"
                />
                
                <Reveal delay={0.4}>
                  <p className="text-lg text-slate-500 leading-relaxed max-w-md mb-16 font-light">
                    We believe in providing central Auckland dental care at affordable prices. Our clinic combines advanced technology with a gentle, patient-first approach.
                  </p>
                </Reveal>
                
                <div className="space-y-16">
                  {[
                    { title: "General Dentistry", desc: "Comprehensive care from routine check-ups to advanced restorations, focused on long-term oral health." },
                    { title: "Specialist Care", desc: "ACC registered providers offering emergency care, surgical extractions, and complex cosmetic treatments." }
                  ].map((item, i) => (
                  <Reveal key={i} delay={0.5 + i * 0.1}>
                    <div className="flex items-start space-x-8 group">
                      <div className="text-3xl font-serif italic text-slate-200 group-hover:text-blue-500 transition-all duration-700 group-hover:translate-x-1">0{i+1}.</div>
                      <div className="pt-2">
                        <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-900 mb-3 group-hover:text-blue-900 transition-colors">{item.title}</h4>
                        <p className="text-sm text-slate-500 leading-relaxed max-w-xs">{item.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          <div className="relative pt-12">
            {/* Parallax Image Grid with Luxury Shadows */}
            <motion.div style={{ y: y1 }} className="mb-24">
              <ImageReveal 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2000" 
                alt="Modern Dentistry"
                className="editorial-shadow aspect-[4/5]"
              />
            </motion.div>

            <motion.div
              style={{ y: y2 }}
              className="lg:absolute -left-32 top-1/3 w-full lg:w-[110%] bg-white p-12 lg:p-16 flex flex-col justify-center rounded-3xl luxury-shadow z-20"
            >
              <Reveal>
                <div className="flex gap-1 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-2xl font-serif italic text-slate-800 mb-10 leading-snug tracking-tight">
                  "Their approach to patient care is fundamentally different. It's the first time I've felt truly understood by a clinician."
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-[1px] bg-slate-200" />
                  <p className="text-[9px] tracking-[0.4em] font-bold uppercase text-slate-400 italic">James Harrington — Patient</p>
                </div>
              </Reveal>
            </motion.div>

              <div className="mt-64 lg:ml-auto max-w-sm text-right">
                <Reveal delay={0.6}>
                   <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-500 mb-6 flex items-center justify-end gap-3">
                      <span className="w-8 h-[1px] bg-blue-500/30" />
                      Commitment
                   </h4>
                </Reveal>
                <Reveal delay={0.7}>
                   <p className="text-sm text-slate-400 leading-relaxed italic font-light">
                     Located at 40 College Hill, Freemans Bay, our practice serves as a cornerstone for central Auckland residents seeking quality dental care.
                   </p>
                </Reveal>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
