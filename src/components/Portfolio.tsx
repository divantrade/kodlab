"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import SectionHeader from "./SectionHeader";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";

type FilterKey = "all" | "media" | "business";

interface Project {
  key: string;
  filter: FilterKey;
  tech: string[];
  gradient: string;
}

const projects: Project[] = [
  {
    key: "luxefilms",
    filter: "media",
    tech: ["Next.js", "Tailwind", "Vercel"],
    gradient: "from-cyan-600/30 via-blue-600/20 to-purple-600/30",
  },
  {
    key: "dvn",
    filter: "business",
    tech: ["Next.js", "Tailwind", "Vercel"],
    gradient: "from-purple-600/30 via-pink-500/20 to-rose-600/30",
  },
  {
    key: "divan",
    filter: "business",
    tech: ["Next.js", "Tailwind", "Vercel"],
    gradient: "from-emerald-600/30 via-teal-500/20 to-cyan-600/30",
  },
  {
    key: "seen",
    filter: "media",
    tech: ["Next.js", "Tailwind", "Vercel"],
    gradient: "from-amber-600/30 via-orange-500/20 to-red-600/30",
  },
  {
    key: "dewan",
    filter: "business",
    tech: ["Next.js", "Tailwind", "Vercel"],
    gradient: "from-blue-600/30 via-indigo-500/20 to-violet-600/30",
  },
];

const filterKeys: FilterKey[] = ["all", "media", "business"];

function ProjectCard({
  project,
  t,
}: {
  project: Project;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any;
}) {
  const url = t(`projects.${project.key}.url`);

  const card = (
    <motion.div
      layout
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
    >
      <div
        className={`portfolio-card group relative rounded-2xl bg-navy-800/60 border border-navy-700/80 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/50${url ? " cursor-pointer" : ""}`}
      >
        {/* Header gradient area */}
        <div
          className={`relative h-52 sm:h-56 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)]" />
          <div className="text-3xl sm:text-4xl font-extrabold text-white/15 font-mono tracking-wider select-none">
            {t(`projects.${project.key}.name`)}
          </div>

          {/* Hover overlay with button */}
          <div className="absolute inset-0 bg-navy-950/0 group-hover:bg-navy-950/60 transition-[background-color] duration-300 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 text-white text-sm font-semibold px-6 py-2.5 rounded-xl bg-cyan-500/90 transition-[opacity,transform] duration-300 shadow-lg shadow-cyan-500/25">
              {t("viewProject")} &rarr;
            </span>
          </div>
        </div>

        {/* Card body */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3 gap-3">
            <h3 className="text-lg font-bold text-white">
              {t(`projects.${project.key}.name`)}
            </h3>
            <span className="text-xs text-cyan-400 font-mono whitespace-nowrap px-2.5 py-1 rounded-md bg-cyan-500/10">
              {t(`projects.${project.key}.category`)}
            </span>
          </div>
          <p className="text-gray-400 text-sm mb-5 leading-relaxed">
            {t(`projects.${project.key}.description`)}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 rounded-lg bg-navy-700/60 text-xs text-gray-300 font-mono border border-navy-600/50"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        {card}
      </a>
    );
  }

  return card;
}

export default function Portfolio() {
  const t = useTranslations("portfolio");
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.filter === activeFilter);

  return (
    <section id="portfolio" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeader
          badge={t("badge")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        {/* Filter bar */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {filterKeys.map((key) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`relative px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 border ${
                activeFilter === key
                  ? "bg-cyan-500/15 border-cyan-500/50 text-cyan-400"
                  : "bg-navy-800/50 border-navy-700/60 text-gray-400 hover:text-gray-200 hover:border-navy-600"
              }`}
            >
              {t(
                `filter${key.charAt(0).toUpperCase()}${key.slice(1)}` as
                  | "filterAll"
                  | "filterMedia"
                  | "filterBusiness",
              )}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.key} project={project} t={t} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
