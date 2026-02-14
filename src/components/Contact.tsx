"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";
import SectionHeader from "./SectionHeader";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type FormStatus = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const [status, setStatus] = useState<FormStatus>("idle");

  const projectTypes = ["web", "ai", "brand", "systems", "other"] as const;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store",
          "Pragma": "no-cache",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          project_type: formData.get("project_type"),
          message: formData.get("message"),
          locale,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        form.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 bg-navy-900/30" />
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeader
          badge={t("badge")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <motion.form
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.6 }}
            className="lg:col-span-3 space-y-5"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="subject" value="New message from KodLab website" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input
                type="text"
                name="name"
                required
                placeholder={t("form.name")}
                className="w-full px-5 py-3.5 rounded-xl bg-navy-800/60 border border-navy-700/80 text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/10 transition-all text-sm"
              />
              <input
                type="email"
                name="email"
                required
                placeholder={t("form.email")}
                className="w-full px-5 py-3.5 rounded-xl bg-navy-800/60 border border-navy-700/80 text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/10 transition-all text-sm"
              />
            </div>

            <select
              name="project_type"
              required
              className="w-full px-5 py-3.5 rounded-xl bg-navy-800/60 border border-navy-700/80 text-gray-400 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/10 transition-all text-sm appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%236b7280' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "calc(100% - 16px) center",
              }}
              defaultValue=""
            >
              <option value="" disabled>
                {t("form.projectType")}
              </option>
              {projectTypes.map((type) => (
                <option key={type} value={type} className="bg-navy-900 text-white">
                  {t(`form.projectTypes.${type}`)}
                </option>
              ))}
            </select>

            <textarea
              name="message"
              required
              rows={5}
              placeholder={t("form.message")}
              className="w-full px-5 py-3.5 rounded-xl bg-navy-800/60 border border-navy-700/80 text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/10 transition-all resize-none text-sm"
            />

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full sm:w-auto px-10 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 glow-cyan hover:scale-[1.02] text-sm disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {status === "sending" ? t("form.sending") : t("form.send")}
            </button>

            {status === "success" && (
              <p className="text-green-400 text-sm">{t("form.success")}</p>
            )}
            {status === "error" && (
              <p className="text-red-400 text-sm">{t("form.error")}</p>
            )}
          </motion.form>

          {/* Contact Info */}
          <motion.div
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-5"
          >
            <div className="flex items-start gap-4 p-5 sm:p-6 rounded-2xl bg-navy-800/40 border border-navy-700/80">
              <div className="w-11 h-11 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wider">Email</p>
                <p className="text-white text-sm">{t("info.email")}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 sm:p-6 rounded-2xl bg-navy-800/40 border border-navy-700/80">
              <div className="w-11 h-11 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 shrink-0">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wider">{t("info.whatsapp")}</p>
                <p className="text-white text-sm">+90 XXX XXX XXXX</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 sm:p-6 rounded-2xl bg-navy-800/40 border border-navy-700/80">
              <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wider">Location</p>
                <p className="text-white text-sm">{t("info.location")}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
