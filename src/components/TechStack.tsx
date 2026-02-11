"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const technologies = [
  { name: "Next.js", color: "text-white" },
  { name: "React", color: "text-cyan-400" },
  { name: "TypeScript", color: "text-blue-400" },
  { name: "Tailwind CSS", color: "text-cyan-300" },
  { name: "Node.js", color: "text-green-400" },
  { name: "Python", color: "text-yellow-400" },
  { name: "n8n", color: "text-orange-400" },
  { name: "Google Apps Script", color: "text-blue-300" },
  { name: "Vercel", color: "text-white" },
  { name: "GitHub", color: "text-gray-300" },
  { name: "OpenAI", color: "text-emerald-400" },
  { name: "Framer Motion", color: "text-purple-400" },
];

export default function TechStack() {
  const t = useTranslations("tech");

  return (
    <section id="tech" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={t("badge")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -3 }}
              className="group flex flex-col items-center gap-3 p-5 rounded-xl bg-navy-800/50 border border-navy-700 hover:border-cyan-500/30 transition-all duration-300"
            >
              <div
                className={`text-3xl font-bold font-mono ${tech.color} opacity-60 group-hover:opacity-100 transition-opacity`}
              >
                {tech.name.charAt(0)}
              </div>
              <span className="text-xs text-gray-400 group-hover:text-gray-200 text-center font-medium transition-colors">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
