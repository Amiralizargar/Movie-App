"use client";

import { useState } from "react";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!query.trim()) {
      return;
    }

    const params = new URLSearchParams(searchParams);

    // Add/update search query
    params.set("query", query.trim());

    // Start search from page 1
    params.delete("page");

    router.push(`/movies?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-2xl items-center"
    >
      <div className="relative flex-1">
        {/* Search icon */}
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
          🔍
        </span>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          className="w-full rounded-l-xl border border-slate-700 bg-slate-900 py-3 pl-11 pr-10 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-slate-500 focus:bg-slate-800"
        />

        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-white"
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      <button
        type="submit"
        className="rounded-r-xl border border-l-0 border-slate-700 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200 active:scale-95"
      >
        Search
      </button>
    </form>
  );
}