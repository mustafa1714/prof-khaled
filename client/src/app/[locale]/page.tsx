import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { sanityFetch } from "@/sanity/client";
import {
  SITE_SETTINGS_QUERY,
  PUBLICATIONS_QUERY,
  EVENTS_QUERY,
  CONTACT_INFO_QUERY,
} from "@/sanity/queries";
import type { SiteSettings, Publication, Event, ContactInfo } from "@/sanity/types";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { AboutPreview } from "@/components/about-preview";
import { PublicationCard } from "@/components/publication-card";
import { EventItem } from "@/components/event-item";
import { CtaBand } from "@/components/cta-band";
import { ScrollReveal } from "@/components/scroll-reveal";
import { BackToTop } from "@/components/back-to-top";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  const localePrefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const canonical = `https://profkhaled.com${localePrefix}`;
  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    const prefix = loc === routing.defaultLocale ? "" : `/${loc}`;
    languages[loc] = `https://profkhaled.com${prefix}`;
    languages[`${loc}-x-default`] = `https://profkhaled.com${prefix}`;
  }

  return {
    title: t("hero.title"),
    description: t("hero.subtitle"),
    alternates: { canonical, languages },
    openGraph: {
      title: t("hero.title"),
      description: t("hero.subtitle"),
      type: "website",
      locale: locale === "ar" ? "ar_AR" : locale,
      url: canonical,
    },
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  const [settings, publications, events, contactInfo] = await Promise.all([
    sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY, params: { lang: locale } }),
    sanityFetch<Publication[]>({ query: PUBLICATIONS_QUERY, params: { lang: locale } }),
    sanityFetch<Event[]>({ query: EVENTS_QUERY, params: { lang: locale } }),
    sanityFetch<ContactInfo>({ query: CONTACT_INFO_QUERY, params: { lang: locale } }),
  ]);

  const pubs = (publications || []).slice(0, 3);
  const evts = (events || []).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: settings?.siteName || "Prof. Khaled",
    url: "https://profkhaled.com",
    description: t("hero.subtitle"),
    publisher: {
      "@type": "Person",
      name: settings?.siteName || "Prof. Khaled",
      jobTitle: settings?.siteTitle || "University Professor & Academic Researcher",
    },
  };

  return (
    <>
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main-content">
        <Hero settings={settings || {}} publicationsCount={publications?.length || 0} eventsCount={events?.length || 0} />

        <AboutPreview
          eyebrow={settings?.aboutEyebrow}
          title={settings?.aboutTitle}
          text={settings?.aboutText}
          moreText={settings?.aboutMoreText}
        />

        <ScrollReveal>
          <section className="bg-bg-alt py-12 md:py-[72px]">
            <div className="mx-auto max-w-[1160px] px-5">
              <div className="mx-auto mb-11 max-w-[680px] text-center">
                <h2 className="mb-2.5 font-display text-[clamp(24px,3vw,36px)] text-navy dark:text-gold-soft">
                  {settings?.homeBooksTitle || t("books.title")}
                </h2>
                <p className="text-muted">
                  {settings?.homeBooksSubtitle || t("books.subtitle")}
                </p>
              </div>
              <div className="grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(min(290px,100%),1fr))]">
                {pubs.map((pub) => (
                  <PublicationCard key={pub._id} pub={pub} />
                ))}
              </div>
              <div className="mt-9 text-center">
                <Link
                  href="/books"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-navy-3 bg-transparent px-6 py-3 text-[15px] font-semibold text-navy dark:text-foreground transition-all hover:bg-navy-3 hover:text-white"
                >
                  {settings?.homeBooksAllBtn || t("books.all")}
                </Link>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="py-12 md:py-[72px]">
            <div className="mx-auto max-w-[1160px] px-5">
              <div className="mx-auto mb-11 max-w-[680px] text-center">
                <h2 className="mb-2.5 font-display text-[clamp(24px,3vw,36px)] text-navy dark:text-gold-soft">
                  {settings?.homeSeminarsTitle || t("seminars.title")}
                </h2>
                <p className="text-muted">
                  {settings?.homeSeminarsSubtitle || t("seminars.subtitle")}
                </p>
              </div>
              <div className="mx-auto flex max-w-[880px] flex-col gap-4">
                {evts.map((evt) => (
                  <EventItem key={evt._id} event={evt} />
                ))}
              </div>
              <div className="mt-9 text-center">
                <Link
                  href="/seminars"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-navy-3 bg-transparent px-6 py-3 text-[15px] font-semibold text-navy dark:text-foreground transition-all hover:bg-navy-3 hover:text-white"
                >
                  {settings?.homeSeminarsAllBtn || t("seminars.all")}
                </Link>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <CtaBand
          title={settings?.ctaTitle}
          text={settings?.ctaText}
          buttonText={settings?.ctaButtonText}
        />
      </main>

      <Footer
        email={contactInfo?.email}
        phone={contactInfo?.phone}
        office={contactInfo?.office}
        socialLinks={contactInfo?.socialLinks}
      />
      <WhatsAppButton whatsappNumber={contactInfo?.whatsappNumber} whatsappDefaultMsg={contactInfo?.whatsappDefaultMsg} />
      <BackToTop />
    </>
  );
}
