"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { KodLabLogo } from "./KodLabLogo";

const localeConfig: Record<string, { label: string; flag: string }> = {
  en: { label: "EN", flag: "🇬🇧" },
  ar: { label: "عربي", flag: "🇸🇦" },
  tr: { label: "TR", flag: "🇹🇷" },
};

const sectionIds = ["services", "portfolio", "process", "tech", "about", "contact"];

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for active section highlighting
  useEffect(() => {
    const visibleSections = new Map<string, number>();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibleSections.delete(entry.target.id);
          }
        });

        let maxRatio = 0;
        let maxId = "";
        visibleSections.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            maxId = id;
          }
        });

        if (maxId) setActiveSection(maxId);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: "-80px 0px -20% 0px" },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const switchLocale = (newLocale: string) => {
    try {
      localStorage.setItem("kodlab-locale", newLocale);
    } catch {
      // localStorage unavailable
    }
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
    setLangOpen(false);
  };

  const navLinks = [
    { href: "#services", label: t("services") },
    { href: "#portfolio", label: t("portfolio") },
    { href: "#process", label: t("process") },
    { href: "#tech", label: t("tech") },
    { href: "#about", label: t("about") },
    { href: "#contact", label: t("contact") },
  ];

  const scrollToSection = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={`nav-enter fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled ? "glass-blur shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="group">
            <KodLabLogo size={36} />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const sectionId = link.href.slice(1);
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`relative text-sm transition-colors duration-200 ${
                    isActive
                      ? "text-cyan-400 font-medium"
                      : "text-gray-400 hover:text-cyan-400"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-navy-600 hover:border-cyan-500/50 text-sm text-gray-300 hover:text-cyan-400 transition-colors"
              >
                <span className="text-base leading-none">{localeConfig[locale]?.flag}</span>
                {localeConfig[locale]?.label}
              </button>

              {langOpen && (
                <div className="dropdown-enter absolute top-full mt-2 end-0 glass rounded-lg overflow-hidden min-w-[120px]">
                  {Object.entries(localeConfig).map(([code, { label, flag }]) => (
                    <button
                      key={code}
                      onClick={() => switchLocale(code)}
                      className={`w-full flex items-center gap-2 px-4 py-2 text-sm text-start hover:bg-cyan-500/10 transition-colors ${
                        locale === code
                          ? "text-cyan-400"
                          : "text-gray-300"
                      }`}
                    >
                      <span className="text-base leading-none">{flag}</span>
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CTA Button */}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact")}
              className="hidden sm:inline-flex items-center px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium hover:from-cyan-400 hover:to-blue-500 transition-colors duration-300 glow-cyan"
            >
              {t("getInTouch")}
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100 mb-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="glass rounded-lg">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => {
                const sectionId = link.href.slice(1);
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`block px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "text-cyan-400 bg-cyan-500/10"
                        : "text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "#contact")}
                className="block px-3 py-2 mt-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-center font-medium"
              >
                {t("getInTouch")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
