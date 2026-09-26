"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import MovieCard from "../../Components/MovieCard";
import EmptyState from "../../Components/EmptyState";
import MoviesGridSkeleton from "../../Components/skeletons/MoviesGridSkeleton";
import { useFavorites } from "../../hooks/useFavorites";
import type { Movie } from "../../types/movie";

export default function FavoritesPage() {
  const { ids, hydrated } = useFavorites();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (!hydrated || ids.length === 0) return;

    let cancelled = false;

    async function loadFavorites() {
      setFetching(true);

      try {
        const response = await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids }),
        });

        if (!response.ok) {
          throw new Error("Failed to load favorites");
        }

        const data: Movie[] = await response.json();
        if (!cancelled) setMovies(data);
      } finally {
        if (!cancelled) setFetching(false);
      }
    }

    loadFavorites();

    return () => {
      cancelled = true;
    };
  }, [hydrated, ids]);

  const displayMovies = ids.length === 0 ? [] : movies;
  const loading = !hydrated || (ids.length > 0 && fetching && displayMovies.length === 0);

  return (
    <main className="min-h-screen bg-ink px-4 pb-10 pt-24 text-paper sm:px-6 lg:px-10 xl:px-14">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-8">
          <div className="flex items-center gap-2.5">
            <Heart className="h-6 w-6 fill-ember text-ember" strokeWidth={0} />
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Your Favorites
            </h1>
          </div>
          <p className="mt-1.5 font-mono text-xs text-mist">
            {loading
              ? "Loading…"
              : `${displayMovies.length} saved ${displayMovies.length === 1 ? "movie" : "movies"}`}
          </p>
        </div>

        {loading ? (
          <MoviesGridSkeleton count={10} />
        ) : displayMovies.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="No favorites yet"
            description="Movies you save will show up here. Start exploring to build your personal library."
            actionHref="/movies"
            actionLabel="Explore Movies"
          />
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
            {displayMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
