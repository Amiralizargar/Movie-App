import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "../lib/utils";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
  className?: string;
};

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionHref,
  actionLabel,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-lg border border-hairline bg-surface px-6 py-20 text-center",
        className,
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-hairline bg-ink-soft text-ember">
        <Icon className="h-6 w-6" strokeWidth={1.5} />
      </div>

      <h2 className="mt-6 text-xl font-bold text-paper">{title}</h2>

      {description && (
        <p className="mt-2 max-w-sm text-sm leading-6 text-mist">{description}</p>
      )}

      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="mt-7 inline-flex items-center rounded-full bg-ember px-6 py-2.5 text-sm font-semibold text-ink transition hover:bg-ember-bright active:scale-95"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
