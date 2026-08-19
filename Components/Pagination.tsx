import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  query?: string;
  rating?: string;
  year?: string;
  genre?: string;
};

function getPageWindow(current: number, total: number): (number | "ellipsis")[] {
  const pages = new Set<number>([1, total, current]);

  for (let offset = -1; offset <= 1; offset++) {
    const page = current + offset;
    if (page > 1 && page < total) pages.add(page);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const withEllipsis: (number | "ellipsis")[] = [];

  sorted.forEach((page, index) => {
    if (index > 0 && page - sorted[index - 1] > 1) {
      withEllipsis.push("ellipsis");
    }
    withEllipsis.push(page);
  });

  return withEllipsis;
}

export default function Pagination({
  currentPage,
  totalPages,
  query,
  rating,
  year,
  genre,
}: PaginationProps) {
  const createUrl = (page: number) => {
    const params = new URLSearchParams();

    if (query) params.set("query", query);
    if (rating) params.set("rating", rating);
    if (year) params.set("year", year);
    if (genre) params.set("genre", genre);

    params.set("page", String(page));

    return `/movies?${params.toString()}`;
  };

  const pageWindow = getPageWindow(currentPage, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-wrap items-center justify-center gap-2 py-10"
    >
      <PageArrow
        direction="prev"
        href={currentPage > 1 ? createUrl(currentPage - 1) : undefined}
      />

      <div className="flex items-center gap-1.5">
        {pageWindow.map((page, index) =>
          page === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              className="px-1.5 font-mono text-sm text-mist-dim"
            >
              …
            </span>
          ) : (
            <Link
              key={page}
              href={createUrl(page)}
              aria-current={page === currentPage ? "page" : undefined}
              className={cn(
                "flex h-9 min-w-9 items-center justify-center rounded-full px-3 font-mono text-sm font-medium transition",
                page === currentPage
                  ? "bg-ember text-ink"
                  : "text-mist hover:bg-surface hover:text-paper",
              )}
            >
              {page}
            </Link>
          ),
        )}
      </div>

      <PageArrow
        direction="next"
        href={currentPage < totalPages ? createUrl(currentPage + 1) : undefined}
      />
    </nav>
  );
}

function PageArrow({
  direction,
  href,
}: {
  direction: "prev" | "next";
  href?: string;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  const label = direction === "prev" ? "Previous page" : "Next page";

  const classes = cn(
    "flex h-9 w-9 items-center justify-center rounded-full border transition",
    href
      ? "border-hairline text-paper hover:border-hairline-strong hover:text-ember-bright"
      : "cursor-not-allowed border-hairline/50 text-mist-dim",
  );

  if (!href) {
    return (
      <span className={classes} aria-hidden="true">
        <Icon className="h-4 w-4" strokeWidth={1.75} />
      </span>
    );
  }

  return (
    <Link href={href} aria-label={label} className={classes}>
      <Icon className="h-4 w-4" strokeWidth={1.75} />
    </Link>
  );
}
