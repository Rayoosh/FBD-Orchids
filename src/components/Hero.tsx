"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Shield, Star, Users } from "lucide-react";
import { Magnetic } from "./ui/Magnetic";
import { MouseParallax } from "./ui/MouseParallax";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white">
      {/* Dynamic Background Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/50 -skew-x-12 translate-x-1/4 z-0" />
      
      <div className="container mx-auto px-6 md:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-sm font-medium mb-8">
              <Shield className="w-4 h-4" />
              <span>Elite Dental Excellence</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-medium text-blue-900 leading-[0.9] tracking-tight mb-8">
              Artistry in <br /> 
              <span className="italic font-serif text-blue-400">Modern Dentistry</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 max-w-lg mb-12 leading-relaxed">
              Experience a new standard of oral healthcare where clinical precision meets aesthetic perfection in the heart of the city.
            </p>
            
            <div className="flex flex-wrap gap-6 items-center">
              <Magnetic>
                <button className="px-10 py-5 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 flex items-center gap-2 group">
                  Book Your Consultation
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </Magnetic>
              
              <Magnetic strength={0.2}>
                <button className="px-8 py-5 border border-blue-100 text-blue-900 rounded-full font-medium hover:bg-blue-50 transition-all">
                  View Our Gallery
                </button>
              </Magnetic>
            </div>

            <div className="mt-16 flex items-center gap-12 border-t border-blue-50 pt-10">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="Patient" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-1 text-blue-400 mb-1">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-sm font-medium text-blue-900">1,200+ Five-Star Reviews</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <MouseParallax strength={30}>
              <div className="relative z-10 aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop" 
                  alt="Modern Dental Studio" 
                  className="w-full h-full object-cover"
                />
              </div>
            </MouseParallax>
            
            {/* Floating Cards for Depth */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 bg-white p-6 rounded-3xl shadow-xl z-20 hidden md:block border border-blue-50"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">New Patients</p>
                  <p className="text-lg font-bold text-blue-950">Welcome Package</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 -left-10 bg-blue-900 p-8 rounded-3xl shadow-xl z-20 hidden md:block text-white"
            >
              <p className="text-4xl font-medium mb-1">98%</p>
              <p className="text-blue-200 text-sm leading-tight uppercase tracking-widest font-bold">Patient <br /> Satisfaction</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

