import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const BASE_URL = "https://profkhaled.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;
  const paths = ["", "/about", "/books", "/seminars", "/contact"];

  const entries: MetadataRoute.Sitemap = [];

  for (const path of paths) {
    for (const locale of locales) {
      const localePrefix = locale === routing.defaultLocale ? "" : `/${locale}`;
      entries.push({
        url: `${BASE_URL}${localePrefix}${path}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: path === "" ? 1 : 0.8,
      });
    }
  }

  return entries;
}
