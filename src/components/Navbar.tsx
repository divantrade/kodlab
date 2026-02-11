"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const localeLabels: Record<string, string> = {
  en: "EN",
  ar: "عربي",
  tr: "TR",
};

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLocale = (newLocale: string) => {
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
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center font-bold text-navy-950 text-lg">
              K
            </div>
            <span className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
              KodLab
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-navy-600 hover:border-cyan-500/50 text-sm text-gray-300 hover:text-cyan-400 transition-all"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
                {localeLabels[locale]}
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 end-0 glass rounded-lg overflow-hidden min-w-[100px]"
                  >
                    {Object.entries(localeLabels).map(([code, label]) => (
                      <button
                        key={code}
                        onClick={() => switchLocale(code)}
                        className={`w-full px-4 py-2 text-sm text-start hover:bg-cyan-500/10 transition-colors ${
                          locale === code
                            ? "text-cyan-400"
                            : "text-gray-300"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA Button */}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact")}
              className="hidden sm:inline-flex items-center px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 glow-cyan"
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
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden glass rounded-lg mb-4 overflow-hidden"
            >
              <div className="px-4 py-3 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="block px-3 py-2 rounded-lg text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, "#contact")}
                  className="block px-3 py-2 mt-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-center font-medium"
                >
                  {t("getInTouch")}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
