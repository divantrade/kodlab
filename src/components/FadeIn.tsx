"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { fadeInUp, scaleIn, viewportOnce } from "@/lib/motion";

export default function FadeIn({
  children,
  className = "",
  delay = 0,
  scale = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  scale?: boolean;
}) {
  return (
    <motion.div
      className={className}
      variants={scale ? scaleIn : fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ duration: scale ? 0.4 : 0.5, ease: "easeOut", delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}
