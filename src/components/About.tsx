"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import FadeIn from "./FadeIn";
import SectionHeader from "./SectionHeader";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";

export default function About() {
  const t = useTranslations("about");

  const stats = [
    { value: t("stat1Value"), label: t("stat1Label") },
    { value: t("stat2Value"), label: t("stat2Label") },
    { value: t("stat3Value"), label: t("stat3Label") },
  ];

  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeader badge={t("badge")} title={t("title")} subtitle="" />

        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="relative p-8 sm:p-12 rounded-2xl bg-navy-800/40 border border-navy-700/80 overflow-hidden">
              {/* Glow effect - hidden on mobile for Safari GPU perf */}
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px] hidden sm:block" />

              <div className="relative">
                <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-6">
                  {t("description")}
                </p>
                <p className="text-gray-400 leading-relaxed mb-12">
                  {t("description2")}
                </p>

                {/* Stats */}
                <motion.div
                  className="grid grid-cols-3 gap-4 sm:gap-8"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                >
                  {stats.map((stat, index) => (
                    <motion.div key={index} variants={fadeInUp}>
                      <div className="text-center p-4 sm:p-6 rounded-xl bg-navy-900/50 border border-navy-700/50">
                        <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold gradient-text mb-2">
                          {stat.value}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-400">
                          {stat.label}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
