import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export default async function AiExpertisePage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const t = dict.ai;

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} intro={t.intro} />

      <section className="border-b border-stone">
        <div className="mx-auto max-w-6xl space-y-12 px-6 py-16 lg:px-8">
          {t.sections.map((s) => (
            <article key={s.title} className="grid gap-4 lg:grid-cols-12">
              <h2 className="font-serif text-2xl text-ink lg:col-span-4">{s.title}</h2>
              <p className="text-base leading-relaxed text-graphite lg:col-span-7">
                {s.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-b border-stone bg-stone/30">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <h2 className="font-serif text-3xl text-ink">{t.capabilitiesTitle}</h2>
          <ul className="mt-10 space-y-4">
            {t.capabilities.map((c) => (
              <li
                key={c}
                className="border-l-2 border-sage bg-white/70 py-4 pl-5 text-sm leading-relaxed text-ink"
              >
                {c}
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-2xl text-sm italic text-graphite">{t.note}</p>
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
