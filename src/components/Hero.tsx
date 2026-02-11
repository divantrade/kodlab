"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function ParticleField() {
  const [particles, setParticles] = useState<
    { x: number; y: number; size: number; duration: number; delay: number }[]
  >([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 50 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-cyan-400/20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const t = useTranslations("hero");

  const scrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 start-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 end-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px]" />
      </div>

      <ParticleField />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-sm text-cyan-400 font-mono">
            {t("tagline")}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6"
        >
          {t("title")}
          <br />
          <span className="gradient-text">{t("titleHighlight")}</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-400 mb-10"
        >
          {t("description")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#portfolio"
            onClick={(e) => scrollTo(e, "#portfolio")}
            className="px-8 py-3.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 glow-cyan"
          >
            {t("cta1")}
          </a>
          <a
            href="#contact"
            onClick={(e) => scrollTo(e, "#contact")}
            className="px-8 py-3.5 rounded-lg border border-navy-600 text-gray-300 hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-300"
          >
            {t("cta2")}
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-navy-600 flex items-start justify-center p-1.5"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
