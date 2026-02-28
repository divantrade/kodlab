import type { Variants } from "framer-motion";

// ── Fade in from bottom ──
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// ── Scale in (for tech stack items, etc.) ──
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// ── Slide in from the inline-start edge (left in LTR, right in RTL) ──
export function fadeInStart(isRtl: boolean): Variants {
  const x = isRtl ? 30 : -30;
  return {
    hidden: { opacity: 0, x },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
}

// ── Slide in from the inline-end edge (right in LTR, left in RTL) ──
export function fadeInEnd(isRtl: boolean): Variants {
  const x = isRtl ? -30 : 30;
  return {
    hidden: { opacity: 0, x },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
}

// ── Stagger container for card grids ──
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// ── Hero entrance (slower, more dramatic stagger) ──
export const heroStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// ── Section header stagger ──
export const headerStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// ── Default viewport settings for whileInView ──
export const viewportOnce = { once: true, amount: 0.1 } as const;
