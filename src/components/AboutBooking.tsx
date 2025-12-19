"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, MapPin, Clock, Calendar, ArrowUpRight } from "lucide-react";

export function AboutBooking() {
  return (
    <section id="experience" className="py-40 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* About / Philosophy Section */}
        <div className="grid lg:grid-cols-2 gap-32 items-center mb-60">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative aspect-[4/5] rounded-sm overflow-hidden luxury-shadow group"
            >
              <img
                src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=1200"
                alt="Bespoke Dental Studio"
                className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/5" />
            </motion.div>
            {/* Floating Detail */}
            <div className="absolute -bottom-12 -right-12 bg-accent p-10 text-white luxury-shadow hidden md:block">
              <p className="text-display text-[10px] mb-4 tracking-[0.3em]">Foundation</p>
              <p className="text-3xl font-serif italic">Est. 2012</p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-display text-xs text-accent mb-8">The Philosophy</h2>
            <h3 className="text-5xl md:text-7xl font-serif font-light leading-tight mb-10">
              Where Ethics <br />
              <span className="text-serif-italic pl-12 text-primary">Meets Artistry.</span>
            </h3>
            <p className="text-xl text-muted-foreground font-light leading-relaxed mb-8">
              At Freemans Bay Dental, we believe dentistry is more than a service—it's a commitment to your long-term vitality. We move away from the high-pressure sales of modern dentistry, returning to a focus on clinical integrity and patient-first results.
            </p>
            <div className="space-y-6 mb-12">
              <div className="flex items-center space-x-6">
                <div className="w-12 h-px bg-accent/30" />
                <p className="text-display text-[10px] tracking-widest text-foreground">Auckland's Boutique Dental Choice</p>
              </div>
              <div className="flex items-center space-x-6">
                <div className="w-12 h-px bg-accent/30" />
                <p className="text-display text-[10px] tracking-widest text-foreground">Decades of Combined Mastery</p>
              </div>
            </div>
          </motion.div>
        </div>

          {/* High-End Booking Experience */}
          <div id="booking" className="grid lg:grid-cols-[1fr_1.5fr] bg-brand-blue-900 rounded-sm overflow-hidden luxury-shadow">
            <div className="p-12 lg:p-20 bg-brand-blue-900 text-white flex flex-col justify-between">
            <div>
              <h2 className="text-display text-[10px] text-accent mb-10 tracking-[0.4em]">Inquiry</h2>
              <h3 className="text-4xl md:text-5xl font-serif font-light leading-tight mb-12">
                Begin Your <br />
                <span className="text-serif-italic italic text-accent">Transformation.</span>
              </h3>
              
              <div className="space-y-10">
                <div className="flex items-start space-x-6">
                  <Phone className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <p className="text-display text-[9px] text-white/40 mb-2">Voice</p>
                    <p className="text-xl font-light">+64 9 123 4567</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <MapPin className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <p className="text-display text-[9px] text-white/40 mb-2">Visit</p>
                    <p className="text-xl font-light">Freemans Bay, Auckland</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <Clock className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <p className="text-display text-[9px] text-white/40 mb-2">Availability</p>
                    <p className="text-xl font-light">Mon — Fri: 08:00 — 18:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-20 flex items-center space-x-4 group cursor-pointer">
              <div className="p-4 rounded-full border border-white/10 group-hover:border-accent transition-colors duration-500">
                <Calendar className="w-6 h-6 text-accent" />
              </div>
              <p className="text-sm font-light text-white/60">Urgent appointments reserved daily.</p>
            </div>
          </div>

          <div className="p-12 lg:p-20 bg-white">
            <form className="grid gap-10">
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <Label className="text-display text-[9px] text-muted-foreground uppercase">Full Name</Label>
                  <Input placeholder="E.g. Alexander Vance" className="border-0 border-b border-border rounded-none px-0 h-12 focus-visible:ring-0 focus-visible:border-accent transition-colors bg-transparent" />
                </div>
                <div className="space-y-3">
                  <Label className="text-display text-[9px] text-muted-foreground uppercase">Contact Number</Label>
                  <Input placeholder="+64" className="border-0 border-b border-border rounded-none px-0 h-12 focus-visible:ring-0 focus-visible:border-accent transition-colors bg-transparent" />
                </div>
              </div>
              
              <div className="space-y-3">
                <Label className="text-display text-[9px] text-muted-foreground uppercase">Area of Inquiry</Label>
                <select className="w-full border-0 border-b border-border rounded-none px-0 h-12 focus:outline-none focus:border-accent transition-colors bg-transparent text-sm">
                  <option>Restorative Mastery</option>
                  <option>Aesthetic Consultation</option>
                  <option>Nervous Patient Protocol</option>
                  <option>General Excellence</option>
                </select>
              </div>

              <div className="space-y-3">
                <Label className="text-display text-[9px] text-muted-foreground uppercase">Details</Label>
                <Textarea placeholder="How may we assist you?" className="border-0 border-b border-border rounded-none px-0 min-h-[100px] focus-visible:ring-0 focus-visible:border-accent transition-colors bg-transparent resize-none" />
              </div>

                <Button className="w-full h-20 bg-primary hover:bg-brand-blue-900 text-white rounded-none text-display text-xs transition-all duration-500 flex items-center justify-center space-x-4">
                <span>Submit Inquiry</span>
                <ArrowUpRight className="w-5 h-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
