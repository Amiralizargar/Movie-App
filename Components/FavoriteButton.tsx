"use client";

import { Heart } from "lucide-react";
import { cn } from "../lib/utils";
import { useFavorites } from "../hooks/useFavorites";

type FavoriteButtonProps = {
  movieId: number;
  size?: "sm" | "md";
  className?: string;
};

export default function FavoriteButton({
  movieId,
  size = "sm",
  className,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, hydrated } = useFavorites();
  const active = hydrated && isFavorite(movieId);

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleFavorite(movieId);
      }}
      aria-pressed={active}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      className={cn(
        "group/fav flex items-center justify-center rounded-full border border-hairline bg-ink/70 backdrop-blur-md transition duration-200 hover:border-hairline-strong active:scale-90",
        size === "sm" ? "h-9 w-9" : "h-11 w-11",
        className,
      )}
    >
      <Heart
        className={cn(
          "transition-all duration-200",
          size === "sm" ? "h-4 w-4" : "h-5 w-5",
          active
            ? "fill-ember text-ember"
            : "fill-transparent text-paper group-hover/fav:text-ember",
        )}
        strokeWidth={1.75}
      />
    </button>
  );
}
