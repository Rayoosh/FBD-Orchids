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
      className="fixed top-0 left-0 w-full z-[100] transition-all duration-700"
    >
      {/* Trapezium Background Indentation */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] md:w-[600px] h-[180px] pointer-events-none z-0">
        <svg 
          viewBox="0 0 600 180" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-2xl"
          preserveAspectRatio="none"
        >
          <path 
            d="M0 0H600V40C600 40 580 180 300 180C20 180 0 40 0 40V0Z" 
            fill="#0f172a"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1800px] mx-auto px-8 md:px-12 py-8 flex items-start justify-between">
        {/* Left Navigation Links */}
        <div className="hidden lg:flex items-center gap-12 flex-1 pt-6">
          {navLinks.slice(0, 2).map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-[11px] font-bold uppercase tracking-[0.25em] text-white hover:text-white/80 transition-all relative group"
            >
              {link.name}
              <span className="absolute -bottom-1.5 left-0 w-0 h-[1px] bg-white transition-all duration-500 ease-out group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Centered Logo */}
        <div className="flex-shrink-0 mx-16 pt-2">
          <Magnetic strength={0.15}>
            <a href="/" className="flex flex-col items-center group">
              <span className="text-6xl md:text-7xl font-serif text-white tracking-tighter leading-[0.7] transition-transform duration-500 group-hover:scale-105">EASTSIDE</span>
              <span className="text-[11px] tracking-[0.7em] text-white font-bold uppercase mt-4 group-hover:text-white/80 transition-colors">Dental Studio</span>
            </a>
          </Magnetic>
        </div>

        {/* Right Actions & Rest of Links */}
        <div className="hidden lg:flex items-center justify-end gap-12 flex-1 pt-6">
          {navLinks.slice(2).map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-[11px] font-bold uppercase tracking-[0.25em] text-white hover:text-white/80 transition-all relative group"
            >
              {link.name}
              <span className="absolute -bottom-1.5 left-0 w-0 h-[1px] bg-white transition-all duration-500 ease-out group-hover:w-full" />
            </a>
          ))}
          
          <div className="w-[1px] h-8 bg-white/10 mx-2" />

          <Magnetic strength={0.2}>
            <a href="tel:5551234567" className="flex items-center gap-4 text-white group">
              <div className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#0f172a] transition-all duration-500">
                <Phone className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold tracking-widest uppercase hidden xl:inline-block">(555) 123-4567</span>
            </a>
          </Magnetic>

          <Magnetic>
            <button className="relative px-10 py-4 overflow-hidden group">
              <span className="relative z-10 text-[11px] uppercase tracking-[0.25em] font-bold text-[#0f172a] transition-colors duration-500 group-hover:text-white">
                Book Now
              </span>
              <div className="absolute inset-0 bg-white rounded-xl transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-[#0f172a] translate-y-full transition-transform duration-500 ease-expo group-hover:translate-y-0" />
            </button>
          </Magnetic>
        </div>

        <button 
          className="lg:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 w-full bg-[#0f172a] border-t border-white/5 overflow-hidden h-screen"
          >
            <div className="flex flex-col p-10 gap-8">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-3xl font-serif text-white hover:text-white/70 transition-colors">
                  {link.name}
                </a>
              ))}
              <div className="h-[1px] w-full bg-white/10 my-4" />
              <div className="flex flex-col gap-6">
                <a href="tel:5551234567" className="text-xl text-white/80 flex items-center gap-4">
                  <Phone size={24} /> (555) 123-4567
                </a>
                <button className="w-full py-6 bg-white text-[#0f172a] rounded-xl font-bold uppercase tracking-widest text-sm">
                  Secure Booking
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

