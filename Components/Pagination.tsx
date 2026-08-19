import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  query?: string;
  rating?: string;
  year?: string;
  genre?: string;
};

export default function Pagination({
  currentPage,
  totalPages,
  query,
  rating,
  year,
  genre
}: PaginationProps) {
  const createUrl = (page: number) => {
    const params = new URLSearchParams();

    if (query) {
      params.set("query", query);
    }

    if (rating) {
      params.set("rating", rating);
    }

    if (year) {
      params.set("year", year);
    }

    if (genre) {
      params.set("genre", genre);
    }

    params.set("page", String(page));

    return `/movies?${params.toString()}`;
  };

  return (
    <div className="flex items-center justify-center gap-4 py-8">
      {currentPage > 1 ? (
        <Link
          href={createUrl(currentPage - 1)}
          className="rounded-lg bg-slate-800 px-4 py-2 text-white transition hover:bg-slate-700"
        >
          ← Previous
        </Link>
      ) : (
        <span className="rounded-lg bg-slate-900 px-4 py-2 text-slate-600">
          ← Previous
        </span>
      )}

      <span className="text-sm text-slate-400">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          href={createUrl(currentPage + 1)}
          className="rounded-lg bg-slate-800 px-4 py-2 text-white transition hover:bg-slate-700"
        >
          Next →
        </Link>
      ) : (
        <span className="rounded-lg bg-slate-900 px-4 py-2 text-slate-600">
          Next →
        </span>
      )}
    </div>
  );
}
