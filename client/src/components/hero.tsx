"use client";

import { useTranslations } from "next-intl";
import { sanityAssetUrl } from "@/sanity/assets";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

type Settings = {
  heroEyebrow?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroCTA1Text?: string;
  heroCTA1Link?: string;
  heroCTA2Text?: string;
  heroCTA2Link?: string;
  profilePhoto?: { _ref?: string };
  siteName?: string;
  siteTitle?: string;
  statsBooks?: number;
  statsBooksLabel?: string;
  statsLectures?: number;
  statsLecturesLabel?: string;
  statsSeminars?: number;
  statsSeminarsLabel?: string;
  statsYears?: string;
  statsYearsLabel?: string;
};

type HeroProps = {
  settings: Settings;
  publicationsCount: number;
  eventsCount: number;
};

export function Hero({ settings: s, publicationsCount, eventsCount }: HeroProps) {
  const t = useTranslations("home");

  const profileSrc = s.profilePhoto
    ? sanityAssetUrl(s.profilePhoto)
    : "/assets/profile.svg";

  const stats = [
    { value: s.statsBooks ?? publicationsCount + 18, label: s.statsBooksLabel || t("stats.books") },
    { value: s.statsLectures ?? "40+", label: s.statsLecturesLabel || t("stats.lectures") },
    { value: s.statsSeminars ?? eventsCount + 16, label: s.statsSeminarsLabel || t("stats.seminars") },
    { value: s.statsYears || "30+", label: s.statsYearsLabel || t("stats.years") },
  ];

  return (
    <section className="surface-dark relative overflow-hidden bg-gradient-to-br from-navy via-navy-2 to-navy-3 text-white">
      <div className="pointer-events-none absolute -top-12 right-0 h-[480px] w-[1100px] rounded-full bg-[radial-gradient(ellipse_at_82%_-12%,rgba(198,154,63,0.22),transparent)]" />

      <div className="relative mx-auto grid max-w-[1160px] items-center gap-14 px-5 pt-[76px] md:grid-cols-[1.25fr_0.85fr]">
        <div>
          <span className="mb-2.5 inline-block text-[13px] font-bold uppercase tracking-[2px] text-gold-soft">
            {s.heroEyebrow || t("hero.eyebrow")}
          </span>
          <h1 className="mb-4 font-display text-[clamp(30px,4.6vw,52px)] font-bold text-white">
            {s.heroTitle || t("hero.title")}
          </h1>
          <p className="mb-7 max-w-[560px] text-[18px] text-muted-foreground">
            {s.heroSubtitle || t("hero.subtitle")}
          </p>
          <div className="flex flex-wrap gap-3.5">
            <Link
              href={s.heroCTA1Link || "/books"}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-gold bg-gold px-6 py-3 text-[15px] font-semibold text-[#2a1f05] transition-all hover:-translate-y-0.5 hover:bg-gold-soft hover:shadow-sm"
            >
              {s.heroCTA1Text || t("hero.cta1")}
            </Link>
            <Link
              href={s.heroCTA2Link || "/contact"}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 bg-transparent px-6 py-3 text-[15px] font-semibold text-white transition-all hover:border-gold hover:text-gold-soft"
            >
              {s.heroCTA2Text || t("hero.cta2")}
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-[22px] border-4 border-white/14 bg-white/5 shadow-[0_26px_60px_rgba(0,0,0,0.4)]">
            <Image
              src={profileSrc}
              alt={s.siteName || "Professor"}
              width={400}
              height={500}
              className="block aspect-[4/5] w-full object-cover"
              priority
            />
          </div>
          <div className="absolute -bottom-7 end-[-14px] rounded-xl bg-gold px-4 py-2.5 text-[14px] font-bold text-[#2a1f05] shadow-sm">
            {s.siteTitle || "Professor"}
          </div>
        </div>
      </div>

      <div className="relative mx-auto grid max-w-[1160px] grid-cols-2 gap-4 px-5 pb-16 pt-14 md:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/14 bg-white/8 p-4 text-center backdrop-blur-sm transition-transform hover:-translate-y-1 md:p-6"
          >
            <span className="mb-1 block font-display text-[36px] font-extrabold text-gold-soft">
              {stat.value}
            </span>
            <span className="text-[13px] text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
