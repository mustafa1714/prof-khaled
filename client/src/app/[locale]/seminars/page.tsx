import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { sanityFetch } from "@/sanity/client";
import { EVENTS_QUERY, CONTACT_INFO_QUERY } from "@/sanity/queries";
import type { Event, ContactInfo } from "@/sanity/types";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { EventItem } from "@/components/event-item";
import { ScrollReveal } from "@/components/scroll-reveal";
import { EmptyState } from "@/components/empty-state";
import { BackToTop } from "@/components/back-to-top";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seminars" });

  const localePrefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const canonical = `https://profkhaled.com${localePrefix}/seminars`;
  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    const prefix = loc === routing.defaultLocale ? "" : `/${loc}`;
    languages[loc] = `https://profkhaled.com${prefix}/seminars`;
    languages[`${loc}-x-default`] = `https://profkhaled.com${prefix}/seminars`;
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

export default async function SeminarsPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seminars" });

  const [events, contactInfo] = await Promise.all([
    sanityFetch<Event[]>({ query: EVENTS_QUERY, params: { lang: locale } }),
    sanityFetch<ContactInfo>({ query: CONTACT_INFO_QUERY, params: { lang: locale } }),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("hero.title"),
    description: t("hero.subtitle"),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: (events || []).map((evt, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Event",
          name: evt.title,
          startDate: evt.date,
          location: { "@type": "Place", name: evt.place },
          description: evt.description,
          url: evt.externalUrl || evt.recordingUrl,
        },
      })),
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
        <PageHero
          eyebrow={t("hero.eyebrow")}
          title={t("hero.title")}
          subtitle={t("hero.subtitle")}
        />

        <ScrollReveal>
          <section className="py-[72px]">
            <div className="mx-auto max-w-[1160px] px-5">
              <div className="mx-auto flex max-w-[880px] flex-col gap-4">
                {events?.length ? (
                  events.map((evt) => <EventItem key={evt._id} event={evt} />)
                ) : (
                  <EmptyState type="seminars" message={t("empty")} />
                )}
              </div>
            </div>
          </section>
        </ScrollReveal>
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
