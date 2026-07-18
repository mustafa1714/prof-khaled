"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "./scroll-reveal";

type Props = {
  eyebrow?: string;
  title?: string;
  text?: string;
  moreText?: string;
};

export function AboutPreview({ eyebrow, title, text, moreText }: Props) {
  const t = useTranslations("home.about");

  return (
    <ScrollReveal>
      <section className="py-[72px]">
        <div className="mx-auto max-w-[760px] px-5 text-center">
          <span className="mb-2.5 inline-block text-[13px] font-bold uppercase tracking-[2px] text-gold">
            {eyebrow || t("eyebrow")}
          </span>
          <h2 className="mb-3.5 font-display text-[clamp(22px,3vw,32px)] text-navy dark:text-gold-soft">
            {title || t("title")}
          </h2>
          <p className="text-[18px] text-muted">
            {text || t("text")}
          </p>
          <Link
            href="/about"
            className="relative mt-3 inline-block font-semibold text-navy-3 transition-colors hover:text-gold dark:text-gold-soft dark:hover:text-gold after:absolute after:start-0 after:bottom-[-3px] after:h-0.5 after:w-0 after:bg-gold after:transition-all hover:after:w-full"
          >
            {moreText || t("more")} →
          </Link>
        </div>
      </section>
    </ScrollReveal>
  );
}
