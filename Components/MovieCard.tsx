import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { Movie } from "../types/movie";
import FavoriteButton from "./FavoriteButton";
import { posterUrl, releaseYear, formatRating, cn } from "../lib/utils";

type MovieCardProps = {
  movie: Movie;
  genreMap?: Record<number, string>;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

export default function MovieCard({
  movie,
  genreMap,
  priority = false,
  sizes = "(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 200px",
  className,
}: MovieCardProps) {
  const poster = posterUrl(movie.poster_path, "w500");
  const year = releaseYear(movie.release_date);

  const genreNames = genreMap
    ? (movie.genre_ids ?? [])
        .map((id) => genreMap[id])
        .filter((name): name is string => Boolean(name))
        .slice(0, 2)
    : [];

  return (
    <article
      className={cn(
        "group relative w-full overflow-hidden rounded-md border border-white/10 bg-white/3 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/6 hover:shadow-xl hover:shadow-black/40",
        className,
      )}
    >
      <div className="absolute right-2.5 top-2.5 z-20">
        <FavoriteButton movieId={movie.id} />
      </div>

      <Link
        href={`/movies/${movie.id}`}
        className="block focus-visible:outline-none"
      >
        <div className="relative aspect-2/3 overflow-hidden bg-ink-soft">
          {poster ? (
            <Image
              src={poster}
              alt={movie.title}
              fill
              priority={priority}
              sizes={sizes}
              className="object-cover transition duration-500 ease-cinematic group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-4 text-center text-xs text-mist-dim">
              No poster available
            </div>
          )}

          {/* Bottom gradient */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

          {/* Rating */}
          <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 font-mono text-[11px] font-medium text-ember-bright backdrop-blur">
            <Star className="h-3 w-3 fill-ember-bright" strokeWidth={0} />
            {formatRating(movie.vote_average)}
          </div>

          {/* Genre chips — reveal on hover */}
          {genreNames.length > 0 && (
            <div className="absolute inset-x-2.5 bottom-9 flex flex-wrap gap-1 opacity-0 transition duration-300 group-hover:opacity-100">
              {genreNames.map((name) => (
                <span
                  key={name}
                  className="rounded-full border border-white/15 bg-black/50 px-2 py-0.5 text-[10px] text-paper backdrop-blur"
                >
                  {name}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="p-3">
          <h3 className="line-clamp-1 text-sm font-semibold text-paper transition group-hover:text-ember-bright">
            {movie.title}
          </h3>
          <p className="mt-1 font-mono text-[11px] text-mist">
            {year ?? "TBA"}
          </p>
        </div>
      </Link>
    </article>
  );
}
