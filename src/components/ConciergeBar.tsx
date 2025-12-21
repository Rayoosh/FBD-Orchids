"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Calendar, MessageSquare } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export function ConciergeBar() {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  const handleBookClick = () => {
    const element = document.getElementById("booking");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md md:hidden"
    >
      <div className="bg-white/80 backdrop-blur-2xl border border-white/40 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] rounded-3xl p-2 flex items-center justify-between gap-2 overflow-hidden ring-1 ring-black/5">
        <a 
          href="tel:093613610"
          className="flex-1 flex items-center justify-center gap-2 h-12 bg-slate-50 rounded-2xl text-slate-900 font-bold text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-colors"
        >
          <Phone className="w-3.5 h-3.5" />
          Call Now
        </a>
        <button 
          onClick={handleBookClick}
          className="flex-[1.5] flex items-center justify-center gap-2 h-12 bg-brand-blue-600 rounded-2xl text-white font-bold text-[10px] uppercase tracking-widest shadow-[0_8px_20px_-4px_rgba(13,107,242,0.4)] hover:bg-brand-blue-700 transition-colors"
        >
          <Calendar className="w-3.5 h-3.5" />
          Book Online
        </button>
      </div>
    </motion.div>
  );
}
