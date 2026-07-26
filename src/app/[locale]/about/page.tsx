import Image from "next/image";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ButtonLink";
import { CtaBand } from "@/components/CtaBand";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export default async function AboutPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const t = dict.about;

  return (
    <>
      <section className="border-b border-stone">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-12 lg:px-8 lg:py-24">
          <div className="lg:col-span-6">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-graphite">
              {t.eyebrow}
            </p>
            <h1 className="mt-4 font-serif text-4xl tracking-tight text-ink md:text-5xl">
              {t.title}
            </h1>
            <p className="mt-2 text-sm uppercase tracking-[0.12em] text-sage">{t.role}</p>
            <p className="mt-8 font-serif text-2xl leading-snug text-ink md:text-3xl">
              {t.lede}
            </p>
            <div className="mt-8 space-y-5">
              {t.body.map((p) => (
                <p
                  key={p.slice(0, 32)}
                  className="prose-measure text-base leading-relaxed text-graphite"
                >
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={`/${locale}/contact`}>{t.cta}</ButtonLink>
              <ButtonLink href={`/${locale}/cv`} variant="secondary">
                CV
              </ButtonLink>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm lg:col-span-6 lg:aspect-auto lg:min-h-[560px]">
            <Image
              src="/images/portrait.jpg"
              alt="Portrait of Jesús Gilberto Elías Ogaz"
              fill
              className="object-cover object-[center_15%]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-stone bg-stone/30">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <h2 className="font-serif text-3xl text-ink">{t.methodTitle}</h2>
          <p className="prose-measure mt-4 text-lg leading-relaxed text-graphite">
            {t.methodBody}
          </p>
        </div>
      </section>

      <section className="border-b border-stone">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <h2 className="font-serif text-3xl text-ink">{t.domainsTitle}</h2>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {t.domains.map((d) => (
              <li
                key={d}
                className="border-l border-sage pl-4 text-sm leading-relaxed text-ink"
              >
                {d}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-stone bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <h2 className="font-serif text-3xl text-ink">{t.careerTitle}</h2>
          <ol className="mt-10 space-y-0 divide-y divide-stone border-y border-stone">
            {t.career.map((item) => (
              <li
                key={`${item.period}-${item.title}`}
                className="grid gap-3 py-8 md:grid-cols-12 md:gap-8"
              >
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-sage md:col-span-3">
                  {item.period}
                </p>
                <div className="md:col-span-9">
                  <h3 className="font-serif text-xl text-ink">{item.title}</h3>
                  <p className="mt-1 text-sm text-graphite">{item.org}</p>
                  <p className="mt-3 text-sm leading-relaxed text-graphite">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        title={dict.home.closeTitle}
        body={dict.home.closeBody}
        cta={t.cta}
        href={`/${locale}/contact`}
      />
    </>
  );
}
