"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

export default function About() {
  const t = useTranslations("about");

  const stats = [
    { value: t("stat1Value"), label: t("stat1Label") },
    { value: t("stat2Value"), label: t("stat2Label") },
    { value: t("stat3Value"), label: t("stat3Label") },
  ];

  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge={t("badge")} title={t("title")} subtitle="" />

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative p-8 sm:p-12 rounded-2xl bg-navy-800/30 border border-navy-700"
          >
            {/* Glow effect */}
            <div className="absolute -top-20 start-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px]" />

            <div className="relative">
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-6">
                {t("description")}
              </p>
              <p className="text-gray-400 leading-relaxed mb-10">
                {t("description2")}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
