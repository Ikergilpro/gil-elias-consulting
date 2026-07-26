import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export default async function ProjectsPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const t = dict.projects;

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} intro={t.intro} />

      <section className="border-b border-stone">
        <div className="mx-auto max-w-6xl space-y-16 px-6 py-16 lg:px-8">
          {t.categories.map((category, index) => (
            <div key={category.title}>
              <div className="flex items-baseline gap-4">
                <span className="text-xs font-medium tracking-[0.14em] text-sage">
                  0{index + 1}
                </span>
                <h2 className="font-serif text-2xl text-ink md:text-3xl">
                  {category.title}
                </h2>
              </div>
              <ul className="mt-8 grid gap-4 md:grid-cols-2">
                {category.items.map((item) => (
                  <li
                    key={item.title}
                    className="border border-stone bg-white p-6 transition hover:border-sage/40"
                  >
                    <h3 className="font-serif text-xl text-ink">{item.title}</h3>
                    <p className="mt-2 text-xs uppercase tracking-[0.08em] text-sage">
                      {item.role}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-graphite">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
