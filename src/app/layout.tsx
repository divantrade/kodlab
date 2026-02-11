import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KodLab — Code. Create. Launch.",
  description:
    "AI-powered digital agency specializing in web development, automation, and smart business solutions.",
  keywords: [
    "web development",
    "AI automation",
    "digital agency",
    "brand identity",
    "Istanbul",
  ],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
  },
  metadataBase: new URL("https://kodlab.ai"),
  openGraph: {
    title: "KodLab — Code. Create. Launch.",
    description:
      "AI-powered digital agency specializing in web development, automation, and smart business solutions.",
    url: "https://kodlab.ai",
    siteName: "KodLab",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://kodlab.ai/og-image.png",
        width: 2408,
        height: 1272,
        alt: "KodLab — Code. Create. Launch.",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KodLab — Code. Create. Launch.",
    description:
      "AI-powered digital agency specializing in web development, automation, and smart business solutions.",
    images: ["https://kodlab.ai/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
