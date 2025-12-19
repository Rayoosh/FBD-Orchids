"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Shield, Users, Stethoscope, Sparkles } from "lucide-react";
import { Magnetic } from "./ui/Magnetic";
import { NAV_DIMENSIONS } from "@/lib/nav-constants";

interface NavbarProps {
  isScrolled?: boolean;
}

export function Navbar({ isScrolled = false }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { name: "Excellence", href: "#", icon: Shield },
    { name: "Specialists", href: "#", icon: Users },
    { name: "Services", href: "#", icon: Stethoscope },
    { name: "Experience", href: "#", icon: Sparkles },
  ];

  // Calculate width based on state to match NavHousing exactly
  const expandedWidth = Math.min(windowWidth * NAV_DIMENSIONS.TOP.WIDTH_PERCENT, NAV_DIMENSIONS.TOP.WIDTH);
  const collapsedWidth = NAV_DIMENSIONS.SCROLLED.WIDTH;

  return (
    <motion.nav 
      initial={false}
      animate={{
        width: isScrolled ? collapsedWidth : expandedWidth,
        height: isScrolled ? NAV_DIMENSIONS.SCROLLED.HEIGHT : NAV_DIMENSIONS.TOP.HEIGHT,
        marginTop: isScrolled ? NAV_DIMENSIONS.SCROLLED.MARGIN_TOP : NAV_DIMENSIONS.TOP.MARGIN_TOP,
        backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.6)",
        backdropFilter: "blur(20px)",
        borderColor: isScrolled ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.3)",
      }}
      transition={NAV_DIMENSIONS.SPRING}
      className="relative z-[100] mx-auto rounded-full border shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex items-center justify-between overflow-hidden px-6"
    >
      <div className={`flex items-center w-full transition-all duration-500 ${isScrolled ? "gap-4" : "gap-12"}`}>
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

        <div className={`flex items-center flex-1 justify-center ${isScrolled ? "gap-1" : "gap-4 lg:gap-6"}`}>
          {navLinks.map((link, index) => (
            <a 
              key={link.name} 
              href={link.href} 
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 ${
                hoveredIndex === index ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
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
                transition={NAV_DIMENSIONS.SPRING}
                className="overflow-hidden whitespace-nowrap text-[10px] font-bold uppercase tracking-widest"
              >
                {link.name}
              </motion.span>
            </a>
          ))}
        </div>

        <div className={`hidden lg:flex items-center ${isScrolled ? "gap-3" : "gap-8"}`}>
          <div className={isScrolled ? "hidden xl:block" : "block"}>
            <Magnetic strength={0.2}>
              <a href="tel:5551234567" className="flex items-center gap-2 text-slate-900 group">
                <div className={`rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all duration-500 ${isScrolled ? "w-7 h-7" : "w-8 h-8"}`}>
                  <Phone className="w-3.5 h-3.5" />
                </div>
                {!isScrolled && (
                  <span className="text-xs font-bold tracking-widest uppercase whitespace-nowrap">(555) 123-4567</span>
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
          className="lg:hidden text-slate-900 ml-auto"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="lg:hidden absolute top-[calc(100%+0.5rem)] left-0 w-full bg-white/95 backdrop-blur-2xl rounded-[2rem] border border-slate-100 shadow-2xl overflow-hidden p-6"
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
    </motion.nav>
  );
}
