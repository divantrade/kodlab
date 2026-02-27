"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { useLocale } from "next-intl";
import { fadeInUp, fadeInStart, fadeInEnd, scaleIn, viewportOnce } from "@/lib/motion";

export default function FadeIn({
  children,
  className = "",
  delay = 0,
  scale = false,
  direction,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  scale?: boolean;
  /** "start" slides from inline-start, "end" slides from inline-end (RTL-aware) */
  direction?: "start" | "end";
}) {
  const locale = useLocale();
  const isRtl = locale === "ar";

  let variants = scale ? scaleIn : fadeInUp;
  if (direction === "start") variants = fadeInStart(isRtl);
  if (direction === "end") variants = fadeInEnd(isRtl);

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ duration: scale ? 0.4 : 0.5, ease: "easeOut", delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}
