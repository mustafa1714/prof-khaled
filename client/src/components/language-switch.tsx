"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitch() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const labels: Record<string, string> = {
    ar: "العربية",
    en: "English",
    tr: "Türkçe",
  };

  return (
    <div className="flex rounded-full bg-bg-alt p-0.5" role="group" aria-label="Language">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => router.replace(pathname, { locale: loc })}
          aria-label={`${labels[loc]}${locale === loc ? " (current)" : ""}`}
          aria-pressed={locale === loc}
          className={`rounded-full px-3 py-2 text-xs font-semibold transition-all min-h-[32px] min-w-[32px] ${
            locale === loc
              ? "bg-navy text-white"
              : "text-muted hover:text-foreground"
          }`}
        >
          {labels[loc]}
        </button>
      ))}
    </div>
  );
}
