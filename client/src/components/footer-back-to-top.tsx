"use client";

import { ChevronUp } from "lucide-react";
import { useTranslations } from "next-intl";

export function FooterBackToTop() {
  const t = useTranslations("footer");

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="flex items-center gap-1 text-muted-foreground/60 hover:text-gold-soft transition-colors cursor-pointer"
      aria-label={t("backToTop")}
    >
      <span className="hidden sm:inline">{t("backToTop")}</span>
      <ChevronUp className="size-4" aria-hidden="true" />
    </button>
  );
}
