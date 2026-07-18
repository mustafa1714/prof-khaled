import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notfound");

  return (
    <section className="flex flex-col items-center justify-center px-5 py-20 text-center">
      <h1 className="mb-3 text-4xl font-bold text-navy dark:text-gold-soft">404</h1>
      <p className="mb-6 text-muted">{t("text")}</p>
      <Link
        href="/"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-[15px] font-semibold text-[#2a1f05] transition-all hover:bg-gold-soft"
      >
        {t("back")}
      </Link>
    </section>
  );
}
