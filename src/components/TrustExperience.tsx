"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Heart, ShieldCheck, Clock, Award, Star } from "lucide-react";
import { Magnetic } from "./ui/Magnetic";

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
      <section ref={containerRef} id="experience" className="py-40 bg-[#fbfbfd] overflow-hidden relative">
        {/* Subtle Background Accent */}
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-50/30 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          {/* Minimalist Trust Bar - Editorial Style */}
          <div className="flex flex-wrap items-center justify-between gap-12 mb-48 border-y border-black/5 py-10">
            {trustSignals.map((signal, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="flex items-center space-x-4 group"
              >
                <div className="w-1 h-1 rounded-full bg-slate-300 group-hover:bg-blue-500 transition-colors duration-500" />
                <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-slate-400 group-hover:text-slate-900 transition-colors duration-500">
                  {signal.label}
                </span>
              </motion.div>
            ))}
          </div>
  
          {/* Asymmetrical Layout */}
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-32 items-start">
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="sticky top-40"
              >
                <div className="inline-flex items-center gap-3 mb-8">
                  <div className="w-8 h-[1px] bg-blue-500" />
                  <span className="text-[10px] text-blue-500 font-bold uppercase tracking-[0.3em]">Boutique Philosophy</span>
                </div>
                <h3 className="text-6xl md:text-8xl font-serif text-slate-900 leading-[0.9] mb-12 tracking-tighter">
                  Clinical <br /> Mastery.
                  <span className="block mt-4 italic text-slate-400 font-normal">Refined.</span>
                </h3>
                <p className="text-lg text-slate-500 leading-relaxed max-w-md mb-16 font-light">
                  We believe that world-class dentistry should feel like a sanctuary, not a clinical appointment. Every detail has been curated for a frictionless experience.
                </p>
                
                <div className="space-y-16">
                  {[
                    { title: "Mastery of Craft", desc: "Combining decades of expertise with digital dentistry to ensure perfection in every procedure." },
                    { title: "Unrivaled Comfort", desc: "From aromatherapy-infused spaces to bespoke sedation, we prioritize your peace of mind." }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start space-x-8 group">
                      <div className="text-3xl font-serif italic text-slate-200 group-hover:text-blue-500 transition-all duration-700 group-hover:translate-x-1">0{i+1}.</div>
                      <div className="pt-2">
                        <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-900 mb-3 group-hover:text-blue-900 transition-colors">{item.title}</h4>
                        <p className="text-sm text-slate-500 leading-relaxed max-w-xs">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
  
            <div className="relative pt-12">
              {/* Parallax Image Grid with Luxury Shadows */}
              <motion.div
                style={{ y: y1 }}
                className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden editorial-shadow mb-24 group"
              >
                <motion.img
                  initial={{ scale: 1.1 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2000"
                  alt="Modern Dentistry"
                  className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-slate-900/10 mix-blend-multiply" />
                <div className="absolute inset-0 border border-white/20 rounded-3xl" />
              </motion.div>
  
              <motion.div
                style={{ y: y2 }}
                className="lg:absolute -left-32 top-1/3 w-[80%] bg-white p-16 flex flex-col justify-center rounded-3xl luxury-shadow z-20"
              >
                <div className="flex gap-1 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-2xl font-serif italic text-slate-800 mb-10 leading-snug tracking-tight">
                  "Their approach to patient care is fundamentally different. It's the first time I've felt truly understood by a clinician."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-[1px] bg-slate-200" />
                  <p className="text-[9px] tracking-[0.4em] font-bold uppercase text-slate-400 italic">James Harrington — Patient</p>
                </div>
              </motion.div>
  
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="mt-64 lg:ml-auto max-w-sm text-right"
              >
                 <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-500 mb-6 flex items-center justify-end gap-3">
                    <span className="w-8 h-[1px] bg-blue-500/30" />
                    Commitment
                 </h4>
                 <p className="text-sm text-slate-400 leading-relaxed italic font-light">
                   Located in the heart of Eastside, our practice serves as a cornerstone for those who seek high-performance dental care without compromise.
                 </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    );
}
