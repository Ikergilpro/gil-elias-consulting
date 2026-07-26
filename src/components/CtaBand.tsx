import { ButtonLink } from "@/components/ButtonLink";

type Props = {
  title: string;
  body: string;
  cta: string;
  href: string;
};

export function CtaBand({ title, body, cta, href }: Props) {
  return (
    <section className="bg-ink text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16 lg:flex-row lg:items-end lg:justify-between lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl leading-tight md:text-4xl">{title}</h2>
          <p className="mt-4 text-base leading-relaxed text-white/70">{body}</p>
        </div>
        <ButtonLink href={href} variant="onDark">
          {cta}
        </ButtonLink>
      </div>
    </section>
  );
}
