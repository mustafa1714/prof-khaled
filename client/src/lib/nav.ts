export const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "books", href: "/books" },
  { key: "seminars", href: "/seminars" },
  { key: "contact", href: "/contact" },
] as const;

export type NavItemKey = (typeof NAV_ITEMS)[number]["key"];
