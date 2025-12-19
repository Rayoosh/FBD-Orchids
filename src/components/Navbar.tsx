"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { Magnetic } from "./ui/Magnetic";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Spring animations for smoother feel
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const logoScale = useSpring(useTransform(scrollY, [0, 100], [1, 0.7]), springConfig);
  const logoY = useSpring(useTransform(scrollY, [0, 100], [16, -24]), springConfig);
  const subtitleOpacity = useSpring(useTransform(scrollY, [0, 50], [1, 0]), springConfig);
  const trapeziumY = useSpring(useTransform(scrollY, [0, 100], [0, -150]), springConfig);
  const linksOpacity = useSpring(useTransform(scrollY, [0, 50], [0.7, 1]), springConfig);

  const leftLinks = [
    { name: "Clinical Excellence", href: "#" },
    { name: "Specialists", href: "#" },
  ];

  const rightLinks = [
    { name: "Services", href: "#" },
    { name: "Boutique Experience", href: "#" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] pointer-events-none">
      {/* Trapezium Indentation Background */}
      <motion.div 
        style={{ y: trapeziumY }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-48 overflow-hidden flex justify-center pointer-events-none"
      >
        <svg 
          viewBox="0 0 1000 100" 
          className="w-[700px] h-full fill-[#0f172a]"
          preserveAspectRatio="none"
        >
          <path d="M0,0 L1000,0 L850,100 L150,100 Z" />
        </svg>
      </motion.div>

      <div className="max-w-7xl mx-auto px-8 md:px-12 h-32 flex items-center justify-between pointer-events-auto mt-4">
        {/* Left Links */}
        <motion.div 
          style={{ opacity: linksOpacity }}
          className="hidden lg:flex items-center gap-12 flex-1 justify-end pr-16"
        >
          {leftLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:text-white transition-all relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-500 ease-out group-hover:w-full" />
            </a>
          ))}
        </motion.div>

        {/* Centered Logo */}
        <div className="relative z-10 mx-auto px-8">
          <Magnetic strength={0.1}>
            <a href="/" className="flex flex-col items-center group">
              <motion.span 
                style={{ scale: logoScale, y: logoY }}
                className="text-5xl md:text-6xl font-serif text-white tracking-tighter leading-none"
              >
                EASTSIDE
              </motion.span>
              <motion.span 
                style={{ opacity: subtitleOpacity, y: logoY }}
                className="text-[11px] tracking-[0.5em] text-white/50 font-bold uppercase mt-2"
              >
                Dental Studio
              </motion.span>
            </a>
          </Magnetic>
        </div>

        {/* Right Links & Action */}
        <motion.div 
          style={{ opacity: linksOpacity }}
          className="hidden lg:flex items-center gap-12 flex-1 justify-start pl-16"
        >
          {rightLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:text-white transition-all relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-500 ease-out group-hover:w-full" />
            </a>
          ))}
          
          <Magnetic strength={0.2}>
            <motion.a 
              href="tel:5551234567" 
              style={{ opacity: subtitleOpacity }}
              className="flex items-center gap-2 text-white group"
            >
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#0f172a] transition-all duration-500">
                <Phone className="w-3.5 h-3.5" />
              </div>
            </motion.a>
          </Magnetic>
        </motion.div>

        <button 
          className="lg:hidden text-white pointer-events-auto"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="lg:hidden fixed inset-0 w-full h-screen bg-[#0f172a] z-[150] flex flex-col items-center justify-center pointer-events-auto"
          >
            <button 
              className="absolute top-8 right-8 text-white p-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>
            <div className="flex flex-col gap-12 items-center">
              {[...leftLinks, ...rightLinks].map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-4xl font-serif text-white hover:text-white/70 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="tel:5551234567"
                className="mt-8 flex items-center gap-4 text-white/50 font-bold tracking-widest uppercase text-sm"
              >
                <Phone size={18} /> (555) 123-4567
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
