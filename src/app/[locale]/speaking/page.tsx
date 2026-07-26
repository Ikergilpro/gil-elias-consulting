import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export default async function SpeakingPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const t = dict.speaking;

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} intro={t.intro} />

      <section className="border-b border-stone">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <h2 className="font-serif text-3xl text-ink">{t.topicsTitle}</h2>
          <ul className="mt-10 divide-y divide-stone border-y border-stone">
            {t.topics.map((topic) => (
              <li key={topic} className="py-5 font-serif text-xl text-ink md:text-2xl">
                {topic}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-stone bg-stone/30">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="font-serif text-2xl text-ink">{t.emptyTitle}</h2>
            <p className="mt-4 text-sm leading-relaxed text-graphite">{t.emptyBody}</p>
          </div>
          <div>
            <h2 className="font-serif text-2xl text-ink">{t.formatsTitle}</h2>
            <ul className="mt-4 space-y-3">
              {t.formats.map((f) => (
                <li key={f} className="border-l border-sage pl-4 text-sm text-ink">
                  {f}
                </li>
              ))}
            </ul>
          </div>
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
