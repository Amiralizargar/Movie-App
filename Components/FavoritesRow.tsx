"use client";

import { useEffect, useState } from "react";
import type { Movie } from "../types/movie";
import { useFavorites } from "../hooks/useFavorites";
import MovieRow from "./MovieRow";

export default function FavoritesRow() {
  const { ids, hydrated } = useFavorites();
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    if (!hydrated || ids.length === 0) return;

    let cancelled = false;

    async function loadFavorites() {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });

      if (!response.ok || cancelled) return;

      const data: Movie[] = await response.json();
      if (!cancelled) setMovies(data);
    }

    loadFavorites();

    return () => {
      cancelled = true;
    };
  }, [hydrated, ids]);

  const displayMovies = ids.length === 0 ? [] : movies;

  if (!hydrated || displayMovies.length === 0) return null;

  return (
    <MovieRow
      eyebrow="Your Library"
      title="Your Favorites"
      description="Movies you've saved for later."
      href="/favorites"
      movies={displayMovies}
    />
  );
}
