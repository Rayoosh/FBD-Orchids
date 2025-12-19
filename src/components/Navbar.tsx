"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Clinical Mastery", href: "#services" },
  { name: "The Experience", href: "#experience" },
  { name: "Stories", href: "#reviews" },
  { name: "Contact", href: "#booking" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-6 md:px-12",
        isScrolled 
          ? "py-4 glass-morphism luxury-shadow" 
          : "py-10 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="group flex flex-col">
          <span className="text-xl md:text-2xl font-serif font-light tracking-tighter text-foreground group-hover:text-accent transition-colors duration-500">
            FREEMANS BAY <span className="font-serif italic text-accent group-hover:text-foreground">DENTAL</span>
          </span>
          <span className="text-[9px] uppercase tracking-[0.4em] text-muted-foreground font-display mt-0.5 ml-0.5">
            Est. Excellence
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[11px] font-display uppercase tracking-[0.2em] text-foreground/70 hover:text-foreground transition-colors duration-500 relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-full h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right group-hover:origin-left" />
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center space-x-8">
          <Button asChild variant="ghost" className="text-[11px] font-display uppercase tracking-widest hover:bg-transparent hover:text-accent transition-colors">
            <Link href="#booking">Inquire</Link>
          </Button>
            <Button asChild className="bg-primary hover:bg-brand-blue-900 text-white rounded-full px-8 h-12 text-[11px] font-display uppercase tracking-[0.2em] transition-all duration-500">
            <Link href="#booking">Book Appointment</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 text-foreground focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-background flex flex-col p-12 lg:hidden"
          >
            <div className="flex justify-between items-center mb-20">
               <span className="text-xl font-serif">FREEMANS BAY</span>
               <button onClick={() => setIsMobileMenuOpen(false)}>
                 <X className="w-8 h-8" />
               </button>
            </div>
            <nav className="flex flex-col space-y-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-4xl font-serif font-light text-foreground hover:text-accent transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="mt-auto space-y-6">
              <p className="text-display text-[10px] text-muted-foreground uppercase tracking-widest">Auckland, New Zealand</p>
              <Button asChild className="w-full bg-primary text-white rounded-full py-8 text-display text-xs uppercase tracking-widest">
                <Link href="#booking" onClick={() => setIsMobileMenuOpen(false)}>
                  Book Your Visit
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
