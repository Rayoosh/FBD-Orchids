"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Heart, Zap, MessageSquare, ShieldCheck, Clock } from "lucide-react";

const experiencePillars = [
  {
    title: "Fast Access to Care",
    description: "Urgent pain shouldn't wait. We offer same-day appointments to resolve dental emergencies quickly and efficiently.",
    icon: Zap,
  },
  {
    title: "Calm for Anxious Patients",
    description: "Our clinic is designed to be a sanctuary. We specialize in gentle techniques that put even the most nervous patients at ease.",
    icon: Heart,
  },
  {
    title: "Transparent & Fair",
    description: "No hidden costs or high-pressure sales. We provide clear communication and honest advice on all your treatment options.",
    icon: ShieldCheck,
  },
  {
    title: "Long-Term Reliability",
    description: "Join a community of patients who have trusted us for over 15 years. We build relationships that last a lifetime.",
    icon: MessageSquare,
  },
];

const trustSignals = [
  { label: "Same-day care", icon: Clock },
  { label: "Over 10 years experience", icon: ShieldCheck },
  { label: "Fair, clear pricing", icon: CheckCircle2 },
  { label: "Gentle treatment", icon: Heart },
];

export function TrustExperience() {
  return (
    <section id="experience" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Trust Bar */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-24 py-8 border-y border-border">
          {trustSignals.map((signal, index) => (
            <div key={index} className="flex items-center space-x-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
              <signal.icon className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium uppercase tracking-widest">{signal.label}</span>
            </div>
          ))}
        </div>

        {/* Experience Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-4">The Patient Experience</h2>
            <h3 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
              A new standard of care,<br />
              <span className="italic text-primary/80">centered around you.</span>
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
              We understand that visiting the dentist can be stressful. That's why we've reimagined every step of the journey to ensure you feel safe, heard, and cared for.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 rounded-xl bg-brand-blue-50/50 border border-brand-blue-100">
                <div className="mt-1 p-2 rounded-lg bg-white text-primary shadow-sm">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Personalized Comfort</h4>
                  <p className="text-sm text-muted-foreground">From calming music to gentle numbing techniques, your comfort is our priority.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {experiencePillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-white border border-border hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <pillar.icon className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-serif font-bold mb-3">{pillar.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
