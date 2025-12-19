"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "Patient Experience", href: "#experience" },
  { name: "Reviews", href: "#reviews" },
  { name: "About", href: "#about" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12",
        isScrolled 
          ? "py-4 glass-morphism luxury-shadow" 
          : "py-6 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex flex-col">
          <span className="text-2xl font-serif font-bold tracking-tight text-primary">
            Freemans Bay Dental
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-sans -mt-1 ml-0.5">
            Dental Practice
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <a 
            href="tel:+1234567890" 
            className="flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors mr-4"
          >
            <Phone className="w-4 h-4 mr-2" />
            <span>Call Today</span>
          </a>
          <Button asChild className="rounded-full px-6 font-medium">
            <Link href="#booking">Book Appointment</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-border overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-foreground hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-border" />
              <div className="flex flex-col space-y-4 pt-2">
                <a 
                  href="tel:+1234567890" 
                  className="flex items-center text-lg font-medium text-primary"
                >
                  <Phone className="w-5 h-5 mr-3" />
                  <span>Call Today</span>
                </a>
                <Button asChild className="w-full rounded-full py-6 text-lg">
                  <Link href="#booking" onClick={() => setIsMobileMenuOpen(false)}>
                    Book Appointment
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
