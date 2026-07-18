"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { RTL_LOCALES } from "@/i18n/routing";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitch } from "./language-switch";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NAV_ITEMS } from "@/lib/nav";

function BrandMark({ isRtl }: { isRtl: boolean }) {
  return (
    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-navy-3 font-display text-lg font-extrabold text-gold">
      {isRtl ? "خ" : "K"}
    </span>
  );
}

export function Header() {
  const t = useTranslations("nav");
  const tSite = useTranslations("site");
  const locale = useLocale();
  const pathname = usePathname();
  const isRtl = RTL_LOCALES.includes(locale as "ar");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-line transition-all duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
      style={{ background: "var(--header-bg)", backdropFilter: "blur(12px)" }}
    >
      <div className="mx-auto flex h-[74px] max-w-[1160px] items-center gap-3 px-3 sm:gap-5 sm:px-5">
        <Link href="/" className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <BrandMark isRtl={isRtl} />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-[15px] font-extrabold text-navy dark:text-foreground sm:text-[17px]">
              {tSite("name")}
            </span>
            <span className="hidden truncate text-xs text-muted min-[375px]:block">{tSite("title")}</span>
          </span>
        </Link>

        <nav className="ms-auto hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV_ITEMS.map(({ key, href }) => {
            const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={key}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`relative rounded-full px-4 py-2 text-[15px] font-semibold transition-colors ${
                  isActive
                    ? "text-navy bg-bg-alt dark:text-gold-soft dark:bg-white/8"
                    : "text-foreground hover:text-navy-3 dark:hover:text-gold-soft"
                }`}
              >
                {t(key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <LanguageSwitch />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="relative flex size-[38px] items-center justify-center rounded-lg bg-transparent border-none cursor-pointer md:hidden" aria-label={open ? "Close menu" : "Open menu"}>
              <span className="flex flex-col gap-[5px]">
                <span className={`block h-0.5 w-6 rounded bg-navy dark:bg-foreground transition-all duration-300 ${open ? "translate-y-[5.5px] rotate-45" : ""}`} />
                <span className={`block h-0.5 w-6 rounded bg-navy dark:bg-foreground transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
                <span className={`block h-0.5 w-6 rounded bg-navy dark:bg-foreground transition-all duration-300 ${open ? "-translate-y-[5.5px] -rotate-45" : ""}`} />
              </span>
            </SheetTrigger>
            <SheetContent side={isRtl ? "left" : "right"} className="w-3/4 sm:max-w-sm p-0">
              <nav className="flex flex-col gap-0 p-4" aria-label="Main">
                {NAV_ITEMS.map(({ key, href }) => {
                  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
                  return (
                    <Link
                      key={key}
                      href={href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={`rounded-lg px-3 py-3 text-[15px] font-semibold transition-colors ${
                        isActive
                          ? "bg-bg-alt text-navy dark:bg-white/8 dark:text-gold-soft"
                          : "text-foreground hover:bg-bg-alt"
                      }`}
                    >
                      {t(key)}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
