"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { KodLabLogo } from "./KodLabLogo";
import TypeWriter from "./TypeWriter";
import { fadeInUp, heroStagger } from "@/lib/motion";

export default function Hero() {
  const t = useTranslations("hero");

  const scrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Soft ambient background - hidden on mobile for Safari GPU perf */}
      <div className="absolute inset-0 pointer-events-none hidden sm:block">
        <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[800px] h-[600px] bg-cyan-500/[0.04] rounded-full blur-[100px]" />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/[0.06] rounded-full blur-[80px]" />
      </div>

      <motion.div
        className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center py-32"
        variants={heroStagger}
        initial="hidden"
        animate="visible"
      >
        {/* Logo - clean entrance */}
        <motion.div className="mb-10" variants={fadeInUp}>
          <KodLabLogo size={80} className="justify-center" />
        </motion.div>

        {/* Headline with typewriter effect */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.2] mb-7 tracking-tight min-h-[2.4em]"
          variants={fadeInUp}
        >
          <TypeWriter
            phrases={[
              t("typingPhrase1"),
              t("typingPhrase2"),
              t("typingPhrase3"),
            ]}
            className="text-[#00D4FF]"
            typingSpeed={70}
            deletingSpeed={35}
            pauseDuration={2500}
          />
        </motion.h1>

        {/* Description */}
        <motion.p
          className="max-w-xl mx-auto text-base sm:text-lg text-gray-400 mb-14 leading-relaxed"
          variants={fadeInUp}
        >
          {t("description")}
        </motion.p>

        {/* CTAs - pill-shaped buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={fadeInUp}
        >
          <a
            href="#portfolio"
            onClick={(e) => scrollTo(e, "#portfolio")}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm hover:from-cyan-400 hover:to-blue-500 transition-colors duration-300"
          >
            {t("cta1")}
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
          </a>
          <a
            href="#contact"
            onClick={(e) => scrollTo(e, "#contact")}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-white/10 bg-navy-950/50 text-gray-300 hover:border-cyan-500/40 hover:text-white transition-colors duration-300 font-medium text-sm"
          >
            {t("cta2")}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
