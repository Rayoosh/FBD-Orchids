"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Sparkles, 
  Stethoscope, 
  Smile, 
  ShieldCheck, 
  ArrowRight,
  Quote,
  Star
} from "lucide-react";
import { Magnetic } from "./ui/Magnetic";
import { TextReveal, Reveal, ImageReveal } from "./ui/Reveal";

const services = [
  {
    title: "Cosmetic Artistry",
    description: "Transform your smile with porcelain veneers, whitening, and precision contouring designed for your unique facial structure.",
    icon: <Sparkles className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Restorative Mastery",
    description: "Restore function and aesthetics with biomimetic fillings, crowns, and implants that look and feel completely natural.",
    icon: <Smile className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Clinical Excellence",
    description: "Comprehensive care focusing on longevity and prevention, utilizing the latest digital diagnostics and biological dentistry.",
    icon: <Stethoscope className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800"
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
  return (
    <section className="bg-background">
      {/* Services Section - Luxury Vertical Scroll */}
      <div className="py-40 md:py-60 px-6 md:px-24 border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-32">
            <Reveal>
              <div className="inline-flex items-center gap-3 mb-8">
                <div className="w-8 h-[1px] bg-blue-500" />
                <span className="text-[10px] text-blue-500 font-bold uppercase tracking-[0.3em]">Curated Procedures</span>
              </div>
            </Reveal>
            <TextReveal 
              text="Clinical Mastery. Artistically Delivered." 
              className="text-6xl md:text-8xl font-serif text-slate-900 leading-[0.9] tracking-tighter"
            />
          </div>

          <div className="space-y-40">
            {services.map((service, index) => (
              <div key={index} className={`grid lg:grid-cols-12 gap-20 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <ImageReveal 
                    src={service.image} 
                    alt={service.title} 
                    className="aspect-[16/9] md:aspect-[21/9] editorial-shadow"
                  />
                </div>
                <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <Reveal delay={0.2}>
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-blue-500 mb-10 border border-black/5">
                      {service.icon}
                    </div>
                  </Reveal>
                  <Reveal delay={0.3}>
                    <h3 className="text-4xl font-serif text-slate-900 mb-6 tracking-tight">{service.title}</h3>
                  </Reveal>
                  <Reveal delay={0.4}>
                    <p className="text-slate-500 leading-relaxed text-lg font-light mb-10 max-w-md">
                      {service.description}
                    </p>
                  </Reveal>
                  <Reveal delay={0.5}>
                    <Magnetic strength={0.2}>
                      <button className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-900 group">
                        Explore Procedure 
                        <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </button>
                    </Magnetic>
                  </Reveal>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials - Cinematic Parallax Reveal */}
      <div className="py-40 md:py-60 px-6 md:px-24 bg-slate-900 relative overflow-hidden">
        {/* Atmospheric Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-32">
            <Reveal width="100%">
               <Quote className="w-16 h-16 text-blue-400/20 mx-auto mb-10" strokeWidth={1} />
            </Reveal>
            <TextReveal 
              text="Voices of Transformation" 
              className="text-5xl md:text-7xl font-serif text-white leading-[0.9] tracking-tighter"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            {testimonials.map((testimonial, index) => (
              <Reveal key={index} delay={index * 0.2} y={30}>
                <div className="bg-white/5 backdrop-blur-sm p-16 rounded-3xl border border-white/5 luxury-shadow h-full flex flex-col justify-between">
                  <div className="flex gap-1 mb-10">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-blue-400 fill-blue-400" />
                    ))}
                  </div>
                  
                  <p className="text-2xl text-slate-200 font-serif italic leading-relaxed mb-16">
                    "{testimonial.quote}"
                  </p>
                  
                  <div className="flex items-center gap-6 pt-10 border-t border-white/5">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0">
                      <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover grayscale" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">{testimonial.name}</h4>
                      <p className="text-[9px] text-blue-400 uppercase tracking-[0.2em] font-medium mt-1">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
