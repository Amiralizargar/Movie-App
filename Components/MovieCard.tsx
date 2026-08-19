import Image from "next/image";
import Link from "next/link";
import type { Movie } from "../types/movie";
import FavoriteButton from "./FavoriteButton";

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-md transition duration-300 hover:-translate-y-1 hover:border-slate-600 hover:shadow-xl">
      {/* Poster */}
      <div className="relative aspect-2/3 overflow-hidden bg-slate-800">

        {/* Favorite Button */}
        <div className="absolute right-3 top-3 z-10">
          <FavoriteButton movieId={movie.id} />
        </div>

        {/* Poster + Details Link */}
        <Link href={`/movies/${movie.id}`} className="block h-full">
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-slate-500">
              No poster
            </div>
          )}

          {/* Rating */}
          <div className="absolute bottom-3 left-3 rounded-full bg-slate-950/90 px-3 py-1 text-sm font-semibold text-yellow-400 backdrop-blur">
            ⭐ {movie.vote_average.toFixed(1)}
          </div>
        </Link>
      </div>

      {/* Movie Info */}
      <Link href={`/movies/${movie.id}`} className="block p-4">
        <h2 className="line-clamp-2 text-lg font-semibold text-white transition group-hover:text-slate-300">
          {movie.title}
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          {movie.release_date || "Release date unknown"}
        </p>
      </Link>
    </article>
  );
}