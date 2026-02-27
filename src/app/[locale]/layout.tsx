import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Inter, JetBrains_Mono, Cairo } from "next/font/google";
import LocaleRedirect from "@/components/LocaleRedirect";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "KodLab — Code. Create. Launch.",
  description:
    "AI-powered digital agency specializing in web development, automation, and smart business solutions.",
  openGraph: {
    title: "KodLab — Code. Create. Launch.",
    description:
      "AI-powered digital agency specializing in web development, automation, and smart business solutions.",
    siteName: "KodLab",
    type: "website",
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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${cairo.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <LocaleRedirect />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
