import { NAV_ITEMS } from "@/lib/nav";

const FOOTER_NAV_KEYS = ["about", "books", "seminars", "contact"] as const;
export const FOOTER_NAV_ITEMS = NAV_ITEMS.filter((item) =>
  (FOOTER_NAV_KEYS as readonly string[]).includes(item.key)
);
