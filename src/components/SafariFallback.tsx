"use client";

import { useEffect } from "react";

/**
 * Safety net for mobile Safari where IntersectionObserver may not trigger
 * Framer Motion's whileInView animations, leaving sections at opacity: 0.
 * After 2.5s, forces all sections to be visible via a CSS class.
 */
export default function SafariFallback() {
  useEffect(() => {
    const timer = setTimeout(() => {
      document.documentElement.classList.add("loaded");
    }, 2500);
    return () => clearTimeout(timer);
  }, []);
  return null;
}
