"use client";

import { useEffect, useState } from "react";
import MovieCard from "../../Components/MovieCard";
import type { Movie } from "../../types/movie";

export default function FavoritesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFavorites() {
      const storedFavorites =
        localStorage.getItem("favorites");

      if (!storedFavorites) {
        setLoading(false);
        return;
      }

      const favoriteIds: number[] =
        JSON.parse(storedFavorites);

      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ids: favoriteIds,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to load favorites");
      }

      const movies: Movie[] = await response.json();

      setMovies(movies);
      setLoading(false);
    }

    loadFavorites();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-slate-400">
            Loading favorites...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-7xl">

        <h1 className="mb-8 text-3xl font-bold">
          My Favorites ❤️
        </h1>

        {movies.length === 0 ? (
          <div className="py-16 text-center">
            <h2 className="text-2xl font-bold">
              No favorites yet
            </h2>

            <p className="mt-2 text-slate-400">
              Add some movies to your favorites.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
              />
            ))}
          </div>
        )}

      </div>
    </main>
  );
}