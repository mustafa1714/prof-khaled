"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");

  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <h1 className="mb-3 text-4xl font-bold text-navy dark:text-gold-soft">{t("title")}</h1>
      <p className="mb-6 max-w-md text-muted">
        {t("message")}
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-[15px] font-semibold text-[#2a1f05] transition-all hover:bg-gold-soft"
        >
          {t("tryAgain")}
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-navy-3 bg-transparent px-6 py-3 text-[15px] font-semibold text-navy dark:text-foreground transition-all hover:bg-navy-3 hover:text-white"
        >
          {t("goHome")}
        </Link>
      </div>
    </div>
  );
}
