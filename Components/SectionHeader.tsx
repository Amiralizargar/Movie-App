import Link from "next/link";
import { ArrowRight } from "lucide-react";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  hrefLabel?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  href,
  hrefLabel = "See all",
}: SectionHeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-ember">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-paper sm:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="mt-1.5 max-w-xl text-sm text-mist">{description}</p>
        )}
      </div>

      {href && (
        <Link
          href={href}
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-mist transition hover:text-ember-bright"
        >
          {hrefLabel}
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" strokeWidth={1.75} />
        </Link>
      )}
    </div>
  );
}
