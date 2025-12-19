"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock, Calendar, ShieldCheck, Heart } from "lucide-react";

export function AboutBooking() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* About Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden luxury-shadow">
              <img
                src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=1200"
                alt="Our Professional Dental Team"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/10" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-4">About the Practice</h2>
            <h3 className="text-4xl font-serif mb-6">A legacy of ethical, high-quality care.</h3>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              At Eastside Cafe, we believe dentistry is more than just fixing teeth—it's about building long-term relationships based on trust, honesty, and empathy.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our team brings over a decade of experience to every consultation. We pride ourselves on our transparent approach: we only recommend what you truly need, and we always explain the "why" behind every procedure.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 text-sm font-medium">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span>Ethical Dentistry</span>
              </div>
              <div className="flex items-center space-x-3 text-sm font-medium">
                <Heart className="w-5 h-5 text-primary" />
                <span>Patient-First Philosophy</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Booking Section */}
        <div id="booking" className="grid lg:grid-cols-5 gap-12 items-start bg-brand-blue-900 rounded-[2rem] overflow-hidden luxury-shadow text-white">
          <div className="lg:col-span-2 p-12 lg:p-16 flex flex-col justify-between h-full bg-primary/10">
            <div>
              <h2 className="text-3xl font-serif mb-6 text-white">Let’s take care<br /><span className="italic text-brand-blue-100">of your smile.</span></h2>
              <p className="text-brand-blue-100/70 mb-12">
                Whether it's an emergency or a routine checkup, we're here to provide the care you deserve.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-lg bg-white/10 text-white">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-brand-blue-100/50 mb-1">Call Today</p>
                    <p className="font-bold">+1 (234) 567-890</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-lg bg-white/10 text-white">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-brand-blue-100/50 mb-1">Our Location</p>
                    <p className="font-bold text-sm">123 Eastside Ave, Suite 101<br />Modern City, MC 54321</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-lg bg-white/10 text-white">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-brand-blue-100/50 mb-1">Opening Hours</p>
                    <p className="font-bold text-sm">Mon-Fri: 8:00 AM - 6:00 PM<br />Sat: 9:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-white/10">
              <div className="flex items-center space-x-4">
                <Calendar className="w-6 h-6 text-brand-blue-100" />
                <p className="text-sm font-medium">Same-day appointments available for urgent pain relief.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 p-12 lg:p-16 bg-white text-foreground h-full">
            <h3 className="text-2xl font-serif mb-8">Request an Appointment</h3>
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" className="bg-brand-blue-50/50 border-none h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+1 (234) 567-890" className="bg-brand-blue-50/50 border-none h-12" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john@example.com" className="bg-brand-blue-50/50 border-none h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="service">Desired Service</Label>
                <select id="service" className="w-full bg-brand-blue-50/50 border-none h-12 rounded-md px-3 text-sm focus:ring-2 focus:ring-primary">
                  <option value="checkup">Routine Checkup</option>
                  <option value="emergency">Emergency Care</option>
                  <option value="hygiene">Hygiene & Cleaning</option>
                  <option value="cosmetic">Cosmetic Dentistry</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">How can we help?</Label>
                <Textarea id="message" placeholder="Please describe any pain or specific concerns..." className="bg-brand-blue-50/50 border-none min-h-[120px]" />
              </div>
              <Button className="w-full h-14 rounded-full text-lg font-bold shadow-lg shadow-primary/20">
                Book My Appointment
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                We'll call you back within 2 business hours to confirm your time.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
