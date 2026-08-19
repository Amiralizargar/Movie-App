"use client";

import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { cn } from "../lib/utils";

type SearchBarProps = {
  variant?: "full" | "compact";
  onNavigate?: () => void;
  className?: string;
};

export default function SearchBar({
  variant = "full",
  onNavigate,
  className,
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") ?? "");
  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!query.trim()) {
      return;
    }

    const params = new URLSearchParams(searchParams);
    params.set("query", query.trim());
    params.delete("page");

    router.push(`/movies?${params.toString()}`);
    onNavigate?.();
  }

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center", className)}>
        {expanded ? (
          <form
            onSubmit={(event) => {
              handleSubmit(event);
              setExpanded(false);
            }}
            className="flex items-center overflow-hidden rounded-full border border-white/10 bg-white/5 pl-3.5 pr-1.5 backdrop-blur-xl"
          >
            <Search className="h-4 w-4 shrink-0 text-mist" strokeWidth={1.75} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onBlur={() => {
                if (!query.trim()) setExpanded(false);
              }}
              placeholder="Search movies…"
              className="w-36 bg-transparent px-2 py-2 text-sm text-paper outline-none placeholder:text-mist-dim sm:w-52"
            />
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setExpanded(false);
              }}
              aria-label="Close search"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-mist transition hover:text-paper"
            >
              <X className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </form>
        ) : (
          <button
            type="button"
            onClick={() => {
              setExpanded(true);
              requestAnimationFrame(() => inputRef.current?.focus());
            }}
            aria-label="Open search"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-transparent text-paper transition hover:border-hairline hover:text-ember-bright"
          >
            <Search className="h-4.5 w-4.5" strokeWidth={1.75} />
          </button>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("relative flex w-full items-center", className)}
    >
      <Search
        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-mist"
        strokeWidth={1.75}
      />

      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search for a movie…"
        aria-label="Search for a movie"
        className="w-full rounded-full border border-white/10 bg-white/5 py-3 pl-11 pr-11 text-sm text-paper outline-none backdrop-blur-xl transition placeholder:text-mist-dim focus:border-ember/50 focus:bg-white/8"
      />

      {query && (
        <button
          type="button"
          onClick={() => setQuery("")}
          className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-mist transition hover:text-paper"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" strokeWidth={1.75} />
        </button>
      )}
    </form>
  );
}
