"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

export default function ParticlesBackground() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: false,
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        number: {
          value: isMobile ? 30 : 70,
          density: { enable: true, width: 1920, height: 1080 },
        },
        color: { value: ["#22d3ee", "#3b82f6", "#06b6d4"] },
        opacity: {
          value: { min: 0.2, max: 0.6 },
          animation: { enable: true, speed: 0.8, startValue: "random" },
        },
        size: {
          value: { min: 1, max: 3 },
          animation: { enable: true, speed: 1.5, startValue: "random" },
        },
        move: {
          enable: true,
          speed: { min: 0.3, max: 0.8 },
          direction: "none" as const,
          outModes: { default: "bounce" as const },
        },
        links: {
          enable: true,
          distance: 140,
          color: "#22d3ee",
          opacity: 0.12,
          width: 1,
        },
      },
      interactivity: {
        events: {
          onHover: { enable: !isMobile, mode: "grab" },
        },
        modes: {
          grab: { distance: 160, links: { opacity: 0.25 } },
        },
      },
    }),
    [isMobile],
  );

  if (!ready) return null;

  return (
    <Particles
      id="hero-particles"
      className="absolute inset-0 w-full h-full"
      options={options}
    />
  );
}
