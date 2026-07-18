import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { sanityFetch } from "@/sanity/client";
import { CONTACT_INFO_QUERY } from "@/sanity/queries";
import type { ContactInfo } from "@/sanity/types";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SocialIcon } from "@/components/social-icon";
import { BackToTop } from "@/components/back-to-top";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  const localePrefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const canonical = `https://profkhaled.com${localePrefix}/contact`;
  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    const prefix = loc === routing.defaultLocale ? "" : `/${loc}`;
    languages[loc] = `https://profkhaled.com${prefix}/contact`;
    languages[`${loc}-x-default`] = `https://profkhaled.com${prefix}/contact`;
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

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  const contact = await sanityFetch<ContactInfo>({
    query: CONTACT_INFO_QUERY,
    params: { lang: locale },
  });

  const socialLinks = contact?.socialLinks || [];
  const whatsappNum = contact?.whatsappNumber || "";

  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          eyebrow={t("hero.eyebrow")}
          title={t("hero.title")}
          subtitle={t("hero.subtitle")}
        />

        <ScrollReveal>
          <section className="py-12 md:py-[72px]">
            <div className="mx-auto grid max-w-[1160px] gap-11 px-5 md:grid-cols-2 md:items-start">
              <div>
                <h2 className="mb-5 text-[24px] font-bold text-navy dark:text-gold-soft">
                  {t("info.title")}
                </h2>
                <ul className="flex flex-col gap-4 list-none">
                  {contact?.email && (
                    <li className="flex items-start gap-3.5">
                      <span className="flex size-[42px] shrink-0 items-center justify-center rounded-[11px] bg-bg-alt text-navy-3 dark:text-gold-soft">
                        <Mail className="size-[18px]" />
                      </span>
                      <div>
                        <strong className="block text-[14px] text-foreground">{t("email")}</strong>
                        <a href={`mailto:${contact.email}`} className="text-muted">{contact.email}</a>
                      </div>
                    </li>
                  )}
                  {contact?.phone && (
                    <li className="flex items-start gap-3.5">
                      <span className="flex size-[42px] shrink-0 items-center justify-center rounded-[11px] bg-bg-alt text-navy-3 dark:text-gold-soft">
                        <Phone className="size-[18px]" />
                      </span>
                      <div>
                        <strong className="block text-[14px] text-foreground">{t("phone")}</strong>
                        <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="text-muted">{contact.phone}</a>
                      </div>
                    </li>
                  )}
                  {contact?.office && (
                    <li className="flex items-start gap-3.5">
                      <span className="flex size-[42px] shrink-0 items-center justify-center rounded-[11px] bg-bg-alt text-navy-3 dark:text-gold-soft">
                        <MapPin className="size-[18px]" />
                      </span>
                      <div>
                        <strong className="block text-[14px] text-foreground">{t("office")}</strong>
                        <span className="text-muted">{contact.office}</span>
                      </div>
                    </li>
                  )}
                  {contact?.hours && (
                    <li className="flex items-start gap-3.5">
                      <span className="flex size-[42px] shrink-0 items-center justify-center rounded-[11px] bg-bg-alt text-navy-3 dark:text-gold-soft">
                        <Clock className="size-[18px]" />
                      </span>
                      <div>
                        <strong className="block text-[14px] text-foreground">{t("hours")}</strong>
                        <span className="text-muted">{contact.hours}</span>
                      </div>
                    </li>
                  )}
                </ul>

                {whatsappNum && (
                  <a
                    href={`https://wa.me/${whatsappNum.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25d366] px-5 py-3 text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5"
                  >
                    <svg viewBox="0 0 32 32" fill="currentColor" className="size-5">
                      <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.132 6.744 3.054 9.378L1.054 31.2l6.044-1.946A15.906 15.906 0 0016.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.34 22.608c-.39 1.098-1.932 2.008-3.152 2.27-.836.18-1.93.324-5.626-1.208-4.734-1.958-7.776-6.766-8.01-7.08-.226-.314-1.892-2.52-1.892-4.808s1.2-3.41 1.628-3.878c.39-.428.918-.57 1.22-.57h.886c.282 0 .664-.106 1.036.796.39.946 1.336 3.244 1.452 3.474.116.23.194.498.038.812-.156.314-.234.51-.468.786-.234.276-.492.618-.702.828-.194.194-.396.402-.168.786.228.384 1.014 1.674 2.174 2.712 1.492 1.336 2.75 1.75 3.166 1.944.316.15.672.112.922-.156.254-.27 1.078-1.256 1.366-1.69.288-.428.582-.356.986-.214.41.14 2.59 1.22 3.034 1.444.444.224.74.334.846.52.106.186.106 1.08-.284 2.178z"/>
                    </svg>
                    {t("whatsapp")}
                  </a>
                )}

                {socialLinks.length > 0 && (
                  <>
                    <h3 className="mt-6 mb-3 text-lg font-bold text-navy dark:text-gold-soft">
                      {t("social")}
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                      {socialLinks.map((s, i) => (
                        <a
                          key={i}
                          href={s.url || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg-alt px-4 py-2 text-[14px] font-semibold text-navy-3 dark:text-gold-soft transition-all hover:-translate-y-0.5 hover:border-gold hover:text-navy dark:hover:text-gold"
                        >
                          <SocialIcon platform={s.platform} />
                          <span>{s.label || s.platform}</span>
                        </a>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <ContactForm />
            </div>
          </section>
        </ScrollReveal>
      </main>

      <Footer
        email={contact?.email}
        phone={contact?.phone}
        office={contact?.office}
        socialLinks={contact?.socialLinks}
      />
      <WhatsAppButton whatsappNumber={contact?.whatsappNumber} whatsappDefaultMsg={contact?.whatsappDefaultMsg} />
      <BackToTop />
    </>
  );
}
