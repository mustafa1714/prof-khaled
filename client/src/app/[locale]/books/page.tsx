import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { sanityFetch } from "@/sanity/client";
import { PUBLICATIONS_QUERY, CONTACT_INFO_QUERY } from "@/sanity/queries";
import type { Publication, ContactInfo } from "@/sanity/types";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { PublicationCard } from "@/components/publication-card";
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
  const t = await getTranslations({ locale, namespace: "books" });

  const localePrefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const canonical = `https://profkhaled.com${localePrefix}/books`;
  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    const prefix = loc === routing.defaultLocale ? "" : `/${loc}`;
    languages[loc] = `https://profkhaled.com${prefix}/books`;
    languages[`${loc}-x-default`] = `https://profkhaled.com${prefix}/books`;
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

export default async function BooksPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "books" });

  const [publications, contactInfo] = await Promise.all([
    sanityFetch<Publication[]>({ query: PUBLICATIONS_QUERY, params: { lang: locale } }),
    sanityFetch<ContactInfo>({ query: CONTACT_INFO_QUERY, params: { lang: locale } }),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("hero.title"),
    description: t("hero.subtitle"),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: (publications || []).map((pub, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Book",
          name: pub.title,
          datePublished: pub.year,
          description: pub.description,
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
              {publications?.length ? (
                <div className="grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(290px,1fr))]">
                  {publications.map((pub) => (
                    <PublicationCard key={pub._id} pub={pub} />
                  ))}
                </div>
              ) : (
                <EmptyState type="books" message={t("empty")} />
              )}
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
