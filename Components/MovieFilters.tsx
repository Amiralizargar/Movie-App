"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Genre } from "../types/movie";
type MovieFiltersProps = {
  genres: Genre[];
};
export default function MovieFilters({ genres }: MovieFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateFilter(name: string, value: string) {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    // Whenever a filter changes, go back to page 1
    params.delete("page");

    const queryString = params.toString();

    router.push(queryString ? `/movies?${queryString}` : "/movies");
  }

  function handleRatingChange(event: React.ChangeEvent<HTMLInputElement>) {
    updateFilter("rating", event.target.value);
  }

  function handleYearChange(event: React.ChangeEvent<HTMLInputElement>) {
    updateFilter("year", event.target.value);
  }

  function clearFilters() {
    const params = new URLSearchParams();

    // Keep the search query if there is one
    const query = searchParams.get("query");

    if (query) {
      params.set("query", query);
    }

    router.push(params.toString() ? `/movies?${params.toString()}` : "/movies");
  }

  const rating = searchParams.get("rating") ?? "";
  const year = searchParams.get("year") ?? "";

  const hasFilters = Boolean(rating || year);

  return (
    <div className="mb-8 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Filters</h2>

        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-sm text-slate-400 transition hover:text-white"
          >
            Clear filters
          </button>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Rating */}
        <div>
          <label
            htmlFor="rating"
            className="text-sm font-medium text-slate-300"
          >
            Minimum Rating
          </label>

          <input
            id="rating"
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={rating}
            onChange={handleRatingChange}
            placeholder="e.g. 8"
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-white outline-none transition focus:border-slate-500"
          />
        </div>

        {/* Year */}
        <div>
          <label htmlFor="year" className="text-sm font-medium text-slate-300">
            Release Year
          </label>

          <input
            id="year"
            type="number"
            min="1900"
            max="2026"
            step="1"
            value={year}
            onChange={handleYearChange}
            placeholder="e.g. 2020"
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-white outline-none transition focus:border-slate-500"
          />
        </div>

        <div>
          <label htmlFor="genre" className="text-sm font-medium text-slate-300">
            Genre
          </label>

          <select
            id="genre"
            value={searchParams.get("genre") ?? ""}
            onChange={(event) => updateFilter("genre", event.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-white outline-none"
          >
            <option value="">All Genres</option>

            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
