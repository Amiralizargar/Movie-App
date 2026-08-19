"use client";

import { useEffect, useState } from "react";

type FavoriteButtonProps = {
  movieId: number;
};

export default function FavoriteButton({
  movieId,
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");

    if (!storedFavorites) {
      return;
    }

    const favorites: number[] = JSON.parse(storedFavorites);

    setIsFavorite(favorites.includes(movieId));
  }, [movieId]);




  function toggleFavorite() {
    const storedFavorites = localStorage.getItem("favorites");

    const favorites: number[] = storedFavorites
      ? JSON.parse(storedFavorites)
      : [];

    if (favorites.includes(movieId)) {
      const updatedFavorites = favorites.filter(
        (id) => id !== movieId
      );

      localStorage.setItem(
        "favorites",
        JSON.stringify(updatedFavorites)
      );

      setIsFavorite(false);
    } else {
      const updatedFavorites = [...favorites, movieId];

      localStorage.setItem(
        "favorites",
        JSON.stringify(updatedFavorites)
      );

      setIsFavorite(true);
    }
  }

  return (
    <button className="text-2xl"
      type="button"
      onClick={toggleFavorite}
    >
      {isFavorite ? "❤️" : "♡"}
    </button>
  );
}