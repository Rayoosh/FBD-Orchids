"use client";

import React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Stethoscope, 
  Smile, 
  ShieldCheck, 
  ArrowRight,
  Quote,
  Star,
  Palette
} from "lucide-react";
import { Magnetic } from "./ui/Magnetic";
import { TextReveal, Reveal, ImageReveal } from "./ui/Reveal";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "General Dentistry",
    description: "From routine check-ups and hygiene to white fillings and extractions, we focus on maintaining your long-term oral health.",
    icon: <Stethoscope className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Cosmetic Artistry",
    description: "Transform your smile with porcelain veneers, professional whitening, and restorative crowns designed for a natural, healthy look.",
    icon: <Palette className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Emergency & ACC",
    description: "Same-day emergency appointments for pain relief, surgical care, and ACC registered treatments in the heart of Auckland.",
    icon: <ShieldCheck className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800"
  }
];

const testimonials = [
  {
    name: "Sarah Miller",
    role: "Ponsonby Local",
    quote: "The team at Freemans Bay is amazing. Professional, fairly priced, and they always make me feel comfortable during my hygiene visits.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
  },
  {
    name: "David Chen",
    role: "Business Owner",
    quote: "As someone who was always anxious about the dentist, I'm glad I found this clinic. Gentle care and clear explanations every step of the way.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop"
  }
];

export function ServicesTestimonials() {
  return (
    <section className="bg-transparent h-full no-scrollbar py-24 md:py-32 px-6 md:px-24">
      {/* Services Section */}
      <div className="max-w-7xl mx-auto mb-48">
        <div className="mb-32">
          <Reveal>
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-8 h-[1px] bg-blue-400" />
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-[0.3em]">Curated Procedures</span>
            </div>
          </Reveal>
          <TextReveal 
            text="Clinical Mastery. Artistically Delivered." 
            className="text-6xl md:text-8xl font-serif text-slate-900 leading-[0.9] tracking-tighter premium-gradient-text"
          />
        </div>

        <div className="space-y-40">
          {services.map((service, index) => (
            <div key={index} className={`grid lg:grid-cols-12 gap-20 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <ImageReveal 
                    src={service.image} 
                    alt={service.title} 
                    className={cn(
                      "aspect-[16/9] md:aspect-[21/9] editorial-shadow transition-all duration-700 rounded-2xl overflow-hidden border border-black/5",
                      isMobile ? "grayscale-0" : "grayscale hover:grayscale-0"
                    )}
                  />
                </div>

              <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <Reveal delay={0.2}>
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-brand-blue-400 mb-10 border border-slate-200 luxury-shadow">
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
                      <Link href="#booking">
                        <button className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-900 group">
                          Explore Procedure 
                          <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-brand-blue-900 group-hover:text-white transition-all duration-500 luxury-shadow">
                            <ArrowRight className="w-5 h-5" />
                          </div>
                        </button>
                      </Link>
                    </Magnetic>
                  </Reveal>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto relative z-10 pb-20">
        <div className="text-center mb-32">
          <Reveal width="100%">
             <Quote className="w-16 h-16 text-brand-blue-400/20 mx-auto mb-10" strokeWidth={1} />
          </Reveal>
          <TextReveal 
            text="Voices of Transformation" 
            className="text-5xl md:text-7xl font-serif text-slate-900 leading-[0.9] tracking-tighter"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {testimonials.map((testimonial, index) => (
            <Reveal key={index} delay={index * 0.2} y={30}>
              <div className="bg-white/40 backdrop-blur-md p-16 rounded-[2.5rem] border border-black/5 luxury-shadow h-full flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10">
                  <div className="flex gap-1 mb-10">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-brand-blue-400 fill-brand-blue-400" />
                    ))}
                  </div>
                  
                  <p className="text-2xl text-slate-800 font-serif italic leading-relaxed mb-16">
                    "{testimonial.quote}"
                  </p>
                </div>
                
                  <div className="flex items-center gap-6 pt-10 border-t border-black/5 relative z-10">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 border border-slate-200">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className={cn(
                          "w-full h-full object-cover transition-all duration-700",
                          isMobile ? "grayscale-0" : "grayscale group-hover:grayscale-0"
                        )} 
                      />
                    </div>

                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-900">{testimonial.name}</h4>
                    <p className="text-[9px] text-brand-blue-400 uppercase tracking-[0.2em] font-medium mt-1">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
