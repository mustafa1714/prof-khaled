"use client";

import { useLocale, useTranslations } from "next-intl";
import type { Event } from "@/sanity/types";

function fmtDate(d?: string, locale?: string) {
  if (!d) return "";
  try {
    const dt = new Date(d + "T00:00:00");
    return dt.toLocaleDateString(locale ?? "en", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
  } catch {
    return d;
  }
}

export function EventItem({ event }: { event: Event }) {
  const t = useTranslations();
  const tVisit = useTranslations("seminars");
  const locale = useLocale();
  const typeKey = event.eventType || "";
  const typeLabel = t(`seminars.types.${typeKey}` as never) || typeKey;
  const url = event.externalUrl || event.recordingUrl || "#";

  return (
    <div className="flex items-center justify-between gap-5 rounded-2xl border border-line bg-card p-5 shadow-sm transition-all hover:-translate-y-0.75 hover:border-gold">
      <div className="flex-1">
        <span className="mb-2 inline-block rounded-full bg-bg-alt px-3 py-0.5 text-[12px] font-bold text-navy-3 dark:text-gold-soft">
          {typeLabel}
          {event.isLive && (
            <span className="ms-2 inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-2.5 py-0.5 text-[0.75rem] font-semibold uppercase text-red-500">
              <span className="size-2 rounded-full bg-red-500 animate-[pulse-live_1.6s_infinite]" />
              {tVisit("live")}
            </span>
          )}
        </span>
        <h3 className="text-[19px] font-bold text-navy dark:text-gold-soft">{event.title}</h3>
        <p className="mt-1 text-[14px] text-muted">
          {fmtDate(event.date, locale)} · {event.place}
        </p>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener"
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border-2 border-navy-3 bg-transparent px-4 py-2 text-[14px] font-semibold text-navy-3 dark:text-gold-soft transition-all hover:bg-navy-3 hover:text-white dark:hover:border-gold dark:hover:text-gold"
      >
        {tVisit("visit")} ↗
      </a>
    </div>
  );
}
