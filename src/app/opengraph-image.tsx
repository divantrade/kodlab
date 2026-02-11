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
          backgroundColor: "#0a0e27",
          position: "relative",
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "linear-gradient(90deg, #22d3ee, #3b82f6, #22d3ee)",
            display: "flex",
          }}
        />

        {/* Flask shape using divs */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          {/* Flask neck */}
          <div
            style={{
              width: 40,
              height: 40,
              backgroundColor: "#22d3ee",
              borderRadius: "4px 4px 0 0",
              display: "flex",
            }}
          />
          {/* Flask body */}
          <div
            style={{
              width: 100,
              height: 70,
              backgroundColor: "#3b82f6",
              borderRadius: "0 0 20px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Code symbol */}
            <span style={{ fontSize: 36, color: "#0a0e27", fontWeight: 900 }}>
              {"</>"}
            </span>
          </div>
        </div>

        {/* Brand name */}
        <div style={{ display: "flex", alignItems: "baseline", marginBottom: 16 }}>
          <span
            style={{
              fontSize: 80,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-2px",
            }}
          >
            KodLab
          </span>
          <span
            style={{
              fontSize: 50,
              fontWeight: 500,
              color: "#22d3ee",
              marginLeft: 6,
            }}
          >
            .ai
          </span>
        </div>

        {/* Tagline */}
        <span
          style={{
            fontSize: 30,
            color: "rgba(255,255,255,0.6)",
            fontWeight: 400,
            letterSpacing: "6px",
          }}
        >
          CODE . CREATE . LAUNCH
        </span>

        {/* Services line */}
        <span
          style={{
            fontSize: 20,
            color: "rgba(255,255,255,0.35)",
            fontWeight: 300,
            marginTop: 20,
            letterSpacing: "2px",
          }}
        >
          Web Development • AI Automation • Brand Identity
        </span>

        {/* Bottom accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "linear-gradient(90deg, #22d3ee, #3b82f6, #22d3ee)",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
