"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, Stethoscope, Quote, Sparkles, Phone, Instagram, Facebook } from "lucide-react";
import Link from "next/link";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { name: "Quality", href: "#experience", icon: Shield, subtitle: "Uncompromising standards" },
  { name: "Services", href: "#services", icon: Stethoscope, subtitle: "Full range of dental care" },
  { name: "Testimonials", href: "/testimonials", icon: Quote, subtitle: "What our patients say" },
  { name: "Experience", href: "#experience", icon: Sparkles, subtitle: "Modern clinical environment" },
];

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  return (
    <AnimatePresence>
      {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[1000] bg-white md:hidden overflow-y-auto"
          >

          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-100 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative h-full flex flex-col p-8 pt-20">
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 p-3 bg-slate-50 rounded-full text-slate-900 border border-slate-100 shadow-sm"
            >
              <X size={24} />
            </button>

            <div className="flex-1 flex flex-col gap-12 justify-center">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-blue-600">Navigation</span>
                <nav className="flex flex-col gap-6">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Link 
                        href={link.href}
                        onClick={onClose}
                        className="group flex items-center justify-between"
                      >
                        <div className="flex flex-col">
                          <span className="text-4xl font-bold text-slate-900 group-active:text-brand-blue-600 transition-colors">
                            {link.name}
                          </span>
                          <span className="text-xs text-slate-400 font-medium">
                            {link.subtitle}
                          </span>
                        </div>
                        <link.icon className="w-6 h-6 text-slate-200 group-active:text-brand-blue-200" />
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>

              <div className="space-y-4 pt-8 border-t border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-blue-600">Connect</span>
                <div className="flex flex-col gap-4">
                  <a href="tel:093613610" className="flex items-center gap-4 text-xl font-bold text-slate-900">
                    <div className="w-10 h-10 bg-brand-blue-50 rounded-full flex items-center justify-center text-brand-blue-600">
                      <Phone size={20} />
                    </div>
                    (09) 361 3610
                  </a>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                      <Instagram size={20} />
                    </div>
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                      <Facebook size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-8">
              <button 
                onClick={() => {
                  onClose();
                  const el = document.getElementById("booking");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full h-16 bg-brand-blue-600 text-white rounded-2xl font-bold text-sm uppercase tracking-widest shadow-xl shadow-brand-blue-200"
              >
                Start Your Journey
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
