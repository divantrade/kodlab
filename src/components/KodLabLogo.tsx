import React, { useId } from 'react';

interface KodLabLogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: number;
  variant?: 'color' | 'white' | 'mono';
}

export const KodLabLogo: React.FC<KodLabLogoProps> = ({
  className = "",
  showWordmark = true,
  size = 48,
  variant = 'color'
}) => {
  const uid = useId();
  const gradientId = `kodlab-grad-${uid}`;
  const iconSize = size;
  const fontSize = size * 0.75;

  const cyan = "#22d3ee";
  const blue = "#3b82f6";
  const white = "#ffffff";
  const dark = "#0a0e27";

  return (
    <div className={`flex items-center gap-3 font-sans ${className}`}>
      {/* Icon Mark */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {variant === 'color' && (
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={cyan} />
              <stop offset="100%" stopColor={blue} />
            </linearGradient>
          </defs>
        )}

        {/* Flask Body */}
        <path
          d="M38 10 H62 V35 L82 65 C88 74 85 88 75 90 H25 C15 88 12 74 18 65 L38 35 V10Z"
          fill={variant === 'color' ? `url(#${gradientId})` : (variant === 'white' ? white : cyan)}
          stroke={variant === 'mono' ? cyan : 'none'}
          strokeWidth={variant === 'mono' ? 3 : 0}
        />

        {/* Terminal Prompt >_ */}
        <g transform="translate(50, 62) scale(1.2)" fill={variant === 'color' ? dark : (variant === 'white' ? cyan : dark)}>
          <path d="M-10 -8 L0 0 L-10 8" stroke={variant === 'color' ? dark : (variant === 'white' ? blue : dark)} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <rect x="4" y="4" width="8" height="3" rx="1.5" />
        </g>

        {/* Bubbles */}
        <circle cx="50" cy="25" r="3" fill={variant === 'color' ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.2)"} />
        <circle cx="56" cy="18" r="2" fill={variant === 'color' ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)"} />
      </svg>

      {/* Wordmark */}
      {showWordmark && (
        <div className="flex flex-col justify-center leading-none select-none">
          <div className="flex items-baseline">
            <span
              className="font-bold tracking-tight"
              style={{
                fontSize: `${fontSize}px`,
                color: white
              }}
            >
              KodLab
            </span>
            <span
              className="font-medium ml-0.5"
              style={{
                fontSize: `${fontSize * 0.6}px`,
                color: cyan
              }}
            >
              .ai
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
