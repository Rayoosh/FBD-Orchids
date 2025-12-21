"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
}

export const Reveal = ({ 
  children, 
  width = "fit-content", 
    delay = 0.2, 
    duration = 1.2,
    y = 40,
    once = true
}: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hasInView, setHasInView] = useState(false);
  const isInView = useInView(ref, { 
    once,
    amount: 0,
  });

  useEffect(() => {
    if (isInView) {
      setHasInView(true);
    }
  }, [isInView]);

  // Fallback for initial load in sticky/complex layouts
  useEffect(() => {
    const checkVisibility = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
      if (inViewport) {
        setHasInView(true);
      }
    };
    
    // Check immediately and after a short delay to account for layout shifts
    checkVisibility();
    const timer = setTimeout(checkVisibility, 500);
    return () => clearTimeout(timer);
  }, []);

  const shouldAnimate = once ? hasInView : isInView;

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        initial={{ opacity: 0, y }}
        animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y }}
        transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export const TextReveal = ({ text, className, delay = 0 }: { text: string, className?: string, delay?: number }) => {
  const words = text.split(" ");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  return (
    <div ref={ref} className={cn("relative flex flex-wrap", className)}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.2em] py-2">
          <motion.span
            initial={{ y: 100, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
            transition={{
              duration: 1.5,
              delay: delay + (i * 0.15),
              ease: [0.22, 1, 0.36, 1]
            }}
            className="inline-block"
            style={{ display: "inline-block" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
};

export const ImageReveal = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hasInView, setHasInView] = useState(false);
  const isInView = useInView(ref, { 
    once: true,
    amount: 0.1,
  });

  useEffect(() => {
    if (isInView) {
      setHasInView(true);
    }
  }, [isInView]);

  useEffect(() => {
    const checkVisibility = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
      if (inViewport) {
        setHasInView(true);
      }
    };
    checkVisibility();
    const timer = setTimeout(checkVisibility, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={ref} className={`overflow-hidden rounded-3xl ${className}`}>
      <motion.img
        initial={{ scale: 1.1, opacity: 0 }}
        animate={hasInView ? { scale: 1, opacity: 1 } : { scale: 1.1, opacity: 0 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
};
