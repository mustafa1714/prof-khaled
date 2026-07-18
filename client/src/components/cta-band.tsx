"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MessageCircle } from "lucide-react";

type Props = {
  title?: string;
  text?: string;
  buttonText?: string;
};

export function CtaBand({ title, text, buttonText }: Props) {
  const t = useTranslations("home.cta");

  return (
    <section className="surface-dark relative overflow-hidden bg-gradient-to-br from-navy-3 to-navy py-13 text-white">
      {/* Decorative background circles */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -right-20 -top-20 size-[300px] rounded-full bg-gold/5" />
        <div className="absolute -left-16 bottom-0 size-[200px] rounded-full bg-white/3" />
      </div>

      <div className="relative mx-auto flex max-w-[1160px] flex-wrap items-center justify-between gap-8 px-5">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-block size-2 rounded-full bg-gold" />
            <span className="text-[13px] font-semibold uppercase tracking-widest text-gold/80">{t("title")}</span>
          </div>
          <h2 className="mb-2 font-display text-[clamp(22px,5vw,28px)] text-white">
            {title || t("title")}
          </h2>
          <p className="max-w-[520px] text-muted-foreground">
            {text || t("text")}
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-gold bg-gold px-6 py-3 text-[15px] font-semibold text-[#2a1f05] transition-all hover:-translate-y-0.5 hover:bg-gold-soft hover:shadow-sm"
        >
          <MessageCircle className="size-4" aria-hidden="true" />
          {buttonText || t("button")}
        </Link>
      </div>
    </section>
  );
}
