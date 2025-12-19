"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, MapPin, Clock, Calendar, ArrowUpRight } from "lucide-react";
import { Magnetic } from "./ui/Magnetic";
import { TextReveal, Reveal, ImageReveal } from "./ui/Reveal";

export function AboutBooking() {
  return (
    <section id="about" className="py-32 md:py-48 bg-transparent overflow-hidden relative min-h-full flex items-center">
      {/* Subtle Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-50/50 blur-[120px] rounded-full -translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* About / Philosophy Section - Asymmetrical Editorial */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-32 items-center mb-72">
          <div className="relative order-2 lg:order-1">
            <ImageReveal 
              src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=1200"
              alt="Bespoke Dental Studio"
              className="aspect-[4/5] editorial-shadow"
            />
            
            <Reveal delay={0.5} y={30}>
              <div className="absolute -bottom-16 -right-16 bg-white p-12 luxury-shadow rounded-2xl hidden md:block border border-black/5">
                <p className="text-[9px] mb-4 tracking-[0.4em] font-bold uppercase text-slate-400">Foundation</p>
                <p className="text-4xl font-serif italic text-slate-900">Est. 2012</p>
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <div className="inline-flex items-center gap-3 mb-8">
                <div className="w-8 h-[1px] bg-blue-500" />
                <span className="text-[10px] text-blue-500 font-bold uppercase tracking-[0.3em]">The Philosophy</span>
              </div>
            </Reveal>
            
            <TextReveal 
              text="Ethics Meets Artistry." 
              className="text-6xl md:text-8xl font-serif text-slate-900 leading-[0.85] mb-12 tracking-tighter"
            />
            
            <Reveal delay={0.4}>
              <p className="text-xl text-slate-500 leading-relaxed mb-16 font-light max-w-lg">
                At Eastside Dental, we believe dentistry is more than a service—it's a commitment to your long-term vitality. We focus on clinical integrity and patient-first results.
              </p>
            </Reveal>
            
            <div className="grid grid-cols-2 gap-12">
              {[
                { label: "Boutique Choice", sub: "Auckland's Premiere practitioners" },
                { label: "Clinical Mastery", sub: "Decades of combined expertise" }
              ].map((item, i) => (
                <Reveal key={i} delay={0.5 + i * 0.1}>
                  <div className="group">
                    <p className="text-[9px] tracking-[0.3em] font-bold uppercase text-slate-400 mb-2 group-hover:text-blue-500 transition-colors">{item.label}</p>
                    <p className="text-sm text-slate-900 font-medium">{item.sub}</p>
                    <div className="w-full h-px bg-slate-100 mt-4 group-hover:bg-blue-200 transition-all duration-700" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Concierge Inquiry Experience */}
        <Reveal width="100%" y={40}>
          <div id="booking" className="grid lg:grid-cols-[0.8fr_1.2fr] bg-slate-900 rounded-3xl overflow-hidden editorial-shadow">
            <div className="p-16 lg:p-24 bg-slate-900 text-white flex flex-col justify-between border-r border-white/5">
              <div>
                <div className="inline-flex items-center gap-3 mb-12">
                   <div className="w-1 h-1 rounded-full bg-blue-400" />
                   <h2 className="text-[10px] text-blue-400 tracking-[0.4em] font-bold uppercase">Concierge Inquiry</h2>
                </div>
                <h3 className="text-5xl md:text-6xl font-serif leading-[0.9] mb-16 tracking-tighter">
                  Begin Your <br />
                  <span className="italic text-slate-400 font-light">Transformation.</span>
                </h3>
                
                <div className="space-y-12">
                  {[
                    { icon: Phone, label: "Voice", value: "+64 9 123 4567" },
                    { icon: MapPin, label: "Visit", value: "Eastside, Auckland" },
                    { icon: Clock, label: "Availability", value: "Mon — Fri: 08:00 — 18:00" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start space-x-8 group">
                      <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-slate-900 transition-all duration-500">
                        <item.icon className="w-4 h-4" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-[8px] text-white/30 mb-1 font-bold uppercase tracking-widest">{item.label}</p>
                        <p className="text-lg font-light tracking-tight">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-24 pt-12 border-t border-white/5 flex items-center space-x-6 group cursor-pointer">
                <div className="p-4 rounded-xl bg-white/5 group-hover:bg-white group-hover:text-slate-900 transition-all duration-500">
                  <Calendar className="w-5 h-5 text-blue-400" />
                </div>
                <p className="text-xs font-light text-white/40 tracking-wide">Bespoke scheduling available for <br /> urgent clinical matters.</p>
              </div>
            </div>

            <div className="p-16 lg:p-24 bg-white relative">
              <form className="grid gap-12">
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-4 group">
                    <Label className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] group-focus-within:text-blue-500 transition-colors">Full Name</Label>
                    <Input placeholder="Alexander Vance" className="border-0 border-b border-slate-100 rounded-none px-0 h-12 focus-visible:ring-0 focus-visible:border-blue-500 transition-all bg-transparent shadow-none placeholder:text-slate-200" />
                  </div>
                  <div className="space-y-4 group">
                    <Label className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] group-focus-within:text-blue-500 transition-colors">Contact Number</Label>
                    <Input placeholder="+64" className="border-0 border-b border-slate-100 rounded-none px-0 h-12 focus-visible:ring-0 focus-visible:border-blue-500 transition-all bg-transparent shadow-none placeholder:text-slate-200" />
                  </div>
                </div>
                
                <div className="space-y-4 group">
                  <Label className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] group-focus-within:text-blue-500 transition-colors">Area of Interest</Label>
                  <select className="w-full border-0 border-b border-slate-100 rounded-none px-0 h-12 focus:outline-none focus:border-blue-500 transition-all bg-transparent text-sm text-slate-600 appearance-none cursor-pointer">
                    <option>Cosmetic Artistry</option>
                    <option>Restorative Mastery</option>
                    <option>Biological Health</option>
                    <option>Bespoke Consultation</option>
                  </select>
                </div>

                <div className="space-y-4 group">
                  <Label className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] group-focus-within:text-blue-500 transition-colors">Message</Label>
                  <Textarea placeholder="How may we curate your experience?" className="border-0 border-b border-slate-100 rounded-none px-0 min-h-[120px] focus-visible:ring-0 focus-visible:border-blue-500 transition-all bg-transparent resize-none shadow-none placeholder:text-slate-200" />
                </div>

                <div className="pt-8">
                  <Magnetic strength={0.2}>
                    <button className="w-full relative py-7 px-10 overflow-hidden group rounded-xl">
                      <span className="relative z-10 text-[10px] uppercase tracking-[0.4em] font-bold text-white transition-colors duration-500 group-hover:text-slate-900">
                        Request Consultation
                      </span>
                      <div className="absolute inset-0 bg-slate-900 transition-transform duration-700 ease-expo group-hover:scale-105" />
                      <div className="absolute inset-0 bg-white translate-y-full transition-transform duration-700 ease-expo group-hover:translate-y-0" />
                      <div className="absolute inset-0 border border-slate-900 rounded-xl" />
                    </button>
                  </Magnetic>
                </div>
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
