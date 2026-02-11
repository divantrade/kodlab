"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const projectKeys = ["luxefilms", "dvn", "divan", "seen", "dewan"] as const;

const projectTech: Record<string, string[]> = {
  luxefilms: ["Next.js", "Tailwind", "Vercel"],
  dvn: ["Next.js", "Tailwind", "Vercel"],
  divan: ["Next.js", "Tailwind", "Vercel"],
  seen: ["Next.js", "Tailwind", "Vercel"],
  dewan: ["Next.js", "Tailwind", "Vercel"],
};

const projectColors = [
  "from-cyan-500/20 to-blue-600/20",
  "from-purple-500/20 to-pink-600/20",
  "from-emerald-500/20 to-teal-600/20",
  "from-orange-500/20 to-red-600/20",
  "from-blue-500/20 to-indigo-600/20",
];

export default function Portfolio() {
  const t = useTranslations("portfolio");

  return (
    <section id="portfolio" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={t("badge")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectKeys.map((key, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`group relative rounded-xl bg-navy-800/50 border border-navy-700 hover:border-cyan-500/30 overflow-hidden transition-all duration-300 ${
                index >= 3 ? "md:col-span-1 lg:col-span-1" : ""
              }`}
            >
              {/* Project Image Placeholder */}
              <div
                className={`relative h-48 bg-gradient-to-br ${projectColors[index]} flex items-center justify-center`}
              >
                <div className="text-4xl font-bold text-white/20 font-mono">
                  {t(`projects.${key}.name`)}
                </div>
                <div className="absolute inset-0 bg-navy-950/0 group-hover:bg-navy-950/40 transition-all duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 text-white text-sm font-medium px-4 py-2 rounded-lg bg-cyan-500/80 transition-all duration-300">
                    {t("viewProject")}
                  </span>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white">
                    {t(`projects.${key}.name`)}
                  </h3>
                  <span className="text-xs text-cyan-400 font-mono">
                    {t(`projects.${key}.category`)}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  {t(`projects.${key}.description`)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {projectTech[key].map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-navy-700/50 text-xs text-gray-300 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
