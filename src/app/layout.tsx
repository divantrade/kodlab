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
  openGraph: {
    title: "KodLab — Code. Create. Launch.",
    description:
      "AI-powered digital agency specializing in web development, automation, and smart business solutions.",
    url: "https://kodlab.ai",
    siteName: "KodLab",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
