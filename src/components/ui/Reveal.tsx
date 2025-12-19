"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

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
  duration = 0.8,
  y = 20,
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
  const [hasInView, setHasInView] = useState(false);
  const isInView = useInView(ref, { 
    once: true,
    amount: 0,
  });

  useEffect(() => {
    if (isInView) {
      setHasInView(true);
    }
  }, [isInView]);

  // Fallback for initial load
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
    <div ref={ref} className={className}>
      {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.2em] pb-[0.1em]">
            <motion.span
              initial={{ y: "100%" }}
              animate={hasInView ? { y: 0 } : { y: "100%" }}
              transition={{
                duration: 1,
                delay: delay + i * 0.05,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
      ))}
    </div>
  );
};

export const ImageReveal = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
  return (
    <div className={`overflow-hidden rounded-3xl ${className}`}>
      <motion.img
        initial={{ scale: 1.1, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
};
