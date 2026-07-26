import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: string;
  intro?: string;
  className?: string;
};

export function PageHero({ eyebrow, title, intro, className }: Props) {
  return (
    <section className={cn("border-b border-stone bg-paper", className)}>
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
        {eyebrow && (
          <p className="animate-fade-up text-xs font-medium uppercase tracking-[0.16em] text-graphite">
            {eyebrow}
          </p>
        )}
        <h1 className="animate-fade-up delay-100 mt-4 max-w-3xl font-serif text-4xl leading-[1.1] tracking-tight text-ink md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {intro && (
          <p className="animate-fade-up delay-200 prose-measure mt-6 text-lg leading-relaxed text-graphite md:text-xl">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
