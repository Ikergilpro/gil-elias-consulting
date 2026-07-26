import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export default async function PublicationsPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const t = dict.publications;
  const n = t.newsletter;

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} intro={t.intro} />

      <section className="border-b border-stone bg-stone/30">
        <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
          <div className="flex flex-col gap-8 border border-stone bg-white p-8 md:flex-row md:items-end md:justify-between md:p-10">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-sage">
                {n.eyebrow}
              </p>
              <h2 className="mt-3 font-serif text-3xl text-ink md:text-4xl">
                {n.title}
              </h2>
              <p className="mt-2 text-xs uppercase tracking-[0.1em] text-graphite">
                {n.meta}
              </p>
              <p className="mt-4 text-base leading-relaxed text-graphite">
                {n.body}
              </p>
            </div>
            <a
              href={n.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center rounded-sm bg-ink px-6 py-3 text-sm font-medium text-white transition hover:bg-ink/90"
            >
              {n.cta} →
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-stone">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <ul className="divide-y divide-stone border-y border-stone">
            {t.items.map((item) => (
              <li key={item.title} className="py-8">
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-sage">
                  {item.meta}
                </p>
                <h2 className="mt-2 font-serif text-2xl text-ink">{item.title}</h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-graphite">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>

          <h3 className="mt-16 font-serif text-2xl text-ink">{t.pillarsTitle}</h3>
          <ul className="mt-8 divide-y divide-stone border-y border-stone">
            {t.pillars.map((p) => (
              <li key={p} className="py-5 font-serif text-xl text-ink md:text-2xl">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title={t.title}
        body={t.intro}
        cta={t.cta}
        href={`/${locale}/contact`}
      />
    </>
  );
}
