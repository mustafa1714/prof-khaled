"use client";

import { useTranslations } from "next-intl";
import { useReader } from "./reader-context";
import { sanityAssetUrl, sanityFileUrl } from "@/sanity/assets";
import Image from "next/image";
import type { Publication } from "@/sanity/types";

export function PublicationCard({ pub }: { pub: Publication }) {
  const t = useTranslations("books");
  const { openReader } = useReader();
  const isBook = pub.pubType === "book";
  const typeLabel = isBook ? t("type.book") : t("type.lecture");
  const coverUrl = pub.coverImage ? sanityAssetUrl(pub.coverImage) : null;
  const pdfUrl = pub.pdfFile ? sanityFileUrl(pub.pdfFile) : "#";

  const handleRead = () => {
    openReader(pub._id);
  };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      {coverUrl && (
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-t-2xl bg-bg-alt">
          <Image
            src={coverUrl}
            alt={pub.title || ""}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}
      <span className="absolute top-3.5 end-3.5 z-10 rounded-full bg-navy px-3 py-1 text-[12px] font-bold text-gold-soft">
        {typeLabel}
      </span>
      <div className="flex flex-1 flex-col gap-2 p-6">
        <h3 className="text-[19px] font-bold text-navy dark:text-gold-soft">{pub.title}</h3>
        {pub.year && <span className="text-[13px] font-bold text-gold">{pub.year}</span>}
        <p className="flex-1 text-[15px] text-muted">{pub.description}</p>
        <div className="mt-2 flex flex-wrap gap-2.5">
          <button
            onClick={handleRead}
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-gold bg-gold px-4 py-2 text-[14px] font-semibold text-[#2a1f05] transition-all hover:-translate-y-0.5 hover:bg-gold-soft cursor-pointer"
          >
            {t("read")}
          </button>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-line bg-transparent px-4 py-2 text-[14px] font-semibold text-navy dark:text-foreground transition-all hover:border-gold hover:text-navy-3 dark:hover:text-gold-soft"
          >
            {t("download")}
          </a>
        </div>
      </div>
    </article>
  );
}
