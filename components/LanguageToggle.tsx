"use client";

import { cn } from "@/lib/cn";
import { useT } from "@/lib/i18n";

export function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale, t } = useT();

  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className={cn("inline-flex items-center gap-1 text-[0.8rem] tracking-[0.12em]", className)}
    >
      <button
        type="button"
        aria-pressed={locale === "en"}
        onClick={() => setLocale("en")}
        className={cn(
          "relative px-1.5 py-1 transition-opacity duration-300",
          locale === "en" ? "opacity-100" : "opacity-45 hover:opacity-80",
        )}
      >
        EN
        {locale === "en" ? (
          <span className="absolute inset-x-1.5 -bottom-0.5 h-px bg-lime" />
        ) : null}
      </button>
      <span className="opacity-30" aria-hidden="true">
        /
      </span>
      <button
        type="button"
        aria-pressed={locale === "es"}
        onClick={() => setLocale("es")}
        className={cn(
          "relative px-1.5 py-1 transition-opacity duration-300",
          locale === "es" ? "opacity-100" : "opacity-45 hover:opacity-80",
        )}
      >
        ES
        {locale === "es" ? (
          <span className="absolute inset-x-1.5 -bottom-0.5 h-px bg-lime" />
        ) : null}
      </button>
    </div>
  );
}
