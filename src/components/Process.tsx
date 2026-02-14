"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const stepIcons = [
  <svg key="discover" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>,
  <svg key="design" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
  </svg>,
  <svg key="develop" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>,
  <svg key="deploy" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>,
];

const stepKeys = ["discover", "design", "develop", "deploy"] as const;

export default function Process() {
  const t = useTranslations("process");
  const reduceMotion = useReducedMotion();

  return (
    <section id="process" className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 bg-navy-900/30" />
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeader
          badge={t("badge")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-[52px] left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

          {stepKeys.map((key, index) => (
            <motion.div
              key={key}
              initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.15 }}
              className="relative text-center p-6 sm:p-8"
            >
              <div className="relative mx-auto mb-8 w-fit">
                <div className="w-20 h-20 rounded-2xl bg-navy-800/80 border border-navy-700/80 flex items-center justify-center text-cyan-400 mx-auto shadow-lg shadow-navy-950/50">
                  {stepIcons[index]}
                </div>
                <span className="absolute -top-3 -end-3 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white text-xs font-bold flex items-center justify-center shadow-lg shadow-cyan-500/20">
                  {index + 1}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3">
                {t(`steps.${key}.title`)}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-[240px] mx-auto">
                {t(`steps.${key}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
