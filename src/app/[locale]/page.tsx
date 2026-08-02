import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ButtonLink";
import { CtaBand } from "@/components/CtaBand";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const t = dict.home;

  return (
    <>
      <section className="relative overflow-hidden border-b border-stone">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-12 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:py-16">
          <div className="lg:col-span-5">
            <p className="animate-fade-up text-xs font-medium uppercase tracking-[0.16em] text-graphite">
              {t.eyebrow}
            </p>
            <h1 className="animate-fade-up delay-100 mt-5 font-serif text-4xl leading-[1.08] tracking-tight text-ink md:text-5xl lg:text-[3.25rem]">
              {t.headline}
            </h1>
            <p className="animate-fade-up delay-200 mt-6 text-lg leading-relaxed text-graphite">
              {t.subhead}
            </p>
            <div className="animate-fade-up delay-300 mt-8 flex flex-wrap items-center gap-4">
              <ButtonLink href={`/${locale}/contact`}>{t.ctaPrimary}</ButtonLink>
              <ButtonLink href={`/${locale}/services`} variant="ghost">
                {t.ctaSecondary} →
              </ButtonLink>
            </div>
          </div>

          <div className="animate-fade-in relative aspect-[4/3] overflow-hidden rounded-sm lg:col-span-7 lg:aspect-[5/4]">
            <Image
              src="/images/portrait.jpg"
              alt="Jesús Gilberto Elías Ogaz, Chief Economic Strategist"
              fill
              priority
              className="object-cover object-[center_20%]"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-stone">
        <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8 lg:py-16">
          <h2 className="font-serif text-3xl text-ink md:text-4xl">{t.audienceTitle}</h2>
          <div className="mt-10 divide-y divide-stone border-y border-stone">
            {t.audiences.map((a) => (
              <Link
                key={a.title}
                href={`/${locale}${a.href}`}
                className="group flex flex-col gap-2 py-8 transition hover:bg-stone/30 md:flex-row md:items-center md:justify-between md:gap-10 md:px-4"
              >
                <div>
                  <h3 className="font-serif text-2xl text-ink">{a.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-graphite">
                    {a.body}
                  </p>
                </div>
                <span className="text-sage transition group-hover:translate-x-1">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-stone bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl text-ink md:text-4xl">{t.practicesTitle}</h2>
            <p className="mt-4 text-graphite leading-relaxed">{t.practicesSub}</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {t.practices.map((p) => (
              <Link
                key={p.number}
                href={`/${locale}${p.href}`}
                className="group border border-stone bg-white p-8 transition hover:border-sage/50"
              >
                <span className="text-xs font-medium tracking-[0.14em] text-sage">
                  {p.number}
                </span>
                <h3 className="mt-4 font-serif text-2xl text-ink">{p.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-sm bg-stone/60 px-2 py-1 text-[11px] uppercase tracking-wide text-graphite"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-6 text-sm text-sage group-hover:underline">{dict.common.learnMore} →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-stone">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <h2 className="font-serif text-3xl text-ink md:text-4xl">{t.methodTitle}</h2>
          <ol className="mt-12 grid gap-8 md:grid-cols-3">
            {t.methodSteps.map((step, i) => (
              <li key={step.title} className="relative">
                <span className="text-xs font-medium tracking-[0.14em] text-sage">
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-serif text-xl text-ink">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-graphite">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-stone bg-stone/30">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-16 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <h2 className="font-serif text-3xl text-ink">{t.insightsTitle}</h2>
            <p className="mt-2 text-graphite">{dict.publications.intro}</p>
          </div>
          <ButtonLink href={`/${locale}/publications`} variant="secondary">
            {t.insightsCta}
          </ButtonLink>
        </div>
      </section>

      <CtaBand
        title={t.closeTitle}
        body={t.closeBody}
        cta={t.closeCta}
        href={`/${locale}/contact`}
      />
    </>
  );
}
