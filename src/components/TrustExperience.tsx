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
    <section ref={containerRef} id="experience" className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Minimalist Trust Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-40 border-b border-blue-50 pb-12">
          {trustSignals.map((signal, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center space-y-4 group"
            >
              <Magnetic strength={0.2}>
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                  <signal.icon className="w-5 h-5 transition-transform duration-500" />
                </div>
              </Magnetic>
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-slate-400">{signal.label}</span>
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
              <h2 className="text-xs text-blue-500 font-bold uppercase tracking-widest mb-6">The Boutique Philosophy</h2>
              <h3 className="text-5xl md:text-7xl font-medium text-blue-900 leading-tight mb-8">
                Clinical Excellence. <br />
                <span className="italic font-serif text-blue-400 pl-8">Redefined.</span>
              </h3>
              <p className="text-xl text-slate-600 leading-relaxed max-w-md mb-12">
                We believe that world-class dentistry should feel like a sanctuary, not a clinical appointment. Every detail of Eastside Dental has been curated to provide a frictionless, restorative experience.
              </p>
              
              <div className="space-y-12">
                <div className="flex items-start space-x-8 group">
                  <div className="text-4xl font-serif italic text-blue-200 group-hover:text-blue-500 transition-colors duration-700">01.</div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-blue-900 mb-2">Mastery of Craft</h4>
                    <p className="text-slate-600">Combining decades of clinical expertise with the latest in digital dentistry to ensure perfection in every procedure.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-8 group">
                  <div className="text-4xl font-serif italic text-blue-200 group-hover:text-blue-500 transition-colors duration-700">02.</div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-blue-900 mb-2">Unrivaled Comfort</h4>
                    <p className="text-slate-600">From our aromatherapy-infused lobby to our bespoke sedation options, we prioritize your nervous system's health.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="relative pt-20">
            {/* Parallax Image Grid */}
            <motion.div
              style={{ y: y1 }}
              className="relative w-full aspect-[3/4] rounded-[40px] overflow-hidden shadow-2xl mb-20"
            >
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2000"
                alt="Modern Dentistry"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-blue-900/5" />
            </motion.div>

              <motion.div
                style={{ y: y2 }}
                className="lg:absolute -left-20 top-1/2 w-[60%] aspect-square bg-blue-900 p-12 text-white flex flex-col justify-center rounded-[40px] shadow-2xl"
              >
              <Star className="w-8 h-8 text-blue-300 mb-6 fill-blue-300" />
              <p className="text-2xl font-serif italic mb-8 leading-relaxed">
                "Their approach to patient care is fundamentally different. It's the first time I've felt truly understood by a clinician."
              </p>
              <p className="text-[10px] tracking-[0.3em] font-bold uppercase opacity-60">James Harrington — Patient</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-40 lg:ml-20 max-w-sm"
            >
               <h4 className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-4">Commitment</h4>
               <p className="text-slate-600 leading-relaxed">
                 Located in the heart of Eastside, our practice serves as a cornerstone for those who seek high-performance dental care without compromise.
               </p>
               <div className="mt-8 h-px w-20 bg-blue-100" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
