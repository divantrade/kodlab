"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { KodLabLogo } from "./KodLabLogo";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Hero() {
  const t = useTranslations("hero");
  const reduceMotion = useReducedMotion();

  const scrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Soft ambient background - optimized blur values for mobile performance */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Reduced blur values: 180px -> 80px, 160px -> 60px for better mobile performance */}
        <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[600px] h-[400px] sm:w-[800px] sm:h-[600px] bg-cyan-500/[0.04] rounded-full blur-[80px] sm:blur-[100px]" />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] bg-blue-600/[0.06] rounded-full blur-[60px] sm:blur-[80px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center py-32">
        {/* Logo - clean entrance */}
        <motion.div
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.7, ease: "easeOut" }}
          className="mb-10"
        >
          <KodLabLogo size={80} className="justify-center" />
        </motion.div>

        {/* Headline - direct after logo */}
        <motion.h1
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.7, delay: 0.15 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-7 tracking-tight"
        >
          {t("title")}
          <br />
          <span className="gradient-text">{t("titleHighlight")}</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.7, delay: 0.3 }}
          className="max-w-xl mx-auto text-base sm:text-lg text-gray-400 mb-14 leading-relaxed"
        >
          {t("description")}
        </motion.p>

        {/* CTAs - pill-shaped buttons */}
        <motion.div
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.7, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#portfolio"
            onClick={(e) => scrollTo(e, "#portfolio")}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
          >
            {t("cta1")}
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
          </a>
          <a
            href="#contact"
            onClick={(e) => scrollTo(e, "#contact")}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-white/10 bg-navy-900/80 text-gray-300 hover:border-cyan-500/40 hover:text-white transition-all duration-300 font-medium text-sm"
          >
            {t("cta2")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
