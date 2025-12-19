"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Star, Quote } from "lucide-react";

const services = [
  {
    id: "01",
    title: "Clinical Mastery",
    category: "General & Advanced",
    description: "From restorative fillings to complex oral surgery, we combine technical precision with biological understanding.",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "02",
    title: "Aesthetic Restoration",
    category: "Cosmetic Excellence",
    description: "Bespoke smile design using ultra-thin porcelain veneers and conservative whitening protocols.",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "03",
    title: "Nervous Patient Protocol",
    category: "Sedation & Care",
    description: "Tailored sedation options and a sensory-calming environment designed specifically for dental anxiety.",
    image: "https://images.unsplash.com/photo-1593054941324-f77f09142c6c?auto=format&fit=crop&q=80&w=1200",
  },
];

const testimonials = [
  {
    quote: "A fundamentally different dental experience. It feels more like a private lounge than a clinic.",
    author: "Elena Vance",
    location: "Freemans Bay",
  },
  {
    quote: "The attention to detail in their clinical work is matched only by their incredible patient hospitality.",
    author: "James Harrington",
    location: "Auckland CBD",
  },
];

export function ServicesTestimonials() {
  return (
    <section id="services" className="py-40 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-32">
          <div className="max-w-2xl">
            <h2 className="text-display text-xs text-accent mb-6">Our Specializations</h2>
            <h3 className="text-5xl md:text-7xl font-serif font-light leading-[1.1] tracking-tighter">
              Clinical Artistry <br />
              <span className="text-serif-italic pl-12 text-primary">In Every Detail.</span>
            </h3>
          </div>
          <p className="text-muted-foreground font-light max-w-sm text-lg leading-relaxed md:mb-4">
            We provide a curated selection of dental services that prioritize both structural integrity and aesthetic perfection.
          </p>
        </div>

        {/* Staggered Services Grid */}
        <div className="space-y-40">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className={`grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-24 items-center ${
                index % 2 === 1 ? "lg:grid-cols-[0.8fr_1.2fr]" : ""
              }`}
            >
              <div className={`relative ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-sm luxury-shadow group">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-primary/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                </div>
                {/* Decorative floating ID */}
                <div className={`absolute -top-10 text-9xl font-serif font-black text-slate-900/5 select-none pointer-events-none ${
                  index % 2 === 1 ? "-right-10" : "-left-10"
                }`}>
                  {service.id}
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <span className="text-display text-[10px] text-accent mb-4 tracking-[0.3em]">{service.category}</span>
                <h4 className="text-4xl font-serif font-light mb-6 tracking-tight">{service.title}</h4>
                <p className="text-lg text-muted-foreground font-light leading-relaxed mb-10">
                  {service.description}
                </p>
                <Link href="#booking" className="group flex items-center space-x-4 text-display text-xs w-fit">
                  <span>Explore Mastery</span>
                  <div className="relative w-12 h-px bg-primary/20 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* High-End Testimonial Section */}
        <div id="reviews" className="mt-60 pt-40 border-t border-border relative">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-border to-transparent" />
           
           <div className="grid lg:grid-cols-2 gap-24 items-start">
             <div>
               <h2 className="text-display text-xs text-accent mb-12">The Patient Narrative</h2>
               <div className="space-y-24">
                 {testimonials.map((t, i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, x: -20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.2 }}
                     className="relative pl-12"
                   >
                     <Quote className="absolute top-0 left-0 w-8 h-8 text-accent/20" />
                     <p className="text-3xl font-serif italic font-light leading-relaxed mb-8">
                       "{t.quote}"
                     </p>
                     <div>
                       <p className="text-display text-[10px] tracking-[0.3em] mb-1">{t.author}</p>
                       <p className="text-xs text-muted-foreground font-light italic">{t.location}</p>
                     </div>
                   </motion.div>
                 ))}
               </div>
             </div>

             <div className="relative lg:mt-32">
               <div className="aspect-square bg-slate-900 rounded-sm p-16 flex flex-col justify-between text-white luxury-shadow relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[100px] rounded-full" />
                 
                 <div>
                   <div className="flex text-accent mb-6">
                     {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-4 h-4 fill-current" />)}
                   </div>
                   <h4 className="text-4xl font-serif font-light leading-tight mb-8">
                     Recognized for <br />
                     <span className="text-serif-italic italic pl-8">Clinical Integrity</span>
                   </h4>
                 </div>

                 <div className="space-y-6">
                   <p className="text-sm text-white/60 font-light leading-relaxed">
                     Our commitment to clinical excellence has earned us the trust of the local community for over a decade. We invite you to experience dentistry as it was meant to be.
                   </p>
                   <Button asChild className="w-full bg-white text-primary hover:bg-accent hover:text-white rounded-full py-8 text-display text-xs transition-all duration-500">
                     <Link href="#booking">Book Your Experience</Link>
                   </Button>
                 </div>
               </div>
               
               {/* Floating Decorative Image */}
               <motion.div
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 className="absolute -bottom-12 -right-12 w-48 h-48 rounded-sm overflow-hidden border-[8px] border-background luxury-shadow hidden md:block"
               >
                 <img
                   src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=500"
                   alt="Clinical Detail"
                   className="w-full h-full object-cover"
                 />
               </motion.div>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
}
