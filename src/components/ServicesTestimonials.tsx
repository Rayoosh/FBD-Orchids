"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Sparkles, 
  Stethoscope, 
  Smile, 
  ShieldCheck, 
  ArrowRight,
  Quote,
  Star
} from "lucide-react";
import { Magnetic } from "./ui/Magnetic";

const services = [
  {
    title: "Cosmetic Dentistry",
    description: "Transform your smile with porcelain veneers, whitening, and precision contouring designed for your unique facial structure.",
    icon: <Sparkles className="w-8 h-8" />,
    color: "bg-blue-50"
  },
  {
    title: "General Oral Health",
    description: "Comprehensive care focusing on longevity and prevention, utilizing the latest digital diagnostics and biological dentistry.",
    icon: <Stethoscope className="w-8 h-8" />,
    color: "bg-blue-100/50"
  },
  {
    title: "Restorative Excellence",
    description: "Restore function and aesthetics with biomimetic fillings, crowns, and implants that look and feel completely natural.",
    icon: <Smile className="w-8 h-8" />,
    color: "bg-white"
  },
  {
    title: "Preventive Precision",
    description: "Advanced hygiene protocols and early detection systems to maintain your oral health at the highest possible standard.",
    icon: <ShieldCheck className="w-8 h-8" />,
    color: "bg-blue-50"
  }
];

const testimonials = [
  {
    name: "Eleanor Vance",
    role: "Architect",
    quote: "The attention to detail here is unparalleled. It felt less like a dental appointment and more like a curated wellness experience.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
  },
  {
    name: "Julian Thorne",
    role: "Creative Director",
    quote: "Eastside Dental redefined what I expected from dentistry. The aesthetic results are stunning, but the process was the true surprise.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop"
  }
];

export function ServicesTestimonials() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);
    
    // 3D Perspective Transforms
    const rotateZ = useTransform(scrollYProgress, [0, 1], [0, -5]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.95, 1]);

    return (
      <section className="bg-background relative">
        {/* Services Horizontal Scroll with 3D Depth */}
        <div ref={targetRef} className="relative h-[400vh] bg-slate-900 overflow-visible">
          <div className="sticky top-0 flex h-screen items-center overflow-hidden">
            <motion.div 
              style={{ x, rotateZ, scale }} 
              className="flex gap-20 px-12 md:px-32 items-center"
            >
              <div className="flex flex-col justify-center min-w-[400px] md:min-w-[600px] pr-20">
                <div className="inline-flex items-center gap-4 mb-10">
                  <div className="w-12 h-[1px] bg-blue-400" />
                  <span className="text-[10px] text-blue-400 font-bold uppercase tracking-[0.4em]">Our Curated Services</span>
                </div>
                <h2 className="text-7xl md:text-9xl font-serif text-white mb-10 leading-[0.85] tracking-tighter">
                  Clinical <br /> <span className="italic text-slate-400 font-light">Artistry</span>
                </h2>
                <p className="text-slate-400 text-xl max-w-md font-light leading-relaxed">
                  Where advanced medical science meets a boutique aesthetic sensibility. Explore our range of specialized treatments.
                </p>
                
                <div className="mt-20 flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group cursor-pointer hover:bg-white transition-all duration-500">
                    <ArrowRight className="w-6 h-6 text-white group-hover:text-slate-900 transition-colors" />
                  </div>
                  <span className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-bold">Scroll to explore</span>
                </div>
              </div>
              
              {services.map((service, index) => (
                <ServiceCard key={index} service={service} index={index} scrollYProgress={scrollYProgress} />
              ))}
            </motion.div>
          </div>
          
          {/* Atmospheric Glow */}
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </div>
  
        {/* Testimonials - Editorial Gallery Layout */}
        <div className="py-40 md:py-64 px-6 md:px-24 bg-background relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-50/50 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-32 items-start">
              <div className="relative sticky top-40">
                <div className="mb-12">
                   <Quote className="w-16 h-16 text-blue-100 mb-8" strokeWidth={1} />
                   <h2 className="text-6xl md:text-7xl font-serif text-slate-900 leading-[0.9] tracking-tighter mb-8">
                     The Patient <br /><span className="italic text-slate-400">Perspective</span>
                   </h2>
                </div>
                <p className="text-slate-500 max-w-sm text-lg font-light leading-relaxed mb-12">
                  Exceptional dentistry is felt as much as it is seen. Our patients share their journeys of transformation and comfort.
                </p>
                <div className="w-24 h-[1px] bg-slate-200" />
              </div>
  
              <div className="grid md:grid-cols-2 gap-12">
                {testimonials.map((testimonial, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className={`flex flex-col p-12 rounded-3xl luxury-shadow transition-transform duration-700 hover:-translate-y-2 ${index % 2 === 0 ? "bg-white" : "bg-slate-50 mt-20"}`}
                  >
                    <div className="flex gap-1 mb-8">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    
                    <p className="text-xl text-slate-800 font-serif italic leading-relaxed mb-12">
                      "{testimonial.quote}"
                    </p>
                    
                    <div className="mt-auto flex items-center gap-5 pt-8 border-t border-slate-100">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-700">
                        <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-900">{testimonial.name}</h4>
                        <p className="text-[9px] text-blue-500 uppercase tracking-[0.2em] font-medium mt-1">{testimonial.role}</p>
                      </div>
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
  
  function ServiceCard({ service, index, scrollYProgress }: { service: any, index: number, scrollYProgress: any }) {
    const cardRef = useRef(null);
    
    // Individual card tilt based on scroll
    const rotateY = useTransform(scrollYProgress, [0.1 * index, 0.1 * index + 0.3], [15, -15]);
    const translateZ = useTransform(scrollYProgress, [0.1 * index, 0.1 * index + 0.3], [0, 50]);
    const opacity = useTransform(scrollYProgress, [0.1 * index - 0.1, 0.1 * index, 0.1 * index + 0.5, 0.1 * index + 0.6], [0, 1, 1, 0]);

    return (
      <motion.div 
        ref={cardRef}
        style={{ rotateY, translateZ, opacity }}
        className="group relative min-w-[350px] md:min-w-[480px] aspect-[4/5] bg-white rounded-3xl p-16 flex flex-col justify-between overflow-hidden editorial-shadow transition-all duration-700 hover:shadow-3xl"
      >
        <div className="absolute top-0 right-0 p-12 text-slate-50 transition-colors group-hover:text-blue-50/50">
          <span className="text-9xl font-serif italic leading-none">0{index + 1}</span>
        </div>
        
        <div className="relative z-10">
          <div className="w-20 h-20 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-900 mb-12 group-hover:bg-blue-900 group-hover:text-white transition-all duration-700 ease-expo">
            {React.cloneElement(service.icon, { className: "w-10 h-10" })}
          </div>
          <h3 className="text-4xl font-serif text-slate-900 mb-6 tracking-tight group-hover:text-blue-900 transition-colors">{service.title}</h3>
          <p className="text-slate-500 leading-relaxed text-lg font-light pr-10">{service.description}</p>
        </div>
  
        <div className="relative z-10 pt-10">
          <Magnetic strength={0.3}>
            <button className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 hover:text-blue-600 transition-all group/btn">
              Explore Procedure 
              <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center group-hover/btn:border-blue-600 group-hover/btn:bg-blue-600 group-hover/btn:text-white transition-all duration-500">
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </Magnetic>
        </div>
        
        {/* Hover Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-blue-50/0 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      </motion.div>
    );
    }


