"use client";

import { KodLabLogo } from "@/components/KodLabLogo";

export default function OGPreview() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* OG Image Frame - exactly 1200x630 */}
      <div
        style={{ width: 1200, height: 630 }}
        className="relative flex flex-col items-center justify-center bg-[#0a0e27] overflow-hidden shrink-0"
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{
            background: "linear-gradient(90deg, #22d3ee, #3b82f6, #22d3ee)",
          }}
        />

        {/* Subtle glow background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-cyan-500/[0.06] rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-600/[0.08] rounded-full blur-[100px]" />

        {/* Logo */}
        <div className="relative z-10 mb-8">
          <KodLabLogo size={120} className="justify-center" />
        </div>

        {/* Tagline */}
        <p
          className="relative z-10 text-white/50 tracking-[0.4em] font-light text-lg mb-6"
        >
          CODE &nbsp;.&nbsp; CREATE &nbsp;.&nbsp; LAUNCH
        </p>

        {/* Services */}
        <p className="relative z-10 text-white/25 tracking-widest text-sm font-light">
          Web Development &nbsp;&bull;&nbsp; AI Automation &nbsp;&bull;&nbsp; Brand Identity
        </p>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1.5"
          style={{
            background: "linear-gradient(90deg, #22d3ee, #3b82f6, #22d3ee)",
          }}
        />
      </div>
    </div>
  );
}
