"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Shield, Users, Stethoscope, Sparkles, Quote } from "lucide-react";
import { Magnetic } from "./ui/Magnetic";
import { Button } from "./ui/button";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

    const navLinks = [
      { name: "Quality", href: "#experience", icon: Shield },
      { name: "Services", href: "#services", icon: Stethoscope },
      { name: "Testimonials", href: "/testimonials", icon: Quote },
      { name: "Experience", href: "#experience", icon: Sparkles },
    ];


  const handleBookClick = () => {
    const element = document.getElementById("booking");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav 
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-700 rounded-full border ring-1 ${
          (isScrolled || isMobile)
            ? "py-2 px-3 bg-white/70 backdrop-blur-3xl backdrop-saturate-[1.8] border-white ring-slate-900/5 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.2),0_8px_20px_-8px_rgba(0,0,0,0.1)] w-auto min-w-[280px] md:min-w-0" 
            : "py-4 px-6 bg-white/40 backdrop-blur-2xl backdrop-saturate-[1.4] border-white ring-slate-900/5 w-[90%] md:w-[85%] max-w-7xl editorial-shadow"
      }`}
    >
      {/* Prism Rim - Dual Layer Highlights */}
      <div className="absolute inset-0 rounded-full pointer-events-none border-[0.5px] border-white/40" />
      <div className="absolute inset-0 rounded-full pointer-events-none border-t border-white/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]" />
      <div className="absolute -inset-[1px] rounded-full pointer-events-none border border-black/5 opacity-10" />
      
        <div className={`flex items-center justify-between ${(isScrolled || isMobile) ? "w-full gap-2 md:gap-12" : "w-full"}`}>
          <div className="flex-shrink-0">
            <Magnetic strength={0.1}>
                  <Link href="/" className="flex items-center gap-3 group">
                    <img 
                      src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/logo-1766284403960.png?width=800&height=800&resize=contain" 
                      alt="Freemans Bay Dental Centre" 
                      className={`transition-all duration-500 object-contain ${(isScrolled || isMobile) ? "h-8 md:h-10" : "h-14 md:h-16"}`}
                    />
                  </Link>
            </Magnetic>
          </div>

          <div className={`hidden md:flex items-center ${(isScrolled || isMobile) ? "gap-2" : "gap-6 lg:gap-10"}`}>

          {navLinks.map((link, index) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-500 ${
                  hoveredIndex === index ? "text-white" : "text-slate-600"
                }`}
              >
              {hoveredIndex === index && (
                <motion.div 
                  layoutId="nav-bg"
                  className="absolute inset-0 bg-brand-blue-600 rounded-full luxury-shadow"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <link.icon className={`w-3.5 h-3.5 relative z-10 transition-transform duration-500 ${hoveredIndex === index ? "scale-110" : ""}`} />
              <motion.span 
                initial={false}
                animate={{ 
                  width: (!isScrolled || hoveredIndex === index) ? "auto" : 0,
                  opacity: (!isScrolled || hoveredIndex === index) ? 1 : 0,
                  marginLeft: (!isScrolled || hoveredIndex === index) ? 4 : 0
                }}
                className="relative z-10 overflow-hidden whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.2em]"
              >
                {link.name}
              </motion.span>
            </Link>
          ))}
        </div>

        <div className={`flex items-center ${(isScrolled || isMobile) ? "gap-3 md:gap-6" : "gap-10"}`}>
            <div className={`hidden ${(isScrolled || isMobile) ? "xl:block" : "lg:block"}`}>
              <Magnetic strength={0.2}>
                  <a href="tel:093613610" className="flex items-center gap-3 text-brand-blue-900 group">
                    <div className={`rounded-full border border-brand-blue-100 flex items-center justify-center group-hover:bg-brand-blue-600 group-hover:text-white group-hover:border-transparent transition-all duration-500 luxury-shadow ${(isScrolled || isMobile) ? "w-8 h-8" : "w-10 h-10"}`}>
                      <Phone className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </div>
                  {!(isScrolled || isMobile) && (
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500 group-hover:text-brand-blue-900 transition-colors">(09) 361 3610</span>
                  )}
                </a>
              </Magnetic>
            </div>
          <Magnetic>
            <Button 
              variant="premium" 
              className={(isScrolled || isMobile) ? "h-9 px-4 text-xs md:h-10 md:px-6 md:text-sm" : "h-12 px-8"}
              onClick={handleBookClick}
            >
              Book
            </Button>
          </Magnetic>
          
          <button 
            className="md:hidden text-slate-900 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
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
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <link.icon className="w-5 h-5 text-slate-400" />
                  <span className="text-lg font-medium text-slate-900">{link.name}</span>
                </Link>
              ))}
              <div className="h-px bg-slate-100 my-2" />
              <button 
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm uppercase tracking-widest"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleBookClick();
                }}
              >
                Book Online
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
