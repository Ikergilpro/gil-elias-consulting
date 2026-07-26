import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export default async function CvPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const t = dict.cv;

  return (
    <>
      <section className="border-b border-stone">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-12 lg:px-8 lg:py-24">
          <div className="lg:col-span-7">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-graphite">
              {t.eyebrow}
            </p>
            <h1 className="mt-4 font-serif text-4xl tracking-tight text-ink md:text-5xl">
              {t.title}
            </h1>
            <p className="mt-3 text-sm tracking-wide text-sage">{t.role}</p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-graphite">
              {t.subtitle}
            </p>

            <div className="mt-8 rounded-sm border border-stone bg-stone/30 p-6">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-graphite">
                {t.downloadTitle}
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/cv/jesus-elias-cv-es.pdf"
                  download="Jesus-Gilberto-Elias-Ogaz-CV-ES.pdf"
                  className="inline-flex items-center justify-center rounded-sm bg-ink px-5 py-3 text-sm font-medium text-white transition hover:bg-ink/90"
                >
                  {t.downloadEs}
                </a>
                <a
                  href="/cv/jesus-elias-cv-en.pdf"
                  download="Jesus-Gilberto-Elias-Ogaz-CV-EN.pdf"
                  className="inline-flex items-center justify-center rounded-sm border border-ink/20 bg-white px-5 py-3 text-sm font-medium text-ink transition hover:bg-stone/60"
                >
                  {t.downloadEn}
                </a>
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-sm lg:col-span-5 lg:aspect-auto lg:min-h-[420px]">
            <Image
              src="/images/portrait.jpg"
              alt="Jesús Gilberto Elías Ogaz"
              fill
              className="object-cover object-[center_15%]"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-stone bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <h2 className="font-serif text-3xl text-ink">{t.briefTitle}</h2>
          <div className="mt-8 max-w-3xl space-y-5">
            {t.body.map((p) => (
              <p key={p.slice(0, 40)} className="text-base leading-relaxed text-graphite">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-stone bg-ink text-white">
        <div className="mx-auto max-w-3xl px-6 py-14 text-center lg:px-8">
          <p className="font-serif text-xl italic leading-relaxed text-white/90 md:text-2xl">
            “{t.quote}”
          </p>
        </div>
      </section>

      <section className="border-b border-stone">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-graphite">
            {t.currentRoleLabel}
          </p>
          <h2 className="mt-3 font-serif text-2xl text-ink md:text-3xl">{t.currentRole}</h2>
          <p className="prose-measure mt-4 text-base leading-relaxed text-graphite">
            {t.currentRoleBody}
          </p>
        </div>
      </section>

      <section className="border-b border-stone bg-stone/30">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <h2 className="font-serif text-3xl text-ink">{t.competenciesTitle}</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {t.competencies.map((c) => (
              <li
                key={c}
                className="border-l border-sage bg-white/80 py-3 pl-4 text-sm text-ink"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-stone">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <h2 className="font-serif text-3xl text-ink">{t.educationTitle}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {t.education.map((item) => (
              <article key={item.title} className="border border-stone bg-white p-6">
                <h3 className="font-serif text-lg text-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-graphite">{item.institution}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 border-t border-stone pt-8">
            <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-graphite">
              {t.trainingTitle}
            </h3>
            <p className="mt-4 max-w-4xl text-sm leading-relaxed text-ink">{t.training}</p>
          </div>
        </div>
      </section>

      <section className="border-b border-stone bg-stone/20">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <h2 className="font-serif text-2xl text-ink">{t.contactTitle}</h2>
          <ul className="mt-6 space-y-3 text-sm text-graphite">
            <li>
              <a href={`mailto:${t.email}`} className="text-ink hover:underline">
                {t.email}
              </a>
            </li>
            <li>
              <a href={`tel:${t.phone.replace(/\s/g, "")}`} className="text-ink hover:underline">
                {t.phone}
              </a>
            </li>
            <li>{t.location}</li>
            <li>
              <Link
                href={t.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink hover:underline"
              >
                {t.linkedin}
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
