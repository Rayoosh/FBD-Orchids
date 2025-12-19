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
    { name: "Our Specialists", href: "#" },
    { name: "Services", href: "#" },
    { name: "Patient Portal", href: "#" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "py-4 bg-white/80 backdrop-blur-xl shadow-sm" : "py-8 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 md:px-24 flex items-center justify-between">
        <Magnetic strength={0.2}>
          <a href="/" className="flex flex-col">
            <span className="text-2xl font-bold text-blue-900 tracking-tighter leading-none">EASTSIDE</span>
            <span className="text-[10px] tracking-[0.3em] text-blue-400 font-bold uppercase">Dental Studio</span>
          </a>
        </Magnetic>

        <div className="hidden lg:flex items-center gap-12">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-2 text-blue-900 font-bold">
            <Phone className="w-4 h-4" />
            <span className="text-sm">(555) 123-4567</span>
          </div>
          <Magnetic>
            <button className="px-8 py-3 bg-blue-900 text-white rounded-full text-sm font-medium hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/10 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Book Now
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

