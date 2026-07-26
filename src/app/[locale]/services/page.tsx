import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export default async function ServicesPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const t = dict.services;

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} intro={t.intro} />

      <section className="border-b border-stone">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <h2 className="font-serif text-3xl text-ink">{t.engagementTitle}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {t.engagements.map((e) => (
              <article key={e.title} className="border border-stone bg-white p-7">
                <h3 className="font-serif text-xl text-ink">{e.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-graphite">{e.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-stone bg-stone/20">
        <div className="mx-auto max-w-6xl space-y-16 px-6 py-16 lg:px-8">
          {t.clusters.map((c, i) => (
            <article key={c.id} id={c.id} className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <span className="text-xs font-medium tracking-[0.14em] text-sage">
                  0{i + 1}
                </span>
                <h2 className="mt-3 font-serif text-2xl text-ink md:text-3xl">{c.title}</h2>
                <p className="mt-4 text-sm leading-relaxed text-graphite">{c.outcome}</p>
              </div>
              <ul className="lg:col-span-8 space-y-3 border-l border-stone pl-6">
                {c.items.map((item) => (
                  <li key={item} className="text-base text-ink leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <CtaBand
        title={t.ctaTitle}
        body={t.ctaBody}
        cta={t.cta}
        href={`/${locale}/contact`}
      />
    </>
  );
}
