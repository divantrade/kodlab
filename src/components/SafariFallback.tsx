"use client";

import { useEffect } from "react";

/**
 * Safety net for mobile Safari and low-end Android devices where
 * IntersectionObserver may not trigger Framer Motion's whileInView animations,
 * leaving sections at opacity: 0.
 * 
 * This component:
 * 1. Detects Safari/iOS and problematic Android devices
 * 2. Adds a 'loaded' class to html element after a short delay
 * 3. CSS rules in globals.css use this class to force visibility
 */
export default function SafariFallback() {
  useEffect(() => {
    // Detect problematic browsers/devices
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isLowEndAndroid = /Android/.test(navigator.userAgent) && 
      /POCO|Redmi|Realme|OPPO|Vivo|Samsung.*[AJ]\d/i.test(navigator.userAgent);
    
    // Check for touch-only device (no hover capability)
    const isTouchOnly = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    
    // Determine timeout based on device
    // Faster timeout for known problematic devices
    const timeout = (isSafari || isIOS || isLowEndAndroid) ? 1500 : 2000;
    
    // Add loaded class after timeout
    const timer = setTimeout(() => {
      document.documentElement.classList.add("loaded");
    }, timeout);
    
    // Also add immediately if document is already loaded and user has scrolled
    const handleScroll = () => {
      if (window.scrollY > 100) {
        document.documentElement.classList.add("loaded");
        window.removeEventListener("scroll", handleScroll);
      }
    };
    
    // On touch devices, add loaded class on first interaction
    const handleInteraction = () => {
      document.documentElement.classList.add("loaded");
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("click", handleInteraction);
    };
    
    if (isTouchOnly) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("touchstart", handleInteraction, { passive: true });
      window.addEventListener("click", handleInteraction, { passive: true });
    }
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("click", handleInteraction);
    };
  }, []);
  
  return null;
}
