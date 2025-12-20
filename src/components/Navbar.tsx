"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Specialists", href: "#experience" },
    { name: "Services", href: "#services" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#booking" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "py-4" : "py-8"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div
          className={cn(
            "relative flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500",
            isScrolled
              ? "bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-white/20"
              : "bg-transparent"
          )}
        >
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-brand-blue-900 rounded-xl flex items-center justify-center text-white font-display text-xl font-bold transition-transform group-hover:scale-105">
              E
            </div>
            <div className="flex flex-col">
              <span className="text-brand-blue-900 font-display font-bold tracking-tight text-lg leading-none">
                EASTSIDE
              </span>
              <span className="text-brand-blue-400 font-sans text-[10px] tracking-[0.2em] font-medium leading-none mt-1">
                DENTAL DESIGN
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-brand-blue-900/60 hover:text-brand-blue-900 font-sans text-sm font-medium tracking-wide transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="tel:+14255550123"
              className="hidden lg:flex items-center gap-2 text-brand-blue-900/60 hover:text-brand-blue-900 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="font-sans text-sm font-medium">425.555.0123</span>
            </Link>
            <Link
              href="#booking"
              className="bg-brand-blue-900 text-white px-6 py-2.5 rounded-full font-sans text-sm font-bold hover:bg-brand-blue-800 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand-blue-900/10 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Book Now
            </Link>
            <button
              className="md:hidden p-2 text-brand-blue-900"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-6 right-6 mt-4 bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 flex flex-col gap-4 md:hidden"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-brand-blue-900 font-sans text-lg font-medium p-2"
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-slate-100 my-2" />
              <Link
                href="tel:+14255550123"
                className="flex items-center gap-3 text-brand-blue-900/60 p-2"
              >
                <Phone className="w-5 h-5" />
                <span className="font-sans font-medium">425.555.0123</span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
