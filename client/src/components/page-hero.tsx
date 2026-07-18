type PageHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className="surface-dark bg-gradient-to-br from-navy to-navy-3 py-16 text-center text-white">
      <div className="mx-auto max-w-[1160px] px-5">
        {eyebrow && (
          <span className="mb-2.5 inline-block text-[13px] font-bold uppercase tracking-[2px] text-gold-soft">
            {eyebrow}
          </span>
        )}
        <h1 className="font-display text-[clamp(28px,4vw,46px)] font-bold text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-3.5 max-w-[620px] text-[17px] text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
