import Image from "next/image";
import { getMovieDetails } from "../../../lib/api";
import FavoriteButton from "@/Components/FavoriteButton";

type MovieDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MovieDetailsPage({
  params,
}: MovieDetailsPageProps) {
  const { id } = await params;

  const movie = await getMovieDetails(id);

  const trailer = movie.videos?.results.find(
    (video) => video.site === "YouTube" && video.type === "Trailer",
  );

  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      {/* ================================= */}
      {/* FULL PAGE MOVIE BACKGROUND */}
      {/* ================================= */}

      {movie.poster_path && (
        <div className="fixed inset-0 z-0">
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt=""
            fill
            priority
            className="object-cover"
          />
        </div>
      )}

      {/* Dark overlay */}
      <div className="fixed inset-0 z-10 bg-black/55" />

      {/* Gradient for readable text */}
      <div className="fixed inset-0 z-10 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />

      {/* Bottom gradient */}
      <div className="fixed inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

      {/* ================================= */}
      {/* CONTENT */}
      {/* ================================= */}

      <div className="relative z-20 min-h-screen">
        <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6 py-24 md:px-10 lg:px-16">
          <div className="flex w-full items-start justify-between gap-12">
            {/* ================================= */}
            {/* LEFT SIDE - MOVIE INFORMATION */}
            {/* ================================= */}

            <div className="max-w-3xl">
              {/* Title */}
              <h1 className="text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                {movie.title}
              </h1>

              {/* Metadata */}
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <span className="rounded-full bg-yellow-400/15 px-4 py-2 font-semibold text-yellow-400 backdrop-blur">
                  ⭐ {movie.vote_average.toFixed(1)}
                </span>

                <span className="text-slate-200">
                  {movie.release_date || "Unknown"}
                </span>

                {movie.runtime && (
                  <span className="text-slate-200">{movie.runtime} min</span>
                )}

                <FavoriteButton movieId={movie.id} />
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="rounded-full border border-white/20 bg-black/30 px-4 py-1.5 text-sm text-white backdrop-blur"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Overview */}
              <div className="mt-10">
                <h2 className="text-xl font-semibold">Overview</h2>

                <p className="mt-4 max-w-2xl text-base leading-8 text-slate-200 md:text-lg">
                  {movie.overview || "No overview available."}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                {trailer && (
                  <a
                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg transition hover:bg-blue-500 active:scale-95"
                  >
                    ▶ Watch Trailer
                  </a>
                )}
              </div>
            </div>

            {/* ================================= */}
            {/* RIGHT SIDE - MOVIE POSTER */}
            {/* ================================= */}

            {movie.poster_path && (
              <div className="hidden w-64 shrink-0 overflow-hidden rounded-2xl border border-white/20 shadow-2xl lg:block xl:w-72">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={500}
                  height={750}
                  className="h-auto w-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
