import { hasLocale } from "next-intl";
import { getMessages, getTimeZone } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, RTL_LOCALES } from "@/i18n/routing";
import { Providers } from "@/components/providers";
import { Inter, Cairo, Playfair_Display, Amiri } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const timeZone = await getTimeZone();
  const dir = RTL_LOCALES.includes(locale as "ar") ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      style={{ viewportFit: "cover" } as React.CSSProperties}
      className={`${inter.variable} ${cairo.variable} ${playfair.variable} ${amiri.variable}`}
    >
      <body
        className="min-h-screen antialiased"
        style={{
          paddingTop: "env(safe-area-inset-top)",
          paddingBottom: "env(safe-area-inset-bottom)",
          paddingLeft: "env(safe-area-inset-left)",
          paddingRight: "env(safe-area-inset-right)",
        }}
      >
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Providers locale={locale} messages={messages} timeZone={timeZone} dir={dir}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
