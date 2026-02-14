"use client";

import { useTranslations } from "next-intl";
import FadeIn from "./FadeIn";
import SectionHeader from "./SectionHeader";

const technologies = [
  { name: "Next.js", abbr: "Nx", gradient: "from-white/20 to-gray-400/20", text: "text-white" },
  { name: "React", abbr: "Re", gradient: "from-cyan-400/20 to-cyan-600/20", text: "text-cyan-400" },
  { name: "TypeScript", abbr: "TS", gradient: "from-blue-400/20 to-blue-600/20", text: "text-blue-400" },
  { name: "Tailwind CSS", abbr: "Tw", gradient: "from-cyan-300/20 to-sky-500/20", text: "text-cyan-300" },
  { name: "Node.js", abbr: "No", gradient: "from-green-400/20 to-green-600/20", text: "text-green-400" },
  { name: "Python", abbr: "Py", gradient: "from-yellow-400/20 to-yellow-600/20", text: "text-yellow-400" },
  { name: "n8n", abbr: "n8", gradient: "from-orange-400/20 to-orange-600/20", text: "text-orange-400" },
  { name: "Apps Script", abbr: "GS", gradient: "from-blue-300/20 to-blue-500/20", text: "text-blue-300" },
  { name: "Vercel", abbr: "Vc", gradient: "from-white/20 to-gray-300/20", text: "text-white" },
  { name: "GitHub", abbr: "GH", gradient: "from-gray-300/20 to-gray-500/20", text: "text-gray-300" },
  { name: "OpenAI", abbr: "AI", gradient: "from-emerald-400/20 to-emerald-600/20", text: "text-emerald-400" },
  { name: "Framer", abbr: "Fm", gradient: "from-purple-400/20 to-purple-600/20", text: "text-purple-400" },
];

export default function TechStack() {
  const t = useTranslations("tech");

  return (
    <section id="tech" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeader
          badge={t("badge")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
          {technologies.map((tech, index) => (
            <FadeIn key={tech.name} delay={index * 50} scale>
              <div className="group flex flex-col items-center gap-4 p-6 rounded-2xl bg-navy-800/60 border border-navy-700/80 hover:border-cyan-500/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tech.gradient} flex items-center justify-center border border-white/5 group-hover:border-white/10 transition-all`}
                >
                  <span className={`text-lg font-bold font-mono ${tech.text}`}>
                    {tech.abbr}
                  </span>
                </div>
                <span className="text-xs text-gray-400 group-hover:text-gray-200 text-center font-medium transition-colors leading-tight">
                  {tech.name}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
