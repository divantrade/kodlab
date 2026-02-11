import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "KodLab — Code. Create. Launch.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0e27 0%, #0f1535 50%, #0a0e27 100%)",
          position: "relative",
        }}
      >
        {/* Glow effects */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "30%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "20%",
            right: "25%",
            width: 350,
            height: 350,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)",
          }}
        />

        {/* Flask Icon */}
        <svg
          width="120"
          height="120"
          viewBox="0 0 100 100"
          style={{ marginBottom: 30 }}
        >
          <defs>
            <linearGradient id="og-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          <path
            d="M38 10 H62 V35 L82 65 C88 74 85 88 75 90 H25 C15 88 12 74 18 65 L38 35 V10Z"
            fill="url(#og-grad)"
          />
          <g transform="translate(50, 62) scale(1.2)" fill="#0a0e27">
            <path
              d="M-10 -8 L0 0 L-10 8"
              stroke="#0a0e27"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <rect x="4" y="4" width="8" height="3" rx="1.5" />
          </g>
          <circle cx="50" cy="25" r="3" fill="rgba(255,255,255,0.4)" />
          <circle cx="56" cy="18" r="2" fill="rgba(255,255,255,0.3)" />
        </svg>

        {/* Brand name */}
        <div style={{ display: "flex", alignItems: "baseline", marginBottom: 16 }}>
          <span
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-2px",
            }}
          >
            KodLab
          </span>
          <span
            style={{
              fontSize: 44,
              fontWeight: 500,
              color: "#22d3ee",
              marginLeft: 4,
            }}
          >
            .ai
          </span>
        </div>

        {/* Tagline */}
        <span
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.5)",
            fontWeight: 400,
            letterSpacing: "4px",
            textTransform: "uppercase",
          }}
        >
          Code. Create. Launch.
        </span>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, #22d3ee, #3b82f6, #22d3ee)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
