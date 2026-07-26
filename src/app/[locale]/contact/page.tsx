import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export default async function ContactPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const t = dict.contact;

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} intro={t.intro} />

      <section className="border-b border-stone">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-16 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-7">
            <ContactForm dict={dict} />
          </div>
          <aside className="lg:col-span-5">
            <div className="sticky top-28 rounded-sm border border-stone bg-white p-8">
              <h2 className="font-serif text-2xl text-ink">{t.asideTitle}</h2>
              <ul className="mt-6 space-y-4">
                {t.asideItems.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-graphite">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-10 border-t border-stone pt-6">
                <p className="text-xs uppercase tracking-[0.14em] text-graphite">
                  {t.emailLabel}
                </p>
                <p className="mt-2 text-sm text-ink">{t.emailValue}</p>
                <p className="mt-2 text-xs text-copper">{t.emailNote}</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
