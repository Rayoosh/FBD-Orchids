"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    title: "General Dentistry",
    description: "Routine checkups, fillings, and essential care to keep your smile healthy and vibrant.",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Emergency Care",
    description: "Same-day appointments for urgent pain, broken teeth, or sudden dental issues.",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Hygiene & Checkups",
    description: "Deep cleaning and preventative screening to ensure long-term oral health.",
    image: "https://images.unsplash.com/photo-1593054941324-f77f09142c6c?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Urgent Pain Relief",
    description: "Fast, effective solutions for toothaches and discomfort, handled with extreme care.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
  },
];

const testimonials = [
  {
    quote: "I’ve been a patient here for almost 15 years. They always make me feel safe and the pricing is incredibly fair.",
    author: "Sarah Jenkins",
    role: "Patient since 2010",
  },
  {
    quote: "Extremely nervous about dentists, but Freemans Bay Dental made me feel completely at ease. The same-day booking was a lifesaver.",
    author: "Michael Ross",
    role: "Emergency Patient",
  },
  {
    quote: "Transparent, honest, and professional. No pressure to buy unnecessary treatments. Just great dental care.",
    author: "Elena Vance",
    role: "Local Professional",
  },
];

export function ServicesTestimonials() {
  return (
    <section id="services" className="py-24 bg-brand-blue-50/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-4">Our Services</h2>
          <h3 className="text-4xl md:text-5xl font-serif mb-6">Expert care for every need.</h3>
          <p className="text-lg text-muted-foreground">
            We offer a comprehensive range of dental services, delivered with a focus on quality, efficiency, and patient comfort.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-default"
            >
              <Card className="overflow-hidden border-none luxury-shadow h-full bg-white transition-transform duration-300 group-hover:-translate-y-2">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <h4 className="text-xl font-serif font-bold mb-3">{service.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <Link href="#booking" className="inline-flex items-center text-sm font-bold text-primary hover:underline underline-offset-4 group/link">
                    Book Now <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div id="reviews" className="relative pt-24 border-t border-border">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/3">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-4">Social Proof</h2>
              <h3 className="text-4xl font-serif mb-6">What our patients say.</h3>
              <p className="text-muted-foreground mb-8">
                Trust is built over time. We're proud to have served our community for over a decade with honesty and care.
              </p>
              <Button variant="outline" className="rounded-full border-primary/20 text-primary hover:bg-primary/5">
                Read All Reviews
              </Button>
            </div>

            <div className="lg:w-2/3 grid md:grid-cols-2 gap-6">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-8 rounded-2xl bg-white luxury-shadow border border-border relative"
                >
                  <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/5" />
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-lg font-serif italic mb-6 leading-relaxed text-foreground/90">
                    "{t.quote}"
                  </p>
                  <div>
                    <p className="font-bold text-sm">{t.author}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">{t.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
