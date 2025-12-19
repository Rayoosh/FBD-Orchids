"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Calendar } from "lucide-react";
import { Magnetic } from "./ui/Magnetic";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

    const navLinks = [
      { name: "Clinical Excellence", href: "#" },
      { name: "Specialists", href: "#" },
      { name: "Services", href: "#" },
      { name: "Boutique Experience", href: "#" },
    ];

    return (
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
          isScrolled 
            ? "py-4 bg-white/70 backdrop-blur-2xl border-b border-black/5" 
            : "py-8 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 md:px-24 flex items-center justify-between">
          <Magnetic strength={0.1}>
            <a href="/" className="flex flex-col group">
              <span className="text-2xl font-serif text-slate-900 tracking-tighter leading-none group-hover:text-blue-900 transition-colors">EASTSIDE</span>
              <span className="text-[9px] tracking-[0.4em] text-slate-400 font-bold uppercase group-hover:text-blue-400 transition-colors">Dental Studio</span>
            </a>
          </Magnetic>

          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500 hover:text-slate-900 transition-all relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-slate-900 transition-all duration-500 ease-out group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-8">
            <Magnetic strength={0.2}>
              <a href="tel:5551234567" className="flex items-center gap-2 text-slate-900 group">
                <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold tracking-widest uppercase">(555) 123-4567</span>
              </a>
            </Magnetic>
            <Magnetic>
              <button className="relative px-7 py-3 overflow-hidden group">
                <span className="relative z-10 text-[10px] uppercase tracking-[0.2em] font-bold text-white transition-colors duration-500 group-hover:text-slate-900">
                  Secure Booking
                </span>
                <div className="absolute inset-0 bg-slate-900 rounded-xl transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-white translate-y-full transition-transform duration-500 ease-expo group-hover:translate-y-0" />
                <div className="absolute inset-0 border border-slate-900 rounded-xl" />
              </button>
            </Magnetic>
          </div>


        <button 
          className="lg:hidden text-blue-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-blue-50 overflow-hidden"
          >
            <div className="flex flex-col p-8 gap-8">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-2xl font-medium text-blue-900">
                  {link.name}
                </a>
              ))}
              <button className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold">
                Book Consultation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

