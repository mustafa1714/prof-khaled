import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Mail, Phone, MapPin } from "lucide-react";
import { SocialIcon } from "@/components/social-icon";
import { FooterBackToTop } from "@/components/footer-back-to-top";
import { FOOTER_NAV_ITEMS } from "@/components/footer-nav";

type FooterProps = {
  email?: string;
  phone?: string;
  office?: string;
  socialLinks?: { label?: string; platform?: string; url?: string }[];
};

export async function Footer({ email, phone, office, socialLinks }: FooterProps) {
  const t = await getTranslations();

  return (
    <footer className="surface-dark border-t-2 border-gold/20 bg-navy">
      <div className="mx-auto grid max-w-[1160px] gap-9 px-5 pt-14 pb-0 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <h4 className="mb-3.5 text-lg font-bold text-white">{t("site.name")}</h4>
          <p className="text-[14px] text-muted-foreground/80">{t("footer.tagline")}</p>
        </div>
        <div>
          <h4 className="mb-3.5 text-lg font-bold text-white">{t("footer.quick")}</h4>
          <ul className="flex flex-col gap-2.5 list-none">
            {FOOTER_NAV_ITEMS.map(({ key, href }) => (
              <li key={key}>
                <Link href={href} className="text-[14px] text-muted-foreground hover:text-gold-soft transition-colors">
                  {t(`nav.${key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-3.5 text-lg font-bold text-white">{t("footer.contact")}</h4>
          <ul className="flex flex-col gap-2.5 list-none">
            {email && (
              <li className="flex items-center gap-2 text-[14px] text-muted-foreground/80">
                <Mail className="size-4 shrink-0 text-gold-soft" aria-hidden="true" />
                <a href={`mailto:${email}`} className="hover:text-gold-soft transition-colors">{email}</a>
              </li>
            )}
            {phone && (
              <li className="flex items-center gap-2 text-[14px] text-muted-foreground/80">
                <Phone className="size-4 shrink-0 text-gold-soft" aria-hidden="true" />
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-gold-soft transition-colors">{phone}</a>
              </li>
            )}
            {office && (
              <li className="flex items-center gap-2 text-[14px] text-muted-foreground/80">
                <MapPin className="size-4 shrink-0 text-gold-soft" aria-hidden="true" />
                <span>{office}</span>
              </li>
            )}
          </ul>
          {socialLinks && socialLinks.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-3">
              {socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label || link.platform}
                  className="flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-[13px] text-muted-foreground/80 transition-colors hover:border-gold-soft hover:text-gold-soft"
                >
                  <SocialIcon platform={link.platform} />
                  <span>{link.label || link.platform}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="mt-10 border-t border-white/10 px-5 py-4">
        <div className="mx-auto flex max-w-[1160px] items-center justify-between text-[13px] text-muted-foreground/60">
          <span>© {new Date().getFullYear()} {t("site.name")} — {t("footer.rights")}</span>
          <FooterBackToTop />
        </div>
      </div>
    </footer>
  );
}
