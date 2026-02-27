"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import CountUp from "react-countup";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";

const stats = [
  { key: "projects", end: 20, suffix: "+", icon: ProjectsIcon },
  { key: "clients", end: 15, suffix: "+", icon: ClientsIcon },
  { key: "experience", end: 3, suffix: "", icon: ExperienceIcon },
  { key: "satisfaction", end: 100, suffix: "%", icon: SatisfactionIcon },
] as const;

function ProjectsIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 17L12 22L22 17" />
      <path d="M2 12L12 17L22 12" />
      <path d="M12 2L2 7L12 12L22 7L12 2Z" />
    </svg>
  );
}

function ClientsIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21V19C17 16.79 15.21 15 13 15H5C2.79 15 1 16.79 1 19V21" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21V19C22.99 17.17 21.73 15.59 20 15.13" />
      <path d="M16 3.13C17.74 3.58 19 5.17 19 7C19 8.83 17.74 10.42 16 10.87" />
    </svg>
  );
}

function ExperienceIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function SatisfactionIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12C21.99 17.52 17.82 22.12 12.34 22.93C6.85 23.74 1.72 20.56 0.31 15.22C-1.1 9.88 1.7 4.27 6.77 2.06C11.84 -0.15 17.77 1.49 20.83 6.08" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

export default function StatsCounter() {
  const t = useTranslations("stats");

  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {stats.map(({ key, end, suffix, icon: Icon }) => (
            <motion.div key={key} variants={fadeInUp}>
              <div className="stat-card relative text-center p-6 sm:p-8 rounded-2xl bg-navy-800/50 border border-navy-700/60 overflow-hidden group hover:border-cyan-500/30 transition-colors duration-300">
                {/* Subtle glow on hover */}
                <div className="absolute inset-0 bg-cyan-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                <div className="relative">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-cyan-500/10 text-cyan-400 mb-5">
                    <Icon />
                  </div>

                  {/* Animated number */}
                  <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold gradient-text mb-2">
                    <CountUp
                      end={end}
                      suffix={suffix}
                      duration={2.5}
                      enableScrollSpy
                      scrollSpyOnce
                    />
                  </div>

                  {/* Label */}
                  <div className="text-sm text-gray-400">{t(key)}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
