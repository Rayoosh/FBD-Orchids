"use client";

import { motion } from "framer-motion";

export function GeometricAccent({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.2" />
      <path d="M50 2L50 98M2 50L98 50" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
      <motion.circle 
        cx="50" 
        cy="50" 
        r="2" 
        fill="currentColor"
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

export function CornerAccent({ className }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <div className="flex gap-1">
        <div className="w-1 h-1 rounded-full bg-blue-500/40" />
        <div className="w-1 h-1 rounded-full bg-blue-500/20" />
      </div>
      <div className="flex gap-1">
        <div className="w-1 h-1 rounded-full bg-blue-500/20" />
        <div className="w-1 h-1 rounded-full bg-blue-500/10" />
      </div>
    </div>
  );
}
