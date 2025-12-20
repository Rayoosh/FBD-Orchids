"use client";

import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Calendar, Clock, User, Phone, Mail, MessageSquare, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export function AboutBooking() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingFormValues) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Booking data:", data);
      toast.success("Booking request sent! We'll contact you shortly.");
      reset();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const services = [
    "Cosmetic Dentistry",
    "Dental Implants",
    "General Dentistry",
    "Orthodontics",
    "Periodontics",
    "Other",
  ];

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-8">
        <div className="space-y-4">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-brand-blue-600 font-sans text-xs font-bold uppercase tracking-[0.3em]"
          >
            Reservations
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-brand-blue-900 leading-[1.1] tracking-tight"
          >
            Begin Your <br />
            <span className="text-brand-blue-400 italic">Transformation.</span>
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-slate-500 font-sans text-lg leading-relaxed max-w-md"
        >
          Schedule your private consultation with our clinical masters. Experience dentistry redefined through precision and artistry.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-white shadow-sm border border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-brand-blue-50 flex items-center justify-center text-brand-blue-600 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-bold text-brand-blue-900 text-sm">Response Time</h4>
              <p className="text-slate-500 font-sans text-xs mt-1">Within 2 business hours</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-white shadow-sm border border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-brand-blue-50 flex items-center justify-center text-brand-blue-600 shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-bold text-brand-blue-900 text-sm">Availability</h4>
              <p className="text-slate-500 font-sans text-xs mt-1">Mon - Fri, 8am - 6pm</p>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-brand-blue-900/5 border border-slate-100"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                <input
                  {...register("name")}
                  className={cn(
                    "w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-4 text-sm font-sans focus:outline-none focus:border-brand-blue-600 focus:bg-white transition-all",
                    errors.name && "border-red-200 bg-red-50/30"
                  )}
                  placeholder="John Doe"
                />
              </div>
              {errors.name && <p className="text-[10px] text-red-500 ml-1">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                <input
                  {...register("email")}
                  className={cn(
                    "w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-4 text-sm font-sans focus:outline-none focus:border-brand-blue-600 focus:bg-white transition-all",
                    errors.email && "border-red-200 bg-red-50/30"
                  )}
                  placeholder="john@example.com"
                />
              </div>
              {errors.email && <p className="text-[10px] text-red-500 ml-1">{errors.email.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Phone</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                <input
                  {...register("phone")}
                  className={cn(
                    "w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-4 text-sm font-sans focus:outline-none focus:border-brand-blue-600 focus:bg-white transition-all",
                    errors.phone && "border-red-200 bg-red-50/30"
                  )}
                  placeholder="(425) 555-0123"
                />
              </div>
              {errors.phone && <p className="text-[10px] text-red-500 ml-1">{errors.phone.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Service</label>
              <select
                {...register("service")}
                className={cn(
                  "w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-sans focus:outline-none focus:border-brand-blue-600 focus:bg-white appearance-none transition-all",
                  errors.service && "border-red-200 bg-red-50/30"
                )}
              >
                <option value="">Select a service</option>
                {services.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              {errors.service && <p className="text-[10px] text-red-500 ml-1">{errors.service.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Message (Optional)</label>
            <div className="relative">
              <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-slate-300" />
              <textarea
                {...register("message")}
                rows={4}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-4 text-sm font-sans focus:outline-none focus:border-brand-blue-600 focus:bg-white transition-all resize-none"
                placeholder="Tell us about your goals..."
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-blue-900 text-white py-5 rounded-2xl font-sans font-bold text-sm uppercase tracking-[0.2em] hover:bg-brand-blue-800 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:scale-100 group shadow-xl shadow-brand-blue-900/10"
          >
            {isSubmitting ? "Processing..." : "Submit Reservation"}
            {!isSubmitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
