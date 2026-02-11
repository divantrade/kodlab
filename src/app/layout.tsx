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
  openGraph: {
    title: "KodLab — Code. Create. Launch.",
    description:
      "AI-powered digital agency specializing in web development, automation, and smart business solutions.",
    url: "https://kodlab.ai",
    siteName: "KodLab",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "KodLab — Code. Create. Launch.",
    description:
      "AI-powered digital agency specializing in web development, automation, and smart business solutions.",
  },
  metadataBase: new URL("https://kodlab.ai"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
