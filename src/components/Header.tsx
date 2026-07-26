"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function Header({ locale, dict }: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const stripLocale = pathname.replace(/^\/(es|en)/, "") || "/";
  const otherLocale: Locale = locale === "es" ? "en" : "es";
  const otherHref = `/${otherLocale}${stripLocale === "/" ? "" : stripLocale}`;

  const links = [
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/services`, label: dict.nav.services },
    { href: `/${locale}/projects`, label: dict.nav.projects },
    { href: `/${locale}/publications`, label: dict.nav.publications },
    { href: `/${locale}/ai-expertise`, label: dict.nav.ai },
    { href: `/${locale}/economic-development`, label: dict.nav.economicDev },
    { href: `/${locale}/speaking`, label: dict.nav.speaking },
    { href: `/${locale}/cv`, label: dict.nav.cv },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-200",
        scrolled
          ? "border-b border-stone bg-paper/95 backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6 lg:h-20 lg:px-8">
        <Link
          href={`/${locale}`}
          className="font-serif text-lg tracking-tight text-ink md:text-xl"
        >
          Jesús G. Elías Ogaz
        </Link>

        <nav className="hidden items-center gap-5 xl:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[13px] text-graphite transition hover:text-ink",
                pathname.startsWith(link.href) && "text-ink",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={otherHref}
            className="text-[13px] font-medium tracking-wide text-graphite hover:text-ink"
            aria-label={locale === "es" ? "Switch to English" : "Cambiar a español"}
          >
            <span className={locale === "es" ? "text-ink" : ""}>ES</span>
            <span className="mx-1 text-stone">|</span>
            <span className={locale === "en" ? "text-ink" : ""}>EN</span>
          </Link>

          <Link
            href={`/${locale}/contact`}
            className="hidden rounded-sm bg-ink px-4 py-2 text-[13px] font-medium text-white transition hover:bg-ink/90 sm:inline-flex"
          >
            {dict.nav.cta}
          </Link>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center xl:hidden"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <div className="flex w-5 flex-col gap-1.5">
              <span
                className={cn(
                  "h-px w-full bg-ink transition",
                  open && "translate-y-[3.5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "h-px w-full bg-ink transition",
                  open && "-translate-y-[3.5px] -rotate-45",
                )}
              />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-stone bg-paper xl:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 font-serif text-2xl text-ink"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={`/${locale}/contact`}
              className="mt-4 rounded-sm bg-ink px-4 py-3 text-center text-sm font-medium text-white"
            >
              {dict.nav.cta}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
