"use client";

import { useState, useEffect, useCallback, createContext, useContext } from "react";

interface ScrollState {
  scrollY: number;
  scrollDirection: "up" | "down" | null;
  isScrolled: boolean;
  activeSection: string;
}

const ScrollContext = createContext<ScrollState>({
  scrollY: 0,
  scrollDirection: null,
  isScrolled: false,
  activeSection: "home",
});

export const useScrollState = () => useContext(ScrollContext);

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ScrollState>({
    scrollY: 0,
    scrollDirection: null,
    isScrolled: false,
    activeSection: "home",
  });

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    setState(prev => ({
      scrollY: currentScrollY,
      scrollDirection: currentScrollY > prev.scrollY ? "down" : "up",
      isScrolled: currentScrollY > 50,
      activeSection: prev.activeSection, // Will be updated by IntersectionObserver
    }));
  }, []);

  useEffect(() => {
    // Single global scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Intersection Observer for sections
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -20% 0px", // Trigger when section is in middle 60% of viewport
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setState(prev => ({ ...prev, activeSection: entry.target.id }));
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll("section[id], div[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [handleScroll]);

  return (
    <ScrollContext.Provider value={state}>
      {children}
    </ScrollContext.Provider>
  );
}
