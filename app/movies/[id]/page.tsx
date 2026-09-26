import Image from "next/image";
import type { Metadata } from "next";
import { Star, Clock, Calendar } from "lucide-react";
import { getMovieDetails } from "../../../lib/api";
import FavoriteButton from "../../../Components/FavoriteButton";
import TrailerButton from "../../../Components/TrailerButton";
import {
  backdropUrl,
  posterUrl,
  formatDate,
  formatRating,
  formatRuntime,
} from "../../../lib/utils";

type MovieDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: MovieDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const movie = await getMovieDetails(id);

  return {
    title: movie.title,
    description: movie.overview || `Details, ratings, and trailer for ${movie.title}.`,
  };
}

export default async function MovieDetailsPage({ params }: MovieDetailsPageProps) {
  const { id } = await params;

  const movie = await getMovieDetails(id);

  const trailer = movie.videos?.results.find(
    (video) => video.site === "YouTube" && video.type === "Trailer",
  );

  const backdrop = backdropUrl(movie.backdrop_path, "original");
  const poster = posterUrl(movie.poster_path, "w500");
  const releaseDate = formatDate(movie.release_date);
  const runtime = formatRuntime(movie.runtime);

  return (
    <main className="relative h-dvh overflow-hidden text-paper">
      {/* Cinematic background */}
      {backdrop ? (
        <div className="fixed inset-0 z-0">
          <Image src={backdrop} alt="" fill priority className="object-cover" />
        </div>
      ) : (
        <div className="fixed inset-0 z-0 bg-ink-soft" />
      )}

      <div className="fixed inset-0 z-10 bg-ink/60" />
      <div className="fixed inset-0 z-10 bg-gradient-to-r from-ink via-ink/70 to-ink/20" />
      <div className="fixed inset-0 z-10 bg-gradient-to-t from-ink via-ink/10 to-transparent" />

      <div className="relative z-20 mx-auto flex h-full max-w-[1600px] flex-col items-center justify-center gap-5 overflow-hidden px-4 py-4 sm:px-6 md:flex-row md:gap-10 lg:px-14">
        {/* Info */}
        <div className="w-full max-w-2xl md:order-1">
          <h1 className="text-balance text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            {movie.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-xs sm:text-sm">
            <span className="flex items-center gap-1.5 rounded-full bg-ember-dim px-2.5 py-1 font-semibold text-ember-bright">
              <Star className="h-3.5 w-3.5 fill-ember-bright" strokeWidth={0} />
              {formatRating(movie.vote_average)}
            </span>

            {releaseDate && (
              <span className="flex items-center gap-1.5 text-mist">
                <Calendar className="h-3.5 w-3.5" strokeWidth={1.75} />
                {releaseDate}
              </span>
            )}

            {runtime && (
              <span className="flex items-center gap-1.5 text-mist">
                <Clock className="h-3.5 w-3.5" strokeWidth={1.75} />
                {runtime}
              </span>
            )}

            <FavoriteButton movieId={movie.id} />
          </div>

          {movie.genres && movie.genres.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {movie.genres.slice(0, 4).map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium text-paper backdrop-blur-xl"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          <div className="mt-4">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-mist">
              Overview
            </h2>
            <p className="mt-2 line-clamp-2 max-w-xl text-sm leading-6 text-paper/90 sm:line-clamp-3 sm:text-base sm:leading-7">
              {movie.overview || "No overview available."}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            {trailer && <TrailerButton trailerKey={trailer.key} title={movie.title} />}
          </div>
        </div>

        {/* Poster */}
        {poster && (
          <div className="w-24 shrink-0 overflow-hidden rounded-lg border border-hairline-strong shadow-2xl shadow-black/60 sm:w-36 md:order-2 md:w-48 lg:w-56 xl:w-64">
            <Image
              src={poster}
              alt={movie.title}
              width={500}
              height={750}
              className="h-auto w-full object-cover"
            />
          </div>
        )}
      </div>
    </main>
  );
}
