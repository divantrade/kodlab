import FadeIn from "./FadeIn";

interface SectionHeaderProps {
  badge: string;
  title: string;
  subtitle: string;
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
}: SectionHeaderProps) {
  return (
    <div className="text-center mb-16 sm:mb-20">
      <FadeIn className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 mb-6">
        <span className="text-sm text-cyan-400 font-mono tracking-wider">
          {badge}
        </span>
      </FadeIn>

      <FadeIn delay={100}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-5 tracking-tight">
          {title}
        </h2>
      </FadeIn>

      {subtitle && (
        <FadeIn delay={200} className="max-w-2xl mx-auto">
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            {subtitle}
          </p>
        </FadeIn>
      )}
    </div>
  );
}
