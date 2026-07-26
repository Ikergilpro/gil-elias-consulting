import Link from "next/link";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function Footer({ locale, dict }: Props) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="font-serif text-2xl">Jesús Gilberto Elías Ogaz</p>
          <p className="mt-2 text-sm text-white/60">Chief Economic Strategist</p>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">
            {dict.footer.tagline}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-white/40">
            {dict.footer.practice}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li>
              <Link href={`/${locale}/economic-development`} className="hover:text-white">
                {dict.nav.economicDev}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/services`} className="hover:text-white">
                {dict.nav.services}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/ai-expertise`} className="hover:text-white">
                {dict.nav.ai}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/speaking`} className="hover:text-white">
                {dict.nav.speaking}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/cv`} className="hover:text-white">
                {dict.nav.cv}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-white/40">
            {dict.footer.explore}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li>
              <Link href={`/${locale}/about`} className="hover:text-white">
                {dict.nav.about}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/projects`} className="hover:text-white">
                {dict.nav.projects}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/publications`} className="hover:text-white">
                {dict.nav.publications}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/contact`} className="hover:text-white">
                {dict.nav.contact}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 text-xs text-white/45 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>
            © {year} {dict.meta.siteName}. {dict.footer.rights}
          </p>
          <p className="max-w-xl">{dict.footer.note}</p>
        </div>
      </div>
    </footer>
  );
}
