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
      initial={{ y: 80 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 w-full z-[100] md:hidden"
    >
      <div className="bg-white/90 backdrop-blur-xl border-t border-slate-100 p-3 flex items-center justify-between gap-3 safe-bottom shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)]">
        <a 
          href="tel:093613610"
          className="flex-1 flex items-center justify-center gap-2 h-14 bg-slate-50 rounded-xl text-slate-900 font-bold text-[10px] uppercase tracking-widest active:bg-slate-100 transition-colors border border-slate-100"
        >
          <Phone className="w-4 h-4" />
          Call
        </a>
        <button 
          onClick={handleBookClick}
          className="flex-[2] flex items-center justify-center gap-2 h-14 bg-brand-blue-600 rounded-xl text-white font-bold text-[10px] uppercase tracking-widest shadow-lg active:bg-brand-blue-700 transition-colors"
        >
          <Calendar className="w-4 h-4" />
          Book Online
        </button>
      </div>
    </motion.div>
  );
}
