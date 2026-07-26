import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export default async function EconomicDevelopmentPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const t = dict.economic;

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} intro={t.intro} />

      <section className="border-b border-stone">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <h2 className="font-serif text-3xl text-ink">{t.convictionsTitle}</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {t.convictions.map((c) => (
              <article key={c.title} className="border-t border-sage pt-6">
                <h3 className="font-serif text-xl text-ink">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-graphite">{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-stone bg-stone/20">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <h2 className="font-serif text-3xl text-ink">{t.topicsTitle}</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {t.topics.map((topic) => (
              <li
                key={topic}
                className="bg-white px-5 py-4 text-sm text-ink border border-stone"
              >
                {topic}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title={dict.home.closeTitle}
        body={t.intro}
        cta={t.cta}
        href={`/${locale}/contact`}
      />
    </>
  );
}
