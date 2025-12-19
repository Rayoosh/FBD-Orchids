"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Sparkles, 
  Stethoscope, 
  Smile, 
  ShieldCheck, 
  ArrowRight,
  Quote
} from "lucide-react";
import { Magnetic } from "./ui/Magnetic";

const services = [
  {
    title: "Cosmetic Dentistry",
    description: "Transform your smile with porcelain veneers, whitening, and precision contouring designed for your unique facial structure.",
    icon: <Sparkles className="w-8 h-8" />,
    color: "bg-blue-50"
  },
  {
    title: "General Oral Health",
    description: "Comprehensive care focusing on longevity and prevention, utilizing the latest digital diagnostics and biological dentistry.",
    icon: <Stethoscope className="w-8 h-8" />,
    color: "bg-blue-100/50"
  },
  {
    title: "Restorative Excellence",
    description: "Restore function and aesthetics with biomimetic fillings, crowns, and implants that look and feel completely natural.",
    icon: <Smile className="w-8 h-8" />,
    color: "bg-white"
  },
  {
    title: "Preventive Precision",
    description: "Advanced hygiene protocols and early detection systems to maintain your oral health at the highest possible standard.",
    icon: <ShieldCheck className="w-8 h-8" />,
    color: "bg-blue-50"
  }
];

const testimonials = [
  {
    name: "Eleanor Vance",
    role: "Architect",
    quote: "The attention to detail here is unparalleled. It felt less like a dental appointment and more like a curated wellness experience.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
  },
  {
    name: "Julian Thorne",
    role: "Creative Director",
    quote: "Eastside Dental redefined what I expected from dentistry. The aesthetic results are stunning, but the process was the true surprise.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop"
  }
];

export function ServicesTestimonials() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <section className="bg-white">
      {/* Services Horizontal Scroll */}
      <div ref={targetRef} className="relative h-[300vh] bg-blue-900">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-12 px-12 md:px-24">
            <div className="flex flex-col justify-center min-w-[300px] md:min-w-[450px]">
              <h2 className="text-4xl md:text-6xl font-medium text-white mb-6 leading-tight">
                Specialized <br /> <span className="italic text-blue-300">Dental Care</span>
              </h2>
              <p className="text-blue-100 text-lg max-w-sm">
                Explore our curated range of clinical excellence, where art meets advanced medical science.
              </p>
            </div>
            
            {services.map((service, index) => (
              <div 
                key={index}
                className="group relative min-w-[300px] md:min-w-[400px] aspect-[4/5] bg-white rounded-3xl p-10 flex flex-col justify-between overflow-hidden transition-all duration-700 hover:shadow-2xl hover:shadow-blue-500/20"
              >
                <div className="absolute top-0 right-0 p-8 text-blue-100 group-hover:text-blue-200 transition-colors">
                  <span className="text-6xl font-serif">0{index + 1}</span>
                </div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-8 group-hover:scale-110 transition-transform duration-500">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-medium text-blue-900 mb-4">{service.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{service.description}</p>
                </div>

                <div className="relative z-10 pt-6">
                  <Magnetic>
                    <button className="flex items-center gap-2 text-blue-600 font-medium group/btn">
                      Learn More <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </Magnetic>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Testimonials - Immersive Layout */}
      <div className="py-24 md:py-40 px-6 md:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 text-blue-50 opacity-50">
                <Quote size={160} fill="currentColor" />
              </div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-medium text-blue-900 leading-tight relative z-10"
              >
                Voices of <br /> <span className="italic">Excellence</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-slate-600 mt-6 max-w-md text-lg"
              >
                Our patients expect nothing but the best. We deliver results that speak for themselves through confidence and comfort.
              </motion.p>
            </div>

            <div className="space-y-12">
              {testimonials.map((testimonial, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="flex flex-col md:flex-row gap-8 items-start border-b border-blue-50 pb-12 last:border-0"
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-blue-100">
                    <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-xl text-blue-900 font-medium leading-relaxed mb-4 italic">
                      "{testimonial.quote}"
                    </p>
                    <div>
                      <h4 className="font-bold text-blue-950">{testimonial.name}</h4>
                      <p className="text-sm text-blue-400 uppercase tracking-widest">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

