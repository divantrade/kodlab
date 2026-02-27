"use client";

import { motion } from "framer-motion";
import { fadeInUp, headerStagger, viewportOnce } from "@/lib/motion";

interface SectionHeaderProps {
  badge: string;
  title: string;
  subtitle: string;
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
}: SectionHeaderProps) {
  return (
    <motion.div
      className="text-center mb-16 sm:mb-20"
      variants={headerStagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <motion.div
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 mb-6"
        variants={fadeInUp}
      >
        <span className="text-sm text-cyan-400 font-mono tracking-wider">
          {badge}
        </span>
      </motion.div>

      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-5 tracking-tight"
        variants={fadeInUp}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.div className="max-w-2xl mx-auto" variants={fadeInUp}>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            {subtitle}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
