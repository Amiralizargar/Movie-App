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
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white">
      <div className="mx-auto max-w-7xl">
        <section className="relative overflow-hidden rounded-3xl border border-slate-800">
          {/* Backdrop */}
          {movie.backdrop_path && (
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt=""
              fill
              priority
              className="object-cover"
            />
          )}

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-slate-950/60" />

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/30" />

          {/* Content */}
          <div className="relative z-10 flex min-h-[520px] flex-col items-center gap-6 p-6 text-center md:flex-row md:items-center md:gap-8 md:p-10 md:text-left lg:gap-12 lg:p-14">
            {/* Poster */}
            <div className="w-48 shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-2xl md:w-64">
              {movie.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={500}
                  height={750}
                  className="h-auto w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[2/3] items-center justify-center bg-slate-900 text-slate-500">
                  No poster
                </div>
              )}
            </div>

            {/* Movie Information */}
            <div className="max-w-3xl">
              {/* Title */}
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                {movie.title}
              </h1>

              {/* Metadata */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                <span className="rounded-full bg-yellow-400/10 px-3 py-1.5 text-sm font-semibold text-yellow-400">
                  ⭐ {movie.vote_average.toFixed(1)}
                </span>

                <span className="text-sm text-slate-300">
                  {movie.release_date || "Unknown"}
                </span>

                {movie.runtime && (
                  <span className="text-sm text-slate-300">
                    {movie.runtime} min
                  </span>
                )}
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="mt-5 flex flex-wrap justify-center gap-2 md:justify-start">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-slate-200"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Overview */}
              <div className="mt-7">
                <h2 className="text-lg font-semibold">Overview</h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
                  {movie.overview || "No overview available."}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                {trailer && (
                  <a
                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 active:scale-95"
                  >
                    ▶ Watch Trailer
                  </a>
                )}

                <FavoriteButton movieId={movie.id} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
