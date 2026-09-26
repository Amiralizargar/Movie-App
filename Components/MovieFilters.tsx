"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, X } from "lucide-react";
import type { Genre } from "../types/movie";
import { cn } from "../lib/utils";

type MovieFiltersProps = {
  genres: Genre[];
};

const RATING_OPTIONS = [
  { label: "Any", value: "" },
  { label: "6+", value: "6" },
  { label: "7+", value: "7" },
  { label: "8+", value: "8" },
  { label: "9+", value: "9" },
];

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
  const genre = searchParams.get("genre") ?? "";

  const hasFilters = Boolean(rating || year || genre);

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
      {/* Rating — ghost segmented control */}
      <div className="flex items-center gap-3.5">
        {RATING_OPTIONS.map((option) => (
          <button
            key={option.label}
            type="button"
            onClick={() => updateFilter("rating", option.value)}
            aria-pressed={rating === option.value}
            className={cn(
              "relative py-1 text-xs font-semibold transition",
              rating === option.value
                ? "text-ember-bright"
                : "text-mist hover:text-paper",
            )}
          >
            {option.label}
            {rating === option.value && (
              <span className="absolute inset-x-0 -bottom-0.5 h-px bg-ember-bright" />
            )}
          </button>
        ))}
      </div>

      <span className="hidden h-4 w-px bg-white/10 sm:block" />

      {/* Year */}
      <input
        id="year"
        type="number"
        min="1900"
        max="2026"
        step="1"
        value={year}
        onChange={handleYearChange}
        placeholder="Year"
        aria-label="Release year"
        className="w-24 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-paper outline-none backdrop-blur-xl transition placeholder:text-mist-dim focus:border-ember/50 focus:bg-white/8"
      />

      {/* Genre */}
      <div className="relative">
        <select
          id="genre"
          value={genre}
          onChange={(event) => updateFilter("genre", event.target.value)}
          aria-label="Genre"
          className="w-full appearance-none rounded-full border border-white/10 bg-white/5 py-1.5 pl-4 pr-8 text-xs text-paper outline-none backdrop-blur-xl transition focus:border-ember/50 focus:bg-white/8 sm:w-auto"
        >
          <option value="">All Genres</option>

          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-mist"
          strokeWidth={1.75}
        />
      </div>

      {hasFilters && (
        <button
          type="button"
          onClick={clearFilters}
          className="ml-auto flex items-center gap-1 text-xs font-medium text-mist transition hover:text-ember-bright"
        >
          <X className="h-3.5 w-3.5" strokeWidth={1.75} />
          Clear
        </button>
      )}
    </div>
  );
}
