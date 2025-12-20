"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter, ArrowUpRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    practice: [
        { name: "Our Philosophy", href: "#experience" },
        { name: "Technology", href: "#experience" },
        { name: "Our Story", href: "#experience" },
        { name: "Careers", href: "#" },
      ],
      services: [
        { name: "General Care", href: "#services" },
        { name: "Emergency Center", href: "#services" },
        { name: "Adolescent Care", href: "#services" },
        { name: "Smile Care", href: "#services" },
      ],
      social: [
        { icon: Instagram, href: "https://instagram.com", name: "Instagram" },
        { icon: Facebook, href: "https://facebook.com", name: "Facebook" },
        { icon: Linkedin, href: "https://linkedin.com", name: "LinkedIn" },
        { icon: Twitter, href: "https://twitter.com", name: "Twitter" },
      ]
    };
  
    return (
      <footer className="w-full bg-transparent pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-3 mb-8 group">
                <div className="w-10 h-10 bg-brand-blue-900 rounded-xl flex items-center justify-center text-white font-display text-xl font-bold transition-transform group-hover:scale-105">
                  F
                </div>
                <div className="flex flex-col">
                  <span className="text-brand-blue-900 font-display font-bold tracking-tight text-lg leading-none">
                    FREEMANS BAY
                  </span>
                  <span className="text-brand-blue-400 font-sans text-[10px] tracking-[0.2em] font-medium leading-none mt-1">
                    FAMILY DENTISTRY
                  </span>
                </div>
              </Link>
              <p className="text-slate-500 font-sans text-sm leading-relaxed mb-8 max-w-xs">
                Auckland's trusted family practice providing gentle, affordable care with transparent diagnostics.
              </p>
            <div className="flex items-center gap-4">
              {footerLinks.social.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-blue-900 hover:border-brand-blue-900 transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-brand-blue-900 mb-8 tracking-tight">The Practice</h4>
            <ul className="flex flex-col gap-4">
              {footerLinks.practice.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-slate-500 hover:text-brand-blue-900 font-sans text-sm transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-brand-blue-900 mb-8 tracking-tight">Services</h4>
            <ul className="flex flex-col gap-4">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-slate-500 hover:text-brand-blue-900 font-sans text-sm transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-brand-blue-900 mb-8 tracking-tight">Newsletter</h4>
            <p className="text-slate-500 font-sans text-sm mb-6">
              Join our exclusive circle for clinical insights and practice updates.
            </p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email address"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-sans focus:outline-none focus:border-brand-blue-900 transition-colors"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-brand-blue-900 text-white px-6 rounded-xl font-sans text-xs font-bold hover:bg-brand-blue-800 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 font-sans text-xs">
            © {currentYear} Eastside Dental Design. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <Link href="#" className="text-slate-400 hover:text-brand-blue-900 font-sans text-xs transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-slate-400 hover:text-brand-blue-900 font-sans text-xs transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
