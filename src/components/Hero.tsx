"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Phone, ArrowRight, ShieldCheck, Clock, CreditCard } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 px-6 md:px-12 overflow-hidden bg-gradient-to-b from-brand-blue-50/50 to-white">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-blue-50/30 -skew-x-12 transform origin-top-right -z-10 hidden lg:block" />
      
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span>Accepting New Patients • Same-Day Care</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium leading-[1.1] mb-6 text-foreground">
            Exceptional care.<br />
            <span className="text-primary italic">Effortless comfort.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-xl">
            Experience clinical excellence in a calming environment. From emergency pain relief to long-term preventative care, we prioritize your comfort and peace of mind.
          </p>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <Button asChild size="lg" className="rounded-full h-14 px-8 text-lg font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
              <Link href="#booking">
                Book Appointment <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full h-14 px-8 text-lg font-medium border-primary/20 hover:bg-primary/5 text-primary">
              <a href="tel:+1234567890">
                <Phone className="mr-2 w-5 h-5" /> Call Today
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 border-t border-border">
            <div className="flex items-center space-x-3 text-sm text-muted-foreground">
              <div className="p-2 rounded-lg bg-primary/5 text-primary">
                <Clock className="w-5 h-5" />
              </div>
              <span>Same-Day<br />Appointments</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-muted-foreground">
              <div className="p-2 rounded-lg bg-primary/5 text-primary">
                <CreditCard className="w-5 h-5" />
              </div>
              <span>Transparent<br />Fair Pricing</span>
            </div>
            <div className="hidden sm:flex items-center space-x-3 text-sm text-muted-foreground">
              <div className="p-2 rounded-lg bg-primary/5 text-primary">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span>Trusted for<br />Over 10 Years</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative aspect-[4/5] lg:aspect-square rounded-2xl overflow-hidden luxury-shadow"
        >
          <img
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=2000"
            alt="Modern Dental Clinic Interior"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          
          {/* Floating reassurance badge */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute bottom-6 left-6 right-6 glass-morphism p-6 rounded-xl border border-white/30 shadow-2xl"
          >
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-brand-blue-100 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Patient" />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-bold text-primary">"Finally found a dentist I trust."</p>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className="text-yellow-400 text-xs">★</span>
                  ))}
                  <span className="ml-2 text-[10px] text-muted-foreground font-medium uppercase tracking-wider">500+ Happy Patients</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
