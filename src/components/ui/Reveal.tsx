"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
}

const revealVariants = {
  hidden: (y: number) => ({ opacity: 0, y }),
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
  }
};

export const Reveal = ({ 
  children, 
  width = "fit-content", 
  delay = 0.2, 
  y = 40,
  once = true
}: RevealProps) => {
  const isMobile = useIsMobile();
  const mobileY = isMobile ? Math.min(y, 10) : y;

  return (
    <div style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        custom={mobileY}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: 0.1 }}
        variants={revealVariants}
        transition={{ delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const textContainerVariants = {
  hidden: { opacity: 1 },
  visible: (delay: number) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: delay,
    },
  }),
};

const wordVariants = {
  hidden: (isMobile: boolean) => ({ 
    y: isMobile ? "30%" : "110%",
    opacity: 0 
  }),
  visible: { 
    y: 0,
    opacity: 1,
    transition: {
      y: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.8, ease: "linear" }
    },
  },
};

export const TextReveal = ({ text, className, delay = 0 }: { text: string, className?: string, delay?: number }) => {
  const isMobile = useIsMobile();
  const words = text.split(" ");
  
  const isGradient = className?.includes("premium-gradient-text");
  const cleanClassName = className?.replace("premium-gradient-text", "");

  return (
    <motion.div 
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={textContainerVariants}
      className={cn("relative flex flex-wrap items-baseline", cleanClassName)}
    >
      {words.map((word, i) => (
        <span 
          key={i} 
          className="inline-block overflow-hidden mr-[0.25em] py-[0.4em] -my-[0.4em]"
        >
          <motion.span
            custom={isMobile}
            variants={wordVariants}
            className={cn(
              "inline-block",
              isGradient && "premium-gradient-text"
            )}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
};

const imageVariants = {
  hidden: { scale: 1.1, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] }
  }
};

export const ImageReveal = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
  return (
    <div className={cn("overflow-hidden rounded-3xl", className)}>
      <motion.img
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={imageVariants}
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
};
