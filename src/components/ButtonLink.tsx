import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "onDark";
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-medium tracking-wide transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper";

  const variants = {
    primary: "bg-ink text-white hover:bg-ink/90 active:scale-[0.98]",
    secondary:
      "border border-ink/20 bg-transparent text-ink hover:bg-stone/60",
    ghost:
      "bg-transparent px-0 text-ink underline decoration-sage/50 underline-offset-4 hover:decoration-sage",
    onDark:
      "border border-white/40 bg-transparent text-white hover:bg-white/10",
  };

  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
    </Link>
  );
}
