"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Shield, Star, Users } from "lucide-react";
import { Magnetic } from "./ui/Magnetic";
import { MouseParallax } from "./ui/MouseParallax";

export function Hero() {
  const titleWords = "Artistry in Modern Dentistry".split(" ");

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-background">
      {/* Atmospheric Light Leaks */}
      <div className="light-leak top-[-10%] left-[-10%] opacity-20" />
      <div className="light-leak bottom-[-10%] right-[-10%] opacity-15 rotate-180" />
      
      <div className="container mx-auto px-6 md:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-brand-blue-50 border border-brand-blue-100 rounded-xl text-brand-blue-900 text-xs font-display uppercase tracking-[0.2em] mb-10 editorial-shadow">
                <Shield className="w-4 h-4 text-brand-blue-500" />
                <span>Elite Dental Excellence</span>
              </div>
              
              <h1 className="text-6xl md:text-9xl font-light text-brand-blue-900 leading-[0.85] tracking-tighter mb-10 overflow-hidden">
                {titleWords.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: i * 0.1, 
                      ease: [0.33, 1, 0.68, 1] 
                    }}
                    className="inline-block mr-[0.2em] last:mr-0"
                  >
                    {word === "Modern" || word === "Dentistry" ? (
                      <span className="italic font-serif text-brand-blue-500 lowercase">{word}</span>
                    ) : (
                      word
                    )}
                  </motion.span>
                ))}
              </h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl md:text-2xl text-slate-600 max-w-xl mb-14 leading-relaxed font-light"
              >
                Experience a new standard of oral healthcare where clinical precision meets aesthetic perfection in the heart of the city.
              </motion.p>
              
              <div className="flex flex-wrap gap-8 items-center">
                <Magnetic>
                  <button className="px-12 py-6 bg-brand-blue-900 text-white rounded-xl font-medium hover:bg-black transition-all luxury-shadow flex items-center gap-3 group">
                    Book Consultation
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </Magnetic>
                
                <Magnetic strength={0.2}>
                  <button className="px-10 py-6 border-b-2 border-brand-blue-100 text-brand-blue-900 font-medium hover:border-brand-blue-500 transition-all">
                    Our Private Gallery
                  </button>
                </Magnetic>
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="mt-20 flex items-center gap-12"
              >
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
                  <p className="text-sm font-display uppercase tracking-widest text-brand-blue-900">1.2k+ Bespoke Reviews</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative"
            >
              <MouseParallax strength={40}>
                <div className="relative z-10 aspect-[3/4] rounded-2xl overflow-hidden editorial-shadow group">
                  <div className="absolute inset-0 bg-brand-blue-900/10 group-hover:bg-transparent transition-colors duration-700 z-10" />
                  <img 
                    src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop" 
                    alt="Modern Dental Studio" 
                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                  />
                </div>
              </MouseParallax>
              
              {/* Floating Cards with refined geometry */}
              <motion.div 
                animate={{ y: [0, -20, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-12 -right-8 bg-white/90 backdrop-blur-md p-7 rounded-2xl luxury-shadow z-20 hidden md:block border border-white/20"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-brand-blue-50 rounded-xl flex items-center justify-center text-brand-blue-900">
                    <Users className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-[10px] text-brand-blue-500 uppercase tracking-[0.2em] font-bold mb-0.5">Concierge</p>
                    <p className="text-xl font-serif text-brand-blue-950 italic">New Patients</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 20, 0], rotate: [0, -2, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-12 -left-8 bg-brand-blue-900 p-10 rounded-2xl luxury-shadow z-20 hidden md:block text-white"
              >
                <p className="text-5xl font-light mb-2 tracking-tighter">98%</p>
                <p className="text-brand-blue-200 text-[10px] uppercase tracking-[0.2em] leading-relaxed font-medium">Patient <br /> Loyalty Index</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

