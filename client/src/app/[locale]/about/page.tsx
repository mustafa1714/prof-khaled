import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { sanityFetch } from "@/sanity/client";
import { CV_QUERY, CONTACT_INFO_QUERY } from "@/sanity/queries";
import type { Cv, ContactInfo } from "@/sanity/types";
import { sanityFileUrl } from "@/sanity/assets";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { ScrollReveal } from "@/components/scroll-reveal";
import { BackToTop } from "@/components/back-to-top";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  const localePrefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const canonical = `https://profkhaled.com${localePrefix}/about`;
  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    const prefix = loc === routing.defaultLocale ? "" : `/${loc}`;
    languages[loc] = `https://profkhaled.com${prefix}/about`;
    languages[`${loc}-x-default`] = `https://profkhaled.com${prefix}/about`;
  }

  return {
    title: t("hero.title"),
    description: t("bio.title"),
    alternates: { canonical, languages },
    openGraph: {
      title: t("hero.title"),
      description: t("bio.title"),
      type: "profile",
      locale: locale === "ar" ? "ar_AR" : locale,
      url: canonical,
    },
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  const [cv, contactInfo] = await Promise.all([
    sanityFetch<Cv>({ query: CV_QUERY, params: { lang: locale } }),
    sanityFetch<ContactInfo>({ query: CONTACT_INFO_QUERY, params: { lang: locale } }),
  ]);

  const quals = cv?.qualifications || [];
  const exps = cv?.experience || [];
  const interests = cv?.researchInterests || [];
  const sections = cv?.sections || [];
  const cvPdfUrl = cv?.pdfFile ? sanityFileUrl(cv.pdfFile) : "#";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: contactInfo?.email ? `Prof. Khaled` : "Prof. Khaled",
    jobTitle: "University Professor & Academic Researcher",
    description: cv?.bio || undefined,
    hasCredential: quals.map((q) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: q.degree,
      recognizedBy: { "@type": "Organization", name: q.institution },
    })),
    knowsAbout: interests,
  };

  return (
    <>
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main-content">
        <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} />

        <ScrollReveal>
          <section className="py-12 md:py-[72px]">
            <div className="mx-auto grid max-w-[1160px] gap-11 px-5 md:grid-cols-[1.5fr_1fr] md:items-start">
              <div>
                {cv?.bio && (
                  <>
                    <h2 className="mb-3 mt-0 text-[24px] font-bold text-navy dark:text-gold-soft">
                      {t("bio.title")}
                    </h2>
                    <p className="text-muted">{cv.bio}</p>
                  </>
                )}

                {quals.length > 0 && (
                  <>
                    <h2 className="mb-3 mt-7 text-[24px] font-bold text-navy dark:text-gold-soft">
                      {t("qual.title")}
                    </h2>
                    <ul className="flex flex-col gap-2.5 list-none">
                      {quals.map((q, i) => (
                        <li
                          key={i}
                          className="rounded-e-lg border-s-4 border-gold bg-bg-alt px-4 py-3 hover-translate-x"
                        >
                          <strong className="block text-navy dark:text-gold-soft">{q.degree}</strong>
                          <span className="text-[14px] text-muted">
                            {q.institution}{q.year ? ` — ${q.year}` : ""}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {exps.length > 0 && (
                  <>
                    <h2 className="mb-3 mt-7 text-[24px] font-bold text-navy dark:text-gold-soft">
                      {t("exp.title")}
                    </h2>
                    <ul className="flex flex-col gap-2.5 list-none">
                      {exps.map((e, i) => (
                        <li
                          key={i}
                          className="rounded-e-lg border-s-4 border-gold bg-bg-alt px-4 py-3 hover-translate-x"
                        >
                          <strong className="block text-navy dark:text-gold-soft">{e.position}</strong>
                          <span className="text-[14px] text-muted">
                            {e.institution}{e.period ? ` — ${e.period}` : ""}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {interests.length > 0 && (
                  <>
                    <h2 className="mb-3 mt-7 text-[24px] font-bold text-navy dark:text-gold-soft">
                      {t("research.title")}
                    </h2>
                    <div className="flex flex-wrap gap-2.5">
                      {interests.map((interest, idx) => (
                        <span
                          key={idx}
                          className="rounded-full border border-line bg-card px-4 py-2 text-[14px] font-semibold text-navy-3 dark:text-gold-soft"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="sticky top-20 rounded-2xl border border-line bg-card p-7 shadow-lg">
                <h2 className="mb-2.5 text-[22px] font-bold text-navy dark:text-gold-soft">
                  {t("cv.title")}
                </h2>
                <p className="mb-4.5 text-muted">{t("cv.text")}</p>
                <div className="mb-5.5 flex flex-wrap gap-2.5">
                  {cvPdfUrl !== "#" ? (
                    <a
                      href={cvPdfUrl}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-gold bg-gold px-5 py-3 text-[15px] font-semibold text-[#2a1f05] transition-all hover:-translate-y-0.5 hover:bg-gold-soft"
                    >
                      {t("cv.read")}
                    </a>
                  ) : (
                    <span className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-line bg-transparent px-5 py-3 text-[15px] font-semibold text-muted opacity-60">
                      {t("cv.read")}
                    </span>
                  )}
                  <a
                    href={cvPdfUrl}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-line bg-transparent px-5 py-3 text-[15px] font-semibold text-navy dark:text-foreground transition-all hover:border-gold"
                  >
                    {t("cv.download")}
                  </a>
                </div>
                {sections.length > 0 && (
                  <div className="border-t border-line pt-4.5">
                    {sections.map((s, i) => (
                      <div key={i} className="mb-3.5">
                        <h4 className="mb-0.5 text-[15px] font-bold text-navy-3 dark:text-gold-soft">{s.heading}</h4>
                        <p className="text-[14px] text-muted">{s.body}</p>
                      </div>
                    ))}
                  </div>
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
