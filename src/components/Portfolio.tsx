"use client";

import { useTranslations } from "next-intl";
import FadeIn from "./FadeIn";
import SectionHeader from "./SectionHeader";

const projectKeys = ["luxefilms", "dvn", "divan", "seen", "dewan"] as const;

const projectTech: Record<string, string[]> = {
  luxefilms: ["Next.js", "Tailwind", "Vercel"],
  dvn: ["Next.js", "Tailwind", "Vercel"],
  divan: ["Next.js", "Tailwind", "Vercel"],
  seen: ["Next.js", "Tailwind", "Vercel"],
  dewan: ["Next.js", "Tailwind", "Vercel"],
};

const projectGradients = [
  "from-cyan-600/30 via-blue-600/20 to-purple-600/30",
  "from-purple-600/30 via-pink-500/20 to-rose-600/30",
  "from-emerald-600/30 via-teal-500/20 to-cyan-600/30",
  "from-amber-600/30 via-orange-500/20 to-red-600/30",
  "from-blue-600/30 via-indigo-500/20 to-violet-600/30",
];

function ProjectCard({
  projectKey,
  index,
  gradient,
  tech,
  t,
}: {
  projectKey: string;
  index: number;
  gradient: string;
  tech: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any;
}) {
  const url = t(`projects.${projectKey}.url`);

  const card = (
    <FadeIn delay={index * 100}>
      <div
        className={`group relative rounded-2xl bg-navy-800/60 border border-navy-700/80 hover:border-cyan-500/40 overflow-hidden transition-[border-color,transform] duration-300 hover:-translate-y-1.5${url ? " cursor-pointer" : ""}`}
      >
        <div
          className={`relative h-52 sm:h-56 bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)]" />
          <div className="text-3xl sm:text-4xl font-extrabold text-white/15 font-mono tracking-wider select-none">
            {t(`projects.${projectKey}.name`)}
          </div>
          <div className="absolute inset-0 bg-navy-950/0 group-hover:bg-navy-950/50 transition-[background-color] duration-300 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 text-white text-sm font-semibold px-6 py-2.5 rounded-xl bg-cyan-500/90 transition-[opacity,transform] duration-300 shadow-lg shadow-cyan-500/20">
              {t("viewProject")}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-3 gap-3">
            <h3 className="text-lg font-bold text-white">
              {t(`projects.${projectKey}.name`)}
            </h3>
            <span className="text-xs text-cyan-400 font-mono whitespace-nowrap px-2.5 py-1 rounded-md bg-cyan-500/10">
              {t(`projects.${projectKey}.category`)}
            </span>
          </div>
          <p className="text-gray-400 text-sm mb-5 leading-relaxed">
            {t(`projects.${projectKey}.description`)}
          </p>
          <div className="flex flex-wrap gap-2">
            {tech.map((item) => (
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
    </FadeIn>
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

  return (
    <section id="portfolio" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeader
          badge={t("badge")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {projectKeys.slice(0, 3).map((key, index) => (
            <ProjectCard
              key={key}
              projectKey={key}
              index={index}
              gradient={projectGradients[index]}
              tech={projectTech[key]}
              t={t}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectKeys.slice(3).map((key, index) => (
            <ProjectCard
              key={key}
              projectKey={key}
              index={index + 3}
              gradient={projectGradients[index + 3]}
              tech={projectTech[key]}
              t={t}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
