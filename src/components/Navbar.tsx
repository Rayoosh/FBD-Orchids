"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Shield, Users, Stethoscope, Sparkles } from "lucide-react";
import { Magnetic } from "./ui/Magnetic";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Excellence", href: "#", icon: Shield },
    { name: "Specialists", href: "#", icon: Users },
    { name: "Services", href: "#", icon: Stethoscope },
    { name: "Experience", href: "#", icon: Sparkles },
  ];

  return (
    <>
      {/* Shaped Indentation Dock */}
      <div className="fixed top-0 left-0 w-full z-[90] pointer-events-none overflow-hidden h-48">
        <svg width="100%" height="100%" preserveAspectRatio="none" className="drop-shadow-2xl">
          <defs>
            <mask id="nav-indentation-mask">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              <motion.rect
                initial={false}
                animate={{
                  width: isScrolled ? 480 : "94%",
                  height: isScrolled ? 68 : 88,
                  x: isScrolled ? "calc(50% - 240px)" : "3%",
                  y: 18,
                  rx: isScrolled ? 34 : 44,
                }}
                transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                fill="black"
              />
            </mask>
            <filter id="glow">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <rect 
            width="100%" 
            height="100%" 
            fill="#0f172a" 
            mask="url(#nav-indentation-mask)" 
          />
          {/* Subtle inner shadow effect for the indentation */}
          <motion.rect
            initial={false}
            animate={{
              width: isScrolled ? 480 : "94%",
              height: isScrolled ? 68 : 88,
              x: isScrolled ? "calc(50% - 240px)" : "3%",
              y: 18,
              rx: isScrolled ? 34 : 44,
            }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            fill="none"
            stroke="white"
            strokeOpacity="0.05"
            strokeWidth="1"
          />
        </svg>
      </div>

      <nav 
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-700 rounded-full border ${
          isScrolled 
            ? "py-2 px-3 bg-white/95 backdrop-blur-xl border-white shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] w-auto" 
            : "py-4 px-6 bg-white/60 backdrop-blur-lg border-white/40 w-[90%] md:w-[85%] max-w-7xl shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]"
        }`}
      >
      <div className={`flex items-center justify-between ${isScrolled ? "gap-8" : ""}`}>
        <div className={isScrolled ? "hidden md:block" : "block"}>
          <Magnetic strength={0.1}>
            <a href="/" className="flex flex-col group">
              <span className={`font-serif text-slate-950 tracking-tighter leading-none transition-all duration-500 ${isScrolled ? "text-lg" : "text-2xl"}`}>
                EASTSIDE
              </span>
              <span className={`text-[7px] tracking-[0.4em] text-slate-500 font-bold uppercase transition-all duration-500 ${isScrolled ? "hidden" : "block"}`}>
                Dental Studio
              </span>
            </a>
          </Magnetic>
        </div>

        <div className={`flex items-center ${isScrolled ? "gap-2" : "gap-6 lg:gap-10"}`}>
          {navLinks.map((link, index) => (
            <a 
              key={link.name} 
              href={link.href} 
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                hoveredIndex === index ? "bg-slate-900 text-white" : "text-slate-700"
              }`}
            >
              <link.icon className={`w-4 h-4 transition-transform duration-300 ${hoveredIndex === index ? "scale-110" : ""}`} />
              <motion.span 
                initial={false}
                animate={{ 
                  width: (!isScrolled || hoveredIndex === index) ? "auto" : 0,
                  opacity: (!isScrolled || hoveredIndex === index) ? 1 : 0,
                  marginLeft: (!isScrolled || hoveredIndex === index) ? 4 : 0
                }}
                className="overflow-hidden whitespace-nowrap text-[10px] font-bold uppercase tracking-widest"
              >
                {link.name}
              </motion.span>
            </a>
          ))}
        </div>

        <div className={`hidden lg:flex items-center ${isScrolled ? "gap-4" : "gap-8"}`}>
          <div className={isScrolled ? "hidden xl:block" : "block"}>
            <Magnetic strength={0.2}>
              <a href="tel:5551234567" className="flex items-center gap-2 text-slate-900 group">
                <div className={`rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all duration-500 ${isScrolled ? "w-7 h-7" : "w-8 h-8"}`}>
                  <Phone className="w-3.5 h-3.5" />
                </div>
                {!isScrolled && (
                  <span className="text-xs font-bold tracking-widest uppercase">(555) 123-4567</span>
                )}
              </a>
            </Magnetic>
          </div>
          <Magnetic>
            <button className={`relative overflow-hidden group rounded-full ${isScrolled ? "px-5 py-2" : "px-7 py-3"}`}>
              <span className={`relative z-10 uppercase tracking-[0.2em] font-bold text-white transition-colors duration-500 group-hover:text-slate-900 ${isScrolled ? "text-[9px]" : "text-[10px]"}`}>
                Book
              </span>
              <div className="absolute inset-0 bg-slate-900 transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-white translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0" />
            </button>
          </Magnetic>
        </div>

        <button 
          className="lg:hidden text-slate-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="lg:hidden absolute top-[calc(100%+1rem)] left-0 w-full bg-white/90 backdrop-blur-2xl rounded-[2rem] border border-slate-100 shadow-2xl overflow-hidden p-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                  <link.icon className="w-5 h-5 text-slate-400" />
                  <span className="text-lg font-medium text-slate-900">{link.name}</span>
                </a>
              ))}
              <div className="h-px bg-slate-100 my-2" />
              <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm uppercase tracking-widest">
                Book Online
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </nav>
    </>
  );
}
