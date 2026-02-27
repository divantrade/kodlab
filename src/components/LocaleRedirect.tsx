"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

const STORAGE_KEY = "kodlab-locale";

/**
 * Persists the current locale to localStorage on every render,
 * and redirects to the stored locale on first visit if it differs.
 */
export default function LocaleRedirect() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored && stored !== locale && ["en", "ar", "tr"].includes(stored)) {
        // Only redirect on initial page load (not on every navigation)
        // Check if we've already redirected this session
        const redirected = sessionStorage.getItem("kodlab-redirected");
        if (!redirected) {
          sessionStorage.setItem("kodlab-redirected", "1");
          const segments = pathname.split("/");
          segments[1] = stored;
          router.replace(segments.join("/"));
          return;
        }
      }

      // Always persist the current locale
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // localStorage unavailable (SSR, private browsing, etc.)
    }
  }, [locale, pathname, router]);

  return null;
}
