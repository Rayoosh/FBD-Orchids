"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white pt-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Final Reassurance Section */}
        <div className="relative overflow-hidden rounded-[3rem] bg-brand-blue-50 p-12 lg:p-20 text-center mb-24">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-serif mb-6 text-foreground">
              Ready to feel confident<br />
              <span className="italic text-primary">about your smile again?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Don't let dental anxiety or a busy schedule hold you back. Join thousands of patients who trust Freemans Bay Dental for gentle, professional care.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button asChild size="lg" className="rounded-full h-14 px-10 text-lg font-bold shadow-xl shadow-primary/20">
                <Link href="#booking">Book Your Appointment Today</Link>
              </Button>
              <a href="tel:+1234567890" className="flex items-center text-lg font-bold text-primary hover:text-primary/80 transition-all">
                <Phone className="mr-2 w-5 h-5" /> Or Call Us Now
              </a>
            </div>
          </div>
          
          {/* Decorative background shapes */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-border">
          <div className="space-y-6">
            <Link href="/" className="flex flex-col">
              <span className="text-2xl font-serif font-bold tracking-tight text-primary">
                Freemans Bay Dental
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-sans -mt-1 ml-0.5">
                Dental Practice
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Providing modern, luxurious dental care with a clinical heart. Trusted by our community for over a decade.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="p-2 rounded-full bg-brand-blue-50 text-primary hover:bg-primary hover:text-white transition-all">
                <Instagram className="w-4 h-4" />
              </Link>
              <Link href="#" className="p-2 rounded-full bg-brand-blue-50 text-primary hover:bg-primary hover:text-white transition-all">
                <Facebook className="w-4 h-4" />
              </Link>
              <Link href="#" className="p-2 rounded-full bg-brand-blue-50 text-primary hover:bg-primary hover:text-white transition-all">
                <Twitter className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {["Services", "Patient Experience", "Reviews", "About", "Emergency Care"].map((item) => (
                <li key={item}>
                  <Link href={`#${item.toLowerCase().replace(" ", "-")}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Our Services</h4>
            <ul className="space-y-4">
              {["General Dentistry", "Hygiene & Checkups", "Pain Relief", "Preventative Care", "Dental Implants"].map((item) => (
                <li key={item}>
                  <Link href="#services" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 text-primary" />
                <span>123 Freemans Bay Rd, Suite 101<br />Modern City, MC 54321</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span>+1 (234) 567-890</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span>care@freemansbay.dental</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="py-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Freemans Bay Dental Practice. All rights reserved.
          </p>
          <div className="flex space-x-8">
            <Link href="#" className="text-xs text-muted-foreground hover:text-primary">Privacy Policy</Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-primary">Terms of Service</Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-primary">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

const MapPin = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);

const Mail = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
