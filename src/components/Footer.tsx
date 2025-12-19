"use client";

import Link from "next/link";
import { Instagram, Facebook, Twitter, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brand-blue-900 text-white pt-40 pb-20 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-accent/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-24 mb-40">
          <div>
            <h2 className="text-display text-[10px] text-accent mb-12 tracking-[0.4em]">Connect</h2>
            <h3 className="text-6xl md:text-8xl font-serif font-light leading-[0.9] tracking-tighter mb-16">
              Experience the <br />
              <span className="text-serif-italic pl-12 text-accent">Difference.</span>
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
              <div className="space-y-6">
                <h4 className="text-display text-[9px] text-white/40 tracking-widest">Navigation</h4>
                <ul className="space-y-4">
                  {["Clinical Mastery", "The Experience", "Stories", "Inquire"].map((item) => (
                    <li key={item}>
                      <Link href={`#${item.toLowerCase().replace(" ", "-")}`} className="text-sm font-light hover:text-accent transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6">
                <h4 className="text-display text-[9px] text-white/40 tracking-widest">Specialties</h4>
                <ul className="space-y-4">
                  {["Restorative", "Aesthetic", "Sedation", "General"].map((item) => (
                    <li key={item}>
                      <Link href="#services" className="text-sm font-light hover:text-accent transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6">
                <h4 className="text-display text-[9px] text-white/40 tracking-widest">Studio</h4>
                <p className="text-sm font-light leading-relaxed opacity-60">
                  Freemans Bay, <br />
                  Auckland, NZ 1011
                </p>
                <div className="flex space-x-4">
                  <Instagram className="w-4 h-4 opacity-40 hover:opacity-100 cursor-pointer transition-opacity" />
                  <Facebook className="w-4 h-4 opacity-40 hover:opacity-100 cursor-pointer transition-opacity" />
                  <Twitter className="w-4 h-4 opacity-40 hover:opacity-100 cursor-pointer transition-opacity" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-end">
             <div className="bg-white/5 backdrop-blur-xl p-12 rounded-sm border border-white/10 luxury-shadow">
               <p className="text-display text-[10px] text-accent mb-6">Patient Inquiry</p>
               <p className="text-3xl font-serif font-light mb-8">Ready to transform your narrative?</p>
               <Link href="#booking" className="flex items-center space-x-4 group text-display text-xs">
                 <span className="pb-1 border-b border-white/20 group-hover:border-accent transition-colors">Begin Your Visit</span>
                 <ArrowUpRight className="w-4 h-4 group-hover:text-accent transition-colors" />
               </Link>
             </div>
          </div>
        </div>

        <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 text-[10px] text-white/30 uppercase tracking-[0.3em] font-display">
          <p>© {new Date().getFullYear()} Freemans Bay Dental Practice</p>
          <div className="flex space-x-12">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors">Accessibility</Link>
          </div>
          <p className="italic lowercase opacity-20">Art of Clinical Excellence</p>
        </div>
      </div>
    </footer>
  );
}
