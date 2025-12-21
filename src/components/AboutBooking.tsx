"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Phone, MapPin, Clock, Calendar, ArrowUpRight, User, Mail, MessageSquare } from "lucide-react";
import { Magnetic } from "./ui/Magnetic";
import { TextReveal, Reveal, ImageReveal } from "./ui/Reveal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  fullName: z.string().min(2, "Name is too short"),
  phone: z.string().min(6, "Invalid phone number"),
  interest: z.string(),
  message: z.string().min(10, "Please provide more detail"),
});

type FormValues = z.infer<typeof formSchema>;

export function AboutBooking() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interest: "General Check-up"
    }
  });

  const onSubmit = async (data: FormValues) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Form submitted:", data);
    toast.success("Inquiry Sent Successfully", {
      description: "Our concierge will contact you within 24 hours.",
    });
    reset();
  };

  return (
    <section id="about" className="py-12 md:py-48 bg-transparent overflow-hidden relative min-h-full flex items-center">
      {/* Subtle Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-50/50 blur-[120px] rounded-full -translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* About / Philosophy Section - Asymmetrical Editorial */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 md:gap-32 items-center mb-24 md:mb-72">
          <div className="relative order-2 lg:order-1">
            <ImageReveal 
              src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=1200"
              alt="Bespoke Dental Studio"
              className="aspect-[4/5] editorial-shadow"
            />
            
            <Reveal delay={0.5} y={30}>
              <div className="absolute -bottom-16 -right-16 bg-white p-12 luxury-shadow rounded-2xl hidden md:block border border-black/5">
                <p className="text-[9px] mb-4 tracking-[0.4em] font-bold uppercase text-slate-400">Foundation</p>
                <p className="text-4xl font-serif italic text-slate-900">Est. 2012</p>
              </div>
            </Reveal>
          </div>

          <div className="order-1 lg:order-2">
            <Reveal>
              <div className="inline-flex items-center gap-3 mb-6 md:mb-8">
                <div className="w-8 h-[1px] bg-blue-500" />
                <span className="text-[10px] text-blue-500 font-bold uppercase tracking-[0.3em]">The Philosophy</span>
              </div>
            </Reveal>
            
                <TextReveal 
                  text="Accessible Care." 
                  className="text-4xl md:text-8xl font-serif text-slate-900 leading-[0.95] md:leading-[0.85] mb-6 md:mb-12 tracking-tighter premium-gradient-text"
                />
              
              <Reveal delay={0.4}>
                <p className="text-lg md:text-xl text-slate-500 leading-relaxed mb-12 md:mb-16 font-light max-w-lg">
                  At Freemans Bay Dental, we believe dentistry should be accessible without compromising on quality. We focus on ethical care and long-term patient results.
                </p>
              </Reveal>
              
              <div className="grid grid-cols-2 gap-8 md:gap-12">
                {[
                  { label: "Community Choice", sub: "Central Auckland's trusted practitioners" },
                  { label: "Clinical Mastery", sub: "Comprehensive care for all ages" }
                ].map((item, i) => (
                <Reveal key={i} delay={0.5 + i * 0.1}>
                  <div className="group">
                    <p className="text-[9px] tracking-[0.3em] font-bold uppercase text-slate-400 mb-2 group-hover:text-brand-blue-500 transition-colors">{item.label}</p>
                    <p className="text-xs md:text-sm text-slate-900 font-medium">{item.sub}</p>
                    <div className="w-full h-px bg-slate-100 mt-4 group-hover:bg-brand-blue-200 transition-all duration-700" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

          {/* Concierge Inquiry Experience */}
            <Reveal width="100%" y={40}>
                <div id="booking" className="grid lg:grid-cols-[0.8fr_1.2fr] bg-brand-blue-900 rounded-none md:rounded-3xl overflow-hidden md:editorial-shadow md:border md:border-white/5 scroll-mt-24 -mx-6 md:mx-0">
                <div className="p-8 md:p-16 lg:p-24 bg-brand-blue-900 text-white flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/5">

              <div>
                <div className="inline-flex items-center gap-3 mb-8 md:mb-12">
                   <div className="w-1 h-1 rounded-full bg-brand-blue-400" />
                   <h2 className="text-[10px] text-brand-blue-400 tracking-[0.4em] font-bold uppercase">Concierge Inquiry</h2>
                </div>
                  <h3 className="text-3xl md:text-6xl font-serif leading-[0.9] mb-12 md:mb-16 tracking-tighter">
                    Begin Your <br />
                    <span className="italic text-brand-blue-400 font-light">Transformation.</span>
                  </h3>

                
                <div className="space-y-10 md:space-y-12">
                    {[
                      { icon: Phone, label: "Voice", value: "(09) 361 3610" },
                      { icon: MapPin, label: "Visit", value: "40 College Hill, Freemans Bay" },
                      { icon: Clock, label: "Availability", value: "Mon — Fri: 08:30 — 17:00" }
                    ].map((item, i) => (
                    <div key={i} className="flex items-start space-x-6 md:space-x-8 group">
                      <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-brand-blue-900 transition-all duration-500 shrink-0">
                        <item.icon className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-[8px] text-white/30 mb-1 font-bold uppercase tracking-widest">{item.label}</p>
                        <p className="text-base md:text-lg font-light tracking-tight">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-16 md:mt-24 pt-8 md:pt-12 border-t border-white/5 flex items-center space-x-6 group cursor-pointer" onClick={() => document.getElementById("fullName")?.focus()}>
                <div className="p-3 md:p-4 rounded-xl bg-white/5 group-hover:bg-white group-hover:text-brand-blue-900 transition-all duration-500 shrink-0">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5 text-brand-blue-400" />
                </div>
                <p className="text-[10px] md:text-xs font-light text-white/40 tracking-wide">Bespoke scheduling available for <br /> urgent clinical matters.</p>
              </div>
            </div>

            <div className="p-8 md:p-16 lg:p-24 bg-white relative">
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-10 md:gap-12">
                <div className="grid md:grid-cols-2 gap-10 md:gap-12">
                  <div className="space-y-3 md:space-y-4 group">
                    <Label className={cn("text-[9px] font-bold uppercase tracking-[0.2em] transition-colors", errors.fullName ? "text-red-500" : "text-slate-400 group-focus-within:text-brand-blue-500")}>Full Name</Label>
                    <Input 
                      id="fullName"
                      {...register("fullName")}
                      placeholder="Alexander Vance" 
                      className="border-0 border-b border-slate-100 rounded-none px-0 h-10 md:h-12 focus-visible:ring-0 focus-visible:border-brand-blue-500 transition-all bg-transparent shadow-none placeholder:text-slate-200" 
                    />
                    {errors.fullName && <p className="text-[8px] text-red-500 font-bold uppercase tracking-widest">{errors.fullName.message}</p>}
                  </div>
                  <div className="space-y-3 md:space-y-4 group">
                    <Label className={cn("text-[9px] font-bold uppercase tracking-[0.2em] transition-colors", errors.phone ? "text-red-500" : "text-slate-400 group-focus-within:text-brand-blue-500")}>Contact Number</Label>
                    <Input 
                      {...register("phone")}
                      placeholder="+64" 
                      className="border-0 border-b border-slate-100 rounded-none px-0 h-10 md:h-12 focus-visible:ring-0 focus-visible:border-brand-blue-500 transition-all bg-transparent shadow-none placeholder:text-slate-200" 
                    />
                    {errors.phone && <p className="text-[8px] text-red-500 font-bold uppercase tracking-widest">{errors.phone.message}</p>}
                  </div>
                </div>
                
                  <div className="space-y-3 md:space-y-4 group">
                    <Label className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] group-focus-within:text-brand-blue-500 transition-colors">Area of Interest</Label>
                    <select 
                      {...register("interest")}
                      className="w-full border-0 border-b border-slate-100 rounded-none px-0 h-10 md:h-12 focus:outline-none focus:border-brand-blue-500 transition-all bg-transparent text-sm text-slate-600 appearance-none cursor-pointer"
                    >
                      <option value="General Check-up">General Check-up</option>
                      <option value="Cosmetic & Whitening">Cosmetic & Whitening</option>
                      <option value="Emergency Care (ACC)">Emergency Care (ACC)</option>
                      <option value="Free Adolescent Care (Year 9-18)">Free Adolescent Care (Year 9-18)</option>
                    </select>
                  </div>

                <div className="space-y-3 md:space-y-4 group">
                  <Label className={cn("text-[9px] font-bold uppercase tracking-[0.2em] transition-colors", errors.message ? "text-red-500" : "text-slate-400 group-focus-within:text-brand-blue-500")}>Message</Label>
                  <Textarea 
                    {...register("message")}
                    placeholder="How may we curate your experience?" 
                    className="border-0 border-b border-slate-100 rounded-none px-0 min-h-[100px] md:min-h-[120px] focus-visible:ring-0 focus-visible:border-brand-blue-500 transition-all bg-transparent resize-none shadow-none placeholder:text-slate-200" 
                  />
                  {errors.message && <p className="text-[8px] text-red-500 font-bold uppercase tracking-widest">{errors.message.message}</p>}
                </div>

                <div className="pt-6 md:pt-8">
                  <Magnetic strength={0.2}>
                    <Button 
                      disabled={isSubmitting}
                      type="submit"
                      variant="premium" 
                      className="w-full h-14 md:h-16 luxury-shadow"
                    >
                      {isSubmitting ? "Sending..." : "Request Consultation"}
                    </Button>
                  </Magnetic>
                </div>
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
